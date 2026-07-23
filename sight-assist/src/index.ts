import { Hono } from "hono";

import { sightAssistHtml } from "./frontend";

type Env = {
  AI: Ai;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_SKIP_VALIDATION?: string;
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

function formatErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown Workers AI error.";
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`Workers AI request timed out after ${timeoutMs}ms.`));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function shouldSkipValidation(env: Env) {
  return env.QBITS_SKIP_VALIDATION === "true";
}

async function validateQbits(c: any) {
  if (shouldSkipValidation(c.env)) {
    return null;
  }

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

  try {
    const aiResponse = await withTimeout(
      c.env.AI.run("@cf/llava-hf/llava-1.5-7b-hf", {
        image: Array.from(Uint8Array.from(atob(base64Image), (char) => char.charCodeAt(0))),
        prompt:
          prompt ??
          "Describe the image clearly, identify notable objects, and mention anything useful for accessibility.",
      }),
      30000,
    );

    return c.json({
      analysis: extractText(aiResponse) ?? aiResponse.description ?? "No analysis returned.",
    });
  } catch (error) {
    return c.json(
      {
        error: "Image analysis failed.",
        details: formatErrorMessage(error),
      },
      502,
    );
  }
});

export default app;
