import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, sep } from "node:path";
import React from "react";
import { Box, Text, stringWidth } from "@anthropic/ink";
import { readClaudeSettingString } from "../config/claude-settings.js";
import { DEFAULT_MODEL } from "../api/client.js";

export const CHANGELOG_URL = "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md";
const RAW_CHANGELOG_URL = "https://raw.githubusercontent.com/anthropics/claude-code/refs/heads/main/CHANGELOG.md";
const MAX_RELEASE_NOTES_SHOWN = 3;
const BUILT_IN_CHANGELOG = [
  "# Changelog",
  "",
  "## 2.1.132",
  "",
  "- New `CLAUDE_CODE_SESSION_ID_IN_BASH=1` env var passes session ID to Bash subprocesses",
  "- New `CLAUDE_CODE_ALTERNATE_SCREEN=0` env var opts out of alternate-screen renderer to preserve native terminal scrollback",
  "- External SIGINT now triggers graceful exit with terminal state restoration",
  "- Fixed blank screens after sleep/wake and Ctrl+Z/fg cycles in fullscreen mode",
  "- Fixed cursor positioning for Indic conjuncts and ZWJ emoji characters",
  "- Vim operators now correctly handle NFD accented characters",
  "- Fixed pasted text beginning with `/` being misinterpreted",
  "- Fixed stray escape sequences during bracketed paste in certain terminals",
  "- Fixed mouse wheel acceleration issues in VS Code/Cursor (upstream xterm.js)",
  "- Fixed scroll-wheel problems in JetBrains IDE terminals",
  "- Fixed dead keyboard state after re-opening background task sessions",
  "- Fixed 10GB+ RSS memory growth from stdio MCP servers writing non-protocol output",
  "- MCP servers that fail `tools/list` now retry once and show \"connected · tools fetch failed\" in `/mcp`",
  "- Unauthorized claude.ai connectors now correctly display \"needs auth\"",
  "- Fixed `/usage` clipboard operations on Linux/X11",
  "- Fixed `/terminal-setup` errors in Windows Terminal",
  "- Fixed `CLAUDE_CODE_EFFORT_LEVEL` being ignored by the effort picker UI",
  "- Autocomplete popup now scales properly with terminal height",
  "- Statusline `context_window` now reflects current usage instead of cumulative totals",
  "- Alt+T thinking toggle now works on macOS without Option-as-Meta enabled",
  "- Fixed Bedrock and Vertex 400 errors when `ENABLE_PROMPT_CACHING_1H` is set",
  "",
  "## 2.1.131",
  "",
  "- Fixed VS Code extension failing to activate on Windows due to a hardcoded build path in the bundled SDK (`createRequire` polyfill bug)",
  "- Fixed Mantle endpoint authentication failing with missing `x-api-key` header",
  "",
  "## 2.1.129",
  "",
  "- Added `--plugin-url <url>` flag to fetch a plugin `.zip` archive from a URL for the current session",
  "- Added `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` env var to force-enable synchronized output on terminals that auto-detection misses (e.g. Emacs `eat`)",
  "- Added `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE`: when set on Homebrew or WinGet installations, Claude Code runs the upgrade command in the background and prompts to restart",
].join("\n");
const PROMPT_EXAMPLES = [
  "fix lint errors",
  "fix typecheck errors",
  "how does <filepath> work?",
  "refactor <filepath>",
  "how do I log an error?",
  "edit <filepath> to...",
  "write a test for <filepath>",
  "create a util logging.py that...",
];

type EffortLevel = "low" | "medium" | "high" | "xhigh" | "max";

export function StartupScreen({
  version,
  model,
}: {
  version: string;
  model: string;
}): React.ReactElement {
  React.useEffect(() => {
    markReleaseNotesSeen(version);
  }, [version]);

  const columns = Math.max(40, process.stdout.columns || 80);
  const releaseNotes = readRecentReleaseNotes(version);
  if (releaseNotes.length > 0) {
    return (
      <Box flexDirection="column">
        {getNarrowStartupScreenLines({
          version,
          model,
          cwd: process.cwd(),
          columns,
          releaseNotes,
        }).map((line, index) => (
          <Text key={`startup-narrow-${index}`}>{line}</Text>
        ))}
      </Box>
    );
  }

  const rows = getStartupScreenRows({ version, model, cwd: process.cwd(), columns });
  const notice = getStartupNotice(model);

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Box width={11}>
          <ClawdMark />
        </Box>
        <Box flexDirection="column" flexShrink={1}>
          <Text wrap="truncate">
            <Text bold color="claude">Claude Code</Text>
            <Text dimColor>{` v${version}`}</Text>
          </Text>
          <Text dimColor wrap="truncate">{rows.model}</Text>
          <Text dimColor wrap="truncate">{rows.cwd}</Text>
        </Box>
      </Box>
      {notice ? (
        <Box paddingLeft={2}>
          <Text dimColor wrap="truncate">{notice}</Text>
        </Box>
      ) : null}
    </Box>
  );
}

export function getStartupScreenRows({
  version,
  model,
  cwd,
  columns,
}: {
  version: string;
  model: string;
  cwd: string;
  columns: number;
}): { title: string; model: string; cwd: string } {
  const textWidth = Math.max(10, Math.max(40, columns) - 12);
  return {
    title: `Claude Code v${version}`,
    model: truncateToWidth(`${getModelDisplayName(model)}${getEffortSuffix(model)} · API Usage Billing`, textWidth),
    cwd: truncatePath(displayPath(cwd), textWidth),
  };
}

export function getNarrowStartupScreenLines({
  version,
  model,
  cwd,
  columns,
  releaseNotes,
}: {
  version: string;
  model: string;
  cwd: string;
  columns: number;
  releaseNotes: string[];
}): string[] {
  const width = Math.max(60, columns);
  const leftWidth = Math.max(32, Math.min(52, width - 28));
  const rightWidth = Math.max(18, width - leftWidth - 3);
  const rightRows = getStartupAsideRows(releaseNotes);
  const title = `Claude Code v${version}`;
  const topRuleWidth = Math.max(1, width - stringWidth(title) - 7);
  const modelText = getNarrowModelText(model, Math.max(1, leftWidth - 2));
  const cwdText = truncateToWidth(cwd, Math.max(1, leftWidth - 4));
  const rows = [
    ["", rightRows[0] || ""],
    ["Welcome back!", rightRows[1] || ""],
    ["", rightRows[2] || ""],
    ["▐▛███▜▌", rightRows[3] || ""],
    ["▝▜█████▛▘", rightRows[4] || ""],
    ["▘▘ ▝▝", ""],
    ["", ""],
    [modelText, ""],
    [cwdText, ""],
  ];

  const notice = getStartupNotice(model);
  const output = [
    `${title} ${"─".repeat(topRuleWidth)}╮`,
    ...rows.map(([left, right]) => `│${centerToWidth(left, leftWidth)}│${formatRightAside(right, rightWidth)}│`),
    `╰${"─".repeat(Math.max(1, width - 2))}╯`,
  ];
  if (notice) output.push(`  ${notice}`);
  return output;
}

export function getPromptPlaceholder(exampleFiles: string[] = [], random: () => number = Math.random): string {
  const filePath = sample(exampleFiles, random) || "<filepath>";
  const examples = PROMPT_EXAMPLES.map(example => example.replaceAll("<filepath>", filePath));
  return `Try "${sample(examples, random) || examples[0]}"`;
}

export function shouldShowPromptPlaceholder(): boolean {
  const config = readGlobalConfig(getGlobalConfigPath());
  const features = config.cachedGrowthBookFeatures;
  if (!features || typeof features !== "object" || Array.isArray(features)) return false;
  const value = (features as Record<string, unknown>).tengu_prompt_suggestion;
  if (value === true) return true;
  if (value === false) return false;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return (value as Record<string, unknown>).enabled === true;
  }
  return false;
}

export function getEffortStatus(model: string): string {
  if (!modelSupportsEffort(model)) return "";
  const level = getDisplayedEffortLevel(model);
  return `${effortLevelToSymbol(level)} ${level} · /effort`;
}

export function getStartupNotice(model: string): string | null {
  if (!modelSupportsEffort(model)) return null;
  if (isOpus47Model(model)) return "Welcome to Opus 4.7 xhigh! · /effort to tune speed vs. intelligence";
  if (hasCompletedOpusProMigration()) return null;
  return "Opus 4.7 xhigh is now available! · /model to switch";
}

export function getModelDisplayName(model: string): string {
  if (isOpus47Model(model)) return "Opus 4.7 (1M context)";
  return model;
}

function ClawdMark(): React.ReactElement {
  if (isAppleTerminal()) {
    return <AppleTerminalClawdMark />;
  }

  return (
    <Box flexDirection="column">
      <Text>
        <Text color="clawd_body"> ▐</Text>
        <Text color="clawd_body" backgroundColor="clawd_background">
          ▛███▜
        </Text>
        <Text color="clawd_body">▌</Text>
      </Text>
      <Text>
        <Text color="clawd_body">▝▜</Text>
        <Text color="clawd_body" backgroundColor="clawd_background">
          █████
        </Text>
        <Text color="clawd_body">▛▘</Text>
      </Text>
      <Text color="clawd_body">  ▘▘ ▝▝  </Text>
    </Box>
  );
}

function AppleTerminalClawdMark(): React.ReactElement {
  return (
    <Box flexDirection="column" alignItems="center">
      <Text>
        <Text color="clawd_body">▗</Text>
        <Text color="clawd_background" backgroundColor="clawd_body"> ▗   ▖ </Text>
        <Text color="clawd_body">▖</Text>
      </Text>
      <Text backgroundColor="clawd_body">{" ".repeat(7)}</Text>
      <Text color="clawd_body">▘▘ ▝▝</Text>
    </Box>
  );
}

function isAppleTerminal(): boolean {
  return process.env.TERM_PROGRAM === "Apple_Terminal";
}

export function readRecentReleaseNotes(version: string): string[] {
  const changelogPath = getChangelogCachePath();
  const previousVersion = readLastReleaseNotesSeen();
  if (!existsSync(changelogPath)) {
    return isTruthyEnv(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)
      ? []
      : getRecentReleaseNotes(version, previousVersion, BUILT_IN_CHANGELOG);
  }

  const content = readFileSync(changelogPath, "utf8");
  const cachedNotes = getRecentReleaseNotes(version, previousVersion, content);
  return cachedNotes.length > 0 ? cachedNotes : getRecentReleaseNotes(version, previousVersion, BUILT_IN_CHANGELOG);
}

export function readAllReleaseNotes(): Array<[string, string[]]> {
  const changelogPath = getChangelogCachePath();
  if (!existsSync(changelogPath)) return [];
  return getAllReleaseNotes(readFileSync(changelogPath, "utf8"));
}

export async function refreshChangelogCache(currentVersion: string, timeoutMs = 5_000): Promise<boolean> {
  if (isTruthyEnv(process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)) return false;
  const cachedChangelog = readCachedChangelog();
  if (readLastReleaseNotesSeen() === currentVersion && cachedChangelog) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(RAW_CHANGELOG_URL, { signal: controller.signal });
    if (!response.ok) return false;
    const content = await response.text();
    if (!content || content === cachedChangelog) return false;
    writeChangelogCache(content);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchReleaseNotesForCommand(timeoutMs = 500): Promise<Array<[string, string[]]>> {
  await refreshChangelogCache("force-fetch-release-notes", timeoutMs);
  return readAllReleaseNotes();
}

export function formatReleaseNotes(notes: Array<[string, string[]]>): string {
  if (notes.length === 0) return `See the full changelog at: ${CHANGELOG_URL}`;
  return notes
    .map(([version, versionNotes]) => {
      const bulletPoints = versionNotes.map(note => `· ${note}`).join("\n");
      return `Version ${version}:\n${bulletPoints}`;
    })
    .join("\n\n");
}

export function getRecentReleaseNotes(
  currentVersion: string,
  previousVersion: string | null | undefined,
  changelogContent: string,
): string[] {
  const releaseNotes = parseChangelog(changelogContent);
  const current = coerceVersion(currentVersion);
  const previous = previousVersion ? coerceVersion(previousVersion) : null;
  if (previous && current && compareVersions(current, previous) <= 0) return [];

  return Object.entries(releaseNotes)
    .filter(([version]) => {
      const parsed = coerceVersion(version);
      if (!parsed) return false;
      return !previous || compareVersions(parsed, previous) > 0;
    })
    .sort(([a], [b]) => compareVersionStrings(b, a))
    .flatMap(([, notes]) => notes)
    .filter(Boolean)
    .slice(0, MAX_RELEASE_NOTES_SHOWN);
}

export function parseChangelog(content: string): Record<string, string[]> {
  const sections = content.split(/^## /gm).slice(1);
  const releaseNotes: Record<string, string[]> = {};
  for (const section of sections) {
    const lines = section.trim().split("\n");
    const sectionVersion = (lines[0] || "").split(" - ")[0]?.trim() || "";
    const notes = lines
      .slice(1)
      .filter(line => line.trim().startsWith("- "))
      .map(line => line.trim().slice(2).trim())
      .filter(Boolean);
    if (sectionVersion && notes.length > 0) {
      releaseNotes[sectionVersion] = notes;
    }
  }
  return releaseNotes;
}

export function getAllReleaseNotes(changelogContent: string): Array<[string, string[]]> {
  return Object.entries(parseChangelog(changelogContent))
    .sort(([a], [b]) => compareVersionStrings(b, a))
    .map(([version, notes]) => [version, notes.filter(Boolean)] as [string, string[]])
    .filter(([, notes]) => notes.length > 0);
}

export function markReleaseNotesSeen(version: string): void {
  if (!version) return;
  const globalConfigPath = getGlobalConfigPath();
  const parsed = readGlobalConfig(globalConfigPath);
  if (parsed.lastReleaseNotesSeen === version) return;
  writeJsonAtomically(globalConfigPath, { ...parsed, lastReleaseNotesSeen: version });
}

function readCachedChangelog(): string {
  const changelogPath = getChangelogCachePath();
  if (!existsSync(changelogPath)) return "";
  try {
    return readFileSync(changelogPath, "utf8");
  } catch {
    return "";
  }
}

function writeChangelogCache(content: string): void {
  const changelogPath = getChangelogCachePath();
  writeTextAtomically(changelogPath, content);
}

function readLastReleaseNotesSeen(): string | null {
  const globalConfigPath = getGlobalConfigPath();
  if (!existsSync(globalConfigPath)) return null;
  try {
    const parsed = JSON.parse(readFileSync(globalConfigPath, "utf8")) as { lastReleaseNotesSeen?: unknown };
    return typeof parsed.lastReleaseNotesSeen === "string" ? parsed.lastReleaseNotesSeen : null;
  } catch {
    return null;
  }
}

function readGlobalConfig(globalConfigPath: string): Record<string, unknown> & { lastReleaseNotesSeen?: string } {
  if (!existsSync(globalConfigPath)) return {};
  try {
    const parsed = JSON.parse(readFileSync(globalConfigPath, "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function getClaudeConfigHomeDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

function getChangelogCachePath(): string {
  return join(getClaudeConfigHomeDir(), "cache", "changelog.md");
}

function getGlobalConfigPath(): string {
  const configHome = getClaudeConfigHomeDir();
  const legacyPath = join(configHome, ".config.json");
  if (existsSync(legacyPath)) return legacyPath;
  return join(process.env.CLAUDE_CONFIG_DIR || homedir(), ".claude.json");
}

function writeJsonAtomically(filePath: string, value: unknown): void {
  writeTextAtomically(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeTextAtomically(filePath: string, content: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(tempPath, content, "utf8");
  renameSync(tempPath, filePath);
}

function compareVersionStrings(left: string, right: string): number {
  const parsedLeft = coerceVersion(left);
  const parsedRight = coerceVersion(right);
  if (!parsedLeft && !parsedRight) return left.localeCompare(right);
  if (!parsedLeft) return -1;
  if (!parsedRight) return 1;
  return compareVersions(parsedLeft, parsedRight);
}

function compareVersions(left: [number, number, number], right: [number, number, number]): number {
  for (let index = 0; index < left.length; index++) {
    const diff = left[index] - right[index];
    if (diff !== 0) return diff;
  }
  return 0;
}

function coerceVersion(value: string): [number, number, number] | null {
  const match = value.match(/(\d+)\.(\d+)\.(\d+)/u);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function getEffortSuffix(model: string): string {
  if (!modelSupportsEffort(model)) return "";
  if (isOpus47Model(model)) return "";
  return ` with ${getDisplayedEffortLevel(model)} effort`;
}

function hasCompletedOpusProMigration(): boolean {
  return readGlobalConfig(getGlobalConfigPath()).opusProMigrationComplete === true;
}

function getNarrowModelText(model: string, width: number): string {
  if (modelSupportsEffort(model) && !isOpus47Model(model)) {
    return truncateToWidth(`${getModelDisplayName(model)} with ${getDisplayedEffortLevel(model)} … · API Usage Billing`, width);
  }
  return truncateToWidth(`${getModelDisplayName(model)} · API Usage Billing`, width);
}

function getStartupAsideRows(releaseNotes: string[]): string[] {
  if (releaseNotes.length > 0) {
    return ["What's new", ...releaseNotes.slice(0, 3), "/release-notes for more"];
  }
  return [
    "Tips for getting started",
    "Run /init to create a CLAUDE.md file",
    'Try "refactor <filepath>"',
    "/mcp to configure MCP servers",
  ];
}

function formatRightAside(value: string, width: number): string {
  if (!value) return " ".repeat(width);
  return ` ${padEndToWidth(truncateToWidth(value, Math.max(1, width - 2)), Math.max(1, width - 2))} `;
}

function centerToWidth(value: string, width: number): string {
  const clipped = truncateToWidth(value, width);
  const missing = Math.max(0, width - stringWidth(clipped));
  const left = Math.ceil(missing / 2);
  return `${" ".repeat(left)}${clipped}${" ".repeat(missing - left)}`;
}

function padEndToWidth(value: string, width: number): string {
  return `${value}${" ".repeat(Math.max(0, width - stringWidth(value)))}`;
}

function getDisplayedEffortLevel(model: string): EffortLevel {
  const explicitEffort = getExplicitEffortLevel();
  if (explicitEffort && modelSupportsEffort(model)) return explicitEffort;
  if (isOpus47Model(model)) return "xhigh";
  if (model.toLowerCase().includes("deepseek-v4-pro")) return "max";
  return "high";
}

function getExplicitEffortLevel(): EffortLevel | undefined {
  const value = (process.env.CLAUDE_CODE_EFFORT_LEVEL || readClaudeSettingString("effortLevel") || "").toLowerCase();
  if (value === "low" || value === "medium" || value === "high" || value === "xhigh" || value === "max") {
    return value;
  }
  return undefined;
}

function modelSupportsEffort(model: string): boolean {
  const normalized = model.toLowerCase();
  return (
    normalized === "opus" ||
    normalized === "opus[1m]" ||
    normalized.includes("opus-4-7") ||
    normalized.includes("opus-4-6") ||
    normalized.includes("sonnet-4-6") ||
    normalized.includes("deepseek-v4-pro")
  );
}

function effortLevelToSymbol(level: EffortLevel): string {
  switch (level) {
    case "low":
      return "○";
    case "medium":
      return "◐";
    case "high":
      return "●";
    case "xhigh":
      return "◉";
    case "max":
      return "◈";
  }
}

function isOpus47Model(model: string): boolean {
  const normalized = model.toLowerCase();
  return normalized === DEFAULT_MODEL || normalized === "opus" || normalized === "opus[1m]" || normalized.includes("opus-4-7");
}

function sample<T>(items: readonly T[], random: () => number): T | undefined {
  if (items.length === 0) return undefined;
  const index = Math.min(items.length - 1, Math.floor(random() * items.length));
  return items[index];
}

function isTruthyEnv(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase().trim());
}

function displayPath(path: string): string {
  const home = homedir();
  if (path === home) return "~";
  if (path.startsWith(`${home}${sep}`)) return `~/${path.slice(home.length + 1)}`;
  return path;
}

function truncatePath(path: string, maxWidth: number): string {
  if (stringWidth(path) <= maxWidth) return path;
  const parts = path.split("/");
  if (parts.length <= 2) return truncateToWidth(path, maxWidth);
  let suffix = parts[parts.length - 1] || "";
  for (let index = parts.length - 2; index >= 0; index--) {
    const part = parts[index];
    if (!part) continue;
    const candidate = `${part}/${suffix}`;
    const compressed = `/…/${candidate}`;
    if (stringWidth(compressed) > maxWidth) break;
    suffix = candidate;
  }
  const candidate = `/…/${suffix}`;
  if (stringWidth(candidate) <= maxWidth) return candidate;
  return truncateToWidth(candidate, maxWidth);
}

function truncateToWidth(value: string, maxWidth: number): string {
  if (maxWidth <= 0) return "";
  if (stringWidth(value) <= maxWidth) return value;
  if (maxWidth <= 1) return "…";

  let output = "";
  for (const char of value) {
    if (stringWidth(`${output}${char}…`) > maxWidth) break;
    output += char;
  }
  return `${output}…`;
}
