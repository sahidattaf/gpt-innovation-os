# Vercel Import Checklist — gpt-os-website

**App**: `apps/website`  
**Status**: Ready to import — awaiting approval  
**Last updated**: 2026-06-03

---

## Pre-Flight (complete before opening Vercel)

- [ ] Confirm you are logged into Vercel at vercel.com as `sahidattaf`
- [ ] Confirm GitHub repo `sahidattaf/gpt-innovation-os` is visible in your Vercel account
- [ ] Confirm branch `main` is the target branch
- [ ] Have `.vercel.app` placeholder values ready (no real secrets needed for this app)

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
| **Project Name** | `gpt-os-website` |
| **Framework Preset** | `Next.js` (select from dropdown) |
| **Root Directory** | `.` (leave as dot — repo root, do NOT set to apps/website) |

---

## Step 3 — Expand "Build and Output Settings"

Click the **"Build and Output Settings"** accordion to expand it. Override all three fields:

| Field | Value |
|-------|-------|
| **Build Command** | `pnpm turbo run build --filter=@gpt-os/website...` |
| **Output Directory** | `apps/website/.next` |
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

On the import screen, scroll to **"Environment Variables"** and add these three:

| Name | Value | Environments |
|------|-------|-------------|
| `NEXT_PUBLIC_APP_URL` | `https://gpt-os-website.vercel.app` | Production, Preview, Development |
| `NEXT_PUBLIC_STOREFRONT_URL` | `https://gpt-os-storefront.vercel.app` | Production, Preview, Development |
| `NEXT_PUBLIC_COMMAND_CENTER_URL` | `https://gpt-os-command-center.vercel.app` | Production, Preview, Development |

> **Note**: These are `.vercel.app` placeholder URLs. They will be updated when the other
> apps are deployed. Using them now allows the build to succeed without errors.

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
Running build: pnpm turbo run build --filter=@gpt-os/website...
✓ Compiled successfully
✓ Generating static pages (4/4)
Build Completed
```

Final screen shows:
- A green **"Congratulations!"** banner
- A live URL: `https://gpt-os-website.vercel.app`
- A preview screenshot of the homepage

---

## Step 8 — Post-Deploy Verification

1. Click the live URL
2. Confirm the page loads — you should see the GPT Innovation OS homepage with two buttons:
   - "Browse GPTs"
   - "Command Center"
3. Check browser console — confirm no errors
4. Go to Vercel → Project → Settings → General → confirm Node.js is set to **20.x**
   (update if not already set from Step 4)

---

## If the Build Fails

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `turbo: command not found` | Turbo not in PATH | Change build command to `npx turbo run build --filter=@gpt-os/website...` |
| `Cannot find module '@gpt-os/ui'` | workspace: protocol not resolved | Confirm Root Directory is `.` not `apps/website` |
| `pnpm: frozen lockfile failed` | `pnpm-lock.yaml` out of sync | Run `pnpm install` locally, commit updated lockfile, redeploy |
| `NEXT_PUBLIC_* undefined` | Env vars missing at build time | Add the 3 env vars in Vercel → Settings → Environment Variables → redeploy |
| Build times out | Turbo filter pulling too many deps | Confirm `--filter=@gpt-os/website...` syntax is exact (trailing `...`) |
| Output directory not found | Wrong output path | Confirm Output Directory is `apps/website/.next` not `.next` |

To trigger a redeploy after fixing: **Vercel → Deployments → ⋯ → Redeploy**

---

## Approval Gate

- [ ] Build passes
- [ ] Live URL loads correctly
- [ ] No console errors
- [ ] Node.js version confirmed as 20.x

**Do not import the next app (chatbot-widget) until this approval gate is cleared.**
