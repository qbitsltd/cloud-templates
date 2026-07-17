import { readFile } from "node:fs/promises";
import process from "node:process";

const installationPlaceholder = "__INSTALLATION_TOKEN__";
const operationPlaceholder = "__OPERATION_TOKEN__";

function readTomlVar(content, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = content.match(new RegExp(`^${escapedName}\\s*=\\s*"([^"]*)"`, "m"));

  return match?.[1] ?? null;
}

async function main() {
  const wranglerToml = await readFile(new URL("../wrangler.toml", import.meta.url), "utf8");

  const installationToken = readTomlVar(wranglerToml, "INSTALLATION_TOKEN");
  const operationToken = readTomlVar(wranglerToml, "OPERATION_TOKEN");
  const validateUrl = readTomlVar(wranglerToml, "QBITS_VALIDATE_URL");

  if (!installationToken || !operationToken || !validateUrl) {
    throw new Error("wrangler.toml is missing QBITS validation settings.");
  }

  if (
    installationToken === installationPlaceholder ||
    operationToken === operationPlaceholder
  ) {
    throw new Error(
      "Replace __INSTALLATION_TOKEN__ and __OPERATION_TOKEN__ in wrangler.toml before deploy.",
    );
  }

  const response = await fetch(validateUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      installationToken,
      operationToken,
    }),
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.valid) {
    throw new Error("Qbits key validation failed. Deployment stopped.");
  }

  console.log("Qbits keys validated. Continuing deploy.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Qbits deploy validation failed.");
  process.exit(1);
});
