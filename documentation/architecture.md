# TriageForge Architecture

## Overview

TriageForge is an n8n-based security alert triage workflow. It takes an incoming alert, enriches it with external threat intelligence, correlates the available evidence, calculates a risk score, and routes the alert based on its severity.

The workflow is designed to reduce repetitive L1 SOC triage while keeping the final decision with an analyst.

## Workflow

The current workflow follows this sequence:

Webhook
→ Normalize Alert
→ Extract IOCs
→ Threat Intelligence Enrichment
→ Merge Results
→ Correlation
→ Risk Scoring
→ Save Alert
→ Risk Routing

High/Critical alerts continue to:

Risk Routing
→ AI Investigation
→ Analyst Approval
→ Incident or False Positive

Low/Medium alerts continue to:

Risk Routing
→ Queue
→ Analyst Review / Auto-close based on policy

## Alert Ingestion

Alerts enter TriageForge through an n8n webhook.

The normalization step converts the incoming alert into a consistent structure containing fields such as:

- Alert ID
- Alert type
- Username
- Source IP
- Destination
- Failed attempts
- Timestamp
- Login and account context

This gives the rest of the workflow a predictable input format.

## IOC Extraction

The workflow extracts indicators from the alert, including:

- IP addresses
- URLs
- Domains
- File hashes

Duplicate indicators are removed before enrichment.

## Threat Intelligence Enrichment

The extracted indicators are checked against multiple external sources:

- VirusTotal
- AbuseIPDB
- GeoIP
- AlienVault OTX

Each API response is normalized so that only the fields needed by the triage workflow are carried forward.

## Correlation

The correlation stage combines the alert data and enrichment results.

It considers information such as:

- Failed login attempts
- VirusTotal results
- AbuseIPDB reputation
- OTX information
- Network context
- Number of threat-intelligence sources reporting a signal

The result is a compact evidence set used by the risk-scoring stage.

## Risk Scoring

TriageForge uses a deterministic score from 0 to 100.

The current scoring factors are:

- Threat-intelligence evidence: +30
- 50 or more failed login attempts: +20
- Successful login after brute-force activity: +20
- Privileged account: +15
- Unusual country: +10
- Activity outside normal hours: +5

Severity is then assigned as:

- 0–29: LOW
- 30–59: MEDIUM
- 60–79: HIGH
- 80–100: CRITICAL

The workflow also records the reasons that contributed to the score.

## Alert Routing

Alerts with a score of 60 or higher are sent through the investigation path.

Lower-scoring alerts are placed into a queue for further review or possible auto-closure according to the defined policy.

## AI Investigation

For High and Critical alerts, the workflow prepares a smaller investigation dataset and sends it to an AI model.

The AI provides:

- Investigation summary
- Supporting evidence
- Possible false-positive indicators
- Recommended investigation steps

The AI does not modify the deterministic risk score or make the final security decision.

## Analyst Review

The analyst receives the alert and investigation information through Slack.

The analyst can approve or reject the alert.

An approved alert continues to incident creation. A rejected alert is marked as a false positive and closed.

## Incident Handling

Approved alerts are recorded as incidents through GitHub Issues.

The alert data and investigation context are also stored in Supabase for persistence.

## Design Approach

The workflow separates detection, enrichment, scoring, investigation, and analyst decision-making.

This keeps the risk calculation explainable and prevents the AI component from becoming the final decision-maker.