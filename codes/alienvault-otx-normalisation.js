/*What it does:Takes the AlienVault OTX result and picks out the **reputation, pulse count, validation details, sections, and false-positive information**. It then adds these neatly under an `otx` section while keeping the original alert data.
 */



const otx = $input.first().json;
const original = $('IOC Extraction').first().json;

const pulseInfo = otx.pulse_info || {};
const validation = otx.validation || [];
const reputation = otx.reputation ?? null;

return [{
  json: {
    ...original,
    otx: {
      reputation: reputation,
      pulse_count: pulseInfo.count ?? 0,
      sections: otx.sections || [],
      validation: validation,
      false_positive: otx.false_positive || []
    }
  }
}];


