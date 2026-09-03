# AI Investigation — Development Prompt

## Problem

TriageForge needs an AI-assisted investigation layer for HIGH and CRITICAL alerts.

The AI should analyze already-correlated evidence and help an L1 SOC analyst understand why an alert requires investigation.

## Design Principle

The AI does not determine the risk score or severity.

The deterministic Risk Scoring node makes that decision first. The AI receives the resulting evidence and provides investigation assistance.

## AI Prompt

You are assisting an L1 SOC analyst in investigating a security alert.

Review the alert details and correlated evidence below.

Provide:
1. A concise investigation summary.
2. The strongest evidence supporting the alert severity.
3. Any signs that could indicate a false positive or require validation.
4. Recommended next investigation steps for the analyst.

Do not change the deterministic risk score.
Do not declare the incident definitively malicious or benign.
Base your analysis only on the supplied evidence.

Alert evidence:
{{ JSON.stringify($json.investigation) }}

## Validation

A synthetic CRITICAL alert was processed successfully.

The AI generated:
- Investigation summary
- Supporting evidence
- False-positive/validation considerations
- Recommended investigation steps

The AI output was used as analyst assistance rather than as an autonomous security decision.