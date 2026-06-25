// @ts-nocheck
import {isToolReferenceBlock as Xte,sj as fz} from "../tools/4436_summarizeByServerPrefix.ts";
import {Qbo as tho,rGn as Yqn,po as lo} from "../tools/5224_userPromptCount.ts";
import {Ybo as QAo,Jbo as ZAo} from "../config/4437_encoding.ts";
import {getMainLoopModel as Ns,normalizeModelStringForAPI as Em,getSmallFastModel as Sw,getDefaultSonnetModel as ck,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {h8 as M8,MR as jR} from "../config/2033_allowed.ts";
import {getProviderForModel as __,Ps as si} from "./1287_usesFirstPartyModelIds.ts";
import {p8 as O8,PBe as ABe} from "../config/2026_error.ts";
import {initProfileReportModule as yf,Ph as y_} from "../agent/1459_agentType.ts";
import {Q0r as Lwr,Yv as NR,xM as i1} from "../../vendor/m1450.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {xre as bre,dn as an} from "../config/0137_namespace.ts";
import {Fke as ORe,S6e as h4e,rb as eb} from "../permissions/5211_level.ts";
import {lke as cRe,l1 as EF} from "../core/2694_l1.ts";
import {aBs as oPs,kHr as dCr,yAe as vze,$oe as Qpe} from "../config/1285_BedrockClient.ts";
import {Odn as lln,wHr as uCr} from "../../vendor/m1283.ts";
import {TeamDeleteToolName as Oe,tn as Xt} from "../config/0230_encoding.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function buildSuccessControlResponse(requestId) {
  for (let t of requestId) if (t.role === "assistant" && Array.isArray(t.content)) {
    for (let n of t.content) if (typeof n === "object" && n !== null && "type" in n && (n.type === "thinking" || n.type === "redacted_thinking")) return true;
  }
  return false;
}
function t$p(e) {
  return e.map(t => {
    if (!Array.isArray(t.content)) return t;
    let n = t.content.map(r => {
      if (r.type === "tool_use") {
        let o = r;
        return {
          type: "tool_use",
          id: o.id,
          name: o.name,
          input: o.input
        };
      }
      if (r.type === "tool_result") {
        let o = r;
        if (Array.isArray(o.content)) {
          let s = o.content.filter(i => !Xte(i));
          if (s.length === 0) return {
            ...o,
            content: [{
              type: "text",
              text: "[tool references]"
            }]
          };
          if (s.length !== o.content.length) return {
            ...o,
            content: s
          };
        }
      }
      return r;
    });
    return {
      ...t,
      content: n
    };
  });
}
async function classifyControlRpcError(err) {
  if (!err) return 0;
  return q2e([{
    role: "user",
    content: err
  }], []);
}
async function q2e(e, t, n) {
  return e = tho(e), QAo(e, t, async () => {
    try {
      let r = n ?? Ns(),
        o = M8(r),
        s = buildSuccessControlResponse(e);
      if (__(r) === "bedrock") return r$p({
        model: Em(r),
        messages: e,
        tools: t,
        betas: o,
        containsThinking: s
      });
      let a = await O8({
          maxRetries: 1,
          model: r,
          source: "count_tokens",
          agentContext: yf()
        }),
        l = o.filter(u => Lwr.has(u)),
        c = await a.beta.messages.countTokens({
          model: Em(r),
          messages: e.length > 0 ? e : [{
            role: "user",
            content: "foo"
          }],
          tools: t,
          ...(l.length > 0 && {
            betas: NR(l)
          }),
          ...(s && {
            thinking: {
              type: "enabled",
              budget_tokens: eho
            }
          })
        });
      if (typeof c.input_tokens !== "number") return null;
      return c.input_tokens;
    } catch (r) {
      return v(`countTokens API call failed: ${r instanceof Error ? r.message : String(r)}`, {
        level: "error"
      }), null;
    }
  });
}
async function QQa(e, t) {
  return e = tho(e), QAo(e, t, async () => {
    let n = buildSuccessControlResponse(e),
      r = rt(process.env.CLAUDE_CODE_USE_VERTEX) && bre(Sw()) === "global",
      o = rt(process.env.CLAUDE_CODE_USE_BEDROCK) && n,
      s = rt(process.env.CLAUDE_CODE_USE_VERTEX) && n,
      i = r || o || s ? ck() : Sw(),
      a = await O8({
        maxRetries: 1,
        model: i,
        source: "count_tokens",
        agentContext: yf()
      }),
      l = t$p(e),
      c = l.length > 0 ? l : [{
        role: "user",
        content: "count"
      }],
      d = M8(i).filter(g => Lwr.has(g)),
      m = (await a.beta.messages.create({
        model: Em(i),
        max_tokens: n ? rZa : 1,
        messages: c,
        tools: t.length > 0 ? t : undefined,
        ...(d.length > 0 && {
          betas: NR(d)
        }),
        metadata: ORe(),
        ...h4e(),
        ...(n && {
          thinking: {
            type: "enabled",
            budget_tokens: eho
          }
        })
      })).usage,
      f = m.input_tokens,
      A = m.cache_creation_input_tokens || 0,
      h = m.cache_read_input_tokens || 0;
    return f + A + h;
  });
}
function Dv(e, t) {
  let n = 0;
  for (let r of e) n += n$p(r, t);
  return n;
}
function n$p(e, t) {
  if ((e.type === "assistant" || e.type === "user" || e.type === "api_system") && e.message?.content) return cRe(e.message?.content, t);
  if (e.type === "attachment" && e.attachment) {
    let n = Yqn(e.attachment),
      r = 0;
    for (let o of n) r += cRe(o.message.content, t);
    return r;
  }
  return 0;
}
async function r$p({
  model: e,
  messages: t,
  tools: n,
  betas: r,
  containsThinking: o
}) {
  try {
    let s = await oPs(),
      i = dCr(e) ? e : await vze(e);
    if (!i) return null;
    let a = {
        anthropic_version: "bedrock-2023-05-31",
        messages: t.length > 0 ? t : [{
          role: "user",
          content: "foo"
        }],
        max_tokens: o ? rZa : 1,
        ...(n.length > 0 && {
          tools: n
        }),
        ...(r.length > 0 && {
          anthropic_beta: NR(r)
        }),
        ...(o && {
          thinking: {
            type: "enabled",
            budget_tokens: eho
          }
        })
      },
      {
        CountTokensCommand: l
      } = await Promise.resolve().then(() => (lln(), uCr)),
      c = {
        modelId: i,
        input: {
          invokeModel: {
            body: new TextEncoder().encode(Oe(a))
          }
        }
      };
    return (await s.send(new l(c))).inputTokens ?? null;
  } catch (s) {
    return v(`Bedrock CountTokens failed: ${s}`, {
      level: "error"
    }), null;
  }
}
var eho = 1024,
  rZa = 2048;
var M5 = b(() => {
  si();
  i1();
  y_();
  jR();
  je();
  an();
  lo();
  Qpe();
  Fo();
  Xt();
  fz();
  eb();
  ABe();
  EF();
  ZAo();
});
export {buildSuccessControlResponse as yal,t$p as _Kp,classifyControlRpcError as Tal,q2e as m9e,QQa as pal,Dv as WA,n$p as yKp,r$p as TKp,eho as Xbo,rZa as _al,M5 as fW};
