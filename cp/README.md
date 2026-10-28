# GMWS Client Portal (chooser page)

Static page: logo + two buttons (Investments → Altruist, Documents → FileShare).

## Files
- `index.html` — the page
- `assets/gmws-logo-white.png` — logo used on the page (white on transparent)
- `assets/gmws-logo-ink.png` — logo for light backgrounds (navy on transparent)
- `assets/gmws-mark.png` — diamond mark, 512×512
- `assets/halftone-diamond.svg` — background diamond
- `assets/favicon-32.png`, `assets/apple-touch-icon.png`, `favicon.ico` — browser/phone icons
- `_headers` — security headers for Cloudflare Pages

## Before going live
1. In `index.html`, replace the two `href="#"` with:
   - Investments → Altruist client login URL
   - Documents → https://fs.greymatterws.com
2. Footer: keep "a registered investment adviser" only once Texas registration is effective.

## Cloudflare Pages
- Framework preset: None
- Build command: (leave empty)
- Build output directory: `/`
- Custom domain: e.g. `clients.greymatterws.com`
