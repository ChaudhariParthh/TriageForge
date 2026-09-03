# TriageForge Risk Scoring

TriageForge uses a deterministic 0–100 risk score to prioritize security alerts before analyst review.

## Scoring Factors

| Indicator | Points |
|---|---:|
| Threat-intelligence evidence indicates malicious activity | +30 |
| 50+ failed login attempts | +20 |
| Successful login after brute-force activity | +20 |
| Privileged account involved | +15 |
| Login from an unusual country | +10 |
| Activity occurred outside normal hours | +5 |

The maximum theoretical score is 100.

## Severity Thresholds

| Score | Severity | Interpretation |
|---:|---|---|
| 0–29 | LOW | Limited evidence; routine handling |
| 30–59 | MEDIUM | Suspicious activity requiring analyst review |
| 60–79 | HIGH | Multiple or significant indicators requiring priority investigation |
| 80–100 | CRITICAL | Multiple high-impact indicators requiring immediate attention |

## Rationale

The scoring model is designed so that stronger or multiple independent indicators increase the priority of an alert.

A single weak indicator should generally not make an alert HIGH or CRITICAL. Higher severity requires a combination of meaningful security signals.

The thresholds are operational prioritization levels rather than a claim of absolute compromise. Final incident classification remains subject to analyst validation.

## Example

An alert containing:

- 50+ failed login attempts = +20
- Threat-intelligence evidence = +30
- Privileged account = +15

would receive:

20 + 30 + 15 = **65**

Therefore, TriageForge classifies the alert as **HIGH** and routes it to priority investigation.

## Important Design Principle

TriageForge uses deterministic rules for the risk decision. AI may assist with investigation summaries and evidence interpretation, but it does not independently determine the final risk score or severity.