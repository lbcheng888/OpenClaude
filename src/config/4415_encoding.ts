// @ts-nocheck
import {Le as IH,qt as l_,Xt as a_} from "./0228_encoding.ts";
import {Pt as x_,Go as dq} from "../../vendor/m632.ts";
import {dn as Z6,bt as R_} from "../../vendor/m195.ts";
import {je as dH} from "../../vendor/m577.ts";
import {kk as JZ,lo as Aq} from "../tools/5190_userPromptCount.ts";
import {Koe as SOH,P8 as rF} from "../telemetry/1449_model.ts";
import {Cce as vwH,H9 as $u} from "../telemetry/4045_contextWindow.ts";
import {hw as a2,roe as S8H} from "../../vendor/m446.ts";
import {_7e as vlH,zen as We_} from "../../vendor/m617.ts";
import {tr as A8,sn as $6} from "./0047_namespace.ts";
import {b as L} from "../../runtime.ts";
import {Lr as l8} from "../../vendor/m578.ts";
// @ts-nocheck
function getNoopDisposable() {
  return false;
}
async function bH(value, replacer, space) {
  if (!getNoopDisposable()) return await space();
  let K = um_.createHash("sha1").update(IH(value)).digest("hex").slice(0, 12),
    O = j3_.join(process.env.CLAUDE_CODE_TEST_FIXTURES_ROOT ?? x_(), `fixtures/${replacer}-${K}.json`);
  try {
    return l_(await qAH.readFile(O, {
      encoding: "utf8"
    }));
  } catch (z) {
    if (Z6(z) !== "ENOENT") throw z;
  }
  if ((dH.isCI || false) && !dH.VCR_RECORD) throw Error(`Fixture missing: ${O}. Re-run tests with VCR_RECORD=1, then commit the result.`);
  let T = await space();
  return await qAH.mkdir(j3_.dirname(O), {
    recursive: true
  }), await qAH.writeFile(O, IH(T, null, 2), {
    encoding: "utf8"
  }), T;
}
async function xEq(value, _) {
  if (!getNoopDisposable()) return await _();
  let q = JZ(value.filter(z => {
      if (z.type === "attachment") return z.attachment.type !== "agent_listing_delta";
      if (z.type !== "user") return true;
      if (z.isMeta) return false;
      return true;
    })),
    K = OjH(q.map(z => z.message.content), w$q),
    O = j3_.join(process.env.CLAUDE_CODE_TEST_FIXTURES_ROOT ?? x_(), `fixtures/${K.map(z => um_.createHash("sha1").update(IH(z)).digest("hex").slice(0, 6)).join("-")}.json`);
  try {
    let z = l_(await qAH.readFile(O, {
      encoding: "utf8"
    }));
    return z.output.forEach(uEq), z.output.map(($, Y) => EsK($, rbO, Y, um_.randomUUID()));
  } catch (z) {
    if (Z6(z) !== "ENOENT") throw z;
  }
  if (dH.isCI && !dH.VCR_RECORD) throw Error(`Anthropic API fixture missing: ${O}. Re-run tests with VCR_RECORD=1, then commit the result. Input messages:
${IH(K, null, 2)}`);
  let T = await _();
  if (dH.isCI && !dH.VCR_RECORD) return T;
  return await qAH.mkdir(j3_.dirname(O), {
    recursive: true
  }), await qAH.writeFile(O, IH({
    input: K,
    output: T.map((z, $) => EsK(z, w$q, $))
  }, null, 2), {
    encoding: "utf8"
  }), T;
}
function uEq(items) {
  if (items.type !== "assistant") return;
  let result = items.message.model,
    q = items.message.usage,
    K = SOH(result, q);
  vwH(K, q, result);
}
function OjH(text, _) {
  return text.map(q => {
    if (typeof q === "string") return _(q);
    return q.map(K => {
      switch (K.type) {
        case "tool_result":
          if (typeof K.content === "string") return {
            ...K,
            content: _(K.content)
          };
          if (Array.isArray(K.content)) return {
            ...K,
            content: K.content.map(O => {
              switch (O.type) {
                case "text":
                  return {
                    ...O,
                    text: _(O.text)
                  };
                case "image":
                  return O;
                default:
                  return;
              }
            })
          };
          return K;
        case "text":
          return {
            ...K,
            text: _(K.text)
          };
        case "tool_use":
          return {
            ...K,
            input: TjH(K.input, _)
          };
        case "image":
          return _S(K);
        default:
          return;
      }
    });
  });
}
function _S(value) {
  if (value.source.type !== "base64") return value;
  return {
    ...value,
    source: {
      ...value.source,
      data: "[IMAGE_DATA]"
    }
  };
}
function TjH(path, data) {
  return a2(path, (q, K) => {
    if (Array.isArray(q)) return q.map(O => TjH(O, data));
    if (vlH(q)) return TjH(q, data);
    return data(q, K, path);
  });
}
function ibO(H, _, q, K) {
  return {
    uuid: K ?? `UUID-${q}`,
    requestId: "REQUEST_ID",
    timestamp: H.timestamp,
    isApiErrorMessage: H.isApiErrorMessage,
    apiError: H.apiError,
    error: H.error,
    errorDetails: H.errorDetails,
    healsDistinctCarrier: H.healsDistinctCarrier,
    message: {
      ...H.message,
      content: H.message.content.map(O => {
        switch (O.type) {
          case "text":
            return {
              ...O,
              text: _(O.text),
              citations: O.citations || []
            };
          case "tool_use":
            return {
              ...O,
              input: TjH(O.input, _)
            };
          default:
            return O;
        }
      }).filter(Boolean)
    },
    type: "assistant"
  };
}
function EsK(H, _, q, K) {
  if (H.type === "assistant") return ibO(H, _, q, K);else return H;
}
function w$q(H) {
  if (typeof H !== "string") return H;
  let _ = x_(),
    q = A8(),
    K = H.replace(/num_files="\d+"/g, 'num_files="[NUM]"').replace(/duration_ms="\d+"/g, 'duration_ms="[DURATION]"').replace(/cost_usd="\d+"/g, 'cost_usd="[COST]"').replaceAll(q, "[CONFIG_HOME]").replaceAll(_, "[CWD]").replace(/Available commands:.+/, "Available commands: [COMMANDS]");
  if (K = K.replace(/\[CWD\][^\s"'<>]*/g, O => O.replaceAll("\\\\", "/").replaceAll("\\", "/")).replace(/\[CONFIG_HOME\][^\s"'<>]*/g, O => O.replaceAll("\\\\", "/").replaceAll("\\", "/")), K.includes("Files modified by user:")) return "Files modified by user: [FILES]";
  return K;
}
function rbO(H) {
  if (typeof H !== "string") return H;
  return H.replaceAll("[NUM]", "1").replaceAll("[DURATION]", "100").replaceAll("[CONFIG_HOME]", A8()).replaceAll("[CWD]", x_());
}
async function* A$q(H, _) {
  if (!getNoopDisposable()) return yield* _();
  let q = [],
    K = await xEq(H, async () => {
      for await (let O of _()) if (O.type === "fallback_request" && O.creditCode !== null) q.push({
        ...O,
        creditCode: null
      });else q.push(O);
      return q;
    });
  if (K.length > 0) {
    yield* K;
    return;
  }
  yield* q;
}
async function f$q(H, _, q) {
  if (!getNoopDisposable()) return await q();
  let K = x_().replace(/[^a-zA-Z0-9]/g, "-"),
    O = w$q(IH({
      messages: H,
      tools: _
    })).replaceAll(K, "[CWD_SLUG]").replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "[UUID]").replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?/g, "[TIMESTAMP]");
  return (await bH(O, "token-count", async () => ({
    tokenCount: await q()
  }))).tokenCount;
}
var um_, qAH, j3_;
var j$q = L(() => {
  We_();
  S8H();
  $u();
  rF();
  dq();
  l8();
  $6();
  R_();
  Aq();
  a_();
  um_ = require("crypto"), qAH = require("fs/promises"), j3_ = require("path");
});

export {getNoopDisposable as M6n,bH as x3p,xEq as N6n,uEq as k3p,OjH as H3p,_S as I3p,TjH as L6n,ibO as D3p,EsK as xel,w$q as ego,rbO as P3p,A$q as tgo,f$q as ngo,um_ as Q4t,qAH as U_e,j3_ as ppt,j$q as rgo};
