# Put Kamal's photo in the browser tab (favicon)

## Problem
The tab icon is the default Lovable logo (`public/favicon.ico` referenced from `src/routes/__root.tsx` line 92). The user's portrait exists only as a CDN asset pointer (`src/assets/kamal-portrait.png.asset.json`), which cannot be used as a favicon — the tab icon must be a real square image file in `public/`.

## Steps
1. Download the portrait from the CDN asset URL to `/tmp`, inspect its dimensions and framing (face position).
2. Create a square, face-centered tab icon from the photo and save it as `public/favicon.png` (resized to ~64x64 with padding, not stretching), plus a crisp `public/favicon.svg`-quality source if useful.
3. Update `src/routes/__root.tsx` head links: replace the `/favicon.ico` entry with `{ rel: "icon", type: "image/png", href: "/favicon.png" }` (also add `apple-touch-icon`).
4. Delete `public/favicon.ico` so the old Lovable logo is never served.
5. Verify: check the served `/favicon.png` responds, and confirm in the browser that the tab icon shows Kamal's photo and no errors appear in build logs.

## Result
The Lovable logo disappears from the tab; the user's own photo appears there, on every device.
