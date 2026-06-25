// @ts-nocheck
import {Fte as K4_,g5e as kb_} from "../agent/4190_runId.ts";
import {Vje as edH,pd as FO} from "../../vendor/m706.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {isTranscriptMessage as FB,_a as iK} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {cL as LV,po as zq} from "../tools/5224_userPromptCount.ts";
import {qqn as mS6,ego as Gqq} from "../../vendor/m4191.ts";
import {Rp as gz,MO as Qg} from "../tools/2710_allErrors.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
/**
 * Reads a workflow sub-agent's transcript file and extracts the initial prompt,
 * tool calls made, and final assistant text from the JSONL conversation log.
 */
async function PA4(runId: string, agentId: string): Promise<{
  prompt: string;
  toolCalls: Array<{
    name: string;
    summary: string;
  }>;
  finalText: string;
} | null> {
  let filePath = XA4.join(K4_(runId), `agent-${agentId}.jsonl`),
    lines: unknown[];
  try {
    lines = await edH(filePath);
  } catch (err) {
    return N(`readWorkflowAgentTranscript: ${filePath} not readable (${err instanceof Error ? err.message : String(err)})`), null;
  }
  let validMessages = lines.filter(FB),
    userMessage = validMessages.find((msg: any) => msg.type === "user"),
    prompt = (userMessage && LV(userMessage)) ?? "",
    toolCalls: Array<{
      name: string;
      summary: string;
    }> = [],
    finalText = "";
  for (let msg of validMessages) {
    if ((msg as any).type !== "assistant" || !Array.isArray((msg as any).message.content)) continue;
    let lastContent = "";
    for (let contentBlock of (msg as any).message.content) if (contentBlock.type === "tool_use") {
      if (toolCalls.push({
        name: contentBlock.name,
        summary: mS6(contentBlock.input)
      }), contentBlock.name === gz && contentBlock.input !== void 0) try {
        lastContent = bH(contentBlock.input, null, 2);
      } catch {
        lastContent = String(contentBlock.input);
      }
    } else if (contentBlock.type === "text") lastContent += contentBlock.text;
    if (lastContent) finalText = lastContent;
  }
  return {
    prompt: prompt,
    toolCalls: toolCalls,
    finalText: finalText
  };
}
var XA4: typeof import("path");
var WA4 = L(() => {
  FH();
  FO();
  zq();
  iK();
  H6();
  Qg();
  kb_();
  Gqq();
  XA4 = require("path");
});
export {PA4 as T0l,XA4 as y0l,WA4 as S0l};
