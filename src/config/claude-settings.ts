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
  model?: unknown;
  permissions?: {
    allow?: unknown;
    ask?: unknown;
    deny?: unknown;
    defaultMode?: unknown;
    disableBypassPermissionsMode?: unknown;
  };
  theme?: unknown;
  prefersReducedMotion?: boolean;
  spinnerVerbs?: {
    mode?: "append" | "replace";
    verbs?: string[];
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
