// @ts-nocheck
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {zon,p3} from "../../vendor/m728.ts";
import {oCe,Soe} from "../../vendor/m729.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// @ts-nocheck
/**
 * Plugin marketplace schema definitions and validation helpers (v2.1.190).
 *
 * Defines Zod schemas for plugin manifests, marketplace manifests, plugin
 * sources, install registries, and the marketplace cache, plus a handful of
 * pure helpers for official-name impersonation checks and auto-update policy.
 */

/**
 * Resolve whether a marketplace should auto-update.
 * Explicit per-call override wins; otherwise the entry's own flag wins;
 * otherwise official marketplaces auto-update unless they are explicit-opt-in only.
 */
function Gpe(marketplaceName, entry, explicitOverride) {
  if (explicitOverride !== void 0) return explicitOverride;
  let nameLower = marketplaceName.toLowerCase();
  return entry.autoUpdate ?? (sCe.has(nameLower) && !Gau.has(nameLower));
}
/** True when a marketplace name attempts to impersonate an official Anthropic/Claude marketplace. */
function zau(name) {
  if (xSr.has(name.toLowerCase())) return !1;
  if (Kau.test(name)) return !0;
  return Vau.test(name);
}
/** Validate that a git/SSH URL points at the official github.com/anthropics organization. */
function Yau(urlStr) {
  let trimmed = urlStr.trim(),
    sshMatch = /^git@github\.com:anthropics\/(.+)$/i.exec(trimmed);
  if (sshMatch) return !(sshMatch[1] ?? "").split("/").includes("..");
  try {
    let parsedUrl = new URL(trimmed);
    if (!jau.has(parsedUrl.protocol.toLowerCase())) return !1;
    if (parsedUrl.pathname.split("/").includes("..")) return !1;
    return parsedUrl.hostname.toLowerCase() === "github.com" && parsedUrl.pathname.toLowerCase().startsWith("/anthropics/");
  } catch {
    return !1;
  }
}
/**
 * For a reserved official marketplace name, verify the source is an allowed
 * anthropics-org github/git source. Returns an error message string when the
 * name/source combination is not allowed, or null when valid.
 */
function DSr(name, source) {
  let nameLower = name.toLowerCase();
  if (!xSr.has(nameLower)) return null;
  if (source.source === "github") {
    let repo = source.repo || "";
    if (!repo.toLowerCase().startsWith(`${Yon}/`) || repo.split("/").includes("..")) return `The name '${name}' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/${Yon}/' can use this name.`;
    return null;
  }
  if (source.source === "git" && source.url) {
    if (Yau(source.url)) return null;
    return `The name '${name}' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/${Yon}/' can use this name.`;
  }
  return `The name '${name}' is reserved for official Anthropic marketplaces and can only be used with GitHub sources from the '${Yon}' organization.`;
}
/** True when a value is a relative ("./...") plugin path. */
function JRt(path) {
  return typeof path === "string" && path.startsWith("./");
}
/** True when a plugin source refers to the local filesystem. */
function P5(source) {
  return source.source === "file" || source.source === "directory";
}
/**
 * Parse an array of raw marketplace plugin entries, dropping unparseable ones
 * (or stubbing them with an "unsupported" source if at least a name is present).
 */
function mlu(rawPlugins) {
  let parser = esn();
  return rawPlugins.flatMap((rawEntry, idx) => {
    let result = parser.safeParse(rawEntry);
    if (result.success) return [result.data];
    let stubName = plu().safeParse(rawEntry).data?.name,
      errorMessages = result.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join(", ");
    if (stubName) return A(`Stubbing unparseable marketplace plugin entry (${stubName}): ${errorMessages}`, {
      level: "warn"
    }), [{
      name: stubName,
      source: {
        source: "unsupported"
      },
      strict: !0
    }];
    return A(`Dropping unparseable marketplace plugin entry (index ${idx}): ${errorMessages}`, {
      level: "warn"
    }), [];
  });
}
var jRt,
  sCe,
  xSr,
  Gau,
  Vau,
  Kau,
  Yon = "anthropics",
  jau,
  D5,
  Q1e,
  sls,
  HSr,
  ISr,
  als,
  Jon,
  Jau,
  Xon,
  Xau,
  Qau,
  Zau,
  elu,
  tlu,
  lls,
  cls,
  nlu,
  ils,
  rlu,
  olu,
  uls,
  slu,
  ilu,
  nYe,
  alu,
  PSr,
  dls,
  llu,
  pls,
  clu,
  ulu,
  Vpe,
  YRt,
  kSr,
  mls,
  dlu,
  Qon,
  Zon,
  esn,
  plu,
  GK,
  tsn,
  flu,
  hlu,
  glu,
  XRt,
  _lu,
  ylu,
  QRt,
  yLf,
  Tlu,
  rYe;
var bk = b(() => {
  Qr();
  zon();
  oCe();
  qe();
  jRt = new Set(["claude-community", "claude-plugins-community"]), sCe = new Set(["claude-code-marketplace", "claude-code-plugins", "claude-plugins-official", "anthropic-marketplace", "anthropic-plugins", "agent-skills", "anthropic-agent-skills", "life-sciences", "knowledge-work-plugins", "claude-for-legal", "claude-for-financial-services", "financial-services-plugins"]), xSr = new Set([...sCe, ...jRt]), Gau = new Set(["knowledge-work-plugins"]);
  Vau = /(?:official[^a-z0-9]*(anthropic|claude)|(?:anthropic|claude)[^a-z0-9]*official|^(?:anthropic|claude)[^a-z0-9]*(marketplace|plugins|official))/i, Kau = /[^\u0020-\u007E]/;
  jau = new Set(["https:", "http:", "git:", "git+https:", "git+http:", "git+ssh:", "ssh:"]);
  D5 = ve(() => C.string().startsWith("./")), Q1e = ve(() => D5().endsWith(".json")), sls = ve(() => C.union([D5().refine(path => path.endsWith(".mcpb") || path.endsWith(".dxt"), {
    message: "MCPB file path must end with .mcpb or .dxt"
  }).describe("Path to MCPB file relative to plugin root"), C.string().url().refine(path => path.endsWith(".mcpb") || path.endsWith(".dxt"), {
    message: "MCPB URL must end with .mcpb or .dxt"
  }).describe("URL to MCPB file")])), HSr = ve(() => D5().endsWith(".md")), ISr = ve(() => C.union([HSr(), D5()])), als = ve(() => C.string().min(1, "Marketplace must have a name").refine(name => !name.includes(" "), {
    message: 'Marketplace name cannot contain spaces. Use kebab-case (e.g., "my-marketplace")'
  }).refine(name => !name.includes("/") && !name.includes("\\") && !name.includes("..") && name !== ".", {
    message: 'Marketplace name cannot contain path separators (/ or \\), ".." sequences, or be "."'
  }).refine(name => !zau(name), {
    message: "Marketplace name impersonates an official Anthropic/Claude marketplace"
  }).refine(name => name.toLowerCase() !== "inline", {
    message: 'Marketplace name "inline" is reserved for --plugin-dir session plugins'
  }).refine(name => name.toLowerCase() !== "builtin", {
    message: 'Marketplace name "builtin" is reserved for built-in plugins'
  }).refine(name => name.toLowerCase() !== "skills-dir", {
    message: 'Marketplace name "skills-dir" is reserved for plugins auto-loaded from .claude/skills/'
  })), Jon = ve(() => C.object({
    name: C.string().min(1, "Author name cannot be empty").describe("Display name of the plugin author or organization"),
    email: C.string().optional().describe("Contact email for support or feedback"),
    url: C.string().optional().describe("Website, GitHub profile, or organization URL")
  })), Jau = ve(() => C.object({
    $schema: C.string().optional().describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"),
    name: C.string().min(1, "Plugin name cannot be empty").refine(name => !name.includes(" "), {
      message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")'
    }).describe("Unique identifier for the plugin, used for namespacing (prefer kebab-case)"),
    displayName: C.string().optional().describe('Human-readable name shown in UI (e.g., "GitHub Utils"). Falls back to `name` when omitted. Unlike `name`, may contain spaces and any casing; not used for namespacing or lookup.'),
    version: C.string().optional().describe("Semantic version (e.g., 1.2.3) following semver.org specification"),
    description: C.string().optional().describe("Brief, user-facing explanation of what the plugin provides"),
    author: Jon().optional().describe("Information about the plugin creator or maintainer"),
    homepage: C.string().url().optional().describe("Plugin homepage or documentation URL"),
    repository: C.string().optional().describe("Source code repository URL"),
    license: C.string().optional().describe("SPDX license identifier (e.g., MIT, Apache-2.0)"),
    keywords: C.array(C.string()).optional().describe("Tags for plugin discovery and categorization"),
    defaultEnabled: C.boolean().optional().describe("Whether the plugin starts enabled when the user has no explicit enabled/disabled setting for it (default: true). Explicit enabledPlugins values always win, and a plugin required by an enabled dependent is enabled regardless of this value."),
    dependencies: C.array(hlu()).optional().describe(`Plugins that must be enabled for this plugin to function. Bare names (no "@marketplace") are resolved against the declaring plugin's own marketplace.`)
  })), Xon = ve(() => C.object({
    description: C.string().optional().describe("Brief, user-facing explanation of what these hooks provide"),
    hooks: C.lazy(() => p3()).describe("The hooks provided by the plugin, in the same format as the one used for settings")
  })), Xau = ve(() => C.object({
    hooks: C.union([Q1e().describe("Path to file with additional hooks (in addition to those in hooks/hooks.json, if it exists), relative to the plugin root"), C.lazy(() => p3()).describe("Additional hooks (in addition to those in hooks/hooks.json, if it exists)"), C.array(C.union([Q1e().describe("Path to file with additional hooks (in addition to those in hooks/hooks.json, if it exists), relative to the plugin root"), C.lazy(() => p3()).describe("Additional hooks (in addition to those in hooks/hooks.json, if it exists)")]))])
  })), Qau = ve(() => C.object({
    source: ISr().optional().describe("Path to command markdown file, relative to plugin root"),
    content: C.string().optional().describe("Inline markdown content for the command"),
    description: C.string().optional().describe("Command description override"),
    argumentHint: C.string().optional().describe('Hint for command arguments (e.g., "[file]")'),
    model: C.string().optional().describe("Default model for this command"),
    allowedTools: C.array(C.string()).optional().describe("Tools allowed when command runs")
  }).refine(entry => entry.source && !entry.content || !entry.source && entry.content, {
    message: 'Command must have either "source" (file path) or "content" (inline markdown), but not both'
  })), Zau = ve(() => C.object({
    commands: C.union([ISr().describe("Path to a command file or skill directory, relative to the plugin root. When set, the commands/ directory is not auto-loaded \u2014 list its files here if you want both."), C.array(ISr().describe("Path to a command file or skill directory, relative to the plugin root. When set, the commands/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of command file or skill directory paths. When set, the commands/ directory is not auto-loaded."), C.record(C.string(), Qau()).describe('Object mapping of command names to their metadata and source files. Command name becomes the slash command name (e.g., "about" \u2192 "/plugin:about")')])
  })), elu = ve(() => C.object({
    agents: C.union([HSr().describe("Path to an agent file, relative to the plugin root. When set, the agents/ directory is not auto-loaded \u2014 list its files here if you want both."), C.array(HSr().describe("Path to an agent file, relative to the plugin root. When set, the agents/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of agent file paths. When set, the agents/ directory is not auto-loaded.")])
  })), tlu = ve(() => C.object({
    skills: C.union([D5().describe("Path to a skill directory, relative to the plugin root. Loaded in addition to the skills/ directory (except: for a marketplace entry whose source resolves to the marketplace root, declaring a specific subdirectory replaces the skills/ scan)."), C.array(D5().describe("Path to a skill directory, relative to the plugin root.")).describe("List of skill directory paths, loaded in addition to the skills/ directory (except: for a marketplace entry whose source resolves to the marketplace root, declaring specific subdirectories replaces the skills/ scan).")])
  })), lls = ve(() => C.object({
    outputStyles: C.union([D5().describe("Path to an output-styles directory or file, relative to the plugin root. When set, the output-styles/ directory is not auto-loaded \u2014 list its files here if you want both."), C.array(D5().describe("Path to an output-styles directory or file, relative to the plugin root. When set, the output-styles/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of output-style directory or file paths. When set, the output-styles/ directory is not auto-loaded.")])
  })), cls = ve(() => C.object({
    themes: C.union([D5().describe("Path to a themes directory or file, relative to the plugin root. When set, the themes/ directory is not auto-loaded \u2014 list its files here if you want both."), C.array(D5().describe("Path to a themes directory or file, relative to the plugin root. When set, the themes/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of theme directory or file paths. When set, the themes/ directory is not auto-loaded.")])
  })), nlu = ve(() => C.object({
    workflows: C.union([D5().describe("Path to a workflows directory or .js file, relative to the plugin root. When set, the workflows/ directory is not auto-loaded \u2014 list its files here if you want both."), C.array(D5().describe("Path to a workflows directory or .js file, relative to the plugin root. When set, the workflows/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of workflow directory or .js file paths. When set, the workflows/ directory is not auto-loaded.")]).optional()
  })), ils = ve(() => C.string().min(1)), rlu = ve(() => C.string().min(2).refine(ext => ext.startsWith("."), {
    message: 'File extensions must start with dot (e.g., ".ts", not "ts")'
  })), olu = ve(() => C.object({
    mcpServers: C.union([Q1e().describe("MCP servers to include in the plugin (in addition to those in the .mcp.json file, if it exists)"), sls().describe("Path or URL to MCPB file containing MCP server configuration"), C.record(C.string(), Soe()).describe("MCP server configurations keyed by server name"), C.array(C.union([Q1e().describe("Path to MCP servers configuration file"), sls().describe("Path or URL to MCPB file"), C.record(C.string(), Soe()).describe("Inline MCP server configurations")])).describe("Array of MCP server configurations (paths, MCPB files, or inline definitions)")])
  })), uls = ve(() => C.object({
    type: C.enum(["string", "number", "boolean", "directory", "file"]).describe("Type of the configuration value"),
    title: C.string().describe("Human-readable label shown in the config dialog"),
    description: C.string().describe("Help text shown beneath the field in the config dialog"),
    required: C.boolean().optional().describe("If true, validation fails when this field is empty"),
    default: C.union([C.string(), C.number(), C.boolean(), C.array(C.string())]).optional().describe("Default value used when the user provides nothing"),
    multiple: C.boolean().optional().describe("For string type: allow an array of strings"),
    sensitive: C.boolean().optional().describe("If true, masks dialog input and stores value in secure storage (keychain/credentials file) instead of settings.json"),
    min: C.number().optional().describe("Minimum value (number type only)"),
    max: C.number().optional().describe("Maximum value (number type only)")
  }).strict()), slu = ve(() => C.object({
    userConfig: C.record(C.string().regex(/^[A-Za-z_]\w*$/, "Option keys must be valid identifiers (letters, digits, underscore; no leading digit) \u2014 they become CLAUDE_PLUGIN_OPTION_<KEY> env vars in hooks"), uls()).optional().describe("User-configurable values this plugin needs. Prompted at enable time. Non-sensitive values saved to settings.json; sensitive values to secure storage. Available as ${user_config.KEY} in MCP/LSP server config, hook commands, and (non-sensitive only) skill/agent content. Keep sensitive value counts small.")
  })), ilu = ve(() => C.object({
    channels: C.array(C.object({
      server: C.string().min(1).describe("Name of the MCP server this channel binds to. Must match a key in this plugin's mcpServers."),
      displayName: C.string().optional().describe('Human-readable name shown in the config dialog title (e.g., "Telegram"). Defaults to the server name.'),
      userConfig: C.record(C.string(), uls()).optional().describe("Fields to prompt the user for when enabling this plugin in assistant mode. Saved values are substituted into ${user_config.KEY} references in the mcpServers env.")
    }).strict()).describe("Channels this plugin provides. Each entry declares an MCP server as a message channel and optionally specifies user configuration to prompt for at enable time.")
  })), nYe = ve(() => C.strictObject({
    command: C.string().min(1).refine(cmd => {
      if (cmd.includes(" ") && !cmd.startsWith("/")) return !1;
      return !0;
    }, {
      message: "Command should not contain spaces. Use args array for arguments."
    }).describe('Command to execute the LSP server (e.g., "typescript-language-server")'),
    args: C.array(ils()).optional().describe("Command-line arguments to pass to the server"),
    extensionToLanguage: C.record(rlu(), ils()).refine(mapping => Object.keys(mapping).length > 0, {
      message: "extensionToLanguage must have at least one mapping"
    }).describe("Mapping from file extension to LSP language ID. File extensions and languages are derived from this mapping."),
    transport: C.enum(["stdio", "socket"]).default("stdio").describe("Communication transport mechanism"),
    env: C.record(C.string(), C.string()).optional().describe("Environment variables to set when starting the server"),
    initializationOptions: C.unknown().optional().describe("Initialization options passed to the server during initialization"),
    settings: C.unknown().optional().describe("Settings passed to the server via workspace/didChangeConfiguration"),
    workspaceFolder: C.string().optional().describe("Workspace folder path to use for the server"),
    startupTimeout: C.number().int().positive().optional().describe("Maximum time to wait for server startup (milliseconds)"),
    shutdownTimeout: C.number().int().positive().optional().describe("Maximum time to wait for graceful shutdown (milliseconds)"),
    restartOnCrash: C.boolean().optional().describe("Whether to restart the server if it crashes"),
    maxRestarts: C.number().int().nonnegative().optional().describe("Maximum number of restart attempts before giving up"),
    diagnostics: C.boolean().optional().describe("Whether to push publishDiagnostics into the agent context after edits. Set to false to keep LSP navigation (goToDefinition, hover, etc.) but suppress automatic diagnostic injection. Defaults to true.")
  })), alu = ve(() => C.strictObject({
    name: C.string().min(1).describe("Identifier for this monitor, unique within the plugin. Used to dedupe so re-arming (plugin reload, repeat skill invoke) does not spawn duplicates."),
    command: C.string().min(1).describe('Shell command to run as a persistent background monitor. Each stdout line is delivered to the model as a <task_notification> event; the process runs for the session lifetime. ${CLAUDE_PLUGIN_ROOT}, ${CLAUDE_PLUGIN_DATA}, ${CLAUDE_PROJECT_DIR}, ${user_config.*}, and ${ENV_VAR} are substituted. Runs in the session cwd \u2014 prefix with `cd "${CLAUDE_PLUGIN_ROOT}" && ` if the script needs its own directory.'),
    description: C.string().min(1).describe("Short human-readable description of what is being monitored (shown in task panel and notification summary)."),
    when: C.union([C.literal("always"), C.string().startsWith("on-skill-invoke:").refine(when => when.length > 16, {
      message: "on-skill-invoke: must specify a skill name"
    })]).default("always").describe('Arm trigger. "always" arms at session start and on plugin reload. "on-skill-invoke:<skill>" arms the first time that skill is dispatched (via Skill tool or slash command).')
  })), PSr = ve(() => C.array(alu()).refine(monitors => new Set(monitors.map(monitor => monitor.name)).size === monitors.length, {
    message: "Monitor names must be unique within a plugin"
  })), dls = ve(() => C.object({
    monitors: C.union([Q1e().describe("Path to a JSON file containing the monitors array, relative to the plugin root"), PSr()]).describe("Background watch scripts the host arms as persistent Monitor tasks (unsandboxed, same trust tier as hooks) so plugins need not instruct the model to arm them. When omitted, monitors/monitors.json at the plugin root is loaded if present.")
  })), llu = ve(() => C.object({
    lspServers: C.union([Q1e().describe("Path to .lsp.json configuration file relative to plugin root"), C.record(C.string(), nYe()).describe("LSP server configurations keyed by server name"), C.array(C.union([Q1e().describe("Path to LSP configuration file"), C.record(C.string(), nYe()).describe("Inline LSP server configurations")])).describe("Array of LSP server configurations (paths or inline definitions)")])
  })), pls = ve(() => C.string().refine(pkg => !pkg.includes("..") && !pkg.includes("//"), "Package name cannot contain path traversal patterns").refine(pkg => {
    let scopedPattern = /^@[a-z0-9][a-z0-9-._]*\/[a-z0-9][a-z0-9-._]*$/,
      barePattern = /^[a-z0-9][a-z0-9-._]*$/;
    return scopedPattern.test(pkg) || barePattern.test(pkg);
  }, "Invalid npm package name format")), clu = ve(() => C.object({
    settings: C.record(C.string(), C.unknown()).optional().describe("Settings to merge into the user settings while this plugin is enabled. Only the documented allowlisted keys are applied.")
  })), ulu = ve(() => C.object({
    experimental: C.preprocess(value => typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0, C.object({
      ...cls().partial().shape,
      ...dls().partial().shape,
      ...lls().partial().shape,
      evals: C.union([C.string(), C.array(C.string())]).optional().describe("Path(s) to evaluation query files for `claude plugin eval`. Defaults to `evals/`.")
    }).passthrough().optional().describe("Components whose manifest shape may change without a deprecation cycle. Move a key out of here once it is promoted to stable."))
  })), Vpe = ve(() => C.object({
    ...Jau().shape,
    ...Xau().partial().shape,
    ...Zau().partial().shape,
    ...elu().partial().shape,
    ...tlu().partial().shape,
    ...lls().partial().shape,
    ...cls().partial().shape,
    ...nlu().shape,
    ...ilu().partial().shape,
    ...olu().partial().shape,
    ...llu().partial().shape,
    ...dls().partial().shape,
    ...clu().partial().shape,
    ...slu().partial().shape,
    ...ulu().partial().shape
  })), YRt = ve(() => C.discriminatedUnion("source", [C.object({
    source: C.literal("url"),
    url: C.string().url().describe("Direct URL to marketplace.json file"),
    headers: C.record(C.string(), C.string()).optional().describe("Custom HTTP headers (e.g., for authentication)")
  }), C.object({
    source: C.literal("github"),
    repo: C.string().describe("GitHub repository in owner/repo format"),
    ref: C.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    path: C.string().optional().describe("Path to marketplace.json within repo (defaults to .claude-plugin/marketplace.json)"),
    sparsePaths: C.array(C.string()).optional().describe('Directories to include via git sparse-checkout (cone mode). Use for monorepos where the marketplace lives in a subdirectory. Example: [".claude-plugin", "plugins"]. If omitted, the full repository is cloned.'),
    skipLfs: C.boolean().optional().describe("Skip Git LFS smudge during clone and update (sets GIT_LFS_SKIP_SMUDGE=1) so LFS pointer files stay as pointers instead of downloading their content. Use for marketplaces hosted in repos with large LFS objects.")
  }), C.object({
    source: C.literal("git"),
    url: C.string().describe("Full git repository URL"),
    ref: C.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    path: C.string().optional().describe("Path to marketplace.json within repo (defaults to .claude-plugin/marketplace.json)"),
    sparsePaths: C.array(C.string()).optional().describe('Directories to include via git sparse-checkout (cone mode). Use for monorepos where the marketplace lives in a subdirectory. Example: [".claude-plugin", "plugins"]. If omitted, the full repository is cloned.'),
    skipLfs: C.boolean().optional().describe("Skip Git LFS smudge during clone and update (sets GIT_LFS_SKIP_SMUDGE=1) so LFS pointer files stay as pointers instead of downloading their content. Use for marketplaces hosted in repos with large LFS objects.")
  }), C.object({
    source: C.literal("npm"),
    package: pls().describe("NPM package containing marketplace.json")
  }), C.object({
    source: C.literal("file"),
    path: C.string().describe("Local file path to marketplace.json")
  }), C.object({
    source: C.literal("directory"),
    path: C.string().describe("Local directory containing .claude-plugin/marketplace.json")
  }), C.object({
    source: C.literal("skills-dir")
  }).describe("Policy-list sentinel for the ~/.claude/skills/ auto-load (@skills-dir plugins). In strictKnownMarketplaces: opt the scan back IN (by default any allowlist blocks it). In blockedMarketplaces: turn the scan OFF without otherwise restricting marketplaces. Only meaningful in those two managed-settings lists (areLocalPluginDirsAllowedByPolicy); known_marketplaces.json / marketplace add etc. ignore it."), C.object({
    source: C.literal("hostPattern"),
    hostPattern: C.string().describe('Regex pattern to match the host/domain extracted from any marketplace source type. For github sources, matches against "github.com". For git sources (SSH or HTTPS), extracts the hostname from the URL. Use in strictKnownMarketplaces to allow all marketplaces from a specific host (e.g., "^github\\.mycompany\\.com$").')
  }), C.object({
    source: C.literal("pathPattern"),
    pathPattern: C.string().describe('Regex pattern matched against the .path field of file and directory sources. Use in strictKnownMarketplaces to allow filesystem-based marketplaces alongside hostPattern restrictions for network sources. Use ".*" to allow all filesystem paths, or a narrower pattern (e.g., "^/opt/approved/") to restrict to specific directories.')
  }), C.object({
    source: C.literal("settings"),
    name: als().refine(name => !xSr.has(name.toLowerCase()), {
      message: "Reserved marketplace names cannot be used with settings sources. validateOfficialNameSource only accepts github/git sources from anthropics/* for these names; a settings source would be rejected after loadAndCacheMarketplace has already written to disk with cleanupNeeded=false."
    }).describe("Marketplace name. Must match the extraKnownMarketplaces key (enforced); the synthetic manifest is written under this name. Same validation " + "as PluginMarketplaceSchema plus reserved-name rejection \u2014 " + "validateOfficialNameSource runs after the disk write, too late to clean up."),
    plugins: C.array(dlu()).describe("Plugin entries declared inline in settings.json"),
    owner: Jon().optional()
  }).describe("Inline marketplace manifest defined directly in settings.json. The reconciler writes a synthetic marketplace.json to the cache; diffMarketplaces detects edits via isEqual on the stored source (the plugins array is inside this object, so edits surface as sourceChanged).")])), kSr = ve(() => C.string().length(40).regex(/^[a-f0-9]{40}$/, "Must be a full 40-character lowercase git commit SHA")), mls = ve(() => C.union([C.preprocess(value => value === "." ? "./" : value, D5()).describe("Path to the plugin root, relative to the marketplace root (the directory containing .claude-plugin/, not .claude-plugin/ itself)"), C.object({
    source: C.literal("npm"),
    package: pls().or(C.string().refine(pkg => /^(?:file|https?|git(?:\+https?|\+ssh)?|ssh|github|gitlab|bitbucket):/i.test(pkg) || !pkg.includes(".."), 'Package reference cannot contain ".." path segments')).describe("Package name (or url, or local path, or anything else that can be passed to `npm` as a package)"),
    version: C.string().optional().describe("Specific version or version range (e.g., ^1.0.0, ~2.1.0)"),
    registry: C.string().url().optional().describe("Custom NPM registry URL (defaults to using system default, likely npmjs.org)")
  }).describe("NPM package as plugin source"), C.object({
    source: C.literal("url"),
    url: C.string().describe("Full git repository URL (https:// or git@)"),
    ref: C.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    sha: kSr().optional().describe("Specific commit SHA to use")
  }), C.object({
    source: C.literal("github"),
    repo: C.string().describe("GitHub repository in owner/repo format"),
    ref: C.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    sha: kSr().optional().describe("Specific commit SHA to use")
  }), C.object({
    source: C.literal("git-subdir"),
    url: C.string().describe("Git repository: GitHub owner/repo shorthand, https://, or git@ URL"),
    path: C.string().min(1).describe('Subdirectory within the repo containing the plugin (e.g., "tools/claude-plugin"). Cloned sparsely using partial clone (--filter=tree:0) to minimize bandwidth for monorepos.'),
    ref: C.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    sha: kSr().optional().describe("Specific commit SHA to use")
  }).describe("Plugin located in a subdirectory of a larger repository (monorepo). Only the specified subdirectory is materialized; the rest of the repo is not downloaded."), C.object({
    source: C.literal("unsupported")
  }).describe("Placeholder for source types this Claude Code version does not " + "recognize. Never authored by hand \u2014 PluginMarketplaceSchema rewrites " + 'unparseable sources to this so the entry remains in marketplace.plugins (detectDelistedPlugins must not see it as removed). Install attempts fail at cachePlugin with a clear "update Claude Code" message.')])), dlu = ve(() => C.object({
    name: C.string().min(1, "Plugin name cannot be empty").refine(name => !name.includes(" "), {
      message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")'
    }).describe("Plugin name as it appears in the target repository"),
    source: mls().describe("Where to fetch the plugin from. Must be a remote source \u2014 relative " + "paths have no marketplace repository to resolve against."),
    description: C.string().optional(),
    version: C.string().optional(),
    strict: C.boolean().optional()
  }).refine(entry => typeof entry.source !== "string", {
    message: 'Plugins in a settings-sourced marketplace must use remote sources (github, git-subdir, npm, url). Relative-path sources like "./foo" have no marketplace repository to resolve against.'
  }).refine(entry => typeof entry.source === "string" || entry.source.source !== "unsupported", {
    message: "source.source: 'unsupported' is a parse-time placeholder and cannot be authored. Use a remote source (github, git-subdir, npm, url)."
  }));
  Qon = ve(() => C.object({
    cli: C.array(C.string().max(64)).max(10).optional().describe('First command tokens (e.g. ["stripe"]) \u2014 exact match against commands run this session.'),
    hosts: C.array(C.string().max(128)).max(20).optional().describe('Hostnames (e.g. ["api.stripe.com"]) \u2014 exact, case-insensitive match against ' + "hostnames seen in https?:// URLs in bash commands run this session. Bare hostname only: lowercase, no scheme, no port, no path."),
    filesRead: C.array(C.string().max(256)).max(10).optional().describe('Glob patterns (e.g. ["**/*.tf"]) \u2014 the plugin is relevant when a file Claude has read ' + "this session matches any pattern. Matched against read-file paths, forward-slash normalized, case-insensitive."),
    manifestDeps: C.array(C.object({
      file: C.string().max(256),
      pattern: C.string().max(256)
    })).max(10).optional().describe("Dependency declared in a package manifest. Each {file, pattern} is a pair of RegExp sources: " + "`file` matches the manifest filename (package.json, go.mod, requirements.txt, \u2026); " + "`pattern` matches the dependency declaration inside that file. Evaluated against files read this session."),
    cwd: C.array(C.string().max(256)).max(10).optional().describe('Glob patterns (e.g. ["Engine/Source/Runtime/Renderer/**"]) \u2014 the plugin is relevant when the ' + `session's working directory is at or under a directory matching the pattern. Matched against the cwd both relative to the enclosing git repo root and as an absolute path, forward-slash normalized, case-insensitive. A bare directory (no glob characters) means "cwd is at or under this directory". Known at session start, so this signal can surface a suggestion before the first turn.`)
  })), Zon = ve(() => C.object({
    topic: C.string().max(64).optional().describe('What the user is working with when this plugin is relevant \u2014 fills "Working with {topic}?". ' + 'Often the product name (e.g. "Stripe"); use a domain (e.g. "design") when the plugin name does not read naturally as a topic. Defaults to the plugin name with each hyphen-segment capitalized.'),
    signals: Qon().optional().describe("Matchers that determine when the plugin is relevant.")
  })), esn = ve(() => Vpe().partial().extend({
    name: C.string().min(1, "Plugin name cannot be empty").refine(name => !name.includes(" "), {
      message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")'
    }).describe("Unique identifier matching the plugin name"),
    source: mls().describe("Where to fetch the plugin from"),
    category: C.string().optional().describe('Category for organizing plugins (e.g., "productivity", "development")'),
    tags: C.array(C.string()).optional().describe("Tags for searchability and discovery"),
    strict: C.boolean().optional().default(!0).describe("Require the plugin manifest to be present in the plugin folder. If false, the marketplace entry provides the manifest."),
    relevance: C.preprocess(value => typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0, Zon().optional()).describe(`Declares when this plugin is relevant to the user's work. Consumed by the spinner tip ("Working with {topic}?"), session-start auto-suggest, and marketplace browse ranking.`)
  })), plu = ve(() => C.object({
    name: C.string().min(1).refine(name => !name.includes(" "))
  }));
  GK = ve(() => C.object({
    $schema: C.string().optional().describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"),
    name: als(),
    version: C.string().optional().describe("Marketplace manifest version"),
    description: C.string().optional().describe("Human-readable description of this marketplace"),
    owner: Jon().describe("Marketplace maintainer or curator information"),
    plugins: C.array(C.unknown()).transform(mlu).describe("Collection of available plugins in this marketplace"),
    forceRemoveDeletedPlugins: C.boolean().optional().describe("When true, plugins removed from this marketplace will be automatically uninstalled and flagged for users"),
    metadata: C.object({
      pluginRoot: C.string().optional().describe("Base path for relative plugin sources"),
      version: C.string().optional().describe("Marketplace version"),
      description: C.string().optional().describe("Marketplace description")
    }).optional().describe("Optional marketplace metadata"),
    allowCrossMarketplaceDependenciesOn: C.array(C.string()).optional().describe("Marketplace names whose plugins may be auto-installed as dependencies. Only the root marketplace's allowlist applies \u2014 no transitive trust.")
  })), tsn = ve(() => C.string().regex(/^[A-Za-z0-9][-A-Za-z0-9._]*@[A-Za-z0-9][-A-Za-z0-9._]*$/, "Plugin ID must be in format: plugin@marketplace")), flu = /^[A-Za-z0-9][-A-Za-z0-9._]*(@[A-Za-z0-9][-A-Za-z0-9._]*)?(@\^[^@]*)?$/, hlu = ve(() => C.union([C.string().regex(flu, "Dependency must be a plugin name, optionally qualified with @marketplace").transform(dep => dep.replace(/@\^[^@]*$/, "")), C.object({
    name: C.string().min(1).regex(/^[A-Za-z0-9][-A-Za-z0-9._]*$/),
    marketplace: C.string().min(1).regex(/^[A-Za-z0-9][-A-Za-z0-9._]*$/).optional()
  }).loose().transform(dep => dep.marketplace ? `${dep.name}@${dep.marketplace}` : dep.name)])), glu = ve(() => C.object({
    version: C.string().describe("Currently installed version"),
    installedAt: C.string().describe("ISO 8601 timestamp of installation"),
    lastUpdated: C.string().optional().describe("ISO 8601 timestamp of last update"),
    installPath: C.string().describe("Absolute path to the installed plugin directory"),
    gitCommitSha: C.string().optional().describe("Git commit SHA for git-based plugins (for version tracking)"),
    resolvedVersion: C.string().optional().describe("Tag-derived semver this install resolved to (when fetched via a version constraint). Used by verifyAndDemote in preference to manifest.version, since the upstream may have forgotten to bump plugin.json."),
    auto: C.boolean().optional().describe("True when this plugin was pulled in as a dependency rather than installed explicitly. Auto-installed plugins are eligible for removal by the orphan sweep when nothing depends on them. Absent = manual (preserves pre-flag installs).")
  })), XRt = ve(() => C.object({
    version: C.literal(1).describe("Schema version 1"),
    plugins: C.record(tsn(), glu()).describe("Map of plugin IDs to their installation metadata")
  })), _lu = ve(() => C.enum(["managed", "user", "project", "local"])), ylu = ve(() => C.object({
    scope: _lu().describe("Installation scope"),
    projectPath: C.string().optional().describe("Project path (required for project/local scopes)"),
    installPath: C.string().describe("Absolute path to the versioned plugin directory"),
    version: C.string().optional().describe("Currently installed version"),
    installedAt: C.string().optional().describe("ISO 8601 timestamp of installation"),
    lastUpdated: C.string().optional().describe("ISO 8601 timestamp of last update"),
    gitCommitSha: C.string().optional().describe("Git commit SHA for git-based plugins"),
    resolvedVersion: C.string().optional().describe("Tag-derived semver this install resolved to"),
    auto: C.boolean().optional().describe("True when pulled in as a dependency. Eligible for orphan sweep.")
  })), QRt = ve(() => C.object({
    version: C.literal(2).describe("Schema version 2"),
    plugins: C.record(tsn(), C.array(ylu())).describe("Map of plugin IDs to arrays of installation entries")
  })), yLf = ve(() => C.union([XRt(), QRt()])), Tlu = ve(() => C.object({
    source: YRt().describe("Where to fetch the marketplace from"),
    installLocation: C.string().describe("Local cache path where marketplace manifest is stored"),
    lastUpdated: C.string().describe("ISO 8601 timestamp of last marketplace refresh"),
    autoUpdate: C.boolean().optional().describe("Whether to automatically update this marketplace and its installed plugins on startup")
  })), rYe = ve(() => C.record(C.string(), Tlu()));
});

export {Gpe,zau,Yau,DSr,JRt,P5,mlu,jRt,sCe,xSr,Gau,Vau,Kau,Yon,jau,D5,Q1e,sls,HSr,ISr,als,Jon,Jau,Xon,Xau,Qau,Zau,elu,tlu,lls,cls,nlu,ils,rlu,olu,uls,slu,ilu,nYe,alu,PSr,dls,llu,pls,clu,ulu,Vpe,YRt,kSr,mls,dlu,Qon,Zon,esn,plu,GK,tsn,flu,hlu,glu,XRt,_lu,ylu,QRt,yLf,Tlu,rYe,bk};
