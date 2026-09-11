const input = $input.first().json;

// Convert any value to a searchable string
const rawText = JSON.stringify(input);

// ---------- IOC REGEX PATTERNS ----------

// IPv4 addresses
const ipRegex =
  /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g;

// URLs
const urlRegex =
  /\bhttps?:\/\/[^\s"'<>]+/gi;

// Domains
const domainRegex =
  /\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s"'<>]*)?/g;

// MD5
const md5Regex =
  /\b[a-fA-F0-9]{32}\b/g;

// SHA1
const sha1Regex =
  /\b[a-fA-F0-9]{40}\b/g;

// SHA256
const sha256Regex =
  /\b[a-fA-F0-9]{64}\b/g;

// Email addresses
const emailRegex =
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;


// ---------- EXTRACTION FUNCTION ----------

function extract(regex) {
  return [...new Set(rawText.match(regex) || [])];
}


// ---------- EXTRACT IOCs ----------

const ipAddresses = extract(ipRegex);

const urls = extract(urlRegex);

const domains = extract(domainRegex);

const md5Hashes = extract(md5Regex);

const sha1Hashes = extract(sha1Regex);

const sha256Hashes = extract(sha256Regex);

const emails = extract(emailRegex);


// ---------- REMOVE DOMAINS THAT ARE ACTUALLY URL PARTS ----------

const cleanDomains = domains.filter(domain =>
  !domain.startsWith("http://") &&
  !domain.startsWith("https://")
);


// ---------- OUTPUT ----------

return [
  {
    json: {
      ...input,

      iocs: {
        ip_addresses: ipAddresses,
        urls: urls,
        domains: cleanDomains,
        hashes: {
          md5: md5Hashes,
          sha1: sha1Hashes,
          sha256: sha256Hashes
        },
        email_addresses: emails
      },

      ioc_summary: {
        ip_count: ipAddresses.length,
        url_count: urls.length,
        domain_count: cleanDomains.length,
        hash_count:
          md5Hashes.length +
          sha1Hashes.length +
          sha256Hashes.length,
        email_count: emails.length,

        has_ip: ipAddresses.length > 0,
        has_url: urls.length > 0,
        has_domain: cleanDomains.length > 0,
        has_hash:
          md5Hashes.length +
          sha1Hashes.length +
          sha256Hashes.length > 0,
        has_email: emails.length > 0
      }
    }
  }
];