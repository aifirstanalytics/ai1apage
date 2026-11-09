# AI-First Analytics website

Static marketing site for AI-First Analytics, Inc. (logo wordmark: AI1st Analytics), built with Next.js (static export), React 19, and Tailwind CSS. Hosted on GitHub Pages at https://aifirstanalytics.com.

## Everyday use

```bash
nvm use            # optional; picks the Node version in .nvmrc
npm install        # once
npm run dev        # local preview at http://localhost:3000
npm run build      # static site -> ./out
npm run deploy     # build and publish ./out to the gh-pages branch
```

## Where to edit

- Contact details, Calendly link, LinkedIn: `src/config/site.ts` (set `calendlyUrl` and `linkedinUrl`; empty values fall back to email or hide the link)
- Page copy: the components in `src/components/`
- Colors: `src/app/globals.css`

## Logo and icons

The wordmark SVGs and favicon are generated from Inter with outlined text:

```bash
node scripts/make-logo.mjs   # public/logo/*.svg and src/app/icon.svg
bash scripts/make-png.sh     # Open Graph image, Apple icon, favicon.ico (needs Google Chrome)
```

## Photo credits

The example photos in `public/examples/` come from [Pexels](https://www.pexels.com/license/) and are free to use commercially without attribution; the credits are kept here for reference. Files are downscaled to 480 px wide and self-hosted, so the site makes no third-party requests.

| File | Photo | Photographer |
| --- | --- | --- |
| `home-1.jpg` | [Dining zone and kitchen in mansion with panoramic windows](https://www.pexels.com/photo/dining-zone-and-kitchen-in-mansion-with-panoramic-windows-7061670/) | Max Vakhtbovych |
| `home-2.jpg` | [Stylish apartment with floor to ceiling window](https://www.pexels.com/photo/stylish-apartment-with-floor-to-ceiling-window-6580215/) | Max Vakhtbovych |
| `home-3.jpg` | [Modern Industrial Loft Apartment Interior in Boston](https://www.pexels.com/photo/modern-industrial-loft-apartment-interior-in-boston-38661242/) | Chris Palladino |
| `sofa.jpg` | [Living Room Furniture](https://www.pexels.com/photo/living-room-furniture-12281854/) | dada _design |
| `armchair.jpg` | [Green Padded Armchair in Close Up Shot](https://www.pexels.com/photo/green-padded-armchair-in-close-up-shot-4172379/) | Engin Akyurt |
| `side-table.jpg` | [Brown Wooden Side Table Beside an Armchair](https://www.pexels.com/photo/brown-wooden-side-table-beside-an-armchair-12277130/) | dada _design |
| `lamp.jpg` | [Floor Lamp Glowing by a Sofa](https://www.pexels.com/photo/floor-lamp-glowing-by-a-sofa-26546549/) | Sami Abdullah |

## GitHub Pages setup (one time)

1. Run `npm run deploy` once so the `gh-pages` branch exists.
2. Repo Settings, Pages: deploy from branch `gh-pages`, folder `/ (root)`, custom domain `aifirstanalytics.com`, enable Enforce HTTPS.
3. DNS: four `A` records for the apex (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `CNAME` for `www` pointing to `aifirstanalytics.github.io`.
4. Redirect `aifirstanalytics.org` to `https://aifirstanalytics.com` at your registrar.
