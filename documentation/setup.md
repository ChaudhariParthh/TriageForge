# TriageForge Setup

## Requirements

The current TriageForge workflow requires:

- n8n Cloud
- VirusTotal account/API access
- AbuseIPDB API access
- AlienVault OTX API access
- GeoIP API access
- OpenAI API access
- Slack account
- Supabase project
- GitHub repository

Wazuh Cloud will be added as the security alert source.

## 1. Create the n8n Workflow

Create a new workflow in n8n Cloud.

The main workflow starts with a POST webhook and processes the alert through the TriageForge pipeline.

The webhook is currently configured with:

- Method: POST
- Path: `triageforge-alert`
- Authentication: None
- Response: After the last node finishes

## 2. Configure Alert Normalization

The normalization node maps the incoming alert into the fields used by TriageForge.

The current fields include:

- `alert_id`
- `alert_type`
- `username`
- `source_ip`
- `destination`
- `failed_attempts`
- `timestamp`
- `successful_login_after_bruteforce`
- `privileged_account`
- `unusual_country`
- `outside_normal_hours`

## 3. Configure Threat Intelligence

Add the required credentials in n8n and configure the enrichment nodes for:

- VirusTotal
- AbuseIPDB
- GeoIP
- AlienVault OTX

API responses are passed through separate normalization nodes before being merged.

## 4. Configure Supabase

Create the alert table in Supabase and connect it to n8n.

The workflow saves the alert after risk scoring and before severity-based routing.

Database credentials should be stored securely in n8n.

## 5. Configure Slack

Connect the Slack account to n8n.

The workflow uses Slack for:

- Analyst approval
- Alert queue notifications

The approval step provides Approve and Reject options.

## 6. Configure OpenAI

Add the OpenAI credential in n8n.

OpenAI is used in the High/Critical investigation path.

The model receives the prepared investigation data rather than the complete raw API responses.

## 7. Configure GitHub

Connect the GitHub account to n8n and select the TriageForge repository.

Approved High/Critical alerts are converted into GitHub Issues.

## 8. Test the Workflow

Start with a synthetic security alert rather than real security data.

A test alert should contain the fields required by the normalization node.

Verify the workflow in stages:

1. Alert reaches the webhook.
2. Fields are normalized.
3. IOCs are extracted.
4. Threat-intelligence lookups return data.
5. Results are normalized.
6. Evidence is correlated.
7. Risk score and severity are calculated.
8. Alert is stored in Supabase.
9. Alert follows the correct routing path.
10. High/Critical alerts reach analyst approval.
11. Approved alerts create a GitHub Issue.
12. Rejected alerts are marked as false positives.

## Credentials

Keep all API keys and service credentials inside n8n credential storage.

Do not commit credentials, `.env` files containing secrets, or service-role keys to GitHub.
