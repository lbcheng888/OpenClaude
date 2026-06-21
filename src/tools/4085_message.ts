// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {lt as w_,getAllowedChannels as Vj,getIsNonInteractiveSession as u8,handlePlanModeTransition as V5H} from "../session/0131_sent.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {Ql as c4,Fr as I8} from "../../vendor/m4405.ts";
import {lx as FW,Yg as UA} from "../../vendor/m2777.ts";
import {ly as Yj,prepareContextForPlanMode as YK_} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {Z1 as Xv,yz as Un,Fm as NT} from "../../vendor/m2693.ts";
import {J2a as oZK,Y2a as rZK} from "../../vendor/m4082.ts";
import {e$a as eZK,X2a as aZK,Q2a as sZK,Z2a as tZK} from "../../vendor/m4083.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {Tk as l0} from "../config/2251_zBr.ts";
// ============================================================================
// EnterPlanMode — the built-in "EnterPlanMode" tool.
//
// The model invokes this tool to request entering "plan mode": a read-only
// exploration/design phase where it studies the codebase and drafts an
// implementation strategy before writing or editing any files. The tool takes
// no input; on success it flips the session's permission context into "plan"
// mode (scoped to the session) and returns guidance describing what to do next.
//
// The tool is disabled when subagents/agent definitions are present and the
// current context is a subagent context (`isEnabled` below), and it throws if
// ever invoked inside an agent context (`call`).
//
// External (cross-module) symbols referenced here, kept verbatim:
//   k     — zod-like schema builder namespace
//   kH    — lazy/memoized value factory (used for the zod schemas)
//   c9    — Tool definition factory (fills in default Tool fields)
//   Un    — EnterPlanMode tool-name constant
//   NT    — AskUserQuestion tool-name constant (referenced in result guidance)
//   l0    — ExitPlanMode tool-name constant (referenced in result guidance)
//   I8    — getToolPermissionContext() for the current tool-use context
//   V5H   — record a permission-mode transition (from, to)  // FIXME: unverified name
//   YK_   — derive the base permission context to update     // FIXME: unverified name
//   UA    — apply a permission-context update (reducer; here a setMode action)
//   Vj    — list active agent/subagent definitions
//   u8    — subagent-context predicate (true inside a subagent)  // FIXME: unverified name
//   rZK   — getPrompt() for the EnterPlanMode tool description
//   aZK   — renderToolUseMessage renderer
//   sZK   — renderToolResultMessage renderer
//   tZK   — renderToolUseRejectedMessage renderer
// Module-init refs (esbuild lazy-init side effects): a8,w_,M7,c4,FW,Yj,Xv,
//   oZK,eZK — kept verbatim.
// ============================================================================

/** The current per-tool-use permission context, with the active mode. */
interface ToolPermissionContext {
  mode: string;
}

/**
 * Runtime context passed to `call`: lets the tool read/replace the session's
 * permission context and identify whether it is running inside an agent.
 */
interface EnterPlanModeCallContext {
  /** Set when running inside an agent/subagent; EnterPlanMode is disallowed there. */
  agentId?: string;
  /** Replace the session permission context via a reducer over the current one. */
  setToolPermissionContext: (update: (ctx: ToolPermissionContext) => ToolPermissionContext) => void;
}

/** Lazily-built input schema getter (no fields — EnterPlanMode takes no input). */
var getInputSchema: () => unknown,
  /** Lazily-built output schema getter: `{ message }` confirming plan mode was entered. */
  getOutputSchema: () => unknown,
  /** The exported EnterPlanMode tool definition (referenced by name across modules). */
  mv6: unknown;

var B_q = L(() => {
  a8();
  w_();
  M7();
  c4();
  FW();
  Yj();
  Xv();
  oZK();
  eZK();
  getInputSchema = kH(() => k.strictObject({})), getOutputSchema = kH(() => k.object({
    message: k.string().describe("Confirmation that plan mode was entered")
  })), mv6 = c9({
    name: Un,
    searchHint: "switch to plan mode to design an approach before coding",
    maxResultSizeChars: 1e5,
    async description() {
      return "Requests permission to enter plan mode for complex tasks requiring exploration and design";
    },
    async prompt() {
      return rZK();
    },
    get inputSchema() {
      return getInputSchema();
    },
    get outputSchema() {
      return getOutputSchema();
    },
    userFacingName() {
      return "";
    },
    shouldDefer: !0,
    isEnabled() {
      if (Vj().length > 0 && u8()) return !1;
      return !0;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    renderToolUseMessage: aZK,
    renderToolResultMessage: sZK,
    renderToolUseRejectedMessage: tZK,
    async call(input: Record<string, never>, context: EnterPlanModeCallContext) {
      if (context.agentId) throw Error("EnterPlanMode tool cannot be used in agent contexts");
      return V5H(I8(context).mode, "plan"), context.setToolPermissionContext(ctx => UA(YK_(ctx), {
        type: "setMode",
        mode: "plan",
        destination: "session"
      })), {
        data: {
          message: "Entered plan mode. You should now focus on exploring the codebase and designing an implementation approach."
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      message
    }: { message: string }, toolUseId: string) {
      return {
        type: "tool_result",
        content: `${message}

In plan mode, you should:
1. Thoroughly explore the codebase to understand existing patterns
2. Identify similar features and architectural approaches
3. Consider multiple approaches and their trade-offs
4. Use ${NT} if you need to clarify the approach
5. Design a concrete implementation strategy
6. When ready, use ${l0} to present your plan for approval

Remember: DO NOT write or edit any files yet. This is a read-only exploration and planning phase.`,
        tool_use_id: toolUseId
      };
    }
  });
});

export {getInputSchema as nRp,getOutputSchema as rRp,mv6 as p$n,B_q as nco};
