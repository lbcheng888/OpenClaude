import { existsSync, readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";
import { readClaudeSettingString } from "../config/claude-settings.js";

export type OutputStyleConfig = {
  name: string;
  description: string;
  prompt: string;
  keepCodingInstructions?: boolean;
};

const DEFAULT_OUTPUT_STYLE_NAME = "default";

const EXPLANATORY_INSIGHTS_PROMPT = [
  "## Insights",
  "In order to encourage learning, before and after writing code, always provide brief educational explanations about implementation choices.",
  "These insights should be included in the conversation, not in the codebase. Focus on points that are specific to the current codebase and change.",
].join("\n\n");

const BUILT_IN_OUTPUT_STYLES: Record<string, OutputStyleConfig | null> = {
  [DEFAULT_OUTPUT_STYLE_NAME]: null,
  Explanatory: {
    name: "Explanatory",
    description: "Claude explains its implementation choices and codebase patterns",
    keepCodingInstructions: true,
    prompt: [
      "You are an interactive CLI tool that helps users with software engineering tasks. In addition to software engineering tasks, you should provide educational insights about the codebase along the way.",
      "You should be clear and educational, providing helpful explanations while remaining focused on the task. Balance educational content with task completion.",
      "# Explanatory Style Active",
      EXPLANATORY_INSIGHTS_PROMPT,
    ].join("\n\n"),
  },
  Learning: {
    name: "Learning",
    description: "Claude pauses and asks you to write small pieces of code for hands-on practice",
    keepCodingInstructions: true,
    prompt: [
      "You are an interactive CLI tool that helps users with software engineering tasks. In addition to software engineering tasks, you should help users learn more about the codebase through hands-on practice and educational insights.",
      "Balance task completion with learning by requesting user input for meaningful design decisions while handling routine implementation yourself.",
      "# Learning Style Active",
      "Ask the human to contribute small, meaningful code pieces only when the task has a real design decision and the contribution will help them learn. Add a TODO(human) marker before asking, then wait for the human contribution.",
      EXPLANATORY_INSIGHTS_PROMPT,
    ].join("\n\n"),
  },
};

export function getConfiguredOutputStyle(
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
): OutputStyleConfig | null {
  const configured = readClaudeSettingString("outputStyle") || DEFAULT_OUTPUT_STYLE_NAME;
  const allStyles = discoverOutputStyles(cwd, additionalWorkingDirectories);
  return allStyles.get(configured) ?? null;
}

export function discoverOutputStyles(
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
): Map<string, OutputStyleConfig | null> {
  const styles = new Map<string, OutputStyleConfig | null>(Object.entries(BUILT_IN_OUTPUT_STYLES));
  for (const style of [
    ...loadOutputStyleDir(join(getClaudeConfigDir(), "output-styles")),
    ...getProjectDirs(cwd).flatMap(dir => loadOutputStyleDir(join(dir, ".claude", "output-styles"))),
    ...additionalWorkingDirectories.flatMap(dir => loadOutputStyleDir(join(resolve(cwd, dir), ".claude", "output-styles"))),
    ...loadOutputStyleDir(join(getManagedFilePath(), ".claude", "output-styles")),
  ]) {
    styles.set(style.name, style);
  }
  return styles;
}

function loadOutputStyleDir(dir: string): OutputStyleConfig[] {
  if (!existsSync(dir)) return [];
  let entries: string[];
  try {
    entries = readdirSync(dir)
      .filter(name => name.endsWith(".md") && !name.startsWith("."))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }

  const styles: OutputStyleConfig[] = [];
  for (const entry of entries) {
    const filePath = join(dir, entry);
    const parsed = parseOutputStyleFile(filePath);
    if (parsed) styles.push(parsed);
  }
  return styles;
}

function parseOutputStyleFile(filePath: string): OutputStyleConfig | null {
  try {
    const raw = readFileSync(filePath, "utf8");
    const { frontmatter, content } = parseFrontmatter(raw);
    const fallbackName = basename(filePath).replace(/\.md$/u, "");
    const name = stringValue(frontmatter.name) || fallbackName;
    const description = stringValue(frontmatter.description) || firstMarkdownTextLine(content) || `Custom ${fallbackName} output style`;
    const keepCodingInstructions = parseBoolean(frontmatter["keep-coding-instructions"]);
    return {
      name,
      description,
      prompt: content.trim(),
      ...(keepCodingInstructions === undefined ? {} : { keepCodingInstructions }),
    };
  } catch {
    return null;
  }
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; content: string } {
  if (!raw.startsWith("---\n")) return { frontmatter: {}, content: raw };
  const end = raw.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: {}, content: raw };
  const yamlText = raw.slice(4, end);
  const contentStart = raw[end + 4] === "\n" ? end + 5 : end + 4;
  const parsed = parseYaml(yamlText);
  return {
    frontmatter: parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {},
    content: raw.slice(contentStart),
  };
}

function firstMarkdownTextLine(content: string): string | undefined {
  for (const line of content.split(/\r?\n/u)) {
    const trimmed = line.trim().replace(/^#+\s*/u, "");
    if (trimmed) return trimmed;
  }
  return undefined;
}

function getProjectDirs(cwd: string): string[] {
  const dirs: string[] = [];
  let current = resolve(cwd);
  while (true) {
    dirs.push(current);
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return dirs.reverse();
}

function getClaudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

function getManagedFilePath(): string {
  if (process.env.USER_TYPE === "ant" && process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH) {
    return process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH;
  }
  if (process.platform === "darwin") return "/Library/Application Support/ClaudeCode";
  if (process.platform === "win32") return "C:\\Program Files\\ClaudeCode";
  return "/etc/claude-code";
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function parseBoolean(value: unknown): boolean | undefined {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return undefined;
}
