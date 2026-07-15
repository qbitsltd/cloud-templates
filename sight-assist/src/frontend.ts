export const sightAssistHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sight Assist</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #041318;
        --surface: rgba(6, 30, 39, 0.82);
        --surface-soft: rgba(7, 40, 50, 0.7);
        --text: #ecfeff;
        --muted: #9dd7de;
        --line: rgba(125, 211, 252, 0.16);
        --accent: #67e8f9;
        --accent-2: #34d399;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Satoshi", "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top right, rgba(52, 211, 153, 0.14), transparent 28%),
          radial-gradient(circle at top left, rgba(103, 232, 249, 0.2), transparent 22%),
          linear-gradient(180deg, #041318 0%, #061e27 100%);
      }

      .shell {
        width: min(1180px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 32px 0 48px;
      }

      .hero {
        display: grid;
        gap: 24px;
        padding: 28px;
        border: 1px solid var(--line);
        border-radius: 30px;
        background: linear-gradient(180deg, rgba(6, 30, 39, 0.95), rgba(6, 30, 39, 0.72));
        box-shadow: 0 28px 90px rgba(1, 8, 11, 0.4);
      }

      .eyebrow {
        color: var(--accent);
        font-size: 11px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 10.5ch;
        font-size: clamp(3rem, 7vw, 5.8rem);
        line-height: 0.93;
        letter-spacing: -0.05em;
      }

      .lede {
        margin: 0;
        max-width: 58ch;
        color: var(--muted);
        line-height: 1.7;
      }

      .layout {
        display: grid;
        gap: 18px;
        grid-template-columns: 0.9fr 1.1fr;
      }

      .card, .preview {
        border: 1px solid var(--line);
        border-radius: 24px;
        background: var(--surface);
        padding: 22px;
      }

      .insights {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(3, 1fr);
      }

      .insight {
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: var(--surface-soft);
      }

      .insight strong {
        display: block;
        margin-bottom: 8px;
        font-size: 20px;
      }

      .insight span {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.6;
      }

      p {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      form {
        display: grid;
        gap: 14px;
        margin-top: 20px;
      }

      label {
        display: grid;
        gap: 8px;
        font-size: 13px;
      }

      input, textarea, button {
        border: 0;
        border-radius: 18px;
        font: inherit;
      }

      input, textarea {
        width: 100%;
        padding: 15px 18px;
        color: var(--text);
        background: rgba(2, 12, 17, 0.86);
        outline: 1px solid rgba(125, 211, 252, 0.16);
      }

      textarea {
        min-height: 140px;
        resize: vertical;
      }

      button {
        justify-self: start;
        padding: 14px 22px;
        color: #041318;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
        cursor: pointer;
      }

      .preview-box {
        display: grid;
        place-items: center;
        min-height: 220px;
        margin-top: 16px;
        border: 1px dashed rgba(125, 211, 252, 0.24);
        border-radius: 22px;
        background:
          linear-gradient(135deg, rgba(103, 232, 249, 0.08), rgba(52, 211, 153, 0.06));
      }

      img {
        max-width: 100%;
        max-height: 260px;
        border-radius: 18px;
      }

      pre {
        margin: 16px 0 0;
        padding: 18px;
        overflow: auto;
        border-radius: 18px;
        color: #ccfbf1;
        background: rgba(2, 12, 17, 0.88);
      }

      @media (max-width: 980px) {
        .layout, .insights { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">Vision endpoint starter</span>
        <h1>Upload an image and return accessible scene analysis instantly.</h1>
        <p class="lede">
          Designed for assistive workflows, classroom prototypes, and multimodal
          demos that need a clean interface as much as a reliable API.
        </p>

        <div class="insights">
          <div class="insight">
            <strong>Base64 in</strong>
            <span>No storage layer required for a first release.</span>
          </div>
          <div class="insight">
            <strong>Vision out</strong>
            <span>Short, useful text built for real frontend display.</span>
          </div>
          <div class="insight">
            <strong>Token gate</strong>
            <span>Qbits validation runs before image analysis begins.</span>
          </div>
        </div>

        <div class="layout">
          <div class="card">
            <h2>Analyze image</h2>
            <p>Pick a file, preview it, and send the base64 payload to the Worker.</p>
            <form id="vision-form">
              <label>
                Prompt
                <input id="prompt" value="Describe the image and mention anything useful for accessibility." />
              </label>
              <label>
                Image file
                <input id="image" accept="image/*" type="file" />
              </label>
              <button type="submit">Inspect image</button>
            </form>
          </div>

          <div class="preview">
            <h2>Live preview</h2>
            <p id="status">Select an image to render the preview and API result here.</p>
            <div class="preview-box" id="preview-box">No image selected yet.</div>
            <pre id="result">{ "analysis": "Waiting for an image..." }</pre>
          </div>
        </div>
      </section>
    </main>

    <script>
      const form = document.getElementById("vision-form");
      const imageInput = document.getElementById("image");
      const previewBox = document.getElementById("preview-box");
      const result = document.getElementById("result");
      const status = document.getElementById("status");

      function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      imageInput.addEventListener("change", async () => {
        const file = imageInput.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        previewBox.innerHTML = "<img alt=\"Preview\" src=\"" + url + "\" />";
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const file = imageInput.files[0];

        if (!file) {
          status.textContent = "Choose an image before submitting.";
          return;
        }

        status.textContent = "Running multimodal analysis...";
        result.textContent = "{ \"loading\": true }";

        const payload = {
          base64Image: await readFileAsBase64(file),
          prompt: document.getElementById("prompt").value,
        };

        const response = await fetch("/analyze-image", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        status.textContent = response.ok ? "Analysis complete." : "Analysis failed.";
        result.textContent = JSON.stringify(data, null, 2);
      });
    </script>
  </body>
</html>`;
