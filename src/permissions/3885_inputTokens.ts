// @ts-nocheck
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {TFn as NBn,DDa as T0a} from "../../vendor/m3883.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// @ts-nocheck
var zS6, QTO, yNw, cTO, NNw, dTO, VNw, vNw, lTO, nTO, iTO, ENw, S8q, $S6, rTO, sGK, oTO, aTO, sTO, YS6, tTO, eTO, C8q, SNw, CK_, v8q, HzO, normalizeShellToolName, nC_, aGK, CNw, buildModelRestrictedMessage, _zO, tGK, Yj, qzO, KzO, OzO, TzO, zzO, $zO, YzO, wzO, AzO, fzO, jzO, JzO, eGK, HRK, DzO, MzO, XzO, PzO, WzO, ZzO, GzO, RzO, LzO, hzO, kzO, yzO, NzO, VzO, vzO, EzO, SzO, CzO, bzO, IzO, xzO, uzO, mzO, pzO, _RK, BzO, UzO, FzO, gzO, QzO, czO, dzO, lzO, nzO, izO, rzO, ozO, azO, szO, tzO, ezO, H$O, _$O, q$O, K$O, O$O, T$O, bNw, iC_, b8q, I8q, qRK, z$O, KRK, INw, xNw, uNw, $$O, Y$O, w$O, SK, ORK, x8q, A$O, u8q, TRK, m8q, f$O, zRK, j$O, J$O, D$O, $RK, M$O, YRK, X$O, P$O, W$O, wRK, Z$O, G$O, R$O, L$O, p8q, B8q, h$O, mNw, pNw, BNw, UNw, FNw, gNw, U8q, CONTENT_CACHE_TTL_MS, turndownInstancePromise, CONTENT_CACHE_MAX_SIZE, QNw, cNw, dNw, lNw, nNw, iNw, V$O, getTurndownInstance, MAX_URL_LENGTH, MAX_CONTENT_LENGTH, FETCH_TIMEOUT_MS, DOMAIN_CHECK_TIMEOUT_MS, REDIRECT_STATUS_CODES, isRedirectOutcome, isHttpErrorOutcome, REMOTE_ENTRYPOINTS, ARTIFACT_HEAD_STYLE, MAX_TRACKED_UPLOAD_URLS, trackUploadedUrl, uploadArtifactContent, g$O, Q$O, c$O, d$O, l$O, n$O, i$O, r$O, rNw, oNw, aNw, sNw, tNw, eNw, HVw, _Vw, qVw, KVw, OVw, TVw, zVw, $Vw, YVw, wVw, AVw, fVw, F8q, rC_;
var g8q = b(() => {
  Xr();
  NBn();
  zS6 = Re(() => E.object({
    inputTokens: E.number(),
    outputTokens: E.number(),
    cacheReadInputTokens: E.number(),
    cacheCreationInputTokens: E.number(),
    webSearchRequests: E.number(),
    costUSD: E.number(),
    contextWindow: E.number(),
    maxOutputTokens: E.number()
  })), QTO = Re(() => E.literal("json_schema")), yNw = Re(() => E.object({
    type: QTO()
  })), cTO = Re(() => E.object({
    type: E.literal("json_schema"),
    schema: E.record(E.string(), E.unknown())
  })), NNw = Re(() => cTO()), dTO = Re(() => E.enum(["user", "project", "org", "temporary", "oauth"])), VNw = Re(() => E.enum(["local", "user", "project"]).describe("Config scope for settings.")), vNw = Re(() => E.literal("context-1m-2025-08-07")), lTO = Re(() => E.object({
    type: E.literal("adaptive"),
    display: E.enum(["summarized", "omitted"]).optional()
  }).describe("Claude decides when and how much to think (Opus 4.6+).")), nTO = Re(() => E.object({
    type: E.literal("enabled"),
    budgetTokens: E.number().optional(),
    display: E.enum(["summarized", "omitted"]).optional()
  }).describe("Fixed thinking token budget (older models)")), iTO = Re(() => E.object({
    type: E.literal("disabled")
  }).describe("No extended thinking")), ENw = Re(() => E.union([lTO(), nTO(), iTO()]).describe("Controls Claude's thinking/reasoning behavior. When set, takes precedence over the deprecated maxThinkingTokens.")), S8q = Re(() => E.literal("comms").optional().catch(undefined).describe("@internal Coordinator-mode role for this MCP server. 'comms' marks the server the coordinator uses to address the user; the coordinator tool filter lets comms-roled servers' tools through. Claude Code extension to .mcp.json \u2014 host-side config, not part of the MCP wire protocol. Coordinator mode is activated via the CLAUDE_CODE_COORDINATOR_MODE environment variable; this field only takes effect when coordinator mode is active.")), $S6 = Re(() => E.number().int().positive().optional().describe("Per-server tool-call timeout in milliseconds. Overrides the MCP_TOOL_TIMEOUT environment variable for this server. Hard wall-clock limit per call; progress notifications do not extend it. Values below 1000ms are ignored (falls through to MCP_TOOL_TIMEOUT or the default).")), rTO = Re(() => E.object({
    type: E.literal("stdio").optional(),
    command: E.string(),
    args: E.array(E.string()).optional(),
    env: E.record(E.string(), E.string()).optional(),
    timeout: $S6(),
    alwaysLoad: E.boolean().optional().describe("When true, all tools from this server are always included in the prompt and never deferred behind tool search. Equivalent to setting defer_loading: false on the API. Default: tools are deferred when tool search is enabled. As a side effect this also blocks startup until the server is connected (capped at the standard 5s connect timeout) even though MCP startup is otherwise non-blocking by default, since the tools must be present when the turn-1 prompt is built."),
    role: S8q()
  })), sGK = Re(() => E.object({
    name: E.string(),
    permission_policy: E.enum(["always_allow", "always_ask", "always_deny"]).optional(),
    org_max_permission: E.enum(["allow", "ask", "blocked"]).optional().describe("Org admin's per-tool ceiling. Drives the auto-mode isOrgAskCeiling gate so an admin 'ask' cap forces a user prompt even in auto mode.")
  }).describe("Per-tool permission policy carried on mcp_set_servers for remote servers.")), oTO = Re(() => E.object({
    type: E.literal("sse"),
    url: E.string(),
    headers: E.record(E.string(), E.string()).optional(),
    tools: E.array(sGK()).optional(),
    timeout: $S6(),
    alwaysLoad: E.boolean().optional().describe("When true, all tools from this server are always included in the prompt and never deferred behind tool search. Equivalent to setting defer_loading: false on the API. Default: tools are deferred when tool search is enabled. As a side effect this also blocks startup until the server is connected (capped at the standard 5s connect timeout) even though MCP startup is otherwise non-blocking by default, since the tools must be present when the turn-1 prompt is built."),
    role: S8q()
  })), aTO = Re(() => E.object({
    type: E.literal("http"),
    url: E.string(),
    headers: E.record(E.string(), E.string()).optional(),
    tools: E.array(sGK()).optional(),
    timeout: $S6(),
    alwaysLoad: E.boolean().optional().describe("When true, all tools from this server are always included in the prompt and never deferred behind tool search. Equivalent to setting defer_loading: false on the API. Default: tools are deferred when tool search is enabled. As a side effect this also blocks startup until the server is connected (capped at the standard 5s connect timeout) even though MCP startup is otherwise non-blocking by default, since the tools must be present when the turn-1 prompt is built."),
    role: S8q()
  })), sTO = Re(() => E.object({
    type: E.literal("sdk"),
    name: E.string()
  })), YS6 = Re(() => E.union([rTO(), oTO(), aTO(), sTO()])), tTO = Re(() => E.object({
    type: E.literal("claudeai-proxy"),
    url: E.string(),
    id: E.string(),
    timeout: $S6()
  })), eTO = Re(() => E.union([YS6(), tTO()])), C8q = Re(() => E.object({
    name: E.string().describe("Server name as configured"),
    status: E.enum(["connected", "failed", "needs-auth", "pending", "disabled"]).describe("Current connection status"),
    serverInfo: E.object({
      name: E.string(),
      version: E.string()
    }).optional().describe("Server information (available when connected)"),
    error: E.string().optional().describe("Error message (available when status is 'failed')"),
    config: eTO().optional().describe("Server configuration (includes URL for HTTP/SSE servers)"),
    scope: E.string().optional().describe("Configuration scope (e.g., project, user, local, claudeai, managed)"),
    tools: E.array(E.object({
      name: E.string(),
      description: E.string().optional(),
      annotations: E.object({
        readOnly: E.boolean().optional(),
        destructive: E.boolean().optional(),
        openWorld: E.boolean().optional()
      }).optional()
    })).optional().describe("Tools provided by this server (available when connected)"),
    capabilities: E.object({
      experimental: E.record(E.string(), E.unknown()).optional()
    }).optional().describe("@internal Server capabilities (available when connected). experimental['claude/channel'] is only present if the server's plugin is on the approved channels allowlist \u2014 use its presence to decide whether to show an Enable-channel prompt.")
  }).describe("Status information for an MCP server connection.")), SNw = Re(() => E.object({
    added: E.array(E.string()).describe("Names of servers that were added"),
    removed: E.array(E.string()).describe("Names of servers that were removed"),
    errors: E.record(E.string(), E.string()).describe("Map of server names to error messages for servers that failed to connect")
  }).describe("Result of a setMcpServers operation.")), CK_ = Re(() => E.enum(["userSettings", "projectSettings", "localSettings", "session", "cliArg"])), v8q = Re(() => E.enum(["allow", "deny", "ask"])), HzO = Re(() => E.enum(["allow", "deny", "ask", "defer"])), normalizeShellToolName = Re(() => E.object({
    toolName: E.string(),
    ruleContent: E.string().optional()
  })), nC_ = Re(() => E.discriminatedUnion("type", [E.object({
    type: E.literal("addRules"),
    rules: E.array(normalizeShellToolName()),
    behavior: v8q(),
    destination: CK_()
  }), E.object({
    type: E.literal("replaceRules"),
    rules: E.array(normalizeShellToolName()),
    behavior: v8q(),
    destination: CK_()
  }), E.object({
    type: E.literal("removeRules"),
    rules: E.array(normalizeShellToolName()),
    behavior: v8q(),
    destination: CK_()
  }), E.object({
    type: E.literal("setMode"),
    mode: E.lazy(() => buildModelRestrictedMessage()),
    destination: CK_()
  }), E.object({
    type: E.literal("addDirectories"),
    directories: E.array(E.string()),
    destination: CK_()
  }), E.object({
    type: E.literal("removeDirectories"),
    directories: E.array(E.string()),
    destination: CK_()
  })])), aGK = Re(() => E.enum(["user_temporary", "user_permanent", "user_reject"]).describe("Classification of this permission decision for telemetry. SDK hosts that prompt users (desktop apps, IDEs) should set this to reflect what actually happened: user_temporary for allow-once, user_permanent for always-allow (both the click and later cache hits), user_reject for deny. If unset, the CLI infers conservatively (temporary for allow, reject for deny). The vocabulary matches tool_decision OTel events (monitoring-usage docs).")), CNw = Re(() => E.union([E.object({
    behavior: E.literal("allow"),
    updatedInput: E.record(E.string(), E.unknown()).optional(),
    updatedPermissions: E.array(nC_()).optional(),
    toolUseID: E.string().optional(),
    decisionClassification: aGK().optional()
  }), E.object({
    behavior: E.literal("deny"),
    message: E.string(),
    interrupt: E.boolean().optional(),
    toolUseID: E.string().optional(),
    decisionClassification: aGK().optional()
  })])), buildModelRestrictedMessage = Re(() => E.enum(["default", "acceptEdits", "bypassPermissions", "plan", "dontAsk", "auto"]).describe("Permission mode for controlling how tool executions are handled. 'default' - Standard behavior, prompts for dangerous operations. 'acceptEdits' - Auto-accept file edit operations. 'bypassPermissions' - Bypass all permission checks (requires allowDangerouslySkipPermissions). 'plan' - Planning mode, no actual tool execution. 'dontAsk' - Don't prompt for permissions, deny if not pre-approved. 'auto' - Use a model classifier to approve/deny permission prompts.")), _zO = ["PreToolUse", "PostToolUse", "PostToolUseFailure", "PostToolBatch", "Notification", "UserPromptSubmit", "UserPromptExpansion", "SessionStart", "SessionEnd", "Stop", "StopFailure", "SubagentStart", "SubagentStop", "PreCompact", "PostCompact", "PermissionRequest", "PermissionDenied", "Setup", "TeammateIdle", "TaskCreated", "TaskCompleted", "Elicitation", "ElicitationResult", "ConfigChange", "WorktreeCreate", "WorktreeRemove", "InstructionsLoaded", "CwdChanged", "FileChanged", "MessageDisplay"], tGK = Re(() => E.enum(_zO)), Yj = Re(() => E.object({
    session_id: E.string(),
    transcript_path: E.string(),
    cwd: E.string(),
    permission_mode: E.string().optional(),
    agent_id: E.string().optional().describe("Subagent identifier. Present only when the hook fires from within a subagent (e.g., a tool called by an AgentTool worker). Absent for the main thread, even in --agent sessions. Use this field (not agent_type) to distinguish subagent calls from main-thread calls."),
    agent_type: E.string().optional().describe('Agent type name (e.g., "general-purpose", "code-reviewer"). Present when the hook fires from within a subagent (alongside agent_id), or on the main thread of a session started with --agent (without agent_id).'),
    effort: E.object({
      level: E.string().describe('Active effort level for the current turn (e.g., "low", "medium", "high", "xhigh", "max"), after any silent downgrade for the selected model. Also exposed to hook commands and Bash as the CLAUDE_EFFORT env var.')
    }).optional().describe("Reasoning effort applied to the current turn. Same shape as StatusLineCommandInput.effort. Present for hooks that fire within a tool-use context (PreToolUse, PostToolUse, Stop, SubagentStop, etc.) on a model that supports the effort parameter; absent for session-lifecycle hooks and models without effort support.")
  })), qzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PreToolUse"),
    tool_name: E.string(),
    tool_input: E.unknown(),
    tool_use_id: E.string()
  }))), KzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PermissionRequest"),
    tool_name: E.string(),
    tool_input: E.unknown(),
    permission_suggestions: E.array(nC_()).optional()
  }))), OzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PostToolUse"),
    tool_name: E.string(),
    tool_input: E.unknown(),
    tool_response: E.unknown(),
    tool_use_id: E.string(),
    duration_ms: E.number().optional().describe("Tool execution time in milliseconds. Excludes permission-prompt and hook time.")
  }))), TzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PostToolUseFailure"),
    tool_name: E.string(),
    tool_input: E.unknown(),
    tool_use_id: E.string(),
    error: E.string(),
    is_interrupt: E.boolean().optional(),
    duration_ms: E.number().optional().describe("Tool execution time in milliseconds. Excludes permission-prompt and hook time.")
  }))), zzO = Re(() => E.object({
    tool_name: E.string(),
    tool_input: E.unknown(),
    tool_use_id: E.string(),
    tool_response: E.unknown().optional()
  })), $zO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PostToolBatch"),
    tool_calls: E.array(zzO())
  })).describe("Hook input for the PostToolBatch event. Fired once after every tool call in a batch has resolved, before the next model request. PostToolUse fires per-tool and may run concurrently for parallel tool calls; PostToolBatch fires exactly once with the full batch.")), YzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PermissionDenied"),
    tool_name: E.string(),
    tool_input: E.unknown(),
    tool_use_id: E.string(),
    reason: E.string()
  }))), wzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("Notification"),
    message: E.string(),
    title: E.string().optional(),
    notification_type: E.string()
  }))), AzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("UserPromptSubmit"),
    prompt: E.string(),
    session_title: E.string().optional()
  }))), fzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("UserPromptExpansion"),
    expansion_type: E.enum(["slash_command", "mcp_prompt"]),
    command_name: E.string(),
    command_args: E.string(),
    command_source: E.string().optional(),
    prompt: E.string()
  }))), jzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("SessionStart"),
    source: E.enum(["startup", "resume", "clear", "compact"]),
    agent_type: E.string().optional(),
    model: E.string().optional(),
    session_title: E.string().optional()
  }))), JzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("Setup"),
    trigger: E.enum(["init", "maintenance"])
  }))), eGK = Re(() => E.object({
    id: E.string(),
    type: E.string().describe("Friendly task-type label (e.g. 'shell', 'subagent', 'monitor', 'workflow'). Falls back to the raw discriminant for unknown types."),
    status: E.string(),
    description: E.string().describe("Free-text description. Capped at 1000 chars; clipped values append " + 'an in-string "\u2026 [+N chars]" marker.'),
    command: E.string().optional().describe("Shell command line. Only present for 'shell' tasks. Capped at 1000 " + 'chars with the same "\u2026 [+N chars]" marker.'),
    agent_type: E.string().optional().describe("Subagent type name. Only present for 'subagent' tasks."),
    server: E.string().optional().describe("MCP server name. Only present for 'monitor' / 'MCP task' tasks."),
    tool: E.string().optional().describe("MCP tool name. Only present for 'monitor' / 'MCP task' tasks."),
    name: E.string().optional().describe("Workflow name. Only present for 'workflow' tasks.")
  })), HRK = Re(() => E.object({
    id: E.string(),
    schedule: E.string().describe('Cron expression, e.g. "0 9 * * 1-5".'),
    recurring: E.boolean().describe("False for one-shot wakeups whose cron field encodes a single fire time; true for tasks that re-fire on every match."),
    prompt: E.string().describe("Prompt text submitted when the cron fires. Capped at 1000 chars; " + 'clipped values append an in-string "\u2026 [+N chars]" marker.')
  })), DzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("Stop"),
    stop_hook_active: E.boolean(),
    last_assistant_message: E.string().optional().describe("Text content of the last assistant message before stopping. Avoids the need to read and parse the transcript file."),
    background_tasks: E.array(eGK()).optional().describe('In-flight background work (running/pending + backgrounded) registered in this session. Lets hooks distinguish "session is done" from "session is paused waiting for background work to wake it". Empty array when nothing is in flight.'),
    session_crons: E.array(HRK()).optional().describe("Session-scoped cron tasks (CronCreate, ScheduleWakeup, /loop) that will wake this session later. Empty array when none are scheduled.")
  }))), MzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("StopFailure"),
    error: x8q(),
    error_details: E.string().optional(),
    last_assistant_message: E.string().optional()
  }))), XzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("SubagentStart"),
    agent_id: E.string(),
    agent_type: E.string()
  }))), PzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("SubagentStop"),
    stop_hook_active: E.boolean(),
    agent_id: E.string(),
    agent_transcript_path: E.string(),
    agent_type: E.string(),
    last_assistant_message: E.string().optional().describe("Text content of the last assistant message before stopping. Avoids the need to read and parse the transcript file."),
    background_tasks: E.array(eGK()).optional().describe('In-flight background work (running/pending + backgrounded) registered in this session. Lets hooks distinguish "session is done" from "session is paused waiting for background work to wake it". Empty array when nothing is in flight.'),
    session_crons: E.array(HRK()).optional().describe("Session-scoped cron tasks (CronCreate, ScheduleWakeup, /loop) that will wake this session later. Empty array when none are scheduled.")
  }))), WzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PreCompact"),
    trigger: E.enum(["manual", "auto"]),
    custom_instructions: E.string().nullable()
  }))), ZzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("PostCompact"),
    trigger: E.enum(["manual", "auto"]),
    compact_summary: E.string().describe("The conversation summary produced by compaction")
  }))), GzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("TeammateIdle"),
    teammate_name: E.string(),
    team_name: E.string().describe("@deprecated Sessions have a single implicit team; this carries the session-derived team name and will be removed in a future release.")
  }))), RzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("TaskCreated"),
    task_id: E.string(),
    task_subject: E.string(),
    task_description: E.string().optional(),
    teammate_name: E.string().optional(),
    team_name: E.string().optional().describe("@deprecated Sessions have a single implicit team; this carries the session-derived team name and will be removed in a future release.")
  }))), LzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("TaskCompleted"),
    task_id: E.string(),
    task_subject: E.string(),
    task_description: E.string().optional(),
    teammate_name: E.string().optional(),
    team_name: E.string().optional().describe("@deprecated Sessions have a single implicit team; this carries the session-derived team name and will be removed in a future release.")
  }))), hzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("Elicitation"),
    mcp_server_name: E.string(),
    message: E.string(),
    mode: E.enum(["form", "url"]).optional(),
    url: E.string().optional(),
    elicitation_id: E.string().optional(),
    requested_schema: E.record(E.string(), E.unknown()).optional()
  })).describe("Hook input for the Elicitation event. Fired when an MCP server requests user input. Hooks can auto-respond (accept/decline) instead of showing the dialog.")), kzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("ElicitationResult"),
    mcp_server_name: E.string(),
    elicitation_id: E.string().optional(),
    mode: E.enum(["form", "url"]).optional(),
    action: E.enum(["accept", "decline", "cancel"]),
    content: E.record(E.string(), E.unknown()).optional()
  })).describe("Hook input for the ElicitationResult event. Fired after the user responds to an MCP elicitation. Hooks can observe or override the response before it is sent to the server.")), yzO = ["user_settings", "project_settings", "local_settings", "policy_settings", "skills"], NzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("ConfigChange"),
    source: E.enum(yzO),
    file_path: E.string().optional()
  }))), VzO = ["session_start", "nested_traversal", "path_glob_match", "include", "compact"], vzO = ["User", "Project", "Local", "Managed"], EzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("InstructionsLoaded"),
    file_path: E.string(),
    memory_type: E.enum(vzO),
    load_reason: E.enum(VzO),
    globs: E.array(E.string()).optional(),
    trigger_file_path: E.string().optional(),
    parent_file_path: E.string().optional()
  }))), SzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("WorktreeCreate"),
    name: E.string()
  }))), CzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("WorktreeRemove"),
    worktree_path: E.string()
  }))), bzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("CwdChanged"),
    old_cwd: E.string(),
    new_cwd: E.string()
  }))), IzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("FileChanged"),
    file_path: E.string(),
    event: E.enum(["change", "add", "unlink"])
  }))), xzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("MessageDisplay"),
    turn_id: E.string().describe("UUID of the current turn."),
    message_id: E.string().describe("UUID of the assistant message being displayed. Stable across " + "every flush of the same message. Not the API msg_\u2026 id."),
    index: E.number().int().describe("Zero-based index of this delta within the message. Increments by one per flush."),
    final: E.boolean().describe("True on the message's last flush. Exactly one flush per message has it."),
    delta: E.string().describe("The newly completed lines since the prior flush. Always whole lines, except on the final flush which may end mid-line. The delta of the final flush is empty when the message ends on a newline; treat final as the end-of-message signal regardless.")
  })).describe("Hook input for the MessageDisplay event. Fired with each batch of newly completed lines while an assistant message streams. Display-only: the stored message and what the model sees are untouched.")), uzO = ["clear", "resume", "logout", "prompt_input_exit", "other", "bypass_permissions_disabled"], mzO = Re(() => E.enum(uzO)), pzO = Re(() => Yj().and(E.object({
    hook_event_name: E.literal("SessionEnd"),
    reason: mzO()
  }))), _RK = Re(() => E.union([qzO(), OzO(), TzO(), $zO(), YzO(), wzO(), AzO(), fzO(), jzO(), pzO(), DzO(), MzO(), XzO(), PzO(), WzO(), ZzO(), KzO(), JzO(), GzO(), RzO(), LzO(), hzO(), kzO(), NzO(), EzO(), SzO(), CzO(), bzO(), IzO(), xzO()])), BzO = Re(() => E.object({
    async: E.literal(true),
    asyncTimeout: E.number().optional()
  })), UzO = Re(() => E.object({
    hookEventName: E.literal("PreToolUse"),
    permissionDecision: HzO().optional(),
    permissionDecisionReason: E.string().optional(),
    updatedInput: E.record(E.string(), E.unknown()).optional(),
    additionalContext: E.string().optional()
  })), FzO = Re(() => E.object({
    hookEventName: E.literal("UserPromptSubmit"),
    additionalContext: E.string().optional(),
    sessionTitle: E.string().optional(),
    suppressOriginalPrompt: E.boolean().optional().describe('When decision is "block", omit the original prompt from the block message')
  })), gzO = Re(() => E.object({
    hookEventName: E.literal("UserPromptExpansion"),
    additionalContext: E.string().optional()
  })), QzO = Re(() => E.object({
    hookEventName: E.literal("SessionStart"),
    additionalContext: E.string().optional(),
    initialUserMessage: E.string().optional(),
    sessionTitle: E.string().optional(),
    watchPaths: E.array(E.string()).optional(),
    reloadSkills: E.boolean().optional().describe("Re-scan skill and command directories after SessionStart hooks complete, so skills installed by the hook are available in the same session")
  })), czO = Re(() => E.object({
    hookEventName: E.literal("Setup"),
    additionalContext: E.string().optional()
  })), dzO = Re(() => E.object({
    hookEventName: E.literal("SubagentStart"),
    additionalContext: E.string().optional()
  })), lzO = Re(() => E.object({
    hookEventName: E.literal("PostToolUse"),
    additionalContext: E.string().optional(),
    updatedToolOutput: E.unknown().optional().describe("Replaces the tool output before it is sent to the model"),
    updatedMCPToolOutput: E.unknown().optional().describe("Replaces the output for MCP tools only. Prefer updatedToolOutput, which works for all tools")
  })), nzO = Re(() => E.object({
    hookEventName: E.literal("PostToolBatch"),
    additionalContext: E.string().optional()
  })), izO = Re(() => E.object({
    hookEventName: E.literal("PostToolUseFailure"),
    additionalContext: E.string().optional()
  })), rzO = Re(() => E.object({
    hookEventName: E.literal("Stop"),
    additionalContext: E.string().optional()
  }).describe("Hook-specific output for the Stop event. additionalContext is non-error feedback delivered to the model; the conversation continues so the model can act on it.")), ozO = Re(() => E.object({
    hookEventName: E.literal("SubagentStop"),
    additionalContext: E.string().optional()
  }).describe("Hook-specific output for the SubagentStop event. additionalContext is non-error feedback delivered to the subagent; the subagent continues so it can act on it.")), azO = Re(() => E.object({
    hookEventName: E.literal("PermissionDenied"),
    retry: E.boolean().optional()
  })), szO = Re(() => E.object({
    hookEventName: E.literal("Notification"),
    additionalContext: E.string().optional()
  })), tzO = Re(() => E.object({
    hookEventName: E.literal("PermissionRequest"),
    decision: E.union([E.object({
      behavior: E.literal("allow"),
      updatedInput: E.record(E.string(), E.unknown()).optional(),
      updatedPermissions: E.array(nC_()).optional()
    }), E.object({
      behavior: E.literal("deny"),
      message: E.string().optional(),
      interrupt: E.boolean().optional()
    })])
  })), ezO = Re(() => E.object({
    hookEventName: E.literal("CwdChanged"),
    watchPaths: E.array(E.string()).optional()
  })), H$O = Re(() => E.object({
    hookEventName: E.literal("FileChanged"),
    watchPaths: E.array(E.string()).optional()
  })), _$O = Re(() => E.object({
    hookEventName: E.literal("MessageDisplay"),
    displayContent: E.string().optional().describe("Text displayed in place of the delta. Omit (or return the delta unchanged) to display the original.")
  }).describe("Hook-specific output for the MessageDisplay event. Display-only: replaces the delta on screen without changing the stored message.")), q$O = Re(() => E.object({
    continue: E.boolean().optional(),
    suppressOutput: E.boolean().optional(),
    stopReason: E.string().optional(),
    decision: E.enum(["approve", "block"]).optional(),
    systemMessage: E.string().optional(),
    terminalSequence: E.string().optional().describe("A terminal escape sequence (e.g. OSC 9 / OSC 777 desktop-notification) for Claude Code to emit on your behalf. Only notification/title OSCs (0, 1, 2, 9, 99, 777) and BEL are permitted; anything else is dropped."),
    reason: E.string().optional(),
    hookSpecificOutput: E.union([UzO(), FzO(), gzO(), QzO(), czO(), dzO(), lzO(), izO(), nzO(), rzO(), ozO(), azO(), szO(), tzO(), K$O(), O$O(), ezO(), H$O(), T$O(), _$O()]).optional()
  })), K$O = Re(() => E.object({
    hookEventName: E.literal("Elicitation"),
    action: E.enum(["accept", "decline", "cancel"]).optional(),
    content: E.record(E.string(), E.unknown()).optional()
  }).describe("Hook-specific output for the Elicitation event. Return this to programmatically accept or decline an MCP elicitation request.")), O$O = Re(() => E.object({
    hookEventName: E.literal("ElicitationResult"),
    action: E.enum(["accept", "decline", "cancel"]).optional(),
    content: E.record(E.string(), E.unknown()).optional()
  }).describe("Hook-specific output for the ElicitationResult event. Return this to override the action or content before the response is sent to the MCP server.")), T$O = Re(() => E.object({
    hookEventName: E.literal("WorktreeCreate"),
    worktreePath: E.string()
  }).describe("Hook-specific output for the WorktreeCreate event. Provides the absolute path to the created worktree directory. Command hooks print the path on stdout instead.")), bNw = Re(() => E.union([BzO(), q$O()])), iC_ = Re(() => E.object({
    name: E.string().describe("Skill name (without the leading slash)"),
    description: E.string().describe("Description of what the skill does"),
    argumentHint: E.string().describe('Hint for skill arguments (e.g., "<file>")'),
    aliases: E.array(E.string()).optional().describe("Alternate names that resolve to this command (e.g., /cost and /stats both resolve to /usage)")
  }).describe("Information about an available skill (invoked via /command syntax).")), b8q = Re(() => E.object({
    name: E.string().describe('Agent type identifier (e.g., "Explore")'),
    description: E.string().describe("Description of when to use this agent"),
    model: E.string().optional().describe("Model alias this agent uses. If omitted, inherits the parent's model")
  }).describe("Information about an available subagent that can be invoked via the Task tool.")), I8q = Re(() => E.object({
    value: E.string().describe("Model identifier to use in API calls"),
    displayName: E.string().describe("Human-readable display name"),
    description: E.string().describe("Description of the model's capabilities"),
    supportsEffort: E.boolean().optional().describe("Whether this model supports effort levels"),
    supportedEffortLevels: E.array(E.enum(["low", "medium", "high", "xhigh", "max"])).optional().describe("Available effort levels for this model"),
    supportsAdaptiveThinking: E.boolean().optional().describe("Whether this model supports adaptive thinking (Claude decides when and how much to think)"),
    supportsFastMode: E.boolean().optional().describe("Whether this model supports fast mode"),
    supportsAutoMode: E.boolean().optional().describe("Whether this model supports auto mode"),
    disabled: E.boolean().optional().describe("@internal Model is visible but not selectable (e.g. a model the org's Zero Data Retention setting excludes). The human-readable reason is folded into `description`; a structured disabledReason field is the extension point if a consumer ever needs the reason separately.")
  }).describe("Information about an available model.")), qRK = Re(() => E.object({
    email: E.string().optional(),
    organization: E.string().optional(),
    subscriptionType: E.string().optional(),
    tokenSource: E.string().optional(),
    apiKeySource: E.string().optional(),
    apiProvider: E.enum(["firstParty", "bedrock", "vertex", "foundry", "anthropicAws", "mantle", "gateway"]).optional().describe('Active API backend. Anthropic OAuth login only applies when "firstParty"; for 3P providers the other fields are absent and auth is external (AWS creds, gcloud ADC, etc.). "gateway" means the CLI is authenticated against an enterprise gateway.')
  }).describe("Information about the logged in user's account.")), z$O = Re(() => E.union([E.string(), E.record(E.string(), YS6())])), KRK = Re(() => E.object({
    description: E.string().describe("Natural language description of when to use this agent"),
    tools: E.array(E.string()).optional().describe("Array of allowed tool names. If omitted, inherits all tools from parent. Note: passing 'Skill' here is deprecated \u2014 use the `skills` field instead."),
    disallowedTools: E.array(E.string()).optional().describe("Array of tool names to explicitly disallow for this agent. MCP server-level specs (mcp__server, mcp__server__*, mcp__*) remove every tool from the named server (or all MCP tools)."),
    prompt: E.string().describe("The agent's system prompt"),
    model: E.string().optional().describe("Model alias (e.g. 'fable', 'opus', 'sonnet', 'haiku') or full model ID (e.g. 'claude-fable-5'). If omitted or 'inherit', uses the main model"),
    mcpServers: E.array(z$O()).optional(),
    criticalSystemReminder_EXPERIMENTAL: E.string().optional().describe("Experimental: Critical reminder added to system prompt"),
    skills: E.array(E.string()).optional().describe("Array of skill names to preload into the agent context"),
    initialPrompt: E.string().optional().describe("Auto-submitted as the first user turn when this agent is the main thread agent. Slash commands are processed. Prepended to any user-provided prompt."),
    maxTurns: E.number().int().positive().optional().describe("Maximum number of agentic turns (API round-trips) before stopping"),
    background: E.boolean().optional().describe("Run this agent as a background task (non-blocking, fire-and-forget) when invoked"),
    memory: E.enum(["user", "project", "local"]).optional().describe("Scope for auto-loading agent memory files. 'user' - ~/.claude/agent-memory/<agentType>/, 'project' - .claude/agent-memory/<agentType>/, 'local' - .claude/agent-memory-local/<agentType>/"),
    effort: E.union([E.enum(["low", "medium", "high", "xhigh", "max"]), E.number().int()]).optional().describe("Reasoning effort level for this agent. Either a named level or an integer"),
    permissionMode: buildModelRestrictedMessage().optional().describe("Permission mode controlling how tool executions are handled")
  }).describe("Definition for a custom subagent that can be invoked via the Agent tool.")), INw = Re(() => E.enum(["user", "project", "local"]).describe("Source for loading filesystem-based settings. 'user' - Global user settings (~/.claude/settings.json). 'project' - Project settings (.claude/settings.json). 'local' - Local settings (.claude/settings.local.json).")), xNw = Re(() => E.object({
    type: E.literal("local").describe("Plugin type. Currently only 'local' is supported"),
    path: E.string().describe("Absolute or relative path to the plugin directory"),
    skipMcpDiscovery: E.boolean().optional().describe("When true, the engine loads skills/hooks/agents/commands from this plugin but does NOT read its .mcp.json or manifest mcpServers. Use when the SDK host owns this plugin's MCP connections.")
  }).describe("Configuration for loading a plugin.")), uNw = Re(() => E.object({
    canRewind: E.boolean(),
    error: E.string().optional(),
    filesChanged: E.array(E.string()).optional(),
    insertions: E.number().optional(),
    deletions: E.number().optional()
  }).describe("Result of a rewindFiles operation.")), $$O = Re(() => E.unknown()), Y$O = Re(() => E.unknown()), w$O = Re(() => E.unknown()), SK = Re(() => E.string()), ORK = Re(() => E.unknown()), x8q = Re(() => E.enum(["authentication_failed", "oauth_org_not_allowed", "billing_error", "rate_limit", "overloaded", "invalid_request", "model_not_found", "server_error", "unknown", "max_output_tokens"])), A$O = Re(() => E.union([E.literal("compacting"), E.literal("requesting"), E.null()])), u8q = Re(() => E.discriminatedUnion("kind", [E.object({
    kind: E.literal("human")
  }), E.object({
    kind: E.literal("channel"),
    server: E.string()
  }), E.object({
    kind: E.literal("peer"),
    from: E.string(),
    name: E.string().optional(),
    inbound_origin: E.string().optional().describe("@internal Server-asserted ingest path of the demoted delivery, copied at classification from the message-level `inbound_origin`."),
    senderTaskId: E.string().optional().describe("Task id of the in-process background subagent that sent this message, stamped by the harness from the sending loop (never from tool input). Absent for cross-session peers.")
  }), E.object({
    kind: E.literal("task-notification")
  }), E.object({
    kind: E.literal("coordinator")
  }), E.object({
    kind: E.literal("auto-continuation")
  })]).describe("Provenance of a user-role message (peer session, team lead, channel). Absent or `human` means keyboard input from the user.")), TRK = Re(() => E.object({
    type: E.literal("user"),
    message: $$O(),
    parent_tool_use_id: E.string().nullable(),
    isSynthetic: E.boolean().optional(),
    tool_use_result: E.unknown().optional(),
    priority: E.enum(["now", "next", "later"]).optional(),
    origin: u8q().optional(),
    client_platform: E.string().optional().describe("@internal The `anthropic-client-platform` value of the client that sent this message (e.g. `ios`, `android`, `web_claude_ai`, `desktop_app`). Injected server-side by CCR ingress from the request header."),
    inbound_origin: E.string().optional().describe("@internal Server-asserted ingest path that produced this message. Not settable by clients."),
    shouldQuery: E.boolean().optional().describe("When false, the message is appended to the transcript without triggering an assistant turn. It will be merged into the next user message that does query."),
    timestamp: E.string().optional().describe("ISO timestamp when the message was created on the originating process. Older emitters omit it; consumers should fall back to receive time."),
    is_meta: E.literal(true).optional().describe("@internal True when the message was synthesized by the loop (not user keyboard input). From internal UserMessage.isMeta."),
    is_visible_in_transcript_only: E.literal(true).optional().describe("@internal True when the message is stored in the transcript but not rendered in the live UI."),
    is_virtual: E.literal(true).optional().describe("@internal Display-only: rendered in the UI but filtered before API send."),
    is_compact_summary: E.literal(true).optional().describe("@internal True when this user message is a compact-summary synthetic message."),
    summarize_metadata: E.object({
      messages_summarized: E.number(),
      user_context: E.string().optional(),
      direction: E.enum(["from", "up_to"]).optional()
    }).optional().describe('@internal Metadata for "Summarize from here" / "Summarize up to here" summaries (from internal UserMessage.summarizeMetadata).'),
    mcp_meta: E.object({
      _meta: E.record(E.string(), E.unknown()).optional(),
      structured_content: E.record(E.string(), E.unknown()).optional()
    }).optional().describe("@internal MCP protocol metadata passed through to SDK consumers, never sent to the model (from internal UserMessage.mcpMeta)."),
    source_tool_use_id: E.string().optional().describe("@internal When this message was generated by a tool via newMessages, links it to that tool_use id."),
    source_tool_assistant_uuid: E.string().optional().describe("@internal For tool_result messages: UUID of the assistant message containing the matching tool_use block. Used for parentUuid assignment in transcript."),
    image_paste_ids: E.array(E.number()).optional().describe("@internal Paste IDs for images in this message, in order of appearance. REPL-local state \u2014 candidate for surface-side if daemon has no use for it."),
    plan_content: E.string().optional().describe("@internal Plan to implement (cleared-context flow). When set, the message is rendered with plan styling."),
    permission_mode: buildModelRestrictedMessage().optional().describe("@internal Permission mode active when this message was sent (for rewind restoration)."),
    interrupted_message_id: E.string().optional().describe("@internal For [Request interrupted by user] markers only: the API msg_* id that Esc cancelled.")
  })), m8q = Re(() => TRK().extend({
    uuid: SK().optional(),
    session_id: E.string().optional(),
    subagent_type: E.string().optional().describe("Subagent type that produced this message."),
    task_description: E.string().optional().describe("Description of the subagent task that produced this message.")
  })), f$O = Re(() => TRK().extend({
    uuid: SK(),
    session_id: E.string(),
    isReplay: E.literal(true),
    file_attachments: E.array(E.unknown()).optional()
  })), zRK = Re(() => E.object({
    type: E.literal("bash_command"),
    command: E.string().describe("Shell command to execute verbatim via a one-shot `/bin/sh -c` (or `pwsh`) subprocess, bypassing the model. Trust model matches the local TUI `!cmd` path (no sandbox, no per-command prompt); unlike `!cmd`, output is not appended to the conversation transcript and there is no persistent shell state across calls."),
    cwd: E.string().optional().describe("Working directory for the command. Falls back to the session cwd when omitted."),
    uuid: SK().optional(),
    session_id: E.string().optional()
  }).describe("@internal A user-initiated shell command dispatched to a one-shot shell subprocess with no model turn. Input-only \u2014 sent by CCR clients that surface a dedicated terminal UI; never emitted on stdout.")), j$O = Re(() => E.object({
    status: E.enum(["allowed", "allowed_warning", "rejected"]),
    resetsAt: E.number().optional(),
    rateLimitType: E.enum(["five_hour", "seven_day", "seven_day_opus", "seven_day_sonnet", "overage"]).optional(),
    utilization: E.number().optional(),
    overageStatus: E.enum(["allowed", "allowed_warning", "rejected"]).optional(),
    overageResetsAt: E.number().optional(),
    overageDisabledReason: E.enum(["overage_not_provisioned", "org_level_disabled", "org_level_disabled_until", "out_of_credits", "seat_tier_level_disabled", "member_level_disabled", "seat_tier_zero_credit_limit", "group_zero_credit_limit", "member_zero_credit_limit", "org_service_level_disabled", "no_limits_configured", "fetch_error", "unknown"]).optional(),
    isUsingOverage: E.boolean().optional(),
    overageInUse: E.boolean().optional(),
    surpassedThreshold: E.number().optional(),
    overagePeriodMonthly: E.object({
      utilization: E.number()
    }).optional().describe("@internal Monthly service spend-cap telemetry for the Claude-in-Slack surface (CLAUDE_IN_SLACK_V2): utilization is fraction-of-cap."),
    errorCode: E.enum(["credits_required"]).optional(),
    canUserPurchaseCredits: E.boolean().optional(),
    hasChargeableSavedPaymentMethod: E.boolean().optional()
  }).describe("Rate limit information for claude.ai subscription users.")), J$O = Re(() => E.object({
    type: E.literal("assistant"),
    message: Y$O(),
    parent_tool_use_id: E.string().nullable(),
    error: x8q().optional(),
    uuid: SK(),
    session_id: E.string(),
    request_id: E.string().optional(),
    supersedes: E.array(SK()).optional().describe("Wire uuids of previously-delivered messages that this message replaces (refusal-fallback supersede). The list can include tombstoned tool_result frames from the refused leg, not only assistant frames. Evict the named messages on arrival and treat this frame as their canonical replacement. Idempotent with the end-of-turn model_refusal_fallback notice, whose retracted_message_uuids remains the complete audit record for the turn."),
    subagent_type: E.string().optional().describe("Subagent type that produced this message."),
    task_description: E.string().optional().describe("Description of the subagent task that produced this message."),
    tool_use_meta: E.array(E.object({
      id: E.string(),
      display_name: E.string(),
      server_display_name: E.string().optional(),
      icon_url: E.string().optional()
    })).optional().describe("@internal Display metadata for this message's tool_use blocks, keyed by block id. display_name is the MCP server's `tool.annotations.title` when provided, otherwise a readable transform of the wire name; server_display_name is the MCP server's own display name; icon_url is the MCP server's directory icon URL (claude.ai connectors only). Omitted for blocks whose display label equals the wire name (built-in tools). Wrapper-level sibling \u2014 never inside `message.content` \u2014 so it is not replayed to the model."),
    timestamp: E.string().optional().describe("@internal ISO timestamp when this message was created (from internal AssistantMessage.timestamp)."),
    is_meta: E.literal(true).optional().describe("@internal True when the message was synthesized by the loop (not a model response)."),
    is_virtual: E.literal(true).optional().describe("@internal Display-only: rendered in the UI but filtered before API send."),
    is_api_error_message: E.boolean().optional().describe("@internal True when this assistant message wraps an API error (from internal AssistantMessage.isApiErrorMessage)."),
    api_error_status: E.number().optional().describe("@internal HTTP status code of the API error when is_api_error_message is true."),
    api_error: E.literal("max_output_tokens").optional().describe("@internal API error code when is_api_error_message is true."),
    error_details: E.string().optional().describe("@internal Raw API error message \u2014 preserves details (e.g. prompt-too-long token counts) that user-facing content discards."),
    advisor_model: E.string().optional().describe("@internal Advisor model that produced this message, when applicable."),
    attribution_agent: E.string().optional().describe("@internal Attribution stamp: agent name parsed from querySource (see messageAttribution.ts). May overlap with subagent_type."),
    attribution_skill: E.string().optional().describe("@internal Skill that produced this message."),
    attribution_plugin: E.string().optional().describe("@internal Plugin that produced this message."),
    attribution_mcp_server: E.string().optional().describe("@internal MCP server that produced this message."),
    attribution_mcp_tool: E.string().optional().describe("@internal MCP tool that produced this message.")
  })), D$O = Re(() => E.object({
    type: E.literal("rate_limit_event"),
    rate_limit_info: j$O(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Rate limit event emitted when rate limit info changes.")), $RK = Re(() => E.object({
    tool_name: E.string(),
    tool_use_id: E.string(),
    tool_input: E.record(E.string(), E.unknown())
  })), M$O = Re(() => E.object({
    id: E.string(),
    name: E.string(),
    input: E.record(E.string(), E.unknown())
  })), YRK = Re(() => E.enum(T0a).describe("Why the query loop terminated. Unset when the loop was bypassed (local slash command) or interrupted externally (budget/retry limits checked between yields).")), X$O = Re(() => E.object({
    type: E.literal("result"),
    subtype: E.literal("success"),
    duration_ms: E.number(),
    duration_api_ms: E.number(),
    ttft_ms: E.number().optional(),
    ttft_stream_ms: E.number().optional(),
    time_to_request_ms: E.number().optional(),
    time_to_request_from_spawn_ms: E.number().optional(),
    warm_spare_claimed: E.boolean().optional(),
    time_origin_ms: E.number().optional(),
    is_error: E.boolean(),
    api_error_status: E.number().nullable().optional(),
    num_turns: E.number(),
    result: E.string(),
    stop_reason: E.string().nullable(),
    total_cost_usd: E.number(),
    usage: ORK(),
    modelUsage: E.record(E.string(), zS6()),
    permission_denials: E.array($RK()),
    structured_output: E.unknown().optional(),
    deferred_tool_use: M$O().optional(),
    terminal_reason: YRK().optional(),
    fast_mode_state: rC_().optional(),
    origin: u8q().optional(),
    uuid: SK(),
    session_id: E.string()
  })), P$O = Re(() => E.object({
    type: E.literal("result"),
    subtype: E.enum(["error_during_execution", "error_max_turns", "error_max_budget_usd", "error_max_structured_output_retries"]),
    duration_ms: E.number(),
    duration_api_ms: E.number(),
    is_error: E.boolean(),
    num_turns: E.number(),
    stop_reason: E.string().nullable(),
    total_cost_usd: E.number(),
    usage: ORK(),
    modelUsage: E.record(E.string(), zS6()),
    permission_denials: E.array($RK()),
    errors: E.array(E.string()),
    terminal_reason: YRK().optional(),
    fast_mode_state: rC_().optional(),
    origin: u8q().optional(),
    uuid: SK(),
    session_id: E.string()
  })), W$O = Re(() => E.union([X$O(), P$O()])), wRK = Re(() => E.object({
    file: E.string().optional().describe("Path to the settings file that failed to parse or validate."),
    path: E.string().describe("Dot-notation path to the field with the error, or empty string for whole-file errors."),
    message: E.string().describe("Human-readable error message.")
  }).describe("A settings file parse or validation error. When a settings.json file fails to parse (invalid JSON, JSON comments, schema mismatch), the file is skipped and any rules it contained \u2014 including permission allow/deny lists \u2014 are not applied.")), Z$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("init"),
    agents: E.array(E.string()).optional(),
    apiKeySource: dTO(),
    betas: E.array(E.string()).optional(),
    claude_code_version: E.string(),
    cwd: E.string(),
    tools: E.array(E.string()),
    mcp_servers: E.array(E.object({
      name: E.string(),
      status: E.string()
    })),
    model: E.string(),
    permissionMode: buildModelRestrictedMessage(),
    slash_commands: E.array(E.string()),
    output_style: E.string(),
    skills: E.array(E.string()),
    plugins: E.array(E.object({
      name: E.string(),
      path: E.string(),
      source: E.string().optional().describe('@internal Plugin source identifier in "name\\@marketplace" format. Sentinels: "name\\@inline" for --plugin-dir, "name\\@builtin" for built-in plugins.')
    })),
    plugin_errors: E.array(E.object({
      plugin: E.string(),
      type: E.string(),
      message: E.string()
    })).optional().describe("@internal Plugin load-time errors (e.g., unsatisfied dependency version). Affected plugins are demoted and absent from `plugins[]`. The key is omitted when there are no errors; CI can fail on `(plugin_errors?.length ?? 0) > 0`."),
    plugin_warnings: E.array(E.object({
      plugin: E.string(),
      type: E.string(),
      message: E.string()
    })).optional().describe("@internal Plugin authoring feedback (e.g., a default folder shadowed by a manifest key). When `plugin` matches an entry in `plugins[]`, that plugin loaded and the warning is advisory; warnings with a synthetic `plugin` source (no matching `plugins[]` entry, e.g. workspace-level suppression notices) describe content that did NOT load. The key is omitted when there are no warnings."),
    fast_mode_state: rC_().optional(),
    analytics_disabled: E.boolean().optional().describe("@internal True when the CLI has analytics/telemetry disabled (privacy level, DO_NOT_TRACK, or 3P provider). IDE clients use this to hide per-message thumbs feedback UI since the rating event would be a no-op."),
    product_feedback_disabled: E.boolean().optional().describe("@internal True when the org's allow_product_feedback policy is false (ZDR/HIPAA). IDE clients use this to hide feedback surfaces (thumbs, session survey) whose events the CLI would drop at the proxy boundary anyway."),
    memory_paths: E.object({
      auto: E.string().optional(),
      team: E.string().optional()
    }).optional().describe("@internal Absolute directory paths for the auto-memory and team-memory stores. Lets SDK renderers classify Read/Write/Edit tool calls on these paths as memory operations without re-implementing CLI path detection."),
    uuid: SK(),
    session_id: E.string()
  })), G$O = Re(() => E.object({
    type: E.literal("stream_event"),
    event: w$O(),
    parent_tool_use_id: E.string().nullable(),
    uuid: SK(),
    session_id: E.string(),
    ttft_ms: E.number().optional()
  })), R$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("compact_boundary"),
    compact_metadata: E.object({
      trigger: E.enum(["manual", "auto"]),
      pre_tokens: E.number(),
      post_tokens: E.number().optional(),
      duration_ms: E.number().optional(),
      user_context: E.string().optional().describe('@internal User-provided focus text for manual "summarize from here".'),
      messages_summarized: E.number().optional().describe("@internal Count of messages the compaction summarized."),
      precomputed: E.boolean().optional().describe("@internal The summary was generated in the background at the autocompact threshold and swapped in when prompt-too-long fired; duration_ms measures user-wait from that point."),
      pre_compact_discovered_tools: E.array(E.string()).optional().describe("@internal Deferred-tool names discovered before this compaction. extractDiscoveredToolNames reads this back on the next turn so the tool-schema filter keeps including them after the tool_reference-carrying messages were summarized away."),
      preserved_segment: E.object({
        head_uuid: SK(),
        anchor_uuid: SK(),
        tail_uuid: SK()
      }).optional().describe("Relink info for messagesToKeep. Loaders splice the preserved segment at anchor_uuid (summary for suffix-preserving, boundary for prefix-preserving partial compact) so resume includes preserved content. Unset when compaction summarizes everything (no messagesToKeep)."),
      preserved_messages: E.object({
        anchor_uuid: SK(),
        uuids: E.array(SK()),
        all_uuids: E.array(SK()).optional().describe("@internal Unfiltered messagesToKeep UUIDs. uuids is the on-disk subset (messages recordTranscript writes); all_uuids is the in-memory superset including non-loggable messages an in-process surface still holds for the next turn's API input. Absent from older producers.")
      }).optional().describe("Ordered messagesToKeep UUIDs. Supersedes preserved_segment \u2014 " + "readers look up each UUID directly and relink uuids[i] to uuids[i-1] (uuids[0] to anchor_uuid) instead of walking the parentUuid chain. Unset when compaction summarizes everything.")
    }),
    logical_parent_uuid: SK().nullable().optional().describe("@internal uuid of the last pre-compact message \u2014 the backpointer " + "forkSession follows across the compaction break. Distinct from the session-file chain parent (which is the post-compact summary). Absent from older producers."),
    uuid: SK(),
    session_id: E.string()
  })), L$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("status"),
    status: A$O(),
    permissionMode: buildModelRestrictedMessage().optional(),
    compact_result: E.enum(["success", "failed"]).optional(),
    compact_error: E.string().optional(),
    uuid: SK(),
    session_id: E.string()
  })), p8q = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("post_turn_summary"),
    summarizes_uuid: E.string(),
    status_category: E.string(),
    status_detail: E.string(),
    needs_action: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Background post-turn summary emitted after each assistant turn. summarizes_uuid points to the assistant message this summarizes.")), B8q = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("task_summary"),
    detail: E.string().nullable(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Mid-turn progress line from the debounced classifier. Mirrors external_metadata.task_summary so non-CCR consumers (desktop LocalSessionManager) see the same live phrase. detail is null on the idle clear.")), h$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("informational"),
    content: E.string(),
    level: E.enum(["info", "notice", "suggestion", "warning"]).describe("Render level. 'info' shows only in transcript mode; 'notice' renders in inactive gray; 'suggestion' and 'warning' are more prominent."),
    tool_use_id: E.string().optional().describe("Dedupes progress messages for the same tool use."),
    prevent_continuation: E.boolean().optional().describe("When true, execution stops after this message (e.g. a Stop hook denied continuation)."),
    uuid: SK(),
    session_id: E.string()
  }).describe("Generic text banner emitted by the loop \u2014 non-error status lines, hook feedback (e.g. a UserPromptSubmit hook's block reason), slash-command output. Hosts render `content` as plaintext at the given level.")), mNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("permission_retry"),
    content: E.string(),
    commands: E.array(E.string()).describe("Display names of the commands that were allowed."),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when tool execution retries after a permission-mode change allowed previously-denied commands. REPL renders a 'retrying with <commands>' banner. From internal SystemMessage 'permission_retry'.")), pNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("stop_hook_summary"),
    hook_count: E.number(),
    hook_infos: E.array(E.object({
      command: E.string(),
      prompt_text: E.string().optional(),
      duration_ms: E.number().optional()
    })),
    hook_errors: E.array(E.string()),
    hook_additional_context: E.array(E.string()).optional().describe("Non-error feedback from hookSpecificOutput.additionalContext \u2014 kept separate from hook_errors so the sanctioned feedback channel is not labeled an error. Absent in sessions persisted before this field existed."),
    prevented_continuation: E.boolean(),
    stop_reason: E.string().optional(),
    has_output: E.boolean(),
    level: E.enum(["info", "notice", "suggestion", "warning"]),
    tool_use_id: E.string().optional(),
    hook_label: E.string().optional(),
    total_duration_ms: E.number().optional(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Summary of Stop/SubagentStop hook execution at turn end \u2014 which hooks ran, their output, and whether any prevented continuation. From internal SystemMessage 'stop_hook_summary'.")), BNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("memory_saved"),
    written_paths: E.array(E.string()),
    team_count: E.number().optional(),
    verb: E.string().optional().describe('Renders as "<verb> N memories". Defaults to "Saved".'),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Confirmation that the memory subsystem wrote to the listed paths. REPL renders a '<verb> N memories' banner. From internal SystemMessage 'memory_saved'.")), UNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("agents_killed"),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when background agents are terminated (e.g. on interrupt). REPL renders an 'agents killed' banner. From internal SystemMessage 'agents_killed'.")), FNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("away_summary"),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Summary of what happened while the user was away (background tasks completed, notifications accumulated). From internal SystemMessage 'away_summary'.")), gNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("thinking"),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Rendered thinking content (the text itself, not the running token estimate \u2014 that is SDKThinkingTokensMessage). From internal SystemMessage 'thinking'.")), U8q = Re(() => E.object({
    type: E.literal("transcript_mirror"),
    filePath: E.string(),
    entries: E.array(E.unknown())
  }).describe("@internal Emitted after each successful local transcript write. The parent peels these off the stdout stream and batches them to the SessionStore adapter. Not exposed to public SDK consumers.")), CONTENT_CACHE_TTL_MS = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("mirror_error"),
    error: E.string(),
    key: E.object({
      projectKey: E.string(),
      sessionId: E.string(),
      subpath: E.string().optional()
    }),
    uuid: SK(),
    session_id: E.string()
  }).describe("Emitted when SessionStore.append() rejects or times out for a transcript-mirror batch after bounded retry (3 attempts with short backoff; timeouts are not retried). The batch is then dropped; this surfaces the failure so consumers are not silent on data loss.")), turndownInstancePromise = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("api_retry"),
    attempt: E.number(),
    max_retries: E.number(),
    retry_delay_ms: E.number(),
    error_status: E.number().nullable(),
    error: x8q(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Emitted when an API request fails with a retryable error and will be retried after a delay. error_status is null for connection errors (e.g. timeouts) that had no HTTP response.")), CONTENT_CACHE_MAX_SIZE = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("model_refusal_fallback"),
    trigger: E.literal("refusal"),
    direction: E.enum(["retry", "revert", "sticky"]),
    original_model: E.string(),
    fallback_model: E.string(),
    request_id: E.string().nullable(),
    api_refusal_category: E.string().nullable().optional().describe("The refusal category ('cyber', 'bio', \u2026): stop_details.category from the refused API response (client lane), or the fallback block's server-gated trigger.category (server lane). Open string \u2014 new categories ship on the wire ahead of schema updates. null when neither source carried a category (normal, not an error). Absent when emitted by an older CLI."),
    api_refusal_explanation: E.string().nullable().optional().describe("stop_details.explanation from the refused API response (client lane only \u2014 the server-lane trigger carries no explanation). Unstable human prose \u2014 display only, never parse. null/absent when the response carried none, and always null on server-lane banners."),
    retracted_message_uuids: E.array(E.string()).optional().describe("Wire uuids of the messages this fallback retracted \u2014 the refused partial as the consumer received it (one uuid per normalized SDK message; multi-block messages carry per-block derived uuids) plus any tombstoned tool_results. Emitted AFTER the retraction, so this is a resolution-time eviction signal: remove these messages from transcript state on receipt. Eviction is idempotent \u2014 unknown or already-removed uuids are a no-op. Absent when emitted by an older CLI."),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe('Emitted when the primary model ends the stream with stop_reason "refusal" and the turn is retried once on a fallback model with the swap made persistent for the session (direction: "retry"). "revert" and "sticky" are retained in the enum for SDK-consumer compat and are no longer emitted.')), QNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("model_fallback"),
    trigger: E.enum(["model_not_found", "permission_denied", "overloaded", "server_error", "last_resort", "model_blocked"]),
    original_model: E.string(),
    fallback_model: E.string(),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe('@internal Emitted when the current turn is switched to the configured fallback model because the primary model failed (trigger "model_not_found": model retired/unknown; "permission_denied": org lacks access; "overloaded": repeated 529s; "server_error": retryable 5xx pivot; "last_resort": non-retryable error on the primary; "model_blocked": primary disabled by the per-model kill switch). Turn-scoped \u2014 the primary is re-tried on the next user turn. Not yet in the public SDKMessage union.')), cNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("model_consent_fallback"),
    choice: E.enum(["consent", "switch_default", "cancelled"]).describe("The consent-prompt answer (or no-dialog collapse) that produced the swap. 'consent' appears here only when the gate could not honor it (e.g. usage credits did not end up provisioned \u2014 the loop never enables billing from a bare wire reply)."),
    original_model: E.string(),
    fallback_model: E.string(),
    persisted_as_default: E.boolean().describe("True when the decline also rewrote the saved default model (explicit switch_default with the consent-gated model as the saved default)."),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when a pre-send model consent gate swaps the session off the requested model (consent declined, dismissed, or given without the required entitlement ending up provisioned). Currently emitted by the Fable 5 usage-credit gate (`fable_overage_consent_prompt`). Session-scoped \u2014 the swap persists for the session, and additionally as the saved default when persisted_as_default is true. Absence of this message after the consent dialog resolves means the session stayed on the requested model. Not yet in the public SDKMessage union.")), dNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("file_snapshot"),
    content: E.string(),
    snapshot_files: E.array(E.object({
      key: E.string().describe("Identifier for the file type (e.g. 'plan', 'todo')."),
      path: E.string().describe("Original file path (for debugging)."),
      content: E.string()
    })),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Snapshot of session files (plan, todo) captured for rewind. From internal SystemMessage 'file_snapshot'.")), lNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("scheduled_task_fire"),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when a scheduled task (cron) fires. content is the render text. From internal SystemMessage 'scheduled_task_fire'.")), nNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("turn_duration"),
    duration_ms: E.number(),
    budget_tokens: E.number().optional().describe("Output tokens spent this turn toward the token budget."),
    budget_limit: E.number().optional().describe("Turn token-budget ceiling."),
    budget_nudges: E.number().optional().describe("Budget-nudge count this turn."),
    message_count: E.number().optional().describe("In-memory message count at turn end; used by resume-consistency telemetry to detect write\u2192load round-trip drift."),
    pending_background_agent_count: E.number().optional().describe("Background Agent-tool runs still in flight when the turn finished."),
    pending_workflow_count: E.number().optional().describe("Workflow-tool runs still in flight when the turn finished."),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Per-turn wall-clock duration plus budget and pending-background-work counts. REPL renders the 'Done in Ns' / 'Waiting for N agents' line. From internal SystemMessage 'turn_duration'.")), iNw = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("api_error"),
    error: E.object({
      message: E.string(),
      status: E.number().optional(),
      request_id: E.string().optional(),
      formatted: E.string().describe("Human-readable display string for the error."),
      connection: E.object({
        code: E.string(),
        message: E.string(),
        is_ssl_error: E.boolean()
      }).nullable().describe("errno/SSL code extracted from the cause chain; null when absent."),
      is_network_down: E.boolean(),
      rate_limits: E.object({
        resets_at: E.number().optional(),
        rate_limit_type: E.string().optional()
      }).nullable().describe("Quota-429 headers surfaced by the retry banner; null when not a quota 429.")
    }).describe("Plain-data snapshot of the APIError \u2014 the class instance cannot cross the wire."),
    retry_in_ms: E.number(),
    retry_attempt: E.number(),
    max_retries: E.number(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Retryable-API-error frame carrying the plain-data error snapshot and retry counters. REPL renders the retry banner from this. Wire twin is SDKAPIRetryMessage ('api_retry'). From internal SystemMessage 'api_error'.")), V$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("local_command_output"),
    content: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Output from a local slash command (e.g. /voice, /usage). Displayed as assistant-style text in the transcript.")), getTurndownInstance = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("hook_started"),
    hook_id: E.string(),
    hook_name: E.string(),
    hook_event: E.string(),
    uuid: SK(),
    session_id: E.string()
  })), MAX_URL_LENGTH = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("hook_progress"),
    hook_id: E.string(),
    hook_name: E.string(),
    hook_event: E.string(),
    stdout: E.string(),
    stderr: E.string(),
    output: E.string(),
    uuid: SK(),
    session_id: E.string()
  })), MAX_CONTENT_LENGTH = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("hook_response"),
    hook_id: E.string(),
    hook_name: E.string(),
    hook_event: E.string(),
    output: E.string(),
    stdout: E.string(),
    stderr: E.string(),
    exit_code: E.number().optional(),
    outcome: E.enum(["success", "error", "cancelled"]),
    uuid: SK(),
    session_id: E.string()
  })), FETCH_TIMEOUT_MS = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("plugin_install"),
    status: E.enum(["started", "installed", "failed", "completed"]),
    name: E.string().optional(),
    error: E.string().optional(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Headless plugin installation progress (CLAUDE_CODE_SYNC_PLUGIN_INSTALL). started/completed bracket the whole install; installed/failed carry a per-marketplace name.")), DOMAIN_CHECK_TIMEOUT_MS = Re(() => E.object({
    type: E.literal("tool_progress"),
    tool_use_id: E.string(),
    tool_name: E.string(),
    parent_tool_use_id: E.string().nullable(),
    elapsed_time_seconds: E.number(),
    task_id: E.string().optional(),
    uuid: SK(),
    session_id: E.string()
  })), REDIRECT_STATUS_CODES = Re(() => E.object({
    type: E.literal("auth_status"),
    isAuthenticating: E.boolean(),
    output: E.array(E.string()),
    error: E.string().optional(),
    uuid: SK(),
    session_id: E.string()
  })), isRedirectOutcome = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("files_persisted"),
    files: E.array(E.object({
      filename: E.string(),
      file_id: E.string()
    })),
    failed: E.array(E.object({
      filename: E.string(),
      error: E.string()
    })),
    processed_at: E.string(),
    uuid: SK(),
    session_id: E.string()
  })), isHttpErrorOutcome = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("task_notification"),
    task_id: E.string(),
    tool_use_id: E.string().optional(),
    status: E.enum(["completed", "failed", "stopped"]),
    output_file: E.string(),
    summary: E.string(),
    usage: E.object({
      total_tokens: E.number(),
      tool_uses: E.number(),
      duration_ms: E.number()
    }).optional(),
    skip_transcript: E.boolean().optional(),
    uuid: SK(),
    session_id: E.string()
  })), REMOTE_ENTRYPOINTS = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("task_started"),
    task_id: E.string(),
    tool_use_id: E.string().optional(),
    description: E.string(),
    subagent_type: E.string().optional().describe("Subagent type for Task tool subagents."),
    task_type: E.string().optional(),
    workflow_name: E.string().optional().describe("meta.name from the workflow script (e.g. 'spec'). Only set when task_type is 'local_workflow'."),
    prompt: E.string().optional(),
    skip_transcript: E.boolean().optional().describe("Ambient/housekeeping task. Consumers should hide this from the inline transcript; it may still appear in a tasks panel."),
    uuid: SK(),
    session_id: E.string()
  })), ARTIFACT_HEAD_STYLE = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("task_updated"),
    task_id: E.string(),
    patch: E.object({
      status: E.enum(["pending", "running", "completed", "failed", "killed", "paused"]).optional(),
      description: E.string().optional(),
      end_time: E.number().optional(),
      total_paused_ms: E.number().optional(),
      error: E.string().optional(),
      is_backgrounded: E.boolean().optional()
    }).describe("Wire-safe subset of TaskState fields that changed. Excludes abortController, messages, result. Clients merge into their local task map."),
    uuid: SK(),
    session_id: E.string()
  })), MAX_TRACKED_UPLOAD_URLS = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("session_state_changed"),
    state: E.enum(["idle", "running", "requires_action"]),
    uuid: SK(),
    session_id: E.string()
  }).describe("Mirrors notifySessionStateChanged. 'idle' fires after heldBackResult flushes and the bg-agent do-while exits \u2014 authoritative turn-over signal.")), trackUploadedUrl = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("worker_shutting_down"),
    reason: E.string().describe("Short snake_case reason set by the host CLI (not user input), e.g. 'host_exit', 'remote_control_disabled'."),
    uuid: SK(),
    session_id: E.string()
  }).describe("Emitted by the bridge on opt-in graceful worker teardown (only when the teardown caller supplied a reason), before the heartbeat stops, so remote clients can show why the worker went away instead of waiting for heartbeat timeout. Absence is NOT a dead-host signal: handoffs (/update, /teleport, respawn), auto-disable, mode transitions, and internal fatal-error paths emit nothing by design. A dead host (battery, OOM, kill -9) never reaches teardown and never sends this either. NOTE: this event lands in the durable per-session event stream \u2014 a session that is later resumed may carry historical instances mid-stream. Clients MUST treat it as a live-tail signal only (honored when no further activity follows), not a one-shot session-lifetime fact. CC-2656.")), uploadArtifactContent = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("commands_changed"),
    commands: E.array(iC_()),
    uuid: SK(),
    session_id: E.string()
  }).describe("Fire-and-forget push of the full slash-command list after a mid-session change (e.g. skills discovered dynamically as the agent works in a subdirectory). Clients should REPLACE their cached command list with this payload: supportedCommands() is captured once at initialize and never reflects mid-session changes, so a client re-fetch would return the stale init list.")), g$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("notification"),
    key: E.string(),
    text: E.string(),
    priority: E.enum(["low", "medium", "high", "immediate"]),
    color: E.string().optional(),
    timeout_ms: E.number().optional(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Loop-side text notification. Mirrors the interactive REPL notification queue (key/priority/timeout). JSX notifications are not emitted on this channel.")), Q$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("task_progress"),
    task_id: E.string(),
    tool_use_id: E.string().optional(),
    description: E.string(),
    subagent_type: E.string().optional().describe("Subagent type for Task tool subagents."),
    usage: E.object({
      total_tokens: E.number(),
      tool_uses: E.number(),
      duration_ms: E.number()
    }),
    last_tool_name: E.string().optional(),
    summary: E.string().optional(),
    uuid: SK(),
    session_id: E.string()
  })), c$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("thinking_tokens"),
    estimated_tokens: E.number(),
    estimated_tokens_delta: E.number(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Live thinking-token estimate, digested from thinking_delta.estimated_tokens during the redacted-thinking phase (where the API otherwise streams only pings). estimated_tokens is the running total for the current thinking block; estimated_tokens_delta is the increment carried by this frame. Approximate progress for spinners/pills, not the authoritative billed output_tokens.")), d$O = Re(() => E.object({
    type: E.literal("tool_use_summary"),
    summary: E.string(),
    preceding_tool_use_ids: E.array(E.string()),
    uuid: SK(),
    session_id: E.string(),
    timestamp: E.string().optional().describe("@internal ISO timestamp when the summary was created on the originating process. From internal ToolUseSummaryMessage.timestamp.")
  })), l$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("memory_recall"),
    mode: E.enum(["select", "synthesize"]).describe("How memories were surfaced: 'select' returns full file bodies chosen by the parallel selector; 'synthesize' returns a Sonnet-authored paragraph distilled from many tiny memories."),
    memories: E.array(E.object({
      path: E.string().describe("Absolute path to the memory file, a synthesis sentinel of the form `<synthesis:DIR>` when mode is 'synthesize', or an https URL when scope is 'organization'."),
      scope: E.enum(["personal", "team", "organization"]),
      content: E.string().optional().describe("The surfaced memory body. Always present for 'synthesize' mode and 'organization' scope (neither has an on-disk path to lazy-load from); absent for file-backed 'select' entries (renderers lazy-load from path).")
    })),
    uuid: SK(),
    session_id: E.string()
  }).describe('Emitted when the memory recall supervisor surfaces relevant memories into the turn. Mirrors the CLI relevant_memories attachment so SDK renderers can show "Recalled from memory" inline.')), n$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("elicitation_complete"),
    mcp_server_name: E.string(),
    elicitation_id: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Emitted when an MCP server confirms that a URL-mode elicitation is complete.")), i$O = Re(() => E.object({
    type: E.literal("system"),
    subtype: E.literal("permission_denied"),
    tool_name: E.string(),
    tool_use_id: E.string(),
    agent_id: E.string().optional().describe("Subagent ID when the denied tool call originated inside a subagent. Mirrors can_use_tool for host-side routing."),
    decision_reason_type: E.string().optional().describe("Discriminator from PermissionDecisionReason (e.g. 'classifier', 'asyncAgent', 'mode', 'rule')."),
    decision_reason: E.string().optional().describe("Human-readable reason from the deciding component, when available."),
    message: E.string().describe("The rejection message returned to the model in the tool_result."),
    uuid: SK(),
    session_id: E.string()
  }).describe("Emitted when a tool call is auto-denied without an interactive permission prompt (e.g. auto-mode classifier, dontAsk mode, headless-agent auto-deny, or a deny rule). The 'ask' path surfaces via a can_use_tool control_request; this event covers the 'deny' short-circuit in canUseTool so SDK hosts can render the denial instead of only seeing an is_error tool_result. PreToolUse hook denies bypass canUseTool and are not covered here.")), r$O = Re(() => E.object({
    type: E.literal("prompt_suggestion"),
    suggestion: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("Predicted next user prompt, emitted after each turn when promptSuggestions is enabled.")), rNw = Re(() => E.object({
    type: E.literal("attachment"),
    attachment: E.unknown().describe("Internal Attachment discriminated union (at-mentioned files, IDE selections, pasted images, structured output, deferred tool-use). Wire shape pending a dedicated SDKAttachment schema."),
    timestamp: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when the engine yields an AttachmentMessage into the turn stream. Carries user-attached content (at-mentioned files, IDE selections, pasted media) and loop-attached data (structured output, deferred tool-use payloads). SDKResultMessage.structured_output and .deferred_tool_use are derived from these frames. From internal QueryEvent 'attachment'.")), oNw = Re(() => E.object({
    type: E.literal("tombstone"),
    message: E.unknown().describe("The internal Message being tombstoned. Wire shape pending a dedicated schema."),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when a previously-yielded message is superseded or removed from the transcript (e.g., streaming\u2192non-streaming fallback removes a partial orphan). Consumers that render or persist the stream should remove the referenced message. From internal QueryEvent 'tombstone'.")), aNw = Re(() => E.object({
    type: E.literal("conversation_reset"),
    new_conversation_id: SK(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted by /clear, plan-mode exit, and fresh-session flows. The surface should mount a fresh transcript under new_conversation_id and reset any cached session title. From internal QueryEvent 'conversation_reset'.")), sNw = Re(() => E.object({
    type: E.literal("api_metrics"),
    event: E.discriminatedUnion("type", [E.object({
      type: E.literal("start"),
      ttft_ms: E.number(),
      id: E.string().optional(),
      message_id: E.string().optional()
    }), E.object({
      type: E.literal("end"),
      output_tokens: E.number(),
      id: E.string().optional()
    }), E.object({
      type: E.literal("content_block_start"),
      id: E.string().optional()
    }), E.object({
      type: E.literal("thinking_progress"),
      estimated_tokens_delta: E.number(),
      id: E.string().optional()
    }), E.object({
      type: E.literal("thinking_signature"),
      chars: E.number(),
      id: E.string().optional()
    })]).describe("Per-API-call OTPS/TTFT lifecycle event. Optional id correlates parallel subagent start/end; serial callers omit it."),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when a subagent's API call reports TTFT or output_tokens for OTPS (output-tokens-per-second) metering. From internal QueryEvent 'api_metrics' (ApiMetricsLifecycleEvent).")), tNw = Re(() => E.object({
    type: E.literal("os_notification"),
    message: E.string(),
    notification_type: E.string(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when a tool (PushNotificationTool, the Computer Use wrapper) or turn-end cleanup requests a native OS notification. The surface dispatches to its platform notification channel (iTerm2/Kitty/Ghostty/bell in the terminal; native IPC for desktop/IDE). From internal QueryEvent 'os_notification'.")), eNw = Re(() => E.object({
    type: E.literal("apply_flag_settings"),
    settings: E.record(E.string(), E.unknown()).describe("Shallow-merge flag-settings patch \u2014 same shape as SDKControlApplyFlagSettingsRequest.settings."),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Output-direction counterpart to SDKControlApplyFlagSettingsRequest. Emitted when slash commands that toggle flag settings request a batched write that the surface applies to its AppState. From internal QueryEvent 'apply_flag_settings'.")), HVw = Re(() => E.object({
    type: E.literal("command_lifecycle"),
    command_uuid: E.string().describe("The queued command's uuid. Renamed from Engine 'uuid' to avoid collision with the universal message uuid field."),
    state: E.enum(["started", "completed"]),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when a queued slash command starts draining ('started') or finishes ('completed'). Remote transports (mobile/desktop bridge) forward the 'completed' ACK so the client knows its queued command was processed. From internal QueryEvent 'command_lifecycle'.")), _Vw = Re(() => E.object({
    type: E.literal("set_expanded_view"),
    expanded_view: E.enum(["none", "tasks", "teammates"]),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Hint to expand a side panel. Enum is a superset of AppState.expandedView for back-compat; do not narrow.")), qVw = Re(() => E.object({
    type: E.literal("active_goal"),
    value: E.object({
      condition: E.string(),
      iterations: E.number(),
      set_at: E.number(),
      tokens_at_start: E.number(),
      last_reason: E.string().optional()
    }).nullable(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when the user's /goal Stop hook reports met (clears) or not-yet-met (bumps iterations + last_reason). Any surface with a goal indicator re-renders from this. value is null when the goal is cleared. From internal QueryEvent 'active_goal'.")), KVw = Re(() => E.object({
    type: E.literal("set_in_progress_tool_use_ids"),
    op: E.object({
      action: E.enum(["add", "remove"]),
      ids: E.array(E.string())
    }),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when tool execution adds/removes tool_use ids from the mid-execution set (after permission grant, before result). Surfaces use this to show which tools are running. From internal QueryEvent 'set_in_progress_tool_use_ids'.")), OVw = Re(() => E.object({
    type: E.literal("hint_clears"),
    ids: E.array(E.string()),
    content_by_id: E.record(E.string(), E.string()),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when the server-side context-hint reject path reports cleared tool_use ids after a retry/fallback. The surface re-runs clearToolResultsById on its message list so subsequent turns match the API's view. From internal QueryEvent 'hint_clears'.")), TVw = Re(() => E.object({
    type: E.literal("interruptible_tool_in_progress"),
    in_progress: E.boolean(),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when the set of executing tools transitions in or out of an all-interruptible state. The surface uses this to decide whether a fresh user submit should interrupt the current turn (vs. queue). From internal QueryEvent 'interruptible_tool_in_progress'.")), zVw = Re(() => E.object({
    type: E.literal("open_message_selector"),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted by /rewind to open the message-selector overlay. Fire-and-forget \u2014 the user's selection returns through a separate channel. From internal QueryEvent 'open_message_selector'.")), $Vw = Re(() => E.object({
    type: E.literal("compact_progress"),
    event: E.discriminatedUnion("type", [E.object({
      type: E.literal("hooks_start"),
      hook_type: E.enum(["pre_compact", "post_compact", "session_start"])
    }), E.object({
      type: E.literal("compact_start"),
      hint_text: E.string().nullable().optional()
    }), E.object({
      type: E.literal("compact_end")
    })]).describe("In-progress compaction lifecycle event."),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted while compaction is running (hook phase, compact start, compact end). Distinct from system/compact_boundary, which reports the post-compaction transcript boundary after completion. From internal QueryEvent 'compact_progress' (CompactEvent Delta-track arm).")), YVw = Re(() => E.object({
    type: E.literal("stream_mode"),
    mode: E.enum(["tool-input", "tool-use", "requesting", "responding", "thinking"]),
    uuid: SK(),
    session_id: E.string()
  }).describe("@internal Emitted when the engine's spinner phase changes during compaction. From internal QueryEvent 'stream_mode' (CompactEvent Delta-track arm).")), wVw = Re(() => E.discriminatedUnion("op", [E.object({
    type: E.literal("response_length"),
    op: E.literal("add"),
    delta: E.number(),
    uuid: SK(),
    session_id: E.string()
  }), E.object({
    type: E.literal("response_length"),
    op: E.literal("reset"),
    uuid: SK(),
    session_id: E.string()
  })]).describe("@internal Emitted to drive the streaming-output character counter in the spinner ('add' accumulates, 'reset' zeroes on compaction-boundary swap). From internal QueryEvent 'response_length' (Delta-track).")), AVw = Re(() => E.discriminatedUnion("phase", [E.object({
    type: E.literal("refusal_continuation"),
    phase: E.literal("begin"),
    salvage_text: E.string(),
    uuid: SK(),
    session_id: E.string()
  }), E.object({
    type: E.literal("refusal_continuation"),
    phase: E.literal("end"),
    uuid: SK(),
    session_id: E.string()
  })]).describe("@internal Emitted when a refusal-continuation window begins ('begin' with salvage_text to keep visible in the streaming preview) or ends ('end'). From internal QueryEvent 'refusal_continuation'.")), fVw = Re(() => E.object({
    sessionId: E.string().describe("Unique session identifier (UUID)."),
    summary: E.string().describe("Display title for the session: custom title, auto-generated summary, or first prompt."),
    lastModified: E.number().describe("Last modified time in milliseconds since epoch."),
    fileSize: E.number().optional().describe("File size in bytes. Only populated for local JSONL storage."),
    customTitle: E.string().optional().describe("User-set session title via /rename."),
    firstPrompt: E.string().optional().describe("First meaningful user prompt in the session."),
    gitBranch: E.string().optional().describe("Git branch at the end of the session."),
    cwd: E.string().optional().describe("Working directory for the session."),
    tag: E.string().optional().describe("User-set session tag."),
    createdAt: E.number().optional().describe("Creation time in milliseconds since epoch, extracted from the first entry's timestamp.")
  }).describe("Session metadata returned by listSessions and getSessionInfo.")), F8q = Re(() => E.union([J$O(), m8q(), f$O(), W$O(), Z$O(), G$O(), R$O(), L$O(), turndownInstancePromise(), CONTENT_CACHE_MAX_SIZE(), V$O(), getTurndownInstance(), MAX_URL_LENGTH(), MAX_CONTENT_LENGTH(), FETCH_TIMEOUT_MS(), DOMAIN_CHECK_TIMEOUT_MS(), REDIRECT_STATUS_CODES(), isHttpErrorOutcome(), REMOTE_ENTRYPOINTS(), ARTIFACT_HEAD_STYLE(), Q$O(), c$O(), MAX_TRACKED_UPLOAD_URLS(), trackUploadedUrl(), uploadArtifactContent(), g$O(), isRedirectOutcome(), d$O(), l$O(), D$O(), n$O(), i$O(), r$O(), CONTENT_CACHE_TTL_MS(), h$O()])), rC_ = Re(() => E.enum(["off", "cooldown", "on"]).describe("Fast mode state: off, in cooldown after rate limit, or actively enabled."));
});

export {zS6 as SFn,QTO as Zhp,yNw as fUg,cTO as egp,NNw as AUg,dTO as tgp,VNw as hUg,vNw as gUg,lTO as ngp,nTO as rgp,iTO as ogp,ENw as _Ug,S8q as uso,$S6 as bFn,rTO as sgp,sGK as ODa,oTO as igp,aTO as agp,sTO as lgp,YS6 as EFn,tTO as cgp,eTO as ugp,C8q as dso,SNw as yUg,CK_ as wlt,v8q as lso,HzO as dgp,normalizeShellToolName as cso,nC_ as r2t,aGK as PDa,CNw as TUg,buildModelRestrictedMessage as NY,_zO as pgp,tGK as LDa,Yj as RT,qzO as mgp,KzO as fgp,OzO as Agp,TzO as hgp,zzO as ggp,$zO as _gp,YzO as ygp,wzO as Tgp,AzO as Sgp,fzO as bgp,jzO as Egp,JzO as Cgp,eGK as MDa,HRK as NDa,DzO as vgp,MzO as wgp,XzO as Rgp,PzO as xgp,WzO as kgp,ZzO as Hgp,GzO as Igp,RzO as Dgp,LzO as Pgp,hzO as Ogp,kzO as Lgp,yzO as Mgp,NzO as Ngp,VzO as Bgp,vzO as Fgp,EzO as Ugp,SzO as $gp,CzO as qgp,bzO as jgp,IzO as Wgp,xzO as Ggp,uzO as Vgp,mzO as Kgp,pzO as zgp,_RK as BDa,BzO as Ygp,UzO as Jgp,FzO as Xgp,gzO as Qgp,QzO as Zgp,czO as e_p,dzO as t_p,lzO as n_p,nzO as r_p,izO as o_p,rzO as s_p,ozO as i_p,azO as a_p,szO as l_p,tzO as c_p,ezO as u_p,H$O as d_p,_$O as p_p,q$O as m_p,K$O as f_p,O$O as A_p,T$O as h_p,bNw as SUg,iC_ as o2t,b8q as pso,I8q as mso,qRK as FDa,z$O as g_p,KRK as UDa,INw as bUg,xNw as EUg,uNw as CUg,$$O as __p,Y$O as y_p,w$O as T_p,SK as pathModule,ORK as $Da,x8q as fso,A$O as S_p,u8q as Aso,TRK as qDa,m8q as hso,f$O as b_p,zRK as jDa,j$O as E_p,J$O as C_p,D$O as v_p,$RK as WDa,M$O as w_p,YRK as GDa,X$O as R_p,P$O as x_p,W$O as k_p,wRK as VDa,Z$O as H_p,G$O as I_p,R$O as D_p,L$O as P_p,p8q as gso,B8q as _so,h$O as O_p,mNw as vUg,pNw as wUg,BNw as RUg,UNw as xUg,FNw as kUg,gNw as HUg,U8q as yso,CONTENT_CACHE_TTL_MS as L_p,turndownInstancePromise as M_p,CONTENT_CACHE_MAX_SIZE as N_p,QNw as IUg,cNw as DUg,dNw as PUg,lNw as OUg,nNw as LUg,iNw as MUg,V$O as B_p,getTurndownInstance as F_p,MAX_URL_LENGTH as U_p,MAX_CONTENT_LENGTH as $_p,FETCH_TIMEOUT_MS as q_p,DOMAIN_CHECK_TIMEOUT_MS as j_p,REDIRECT_STATUS_CODES as W_p,isRedirectOutcome as G_p,isHttpErrorOutcome as V_p,REMOTE_ENTRYPOINTS as K_p,ARTIFACT_HEAD_STYLE as z_p,MAX_TRACKED_UPLOAD_URLS as Y_p,trackUploadedUrl as J_p,uploadArtifactContent as X_p,g$O as Q_p,Q$O as Z_p,c$O as eyp,d$O as typ,l$O as nyp,n$O as ryp,i$O as oyp,r$O as syp,rNw as NUg,oNw as BUg,aNw as FUg,sNw as UUg,tNw as $Ug,eNw as qUg,HVw as jUg,_Vw as WUg,qVw as GUg,KVw as VUg,OVw as KUg,TVw as zUg,zVw as YUg,$Vw as JUg,YVw as XUg,wVw as QUg,AVw as ZUg,fVw as e2g,F8q as Tso,rC_ as s2t,g8q as Sso};
