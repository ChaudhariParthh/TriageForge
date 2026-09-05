# API Integrations

TriageForge uses several external services to enrich alerts, store results, communicate with analysts, and create incidents.

## VirusTotal

VirusTotal is used to check the reputation of extracted indicators.

TriageForge currently queries the IP address endpoint and keeps the relevant analysis information:

- Malicious count
- Suspicious count
- Harmless count
- Undetected count
- Reputation
- Tags

The response is normalized before being passed to the correlation stage.

## AbuseIPDB

AbuseIPDB is used to check the reputation of source IP addresses.

The workflow extracts:

- Abuse confidence score
- Total reports
- Number of distinct users
- Country
- Usage type
- ISP
- Domain
- Public status
- Whitelist status
- Last reported time

The API key is stored in n8n credentials and is not included in the repository.

## GeoIP

GeoIP is used to provide network and location context for an IP address.

The workflow extracts:

- Country
- Country code
- Region
- City
- Latitude
- Longitude
- ISP
- Organization
- Lookup status

This information can be used as supporting context during correlation and investigation.

## AlienVault OTX

AlienVault OTX provides additional threat-intelligence information for extracted indicators.

TriageForge currently uses:

- Reputation
- Pulse count
- Validation information
- Available OTX sections
- False-positive information

The response is normalized before being used by the correlation engine.

## OpenAI

OpenAI is used only for investigation assistance.

For High and Critical alerts, TriageForge sends the relevant alert, risk, and correlated evidence to the model.

The model produces an investigation summary and suggested next steps.

The deterministic risk score remains unchanged.

## Slack

Slack is used for analyst communication.

TriageForge sends:

- High/Critical alerts for analyst approval
- Low/Medium alerts as queue notifications

For High/Critical alerts, the analyst can approve or reject the alert directly from the Slack message.

## Supabase

Supabase is used to store alert records.

The database stores information such as:

- Alert ID
- Alert type
- Username
- Source IP
- Destination
- Failed attempts
- Timestamp
- Risk score
- Severity
- Risk reasons

The database provides persistent storage for the alerts processed by TriageForge.

## GitHub

GitHub Issues are used for incident tracking after an analyst approves a High/Critical alert.

The created issue contains the relevant alert information, risk assessment, evidence, and analyst decision.

GitHub is used as the incident/ticket destination rather than as the primary alert database.

## Credentials

API keys and service credentials are configured inside n8n credentials.

No API keys, tokens, passwords, or service-role keys are stored in the GitHub repository.