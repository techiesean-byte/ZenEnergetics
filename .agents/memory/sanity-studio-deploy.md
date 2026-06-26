---
name: Sanity Studio deploy & auth quirks
description: How to deploy the Sanity Studio when CLI auth is blocked in Replit's server environment
---

## The rule
`sanity deploy` via CLI fails in Replit because the browser-based OAuth flow cannot complete in a headless server environment.

**Why:** Replit runs in a server container — `sanity login` opens a browser URL that times out without a desktop browser to complete the flow. Even with `SANITY_AUTH_TOKEN` env var, CLI v3.99 still checks for a login session first.

**How to apply:** When deploying the Sanity Studio:
1. Change `basePath` in `sanity.config.ts` from `/studio` to `/` (required for standalone Netlify hosting)
2. Build: `cd artifacts/sanity-studio && pnpm run build`
3. Zip: `cd /home/runner/workspace && zip -r studio-dist.zip artifacts/sanity-studio/dist`
4. Download zip from Replit file tree and drag-drop into Netlify "Deploy manually"
5. Add the new Netlify domain to Sanity CORS origins at sanity.io/manage → API → CORS

Note: After deploying standalone, remember to revert `basePath` back to `/studio` if the in-Replit studio preview (proxied via Vite) is still needed — or keep it at `/` since the standalone deploy is the primary access point for Rosalyn.
