// Plugin management tools (v2.1.136)
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { readClaudeSettings, getSettingsSourcePathsWithLabels, type ClaudeSettings, type SettingsSource } from "../config/claude-settings.js";
import type { Tool } from "./registry.js";

// ── Plugin discovery ──

type PluginInfo = {
  slug: string;
  name: string;
  description?: string;
  dir: string;
  source: SettingsSource | "marketplace";
  installed: boolean;
};

function getClaudeConfigDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude");
}

function findPluginDirs(): string[] {
  const dirs: string[] = [];
  // Check managed and user config dirs
  const candidates = [
    join(getClaudeConfigDir(), ".claude-plugin"),
    join(process.cwd(), ".claude-plugin"),
  ];
  // Also check project .claude-plugin dirs from settings source paths
  for (const { path } of getSettingsSourcePathsWithLabels()) {
    const projectDir = dirname(dirname(path));
    if (projectDir && projectDir !== "." && projectDir !== getClaudeConfigDir()) {
      candidates.push(join(projectDir, ".claude-plugin"));
    }
  }
  for (const dir of candidates) {
    if (existsSync(dir)) dirs.push(dir);
  }
  return [...new Set(dirs)];
}

function getPluginSlug(pluginDir: string): string | null {
  const pluginJsonPath = join(pluginDir, "plugin.json");
  if (!existsSync(pluginJsonPath)) return null;
  try {
    const raw = readFileSync(pluginJsonPath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const name = typeof parsed.name === "string" ? parsed.name.trim() : "";
    return name || null;
  } catch {
    return null;
  }
}

function discoverPlugins(): PluginInfo[] {
  const plugins: PluginInfo[] = [];
  const seen = new Set<string>();

  for (const dir of findPluginDirs()) {
    const slug = getPluginSlug(dir);
    if (slug && !seen.has(slug.toLowerCase())) {
      seen.add(slug.toLowerCase());
      plugins.push({
        slug,
        name: slug,
        description: undefined,
        dir,
        source: "userSettings",
        installed: true,
      });
    }
    // Also check subdirectories for individual plugin dirs
    try {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const pluginDir = join(dir, entry.name);
        const slug2 = getPluginSlug(pluginDir);
        if (slug2 && !seen.has(slug2.toLowerCase())) {
          seen.add(slug2.toLowerCase());
          plugins.push({
            slug: slug2,
            name: slug2,
            description: undefined,
            dir: pluginDir,
            source: "userSettings",
            installed: true,
          });
        }
      }
    } catch {
      // skip
    }
  }

  return plugins;
}

function findPluginBySlug(slug: string): PluginInfo | null {
  const normalized = slug.toLowerCase();
  const plugins = discoverPlugins();
  return plugins.find(p => p.slug.toLowerCase() === normalized) || null;
}

function getSettingsForScope(scope?: string): { path: string; source: SettingsSource } {
  const sources = getSettingsSourcePathsWithLabels();
  if (scope === "project") {
    // Find project settings (first non-user, non-managed source)
    const projectSource = sources.find(s => s.source === "projectSettings");
    if (projectSource) return projectSource;
    // Fall back to local settings
    const localSource = sources.find(s => s.source === "localSettings");
    if (localSource) return localSource;
  }
  // Default to user settings
  return sources.find(s => s.source === "userSettings") || sources[0] || { path: join(getClaudeConfigDir(), "settings.json"), source: "userSettings" };
}

function readSettingsFile(path: string): ClaudeSettings {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return {};
  }
}

function writeSettingsFile(path: string, settings: ClaudeSettings): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n", "utf8");
}

function updatePluginsSetting(
  slug: string,
  action: "disable" | "enable" | "uninstall",
  scope?: string,
): { content: string; isError: boolean } {
  const plugin = findPluginBySlug(slug);
  if (!plugin) {
    return { content: `Error: Plugin '${slug}' not found`, isError: true };
  }

  const { path: settingsPath, source } = getSettingsForScope(scope);
  const settings = readSettingsFile(settingsPath);

  if (action === "uninstall") {
    // Remove plugin directory
    try {
      if (existsSync(plugin.dir)) {
        // Remove the plugin.json and related files
        const pluginJsonPath = join(plugin.dir, "plugin.json");
        if (existsSync(pluginJsonPath)) unlinkSync(pluginJsonPath);
        // Try to rmdir (will fail if dir not empty, which is OK)
        try { readdirSync(plugin.dir).forEach(f => unlinkSync(join(plugin.dir, f))); } catch {}
        try { unlinkSync(plugin.dir); } catch {}
      }
    } catch {
      // Ignore uninstall errors for missing files
    }
    // Remove from settings.plugins list
    const rawSettings = settings as Record<string, unknown>;
    if (Array.isArray(rawSettings.plugins)) {
      const pluginsArr = rawSettings.plugins as string[];
      rawSettings.plugins = pluginsArr.filter(
        (p) => typeof p === "string" && p.toLowerCase() !== plugin.slug.toLowerCase(),
      );
    }
    writeSettingsFile(settingsPath, settings);
    return { content: `Plugin '${plugin.slug}' uninstalled`, isError: false };
  }

  if (action === "disable") {
    const rawSettings = settings as Record<string, unknown>;
    const disabledList: string[] = Array.isArray(rawSettings.disabledPlugins)
      ? (rawSettings.disabledPlugins as string[]).filter((s) => typeof s === "string")
      : [];
    if (!disabledList.some(s => s.toLowerCase() === plugin.slug.toLowerCase())) {
      disabledList.push(plugin.slug);
    }
    rawSettings.disabledPlugins = disabledList;
    writeSettingsFile(settingsPath, rawSettings as ClaudeSettings);
    // Also remove from plugins list if present
    if (Array.isArray(rawSettings.plugins)) {
      const pluginsArr = rawSettings.plugins as string[];
      rawSettings.plugins = pluginsArr.filter(
        (p) => typeof p === "string" && p.toLowerCase() !== plugin.slug.toLowerCase(),
      );
    }
    writeSettingsFile(settingsPath, rawSettings as ClaudeSettings);
    return { content: `Plugin '${plugin.slug}' disabled`, isError: false };
  }

  if (action === "enable") {
    const rawSettings = settings as Record<string, unknown>;
    // Remove from disabled list
    if (Array.isArray(rawSettings.disabledPlugins)) {
      rawSettings.disabledPlugins = (rawSettings.disabledPlugins as string[]).filter(
        (s) => typeof s !== "string" || s.toLowerCase() !== plugin.slug.toLowerCase(),
      );
    }
    // Add to plugins list if not already there
    if (!Array.isArray(rawSettings.plugins)) rawSettings.plugins = [];
    const plugins = rawSettings.plugins as string[];
    if (!plugins.some((p) => typeof p === "string" && p.toLowerCase() === plugin.slug.toLowerCase())) {
      plugins.push(plugin.slug);
    }
    writeSettingsFile(settingsPath, settings);
    return { content: `Plugin '${plugin.slug}' enabled`, isError: false };
  }

  return { content: `Error: Unknown action '${action}'`, isError: true };
}

// ── Tool definitions ──

export const PLUGIN_UNINSTALL_TOOL: Tool = {
  name: "Plugin_Uninstall",
  description: "Uninstall a plugin by its slug. Matches slugs case-insensitively.",
  input_schema: {
    type: "object",
    properties: {
      slug: { type: "string", description: "Plugin slug to uninstall" },
      scope: { type: "string", description: "Scope: 'user' or 'project' (default: user)" },
    },
    required: ["slug"],
  },
  async execute(input: Record<string, unknown>): Promise<{ content: string; isError?: boolean }> {
    const slug = String(input.slug || "").trim();
    if (!slug) return { content: "Error: slug is required", isError: true };
    return updatePluginsSetting(slug, "uninstall", input.scope as string);
  },
};

export const PLUGIN_ENABLE_TOOL: Tool = {
  name: "Plugin_Enable",
  description: "Enable a plugin by its slug. Matches slugs case-insensitively.",
  input_schema: {
    type: "object",
    properties: {
      slug: { type: "string", description: "Plugin slug to enable" },
      scope: { type: "string", description: "Scope: 'user' or 'project' (default: user)" },
    },
    required: ["slug"],
  },
  async execute(input: Record<string, unknown>): Promise<{ content: string; isError?: boolean }> {
    const slug = String(input.slug || "").trim();
    if (!slug) return { content: "Error: slug is required", isError: true };
    return updatePluginsSetting(slug, "enable", input.scope as string);
  },
};

export const PLUGIN_DISABLE_TOOL: Tool = {
  name: "Plugin_Disable",
  description: "Disable a plugin by its slug. Matches slugs case-insensitively.",
  input_schema: {
    type: "object",
    properties: {
      slug: { type: "string", description: "Plugin slug to disable" },
      scope: { type: "string", description: "Scope: 'user' or 'project' (default: user)" },
    },
    required: ["slug"],
  },
  async execute(input: Record<string, unknown>): Promise<{ content: string; isError?: boolean }> {
    const slug = String(input.slug || "").trim();
    if (!slug) return { content: "Error: slug is required", isError: true };
    return updatePluginsSetting(slug, "disable", input.scope as string);
  },
};
