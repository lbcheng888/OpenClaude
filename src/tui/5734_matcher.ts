// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {jN,PERMISSION_DECISION_REASON_TYPES as SSr} from "../../vendor/m721.ts";
import {$gc,Hgc,Ogc,ijt,L$o,M$o,Pgc,XSe,ajt,sjt,O$o,krr,Dgc,Irr,Ugc,W$o,U$o,$$o,q$o,B$o,Ngc} from "../permissions/5733_inputTokens.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
/**
 * SDK control-protocol schema registry (Claude Code v2.1.190).
 *
 * Lazily-built Zod (`C`) schemas for the bidirectional control channel between
 * the SDK host/client and the agent loop. Covers:
 *   - client→loop commands (set_model, set_permission_mode, mcp_*, get_*, etc.)
 *   - loop→client RPCs that block on a reply (can_use_tool, hook_callback,
 *     elicitation, request_user_dialog, oauth/host token refresh)
 *   - observational stdout messages and the control_request/control_response
 *     transport envelopes.
 *
 * Each builder is wrapped in `ve(() => ...)` so the schema graph (which is
 * mutually recursive) is constructed on first use. The `.describe(...)` text is
 * the protocol documentation surfaced to SDK consumers.
 *
 * v190 vs v185 deltas:
 *   - rate_limits gains `model_scoped` (per-model weekly windows).
 *   - set_mcp_permission_mode_override now accepts 'auto' in addition to
 *     'default'/null over the control channel.
 */
var dYm, pYm, Wgc, mYm, $3E, Ggc, Vgc, Kgc, zgc, jgc, Ygc, Jgc, Xgc, q3E, Qgc, W3E, Zgc, e_c, G3E, t_c, ljt, xrr, qgc, V3E, n_c, K3E, fYm, hYm, z3E, r_c, j3E, o_c, Y3E, s_c, J3E, i_c, X3E, a_c, l_c, c_c, u_c, Q3E, d_c, Z3E, p_c, e4E, m_c, f_c, h_c, g_c, __c, y_c, T_c, S_c, t4E, b_c, E_c, C_c, A_c, R_c, n4E, v_c, w_c, k_c, H_c, I_c, r4E, o4E, s4E, gYm, Drr, x_c, D_c, _Ym, yYm, P_c, TYm, O_c, SYm, i4E, L_c, a4E;
var M_c = b(() => {
  Qr();
  jN();
  $gc();
  dYm = ve(() => C.unknown()), pYm = ve(() => C.object({
    matcher: C.string().optional(),
    hookCallbackIds: C.array(C.string()),
    timeout: C.number().optional()
  }).describe("Configuration for matching and routing hook callbacks.")), Wgc = ve(() => C.object({
    subtype: C.literal("initialize"),
    hooks: C.record(Hgc(), C.array(pYm())).optional(),
    sdkMcpServers: C.array(C.string()).optional(),
    jsonSchema: C.record(C.string(), C.unknown()).optional(),
    systemPrompt: C.array(C.string()).optional(),
    appendSystemPrompt: C.string().optional(),
    planModeInstructions: C.string().optional().describe("Custom workflow body for the plan-mode system reminder. Replaces the default code-implementation phases; the CLI still wraps it with the read-only enforcement preamble and the ExitPlanMode protocol footer."),
    appendSubagentSystemPrompt: C.string().optional().describe("@internal Additional system prompt appended to every Task-tool subagent (and propagated to nested subagents). Gated by CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT."),
    toolAliases: C.record(C.string(), C.string()).optional().describe("Map of tool-name aliases applied before name resolution. When the model emits a tool_use whose name is a key in this map, the tool execution path resolves the mapped name instead. Single-hop (no chains). See Options.toolAliases."),
    excludeDynamicSections: C.boolean().optional().describe("When true, omit per-user dynamic sections (working directory, auto-memory path) from the cached system prompt and re-inject them as the first user message. Lets cross-user prompt caching hit on a static system prompt prefix. Tradeoff: the model sees this context slightly later in the prompt, so steering on the working directory and memory location is marginally less authoritative. Has no effect when a custom (non-preset) system prompt is in use."),
    agents: C.record(C.string(), Ogc()).optional(),
    title: C.string().optional().describe("Custom session title. When provided, the session uses this title and skips automatic title generation. Has no effect on the persisted title when resuming an existing session."),
    skills: C.array(C.string()).optional().describe('When provided, only skills whose names match an entry are loaded into the main session system prompt, using the same rules as AgentDefinition.skills: exact name, plugin-qualified name, or ":name" suffix. Omit to load every discovered skill. Applies to the main session only; subagents use AgentDefinition.skills.'),
    webSearchIsolationExemptMcpServers: C.array(C.string()).optional().describe("@internal Additional MCP server names exempt from the web search / connector isolation latch. Unioned with the built-in infra-server list."),
    promptSuggestions: C.boolean().optional(),
    agentProgressSummaries: C.boolean().optional(),
    forwardSubagentText: C.boolean().optional(),
    supportedDialogKinds: C.array(C.string()).optional().describe("Dialog kinds (request_user_dialog `dialog_kind` values) this consumer's onUserDialog can actually render. The CLI treats ABSENCE as 'cannot display' and fails closed: without the kind declared here, a dialog-gated flow degrades to its no-dialog behavior (for 'refusal_fallback_prompt', the classic refusal error) instead of parking a dialog the consumer may mishandle. First-attached-client-wins on multi-client sessions; later initializes do not change it.")
  }).describe("Initializes the SDK session with hooks, MCP servers, and agent configuration.")), mYm = ve(() => C.object({
    minTimeBeforeFeedbackMs: C.number(),
    minTimeBetweenFeedbackMs: C.number(),
    minTimeBetweenGlobalFeedbackMs: C.number(),
    minUserTurnsBeforeFeedback: C.number(),
    minUserTurnsBetweenFeedback: C.number(),
    hideThanksAfterMs: C.number(),
    onForModels: C.array(C.string()),
    probability: C.number(),
    lastSurveyShownTime: C.number().nullable()
  }).describe("@internal Session feedback-survey configuration for host UIs (VS Code webview, Claude Desktop) that run the survey trigger logic themselves: the same GrowthBook-driven pacing/probability values the terminal survey uses, plus the cross-surface last-shown time the host can't read. Survey responses are proxied back as tengu_feedback_survey_event log_event notifications.")), $3E = ve(() => C.object({
    commands: C.array(ijt()),
    agents: C.array(L$o()),
    output_style: C.string(),
    available_output_styles: C.array(C.string()),
    models: C.array(M$o()),
    unavailable_models: C.array(M$o()).optional().describe("@internal Models the account can see but not select (disabled: true, reason folded into description — e.g. a model the org's Zero Data Retention setting excludes). Disjoint from `models`, which stays selectable-only so consumers without disabled rendering are unaffected. Populated only for allowlisted 1P hosts that render these rows (currently the VS Code extension — UNAVAILABLE_MODELS_HOST_ENTRYPOINTS); empty for every other consumer. Omitted when empty."),
    account: Pgc(),
    current_model: C.string().optional().describe("@internal The CLI's active model at connect time. Remote Control clients (web/mobile) sync their model dropdown TO this value on connect instead of sending set_model with their own default — without it, connecting from a phone silently switches the terminal's model (CC-2659)."),
    current_permission_mode: XSe().optional().describe("@internal The CLI's active permission mode at connect time, for the same connect-time sync as current_model."),
    pid: C.number().optional().describe("@internal CLI process PID for tmux socket isolation"),
    fast_mode_state: ajt().optional(),
    feedback_survey_config: mYm().optional().describe("@internal Present only when the feedback-survey surface is enabled for this host (GrowthBook gate, privacy level, and org policy all allow it). Absent means the host must not show the survey.")
  }).describe("Response from session initialization with available commands, models, and account info.")), Ggc = ve(() => C.object({
    subtype: C.literal("interrupt"),
    reason: C.string().optional().describe("@internal Why the turn was interrupted, forwarded to the turn's AbortSignal.reason. Tool implementations branch on it to distinguish a user-driven cancel (which suppresses error output) from other aborts. Known values: `interrupt` (user Esc/Ctrl+C), `user-cancel`, `remote-cancel`, `consumer-error`, `workflow-abort`, `stalled`, `recovery-timeout`. Open set — consumers must treat unknown values as a generic abort.")
  }).describe("Interrupts the currently running conversation turn.")), Vgc = ve(() => C.object({
    subtype: C.literal("can_use_tool"),
    tool_name: C.string(),
    input: C.record(C.string(), C.unknown()),
    permission_suggestions: C.array(sjt()).optional(),
    blocked_path: C.string().optional(),
    decision_reason: C.string().optional(),
    decision_reason_type: C.enum(SSr).optional().describe('Structured discriminator for why auto-mode escalated. Lets SDK hosts make policy (e.g. auto-deny safetyCheck) without parsing decision_reason text. For compound bash commands this is "subcommandResults" even when a safetyCheck is nested inside — check classifier_approvable for that case.'),
    classifier_approvable: C.boolean().optional().describe("Set when a safetyCheck is present anywhere in the decision reason (including nested inside subcommandResults for compound bash). false = at least one safety check requires manual approval (e.g. Windows path bypass, dangerous rm); true = all safety checks MAY be classifier-approved (e.g. sensitive-file paths). Absent when no safetyCheck is involved."),
    title: C.string().optional(),
    display_name: C.string().optional(),
    tool_use_id: C.string(),
    agent_id: C.string().optional(),
    description: C.string().optional()
  }).describe("Requests permission to use a tool with the given input.")), Kgc = ve(() => C.object({
    subtype: C.literal("set_permission_mode"),
    mode: XSe(),
    ultraplan: C.boolean().optional().describe("@internal CCR ultraplan session marker.")
  }).describe("Sets the permission mode for tool execution handling.")), zgc = ve(() => C.object({
    subtype: C.literal("set_model"),
    model: C.string().optional()
  }).describe("Sets the model to use for subsequent conversation turns.")), jgc = ve(() => C.object({
    subtype: C.literal("set_max_thinking_tokens"),
    max_thinking_tokens: C.number().nullable(),
    thinking_display: C.enum(["summarized", "omitted"]).nullable().optional()
  }).describe("Sets the maximum number of thinking tokens for extended thinking. thinking_display optionally sets the thinking display mode for the rest of the session: a value replaces the session display mode, null clears it back to the API default, and when omitted the display mode from session start (--thinking-display) is kept.")), Ygc = ve(() => C.object({
    subtype: C.literal("rename_session"),
    title: C.string()
  }).describe("Sets the user-facing title for the current session.")), Jgc = ve(() => C.object({
    subtype: C.literal("set_color"),
    color: C.string()
  }).describe('Sets the session accent color. Accepts an agent color name or "default" to reset.')), Xgc = ve(() => C.object({
    subtype: C.literal("mcp_status")
  }).describe("Requests the current status of all MCP server connections.")), q3E = ve(() => C.object({
    mcpServers: C.array(O$o())
  }).describe("Response containing the current status of all MCP server connections.")), Qgc = ve(() => C.object({
    subtype: C.literal("file_suggestions"),
    query: C.string()
  }).describe("Requests at-mention file autocomplete suggestions for a partial path prefix. Returns the same fuzzy-matched results the TUI shows.")), W3E = ve(() => C.object({
    suggestions: C.array(C.object({
      path: C.string(),
      score: C.number().optional()
    }))
  }).describe("Response containing fuzzy-ranked file path suggestions (capped at the same limit as the TUI typeahead).")), Zgc = ve(() => C.object({
    subtype: C.literal("get_context_usage")
  }).describe("Requests a breakdown of current context window usage by category.")), e_c = ve(() => C.object({
    subtype: C.literal("get_session_cost")
  }).describe("Requests the formatted session cost summary (the same text /usage prints in non-interactive mode). Used by the thin-client /usage dialog to show the remote container cost instead of the local $0.00.")), G3E = ve(() => C.object({
    text: C.string()
  }).describe("Formatted session cost text, ANSI-stripped.")), t_c = ve(() => C.object({
    subtype: C.literal("get_usage")
  }).describe("Requests the structured /usage data: session cost/usage totals plus claude.ai plan rate-limit utilization when available. Experimental — the response shape may change.")), ljt = ve(() => C.object({
    utilization: C.number().nullable().describe("Percentage of the window used, 0-100."),
    resets_at: C.string().nullable().describe("ISO 8601 timestamp when the window resets.")
  })), xrr = ve(() => C.object({
    name: C.string(),
    pct: C.number().describe("Share of the weighted local usage attributed to this item, 0-100.")
  })), qgc = ve(() => C.object({
    request_count: C.number().describe("API requests found in local transcripts for this window."),
    session_count: C.number().describe("Distinct sessions observed in this window."),
    behaviors: C.array(C.object({
      key: C.enum(["cache_miss", "long_context", "subagent_heavy", "high_parallel", "cron"]),
      pct: C.number().describe("Share of the weighted local usage attributed to this behavior, 0-100."),
      count: C.number().describe("Requests in this window exhibiting the behavior.")
    })).describe("Behavioral characteristics of local usage. Categories overlap — this is not a partition, so percentages do not sum to 100."),
    agents: C.array(xrr()),
    skills: C.array(xrr()),
    plugins: C.array(xrr()),
    mcp_servers: C.array(xrr())
  })), V3E = ve(() => C.object({
    session: C.object({
      total_cost_usd: C.number(),
      total_api_duration_ms: C.number(),
      total_duration_ms: C.number(),
      total_lines_added: C.number(),
      total_lines_removed: C.number(),
      model_usage: C.record(C.string(), krr())
    }).describe("Cost and usage accumulated by the current session."),
    subscription_type: C.string().nullable().describe("Claude.ai subscription type ('pro', 'max', 'team', 'enterprise') or null for API key / 3P provider sessions."),
    rate_limits_available: C.boolean().describe("False when plan rate limits do not apply (API key, Bedrock, Vertex, or missing profile scope) — rate_limits will be null."),
    rate_limits: C.object({
      five_hour: ljt().nullable().optional(),
      seven_day: ljt().nullable().optional(),
      seven_day_oauth_apps: ljt().nullable().optional(),
      seven_day_opus: ljt().nullable().optional(),
      seven_day_sonnet: ljt().nullable().optional(),
      model_scoped: C.array(C.object({
        display_name: C.string().describe("Server-supplied label for the model bucket (e.g. 'Fable')."),
        utilization: C.number().nullable(),
        resets_at: C.string().nullable()
      })).optional().describe("Per-model weekly windows from the server limits[] array, filtered by the overage-included-models allowlist. Additive — present only when the server emits them."),
      extra_usage: C.object({
        is_enabled: C.boolean(),
        monthly_limit: C.number().nullable(),
        used_credits: C.number().nullable(),
        utilization: C.number().nullable(),
        currency: C.string().nullable().optional()
      }).nullable().optional()
    }).nullable().describe("Plan rate-limit utilization windows from the claude.ai usage endpoint, or null when unavailable."),
    behaviors: C.object({
      day: qgc().describe("Last 24 hours."),
      week: qgc().describe("Last 7 days.")
    }).nullable().describe("What's contributing to limits usage, from a scan of local transcripts on this machine (the same data the /usage dialog renders): behavioral characteristics plus per-skill/agent/plugin/MCP-server attribution. Approximate, excludes other devices and claude.ai. Null for non-claude.ai-subscriber sessions (mirrors the dialog) or when the scan fails.")
  }).describe("Structured /usage data: session cost/usage totals plus claude.ai plan rate-limit utilization. Experimental — the shape may change.")), n_c = ve(() => C.object({
    subtype: C.literal("get_binary_version")
  }).describe("Requests the responder's CLI binary version. Used by /version in --remote mode so the thin client can show both its own and the remote container's version.")), K3E = ve(() => C.object({
    version: C.string(),
    buildTime: C.string().optional()
  })), fYm = ve(() => C.object({
    name: C.string(),
    tokens: C.number(),
    color: C.string(),
    isDeferred: C.boolean().optional()
  })), hYm = ve(() => C.object({
    color: C.string(),
    isFilled: C.boolean(),
    categoryName: C.string(),
    tokens: C.number(),
    percentage: C.number(),
    squareFullness: C.number()
  })), z3E = ve(() => C.object({
    categories: C.array(fYm()),
    totalTokens: C.number(),
    maxTokens: C.number(),
    rawMaxTokens: C.number(),
    percentage: C.number(),
    gridRows: C.array(C.array(hYm())),
    model: C.string(),
    memoryFiles: C.array(C.object({
      path: C.string(),
      type: C.string(),
      tokens: C.number()
    })),
    mcpTools: C.array(C.object({
      name: C.string(),
      serverName: C.string(),
      tokens: C.number(),
      isLoaded: C.boolean().optional()
    })),
    deferredBuiltinTools: C.array(C.object({
      name: C.string(),
      tokens: C.number(),
      isLoaded: C.boolean()
    })).optional(),
    systemTools: C.array(C.object({
      name: C.string(),
      tokens: C.number()
    })).optional(),
    systemPromptSections: C.array(C.object({
      name: C.string(),
      tokens: C.number()
    })).optional(),
    agents: C.array(C.object({
      agentType: C.string(),
      source: C.string(),
      tokens: C.number()
    })),
    slashCommands: C.object({
      totalCommands: C.number(),
      includedCommands: C.number(),
      tokens: C.number()
    }).optional(),
    skills: C.object({
      totalSkills: C.number(),
      includedSkills: C.number(),
      tokens: C.number(),
      skillFrontmatter: C.array(C.object({
        name: C.string(),
        source: C.string(),
        tokens: C.number()
      }))
    }).optional(),
    autoCompactThreshold: C.number().optional(),
    isAutoCompactEnabled: C.boolean(),
    messageBreakdown: C.object({
      toolCallTokens: C.number(),
      toolResultTokens: C.number(),
      attachmentTokens: C.number(),
      assistantMessageTokens: C.number(),
      userMessageTokens: C.number(),
      redirectedContextTokens: C.number(),
      unattributedTokens: C.number(),
      toolCallsByType: C.array(C.object({
        name: C.string(),
        callTokens: C.number(),
        resultTokens: C.number()
      })),
      attachmentsByType: C.array(C.object({
        name: C.string(),
        tokens: C.number()
      }))
    }).optional(),
    apiUsage: C.object({
      input_tokens: C.number(),
      output_tokens: C.number(),
      cache_creation_input_tokens: C.number(),
      cache_read_input_tokens: C.number()
    }).nullable()
  }).describe("Breakdown of current context window usage by category (system prompt, tools, messages, etc.).")), r_c = ve(() => C.object({
    subtype: C.literal("mcp_call"),
    tool: C.string().describe("Fully-qualified MCP tool name, e.g. mcp__server__tool_name."),
    arguments: C.record(C.string(), C.unknown()).optional()
  }).describe("Invokes an MCP tool via the subprocess MCP client without a model turn. No permission check (control channel is trusted, same as other " + 'subtypes). SDK-type MCP servers (config.type === "sdk") are rejected — ' + "they are caller-provided, so the caller can invoke them directly without the subprocess round-trip. Result content passes through the same processing as model-turn MCP calls. Session expiry is not retried automatically; callers can mcp_reconnect and retry. UrlElicitationRequired (-32042) tries Elicitation hooks; if no hook " + "resolves, the call errors with the URL in the message — open it " + "out-of-band, then retry mcp_call.")), j3E = ve(() => C.object({
    content: C.unknown(),
    structuredContent: C.record(C.string(), C.unknown()).optional(),
    _meta: C.record(C.string(), C.unknown()).optional()
  }).describe("MCP tool result — the content array, structuredContent, and _meta " + "from CallToolResult. Content passes through the same processing as model-turn MCP calls (large results may be truncated or redirected to a file). Caller interprets.")), o_c = ve(() => C.object({
    subtype: C.literal("rewind_files"),
    user_message_id: C.string(),
    dry_run: C.boolean().optional()
  }).describe("Rewinds file changes made since a specific user message.")), Y3E = ve(() => C.object({
    canRewind: C.boolean(),
    error: C.string().optional(),
    filesChanged: C.array(C.string()).optional(),
    insertions: C.number().optional(),
    deletions: C.number().optional()
  }).describe("Result of a rewindFiles operation.")), s_c = ve(() => C.object({
    subtype: C.literal("cancel_async_message"),
    message_uuid: C.string()
  }).describe("Drops a pending async user message from the command queue by uuid. No-op if already dequeued for execution.")), J3E = ve(() => C.object({
    cancelled: C.boolean()
  }).describe("Result of a cancel_async_message operation. cancelled=false means the message was not in the queue (already dequeued or never enqueued).")), i_c = ve(() => C.object({
    subtype: C.literal("read_file"),
    path: C.string(),
    max_bytes: C.number().optional(),
    encoding: C.enum(["utf-8", "base64"]).optional().describe("How to encode the bytes in `contents`. Defaults to utf-8 (lossy for binary); pass 'base64' to read images.")
  }).describe("Read a file from the session filesystem for the remote sidebar viewer. Path is resolved against cwd and gated by the same read-permission rules as the Read tool.")), X3E = ve(() => C.object({
    contents: C.string(),
    absPath: C.string(),
    truncated: C.boolean().optional(),
    encoding: C.literal("base64").optional().describe("Set when the request asked for base64. Absent means utf-8 — including when an older CLI ignored the request's encoding field.")
  }).describe("File contents for the remote sidebar viewer.")), a_c = ve(() => C.object({
    subtype: C.literal("seed_read_state"),
    path: C.string(),
    mtime: C.number()
  }).describe("Seeds the readFileState cache with a path+mtime entry. Use when a prior Read was removed from context so Edit validation would fail despite the client having observed the Read. The mtime lets the CLI detect if the file changed since the seeded Read — same staleness check as the normal path.")), l_c = ve(() => C.object({
    subtype: C.literal("hook_callback"),
    callback_id: C.string(),
    input: Dgc(),
    tool_use_id: C.string().optional()
  }).describe("Delivers a hook callback with its input data.")), c_c = ve(() => C.object({
    subtype: C.literal("mcp_message"),
    server_name: C.string(),
    message: dYm()
  }).describe("Sends a JSON-RPC message to a specific MCP server.")), u_c = ve(() => C.object({
    subtype: C.literal("mcp_set_servers"),
    servers: C.record(C.string(), Irr())
  }).describe("Replaces the set of dynamically managed MCP servers.")), Q3E = ve(() => C.object({
    added: C.array(C.string()),
    removed: C.array(C.string()),
    errors: C.record(C.string(), C.string())
  }).describe("Result of replacing the set of dynamically managed MCP servers.")), d_c = ve(() => C.object({
    subtype: C.literal("reload_plugins")
  }).describe("Reloads plugins from disk and returns the refreshed session components.")), Z3E = ve(() => C.object({
    commands: C.array(ijt()),
    agents: C.array(L$o()),
    plugins: C.array(C.object({
      name: C.string(),
      path: C.string(),
      source: C.string().optional()
    })),
    mcpServers: C.array(O$o()),
    error_count: C.number()
  }).describe("Refreshed commands, agents, plugins, and MCP server status after reload.")), p_c = ve(() => C.object({
    subtype: C.literal("reload_skills")
  }).describe("Reloads skills from disk and returns the refreshed skill list.")), e4E = ve(() => C.object({
    skills: C.array(ijt())
  }).describe("Refreshed skill commands after reload.")), m_c = ve(() => C.object({
    subtype: C.literal("register_repo_root"),
    directory: C.string(),
    reload_claude_md: C.boolean().optional(),
    reload_plugins: C.boolean().optional(),
    reload_skills: C.boolean().optional()
  }).describe("Add a directory as a working-directory root and optionally reload CLAUDE.md, skills, and plugins. The directory must resolve to a subdirectory of cwd.")), f_c = ve(() => C.object({
    subtype: C.literal("mcp_reconnect"),
    serverName: C.string()
  }).describe("Reconnects a disconnected or failed MCP server.")), h_c = ve(() => C.object({
    subtype: C.literal("mcp_toggle"),
    serverName: C.string(),
    enabled: C.boolean()
  }).describe("Enables or disables an MCP server.")), g_c = ve(() => C.object({
    subtype: C.literal("set_mcp_permission_mode_override"),
    serverName: C.string(),
    mode: XSe().nullable()
  }).describe("@internal Pin (or clear, with mode:null) an MCP server's per-tool permission-mode override. Tighten-only over this channel: only 'default', 'auto', or null are accepted (clampControlChannelOverride); any other mode is rejected without changing state. The override substitutes for the session mode at every per-tool engine decision (effectiveModeForTool) — and only when the session mode would already auto-allow — so e.g. a server can be held at 'default' or routed through the auto-mode classifier under global bypassPermissions.")), __c = ve(() => C.object({
    subtype: C.literal("stop_task"),
    task_id: C.string()
  }).describe("Stops a running task.")), y_c = ve(() => C.object({
    subtype: C.literal("background_tasks"),
    tool_use_id: C.string().optional().describe("When set, backgrounds only the task whose originating tool_use block has this id. When omitted, backgrounds all foreground tasks (Ctrl+B semantics).")
  }).describe('Backgrounds in-flight foreground tasks (Bash commands and subagents). With tool_use_id, targets the single task started by that tool_use block; without it, backgrounds all foreground tasks — the control-request equivalent of pressing Ctrl+B in the terminal. Each blocking tool call returns immediately with a "running in the background" tool_result and the turn continues; the task keeps running and emits a task_notification when it settles.')), T_c = ve(() => C.object({
    subtype: C.literal("apply_flag_settings"),
    settings: C.record(C.string(), C.unknown())
  }).describe("Merges the provided settings into the flag settings layer, updating the active configuration.")), S_c = ve(() => C.object({
    subtype: C.literal("get_settings")
  }).describe("Returns the effective merged settings and the raw per-source settings.")), t4E = ve(() => C.object({
    effective: C.record(C.string(), C.unknown()),
    sources: C.array(C.object({
      source: C.enum(["userSettings", "projectSettings", "localSettings", "flagSettings", "policySettings"]),
      settings: C.record(C.string(), C.unknown())
    })).describe("Ordered low-to-high priority — later entries override earlier ones."),
    applied: C.object({
      model: C.string(),
      effort: C.enum(["low", "medium", "high", "xhigh", "max"]).nullable(),
      ultracode: C.boolean().optional().describe("Whether ultracode (xhigh effort plus standing dynamic-workflow orchestration) is active for the session. Set per session via the `ultracode` settings key (--settings or apply_flag_settings).")
    }).optional().describe("Runtime-resolved values after env overrides, session state, and model-specific defaults are applied. Unlike `effective` (disk merge), these reflect what will actually be sent to the API."),
    errors: C.array(Ugc()).optional().describe("Settings parse and validation errors. When non-empty, the listed files were skipped during the merge above — their settings are not reflected in `effective` or `sources`.")
  }).describe("Effective merged settings plus raw per-source settings in merge order.")), b_c = ve(() => C.object({
    subtype: C.literal("elicitation"),
    mcp_server_name: C.string(),
    message: C.string(),
    mode: C.enum(["form", "url"]).optional(),
    url: C.string().optional(),
    elicitation_id: C.string().optional(),
    requested_schema: C.record(C.string(), C.unknown()).optional(),
    title: C.string().optional().describe("Permission-display title from the MCP server's _meta['anthropic/permissionDisplay']. Mirrors can_use_tool.title so SDK consumers can render elicitation-driven permission prompts with structured headers instead of parsing `message`."),
    display_name: C.string().optional().describe("Short tool/server label from _meta['anthropic/permissionDisplay'].displayName. Mirrors can_use_tool.display_name."),
    description: C.string().optional().describe("Permission-display subtitle from _meta['anthropic/permissionDisplay'].description. Mirrors can_use_tool.description.")
  }).describe("Requests the SDK consumer to handle an MCP elicitation (user input request).")), E_c = ve(() => C.object({
    action: C.enum(["accept", "decline", "cancel"]),
    content: C.record(C.string(), C.unknown()).optional()
  }).describe("Response from the SDK consumer for an elicitation request.")), C_c = ve(() => C.object({
    subtype: C.literal("request_user_dialog"),
    dialog_kind: C.string().describe('Identifier for the dialog the host should render. Open string union — new kinds may be added without bumping the protocol; hosts must answer unrecognized kinds with {behavior: "cancelled"}.'),
    payload: C.record(C.string(), C.unknown()).describe("Dialog-specific data passed to the host renderer. Shape is defined per dialog_kind; the protocol transports it opaquely."),
    tool_use_id: C.string().optional()
  }).describe("Requests the SDK consumer to render a tool-driven blocking dialog and return the user choice. Used by tools that previously rendered Ink JSX via setToolJSX with an onDone callback.")), A_c = ve(() => C.object({
    behavior: C.enum(["completed", "cancelled"]),
    result: C.unknown().optional().describe("Dialog-specific result payload. Opaque to the protocol; the caller and dialog renderer agree on the shape per dialog_kind.")
  }).describe("Response from the SDK consumer for a request_user_dialog request.")), R_c = ve(() => C.object({
    subtype: C.literal("submit_feedback"),
    description: C.string(),
    surface: C.enum(["cli", "ccd", "ccr", "ide", "sdk", "cowork"]).optional().describe("Where the feedback flow was initiated. Stamped into the POST body and tengu_bug_report_* analytics so the triage pipeline can distinguish CCD/CCR/IDE/Cowork reports from terminal reports landing in the same claude_cli_feedback table. Defaults to 'sdk'.")
  }).describe("@internal Submits a /feedback report (description + current session transcript + sanitized error log) to api.anthropic.com/api/claude_cli_feedback using the CLI's auth and redaction. Runs the same getFeedbackUnavailableReason() policy checks as the terminal /feedback command — when feedback is disabled (3P provider, org policy, env kill-switch) the response carries unavailable_reason instead of an error.")), n4E = ve(() => C.object({
    feedback_id: C.string().nullable(),
    unavailable_reason: C.string().optional().describe("Human-readable reason /feedback is disabled in this session (3P provider, org policy, env var). When set, no submission was attempted."),
    is_zdr_org: C.boolean().optional(),
    failure_reason: C.string().optional(),
    status_code: C.number().optional(),
    ccshare_url: C.string().optional().describe("Internal share URL for the conversation. Only set in internal builds when the upload succeeded; absent otherwise.")
  }).describe("@internal Result of a submit_feedback request. feedback_id is set on success; otherwise one of unavailable_reason / failure_reason explains why.")), v_c = ve(() => C.object({
    subtype: C.literal("oauth_token_refresh")
  }).describe("@internal Request from the CLI subprocess to the SDK host for a fresh OAuth access token after a 401 with no local refresh token.")), w_c = ve(() => C.object({
    accessToken: C.string().nullable()
  }).describe("@internal Fresh OAuth access token returned by the SDK host getOAuthToken callback, or null when the host has no token available.")), k_c = ve(() => C.object({
    subtype: C.literal("host_auth_token_refresh")
  }).describe("@internal Request from the CLI subprocess to the SDK host for a fresh provider auth token after a 401 when the host owns the credential (Cowork 3P).")), H_c = ve(() => C.object({
    authToken: C.string().nullable()
  }).describe("@internal Fresh provider auth token returned by the SDK host getHostAuthToken callback, or null when the host has no token available.")), I_c = ve(() => C.object({
    subtype: C.literal("message_rated"),
    messageUuid: C.string().describe("UUID of the assistant message being rated."),
    sentiment: C.enum(["positive", "negative"]).describe("User rating: positive (thumbs up) or negative (thumbs down)."),
    surface: C.enum(["tool_use", "assistant_text"]).optional().describe("Which in-conversation surface the rating came from. If omitted, logged as tool_use."),
    cleared: C.boolean().optional().describe("True when the caller is un-rating a message (clicking the same control a second time).")
  }).describe("@internal Records a per-message thumbs up/down rating. Logs tengu_message_rated with the same shape as the in-conversation rating controls so Desktop / IDE callers can surface their own native thumbs UI.")), r4E = ve(() => C.object({}).describe("@internal Empty response for message_rated.")), o4E = ve(() => C.union([Vgc(), l_c(), c_c(), v_c(), k_c(), b_c(), C_c()]).describe("Control requests the agent loop originates and needs a reply to — the loop→client RPC slice of SDKControlRequestInner. The remaining members are client→loop commands (set/get/mcp/auth/etc).")), s4E = ve(() => C.union([Ggc(), Wgc(), Kgc(), zgc(), jgc(), Ygc(), Jgc(), Xgc(), Zgc(), e_c(), t_c(), n_c(), r_c(), Qgc(), o_c(), s_c(), i_c(), a_c(), u_c(), m_c(), d_c(), p_c(), f_c(), h_c(), g_c(), I_c(), __c(), y_c(), T_c(), S_c(), R_c()]).describe("Control requests a client sends to drive the loop — the client→loop command slice of SDKControlRequestInner. The remaining members are loop→client RPCs that block on a reply (see AgentOriginatedControlRequest).")), gYm = ve(() => C.union([Ggc(), Vgc(), Wgc(), Kgc(), zgc(), jgc(), Ygc(), Jgc(), Xgc(), Zgc(), e_c(), t_c(), n_c(), r_c(), Qgc(), l_c(), c_c(), o_c(), s_c(), i_c(), a_c(), u_c(), m_c(), d_c(), p_c(), f_c(), h_c(), g_c(), I_c(), v_c(), k_c(), __c(), y_c(), T_c(), S_c(), b_c(), C_c(), R_c()])), Drr = ve(() => C.object({
    type: C.literal("control_request"),
    request_id: C.string(),
    request: gYm()
  })), x_c = ve(() => C.array(C.lazy(() => Drr())).optional().describe("Permission requests still awaiting a response. Sent on the `initialize` response so a client joining an already-initialized session learns about in-flight prompts.")), D_c = ve(() => C.array(C.lazy(() => Drr())).optional().describe("request_user_dialog requests still awaiting a response. Sent on the `initialize` response (sibling of pending_permission_requests) so a client joining an already-initialized session can re-arm in-flight dialogs. Receivers must tolerate the same request_id also arriving as a live or replayed control_request frame and render it once.")), _Ym = ve(() => C.object({
    subtype: C.literal("success"),
    request_id: C.string(),
    response: C.record(C.string(), C.unknown()).optional(),
    pending_permission_requests: x_c(),
    pending_user_dialog_requests: D_c()
  })), yYm = ve(() => C.object({
    subtype: C.literal("error"),
    request_id: C.string(),
    error: C.string(),
    pending_permission_requests: x_c(),
    pending_user_dialog_requests: D_c()
  })), P_c = ve(() => C.object({
    type: C.literal("control_response"),
    response: C.union([_Ym(), yYm()])
  })), TYm = ve(() => C.object({
    type: C.literal("control_cancel_request"),
    request_id: C.string()
  }).describe("Cancels a currently open control request.")), O_c = ve(() => C.object({
    type: C.literal("keep_alive")
  }).describe("Keep-alive message to maintain WebSocket connection.")), SYm = ve(() => C.object({
    type: C.literal("update_environment_variables"),
    variables: C.record(C.string(), C.string()),
    request_id: C.string().optional()
  }).describe("Updates environment variables at runtime.")), i4E = ve(() => C.union([W$o(), U$o(), $$o(), q$o()]).describe("Observational messages the agent loop emits — fire-and-forget, no reply expected. The remaining StdoutMessage members are control-protocol traffic (requests the loop originates and needs a reply to, responses to client-originated requests, keep-alives). This sub-union is the target for QueryEvent convergence so a Transport-shaped REPL can consume events without filtering control noise.")), L_c = ve(() => C.union([W$o(), U$o(), $$o(), q$o(), P_c(), Drr(), TYm(), O_c()])), a4E = ve(() => C.union([B$o(), Ngc(), Drr(), P_c(), O_c(), SYm()]));
});

export {dYm,pYm,Wgc,mYm,$3E,Ggc,Vgc,Kgc,zgc,jgc,Ygc,Jgc,Xgc,q3E,Qgc,W3E,Zgc,e_c,G3E,t_c,ljt,xrr,qgc,V3E,n_c,K3E,fYm,hYm,z3E,r_c,j3E,o_c,Y3E,s_c,J3E,i_c,X3E,a_c,l_c,c_c,u_c,Q3E,d_c,Z3E,p_c,e4E,m_c,f_c,h_c,g_c,__c,y_c,T_c,S_c,t4E,b_c,E_c,C_c,A_c,R_c,n4E,v_c,w_c,k_c,H_c,I_c,r4E,o4E,s4E,gYm,Drr,x_c,D_c,_Ym,yYm,P_c,TYm,O_c,SYm,i4E,L_c,a4E,M_c};
