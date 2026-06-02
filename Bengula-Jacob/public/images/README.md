# Site images

Put your own photos here (headshots, article covers, logos).

Everything in `public/` is served from the site root, so a file saved as
`public/images/jacob.jpg` is referenced in code as **`/images/jacob.jpg`**.

## Where to reference an image

| Use | File to edit | Field |
|-----|--------------|-------|
| Article cover | `src/data/articles/<article>.ts` | `coverImage: "/images/...jpg"` |
| Author photo | same article file | `author.avatar` / `coAuthors[].avatar` |
| Hero / About / Coach / Markets banners | `src/data/media.ts` | the relevant key |
| Partner logos / other | wherever it's used | use the `/images/...` path |

## Conventions

- Always start the path with `/` (root-relative): `/images/hero.jpg`.
  Do **not** use `./`, `src/...`, or a Windows path.
- Lowercase, no spaces in filenames: `jacob-hero.jpg`, not `Jacob Hero.jpg`.
- Formats: `.jpg`/`.webp` for photos, `.png` for logos/transparency, `.svg` for icons.
- Keep files small (covers ≤ ~300 KB) — they ship with the site.

After adding or renaming a file, run `npm run build`.
