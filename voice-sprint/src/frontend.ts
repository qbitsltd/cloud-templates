export const voiceSprintHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VoiceSprint</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #130912;
        --surface: rgba(33, 14, 34, 0.78);
        --surface-soft: rgba(48, 20, 48, 0.62);
        --text: #fff6f9;
        --muted: #d8b7c6;
        --line: rgba(255, 200, 221, 0.14);
        --accent: #ff8db1;
        --accent-2: #ffd36e;
        --accent-3: #ffa7f2;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Manrope", "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at 20% 0%, rgba(255, 167, 242, 0.2), transparent 28%),
          radial-gradient(circle at 100% 10%, rgba(255, 211, 110, 0.12), transparent 24%),
          linear-gradient(180deg, #130912 0%, #210d1f 100%);
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
        background: linear-gradient(180deg, rgba(33, 14, 34, 0.94), rgba(33, 14, 34, 0.72));
        box-shadow: 0 28px 90px rgba(8, 1, 8, 0.44);
      }

      .eyebrow {
        color: var(--accent-2);
        font-size: 11px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 11ch;
        font-size: clamp(3rem, 7vw, 5.8rem);
        line-height: 0.92;
        letter-spacing: -0.05em;
      }

      .lede {
        margin: 0;
        max-width: 60ch;
        color: var(--muted);
        line-height: 1.7;
      }

      .highlights {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(3, 1fr);
      }

      .highlight,
      .panel,
      .player {
        border: 1px solid var(--line);
        border-radius: 24px;
        background: var(--surface);
      }

      .highlight {
        padding: 18px;
        background: var(--surface-soft);
      }

      .highlight strong {
        display: block;
        margin-bottom: 8px;
        font-size: 20px;
      }

      .highlight span,
      p {
        color: var(--muted);
        line-height: 1.7;
      }

      .layout {
        display: grid;
        gap: 18px;
        grid-template-columns: 1.05fr 0.95fr;
      }

      .panel,
      .player {
        padding: 22px;
      }

      form {
        display: grid;
        gap: 14px;
        margin-top: 20px;
      }

      .grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      label {
        display: grid;
        gap: 8px;
        font-size: 13px;
      }

      textarea,
      input,
      select,
      button {
        border: 0;
        border-radius: 18px;
        font: inherit;
      }

      textarea,
      input,
      select {
        width: 100%;
        padding: 15px 18px;
        color: var(--text);
        background: rgba(17, 6, 17, 0.88);
        outline: 1px solid rgba(255, 200, 221, 0.14);
      }

      textarea {
        min-height: 180px;
        resize: vertical;
      }

      button {
        justify-self: start;
        padding: 14px 22px;
        color: #210d1f;
        font-weight: 800;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
        cursor: pointer;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 999px;
        color: #ffe8f1;
        background: rgba(255, 141, 177, 0.14);
      }

      audio {
        width: 100%;
        margin-top: 18px;
      }

      .meta {
        display: grid;
        gap: 12px;
        margin-top: 18px;
      }

      .meta-card {
        padding: 16px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: rgba(17, 6, 17, 0.72);
      }

      .meta-card strong {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        letter-spacing: 0.02em;
      }

      pre {
        margin: 18px 0 0;
        padding: 18px;
        overflow: auto;
        border-radius: 18px;
        color: #fff1bf;
        background: rgba(17, 6, 17, 0.88);
      }

      @media (max-width: 980px) {
        .layout,
        .highlights,
        .grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">VoiceSprint by Qbits</span>
        <h1>Turn scripts, lessons, and product copy into natural voice in seconds.</h1>
        <p class="lede">
          VoiceSprint gives your team a fast, private text-to-speech workspace for
          previews, accessibility, and ready-to-share voice output.
        </p>

        <div class="highlights">
          <div class="highlight">
            <strong>Cloudflare-native speech</strong>
            <span>No separate speech server, proxy tier, or extra upstream credentials required.</span>
          </div>
          <div class="highlight">
            <strong>English and Spanish voices</strong>
            <span>Switch between two native Workers AI voice catalogs with speaker-safe presets.</span>
          </div>
          <div class="highlight">
            <strong>Private and controlled</strong>
            <span>Every request is validated before it reaches Workers AI.</span>
          </div>
        </div>

        <div class="layout">
          <div class="panel">
            <h2>Create a voice preview</h2>
            <p>Paste your text, choose a supported voice, and generate a playable draft instantly.</p>
            <form id="tts-form">
              <label>
                Script
                <textarea id="text">VoiceSprint turns product copy, lesson content, and support text into fast, private audio your team can review in seconds.</textarea>
              </label>

              <div class="grid">
                <label>
                  Narration language
                  <select id="locale">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </select>
                </label>

                <label>
                  Speaker
                  <select id="speaker"></select>
                </label>

                <label>
                  Output format
                  <input value="MP3 (native Workers AI output)" disabled />
                </label>
              </div>

              <button type="submit">Generate preview</button>
            </form>
          </div>

          <div class="player">
            <h2>Preview player</h2>
            <p id="status">Generate a preview to listen to the latest audio output here.</p>
            <div class="status-pill" id="pill">Idle</div>
            <audio id="audio" controls></audio>

            <div class="meta">
              <div class="meta-card">
                <strong>Audio format</strong>
                <span id="format">Waiting for your first preview...</span>
              </div>
              <div class="meta-card">
                <strong>Clip length</strong>
                <span id="duration">Length will appear after audio is generated.</span>
              </div>
            </div>

            <pre id="result">{ "audio": "Waiting for your first preview..." }</pre>
          </div>
        </div>
      </section>
    </main>

    <script>
      const form = document.getElementById("tts-form");
      const audio = document.getElementById("audio");
      const status = document.getElementById("status");
      const pill = document.getElementById("pill");
      const format = document.getElementById("format");
      const duration = document.getElementById("duration");
      const result = document.getElementById("result");
      const locale = document.getElementById("locale");
      const speaker = document.getElementById("speaker");

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
          .map((voiceName) => "<option value=\\"" + voiceName + "\\">" + voiceName + "</option>")
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

      syncSpeakerOptions();
      locale.addEventListener("change", syncSpeakerOptions);

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (activeUrl) {
          URL.revokeObjectURL(activeUrl);
          activeUrl = null;
        }

        pill.textContent = "Generating";
        status.textContent = "Generating your voice preview...";
        result.textContent = "{ \\"loading\\": true }";

        const payload = {
          text: document.getElementById("text").value,
          locale: locale.value,
          speaker: speaker.value,
        };

        const response = await fetch("/synthesize", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ error: "Synthesis failed." }));
          pill.textContent = "Failed";
          status.textContent = "The preview could not be generated.";
          format.textContent = "No audio returned.";
          duration.textContent = "Unavailable.";
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
            ? audio.duration.toFixed(1)
            : "Unavailable";

        pill.textContent = "Ready";
        status.textContent = "Your preview is ready to play.";
        format.textContent = responseFormat + " via " + voiceModel;
        duration.textContent = audioDuration === "Unavailable" ? audioDuration : audioDuration + " seconds";
        result.textContent = JSON.stringify({
          ok: true,
          locale: voiceLocale,
          speaker: voiceSpeaker,
          model: voiceModel,
          format: audioFormat,
          contentType: responseFormat,
          durationSeconds: audioDuration,
        }, null, 2);
      });
    </script>
  </body>
</html>`;
