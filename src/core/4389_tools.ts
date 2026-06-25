// @ts-nocheck
import {vB as ZF,rb as eb} from "../permissions/5211_level.ts";
import {vc as jc} from "../api/3886_level.ts";
import {Pt as Bt,He,xe as Pe,mn as cn} from "../telemetry/0600_feature_name.ts";
import {mo as _o,Ct as St} from "../../vendor/m197.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {TeamDeleteToolName as Oe,tn as Xt} from "../config/0230_encoding.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function XdK({
  tools: completedTools,
  signal: abortSignal,
  isNonInteractiveSession: isNonInteractiveSession,
  lastAssistantText: lastAssistantText,
  agentContext: o
}) {
  if (completedTools.length === 0) return null;
  try {
    let toolsBlock = completedTools.map(toolCall => {
        let truncatedInput = MdK(toolCall.input, 300),
          truncatedOutput = MdK(toolCall.output, 300);
        return `Tool: ${toolCall.name}
Input: ${truncatedInput}
Output: ${truncatedOutput}`;
      }).join(`

`),
      intentPreamble = lastAssistantText ? `User's intent (from assistant's last message): ${lastAssistantText.slice(0, 200)}

` : "",
      label = (await ZF({
        systemPrompt: jc([AkO]),
        userPrompt: `${intentPreamble}Tools completed:

${toolsBlock}

Label:`,
        signal: abortSignal,
        options: {
          querySource: "tool_use_summary_generation",
          enablePromptCaching: false,
          agents: [],
          isNonInteractiveSession: isNonInteractiveSession,
          hasAppendSystemPrompt: false,
          mcpTools: [],
          agentContext: o
        }
      })).message.content.filter(block => block.type === "text").map(block => block.type === "text" ? block.text : "").join("").trim();
    if (!label) return Bt("summary_tool_use_generate", "empty_response"), null;
    return He("summary_tool_use_generate"), label;
  } catch (error) {
    if (abortSignal.aborted) return null;
    let normalizedError = _o(error);
    return normalizedError.cause = {
      errorId: "tool_use_summary_generation_failed"
    }, Ie(normalizedError), Pe("summary_tool_use_generate", "api_failed"), null;
  }
}
function MdK(value, maxLength) {
  try {
    let serialized = Oe(value);
    if (serialized.length <= maxLength) return serialized;
    return serialized.slice(0, maxLength - 3) + "...";
  } catch {
    return "[unable to serialize]";
  }
}
var AkO = `Write a short summary label describing what these tool calls accomplished. It appears as a single-line row in a mobile app and truncates around 30 characters, so think git-commit-subject, not sentence.

Keep the verb in past tense and the most distinctive noun. Drop articles, connectors, and long location context first.

Examples:
- Searched in auth/
- Fixed NPE in UserService
- Created signup endpoint
- Read config.json
- Ran failing tests`;
var PdK = b(() => {
  St();
  wn();
  Xt();
  cn();
  eb();
});
export {XdK as $ol,MdK as Uol,AkO as IWp,PdK as qol};
