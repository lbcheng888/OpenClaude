// @ts-nocheck
import {tn,Hc} from "../../vendor/m235.ts";
import {truncateToWidth,truncateToWidthNoEllipsis,truncate} from "../../vendor/m237.ts";
import {u2} from "./0048_ISSUES_EXPLAINER.ts";
import {getDirectConnectServerUrl,lt} from "../session/0131_sent.ts";
import {Id,mc} from "./0645_maxBytes.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {je} from "../../vendor/m577.ts";
import {getAPIProvider,THIRD_PARTY_PROVIDER_LABELS,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber,getSubscriptionName,Ao} from "./2031_withOAuthRefreshLock.ts";
import {getInitialSettings,yr} from "./0740_updateSettingsForSource.ts";
import {UWn,Mjt,Vje} from "../../vendor/m4762.ts";
import {cE} from "../../vendor/m2206.ts";
import {b} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {ps} from "../../vendor/m238.ts";
function eGn(e: any) {
  if (e >= 70) return "horizontal";
  return "compact";
}
function x_l(e: any, t: any, n: any) {
  if (t === "horizontal") {
    let o = n,
      s = $Eo + ZWn + QWn + o,
      i = e - s,
      a = Math.max(30, i),
      l = Math.min(o + a + QWn + ZWn, e - $Eo);
    if (l < o + a + QWn + ZWn) a = l - o - QWn - ZWn;
    return {
      leftWidth: o,
      rightWidth: a,
      totalWidth: l
    };
  }
  let r = Math.min(e - $Eo, R_l + 20);
  return {
    leftWidth: r,
    rightWidth: r,
    totalWidth: r
  };
}
function k_l(e: any, t: any, n: any) {
  let r = Math.max(tn(e), tn(t), tn(n), 20);
  return Math.min(r + 4, R_l);
}
function tGn(e: any) {
  if (!e || e.length > Hem) return "Welcome back!";
  return `Welcome back ${e}!`;
}
function FDe(e: any, t: any) {
  if (tn(e) <= t) return e;
  let n = "/",
    r = "…",
    o = 1,
    s = 1,
    i = e.split(n),
    a = i[0] || "",
    l = i.at(-1) || "",
    c = tn(a),
    u = tn(l);
  if (i.length === 1) return truncateToWidth(e, t);
  if (a === "" && o + s + u >= t) return `${n}${truncateToWidth(l, Math.max(1, t - s))}`;
  if (a !== "" && o * 2 + s + u >= t) return `${r}${n}${truncateToWidth(l, Math.max(1, t - o - s))}`;
  if (i.length === 2) {
    let m = t - o - s - u;
    return `${truncateToWidthNoEllipsis(a, m)}${r}${n}${l}`;
  }
  let d = t - c - u - o - 2 * s;
  if (d <= 0) {
    let m = Math.max(0, t - u - o - 2 * s);
    return `${truncateToWidthNoEllipsis(a, m)}${n}${r}${n}${l}`;
  }
  let p = [];
  for (let m = i.length - 2; m > 0; m--) {
    let f = i[m];
    if (f && tn(f) + s <= d) p.unshift(f), d -= tn(f) + s;else break;
  }
  if (p.length === 0) return `${a}${n}${r}${n}${l}`;
  return `${a}${n}${r}${n}${p.join(n)}${n}${l}`;
}
function Fmt() {
  let e = process.env.DEMO_VERSION ?? `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION}${u2()}`,
    t = getDirectConnectServerUrl(),
    n = process.env.DEMO_VERSION ? "/code/claude" : Id(Pt()),
    r = je.CLAUDE_CODE_HIDE_CWD ? "" : t ? `${n} in ${t.replace(/^https?:\/\//, "")}` : n,
    o = getAPIProvider(),
    s = o !== "firstParty" ? THIRD_PARTY_PROVIDER_LABELS[o] : isClaudeAISubscriber() ? getSubscriptionName() : "API Usage Billing",
    i = getInitialSettings().agent;
  return {
    version: e,
    cwd: r,
    billingType: s,
    agentName: i
  };
}
function H_l(e: any, t: any, n: any) {
  if (tn(e) + 3 + tn(t) > n) return {
    shouldSplit: !0,
    truncatedModel: truncate(e, n),
    truncatedBilling: truncate(t, n)
  };
  return {
    shouldSplit: !1,
    truncatedModel: truncate(e, Math.max(n - tn(t) - 3, 10)),
    truncatedBilling: t
  };
}
function I_l(e: any) {
  let t = UWn();
  if (!t) return [];
  let n: any;
  try {
    n = Mjt(t);
  } catch {
    return [];
  }
  let r = [],
    o = Object.keys(n).sort((s, i) => cE(s, i) ? -1 : 1).slice(0, 3);
  for (let s of o) {
    let i = n[s];
    if (i) r.push(...i);
  }
  return r.slice(0, e);
}
var R_l = 50,
  Hem = 20,
  $Eo = 4,
  QWn = 1,
  ZWn = 2;
var Bjt = b(() => {
  lt();
  Hc();
  Ao();
  Go();
  Lr();
  mc();
  ps();
  li();
  Vje();
  yr();
});
export {eGn,x_l,k_l,tGn,FDe,Fmt,H_l,I_l,R_l,Hem,$Eo,QWn,ZWn,Bjt};
