# alessiochessa.dev

Source of my personal website and blog, built with [Hugo](https://gohugo.io/) and a small custom theme. No JS framework, no CMS.

Progress and next steps are tracked in [`ROADMAP.md`](ROADMAP.md).

## Local development

Tool versions (Hugo, Node, markdownlint) are pinned in [`.mise.toml`](.mise.toml) and shared with CI.

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
| `mise run check`      | `lint` + `build`: the same checks CI runs on every PR         |
| `mise run gen:syntax` | Regenerate `assets/css/syntax.css` (code colors) from Chroma  |

Without shell activation, prefix other commands with `mise exec --`, e.g. `mise exec -- hugo version`.

## Project layout

```text
.
├── hugo.toml             # site config: menus, params, feeds
├── content/              # Markdown pages; blog posts are page bundles in content/blog/
├── layouts/              # custom theme: baseof, home, list, single, taxonomy, term, rss.xml, _partials/
├── assets/css/           # fonts, syntax (generated) and main styles, bundled + fingerprinted by Hugo
├── static/               # files copied as-is: self-hosted fonts, favicons
├── archetypes/blog.md    # template for new posts
└── .github/workflows/    # CI
```

## Writing a post

```sh
mise exec -- hugo new content blog/2026-11-some-slug/index.md
```

The post is created with `draft: true`: it shows in `mise run dev` but never in the production build. To publish, remove `draft: true` and merge to `main`.

Front matter options:

- `tags`: lowercase, e.g. `[go, observability]`. Each tag gets a page (`/tags/go/`) and its own feed (`/tags/go/index.xml`).
- `toc: true`: shows a table of contents built from the `##` and `###` headings. Use it for long posts.
- `description`: one sentence, used for the meta description.

Published posts go into the RSS feed at `/blog/index.xml` with their full content. Images in the post's folder (`![alt](diagram.png)`) and site links (`/about/`) get absolute URLs in the feed.

`content/blog/styleguide/` is a permanent draft with every element a post can contain (headings, lists, code, tables, ...). Use it to review design changes locally at <http://localhost:1313/blog/styleguide/>.

## Contributing workflow

- One branch and one pull request per roadmap step; CI must pass before merging.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, ...).

## License

- Code (templates, CSS, JS, config): [MIT](LICENSE).
- Content (posts and page text in `content/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Third-party assets keep their own licenses: Inter and JetBrains Mono ([SIL OFL 1.1](static/fonts/)), icons from [Bootstrap Icons](https://icons.getbootstrap.com/) ([MIT](assets/icons/LICENSE-bootstrap-icons.txt)).
