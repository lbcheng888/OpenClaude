// @ts-nocheck
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {lt as ct,getAllowedChannels as BT,getIsNonInteractiveSession as kr,hasExitedPlanModeInSession as Igt,setHasExitedPlanMode as gV,setNeedsPlanModeExitAttachment as Tre,setNeedsAutoModeExitAttachment as a2} from "../session/0131_sent.ts";
import {Ct,logEvent as j} from "../../vendor/m131.ts";
import {pT as iT,ci as oi} from "../../vendor/m1289.ts";
import {Ri,pi as ai,Lc as Vc} from "./2227_userFacingName.ts";
import {cb as ib,isAgentSwarmsEnabled as yl} from "../config/3298_isAgentSwarmsEnabled.ts";
import {Ql as Xl,Fr as Lr} from "../../vendor/m4405.ts";
import {qe as je,logForDebugging as v} from "../config/0234_setHasFormattedOutput.ts";
import {clo as aao,YFa as RBa,alo as sao} from "../../vendor/m4040.ts";
import {yx as Ax,IP as HP,DP as IP,m$n as R2n} from "../core/5144_encoding.ts";
import {Xt,Le as Oe} from "../config/0228_encoding.ts";
import {Am as Sf,isTeammate as Tf,isPlanModeRequired as Gvt,getAgentName as tg,getTeamName as Nm} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Tx as jk,writeToMailbox as Nh} from "../permissions/3886_writeToMailbox.ts";
import {uS as rS,wAe as aAe} from "../config/2594_event_name.ts";
import {Ph as rg,Cs as vs} from "../../vendor/m2224.ts";
import {t$a as PUa,rco as elo} from "../../vendor/m4085.ts";
import {i$a as BUa,n$a as OUa,r$a as LUa,o$a as MUa,s$a as NUa} from "../../vendor/m4086.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {VO as LO} from "../config/2251_zBr.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {yz as rz} from "../../vendor/m2693.ts";
import {Gte as Lte,xce as Ace} from "../../vendor/m4087.ts";
import {ly,f$n as x2n} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {CYe as iYe,vQ as AQ} from "../../vendor/m1454.ts";
// @ts-nocheck
var toolPromptParamSchema, exitPlanModeBaseInputSchema, exitPlanModeFullInputSchema, exitPlanModeOutputSchema, Zu;
var exitPlanModeModule = b(() => {
  Xr();
  ct();
  Ct();
  iT();
  Ri();
  ib();
  Xl();
  je();
  aao();
  Ax();
  Xt();
  Sf();
  jk();
  rS();
  rg();
  PUa();
  BUa();
  toolPromptParamSchema = Re(() => E.object({
    tool: E.enum(["Bash"]).describe("The tool this prompt applies to"),
    prompt: E.string().describe('Semantic description of the action, e.g. "run tests", "install dependencies"')
  })), exitPlanModeBaseInputSchema = Re(() => E.strictObject({
    allowedPrompts: E.array(toolPromptParamSchema()).optional().describe("Prompt-based permissions needed to implement the plan. These describe categories of actions rather than specific commands.")
  }).passthrough()), exitPlanModeFullInputSchema = Re(() => exitPlanModeBaseInputSchema().extend({
    plan: E.string().optional().describe("The plan content (injected by normalizeToolInput from disk)"),
    planFilePath: E.string().optional().describe("The plan file path (injected by normalizeToolInput)")
  })), exitPlanModeOutputSchema = Re(() => E.object({
    plan: E.string().nullable().describe("The plan that was presented to the user"),
    isAgent: E.boolean(),
    filePath: E.string().optional().describe("The file path where the plan was saved"),
    hasTaskTool: E.boolean().optional().describe("Whether the Agent tool is available in the current context"),
    planWasEdited: E.boolean().optional().describe("True when the user edited the plan (CCR web UI or Ctrl+G); determines whether the plan is echoed back in tool_result"),
    awaitingLeaderApproval: E.boolean().optional().describe("When true, the teammate has sent a plan approval request to the team leader"),
    requestId: E.string().optional().describe("Unique identifier for the plan approval request")
  })), Zu = ai({
    name: LO,
    searchHint: "present plan for approval and start coding (plan mode only)",
    maxResultSizeChars: 1e5,
    async description() {
      return "Prompts the user to exit plan mode and start coding";
    },
    async prompt() {
      return OUa;
    },
    get inputSchema() {
      return exitPlanModeBaseInputSchema();
    },
    get outputSchema() {
      return exitPlanModeOutputSchema();
    },
    userFacingName() {
      return "";
    },
    shouldDefer: true,
    isEnabled() {
      if (BT().length > 0 && kr()) return false;
      return true;
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return false;
    },
    requiresUserInteraction() {
      if (Tf()) return false;
      return true;
    },
    async validateInput(e, t) {
      let {
        options: n
      } = t;
      if (Tf()) return {
        result: true
      };
      let r = Lr(t).mode;
      if (r !== "plan") return j("tengu_exit_plan_mode_called_outside_plan", {
        model: n.mainLoopModel,
        mode: Ue(r),
        hasExitedPlanModeInSession: Igt()
      }), {
        result: false,
        message: `You are not in plan mode. To enter plan mode, call the ${rz} tool first. If your plan was already approved, continue with implementation.`,
        errorCode: 1
      };
      return {
        result: true
      };
    },
    async checkPermissions(e, t) {
      if (Tf()) return {
        behavior: "allow",
        updatedInput: e
      };
      return {
        behavior: "ask",
        message: "Exit plan mode?",
        updatedInput: e
      };
    },
    renderToolUseMessage: LUa,
    renderToolResultMessage: MUa,
    renderToolUseRejectedMessage: NUa,
    async call(e, t, n, r, o) {
      let s = null,
        i = null;
      [s, i] = await Promise.all([Promise.resolve().then(() => (Lte(), Ace)), Promise.resolve().then(() => (ly(), x2n))]);
      let a = !!t.agentId,
        l = HP(t.agentId),
        c = "plan" in e && typeof e.plan === "string" ? e.plan : undefined,
        u = c ?? IP(t.agentId);
      if (c !== undefined && l) await oi().write(l, c).catch(f => v(`Failed to persist plan to ${l}: ${f instanceof Error ? f.message : String(f)}`, {
        level: "error"
      })), R2n();
      if (Tf() && Gvt()) {
        if (!u) throw new elo(`No plan file found at ${l}. Please write your plan to this file before calling ExitPlanMode.`);
        let f = tg() || "unknown",
          A = Nm(),
          h = iYe("plan_approval", AQ(f, A || "default")),
          g = {
            type: "plan_approval_request",
            from: f,
            timestamp: new Date().toISOString(),
            planFilePath: l,
            planContent: u,
            requestId: h
          };
        await Nh("team-lead", {
          from: f,
          text: Oe(g),
          timestamp: new Date().toISOString()
        }, A);
        let _ = t.getAppState(),
          y = RBa(f, _);
        if (y) sao(y, t.taskRegistry, true);
        return {
          data: {
            plan: u,
            isAgent: true,
            filePath: l,
            awaitingLeaderApproval: true,
            requestId: h
          }
        };
      }
      let d = null;
      {
        let f = Lr(t).prePlanMode ?? "default";
        if (f === "auto" && !(i?.isAutoModeGateEnabled() ?? false)) {
          let A = i?.getAutoModeUnavailableReason() ?? "circuit-breaker";
          d = i?.getAutoModeUnavailableNotification(A) ?? "auto mode unavailable", v(`[auto-mode gate @ ExitPlanModeV2Tool] prePlanMode=${f} but gate is off (reason=${A}) \u2014 falling back to default on plan exit`, {
            level: "warn"
          });
        }
      }
      if (d) o?.({
        type: "notification",
        notification: {
          key: "auto-mode-gate-plan-exit-fallback",
          text: `plan exit \u2192 default \xB7 ${d}`,
          priority: "immediate",
          color: "warning",
          timeoutMs: 1e4
        }
      });
      let p = Lr(t);
      if (p.mode === "plan") {
        gV(true), Tre(true);
        let f = p.prePlanMode ?? "default";
        {
          if (f === "auto" && !(i?.isAutoModeGateEnabled() ?? false)) f = "default";
          let g = f === "auto",
            _ = s?.isAutoModeActive() ?? false;
          if (s?.setAutoModeActive(g), _ && !g) a2(true);
        }
        aAe({
          from: "plan",
          to: f,
          trigger: "exit_plan_mode"
        });
        let A = f === "auto",
          h = p.strippedDangerousRules;
        t.setToolPermissionContext(g => {
          let _ = g;
          if (A) _ = i?.stripDangerousPermissionsForAutoMode(_) ?? _;else if (h) _ = i?.restoreDangerousPermissions(_) ?? _;
          return {
            ..._,
            mode: f,
            prePlanMode: undefined
          };
        });
      }
      let m = yl() && t.options.tools.some(f => Vc(f, vs));
      return {
        data: {
          plan: u,
          isAgent: a,
          filePath: l,
          hasTaskTool: m || undefined,
          planWasEdited: c !== undefined || undefined
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      isAgent: e,
      plan: t,
      filePath: n,
      hasTaskTool: r,
      planWasEdited: o,
      awaitingLeaderApproval: s,
      requestId: i
    }, a) {
      if (s) return {
        type: "tool_result",
        content: `Your plan has been submitted to the team lead for approval.

Plan file: ${n}

**What happens next:**
1. Wait for the team lead to review your plan
2. You will receive a message in your inbox with approval/rejection
3. If approved, you can proceed with implementation
4. If rejected, refine your plan based on the feedback

**Important:** Do NOT proceed until you receive approval. Check your inbox for response.

Request ID: ${i}`,
        tool_use_id: a
      };
      if (e) return {
        type: "tool_result",
        content: 'User has approved the plan. There is nothing else needed from you now. Please respond with "ok"',
        tool_use_id: a
      };
      if (!t || t.trim() === "") return {
        type: "tool_result",
        content: "User has approved exiting plan mode. You can now proceed.",
        tool_use_id: a
      };
      let l = r ? `

If this plan can be broken down into multiple independent tasks, consider spawning named teammates with the ${vs} tool (pass a \`name\`) to parallelize the work.` : "";
      return {
        type: "tool_result",
        content: `User has approved your plan. You can now start coding. Start with updating your todo list if applicable

Your plan has been saved to: ${n}
You can refer back to it if needed during implementation.${l}

## ${o ? "Approved Plan (edited by user)" : "Approved Plan"}:
${t}`,
        tool_use_id: a
      };
    }
  });
});

export {toolPromptParamSchema as pRp,exitPlanModeBaseInputSchema as c$a,exitPlanModeFullInputSchema as Xc_,exitPlanModeOutputSchema as mRp,Zu as I9,exitPlanModeModule as Z$t};
