# Vercel Import Checklist — gpt-os-chatbot-widget

**App**: `apps/chatbot-widget`  
**Status**: Ready to import — awaiting approval  
**Last updated**: 2026-06-04

---

## Pre-Flight (complete before opening Vercel)

- [ ] Confirm you are logged into Vercel at vercel.com as `sahidattaf`
- [ ] Confirm GitHub repo `sahidattaf/gpt-innovation-os` is visible in your Vercel account
- [ ] Confirm branch `main` is the target branch
- [ ] Note: NO secrets are required for this deploy — only one `NEXT_PUBLIC_*` placeholder

---

## Step 1 — Start a New Vercel Project

1. Go to: **vercel.com/new**
2. Under "Import Git Repository", find `sahidattaf/gpt-innovation-os`
3. Click **Import**

---

## Step 2 — Configure Project Settings

You will see a configuration screen. Enter the following values exactly:

| Field | Value |
|-------|-------|
| **Project Name** | `gpt-os-chatbot-widget` |
| **Framework Preset** | `Next.js` (select from dropdown) |
| **Root Directory** | `.` (leave as dot — repo root, do NOT set to apps/chatbot-widget) |

---

## Step 3 — Expand "Build and Output Settings"

Click the **"Build and Output Settings"** accordion to expand it. Override all three fields:

| Field | Value |
|-------|-------|
| **Build Command** | `pnpm turbo run build --filter=@gpt-os/chatbot-widget...` |
| **Output Directory** | `apps/chatbot-widget/.next` |
| **Install Command** | `pnpm install --frozen-lockfile` |

Make sure the override toggles are **enabled** (the pencil/edit icon next to each field must be active).

---

## Step 4 — Set Node.js Version

This is done **after** the project is created, in project settings.  
*(Vercel does not show Node version on the initial import screen.)*

After import:
1. Go to: **Project → Settings → General**
2. Scroll to **"Node.js Version"**
3. Select **`20.x`**
4. Click **Save**

---

## Step 5 — Add Environment Variables

On the import screen, scroll to **"Environment Variables"** and add this one variable:

| Name | Value | Environments |
|------|-------|-------------|
| `NEXT_PUBLIC_APP_URL` | `https://gpt-os-website.vercel.app` | Production, Preview, Development |

> **Note**: `ANTHROPIC_API_KEY` is intentionally omitted. The current page is fully static —
> no API routes exist yet. The Anthropic client is only instantiated when `createAgent()` is
> called, which never happens at build time. Add the key when `/api/chat` is built.

---

## Step 6 — Deploy

1. Review all settings one final time
2. Click **"Deploy"**
3. Vercel will redirect to the build log page

---

## Step 7 — What Success Looks Like

Build log will show, in order:

```
Cloning github.com/sahidattaf/gpt-innovation-os
Installing dependencies: pnpm install --frozen-lockfile
Running build: pnpm turbo run build --filter=@gpt-os/chatbot-widget...
✓ Compiled successfully
✓ Generating static pages (4/4)
Build Completed
```

Final screen shows:
- A green **"Congratulations!"** banner
- A live URL: `https://gpt-os-chatbot-widget.vercel.app`
- A preview screenshot of the chat UI

---

## Step 8 — Post-Deploy Verification

1. Click the live URL
2. Confirm the page loads — you should see:
   - Header: "GPT Innovation OS — AI Assistant"
   - A blue message bubble: "Hi! I am your AI assistant. How can I help you today?"
   - An input field at the bottom with a "Send" button
3. Check browser console — confirm no errors
4. Go to Vercel → Project → Settings → General → confirm Node.js is set to **20.x**

> The Send button will not function yet — that requires a `/api/chat` route, which is a future task.

---

## If the Build Fails

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `turbo: command not found` | Turbo not in PATH | Change build command to `npx turbo run build --filter=@gpt-os/chatbot-widget...` |
| `Cannot find module '@gpt-os/agents'` | workspace: protocol not resolved | Confirm Root Directory is `.` not `apps/chatbot-widget` |
| `pnpm: frozen lockfile failed` | `pnpm-lock.yaml` out of sync | Run `pnpm install` locally, commit updated lockfile, redeploy |
| Build times out | Turbo filter pulling too many deps | Confirm `--filter=@gpt-os/chatbot-widget...` syntax is exact (trailing `...`) |
| Output directory not found | Wrong output path | Confirm Output Directory is `apps/chatbot-widget/.next` not `.next` |

To trigger a redeploy after fixing: **Vercel → Deployments → ⋯ → Redeploy**

---

## Approval Gate

- [ ] Build passes
- [ ] Live URL loads correctly (chat UI visible)
- [ ] No console errors
- [ ] Node.js version confirmed as 20.x
- [ ] Send button is intentionally non-functional (no API route yet — expected)

**Do not import the next app (storefront) until:**
1. This approval gate is cleared
2. Supabase project is provisioned (storefront requires Supabase + Stripe)

---

## What Comes Next (after this gate)

| App | Blocker |
|-----|---------|
| `gpt-os-storefront` | Needs Supabase URL/keys + Stripe API keys |
| `gpt-os-ai-dashboard` | Needs Supabase URL/keys |
| `gpt-os-command-center` | Needs Supabase + Anthropic key + AUTH_SECRET |
