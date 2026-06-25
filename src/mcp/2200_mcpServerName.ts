// @ts-nocheck
import {isKeybindingCustomizationEnabled as Ng,Ve} from "../../vendor/m5.ts";
import {Xg,M2r,XZe} from "../agent/2193_kind.ts";
import {nt} from "../../vendor/m127.ts";
import {sSi,V2r} from "../telemetry/2197_urls.ts";
import {$3,vfe} from "../../vendor/m2048.ts";
import {aSi,ZZe,eet} from "../../vendor/m2198.ts";
import {ZRt,gA,yls} from "./0733_serverName.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Ukt,Ph} from "../agent/1459_agentType.ts";
import {getAgentId as aD,H3,getTeamName as up,isTeammate as um,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {getParentSessionId as Msr,getAttacherCaps as Ey,getRendererModeForAnalytics as gJt,getSessionId as It,getIsInteractive as ck,getClientType as SSt,lt} from "../session/0132_sent.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Yv,xM} from "../../vendor/m1450.ts";
import {h8,MR} from "../config/2033_allowed.ts";
import {getRepoRemoteHash as _on,ia} from "../../vendor/m698.ts";
import {iFe,vd} from "../session/1465_promise.ts";
import {getSubscriptionType as vi,lo,isClaudeAISubscriber as Eo} from "../config/2036_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Ir} from "../../vendor/m584.ts";
import {E8,WM} from "../config/2192_terminal.ts";
import {dn} from "../config/0137_namespace.ts";
import {Mfe,q7} from "../computer-use/2198_iTerm_app.ts";
import {Es,krs,Irs,O1e} from "../../vendor/m641.ts";
import {QT} from "../../vendor/m1461.ts";
import {Ne} from "../../vendor/m583.ts";
import {qAt,q_r} from "../config/0577_externalHttp.ts";
// @ts-nocheck

// The canonical tool name for the Bash built-in tool
var Mo = "Bash";

// Sanitize a tool name for telemetry; returns undefined if it doesn't match safe pattern
function Zf(toolName: any): any {
  if (toolName == null) return;
  return /^[A-Za-z0-9._:[\]-]{1,100}$/.test(toolName) ? Ng(toolName) : Ve("nonconforming");
}

// No-op placeholder (used to satisfy import side-effects or as an empty callback)
var tet = () => {};

// Normalize a tool name for analytics: use allowlist alias, or "mcp_tool" for MCP tools, or pass through
function Pi(toolName: any): any {
  let alias = Object.hasOwn(lSi, toolName) ? lSi[toolName] : void 0;
  if (alias) return Ng(alias);
  if (toolName.startsWith("mcp__")) return Ve("mcp_tool");
  return Ng(toolName);
}

// Get the agent fingerprint string (e.g. model name) sanitized for telemetry
function JQ(agentFingerprint: any): any {
  return Ng(Xg(agentFingerprint) ?? "");
}

// Check whether OTEL detailed tool attribute logging is enabled
function If(): any {
  return nt(process.env.OTEL_LOG_TOOL_DETAILS);
}

// Check whether OTEL tool content logging is enabled
function net(): any {
  return nt(process.env.OTEL_LOG_TOOL_CONTENT);
}

// Returns true when MCP server name/URL indicates a trusted internal context
function cSi(serverName: any, serverUrl: any): any {
  if (process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent") return !0;
  if (serverName === "claudeai-proxy") return !0;
  if (serverUrl && sSi(serverUrl)) return !0;
  if (serverUrl && $3(serverUrl)) return !0;
  return !1;
}

// Returns true when the tool should have MCP server name emitted (either allowlisted or trusted server)
function zRe(serverName: any, serverUrl: any): any {
  if (X2r.has(serverName)) return !0;
  if (serverUrl === void 0) return cSi(void 0, void 0);
  if ("url" in serverUrl && aSi(serverUrl.url)) return !0;
  return cSi(serverUrl.type, ZZe(serverUrl));
}

// Extract MCP server/tool name attributes for telemetry, gated by trust check
function C8(toolName: any, mcpServerConfig: any): any {
  if (!mcpServerConfig) return {};
  let parsed = lbn(toolName);
  if (!parsed) return {};
  return {
    mcpServerName: parsed.serverName,
    mcpToolName: parsed.mcpToolName
  };
}

// Parse an MCP tool name of form "mcp__<serverName>__<toolName>" into its parts
function lbn(toolName: any): any {
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
function Q2r(toolName: any, toolInput: any, extraArg: any): any {
  if (toolName !== "Skill") return;
  if (typeof toolInput === "object" && toolInput !== null && "skill" in toolInput && typeof toolInput.skill === "string") return toolInput.skill;
  return;
}

// Extract the subagent_type from an Agent or Task tool invocation's input
function Z2r(toolName: any, toolInput: any): any {
  if (toolName !== "Agent" && toolName !== "Task") return;
  if (typeof toolInput === "object" && toolInput !== null && "subagent_type" in toolInput && typeof toolInput.subagent_type === "string") return toolInput.subagent_type;
  return;
}

// Build a structured attributes object for tool-detail OTEL spans (Bash command, MCP info, skill, subagent)
function jxt(toolName: any, toolInput: any, extraArg: any): any {
  let attrs: any = {};
  if (!If()) return attrs;
  // Check if this is a Bash or WebFetch invocation (both have a "command" field)
  let isBash = toolName === Mo && toolInput !== null && typeof toolInput === "object" && "command" in toolInput && typeof toolInput.command === "string",
    isWebFetch = toolName === ZRt && toolInput !== null && typeof toolInput === "object" && "command" in toolInput && typeof toolInput.command === "string";
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
  let mcpParsed = lbn(toolName);
  if (mcpParsed) attrs.mcp_server_name = mcpParsed.serverName, attrs.mcp_tool_name = mcpParsed.mcpToolName;
  let skillName = Q2r(toolName, toolInput, extraArg);
  if (skillName) attrs.skill_name = skillName;
  let subagentType = Z2r(toolName, toolInput);
  if (subagentType) attrs.subagent_type = subagentType;
  return attrs;
}

// Recursively truncate a value for safe telemetry serialization (caps depth, array/object size, string length)
function J2r(value: any, depth: number = 0): any {
  if (typeof value === "string") {
    if (value.length > Yid) return `${value.slice(0, Jid)}…[${value.length} chars]`;
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean" || value === null || value === void 0) return value;
  if (depth >= Xid) return "<nested>";
  if (Array.isArray(value)) {
    let truncatedArr = value.slice(0, ibn).map(item => J2r(item, depth + 1));
    if (value.length > ibn) truncatedArr.push(`…[${value.length} items]`);
    return truncatedArr;
  }
  if (typeof value === "object") {
    let filteredEntries = Object.entries(value).filter(([key]) => !key.startsWith("_")),
      truncatedEntries = filteredEntries.slice(0, ibn).map(([key, val]) => [key, J2r(val, depth + 1)]);
    if (filteredEntries.length > ibn) truncatedEntries.push(["…", `${filteredEntries.length} keys`]);
    return Object.fromEntries(truncatedEntries);
  }
  return String(value);
}

// Serialize a tool input to a JSON string, truncated to uSi chars, for OTEL logging
function mSi(toolInput: any): any {
  if (!If()) return;
  let truncated = J2r(toolInput),
    encoded = Pe(truncated);
  if (encoded.length > uSi) encoded = encoded.slice(0, uSi) + "…[truncated]";
  return encoded;
}

// Extract the file extension from a path for telemetry, capped at Qid chars
function Vse(filePath: any): any {
  let ext = dSi.extname(filePath).toLowerCase();
  if (!ext || ext === ".") return;
  let extName = ext.slice(1);
  if (extName.length > Qid) return Ve("other");
  return Ng(extName);
}

// Parse file extensions touched by a shell command (looks for known file-touching commands and their args)
function fSi(commandStr: any, targetFile: any): any {
  if (!commandStr.includes(".") && !targetFile) return;
  let primaryExt,
    seenExts = new Set();
  if (targetFile) {
    let targetExtResult = Vse(targetFile);
    if (targetExtResult) seenExts.add(targetExtResult), primaryExt = targetExtResult;
  }
  for (let segment of commandStr.split(ead)) {
    if (!segment) continue;
    let tokens = segment.split(tad);
    if (tokens.length < 2) continue;
    let cmd = tokens[0],
      lastSlash = cmd.lastIndexOf("/"),
      cmdBase = lastSlash >= 0 ? cmd.slice(lastSlash + 1) : cmd;
    if (!Zid.has(cmdBase)) continue;
    for (let tokenIdx = 1; tokenIdx < tokens.length; tokenIdx++) {
      let token = tokens[tokenIdx];
      if (token.charCodeAt(0) === 45) continue; // skip flags (starting with '-')
      let extResult = Vse(token);
      if (extResult && !seenExts.has(extResult)) seenExts.add(extResult), primaryExt = primaryExt ? primaryExt + "," + extResult : extResult;
    }
  }
  if (!primaryExt) return;
  return Ng(primaryExt);
}

// Extract all document/code file extensions mentioned in a string (for telemetry)
function e$r(text: any): any {
  if (!text.includes(".")) return;
  let foundExts = new Set();
  for (let matchArr of text.toLowerCase().matchAll(nad)) foundExts.add(matchArr[1]);
  if (foundExts.size === 0) return;
  let sortedExts = [...foundExts].sort().join(",");
  return Ng(sortedExts);
}

// Count total bytes of document/image content blocks across all messages in a conversation
function hSi(messages: any): any {
  if (!messages) return 0;
  let totalBytes = 0;
  for (let msg of messages) {
    if (msg.type !== "user" && msg.type !== "assistant") continue;
    let content = msg.message.content;
    if (!Array.isArray(content)) continue;
    for (let block of content) if (block.type === "document" || block.type === "image") totalBytes += Pe(block).length;
  }
  return totalBytes;
}

// Sanitize a semver-like version string for telemetry
function cT(versionStr: any): any {
  if (versionStr == null) return Ve("none");
  let match = versionStr.match(rad);
  if (match) return Ng(match[0]);
  return Ve("other");
}

// Sanitize a platform string, returning "other" for unrecognized platforms
function A8(platformStr: any): any {
  if (platformStr == null) return Ve("none");
  if (oad.has(platformStr)) return Ng(platformStr);
  return Ve("other");
}

// Build the agent context attributes (agentId, agentType, parentSessionId, teamName) for telemetry
function sad(): any {
  let agentStore = Ukt.getStore();
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
  let agentId = aD(),
    parentSessionId = H3(),
    teamName = up(),
    agentType = um() ? "teammate" : agentId ? "standalone" : void 0;
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
  let fallbackParentSessionId = Msr();
  if (fallbackParentSessionId) return {
    parentSessionId: fallbackParentSessionId
  };
  return {};
}

// Return a snapshot of the current peak memory usage counters
function gSi(): any {
  return {
    ...mUe
  };
}

// Collect current process metrics (memory, CPU usage, uptime) and update peak memory stats
function aad(): any {
  try {
    let mem = process.memoryUsage();
    if (mem.rss > mUe.rss) mUe.rss = mem.rss;
    if (mem.heapUsed > mUe.heapUsed) mUe.heapUsed = mem.heapUsed;
    if (mem.external > mUe.external) mUe.external = mem.external;
    M2r();
    let cpuUsage = process.cpuUsage(),
      nowMs = Date.now(),
      cpuPercent;
    if (abn && Y2r) {
      let elapsedMs = nowMs - Y2r;
      if (elapsedMs > 0) {
        let userDelta = cpuUsage.user - abn.user,
          sysDelta = cpuUsage.system - abn.system;
        cpuPercent = (userDelta + sysDelta) / (elapsedMs * 1000) * 100;
      }
    }
    return abn = cpuUsage, Y2r = nowMs, {
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
async function cbn(opts: any = {}): Promise<any> {
  let model = opts.model ? String(opts.model) : gs(),
    betas = typeof opts.betas === "string" ? opts.betas : Yv(h8(model)).join(","),
    [envContext, repoRemoteHash] = await Promise.all([iad(), _on()]),
    processMetrics = aad(),
    sessionKind = iFe(),
    hasAttacher = sessionKind ? Ey() !== null ? "1" : "0" : void 0,
    rendererMode = gJt();
  return {
    model: model,
    sessionId: It(),
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
    isInteractive: String(ck()),
    clientType: SSt(),
    ...(processMetrics && {
      processMetrics: processMetrics
    }),
    sweBenchRunId: process.env.SWE_BENCH_RUN_ID || "",
    sweBenchInstanceId: process.env.SWE_BENCH_INSTANCE_ID || "",
    sweBenchTaskId: process.env.SWE_BENCH_TASK_ID || "",
    ...sad(),
    ...(vi() && {
      subscriptionType: vi()
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
function _Si(sessionProps: any, authInfo: any, extraAdditional: any = {}): any {
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
      process: Buffer.from(Pe(processMetricsVal)).toString("base64")
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
var dSi, // path module (require("path"))
  lSi, // tool name alias map: minified tool name -> canonical string
  X2r, // set of server names that always get MCP name emitted
  Yid = 512, // max string length before truncation
  Jid = 128, // truncated string prefix length
  uSi = 4096, // max serialized tool input size in chars
  ibn = 20, // max array/object entries before truncation
  Xid = 2, // max recursion depth for J2r
  Qid = 10, // max file extension length
  Zid, // set of file-touching shell commands to scan for extensions
  ead, // regex to split shell command string on operators (&& || ; |)
  tad, // regex to split on whitespace
  nad, // regex to match known document file extensions in text
  rad, // regex to extract semver from version string
  oad, // set of recognized platform strings
  Yxt, // lazy: base version string (major.minor.patch without pre-release suffix)
  iad, // lazy async: environment context object
  abn = null, // previous CPU usage sample for delta calculation
  Y2r = null, // timestamp of previous CPU usage sample
  mUe; // peak memory usage counters

var vu = b(() => {
  Wi();
  Ir();
  E8();
  xM();
  MR();
  Ro();
  lt();
  dn();
  XZe();
  V2r();
  Mfe();
  vfe();
  eet();
  gA();
  lo();
  vd();
  ia();
  Es();
  Ph();
  tn();
  Op();
  tet();
  QT();
  dSi = require("path"), lSi = {
    [ZRt]: "Bash",
    [yls]: "WebFetch"
  };
  X2r = new Set([q7]);
  Zid = new Set(["rm", "mv", "cp", "touch", "mkdir", "chmod", "chown", "cat", "head", "tail", "sort", "stat", "diff", "wc", "grep", "rg", "sed"]), ead = /\s*(?:&&|\|\||[;|])\s*/, tad = /\s+/;
  nad = /\.(csv|docx?|html|json|md|od[pst]|pdf|pptx?|rtf|txt|xlsx?)\b/g;
  rad = /^\d+\.\d+\.\d+(-(?:dev|alpha|beta|rc|test|nightly)(?![a-z_-])\d{0,8}(?:\.[a-z0-9.]{0,40})?)?/;
  oad = new Set(["darwin", "linux", "win32", "freebsd", "openbsd", "netbsd", "android", "aix", "sunos", "cygwin", "haiku", "macos", "windows", "wsl", "unknown"]);
  Yxt = Hn(() => {
    let e = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION.match(/^\d+\.\d+\.\d+(?:-[a-z]+)?/);
    return e ? e[0] : void 0;
  }), iad = Hn(async () => {
    let [e, t, n, r] = await Promise.all([Ne.getPackageManagers(), Ne.getRuntimes(), krs(), Irs()]);
    return {
      platform: qAt(),
      platformRaw: process.env.CLAUDE_CODE_HOST_PLATFORM || "darwin",
      arch: Ne.arch,
      nodeVersion: Ne.nodeVersion,
      terminal: WM.terminal,
      shell: q_r(),
      packageManagers: e.join(","),
      runtimes: t.join(","),
      isRunningWithBun: Ne.isRunningWithBun(),
      isCi: nt(!1),
      isClaubbit: Ne.CLAUBBIT,
      isClaudeCodeRemote: nt(process.env.CLAUDE_CODE_REMOTE),
      isLocalAgentMode: process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent",
      isConductor: Ne.isConductor(),
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
      isGithubAction: nt(process.env.GITHUB_ACTIONS),
      isClaudeCodeAction: nt(process.env.CLAUDE_CODE_ACTION),
      isClaudeAiAuth: Eo(),
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      versionBase: Yxt(),
      buildTime: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.BUILD_TIME,
      deploymentEnvironment: Ne.detectDeploymentEnvironment(),
      ...(nt(process.env.GITHUB_ACTIONS) && {
        githubEventName: process.env.GITHUB_EVENT_NAME,
        githubActionsRunnerEnvironment: process.env.RUNNER_ENVIRONMENT,
        githubActionsRunnerOs: process.env.RUNNER_OS,
        githubActionRef: process.env.GITHUB_ACTION_PATH?.includes("claude-code-action/") ? process.env.GITHUB_ACTION_PATH.split("claude-code-action/")[1] : void 0
      }),
      ...(O1e() && {
        wslVersion: O1e()
      }),
      ...(n ?? {}),
      ...(r.length > 0 && {
        vcs: r.join(",")
      })
    };
  }), mUe = {
    rss: 0,
    heapUsed: 0,
    external: 0
  };
});

export {Mo,Zf,tet,Pi,JQ,If,net,cSi,zRe,C8,lbn,Q2r,Z2r,jxt,J2r,mSi,Vse,fSi,e$r,hSi,cT,A8,sad,gSi,aad,cbn,_Si,dSi,lSi,X2r,Yid,Jid,uSi,ibn,Xid,Qid,Zid,ead,tad,nad,rad,oad,Yxt,iad,abn,Y2r,mUe,vu};
