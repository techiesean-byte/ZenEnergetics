---
name: Sanity token roles for this project
description: Which Sanity API token role is needed for which operation
---

## The rule
- **Editor** role → required for creating/updating content documents (services, FAQ, testimonials, etc.)
- **Access Manager** role → manages project members only; cannot write content documents
- This project's Sanity plan shows Access Manager as the "highest" role in the token UI, but Editor is a separate lower role that has content write permissions

**Why:** Ran into "Insufficient permissions: update required" error when using an Access Manager token for content mutations. Switching to Editor role resolved it immediately.

**How to apply:** When populating or updating Sanity content via the API, always use an Editor-role token. For deploying the studio via CLI, Administrator role would be needed (not available on current plan — use manual Netlify deploy instead).

Project ID: `9op646qf`, Dataset: `production`
