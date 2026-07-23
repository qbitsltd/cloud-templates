# 👁️ "Sight-Assist" (Multimodal Vision API)

A multimodal image-analysis Worker with a clean upload surface, live preview, and guarded Qbits validation.

Deploy with:

`npm install`
`npm run deploy`

Before deploy:

1. Replace `__INSTALLATION_TOKEN__` and `__OPERATION_TOKEN__` in `wrangler.toml`
2. Create a Cloudflare KV namespace for run history and replace `replace-with-your-run-log-kv-id`
3. Make sure your Cloudflare account has Workers AI enabled
