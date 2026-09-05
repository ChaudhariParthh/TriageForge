const geo = $input.first().json;
const original = $('IOC Extraction').first().json;

return [{
  json: {
    ...original,
    geoip: {
      success: geo.success ?? false,
      country: geo.country ?? null,
      country_code: geo.country_code ?? null,
      region: geo.region ?? null,
      city: geo.city ?? null,
      latitude: geo.latitude ?? null,
      longitude: geo.longitude ?? null,
      isp: geo.connection?.isp ?? null,
      organization: geo.connection?.org ?? null
    }
  }
}];


/**What it does:** Takes the GeoIP result and extracts the **country, region, city, coordinates, ISP, organization, and lookup status**. It then puts these details neatly under a `geoip` section while keeping the original alert data.
