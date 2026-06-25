// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,getAllowedChannels as Nb,getIsNonInteractiveSession as kr,getPermissionPromptToolName as _St,hasExitedPlanModeInSession as DSt,tK,setNeedsPlanModeExitAttachment as Hre,MU} from "../session/0132_sent.ts";
import {kt,logEvent as W} from "../../vendor/m132.ts";
import {rT,Js} from "../../vendor/m1294.ts";
import {ri,Ks,Gl} from "./2235_userFacingName.ts";
import {lb,isAgentSwarmsEnabled as Wa} from "../config/3314_isAgentSwarmsEnabled.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {qe,logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {fdo,A2a,pdo} from "../../vendor/m3953.ts";
import {Dw,GD,VD,l9n} from "../core/5176_encoding.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {Op,isTeammate as um,isPlanModeRequired as Gkt,getAgentName as dg,getTeamName as up} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {Pw,writeToMailbox as Bf} from "../permissions/3902_writeToMailbox.ts";
import {oS,Bhe} from "../config/2605_event_name.ts";
import {fg,ls} from "../../vendor/m2232.ts";
import {v2a,hdo} from "../../vendor/m3954.ts";
import {q2a,B2a,U2a,$2a} from "../../vendor/m3959.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {yD} from "../config/2259_R9r.ts";
import {w2a} from "../../vendor/m3955.ts";
import {Le} from "../../vendor/m5.ts";
import {Vz} from "../../vendor/m2705.ts";
import {bte,lce} from "../../vendor/m3960.ts";
import {cy,c9n} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {EXe,bQ} from "../../vendor/m1459.ts";
// @ts-nocheck
// ExitPlanMode tool (v2). Prompts the user to leave plan mode and start coding.
// QHp = toolPromptParamSchema, V2a = exitPlanModeBaseInputSchema,
// jty = exitPlanModeFullInputSchema, ZHp = exitPlanModeOutputSchema, KD = the tool object.
var QHp, V2a, jty, ZHp, KD;
var i6e = b(() => {
  Qr();
  lt();
  kt();
  rT();
  ri();
  lb();
  xl();
  qe();
  fdo();
  Dw();
  tn();
  Op();
  Pw();
  oS();
  fg();
  v2a();
  q2a();
  QHp = ve(() => C.object({
    tool: C.enum(["Bash"]).describe("The tool this prompt applies to"),
    prompt: C.string().describe('Semantic description of the action, e.g. "run tests", "install dependencies"')
  })), V2a = ve(() => C.strictObject({
    allowedPrompts: C.array(QHp()).optional().describe("Prompt-based permissions needed to implement the plan. These describe categories of actions rather than specific commands.")
  }).passthrough()), jty = ve(() => V2a().extend({
    plan: C.string().optional().describe("The plan content (injected by normalizeToolInput from disk)"),
    planFilePath: C.string().optional().describe("The plan file path (injected by normalizeToolInput)")
  })), ZHp = ve(() => C.object({
    plan: C.string().nullable().describe("The plan that was presented to the user"),
    isAgent: C.boolean(),
    filePath: C.string().optional().describe("The file path where the plan was saved"),
    hasTaskTool: C.boolean().optional().describe("Whether the Agent tool is available in the current context"),
    planWasEdited: C.boolean().optional().describe("True when the user edited the plan (CCR web UI or Ctrl+G); determines whether the plan is echoed back in tool_result"),
    awaitingLeaderApproval: C.boolean().optional().describe("When true, the teammate has sent a plan approval request to the team leader"),
    requestId: C.string().optional().describe("Unique identifier for the plan approval request")
  })), KD = Ks({
    name: yD,
    searchHint: "present plan for approval and start coding (plan mode only)",
    maxResultSizeChars: 1e5,
    async description() {
      return "Prompts the user to exit plan mode and start coding";
    },
    async prompt() {
      return w2a;
    },
    get inputSchema() {
      return V2a();
    },
    get outputSchema() {
      return ZHp();
    },
    userFacingName() {
      return "";
    },
    shouldDefer: !0,
    isEnabled() {
      if (Nb().length > 0 && kr()) return !1;
      if (kr() && !_St()) return !1;
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !1;
    },
    requiresUserInteraction() {
      if (um()) return !1;
      return !0;
    },
    /** Validate the tool input: must be invoked while in plan mode (unless teammate). */
    async validateInput(input: any, ctx: any) {
      let {
        options
      } = ctx;
      if (um()) return {
        result: !0
      };
      let mode = Mr(ctx).mode;
      if (mode !== "plan") return W("tengu_exit_plan_mode_called_outside_plan", {
        model: options.mainLoopModel,
        mode: Le(mode),
        hasExitedPlanModeInSession: DSt()
      }), {
        result: !1,
        message: `You are not in plan mode. To enter plan mode, call the ${Vz} tool first. If your plan was already approved, continue with implementation.`,
        errorCode: 1
      };
      return {
        result: !0
      };
    },
    async checkPermissions(input: any, ctx: any) {
      if (um()) return {
        behavior: "allow",
        updatedInput: input
      };
      return {
        behavior: "ask",
        message: "Exit plan mode?",
        updatedInput: input
      };
    },
    renderToolUseMessage: B2a,
    renderToolResultMessage: U2a,
    renderToolUseRejectedMessage: $2a,
    async call(input: any, ctx: any, n: any, r: any, onEvent: any) {
      let sessionModule: any = null,
        autoModeGate: any = null;
      [sessionModule, autoModeGate] = await Promise.all([Promise.resolve().then(() => (bte(), lce)), Promise.resolve().then(() => (cy(), c9n))]);
      let isAgent = !!ctx.agentId,
        planFilePath = GD(ctx.agentId),
        inputPlan = "plan" in input && typeof input.plan === "string" ? input.plan : void 0,
        plan = inputPlan ?? VD(ctx.agentId);
      if (inputPlan !== void 0 && planFilePath) await Js().write(planFilePath, inputPlan).catch(err => A(`Failed to persist plan to ${planFilePath}: ${err instanceof Error ? err.message : String(err)}`, {
        level: "error"
      })), l9n();
      if (um() && Gkt()) {
        if (!plan) throw new hdo(`No plan file found at ${planFilePath}. Please write your plan to this file before calling ExitPlanMode.`);
        let agentName = dg() || "unknown",
          teamName = up(),
          requestId = EXe("plan_approval", bQ(agentName, teamName || "default")),
          approvalRequest = {
            type: "plan_approval_request",
            from: agentName,
            timestamp: new Date().toISOString(),
            planFilePath: planFilePath,
            planContent: plan,
            requestId: requestId
          };
        await Bf("team-lead", {
          from: agentName,
          text: Pe(approvalRequest),
          timestamp: new Date().toISOString()
        }, teamName);
        let appState = ctx.getAppState(),
          task = A2a(agentName, appState);
        if (task) pdo(task, ctx.taskRegistry, !0);
        return {
          data: {
            plan: plan,
            isAgent: !0,
            filePath: planFilePath,
            awaitingLeaderApproval: !0,
            requestId: requestId
          }
        };
      }
      let autoModeFallbackNotice: any = null;
      {
        let prePlanMode = Mr(ctx).prePlanMode ?? "default";
        if (prePlanMode === "auto" && !(autoModeGate?.isAutoModeGateEnabled() ?? !1)) {
          let unavailableReason = autoModeGate?.getAutoModeUnavailableReason() ?? "circuit-breaker";
          autoModeFallbackNotice = autoModeGate?.getAutoModeUnavailableNotification(unavailableReason) ?? "auto mode unavailable", A(`[auto-mode gate @ ExitPlanModeV2Tool] prePlanMode=${prePlanMode} but gate is off (reason=${unavailableReason}) \u2014 falling back to default on plan exit`, {
            level: "warn"
          });
        }
      }
      if (autoModeFallbackNotice) onEvent?.({
        type: "notification",
        notification: {
          key: "auto-mode-gate-plan-exit-fallback",
          text: `plan exit \u2192 default \xB7 ${autoModeFallbackNotice}`,
          priority: "immediate",
          color: "warning",
          timeoutMs: 1e4
        }
      });
      let toolPermCtx = Mr(ctx);
      if (toolPermCtx.mode === "plan") {
        tK(!0), Hre(!0);
        let targetMode = toolPermCtx.prePlanMode ?? "default";
        {
          if (targetMode === "auto" && !(autoModeGate?.isAutoModeGateEnabled() ?? !1)) targetMode = "default";
          let isAutoMode = targetMode === "auto",
            wasAutoModeActive = sessionModule?.isAutoModeActive() ?? !1;
          if (sessionModule?.setAutoModeActive(isAutoMode), wasAutoModeActive && !isAutoMode) MU(!0);
        }
        Bhe({
          from: "plan",
          to: targetMode,
          trigger: "exit_plan_mode"
        });
        let isAutoMode = targetMode === "auto",
          strippedDangerousRules = toolPermCtx.strippedDangerousRules;
        ctx.setToolPermissionContext(prevCtx => {
          let nextCtx = prevCtx;
          if (isAutoMode) nextCtx = autoModeGate?.stripDangerousPermissionsForAutoMode(nextCtx) ?? nextCtx;else if (strippedDangerousRules) nextCtx = autoModeGate?.restoreDangerousPermissions(nextCtx) ?? nextCtx;
          return {
            ...nextCtx,
            mode: targetMode,
            prePlanMode: void 0
          };
        });
      }
      let hasTaskTool = Wa() && ctx.options.tools.some(t => Gl(t, ls));
      return {
        data: {
          plan: plan,
          isAgent: isAgent,
          filePath: planFilePath,
          hasTaskTool: hasTaskTool || void 0,
          planWasEdited: inputPlan !== void 0 || void 0
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      isAgent,
      plan,
      filePath,
      hasTaskTool,
      planWasEdited,
      awaitingLeaderApproval,
      requestId
    }, toolUseId: any) {
      if (awaitingLeaderApproval) return {
        type: "tool_result",
        content: `Your plan has been submitted to the team lead for approval.

Plan file: ${filePath}

**What happens next:**
1. Wait for the team lead to review your plan
2. You will receive a message in your inbox with approval/rejection
3. If approved, you can proceed with implementation
4. If rejected, refine your plan based on the feedback

**Important:** Do NOT proceed until you receive approval. Check your inbox for response.

Request ID: ${requestId}`,
        tool_use_id: toolUseId
      };
      if (isAgent) return {
        type: "tool_result",
        content: 'User has approved the plan. There is nothing else needed from you now. Please respond with "ok"',
        tool_use_id: toolUseId
      };
      if (!plan || plan.trim() === "") return {
        type: "tool_result",
        content: "User has approved exiting plan mode. You can now proceed.",
        tool_use_id: toolUseId
      };
      let teamSuffix = hasTaskTool ? `

If this plan can be broken down into multiple independent tasks, consider spawning named teammates with the ${ls} tool (pass a \`name\`) to parallelize the work.` : "";
      return {
        type: "tool_result",
        content: `User has approved your plan. You can now start coding. Start with updating your todo list if applicable

Your plan has been saved to: ${filePath}
You can refer back to it if needed during implementation.${teamSuffix}

## ${planWasEdited ? "Approved Plan (edited by user)" : "Approved Plan"}:
${plan}`,
        tool_use_id: toolUseId
      };
    }
  });
});

export {QHp,V2a,jty,ZHp,KD,i6e};
