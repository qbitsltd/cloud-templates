export const sightAssistHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sight Assist</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #071417;
        --bg-deep: #041014;
        --ink: #eff8f4;
        --muted: #8fab9f;
        --muted-strong: #b7cdc4;
        --accent: #8ee3cd;
        --accent-strong: #63d7bb;
        --accent-soft: rgba(142, 227, 205, 0.12);
        --line: rgba(142, 227, 205, 0.14);
        --line-strong: rgba(142, 227, 205, 0.28);
        --surface-dark: linear-gradient(180deg, rgba(6, 23, 28, 0.96) 0%, rgba(4, 17, 21, 0.98) 100%);
        --surface-mint: linear-gradient(180deg, rgba(17, 48, 53, 0.96) 0%, rgba(8, 26, 31, 0.98) 100%);
        --surface-plain: linear-gradient(180deg, rgba(10, 30, 35, 0.92) 0%, rgba(6, 20, 24, 0.96) 100%);
        --surface-panel: linear-gradient(180deg, rgba(11, 24, 28, 0.98) 0%, rgba(6, 17, 20, 0.98) 100%);
        --paper: linear-gradient(180deg, rgba(245, 252, 248, 0.97) 0%, rgba(228, 240, 234, 0.95) 100%);
        --danger: #ff917e;
        --radius-xl: 30px;
        --radius-lg: 22px;
        --radius-md: 16px;
        --radius-sm: 12px;
        --shadow-lg: 0 30px 70px rgba(0, 0, 0, 0.28);
        --shadow-md: 0 18px 34px rgba(0, 0, 0, 0.2);
      }

      * {
        box-sizing: border-box;
      }

      html {
        background:
          radial-gradient(circle at top left, rgba(142, 227, 205, 0.12), transparent 24%),
          linear-gradient(180deg, #071417 0%, #061216 100%);
      }

      body {
        margin: 0;
        min-height: 100dvh;
        color: var(--ink);
        font-family: "Avenir Next", "Segoe UI Variable Display", "Segoe UI", sans-serif;
        background:
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          radial-gradient(circle at top, rgba(142, 227, 205, 0.08), transparent 32%),
          linear-gradient(180deg, #071417 0%, #061216 100%);
        background-size: 48px 48px, 48px 48px, auto, auto;
      }

      button,
      input,
      textarea {
        font: inherit;
      }

      .shell {
        width: min(1320px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 28px 0 44px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 24px;
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
        box-shadow: 0 0 0 6px rgba(142, 227, 205, 0.08);
      }

      .topnote {
        max-width: 42ch;
        font-size: 13px;
        line-height: 1.55;
        text-align: right;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
        gap: 22px;
        margin-bottom: 22px;
      }

      .intro-panel,
      .flow-panel,
      .sidebar,
      .canvas {
        border: 1px solid var(--line);
        box-shadow: var(--shadow-lg);
      }

      .intro-panel,
      .flow-panel,
      .canvas {
        border-radius: var(--radius-xl);
      }

      .intro-panel {
        padding: 30px 32px 32px;
        background: var(--surface-dark);
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
        width: 26px;
        height: 1px;
        background: currentColor;
      }

      h1 {
        margin: 18px 0 14px;
        max-width: 8ch;
        font-size: clamp(3rem, 5vw, 5.6rem);
        line-height: 0.9;
        letter-spacing: -0.065em;
      }

      .lede {
        max-width: 42ch;
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
        color: var(--ink);
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

      .flow-panel {
        padding: 22px;
        background: var(--surface-mint);
      }

      .flow-shell {
        height: 100%;
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 24px;
        background: rgba(4, 17, 21, 0.74);
      }

      .flow-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
      }

      .flow-dots {
        display: flex;
        gap: 8px;
      }

      .flow-dots span {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.2);
      }

      .flow-label {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .flow-steps {
        display: grid;
        gap: 12px;
      }

      .step-card {
        display: grid;
        grid-template-columns: 52px minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
      }

      .step-card.is-primary {
        background: linear-gradient(180deg, rgba(142, 227, 205, 0.14) 0%, rgba(142, 227, 205, 0.05) 100%);
        border-color: rgba(142, 227, 205, 0.18);
      }

      .step-index {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--ink);
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.04em;
      }

      .step-copy strong {
        display: block;
        font-size: 17px;
        letter-spacing: -0.03em;
      }

      .step-copy p {
        margin: 8px 0 0;
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
        border: 1px solid var(--line);
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
        background: var(--surface-mint);
      }

      .sidebar::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: 5px;
        background: linear-gradient(180deg, var(--accent) 0%, rgba(142, 227, 205, 0.1) 100%);
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
        gap: 10px;
      }

      .field-shell {
        display: grid;
        gap: 10px;
        padding: 14px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: rgba(4, 15, 18, 0.22);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        transition:
          border-color 180ms ease,
          background 180ms ease,
          box-shadow 180ms ease;
      }

      .field-shell:focus-within {
        border-color: var(--line-strong);
        background: rgba(4, 15, 18, 0.36);
        box-shadow:
          0 0 0 4px rgba(142, 227, 205, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      .field-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .field-tag {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        padding: 0 10px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 999px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.04);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
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
      .file-trigger {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: rgba(3, 11, 13, 0.48);
        color: var(--ink);
        transition:
          border-color 180ms ease,
          background 180ms ease,
          transform 180ms ease,
          box-shadow 180ms ease;
      }

      textarea {
        min-height: 136px;
        padding: 16px 18px;
        resize: vertical;
        outline: none;
        line-height: 1.6;
      }

      textarea:focus {
        border-color: rgba(142, 227, 205, 0.18);
        background: rgba(3, 11, 13, 0.72);
      }

      textarea::placeholder {
        color: #7f9d95;
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
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
        cursor: pointer;
      }

      .file-trigger:hover,
      .file-trigger.is-active {
        border-color: rgba(142, 227, 205, 0.18);
        background: rgba(142, 227, 205, 0.08);
        transform: translateY(-1px);
      }

      .file-title {
        font-size: 15px;
        font-weight: 700;
      }

      .file-meta {
        color: var(--muted);
        font-size: 13px;
      }

      .action-area {
        display: grid;
        gap: 12px;
        margin-top: 4px;
      }

      .analyze-button {
        min-height: 56px;
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 999px;
        color: #082026;
        font-size: 16px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        box-shadow:
          0 18px 40px rgba(99, 215, 187, 0.24),
          inset 0 1px 0 rgba(255, 255, 255, 0.48);
        cursor: pointer;
        transition:
          transform 180ms ease,
          box-shadow 180ms ease,
          opacity 180ms ease;
      }

      .analyze-button:hover {
        transform: translateY(-2px);
        box-shadow:
          0 22px 44px rgba(99, 215, 187, 0.28),
          inset 0 1px 0 rgba(255, 255, 255, 0.5);
      }

      .analyze-button:active {
        transform: translateY(0) scale(0.985);
      }

      .analyze-button:disabled {
        opacity: 0.72;
        cursor: wait;
      }

      .action-note {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      .canvas {
        position: relative;
        padding: 24px;
        background: var(--surface-panel);
      }

      .canvas-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 20px;
      }

      .canvas-copy p {
        margin: 10px 0 0;
        max-width: 52ch;
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
        box-shadow: 0 0 0 6px rgba(142, 227, 205, 0.08);
      }

      .status-pill.is-working .status-dot {
        animation: pulse 1.2s ease-in-out infinite;
      }

      .status-pill.is-error .status-dot {
        background: var(--danger);
        box-shadow: 0 0 0 6px rgba(255, 145, 126, 0.08);
      }

      .canvas-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
        gap: 18px;
      }

      .preview-card,
      .result-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        box-shadow: var(--shadow-md);
      }

      .preview-card {
        padding: 18px;
        background: var(--surface-plain);
      }

      .preview-head,
      .result-head {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .preview-head strong,
      .result-head strong {
        font-size: 16px;
        letter-spacing: -0.02em;
      }

      .preview-head span,
      .result-head span {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.5;
      }

      .preview-box {
        position: relative;
        display: grid;
        place-items: center;
        overflow: hidden;
        min-height: 420px;
        margin-top: 16px;
        border: 1px solid rgba(142, 227, 205, 0.18);
        border-radius: 20px;
        background:
          radial-gradient(circle at top, rgba(142, 227, 205, 0.14), transparent 28%),
          linear-gradient(180deg, #163439 0%, #11282d 100%);
      }

      .preview-box.is-loading::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.06) 50%,
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

      .placeholder-icon {
        width: 86px;
        height: 86px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.03);
      }

      .placeholder strong {
        font-size: 1.1rem;
      }

      .placeholder p {
        color: var(--muted-strong);
        line-height: 1.65;
      }

      .result-card {
        display: grid;
        grid-template-rows: auto auto minmax(0, 1fr);
        padding: 18px;
        background: linear-gradient(180deg, rgba(15, 41, 37, 0.96) 0%, rgba(8, 22, 20, 0.98) 100%);
      }

      .analysis-sheet {
        min-height: 258px;
        width: 100%;
        margin-top: 16px;
        padding: 22px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: var(--paper);
        color: #183430;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.65),
          0 16px 28px rgba(0, 0, 0, 0.14);
        font-size: 16px;
        line-height: 1.78;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .analysis-sheet.is-empty {
        display: grid;
        place-items: center;
        text-align: center;
        color: #5a7a72;
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

      summary::-webkit-details-marker {
        display: none;
      }

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
        width: 100%;
        padding: 16px;
        overflow: auto;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: #061217;
        color: #d6f4ea;
        font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        font-size: 12px;
        line-height: 1.6;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }

        50% {
          opacity: 0.55;
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

      @media (max-width: 1120px) {
        .hero,
        .workbench,
        .canvas-grid {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
        }
      }

      @media (max-width: 760px) {
        .shell {
          width: min(100vw - 20px, 1320px);
          padding: 18px 0 28px;
        }

        .topbar,
        .canvas-top {
          flex-direction: column;
          align-items: flex-start;
        }

        .topnote {
          text-align: left;
        }

        .hero,
        .capsules {
          gap: 14px;
        }

        .intro-panel,
        .flow-panel,
        .canvas {
          border-radius: 24px;
        }

        .preview-box {
          min-height: 320px;
        }

        h1 {
          font-size: clamp(2rem, 10vw, 3rem);
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brandline">
          <span class="branddot"></span>
          <span>Sight Assist · Vision endpoint starter</span>
        </div>
        <div class="topnote">Fast image inspection with readable scene notes.</div>
      </header>

      <section class="hero">
        <article class="intro-panel">
          <span class="eyebrow">Multimodal image reading</span>
          <h1>Readable scene notes for any uploaded image.</h1>
          <p class="lede">
            Upload an image, inspect it, and get a clear response without UI noise.
          </p>

          <div class="signal-row">
            <div class="signal-chip">Base64 upload · edge response</div>
            <div class="signal-copy">Made for quick preview and short, usable output.</div>
          </div>
        </article>

        <article class="flow-panel">
          <div class="flow-shell">
            <div class="flow-header">
              <div class="flow-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="flow-label">Example reading surface</div>
            </div>

            <div class="flow-steps">
              <div class="step-card is-primary">
                <div class="step-index">01</div>
                <div class="step-copy">
                  <strong>Upload</strong>
                  <p>Pick one image and keep the prompt direct.</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-index">02</div>
                <div class="step-copy">
                  <strong>Inspect</strong>
                  <p>The image stays visible while the request runs.</p>
                </div>
              </div>

              <div class="step-card">
                <div class="step-index">03</div>
                <div class="step-copy">
                  <strong>Read</strong>
                  <p>The main response stays readable. Raw payload stays secondary.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="capsules">
        <div class="capsule">
          <strong>Focused hierarchy</strong>
          <span>Clear zones for intro, controls, preview, and output.</span>
        </div>
        <div class="capsule">
          <strong>Responsive workflow</strong>
          <span>The flow stays intact on smaller screens.</span>
        </div>
        <div class="capsule">
          <strong>Honest states</strong>
          <span>Loading, success, and failure stay visible.</span>
        </div>
      </section>

      <section class="workbench">
        <aside class="sidebar">
          <div class="sidebar-inner">
            <h2>Inspect an image</h2>
            <p>Set the prompt, choose a file, and run one pass.</p>

            <div class="divider"></div>

            <form id="vision-form" class="form">
              <div class="field">
                <div class="field-shell">
                  <div class="field-head">
                    <label class="field-label" for="prompt">Prompt</label>
                    <span class="field-tag">Required</span>
                  </div>
                  <textarea id="prompt" placeholder="Describe the image clearly and mention what matters most.">Describe the image clearly, identify notable objects, and mention anything useful for accessibility.</textarea>
                  <div class="field-help">Be specific if you want product, document, or scene-focused output.</div>
                </div>
              </div>

              <div class="field">
                <div class="field-shell">
                  <div class="field-head">
                    <span class="field-label">Image file</span>
                    <span class="field-tag">Required</span>
                  </div>
                  <label class="file-trigger" id="file-trigger" for="image">
                    <span class="file-title" id="file-title">Choose an image to preview</span>
                    <span class="file-meta" id="file-meta">PNG, JPG, WEBP and similar formats work best.</span>
                  </label>
                </div>
                <input class="file-input" id="image" accept="image/*" type="file" />
              </div>

              <div class="action-area">
                <button class="analyze-button" id="analyze-button" type="button">Inspect image</button>
                <div class="action-note">The request runs through the Worker and then Workers AI.</div>
              </div>
            </form>
          </div>
        </aside>

        <section class="canvas">
          <div class="canvas-top">
            <div class="canvas-copy">
              <h2 class="canvas-title">Preview and output</h2>
              <p id="status">Choose an image to populate the preview and output panels.</p>
            </div>
            <div class="status-pill" id="status-pill">
              <span class="status-dot"></span>
              <span id="status-text">Idle</span>
            </div>
          </div>

          <div class="canvas-grid">
            <article class="preview-card">
              <div class="preview-head">
                <strong>Live preview</strong>
                <span>The image stays visible while analysis runs.</span>
              </div>

              <div class="preview-box" id="preview-box">
                <div class="placeholder" id="preview-placeholder">
                  <div class="placeholder-icon"></div>
                  <strong>No image loaded yet</strong>
                  <p>Pick a file from the left panel before running inspection.</p>
                </div>
              </div>
            </article>

            <article class="result-card">
              <div class="result-head">
                <strong>Latest analysis</strong>
                <span>Readable output first. Raw detail second.</span>
              </div>

              <div class="analysis-sheet is-empty" id="analysis-output">
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
      const defaultButtonLabel = "Inspect image";

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
        analyzeButton.textContent = isLoading ? "Inspecting..." : defaultButtonLabel;
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
          fileTrigger.classList.remove("is-active");
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

        const promptField = document.getElementById("prompt");
        const promptValue = promptField.value.trim();
        const file = imageInput.files[0];
        if (!promptValue) {
          alert("Enter a prompt before running inspection.");
          promptField.focus();
          return;
        }

        if (!file) {
          alert("Choose an image before running inspection.");
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
            prompt: promptValue,
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
