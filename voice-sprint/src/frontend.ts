export const voiceSprintHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VoiceSprint</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #140913;
        --ink: #fff6fa;
        --muted: #d3b5c3;
        --muted-strong: #f1d7dd;
        --accent: #ff93b8;
        --accent-2: #ffd474;
        --line: rgba(255, 202, 225, 0.14);
        --line-strong: rgba(255, 202, 225, 0.28);
        --surface: linear-gradient(180deg, rgba(31, 11, 29, 0.98) 0%, rgba(19, 7, 18, 0.98) 100%);
        --surface-alt: linear-gradient(180deg, rgba(46, 19, 41, 0.96) 0%, rgba(23, 10, 22, 0.98) 100%);
        --surface-soft: linear-gradient(180deg, rgba(41, 18, 37, 0.88) 0%, rgba(21, 9, 20, 0.94) 100%);
        --paper: linear-gradient(180deg, rgba(255, 248, 243, 0.98) 0%, rgba(247, 235, 227, 0.96) 100%);
        --danger: #ff9c8c;
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
          radial-gradient(circle at top left, rgba(255, 147, 184, 0.14), transparent 22%),
          radial-gradient(circle at top right, rgba(255, 212, 116, 0.12), transparent 24%),
          linear-gradient(180deg, #140913 0%, #1c0d1b 100%);
      }

      button, input, select, textarea { font: inherit; }

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
        box-shadow: 0 0 0 6px rgba(255, 147, 184, 0.08);
      }

      .topnote {
        max-width: 34ch;
        font-size: 13px;
        line-height: 1.55;
        text-align: right;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.04fr) minmax(340px, 0.96fr);
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
        color: var(--accent-2);
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
        background: rgba(21, 9, 20, 0.72);
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

      .voice-list {
        display: grid;
        gap: 12px;
      }

      .voice-row {
        display: grid;
        grid-template-columns: 92px minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
      }

      .voice-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 36px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.06);
        color: var(--ink);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .voice-row strong {
        display: block;
        margin-bottom: 8px;
        font-size: 17px;
      }

      .voice-row p {
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
        background: linear-gradient(180deg, var(--accent) 0%, rgba(255, 147, 184, 0.1) 100%);
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

      textarea,
      select,
      input {
        width: 100%;
        padding: 16px 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 18px;
        background: rgba(17, 6, 17, 0.5);
        color: var(--ink);
        transition:
          border-color 180ms ease,
          background 180ms ease,
          box-shadow 180ms ease;
      }

      textarea {
        min-height: 188px;
        resize: vertical;
        outline: none;
      }

      textarea:focus,
      select:focus,
      input:focus {
        border-color: var(--line-strong);
        background: rgba(17, 6, 17, 0.72);
        box-shadow: 0 0 0 4px rgba(255, 147, 184, 0.08);
        outline: none;
      }

      input[disabled] {
        color: var(--muted-strong);
        opacity: 0.85;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
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
        color: #230d1d;
        font-size: 16px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
        box-shadow:
          0 18px 40px rgba(255, 147, 184, 0.22),
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
        box-shadow: 0 0 0 6px rgba(255, 147, 184, 0.08);
      }

      .player-panel {
        display: grid;
        gap: 18px;
      }

      .audio-card,
      .meta-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        box-shadow: var(--shadow-md);
      }

      .audio-card {
        padding: 18px;
        background: var(--surface-soft);
      }

      .audio-head,
      .meta-head {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .audio-head strong,
      .meta-head strong {
        font-size: 16px;
      }

      .audio-head span,
      .meta-head span {
        color: var(--muted);
        font-size: 13px;
      }

      .audio-stage {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }

      .wave-panel {
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background:
          radial-gradient(circle at top, rgba(255, 147, 184, 0.16), transparent 24%),
          linear-gradient(180deg, rgba(26, 8, 24, 0.96) 0%, rgba(16, 6, 16, 0.98) 100%);
      }

      .bars {
        display: grid;
        grid-template-columns: repeat(20, minmax(0, 1fr));
        gap: 8px;
        align-items: end;
        height: 120px;
      }

      .bar {
        border-radius: 999px;
        background: linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 100%);
        opacity: 0.9;
      }

      .audio-card audio {
        width: 100%;
      }

      .meta-card {
        padding: 18px;
        background: var(--paper);
        color: #3b222d;
      }

      .stat-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 16px;
      }

      .stat {
        padding: 14px;
        border: 1px solid rgba(59, 34, 45, 0.1);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.45);
      }

      .stat strong {
        display: block;
        margin-bottom: 6px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .stat span {
        font-size: 15px;
        line-height: 1.5;
      }

      .raw-toggle {
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid rgba(59, 34, 45, 0.12);
      }

      summary {
        cursor: pointer;
        list-style: none;
        color: #3b222d;
        font-size: 14px;
        font-weight: 700;
      }

      summary::-webkit-details-marker { display: none; }

      summary::after {
        content: "View";
        margin-left: 10px;
        color: #7f6470;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      pre {
        margin: 14px 0 0;
        padding: 16px;
        overflow: auto;
        border: 1px solid rgba(59, 34, 45, 0.12);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.5);
        color: #4e2d37;
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        font-size: 12px;
        line-height: 1.6;
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

        .grid,
        .stat-grid {
          grid-template-columns: 1fr;
        }

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
          <span>VoiceSprint · Native speech preview</span>
        </div>
        <div class="topnote">Generate one short voice preview from the Worker and play it back instantly.</div>
      </header>

      <section class="hero">
        <article class="intro">
          <span class="eyebrow">Text to speech</span>
          <h1>Turn text into a quick voice preview.</h1>
          <p class="lede">Pick a language, choose a speaker, and generate one playable draft without a separate speech stack.</p>

          <div class="signal-row">
            <div class="signal-chip">Workers AI · native MP3 output</div>
            <div class="signal-copy">Built for short previews, accessibility drafts, and script checks.</div>
          </div>
        </article>

        <article class="method">
          <div class="method-shell">
            <div class="method-header">
              <strong>Voice catalog</strong>
              <span class="method-label">Supported presets</span>
            </div>
            <div class="voice-list">
              <div class="voice-row">
                <div class="voice-tag">English</div>
                <div>
                  <strong>General narration</strong>
                  <p>Pick from the English speaker set for explainers, app copy, and short lesson reads.</p>
                </div>
              </div>
              <div class="voice-row">
                <div class="voice-tag">Spanish</div>
                <div>
                  <strong>Parallel preview</strong>
                  <p>Switch to the Spanish speaker set without changing the rest of the flow.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="capsules">
        <div class="capsule">
          <strong>Native output</strong>
          <span>No extra speech server or sidecar service.</span>
        </div>
        <div class="capsule">
          <strong>Short path</strong>
          <span>Write, generate, listen, and adjust.</span>
        </div>
        <div class="capsule">
          <strong>Readable metadata</strong>
          <span>Format, voice, and duration stay visible.</span>
        </div>
      </section>

      <section class="workbench">
        <aside class="sidebar">
          <div class="sidebar-inner">
            <h2>Create a preview</h2>
            <p>Paste the script, choose a voice, and run one synthesis request.</p>

            <div class="divider"></div>

            <form id="tts-form" class="form">
              <div class="field">
                <label class="field-label" for="text">Script</label>
                <textarea id="text">VoiceSprint turns product copy, lesson content, and support text into fast, private audio your team can review in seconds.</textarea>
                <div class="field-help">Shorter scripts render faster and make comparison easier.</div>
              </div>

              <div class="grid">
                <div class="field">
                  <label class="field-label" for="locale">Language</label>
                  <select id="locale">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>

                <div class="field">
                  <label class="field-label" for="speaker">Speaker</label>
                  <select id="speaker"></select>
                </div>

                <div class="field" style="grid-column: 1 / -1;">
                  <label class="field-label">Output</label>
                  <input value="MP3 · native Workers AI output" disabled />
                </div>
              </div>

              <div class="action-area">
                <button class="submit-button" id="submit-button" type="submit">Generate preview</button>
                <div class="action-note">The Worker returns audio bytes directly from Workers AI.</div>
              </div>
            </form>
          </div>
        </aside>

        <section class="canvas">
          <div class="canvas-top">
            <div class="canvas-copy">
              <h2 class="canvas-title">Preview player</h2>
              <p id="status">Generate a clip to populate the playback stage and metadata panel.</p>
            </div>
            <div class="status-pill" id="pill">
              <span class="status-dot"></span>
              <span id="pill-text">Idle</span>
            </div>
          </div>

          <div class="player-panel">
            <article class="audio-card">
              <div class="audio-head">
                <strong>Audio stage</strong>
                <span>Listen first, inspect metadata second.</span>
              </div>

              <div class="audio-stage">
                <div class="wave-panel">
                  <div class="bars">
                    <span class="bar" style="height: 24%"></span>
                    <span class="bar" style="height: 36%"></span>
                    <span class="bar" style="height: 52%"></span>
                    <span class="bar" style="height: 28%"></span>
                    <span class="bar" style="height: 72%"></span>
                    <span class="bar" style="height: 44%"></span>
                    <span class="bar" style="height: 66%"></span>
                    <span class="bar" style="height: 34%"></span>
                    <span class="bar" style="height: 58%"></span>
                    <span class="bar" style="height: 84%"></span>
                    <span class="bar" style="height: 61%"></span>
                    <span class="bar" style="height: 32%"></span>
                    <span class="bar" style="height: 78%"></span>
                    <span class="bar" style="height: 42%"></span>
                    <span class="bar" style="height: 69%"></span>
                    <span class="bar" style="height: 30%"></span>
                    <span class="bar" style="height: 47%"></span>
                    <span class="bar" style="height: 74%"></span>
                    <span class="bar" style="height: 38%"></span>
                    <span class="bar" style="height: 56%"></span>
                  </div>
                </div>

                <audio id="audio" controls></audio>
              </div>
            </article>

            <article class="meta-card">
              <div class="meta-head">
                <strong>Clip details</strong>
                <span>Keep the generated file easy to compare.</span>
              </div>

              <div class="stat-grid">
                <div class="stat">
                  <strong>Format</strong>
                  <span id="format">Waiting for preview…</span>
                </div>
                <div class="stat">
                  <strong>Duration</strong>
                  <span id="duration">Unavailable</span>
                </div>
                <div class="stat">
                  <strong>Speaker</strong>
                  <span id="speaker-meta">Waiting for preview…</span>
                </div>
                <div class="stat">
                  <strong>Locale</strong>
                  <span id="locale-meta">Waiting for preview…</span>
                </div>
              </div>

              <details class="raw-toggle">
                <summary>Show raw response</summary>
                <pre id="result">{ "audio": "Waiting for your first preview..." }</pre>
              </details>
            </article>
          </div>
        </section>
      </section>
    </main>

    <script>
      const form = document.getElementById("tts-form");
      const audio = document.getElementById("audio");
      const status = document.getElementById("status");
      const pill = document.getElementById("pill");
      const pillText = document.getElementById("pill-text");
      const format = document.getElementById("format");
      const duration = document.getElementById("duration");
      const speakerMeta = document.getElementById("speaker-meta");
      const localeMeta = document.getElementById("locale-meta");
      const result = document.getElementById("result");
      const locale = document.getElementById("locale");
      const speaker = document.getElementById("speaker");
      const submitButton = document.getElementById("submit-button");
      const defaultButtonLabel = "Generate preview";

      const voiceCatalog = {
        en: ["luna", "athena", "hera", "orion", "apollo", "atlas", "iris", "juno"],
        es: ["aquila", "celeste", "diana", "estrella", "javier", "selena", "alvaro", "sirio"],
      };

      let activeUrl = null;

      function syncSpeakerOptions() {
        const selectedLocale = locale.value;
        const speakers = voiceCatalog[selectedLocale] || voiceCatalog.en;
        const previousSpeaker = speaker.value;

        speaker.innerHTML = speakers
          .map((voiceName) => '<option value="' + voiceName + '">' + voiceName + "</option>")
          .join("");

        if (speakers.includes(previousSpeaker)) {
          speaker.value = previousSpeaker;
        }
      }

      function waitForMetadata() {
        return new Promise((resolve) => {
          if (audio.readyState >= 1) {
            resolve();
            return;
          }

          audio.onloadedmetadata = () => resolve();
        });
      }

      function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? "Generating..." : defaultButtonLabel;
      }

      function setStatus(mode, label, description) {
        pillText.textContent = label;
        status.textContent = description;
        pill.classList.remove("is-working", "is-error");

        if (mode === "working") {
          pill.classList.add("is-working");
        }

        if (mode === "error") {
          pill.classList.add("is-error");
        }
      }

      syncSpeakerOptions();
      locale.addEventListener("change", syncSpeakerOptions);

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const textField = document.getElementById("text");
        const text = textField.value.trim();
        if (!text) {
          alert("Enter a script before generating a preview.");
          textField.focus();
          return;
        }

        if (activeUrl) {
          URL.revokeObjectURL(activeUrl);
          activeUrl = null;
        }

        setLoading(true);
        setStatus("working", "Generating", "Generating your voice preview.");
        result.textContent = '{ "loading": true }';

        const payload = {
          text,
          locale: locale.value,
          speaker: speaker.value,
        };

        try {
          const response = await fetch("/synthesize", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const data = await response.json().catch(() => ({ error: "Synthesis failed." }));
            setStatus("error", "Failed", data.error || "The preview could not be generated.");
            format.textContent = "No audio returned.";
            duration.textContent = "Unavailable";
            speakerMeta.textContent = "Unavailable";
            localeMeta.textContent = "Unavailable";
            result.textContent = JSON.stringify(data, null, 2);
            return;
          }

          const blob = await response.blob();
          activeUrl = URL.createObjectURL(blob);
          audio.src = activeUrl;
          audio.load();
          await waitForMetadata();

          const responseFormat = response.headers.get("content-type") || "audio/mpeg";
          const voiceModel = response.headers.get("x-voice-model") || "Unknown";
          const voiceLocale = response.headers.get("x-voice-locale") || payload.locale;
          const voiceSpeaker = response.headers.get("x-voice-speaker") || payload.speaker;
          const audioFormat = response.headers.get("x-audio-format") || "mp3";
          const audioDuration =
            Number.isFinite(audio.duration) && audio.duration > 0
              ? audio.duration.toFixed(1) + " sec"
              : "Unavailable";

          setStatus("idle", "Ready", "Your preview is ready to play.");
          format.textContent = audioFormat.toUpperCase() + " via " + voiceModel;
          duration.textContent = audioDuration;
          speakerMeta.textContent = voiceSpeaker;
          localeMeta.textContent = voiceLocale.toUpperCase();
          result.textContent = JSON.stringify({
            ok: true,
            locale: voiceLocale,
            speaker: voiceSpeaker,
            model: voiceModel,
            format: audioFormat,
            contentType: responseFormat,
            durationSeconds: audio.duration,
          }, null, 2);
        } catch (error) {
          const message = error && error.message ? error.message : String(error);
          setStatus("error", "Failed", message);
          format.textContent = "No audio returned.";
          duration.textContent = "Unavailable";
          speakerMeta.textContent = "Unavailable";
          localeMeta.textContent = "Unavailable";
          result.textContent = JSON.stringify({ error: "Synthesis failed.", details: message }, null, 2);
        } finally {
          setLoading(false);
        }
      });
    </script>
  </body>
</html>`;
