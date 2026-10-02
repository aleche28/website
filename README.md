# alessiochessa.dev

Source of my personal website and blog, built with [Hugo](https://gohugo.io/) and a small custom theme. No JS framework, no CMS.

Progress and next steps are tracked in [`ROADMAP.md`](ROADMAP.md).

## Local development

Tool versions (Hugo, Node, markdownlint, lychee) are pinned in [`.mise.toml`](.mise.toml) and shared with CI.

1. Install [mise](https://mise.jdx.dev/) (`brew install mise`) and, optionally, [activate it in your shell](https://mise.jdx.dev/getting-started.html#activate-mise).
2. Trust the repo config and install the tools:

   ```sh
   mise trust
   mise install
   ```

3. Start the dev server (drafts included, live reload):

   ```sh
   mise run dev
   ```

   Then open <http://localhost:1313>.

### Tasks

| Command               | What it does                                                  |
| --------------------- | ------------------------------------------------------------- |
| `mise run dev`        | Dev server with drafts on <http://localhost:1313>             |
| `mise run preview`    | Same as production: no drafts, on <http://localhost:1313>     |
| `mise run build`      | Production build into `public/` (fails on any Hugo warning)   |
| `mise run lint`       | Lint all Markdown with markdownlint                           |
| `mise run links`      | Check every link in the build with lychee (`lychee.toml`)     |
| `mise run budget`     | Fail if a page ships more than 30 KB of CSS + JS              |
| `mise run check`      | `lint`, `build`, `budget`, `links`: what CI runs on every PR  |
| `mise run gen:syntax` | Regenerate `assets/css/syntax.css` (code colors) from Chroma  |
| `mise run gen:og`     | Regenerate the link-preview image from `tools/og-image.html`  |

Without shell activation, prefix other commands with `mise exec --`, e.g. `mise exec -- hugo version`.

## Project layout

```text
.
├── hugo.toml             # site config: menus, params, feeds
├── content/              # Markdown pages; blog posts are page bundles in content/blog/
├── layouts/              # custom theme: baseof, home, list, single, taxonomy, term, rss.xml, sitemap.xml, _partials/
├── assets/css/           # fonts, syntax (generated) and main styles, bundled + fingerprinted by Hugo
├── assets/images/og.png  # default link-preview image (generated, see tools/)
├── static/               # files copied as-is: self-hosted fonts, favicons
├── archetypes/blog.md    # template for new posts
├── tools/                # og-image.html (source of the preview image), check-budget.mjs
├── lychee.toml           # link checker config: timeouts, retries, ignored sites
└── .github/workflows/    # CI (every PR, push to main, weekly) and deploy to GitHub Pages
```

## Writing a post

```sh
mise exec -- hugo new content blog/2026-11-some-slug/index.md
```

The post is created with `draft: true`: it shows in `mise run dev` but never in the production build. To publish, remove `draft: true` and merge to `main`.

Front matter options:

- `tags`: lowercase, e.g. `[go, observability]`. Each tag gets a page (`/tags/go/`) and its own feed (`/tags/go/index.xml`).
- `toc: true`: shows a table of contents built from the `##` and `###` headings. Use it for long posts.
- `description`: one sentence, used for search results and link previews. Required: a published post without one fails the build.

Published posts go into the RSS feed at `/blog/index.xml` with their full content. Images in the post's folder (`![alt](diagram.png)`) and site links (`/about/`) get absolute URLs in the feed.

`content/blog/styleguide/` is a permanent draft with every element a post can contain (headings, lists, code, tables, ...). Use it to review design changes locally at <http://localhost:1313/blog/styleguide/>.

## Deployment

Every push to `main` is built and published to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It can also be started by hand from the Actions tab. The checks run in CI on the pull request, so the deploy workflow only builds and publishes.

The site address comes from the Pages settings at build time. After changing the custom domain, re-run the Deploy workflow, otherwise the live pages keep pointing at the old address.

Production builds load [GoatCounter](https://www.goatcounter.com) (no cookies, no personal data; config in `params.goatcounter`). The dev and preview servers don't, so local visits are never counted.

Until go-live, `noindex = true` in `hugo.toml` keeps search engines from indexing the site.

## Contributing workflow

- One branch and one pull request per roadmap step; CI must pass before merging.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, ...).

## License

- Code (templates, CSS, JS, config): [MIT](LICENSE).
- Content (posts and page text in `content/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Third-party assets keep their own licenses: Inter and JetBrains Mono ([SIL OFL 1.1](static/fonts/)), icons from [Bootstrap Icons](https://icons.getbootstrap.com/) ([MIT](assets/icons/LICENSE-bootstrap-icons.txt)).
