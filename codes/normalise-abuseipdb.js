const abuse = $input.first().json;
const original = $('IOC Extraction').first().json;

const data = abuse.data || {};

return [{
  json: {
    ...original,
    abuseipdb: {
      abuse_confidence_score: data.abuseConfidenceScore ?? 0,
      total_reports: data.totalReports ?? 0,
      distinct_users: data.numDistinctUsers ?? 0,
      country_code: data.countryCode ?? null,
      usage_type: data.usageType ?? null,
      isp: data.isp ?? null,
      domain: data.domain ?? null,
      is_public: data.isPublic ?? false,
      is_whitelisted: data.isWhitelisted ?? false,
      last_reported_at: data.lastReportedAt ?? null
    }
  }
}];

/*What it does:** Takes the AbuseIPDB result and picks out the **abuse score, number of reports, countries, ISP, domain, public/whitelisted status, and last reported time**. It then puts everything neatly under an `abuseipdb` section while keeping the original alert data.
