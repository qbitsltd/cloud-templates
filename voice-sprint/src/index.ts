import { Hono } from "hono";

import { voiceSprintHtml } from "./frontend";

type Env = {
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_VALIDATE_URL: string;
  SUPERTONIC_BASE_URL: string;
};

type SynthesisRequest = {
  text: string;
  voice?: string;
  lang?: string;
  speed?: number;
  steps?: number;
};

const app = new Hono<{ Bindings: Env }>();

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

function normalizeRequest(payload: SynthesisRequest) {
  const text = payload.text?.trim();
  if (!text) {
    return { error: "Text is required." };
  }

  return {
    text,
    voice: payload.voice?.trim() || "M1",
    lang: payload.lang?.trim() || "na",
    speed: payload.speed ?? 1.05,
    steps: payload.steps ?? 8,
  };
}

function buildUpstreamUrl(baseUrl: string) {
  return new URL("/v1/tts", baseUrl).toString();
}

app.get("/", (c) => c.html(voiceSprintHtml));

app.post("/synthesize", async (c) => {
  const validationError = await validateQbits(c);
  if (validationError) return validationError;

  const normalized = normalizeRequest(await c.req.json<SynthesisRequest>());
  if ("error" in normalized) {
    return c.json(normalized, 400);
  }

  const upstreamResponse = await fetch(buildUpstreamUrl(c.env.SUPERTONIC_BASE_URL), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      text: normalized.text,
      voice: normalized.voice,
      lang: normalized.lang,
      steps: normalized.steps,
      speed: normalized.speed,
      response_format: "wav",
    }),
  });

  if (!upstreamResponse.ok) {
    const errorText = await upstreamResponse.text();

    return new Response(
      JSON.stringify({
        error: "Supertonic synthesis failed.",
        details: errorText || "Upstream server returned an error.",
      }),
      {
        status: upstreamResponse.status,
        headers: { "content-type": "application/json" },
      },
    );
  }

  const audioBytes = await upstreamResponse.arrayBuffer();
  const responseHeaders = new Headers();
  const contentType = upstreamResponse.headers.get("content-type") || "audio/wav";

  responseHeaders.set("content-type", contentType);

  for (const headerName of ["x-audio-duration", "x-sample-rate", "x-supertonic-version"]) {
    const headerValue = upstreamResponse.headers.get(headerName);
    if (headerValue) {
      responseHeaders.set(headerName, headerValue);
    }
  }

  return new Response(audioBytes, {
    status: 200,
    headers: responseHeaders,
  });
});

export default app;
