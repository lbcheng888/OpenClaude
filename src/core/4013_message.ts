// @ts-nocheck
import {Cl as vl,Eve as ave,Ri} from "../tools/2227_userFacingName.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function NbK({
  message: message,
  tools: tools,
  lookups: lookups,
  inProgressToolUseIDs: inProgressToolUseIDs,
  shouldAnimate: shouldAnimate,
  addMargin: s
}) {
  let tool = vl(tools, message.toolName);
  if (!tool?.renderGroupedToolUse) return null;
  let resultsByToolUseId = new Map();
  for (let resultMessage of message.results) for (let contentBlock of resultMessage.message.content) if (contentBlock.type === "tool_result") resultsByToolUseId.set(contentBlock.tool_use_id, {
    param: contentBlock,
    output: resultMessage.toolUseResult
  });
  let rows = message.messages.map(toolUseMessage => {
      let toolUseParam = toolUseMessage.message.content[0],
        resultPair = resultsByToolUseId.get(toolUseParam.id);
      return {
        param: toolUseParam,
        isResolved: lookups.resolvedToolUseIDs.has(toolUseParam.id),
        isError: lookups.erroredToolUseIDs.has(toolUseParam.id),
        isInProgress: inProgressToolUseIDs.has(toolUseParam.id),
        progressMessages: ave(lookups.progressMessagesByToolUseID.get(toolUseParam.id) ?? []),
        result: resultPair
      };
    }),
    hasInProgress = rows.some(row => row.isInProgress);
  return tool.renderGroupedToolUse(rows, {
    shouldAnimate: shouldAnimate && hasInProgress,
    tools: tools,
    addMargin: s
  });
}
var VbK = b(() => {
  Ri();
});

export {NbK as SBa,VbK as bBa};
