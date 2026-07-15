export const evaluatorDeskHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loksewa / IOE Evaluator</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #170b07;
        --surface: rgba(37, 17, 11, 0.78);
        --card: rgba(57, 27, 20, 0.82);
        --text: #fff7ed;
        --muted: #fdba74;
        --line: rgba(251, 146, 60, 0.18);
        --accent: #fb923c;
        --accent-2: #f97316;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top right, rgba(249, 115, 22, 0.18), transparent 30%),
          linear-gradient(160deg, #170b07 0%, #25110b 55%, #10090a 100%);
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
        background: linear-gradient(180deg, rgba(37, 17, 11, 0.96), rgba(37, 17, 11, 0.72));
        box-shadow: 0 28px 90px rgba(0, 0, 0, 0.34);
      }

      .flag {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 11px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--muted);
      }

      .flag::before {
        content: "";
        width: 14px;
        height: 14px;
        border-radius: 999px;
        background: linear-gradient(135deg, #ef4444, #fb923c);
      }

      .layout {
        display: grid;
        gap: 18px;
        grid-template-columns: 0.92fr 1.08fr;
      }

      .card, .result-card, .mini {
        border: 1px solid var(--line);
        border-radius: 24px;
        background: var(--surface);
      }

      .card, .result-card {
        padding: 24px;
      }

      .mini-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(3, 1fr);
      }

      .mini {
        padding: 18px;
        background: var(--card);
      }

      .mini strong {
        display: block;
        margin-bottom: 10px;
        font-size: 22px;
      }

      .mini span {
        color: #fed7aa;
        font-size: 13px;
        line-height: 1.6;
      }

      h1 {
        margin: 0;
        max-width: 10ch;
        font-size: clamp(3rem, 7vw, 5.6rem);
        line-height: 0.93;
        letter-spacing: -0.05em;
      }

      p {
        margin: 0;
        color: #fdba74;
        line-height: 1.7;
      }

      form {
        display: grid;
        gap: 14px;
        margin-top: 22px;
      }

      label {
        display: grid;
        gap: 8px;
        color: #fed7aa;
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
        background: rgba(19, 9, 7, 0.9);
        outline: 1px solid rgba(251, 146, 60, 0.18);
      }

      textarea {
        min-height: 172px;
        resize: vertical;
      }

      button {
        justify-self: start;
        padding: 14px 22px;
        color: #180b07;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, #fdba74 100%);
        cursor: pointer;
      }

      pre {
        margin: 18px 0 0;
        padding: 18px;
        overflow: auto;
        border-radius: 18px;
        color: #fed7aa;
        background: rgba(19, 9, 7, 0.88);
      }

      @media (max-width: 980px) {
        .layout, .mini-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="flag">Exam-ready evaluator</span>
        <h1>Score technical answers with strict structured feedback.</h1>
        <p>
          Built for Loksewa and IOE-style prep flows where every answer needs a score,
          strengths, and improvement notes in predictable JSON.
        </p>

        <div class="mini-grid">
          <div class="mini">
            <strong>0-10</strong>
            <span>Strict scoring with no vague answer mode.</span>
          </div>
          <div class="mini">
            <strong>JSON</strong>
            <span>Ready for dashboards, mobile apps, and study trackers.</span>
          </div>
          <div class="mini">
            <strong>Guarded</strong>
            <span>Qbits validation completes before evaluation starts.</span>
          </div>
        </div>

        <div class="layout">
          <div class="card">
            <h2>Evaluation request</h2>
            <p>Paste the question, then the student answer, and receive strict output.</p>
            <form id="eval-form">
              <label>
                Question
                <input id="question" value="Explain the OSI model and why layering matters." />
              </label>
              <label>
                Candidate answer
                <textarea id="answer" placeholder="Write the technical answer here..."></textarea>
              </label>
              <button type="submit">Score answer</button>
            </form>
          </div>

          <div class="result-card">
            <h2>Structured result</h2>
            <p id="status">The response below stays machine-safe and ready for UI rendering.</p>
            <pre id="result">{ "score": null, "verdict": "Waiting for submission." }</pre>
          </div>
        </div>
      </section>
    </main>

    <script>
      const form = document.getElementById("eval-form");
      const result = document.getElementById("result");
      const status = document.getElementById("status");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        status.textContent = "Scoring response...";
        result.textContent = "{ \"loading\": true }";

        const payload = {
          question: document.getElementById("question").value,
          answer: document.getElementById("answer").value,
        };

        const response = await fetch("/evaluate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        status.textContent = response.ok ? "Structured evaluation complete." : "Evaluation failed.";
        result.textContent = JSON.stringify(data, null, 2);
      });
    </script>
  </body>
</html>`;
