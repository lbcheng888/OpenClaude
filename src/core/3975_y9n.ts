// @ts-nocheck
import {b} from "../../runtime.ts";
import {wdo as Koo,vdo as Voo} from "../../vendor/m3973.ts";
// @ts-nocheck
function l4e(e) {
  return streamEventTypeSet.has(e.type);
}
function rPa(e) {
  if (l4e(e)) return true;
  switch (e.type) {
    case "tombstone":
    case "tool_use_summary":
    case "notification":
    case "set_expanded_view":
    case "post_turn_summary":
    case "active_goal":
    case "set_in_progress_tool_use_ids":
    case "conversation_reset":
    case "hint_clears":
    case "interruptible_tool_in_progress":
    case "api_metrics":
    case "os_notification":
    case "open_message_selector":
    case "apply_flag_settings":
    case "command_lifecycle":
    case "refusal_continuation":
      return true;
    case "user":
    case "assistant":
    case "attachment":
    case "progress":
    case "system":
      return false;
    default:
      {
        let t = e;
        return false;
      }
  }
}
var streamEventTypeList, streamEventTypeSet;
var R3q = b(() => {
  Koo();
  streamEventTypeList = ["stream_event", "stream_request_start", "response_length", ...Voo], streamEventTypeSet = new Set(streamEventTypeList);
});
export {l4e as m6e,rPa as C$a,streamEventTypeList as hIp,streamEventTypeSet as gIp,R3q as y9n};
