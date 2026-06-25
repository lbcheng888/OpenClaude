// @ts-nocheck
import {getIsGit as Ay,getBranch as Ry,getDefaultBranch as Zx,getRemoteUrl as $K,normalizeGitRemoteUrl as V1e,ia} from "../../vendor/m698.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {vha,mto,eat,wha} from "../../vendor/m3326.ts";
import {Fg} from "../../vendor/m5.ts";
import {getProxyFetchOptions as nT,ey} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {xe,He,Pt,mn} from "./0600_feature_name.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {dK,Xd,Ct} from "../../vendor/m197.ts";
import {vf,Pv} from "../../vendor/m639.ts";
import {or,dn} from "../config/0137_namespace.ts";
import {b} from "../../runtime.ts";
import {MS} from "../../vendor/m460.ts";
import {v5,L1e} from "../../vendor/m643.ts";
import {ig} from "../../vendor/m130.ts";
import {Ni} from "../../vendor/m127.ts";
import {ve} from "../../vendor/m461.ts";
import {jt} from "../../vendor/m253.ts";
// @ts-nocheck
function Cla(e, t) {
  if (e) return "draft";
  switch (t) {
    case "APPROVED":
      return "approved";
    case "CHANGES_REQUESTED":
      return "changes_requested";
    default:
      return "pending";
  }
}
async function vla() {
  if (!(await Ay())) return null;
  let [t, n] = await Promise.all([Ry(), Zx()]);
  if (t === n) return null;
  return (() => Q1t() ? eWd(t) : Y5d(n))();
}
function Q1t() {
  return it("tengu_harbor_prism", false);
}
async function Y5d(e) {
  let {
    stdout: t,
    code: n
  } = await Fn("gh", ["pr", "view", "--json", "number,url,reviewDecision,isDraft,headRefName,state"], {
    timeout: X1t,
    preserveOutputOnError: false
  });
  if (n !== 0 || !t.trim()) return null;
  try {
    let r = qt(t);
    if (r.headRefName === e || r.headRefName === "main" || r.headRefName === "master") return null;
    if (r.state === "MERGED" || r.state === "CLOSED") return null;
    return {
      number: r.number,
      url: r.url,
      reviewState: Cla(r.isDraft, r.reviewDecision)
    };
  } catch {
    return null;
  }
}
async function eWd(e) {
  if (Vi() || kla()) return null;
  if (e === "main" || e === "master") return null;
  let t = await nWd();
  if (!t) return null;
  let n = await vha(t.host);
  if (!n) {
    if (t.host !== "github.com" && process.env.GH_HOST !== t.host) return null;
    return mto(t.host), "needs-auth";
  }
  let r = await oWd(t, n);
  if (DJr?.branch !== e) DJr = {
    branch: e,
    etag: null,
    pr: null,
    reviewDecision: "",
    lastReviewFetchAt: 0,
    redirectedListUrl: null
  };
  let o = DJr,
    s = t.host === "github.com" ? "https://api.github.com" : `https://${t.host}/api/v3`,
    i = new URL(s).origin,
    a = `${s}/repos/${r.owner}/${r.repo}/pulls?head=${encodeURIComponent(t.owner)}:${encodeURIComponent(e)}&state=open&per_page=1`,
    l = false;
  try {
    let m = AbortSignal.timeout(X1t),
      f = {
        Authorization: `Bearer ${n}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": wla,
        "User-Agent": Fg(),
        ...(o.etag && {
          "If-None-Match": o.etag
        })
      },
      A_2 = y => fetch(y, {
        ...nT({
          url: y
        }),
        keepalive: false,
        method: "GET",
        headers: f,
        redirect: "manual",
        signal: m
      }),
      h_2 = await A_2(o.redirectedListUrl ?? a),
      g_2 = X5d.has(h_2.status) ? h_2.headers.get("location") : null,
      __2 = g_2 ? new URL(g_2, a) : null;
    if (__2?.origin === i) o.redirectedListUrl = __2.href, h_2 = await A_2(__2.href);
    if (h_2.status === 304) ;else if (h_2.ok) {
      o.etag = h_2.headers.get("etag"), l = true;
      let y = Q5d().safeParse(await h_2.json()),
        T = y.success ? y.data[0] : undefined;
      if (T && o.pr?.number !== T.number) o.reviewDecision = "";
      o.pr = T ? {
        number: T.number,
        url: T.html_url,
        isDraft: T.draft
      } : null;
    } else {
      if (h_2.status === 401) mto(t.host);else if (h_2.status === 403 || h_2.status === 429) _Wd(h_2);
      return xe("github_pr_status_direct", h_2.status === 401 ? "unauthorized" : h_2.status === 403 || h_2.status === 429 ? "rate_limited" : "http_error", {
        http_status: String(h_2.status)
      }), A(`[ghPrStatus] REST list ${h_2.status} on ${t.host}`, {
        level: "debug"
      }), "fetch-failed";
    }
  } catch (m) {
    return xe("github_pr_status_direct", "fetch_threw", {
      error_name: dK(m) ?? "unknown",
      errno_code: Xd(m) ?? Xd(m?.cause) ?? ""
    }), "fetch-failed";
  }
  let c = o.pr;
  if (!c) return He("github_pr_status_direct"), null;
  let u = o.reviewDecision,
    d = false;
  if (l || Date.now() - o.lastReviewFetchAt >= J5d) {
    let m = await tWd({
      host: t.host,
      owner: r.owner,
      repo: r.repo
    }, n, c.number);
    if (m !== null) {
      if (u = m, o.pr?.number === c.number) o.reviewDecision = m, o.lastReviewFetchAt = Date.now();
    } else d = true;
  }
  if (d) Pt("github_pr_status_direct", "review_decision_unavailable");else He("github_pr_status_direct");
  return {
    number: c.number,
    url: c.url,
    reviewState: Cla(c.isDraft, u)
  };
}
async function tWd(e, t, n) {
  let r = e.host === "github.com" ? "https://api.github.com/graphql" : `https://${e.host}/api/graphql`,
    o = Pe({
      query: "query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){reviewDecision}}}",
      variables: {
        o: e.owner,
        r: e.repo,
        n
      }
    });
  try {
    let s = await fetch(r, {
      ...nT({
        url: r
      }),
      keepalive: false,
      method: "POST",
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
        "User-Agent": Fg()
      },
      body: o,
      redirect: "error",
      signal: AbortSignal.timeout(X1t)
    });
    if (!s.ok) return null;
    let i = Z5d().safeParse(await s.json());
    return i.success ? i.data.data.repository?.pullRequest?.reviewDecision ?? "" : null;
  } catch {
    return null;
  }
}
async function nWd() {
  let e = await $K();
  return e ? Rla(e) : null;
}
function Rla(e) {
  let t = V1e(e);
  if (!t) return null;
  let n = t.split("/");
  if (n.length < 3) return null;
  let r = n[0];
  if (/^[\d.]+$/.test(r) || /^\[?[0-9a-f:]+\]?$/i.test(r)) return null;
  return {
    host: r,
    owner: n[1],
    repo: n[2]
  };
}
async function oWd(e, t) {
  let n = `${e.host}/${e.owner}/${e.repo}`;
  if (nst?.forOrigin === n) return nst;
  let r = await sWd(),
    o = r ? Rla(r) : null;
  if (o && o.host === e.host) return nst = {
    forOrigin: n,
    owner: o.owner,
    repo: o.repo
  }, nst;
  let s = await iWd(e, t);
  return nst = {
    forOrigin: n,
    ...(s ?? {
      owner: e.owner,
      repo: e.repo
    })
  }, nst;
}
async function sWd() {
  let {
    stdout: e,
    code: t
  } = await Fn("git", ["config", "--get", "remote.upstream.url"], {
    timeout: 2000,
    preserveOutputOnError: false
  });
  return t === 0 && e.trim() ? e.trim() : null;
}
async function iWd(e, t) {
  let r = `${e.host === "github.com" ? "https://api.github.com" : `https://${e.host}/api/v3`}/repos/${e.owner}/${e.repo}`;
  try {
    let o = await fetch(r, {
      ...nT({
        url: r
      }),
      method: "GET",
      headers: {
        Authorization: `Bearer ${t}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": wla,
        "User-Agent": Fg()
      },
      redirect: "error",
      signal: AbortSignal.timeout(X1t)
    });
    if (!o.ok) return null;
    let s = rWd().safeParse(await o.json()),
      i = s.success ? s.data.parent : null;
    return i ? {
      owner: i.owner.login,
      repo: i.name
    } : null;
  } catch {
    return null;
  }
}
function O0n(e) {
  switch (e.state) {
    case "MERGED":
      return "merged";
    case "CLOSED":
    case "DRAFT":
      return "inactive";
    case "OPEN":
      {
        if (e.checks.failed > 0 || e.review === "CHANGES_REQUESTED") return "error";
        if (e.checks.pending === 0 && e.review !== "REVIEW_REQUIRED") return "success";
        return "warning";
      }
  }
}
function aWd(e) {
  let t = 0,
    n = 0,
    r = 0;
  for (let o of e ?? []) {
    let s = (o.conclusion ?? o.state)?.toUpperCase();
    if (s === "SUCCESS" || s === "NEUTRAL" || s === "SKIPPED") t++;else if (s === "FAILURE" || s === "ERROR") n++;else if (s == null || s === "ACTION_REQUIRED" || s === "PENDING" || s === "EXPECTED" || o.status?.toUpperCase() !== "COMPLETED") r++;else n++;
  }
  return {
    passed: t,
    failed: n,
    pending: r
  };
}
function OJr(e) {
  if (Vi() || kla()) return Promise.resolve(null);
  return lWd(e).catch(() => null);
}
function xla(e) {
  let t = e.match(cWd);
  if (!t) return null;
  return {
    url: e,
    host: t[1],
    owner: t[2],
    repo: t[3],
    num: Number(t[4])
  };
}
function Z1t(e, t) {
  if (!t) return e;
  let n = xla(e);
  if (!n) return e;
  return t.replaceAll("{host}", n.host).replaceAll("{owner}", n.owner).replaceAll("{repo}", n.repo).replaceAll("{number}", String(n.num)).replaceAll("{url}", e);
}
function uWd(e, t) {
  let n = 0,
    r = 0,
    o = 0;
  for (let {
    state: s,
    count: i
  } of e ?? []) switch (s) {
    case "SUCCESS":
    case "NEUTRAL":
    case "SKIPPED":
      n += i;
      break;
    case "FAILURE":
    case "CANCELLED":
    case "TIMED_OUT":
    case "STALE":
    case "STARTUP_FAILURE":
      r += i;
      break;
    case "ACTION_REQUIRED":
    case "IN_PROGRESS":
    case "QUEUED":
    case "PENDING":
    case "WAITING":
    case "REQUESTED":
    case "COMPLETED":
      o += i;
      break;
    default:
      r += i;
  }
  for (let {
    state: s,
    count: i
  } of t ?? []) switch (s) {
    case "SUCCESS":
      n += i;
      break;
    case "FAILURE":
    case "ERROR":
      r += i;
      break;
    default:
      o += i;
  }
  return {
    passed: n,
    failed: r,
    pending: o
  };
}
function dWd(e) {
  let t = e.commits.nodes[0]?.commit.statusCheckRollup ?? null;
  return {
    number: e.number,
    title: e.title,
    state: e.state === "MERGED" ? "MERGED" : e.state === "CLOSED" ? "CLOSED" : e.isDraft ? "DRAFT" : "OPEN",
    checks: uWd(t?.contexts?.checkRunCountsByState, t?.contexts?.statusContextCountsByState),
    review: e.reviewDecision === "APPROVED" || e.reviewDecision === "CHANGES_REQUESTED" || e.reviewDecision === "REVIEW_REQUIRED" ? e.reviewDecision : null,
    additions: e.additions,
    deletions: e.deletions
  };
}
function pWd(e) {
  return e !== null && typeof e === "object" && "number" in e && typeof e.number === "number" && "state" in e && typeof e.state === "string";
}
function mWd(e) {
  return e !== null && typeof e === "object" && !("cost" in e);
}
function _la(e, t) {
  let n = new Map();
  for (let r of e) {
    let o = t(r),
      s = n.get(o);
    if (s) s.push(r);else n.set(o, [r]);
  }
  return n;
}
function kla() {
  return Date.now() < rst;
}
function _Wd(e) {
  let t = Number(e.headers.get("retry-after")),
    n = Number(e.headers.get("x-ratelimit-reset"));
  rst = Number.isFinite(t) && t > 0 ? Date.now() + t * 1000 : Number.isFinite(n) && n > 0 ? n * 1000 : Date.now() + PJr;
}
async function Hla(e) {
  let t = new Map(),
    n = [],
    r = null;
  if (e.length === 0 || Vi() || Date.now() < rst) {
    for (let a of e) t.set(a, null);
    return {
      statuses: t,
      rateLimit: r,
      unbatched: []
    };
  }
  let o = [];
  for (let a of e) {
    let l = xla(a);
    if (l) o.push(l);else if (/\/pull\/\d+/.test(a)) n.push(a);
  }
  o.sort((a, l) => a.url.localeCompare(l.url));
  let s = [];
  for (let [a, l] of _la(o, c => c.host)) for (let c = 0; c < l.length; c += yla) s.push({
    host: a,
    chunk: l.slice(c, c + yla)
  });
  let i = eat(AWd, async ({
    host: a,
    chunk: l
  }) => {
    if (Date.now() < rst) {
      for (let _ of l) t.set(_.url, null);
      return;
    }
    let c = new Map(),
      d = [..._la(l, _ => `${_.owner}/${_.repo}`)].map(([_, y], T_2) => {
        let [S_2, v] = _.split("/"),
          R_2 = y.map((k_2, x) => {
            let H_2 = `p${T_2}_${x}`;
            return c.set(H_2, k_2.url), `${H_2}: pullRequest(number: ${k_2.num}) { ...pr }`;
          }).join(" ");
        return `r${T_2}: repository(owner:"${S_2}", name:"${v}") { ${R_2} }`;
      }),
      p = `${fWd}
query { rateLimit{cost remaining resetAt} ${d.join(" ")} }`,
      {
        stdout: m,
        stderr: f,
        code: A_2
      } = await Fn("gh", ["api", "graphql", "--hostname", a, "--cache", gWd, "-F", "query=@-"], {
        timeout: hWd,
        input: p,
        preserveOutputOnError: true
      }),
      h_2 = null;
    if (m.trim()) try {
      h_2 = qt(m);
    } catch {
      h_2 = null;
    }
    if (!h_2?.data) {
      if (Tla.test(f) || Tla.test(m)) rst = Date.now() + PJr, A(`[ghPrStatus] GitHub rate-limited on ${a}; backing off 60s`, {
        level: "warn"
      });else A(`[ghPrStatus] batch query failed on ${a} (exit ${A_2}); keeping last-known`);
      for (let _ of l) t.set(_.url, null);
      return;
    }
    let g_2 = h_2.data.rateLimit;
    if (g_2) {
      if (!r || g_2.remaining < r.remaining) r = g_2;
      if (g_2.remaining < 50) rst = Date.parse(g_2.resetAt) || Date.now() + PJr;
    }
    for (let [_, y] of Object.entries(h_2.data)) {
      if (!_.startsWith("r") || !mWd(y)) continue;
      for (let [T, S_2] of Object.entries(y)) {
        let v = c.get(T);
        if (!v) continue;
        t.set(v, pWd(S_2) ? dWd(S_2) : null);
      }
    }
    for (let _ of c.values()) if (!t.has(_)) t.set(_, null);
  });
  return await Promise.all(s.map(i)), {
    statuses: t,
    rateLimit: r,
    unbatched: n
  };
}
function Dla(e) {
  let t = {};
  for (let [r, o] of e) if (o) t[r] = o;
  let n = Pe(t);
  if (n === "{}" || n === Sla) return Promise.resolve();
  return Sla = n, vf(Ila(), n).catch(() => {});
}
async function Pla() {
  try {
    let e = await bla.readFile(Ila(), "utf8");
    return new Map(Object.entries(qt(e)));
  } catch {
    return new Map();
  }
}
var bla,
  Ela,
  S9e,
  jee,
  X1t = 5000,
  J5d = 300000,
  wla = "2022-11-28",
  X5d,
  DJr = null,
  Q5d,
  Z5d,
  rWd,
  nst,
  lWd,
  cWd,
  fWd = `fragment pr on PullRequest {
  number title state isDraft additions deletions
  reviewDecision
  commits(last:1){nodes{commit{statusCheckRollup{
    state
    contexts(first:0){
      checkRunCountsByState{state count}
      statusContextCountsByState{state count}
    }
  }}}}
}`,
  yla = 20,
  AWd = 6,
  hWd = 15000,
  gWd = "30s",
  PJr = 60000,
  Tla,
  rst = 0,
  Sla = "",
  Ila = () => Ela.join(or(), "gh-pr-status-cache.json");
var ost = b(() => {
  MS();
  mn();
  jn();
  Pv();
  qe();
  dn();
  Ct();
  Ii();
  ia();
  wha();
  v5();
  $d();
  ey();
  ig();
  tn();
  bla = require("fs/promises"), Ela = require("path"), S9e = Ni(), jee = {
    disabled: false,
    badStreak: 0
  };
  X5d = new Set([301, 302, 307, 308]), Q5d = ve(() => jt.array(jt.object({
    number: jt.number(),
    html_url: jt.string(),
    draft: jt.boolean()
  }))), Z5d = ve(() => jt.object({
    data: jt.object({
      repository: jt.object({
        pullRequest: jt.object({
          reviewDecision: jt.string().nullable()
        }).nullable()
      }).nullable()
    })
  }));
  rWd = ve(() => jt.object({
    parent: jt.object({
      name: jt.string(),
      owner: jt.object({
        login: jt.string()
      })
    }).nullish()
  }));
  lWd = L1e(async e => {
    let {
      stdout: t,
      code: n
    } = await Fn("gh", ["pr", "view", e, "--json", "number,title,state,isDraft,statusCheckRollup,reviewDecision,additions,deletions"], {
      timeout: X1t,
      preserveOutputOnError: false
    });
    if (n !== 0 || !t.trim()) return null;
    try {
      let r = qt(t);
      return {
        number: r.number,
        title: r.title,
        state: r.state === "MERGED" ? "MERGED" : r.state === "CLOSED" ? "CLOSED" : r.isDraft ? "DRAFT" : "OPEN",
        checks: aWd(r.statusCheckRollup),
        review: r.reviewDecision === "APPROVED" || r.reviewDecision === "CHANGES_REQUESTED" || r.reviewDecision === "REVIEW_REQUIRED" ? r.reviewDecision : null,
        additions: r.additions,
        deletions: r.deletions
      };
    } catch {
      return null;
    }
  }, 30000);
  cWd = /^https:\/\/([\w.-]+)\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)\b/;
  Tla = /rate limit/i;
});

export {Cla as Oha,vla as Lha,Q1t as kBt,Y5d as MZd,eWd as $Zd,tWd as qZd,nWd as WZd,Rla as Nha,oWd as VZd,sWd as KZd,iWd as zZd,O0n as ROn,aWd as jZd,OJr as gto,xla as Fha,Z1t as HBt,uWd as XZd,dWd as QZd,pWd as ZZd,mWd as eep,_la as kha,kla as Bha,_Wd as sep,Hla as Uha,Dla as qha,Pla as Wha,bla as Dha,Ela as Pha,S9e as D3e,jee as Nee,X1t as wBt,J5d as NZd,wla as Mha,X5d as FZd,DJr as fto,Q5d as BZd,Z5d as UZd,rWd as GZd,nst as tat,lWd as YZd,cWd as JZd,fWd as tep,yla as Hha,AWd as nep,hWd as rep,gWd as oep,PJr as hto,Tla as Iha,rst as nat,Sla as xha,Ila as $ha,ost as rat};
