// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,handlePlanModeTransition as zde} from "../session/0132_sent.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {Sw,i_} from "../../vendor/m2789.ts";
import {cy,prepareContextForPlanMode as ndt} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {d1,Vz,Zp} from "../../vendor/m2705.ts";
import {i6e,KD} from "./3962_tool.ts";
import {z2a,K2a} from "../../vendor/m3962.ts";
import {X2a,j2a,Y2a,J2a} from "../../vendor/m3963.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Lk} from "../config/2259_R9r.ts";
// ============================================================================
// EnterPlanMode — the built-in "EnterPlanMode" tool.
//
// The model invokes this tool to request entering "plan mode": a read-only
// exploration/design phase where it studies the codebase and drafts an
// implementation strategy before writing or editing any files. The tool takes
// no input; on success it flips the session's permission context into "plan"
// mode (scoped to the session) and returns guidance describing what to do next.
//
// This tool throws if ever invoked inside an agent context (`call`). Unlike the
// v185 revision, `isEnabled` here is unconditionally true (no subagent gate).
//
// External (cross-module) symbols referenced here, kept verbatim:
//   C     — zod-like schema builder namespace
//   ve    — lazy/memoized value factory (used for the zod schemas)
//   Ks    — Tool definition factory (fills in default Tool fields)
//   Vz    — EnterPlanMode tool-name constant
//   Zp    — AskUserQuestion tool-name constant (referenced in result guidance)
//   Lk    — ExitPlanMode tool-name constant (referenced in result guidance)
//   Mr    — getToolPermissionContext() for the current tool-use context
//   zde   — record a permission-mode transition (from, to)
//   ndt   — derive the base permission context to update
//   i_    — apply a permission-context update (reducer; here a setMode action)
//   KD    — feature-flag/enablement gate for the tool
//   K2a   — getPrompt() for the EnterPlanMode tool description
//   j2a   — renderToolUseMessage renderer
//   Y2a   — renderToolResultMessage renderer
//   J2a   — renderToolUseRejectedMessage renderer
// Module-init refs (esbuild lazy-init side effects): Qr,lt,ri,xl,Sw,cy,d1,
//   i6e,z2a,X2a — kept verbatim.
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
  enterPlanModeTool: unknown;

var initEnterPlanModeModule = b(() => {
  Qr();
  lt();
  ri();
  xl();
  Sw();
  cy();
  d1();
  i6e();
  z2a();
  X2a();
  getInputSchema = ve(() => C.strictObject({})), getOutputSchema = ve(() => C.object({
    message: C.string().describe("Confirmation that plan mode was entered")
  })), enterPlanModeTool = Ks({
    name: Vz,
    searchHint: "switch to plan mode to design an approach before coding",
    maxResultSizeChars: 1e5,
    async description() {
      return "Requests permission to enter plan mode for complex tasks requiring exploration and design";
    },
    async prompt() {
      return K2a();
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
      return KD.isEnabled();
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    renderToolUseMessage: j2a,
    renderToolResultMessage: Y2a,
    renderToolUseRejectedMessage: J2a,
    async call(input: Record<string, never>, context: EnterPlanModeCallContext) {
      if (context.agentId) throw Error("EnterPlanMode tool cannot be used in agent contexts");
      return zde(Mr(context).mode, "plan"), context.setToolPermissionContext(ctx => i_(ndt(ctx), {
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
4. Use ${Zp} if you need to clarify the approach
5. Design a concrete implementation strategy
6. When ready, use ${Lk} to present your plan for approval

Remember: DO NOT write or edit any files yet. This is a read-only exploration and planning phase.`,
        tool_use_id: toolUseId
      };
    }
  });
});

export {getInputSchema as nIp,getOutputSchema as rIp,enterPlanModeTool as u9n,initEnterPlanModeModule as Tdo};
