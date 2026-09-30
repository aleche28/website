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

| Command          | What it does                                                         |
| ---------------- | -------------------------------------------------------------------- |
| `mise run dev`   | Dev server with drafts on <http://localhost:1313>                    |
| `mise run build` | Production build into `public/` (fails on any Hugo warning)          |
| `mise run lint`  | Lint all Markdown with markdownlint                                  |
| `mise run check` | `lint` + `build`: the same checks CI runs on every PR                |

Without shell activation, prefix other commands with `mise exec --`, e.g. `mise exec -- hugo version`.

## Project layout

```text
.
├── hugo.toml             # site config: menus, params
├── content/              # Markdown pages; blog posts are page bundles in content/blog/
├── layouts/              # custom theme: baseof, home, list, single, 404, _partials/
├── assets/css/main.css   # minified + fingerprinted by Hugo
├── static/               # files copied as-is (fonts, favicon, ...)
├── archetypes/blog.md    # template for new posts
└── .github/workflows/    # CI
```

## Writing a post

```sh
mise exec -- hugo new content blog/2026-11-some-slug/index.md
```

The post is created with `draft: true`: it shows in `mise run dev` but never in the production build. To publish, remove `draft: true` and merge to `main`.

## Contributing workflow

- One branch and one pull request per roadmap step; CI must pass before merging.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, ...).

## License

- Code (templates, CSS, JS, config): [MIT](LICENSE).
- Content (posts and page text in `content/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
