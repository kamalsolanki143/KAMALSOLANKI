# Put Kamal's photo in the browser tab (favicon)

## Problem
The tab icon is the default Lovable logo (`public/favicon.ico` referenced from `src/routes/__root.tsx` line 92). The user's portrait exists only as a CDN asset pointer (`src/assets/kamal-portrait.png.asset.json`), which cannot be used as a favicon — the tab icon must be a real square image file in `public/`.

## Steps
1. Download the portrait from the CDN asset URL to `/tmp`, inspect its dimensions and framing (face position).
2. Create a square, face-centered tab icon from the photo and save it as `public/favicon.png` (resized to ~64x64 with padding, not stretching), plus a crisp `public/favicon.svg`-quality source if useful.
3. Update `src/routes/__root.tsx` head links: replace the `/favicon.ico` entry with `{ rel: "icon", type: "image/png", href: "/favicon.png" }` (also add `apple-touch-icon`).
4. Delete `public/favicon.ico` so the old Lovable logo is never served.
5. Verify: check the served `/favicon.png` responds, and confirm in the browser that the tab icon shows Kamal's photo and no errors appear in build logs.

## Fix the blurry photo on the page
The original photo is sharp enough (1023x1537), so the blur comes from how it is shown: the photo sits inside 3D-rotated, perspective and constantly floating layers (plus the scene's mouse tilt), which makes the browser redraw it as a softened texture.
6. Once the entry animation ends, leave the photo flat (no leftover rotateY/scale) and make the up-down float a whole-pixel `translate` only.
7. Keep the photo out of the tilted/blurred scene layers (its own layer, `backface-visibility: hidden`, no `filter` on the image itself), and move the glow/ring effects to sibling elements so they don't soften the photo.
8. Serve a sharper version: a light sharpen pass on the portrait, re-uploaded as a new asset, sized for 2x screens.
9. Verify with element screenshots on desktop and mobile that the face looks crisp.

## Result
The Lovable logo disappears from the tab and the user's photo appears there; the photo on the page looks sharp on every device.
