# Bengula Jacob — Private Wealth & Financial Education Portal

A single-page site for Jacob Bengula (Absa Kenya RM / Bengula Inc founder): financial
education, services, portfolio, an offline wealth coach, calculators, and downloadable
research.

The site is **100% client-side** — no API key, no database, no backend required to use it.
The offline Wealth Coach answers from a built-in knowledge base, the booking form opens a
pre-filled email, and all other forms run in the browser.

---

## Quick start

**Prerequisite:** [Node.js](https://nodejs.org) (v18+).

```bash
npm install      # one-time: pull dependencies
npm run dev      # start local dev server → http://localhost:3000
```

That's it — open the URL in your browser. No `.env` or API key needed.

---

## Build a portable static site (run anywhere)

To get a self-contained folder you can host or open on any machine:

```bash
npm run build    # outputs the static site into ./dist
```

`dist/` is plain HTML/CSS/JS — no Node needed to *serve* it. Use whatever you have:

```bash
# Option A — Python (installed almost everywhere, incl. NixOS/Linux/macOS)
cd dist && python -m http.server 8080      # → http://localhost:8080

# Option B — Node one-liner (no install)
npx serve dist

# Option C — drag the dist/ folder into Netlify / Cloudflare Pages / GitHub Pages
```

> Tip: open the site through a server (the commands above), not by double-clicking
> `dist/index.html` — browsers block module scripts loaded from `file://`.

---

## Editing the content

Most things you'll want to change live in plain data files under `src/data/`:

| What | File |
|------|------|
| **Contact details & socials** | `src/data/siteConfig.ts` |
| Wealth Coach answers (offline) | `src/data/coachKnowledge.ts` |
| Services & pricing | `src/data/servicesData.ts` |
| Portfolio items | `src/data/portfolioData.ts` |
| Investment pools | `src/data/investmentsData.ts` |
| Blog articles | `src/data/articles/*.ts` |
| Downloadable dossiers | `public/documents/*.txt` |

### ⚠️ Set your real contact details

Open **`src/data/siteConfig.ts`** and replace the placeholder values:

```ts
contact: {
  email:     "you@example.com",   // public email (Contact page + footer)
  workEmail: "you@example.com",   // where booking-request emails are sent
  phone:     "+254 7XX XXX XXX",  // shown + WhatsApp link
  whatsapp:  "2547XXXXXXXX",      // digits only, country code, no +
  location:  "Nairobi, Kenya",
  website:   "",                  // optional — leave "" to hide
},
socials: [ /* add LinkedIn / X / Instagram links here */ ],
```

---

## Project layout

```
index.html            App entry (title/meta)
src/
  App.tsx             Page shell, nav, Home, Contact, footer
  components/         Tab views (About, Services, Portfolio, Blog, etc.)
  data/               Editable content + siteConfig
public/documents/     Downloadable research dossiers
server.ts             Optional Express dev server (not needed for static hosting)
```

## Notes

- **No Gemini key required.** The Wealth Coach runs fully offline.
- **Booking** opens the visitor's email app pre-filled to your `workEmail`.
- `server.ts` and its Express/Gemini dependencies are unused for the static site and
  can be ignored (or removed later if you want a leaner dependency tree).
