// @ts-nocheck
import {Ou,ADt,uS} from "../config/2594_event_name.ts";
import {kZa,HZa,DZa,Cho} from "../../vendor/m4397.ts";
import {getLastCancelledAPIMessageId,incrementPromptIndex,lt} from "../session/0131_sent.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {Br,WS} from "../../vendor/m1456.ts";
import {Ln,zIo,lo} from "../tools/5190_userPromptCount.ts";
import {b} from "../../runtime.ts";
/**
 * Processes a user prompt: logs telemetry events and builds the message list
 * to send to the API, handling both plain-string and content-block inputs.
 */
function f9l(content: any,
// user prompt - string or content-block array
toolResults: any,
// pending tool-result blocks
imagePasteIds: any,
// pasted image IDs
previousMessages: any,
// already-accumulated messages
promptId: any,
// unique ID for this prompt
conversationUuid: any,
// conversation UUID
permissionMode: any,
// permission mode
isMeta: any,
// whether this is a meta (background) prompt
effortLevel: any,
// effort level enum value
promptSource: any,
// prompt source enum value
origin: any // origin info
) {
  // Extract first-text and last-text from the prompt for telemetry
  let firstText = typeof content === "string" ? content : content.find((item: any) => item.type === "text")?.text || "";
  let lastText = typeof content === "string" ? content : content.findLast((item: any) => item.type === "text")?.text || "";

  // Log the raw user prompt via the Ou event emitter
  if (lastText) Ou("user_prompt", {
    prompt_length: String(lastText.length),
    prompt: ADt(lastText),
    "prompt.id": promptId
  });

  // Classify the prompt for telemetry flags
  let isNegative = kZa(firstText);
  let isKeepGoing = HZa(firstText);
  let isWakeup = DZa(firstText);

  // Retrieve interrupted message and prompt index (skipped for meta prompts)
  let interruptedMessageId = isMeta ? null : getLastCancelledAPIMessageId();
  let promptIndex = isMeta ? void 0 : incrementPromptIndex();

  // Fire the tengu_input_prompt analytics event
  if (logEvent("tengu_input_prompt", {
    is_negative: isNegative,
    is_keep_going: isKeepGoing,
    is_wakeup: isWakeup,
    prompt_index: promptIndex,
    prompt_length: lastText.length,
    ...(promptSource && {
      prompt_source: fromEnum(promptSource)
    }),
    ...(effortLevel && {
      effort_level: fromEnum(effortLevel)
    }),
    ...(interruptedMessageId && {
      interrupted_message_id: Br(interruptedMessageId)
    })
  }), toolResults.length > 0) {
    // There are tool results to attach — merge content blocks and tool results
    let contentBlocks = typeof content === "string" ? content.trim() ? [{
      type: "text",
      text: content
    }] : [] : content;
    let userMessage = Ln({
      content: [...contentBlocks, ...toolResults],
      uuid: conversationUuid,
      imagePasteIds: imagePasteIds.length > 0 ? imagePasteIds : void 0,
      permissionMode: permissionMode,
      isMeta: isMeta || void 0,
      promptSource: promptSource,
      origin: origin
    });
    if (origin) zIo(userMessage, origin);
    return {
      messages: [userMessage, ...previousMessages],
      shouldQuery: !0
    };
  }

  // No tool results — build a plain user message
  let plainMessage = Ln({
    content: content,
    uuid: conversationUuid,
    permissionMode: permissionMode,
    isMeta: isMeta || void 0,
    promptSource: promptSource,
    origin: origin
  });
  if (origin) zIo(plainMessage, origin);
  return {
    messages: [plainMessage, ...previousMessages],
    shouldQuery: !0
  };
}

// Module initializer: eagerly runs side-effects for dependent modules
var A9l = b(() => {
  lt();
  Ct();
  WS();
  lo();
  uS();
  Cho();
});
export {f9l,A9l};
