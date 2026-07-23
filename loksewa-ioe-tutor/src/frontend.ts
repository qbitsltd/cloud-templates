export const evaluatorDeskHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loksewa / IOE Evaluator</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #180b08;
        --ink: #fff6ef;
        --muted: #d8b498;
        --muted-strong: #f2d0b3;
        --accent: #ff9f5a;
        --accent-2: #ffb878;
        --danger: #ff8e73;
        --line: rgba(255, 159, 90, 0.16);
        --surface: linear-gradient(180deg, rgba(34, 14, 10, 0.98) 0%, rgba(20, 8, 7, 0.98) 100%);
        --surface-alt: linear-gradient(180deg, rgba(56, 24, 18, 0.96) 0%, rgba(28, 12, 9, 0.98) 100%);
        --surface-soft: linear-gradient(180deg, rgba(42, 18, 13, 0.88) 0%, rgba(23, 10, 8, 0.94) 100%);
        --paper: linear-gradient(180deg, rgba(255, 248, 241, 0.98) 0%, rgba(244, 230, 220, 0.96) 100%);
        --radius-xl: 30px;
        --radius-lg: 22px;
        --radius-md: 16px;
        --shadow-lg: 0 28px 70px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 18px 36px rgba(0, 0, 0, 0.22);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100dvh;
        color: var(--ink);
        font-family: "Avenir Next", "Segoe UI Variable Display", "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top right, rgba(255, 159, 90, 0.14), transparent 22%),
          linear-gradient(180deg, #170907 0%, #120807 100%);
      }

      button, input, textarea { font: inherit; }

      .shell {
        width: min(1280px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 28px 0 44px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 22px;
        color: var(--muted);
      }

      .brandline {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .branddot {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 0 6px rgba(255, 159, 90, 0.08);
      }

      .topnote {
        max-width: 34ch;
        font-size: 13px;
        line-height: 1.55;
        text-align: right;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.02fr) minmax(340px, 0.98fr);
        gap: 20px;
        margin-bottom: 22px;
      }

      .intro,
      .method,
      .sidebar,
      .canvas,
      .capsule {
        border: 1px solid var(--line);
        box-shadow: var(--shadow-lg);
      }

      .intro,
      .method,
      .canvas {
        border-radius: var(--radius-xl);
      }

      .intro {
        padding: 30px 32px 32px;
        background: var(--surface);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        color: var(--accent);
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .eyebrow::before {
        content: "";
        width: 24px;
        height: 1px;
        background: currentColor;
      }

      h1 {
        margin: 18px 0 14px;
        max-width: 8ch;
        font-size: clamp(3rem, 5vw, 5.4rem);
        line-height: 0.9;
        letter-spacing: -0.065em;
      }

      .lede {
        max-width: 38ch;
        color: var(--muted-strong);
        font-size: 17px;
        line-height: 1.65;
      }

      .signal-row {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 28px;
        flex-wrap: wrap;
      }

      .signal-chip {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 48px;
        padding: 0 18px;
        border: 1px solid rgba(255, 184, 120, 0.26);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.03);
        font-size: 14px;
      }

      .signal-chip::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--accent);
      }

      .signal-copy {
        color: var(--muted);
        font-size: 14px;
      }

      .method {
        padding: 22px;
        background: var(--surface-alt);
      }

      .method-shell {
        height: 100%;
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 24px;
        background: rgba(22, 9, 8, 0.72);
      }

      .method-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
      }

      .method-label {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .scoreband {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .scorecell {
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
      }

      .scorecell strong {
        display: block;
        margin-bottom: 8px;
        font-size: 19px;
        letter-spacing: -0.03em;
      }

      .scorecell p {
        margin: 0;
        color: var(--muted-strong);
        line-height: 1.55;
      }

      .capsules {
        display: flex;
        gap: 12px;
        margin-bottom: 22px;
        flex-wrap: wrap;
      }

      .capsule {
        min-width: 220px;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.025);
      }

      .capsule strong {
        display: block;
        margin-bottom: 6px;
        font-size: 15px;
      }

      .capsule span {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      .workbench {
        display: grid;
        grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
        gap: 18px;
      }

      .sidebar {
        position: sticky;
        top: 18px;
        overflow: hidden;
        border-radius: 24px;
        background: var(--surface-alt);
      }

      .sidebar::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: 5px;
        background: linear-gradient(180deg, var(--accent) 0%, rgba(255, 159, 90, 0.1) 100%);
      }

      .sidebar-inner {
        position: relative;
        padding: 24px 24px 22px 26px;
      }

      .sidebar h2,
      .canvas-title {
        margin: 0;
        font-size: clamp(1.9rem, 2.1vw, 2.5rem);
        letter-spacing: -0.045em;
      }

      .sidebar p {
        margin: 12px 0 0;
        color: var(--muted-strong);
        line-height: 1.62;
      }

      .divider {
        height: 1px;
        margin: 22px 0;
        background: rgba(255, 255, 255, 0.08);
      }

      .form {
        display: grid;
        gap: 18px;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      .field-label {
        color: var(--ink);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.09em;
        text-transform: uppercase;
      }

      .field-help {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      input,
      textarea {
        width: 100%;
        padding: 16px 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        background: rgba(18, 7, 7, 0.5);
        color: var(--ink);
        transition:
          border-color 180ms ease,
          background 180ms ease,
          box-shadow 180ms ease;
      }

      textarea {
        min-height: 176px;
        resize: vertical;
        outline: none;
      }

      input:focus,
      textarea:focus {
        border-color: rgba(255, 184, 120, 0.28);
        background: rgba(18, 7, 7, 0.72);
        box-shadow: 0 0 0 4px rgba(255, 159, 90, 0.08);
        outline: none;
      }

      .action-area {
        display: grid;
        gap: 12px;
      }

      .submit-button {
        min-height: 56px;
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 999px;
        color: #230e09;
        font-size: 16px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
        box-shadow:
          0 18px 40px rgba(255, 159, 90, 0.22),
          inset 0 1px 0 rgba(255, 255, 255, 0.48);
        cursor: pointer;
        transition:
          transform 180ms ease,
          box-shadow 180ms ease,
          opacity 180ms ease;
      }

      .submit-button:hover {
        transform: translateY(-2px);
      }

      .submit-button:active {
        transform: translateY(0) scale(0.985);
      }

      .submit-button:disabled {
        opacity: 0.72;
        cursor: wait;
      }

      .action-note {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      .canvas {
        padding: 24px;
        background: var(--surface);
      }

      .canvas-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 18px;
      }

      .canvas-copy p {
        margin: 10px 0 0;
        max-width: 46ch;
        color: var(--muted-strong);
        line-height: 1.62;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 42px;
        padding: 0 14px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.03);
        color: var(--muted-strong);
        font-size: 13px;
        white-space: nowrap;
      }

      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 0 6px rgba(255, 159, 90, 0.08);
      }

      .status-pill.is-working .status-dot {
        animation: pulse 1.2s ease-in-out infinite;
      }

      .status-pill.is-error .status-dot {
        background: var(--danger);
        box-shadow: 0 0 0 6px rgba(255, 142, 115, 0.08);
      }

      .result-stack {
        display: grid;
        grid-template-columns: 240px minmax(0, 1fr);
        gap: 18px;
      }

      .score-card,
      .verdict-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        box-shadow: var(--shadow-md);
      }

      .score-card {
        display: grid;
        gap: 12px;
        align-content: start;
        padding: 18px;
        background: var(--surface-alt);
      }

      .score-card strong {
        font-size: 15px;
        color: var(--muted-strong);
      }

      .score-value {
        display: grid;
        place-items: center;
        min-height: 180px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.03);
      }

      .score-number {
        font-size: clamp(3rem, 6vw, 4.8rem);
        font-weight: 800;
        letter-spacing: -0.06em;
      }

      .score-caption {
        color: var(--muted);
        font-size: 13px;
      }

      .verdict-card {
        padding: 18px;
        background: var(--surface-soft);
      }

      .verdict-head {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .verdict-head strong {
        font-size: 16px;
      }

      .verdict-head span {
        color: var(--muted);
        font-size: 13px;
      }

      .verdict-sheet {
        min-height: 280px;
        margin-top: 16px;
        padding: 22px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: var(--paper);
        color: #3b1f18;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.62),
          0 16px 28px rgba(0, 0, 0, 0.14);
      }

      .verdict-sheet.is-empty {
        display: grid;
        place-items: center;
        text-align: center;
        color: #7d655c;
      }

      .verdict-title {
        margin: 0 0 12px;
        font-size: 22px;
        line-height: 1.3;
        letter-spacing: -0.03em;
      }

      .feedback-grid {
        display: grid;
        gap: 16px;
        margin-top: 18px;
      }

      .feedback-block strong {
        display: block;
        margin-bottom: 8px;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .feedback-block ul {
        margin: 0;
        padding-left: 20px;
        line-height: 1.7;
      }

      .raw-toggle {
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      summary {
        cursor: pointer;
        list-style: none;
        color: var(--ink);
        font-size: 14px;
        font-weight: 700;
      }

      summary::-webkit-details-marker { display: none; }

      summary::after {
        content: "View";
        margin-left: 10px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      pre {
        margin: 14px 0 0;
        padding: 16px;
        overflow: auto;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: #130907;
        color: #ffd5bf;
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        font-size: 12px;
        line-height: 1.6;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.55; transform: scale(0.82); }
      }

      @media (max-width: 1100px) {
        .hero,
        .workbench,
        .result-stack,
        .scoreband {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
        }
      }

      @media (max-width: 760px) {
        .shell {
          width: min(100vw - 20px, 1280px);
          padding: 18px 0 28px;
        }

        .topbar,
        .canvas-top {
          flex-direction: column;
          align-items: flex-start;
        }

        .topnote { text-align: left; }

        h1 {
          font-size: clamp(2.6rem, 13vw, 4.2rem);
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brandline">
          <span class="branddot"></span>
          <span>Loksewa / IOE Evaluator · Structured scoring</span>
        </div>
        <div class="topnote">Score one technical answer and return machine-safe feedback.</div>
      </header>

      <section class="hero">
        <article class="intro">
          <span class="eyebrow">Exam evaluator</span>
          <h1>Score technical answers with structured feedback.</h1>
          <p class="lede">Built for prep flows where the answer needs a score, a verdict, and clear next-step notes.</p>

          <div class="signal-row">
            <div class="signal-chip">0-10 scoring · strict JSON</div>
            <div class="signal-copy">Made for study trackers, coaching flows, and exam prep dashboards.</div>
          </div>
        </article>

        <article class="method">
          <div class="method-shell">
            <div class="method-header">
              <strong>Evaluation model</strong>
              <span class="method-label">Scoring frame</span>
            </div>
            <div class="scoreband">
              <div class="scorecell">
                <strong>Score</strong>
                <p>Returns a single 0-10 mark.</p>
              </div>
              <div class="scorecell">
                <strong>Strengths</strong>
                <p>Shows what the answer already does well.</p>
              </div>
              <div class="scorecell">
                <strong>Improvements</strong>
                <p>Shows what needs to be corrected or added.</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="capsules">
        <div class="capsule">
          <strong>Exam-first</strong>
          <span>Designed for technical prep, not casual chat.</span>
        </div>
        <div class="capsule">
          <strong>Structured output</strong>
          <span>Every response stays usable in UI and storage.</span>
        </div>
        <div class="capsule">
          <strong>Actionable feedback</strong>
          <span>The student sees what landed and what still needs work.</span>
        </div>
      </section>

      <section class="workbench">
        <aside class="sidebar">
          <div class="sidebar-inner">
            <h2>Evaluate an answer</h2>
            <p>Paste the question, add the candidate answer, and run one strict evaluation.</p>

            <div class="divider"></div>

            <form id="eval-form" class="form">
              <div class="field">
                <label class="field-label" for="question">Question</label>
                <input id="question" value="Explain the OSI model and why layering matters." />
                <div class="field-help">Keep the question specific enough to score against.</div>
              </div>

              <div class="field">
                <label class="field-label" for="answer">Candidate answer</label>
                <textarea id="answer" placeholder="Write the technical answer here..."></textarea>
                <div class="field-help">Paste the student's answer exactly as written.</div>
              </div>

              <div class="action-area">
                <button class="submit-button" id="submit-button" type="submit">Score answer</button>
                <div class="action-note">The Worker returns a strict JSON evaluation before the UI formats it.</div>
              </div>
            </form>
          </div>
        </aside>

        <section class="canvas">
          <div class="canvas-top">
            <div class="canvas-copy">
              <h2 class="canvas-title">Structured result</h2>
              <p id="status">Submit an answer to populate the score card and verdict sheet.</p>
            </div>
            <div class="status-pill" id="status-pill">
              <span class="status-dot"></span>
              <span id="status-text">Idle</span>
            </div>
          </div>

          <div class="result-stack">
            <article class="score-card">
              <strong>Score</strong>
              <div class="score-value">
                <div>
                  <div class="score-number" id="score-value">--</div>
                  <div class="score-caption">Out of 10</div>
                </div>
              </div>
            </article>

            <article class="verdict-card">
              <div class="verdict-head">
                <strong>Verdict</strong>
                <span>Readable feedback first. Raw response second.</span>
              </div>

              <div class="verdict-sheet is-empty" id="verdict-output">
                Waiting for your first evaluation.
              </div>

              <details class="raw-toggle">
                <summary>Show raw response</summary>
                <pre id="result">{ "score": null, "verdict": "Waiting for submission." }</pre>
              </details>
            </article>
          </div>
        </section>
      </section>
    </main>

    <script>
      const form = document.getElementById("eval-form");
      const result = document.getElementById("result");
      const status = document.getElementById("status");
      const statusPill = document.getElementById("status-pill");
      const statusText = document.getElementById("status-text");
      const verdictOutput = document.getElementById("verdict-output");
      const scoreValue = document.getElementById("score-value");
      const submitButton = document.getElementById("submit-button");
      const defaultButtonLabel = "Score answer";

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      }

      function setStatus(mode, label, description) {
        statusText.textContent = label;
        status.textContent = description;
        statusPill.classList.remove("is-working", "is-error");

        if (mode === "working") {
          statusPill.classList.add("is-working");
        }

        if (mode === "error") {
          statusPill.classList.add("is-error");
        }
      }

      function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? "Scoring..." : defaultButtonLabel;
      }

      function resetVerdict(text, isEmpty) {
        verdictOutput.classList.toggle("is-empty", Boolean(isEmpty));
        verdictOutput.innerHTML = isEmpty ? escapeHtml(text) : text;
      }

      function renderVerdict(data) {
        const strengths = Array.isArray(data.strengths) ? data.strengths : [];
        const improvements = Array.isArray(data.improvements) ? data.improvements : [];

        return [
          '<h3 class="verdict-title">' + escapeHtml(data.verdict || "No verdict returned.") + '</h3>',
          '<div class="feedback-grid">',
          '  <div class="feedback-block">',
          '    <strong>Strengths</strong>',
          '    <ul>' + strengths.map((item) => '<li>' + escapeHtml(item) + '</li>').join("") + '</ul>',
          '  </div>',
          '  <div class="feedback-block">',
          '    <strong>Improvements</strong>',
          '    <ul>' + improvements.map((item) => '<li>' + escapeHtml(item) + '</li>').join("") + '</ul>',
          '  </div>',
          '</div>',
        ].join("");
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const questionField = document.getElementById("question");
        const answerField = document.getElementById("answer");
        const question = questionField.value.trim();
        const answer = answerField.value.trim();

        if (!question) {
          alert("Enter a question before scoring the answer.");
          questionField.focus();
          return;
        }

        if (!answer) {
          alert("Enter a candidate answer before scoring.");
          answerField.focus();
          return;
        }

        setLoading(true);
        setStatus("working", "Scoring", "Evaluating the submitted answer.");
        scoreValue.textContent = "--";
        resetVerdict("Scoring response…", true);
        result.textContent = '{ "loading": true }';

        const payload = {
          question,
          answer,
        };

        try {
          const response = await fetch("/evaluate", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          result.textContent = JSON.stringify(data, null, 2);

          if (!response.ok) {
            setStatus("error", "Failed", data.error || "Evaluation failed.");
            resetVerdict(data.error || "Evaluation failed.", true);
            return;
          }

          scoreValue.textContent = typeof data.score === "number" ? String(data.score) : "--";
          resetVerdict(renderVerdict(data), false);
          setStatus("idle", "Complete", "Structured evaluation complete.");
        } catch (error) {
          const message = error && error.message ? error.message : String(error);
          setStatus("error", "Failed", message);
          resetVerdict(message, true);
          result.textContent = JSON.stringify({ error: "Evaluation failed.", details: message }, null, 2);
        } finally {
          setLoading(false);
        }
      });
    </script>
  </body>
</html>`;
