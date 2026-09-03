const input = $input.first().json;

const risk = input.risk || {};
const correlation = input.correlation || {};
const ti = correlation.threat_intelligence || {};

return [{
  json: {
    ...input,
    investigation: {
      alert_id: input.alert_id,
      alert_type: input.alert_type,
      username: input.username,
      source_ip: input.source_ip,
      destination: input.destination,

      risk: {
        score: risk.score ?? 0,
        severity: risk.severity ?? "UNKNOWN",
        reasons: risk.reasons || []
      },

      evidence: {
        failed_attempts: correlation.failed_attempts ?? 0,
        virustotal_malicious: ti.virustotal_malicious ?? 0,
        virustotal_suspicious: ti.virustotal_suspicious ?? 0,
        abuse_confidence_score: ti.abuse_confidence_score ?? 0,
        abuse_reports: ti.abuse_reports ?? 0,
        otx_pulse_count: ti.otx_pulse_count ?? 0,
        malicious_source_count: ti.malicious_source_count ?? 0
      },

      analyst_question:
        "Assess the available evidence and summarize why this alert requires investigation."
    }
  }
}];