# GyroCare Pro — iOS PWA Deployment Guide

## Files in this package

```
GyroCare_Pro_v17_26_2_2.html   ← Main app (updated with PWA tags)
manifest.json                   ← PWA definition
sw.js                           ← Service worker (offline support)
icons/                          ← App icons (YOU MUST ADD THESE — see below)
  icon-512.png
  icon-192.png
  icon-180.png
  icon-152.png
  icon-120.png
  splash-1170x2532.png          ← iPhone 12/13/14 Pro splash
  splash-1125x2436.png          ← iPhone X/XS/11 Pro splash
  splash-750x1334.png           ← iPhone 8/SE splash
  splash-2048x2732.png          ← iPad Pro 12.9" splash
  splash-1668x2388.png          ← iPad Pro 11" splash
```

---

## Step 1 — Prepare your icons

You need PNG icon files at the sizes listed above.  
**Quick free option:** https://www.pwabuilder.com/imageGenerator  
Upload one high-res square PNG of your logo (1024×1024 recommended),  
download the generated pack, and drop the files into an `icons/` folder.

Splash screens can be a simple dark background (`#0a0d12`) with your logo centered.  
Any image editor works; Figma and Canva are free options.

---

## Step 2 — Create a GitHub repository

1. Go to https://github.com and sign in (or create a free account).
2. Click **+** → **New repository**.
3. Name it something like `gyrocare-pro` (this becomes part of your URL).
4. Set it to **Public** (required for free GitHub Pages).
5. Click **Create repository**.

---

## Step 3 — Upload your files

Upload ALL of the following into the root of the repository:
- `GyroCare_Pro_v17_26_2_2.html`
- `manifest.json`
- `sw.js`
- The `icons/` folder with all PNG files

You can drag-and-drop files directly on the GitHub website  
(click **Add file → Upload files**), or use the GitHub Desktop app.

---

## Step 4 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab).
2. In the left sidebar, click **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to **main**, folder to **/ (root)**.
5. Click **Save**.

GitHub will give you a URL like:  
`https://YOUR-USERNAME.github.io/gyrocare-pro/`

It usually goes live within 1–2 minutes.

---

## Step 5 — Install on iPhone / iPad

1. Open **Safari** on your iPhone or iPad (must be Safari, not Chrome).
2. Go to your GitHub Pages URL.
3. Tap the **Share** button (box with arrow pointing up).
4. Scroll down and tap **"Add to Home Screen"**.
5. Give it a name and tap **Add**.

GyroCare Pro will now appear on your home screen like a native app —  
full screen, no browser bars, with your icon.

---

## Updating the app

Whenever you make changes:
1. Re-upload the updated `GyroCare_Pro_v17_26_2_2.html` to GitHub.
2. In `sw.js`, change `gyrocare-pro-v1` to `gyrocare-pro-v2` (increment each time).  
   This forces iOS to pick up the new version instead of serving the cached one.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| App shows blank screen | Make sure all files are in the repo root, not a subfolder |
| Icon not showing | Confirm `icons/icon-180.png` exists and path matches manifest |
| Still seeing old version | Increment the cache version in `sw.js` and re-upload |
| Can't install (no "Add to Home Screen") | Must use Safari on iOS — Chrome on iOS won't show the option |
| Data not saving between sessions | GyroCare uses localStorage, which persists fine in PWA mode on iOS |
