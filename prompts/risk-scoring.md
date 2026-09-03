# Risk Scoring — Development Prompt

## Problem

TriageForge needs a deterministic method to prioritize security alerts after threat-intelligence enrichment and correlation.

The scoring system must:
- Produce a score from 0–100
- Use explainable security indicators
- Assign LOW, MEDIUM, HIGH, or CRITICAL severity
- Keep the final decision deterministic
- Allow missing optional fields without breaking the workflow

## Development Prompt

Design a deterministic JavaScript risk-scoring function for an n8n Code node.

Use these scoring factors:

- Threat-intelligence evidence indicates malicious activity: +30
- 50+ failed login attempts: +20
- Successful login after brute-force activity: +20
- Privileged account involved: +15
- Login from an unusual country: +10
- Activity outside normal hours: +5

Use these severity thresholds:

- 0–29 = LOW
- 30–59 = MEDIUM
- 60–79 = HIGH
- 80–100 = CRITICAL

The function should preserve the existing alert data, calculate the score, generate human-readable reasons, and return the severity with the score.

## Refinement

The initial scoring logic was refined so that:
- Numeric values are explicitly normalized.
- Boolean indicators default safely when absent.
- Scores are capped between 0 and 100.
- Each scoring factor produces an explainable reason.
- Risk severity is determined using fixed thresholds.

## Validation

A synthetic HIGH/CRITICAL alert was tested through the complete TriageForge workflow.

Test result:

- 75 failed login attempts
- Successful login after brute-force
- Privileged account
- Unusual country
- Activity outside normal hours
- Threat-intelligence signals

Calculated score: **100**

Calculated severity: **CRITICAL**

The alert was successfully routed to the HIGH/CRITICAL branch and processed by the AI Investigation Summary node.