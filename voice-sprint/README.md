# 🔊 "VoiceSprint"

A Qbits-guarded Cloudflare Worker starter for text-to-speech flows powered by Workers AI.

This template gives you:

- A polished browser UI for entering text and previewing generated speech
- Native Cloudflare voice synthesis with no separate speech server
- English and Spanish voice catalogs mapped to supported Workers AI speakers
- A Worker route that validates Qbits tokens before running synthesis requests

Deploy with:

`npm install`
`npm run deploy`

Before deploy:

1. Replace `__INSTALLATION_TOKEN__` and `__OPERATION_TOKEN__` in `wrangler.toml`
2. Create a Cloudflare KV namespace for run history and replace `replace-with-your-run-log-kv-id`
3. Make sure your Cloudflare account has Workers AI enabled
4. Deploy the Worker with your usual Wrangler authentication

This starter uses Cloudflare's AI binding and routes requests to the native Deepgram Aura 2 models on Workers AI.
