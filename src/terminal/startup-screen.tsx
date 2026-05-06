import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, sep } from "node:path";
import React from "react";
import { Box, Text, color, stringWidth } from "@anthropic/ink";
import { readClaudeSettingString } from "../config/claude-settings.js";

export const CHANGELOG_URL = "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md";
const RAW_CHANGELOG_URL = "https://raw.githubusercontent.com/anthropics/claude-code/refs/heads/main/CHANGELOG.md";
const LEFT_PANEL_MAX_WIDTH = 50;
const BORDER_PADDING = 4;
const CONTENT_PADDING = 2;
const DIVIDER_WIDTH = 1;
const MAX_RELEASE_NOTES_SHOWN = 5;
const BUILT_IN_CHANGELOG = [
  "# Changelog",
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
  "refactor <filepath>",
  "how do I log an error?",
  "write a test for <filepath>",
];

type ThemeName = "dark" | "light" | "light-daltonized" | "dark-daltonized" | "light-ansi" | "dark-ansi";
type LayoutMode = "horizontal" | "compact";
type FeedConfig = {
  title: string;
  lines: string[];
  footer?: string;
  emptyMessage?: string;
};
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
  const theme = getThemeName();
  const layoutMode: LayoutMode = columns >= 70 ? "horizontal" : "compact";
  const cwd = displayPath(process.cwd());
  const modelDisplay = truncateToWidth(`${model}${getEffortSuffix(model)}`, 30);
  const modelLine = `${modelDisplay} · API Usage Billing`;
  const cwdLine = truncatePath(cwd, LEFT_PANEL_MAX_WIDTH);
  const welcomeMessage = "Welcome back!";
  const leftWidth = Math.min(
    LEFT_PANEL_MAX_WIDTH,
    Math.max(24, Math.max(stringWidth(welcomeMessage), stringWidth(cwdLine), stringWidth(modelLine), 20) + 4),
  );
  const totalWidth =
    layoutMode === "horizontal"
      ? Math.max(40, columns - 2)
      : Math.min(Math.max(40, columns - 2), LEFT_PANEL_MAX_WIDTH + BORDER_PADDING + 20);
  const rightWidth = Math.max(
    28,
    totalWidth - leftWidth - BORDER_PADDING - CONTENT_PADDING - DIVIDER_WIDTH,
  );
  const borderTitle = ` ${color("claude", theme)("Claude Code")} ${color("inactive", theme)(`v${version}`)} `;
  const feed = createStartupFeed(version);

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="claude"
      borderText={{ content: borderTitle, position: "top", align: "start", offset: 3 }}
      width={totalWidth}
    >
      <Box flexDirection={layoutMode === "horizontal" ? "row" : "column"} paddingX={1} gap={1}>
        <Box
          flexDirection="column"
          width={layoutMode === "horizontal" ? leftWidth : totalWidth - BORDER_PADDING}
          justifyContent="space-between"
          alignItems="center"
          minHeight={9}
        >
          <Box marginTop={1}>
            <Text bold>{welcomeMessage}</Text>
          </Box>
          <ClawdMark />
          <Box flexDirection="column" alignItems="center">
            <Text dimColor wrap="truncate">{truncateToWidth(modelLine, Math.max(10, leftWidth))}</Text>
            <Text dimColor wrap="truncate">{truncatePath(cwdLine, Math.max(10, leftWidth))}</Text>
          </Box>
        </Box>

        {layoutMode === "horizontal" && (
          <>
            <Box
              height="100%"
              borderStyle="single"
              borderColor="claude"
              borderDimColor
              borderTop={false}
              borderBottom={false}
              borderLeft={false}
            />
            <FeedView config={feed} width={rightWidth} />
          </>
        )}
      </Box>
    </Box>
  );
}

export function getPromptPlaceholder(): string {
  const index = Math.abs(hashString(process.cwd())) % PROMPT_EXAMPLES.length;
  return `Try "${PROMPT_EXAMPLES[index]}"`;
}

export function getEffortStatus(model: string): string {
  const level = getDisplayedEffortLevel(model);
  return `${effortLevelToSymbol(level)} ${level} · /effort`;
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

function FeedView({ config, width }: { config: FeedConfig; width: number }): React.ReactElement {
  return (
    <Box flexDirection="column" width={width}>
      <Text bold color="claude" wrap="truncate">
        {config.title}
      </Text>
      {config.lines.length > 0 ? (
        <>
          {config.lines.map((line, index) => (
            <Text key={`${line}-${index}`} wrap="truncate">{truncateToWidth(line, width)}</Text>
          ))}
          {config.footer && (
            <Text dimColor italic wrap="truncate">
              {truncateToWidth(config.footer, width)}
            </Text>
          )}
        </>
      ) : (
        <Text dimColor wrap="truncate">{truncateToWidth(config.emptyMessage || "", width)}</Text>
      )}
    </Box>
  );
}

function createStartupFeed(version: string): FeedConfig {
  const releaseNotes = readRecentReleaseNotes(version);
  if (releaseNotes.length > 0) {
    return {
      title: "What's new",
      lines: releaseNotes,
      footer: "/release-notes for more",
    };
  }

  return {
    title: "Tips for getting started",
    lines: [
      "Run /init to create a CLAUDE.md file",
      'Try "refactor <filepath>"',
      "/mcp to configure MCP servers",
    ],
  };
}

export function readRecentReleaseNotes(version: string): string[] {
  const changelogPath = getChangelogCachePath();
  const previousVersion = readLastReleaseNotesSeen();
  if (!existsSync(changelogPath)) return getRecentReleaseNotes(version, previousVersion, BUILT_IN_CHANGELOG);

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
  const explicitEffort = getExplicitEffortLevel();
  if (!explicitEffort || !modelSupportsEffort(model)) return "";
  return ` with ${explicitEffort} effort`;
}

function getDisplayedEffortLevel(model: string): EffortLevel {
  const explicitEffort = getExplicitEffortLevel();
  if (explicitEffort && modelSupportsEffort(model)) return explicitEffort;
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
      return "⦿";
    case "max":
      return "◉";
  }
}

function getThemeName(): ThemeName {
  const theme = readClaudeSettingString("theme");
  if (
    theme === "dark" ||
    theme === "light" ||
    theme === "light-daltonized" ||
    theme === "dark-daltonized" ||
    theme === "light-ansi" ||
    theme === "dark-ansi"
  ) {
    return theme;
  }
  return "dark";
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
  const last = parts[parts.length - 1] || "";
  const first = parts[0] || "";
  const prefix = first ? `${first}/` : "/";
  const candidate = `${prefix}…/${last}`;
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

function hashString(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return hash;
}
