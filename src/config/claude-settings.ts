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
      once?: boolean;
    }
  | {
      type: "http";
      url: string;
      matcher?: string;
      if?: string;
      timeout?: number;
      headers?: Record<string, string>;
      statusMessage?: string;
      once?: boolean;
    }
  | {
      type: "prompt";
      prompt: string;
      matcher?: string;
      if?: string;
      timeout?: number;
      model?: string;
      statusMessage?: string;
      once?: boolean;
    }
  | {
      type: "agent";
      prompt: string;
      matcher?: string;
      if?: string;
      timeout?: number;
      model?: string;
      statusMessage?: string;
      once?: boolean;
    };

export type HookMatcher = {
  matcher?: string;
  hooks?: HookCommand[];
};

export type PermissionEntry = {
  [key: string]: unknown;
};

export type ClaudeSettings = {
  effortLevel?: unknown;
  env?: Record<string, unknown>;
  hooks?: Record<string, HookMatcher[]>;
  language?: unknown;
  model?: unknown;
  outputStyle?: unknown;
  parentSettingsBehavior?: "first-wins" | "merge";
  preferredLanguage?: unknown;
  permissions?: {
    allow?: unknown;
    ask?: unknown;
    deny?: unknown;
    defaultMode?: unknown;
    disableBypassPermissionsMode?: unknown;
  };
  sandbox?: {
    bwrapPath?: string;
    socatPath?: string;
  };
  theme?: unknown;
  prefersReducedMotion?: boolean;
  spinnerVerbs?: {
    mode?: "append" | "replace";
    verbs?: string[];
  };
  worktree?: {
    baseRef?: "fresh" | "head";
  };
  [key: string]: unknown;
};

export type SettingsSource = "userSettings" | "projectSettings" | "localSettings" | "policySettings" | "managedSettings";

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

// ── CLAUDE_ENV_FILE support (v2.1.136) ──

let cachedEnvFileVars: Record<string, string> = {};

export function getClaudeEnvFileVars(): Record<string, string> {
  return { ...cachedEnvFileVars };
}

export function loadClaudeEnvFile(): void {
  cachedEnvFileVars = {};
  const envFilePath = process.env.CLAUDE_ENV_FILE;
  if (!envFilePath) return;

  try {
    const content = readFileSync(envFilePath, "utf8");
    for (const line of content.split(/\r?\n/u)) {
      const trimmed = line.trim();
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx <= 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (key) {
        cachedEnvFileVars[key] = value;
        // Set into process.env if not already set (env file vars take lower priority)
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }
    }
  } catch {
    // CLAUDE_ENV_FILE is optional — silently ignore missing/unreadable files
  }
}

export function refreshClaudeEnvFile(): void {
  // Re-read the env file on resume/clear to pick up changes
  loadClaudeEnvFile();
}

export function readClaudeSettingString(key: keyof ClaudeSettings): string | undefined {
  const value = readClaudeSettings()?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function getWorktreeBaseRef(): "fresh" | "head" {
  const settings = readClaudeSettings();
  const worktree = settings?.worktree;
  if (worktree && typeof worktree === "object" && !Array.isArray(worktree)) {
    const baseRef = (worktree as Record<string, unknown>).baseRef;
    if (baseRef === "head") return "head";
  }
  return "fresh";
}

export function getSandboxBwrapPath(): string {
  const settings = readClaudeSettings();
  const sandbox = settings?.sandbox;
  if (sandbox && typeof sandbox === "object" && !Array.isArray(sandbox)) {
    const customPath = (sandbox as Record<string, unknown>).bwrapPath;
    if (typeof customPath === "string" && customPath.trim()) return customPath.trim();
  }
  return "bwrap";
}

export function getSandboxSocatPath(): string {
  const settings = readClaudeSettings();
  const sandbox = settings?.sandbox;
  if (sandbox && typeof sandbox === "object" && !Array.isArray(sandbox)) {
    const customPath = (sandbox as Record<string, unknown>).socatPath;
    if (typeof customPath === "string" && customPath.trim()) return customPath.trim();
  }
  return "socat";
}

export function getParentSettingsBehavior(): "first-wins" | "merge" {
  const value = readClaudeSettings()?.parentSettingsBehavior;
  if (value === "first-wins") return "first-wins";
  return "merge";
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

export function getSettingsSourcePathsWithLabels(cwd = process.cwd()): { path: string; source: SettingsSource }[] {
  const projectDirs = getProjectSettingsDirs(cwd);
  const entries: { path: string; source: SettingsSource }[] = [
    { path: join(getClaudeConfigDir(), "settings.json"), source: "userSettings" },
  ];
  for (const dir of projectDirs) {
    entries.push({ path: join(dir, ".claude", "settings.json"), source: "projectSettings" });
    entries.push({ path: join(dir, ".claude", "settings.local.json"), source: "localSettings" });
  }
  const flagSettingsPath = process.env.CLAUDE_CODE_SETTINGS_PATH;
  if (flagSettingsPath) {
    entries.push({ path: resolve(flagSettingsPath), source: "policySettings" });
  }
  for (const path of getManagedSettingsSourcePaths()) {
    entries.push({ path, source: "managedSettings" });
  }
  return entries;
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
  try {
    const parsed = JSON.parse(readFileSync(settingsPath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as ClaudeSettings;
  } catch {
    return null;
  }
}

function mergeSettings(base: ClaudeSettings, next: ClaudeSettings): ClaudeSettings {
  const merged: ClaudeSettings = { ...base };

  // Shallow merge top-level simple values (next wins)
  for (const key of Object.keys(next)) {
    if (key === "env" || key === "hooks" || key === "permissions") continue;
    const nextVal = next[key];
    const baseVal = base[key];
    if (isPlainObject(baseVal) && isPlainObject(nextVal)) {
      merged[key] = mergeDeep(baseVal as Record<string, unknown>, nextVal as Record<string, unknown>);
    } else {
      merged[key] = nextVal;
    }
  }

  merged.env = mergeRecords(base.env as Record<string, unknown> | undefined, next.env as Record<string, unknown> | undefined) as Record<string, unknown> | undefined;
  merged.hooks = mergeHooks(base.hooks, next.hooks);
  merged.permissions = mergePermissions(base.permissions, next.permissions);

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

function mergePermissions(
  base: ClaudeSettings["permissions"],
  next: ClaudeSettings["permissions"],
): ClaudeSettings["permissions"] {
  if (!base && !next) return undefined;
  const basePerms = base || {};
  const nextPerms = next || {};
  return {
    ...basePerms,
    ...nextPerms,
    allow: mergePermissionEntries(basePerms.allow, nextPerms.allow),
    ask: mergePermissionEntries(basePerms.ask, nextPerms.ask),
    deny: mergePermissionEntries(basePerms.deny, nextPerms.deny),
    defaultMode: nextPerms.defaultMode ?? basePerms.defaultMode,
    disableBypassPermissionsMode: nextPerms.disableBypassPermissionsMode ?? basePerms.disableBypassPermissionsMode,
  };
}

function mergePermissionEntries(base: unknown, next: unknown): unknown[] | undefined {
  const baseArr = Array.isArray(base) ? base : [];
  const nextArr = Array.isArray(next) ? next : [];
  if (baseArr.length === 0 && nextArr.length === 0) return undefined;
  return [...baseArr, ...nextArr];
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
      .filter(
        entry =>
          (entry.isFile() || entry.isSymbolicLink()) &&
          entry.name.endsWith(".json") &&
          !entry.name.startsWith("."),
      )
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

// ── Lightweight schema validation ──

export type StringFormat = "email" | "url" | "guid" | "uuid";

export interface StringField {
  type: "string";
  format?: StringFormat;
}

export type SettingsField = StringField;

export interface ValidationError {
  path: string;
  message: string;
}

const FORMAT_REGEX: Record<StringFormat, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/[^\s/$.?#][^\s]*$/i,
  guid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
};

export function validateString(value: unknown, schema: StringField): string | null {
  if (typeof value !== "string") return "Expected string";
  if (schema.format) {
    const regex = FORMAT_REGEX[schema.format];
    if (regex && !regex.test(value)) return `Invalid ${schema.format}`;
  }
  return null;
}

export function validateSettings(
  schema: Record<string, SettingsField>,
  data: unknown,
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    errors.push({ path: "", message: "Expected an object" });
    return errors;
  }
  const obj = data as Record<string, unknown>;
  for (const [key, field] of Object.entries(schema)) {
    if (field.type === "string") {
      const err = validateString(obj[key], field);
      if (err) errors.push({ path: key, message: err });
    }
  }
  return errors;
}

export function isValidMarketplaceUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
