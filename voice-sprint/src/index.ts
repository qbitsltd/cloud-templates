import { Hono } from "hono";

import { voiceSprintHtml } from "./frontend";

const voiceCatalog = {
  en: {
    model: "@cf/deepgram/aura-2-en",
    defaultSpeaker: "luna",
    speakers: [
      "luna",
      "athena",
      "hera",
      "orion",
      "apollo",
      "atlas",
      "iris",
      "juno",
    ],
  },
  es: {
    model: "@cf/deepgram/aura-2-es",
    defaultSpeaker: "aquila",
    speakers: [
      "aquila",
      "celeste",
      "diana",
      "estrella",
      "javier",
      "selena",
      "alvaro",
      "sirio",
    ],
  },
} as const;

type VoiceLocale = keyof typeof voiceCatalog;
type EnSpeaker = NonNullable<Ai_Cf_Deepgram_Aura_2_En_Input["speaker"]>;
type EsSpeaker = NonNullable<Ai_Cf_Deepgram_Aura_2_Es_Input["speaker"]>;
type NormalizedRequest =
  | {
      text: string;
      locale: "en";
      speaker: EnSpeaker;
      model: "@cf/deepgram/aura-2-en";
    }
  | {
      text: string;
      locale: "es";
      speaker: EsSpeaker;
      model: "@cf/deepgram/aura-2-es";
    };

type Env = {
  AI: Ai;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_VALIDATE_URL: string;
};

type SynthesisRequest = {
  text: string;
  speaker?: string;
  locale?: VoiceLocale;
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

  if (payload.locale === "es") {
    const speaker = voiceCatalog.es.speakers.some((candidate) => candidate === payload.speaker)
      ? (payload.speaker as EsSpeaker)
      : voiceCatalog.es.defaultSpeaker;

    return {
      text,
      locale: "es",
      speaker,
      model: voiceCatalog.es.model,
    } satisfies NormalizedRequest;
  }

  const speaker = voiceCatalog.en.speakers.some((candidate) => candidate === payload.speaker)
    ? (payload.speaker as EnSpeaker)
    : voiceCatalog.en.defaultSpeaker;

  return {
    text,
    locale: "en",
    speaker,
    model: voiceCatalog.en.model,
  } satisfies NormalizedRequest;
}

function decodeBase64Audio(base64Audio: string) {
  const binary = atob(base64Audio);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

app.get("/", (c) => c.html(voiceSprintHtml));

app.post("/synthesize", async (c) => {
  const validationError = await validateQbits(c);
  if (validationError) return validationError;

  const normalized = normalizeRequest(await c.req.json<SynthesisRequest>());
  if ("error" in normalized) {
    return c.json(normalized, 400);
  }

  const audioBase64 =
    normalized.locale === "es"
      ? await c.env.AI.run("@cf/deepgram/aura-2-es", {
          text: normalized.text,
          speaker: normalized.speaker,
          encoding: "mp3",
        })
      : await c.env.AI.run("@cf/deepgram/aura-2-en", {
          text: normalized.text,
          speaker: normalized.speaker,
          encoding: "mp3",
        });
  const audioBytes = decodeBase64Audio(audioBase64);
  const responseHeaders = new Headers();
  responseHeaders.set("content-type", "audio/mpeg");
  responseHeaders.set("x-voice-locale", normalized.locale);
  responseHeaders.set("x-voice-speaker", normalized.speaker);
  responseHeaders.set("x-voice-model", normalized.model);
  responseHeaders.set("x-audio-format", "mp3");

  return new Response(audioBytes, {
    status: 200,
    headers: responseHeaders,
  });
});

export default app;
