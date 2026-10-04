# Digital With Habib

An editable agency portfolio preserving the supplied blue-and-white design.

See [START-HERE.md](START-HERE.md) for the owner guide.

## Development

`npm ci`, then `npm run dev`. Vite serves the interface and the local Express content API. The local studio is locked until `npm run setup` configures a password. Browser storage is not used as the source of truth.

## Hosted architecture

- React/Vite static assets: `dist/client`
- Cloudflare-compatible Worker: `dist/server/index.js`
- Sites logical bindings: D1 `DB`, R2 `BUCKET`, static service `ASSETS`
- Runtime secrets: `SITE_OWNER_EMAIL`, `ADMIN_CSRF_SECRET`
- Generated database migrations: `drizzle/`
- Every private endpoint checks the gateway-authenticated owner identity. Mutations also require a CSRF token and a permitted request origin.

`npm run build` checks types and produces hosted and optional Node builds. `npm test` checks authentication, file validation, revision conflicts, backups and storage across restart. The hosted integration test uses Miniflare D1/R2 against the compiled Worker; build before testing after Worker changes.

Keep the same `.openai/hosting.json` project identity when publishing updates. Runtime content and uploads are never seeded over an existing database.
