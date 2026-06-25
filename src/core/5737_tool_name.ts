// @ts-nocheck
import {b} from "../../runtime.ts";
/**
 * Builds a synthetic tool-call descriptor used to surface an interactive dialog
 * back to the user (rendered as a "Claude needs your input" prompt).
 *
 * @param dialogKind  Identifier of the dialog variant (e.g. "refusal_fallback_prompt").
 *                    Used both in the namespaced tool name and to look up an
 *                    action description in {@link RYm}.
 * @param payload     Arbitrary data carried along with the dialog request.
 * @param requestId   Originating request id this dialog is associated with.
 * @param toolUseId   Optional tool-use id; defaults to an empty string.
 * @returns A tool descriptor object describing the dialog tool invocation.
 */
function $_c(
  dialogKind: string,
  payload: unknown,
  requestId: string,
  toolUseId?: string,
) {
  return {
    tool_name: `dialog:${dialogKind}`,
    display_tool_name: "Claude needs your input",
    action_description:
      RYm[dialogKind] ?? `Respond to the ${dialogKind} dialog to continue`,
    raw_command: void 0,
    tool_use_id: toolUseId ?? "",
    request_id: requestId,
    input: {
      dialog_kind: dialogKind,
      payload: payload,
    },
  };
}

/** Maps a dialog kind to its human-readable action description. */
var RYm: Record<string, string>;

/** Lazy initializer for {@link RYm}. */
var q_c = b(() => {
  RYm = {
    refusal_fallback_prompt: "choose: retry on fallback model or edit prompt",
  };
});

export {$_c,RYm,q_c};
