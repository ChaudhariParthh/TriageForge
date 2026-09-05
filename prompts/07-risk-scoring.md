I need a simple and explainable risk-scoring system for my SOC alert triage workflow.

Create JavaScript for n8n that calculates a score from 0 to 100 using these factors:

- Threat-intelligence evidence: +30
- 50 or more failed login attempts: +20
- Successful login after brute-force: +20
- Privileged account: +15
- Unusual country: +10
- Outside normal hours: +5

Keep the score between 0 and 100 and classify it as LOW, MEDIUM, HIGH, or CRITICAL. Also return the reasons why each point was added.