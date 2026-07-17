# 🔊 "VoiceSprint"

A Qbits-guarded Cloudflare Worker starter for text-to-speech flows powered by a Supertonic server.

This template gives you:

- A polished browser UI for entering text and previewing generated speech
- Voice, language, speed, and quality controls mapped to Supertonic
- A Worker route that validates Qbits tokens before proxying synthesis requests
- A simple deployment path when your Supertonic instance is reachable over HTTP

Deploy with:

`npm install`
`npm run deploy`

Before deploy:

1. Replace `__INSTALLATION_TOKEN__` and `__OPERATION_TOKEN__` in `wrangler.toml`
2. Point `SUPERTONIC_BASE_URL` at your running Supertonic server
3. If your server requires auth, set `SUPERTONIC_API_KEY`

This starter targets Supertonic's native `POST /v1/tts` endpoint so it can pass `lang`, `voice`, `speed`, and `steps` directly.
