# NAVAKALPAA TECH LLP website

The corporate site for `https://navakalpaa.com`. Plain HTML, CSS and vanilla JavaScript. There is no build step, no backend, no database, no paid API and no analytics.

This repository is the whole site. It is deployed to Cloudflare Pages from the repository root, so everything committed here is publicly served. Do not commit internal notes, specs or credentials.

## What is here

| Path | What |
|---|---|
| `index.html` | Home: hero, purpose and principles, Setu, beyond the first product, closing |
| `about.html` | About: purpose, what we do, approach (three principles), our mark |
| `products.html` | Setu as the first product, plus the areas we build in (technology products, SaaS solutions, software services) |
| `contact.html` | Contact page (no form; opens the visitor's email app) |
| `privacy.html` | Privacy Policy for this corporate website only |
| `terms.html` | Terms of Use for this corporate website only |
| `404.html` | Branded not-found page (uses root-relative links, see below) |
| `css/styles.css` | Design tokens (`:root` custom properties) and all components |
| `js/site.config.js` | Company name, domain, tagline and contact email |
| `js/main.js` | Mobile menu, config injection, reveal on scroll |
| `assets/logo/` | The Navakalpaa logo kit (SVG, see below) |
| `assets/icons/` | Touch icon and app icons (PNG) |
| `assets/img/` | `setu-app-screen.webp` (the supplied Setu screenshot, cropped) and `og-image.png` (1200x630 social preview, composed from the logo and hero artwork) |
| `assets/fonts/` | Newsreader and Figtree, self-hosted (SIL Open Font License, licences included) |
| `favicon.svg`, `favicon.ico` | Symbol-only favicon |
| `_headers` | Cloudflare Pages security and cache headers |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Crawler and install metadata |

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>. Any static server works (`npx serve`, `php -S localhost:8000`). Use a server rather than opening files from disk: some browsers block fonts loaded from `file://`, and `404.html` uses root-relative links. A plain static server does not apply `_headers` or clean URLs (`/about`), so the Content Security Policy is only enforced on Cloudflare Pages.

## Deploy to Cloudflare Pages

Cloudflare Pages needs no build command. In the dashboard choose **Workers & Pages, Create, Pages, Connect to Git**, pick this repository, then set:

| Setting | Value |
|---|---|
| Production branch | the branch you publish from |
| Framework preset | None |
| Build command | leave empty |
| Build output directory | leave empty (repository root) |
| Root directory | leave empty (repository root) |

Custom domains: `navakalpaa.com` and `www.navakalpaa.com`. All canonical URLs use `https://navakalpaa.com`; redirecting `www` to the apex domain is a Cloudflare setting, not part of this repository.

Notes on how Cloudflare Pages behaves:

- Pages serves `about.html` at `/about` and redirects `/about.html` to it. The canonical URLs, `sitemap.xml` and Open Graph URLs therefore use the clean form (`https://navakalpaa.com/about`). Relative links between pages (`about.html`) work both locally and on Pages.
- Pages serves `404.html` for every unknown path, including nested ones such as `/a/b`. That page uses root-relative URLs (`/css/styles.css`) so it renders correctly at any depth. It carries `noindex` and no canonical URL, because it answers many different addresses.
- `_headers` sets a strict Content Security Policy (`'self'` only). The site has no inline scripts or inline `style` attributes; keep it that way, or relax the policy deliberately.

## Adding a product or offering

Setu keeps its own saffron identity in the `section.setu-band` block on `products.html`. For another product, copy that block, give it its own heading id and identity, and keep the Navakalpaa corporate styling elsewhere. For a short list entry rather than a full showcase, add a card to the `ul.offerings` on `products.html`: `<li class="offering"><h3>Name</h3><p>One honest sentence.</p></li>`. The grid is `auto-fit`, so cards re-flow without CSS changes. Add the new page or anchor to `sitemap.xml` if it is a new URL, and describe only what exists today: no invented features, dates, pricing or customer claims.

## Privacy and legal pages

`privacy.html` and `terms.html` describe the actual behaviour of this site: no forms, no analytics, no cookies or browser storage set by the pages, no third-party requests, self-hosted fonts, hosting by Cloudflare Pages. If any of that changes (analytics, a form, an embed, a new script), update `privacy.html`, the Content Security Policy in `_headers` and the "Last updated" date in the same change. Both pages need legal review before they are relied on.

## Configuration

Edit `js/site.config.js`:

```js
window.NAVAKALPAA_SITE = {
  name: "NAVAKALPAA TECH LLP",
  shortName: "Navakalpaa",
  tagline: "Ideas for a brighter everyday.",
  domain: "navakalpaa.com",
  url: "https://navakalpaa.com",
  contactEmail: "",            // add the real address here
  mailSubject: "A problem worth rethinking",
};
```

- **Name, short name, tagline and domain** fill every element with a matching `data-site` attribute (`data-site="name"`, `"short-name"`, `"tagline"`, `"domain"`), and replace the default name in the page title and meta tags.
- **Contact email** is intentionally empty, so no address or mailto link is published. Set it and the contact page, the Privacy Policy and Terms contact lines, the home page closing section and every `data-mailto` link switch on, including a copy button. While it is empty the contact page and legal pages show a short "will be published soon" note.
- The static HTML already contains the default name, so search engines and visitors without JavaScript see correct text. Page titles use the short brand form `Navakalpaa Tech`. If the legal name ever changes, update `site.config.js` and search-and-replace the name in the meta and Open Graph tags, `sitemap.xml`, `site.webmanifest` and the logo `<title>` elements.
- Colours, type scale, spacing, radii and motion curves are CSS custom properties at the top of `css/styles.css`.

## Logo kit

`assets/logo/` holds clean SVG artwork reconstructed from the official logo: the flowing ribbon N, the four-point star, the terracotta, amber and deep-brown treatment, the NAVAKALPAA / TECH LLP / tagline hierarchy and letter spacing. Wordmarks are converted to outlines, so the files need no font and look the same everywhere.

| Layout | Colour | Inverted (dark backgrounds) | Mono dark | Mono light |
|---|---|---|---|---|
| Full lockup with tagline (stacked, matches the reference) | `navakalpaa-logo.svg` | `-inverted` | `-mono-dark` | `-mono-light` |
| Stacked, no tagline (footer) | `navakalpaa-logo-stacked.svg` | `-inverted` | `-mono-dark` | `-mono-light` |
| Horizontal with tagline | `navakalpaa-logo-horizontal.svg` | `-inverted` | `-mono-dark` | `-mono-light` |
| Compact horizontal, no tagline (header) | `navakalpaa-logo-compact.svg` | `-inverted` | `-mono-dark` | `-mono-light` |
| Symbol only (N and star) | `navakalpaa-symbol.svg` | `-inverted` | `-mono-dark` | `-mono-light` |

The tagline is dropped wherever space is tight, because at small sizes it would not be legible. The site header switches to the symbol alone below 400 px width.

The favicon (`favicon.svg`, `favicon.ico`) is the N on a cream tile, without the star, with flat colours so it stays clear at 16 px. The touch and app icons keep the star.

Setu keeps its own identity. Its logo is not redrawn here; the only Setu artwork on the site is the supplied app screenshot, shown as provided.

## Placeholders still to fill

- `contactEmail` in `js/site.config.js` (no address was supplied).
- There is no public Setu URL, so every Setu call to action points to the local `products.html#setu` section. Change those links when one exists.
- Privacy Policy and Terms of Use: confirm the contact route, retention practice, Cloudflare feature set and governing-law wording with legal review, then update the "Last updated" date.
- The Setu screenshot is described as a preview of an app in development. Update the caption and the "In development" labels when Setu launches.

## Checks worth repeating after edits

- Every link and call to action resolves, including in-page anchors.
- No horizontal scrolling from 320 px to 1920 px.
- Tab through each page and the mobile menu; Escape closes the menu.
- `prefers-reduced-motion: reduce` stops all decorative motion.
- The browser console shows no errors under the Content Security Policy in `_headers`.
