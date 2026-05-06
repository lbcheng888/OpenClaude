import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { readClaudeSettingString } from "../config/claude-settings.js";

type PreferredLanguage = "auto" | "en" | "zh";

export function getConfiguredLanguagePreference(): string | null {
  const explicitLanguage = readClaudeSettingString("language");
  if (explicitLanguage) return explicitLanguage;

  const preferred = readPreferredLanguage();
  if (preferred === "zh") return "Chinese";
  if (preferred === "en") return "English";
  if (preferred === "auto") return getSystemLocaleLanguage() === "zh" ? "Chinese" : "English";
  return null;
}

function readPreferredLanguage(): PreferredLanguage | null {
  const fromSettings = readClaudeSettingString("preferredLanguage");
  if (isPreferredLanguage(fromSettings)) return fromSettings;

  const globalConfig = readClaudeGlobalConfig();
  const fromGlobal = globalConfig?.preferredLanguage;
  return isPreferredLanguage(fromGlobal) ? fromGlobal : null;
}

function readClaudeGlobalConfig(): Record<string, unknown> | null {
  const configDir = process.env.CLAUDE_CONFIG_DIR || homedir();
  const globalPath = join(configDir, ".claude.json");
  if (!existsSync(globalPath)) return null;
  try {
    const parsed = JSON.parse(readFileSync(globalPath, "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

function getSystemLocaleLanguage(): string | undefined {
  try {
    return new Intl.Locale(Intl.DateTimeFormat().resolvedOptions().locale).language;
  } catch {
    return undefined;
  }
}

function isPreferredLanguage(value: unknown): value is PreferredLanguage {
  return value === "auto" || value === "en" || value === "zh";
}
