<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Central Asian Museum Project Rules
Always strictly adhere to `PROJECT_GUIDELINES.md` for all architectural, component, styling, and design token rules:
- Component-based architecture with zero duplication across sections.
- Strictly use CSS variables defined in `app/globals.css`. Never use hardcoded colors.
- Use base color `#AFA990` (`--color-sage` / `--museum-base`) and button color `#54333B` (`--color-wine` / `--museum-btn-bg`).
- Use the global reusable `<Icon />` component for all iconography.
- Maintain full responsiveness across desktop, tablet, and mobile.
- Build clean, accessible, and SEO-friendly Next.js pages.

