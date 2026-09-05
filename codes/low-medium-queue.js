const input = $input.first().json;

return [{
  json: {
    ...input,
    queue: {
      status: "QUEUED",
      priority: input.risk?.severity || "MEDIUM",
      action: "Analyst review or auto-close based on policy"
    }
  }
}];

/**What it does:** Takes the risk result and puts the alert into a **queue** for LOW/MEDIUM cases. It marks it as `QUEUED`, sets the priority based on the severity, and says the alert can go for **analyst review or auto-close depending on the policy**.
