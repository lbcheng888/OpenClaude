// @ts-nocheck
import {Ne} from "../../vendor/m583.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {Pl,Yn} from "../../vendor/m2465.ts";
import {je} from "../../vendor/m2462.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {Ir} from "../../vendor/m584.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {oe} from "../../vendor/m2275.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Text as v} from "../../vendor/m2433.ts";
/**
 * Tool: ShowOnboardingRolePicker
 *
 * Renders a clickable role-picker chip row during Cowork onboarding so the user
 * can choose what kind of work they do and get a matching plugin installed.
 *
 * The role list is hardcoded in the frontend, so the tool takes no input args.
 * The call blocks until the user responds; the result carries one of three
 * resolution paths: a picked/typed role, an explicit dismissal, or an empty
 * approval (treated like a dismissal).
 */

/** Canonical tool name registered with the tool registry. */
var v6n = "ShowOnboardingRolePicker",
  /** Short, human-facing description of the tool. */
  Jza = "Render a clickable role-picker chip row during Cowork onboarding so the user can pick their role and get a matching plugin installed.",
  /** Full prompt/instructions shown to the model describing when and how to call the tool. */
  Xza = `Render a clickable role-picker chip row during Cowork onboarding. Call this when asking the user what kind of work they do so they can pick their role and get a matching plugin installed. The role list is hardcoded in the frontend — call with no args.

The call blocks until the user responds. Three resolution paths all land in the tool result: chip click or free-form typed answer → {"role": "Legal"} or {"role": "paralegal"}; X button → {"dismissed": true}. An empty object {} means the user approved without picking a role — treat it like a dismissal. Free-form roles may not match the chip list — search the marketplace with whatever string you get.

Do NOT call this in normal conversation. Only call this when explicitly helping the user set up Cowork for their role/job function.`;

/** Tool is enabled only in the remote (Cowork) Claude Code environment. */
function cUp(): boolean {
  return Ne.CLAUDE_CODE_REMOTE;
}

/** JSX runtime namespace, input schema factory, output schema factory, tool definition. */
var Zgo: any, aUp: () => any, lUp: () => any, Qza: any;

var Zza = b(() => {
  Qr();
  Pl();
  je();
  ri();
  Ir();
  tn();
  Zgo = x(oe(), 1), aUp = ve(() => C.strictObject({})), lUp = ve(() => C.object({
    role: C.string().optional(),
    dismissed: C.boolean().optional()
  }));
  Qza = Ks({
    name: v6n,
    searchHint: "show the Cowork onboarding role picker",
    maxResultSizeChars: 1e4,
    /** Empty input schema; the tool accepts no arguments. */
    get inputSchema() {
      return aUp();
    },
    /** Output schema: optional picked role and optional dismissal flag. */
    get outputSchema() {
      return lUp();
    },
    isEnabled: cUp,
    isConcurrencySafe(): boolean {
      return !0;
    },
    isReadOnly(): boolean {
      return !0;
    },
    requiresUserInteraction(): boolean {
      return !0;
    },
    async description(): Promise<string> {
      return Jza;
    },
    async prompt(): Promise<string> {
      return Xza;
    },
    toAutoClassifierInput(): string {
      return "show onboarding role picker";
    },
    /**
     * @param input parsed tool input (unused; tool takes no args)
     * @param context tool execution context (unused)
     */
    async checkPermissions(input: unknown, context: unknown) {
      return {
        behavior: "ask",
        message: "Pick your role?",
        updatedInput: {}
      };
    },
    /**
     * Normalizes the user's response into the tool result data.
     * Only includes `role` when a non-empty string was provided, and only
     * includes `dismissed` when an explicit boolean was provided.
     *
     * @param input the resolved picker result
     * @param context tool execution context (unused)
     */
    async call(input: { role?: unknown; dismissed?: unknown }, context: unknown) {
      let {
        role: pickedRole,
        dismissed: wasDismissed
      } = input;
      return {
        data: {
          ...(typeof pickedRole === "string" && pickedRole.trim() !== "" && {
            role: pickedRole
          }),
          ...(typeof wasDismissed === "boolean" && {
            dismissed: wasDismissed
          })
        }
      };
    },
    /**
     * @param result the tool's result payload
     * @param toolUseId the id of the originating tool_use block
     */
    mapToolResultToToolResultBlockParam(result: unknown, toolUseId: string) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: Pe(result)
      };
    },
    renderToolUseMessage() {
      return null;
    },
    /** Renders the resolved result: the chosen role, or a dismissal notice. */
    renderToolResultMessage(result: { role?: string }) {
      return Zgo.jsx(Yn, {
        children: Zgo.jsx(v, {
          children: result.role !== void 0 ? `Role: ${result.role}` : "Role picker dismissed"
        })
      });
    }
  });
});

export {v6n,Jza,Xza,cUp,Zgo,aUp,lUp,Qza,Zza};
