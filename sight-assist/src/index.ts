import { Hono } from "hono";

import { sightAssistHtml } from "./frontend";

type Env = {
  AI: Ai;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_VALIDATE_URL: string;
  MAX_IMAGE_BYTES: string;
};

const app = new Hono<{ Bindings: Env }>();

function extractText(result: unknown): string | null {
  if (!result || typeof result !== "object") {
    return null;
  }

  if ("response" in result && typeof result.response === "string") {
    return result.response;
  }

  if ("result" in result && typeof result.result === "string") {
    return result.result;
  }

  return null;
}

async function validateQbits(c: any) {
  const response = await fetch(c.env.QBITS_VALIDATE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      installationToken: c.env.INSTALLATION_TOKEN,
      operationToken: c.env.OPERATION_TOKEN,
    }),
  });

  const result = await response.json<{ valid?: boolean }>();
  if (!response.ok || !result.valid) {
    return c.json({ error: "Qbits validation failed." }, 401);
  }

  return null;
}

app.get("/", (c) => c.html(sightAssistHtml));

app.post("/analyze-image", async (c) => {
  const validationError = await validateQbits(c);
  if (validationError) return validationError;

  const { base64Image, prompt } = await c.req.json<{
    base64Image: string;
    prompt?: string;
  }>();

  const imageBytes = Math.ceil((base64Image.length * 3) / 4);
  if (imageBytes > Number(c.env.MAX_IMAGE_BYTES)) {
    return c.json({ error: "Image is too large." }, 413);
  }

  const aiResponse = await c.env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
    messages: [
      {
        role: "system",
        content:
          "Describe images clearly and mention anything useful for accessibility.",
      },
      {
        role: "user",
        content:
          prompt ??
          "Describe the image clearly, identify notable objects, and mention anything useful for accessibility.",
      },
    ],
    image: `data:image/png;base64,${base64Image}`,
  });

  return c.json({
    analysis: extractText(aiResponse) ?? "No analysis returned.",
  });
});

export default app;
