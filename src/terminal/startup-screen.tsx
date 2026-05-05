import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, sep } from "node:path";
import React from "react";
import { Box, Text, color, stringWidth } from "@anthropic/ink";
import { readClaudeSettingString } from "../config/claude-settings.js";

const LEFT_PANEL_MAX_WIDTH = 50;
const BORDER_PADDING = 4;
const CONTENT_PADDING = 2;
const DIVIDER_WIDTH = 1;
const MAX_RELEASE_NOTES = 3;
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

function readRecentReleaseNotes(version: string): string[] {
  const changelogPath = join(homedir(), ".claude", "cache", "changelog.md");
  if (!existsSync(changelogPath)) return [];

  const content = readFileSync(changelogPath, "utf8");
  const sections = content.split(/^## /gm).slice(1);
  const parsed = sections.map(section => {
    const lines = section.trim().split("\n");
    const sectionVersion = (lines[0] || "").split(" - ")[0]?.trim() || "";
    const notes = lines
      .slice(1)
      .filter(line => line.trim().startsWith("- "))
      .map(line => line.trim().slice(2).trim())
      .filter(Boolean);
    return { version: sectionVersion, notes };
  });

  const exact = parsed.find(section => section.version === version);
  const source = exact?.notes.length ? exact : parsed.find(section => section.notes.length > 0);
  return source ? source.notes.slice(0, MAX_RELEASE_NOTES) : [];
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
