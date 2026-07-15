import { Hono } from "hono";

import { sightAssistHtml } from "./frontend";

type Env = {
  AI_API_KEY: string;
  INSTALLATION_TOKEN: string;
  OPERATION_TOKEN: string;
  QBITS_VALIDATE_URL: string;
  MAX_IMAGE_BYTES: string;
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
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                prompt ??
                "Describe the image clearly, identify notable objects, and mention anything useful for accessibility.",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64Image}`,
            },
          ],
        },
      ],
    }),
  });

  const payload = await aiResponse.json();

  return c.json({
    analysis: payload.output_text ?? "No analysis returned.",
  });
});

export default app;
