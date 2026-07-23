export const studyDeskHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syllabus Smasher</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #08131f;
        --ink: #edf7ff;
        --muted: #9cb0c3;
        --muted-strong: #bed0df;
        --accent: #79e1c0;
        --accent-2: #89c7ff;
        --line: rgba(137, 199, 255, 0.14);
        --line-strong: rgba(121, 225, 192, 0.24);
        --surface: linear-gradient(180deg, rgba(9, 21, 37, 0.98) 0%, rgba(7, 17, 29, 0.98) 100%);
        --surface-alt: linear-gradient(180deg, rgba(17, 36, 56, 0.96) 0%, rgba(10, 23, 38, 0.98) 100%);
        --surface-soft: linear-gradient(180deg, rgba(16, 31, 49, 0.88) 0%, rgba(9, 20, 33, 0.94) 100%);
        --paper: linear-gradient(180deg, rgba(244, 250, 255, 0.98) 0%, rgba(228, 239, 247, 0.96) 100%);
        --radius-xl: 30px;
        --radius-lg: 22px;
        --radius-md: 16px;
        --shadow-lg: 0 28px 70px rgba(0, 0, 0, 0.28);
        --shadow-md: 0 18px 36px rgba(0, 0, 0, 0.2);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100dvh;
        color: var(--ink);
        font-family: "Avenir Next", "Segoe UI Variable Display", "Segoe UI", sans-serif;
        background:
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          radial-gradient(circle at top left, rgba(137, 199, 255, 0.15), transparent 24%),
          linear-gradient(180deg, #07111d 0%, #091520 100%);
        background-size: 48px 48px, 48px 48px, auto, auto;
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
        box-shadow: 0 0 0 6px rgba(121, 225, 192, 0.08);
      }

      .topnote {
        max-width: 38ch;
        font-size: 13px;
        line-height: 1.55;
        text-align: right;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.96fr);
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
        font-size: clamp(3rem, 5vw, 5.5rem);
        line-height: 0.91;
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
        border: 1px solid var(--line-strong);
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
        background: rgba(6, 16, 29, 0.72);
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

      .method-steps {
        display: grid;
        gap: 12px;
      }

      .step {
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
      }

      .step strong {
        display: block;
        margin-bottom: 8px;
        font-size: 17px;
        letter-spacing: -0.02em;
      }

      .step p {
        margin: 0;
        color: var(--muted-strong);
        line-height: 1.6;
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
        background: linear-gradient(180deg, var(--accent) 0%, rgba(121, 225, 192, 0.1) 100%);
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
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        background: rgba(4, 13, 22, 0.48);
        color: var(--ink);
        transition:
          border-color 180ms ease,
          background 180ms ease,
          box-shadow 180ms ease;
      }

      input,
      textarea {
        padding: 16px 18px;
      }

      textarea {
        min-height: 160px;
        resize: vertical;
        outline: none;
      }

      input:focus,
      textarea:focus {
        border-color: var(--line-strong);
        background: rgba(4, 13, 22, 0.72);
        box-shadow: 0 0 0 4px rgba(121, 225, 192, 0.08);
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
        color: #08151b;
        font-size: 16px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
        box-shadow:
          0 18px 40px rgba(121, 225, 192, 0.22),
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
        max-width: 48ch;
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
        box-shadow: 0 0 0 6px rgba(121, 225, 192, 0.08);
      }

      .status-pill.is-working .status-dot {
        animation: pulse 1.2s ease-in-out infinite;
      }

      .status-pill.is-error .status-dot {
        background: #ff9582;
        box-shadow: 0 0 0 6px rgba(255, 149, 130, 0.08);
      }

      .answer-panel {
        display: grid;
        gap: 18px;
      }

      .answer-card {
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        background: var(--surface-soft);
        box-shadow: var(--shadow-md);
      }

      .answer-head {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .answer-head strong {
        font-size: 16px;
      }

      .answer-head span {
        color: var(--muted);
        font-size: 13px;
      }

      .answer-sheet {
        min-height: 240px;
        margin-top: 16px;
        padding: 22px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: var(--paper);
        color: #183133;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.64),
          0 16px 28px rgba(0, 0, 0, 0.14);
        font-size: 16px;
        line-height: 1.8;
      }

      .answer-sheet.is-empty {
        display: grid;
        place-items: center;
        text-align: center;
        color: #577075;
      }

      .answer-sheet p {
        margin: 0;
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
        background: #06141d;
        color: #d9f4ec;
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
        .workbench {
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
          <span>Syllabus Smasher · Note-backed Q&A</span>
        </div>
        <div class="topnote">Ask one course question and get a note-grounded answer.</div>
      </header>

      <section class="hero">
        <article class="intro">
          <span class="eyebrow">Study retrieval</span>
          <h1>Ask your notes before you ask the internet.</h1>
          <p class="lede">Paste a course id, ask a direct question, and get a tighter revision answer.</p>

          <div class="signal-row">
            <div class="signal-chip">Course notes · edge answer</div>
            <div class="signal-copy">Built for revision, viva prep, and fast recall.</div>
          </div>
        </article>

        <article class="method">
          <div class="method-shell">
            <div class="method-header">
              <strong>How it works</strong>
              <span class="method-label">Three-step flow</span>
            </div>
            <div class="method-steps">
              <div class="step">
                <strong>Choose the course</strong>
                <p>Point the Worker at one course id or note bundle.</p>
              </div>
              <div class="step">
                <strong>Ask one hard question</strong>
                <p>Keep the question specific enough that the answer can stay grounded.</p>
              </div>
              <div class="step">
                <strong>Read the answer sheet</strong>
                <p>The main answer stays readable. Raw response stays secondary.</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="capsules">
        <div class="capsule">
          <strong>Fast revision</strong>
          <span>Built for quick prep, not long browsing.</span>
        </div>
        <div class="capsule">
          <strong>Course-specific</strong>
          <span>The answer stays tied to one note source.</span>
        </div>
        <div class="capsule">
          <strong>Readable output</strong>
          <span>The main panel shows an answer, not raw JSON.</span>
        </div>
      </section>

      <section class="workbench">
        <aside class="sidebar">
          <div class="sidebar-inner">
            <h2>Ask your notes</h2>
            <p>Enter a course id, ask a question, and run one clean retrieval pass.</p>

            <div class="divider"></div>

            <form id="rag-form" class="form">
              <div class="field">
                <label class="field-label" for="courseId">Course id</label>
                <input id="courseId" placeholder="electromagnetics-ii" value="embedded-systems" />
                <div class="field-help">Use the id that matches the notes stored in KV.</div>
              </div>

              <div class="field">
                <label class="field-label" for="question">Question</label>
                <textarea id="question" placeholder="What is the difference between polling and interrupts?"></textarea>
                <div class="field-help">Shorter questions usually produce tighter answers.</div>
              </div>

              <div class="action-area">
                <button class="submit-button" id="submit-button" type="submit">Run answer</button>
                <div class="action-note">The Worker pulls notes first, then sends the prompt to Workers AI.</div>
              </div>
            </form>
          </div>
        </aside>

        <section class="canvas">
          <div class="canvas-top">
            <div class="canvas-copy">
              <h2 class="canvas-title">Latest answer</h2>
              <p id="status">Submit a question to populate the answer sheet.</p>
            </div>
            <div class="status-pill" id="status-pill">
              <span class="status-dot"></span>
              <span id="status-text">Idle</span>
            </div>
          </div>

          <div class="answer-panel">
            <article class="answer-card">
              <div class="answer-head">
                <strong>Answer sheet</strong>
                <span>Readable output first. Debug detail second.</span>
              </div>

              <div class="answer-sheet is-empty" id="answer-output">
                Waiting for your first question.
              </div>

              <details class="raw-toggle">
                <summary>Show raw response</summary>
                <pre id="result">{ "answer": "Waiting for your question..." }</pre>
              </details>
            </article>
          </div>
        </section>
      </section>
    </main>

    <script>
      const form = document.getElementById("rag-form");
      const result = document.getElementById("result");
      const status = document.getElementById("status");
      const statusPill = document.getElementById("status-pill");
      const statusText = document.getElementById("status-text");
      const answerOutput = document.getElementById("answer-output");
      const submitButton = document.getElementById("submit-button");
      const defaultButtonLabel = "Run answer";

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

      function setAnswer(text, isEmpty) {
        answerOutput.textContent = text;
        answerOutput.classList.toggle("is-empty", Boolean(isEmpty));
      }

      function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? "Running..." : defaultButtonLabel;
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const courseIdField = document.getElementById("courseId");
        const questionField = document.getElementById("question");
        const courseId = courseIdField.value.trim();
        const question = questionField.value.trim();

        if (!courseId) {
          alert("Enter a course id before running the answer.");
          courseIdField.focus();
          return;
        }

        if (!question) {
          alert("Enter a question before running the answer.");
          questionField.focus();
          return;
        }

        setLoading(true);
        setStatus("working", "Retrieving", "Querying your notes and preparing an answer.");
        setAnswer("Searching notes…", true);
        result.textContent = '{ "loading": true }';

        const payload = {
          courseId,
          question,
        };

        try {
          const response = await fetch("/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          result.textContent = JSON.stringify(data, null, 2);

          if (!response.ok) {
            setStatus("error", "Failed", data.error || "Request failed.");
            setAnswer(data.error || "Request failed.", true);
            return;
          }

          setStatus("idle", "Complete", "Answer grounded in notes.");
          setAnswer(data.answer || "No answer returned.", false);
        } catch (error) {
          const message = error && error.message ? error.message : String(error);
          setStatus("error", "Failed", message);
          setAnswer(message, true);
          result.textContent = JSON.stringify({ error: "Request failed.", details: message }, null, 2);
        } finally {
          setLoading(false);
        }
      });
    </script>
  </body>
</html>`;
