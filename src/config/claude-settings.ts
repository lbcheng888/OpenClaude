import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

export type HookCommand =
  | {
      type: "command";
      command: string;
      matcher?: string;
      if?: string;
      timeout?: number;
      statusMessage?: string;
      async?: boolean;
      asyncRewake?: boolean;
      shell?: string;
    }
  | {
      type: "http";
      url: string;
      matcher?: string;
      if?: string;
      timeout?: number;
      headers?: Record<string, string>;
    };

export type HookMatcher = {
  matcher?: string;
  hooks?: HookCommand[];
};

export type ClaudeSettings = {
  effortLevel?: unknown;
  env?: Record<string, unknown>;
  hooks?: Record<string, HookMatcher[]>;
  model?: unknown;
  permissions?: {
    allow?: unknown;
    deny?: unknown;
    defaultMode?: unknown;
  };
  theme?: unknown;
};

let cachedSettings: ClaudeSettings | null | undefined;

export function readClaudeSettings(): ClaudeSettings | null {
  if (cachedSettings !== undefined) return cachedSettings;

  const sources = getSettingsSourcePaths();
  let merged: ClaudeSettings | null = null;

  for (const settingsPath of sources) {
    if (!existsSync(settingsPath)) continue;
    const parsed = parseSettingsFile(settingsPath);
    if (!parsed) continue;
    merged = mergeSettings(merged || {}, parsed);
  }

  cachedSettings = merged;
  return cachedSettings;
}

export function loadClaudeSettingsEnv(): void {
  const settings = readClaudeSettings();
  const env = settings?.env;
  if (!env) return;

  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] !== undefined) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      process.env[key] = String(value);
    }
  }
}

export function readClaudeSettingString(key: keyof ClaudeSettings): string | undefined {
  const value = readClaudeSettings()?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function clearClaudeSettingsCache(): void {
  cachedSettings = undefined;
}

export function getSettingsSourcePaths(cwd = process.cwd()): string[] {
  const projectDirs = getProjectSettingsDirs(cwd);
  const paths = [
    join(getClaudeConfigDir(), "settings.json"),
    ...projectDirs.flatMap(dir => [
      join(dir, ".claude", "settings.json"),
      join(dir, ".claude", "settings.local.json"),
    ]),
  ];
  const flagSettingsPath = process.env.CLAUDE_CODE_SETTINGS_PATH;
  if (flagSettingsPath) {
    paths.push(resolve(flagSettingsPath));
  }
  paths.push(...getManagedSettingsSourcePaths());
  return paths;
}

function getClaudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

function getProjectSettingsDirs(cwd: string): string[] {
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

function parseSettingsFile(settingsPath: string): ClaudeSettings | null {
  const parsed = JSON.parse(readFileSync(settingsPath, "utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return null;
  }
  return parsed as ClaudeSettings;
}

function mergeSettings(base: ClaudeSettings, next: ClaudeSettings): ClaudeSettings {
  const merged = mergeDeep(base, next) as ClaudeSettings;
  merged.env = mergeRecords(base.env, next.env);
  merged.hooks = mergeHooks(base.hooks, next.hooks);
  merged.permissions = {
    ...(base.permissions || {}),
    ...(next.permissions || {}),
    allow: mergeArray(base.permissions?.allow, next.permissions?.allow),
    deny: mergeArray(base.permissions?.deny, next.permissions?.deny),
  };
  return merged;
}

function mergeRecords(
  base: Record<string, unknown> | undefined,
  next: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!base && !next) return undefined;
  return { ...(base || {}), ...(next || {}) };
}

function mergeHooks(
  base: Record<string, HookMatcher[]> | undefined,
  next: Record<string, HookMatcher[]> | undefined,
): Record<string, HookMatcher[]> | undefined {
  if (!base && !next) return undefined;
  const merged: Record<string, HookMatcher[]> = { ...(base || {}) };
  for (const [event, matchers] of Object.entries(next || {})) {
    if (!Array.isArray(matchers)) continue;
    merged[event] = [...(merged[event] || []), ...matchers];
  }
  return merged;
}

function mergeArray(base: unknown, next: unknown): unknown[] | undefined {
  const baseArray = Array.isArray(base) ? base : [];
  const nextArray = Array.isArray(next) ? next : [];
  if (baseArray.length === 0 && nextArray.length === 0) return undefined;
  return [...baseArray, ...nextArray];
}

function mergeDeep(base: Record<string, unknown>, next: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(next)) {
    const previous = result[key];
    if (isPlainObject(previous) && isPlainObject(value)) {
      result[key] = mergeDeep(previous, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getManagedSettingsSourcePaths(): string[] {
  const managedDir = process.env.CLAUDE_CODE_MANAGED_SETTINGS_PATH || defaultManagedSettingsDir();
  const paths = [join(managedDir, "managed-settings.json")];
  const dropInDir = join(managedDir, "managed-settings.d");
  if (!existsSync(dropInDir)) return paths;
  try {
    const dropIns = readdirSync(dropInDir, { withFileTypes: true })
      .filter(entry => (entry.isFile() || entry.isSymbolicLink()) && entry.name.endsWith(".json") && !entry.name.startsWith("."))
      .map(entry => join(dropInDir, entry.name))
      .sort((a, b) => a.localeCompare(b));
    return [...paths, ...dropIns];
  } catch {
    return paths;
  }
}

function defaultManagedSettingsDir(): string {
  if (process.platform === "darwin") return "/Library/Application Support/ClaudeCode";
  if (process.platform === "win32") return "C:\\Program Files\\ClaudeCode";
  return "/etc/claude-code";
}
