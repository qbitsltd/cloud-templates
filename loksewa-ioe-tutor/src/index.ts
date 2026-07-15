import { Hono } from "hono";

import { evaluatorDeskHtml } from "./frontend";

type Env = {
  AI_API_KEY: string;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_VALIDATE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

async function validateQbits(c: Parameters<typeof app.post>[1] extends never ? never : any) {
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

  const aiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${c.env.AI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      text: {
        format: {
          type: "json_schema",
          name: "exam_score",
          strict: true,
          schema: {
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
          },
        },
      },
      input: [
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
    }),
  });

  const payload = await aiResponse.json();
  const rawText = payload.output_text ?? "{}";

  return c.json(JSON.parse(rawText));
});

export default app;
