// @ts-nocheck
import {KXn as JKn,hKt as U5t,UOo as QKn} from "../tools/5182_alwaysLoad.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Mn as Ln,Kl as wc,po as lo} from "../tools/5224_userPromptCount.ts";
import {getSmallFastModel,Ro as Mo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {zD as xP,lxe as QHe} from "../../vendor/m3979.ts";
import {KWe as i8e,rb} from "../permissions/5211_level.ts";
import {vc as Wc} from "../api/3886_level.ts";
import {Mr as Fr,xl as Ql} from "../../vendor/m4427.ts";
import {l0 as $I,getStickyBetas,lt} from "./0132_sent.ts";
import {yge as she,kD as fP} from "../api/2754_actualTokens.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {createAttachmentMessage,GA as Bv} from "../agent/4451_tryGetPDFReference.ts";
import {ba as Fa,i2 as B2,pd as Pd} from "../../vendor/m706.ts";
import {Ce as Se,Ct as bt} from "../../vendor/m197.ts";
import {nw as WR} from "../../vendor/m2215.ts";
import {lke as CRe,l1 as HF} from "../core/2694_l1.ts";
import {TeamDeleteToolName as Le,tn as Xt} from "../config/0230_encoding.ts";
import {k_ as T_,pF as jB,$0t as fkt,GS as jS} from "../api/2028_used.ts";
import {kot as Ent} from "../../vendor/m2784.ts";
import {b} from "../../runtime.ts";
async function ZMl(e, t, n, r, o, s, i, a) {
  let l = a || `hook-${QMl.randomUUID()}`,
    c = n === "Stop" || n === "SubagentStop";
  try {
    let u = c ? `Based on the conversation transcript above, has the following stopping condition been satisfied? Answer based on transcript evidence only.

Condition: ${e.prompt}` : e.prompt,
      d = JKn(u, r);
    logForDebugging(`Hooks: Processing prompt hook with prompt: ${d}`);
    let p = Ln({
        content: d
      }),
      m = e.model ?? getSmallFastModel(),
      f = y => i && i.length > 0 ? [...G_m(i, m, y), p] : [p],
      A = f();
    logForDebugging(`Hooks: Querying model with ${A.length} messages`);
    let h = e.timeout ? e.timeout * 1000 : 30000,
      {
        signal: g,
        cleanup: _
      } = xP(o, {
        timeoutMs: h
      });
    try {
      let S = I => i8e({
          messages: I,
          systemPrompt: Wc([c ? `You are evaluating a stop-condition hook in Claude Code. Read the conversation transcript carefully, then judge whether the user-provided condition is satisfied.

Your response must be a JSON object with one of these shapes:
- {"ok": true, "reason": "<quote evidence from the transcript that satisfies the condition>"}
- {"ok": false, "reason": "<quote what is missing or what blocks the condition>"}
- {"ok": false, "impossible": true, "reason": "<explain why the condition can never be satisfied>"}

Always include a "reason" field, quoting specific text from the transcript whenever possible. If the transcript does not contain clear evidence that the condition is satisfied, return {"ok": false, "reason": "insufficient evidence in transcript"}.

Only use {"ok": false, "impossible": true} when the condition is genuinely unachievable in this session \u2014 for example: the condition is self-contradictory, it depends on a resource or capability that is unavailable, or the assistant has explicitly tried, exhausted reasonable approaches, and stated it cannot be done. Apply your own judgment when deciding this \u2014 the assistant claiming the goal is impossible is evidence, not proof; independently confirm the condition is genuinely unachievable rather than deferring to the assistant's self-assessment. Do not use it just because the goal has not been reached yet or because progress is slow. When in doubt, return {"ok": false} without "impossible".` : `You are evaluating a hook condition in Claude Code. Judge whether the user-provided condition is met.

Your response must be a JSON object with one of these shapes:
- {"ok": true, "reason": "<reason the condition is met>"}
- {"ok": false, "reason": "<reason the condition is not met>"}

Always include a "reason" field.`]),
          thinkingConfig: {
            type: "disabled"
          },
          tools: [],
          signal: g,
          options: {
            async getToolPermissionContext() {
              return Fr(s);
            },
            model: m,
            toolChoice: void 0,
            isNonInteractiveSession: !0,
            hasAppendSystemPrompt: !1,
            agents: [],
            querySource: "hook_prompt",
            mcpTools: [],
            agentId: s.agentId,
            agentContext: s.agentContext,
            stickyBetas: $I(getStickyBetas()),
            outputFormat: {
              type: "json_schema",
              schema: {
                type: "object",
                properties: {
                  ok: {
                    type: "boolean"
                  },
                  reason: {
                    type: "string"
                  },
                  impossible: {
                    type: "boolean"
                  }
                },
                required: ["ok", "reason"],
                additionalProperties: !1
              }
            }
          }
        }),
        v = await S(A);
      if (she(v) && i && i.length > 0) logEvent("tengu_hook_prompt_too_long_retry", {
        evaluatorModel: m
      }), A = f(e1l / 2), logForDebugging(`Hooks: evaluator prompt too long; retrying with ${A.length} messages`), v = await S(A);
      if (_(), v.isApiErrorMessage) {
        let I = wc(v.message.content).trim();
        return logForDebugging(`Hooks: prompt-hook evaluator API error: ${I}`, {
          level: "error"
        }), {
          hook: e,
          outcome: "non_blocking_error",
          message: createAttachmentMessage({
            type: "hook_non_blocking_error",
            hookName: t,
            toolUseID: l,
            hookEvent: n,
            stderr: `Hook evaluator API error: ${I}`,
            stdout: "",
            exitCode: 1
          })
        };
      }
      let k = wc(v.message.content).trim();
      logForDebugging(`Hooks: Model response: ${k}`);
      let x = Fa(B2(k), !1);
      if (!x) return logForDebugging(`Hooks: error parsing response as JSON: ${k}`), {
        hook: e,
        outcome: "non_blocking_error",
        message: createAttachmentMessage({
          type: "hook_non_blocking_error",
          hookName: t,
          toolUseID: l,
          hookEvent: n,
          stderr: "JSON validation failed",
          stdout: k,
          exitCode: 1
        })
      };
      let H = U5t().safeParse(x);
      if (!H.success) return logForDebugging(`Hooks: model response does not conform to expected schema: ${H.error.message}`), {
        hook: e,
        outcome: "non_blocking_error",
        message: createAttachmentMessage({
          type: "hook_non_blocking_error",
          hookName: t,
          toolUseID: l,
          hookEvent: n,
          stderr: `Schema validation failed: ${H.error.message}`,
          stdout: k,
          exitCode: 1
        })
      };
      if (!H.data.ok) {
        if (H.data.impossible === !0 && c) return logForDebugging(`Hooks: Prompt hook condition judged impossible: ${H.data.reason}`), {
          hook: e,
          outcome: "success",
          impossible: !0,
          stopReason: H.data.reason,
          message: createAttachmentMessage({
            type: "hook_success",
            hookName: t,
            toolUseID: l,
            hookEvent: n,
            content: ""
          })
        };
        return logForDebugging(`Hooks: Prompt hook condition was not met: ${H.data.reason}`), {
          hook: e,
          outcome: "blocking",
          blockingError: {
            blockingError: `[${e.prompt}]: ${H.data.reason}`,
            command: e.prompt
          },
          preventContinuation: !c && e.continueOnBlock !== !0,
          stopReason: H.data.reason
        };
      }
      return logForDebugging(`Hooks: Prompt hook condition was met: ${H.data.reason}`), {
        hook: e,
        outcome: "success",
        stopReason: H.data.reason,
        message: createAttachmentMessage({
          type: "hook_success",
          hookName: t,
          toolUseID: l,
          hookEvent: n,
          content: ""
        })
      };
    } catch (y) {
      if (_(), g.aborted) return {
        hook: e,
        outcome: "cancelled"
      };
      throw y;
    }
  } catch (u) {
    let d = Se(u);
    return logForDebugging(`Hooks: Prompt hook error: ${d}`), {
      hook: e,
      outcome: "non_blocking_error",
      message: createAttachmentMessage({
        type: "hook_non_blocking_error",
        hookName: t,
        toolUseID: l,
        hookEvent: n,
        stderr: `Error executing prompt hook: ${d}`,
        stdout: "",
        exitCode: 1
      })
    };
  }
}
function j_m(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (n.type === "assistant" && "usage" in n.message && n.message.model !== WR) {
      let r = n.message.usage;
      return r.input_tokens + (r.cache_creation_input_tokens ?? 0) + (r.cache_read_input_tokens ?? 0) + r.output_tokens;
    }
  }
  return 0;
}
function W_m(e) {
  let t = 0;
  for (let n of e) t += n.type === "assistant" || n.type === "user" ? CRe(n.message.content) : Le(n).length / 4;
  return Math.ceil(t);
}
function G_m(e, t, n = e1l) {
  let r = T_(t) || jB(t) ? 1e6 : fkt,
    o = Math.floor(r * n);
  if (j_m(e) <= o) return e;
  let s = Ent(e),
    i = 0,
    a = s.length;
  for (let u = s.length - 1; u >= 0; u--) {
    let d = W_m(s[u]);
    if (a < s.length && i + d > o) break;
    i += d, a = u;
  }
  let l = s.slice(a).flat(),
    c = e.length - l.length;
  if (c <= 0) return e;
  return logForDebugging(`Hooks: truncated Stop transcript ${e.length}\u2192${l.length} msgs (budget ${o}, model ${t})`), logEvent("tengu_hook_prompt_transcript_truncated", {
    droppedMessages: c,
    keptMessages: l.length,
    budget: o,
    evaluatorModel: t
  }), [Ln({
    content: `[Earlier conversation truncated to fit the hook evaluator's context window \u2014 ${c} earlier messages omitted. Evaluate the condition against the recent transcript below; if the required evidence may be in the omitted prefix, return {"ok": false, "reason": "insufficient evidence in transcript"}.]`
  }), ...l];
}
var QMl,
  e1l = 0.5;
var t1l = b(() => {
  lt();
  Ct();
  rb();
  fP();
  HF();
  Bv();
  QHe();
  jS();
  Ql();
  qe();
  bt();
  Pd();
  lo();
  Mo();
  Xt();
  QKn();
  QMl = require("crypto");
});
export {ZMl as N3l,j_m as pkm,W_m as mkm,G_m as fkm,QMl as M3l,e1l as F3l,t1l as B3l};
