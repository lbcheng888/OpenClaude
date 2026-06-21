// @ts-nocheck
import {fromSanitizer_SANITIZER_OUTPUT_ONLY,Qe,st} from "../../vendor/m5.ts";
import {Fg,cNr,QXe} from "../agent/2188_kind.ts";
import {ufi,_Nr} from "../telemetry/2192_urls.ts";
import {AK,sve} from "../../vendor/m2043.ts";
import {wEt,Sw,Cns} from "./0728_serverName.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {mwt,S_} from "../agent/1454_agentType.ts";
import {getAgentId,u4,getTeamName,isTeammate,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {getParentSessionId,getAttacherCaps,getRendererModeForAnalytics,getSessionId,getIsInteractive,getClientType,lt} from "../session/0131_sent.ts";
import {getMainLoopModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {BR,g1} from "../../vendor/m1445.ts";
import {e5,jR} from "../config/2028_allowed.ts";
import {getRepoRemoteHash,Ba} from "../../vendor/m693.ts";
import {uNe,hp} from "../session/1460_promise.ts";
import {getSubscriptionType,Ao,isClaudeAISubscriber} from "../config/2031_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {Lr} from "../../vendor/m578.ts";
import {a5,k1} from "../config/2187_terminal.ts";
import {sn} from "../config/0047_namespace.ts";
import {wfe,_K} from "../computer-use/2193_iTerm_app.ts";
import {qs,IXo,PXo,$Me} from "../../vendor/m635.ts";
import {WS} from "../../vendor/m1456.ts";
import {je} from "../../vendor/m577.ts";
import {hbt,mmr} from "../config/0571_externalHttp.ts";
// The canonical tool name for the Bash built-in tool
var ns = "Bash";

// Sanitize a tool name for telemetry; returns undefined if it doesn't match safe pattern
function ky(toolName: any): any {
  if (toolName == null) return;
  return /^[A-Za-z0-9._:[\]-]{1,100}$/.test(toolName) ? fromSanitizer_SANITIZER_OUTPUT_ONLY(toolName) : Qe("nonconforming");
}

// No-op placeholder (used to satisfy import side-effects or as an empty callback)
var eQe = () => {};

// Normalize a tool name for analytics: use allowlist alias, or "mcp_tool" for MCP tools, or pass through
function Qi(toolName: any): any {
  let alias = Object.hasOwn(pfi, toolName) ? pfi[toolName] : void 0;
  if (alias) return fromSanitizer_SANITIZER_OUTPUT_ONLY(alias);
  if (toolName.startsWith("mcp__")) return Qe("mcp_tool");
  return fromSanitizer_SANITIZER_OUTPUT_ONLY(toolName);
}

// Get the agent fingerprint string (e.g. model name) sanitized for telemetry
function Rfe(agentFingerprint: any): any {
  return fromSanitizer_SANITIZER_OUTPUT_ONLY(Fg(agentFingerprint) ?? "");
}

// Check whether OTEL detailed tool attribute logging is enabled
function wA(): any {
  return st(process.env.OTEL_LOG_TOOL_DETAILS);
}

// Check whether OTEL tool content logging is enabled
function tQe(): any {
  return st(process.env.OTEL_LOG_TOOL_CONTENT);
}

// Returns true when MCP server name/URL indicates a trusted internal context
function nQe(serverName: any, serverUrl: any): any {
  if (process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent") return !0;
  if (serverName === "claudeai-proxy") return !0;
  if (serverUrl && ufi(serverUrl)) return !0;
  if (serverUrl && AK(serverUrl)) return !0;
  return !1;
}

// Returns true when the tool should have MCP server name emitted (either allowlisted or trusted server)
function ENr(serverName: any, mcpServerName: any, serverUrl: any): any {
  return bNr.has(serverName) || nQe(mcpServerName, serverUrl);
}

// Extract MCP server/tool name attributes for telemetry, gated by trust check
function l5(toolName: any, mcpServerName: any, serverUrl: any): any {
  let parsed = hfi(toolName);
  if (!parsed) return {};
  if (!ENr(parsed.serverName, mcpServerName, serverUrl)) return {};
  return {
    mcpServerName: parsed.serverName,
    mcpToolName: parsed.mcpToolName
  };
}

// Parse an MCP tool name of form "mcp__<serverName>__<toolName>" into its parts
function hfi(toolName: any): any {
  if (!toolName.startsWith("mcp__")) return;
  let parts = toolName.split("__");
  if (parts.length < 3) return;
  let serverName = parts[1],
    mcpToolName = parts.slice(2).join("__");
  if (!serverName || !mcpToolName) return;
  return {
    serverName: serverName,
    mcpToolName: mcpToolName
  };
}

// Extract the skill name from a Skill tool invocation's input
function CNr(toolName: any, toolInput: any, extraArg: any): any {
  if (toolName !== "Skill") return;
  if (typeof toolInput === "object" && toolInput !== null && "skill" in toolInput && typeof toolInput.skill === "string") return toolInput.skill;
  return;
}

// Extract the subagent_type from an Agent or Task tool invocation's input
function vNr(toolName: any, toolInput: any): any {
  if (toolName !== "Agent" && toolName !== "Task") return;
  if (typeof toolInput === "object" && toolInput !== null && "subagent_type" in toolInput && typeof toolInput.subagent_type === "string") return toolInput.subagent_type;
  return;
}

// Build a structured attributes object for tool-detail OTEL spans (Bash command, MCP info, skill, subagent)
function SHt(toolName: any, toolInput: any, extraArg: any): any {
  let attrs: any = {};
  if (!wA()) return attrs;
  // Check if this is a Bash or WebFetch invocation (both have a "command" field)
  let isBash = toolName === ns && toolInput !== null && typeof toolInput === "object" && "command" in toolInput && typeof toolInput.command === "string",
    isWebFetch = toolName === wEt && toolInput !== null && typeof toolInput === "object" && "command" in toolInput && typeof toolInput.command === "string";
  if (isBash) {
    let bashInput = toolInput,
      cmdTokens = bashInput.command.trim().split(/\s+/);
    if (attrs.bash_command = cmdTokens[0] || "", attrs.full_command = bashInput.command, bashInput.timeout !== void 0) attrs.timeout = bashInput.timeout;
    if (bashInput.description !== void 0) attrs.description = bashInput.description;
    if ("dangerouslyDisableSandbox" in bashInput) attrs.dangerouslyDisableSandbox = bashInput.dangerouslyDisableSandbox;
  } else if (isWebFetch) {
    let webFetchInput = toolInput,
      cmdTokens = webFetchInput.command.trim().split(/\s+/);
    if (attrs.bash_command = cmdTokens[0] || "", attrs.full_command = webFetchInput.command, webFetchInput.timeout_ms !== void 0) attrs.timeout = webFetchInput.timeout_ms;
  }
  let mcpParsed = hfi(toolName);
  if (mcpParsed) attrs.mcp_server_name = mcpParsed.serverName, attrs.mcp_tool_name = mcpParsed.mcpToolName;
  let skillName = CNr(toolName, toolInput, extraArg);
  if (skillName) attrs.skill_name = skillName;
  let subagentType = vNr(toolName, toolInput);
  if (subagentType) attrs.subagent_type = subagentType;
  return attrs;
}

// Recursively truncate a value for safe telemetry serialization (caps depth, array/object size, string length)
function SNr(value: any, depth: number = 0): any {
  if (typeof value === "string") {
    if (value.length > RJu) return `${value.slice(0, xJu)}…[${value.length} chars]`;
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean" || value === null || value === void 0) return value;
  if (depth >= kJu) return "<nested>";
  if (Array.isArray(value)) {
    let truncatedArr = value.slice(0, R_n).map(item => SNr(item, depth + 1));
    if (value.length > R_n) truncatedArr.push(`…[${value.length} items]`);
    return truncatedArr;
  }
  if (typeof value === "object") {
    let filteredEntries = Object.entries(value).filter(([key]) => !key.startsWith("_")),
      truncatedEntries = filteredEntries.slice(0, R_n).map(([key, val]) => [key, SNr(val, depth + 1)]);
    if (filteredEntries.length > R_n) truncatedEntries.push(["…", `${filteredEntries.length} keys`]);
    return Object.fromEntries(truncatedEntries);
  }
  return String(value);
}

// Serialize a tool input to a JSON string, truncated to mfi chars, for OTEL logging
function gfi(toolInput: any): any {
  if (!wA()) return;
  let truncated = SNr(toolInput),
    encoded = Le(truncated);
  if (encoded.length > mfi) encoded = encoded.slice(0, mfi) + "…[truncated]";
  return encoded;
}

// Extract the file extension from a path for telemetry, capped at HJu chars
function Gse(filePath: any): any {
  let ext = ffi.extname(filePath).toLowerCase();
  if (!ext || ext === ".") return;
  let extName = ext.slice(1);
  if (extName.length > HJu) return Qe("other");
  return fromSanitizer_SANITIZER_OUTPUT_ONLY(extName);
}

// Parse file extensions touched by a shell command (looks for known file-touching commands and their args)
function _fi(commandStr: any, targetFile: any): any {
  if (!commandStr.includes(".") && !targetFile) return;
  let primaryExt,
    seenExts = new Set();
  if (targetFile) {
    let targetExtResult = Gse(targetFile);
    if (targetExtResult) seenExts.add(targetExtResult), primaryExt = targetExtResult;
  }
  for (let segment of commandStr.split(DJu)) {
    if (!segment) continue;
    let tokens = segment.split(PJu);
    if (tokens.length < 2) continue;
    let cmd = tokens[0],
      lastSlash = cmd.lastIndexOf("/"),
      cmdBase = lastSlash >= 0 ? cmd.slice(lastSlash + 1) : cmd;
    if (!IJu.has(cmdBase)) continue;
    for (let tokenIdx = 1; tokenIdx < tokens.length; tokenIdx++) {
      let token = tokens[tokenIdx];
      if (token.charCodeAt(0) === 45) continue; // skip flags (starting with '-')
      let extResult = Gse(token);
      if (extResult && !seenExts.has(extResult)) seenExts.add(extResult), primaryExt = primaryExt ? primaryExt + "," + extResult : extResult;
    }
  }
  if (!primaryExt) return;
  return fromSanitizer_SANITIZER_OUTPUT_ONLY(primaryExt);
}

// Extract all document/code file extensions mentioned in a string (for telemetry)
function wNr(text: any): any {
  if (!text.includes(".")) return;
  let foundExts = new Set();
  for (let matchArr of text.toLowerCase().matchAll(OJu)) foundExts.add(matchArr[1]);
  if (foundExts.size === 0) return;
  let sortedExts = [...foundExts].sort().join(",");
  return fromSanitizer_SANITIZER_OUTPUT_ONLY(sortedExts);
}

// Count total bytes of document/image content blocks across all messages in a conversation
function yfi(messages: any): any {
  if (!messages) return 0;
  let totalBytes = 0;
  for (let msg of messages) {
    if (msg.type !== "user" && msg.type !== "assistant") continue;
    let content = msg.message.content;
    if (!Array.isArray(content)) continue;
    for (let block of content) if (block.type === "document" || block.type === "image") totalBytes += Le(block).length;
  }
  return totalBytes;
}

// Sanitize a semver-like version string for telemetry
function _T(versionStr: any): any {
  if (versionStr == null) return Qe("none");
  let match = versionStr.match(LJu);
  if (match) return fromSanitizer_SANITIZER_OUTPUT_ONLY(match[0]);
  return Qe("other");
}

// Sanitize a platform string, returning "other" for unrecognized platforms
function c5(platformStr: any): any {
  if (platformStr == null) return Qe("none");
  if (MJu.has(platformStr)) return fromSanitizer_SANITIZER_OUTPUT_ONLY(platformStr);
  return Qe("other");
}

// Build the agent context attributes (agentId, agentType, parentSessionId, teamName) for telemetry
function NJu(): any {
  let agentStore = mwt.getStore();
  if (agentStore) {
    let agentCtx: any = {
      agentId: agentStore.agentId,
      parentSessionId: agentStore.parentSessionId,
      agentType: agentStore.agentType
    };
    if (agentStore.parentAgentId) agentCtx.parentAgentId = agentStore.parentAgentId;
    if (agentStore.agentType === "teammate") agentCtx.teamName = agentStore.teamName;
    return agentCtx;
  }
  let agentId = getAgentId(),
    parentSessionId = u4(),
    teamName = getTeamName(),
    agentType = isTeammate() ? "teammate" : agentId ? "standalone" : void 0;
  if (agentId || agentType || parentSessionId || teamName) return {
    ...(agentId && {
      agentId: agentId
    }),
    ...(agentType && {
      agentType: agentType
    }),
    ...(parentSessionId && {
      parentSessionId: parentSessionId
    }),
    ...(teamName && {
      teamName: teamName
    })
  };
  let fallbackParentSessionId = getParentSessionId();
  if (fallbackParentSessionId) return {
    parentSessionId: fallbackParentSessionId
  };
  return {};
}

// Return a snapshot of the current peak memory usage counters
function Tfi(): any {
  return {
    ...hFe
  };
}

// Collect current process metrics (memory, CPU usage, uptime) and update peak memory stats
function FJu(): any {
  try {
    let mem = process.memoryUsage();
    if (mem.rss > hFe.rss) hFe.rss = mem.rss;
    if (mem.heapUsed > hFe.heapUsed) hFe.heapUsed = mem.heapUsed;
    if (mem.external > hFe.external) hFe.external = mem.external;
    cNr();
    let cpuUsage = process.cpuUsage(),
      nowMs = Date.now(),
      cpuPercent;
    if (x_n && TNr) {
      let elapsedMs = nowMs - TNr;
      if (elapsedMs > 0) {
        let userDelta = cpuUsage.user - x_n.user,
          sysDelta = cpuUsage.system - x_n.system;
        cpuPercent = (userDelta + sysDelta) / (elapsedMs * 1000) * 100;
      }
    }
    return x_n = cpuUsage, TNr = nowMs, {
      uptime: process.uptime(),
      rss: mem.rss,
      heapTotal: mem.heapTotal,
      heapUsed: mem.heapUsed,
      external: mem.external,
      arrayBuffers: mem.arrayBuffers,
      constrainedMemory: process.constrainedMemory(),
      cpuUsage: cpuUsage,
      cpuPercent: cpuPercent
    };
  } catch {
    return;
  }
}

// Build the full telemetry properties object for a session event
async function k_n(opts: any = {}): Promise<any> {
  let model = opts.model ? String(opts.model) : getMainLoopModel(),
    betas = typeof opts.betas === "string" ? opts.betas : BR(e5(model)).join(","),
    [envContext, repoRemoteHash] = await Promise.all([BJu(), getRepoRemoteHash()]),
    processMetrics = FJu(),
    sessionKind = uNe(),
    hasAttacher = sessionKind ? getAttacherCaps() !== null ? "1" : "0" : void 0,
    rendererMode = getRendererModeForAnalytics();
  return {
    model: model,
    sessionId: getSessionId(),
    userType: "external",
    ...(betas.length > 0 && {
      betas: betas
    }),
    envContext: envContext,
    ...(process.env.CLAUDE_CODE_ENTRYPOINT && {
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT
    }),
    ...(sessionKind && {
      sessionKind: sessionKind
    }),
    ...(hasAttacher && {
      hasAttacher: hasAttacher
    }),
    ...(process.env.CLAUDE_AGENT_SDK_VERSION && {
      agentSdkVersion: process.env.CLAUDE_AGENT_SDK_VERSION
    }),
    isInteractive: String(getIsInteractive()),
    clientType: getClientType(),
    ...(processMetrics && {
      processMetrics: processMetrics
    }),
    sweBenchRunId: process.env.SWE_BENCH_RUN_ID || "",
    sweBenchInstanceId: process.env.SWE_BENCH_INSTANCE_ID || "",
    sweBenchTaskId: process.env.SWE_BENCH_TASK_ID || "",
    ...NJu(),
    ...(getSubscriptionType() && {
      subscriptionType: getSubscriptionType()
    }),
    ...(repoRemoteHash && {
      rh: repoRemoteHash
    }),
    ...(rendererMode && {
      rendererMode: rendererMode
    })
  };
}

// Transform raw session properties into the structured telemetry event shape (env/core/auth/additional)
function Sfi(sessionProps: any, authInfo: any, extraAdditional: any = {}): any {
  let {
      envContext: envCtx,
      processMetrics: processMetricsVal,
      rh: repoHash,
      coachMode: coachModeVal,
      observerMode: observerModeVal,
      sessionKind: sessionKindVal,
      hasAttacher: hasAttacherVal,
      rendererMode: rendererModeVal,
      subscriptionType: subscriptionTypeVal,
      parentAgentId: parentAgentIdVal,
      ...coreProps
    } = sessionProps,
    envPayload: any = {
      platform: envCtx.platform,
      platform_raw: envCtx.platformRaw,
      arch: envCtx.arch,
      node_version: envCtx.nodeVersion,
      terminal: envCtx.terminal || "unknown",
      shell: envCtx.shell,
      package_managers: envCtx.packageManagers,
      runtimes: envCtx.runtimes,
      is_running_with_bun: envCtx.isRunningWithBun,
      is_ci: envCtx.isCi,
      is_claubbit: envCtx.isClaubbit,
      is_claude_code_remote: envCtx.isClaudeCodeRemote,
      is_local_agent_mode: envCtx.isLocalAgentMode,
      is_conductor: envCtx.isConductor,
      is_github_action: envCtx.isGithubAction,
      is_claude_code_action: envCtx.isClaudeCodeAction,
      is_claude_ai_auth: envCtx.isClaudeAiAuth,
      version: envCtx.version,
      build_time: envCtx.buildTime,
      deployment_environment: envCtx.deploymentEnvironment
    };
  if (envCtx.remoteEnvironmentType) envPayload.remote_environment_type = envCtx.remoteEnvironmentType;
  if (envCtx.claudeCodeContainerId) envPayload.claude_code_container_id = envCtx.claudeCodeContainerId;
  if (envCtx.claudeCodeRemoteSessionId) envPayload.claude_code_remote_session_id = envCtx.claudeCodeRemoteSessionId;
  if (envCtx.tags) envPayload.tags = envCtx.tags.split(",").map((tag: any) => tag.trim()).filter(Boolean);
  if (envCtx.githubEventName) envPayload.github_event_name = envCtx.githubEventName;
  if (envCtx.githubActionsRunnerEnvironment) envPayload.github_actions_runner_environment = envCtx.githubActionsRunnerEnvironment;
  if (envCtx.githubActionsRunnerOs) envPayload.github_actions_runner_os = envCtx.githubActionsRunnerOs;
  if (envCtx.githubActionRef) envPayload.github_action_ref = envCtx.githubActionRef;
  if (envCtx.wslVersion) envPayload.wsl_version = envCtx.wslVersion;
  if (envCtx.linuxDistroId) envPayload.linux_distro_id = envCtx.linuxDistroId;
  if (envCtx.linuxDistroVersion) envPayload.linux_distro_version = envCtx.linuxDistroVersion;
  if (envCtx.linuxKernel) envPayload.linux_kernel = envCtx.linuxKernel;
  if (envCtx.vcs) envPayload.vcs = envCtx.vcs;
  if (envCtx.versionBase) envPayload.version_base = envCtx.versionBase;
  let corePayload: any = {
    session_id: coreProps.sessionId,
    model: coreProps.model,
    user_type: coreProps.userType,
    is_interactive: coreProps.isInteractive === "true",
    client_type: coreProps.clientType
  };
  if (coreProps.betas) corePayload.betas = coreProps.betas;
  if (coreProps.entrypoint) corePayload.entrypoint = coreProps.entrypoint;
  if (coreProps.agentSdkVersion) corePayload.agent_sdk_version = coreProps.agentSdkVersion;
  if (coreProps.sweBenchRunId) corePayload.swe_bench_run_id = coreProps.sweBenchRunId;
  if (coreProps.sweBenchInstanceId) corePayload.swe_bench_instance_id = coreProps.sweBenchInstanceId;
  if (coreProps.sweBenchTaskId) corePayload.swe_bench_task_id = coreProps.sweBenchTaskId;
  if (coreProps.agentId) corePayload.agent_id = coreProps.agentId;
  if (coreProps.parentSessionId) corePayload.parent_session_id = coreProps.parentSessionId;
  if (coreProps.agentType) corePayload.agent_type = coreProps.agentType;
  if (coreProps.teamName) corePayload.team_name = coreProps.teamName;
  if (authInfo.githubActionsMetadata) {
    let ghMeta = authInfo.githubActionsMetadata;
    envPayload.github_actions_metadata = {
      actor_id: ghMeta.actorId,
      repository_id: ghMeta.repositoryId,
      repository_owner_id: ghMeta.repositoryOwnerId
    };
  }
  let authPayload;
  if (authInfo.accountUuid || authInfo.organizationUuid) authPayload = {
    account_uuid: authInfo.accountUuid,
    organization_uuid: authInfo.organizationUuid
  };
  return {
    env: envPayload,
    ...(processMetricsVal && {
      process: Buffer.from(Le(processMetricsVal)).toString("base64")
    }),
    ...(authPayload && {
      auth: authPayload
    }),
    core: corePayload,
    additional: {
      ...(repoHash && {
        rh: repoHash
      }),
      ...(coachModeVal && {
        coach_mode: coachModeVal
      }),
      ...(observerModeVal && {
        observer_mode: observerModeVal
      }),
      ...(sessionKindVal && {
        session_kind: sessionKindVal
      }),
      ...(hasAttacherVal && {
        has_attacher: hasAttacherVal
      }),
      ...(rendererModeVal && {
        renderer_mode: rendererModeVal
      }),
      ...(subscriptionTypeVal && {
        subscription_type: subscriptionTypeVal
      }),
      ...(parentAgentIdVal && {
        parent_agent_id: parentAgentIdVal
      }),
      ...extraAdditional
    }
  };
}

// Module-level variable declarations and constants
var ffi: any,
  // path module (require("path"))
  pfi: any,
  // tool name alias map: minified tool name -> canonical string
  bNr: any,
  // set of server names that always get MCP name emitted
  RJu = 512,
  // max string length before truncation
  xJu = 128,
  // truncated string prefix length
  mfi = 4096,
  // max serialized tool input size in chars
  R_n = 20,
  // max array/object entries before truncation
  kJu = 2,
  // max recursion depth for SNr
  HJu = 10,
  // max file extension length
  IJu: any,
  // set of file-touching shell commands to scan for extensions
  DJu: any,
  // regex to split shell command string on operators (&& || ; |)
  PJu: any,
  // regex to split on whitespace
  OJu: any,
  // regex to match known document file extensions in text
  LJu: any,
  // regex to extract semver from version string
  MJu: any,
  // set of recognized platform strings
  bHt: any,
  // lazy: base version string (major.minor.patch without pre-release suffix)
  BJu: any,
  // lazy async: environment context object
  x_n: any = null,
  // previous CPU usage sample for delta calculation
  TNr: any = null,
  // timestamp of previous CPU usage sample
  hFe: any; // peak memory usage counters

var $u = b(() => {
  ta();
  Lr();
  a5();
  g1();
  jR();
  Mo();
  lt();
  sn();
  QXe();
  _Nr();
  wfe();
  sve();
  Sw();
  Ao();
  hp();
  Ba();
  qs();
  S_();
  Xt();
  Am();
  eQe();
  WS();
  ffi = require("path"), pfi = {
    [wEt]: "Bash",
    [Cns]: "WebFetch"
  };
  bNr = new Set([_K]);
  IJu = new Set(["rm", "mv", "cp", "touch", "mkdir", "chmod", "chown", "cat", "head", "tail", "sort", "stat", "diff", "wc", "grep", "rg", "sed"]), DJu = /\s*(?:&&|\|\||[;|])\s*/, PJu = /\s+/;
  OJu = /\.(csv|docx?|html|json|md|od[pst]|pdf|pptx?|rtf|txt|xlsx?)\b/g;
  LJu = /^\d+\.\d+\.\d+(-(?:dev|alpha|beta|rc|test|nightly)(?![a-z_-])\d{0,8}(?:\.[a-z0-9.]{0,40})?)?/;
  MJu = new Set(["darwin", "linux", "win32", "freebsd", "openbsd", "netbsd", "android", "aix", "sunos", "cygwin", "haiku", "macos", "windows", "wsl", "unknown"]);
  bHt = wn(() => {
    let e = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION.match(/^\d+\.\d+\.\d+(?:-[a-z]+)?/);
    return e ? e[0] : void 0;
  }), BJu = wn(async () => {
    let [e, t, n, r] = await Promise.all([je.getPackageManagers(), je.getRuntimes(), IXo(), PXo()]);
    return {
      platform: hbt(),
      platformRaw: process.env.CLAUDE_CODE_HOST_PLATFORM || "darwin",
      arch: je.arch,
      nodeVersion: je.nodeVersion,
      terminal: k1.terminal,
      shell: mmr(),
      packageManagers: e.join(","),
      runtimes: t.join(","),
      isRunningWithBun: je.isRunningWithBun(),
      isCi: st(!1),
      isClaubbit: je.CLAUBBIT,
      isClaudeCodeRemote: st(process.env.CLAUDE_CODE_REMOTE),
      isLocalAgentMode: process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent",
      isConductor: je.isConductor(),
      ...(process.env.CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE && {
        remoteEnvironmentType: process.env.CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE
      }),
      ...{},
      ...(process.env.CLAUDE_CODE_CONTAINER_ID && {
        claudeCodeContainerId: process.env.CLAUDE_CODE_CONTAINER_ID
      }),
      ...(process.env.CLAUDE_CODE_REMOTE_SESSION_ID && {
        claudeCodeRemoteSessionId: process.env.CLAUDE_CODE_REMOTE_SESSION_ID
      }),
      ...(process.env.CLAUDE_CODE_TAGS && {
        tags: process.env.CLAUDE_CODE_TAGS
      }),
      isGithubAction: st(process.env.GITHUB_ACTIONS),
      isClaudeCodeAction: st(process.env.CLAUDE_CODE_ACTION),
      isClaudeAiAuth: isClaudeAISubscriber(),
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION,
      versionBase: bHt(),
      buildTime: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.BUILD_TIME,
      deploymentEnvironment: je.detectDeploymentEnvironment(),
      ...(st(process.env.GITHUB_ACTIONS) && {
        githubEventName: process.env.GITHUB_EVENT_NAME,
        githubActionsRunnerEnvironment: process.env.RUNNER_ENVIRONMENT,
        githubActionsRunnerOs: process.env.RUNNER_OS,
        githubActionRef: process.env.GITHUB_ACTION_PATH?.includes("claude-code-action/") ? process.env.GITHUB_ACTION_PATH.split("claude-code-action/")[1] : void 0
      }),
      ...($Me() && {
        wslVersion: $Me()
      }),
      ...(n ?? {}),
      ...(r.length > 0 && {
        vcs: r.join(",")
      })
    };
  }), hFe = {
    rss: 0,
    heapUsed: 0,
    external: 0
  };
});
export {ns,ky,eQe,Qi,Rfe,wA,tQe,nQe,ENr,l5,hfi,CNr,vNr,SHt,SNr,gfi,Gse,_fi,wNr,yfi,_T,c5,NJu,Tfi,FJu,k_n,Sfi,ffi,pfi,bNr,RJu,xJu,mfi,R_n,kJu,HJu,IJu,DJu,PJu,OJu,LJu,MJu,bHt,BJu,x_n,TNr,hFe,$u};
