// @ts-nocheck
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {_3t,y3t} from "../artifact/3966_kind.ts";
import {i4t,kye,po} from "../tools/5224_userPromptCount.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {M1t,EW} from "../../vendor/m2811.ts";
import {RY,Ydt} from "../session/4089_message.ts";
import {FO,uj} from "../../vendor/m2812.ts";
import {pce,O3t} from "../../vendor/m3995.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Helpers for tagging UI messages with a source tool-use ID, locating a
 * tool_use block by name, and rendering skill / progress message UI.
 */

/** A message-like item carrying a discriminant `type` and arbitrary extra props. */
type MessageItem = { type: string; [key: string]: unknown };

/**
 * Stamp every `user` message in `messages` with the given `sourceToolUseID`.
 * If `sourceToolUseID` is falsy the list is returned unchanged.
 */
function R5a(messages: MessageItem[], sourceToolUseID: string | undefined) {
  if (!sourceToolUseID) return messages;
  return messages.map(message => {
    if (message.type === "user") return {
      ...message,
      sourceToolUseID: sourceToolUseID
    };
    return message;
  });
}

/**
 * Find the id of the first `tool_use` content block whose `name` matches
 * `toolName`. Returns `undefined` when there is no match.
 */
function v5a(messageEnvelope: any, toolName: string) {
  let toolUseBlock = messageEnvelope.message.content.find((block: any) => block.type === "tool_use" && block.name === toolName);
  return toolUseBlock && toolUseBlock.type === "tool_use" ? toolUseBlock.id : void 0;
}

/**
 * Render the one-line status row shown after a skill is loaded (or forked):
 * "Done" for forked skills, otherwise a "Successfully loaded skill" summary
 * with optional allowed-tool count and model name.
 */
function w5a(skillResult: any) {
  if ("status" in skillResult && skillResult.status === "forked") return Nw.jsx(Yn, {
    height: 1,
    children: Nw.jsx(v, {
      children: Nw.jsx(bn, {
        children: ["Done"]
      })
    })
  });
  let summaryParts = ["Successfully loaded skill"];
  if ("allowedTools" in skillResult && skillResult.allowedTools && skillResult.allowedTools.length > 0) {
    let allowedToolCount = skillResult.allowedTools.length;
    summaryParts.push(`${allowedToolCount} ${Sn(allowedToolCount, "tool")} allowed`);
  }
  if ("model" in skillResult && skillResult.model) summaryParts.push(skillResult.model);
  return Nw.jsx(Yn, {
    height: 1,
    children: Nw.jsx(v, {
      children: Nw.jsx(bn, {
        children: summaryParts
      })
    })
  });
}

/**
 * Build the display label for a skill invocation, e.g. `name \xB7 by author`.
 * Strips a leading `/`, restores it for deprecated command sources, and
 * appends the author when the matching command is a prompt-sourced one.
 */
function k5a({
  skill: skillName
}: { skill: string | undefined }, {
  commands: commands
}: { commands: any[] | undefined }) {
  if (!skillName) return null;
  let trimmedSkill = skillName.trim(),
    commandName = trimmedSkill.startsWith("/") ? trimmedSkill.substring(1) : trimmedSkill,
    matchedCommand = commands?.find(command => command.name === commandName),
    displayName = matchedCommand?.loadedFrom === "commands_DEPRECATED" ? `/${commandName}` : commandName,
    author = _3t(matchedCommand?.type === "prompt" ? matchedCommand.source : void 0, commandName);
  return author ? `${displayName} \xB7 by ${author}` : displayName;
}

/**
 * Render a compact list of progress (tool-use) messages. Truncates to the
 * last `xOp` entries unless `verbose`, shows a "more" footer for hidden ones,
 * and renders an "Initializing…" placeholder when empty.
 */
function g4n(progressMessages: any[], {
  tools: tools,
  verbose: verbose
}: { tools: any; verbose: boolean }) {
  if (!progressMessages.length) return Nw.jsx(Yn, {
    height: 1,
    children: Nw.jsx(v, {
      dimColor: !0,
      children: DOp
    })
  });
  let visibleMessages = verbose ? progressMessages : progressMessages.slice(-xOp),
    hiddenCount = progressMessages.length - visibleMessages.length,
    {
      inProgressToolUseIDs: inProgressToolUseIDs
    } = i4t(progressMessages.map(message => message.data));
  return Nw.jsx(Yn, {
    children: Nw.jsxs($, {
      flexDirection: "column",
      children: [Nw.jsx(M1t, {
        children: visibleMessages.map(message => Nw.jsx($, {
          height: 1,
          overflow: "hidden",
          children: Nw.jsx(RY, {
            message: message.data.message,
            lookups: kye,
            addMargin: !1,
            tools: tools,
            commands: [],
            verbose: verbose,
            inProgressToolUseIDs: inProgressToolUseIDs,
            progressMessagesForMessage: [],
            shouldAnimate: !1,
            shouldShowDot: !1,
            style: "condensed",
            isTranscriptMode: !1,
            isStatic: !0
          })
        }, message.uuid))
      }), Nw.jsx(FO, {
        count: hiddenCount,
        unit: "tool use"
      })]
    })
  });
}

/**
 * Render the progress-message list followed by a trailing spacer (`pce`).
 */
function H5a(_unused: unknown, {
  progressMessagesForMessage: progressMessagesForMessage,
  tools: tools,
  verbose: verbose
}: { progressMessagesForMessage: any[]; tools: any; verbose: boolean }) {
  return Nw.jsxs(Nw.Fragment, {
    children: [g4n(progressMessagesForMessage, {
      tools: tools,
      verbose: verbose
    }), Nw.jsx(pce, {})]
  });
}

/**
 * Render the progress-message list followed by the final tool result (`wC`).
 */
function I5a(toolResult: any, {
  progressMessagesForMessage: progressMessagesForMessage,
  tools: tools,
  verbose: verbose
}: { progressMessagesForMessage: any[]; tools: any; verbose: boolean }) {
  return Nw.jsxs(Nw.Fragment, {
    children: [g4n(progressMessagesForMessage, {
      tools: tools,
      verbose: verbose
    }), Nw.jsx(wC, {
      result: toolResult,
      verbose: verbose
    })]
  });
}
var Nw: any,
  xOp = 3,
  DOp = "Initializing…";
var x5a = b(() => {
  EW();
  iq();
  O3t();
  Is();
  uj();
  Ydt();
  Pl();
  je();
  y3t();
  po();
  lr();
  Nw = x(oe(), 1);
});

export {R5a,v5a,w5a,k5a,g4n,H5a,I5a,Nw,xOp,DOp,x5a};
