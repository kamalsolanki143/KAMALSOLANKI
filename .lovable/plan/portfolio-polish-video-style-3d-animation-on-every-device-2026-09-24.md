# Portfolio Polish — Video-Style 3D Animation on Every Device

## Goal
Poori website reference video jaisi dikhe aur chale: framed pixel-art scenes, camera jaisa smooth zoom/pan, tairti roshni, dhund aur paani ki movement — aur phone, tablet, laptop sab par aaram se chale.

## What improves

### 1. Video-jaisa motion (sabse zaroori)
- Har scene ki photo par slow cinematic camera move (Ken Burns jaisa zoom + pan), jaise video mein lagta hai.
- Photo ko 3 parallax layers mein todna (door ka background, beech, aage ka hissa) taaki scroll aur mouse par gehraai (depth) dikhe.
- Animated paani ki chamak, girta jharna shimmer, udti dhund, tairti fireflies/sparkles har scene ke upar.
- Scene se scene jaate waqt video jaisa transition: frame zoom-in, halka blur, phir agla scene clear.

### 2. Hero (pehli screen)
- "KAMAL SOLANKI" letter-by-letter glowing reveal + shimmer sweep.
- Title ke peeche saans leti pink/violet roshni.
- Photo aur tags mouse/touch ke saath halka 3D tilt.
- Neeche animated scroll indicator.

### 3. 3D background
- Tairte glowing orbs; unka rang section ke hisaab se badle.
- Halka film-grain texture for cinematic feel.

### 4. Content aur cards
- Heading, text aur cards ek-ek karke andar aayein (stagger).
- Project/recognition cards par 3D hover tilt + glow border (phone par tap feedback).
- Skills chips cascade animation; buttons par magnetic hover.
- Copy-email par spark feedback; social icons halke tairte rahein.

### 5. Har device par comfortable
- Phone (360–430px): frame full-width, photo upar aur text neeche, bade tap buttons, menu smooth slide.
- Tablet (768–1024px): alag layout jisme photo aur text balanced ho, portrait aur landscape dono.
- Laptop/desktop/badi screen: framed stage centered, max width taaki bahut phaila na lage.
- Phone par halka 3D (kam sparkles, kam layers) taaki slow na ho; battery-saver/reduced-motion users ke liye simple motion.
- Koi text kate nahi, horizontal scroll na aaye.

## Verification
- Playwright screenshots: 390px phone, 768px tablet, 1024px tablet landscape, 1280px aur 1920px desktop — har section.
- Build clean, no console errors, menu/filters/copy-email har size par kaam karein.

## Technical details
- Parallax layers: same image with masked/cropped layers + motion transforms tied to scroll and pointer.
- Overlay effects via CSS keyframes (water shimmer, mist) + R3F Sparkles with device-based counts and adaptive DPR.
- Breakpoints add: 1024px and 1440px alongside existing 900/600; roadmap.md mein naye tasks add honge.
