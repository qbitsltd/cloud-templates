export const studyDeskHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syllabus Smasher</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111f;
        --surface: rgba(9, 19, 33, 0.78);
        --surface-strong: #101d30;
        --text: #eff6ff;
        --muted: #9fb2c9;
        --line: rgba(154, 173, 196, 0.18);
        --accent: #63e6be;
        --accent-2: #7dd3fc;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(125, 211, 252, 0.22), transparent 26%),
          radial-gradient(circle at bottom right, rgba(99, 230, 190, 0.16), transparent 28%),
          linear-gradient(180deg, #07111f 0%, #0d1726 100%);
      }

      .shell {
        width: min(1120px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 32px 0 48px;
      }

      .hero {
        display: grid;
        gap: 24px;
        padding: 28px;
        border: 1px solid var(--line);
        border-radius: 28px;
        background: linear-gradient(180deg, rgba(9, 19, 33, 0.94), rgba(9, 19, 33, 0.7));
        box-shadow: 0 24px 80px rgba(2, 8, 23, 0.38);
      }

      .eyebrow {
        color: var(--accent);
        font-family: "IBM Plex Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 12ch;
        font-size: clamp(3rem, 7vw, 6rem);
        line-height: 0.92;
        letter-spacing: -0.05em;
      }

      .lede {
        margin: 0;
        max-width: 60ch;
        color: var(--muted);
        font-size: 18px;
        line-height: 1.7;
      }

      .hero-grid {
        display: grid;
        gap: 18px;
        grid-template-columns: 1.2fr 0.8fr;
      }

      .panel, .metric, .chat-card {
        border: 1px solid var(--line);
        border-radius: 24px;
        background: var(--surface);
        backdrop-filter: blur(14px);
      }

      .panel {
        padding: 24px;
      }

      .metric-stack {
        display: grid;
        gap: 16px;
      }

      .metric {
        padding: 18px 20px;
      }

      .metric strong {
        display: block;
        margin-bottom: 6px;
        font-size: 28px;
      }

      .metric span {
        color: var(--muted);
        font-size: 14px;
      }

      form {
        display: grid;
        gap: 16px;
        margin-top: 24px;
      }

      label {
        display: grid;
        gap: 8px;
        color: var(--muted);
        font-size: 13px;
      }

      input, textarea, button {
        border: 0;
        border-radius: 18px;
        font: inherit;
      }

      input, textarea {
        width: 100%;
        padding: 16px 18px;
        color: var(--text);
        background: rgba(3, 10, 20, 0.66);
        outline: 1px solid rgba(154, 173, 196, 0.14);
      }

      textarea {
        min-height: 156px;
        resize: vertical;
      }

      button {
        justify-self: start;
        padding: 14px 20px;
        color: #041017;
        font-weight: 700;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
        cursor: pointer;
      }

      .chat-card {
        padding: 20px;
      }

      .chat-card h2, .panel h2 {
        margin: 0 0 10px;
        font-size: 24px;
      }

      .chat-card p, .panel p {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      pre {
        margin: 18px 0 0;
        padding: 18px;
        overflow: auto;
        border-radius: 18px;
        color: #d9f99d;
        background: rgba(3, 10, 20, 0.72);
      }

      @media (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">Study Retrieval Studio</span>
        <h1>Turn semester notes into a living revision desk.</h1>
        <p class="lede">
          Paste a course id, ask a hard question, and get an answer grounded in your
          own notes instead of generic exam fluff.
        </p>

        <div class="hero-grid">
          <div class="panel">
            <h2>Ask your notes</h2>
            <p>Great for lab prep, viva revision, and last-minute concept recall.</p>

            <form id="rag-form">
              <label>
                Course ID
                <input id="courseId" placeholder="electromagnetics-ii" value="embedded-systems" />
              </label>
              <label>
                Question
                <textarea id="question" placeholder="What is the difference between polling and interrupts?"></textarea>
              </label>
              <button type="submit">Run note-backed answer</button>
            </form>
          </div>

          <div class="metric-stack">
            <div class="metric">
              <strong>Edge-first</strong>
              <span>Low-latency study support from a single Worker route.</span>
            </div>
            <div class="metric">
              <strong>Qbits-guarded</strong>
              <span>Validation runs before any AI request is made.</span>
            </div>
            <div class="chat-card">
              <h2>Latest answer</h2>
              <p id="status">Submit a question to render the API response here.</p>
              <pre id="result">{ "answer": "Waiting for your question..." }</pre>
            </div>
          </div>
        </div>
      </section>
    </main>

    <script>
      const form = document.getElementById("rag-form");
      const result = document.getElementById("result");
      const status = document.getElementById("status");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "Querying your notes at the edge...";
        result.textContent = "{ \"loading\": true }";

        const payload = {
          courseId: document.getElementById("courseId").value,
          question: document.getElementById("question").value,
        };

        const response = await fetch("/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        status.textContent = response.ok ? "Answer grounded in notes." : "Request failed.";
        result.textContent = JSON.stringify(data, null, 2);
      });
    </script>
  </body>
</html>`;
