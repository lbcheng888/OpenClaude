import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { homedir, release as osRelease, type as osType, version as osVersion } from "node:os";
import { dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import ignore from "ignore";
import { Lexer } from "marked";
import { parse as parseYaml } from "yaml";

const MEMORY_INSTRUCTION_PROMPT =
  "Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.";
const MAX_STATUS_CHARS = 2_000;
const MAX_MEMORY_FILE_CHARS = 40_000;
const MAX_INCLUDE_DEPTH = 5;

type MemoryType = "Managed" | "User" | "Project" | "Local";

type MemoryFile = {
  path: string;
  type: MemoryType;
  content: string;
  parent?: string;
  globs?: string[];
};

export type OfficialContextOptions = {
  cwd?: string;
  model?: string;
  additionalWorkingDirectories?: string[];
  languagePreference?: string | null;
  outputStyle?: { name: string; prompt: string } | null;
  mcpInstructions?: Array<{ name: string; instructions?: string | null }>;
  includeExternalClaudeMd?: boolean;
};

const TEXT_FILE_EXTENSIONS = new Set([
  ".md",
  ".txt",
  ".text",
  ".json",
  ".yaml",
  ".yml",
  ".toml",
  ".xml",
  ".csv",
  ".html",
  ".htm",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".js",
  ".ts",
  ".tsx",
  ".jsx",
  ".mjs",
  ".cjs",
  ".mts",
  ".cts",
  ".py",
  ".pyi",
  ".pyw",
  ".rb",
  ".erb",
  ".rake",
  ".go",
  ".rs",
  ".java",
  ".kt",
  ".kts",
  ".scala",
  ".c",
  ".cpp",
  ".cc",
  ".cxx",
  ".h",
  ".hpp",
  ".hxx",
  ".cs",
  ".swift",
  ".sh",
  ".bash",
  ".zsh",
  ".fish",
  ".ps1",
  ".bat",
  ".cmd",
  ".env",
  ".ini",
  ".cfg",
  ".conf",
  ".config",
  ".properties",
  ".sql",
  ".graphql",
  ".gql",
  ".proto",
  ".vue",
  ".svelte",
  ".astro",
  ".ejs",
  ".hbs",
  ".pug",
  ".jade",
  ".php",
  ".pl",
  ".pm",
  ".lua",
  ".r",
  ".R",
  ".dart",
  ".ex",
  ".exs",
  ".erl",
  ".hrl",
  ".clj",
  ".cljs",
  ".cljc",
  ".edn",
  ".hs",
  ".lhs",
  ".elm",
  ".ml",
  ".mli",
  ".cmake",
  ".make",
  ".makefile",
  ".gradle",
  ".sbt",
  ".rst",
  ".adoc",
  ".asciidoc",
  ".org",
  ".tex",
  ".latex",
  ".lock",
  ".log",
  ".diff",
  ".patch",
]);

export function buildOfficialContextSections(options: OfficialContextOptions = {}): string[] {
  const cwd = resolve(options.cwd || process.cwd());
  return [
    buildLanguagePreferenceContext(options.languagePreference),
    buildOutputStyleContext(options.outputStyle),
    buildOfficialEnvironmentContext({
      cwd,
      model: options.model,
      additionalWorkingDirectories: options.additionalWorkingDirectories,
    }),
    buildMcpInstructionsContext(options.mcpInstructions),
    buildGitStatusContext(cwd),
    buildClaudeMdContext(cwd, options.additionalWorkingDirectories || [], {
      includeExternal: options.includeExternalClaudeMd,
    }),
    buildCurrentDateContext(),
  ].filter((section): section is string => Boolean(section));
}

export function appendOfficialContext(basePrompt: string, options: OfficialContextOptions = {}): string {
  return [basePrompt, ...buildOfficialContextSections(options)].join("\n\n");
}

export function buildOfficialEnvironmentContext(options: OfficialContextOptions = {}): string {
  const cwd = resolve(options.cwd || process.cwd());
  const additionalDirs = (options.additionalWorkingDirectories || []).map(dir => resolve(cwd, dir));
  const items: Array<string | string[] | null> = [
    `Primary working directory: ${cwd}`,
    isGitWorktree(cwd)
      ? "This is a git worktree - an isolated copy of the repository. Run all commands from this directory. Do NOT `cd` to the original repository root."
      : null,
    [`Is a git repository: ${isGitRepository(cwd)}`],
    additionalDirs.length > 0 ? "Additional working directories:" : null,
    additionalDirs.length > 0 ? additionalDirs : null,
    `Platform: ${process.platform}`,
    getShellInfoLine(),
    `OS Version: ${getUnameSR()}`,
    options.model ? `You are powered by the model ${options.model}.` : null,
  ].filter((item): item is string | string[] => item !== null);

  return [
    "# Environment",
    "You have been invoked in the following environment: ",
    ...prependBullets(items),
  ].join("\n");
}

function buildLanguagePreferenceContext(languagePreference?: string | null): string | null {
  if (!languagePreference) return null;
  return `# Language Preference\nAlways respond in ${languagePreference}. Use ${languagePreference} for all explanations, comments, and communications with the user. Technical terms and code identifiers should remain in their original form.`;
}

function buildOutputStyleContext(outputStyle?: { name: string; prompt: string } | null): string | null {
  if (!outputStyle) return null;
  return `# Output Style: ${outputStyle.name}\n${outputStyle.prompt}`;
}

function buildMcpInstructionsContext(clients?: Array<{ name: string; instructions?: string | null }>): string | null {
  const clientsWithInstructions = (clients || []).filter(client => client.instructions);
  if (clientsWithInstructions.length === 0) return null;
  const blocks = clientsWithInstructions
    .map(client => `## ${client.name}\n${client.instructions}`)
    .join("\n\n");
  return `# MCP Server Instructions\n\nThe following MCP servers have provided instructions for how to use their tools and resources:\n\n${blocks}`;
}

export function buildCurrentDateContext(date = new Date()): string {
  return `Today's date is ${formatLocalISODate(date)}.`;
}

export function buildGitStatusContext(cwd = process.cwd()): string | null {
  if (!isGitRepository(cwd)) return null;
  const branch = gitOutput(cwd, ["branch", "--show-current"]) || "unknown";
  const mainBranch = getDefaultBranch(cwd);
  const status = truncateStatus(gitOutput(cwd, ["--no-optional-locks", "status", "--short"]) || "");
  const log = gitOutput(cwd, ["--no-optional-locks", "log", "--oneline", "-n", "5"]) || "";
  const userName = gitOutput(cwd, ["config", "user.name"]);

  return [
    "This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.",
    `Current branch: ${branch}`,
    `Main branch (you will usually use this for PRs): ${mainBranch}`,
    ...(userName ? [`Git user: ${userName}`] : []),
    `Status:\n${status || "(clean)"}`,
    `Recent commits:\n${log}`,
  ].join("\n\n");
}

export function buildClaudeMdContext(
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
  options: { includeExternal?: boolean } = {},
): string | null {
  if (isTruthyEnv(process.env.CLAUDE_CODE_DISABLE_CLAUDE_MDS)) return null;
  const files = discoverMemoryFiles(resolve(cwd), additionalWorkingDirectories, options);
  if (files.length === 0) return null;

  const sections = files.map(file => {
    const description = file.type === "Project"
      ? " (project instructions, checked into the codebase)"
      : file.type === "Local"
        ? " (user's private project instructions, not checked in)"
        : " (user's private global instructions for all projects)";
    return `Contents of ${file.path}${description}:\n\n${file.content.trim()}`;
  });

  return `${MEMORY_INSTRUCTION_PROMPT}\n\n${sections.join("\n\n")}`;
}

export function discoverMemoryFiles(
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
  options: { includeExternal?: boolean } = {},
): MemoryFile[] {
  const resolvedCwd = resolve(cwd);
  const includeExternal = options.includeExternal || hasApprovedExternalIncludes();
  const seen = new Set<string>();
  const files: MemoryFile[] = [];

  addMemoryFile(files, seen, join(getManagedFilePath(), "CLAUDE.md"), "Managed", false, resolvedCwd);
  addRuleFiles(files, seen, join(getManagedFilePath(), ".claude", "rules"), "Managed", false, false, resolvedCwd);
  addMemoryFile(files, seen, join(getClaudeConfigDir(), "CLAUDE.md"), "User", true, resolvedCwd);
  addRuleFiles(files, seen, join(getClaudeConfigDir(), "rules"), "User", true, false, resolvedCwd);
  for (const dir of getAncestorDirs(resolvedCwd)) {
    addProjectMemoryFiles(files, seen, dir, includeExternal, resolvedCwd);
  }
  for (const dir of additionalWorkingDirectories) {
    addProjectMemoryFiles(files, seen, resolve(resolvedCwd, dir), includeExternal, resolvedCwd);
  }

  return files;
}

export function buildNestedClaudeMdContextForPath(
  targetPath: string,
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
  options: { includeExternal?: boolean } = {},
): string | null {
  const files = discoverConditionalMemoryFilesForPath(targetPath, cwd, additionalWorkingDirectories, options);
  if (files.length === 0) return null;
  return buildClaudeMdContextFromFiles(files);
}

export function discoverConditionalMemoryFilesForPath(
  targetPath: string,
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
  options: { includeExternal?: boolean } = {},
): MemoryFile[] {
  const resolvedCwd = resolve(cwd);
  const resolvedTarget = resolve(resolvedCwd, targetPath);
  const includeExternal = options.includeExternal || hasApprovedExternalIncludes();
  const seen = new Set<string>();
  const files: MemoryFile[] = [];

  addRuleFiles(files, seen, join(getManagedFilePath(), ".claude", "rules"), "Managed", false, true, resolvedCwd, resolvedTarget);
  addRuleFiles(files, seen, join(getClaudeConfigDir(), "rules"), "User", true, true, resolvedCwd, resolvedTarget);

  const dirs = getAncestorDirs(dirname(resolvedTarget));
  for (const dir of dirs) {
    addProjectMemoryFiles(files, seen, dir, includeExternal, resolvedCwd, resolvedTarget);
  }
  for (const dir of additionalWorkingDirectories) {
    addProjectMemoryFiles(files, seen, resolve(resolvedCwd, dir), includeExternal, resolvedCwd, resolvedTarget);
  }

  return files;
}

function addProjectMemoryFiles(
  files: MemoryFile[],
  seen: Set<string>,
  dir: string,
  includeExternal: boolean,
  originalCwd: string,
  targetPath?: string,
): void {
  if (targetPath && !pathWithin(targetPath, dir)) {
    return;
  }
  addMemoryFile(files, seen, join(dir, "CLAUDE.md"), "Project", includeExternal, originalCwd);
  addMemoryFile(files, seen, join(dir, ".claude", "CLAUDE.md"), "Project", includeExternal, originalCwd);
  addRuleFiles(files, seen, join(dir, ".claude", "rules"), "Project", includeExternal, Boolean(targetPath), originalCwd, targetPath);
  addMemoryFile(files, seen, join(dir, "CLAUDE.local.md"), "Local", includeExternal, originalCwd);
}

function addRuleFiles(
  files: MemoryFile[],
  seen: Set<string>,
  rulesDir: string,
  type: MemoryType,
  includeExternal: boolean,
  conditionalRule: boolean,
  originalCwd: string,
  targetPath?: string,
  visited = new Set<string>(),
): void {
  if (!existsSync(rulesDir)) return;
  const resolvedRulesDir = safeRealpath(rulesDir);
  if (visited.has(resolvedRulesDir)) return;
  visited.add(resolvedRulesDir);
  let entries: ReturnType<typeof readdirSync>;
  try {
    entries = readdirSync(resolvedRulesDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return;
  }
  for (const entry of entries) {
    const entryPath = join(resolvedRulesDir, entry.name);
    if (entry.isDirectory()) {
      addRuleFiles(files, seen, entryPath, type, includeExternal, conditionalRule, originalCwd, targetPath, visited);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const before = files.length;
    addMemoryFile(files, seen, entryPath, type, includeExternal, originalCwd);
    const added = files.splice(before);
    for (const file of added) {
      const isConditional = Boolean(file.globs && file.globs.length > 0);
      if (conditionalRule !== isConditional) continue;
      if (conditionalRule && targetPath && !matchesRulePath(file, resolvedRulesDir, targetPath, originalCwd)) continue;
      files.push(file);
    }
  }
}

function addMemoryFile(
  files: MemoryFile[],
  seen: Set<string>,
  filePath: string,
  type: MemoryType,
  includeExternal: boolean,
  originalCwd: string,
  depth = 0,
  parent?: string,
): void {
  if (depth >= MAX_INCLUDE_DEPTH) return;
  const resolved = resolve(filePath);
  const real = safeRealpath(resolved);
  if (seen.has(resolved) || seen.has(real) || !existsSync(real)) return;
  try {
    if (!statSync(real).isFile()) return;
    const parsed = parseMemoryFile(readFileSync(real, "utf8"), real, type);
    if (!parsed.file || !parsed.file.content.trim()) return;
    seen.add(resolved);
    seen.add(real);
    if (parent) parsed.file.parent = parent;
    files.push(parsed.file);

    for (const includePath of parsed.includePaths) {
      const canInclude = type === "User" || includeExternal || pathWithin(includePath, originalCwd);
      if (!canInclude) continue;
      addMemoryFile(files, seen, includePath, type, includeExternal, originalCwd, depth + 1, real);
    }
  } catch {
    return;
  }
}

function buildClaudeMdContextFromFiles(files: MemoryFile[]): string {
  const sections = files.map(file => {
    const description = file.type === "Project"
      ? " (project instructions, checked into the codebase)"
      : file.type === "Local"
        ? " (user's private project instructions, not checked in)"
        : " (user's private global instructions for all projects)";
    return `Contents of ${file.path}${description}:\n\n${file.content.trim()}`;
  });
  return `${MEMORY_INSTRUCTION_PROMPT}\n\n${sections.join("\n\n")}`;
}

function parseMemoryFile(rawContent: string, filePath: string, type: MemoryType): { file: MemoryFile | null; includePaths: string[] } {
  const ext = extname(filePath).toLowerCase();
  if (ext && !TEXT_FILE_EXTENSIONS.has(ext)) return { file: null, includePaths: [] };

  const { content: withoutFrontmatter, paths } = parseFrontmatterPaths(rawContent);
  const needsLex = withoutFrontmatter.includes("<!--") || withoutFrontmatter.includes("@");
  const tokens = needsLex ? new Lexer({ gfm: false }).lex(withoutFrontmatter) : undefined;
  const content = tokens && withoutFrontmatter.includes("<!--")
    ? stripHtmlCommentsFromTokens(tokens)
    : withoutFrontmatter;
  const includePaths = tokens ? extractIncludePathsFromTokens(tokens, filePath) : [];

  return {
    file: {
      path: filePath,
      type,
      content: content.slice(0, MAX_MEMORY_FILE_CHARS),
      globs: paths,
    },
    includePaths,
  };
}

function parseFrontmatterPaths(rawContent: string): { content: string; paths?: string[] } {
  const match = rawContent.match(/^---\s*\n([\s\S]*?)---\s*\n?/u);
  if (!match) return { content: rawContent };
  const frontmatterText = match[1] || "";
  const content = rawContent.slice(match[0].length);
  let frontmatter: Record<string, unknown> = {};
  try {
    const parsed = parseYaml(frontmatterText);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      frontmatter = parsed as Record<string, unknown>;
    }
  } catch {
    const parsed = parseYaml(quoteProblematicYamlValues(frontmatterText));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      frontmatter = parsed as Record<string, unknown>;
    }
  }

  const paths = splitPathInFrontmatter(frontmatter.paths)
    .map(pattern => pattern.endsWith("/**") ? pattern.slice(0, -3) : pattern)
    .filter(pattern => pattern.length > 0);
  if (paths.length === 0 || paths.every(pattern => pattern === "**")) return { content };
  return { content, paths };
}

function quoteProblematicYamlValues(frontmatterText: string): string {
  return frontmatterText.split("\n").map(line => {
    const match = line.match(/^([a-zA-Z_-]+):\s+(.+)$/u);
    if (!match) return line;
    const [, key, value] = match;
    if (!key || !value || (value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      return line;
    }
    if (!/[{}[\]*&#!|>%@`]|: /u.test(value)) return line;
    return `${key}: "${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
  }).join("\n");
}

function splitPathInFrontmatter(input: unknown): string[] {
  if (Array.isArray(input)) return input.flatMap(splitPathInFrontmatter);
  if (typeof input !== "string") return [];
  const parts: string[] = [];
  let current = "";
  let braceDepth = 0;
  for (const char of input) {
    if (char === "{") {
      braceDepth += 1;
      current += char;
    } else if (char === "}") {
      braceDepth -= 1;
      current += char;
    } else if (char === "," && braceDepth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts.flatMap(expandBraces);
}

function expandBraces(pattern: string): string[] {
  const match = pattern.match(/^([^{]*)\{([^}]+)\}(.*)$/u);
  if (!match) return [pattern];
  const [, prefix = "", alternatives = "", suffix = ""] = match;
  return alternatives.split(",").flatMap(part => expandBraces(`${prefix}${part.trim()}${suffix}`));
}

type MarkdownToken = {
  type: string;
  text?: string;
  raw?: string;
  tokens?: MarkdownToken[];
  items?: MarkdownToken[];
};

function stripHtmlCommentsFromTokens(tokens: ReturnType<Lexer["lex"]>): string {
  let result = "";
  for (const token of tokens as MarkdownToken[]) {
    if (token.type === "html") {
      const raw = token.raw || "";
      const trimmed = raw.trimStart();
      if (trimmed.startsWith("<!--") && trimmed.includes("-->")) {
        const residue = raw.replace(/<!--[\s\S]*?-->/gu, "");
        if (residue.trim().length > 0) result += residue;
        continue;
      }
    }
    result += token.raw || "";
  }
  return result;
}

function extractIncludePathsFromTokens(tokens: ReturnType<Lexer["lex"]>, basePath: string): string[] {
  const paths = new Set<string>();
  const extract = (text: string) => {
    const includeRegex = /(?:^|\s)@((?:[^\s\\]|\\ )+)/gu;
    let match: RegExpExecArray | null;
    while ((match = includeRegex.exec(text)) !== null) {
      let includePath = match[1];
      if (!includePath) continue;
      const hashIndex = includePath.indexOf("#");
      if (hashIndex !== -1) includePath = includePath.slice(0, hashIndex);
      includePath = includePath.replace(/\\ /gu, " ");
      if (!isValidIncludePath(includePath)) continue;
      paths.add(expandIncludePath(includePath, dirname(basePath)));
    }
  };
  const visit = (items: MarkdownToken[]) => {
    for (const item of items) {
      if (item.type === "code" || item.type === "codespan") continue;
      if (item.type === "html") {
        const raw = item.raw || "";
        const trimmed = raw.trimStart();
        if (trimmed.startsWith("<!--") && trimmed.includes("-->")) {
          const residue = raw.replace(/<!--[\s\S]*?-->/gu, "");
          if (residue.trim().length > 0) extract(residue);
        }
        continue;
      }
      if (item.type === "text") extract(item.text || "");
      if (item.tokens) visit(item.tokens);
      if (item.items) visit(item.items);
    }
  };
  visit(tokens as MarkdownToken[]);
  return [...paths];
}

function isValidIncludePath(includePath: string): boolean {
  return includePath.startsWith("./")
    || includePath.startsWith("~/")
    || (includePath.startsWith("/") && includePath !== "/")
    || (!includePath.startsWith("@") && !/^[#%^&*()]+/u.test(includePath) && /^[a-zA-Z0-9._-]/u.test(includePath));
}

function expandIncludePath(includePath: string, baseDir: string): string {
  if (includePath.startsWith("~/")) return join(homedir(), includePath.slice(2));
  if (isAbsolute(includePath)) return resolve(includePath);
  return resolve(baseDir, includePath);
}

function matchesRulePath(file: MemoryFile, rulesDir: string, targetPath: string, originalCwd: string): boolean {
  if (!file.globs || file.globs.length === 0) return false;
  const baseDir = file.type === "Project" ? dirname(dirname(rulesDir)) : originalCwd;
  const rel = isAbsolute(targetPath) ? relative(baseDir, targetPath) : targetPath;
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) return false;
  return ignore().add(file.globs).ignores(rel);
}

function getAncestorDirs(cwd: string): string[] {
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

function getDefaultBranch(cwd: string): string {
  const remoteHead = gitOutput(cwd, ["symbolic-ref", "refs/remotes/origin/HEAD"]);
  if (remoteHead) return remoteHead.replace(/^refs\/remotes\/origin\//u, "");
  return gitOutput(cwd, ["rev-parse", "--abbrev-ref", "origin/HEAD"])?.replace(/^origin\//u, "") || "main";
}

function truncateStatus(status: string): string {
  if (status.length <= MAX_STATUS_CHARS) return status;
  return `${status.slice(0, MAX_STATUS_CHARS)}\n... (truncated because it exceeds 2k characters. If you need more information, run "git status" using BashTool)`;
}

function isGitRepository(cwd: string): boolean {
  return gitOutput(cwd, ["rev-parse", "--is-inside-work-tree"]) === "true";
}

function gitOutput(cwd: string, args: string[]): string | null {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function getClaudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

function formatLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isTruthyEnv(value: string | undefined): boolean {
  if (!value) return false;
  return !["0", "false", "no", "off"].includes(value.toLowerCase());
}
