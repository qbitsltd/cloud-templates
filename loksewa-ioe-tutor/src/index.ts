import { Hono } from "hono";

import { evaluatorDeskHtml } from "./frontend";

type Env = {
  AI: Ai;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_VALIDATE_URL: string;
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

  if (!structured) {
    return c.json({ error: "Workers AI did not return valid evaluation JSON." }, 502);
  }

  return c.json(structured);
});

export default app;
