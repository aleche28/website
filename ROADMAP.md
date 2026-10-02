# Roadmap

The working checklist for the site. Each step is one branch and one PR. Tick items as the PR is merged.

There is no fixed go-live date: the site goes live when I'm happy with it (see [Go-live gate](#go-live-gate)).

## Goals

- **What it is:** a showcase of who I am, the projects I build and what I write about Go, observability and backend engineering. People land here from my CV, LinkedIn and GitHub.
- **Tone:** let the work speak for itself. No "open to work" or job-seeking messaging.
- **Over time:** posts keep coming at a steady pace (one every 6–8 weeks), and the site needs close to zero maintenance between posts.
- **Non-goals:** comments, newsletter, JS framework, CMS. Nothing that competes with GrepDocs for time.

## Decisions

| Area      | Decision                                                          |
| --------- | ----------------------------------------------------------------- |
| Generator | Hugo (standard edition), version pinned with mise                 |
| Theme     | Custom and minimal, in this repo; no third-party theme            |
| Style     | Text-first by default, plus a "term mode" toggle                  |
| Fonts     | Inter + JetBrains Mono, self-hosted (no Google Fonts)             |
| Colors    | Muted blue accent, light/dark from the system; green in term mode |
| Hosting   | GitHub Pages, deployed by GitHub Actions                          |
| Domain    | `alessiochessa.dev`, registered at Cloudflare                     |
| Language  | English only                                                      |
| Analytics | GoatCounter (no cookies, no banner)                               |
| License   | MIT for code, CC BY 4.0 for content                               |

## Steps

### 0. Prerequisites

- [x] Buy `alessiochessa.dev`
- [x] Create the public repo `aleche28/website`
- [x] Create a GoatCounter account (site code: `alessiochessa`)

### 1. Project skeleton

- [x] Hugo project with the planned layout, versions pinned in `.mise.toml`
- [x] Bare custom theme: `baseof`, `home`, `list`, `single`, `404`, header/footer partials
- [x] CSS built on custom properties (ready for dark mode and term mode)
- [x] Stub pages: Home, About, Projects, Blog (shows "coming soon" while empty)
- [x] Blog archetype (`draft: true`) and a local draft preview with `mise run dev`
- [x] `mise` tasks: `dev`, `build`, `lint`, `check`
- [x] markdownlint config, `.editorconfig`, `.gitignore`, license
- [x] CI: lint + build on every PR and push to `main`; Dependabot for Actions
- [x] README with dev instructions, and this roadmap

### 2. Design: minimal mode

- [x] Self-host Inter + JetBrains Mono (woff2, Latin subset, `font-display: swap`, body font preloaded)
- [x] Typography scale, spacing and final accent color; light/dark polish
- [x] Syntax highlighting: Chroma classes with light and dark styles (`mise run gen:syntax`)
- [x] Style tags, post meta, headings, blockquotes, tables and inline code
- [x] Accessibility basics: skip link, visible focus styles, sufficient contrast in both themes
- [x] Favicon (SVG + ICO + Apple touch icon)
- [x] Draft style guide post for reviewing the design locally

### 3. Content: Home, About, Projects

- [x] Home: intro, contact links with icons, projects, latest posts
- [x] About: short bio, what I work on, background, contacts
- [x] Projects: GrepDocs, B-AROL-O (FREISA, RUCHE); problem, stack, status, links. **Only shipped work.**
- [x] Projects layouts: list ordered by `weight`, project page with status / stack / links
- [x] Decide which contacts are public and fill in `params.social` (GitHub, LinkedIn, email)
- [ ] Review of every page by me

### 4. Blog features

- [x] RSS at `/blog/index.xml` with full post content; per-tag feeds (`/tags/go/index.xml`)
- [x] Drop the RSS feeds that aren't needed (home, sections other than the blog, `/tags/`); the blog feed is linked for autodiscovery on every page
- [x] Table of contents for long posts: opt-in with `toc: true`
- [x] Nicer tag list and tag pages: `/tags/` with counts, `#tag` pages with their feed, tag list on `/blog/`

### 5. SEO and sharing

- [x] Open Graph and Twitter cards, so links look good on LinkedIn. Own partial instead of Hugo's built-ins: previews reuse the page's `<title>`/description, only posts are `article`; one default preview image (`mise run gen:og`)
- [x] Per-page `description` (a published post without one fails the build); canonical URLs checked, `404` gets `noindex` and no canonical
- [x] Check `sitemap.xml` and `robots.txt` (`robots.txt` points to the sitemap; `/tags/` is left out of the sitemap until there are tags)

### 6. Quality gates in CI

- [x] Link checker on the built site: [lychee](https://lychee.cli.rs) (maintained, unlike htmltest), internal links + anchors + external links, on every PR and weekly. Ignores sites that block automated requests but work in a browser: LinkedIn (HTTP 999) and Hackster (403); Devpost passes, so it is checked
- [x] Performance budget: fail CI if CSS + JS per page is over 30 KB (fonts excluded); today 11.5 KB
- [x] Manual Lighthouse run (local build, mobile + desktop): 100 everywhere; the style guide draft gets 99 for performance on mobile, from the local test server (no compression)

### 7. Deploy to GitHub Pages ← current

- [x] Deploy workflow: on push to `main` → build → upload Pages artifact → deploy; the base URL comes from Pages, so `aleche28.github.io/website/` works until the custom domain is set (home link, Markdown links and font URLs made subpath-safe)
- [x] Until go-live, every page is `noindex` (`params.noindex` in `hugo.toml`)
- [ ] Repo Settings → Pages → Source: GitHub Actions
- [ ] Branch protection on `main`: PR required, CI must pass

### 8. Custom domain

- [ ] Cloudflare DNS: apex `A` records → `185.199.108.153`, `.109`, `.110`, `.111`; `AAAA` → `2606:50c0:8000::153`, `8001`, `8002`, `8003`; `www` `CNAME` → `aleche28.github.io`. All records **DNS only** (grey cloud), so GitHub can issue the certificate.
- [ ] Verify the domain in GitHub **account** settings (prevents domain takeover)
- [ ] Set the custom domain in repo Settings → Pages, then turn on "Enforce HTTPS"
- [ ] Update `baseURL` if needed and check `www` → apex redirect

### 9. Analytics

- [ ] GoatCounter script (production builds only), no cookies

### Go-live gate

- [ ] Every page reviewed by me
- [ ] Lighthouse and link checks green on the live URL
- [ ] Link previews look right in LinkedIn's Post Inspector (home, About, a project)
- [ ] Remove `noindex = true` from `hugo.toml`; merge → live

### 10. Term mode

- [ ] `[data-mode="term"]` overrides of the CSS custom properties: monospace everywhere, dark background, green text
- [ ] Prompt-style header (`~/alessio $ ls`), `#`/`##` heading prefixes, `[text]` links, `ls -l`-style post list
- [ ] Code colors: `gen:syntax` needs a third block applying the dark Chroma styles under `[data-mode="term"]` (the current blocks follow only the system scheme); same for `theme-color`
- [ ] `[ term ]` / `[ normal ]` toggle, choice saved in `localStorage`, applied by a tiny inline script before first paint (no flash)

### 11. CV

- [ ] **Decision pending:** how the PDF gets here. Options: a release in the `aleche28/cv` CI that the site downloads at build time, or the `aleche28/cv` CI opening a PR on this repo
- [ ] "Web" variant of the CV without the phone number
- [ ] `/cv/` page + "Download PDF", and add CV to the menu

### 12. First post

- [ ] Choose the topic
- [ ] If it has images: a render hook adding `width`/`height` and lazy loading (Lighthouse flags unsized images)
- [ ] Write it, check it (one-sentence takeaway, snippets compile, nothing beyond CV-level detail about work, links work), publish
- [ ] Share on LinkedIn

### 13. Link it everywhere

- [ ] Add the site to the CV header (`cv.tex` and `cv-en.tex`)
- [ ] Add it to the GitHub profile and LinkedIn

## Later (not before launch)

- When the AROL platform is live: change "it goes to production soon" on About to say it's in production; once there are real usage numbers, add them to About and the CV

- Search with Pagefind, once there are more than ~20 posts
- Auto-generated social preview images
- Term mode easter egg (keyboard shortcut / typed commands), only if it's fun

## Content guardrails

- **Work:** nothing beyond the level of detail in my CV. No internal systems, architecture or names from any employer.
- **Only what is shipped:** a technology appears on the site only once it's in a real project.
- **Post format:** 800–1500 words. Problem → options considered → decision → what I'd do differently. Real code, not toy examples.
