// @ts-nocheck
import {E} from "../../vendor/m319.ts";
import {Hns,phr,wnn} from "../../vendor/m729.ts";
import {EXTERNAL_PERMISSION_MODES} from "../../vendor/m716.ts";
import {bns,Sns,Tns,Ens,shr} from "../../vendor/m726.ts";
import {st} from "../../vendor/m5.ts";
import {K3,dnn} from "../../vendor/m723.ts";
import {bEt,ik} from "../agent/0726_level.ts";
import {Pts,Ots} from "../../vendor/m713.ts";
import {aEt,EDITOR_MODES,NOTIFICATION_CHANNELS,Lts,lEt} from "../../vendor/m714.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {sn} from "../config/0047_namespace.ts";
import {eC} from "../../vendor/m717.ts";
import {we} from "../../vendor/m455.ts";
import {Wn} from "../api/0459_getOauthConfig.ts";
/** Build the Zod schema for the "permissions" block in settings. */
function Lns(settingsCtx: any): any {
  return E.object({
    allow: E.array(Hns()).optional().describe("List of permission rules for allowed operations"),
    deny: E.array(phr()).optional().describe("List of permission rules for denied operations"),
    ask: E.array(phr()).optional().describe("List of permission rules that should always prompt for confirmation"),
    defaultMode: E.enum([...EXTERNAL_PERMISSION_MODES, ...bns(settingsCtx)]).optional().describe("Default permission mode when Claude Code needs access"),
    disableBypassPermissionsMode: E.enum(["disable"]).optional().describe("Disable the ability to bypass permission prompts"),
    ...Sns(settingsCtx),
    additionalDirectories: E.array(E.string()).optional().describe("Additional directories to include in the permission scope")
  }).passthrough();
}

/** Build the full Zod schema for Claude Code settings (mhr = main-settings-schema). */
function mhr(settingsCtx: any): any {
  return E.object({
    $schema: E.string().optional().describe("JSON Schema reference for Claude Code settings"),
    apiKeyHelper: E.string().optional().describe("Path to a script that outputs authentication values"),
    proxyAuthHelper: E.string().optional().describe("Shell command that outputs a Proxy-Authorization header value (EAP)"),
    awsCredentialExport: E.string().optional().describe("Path to a script that exports AWS credentials"),
    awsAuthRefresh: E.string().optional().describe("Path to a script that refreshes AWS authentication"),
    gcpAuthRefresh: E.string().optional().describe("Command to refresh GCP authentication (e.g., gcloud auth application-default login)"),
    policyHelper: pQc().optional().describe("Executable that computes managed settings at startup. Honored only from admin-controlled policy sources."),
    ...(st(process.env.CLAUDE_CODE_ENABLE_XAA) && {
      xaaIdp: E.object({
        issuer: E.string().url().describe("IdP issuer URL for OIDC discovery"),
        clientId: E.string().describe("Claude Code's client_id registered at the IdP"),
        callbackPort: E.number().int().positive().optional().describe("Fixed loopback callback port for the IdP OIDC login. Only needed if the IdP does not honor RFC 8252 port-any matching.")
      }).optional().describe("XAA (SEP-990) IdP connection. Configure once; all XAA-enabled MCP servers reuse this.")
    }),
    fileSuggestion: E.object({
      type: E.literal("command"),
      command: E.string()
    }).optional().describe("Custom file suggestion configuration for @ mentions"),
    respectGitignore: E.boolean().optional().describe("Whether file picker should respect .gitignore files (default: true). Note: .ignore files are always respected."),
    breakReminder: E.object({
      enabled: E.boolean().optional().describe("Show a friendly nudge after sustained continuous use (default false). Must be true for the reminder to fire."),
      intervalMinutes: E.number().int().positive().optional().describe("Minutes of continuous use before the reminder fires (default 120). Re-fires every interval until you take a break."),
      breakThresholdMinutes: E.number().int().positive().optional().describe("Minutes of inactivity that count as a break and reset the timer (default 15)"),
      message: E.string().optional().describe("Custom reminder text. Leave unset for a rotating set of friendly nudges.")
    }).optional().describe("@internal Opt-in break reminder. When enabled, shows a dismissible nudge after sustained continuous use. Never blocks \u2014 just a friendly heads-up."),
    quietHours: E.object({
      enabled: E.boolean().optional().describe("Show a one-time nudge when you start or keep using the CLI inside your quiet-hours window (default false)."),
      start: E.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, 'Expected 24-hour local time "HH:MM" (e.g. "22:00")').optional().describe('Start of the quiet-hours window, 24-hour local time "HH:MM".'),
      end: E.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, 'Expected 24-hour local time "HH:MM" (e.g. "07:00")').optional().describe('End of the quiet-hours window, 24-hour local time "HH:MM". May be earlier than start for an overnight range.')
    }).optional().describe("@internal Opt-in quiet hours. When enabled, shows a single soft nudge per session while inside the configured local-time window. Never blocks."),
    cleanupPeriodDays: E.number().int().positive().optional().describe("Number of days to retain chat transcripts before automatic cleanup (default: 30). Minimum 1. Use a large value for long retention; use --no-session-persistence to disable transcript writes entirely."),
    skillListingMaxDescChars: E.number().int().positive().optional().describe("Per-skill description character cap in the skill listing sent to Claude (default: 1536). Descriptions longer than this are truncated. Raise to opt in to higher per-turn context cost."),
    skillListingBudgetFraction: E.number().gt(0).lte(1).optional().describe("Fraction of the context window (in characters) reserved for the skill listing sent to Claude (default: 0.01 = 1%). When the listing exceeds this, descriptions are shortened to fit. Raise to opt in to higher per-turn context cost."),
    wslInheritsWindowsSettings: E.boolean().optional().describe("When set to true in either admin-only Windows source \u2014 the HKLM SOFTWARE/Policies/ClaudeCode registry key or C:/Program Files/ClaudeCode/managed-settings.json \u2014 WSL reads managed settings from the full Windows policy chain (HKLM, C:/Program Files/ClaudeCode via DrvFs, HKCU) in addition to /etc/claude-code. Windows sources take priority. The flag is also required in HKCU itself for HKCU policy to apply on WSL (double opt-in: admin enables the chain, user confirms HKCU). On native Windows the flag has no effect."),
    env: uQc().optional().describe("Environment variables to set for Claude Code sessions"),
    attribution: E.object({
      commit: E.string().optional().describe("Attribution text for git commits, including any trailers. Empty string hides attribution."),
      pr: E.string().optional().describe("Attribution text for pull request descriptions. Empty string hides attribution."),
      sessionUrl: E.boolean().optional().describe("Whether to append the claude.ai session link to commits and PRs created from web or Remote Control sessions (default: true). Set to false to omit the Claude-Session trailer and PR-body link.")
    }).optional().describe("Customize attribution text for commits and PRs. Each field defaults to the standard Claude Code attribution if not set."),
    includeCoAuthoredBy: E.boolean().optional().describe("Deprecated: Use attribution instead. Whether to include Claude's co-authored by attribution in commits and PRs (defaults to true)"),
    ...!1,
    includeGitInstructions: E.boolean().optional().describe("Include built-in commit and PR workflow instructions in Claude's system prompt (default: true)"),
    permissions: Lns(settingsCtx).optional().describe("Tool usage permissions configuration"),
    model: E.string().optional().describe("Override the default model used by Claude Code"),
    fallbackModel: E.array(E.string()).optional().describe('Fallback model(s) tried in order when the primary model is overloaded or unavailable. Each element accepts a model name or alias; "default" expands to the default model. CLI --fallback-model takes precedence.'),
    availableModels: E.array(E.string()).optional().describe('Allowlist of models that users can select. Accepts family aliases ("opus" allows any opus version), version prefixes ("opus-4-5" allows only that version), and full model IDs. If undefined, all models are available. If empty array, only the default model is available. Typically set in managed settings by enterprise administrators.'),
    enforceAvailableModels: E.boolean().optional().describe("When true and availableModels is a non-empty array, the Default model selection is also constrained: if the default model for the user tier is not in availableModels, Default resolves to the first allowed availableModels entry instead. Has no effect when availableModels is unset or an empty array. Typically set in managed settings by enterprise administrators."),
    modelOverrides: E.record(E.string(), E.string()).optional().describe('Override mapping from Anthropic model ID (e.g. "claude-opus-4-6") to provider-specific model ID (e.g. a Bedrock inference profile ARN). Typically set in managed settings by enterprise administrators.'),
    enableAllProjectMcpServers: E.boolean().optional().describe("Whether to automatically approve all MCP servers in the project"),
    enabledMcpjsonServers: E.array(E.string()).optional().describe("List of approved MCP servers from .mcp.json"),
    disabledMcpjsonServers: E.array(E.string()).optional().describe("List of rejected MCP servers from .mcp.json"),
    disableClaudeAiConnectors: E.boolean().optional().describe("When true in any settings source, claude.ai MCP cloud connectors are not auto-fetched or connected. " + "Only gates auto-fetched connectors \u2014 a claudeai-proxy server passed explicitly " + "(e.g. via --mcp-config or the SDK mcpServers option) still follows the normal MCP config trust flow. Any-source-true wins: a project can opt out, but a project-level false cannot override a user-level true."),
    skillOverrides: E.record(E.string(), E.enum(["on", "name-only", "user-invocable-only", "off"])).optional().describe('Per-skill listing overrides keyed by skill name. "name-only" lists the skill without its description; "user-invocable-only" hides it from the model but keeps /name; "off" hides it from both. Absent = on.'),
    disableBundledSkills: E.boolean().optional().describe("Disable the skills and workflows that ship with Claude Code: bundled skills and workflows are removed entirely; built-in slash commands stay typable but are hidden from the model. Plugins, .claude/skills/, and .claude/commands/ are unaffected. Equivalent to CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1."),
    allowedMcpServers: E.array(Rnn()).optional().describe("Enterprise allowlist of MCP servers that can be used. Applies to all scopes including enterprise servers from managed-mcp.json. If undefined, all servers are allowed. If empty array, no servers are allowed. Denylist takes precedence - if a server is on both lists, it is denied."),
    deniedMcpServers: E.array(xnn()).optional().describe("Enterprise denylist of MCP servers that are explicitly blocked. If a server is on the denylist, it will be blocked across all scopes including enterprise. Denylist takes precedence over allowlist - if a server is on both lists, it is denied."),
    hooks: K3().optional().describe("Custom commands to run before/after tool executions"),
    worktree: E.object({
      symlinkDirectories: E.array(E.string()).optional().describe('Directories to symlink from main repository to worktrees to avoid disk bloat. Must be explicitly configured - no directories are symlinked by default. Common examples: "node_modules", ".cache", ".bin"'),
      sparsePaths: E.array(E.string()).optional().describe("Directories to include when creating worktrees, via git sparse-checkout (cone mode). " + "Dramatically faster in large monorepos \u2014 only the listed paths are written to disk."),
      baseRef: E.enum(["fresh", "head"]).optional().describe("Which ref new worktrees branch from. 'fresh' (default) branches from origin/<default-branch> for a clean tree. 'head' branches from your current local HEAD so unpushed commits and feature-branch state are present. Applies to --worktree, EnterWorktree, and agent isolation."),
      bgIsolation: E.enum(["worktree", "none"]).optional().catch(void 0).describe("Isolation mode for background sessions in this repo. 'worktree' (default) blocks Edit/Write in the main checkout until EnterWorktree is called. 'none' lets background jobs edit the working copy directly.")
    }).optional().describe("Git worktree configuration for --worktree flag."),
    disableAllHooks: E.boolean().optional().describe("Disable all hooks and statusLine execution"),
    disableAgentView: E.boolean().optional().describe("Disable agent view (`claude agents`, `--bg`, /background, the on-demand daemon). Typically set in managed settings. Equivalent to CLAUDE_CODE_DISABLE_AGENT_VIEW=1."),
    disableRemoteControl: E.boolean().optional().describe("Disable Remote Control (claude.ai/code, `claude remote-control`, `--remote-control`/`--rc`, auto-start, and the in-session toggle). Typically set in managed settings."),
    disableWorkflows: E.boolean().optional().describe("Disable the Workflows feature (also via CLAUDE_CODE_DISABLE_WORKFLOWS)."),
    disableArtifact: E.boolean().optional().describe("Disable the Artifact tool (also via CLAUDE_CODE_DISABLE_ARTIFACT)."),
    enableWorkflows: E.boolean().optional().describe("Enable or disable the Workflows feature for this user. Unset = default by plan once the feature is available."),
    workflowKeywordTriggerEnabled: E.boolean().optional().describe('Enable the "ultracode" keyword trigger: including the keyword in a prompt opts that turn into the Workflow tool. Set to false to disable the trigger. Default: true.'),
    disableSkillShellExecution: E.boolean().optional().describe("Disable inline shell execution in skills and custom slash commands from user, project, or plugin sources. Commands are replaced with a placeholder instead of being run."),
    defaultShell: E.enum(["bash", "powershell"]).optional().describe("Default shell for input-box ! commands. Defaults to 'bash' on all platforms (no Windows auto-flip)."),
    allowManagedHooksOnly: E.boolean().optional().describe("When true (and set in managed settings), only hooks from managed settings run. User, project, and local hooks are ignored."),
    allowedHttpHookUrls: E.array(E.string()).optional().describe('Allowlist of URL patterns that HTTP hooks may target. Supports * as a wildcard (e.g. "https://hooks.example.com/*"). When set, HTTP hooks with non-matching URLs are blocked. If undefined, all URLs are allowed. If empty array, no HTTP hooks are allowed. Arrays merge across settings sources (same semantics as allowedMcpServers).'),
    httpHookAllowedEnvVars: E.array(E.string()).optional().describe("Allowlist of environment variable names HTTP hooks may interpolate into headers. When set, each hook's effective allowedEnvVars is the intersection with this list. If undefined, no restriction is applied. Arrays merge across settings sources (same semantics as allowedMcpServers)."),
    allowManagedPermissionRulesOnly: E.boolean().optional().describe("When true (and set in managed settings), only permission rules (allow/deny/ask) from managed settings are respected. User, project, local, and CLI argument permission rules are ignored."),
    allowManagedMcpServersOnly: E.boolean().optional().describe("When true (and set in managed settings), allowedMcpServers is only read from managed settings. deniedMcpServers still merges from all sources, so users can deny servers for themselves. Users can still add their own MCP servers, but only the admin-defined allowlist applies."),
    allowAllClaudeAiMcps: E.boolean().optional().describe("When true (and set in managed settings), claude.ai cloud MCP connectors load alongside managed-mcp.json instead of being suppressed by its exclusive-control lockdown. Default off preserves the lockdown. Read from managed settings only."),
    strictPluginOnlyCustomization: E.preprocess(t => Array.isArray(t) ? t.filter(n => wbe.includes(n)) : t, E.union([E.boolean(), E.array(E.enum(wbe))])).optional().catch(void 0).describe('When set in managed settings, blocks non-plugin customization sources for the listed surfaces. Array form locks specific surfaces (e.g. ["skills", "hooks"]); `true` locks all four; `false` is an explicit no-op. Blocked: ~/.claude/{surface}/, .claude/{surface}/ (project), settings.json hooks, .mcp.json. NOT blocked: managed (policySettings) sources, plugin-provided customizations. ' + "Composes with strictKnownMarketplaces for end-to-end admin control \u2014 plugins gated by " + "marketplace allowlist, everything else blocked here."),
    statusLine: E.object({
      type: E.literal("command"),
      command: E.string(),
      padding: E.number().optional(),
      refreshInterval: E.number().min(1).optional().catch(void 0).describe("Re-run the status line command every N seconds in addition to event-driven updates"),
      hideVimModeIndicator: E.boolean().optional().describe("Hide the built-in `-- INSERT --` / `-- VISUAL --` indicator below the prompt. Use this when your status line script renders `vim.mode` itself.")
    }).optional().describe("Custom status line display configuration"),
    prUrlTemplate: E.string().optional().describe('URL template for PR links in the footer link badges and inline messages. The detected git PR is rendered as the first footer-link badge. Placeholders: {host} {owner} {repo} {number} {url}. Example: "https://reviews.example.com/{owner}/{repo}/pull/{number}"'),
    footerLinksRegexes: E.array(mQc().catch(Dns)).transform(t => t.filter(n => n !== Dns)).optional().catch(void 0).describe("Extra clickable footer badges that appear when a regex matches turn output (tool results and assistant responses). Read from user, flag, and managed settings only; ignored in project .claude/settings.json and local .claude/settings.local.json. At most 5 badges render; the oldest is displaced by newer matches and /clear removes them. Use to surface IDs printed by project CLIs as session links."),
    subagentStatusLine: E.object({
      type: E.literal("command"),
      command: E.string()
    }).optional().describe("Custom per-subagent status line shown in the agent panel; receives row context as JSON on stdin"),
    enabledPlugins: E.record(E.string(), E.union([E.array(E.string()), E.boolean(), E.undefined()])).optional().describe('Enabled plugins using plugin-id@marketplace-id format. Example: { "formatter@anthropic-tools": true }. Also supports extended format with version constraints. Settings precedence is user < project < local < flag < policy, so to disable a plugin that project settings enable, set it to false in .claude/settings.local.json \u2014 setting false in ~/.claude/settings.json is overridden by the project.'),
    extraKnownMarketplaces: E.record(E.string(), dQc()).check(t => {
      for (let [n, r] of Object.entries(t.value)) if (r.source.source === "settings" && r.source.name !== n) t.issues.push({
        code: "custom",
        input: r.source.name,
        path: [n, "source", "name"],
        message: `Settings-sourced marketplace name must match its extraKnownMarketplaces key (got key "${n}" but source.name "${r.source.name}")`
      });
    }).optional().describe("Additional marketplaces to make available for this repository. Typically used in repository .claude/settings.json to ensure team members have required plugin sources."),
    strictKnownMarketplaces: E.array(bEt()).optional().describe("Enterprise strict list of allowed marketplace sources. When set in managed settings, ONLY these exact sources can be added as marketplaces. The check happens BEFORE downloading, so blocked sources never touch the filesystem. " + "Note: this is a policy gate only \u2014 it does NOT register marketplaces. " + "To pre-register allowed marketplaces for users, also set extraKnownMarketplaces."),
    blockedMarketplaces: E.array(bEt()).optional().describe("Enterprise blocklist of marketplace sources. When set in managed settings, these exact sources are blocked from being added as marketplaces. The check happens BEFORE downloading, so blocked sources never touch the filesystem."),
    pluginSuggestionMarketplaces: E.array(E.string()).optional().describe("Marketplace names whose plugins may surface as contextual install suggestions (relevance-based tips). No marketplace-declared suggestions surface without this allowlist; the built-in first-party frontend-design tip is unaffected. Only honored when set in managed settings (policy scope); the key is ignored in user, project, and local settings. A name only takes effect when the marketplace is registered on the machine AND its registered source is also declared in managed settings, either as the extraKnownMarketplaces entry for that name or as an entry of strictKnownMarketplaces. A marketplace registered from a different source under an allowlisted name is ignored. The official marketplace is exempt from the source requirement: allowlisting its name alone suffices, since that name can only register from the official Anthropic source."),
    forceLoginMethod: E.enum(["claudeai", "console", "gateway"]).optional().catch(void 0).describe('Force a specific login method: "claudeai" for Claude Pro/Max, "console" for Console billing, "gateway" for the Cloud gateway OIDC device flow'),
    forceLoginGatewayUrl: E.string().url().optional().catch(void 0).describe('@internal Cloud gateway URL to pre-fill and auto-connect to during login. Typically set in local managed settings alongside forceLoginMethod: "gateway" so users never type the URL. Hidden from public SDK types until Cloud gateway is documented.'),
    parentSettingsBehavior: E.enum(["first-wins", "merge"]).optional().describe('Controls whether the SDK parent tier (Options.managedSettings / --managed-settings) layers under this admin tier. "first-wins" ' + "(default): parent is dropped \u2014 admin tiers are the only policy " + `source. "merge": parent's restrictive-only-filtered settings union under the admin winner. Has no effect when no admin tier exists (parent applies as the sole policy tier, still filtered restrictive-only).`),
    forceLoginOrgUUID: E.union([E.string(), E.array(E.string())]).optional().describe("Organization UUID to require for OAuth login. Accepts a single UUID string or an array of UUIDs (any one is permitted). When set in managed settings, login fails if the authenticated account does not belong to a listed organization."),
    forceRemoteSettingsRefresh: E.boolean().optional().describe("When set in managed settings, the CLI blocks startup until remote managed settings are freshly fetched, and exits if the fetch fails"),
    otelHeadersHelper: E.string().optional().describe("Path to a script that outputs OpenTelemetry headers"),
    outputStyle: E.string().optional().describe("Controls the output style for assistant responses"),
    viewMode: E.enum(["default", "verbose", "focus"]).optional().catch(void 0).describe("Default transcript view mode on startup"),
    language: E.string().optional().describe('Preferred language for Claude responses and voice dictation (e.g., "japanese", "spanish")'),
    skipWebFetchPreflight: E.boolean().optional().describe("Skip the WebFetch blocklist check for enterprise environments with restrictive security policies"),
    sandbox: Pts().optional(),
    feedbackSurveyRate: E.number().min(0).max(1).optional().describe("Probability (0\u20131) that the session quality survey appears when eligible. 0.05 is a reasonable starting point."),
    spinnerTipsEnabled: E.boolean().optional().describe("Whether to show tips in the spinner"),
    spinnerVerbs: E.object({
      mode: E.enum(["append", "replace"]),
      verbs: E.array(E.string())
    }).optional().describe('Customize spinner verbs. mode: "append" adds verbs to defaults, "replace" uses only your verbs.'),
    spinnerTipsOverride: E.object({
      excludeDefault: E.boolean().optional(),
      tips: E.array(E.string())
    }).optional().describe("Override spinner tips. tips: array of tip strings. excludeDefault: if true, only show custom tips (default: false)."),
    syntaxHighlightingDisabled: E.boolean().optional().describe("Whether to disable syntax highlighting in diffs"),
    terminalTitleFromRename: E.boolean().optional().describe("Whether /rename updates the terminal tab title (defaults to true). Set to false to keep auto-generated topic titles."),
    alwaysThinkingEnabled: E.boolean().optional().describe("When false, thinking is disabled. When absent or true, thinking is enabled automatically for supported models."),
    effortLevel: E.enum(["low", "medium", "high", "xhigh"]).optional().catch(void 0).describe("Persisted effort level for supported models."),
    ultracode: E.boolean().optional().catch(void 0).describe("Enable ultracode for the session: xhigh effort plus standing dynamic-workflow orchestration. " + "Session-scoped \u2014 typically provided via --settings or the apply_flag_settings control request; " + "interactive toggles never persist it. Requires workflows to be enabled and an xhigh-capable model."),
    autoCompactWindow: E.number().int().min(1e5).max(1e6).optional().catch(void 0).describe("Auto-compact window size"),
    advisorModel: E.string().optional().describe("Advisor model for the server-side advisor tool."),
    fastMode: E.boolean().optional().describe("When true, fast mode is enabled. When absent or false, fast mode is off."),
    fastModePerSessionOptIn: E.boolean().optional().describe("When true, fast mode does not persist across sessions. Each session starts with fast mode off."),
    promptSuggestionEnabled: E.boolean().optional().describe("When false, prompt suggestions are disabled. When absent or true, prompt suggestions are enabled."),
    awaySummaryEnabled: E.boolean().optional().describe("@internal When false, the session recap (shown when you return after being away for 5+ minutes) is disabled. When absent or true, recap is enabled. Hidden from public SDK types until external launch."),
    showClearContextOnPlanAccept: E.boolean().optional().describe('When true, the plan-approval dialog offers a "clear context" option. Defaults to false.'),
    agent: E.string().optional().describe("Name of an agent (built-in or custom) to use for the main thread. Applies the agent's system prompt, tool restrictions, and model."),
    companyAnnouncements: E.array(E.string()).optional().describe("Company announcements to display at startup (one will be randomly selected if multiple are provided)"),
    pluginConfigs: E.record(E.string(), E.object({
      mcpServers: E.record(E.string(), E.record(E.string(), E.union([E.string(), E.number(), E.boolean(), E.array(E.string())]))).optional().describe("User configuration values for MCP servers keyed by server name"),
      options: E.record(E.string(), E.union([E.string(), E.number(), E.boolean(), E.array(E.string())])).optional().describe("Non-sensitive option values from plugin manifest userConfig, keyed by option name. Sensitive values go to secure storage instead.")
    })).optional().describe("Per-plugin configuration including MCP server user configs, keyed by plugin ID (plugin@marketplace format)"),
    remote: E.object({
      defaultEnvironmentId: E.string().optional().describe("Default environment ID to use for cloud sessions")
    }).optional().describe("Cloud session configuration"),
    autoUpdatesChannel: E.enum(["latest", "stable", "rc"]).optional().describe("Release channel for auto-updates (latest or stable)"),
    minimumVersion: E.string().optional().describe("Minimum version to stay on - prevents downgrades when switching to stable channel"),
    requiredMinimumVersion: E.string().optional().describe("Minimum Claude Code version required to start. If the running version is older, Claude Code exits at startup with instructions to update. Only enforced from managed (policy) settings."),
    requiredMaximumVersion: E.string().optional().describe("Maximum Claude Code version allowed to start. If the running version is newer, Claude Code exits at startup with instructions to install an approved version. Only enforced from managed (policy) settings."),
    plansDirectory: E.string().optional().describe("Custom directory for plan files, relative to project root. If not set, defaults to ~/.claude/plans/"),
    tui: E.enum(["default", "fullscreen"]).optional().describe('Terminal UI renderer. "fullscreen" uses the flicker-free alt-screen renderer with virtualized scrollback (equivalent to CLAUDE_CODE_NO_FLICKER=1). "default" uses the classic main-screen renderer.'),
    ...!1,
    voice: E.object({
      enabled: E.boolean().optional(),
      mode: E.enum(["hold", "tap"]).optional().describe("'hold' (default): hold to talk. 'tap': tap to start, tap to stop+submit."),
      autoSubmit: E.boolean().optional().describe("Submit the prompt when hold-to-talk is released (hold mode only)")
    }).optional().describe("Voice mode settings (hold-to-talk / tap-to-toggle dictation)"),
    channelsEnabled: E.boolean().optional().describe("Managed-org opt-in for channel notifications (MCP servers with the claude/channel capability pushing inbound messages). claude.ai Teams/Enterprise: default off. Console: default on unless managed settings exist. Set true to allow; users then select servers via --channels."),
    allowedChannelPlugins: E.array(E.object({
      marketplace: E.string(),
      plugin: E.string()
    })).optional().describe("Managed-org allowlist of channel plugins. When set, " + "replaces the default Anthropic allowlist \u2014 admins decide which " + "plugins may push inbound messages. Undefined falls back to the default. Requires channelsEnabled: true."),
    prefersReducedMotion: E.boolean().optional().describe("Reduce or disable animations for accessibility (spinner shimmer, flash effects, etc.)"),
    doneMeansMerged: E.boolean().optional().describe("@internal When true, Claude keeps working until the PR is ready for you to merge, a cron/Monitor is armed to resume later, or it hands you a self-contained next step."),
    totalTokensReminder: E.enum(["off", "infinite", "fixed", "countdown"]).optional().describe("@internal Emit a <total_tokens>N tokens left</total_tokens> block in the system prompt and after each tool result. 'infinite' uses the literal value Infinite, 'fixed' uses 5000000, 'countdown' uses the live remaining context-window tokens. Defaults to off. Env var CLAUDE_CODE_TOTAL_TOKENS_REMINDER overrides."),
    autoMemoryEnabled: E.boolean().optional().describe("Enable auto-memory for this project. When false, Claude will not read from or write to the auto-memory directory."),
    autoMemoryDirectory: E.string().optional().describe("Custom directory path for auto-memory storage. Supports ~/ prefix for home directory expansion. Ignored if set in projectSettings (checked-in .claude/settings.json) for security. When unset, defaults to ~/.claude/projects/<sanitized-cwd>/memory/."),
    autoDreamEnabled: E.boolean().optional().describe("Enable background memory consolidation (auto-dream). When set, overrides the server-side default."),
    showThinkingSummaries: E.boolean().optional().describe("Request API-side thinking summaries and show them in the conversation and in the transcript view (ctrl+o). Set explicitly to override the default for your install."),
    skipDangerousModePermissionPrompt: E.boolean().optional().describe("Whether the user has accepted the bypass permissions mode dialog"),
    skipWorkflowUsageWarning: E.boolean().optional().describe("@internal Whether the user has accepted the multi-agent workflow usage warning. Until set, auto permission mode prompts before running a workflow."),
    disableAutoMode: E.enum(["disable"]).optional().describe("Disable auto mode"),
    sshConfigs: E.array(E.object({
      id: E.string().describe("Unique identifier for this SSH config. Used to match configs across settings sources."),
      name: E.string().describe("Display name for the SSH connection"),
      sshHost: E.string().describe('SSH host in format "user@hostname" or "hostname", or a host alias from ~/.ssh/config'),
      sshPort: E.number().int().optional().describe("SSH port (default: 22)"),
      sshIdentityFile: E.string().optional().describe("Path to SSH identity file (private key)"),
      startDirectory: E.string().optional().describe("Default working directory on the remote host. Supports tilde expansion (e.g. ~/projects). If not specified, defaults to the remote user home directory. Can be overridden by the [dir] positional argument in `claude ssh <config> [dir]`.")
    })).optional().describe("SSH connection configurations for remote environments. Typically set in managed settings by enterprise administrators to pre-configure SSH connections for team members."),
    claudeMd: E.string().optional().describe("CLAUDE.md-style instructions injected as organization-managed memory. Only honored from managed/policy settings."),
    claudeMdExcludes: E.array(E.string()).optional().describe('Glob patterns or absolute paths of CLAUDE.md files to exclude from loading. Patterns are matched against absolute file paths using picomatch. Only applies to User, Project, and Local memory types (Managed/policy files cannot be excluded). Examples: "/home/user/monorepo/CLAUDE.md", "**/code/CLAUDE.md", "**/some-dir/.claude/rules/**"'),
    pluginTrustMessage: E.string().optional().describe('Custom message to append to the plugin trust warning shown before installation. Only read from policy settings (managed-settings.json / MDM). Useful for enterprise administrators to add organization-specific context (e.g., "All plugins from our internal marketplace are vetted and approved.").'),
    theme: E.union([E.enum(aEt), E.string().startsWith("custom:").transform(t => t)]).optional().catch(void 0).describe("Color theme for the UI"),
    editorMode: E.enum(EDITOR_MODES).optional().catch(void 0).describe("Key binding mode for the prompt input"),
    verbose: E.boolean().optional().describe("Show full tool output instead of truncated summaries"),
    preferredNotifChannel: E.enum(NOTIFICATION_CHANNELS).optional().catch(void 0).describe("Preferred OS notification channel"),
    autoCompactEnabled: E.boolean().optional().describe("Automatically compact conversation when context fills"),
    precomputeCompactionEnabled: E.boolean().optional().describe("@internal Precompute the compaction summary in the background before it is needed. Only applies when auto-compact is on."),
    switchModelsOnFlag: E.boolean().optional().describe("When safety measures flag a message, automatically switch to a different model to keep chatting. When off, your session will pause instead."),
    autoScrollEnabled: E.boolean().optional().describe("Auto-scroll the conversation view to bottom (fullscreen mode only)"),
    wheelScrollAccelerationEnabled: E.boolean().optional().describe("Ramp mouse-wheel scroll speed during fast scrolls (fullscreen mode only)"),
    fileCheckpointingEnabled: E.boolean().optional().describe("Snapshot files before edits so /rewind can restore them"),
    showTurnDuration: E.boolean().optional().describe('Show "Cooked for Nm Ns" after each assistant turn'),
    showMessageTimestamps: E.boolean().optional().describe("Stamp each assistant message with its arrival time"),
    terminalProgressBarEnabled: E.boolean().optional().describe("Emit OSC 9;4 progress sequences during long operations"),
    todoFeatureEnabled: E.boolean().optional().describe("Enable the todo / task tracking panel"),
    teammateMode: E.enum(Lts).optional().catch(void 0).describe("How spawned teammates execute (tmux, in-process, auto)"),
    remoteControlAtStartup: E.boolean().optional().describe("Start Remote Control bridge automatically each session"),
    isolatePeerMachines: E.boolean().optional().describe("Require explicit approval before SendMessage can reach a peer session on another machine via Remote Control"),
    daemonColdStart: E.enum(["transient", "ask"]).optional().describe("When no background service is running: 'transient' spawns one for this login session; 'ask' offers to install it persistently"),
    autoUploadSessions: E.boolean().optional().describe("Mirror local sessions to claude.ai as view-only (no remote control)"),
    inputNeededNotifEnabled: E.boolean().optional().describe("Push to mobile when a permission prompt or question is waiting"),
    agentPushNotifEnabled: E.boolean().optional().describe("Allow Claude to push proactive mobile notifications"),
    ...Tns(settingsCtx)
  }).passthrough();
}

/** Wrap an array schema item with .catch() that ignores invalid entries and reports errors. */
function Ons(fieldName: any, itemSchema: any, onError: any): any {
  return E.array(itemSchema.catch((r: any) => (onError({
    path: `${fieldName}[]`,
    message: `Invalid entry was ignored: ${r.issues[0]?.message ?? "failed validation"}`
  }), Pns))).transform((r: any) => r.filter((o: any) => o !== Pns)).optional();
}

/** Build the lenient (error-catching) version of the settings schema for managed/policy parsing. */
function fhr(onError: any): any {
  let baseSchema = RB(),
    fieldSchemas: any = {};
  for (let [o, s] of Object.entries(baseSchema.shape)) fieldSchemas[o] = s.catch((i: any) => {
    onError({
      path: o,
      message: `${i.issues[0]?.message ?? "Failed schema validation"}. This field was ignored.`
    });
    return;
  });
  return fieldSchemas.allowedMcpServers = Ons("allowedMcpServers", Rnn(), onError).catch(() => (onError({
    path: "allowedMcpServers",
    message: '"allowedMcpServers" was present but invalid; enforcing an empty allowlist (no MCP servers admitted) until it is fixed.'
  }), [])), fieldSchemas.deniedMcpServers = Ons("deniedMcpServers", xnn(), onError).catch(() => {
    onError({
      path: "deniedMcpServers",
      message: '"deniedMcpServers" was present but invalid and was dropped; its entries cannot be enforced until it is fixed.'
    });
    return;
  }), fieldSchemas.allowManagedMcpServersOnly = baseSchema.shape.allowManagedMcpServersOnly.catch(() => (onError({
    path: "allowManagedMcpServersOnly",
    message: '"allowManagedMcpServersOnly" was present but invalid; treating it as true until it is fixed.'
  }), !0)), fieldSchemas.enforceAvailableModels = baseSchema.shape.enforceAvailableModels.catch(() => (onError({
    path: "enforceAvailableModels",
    message: '"enforceAvailableModels" was present but invalid; treating it as true until it is fixed.'
  }), !0)), fieldSchemas.availableModels = E.array(E.unknown()).transform((o: any, s: any) => {
    let i: any = [];
    for (let a of o) if (typeof a === "string") i.push(a);else onError({
      path: "availableModels",
      message: `"availableModels" contained a non-string entry (${JSON.stringify(a)}); the entry was ignored.`
    });
    return i;
  }).optional().catch(() => (onError({
    path: "availableModels",
    message: '"availableModels" was present but invalid; enforcing an empty allowlist (only the default model is available) until it is fixed.'
  }), [])), fieldSchemas.forceLoginOrgUUID = baseSchema.shape.forceLoginOrgUUID.catch(() => (onError({
    path: "forceLoginOrgUUID",
    message: '"forceLoginOrgUUID" was present but invalid; no organization is permitted to log in until it is fixed.'
  }), [])), E.object(fieldSchemas).passthrough().transform((o: any) => {
    for (let s of Object.keys(o)) if (o[s] === void 0) delete o[s];
    return o;
  });
}

/** Type-guard: checks if an MCP server allowlist entry specifies a serverName. */
function aKe(e: any): any {
  return "serverName" in e && e.serverName !== void 0;
}

/** Type-guard: checks if an MCP server allowlist entry specifies a serverCommand. */
function knn(e: any): any {
  return "serverCommand" in e && e.serverCommand !== void 0;
}

/** Type-guard: checks if an MCP server allowlist entry specifies a serverUrl. */
function Hnn(e: any): any {
  return "serverUrl" in e && e.serverUrl !== void 0;
}
var uQc, wCf, dQc, Rnn, xnn, pQc, wbe, Dns, mQc, RB, Pns;
var J3 = b(() => {
  Xr();
  Ots();
  lEt();
  sn();
  eC();
  ik();
  Ens();
  wnn();
  dnn();
  dnn();
  uQc = we(() => E.record(E.string(), E.coerce.string()));
  wCf = we(() => Lns(shr())), dQc = we(() => E.object({
    source: bEt().describe("Where to fetch the marketplace from"),
    installLocation: E.string().optional().describe("Local cache path where marketplace manifest is stored (auto-generated if not provided)"),
    autoUpdate: E.boolean().optional().describe("Whether to automatically update this marketplace and its installed plugins on startup")
  })), Rnn = we(() => E.object({
    serverName: E.string().regex(/^[a-zA-Z0-9_-]+$/, "Server name can only contain letters, numbers, hyphens, and underscores").optional().describe("Name of the MCP server that users are allowed to configure"),
    serverCommand: E.array(E.string()).min(1, "Server command must have at least one element (the command)").optional().describe("Command array [command, ...args] to match exactly for allowed stdio servers"),
    serverUrl: E.string().optional().describe('URL pattern with wildcard support (e.g., "https://*.example.com/*") for allowed remote MCP servers')
  }).refine(e => Wn([e.serverName !== void 0, e.serverCommand !== void 0, e.serverUrl !== void 0], Boolean) === 1, {
    message: 'Entry must have exactly one of "serverName", "serverCommand", or "serverUrl"'
  })), xnn = we(() => E.object({
    serverName: E.string().min(1, "Server name must be non-empty").refine(e => e.trim().length > 0, {
      message: "Server name must not be whitespace-only"
    }).refine(e => e === e.trim(), {
      message: "Server name has leading or trailing whitespace and will never match (names are compared verbatim)"
    }).optional().describe("Name of the MCP server that is explicitly blocked"),
    serverCommand: E.array(E.string()).min(1, "Server command must have at least one element (the command)").optional().describe("Command array [command, ...args] to match exactly for blocked stdio servers"),
    serverUrl: E.string().optional().describe('URL pattern with wildcard support (e.g., "https://*.example.com/*") for blocked remote MCP servers')
  }).refine(e => Wn([e.serverName !== void 0, e.serverCommand !== void 0, e.serverUrl !== void 0], Boolean) === 1, {
    message: 'Entry must have exactly one of "serverName", "serverCommand", or "serverUrl"'
  })), pQc = we(() => E.object({
    path: E.string().describe("Absolute path to the helper executable"),
    timeoutMs: E.number().int().min(1000).optional(),
    refreshIntervalMs: E.union([E.literal(0), E.number().int().min(60000)]).optional()
  })), wbe = ["skills", "agents", "hooks", "mcp"], Dns = Object.freeze({
    type: "invalid-entry-stripped"
  }), mQc = we(() => E.union([E.object({
    type: E.literal("regex").describe('Config variant. This client understands "regex": matches turn output and builds a URL from named capture groups. Entries with other variants are preserved but skipped at runtime.'),
    pattern: E.string().describe("Regex matched against turn output (tool results and assistant text)"),
    url: E.string().describe("Link target. {name} placeholders are filled from named regex capture groups, e.g. (?<id>...) -> {id}. Values are URL-encoded; the origin must be literal in the template. The scheme must be https, http, or a recognized editor or workspace deep-link scheme: vscode, vscode-insiders, cursor, windsurf, zed, jetbrains, idea, slack, linear, notion, figma."),
    label: E.string().optional().describe("Badge text. {name} placeholders filled from named capture groups; defaults to the full match.")
  }).passthrough(), E.object({
    type: E.string().describe("Config variant discriminator for entries this client does not understand; the entry is preserved as-is and skipped at runtime.")
  }).passthrough()]));
  RB = we(() => mhr(shr())), Pns = Object.freeze({
    serverName: "invalid-entry-stripped"
  });
});
export {Lns,mhr,Ons,fhr,aKe,knn,Hnn,uQc,wCf,dQc,Rnn,xnn,pQc,wbe,Dns,mQc,RB,Pns,J3};
