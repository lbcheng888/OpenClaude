// @ts-nocheck
import {Mut as K4_,U9t as kb_} from "../agent/4177_runId.ts";
import {K7e as edH,Pd as FO} from "../../vendor/m701.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {isTranscriptMessage as FB,ja as iK} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {qL as LV,lo as zq} from "../tools/5190_userPromptCount.ts";
import {$9n as mS6,ddo as Gqq} from "../../vendor/m4178.ts";
import {bf as gz,aq as Qg} from "../tools/2698_allErrors.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {b as L} from "../../runtime.ts";
/**
 * Reads a workflow sub-agent's transcript file and extracts the initial prompt,
 * tool calls made, and final assistant text from the JSONL conversation log.
 */
async function PA4(
  runId: string,
  agentId: string
): Promise<{ prompt: string; toolCalls: Array<{ name: string; summary: string }>; finalText: string } | null> {
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
    toolCalls: Array<{ name: string; summary: string }> = [],
    finalText = "";
  for (let msg of validMessages) {
    if ((msg as any).type !== "assistant" || !Array.isArray((msg as any).message.content)) continue;
    let lastContent = "";
    for (let contentBlock of (msg as any).message.content)
      if (contentBlock.type === "tool_use") {
        if (
          toolCalls.push({
            name: contentBlock.name,
            summary: mS6(contentBlock.input),
          }),
          contentBlock.name === gz && contentBlock.input !== void 0
        )
          try {
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
    finalText: finalText,
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

export {PA4 as mEl,XA4 as pEl,WA4 as fEl};
