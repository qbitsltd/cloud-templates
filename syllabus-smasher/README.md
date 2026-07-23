# 📚 The "Syllabus Smasher" (Edge RAG API)

A study-note chat Worker with a polished revision interface, edge retrieval, and guarded Qbits validation.

Deploy with:

`npm install`
`npm run deploy`

Before deploy:

1. Replace `__INSTALLATION_TOKEN__` and `__OPERATION_TOKEN__` in `wrangler.toml`
2. Point `NOTES` at your course-notes KV namespace
3. Create a second Cloudflare KV namespace for run history and replace `replace-with-your-run-log-kv-id`
4. Make sure your Cloudflare account has Workers AI enabled
