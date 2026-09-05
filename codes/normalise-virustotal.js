const vt = $input.first().json;

const stats = vt.data?.attributes?.last_analysis_stats || {};

return [{
  json: {
    ...vt,
    virustotal: {
      malicious: stats.malicious || 0,
      suspicious: stats.suspicious || 0,
      harmless: stats.harmless || 0,
      undetected: stats.undetected || 0,
      reputation: vt.data?.attributes?.reputation ?? 0,
      tags: vt.data?.attributes?.tags || []
    }
  }
}];

/***What it does:** Takes the GeoIP result and extracts the **country, region, city, coordinates, ISP, organization, and lookup status**. It then puts these details neatly under a `geoip` section while keeping the original alert data.
