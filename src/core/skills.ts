import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";

export type SkillSummary = {
  name: string;
  description: string;
  whenToUse?: string;
  path: string;
  userInvocable: boolean;
  disableModelInvocation: boolean;
  contentLength: number;
  paths?: string[];
};

export type LoadedSkill = SkillSummary & {
  content: string;
};

export function discoverSkills(
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
): SkillSummary[] {
  const seen = new Set<string>();
  const skills: SkillSummary[] = [];
  const dirs = [
    join(getManagedFilePath(), ".claude", "skills"),
    join(getClaudeConfigDir(), "skills"),
    ...getProjectDirs(cwd).map(dir => join(dir, ".claude", "skills")),
    ...additionalWorkingDirectories.map(dir => join(resolve(cwd, dir), ".claude", "skills")),
  ];

  for (const dir of dirs) {
    for (const skill of loadSkillsDir(dir)) {
      const key = safeRealpath(skill.path);
      if (seen.has(key)) continue;
      seen.add(key);
      if (skill.paths && skill.paths.length > 0) continue;
      skills.push(skill);
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

export function loadSkillByName(
  name: string,
  cwd = process.cwd(),
  additionalWorkingDirectories: string[] = [],
): LoadedSkill | null {
  const normalized = name.trim();
  if (!normalized) return null;
  const dirs = [
    join(getManagedFilePath(), ".claude", "skills"),
    join(getClaudeConfigDir(), "skills"),
    ...getProjectDirs(cwd).map(dir => join(dir, ".claude", "skills")),
    ...additionalWorkingDirectories.map(dir => join(resolve(cwd, dir), ".claude", "skills")),
  ];

  const byName = new Map<string, LoadedSkill>();
  for (const dir of dirs) {
    for (const skill of loadSkillsDir(dir, true)) {
      if (skill.name === normalized) byName.set(skill.name, skill as LoadedSkill);
    }
  }
  return byName.get(normalized) || null;
}

export function buildSkillsContext(skills: SkillSummary[]): string | null {
  const visibleSkills = skills.filter(skill => !skill.disableModelInvocation);
  if (visibleSkills.length === 0) return null;
  const listing = visibleSkills
    .map(skill => {
      const parts = [`- ${skill.name}: ${skill.description}`];
      if (skill.whenToUse) parts.push(`  When to use: ${skill.whenToUse}`);
      parts.push(`  Path: ${skill.path}`);
      return parts.join("\n");
    })
    .join("\n");
  return `# Skills\nThe following skills are available for use with the Skill tool. Invoke Skill with the exact skill name only when the user's task matches the skill description or when_to_use guidance.\n\n${listing}`;
}

function loadSkillsDir(dir: string, includeContent = false): Array<SkillSummary | LoadedSkill> {
  if (!existsSync(dir)) return [];
  let entries: string[];
  try {
    entries = readdirSync(dir)
      .filter(name => !name.startsWith("."))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }

  const skills: Array<SkillSummary | LoadedSkill> = [];
  for (const entry of entries) {
    const skillDir = join(dir, entry);
    const skillPath = join(skillDir, "SKILL.md");
    try {
      if (!statSync(skillDir).isDirectory() && !statSync(skillDir).isSymbolicLink()) continue;
      if (!existsSync(skillPath)) continue;
      const raw = readFileSync(skillPath, "utf8");
      const { frontmatter, content } = parseFrontmatter(raw);
      const parsed = parseSkillFile(entry, skillPath, frontmatter, content);
      if (!parsed) continue;
      skills.push(includeContent ? { ...parsed, content: content.trim() } : parsed);
    } catch {
      continue;
    }
  }
  return skills;
}

function parseSkillFile(
  fallbackName: string,
  skillPath: string,
  frontmatter: Record<string, unknown>,
  content: string,
): SkillSummary | null {
  const name = stringValue(frontmatter.name) || fallbackName;
  const description = stringValue(frontmatter.description) || firstMarkdownTextLine(content) || `Skill ${name}`;
  const paths = parsePaths(frontmatter.paths);
  return {
    name,
    description,
    whenToUse: stringValue(frontmatter.when_to_use),
    path: skillPath,
    userInvocable: parseBoolean(frontmatter["user-invocable"], true),
    disableModelInvocation: parseBoolean(frontmatter["disable-model-invocation"], false),
    contentLength: content.length,
    ...(paths.length > 0 ? { paths } : {}),
  };
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

function parsePaths(value: unknown): string[] {
  if (value === undefined || value === null) return [];
  const values = Array.isArray(value) ? value : String(value).split(/[,;\n]/u);
  return values.map(item => String(item).trim()).filter(Boolean).filter(item => item !== "**");
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

function firstMarkdownTextLine(content: string): string | undefined {
  for (const line of content.split(/\r?\n/u)) {
    const trimmed = line.trim().replace(/^#+\s*/u, "");
    if (trimmed) return trimmed;
  }
  return undefined;
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

function parseBoolean(value: unknown, defaultValue: boolean): boolean {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return defaultValue;
}

function safeRealpath(path: string): string {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
}
