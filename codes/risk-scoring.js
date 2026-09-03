const input = $input.first().json;

const failedAttempts = Number(input.failed_attempts) || 0;

const maliciousSources =
  Number(input.correlation?.threat_intelligence?.malicious_source_count) || 0;

const successfulAfterBruteforce =
  input.successful_login_after_bruteforce === true;

const privilegedAccount =
  input.privileged_account === true;

const unusualCountry =
  input.unusual_country === true;

const outsideNormalHours =
  input.outside_normal_hours === true;

let score = 0;
const reasons = [];

// Threat intelligence
if (maliciousSources > 0) {
  score += 30;
  reasons.push("Threat-intelligence evidence indicates malicious activity");
}

// Brute-force activity
if (failedAttempts >= 50) {
  score += 20;
  reasons.push("50+ failed login attempts");
}

// Successful login after brute-force
if (successfulAfterBruteforce) {
  score += 20;
  reasons.push("Successful login after brute-force activity");
}

// Privileged account
if (privilegedAccount) {
  score += 15;
  reasons.push("Privileged account involved");
}

// Unusual country
if (unusualCountry) {
  score += 10;
  reasons.push("Login from an unusual country");
}

// Outside normal hours
if (outsideNormalHours) {
  score += 5;
  reasons.push("Activity occurred outside normal hours");
}

// Keep score between 0 and 100
score = Math.max(0, Math.min(100, score));

// Determine severity
let severity;

if (score >= 80) {
  severity = "CRITICAL";
} else if (score >= 60) {
  severity = "HIGH";
} else if (score >= 30) {
  severity = "MEDIUM";
} else {
  severity = "LOW";
}

return [{
  json: {
    ...input,
    risk: {
      score,
      severity,
      reasons
    }
  }
}];