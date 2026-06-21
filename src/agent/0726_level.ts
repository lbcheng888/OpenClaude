// @ts-nocheck
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Xr as i8} from "../../vendor/m321.ts";
import {dnn as mH6,K3 as xm} from "../../vendor/m723.ts";
import {bbe as cJH,boe as OqH} from "../../vendor/m724.ts";
import {we as yH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// @ts-nocheck
function resolveAutoUpdate(marketplaceName, entry, explicitOverride) {
  if (explicitOverride !== undefined) return explicitOverride;
  let nameLower = marketplaceName.toLowerCase();
  return entry.autoUpdate ?? (officialAutoUpdateMarketplaces.has(nameLower) && !explicitOptInOnly.has(nameLower));
}
function isOfficialNameImpersonation(name) {
  if (reservedOfficialNames.has(name.toLowerCase())) return false;
  if (officialNameNonAsciiPattern.test(name)) return true;
  return officialNameKeywordPattern.test(name);
}
function isValidAnthropicsGitHubUrl(urlStr) {
  let trimmed = urlStr.trim(),
    sshMatch = /^git@github\.com:anthropics\/(.+)$/i.exec(trimmed);
  if (sshMatch) return !(sshMatch[1] ?? "").split("/").includes("..");
  try {
    let parsedUrl = new URL(trimmed);
    if (!allowedGitProtocols.has(parsedUrl.protocol.toLowerCase())) return false;
    if (parsedUrl.pathname.split("/").includes("..")) return false;
    return parsedUrl.hostname.toLowerCase() === "github.com" && parsedUrl.pathname.toLowerCase().startsWith("/anthropics/");
  } catch {
    return false;
  }
}
function validateOfficialNameSource(name, source) {
  let nameLower = name.toLowerCase();
  if (!reservedOfficialNames.has(nameLower)) return null;
  if (source.source === "github") {
    let repo = source.repo || "";
    if (!repo.toLowerCase().startsWith(`${ANTHROPICS_ORG}/`) || repo.split("/").includes("..")) return `The name '${name}' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/${ANTHROPICS_ORG}/' can use this name.`;
    return null;
  }
  if (source.source === "git" && source.url) {
    if (isValidAnthropicsGitHubUrl(source.url)) return null;
    return `The name '${name}' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/${ANTHROPICS_ORG}/' can use this name.`;
  }
  return `The name '${name}' is reserved for official Anthropic marketplaces and can only be used with GitHub sources from the '${ANTHROPICS_ORG}' organization.`;
}
function isRelativePluginPath(path) {
  return typeof path === "string" && path.startsWith("./");
}
function isFilesystemSource(source) {
  return source.source === "file" || source.source === "directory";
}
function parseMarketplacePlugins(rawPlugins) {
  let parser = MarketplacePluginEntrySchema_2();
  return rawPlugins.flatMap((rawEntry, idx) => {
    let result = parser.safeParse(rawEntry);
    if (result.success) return [result.data];
    let stubName = MinimalNameSchema().safeParse(rawEntry).data?.name,
      errorMessages = result.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join(", ");
    if (stubName) return N(`Stubbing unparseable marketplace plugin entry (${stubName}): ${errorMessages}`, {
      level: "warn"
    }), [{
      name: stubName,
      source: {
        source: "unsupported"
      },
      strict: true
    }];
    return N(`Dropping unparseable marketplace plugin entry (index ${idx}): ${errorMessages}`, {
      level: "warn"
    }), [];
  });
}
var communityMarketplaceNames,
  officialAutoUpdateMarketplaces,
  reservedOfficialNames,
  explicitOptInOnly,
  officialNameKeywordPattern,
  officialNameNonAsciiPattern,
  ANTHROPICS_ORG = "anthropics",
  allowedGitProtocols,
  RelativePathSchema,
  JsonRelativePathSchema,
  McpbPathSchema,
  MarkdownPathSchema,
  MarkdownOrRelativePathSchema,
  MarketplaceNameSchema,
  AuthorSchema,
  PluginManifestSchema,
  PluginHooksManifestSchema,
  PluginAdditionalHooksSchema,
  PluginCommandSchema,
  PluginCommandsSchema,
  PluginAgentsSchema,
  PluginSkillsSchema,
  PluginOutputStylesSchema,
  PluginThemesSchema,
  PluginWorkflowsSchema,
  NonEmptyStringSchema,
  FileExtensionSchema,
  PluginMcpServersSchema,
  UserConfigFieldSchema,
  PluginUserConfigSchema,
  PluginChannelSchema,
  LspServerConfigSchema,
  MonitorDefinitionSchema,
  MonitorsArraySchema,
  PluginMonitorsSchema,
  PluginLspServersSchema,
  NpmPackageNameSchema,
  PluginSettingsSchema,
  PluginExperimentalSchema,
  FullPluginRootSchema,
  MarketplaceSourceSchema,
  GitCommitShaSchema,
  PluginSourceSchema,
  MarketplacePluginEntrySchema,
  RelevanceSignalsSchema,
  PluginRelevanceSchema,
  MarketplacePluginEntrySchema_2,
  MinimalNameSchema,
  MarketplaceManifestSchema,
  PluginIdSchema,
  PLUGIN_ID_REGEX,
  PluginDependencySchema,
  InstalledPluginRecordSchema,
  InstallRegistryV1Schema,
  InstallScopeSchema,
  ScopedInstallEntrySchema,
  InstallRegistryV2Schema,
  InstallRegistrySchema,
  MarketplaceCacheEntrySchema,
  MarketplaceCacheSchema;
var qZ = L(() => {
  i8();
  mH6();
  cJH();
  gH();
  communityMarketplaceNames = new Set(["claude-community", "claude-plugins-community"]), officialAutoUpdateMarketplaces = new Set(["claude-code-marketplace", "claude-code-plugins", "claude-plugins-official", "anthropic-marketplace", "anthropic-plugins", "agent-skills", "anthropic-agent-skills", "life-sciences", "knowledge-work-plugins", "claude-for-legal", "claude-for-financial-services", "financial-services-plugins"]), reservedOfficialNames = new Set([...officialAutoUpdateMarketplaces, ...communityMarketplaceNames]), explicitOptInOnly = new Set(["knowledge-work-plugins"]);
  officialNameKeywordPattern = /(?:official[^a-z0-9]*(anthropic|claude)|(?:anthropic|claude)[^a-z0-9]*official|^(?:anthropic|claude)[^a-z0-9]*(marketplace|plugins|official))/i, officialNameNonAsciiPattern = /[^\u0020-\u007E]/;
  allowedGitProtocols = new Set(["https:", "http:", "git:", "git+https:", "git+http:", "git+ssh:", "ssh:"]);
  RelativePathSchema = yH(() => k.string().startsWith("./")), JsonRelativePathSchema = yH(() => RelativePathSchema().endsWith(".json")), McpbPathSchema = yH(() => k.union([RelativePathSchema().refine(H => H.endsWith(".mcpb") || H.endsWith(".dxt"), {
    message: "MCPB file path must end with .mcpb or .dxt"
  }).describe("Path to MCPB file relative to plugin root"), k.string().url().refine(H => H.endsWith(".mcpb") || H.endsWith(".dxt"), {
    message: "MCPB URL must end with .mcpb or .dxt"
  }).describe("URL to MCPB file")])), MarkdownPathSchema = yH(() => RelativePathSchema().endsWith(".md")), MarkdownOrRelativePathSchema = yH(() => k.union([MarkdownPathSchema(), RelativePathSchema()])), MarketplaceNameSchema = yH(() => k.string().min(1, "Marketplace must have a name").refine(H => !H.includes(" "), {
    message: 'Marketplace name cannot contain spaces. Use kebab-case (e.g., "my-marketplace")'
  }).refine(H => !H.includes("/") && !H.includes("\\") && !H.includes("..") && H !== ".", {
    message: 'Marketplace name cannot contain path separators (/ or \\), ".." sequences, or be "."'
  }).refine(H => !isOfficialNameImpersonation(H), {
    message: "Marketplace name impersonates an official Anthropic/Claude marketplace"
  }).refine(H => H.toLowerCase() !== "inline", {
    message: 'Marketplace name "inline" is reserved for --plugin-dir session plugins'
  }).refine(H => H.toLowerCase() !== "builtin", {
    message: 'Marketplace name "builtin" is reserved for built-in plugins'
  }).refine(H => H.toLowerCase() !== "skills-dir", {
    message: 'Marketplace name "skills-dir" is reserved for plugins auto-loaded from .claude/skills/'
  })), AuthorSchema = yH(() => k.object({
    name: k.string().min(1, "Author name cannot be empty").describe("Display name of the plugin author or organization"),
    email: k.string().optional().describe("Contact email for support or feedback"),
    url: k.string().optional().describe("Website, GitHub profile, or organization URL")
  })), PluginManifestSchema = yH(() => k.object({
    $schema: k.string().optional().describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"),
    name: k.string().min(1, "Plugin name cannot be empty").refine(H => !H.includes(" "), {
      message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")'
    }).describe("Unique identifier for the plugin, used for namespacing (prefer kebab-case)"),
    displayName: k.string().optional().describe('Human-readable name shown in UI (e.g., "GitHub Utils"). Falls back to `name` when omitted. Unlike `name`, may contain spaces and any casing; not used for namespacing or lookup.'),
    version: k.string().optional().describe("Semantic version (e.g., 1.2.3) following semver.org specification"),
    description: k.string().optional().describe("Brief, user-facing explanation of what the plugin provides"),
    author: AuthorSchema().optional().describe("Information about the plugin creator or maintainer"),
    homepage: k.string().url().optional().describe("Plugin homepage or documentation URL"),
    repository: k.string().optional().describe("Source code repository URL"),
    license: k.string().optional().describe("SPDX license identifier (e.g., MIT, Apache-2.0)"),
    keywords: k.array(k.string()).optional().describe("Tags for plugin discovery and categorization"),
    defaultEnabled: k.boolean().optional().describe("Whether the plugin starts enabled when the user has no explicit enabled/disabled setting for it (default: true). Explicit enabledPlugins values always win, and a plugin required by an enabled dependent is enabled regardless of this value."),
    dependencies: k.array(PluginDependencySchema()).optional().describe(`Plugins that must be enabled for this plugin to function. Bare names (no "@marketplace") are resolved against the declaring plugin's own marketplace.`)
  })), PluginHooksManifestSchema = yH(() => k.object({
    description: k.string().optional().describe("Brief, user-facing explanation of what these hooks provide"),
    hooks: k.lazy(() => xm()).describe("The hooks provided by the plugin, in the same format as the one used for settings")
  })), PluginAdditionalHooksSchema = yH(() => k.object({
    hooks: k.union([JsonRelativePathSchema().describe("Path to file with additional hooks (in addition to those in hooks/hooks.json, if it exists), relative to the plugin root"), k.lazy(() => xm()).describe("Additional hooks (in addition to those in hooks/hooks.json, if it exists)"), k.array(k.union([JsonRelativePathSchema().describe("Path to file with additional hooks (in addition to those in hooks/hooks.json, if it exists), relative to the plugin root"), k.lazy(() => xm()).describe("Additional hooks (in addition to those in hooks/hooks.json, if it exists)")]))])
  })), PluginCommandSchema = yH(() => k.object({
    source: MarkdownOrRelativePathSchema().optional().describe("Path to command markdown file, relative to plugin root"),
    content: k.string().optional().describe("Inline markdown content for the command"),
    description: k.string().optional().describe("Command description override"),
    argumentHint: k.string().optional().describe('Hint for command arguments (e.g., "[file]")'),
    model: k.string().optional().describe("Default model for this command"),
    allowedTools: k.array(k.string()).optional().describe("Tools allowed when command runs")
  }).refine(H => H.source && !H.content || !H.source && H.content, {
    message: 'Command must have either "source" (file path) or "content" (inline markdown), but not both'
  })), PluginCommandsSchema = yH(() => k.object({
    commands: k.union([MarkdownOrRelativePathSchema().describe("Path to a command file or skill directory, relative to the plugin root. When set, the commands/ directory is not auto-loaded \u2014 list its files here if you want both."), k.array(MarkdownOrRelativePathSchema().describe("Path to a command file or skill directory, relative to the plugin root. When set, the commands/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of command file or skill directory paths. When set, the commands/ directory is not auto-loaded."), k.record(k.string(), PluginCommandSchema()).describe('Object mapping of command names to their metadata and source files. Command name becomes the slash command name (e.g., "about" \u2192 "/plugin:about")')])
  })), PluginAgentsSchema = yH(() => k.object({
    agents: k.union([MarkdownPathSchema().describe("Path to an agent file, relative to the plugin root. When set, the agents/ directory is not auto-loaded \u2014 list its files here if you want both."), k.array(MarkdownPathSchema().describe("Path to an agent file, relative to the plugin root. When set, the agents/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of agent file paths. When set, the agents/ directory is not auto-loaded.")])
  })), PluginSkillsSchema = yH(() => k.object({
    skills: k.union([RelativePathSchema().describe("Path to a skill directory, relative to the plugin root. Loaded in addition to the skills/ directory (except: for a marketplace entry whose source resolves to the marketplace root, declaring a specific subdirectory replaces the skills/ scan)."), k.array(RelativePathSchema().describe("Path to a skill directory, relative to the plugin root.")).describe("List of skill directory paths, loaded in addition to the skills/ directory (except: for a marketplace entry whose source resolves to the marketplace root, declaring specific subdirectories replaces the skills/ scan).")])
  })), PluginOutputStylesSchema = yH(() => k.object({
    outputStyles: k.union([RelativePathSchema().describe("Path to an output-styles directory or file, relative to the plugin root. When set, the output-styles/ directory is not auto-loaded \u2014 list its files here if you want both."), k.array(RelativePathSchema().describe("Path to an output-styles directory or file, relative to the plugin root. When set, the output-styles/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of output-style directory or file paths. When set, the output-styles/ directory is not auto-loaded.")])
  })), PluginThemesSchema = yH(() => k.object({
    themes: k.union([RelativePathSchema().describe("Path to a themes directory or file, relative to the plugin root. When set, the themes/ directory is not auto-loaded \u2014 list its files here if you want both."), k.array(RelativePathSchema().describe("Path to a themes directory or file, relative to the plugin root. When set, the themes/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of theme directory or file paths. When set, the themes/ directory is not auto-loaded.")])
  })), PluginWorkflowsSchema = yH(() => k.object({
    workflows: k.union([RelativePathSchema().describe("Path to a workflows directory or .js file, relative to the plugin root. When set, the workflows/ directory is not auto-loaded \u2014 list its files here if you want both."), k.array(RelativePathSchema().describe("Path to a workflows directory or .js file, relative to the plugin root. When set, the workflows/ directory is not auto-loaded \u2014 list its files here if you want both.")).describe("List of workflow directory or .js file paths. When set, the workflows/ directory is not auto-loaded.")]).optional()
  })), NonEmptyStringSchema = yH(() => k.string().min(1)), FileExtensionSchema = yH(() => k.string().min(2).refine(H => H.startsWith("."), {
    message: 'File extensions must start with dot (e.g., ".ts", not "ts")'
  })), PluginMcpServersSchema = yH(() => k.object({
    mcpServers: k.union([JsonRelativePathSchema().describe("MCP servers to include in the plugin (in addition to those in the .mcp.json file, if it exists)"), McpbPathSchema().describe("Path or URL to MCPB file containing MCP server configuration"), k.record(k.string(), OqH()).describe("MCP server configurations keyed by server name"), k.array(k.union([JsonRelativePathSchema().describe("Path to MCP servers configuration file"), McpbPathSchema().describe("Path or URL to MCPB file"), k.record(k.string(), OqH()).describe("Inline MCP server configurations")])).describe("Array of MCP server configurations (paths, MCPB files, or inline definitions)")])
  })), UserConfigFieldSchema = yH(() => k.object({
    type: k.enum(["string", "number", "boolean", "directory", "file"]).describe("Type of the configuration value"),
    title: k.string().describe("Human-readable label shown in the config dialog"),
    description: k.string().describe("Help text shown beneath the field in the config dialog"),
    required: k.boolean().optional().describe("If true, validation fails when this field is empty"),
    default: k.union([k.string(), k.number(), k.boolean(), k.array(k.string())]).optional().describe("Default value used when the user provides nothing"),
    multiple: k.boolean().optional().describe("For string type: allow an array of strings"),
    sensitive: k.boolean().optional().describe("If true, masks dialog input and stores value in secure storage (keychain/credentials file) instead of settings.json"),
    min: k.number().optional().describe("Minimum value (number type only)"),
    max: k.number().optional().describe("Maximum value (number type only)")
  }).strict()), PluginUserConfigSchema = yH(() => k.object({
    userConfig: k.record(k.string().regex(/^[A-Za-z_]\w*$/, "Option keys must be valid identifiers (letters, digits, underscore; no leading digit) \u2014 they become CLAUDE_PLUGIN_OPTION_<KEY> env vars in hooks"), UserConfigFieldSchema()).optional().describe("User-configurable values this plugin needs. Prompted at enable time. Non-sensitive values saved to settings.json; sensitive values to secure storage. Available as ${user_config.KEY} in MCP/LSP server config, hook commands, and (non-sensitive only) skill/agent content. Keep sensitive value counts small.")
  })), PluginChannelSchema = yH(() => k.object({
    channels: k.array(k.object({
      server: k.string().min(1).describe("Name of the MCP server this channel binds to. Must match a key in this plugin's mcpServers."),
      displayName: k.string().optional().describe('Human-readable name shown in the config dialog title (e.g., "Telegram"). Defaults to the server name.'),
      userConfig: k.record(k.string(), UserConfigFieldSchema()).optional().describe("Fields to prompt the user for when enabling this plugin in assistant mode. Saved values are substituted into ${user_config.KEY} references in the mcpServers env.")
    }).strict()).describe("Channels this plugin provides. Each entry declares an MCP server as a message channel and optionally specifies user configuration to prompt for at enable time.")
  })), LspServerConfigSchema = yH(() => k.strictObject({
    command: k.string().min(1).refine(H => {
      if (H.includes(" ") && !H.startsWith("/")) return false;
      return true;
    }, {
      message: "Command should not contain spaces. Use args array for arguments."
    }).describe('Command to execute the LSP server (e.g., "typescript-language-server")'),
    args: k.array(NonEmptyStringSchema()).optional().describe("Command-line arguments to pass to the server"),
    extensionToLanguage: k.record(FileExtensionSchema(), NonEmptyStringSchema()).refine(H => Object.keys(H).length > 0, {
      message: "extensionToLanguage must have at least one mapping"
    }).describe("Mapping from file extension to LSP language ID. File extensions and languages are derived from this mapping."),
    transport: k.enum(["stdio", "socket"]).default("stdio").describe("Communication transport mechanism"),
    env: k.record(k.string(), k.string()).optional().describe("Environment variables to set when starting the server"),
    initializationOptions: k.unknown().optional().describe("Initialization options passed to the server during initialization"),
    settings: k.unknown().optional().describe("Settings passed to the server via workspace/didChangeConfiguration"),
    workspaceFolder: k.string().optional().describe("Workspace folder path to use for the server"),
    startupTimeout: k.number().int().positive().optional().describe("Maximum time to wait for server startup (milliseconds)"),
    shutdownTimeout: k.number().int().positive().optional().describe("Maximum time to wait for graceful shutdown (milliseconds)"),
    restartOnCrash: k.boolean().optional().describe("Whether to restart the server if it crashes"),
    maxRestarts: k.number().int().nonnegative().optional().describe("Maximum number of restart attempts before giving up"),
    diagnostics: k.boolean().optional().describe("Whether to push publishDiagnostics into the agent context after edits. Set to false to keep LSP navigation (goToDefinition, hover, etc.) but suppress automatic diagnostic injection. Defaults to true.")
  })), MonitorDefinitionSchema = yH(() => k.strictObject({
    name: k.string().min(1).describe("Identifier for this monitor, unique within the plugin. Used to dedupe so re-arming (plugin reload, repeat skill invoke) does not spawn duplicates."),
    command: k.string().min(1).describe('Shell command to run as a persistent background monitor. Each stdout line is delivered to the model as a <task_notification> event; the process runs for the session lifetime. ${CLAUDE_PLUGIN_ROOT}, ${CLAUDE_PLUGIN_DATA}, ${CLAUDE_PROJECT_DIR}, ${user_config.*}, and ${ENV_VAR} are substituted. Runs in the session cwd \u2014 prefix with `cd "${CLAUDE_PLUGIN_ROOT}" && ` if the script needs its own directory.'),
    description: k.string().min(1).describe("Short human-readable description of what is being monitored (shown in task panel and notification summary)."),
    when: k.union([k.literal("always"), k.string().startsWith("on-skill-invoke:").refine(H => H.length > 16, {
      message: "on-skill-invoke: must specify a skill name"
    })]).default("always").describe('Arm trigger. "always" arms at session start and on plugin reload. "on-skill-invoke:<skill>" arms the first time that skill is dispatched (via Skill tool or slash command).')
  })), MonitorsArraySchema = yH(() => k.array(MonitorDefinitionSchema()).refine(H => new Set(H.map(_ => _.name)).size === H.length, {
    message: "Monitor names must be unique within a plugin"
  })), PluginMonitorsSchema = yH(() => k.object({
    monitors: k.union([JsonRelativePathSchema().describe("Path to a JSON file containing the monitors array, relative to the plugin root"), MonitorsArraySchema()]).describe("Background watch scripts the host arms as persistent Monitor tasks (unsandboxed, same trust tier as hooks) so plugins need not instruct the model to arm them. When omitted, monitors/monitors.json at the plugin root is loaded if present.")
  })), PluginLspServersSchema = yH(() => k.object({
    lspServers: k.union([JsonRelativePathSchema().describe("Path to .lsp.json configuration file relative to plugin root"), k.record(k.string(), LspServerConfigSchema()).describe("LSP server configurations keyed by server name"), k.array(k.union([JsonRelativePathSchema().describe("Path to LSP configuration file"), k.record(k.string(), LspServerConfigSchema()).describe("Inline LSP server configurations")])).describe("Array of LSP server configurations (paths or inline definitions)")])
  })), NpmPackageNameSchema = yH(() => k.string().refine(H => !H.includes("..") && !H.includes("//"), "Package name cannot contain path traversal patterns").refine(H => {
    let _ = /^@[a-z0-9][a-z0-9-._]*\/[a-z0-9][a-z0-9-._]*$/,
      q = /^[a-z0-9][a-z0-9-._]*$/;
    return _.test(H) || q.test(H);
  }, "Invalid npm package name format")), PluginSettingsSchema = yH(() => k.object({
    settings: k.record(k.string(), k.unknown()).optional().describe("Settings to merge into the user settings while this plugin is enabled. Only the documented allowlisted keys are applied.")
  })), PluginExperimentalSchema = yH(() => k.object({
    experimental: k.preprocess(H => typeof H === "object" && H !== null && !Array.isArray(H) ? H : undefined, k.object({
      ...PluginThemesSchema().partial().shape,
      ...PluginMonitorsSchema().partial().shape,
      ...PluginOutputStylesSchema().partial().shape,
      evals: k.union([k.string(), k.array(k.string())]).optional().describe("Path(s) to evaluation query files for `claude plugin eval`. Defaults to `evals/`.")
    }).optional().describe("Components whose manifest shape may change without a deprecation cycle. Move a key out of here once it is promoted to stable."))
  })), FullPluginRootSchema = yH(() => k.object({
    ...PluginManifestSchema().shape,
    ...PluginAdditionalHooksSchema().partial().shape,
    ...PluginCommandsSchema().partial().shape,
    ...PluginAgentsSchema().partial().shape,
    ...PluginSkillsSchema().partial().shape,
    ...PluginOutputStylesSchema().partial().shape,
    ...PluginThemesSchema().partial().shape,
    ...PluginWorkflowsSchema().shape,
    ...PluginChannelSchema().partial().shape,
    ...PluginMcpServersSchema().partial().shape,
    ...PluginLspServersSchema().partial().shape,
    ...PluginMonitorsSchema().partial().shape,
    ...PluginSettingsSchema().partial().shape,
    ...PluginUserConfigSchema().partial().shape,
    ...PluginExperimentalSchema().partial().shape
  })), MarketplaceSourceSchema = yH(() => k.discriminatedUnion("source", [k.object({
    source: k.literal("url"),
    url: k.string().url().describe("Direct URL to marketplace.json file"),
    headers: k.record(k.string(), k.string()).optional().describe("Custom HTTP headers (e.g., for authentication)")
  }), k.object({
    source: k.literal("github"),
    repo: k.string().describe("GitHub repository in owner/repo format"),
    ref: k.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    path: k.string().optional().describe("Path to marketplace.json within repo (defaults to .claude-plugin/marketplace.json)"),
    sparsePaths: k.array(k.string()).optional().describe('Directories to include via git sparse-checkout (cone mode). Use for monorepos where the marketplace lives in a subdirectory. Example: [".claude-plugin", "plugins"]. If omitted, the full repository is cloned.'),
    skipLfs: k.boolean().optional().describe("Skip Git LFS smudge during clone and update (sets GIT_LFS_SKIP_SMUDGE=1) so LFS pointer files stay as pointers instead of downloading their content. Use for marketplaces hosted in repos with large LFS objects.")
  }), k.object({
    source: k.literal("git"),
    url: k.string().describe("Full git repository URL"),
    ref: k.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    path: k.string().optional().describe("Path to marketplace.json within repo (defaults to .claude-plugin/marketplace.json)"),
    sparsePaths: k.array(k.string()).optional().describe('Directories to include via git sparse-checkout (cone mode). Use for monorepos where the marketplace lives in a subdirectory. Example: [".claude-plugin", "plugins"]. If omitted, the full repository is cloned.'),
    skipLfs: k.boolean().optional().describe("Skip Git LFS smudge during clone and update (sets GIT_LFS_SKIP_SMUDGE=1) so LFS pointer files stay as pointers instead of downloading their content. Use for marketplaces hosted in repos with large LFS objects.")
  }), k.object({
    source: k.literal("npm"),
    package: NpmPackageNameSchema().describe("NPM package containing marketplace.json")
  }), k.object({
    source: k.literal("file"),
    path: k.string().describe("Local file path to marketplace.json")
  }), k.object({
    source: k.literal("directory"),
    path: k.string().describe("Local directory containing .claude-plugin/marketplace.json")
  }), k.object({
    source: k.literal("skills-dir")
  }).describe("Policy-list sentinel for the ~/.claude/skills/ auto-load (@skills-dir plugins). In strictKnownMarketplaces: opt the scan back IN (by default any allowlist blocks it). In blockedMarketplaces: turn the scan OFF without otherwise restricting marketplaces. Only meaningful in those two managed-settings lists (areLocalPluginDirsAllowedByPolicy); known_marketplaces.json / marketplace add etc. ignore it."), k.object({
    source: k.literal("hostPattern"),
    hostPattern: k.string().describe('Regex pattern to match the host/domain extracted from any marketplace source type. For github sources, matches against "github.com". For git sources (SSH or HTTPS), extracts the hostname from the URL. Use in strictKnownMarketplaces to allow all marketplaces from a specific host (e.g., "^github\\.mycompany\\.com$").')
  }), k.object({
    source: k.literal("pathPattern"),
    pathPattern: k.string().describe('Regex pattern matched against the .path field of file and directory sources. Use in strictKnownMarketplaces to allow filesystem-based marketplaces alongside hostPattern restrictions for network sources. Use ".*" to allow all filesystem paths, or a narrower pattern (e.g., "^/opt/approved/") to restrict to specific directories.')
  }), k.object({
    source: k.literal("settings"),
    name: MarketplaceNameSchema().refine(H => !reservedOfficialNames.has(H.toLowerCase()), {
      message: "Reserved marketplace names cannot be used with settings sources. validateOfficialNameSource only accepts github/git sources from anthropics/* for these names; a settings source would be rejected after loadAndCacheMarketplace has already written to disk with cleanupNeeded=false."
    }).describe("Marketplace name. Must match the extraKnownMarketplaces key (enforced); the synthetic manifest is written under this name. Same validation " + "as PluginMarketplaceSchema plus reserved-name rejection \u2014 " + "validateOfficialNameSource runs after the disk write, too late to clean up."),
    plugins: k.array(MarketplacePluginEntrySchema()).describe("Plugin entries declared inline in settings.json"),
    owner: AuthorSchema().optional()
  }).describe("Inline marketplace manifest defined directly in settings.json. The reconciler writes a synthetic marketplace.json to the cache; diffMarketplaces detects edits via isEqual on the stored source (the plugins array is inside this object, so edits surface as sourceChanged).")])), GitCommitShaSchema = yH(() => k.string().length(40).regex(/^[a-f0-9]{40}$/, "Must be a full 40-character lowercase git commit SHA")), PluginSourceSchema = yH(() => k.union([k.preprocess(H => H === "." ? "./" : H, RelativePathSchema()).describe("Path to the plugin root, relative to the marketplace root (the directory containing .claude-plugin/, not .claude-plugin/ itself)"), k.object({
    source: k.literal("npm"),
    package: NpmPackageNameSchema().or(k.string().refine(H => /^(?:file|https?|git(?:\+https?|\+ssh)?|ssh|github|gitlab|bitbucket):/i.test(H) || !H.includes(".."), 'Package reference cannot contain ".." path segments')).describe("Package name (or url, or local path, or anything else that can be passed to `npm` as a package)"),
    version: k.string().optional().describe("Specific version or version range (e.g., ^1.0.0, ~2.1.0)"),
    registry: k.string().url().optional().describe("Custom NPM registry URL (defaults to using system default, likely npmjs.org)")
  }).describe("NPM package as plugin source"), k.object({
    source: k.literal("url"),
    url: k.string().describe("Full git repository URL (https:// or git@)"),
    ref: k.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    sha: GitCommitShaSchema().optional().describe("Specific commit SHA to use")
  }), k.object({
    source: k.literal("github"),
    repo: k.string().describe("GitHub repository in owner/repo format"),
    ref: k.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    sha: GitCommitShaSchema().optional().describe("Specific commit SHA to use")
  }), k.object({
    source: k.literal("git-subdir"),
    url: k.string().describe("Git repository: GitHub owner/repo shorthand, https://, or git@ URL"),
    path: k.string().min(1).describe('Subdirectory within the repo containing the plugin (e.g., "tools/claude-plugin"). Cloned sparsely using partial clone (--filter=tree:0) to minimize bandwidth for monorepos.'),
    ref: k.string().optional().describe('Git branch or tag to use (e.g., "main", "v1.0.0"). Defaults to repository default branch.'),
    sha: GitCommitShaSchema().optional().describe("Specific commit SHA to use")
  }).describe("Plugin located in a subdirectory of a larger repository (monorepo). Only the specified subdirectory is materialized; the rest of the repo is not downloaded."), k.object({
    source: k.literal("unsupported")
  }).describe("Placeholder for source types this Claude Code version does not " + "recognize. Never authored by hand \u2014 PluginMarketplaceSchema rewrites " + 'unparseable sources to this so the entry remains in marketplace.plugins (detectDelistedPlugins must not see it as removed). Install attempts fail at cachePlugin with a clear "update Claude Code" message.')])), MarketplacePluginEntrySchema = yH(() => k.object({
    name: k.string().min(1, "Plugin name cannot be empty").refine(H => !H.includes(" "), {
      message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")'
    }).describe("Plugin name as it appears in the target repository"),
    source: PluginSourceSchema().describe("Where to fetch the plugin from. Must be a remote source \u2014 relative " + "paths have no marketplace repository to resolve against."),
    description: k.string().optional(),
    version: k.string().optional(),
    strict: k.boolean().optional()
  }).refine(H => typeof H.source !== "string", {
    message: 'Plugins in a settings-sourced marketplace must use remote sources (github, git-subdir, npm, url). Relative-path sources like "./foo" have no marketplace repository to resolve against.'
  }).refine(H => typeof H.source === "string" || H.source.source !== "unsupported", {
    message: "source.source: 'unsupported' is a parse-time placeholder and cannot be authored. Use a remote source (github, git-subdir, npm, url)."
  }));
  RelevanceSignalsSchema = yH(() => k.object({
    cli: k.array(k.string().max(64)).max(10).optional().describe('First command tokens (e.g. ["stripe"]) \u2014 exact match against commands run this session.'),
    hosts: k.array(k.string().max(128)).max(20).optional().describe('Hostnames (e.g. ["api.stripe.com"]) \u2014 exact, case-insensitive match against ' + "hostnames seen in https?:// URLs in bash commands run this session. Bare hostname only: lowercase, no scheme, no port, no path."),
    filesRead: k.array(k.string().max(256)).max(10).optional().describe('Glob patterns (e.g. ["**/*.tf"]) \u2014 the plugin is relevant when a file Claude has read ' + "this session matches any pattern. Matched against read-file paths, forward-slash normalized, case-insensitive."),
    manifestDeps: k.array(k.object({
      file: k.string().max(256),
      pattern: k.string().max(256)
    })).max(10).optional().describe("Dependency declared in a package manifest. Each {file, pattern} is a pair of RegExp sources: " + "`file` matches the manifest filename (package.json, go.mod, requirements.txt, \u2026); " + "`pattern` matches the dependency declaration inside that file. Evaluated against files read this session."),
    cwd: k.array(k.string().max(256)).max(10).optional().describe('Glob patterns (e.g. ["Engine/Source/Runtime/Renderer/**"]) \u2014 the plugin is relevant when the ' + `session's working directory is at or under a directory matching the pattern. Matched against the cwd both relative to the enclosing git repo root and as an absolute path, forward-slash normalized, case-insensitive. A bare directory (no glob characters) means "cwd is at or under this directory". Known at session start, so this signal can surface a suggestion before the first turn.`)
  })), PluginRelevanceSchema = yH(() => k.object({
    topic: k.string().max(64).optional().describe('What the user is working with when this plugin is relevant \u2014 fills "Working with {topic}?". ' + 'Often the product name (e.g. "Stripe"); use a domain (e.g. "design") when the plugin name does not read naturally as a topic. Defaults to the plugin name with each hyphen-segment capitalized.'),
    signals: RelevanceSignalsSchema().optional().describe("Matchers that determine when the plugin is relevant.")
  })), MarketplacePluginEntrySchema_2 = yH(() => FullPluginRootSchema().partial().extend({
    name: k.string().min(1, "Plugin name cannot be empty").refine(H => !H.includes(" "), {
      message: 'Plugin name cannot contain spaces. Use kebab-case (e.g., "my-plugin")'
    }).describe("Unique identifier matching the plugin name"),
    source: PluginSourceSchema().describe("Where to fetch the plugin from"),
    category: k.string().optional().describe('Category for organizing plugins (e.g., "productivity", "development")'),
    tags: k.array(k.string()).optional().describe("Tags for searchability and discovery"),
    strict: k.boolean().optional().default(true).describe("Require the plugin manifest to be present in the plugin folder. If false, the marketplace entry provides the manifest."),
    relevance: k.preprocess(H => typeof H === "object" && H !== null && !Array.isArray(H) ? H : undefined, PluginRelevanceSchema().optional()).describe(`Declares when this plugin is relevant to the user's work. Consumed by the spinner tip ("Working with {topic}?"), session-start auto-suggest, and marketplace browse ranking.`)
  })), MinimalNameSchema = yH(() => k.object({
    name: k.string().min(1).refine(H => !H.includes(" "))
  }));
  MarketplaceManifestSchema = yH(() => k.object({
    $schema: k.string().optional().describe("JSON Schema reference for editor autocomplete/validation; ignored at load time"),
    name: MarketplaceNameSchema(),
    version: k.string().optional().describe("Marketplace manifest version"),
    description: k.string().optional().describe("Human-readable description of this marketplace"),
    owner: AuthorSchema().describe("Marketplace maintainer or curator information"),
    plugins: k.array(k.unknown()).transform(parseMarketplacePlugins).describe("Collection of available plugins in this marketplace"),
    forceRemoveDeletedPlugins: k.boolean().optional().describe("When true, plugins removed from this marketplace will be automatically uninstalled and flagged for users"),
    metadata: k.object({
      pluginRoot: k.string().optional().describe("Base path for relative plugin sources"),
      version: k.string().optional().describe("Marketplace version"),
      description: k.string().optional().describe("Marketplace description")
    }).optional().describe("Optional marketplace metadata"),
    allowCrossMarketplaceDependenciesOn: k.array(k.string()).optional().describe("Marketplace names whose plugins may be auto-installed as dependencies. Only the root marketplace's allowlist applies \u2014 no transitive trust.")
  })), PluginIdSchema = yH(() => k.string().regex(/^[A-Za-z0-9][-A-Za-z0-9._]*@[A-Za-z0-9][-A-Za-z0-9._]*$/, "Plugin ID must be in format: plugin@marketplace")), PLUGIN_ID_REGEX = /^[A-Za-z0-9][-A-Za-z0-9._]*(@[A-Za-z0-9][-A-Za-z0-9._]*)?(@\^[^@]*)?$/, PluginDependencySchema = yH(() => k.union([k.string().regex(PLUGIN_ID_REGEX, "Dependency must be a plugin name, optionally qualified with @marketplace").transform(H => H.replace(/@\^[^@]*$/, "")), k.object({
    name: k.string().min(1).regex(/^[A-Za-z0-9][-A-Za-z0-9._]*$/),
    marketplace: k.string().min(1).regex(/^[A-Za-z0-9][-A-Za-z0-9._]*$/).optional()
  }).loose().transform(H => H.marketplace ? `${H.name}@${H.marketplace}` : H.name)])), InstalledPluginRecordSchema = yH(() => k.object({
    version: k.string().describe("Currently installed version"),
    installedAt: k.string().describe("ISO 8601 timestamp of installation"),
    lastUpdated: k.string().optional().describe("ISO 8601 timestamp of last update"),
    installPath: k.string().describe("Absolute path to the installed plugin directory"),
    gitCommitSha: k.string().optional().describe("Git commit SHA for git-based plugins (for version tracking)"),
    resolvedVersion: k.string().optional().describe("Tag-derived semver this install resolved to (when fetched via a version constraint). Used by verifyAndDemote in preference to manifest.version, since the upstream may have forgotten to bump plugin.json."),
    auto: k.boolean().optional().describe("True when this plugin was pulled in as a dependency rather than installed explicitly. Auto-installed plugins are eligible for removal by the orphan sweep when nothing depends on them. Absent = manual (preserves pre-flag installs).")
  })), InstallRegistryV1Schema = yH(() => k.object({
    version: k.literal(1).describe("Schema version 1"),
    plugins: k.record(PluginIdSchema(), InstalledPluginRecordSchema()).describe("Map of plugin IDs to their installation metadata")
  })), InstallScopeSchema = yH(() => k.enum(["managed", "user", "project", "local"])), ScopedInstallEntrySchema = yH(() => k.object({
    scope: InstallScopeSchema().describe("Installation scope"),
    projectPath: k.string().optional().describe("Project path (required for project/local scopes)"),
    installPath: k.string().describe("Absolute path to the versioned plugin directory"),
    version: k.string().optional().describe("Currently installed version"),
    installedAt: k.string().optional().describe("ISO 8601 timestamp of installation"),
    lastUpdated: k.string().optional().describe("ISO 8601 timestamp of last update"),
    gitCommitSha: k.string().optional().describe("Git commit SHA for git-based plugins"),
    resolvedVersion: k.string().optional().describe("Tag-derived semver this install resolved to"),
    auto: k.boolean().optional().describe("True when pulled in as a dependency. Eligible for orphan sweep.")
  })), InstallRegistryV2Schema = yH(() => k.object({
    version: k.literal(2).describe("Schema version 2"),
    plugins: k.record(PluginIdSchema(), k.array(ScopedInstallEntrySchema())).describe("Map of plugin IDs to arrays of installation entries")
  })), InstallRegistrySchema = yH(() => k.union([InstallRegistryV1Schema(), InstallRegistryV2Schema()])), MarketplaceCacheEntrySchema = yH(() => k.object({
    source: MarketplaceSourceSchema().describe("Where to fetch the marketplace from"),
    installLocation: k.string().describe("Local cache path where marketplace manifest is stored"),
    lastUpdated: k.string().describe("ISO 8601 timestamp of last marketplace refresh"),
    autoUpdate: k.boolean().optional().describe("Whether to automatically update this marketplace and its installed plugins on startup")
  })), MarketplaceCacheSchema = yH(() => k.record(k.string(), MarketplaceCacheEntrySchema()));
});

export {resolveAutoUpdate as Npe,isOfficialNameImpersonation as IXc,isValidAnthropicsGitHubUrl as PXc,validateOfficialNameSource as nhr,isRelativePluginPath as EEt,isFilesystemSource as g8,parseMarketplacePlugins as XXc,communityMarketplaceNames as SEt,officialAutoUpdateMarketplaces as Ebe,reservedOfficialNames as thr,explicitOptInOnly as xXc,officialNameKeywordPattern as kXc,officialNameNonAsciiPattern as HXc,ANTHROPICS_ORG as mnn,allowedGitProtocols as DXc,RelativePathSchema as h8,JsonRelativePathSchema as o1e,McpbPathSchema as dns,MarkdownPathSchema as ZAr,MarkdownOrRelativePathSchema as ehr,MarketplaceNameSchema as mns,AuthorSchema as rhr,PluginManifestSchema as OXc,PluginHooksManifestSchema as fnn,PluginAdditionalHooksSchema as LXc,PluginCommandSchema as MXc,PluginCommandsSchema as NXc,PluginAgentsSchema as BXc,PluginSkillsSchema as FXc,PluginOutputStylesSchema as fns,PluginThemesSchema as Ans,PluginWorkflowsSchema as UXc,NonEmptyStringSchema as pns,FileExtensionSchema as $Xc,PluginMcpServersSchema as qXc,UserConfigFieldSchema as hns,PluginUserConfigSchema as jXc,PluginChannelSchema as WXc,LspServerConfigSchema as oKe,MonitorDefinitionSchema as GXc,MonitorsArraySchema as ohr,PluginMonitorsSchema as gns,PluginLspServersSchema as VXc,NpmPackageNameSchema as _ns,PluginSettingsSchema as KXc,PluginExperimentalSchema as zXc,FullPluginRootSchema as Bpe,MarketplaceSourceSchema as bEt,GitCommitShaSchema as QAr,PluginSourceSchema as yns,MarketplacePluginEntrySchema as YXc,RelevanceSignalsSchema as Ann,PluginRelevanceSchema as hnn,MarketplacePluginEntrySchema_2 as gnn,MinimalNameSchema as JXc,MarketplaceManifestSchema as _7,PluginIdSchema as _nn,PLUGIN_ID_REGEX as QXc,PluginDependencySchema as ZXc,InstalledPluginRecordSchema as eQc,InstallRegistryV1Schema as CEt,InstallScopeSchema as tQc,ScopedInstallEntrySchema as nQc,InstallRegistryV2Schema as vEt,InstallRegistrySchema as QEf,MarketplaceCacheEntrySchema as rQc,MarketplaceCacheSchema as sKe,qZ as ik};
