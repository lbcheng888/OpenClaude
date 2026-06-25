// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {LUe,oz,$2,qEi} from "../../vendor/m2254.ts";
import {nqt,Gxe,rqt} from "../../vendor/m4196.ts";
import {Qr} from "../../vendor/m323.ts";
import {mn,xe} from "../telemetry/0600_feature_name.ts";
import {kt,logEvent as W} from "../../vendor/m132.ts";
import {vw,M$} from "../../vendor/m5178.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {lh,Dke} from "../../vendor/m2739.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {ly,getRuleByContentsForToolName as Ute} from "./5218_toolAlwaysAllowedRule.ts";
import {m5e,Ppt} from "../../vendor/m4184.ts";
import {ago,igo} from "../agent/4200_taskId.ts";
import {Nte,Bw} from "../../vendor/m4186.ts";
import {e7a,lgo} from "../agent/4201_e7a.ts";
import {t7a} from "../../vendor/m4201.ts";
import {g5e,Fte} from "../agent/4190_runId.ts";
import {S7a,g7a,_7a,y7a,T7a} from "../../vendor/m4206.ts";
import {L2,hC} from "../agent/2222_available.ts";
import {P$r,Obn} from "../config/2221_P$r.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {vD} from "../session/2702_resolveLoopFileFire.ts";
import {WORKFLOW_TOOL_NAME as AI} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {yKa} from "../agent/4186_parse.ts";
import {Ve,Le} from "../../vendor/m5.ts";
// @ts-nocheck
var ggo = {};
ft(ggo, {
  WorkflowTool: () => WorkflowTool,
  WorkflowInputError: () => WorkflowInputError
});
async function resolveWorkflowSource(input) {
  if (input.scriptPath) {
    if (input.script) return {
      script: input.script,
      resolvedScriptPath: A7a.resolve(Lt(), input.scriptPath)
    };
    let resolved = await LUe(input.scriptPath);
    if ("error" in resolved) return resolved;
    return {
      script: resolved.script,
      resolvedScriptPath: resolved.path
    };
  }
  if (input.name) {
    let predefined = await nqt(input.name, Lt());
    if (!predefined) {
      let availableNames = (await Gxe(Lt())).map(workflow => workflow.name).join(", ");
      return {
        error: `Workflow "${input.name}" not found. Available: ${availableNames || "(none)"}`
      };
    }
    return {
      script: input.script ?? predefined.script,
      source: predefined.source
    };
  }
  if (input.script) return {
    script: input.script
  };
  return {
    error: "Must provide script, name, or scriptPath"
  };
}
function telemetryWorkflowName(workflowName, source) {
  if (source === "built-in" && workflowName) return workflowName;
  return "custom";
}
function telemetryWorkflowDescription(description, source) {
  if (source === "built-in") return (description ?? "").slice(0, MAX_TELEMETRY_DESCRIPTION_LENGTH);
  return "";
}
var C7a,
  A7a,
  rBp,
  oBp,
  WorkflowInputError,
  MAX_TELEMETRY_DESCRIPTION_LENGTH = 200,
  E7a,
  WorkflowTool;
var _go = b(() => {
  Qr();
  mn();
  kt();
  vw();
  ri();
  lh();
  xl();
  Po();
  ly();
  m5e();
  ago();
  Nte();
  e7a();
  t7a();
  rqt();
  g5e();
  S7a();
  L2();
  oz();
  P$r();
  C7a = require("crypto"), A7a = require("path"), rBp = ve(() => C.strictObject({
    script: C.string().max($2).optional().describe("Self-contained workflow script. Must begin with `export const meta = { name, description, phases }` (pure literal, no computed values) followed by the script body using agent()/parallel()/pipeline()/phase()."),
    name: C.string().optional().describe("Name of a predefined workflow (built-in or from .claude/workflows/). Resolves to a self-contained script."),
    description: C.string().optional().describe("Ignored \u2014 set the workflow description in the script's `meta` block."),
    title: C.string().optional().describe("Ignored \u2014 set the workflow title in the script's `meta` block."),
    args: C.unknown().optional().describe("Optional input value exposed to the script as the global `args`, verbatim. Pass arrays/objects as actual JSON values, NOT as a " + "JSON-encoded string \u2014 a stringified list breaks `args.filter`/" + "`args.map` in the script. Use for parameterized named workflows (e.g. a research question)."),
    scriptPath: C.string().optional().describe("Path to a workflow script file on disk. Every Workflow invocation persists its script under the session directory and returns the path in the tool result. To iterate, edit that file with Write/Edit and re-invoke Workflow with the same `scriptPath` instead of re-sending the full script. Takes precedence over `script` and `name`."),
    resumeFromRunId: C.string().regex(/^wf_[a-z0-9-]{6,}$/).optional().describe(`Run ID of a prior Workflow invocation to resume from. Completed agent() calls with unchanged (prompt, opts) return their cached results instantly; only edited or new calls re-run. Same-session only. Stop the prior run first (${vD}) before resuming.`),
    ...false
  }).refine(input => input.script || input.name || input.scriptPath, {
    message: "Must provide script, name, or scriptPath"
  })), oBp = ve(() => C.object({
    status: C.enum(["async_launched", "remote_launched"]),
    taskId: C.string(),
    taskType: C.enum(["local_workflow", "remote_agent"]).optional().describe("TaskType of the registered background task \u2014 'local_workflow' for in-process runs, 'remote_agent' when remote:true dispatches to CCR. Set on all new writes; absent only on transcripts written before this field existed."),
    workflowName: C.string().optional().describe("meta.name from the workflow script \u2014 same value as task_started.workflow_name. Set on all new writes; absent only on transcripts written before this field existed."),
    runId: C.string().optional().describe("Local workflow run identifier for resumeFromRunId. Absent for remote_launched (the CCR session URL is the resume handle there) and on transcripts written before this field existed."),
    summary: C.string().optional(),
    transcriptDir: C.string().optional().describe("Directory where subagent transcripts are written during execution"),
    scriptPath: C.string().optional().describe("Path to the persisted workflow script for this invocation. Editable via Write/Edit; pass back as `scriptPath` to re-run without resending the script."),
    sessionUrl: C.string().optional().describe("CCR session URL when status is remote_launched"),
    warning: C.string().optional().describe("Non-blocking heads-up (e.g. local git state diverges from the pushed branch the cloud session will clone)"),
    error: C.string().optional().describe("Set if syntax check failed")
  }));
  WorkflowInputError = class WorkflowInputError extends Error {
    constructor(message) {
      super(message);
      this.name = "WorkflowInputError";
    }
  };
  E7a = {
    result: false,
    message: "Tool dispatch was retracted by a server fallback; the input may be truncated.",
    errorCode: 7
  };
  WorkflowTool = Ks({
    name: AI,
    aliases: ["RunWorkflow"],
    searchHint: "orchestrate subagents with deterministic JavaScript workflow",
    maxResultSizeChars: 1e5,
    isEnabled: () => hC(),
    async prompt() {
      return lgo;
    },
    async description() {
      return lgo;
    },
    get inputSchema() {
      return rBp();
    },
    get outputSchema() {
      return oBp();
    },
    toAutoClassifierInput(input) {
      return input.script ?? input.name ?? "";
    },
    async validateInput(input, context) {
      if (Dke(context.abortController.signal)) return E7a;
      if (Obn()) return {
        result: false,
        message: "Dynamic workflows are disabled by managed settings (`disableWorkflows`).",
        errorCode: 5
      };
      if (!hC()) return {
        result: false,
        message: 'Dynamic workflows are not enabled for this session (org policy, launch gate, or the "Dynamic workflows" setting in /config).',
        errorCode: 6
      };
      let resolved = await resolveWorkflowSource(input);
      if (Dke(context.abortController.signal)) return E7a;
      if ("error" in resolved) return {
        result: false,
        message: resolved.error,
        errorCode: 1
      };
      let parsed = Bw(resolved.script);
      if ("error" in parsed) return {
        result: false,
        message: `Invalid workflow script: ${parsed.error}`,
        errorCode: 2
      };
      if (input.script && yKa(parsed.scriptBody)) return {
        result: false,
        message: "Workflow scripts must be deterministic: Date.now()/Math.random()/new Date() are unavailable (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.",
        errorCode: 4
      };
      if (input.resumeFromRunId) {
        for (let [taskId, task] of Object.entries(context.taskRegistry.all())) if (task.type === "local_workflow" && task.status === "running" && task.workflowRunId === input.resumeFromRunId) return {
          result: false,
          message: `Workflow ${input.resumeFromRunId} is still running (task ${taskId}). Stop it first with ${vD}({taskId: "${taskId}"}) before resuming.`,
          errorCode: 3
        };
      }
      return {
        result: true
      };
    },
    async checkPermissions(input, context) {
      let permissionContext = Mr(context),
        ruleKey = input.scriptPath ? undefined : input.name,
        getRule = behavior => ruleKey ? Ute(permissionContext, AI, behavior).get(ruleKey) : undefined,
        denyRule = getRule("deny");
      if (denyRule) return {
        behavior: "deny",
        message: `Workflow ${ruleKey} blocked by permission rules`,
        decisionReason: {
          type: "rule",
          rule: denyRule
        }
      };
      let updatedInput = input;
      if (input.scriptPath) {
        let resolvedFromPath = await LUe(input.scriptPath);
        if (!("error" in resolvedFromPath)) updatedInput = {
          ...input,
          script: resolvedFromPath.script
        };
      } else if (input.name) {
        let resolvedNamed = await nqt(input.name, Lt());
        updatedInput = {
          ...input,
          script: resolvedNamed?.script
        };
      }
      let askRule = getRule("ask");
      if (askRule) return {
        behavior: "ask",
        message: "Review dynamic workflow before running",
        updatedInput: updatedInput,
        decisionReason: {
          type: "rule",
          rule: askRule
        }
      };
      let allowRule = getRule("allow");
      if (allowRule) return {
        behavior: "allow",
        updatedInput: updatedInput,
        decisionReason: {
          type: "rule",
          rule: allowRule
        }
      };
      return {
        behavior: "ask",
        message: "Review dynamic workflow before running",
        updatedInput: updatedInput,
        ...(ruleKey && {
          suggestions: [{
            type: "addRules",
            rules: [{
              toolName: AI,
              ruleContent: ruleKey
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        })
      };
    },
    userFacingName() {
      return "Workflow";
    },
    getToolUseSummary(input) {
      if (input?.name) return `dynamic workflow: ${input.name}`;
      if (!input?.script) return null;
      let parsed = Bw(input.script);
      if (!("error" in parsed)) return parsed.meta.description;
      let firstNonEmptyLine = input.script.split(`
`).find(line => line.trim()) ?? "";
      return firstNonEmptyLine.length > 50 ? firstNonEmptyLine.slice(0, 49) + "\u2026" : firstNonEmptyLine;
    },
    async call(input, context, canUseTool, permissionContext, invocationContext) {
      let resolved = await resolveWorkflowSource(input);
      if ("error" in resolved) throw new WorkflowInputError(resolved.error);
      let {
          script: script,
          source: source,
          resolvedScriptPath: resolvedScriptPath
        } = resolved,
        parsed = Bw(script);
      if ("error" in parsed) throw new WorkflowInputError(`Invalid workflow script: ${parsed.error}`);
      let runId = input.resumeFromRunId ?? `wf_${C7a.randomUUID().slice(0, 12)}`,
        taskId = M$("local_workflow"),
        summary = parsed.meta.description,
        workflowName = parsed.meta.name,
        compileResult = Ppt(parsed.scriptBody);
      if (!compileResult.ok) return xe("task_local_workflow", "compile_failed"), {
        data: {
          status: "async_launched",
          taskId: taskId,
          taskType: "local_workflow",
          workflowName: workflowName,
          runId: runId,
          summary: summary,
          error: compileResult.error
        }
      };
      let transcriptDir = Fte(runId),
        scriptPath = resolvedScriptPath ?? qEi(workflowName, runId, script),
        sourceKind = input.scriptPath ? "scriptPath" : source ?? "inline",
        telemetryName = telemetryWorkflowName(workflowName, source),
        telemetryDescription = telemetryWorkflowDescription(parsed.meta.description, source);
      return W("tengu_workflow_launched", {
        invocation_mode: Ve(input.scriptPath ? "scriptPath" : input.name ? "named" : "inline"),
        workflow_source: Le(sourceKind),
        workflow_name: telemetryName,
        workflow_description: telemetryDescription,
        phase_count: parsed.meta.phases?.length ?? 0,
        launched_from_subagent: context.agentId != null,
        has_args: input.args != null,
        is_resume: input.resumeFromRunId != null,
        script_size_chars: script.length
      }), igo({
        taskId: taskId,
        workflowRunId: runId,
        script: script,
        scriptPath: scriptPath,
        args: input.args,
        meta: parsed.meta,
        vmScript: compileResult.vmScript,
        toolUseContext: context,
        canUseTool: canUseTool,
        toolUseId: context.toolUseId,
        transcriptDir: transcriptDir,
        telemetry: {
          source: sourceKind,
          name: telemetryName,
          description: telemetryDescription
        },
        isResume: input.resumeFromRunId != null
      }), {
        data: {
          status: "async_launched",
          taskId: taskId,
          taskType: "local_workflow",
          workflowName: workflowName,
          runId: runId,
          summary: summary,
          transcriptDir: transcriptDir,
          scriptPath: scriptPath
        }
      };
    },
    renderToolUseMessage: g7a,
    renderToolUseProgressMessage: _7a,
    renderToolResultMessage: y7a,
    renderToolUseRejectedMessage: T7a,
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      if (result.error) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Workflow script has a syntax error and was not launched:
${result.error}`,
        is_error: true
      };
      if (result.status === "remote_launched") return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Workflow launched in a remote CCR session. Task ID: ${result.taskId}
Session: ${result.sessionUrl}
` + (result.summary ? `Summary: ${result.summary}
` : "") + (result.warning ? `Warning: ${result.warning}
` : "") + `
The workflow runs against a fresh clone of the pushed branch; phase progress is visible at the session URL, not in /workflows. You will be notified when it completes.`,
        is_error: false
      };
      let summaryLine = result.summary ? `
Summary: ${result.summary}` : "",
        transcriptLine = result.transcriptDir ? `
Transcript dir: ${result.transcriptDir}` : "",
        scriptFileLine = result.scriptPath ? `
Script file: ${result.scriptPath}
(Edit this file with Write/Edit and re-invoke Workflow with {scriptPath: "${result.scriptPath}"} to iterate without resending the script.)` : "",
        resumeLine = result.scriptPath && result.runId ? `
Run ID: ${result.runId}
To resume after editing the script: Workflow({scriptPath: "${result.scriptPath}", resumeFromRunId: "${result.runId}"}) \u2014 completed agents return cached results.` : "",
        content = `Workflow launched in background. Task ID: ${result.taskId}${summaryLine}${transcriptLine}${scriptFileLine}${resumeLine}

You will be notified when it completes. Use /workflows to watch live progress.`;
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: content,
        is_error: false
      };
    }
  });
});

export {ggo,resolveWorkflowSource as b7a,telemetryWorkflowName as sBp,telemetryWorkflowDescription as aBp,C7a,A7a,rBp,oBp,WorkflowInputError,MAX_TELEMETRY_DESCRIPTION_LENGTH as iBp,E7a,WorkflowTool,_go};
