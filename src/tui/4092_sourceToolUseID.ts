// @ts-nocheck
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {U2t as _2t,$2t as y2t} from "../artifact/3925_kind.ts";
import {T$t as e$t,a_e as Vge,lo} from "../tools/5190_userPromptCount.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {iLt as LOt,iW as j5} from "../../vendor/m2798.ts";
import {jY as xY,Hct as sct} from "./4025_message.ts";
import {initModule as cL,Oz as yz} from "../../vendor/m2799.ts";
import {Ace as rce,W2t as b2t} from "../../vendor/m3929.ts";
import {wC as SC,jq as Hq} from "./3282_result.tsx";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function zUa(e, t) {
  if (!t) return e;
  return e.map(n => {
    if (n.type === "user") return {
      ...n,
      sourceToolUseID: t
    };
    return n;
  });
}
function YUa(e, t) {
  let n = e.message.content.find(r => r.type === "tool_use" && r.name === t);
  return n && n.type === "tool_use" ? n.id : undefined;
}
function JUa(e) {
  if ("status" in e && e.status === "forked") return sT.createElement(qn, {
    height: 1
  }, sT.createElement(w, null, sT.createElement(hn, null, ["Done"])));
  let t = ["Successfully loaded skill"];
  if ("allowedTools" in e && e.allowedTools && e.allowedTools.length > 0) {
    let n = e.allowedTools.length;
    t.push(`${n} ${En(n, "tool")} allowed`);
  }
  if ("model" in e && e.model) t.push(e.model);
  return sT.createElement(qn, {
    height: 1
  }, sT.createElement(w, null, sT.createElement(hn, null, t)));
}
function XGK({
  skill: sourceToolUseID
}, {
  commands: t
}) {
  if (!sourceToolUseID) return null;
  let n = sourceToolUseID.trim(),
    r = n.startsWith("/") ? n.substring(1) : n,
    o = t?.find(a => a.name === r),
    s = o?.loadedFrom === "commands_DEPRECATED" ? `/${r}` : r,
    i = _2t(o?.type === "prompt" ? o.source : undefined, r);
  return i ? `${s} \xB7 by ${i}` : s;
}
function PGK(message, {
  tools: t,
  verbose: n
}) {
  if (!message.length) return sT.createElement(qn, {
    height: 1
  }, sT.createElement(w, {
    dimColor: true
  }, $Cp));
  let r = n ? message : message.slice(-UCp),
    o = message.length - r.length,
    {
      inProgressToolUseIDs: s
    } = e$t(message.map(i => i.data));
  return sT.createElement(qn, null, sT.createElement(B, {
    flexDirection: "column"
  }, sT.createElement(LOt, null, r.map(i => sT.createElement(B, {
    key: i.uuid,
    height: 1,
    overflow: "hidden"
  }, sT.createElement(xY, {
    message: i.data.message,
    lookups: Vge,
    addMargin: false,
    tools: t,
    commands: [],
    verbose: n,
    inProgressToolUseIDs: s,
    progressMessagesForMessage: [],
    shouldAnimate: false,
    shouldShowDot: false,
    style: "condensed",
    isTranscriptMode: false,
    isStatic: true
  })))), sT.createElement(cL, {
    count: o,
    unit: "tool use"
  })));
}
function WGK(result, {
  progressMessagesForMessage: t,
  tools: n,
  verbose: r
}) {
  return sT.createElement(sT.Fragment, null, PGK(t, {
    tools: n,
    verbose: r
  }), sT.createElement(rce, null));
}
function ZGK(e, {
  progressMessagesForMessage: commands,
  tools: n,
  verbose: r
}) {
  return sT.createElement(sT.Fragment, null, PGK(commands, {
    tools: n,
    verbose: r
  }), sT.createElement(SC, {
    result: e,
    verbose: r
  }));
}
var sT,
  UCp = 3,
  $Cp = "Initializing\u2026";
var LGK = b(() => {
  j5();
  Hq();
  b2t();
  qs();
  yz();
  sct();
  rc();
  Je();
  y2t();
  lo();
  fr();
  sT = L(Te(), 1);
});

export {zUa as h$a,YUa as g$a,JUa as _$a,XGK as y$a,PGK as _$n,WGK as T$a,ZGK as S$a,sT as sf,UCp as fRp,$Cp as ARp,LGK as b$a};
