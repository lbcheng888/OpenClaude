// @ts-nocheck
import {Hot,EIn,Cae} from "../../vendor/m2788.ts";
import {NAe,Ph} from "../agent/1459_agentType.ts";
import {CFt,yQr} from "../../vendor/m3211.ts";
import {tdt,o3t} from "./3946_answers.ts";
import {lu,Cf,zf} from "../../vendor/m133.ts";
import {Ov,GN} from "../../vendor/m640.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {VD,GD,Dw} from "../core/5176_encoding.ts";
import {b} from "../../runtime.ts";
/**
 * Tool-use permission request "theme" builders.
 *
 * Each `build*Request` function turns a raw tool-use request (`req`) into a
 * normalized, UI-facing descriptor used by the permission prompt. The shared
 * `buildBaseRequest` collects fields common to every tool, and the specialized
 * builders layer on tool-specific fields (chrome target, hostname, questions,
 * monitor config, workflow script, artifact preview, skill, plan, etc.).
 *
 * Helpers `isControlChar` / `isPrintable` / `sanitizeControlChars` guard against
 * control characters leaking into rendered text.
 */

/** True if `code` is a C0/C1 control character (excluding TAB and LF). */
function isControlChar(code: number): boolean {
  if (code === 9 || code === 10) return false;
  return code < 32 || code >= 127 && code <= 159;
}

/** True if `str` contains no control characters. */
function isPrintable(str: string): boolean {
  for (let i = 0; i < str.length; i++) if (isControlChar(str.charCodeAt(i))) return false;
  return true;
}

/** Replace each control character in `str` with the Unicode replacement char. */
function sanitizeControlChars(str: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) result += isControlChar(str.charCodeAt(i)) ? "�" : str[i];
  return result;
}

/** Build the fields shared by every tool-use permission request descriptor. */
function buildBaseRequest(req: any) {
  let userFacingName = req.tool.userFacingName(req.input),
    hasMcpSuffix = userFacingName.endsWith(" (MCP)"),
    strippedName = hasMcpSuffix ? userFacingName.slice(0, -6) : userFacingName,
    renderedToolUseMessage = req.tool.renderToolUseMessage(req.input, {
      theme: req.theme,
      verbose: true
    });
  return {
    requestId: req.toolUseID,
    toolName: req.tool.name,
    input: req.input,
    description: req.description,
    permissionResult: req.permissionResult,
    userFacingName: strippedName,
    hasMcpSuffix: hasMcpSuffix,
    renderedToolUseMessage: renderedToolUseMessage,
    messageId: req.assistantMessage.message.id,
    isMcp: req.tool.isMcp ?? false,
    isAskCappedByOrg: req.tool.mcpInfo?.effectiveMaxPermission === "ask",
    showAlwaysAllow: Hot(),
    requestSource: req.requestSource
  };
}

/**
 * Resolve the agent attribution for a request: the workflow that spawned it,
 * or the subagent/teammate it belongs to. Returns undefined for the main session.
 */
function resolveRequestAgent(req: any) {
  let workflowRunId = req.spawnedByWorkflowRunId;
  if (workflowRunId !== undefined) {
    let workflowName;
    for (let entry of Object.values(req.taskRegistry.all())) if (entry.type === "local_workflow" && entry.workflowRunId === workflowRunId) {
      workflowName = entry.workflowName;
      break;
    }
    return {
      type: "workflow-agent",
      workflowName: workflowName
    };
  }
  let agentContext = req.agentContext;
  if (agentContext.agentType === "teammate") return {
    type: "subagent",
    agentName: agentContext.agentName
  };
  if (NAe(agentContext) && !agentContext.isMainSession) return {
    type: "subagent",
    agentName: agentContext.displayName ?? agentContext.subagentName
  };
  return;
}

/** Build a request descriptor for a Chrome / browser tool, attaching the target host. */
function buildChromeRequest(req: any) {
  let base = buildBaseRequest(req),
    chrome = req.permissionResult.metadata?.command?.chrome;
  if (!chrome && typeof req.input.url === "string") try {
    let parsed = new URL(req.input.url);
    if (parsed.host) chrome = {
      host: parsed.host,
      url: parsed.href
    };
  } catch {}
  return {
    ...base,
    chrome: chrome,
    verbPhrase: CFt(req.tool.name, req.input)
  };
}

/** Build a request descriptor that exposes the hostname parsed from `input.url`. */
function buildHostnameRequest(req: any) {
  let base = buildBaseRequest(req),
    url = req.input.url,
    hostname = "";
  if (typeof url === "string") try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = "";
  }
  return {
    ...base,
    hostname: hostname
  };
}

/** Build a request descriptor for the ask-user tool, surfacing parsed questions. */
function buildQuestionsRequest(req: any) {
  let base = buildBaseRequest(req),
    parsed = tdt.inputSchema.safeParse(req.input),
    questions = parsed.success ? parsed.data.questions ?? [] : [],
    metadataSource = parsed.success ? parsed.data.metadata?.source : undefined;
  return {
    ...base,
    questions: questions,
    metadataSource: metadataSource
  };
}

/** Build a request descriptor for the monitor tool (command / mcp target / interval). */
function buildMonitorRequest(req: any) {
  let base = buildBaseRequest(req),
    command = typeof req.input.command === "string" ? sanitizeControlChars(req.input.command) : undefined,
    mcp = req.input.mcp,
    mcpTarget = mcp !== null && typeof mcp === "object" && "server" in mcp && typeof mcp.server === "string" && "tool" in mcp && typeof mcp.tool === "string" ? {
      server: sanitizeControlChars(mcp.server),
      tool: sanitizeControlChars(mcp.tool)
    } : undefined,
    intervalMs = typeof req.input.interval_ms === "number" ? req.input.interval_ms : 30000,
    monitorDescription = typeof req.input.description === "string" ? sanitizeControlChars(req.input.description) : undefined;
  return {
    ...base,
    command: command,
    mcp: mcpTarget,
    intervalMs: intervalMs,
    monitorDescription: monitorDescription
  };
}

/** Build a request descriptor for the workflow tool (script / name / args). */
function buildWorkflowRequest(req: any) {
  let base = buildBaseRequest(req),
    script = typeof req.input.script === "string" ? req.input.script : "",
    workflowName = typeof req.input.name === "string" && req.input.name !== "" ? req.input.name : undefined,
    args = req.input.args;
  return {
    ...base,
    script: script,
    workflowName: workflowName,
    args: args
  };
}

/** Build a request descriptor for the artifact tool, including a file content preview. */
function buildArtifactRequest(req: any) {
  let base = buildBaseRequest(req),
    filePath = typeof req.input.filePath === "string" ? req.input.filePath : "",
    artifactTitle = typeof req.input.title === "string" ? req.input.title : "",
    artifactOptions = (Array.isArray(req.input.options) ? req.input.options : []).filter(opt => opt !== null && typeof opt === "object" && "label" in opt && typeof opt.label === "string" && "description" in opt && typeof opt.description === "string" && "value" in opt && typeof opt.value === "string").map(opt => ({
      label: opt.label,
      description: opt.description,
      value: opt.value
    })),
    fileContent;
  if (lu(filePath) && !Cf(filePath)) fileContent = `(Network path — content not previewed: ${filePath})`;else try {
    fileContent = Ov(filePath);
  } catch (err) {
    fileContent = In(err) ? `(File not found: ${filePath})` : `(Error reading file: ${String(err)})`;
  }
  return {
    ...base,
    filePath: filePath,
    artifactTitle: artifactTitle,
    artifactOptions: artifactOptions,
    fileContent: fileContent
  };
}

/** Build a request descriptor for the skill tool (skill name + description). */
function buildSkillRequest(req: any) {
  let base = buildBaseRequest(req),
    metadata = req.permissionResult.metadata,
    command = metadata !== null && typeof metadata === "object" && "command" in metadata && metadata.command !== null && typeof metadata.command === "object" ? metadata.command : undefined,
    commandName = command !== undefined && typeof command.name === "string" ? command.name : undefined,
    skillDescription = command !== undefined && typeof command.description === "string" ? command.description : undefined,
    skill = (typeof req.input.skill === "string" ? req.input.skill : undefined) ?? commandName ?? "";
  return {
    ...base,
    skill: skill,
    skillDescription: skillDescription
  };
}

/** Build a request descriptor that surfaces the raw command string. */
function buildCommandRequest(req: any) {
  let base = buildBaseRequest(req),
    command = typeof req.input.command === "string" ? req.input.command : "";
  return {
    ...base,
    command: command
  };
}

/** Build a request descriptor for the plan tool (plan text, file path, usage). */
function buildPlanRequest(req: any) {
  let base = buildBaseRequest(req),
    plan = VD() ?? "",
    planFilePath = GD(),
    allowedPrompts = Array.isArray(req.input.allowedPrompts) ? req.input.allowedPrompts : undefined,
    usage = req.assistantMessage.message.usage,
    usageSummary = usage && typeof usage.input_tokens === "number" ? {
      input_tokens: usage.input_tokens,
      cache_creation_input_tokens: usage.cache_creation_input_tokens,
      cache_read_input_tokens: usage.cache_read_input_tokens
    } : undefined;
  return {
    ...base,
    plan: plan,
    planFilePath: planFilePath,
    allowedPrompts: allowedPrompts,
    usage: usageSummary
  };
}

/** Build a request descriptor for the bash-classifier flow (command + classifier state). */
function buildClassifierRequest(req: any) {
  let base = buildBaseRequest(req),
    command = typeof req.input.command === "string" ? req.input.command : "",
    existingAllowDescriptions = EIn(req.toolPermissionContext);
  return {
    ...base,
    command: command,
    classifierState: req.classifierState,
    existingAllowDescriptions: existingAllowDescriptions
  };
}

var e9n = b(() => {
  o3t();
  Ph();
  zf();
  yQr();
  Ct();
  GN();
  Cae();
  Dw();
});

export {isControlChar as a2a,isPrintable as l2a,sanitizeControlChars as s3t,buildBaseRequest as WD,resolveRequestAgent as sdo,buildChromeRequest as c2a,buildHostnameRequest as u2a,buildQuestionsRequest as d2a,buildMonitorRequest as p2a,buildWorkflowRequest as m2a,buildArtifactRequest as f2a,buildSkillRequest as h2a,buildCommandRequest as g2a,buildPlanRequest as _2a,buildClassifierRequest as Z$n,e9n};
