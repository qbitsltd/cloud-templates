import { Hono } from "hono";

import { studyDeskHtml } from "./frontend";

type Env = {
  AI_API_KEY: string;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  NOTES: KVNamespace;
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

  if (!response.ok) {
    return c.json({ error: "Qbits validation failed." }, 401);
  }

  const result = await response.json<{ valid?: boolean }>();
  if (!result.valid) {
    return c.json({ error: "Invalid Qbits token pair." }, 401);
  }

  return null;
}

app.get("/", (c) => c.html(studyDeskHtml));

app.post("/chat", async (c) => {
  const validationError = await validateQbits(c);
  if (validationError) return validationError;

  const { question, courseId } = await c.req.json<{
    courseId: string;
    question: string;
  }>();

  const notes = (await c.env.NOTES.get(courseId)) ?? "No notes found for this course.";

  const aiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${c.env.AI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "Answer only from the provided study notes. If notes are incomplete, say what is missing.",
        },
        {
          role: "user",
          content: `Course notes:\n${notes}\n\nStudent question: ${question}`,
        },
      ],
    }),
  });

  const payload = await aiResponse.json();

  return c.json({
    answer: payload.output_text ?? "No answer returned.",
    courseId,
  });
});

export default app;
