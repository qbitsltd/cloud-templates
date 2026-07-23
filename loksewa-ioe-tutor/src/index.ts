import { Hono } from "hono";

import { evaluatorDeskHtml } from "./frontend";

type Env = {
  AI: Ai;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_SKIP_VALIDATION?: string;
  QBITS_VALIDATE_URL: string;
  RUNS: KVNamespace;
};

const app = new Hono<{ Bindings: Env }>();

const examScoreSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    score: { type: "number", minimum: 0, maximum: 10 },
    strengths: {
      type: "array",
      items: { type: "string" },
    },
    improvements: {
      type: "array",
      items: { type: "string" },
    },
    verdict: { type: "string" },
  },
  required: ["score", "strengths", "improvements", "verdict"],
} as const;

function extractStructuredResult(result: unknown) {
  if (!result || typeof result !== "object") {
    return null;
  }

  if ("response" in result && typeof result.response === "object" && result.response !== null) {
    return result.response;
  }

  if ("response" in result && typeof result.response === "string") {
    try {
      return JSON.parse(result.response);
    } catch {
      return null;
    }
  }

  return null;
}

function shouldSkipValidation(env: Env) {
  return env.QBITS_SKIP_VALIDATION === "true";
}

function createRunId() {
  return `loksewa-ioe-tutor:${Date.now()}:${crypto.randomUUID()}`;
}

async function persistRun(env: Env, runId: string, payload: Record<string, unknown>) {
  try {
    await env.RUNS.put(
      runId,
      JSON.stringify({
        runId,
        savedAt: new Date().toISOString(),
        ...payload,
      }),
    );
  } catch (error) {
    console.error("Failed to persist Loksewa / IOE Tutor run", error);
  }
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

app.get("/", (c) => c.html(evaluatorDeskHtml));

app.post("/evaluate", async (c) => {
  const validationError = await validateQbits(c);
  if (validationError) return validationError;

  const { answer, question } = await c.req.json<{
    answer: string;
    question: string;
  }>();

  const aiResponse = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
    messages: [
      {
        role: "system",
        content:
          "You are a strict Nepali technical exam evaluator. Score from 0 to 10 only. Return valid JSON only.",
      },
      {
        role: "user",
        content: `Question: ${question}\n\nCandidate answer: ${answer}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: examScoreSchema,
    },
  });
  const structured = extractStructuredResult(aiResponse);
  const runId = createRunId();

  if (!structured) {
    await persistRun(c.env, runId, {
      template: "loksewa-ioe-tutor",
      success: false,
      request: {
        question,
        answer,
      },
      response: {
        error: "Workers AI did not return valid evaluation JSON.",
      },
    });

    return c.json(
      {
        error: "Workers AI did not return valid evaluation JSON.",
        runId,
      },
      502,
    );
  }

  await persistRun(c.env, runId, {
    template: "loksewa-ioe-tutor",
    success: true,
    request: {
      question,
      answer,
    },
    response: structured,
  });

  return c.json({
    ...structured,
    runId,
  });
});

export default app;
