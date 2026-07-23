export const sightAssistHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sight Assist</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07171b;
        --bg-deep: #051015;
        --panel: rgba(9, 29, 35, 0.88);
        --panel-strong: rgba(8, 24, 29, 0.96);
        --panel-soft: rgba(13, 41, 47, 0.72);
        --line: rgba(143, 226, 206, 0.14);
        --line-strong: rgba(143, 226, 206, 0.26);
        --text: #f1fbf8;
        --muted: #92b9b0;
        --soft: #b7d1ca;
        --accent: #8fe2ce;
        --accent-strong: #66d5bd;
        --danger: #ff8f7a;
        --shadow: 0 28px 80px rgba(1, 7, 9, 0.34);
        --radius-xl: 28px;
        --radius-lg: 22px;
        --radius-md: 16px;
        --radius-sm: 12px;
      }

      * {
        box-sizing: border-box;
      }

      html {
        background:
          radial-gradient(circle at 0% 0%, rgba(143, 226, 206, 0.12), transparent 24%),
          radial-gradient(circle at 100% 0%, rgba(75, 162, 145, 0.14), transparent 26%),
          linear-gradient(180deg, #061216 0%, #07171b 100%);
      }

      body {
        margin: 0;
        min-height: 100dvh;
        color: var(--text);
        font-family: "Avenir Next", "Segoe UI Variable Display", "Segoe UI", sans-serif;
        background:
          linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
          linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
          radial-gradient(circle at top, rgba(143, 226, 206, 0.12), transparent 36%),
          linear-gradient(180deg, #07171b 0%, #061317 100%);
        background-size: 40px 40px, 40px 40px, auto, auto;
        background-position: center;
      }

      button,
      input,
      textarea {
        font: inherit;
      }

      .shell {
        width: min(1320px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 24px 0 40px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 22px;
        padding: 8px 2px;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        color: var(--soft);
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .brand-mark {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 0 6px rgba(143, 226, 206, 0.08);
      }

      .topbar-note {
        color: var(--muted);
        font-size: 13px;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.06fr) minmax(320px, 0.94fr);
        gap: 22px;
        margin-bottom: 18px;
      }

      .hero-copy,
      .hero-stage,
      .control-card,
      .stage-card,
      .metric {
        border: 1px solid var(--line);
        background: linear-gradient(180deg, var(--panel) 0%, var(--panel-strong) 100%);
        box-shadow: var(--shadow);
      }

      .hero-copy,
      .hero-stage,
      .stage-card {
        border-radius: var(--radius-xl);
      }

      .hero-copy {
        padding: 28px 30px 30px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--accent);
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        font-size: 11px;
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
        max-width: 9ch;
        font-size: clamp(3rem, 5vw, 5.8rem);
        line-height: 0.92;
        letter-spacing: -0.06em;
      }

      .lede {
        max-width: 42ch;
        color: var(--soft);
        font-size: 17px;
        line-height: 1.65;
      }

      .hero-actions {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 26px;
      }

      .hero-chip {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 48px;
        padding: 0 18px;
        border: 1px solid var(--line-strong);
        border-radius: 999px;
        color: var(--text);
        background: rgba(255, 255, 255, 0.03);
        font-size: 14px;
      }

      .hero-chip-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: var(--accent);
      }

      .hero-meta {
        color: var(--muted);
        font-size: 14px;
      }

      .hero-stage {
        position: relative;
        overflow: hidden;
        padding: 22px;
      }

      .hero-stage::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 18% 24%, rgba(143, 226, 206, 0.18), transparent 24%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.02), transparent 48%);
        pointer-events: none;
      }

      .stage-window {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 18px;
        height: 100%;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 24px;
        background:
          linear-gradient(180deg, rgba(8, 24, 29, 0.94), rgba(8, 24, 29, 0.72));
      }

      .window-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }

      .window-dots {
        display: flex;
        gap: 7px;
      }

      .window-dots span {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.2);
      }

      .window-label {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .sample-figure {
        display: grid;
        grid-template-columns: 180px minmax(0, 1fr);
        gap: 18px;
        align-items: center;
        min-height: 210px;
      }

      .sample-image {
        display: grid;
        place-items: center;
        aspect-ratio: 1;
        border-radius: 22px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(245, 248, 247, 0.88));
      }

      .sample-image img {
        width: 100%;
        max-width: 116px;
        height: auto;
      }

      .sample-copy h2,
      .stage-head h2,
      .result-card h3,
      .control-card h2 {
        margin: 0;
        letter-spacing: -0.03em;
      }

      .sample-copy h2 {
        font-size: clamp(1.45rem, 2vw, 2rem);
      }

      .sample-copy p {
        margin: 10px 0 0;
        color: var(--muted);
        line-height: 1.65;
      }

      .sample-points {
        display: grid;
        gap: 10px;
        padding: 0;
        margin: 16px 0 0;
        list-style: none;
      }

      .sample-points li {
        color: var(--soft);
        font-size: 14px;
        line-height: 1.5;
      }

      .sample-points li::before {
        content: "•";
        display: inline-block;
        width: 1em;
        color: var(--accent);
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 22px;
      }

      .metric {
        border-radius: var(--radius-md);
        padding: 18px 20px;
      }

      .metric-label {
        display: block;
        margin-bottom: 8px;
        color: var(--text);
        font-size: 15px;
        font-weight: 700;
      }

      .metric-copy {
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .workspace {
        display: grid;
        grid-template-columns: minmax(290px, 360px) minmax(0, 1fr);
        gap: 18px;
        align-items: start;
      }

      .control-card {
        position: sticky;
        top: 20px;
        border-radius: var(--radius-lg);
        padding: 24px;
      }

      .control-card h2 {
        font-size: 1.8rem;
        margin-bottom: 10px;
      }

      .control-card p {
        color: var(--muted);
        line-height: 1.65;
      }

      .control-form {
        display: grid;
        gap: 16px;
        margin-top: 24px;
      }

      .input-block {
        display: grid;
        gap: 8px;
      }

      .input-label {
        color: var(--soft);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .input-help {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      textarea,
      .file-trigger {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.03);
        color: var(--text);
        transition:
          border-color 180ms ease,
          transform 180ms ease,
          background 180ms ease,
          box-shadow 180ms ease;
      }

      textarea {
        min-height: 132px;
        padding: 16px 18px;
        resize: vertical;
        outline: none;
      }

      textarea:focus {
        border-color: var(--line-strong);
        background: rgba(255, 255, 255, 0.04);
        box-shadow: 0 0 0 4px rgba(143, 226, 206, 0.08);
      }

      .file-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      .file-trigger {
        display: grid;
        gap: 8px;
        padding: 18px;
        cursor: pointer;
      }

      .file-trigger:hover,
      .file-trigger.is-active {
        border-color: var(--line-strong);
        transform: translateY(-1px);
        background: rgba(143, 226, 206, 0.06);
      }

      .file-title {
        color: var(--text);
        font-size: 15px;
        font-weight: 700;
      }

      .file-meta {
        color: var(--muted);
        font-size: 13px;
      }

      .action-row {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 4px;
      }

      .analyze-button {
        min-width: 168px;
        min-height: 54px;
        padding: 0 22px;
        border: 0;
        border-radius: 999px;
        color: #062126;
        font-size: 15px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        box-shadow: 0 18px 42px rgba(102, 213, 189, 0.24);
        cursor: pointer;
        transition:
          transform 180ms ease,
          box-shadow 180ms ease,
          opacity 180ms ease;
      }

      .analyze-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 22px 48px rgba(102, 213, 189, 0.28);
      }

      .analyze-button:active {
        transform: translateY(0) scale(0.985);
      }

      .analyze-button:disabled {
        opacity: 0.66;
        cursor: wait;
      }

      .micro-copy {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      .stage-card {
        padding: 22px;
      }

      .stage-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 18px;
      }

      .stage-head h2 {
        font-size: clamp(1.7rem, 2vw, 2.15rem);
      }

      .stage-head p {
        margin-top: 8px;
        color: var(--muted);
        line-height: 1.65;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 42px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--soft);
        background: rgba(255, 255, 255, 0.03);
        font-size: 13px;
        white-space: nowrap;
      }

      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 0 6px rgba(143, 226, 206, 0.08);
      }

      .status-pill.is-working .status-dot {
        animation: pulse 1.2s ease-in-out infinite;
      }

      .status-pill.is-error .status-dot {
        background: var(--danger);
        box-shadow: 0 0 0 6px rgba(255, 143, 122, 0.08);
      }

      .stage-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.06fr) minmax(300px, 0.94fr);
        gap: 16px;
      }

      .preview-card,
      .result-card {
        min-height: 100%;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        background: linear-gradient(180deg, rgba(12, 37, 43, 0.9), rgba(8, 24, 29, 0.92));
      }

      .preview-card {
        display: grid;
        grid-template-rows: auto minmax(360px, 1fr);
        gap: 14px;
      }

      .card-kicker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        color: var(--soft);
      }

      .card-kicker strong {
        font-size: 16px;
      }

      .card-kicker span {
        color: var(--muted);
        font-size: 13px;
      }

      .preview-box {
        position: relative;
        display: grid;
        place-items: center;
        overflow: hidden;
        min-height: 360px;
        border: 1px solid rgba(143, 226, 206, 0.12);
        border-radius: 18px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.018), rgba(255, 255, 255, 0.01)),
          radial-gradient(circle at 50% 0%, rgba(143, 226, 206, 0.12), transparent 35%),
          #0c252b;
      }

      .preview-box.is-loading::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.05) 50%,
          transparent 100%
        );
        animation: shimmer 1.4s linear infinite;
      }

      .preview-box img {
        max-width: calc(100% - 48px);
        max-height: calc(100% - 48px);
        object-fit: contain;
        border-radius: 18px;
        box-shadow: 0 24px 54px rgba(0, 0, 0, 0.24);
      }

      .placeholder {
        display: grid;
        gap: 12px;
        justify-items: center;
        max-width: 28ch;
        padding: 24px;
        text-align: center;
      }

      .placeholder-frame {
        width: 82px;
        height: 82px;
        border: 1px solid rgba(143, 226, 206, 0.22);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.03);
      }

      .placeholder strong {
        font-size: 1.05rem;
      }

      .placeholder p {
        color: var(--muted);
        line-height: 1.65;
      }

      .result-card {
        display: grid;
        gap: 18px;
      }

      .result-card h3 {
        font-size: 1.35rem;
      }

      .result-summary {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .analysis-output {
        min-height: 176px;
        padding: 20px;
        border: 1px solid rgba(143, 226, 206, 0.12);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.025);
        color: var(--soft);
        font-size: 16px;
        line-height: 1.75;
      }

      .analysis-output.is-empty {
        display: grid;
        place-items: center;
        text-align: center;
        color: var(--muted);
      }

      .raw-toggle {
        border-top: 1px solid var(--line);
        padding-top: 14px;
      }

      summary {
        cursor: pointer;
        color: var(--soft);
        font-size: 14px;
        font-weight: 700;
      }

      pre {
        margin: 14px 0 0;
        padding: 16px;
        overflow: auto;
        border-radius: 16px;
        color: #d8f7ee;
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        font-size: 12px;
        line-height: 1.6;
        background: #07161a;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }

        50% {
          opacity: 0.56;
          transform: scale(0.82);
        }
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }

        100% {
          transform: translateX(100%);
        }
      }

      @media (max-width: 1100px) {
        .hero,
        .workspace,
        .stage-grid,
        .metrics,
        .sample-figure {
          grid-template-columns: 1fr;
        }

        .control-card {
          position: static;
        }

        h1 {
          max-width: 10ch;
        }
      }

      @media (max-width: 720px) {
        .shell {
          width: min(100vw - 20px, 1320px);
          padding: 18px 0 28px;
        }

        .topbar,
        .stage-head,
        .hero-actions,
        .card-kicker {
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-copy,
        .hero-stage,
        .control-card,
        .stage-card,
        .metric {
          border-radius: 22px;
        }

        .hero-copy,
        .hero-stage,
        .control-card,
        .stage-card {
          padding-left: 18px;
          padding-right: 18px;
        }

        h1 {
          font-size: clamp(2.5rem, 13vw, 4.1rem);
        }

        .preview-box {
          min-height: 280px;
        }

        .action-row {
          flex-direction: column;
          align-items: stretch;
        }

        .analyze-button {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-mark"></span>
          <span>Sight Assist · Vision endpoint starter</span>
        </div>
        <div class="topbar-note">Readable scene notes for demos, assistive workflows, and rapid image QA.</div>
      </header>

      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">Multimodal image reading</span>
          <h1>Readable scene notes for any uploaded image.</h1>
          <p class="lede">
            A cleaner vision surface for prototypes that need a quick preview, a grounded analysis,
            and a result panel that feels usable instead of improvised.
          </p>

          <div class="hero-actions">
            <div class="hero-chip">
              <span class="hero-chip-dot"></span>
              <span>Base64 upload · edge response</span>
            </div>
            <div class="hero-meta">Built for fast inspection, accessible descriptions, and small demo flows.</div>
          </div>
        </div>

        <div class="hero-stage">
          <div class="stage-window">
            <div class="window-bar">
              <div class="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="window-label">Example reading surface</div>
            </div>

            <div class="sample-figure">
              <div class="sample-image">
                <img
                  src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=480&q=80"
                  alt="Sample camera and desk setup"
                />
              </div>
              <div class="sample-copy">
                <h2>What the result should feel like</h2>
                <p>
                  Short, useful, and easy to scan. The interface should make preview, status, and
                  output read like one workflow.
                </p>
                <ul class="sample-points">
                  <li>Preview stays prominent while the request is running.</li>
                  <li>Analysis reads like product copy, not raw debug text.</li>
                  <li>Errors stay visible in context instead of breaking the page.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="metrics">
        <article class="metric">
          <span class="metric-label">Focused hierarchy</span>
          <div class="metric-copy">Compact framing at the top, controls on the left, preview and result on the right.</div>
        </article>
        <article class="metric">
          <span class="metric-label">Responsive workflow</span>
          <div class="metric-copy">The layout collapses cleanly on mobile without leaving the preview or controls stranded.</div>
        </article>
        <article class="metric">
          <span class="metric-label">Honest states</span>
          <div class="metric-copy">Loading, success, and failure all have visible, contextual feedback instead of silent stalls.</div>
        </article>
      </section>

      <section class="workspace">
        <aside class="control-card">
          <h2>Inspect an image</h2>
          <p>Set the prompt, choose a file, and run one clean pass through the Worker.</p>

          <form id="vision-form" class="control-form">
            <div class="input-block">
              <label class="input-label" for="prompt">Prompt</label>
              <textarea id="prompt">Describe the image clearly, identify notable objects, and mention anything useful for accessibility.</textarea>
              <div class="input-help">Keep the instruction specific if you want product, document, or scene-focused output.</div>
            </div>

            <div class="input-block">
              <span class="input-label">Image file</span>
              <label class="file-trigger" id="file-trigger" for="image">
                <span class="file-title" id="file-title">Choose an image to preview</span>
                <span class="file-meta" id="file-meta">PNG, JPG, WEBP and similar formats work best.</span>
              </label>
              <input class="file-input" id="image" accept="image/*" type="file" />
            </div>

            <div class="action-row">
              <button class="analyze-button" id="analyze-button" type="button">Inspect image</button>
              <div class="micro-copy">The request is sent from this page to the Worker, then to Workers AI.</div>
            </div>
          </form>
        </aside>

        <section class="stage-card">
          <div class="stage-head">
            <div>
              <h2>Preview and output</h2>
              <p id="status">Choose an image to populate the preview surface and the latest analysis panel.</p>
            </div>
            <div class="status-pill" id="status-pill">
              <span class="status-dot"></span>
              <span id="status-text">Idle</span>
            </div>
          </div>

          <div class="stage-grid">
            <article class="preview-card">
              <div class="card-kicker">
                <div>
                  <strong>Live preview</strong>
                  <span>The selected image stays visible while analysis is running.</span>
                </div>
              </div>

              <div class="preview-box" id="preview-box">
                <div class="placeholder" id="preview-placeholder">
                  <div class="placeholder-frame"></div>
                  <strong>No image loaded yet</strong>
                  <p>Pick a file from the left panel to populate this canvas before you run inspection.</p>
                </div>
              </div>
            </article>

            <article class="result-card">
              <div>
                <h3>Latest analysis</h3>
                <p class="result-summary">Readable output should land here in plain language, with raw response details available below only when needed.</p>
              </div>

              <div class="analysis-output is-empty" id="analysis-output">
                Waiting for your first image analysis.
              </div>

              <details class="raw-toggle">
                <summary>Show raw response</summary>
                <pre id="result">{ "analysis": "Waiting for an image..." }</pre>
              </details>
            </article>
          </div>
        </section>
      </section>
    </main>

    <script>
      const form = document.getElementById("vision-form");
      const imageInput = document.getElementById("image");
      const analyzeButton = document.getElementById("analyze-button");
      const previewBox = document.getElementById("preview-box");
      const previewPlaceholder = document.getElementById("preview-placeholder");
      const result = document.getElementById("result");
      const analysisOutput = document.getElementById("analysis-output");
      const status = document.getElementById("status");
      const statusPill = document.getElementById("status-pill");
      const statusText = document.getElementById("status-text");
      const fileTrigger = document.getElementById("file-trigger");
      const fileTitle = document.getElementById("file-title");
      const fileMeta = document.getElementById("file-meta");

      let activeUrl = null;

      function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      function resetPreview() {
        if (activeUrl) {
          URL.revokeObjectURL(activeUrl);
          activeUrl = null;
        }

        previewBox.innerHTML = "";
        previewBox.appendChild(previewPlaceholder);
      }

      function setPreviewImage(file) {
        if (activeUrl) {
          URL.revokeObjectURL(activeUrl);
        }

        activeUrl = URL.createObjectURL(file);
        const image = document.createElement("img");
        image.alt = "Preview";
        image.src = activeUrl;
        previewBox.innerHTML = "";
        previewBox.appendChild(image);
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

      function setAnalysisContent(text, isEmpty) {
        analysisOutput.textContent = text;
        analysisOutput.classList.toggle("is-empty", Boolean(isEmpty));
      }

      function setLoadingState(isLoading) {
        analyzeButton.disabled = isLoading;
        previewBox.classList.toggle("is-loading", isLoading);
      }

      function getReadableError(error) {
        if (error && typeof error === "object" && "message" in error) {
          return String(error.message);
        }

        return String(error);
      }

      imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];

        if (!file) {
          fileTitle.textContent = "Choose an image to preview";
          fileMeta.textContent = "PNG, JPG, WEBP and similar formats work best.";
          resetPreview();
          return;
        }

        fileTrigger.classList.add("is-active");
        fileTitle.textContent = file.name;
        fileMeta.textContent = Math.max(1, Math.round(file.size / 1024)) + " KB";
        setPreviewImage(file);
        setStatus("idle", "Ready", "Image selected. Run inspection when you are ready.");
      });

      async function runAnalysis(event) {
        if (event) {
          event.preventDefault();
        }

        const file = imageInput.files[0];
        if (!file) {
          setStatus("error", "Missing file", "Choose an image before submitting.");
          setAnalysisContent("Choose an image before running inspection.", true);
          return;
        }

        setLoadingState(true);
        setStatus("working", "Inspecting", "Running multimodal analysis on the selected image.");
        setAnalysisContent("Analyzing image…", true);
        result.textContent = '{ "loading": true }';

        try {
          const payload = {
            base64Image: await readFileAsBase64(file),
            prompt: document.getElementById("prompt").value,
          };

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 35000);

          const response = await fetch("/analyze-image", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          const responseText = await response.text();
          const data = (() => {
            try {
              return JSON.parse(responseText);
            } catch {
              return {
                error: "Unexpected server response.",
                details: responseText,
              };
            }
          })();

          result.textContent = JSON.stringify(data, null, 2);

          if (!response.ok) {
            setStatus("error", "Failed", data.details || data.error || "Analysis failed.");
            setAnalysisContent(data.error || "Analysis failed.", true);
            return;
          }

          setStatus("idle", "Complete", "Analysis returned successfully.");
          setAnalysisContent(data.analysis || "No analysis returned.", false);
        } catch (error) {
          const message =
            error && error.name === "AbortError"
              ? "The request timed out while waiting for image analysis."
              : getReadableError(error);

          setStatus("error", "Failed", message);
          setAnalysisContent(message, true);
          result.textContent = JSON.stringify(
            {
              error: "Request failed.",
              details: message,
            },
            null,
            2,
          );
        } finally {
          setLoadingState(false);
        }
      }

      form.addEventListener("submit", runAnalysis);
      analyzeButton.addEventListener("click", runAnalysis);
    </script>
  </body>
</html>`;
