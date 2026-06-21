// @ts-nocheck
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {U2,PERMISSION_DECISION_REASON_TYPES} from "../../vendor/m716.ts";
import {Sso,LDa,UDa,o2t,pso,mso,FDa,NY,s2t,r2t,dso,SFn,BDa,EFn,VDa,Tso,gso,_so,yso,hso,jDa} from "../permissions/3885_inputTokens.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
var dyp, pyp, rPa, myp, B2g, oPa, sPa, iPa, aPa, lPa, cPa, uPa, dPa, F2g, pPa, U2g, mPa, fPa, $2g, APa, b2t, DFn, nPa, q2g, hPa, j2g, fyp, Ayp, W2g, gPa, G2g, _Pa, V2g, yPa, K2g, TPa, z2g, SPa, bPa, EPa, CPa, Y2g, vPa, J2g, wPa, X2g, RPa, xPa, kPa, HPa, IPa, DPa, PPa, OPa, Q2g, LPa, MPa, NPa, BPa, FPa, Z2g, UPa, $Pa, qPa, jPa, WPa, e$g, t$g, n$g, hyp, PFn, GPa, VPa, gyp, _yp, KPa, yyp, zPa, Typ, r$g, YPa, o$g;
var JPa = b(() => {
  Xr();
  U2();
  Sso();
  dyp = we(() => E.unknown()), pyp = we(() => E.object({
    matcher: E.string().optional(),
    hookCallbackIds: E.array(E.string()),
    timeout: E.number().optional()
  }).describe("Configuration for matching and routing hook callbacks.")), rPa = we(() => E.object({
    subtype: E.literal("initialize"),
    hooks: E.record(LDa(), E.array(pyp())).optional(),
    sdkMcpServers: E.array(E.string()).optional(),
    jsonSchema: E.record(E.string(), E.unknown()).optional(),
    systemPrompt: E.array(E.string()).optional(),
    appendSystemPrompt: E.string().optional(),
    planModeInstructions: E.string().optional().describe("Custom workflow body for the plan-mode system reminder. Replaces the default code-implementation phases; the CLI still wraps it with the read-only enforcement preamble and the ExitPlanMode protocol footer."),
    appendSubagentSystemPrompt: E.string().optional().describe("@internal Additional system prompt appended to every Task-tool subagent (and propagated to nested subagents). Gated by CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT."),
    toolAliases: E.record(E.string(), E.string()).optional().describe("Map of tool-name aliases applied before name resolution. When the model emits a tool_use whose name is a key in this map, the tool execution path resolves the mapped name instead. Single-hop (no chains). See Options.toolAliases."),
    excludeDynamicSections: E.boolean().optional().describe("When true, omit per-user dynamic sections (working directory, auto-memory path) from the cached system prompt and re-inject them as the first user message. Lets cross-user prompt caching hit on a static system prompt prefix. Tradeoff: the model sees this context slightly later in the prompt, so steering on the working directory and memory location is marginally less authoritative. Has no effect when a custom (non-preset) system prompt is in use."),
    agents: E.record(E.string(), UDa()).optional(),
    title: E.string().optional().describe("Custom session title. When provided, the session uses this title and skips automatic title generation. Has no effect on the persisted title when resuming an existing session."),
    skills: E.array(E.string()).optional().describe('When provided, only skills whose names match an entry are loaded into the main session system prompt, using the same rules as AgentDefinition.skills: exact name, plugin-qualified name, or ":name" suffix. Omit to load every discovered skill. Applies to the main session only; subagents use AgentDefinition.skills.'),
    webSearchIsolationExemptMcpServers: E.array(E.string()).optional().describe("@internal Additional MCP server names exempt from the web search / connector isolation latch. Unioned with the built-in infra-server list."),
    promptSuggestions: E.boolean().optional(),
    agentProgressSummaries: E.boolean().optional(),
    forwardSubagentText: E.boolean().optional(),
    supportedDialogKinds: E.array(E.string()).optional().describe("Dialog kinds (request_user_dialog `dialog_kind` values) this consumer's onUserDialog can actually render. The CLI treats ABSENCE as 'cannot display' and fails closed: without the kind declared here, a dialog-gated flow degrades to its no-dialog behavior (for 'refusal_fallback_prompt', the classic refusal error) instead of parking a dialog the consumer may mishandle. First-attached-client-wins on multi-client sessions; later initializes do not change it.")
  }).describe("Initializes the SDK session with hooks, MCP servers, and agent configuration.")), myp = we(() => E.object({
    minTimeBeforeFeedbackMs: E.number(),
    minTimeBetweenFeedbackMs: E.number(),
    minTimeBetweenGlobalFeedbackMs: E.number(),
    minUserTurnsBeforeFeedback: E.number(),
    minUserTurnsBetweenFeedback: E.number(),
    hideThanksAfterMs: E.number(),
    onForModels: E.array(E.string()),
    probability: E.number(),
    lastSurveyShownTime: E.number().nullable()
  }).describe("@internal Session feedback-survey configuration for host UIs (VS Code webview, Claude Desktop) that run the survey trigger logic themselves: the same GrowthBook-driven pacing/probability values the terminal survey uses, plus the cross-surface last-shown time the host can't read. Survey responses are proxied back as tengu_feedback_survey_event log_event notifications.")), B2g = we(() => E.object({
    commands: E.array(o2t()),
    agents: E.array(pso()),
    output_style: E.string(),
    available_output_styles: E.array(E.string()),
    models: E.array(mso()),
    unavailable_models: E.array(mso()).optional().describe("@internal Models the account can see but not select (disabled: true, reason folded into description \u2014 e.g. a model the org's Zero Data Retention setting excludes). Disjoint from `models`, which stays selectable-only so consumers without disabled rendering are unaffected. Populated only for allowlisted 1P hosts that render these rows (currently the VS Code extension \u2014 UNAVAILABLE_MODELS_HOST_ENTRYPOINTS); empty for every other consumer. Omitted when empty."),
    account: FDa(),
    current_model: E.string().optional().describe("@internal The CLI's active model at connect time. Remote Control clients (web/mobile) sync their model dropdown TO this value on connect instead of sending set_model with their own default \u2014 without it, connecting from a phone silently switches the terminal's model (CC-2659)."),
    current_permission_mode: NY().optional().describe("@internal The CLI's active permission mode at connect time, for the same connect-time sync as current_model."),
    pid: E.number().optional().describe("@internal CLI process PID for tmux socket isolation"),
    fast_mode_state: s2t().optional(),
    feedback_survey_config: myp().optional().describe("@internal Present only when the feedback-survey surface is enabled for this host (GrowthBook gate, privacy level, and org policy all allow it). Absent means the host must not show the survey.")
  }).describe("Response from session initialization with available commands, models, and account info.")), oPa = we(() => E.object({
    subtype: E.literal("interrupt"),
    reason: E.string().optional().describe("@internal Why the turn was interrupted, forwarded to the turn's AbortSignal.reason. Tool implementations branch on it to distinguish a user-driven cancel (which suppresses error output) from other aborts. Known values: `interrupt` (user Esc/Ctrl+C), `user-cancel`, `remote-cancel`, `consumer-error`, `workflow-abort`, `stalled`, `recovery-timeout`. Open set \u2014 consumers must treat unknown values as a generic abort.")
  }).describe("Interrupts the currently running conversation turn.")), sPa = we(() => E.object({
    subtype: E.literal("can_use_tool"),
    tool_name: E.string(),
    input: E.record(E.string(), E.unknown()),
    permission_suggestions: E.array(r2t()).optional(),
    blocked_path: E.string().optional(),
    decision_reason: E.string().optional(),
    decision_reason_type: E.enum(PERMISSION_DECISION_REASON_TYPES).optional().describe('Structured discriminator for why auto-mode escalated. Lets SDK hosts make policy (e.g. auto-deny safetyCheck) without parsing decision_reason text. For compound bash commands this is "subcommandResults" even when a safetyCheck is nested inside \u2014 check classifier_approvable for that case.'),
    classifier_approvable: E.boolean().optional().describe("Set when a safetyCheck is present anywhere in the decision reason (including nested inside subcommandResults for compound bash). false = at least one safety check requires manual approval (e.g. Windows path bypass, dangerous rm); true = all safety checks MAY be classifier-approved (e.g. sensitive-file paths). Absent when no safetyCheck is involved."),
    title: E.string().optional(),
    display_name: E.string().optional(),
    tool_use_id: E.string(),
    agent_id: E.string().optional(),
    description: E.string().optional()
  }).describe("Requests permission to use a tool with the given input.")), iPa = we(() => E.object({
    subtype: E.literal("set_permission_mode"),
    mode: NY(),
    ultraplan: E.boolean().optional().describe("@internal CCR ultraplan session marker.")
  }).describe("Sets the permission mode for tool execution handling.")), aPa = we(() => E.object({
    subtype: E.literal("set_model"),
    model: E.string().optional()
  }).describe("Sets the model to use for subsequent conversation turns.")), lPa = we(() => E.object({
    subtype: E.literal("set_max_thinking_tokens"),
    max_thinking_tokens: E.number().nullable(),
    thinking_display: E.enum(["summarized", "omitted"]).nullable().optional()
  }).describe("Sets the maximum number of thinking tokens for extended thinking. thinking_display optionally sets the thinking display mode for the rest of the session: a value replaces the session display mode, null clears it back to the API default, and when omitted the display mode from session start (--thinking-display) is kept.")), cPa = we(() => E.object({
    subtype: E.literal("rename_session"),
    title: E.string()
  }).describe("Sets the user-facing title for the current session.")), uPa = we(() => E.object({
    subtype: E.literal("set_color"),
    color: E.string()
  }).describe('Sets the session accent color. Accepts an agent color name or "default" to reset.')), dPa = we(() => E.object({
    subtype: E.literal("mcp_status")
  }).describe("Requests the current status of all MCP server connections.")), F2g = we(() => E.object({
    mcpServers: E.array(dso())
  }).describe("Response containing the current status of all MCP server connections.")), pPa = we(() => E.object({
    subtype: E.literal("file_suggestions"),
    query: E.string()
  }).describe("Requests at-mention file autocomplete suggestions for a partial path prefix. Returns the same fuzzy-matched results the TUI shows.")), U2g = we(() => E.object({
    suggestions: E.array(E.object({
      path: E.string(),
      score: E.number().optional()
    }))
  }).describe("Response containing fuzzy-ranked file path suggestions (capped at the same limit as the TUI typeahead).")), mPa = we(() => E.object({
    subtype: E.literal("get_context_usage")
  }).describe("Requests a breakdown of current context window usage by category.")), fPa = we(() => E.object({
    subtype: E.literal("get_session_cost")
  }).describe("Requests the formatted session cost summary (the same text /usage prints in non-interactive mode). Used by the thin-client /usage dialog to show the remote container cost instead of the local $0.00.")), $2g = we(() => E.object({
    text: E.string()
  }).describe("Formatted session cost text, ANSI-stripped.")), APa = we(() => E.object({
    subtype: E.literal("get_usage")
  }).describe("Requests the structured /usage data: session cost/usage totals plus claude.ai plan rate-limit utilization when available. Experimental \u2014 the response shape may change.")), b2t = we(() => E.object({
    utilization: E.number().nullable().describe("Percentage of the window used, 0-100."),
    resets_at: E.string().nullable().describe("ISO 8601 timestamp when the window resets.")
  })), DFn = we(() => E.object({
    name: E.string(),
    pct: E.number().describe("Share of the weighted local usage attributed to this item, 0-100.")
  })), nPa = we(() => E.object({
    request_count: E.number().describe("API requests found in local transcripts for this window."),
    session_count: E.number().describe("Distinct sessions observed in this window."),
    behaviors: E.array(E.object({
      key: E.enum(["cache_miss", "long_context", "subagent_heavy", "high_parallel", "cron"]),
      pct: E.number().describe("Share of the weighted local usage attributed to this behavior, 0-100."),
      count: E.number().describe("Requests in this window exhibiting the behavior.")
    })).describe("Behavioral characteristics of local usage. Categories overlap \u2014 this is not a partition, so percentages do not sum to 100."),
    agents: E.array(DFn()),
    skills: E.array(DFn()),
    plugins: E.array(DFn()),
    mcp_servers: E.array(DFn())
  })), q2g = we(() => E.object({
    session: E.object({
      total_cost_usd: E.number(),
      total_api_duration_ms: E.number(),
      total_duration_ms: E.number(),
      total_lines_added: E.number(),
      total_lines_removed: E.number(),
      model_usage: E.record(E.string(), SFn())
    }).describe("Cost and usage accumulated by the current session."),
    subscription_type: E.string().nullable().describe("Claude.ai subscription type ('pro', 'max', 'team', 'enterprise') or null for API key / 3P provider sessions."),
    rate_limits_available: E.boolean().describe("False when plan rate limits do not apply (API key, Bedrock, Vertex, or missing profile scope) \u2014 rate_limits will be null."),
    rate_limits: E.object({
      five_hour: b2t().nullable().optional(),
      seven_day: b2t().nullable().optional(),
      seven_day_oauth_apps: b2t().nullable().optional(),
      seven_day_opus: b2t().nullable().optional(),
      seven_day_sonnet: b2t().nullable().optional(),
      extra_usage: E.object({
        is_enabled: E.boolean(),
        monthly_limit: E.number().nullable(),
        used_credits: E.number().nullable(),
        utilization: E.number().nullable(),
        currency: E.string().nullable().optional()
      }).nullable().optional()
    }).nullable().describe("Plan rate-limit utilization windows from the claude.ai usage endpoint, or null when unavailable."),
    behaviors: E.object({
      day: nPa().describe("Last 24 hours."),
      week: nPa().describe("Last 7 days.")
    }).nullable().describe("What's contributing to limits usage, from a scan of local transcripts on this machine (the same data the /usage dialog renders): behavioral characteristics plus per-skill/agent/plugin/MCP-server attribution. Approximate, excludes other devices and claude.ai. Null for non-claude.ai-subscriber sessions (mirrors the dialog) or when the scan fails.")
  }).describe("Structured /usage data: session cost/usage totals plus claude.ai plan rate-limit utilization. Experimental \u2014 the shape may change.")), hPa = we(() => E.object({
    subtype: E.literal("get_binary_version")
  }).describe("Requests the responder's CLI binary version. Used by /version in --remote mode so the thin client can show both its own and the remote container's version.")), j2g = we(() => E.object({
    version: E.string(),
    buildTime: E.string().optional()
  })), fyp = we(() => E.object({
    name: E.string(),
    tokens: E.number(),
    color: E.string(),
    isDeferred: E.boolean().optional()
  })), Ayp = we(() => E.object({
    color: E.string(),
    isFilled: E.boolean(),
    categoryName: E.string(),
    tokens: E.number(),
    percentage: E.number(),
    squareFullness: E.number()
  })), W2g = we(() => E.object({
    categories: E.array(fyp()),
    totalTokens: E.number(),
    maxTokens: E.number(),
    rawMaxTokens: E.number(),
    percentage: E.number(),
    gridRows: E.array(E.array(Ayp())),
    model: E.string(),
    memoryFiles: E.array(E.object({
      path: E.string(),
      type: E.string(),
      tokens: E.number()
    })),
    mcpTools: E.array(E.object({
      name: E.string(),
      serverName: E.string(),
      tokens: E.number(),
      isLoaded: E.boolean().optional()
    })),
    deferredBuiltinTools: E.array(E.object({
      name: E.string(),
      tokens: E.number(),
      isLoaded: E.boolean()
    })).optional(),
    systemTools: E.array(E.object({
      name: E.string(),
      tokens: E.number()
    })).optional(),
    systemPromptSections: E.array(E.object({
      name: E.string(),
      tokens: E.number()
    })).optional(),
    agents: E.array(E.object({
      agentType: E.string(),
      source: E.string(),
      tokens: E.number()
    })),
    slashCommands: E.object({
      totalCommands: E.number(),
      includedCommands: E.number(),
      tokens: E.number()
    }).optional(),
    skills: E.object({
      totalSkills: E.number(),
      includedSkills: E.number(),
      tokens: E.number(),
      skillFrontmatter: E.array(E.object({
        name: E.string(),
        source: E.string(),
        tokens: E.number()
      }))
    }).optional(),
    autoCompactThreshold: E.number().optional(),
    isAutoCompactEnabled: E.boolean(),
    messageBreakdown: E.object({
      toolCallTokens: E.number(),
      toolResultTokens: E.number(),
      attachmentTokens: E.number(),
      assistantMessageTokens: E.number(),
      userMessageTokens: E.number(),
      redirectedContextTokens: E.number(),
      unattributedTokens: E.number(),
      toolCallsByType: E.array(E.object({
        name: E.string(),
        callTokens: E.number(),
        resultTokens: E.number()
      })),
      attachmentsByType: E.array(E.object({
        name: E.string(),
        tokens: E.number()
      }))
    }).optional(),
    apiUsage: E.object({
      input_tokens: E.number(),
      output_tokens: E.number(),
      cache_creation_input_tokens: E.number(),
      cache_read_input_tokens: E.number()
    }).nullable()
  }).describe("Breakdown of current context window usage by category (system prompt, tools, messages, etc.).")), gPa = we(() => E.object({
    subtype: E.literal("mcp_call"),
    tool: E.string().describe("Fully-qualified MCP tool name, e.g. mcp__server__tool_name."),
    arguments: E.record(E.string(), E.unknown()).optional()
  }).describe("Invokes an MCP tool via the subprocess MCP client without a model turn. No permission check (control channel is trusted, same as other " + 'subtypes). SDK-type MCP servers (config.type === "sdk") are rejected \u2014 ' + "they are caller-provided, so the caller can invoke them directly without the subprocess round-trip. Result content passes through the same processing as model-turn MCP calls. Session expiry is not retried automatically; callers can mcp_reconnect and retry. UrlElicitationRequired (-32042) tries Elicitation hooks; if no hook " + "resolves, the call errors with the URL in the message \u2014 open it " + "out-of-band, then retry mcp_call.")), G2g = we(() => E.object({
    content: E.unknown(),
    structuredContent: E.record(E.string(), E.unknown()).optional(),
    _meta: E.record(E.string(), E.unknown()).optional()
  }).describe("MCP tool result \u2014 the content array, structuredContent, and _meta " + "from CallToolResult. Content passes through the same processing as model-turn MCP calls (large results may be truncated or redirected to a file). Caller interprets.")), _Pa = we(() => E.object({
    subtype: E.literal("rewind_files"),
    user_message_id: E.string(),
    dry_run: E.boolean().optional()
  }).describe("Rewinds file changes made since a specific user message.")), V2g = we(() => E.object({
    canRewind: E.boolean(),
    error: E.string().optional(),
    filesChanged: E.array(E.string()).optional(),
    insertions: E.number().optional(),
    deletions: E.number().optional()
  }).describe("Result of a rewindFiles operation.")), yPa = we(() => E.object({
    subtype: E.literal("cancel_async_message"),
    message_uuid: E.string()
  }).describe("Drops a pending async user message from the command queue by uuid. No-op if already dequeued for execution.")), K2g = we(() => E.object({
    cancelled: E.boolean()
  }).describe("Result of a cancel_async_message operation. cancelled=false means the message was not in the queue (already dequeued or never enqueued).")), TPa = we(() => E.object({
    subtype: E.literal("read_file"),
    path: E.string(),
    max_bytes: E.number().optional(),
    encoding: E.enum(["utf-8", "base64"]).optional().describe("How to encode the bytes in `contents`. Defaults to utf-8 (lossy for binary); pass 'base64' to read images.")
  }).describe("Read a file from the session filesystem for the remote sidebar viewer. Path is resolved against cwd and gated by the same read-permission rules as the Read tool.")), z2g = we(() => E.object({
    contents: E.string(),
    absPath: E.string(),
    truncated: E.boolean().optional(),
    encoding: E.literal("base64").optional().describe("Set when the request asked for base64. Absent means utf-8 \u2014 including when an older CLI ignored the request's encoding field.")
  }).describe("File contents for the remote sidebar viewer.")), SPa = we(() => E.object({
    subtype: E.literal("seed_read_state"),
    path: E.string(),
    mtime: E.number()
  }).describe("Seeds the readFileState cache with a path+mtime entry. Use when a prior Read was removed from context so Edit validation would fail despite the client having observed the Read. The mtime lets the CLI detect if the file changed since the seeded Read \u2014 same staleness check as the normal path.")), bPa = we(() => E.object({
    subtype: E.literal("hook_callback"),
    callback_id: E.string(),
    input: BDa(),
    tool_use_id: E.string().optional()
  }).describe("Delivers a hook callback with its input data.")), EPa = we(() => E.object({
    subtype: E.literal("mcp_message"),
    server_name: E.string(),
    message: dyp()
  }).describe("Sends a JSON-RPC message to a specific MCP server.")), CPa = we(() => E.object({
    subtype: E.literal("mcp_set_servers"),
    servers: E.record(E.string(), EFn())
  }).describe("Replaces the set of dynamically managed MCP servers.")), Y2g = we(() => E.object({
    added: E.array(E.string()),
    removed: E.array(E.string()),
    errors: E.record(E.string(), E.string())
  }).describe("Result of replacing the set of dynamically managed MCP servers.")), vPa = we(() => E.object({
    subtype: E.literal("reload_plugins")
  }).describe("Reloads plugins from disk and returns the refreshed session components.")), J2g = we(() => E.object({
    commands: E.array(o2t()),
    agents: E.array(pso()),
    plugins: E.array(E.object({
      name: E.string(),
      path: E.string(),
      source: E.string().optional()
    })),
    mcpServers: E.array(dso()),
    error_count: E.number()
  }).describe("Refreshed commands, agents, plugins, and MCP server status after reload.")), wPa = we(() => E.object({
    subtype: E.literal("reload_skills")
  }).describe("Reloads skills from disk and returns the refreshed skill list.")), X2g = we(() => E.object({
    skills: E.array(o2t())
  }).describe("Refreshed skill commands after reload.")), RPa = we(() => E.object({
    subtype: E.literal("register_repo_root"),
    directory: E.string(),
    reload_claude_md: E.boolean().optional(),
    reload_plugins: E.boolean().optional(),
    reload_skills: E.boolean().optional()
  }).describe("Add a directory as a working-directory root and optionally reload CLAUDE.md, skills, and plugins. The directory must resolve to a subdirectory of cwd.")), xPa = we(() => E.object({
    subtype: E.literal("mcp_reconnect"),
    serverName: E.string()
  }).describe("Reconnects a disconnected or failed MCP server.")), kPa = we(() => E.object({
    subtype: E.literal("mcp_toggle"),
    serverName: E.string(),
    enabled: E.boolean()
  }).describe("Enables or disables an MCP server.")), HPa = we(() => E.object({
    subtype: E.literal("set_mcp_permission_mode_override"),
    serverName: E.string(),
    mode: NY().nullable()
  }).describe("@internal Pin (or clear, with mode:null) an MCP server's per-tool permission-mode override. Tighten-only over this channel: only 'default' or null are accepted (clampControlChannelOverride); any other mode is rejected without changing state. The override substitutes for the session mode at every per-tool engine decision (effectiveModeForTool) so e.g. a server can be held at 'default' under global bypassPermissions.")), IPa = we(() => E.object({
    subtype: E.literal("stop_task"),
    task_id: E.string()
  }).describe("Stops a running task.")), DPa = we(() => E.object({
    subtype: E.literal("background_tasks"),
    tool_use_id: E.string().optional().describe("When set, backgrounds only the task whose originating tool_use block has this id. When omitted, backgrounds all foreground tasks (Ctrl+B semantics).")
  }).describe('Backgrounds in-flight foreground tasks (Bash commands and subagents). With tool_use_id, targets the single task started by that tool_use block; without it, backgrounds all foreground tasks \u2014 the control-request equivalent of pressing Ctrl+B in the terminal. Each blocking tool call returns immediately with a "running in the background" tool_result and the turn continues; the task keeps running and emits a task_notification when it settles.')), PPa = we(() => E.object({
    subtype: E.literal("apply_flag_settings"),
    settings: E.record(E.string(), E.unknown())
  }).describe("Merges the provided settings into the flag settings layer, updating the active configuration.")), OPa = we(() => E.object({
    subtype: E.literal("get_settings")
  }).describe("Returns the effective merged settings and the raw per-source settings.")), Q2g = we(() => E.object({
    effective: E.record(E.string(), E.unknown()),
    sources: E.array(E.object({
      source: E.enum(["userSettings", "projectSettings", "localSettings", "flagSettings", "policySettings"]),
      settings: E.record(E.string(), E.unknown())
    })).describe("Ordered low-to-high priority \u2014 later entries override earlier ones."),
    applied: E.object({
      model: E.string(),
      effort: E.enum(["low", "medium", "high", "xhigh", "max"]).nullable(),
      ultracode: E.boolean().optional().describe("Whether ultracode (xhigh effort plus standing dynamic-workflow orchestration) is active for the session. Set per session via the `ultracode` settings key (--settings or apply_flag_settings).")
    }).optional().describe("Runtime-resolved values after env overrides, session state, and model-specific defaults are applied. Unlike `effective` (disk merge), these reflect what will actually be sent to the API."),
    errors: E.array(VDa()).optional().describe("Settings parse and validation errors. When non-empty, the listed files were skipped during the merge above \u2014 their settings are not reflected in `effective` or `sources`.")
  }).describe("Effective merged settings plus raw per-source settings in merge order.")), LPa = we(() => E.object({
    subtype: E.literal("elicitation"),
    mcp_server_name: E.string(),
    message: E.string(),
    mode: E.enum(["form", "url"]).optional(),
    url: E.string().optional(),
    elicitation_id: E.string().optional(),
    requested_schema: E.record(E.string(), E.unknown()).optional(),
    title: E.string().optional().describe("Permission-display title from the MCP server's _meta['anthropic/permissionDisplay']. Mirrors can_use_tool.title so SDK consumers can render elicitation-driven permission prompts with structured headers instead of parsing `message`."),
    display_name: E.string().optional().describe("Short tool/server label from _meta['anthropic/permissionDisplay'].displayName. Mirrors can_use_tool.display_name."),
    description: E.string().optional().describe("Permission-display subtitle from _meta['anthropic/permissionDisplay'].description. Mirrors can_use_tool.description.")
  }).describe("Requests the SDK consumer to handle an MCP elicitation (user input request).")), MPa = we(() => E.object({
    action: E.enum(["accept", "decline", "cancel"]),
    content: E.record(E.string(), E.unknown()).optional()
  }).describe("Response from the SDK consumer for an elicitation request.")), NPa = we(() => E.object({
    subtype: E.literal("request_user_dialog"),
    dialog_kind: E.string().describe('Identifier for the dialog the host should render. Open string union \u2014 new kinds may be added without bumping the protocol; hosts must answer unrecognized kinds with {behavior: "cancelled"}.'),
    payload: E.record(E.string(), E.unknown()).describe("Dialog-specific data passed to the host renderer. Shape is defined per dialog_kind; the protocol transports it opaquely."),
    tool_use_id: E.string().optional()
  }).describe("Requests the SDK consumer to render a tool-driven blocking dialog and return the user choice. Used by tools that previously rendered Ink JSX via setToolJSX with an onDone callback.")), BPa = we(() => E.object({
    behavior: E.enum(["completed", "cancelled"]),
    result: E.unknown().optional().describe("Dialog-specific result payload. Opaque to the protocol; the caller and dialog renderer agree on the shape per dialog_kind.")
  }).describe("Response from the SDK consumer for a request_user_dialog request.")), FPa = we(() => E.object({
    subtype: E.literal("submit_feedback"),
    description: E.string(),
    surface: E.enum(["cli", "ccd", "ccr", "ide", "sdk", "cowork"]).optional().describe("Where the feedback flow was initiated. Stamped into the POST body and tengu_bug_report_* analytics so the triage pipeline can distinguish CCD/CCR/IDE/Cowork reports from terminal reports landing in the same claude_cli_feedback table. Defaults to 'sdk'.")
  }).describe("@internal Submits a /feedback report (description + current session transcript + sanitized error log) to api.anthropic.com/api/claude_cli_feedback using the CLI's auth and redaction. Runs the same getFeedbackUnavailableReason() policy checks as the terminal /feedback command \u2014 when feedback is disabled (3P provider, org policy, env kill-switch) the response carries unavailable_reason instead of an error.")), Z2g = we(() => E.object({
    feedback_id: E.string().nullable(),
    unavailable_reason: E.string().optional().describe("Human-readable reason /feedback is disabled in this session (3P provider, org policy, env var). When set, no submission was attempted."),
    is_zdr_org: E.boolean().optional(),
    failure_reason: E.string().optional(),
    status_code: E.number().optional(),
    ccshare_url: E.string().optional().describe("Internal share URL for the conversation. Only set in internal builds when the upload succeeded; absent otherwise.")
  }).describe("@internal Result of a submit_feedback request. feedback_id is set on success; otherwise one of unavailable_reason / failure_reason explains why.")), UPa = we(() => E.object({
    subtype: E.literal("oauth_token_refresh")
  }).describe("@internal Request from the CLI subprocess to the SDK host for a fresh OAuth access token after a 401 with no local refresh token.")), $Pa = we(() => E.object({
    accessToken: E.string().nullable()
  }).describe("@internal Fresh OAuth access token returned by the SDK host getOAuthToken callback, or null when the host has no token available.")), qPa = we(() => E.object({
    subtype: E.literal("host_auth_token_refresh")
  }).describe("@internal Request from the CLI subprocess to the SDK host for a fresh provider auth token after a 401 when the host owns the credential (Cowork 3P).")), jPa = we(() => E.object({
    authToken: E.string().nullable()
  }).describe("@internal Fresh provider auth token returned by the SDK host getHostAuthToken callback, or null when the host has no token available.")), WPa = we(() => E.object({
    subtype: E.literal("message_rated"),
    messageUuid: E.string().describe("UUID of the assistant message being rated."),
    sentiment: E.enum(["positive", "negative"]).describe("User rating: positive (thumbs up) or negative (thumbs down)."),
    surface: E.enum(["tool_use", "assistant_text"]).optional().describe("Which in-conversation surface the rating came from. If omitted, logged as tool_use."),
    cleared: E.boolean().optional().describe("True when the caller is un-rating a message (clicking the same control a second time).")
  }).describe("@internal Records a per-message thumbs up/down rating. Logs tengu_message_rated with the same shape as the in-conversation rating controls so Desktop / IDE callers can surface their own native thumbs UI.")), e$g = we(() => E.object({}).describe("@internal Empty response for message_rated.")), t$g = we(() => E.union([sPa(), bPa(), EPa(), UPa(), qPa(), LPa(), NPa()]).describe("Control requests the agent loop originates and needs a reply to \u2014 the loop\u2192client RPC slice of SDKControlRequestInner. The remaining members are client\u2192loop commands (set/get/mcp/auth/etc).")), n$g = we(() => E.union([oPa(), rPa(), iPa(), aPa(), lPa(), cPa(), uPa(), dPa(), mPa(), fPa(), APa(), hPa(), gPa(), pPa(), _Pa(), yPa(), TPa(), SPa(), CPa(), RPa(), vPa(), wPa(), xPa(), kPa(), HPa(), WPa(), IPa(), DPa(), PPa(), OPa(), FPa()]).describe("Control requests a client sends to drive the loop \u2014 the client\u2192loop command slice of SDKControlRequestInner. The remaining members are loop\u2192client RPCs that block on a reply (see AgentOriginatedControlRequest).")), hyp = we(() => E.union([oPa(), sPa(), rPa(), iPa(), aPa(), lPa(), cPa(), uPa(), dPa(), mPa(), fPa(), APa(), hPa(), gPa(), pPa(), bPa(), EPa(), _Pa(), yPa(), TPa(), SPa(), CPa(), RPa(), vPa(), wPa(), xPa(), kPa(), HPa(), WPa(), UPa(), qPa(), IPa(), DPa(), PPa(), OPa(), LPa(), NPa(), FPa()])), PFn = we(() => E.object({
    type: E.literal("control_request"),
    request_id: E.string(),
    request: hyp()
  })), GPa = we(() => E.array(E.lazy(() => PFn())).optional().describe("Permission requests still awaiting a response. Sent on the `initialize` response so a client joining an already-initialized session learns about in-flight prompts.")), VPa = we(() => E.array(E.lazy(() => PFn())).optional().describe("request_user_dialog requests still awaiting a response. Sent on the `initialize` response (sibling of pending_permission_requests) so a client joining an already-initialized session can re-arm in-flight dialogs. Receivers must tolerate the same request_id also arriving as a live or replayed control_request frame and render it once.")), gyp = we(() => E.object({
    subtype: E.literal("success"),
    request_id: E.string(),
    response: E.record(E.string(), E.unknown()).optional(),
    pending_permission_requests: GPa(),
    pending_user_dialog_requests: VPa()
  })), _yp = we(() => E.object({
    subtype: E.literal("error"),
    request_id: E.string(),
    error: E.string(),
    pending_permission_requests: GPa(),
    pending_user_dialog_requests: VPa()
  })), KPa = we(() => E.object({
    type: E.literal("control_response"),
    response: E.union([gyp(), _yp()])
  })), yyp = we(() => E.object({
    type: E.literal("control_cancel_request"),
    request_id: E.string()
  }).describe("Cancels a currently open control request.")), zPa = we(() => E.object({
    type: E.literal("keep_alive")
  }).describe("Keep-alive message to maintain WebSocket connection.")), Typ = we(() => E.object({
    type: E.literal("update_environment_variables"),
    variables: E.record(E.string(), E.string()),
    request_id: E.string().optional()
  }).describe("Updates environment variables at runtime.")), r$g = we(() => E.union([Tso(), gso(), _so(), yso()]).describe("Observational messages the agent loop emits \u2014 fire-and-forget, no reply expected. The remaining StdoutMessage members are control-protocol traffic (requests the loop originates and needs a reply to, responses to client-originated requests, keep-alives). This sub-union is the target for QueryEvent convergence so a Transport-shaped REPL can consume events without filtering control noise.")), YPa = we(() => E.union([Tso(), gso(), _so(), yso(), KPa(), PFn(), yyp(), zPa()])), o$g = we(() => E.union([hso(), jDa(), PFn(), KPa(), zPa(), Typ()]));
});
export {dyp,pyp,rPa,myp,B2g,oPa,sPa,iPa,aPa,lPa,cPa,uPa,dPa,F2g,pPa,U2g,mPa,fPa,$2g,APa,b2t,DFn,nPa,q2g,hPa,j2g,fyp,Ayp,W2g,gPa,G2g,_Pa,V2g,yPa,K2g,TPa,z2g,SPa,bPa,EPa,CPa,Y2g,vPa,J2g,wPa,X2g,RPa,xPa,kPa,HPa,IPa,DPa,PPa,OPa,Q2g,LPa,MPa,NPa,BPa,FPa,Z2g,UPa,$Pa,qPa,jPa,WPa,e$g,t$g,n$g,hyp,PFn,GPa,VPa,gyp,_yp,KPa,yyp,zPa,Typ,r$g,YPa,o$g,JPa};
