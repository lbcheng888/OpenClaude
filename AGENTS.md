# AGENTS.md

## Cursor Cloud specific instructions

### What this is
This repo is a modular-TypeScript, 1:1 readable reverse-engineering of the official
**Claude Code 2.1.185** CLI. It is a single CLI application (no backend/frontend services,
no database). Entry point is `index.ts`; source lives in `src/` (own modules) and
`vendor/` (third-party modules). It is meant to run under **Bun**, not Node.

### Runtime
- Runs with **Bun** (installed at `~/.bun/bin/bun`, on `PATH` via `~/.bashrc`). Node will
  not run this tree as-is.
- There are no project dependencies to install (`package.json` declares none, so
  `bun install` is a no-op). The only real setup is having Bun present.

### Run / build / verify (no separate lint or unit-test framework exists)
- Run the CLI: `bun index.ts <args>` (e.g. `bun index.ts --version`, `bun index.ts --help`).
- Compile a standalone binary (the project's "build"): `bun build --compile index.ts --outfile oc` then `./oc --version`.
- The project's real soundness gate is the **Bun run gate** (the tree actually executing under Bun) plus the compile step — there is no `tsc`/eslint/jest config here, so don't expect `npm run lint`/`npm test`.

### Gotchas
- Most subcommands (`config list`, `-p` real prompts, interactive REPL) wait on stdin and
  will print `Warning: no stdin data received in 3s ...` when run non-interactively. Redirect
  stdin to avoid the delay: `bun index.ts config list < /dev/null`.
- Anything that talks to Anthropic's API (`-p "..."` real conversations, login) needs
  credentials (`ANTHROPIC_API_KEY` or OAuth `/login`); without them you'll see
  `Not logged in · Please run /login`. Offline-safe commands that exercise core logic:
  `--version`, `--help`, `mcp add` / `mcp list`, `mcp` and config inspection.
- `mcp add` / `config` mutate `~/.claude.json` (scoped per project cwd), so they persist
  across runs.
- The 5 prebuilt `native/*.node` plugins are macOS-only binaries; they are not expected to
  load on Linux and that does not affect the CLI core.
