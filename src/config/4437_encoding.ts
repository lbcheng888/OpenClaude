// @ts-nocheck
import {TeamDeleteToolName as IH,qt as l_,tn as a_} from "./0230_encoding.ts";
import {isTmuxControlMode as x_,Po as dq} from "../../vendor/m638.ts";
import {cn as Z6,Ct as R_} from "../../vendor/m197.ts";
import {Ne as dH} from "../../vendor/m583.ts";
import {Kk as JZ,po as Aq} from "../tools/5224_userPromptCount.ts";
import {SQ as SOH,h7 as rF} from "../telemetry/1454_model.ts";
import {Tte as vwH,V$ as $u} from "../telemetry/3911_contextWindow.ts";
import {CR as a2,toe as S8H} from "../../vendor/m450.ts";
import {hje as vlH,Hrn as We_} from "../../vendor/m623.ts";
import {or as A8,dn as $6} from "./0137_namespace.ts";
import {b as L} from "../../runtime.ts";
import {Ir as l8} from "../../vendor/m584.ts";
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
export {getNoopDisposable as tGn,bH as dKp,xEq as nGn,uEq as pKp,OjH as mKp,_S as fKp,TjH as eGn,ibO as hKp,EsK as gal,w$q as zbo,rbO as gKp,A$q as jbo,f$q as Ybo,um_ as A5t,qAH as aTe,j3_ as pft,j$q as Jbo};
