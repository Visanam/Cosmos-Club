# B1 Values to Paste — Vercel `cosmosclub`

Do this only after the B1 branch is merged and Vercel has deployed it. Open **Vercel → cosmosclub → Settings → Environment Variables**. Add each item to **Production** and **Preview**. Copy values privately from the named provider directly into Vercel; do not place them in a message, screenshot, GitHub, or any source file.

| Vercel field name | Where the private value comes from | What to enter |
|---|---|---|
| `DATABASE_URL` | Neon | **Already present. Do not change it.** It is the pooled connection. |
| `DIRECT_DATABASE_URL` | Neon | **Already present. Do not change it.** It is for migrations only. |
| `CRON_SECRET` | A private local terminal | Generate a new random value with `openssl rand -base64 48`, then paste the result directly into Vercel. |
| `QSTASH_TOKEN` | Upstash QStash dashboard | Copy the token privately from the QStash dashboard. |
| `QSTASH_CURRENT_SIGNING_KEY` | Upstash QStash dashboard | Copy the current signing key privately. |
| `QSTASH_NEXT_SIGNING_KEY` | Upstash QStash dashboard | Copy the next signing key privately. |
| `APP_ORIGIN` | Type this yourself | `https://www.visanam.net` |

Do **not** add `SESSION_SECRET`, `PASSWORD_PEPPER`, `ADMIN_TOKEN`, Resend, Redis, or R2 values yet. Those belong to later releases when their code is ready.
