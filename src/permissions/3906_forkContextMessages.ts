// @ts-nocheck
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {jlt as zoo,Yge as Dge} from "./4040_clients.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {runForkedAgent as VH,gP as hP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {Ln,lo} from "../tools/5190_userPromptCount.ts";
import {bOa as lPa,RE as HC} from "../agent/4342_toolUseCount.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function buildSummaryPrompt(previousSummary) {
  return `Describe your most recent action in 3-5 words using present tense (-ing). Name the file or function, not the branch. Do not use tools.
${previousSummary ? `
Previous: "${previousSummary}" \u2014 say something NEW.
` : ""}
Good: "Reading runAgent.ts"
Good: "Fixing null check in validate.ts"
Good: "Running auth module tests"
Good: "Adding retry logic to fetchUser"

Bad (past tense): "Analyzed the branch diff"
Bad (too vague): "Investigating the issue"
Bad (too long): "Reviewing full branch diff and AgentTool.tsx integration"
Bad (branch name): "Analyzed adam/background-summary branch diff"`;
}
function startAgentSummarization(agentId, agentShortId, cacheSafeParamsWithFork, getMessages, taskRegistry, options = {}) {
  let intervalMs = options.intervalMs ?? defaultSummaryIntervalMs,
    {
      forkContextMessages: forkMessages,
      ...restParams
    } = cacheSafeParamsWithFork,
    abortController = null,
    timerHandle = null,
    stopped = false,
    lastSummary = null,
    lastTranscriptKey = null,
    hasSentUnchangedEvent = false;
  async function runOneSummaryTick() {
    if (stopped) return;
    v(`[AgentSummary] Timer fired for agent ${agentShortId}`);
    try {
      let messages = getMessages();
      if (messages.length < 3) {
        v(`[AgentSummary] Skipping summary for ${agentId}: not enough messages (${messages.length})`);
        return;
      }
      let filteredMessages = zoo(messages),
        transcriptKey = `${filteredMessages.length}:${filteredMessages.at(-1)?.uuid ?? ""}`;
      if (transcriptKey === lastTranscriptKey) {
        if (v(`[AgentSummary] Skipping summary for ${agentId}: transcript unchanged (${filteredMessages.length} messages)`), !hasSentUnchangedEvent) j("tengu_agent_summary_skipped", {
          reason: Qe("unchanged")
        }), hasSentUnchangedEvent = true;
        return;
      }
      hasSentUnchangedEvent = false, lastTranscriptKey = transcriptKey;
      let S = {
        ...restParams,
        forkContextMessages: filteredMessages
      };
      v(`[AgentSummary] Forking for summary, ${filteredMessages.length} messages in context`), abortController = new AbortController();
      let C = async () => ({
          behavior: "deny",
          message: "No tools needed for summary",
          decisionReason: {
            type: "other",
            reason: "summary only"
          }
        }),
        R = await VH({
          promptMessages: [Ln({
            content: buildSummaryPrompt(lastSummary)
          })],
          cacheSafeParams: S,
          canUseTool: C,
          querySource: "agent_summary",
          forkLabel: "agent_summary",
          maxTurns: 1,
          overrides: {
            abortController: abortController
          },
          skipTranscript: true,
          skipCacheWrite: true
        });
      if (stopped) return;
      for (let k of R.messages) {
        if (k.type !== "assistant") continue;
        if (k.isApiErrorMessage) {
          v(`[AgentSummary] Skipping API error message for ${agentId}`);
          continue;
        }
        let x = k.message.content.find(I => I.type === "text");
        if (x?.type === "text" && x.text.trim()) {
          let I = x.text.trim();
          v(`[AgentSummary] Summary result for ${agentId}: ${I}`), lastSummary = I, lPa(agentId, I, taskRegistry);
          break;
        }
      }
    } catch (err) {
      if (!stopped && err instanceof Error) Ie(err);
    } finally {
      if (abortController = null, !stopped) scheduleNextTick();
    }
  }
  function scheduleNextTick() {
    if (stopped) return;
    timerHandle = setTimeout(runOneSummaryTick, intervalMs);
  }
  function stopSummarization() {
    if (v(`[AgentSummary] Stopping summarization for ${agentId}`), stopped = true, timerHandle) clearTimeout(timerHandle), timerHandle = null;
    if (abortController) abortController.abort(), abortController = null;
  }
  return scheduleNextTick(), {
    stop: stopSummarization
  };
}
var defaultSummaryIntervalMs = 30000;
var initAgentSummarization = b(() => {
  HC();
  Dge();
  je();
  hP();
  wn();
  lo();
  Ct();
});

export {buildSummaryPrompt as Qyp,startAgentSummarization as TOa,defaultSummaryIntervalMs as Xyp,initAgentSummarization as SOa};
