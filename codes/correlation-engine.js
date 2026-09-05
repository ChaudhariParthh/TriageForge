const input = $input.first().json;

// Normalize numeric values
const failedAttempts = Number(input.failed_attempts) || 0;

const vtMalicious = Number(input.virustotal?.malicious) || 0;
const vtSuspicious = Number(input.virustotal?.suspicious) || 0;

const abuseScore = Number(input.abuseipdb?.abuse_confidence_score) || 0;
const abuseReports = Number(input.abuseipdb?.total_reports) || 0;

const otxPulses = Number(input.otx?.pulse_count) || 0;

// Correlate independent threat-intelligence signals
const maliciousSources = [
  vtMalicious > 0,
  abuseScore >= 50,
  otxPulses > 0
].filter(Boolean).length;

// Build a compact evidence summary
const evidence = {
  failed_attempts: failedAttempts,

  threat_intelligence: {
    virustotal_malicious: vtMalicious,
    virustotal_suspicious: vtSuspicious,
    abuse_confidence_score: abuseScore,
    abuse_reports: abuseReports,
    otx_pulse_count: otxPulses,
    malicious_source_count: maliciousSources
  },

  network_context: {
    is_public: input.abuseipdb?.is_public ?? null,
    is_whitelisted: input.abuseipdb?.is_whitelisted ?? null,
    geoip_success: input.geoip?.success ?? false
  }
};

return [{
  json: {
    ...input,
    failed_attempts: failedAttempts,
    correlation: evidence
  }
}];

/***What it does:** Takes all the alert and enrichment data and **connects the evidence together**. It checks the failed login count plus VirusTotal, AbuseIPDB, and OTX results, counts how many sources show suspicious/malicious signals, and puts everything into a clean `correlation` section for the risk-scoring step.
