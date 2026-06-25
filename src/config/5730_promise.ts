// @ts-nocheck
import {Ne} from "../../vendor/m583.ts";
import {e8e,b6t,$q} from "../tools/4352_displayName.ts";
import {oB,zke} from "../../vendor/m2779.ts";
import {or,dn} from "./0137_namespace.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {vf,Pv} from "../../vendor/m639.ts";
import {wn,pf} from "./0693_timestamp.ts";
import {m9n,d$a,l$a,a$a,c$a,S3t} from "./3968_maxEditDistance.ts";
import {findCommand as hb,getCommands as UE,clearCommandMemoizationCaches as dq,Mm} from "../tools/5174_toSlashCommands.ts";
import {getProjectRoot as ic,lt} from "../session/0132_sent.ts";
import {xF,resolveToolAlias as UR} from "./2229_observed_uid.ts";
import {Bhc,Fhc,Uhc} from "../../vendor/m5728.ts";
import {xDe,DDe} from "./4456_path.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
function eac() {
  let e = Ne.CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS;
  return e && e > 0 ? e : 5000;
}
function tac() {
  let e = Ne.CLAUDE_CODE_SYNC_SKILLS_INSTALL_TIMEOUT_MS;
  return e && e > 0 ? e : 30000;
}
function Q1o() {
  if (!J1o) {
    let e;
    J1o = {
      promise: new Promise(n => {
        e = n;
      }),
      resolve: e
    };
  }
  return J1o;
}
function rac() {
  if (nac ??= dZn(), !X1o) X1o = setInterval(() => void dZn(), c4m), X1o.unref?.();
}
function oac() {
  let e = Q1o();
  return nac ??= dZn(), e.promise;
}
async function sac() {
  return await vht?.catch(() => {}), dZn();
}
function eNo() {
  e8e(), oB.emit();
}
function wVt() {
  return bD.join(or(), "skills");
}
function iac() {
  return bD.join(wVt(), u4m);
}
async function d4m() {
  try {
    let e = await e2.readFile(iac(), "utf8");
    return qt(e);
  } catch {
    return null;
  }
}
async function p4m(e) {
  await e2.mkdir(wVt(), {
    recursive: true
  }), await vf(iac(), Pe(e, null, 2));
}
function Z1o() {
  return bD.join(wVt(), ".staging");
}
function wht(e) {
  let t = e.replace(/[<>"|?*\\/]/g, "_"),
    n = wVt(),
    r = bD.join(n, t),
    o = bD.relative(n, r);
  if (!o || bD.isAbsolute(o) || o === ".." || o.startsWith(`..${bD.sep}`)) throw Error(`invalid skill name: ${e}`);
  return r;
}
function m4m(e, t) {
  let n = new Map(t.map(l => [l.skillId, l])),
    r = new Set(e.map(l => l.skillId)),
    o = new Set(),
    s = [],
    i = [];
  for (let l of e) {
    let c = n.get(l.skillId),
      u;
    try {
      u = wht(l.name);
    } catch {
      if (wn("warn", "skills_sync_invalid_name"), c) i.push(c);
      continue;
    }
    if (o.has(u)) {
      if (wn("warn", "skills_sync_name_collision"), c) i.push(c);
      continue;
    }
    if (o.add(u), !c || c.updatedAt !== l.updatedAt || c.name !== l.name) s.push({
      skill: l,
      prev: c
    });else i.push(c);
  }
  let a = t.filter(l => !r.has(l.skillId));
  return {
    toDownload: s,
    toRemove: a,
    carryover: i,
    liveDirs: o
  };
}
function f4m(e) {
  let t = wht(e.name),
    n = bD.basename(t),
    r = b6t({
      skillName: n,
      displayName: undefined,
      description: e.description,
      hasUserSpecifiedDescription: true,
      markdownContent: "",
      allowedTools: [],
      argumentHint: undefined,
      argumentNames: [],
      whenToUse: undefined,
      version: undefined,
      model: undefined,
      disableModelInvocation: false,
      userInvocable: true,
      source: "userSettings",
      baseDir: t,
      loadedFrom: "skills",
      hooks: undefined,
      executionContext: undefined,
      agent: undefined,
      paths: undefined,
      effort: undefined,
      shell: undefined
    });
  if (r.type === "prompt") r.getPromptForCommand = async (o, s) => {
    let i = await m9n(n);
    if (i.ok) {
      let l = hb(n, await UE(ic()));
      if (l && l.type === "prompt" && l !== r) return r.allowedTools = l.allowedTools, r.hooks = l.hooks, r.model = l.model, r.effort = l.effort, r.getEffort = l.getEffort, r.source = l.source, r.skillRoot = l.skillRoot, r.contentLength = l.contentLength, r.progressMessage = l.progressMessage, r.userInvocable = l.userInvocable, l.getPromptForCommand(o, s);
    }
    let a = i.ok ? "skill not found after download" : i.reason;
    return [{
      type: "text",
      text: `Skill ${n} could not be downloaded (${a}). Proceed without it.`
    }];
  };
  return r;
}
async function Qic(e) {
  let t = wht(e.name),
    n = bD.join(Z1o(), bD.relative(wVt(), t)),
    r = bD.join(xF(), `claude-skill-${process.pid}-${Math.random().toString(36).slice(2)}.zip`);
  try {
    if (!(await Bhc(e.skillId, r))) return false;
    await e2.rm(n, {
      recursive: true,
      force: true
    }), await e2.mkdir(Z1o(), {
      recursive: true
    }), await xDe(r, n);
    let s = n,
      i = await e2.readdir(n, {
        withFileTypes: true
      });
    if (!i.some(a => a.name === "SKILL.md") && i.length === 1 && i[0].isDirectory()) s = bD.join(n, i[0].name);
    return await e2.rm(t, {
      recursive: true,
      force: true
    }), await e2.rename(s, t), true;
  } finally {
    await e2.rm(r, {
      force: true
    }).catch(() => {}), await e2.rm(n, {
      recursive: true,
      force: true
    }).catch(() => {});
  }
}
async function h4m(e) {
  try {
    return await Qic(e);
  } catch {
    return wn("warn", "skills_sync_extract_retry"), await Kn(A4m), Qic(e);
  }
}
async function Zic(e, t, n) {
  let r = 0,
    o = Array.from({
      length: Math.min(t, e.length)
    }, async () => {
      while (true) {
        let s = r++;
        if (s >= e.length) return;
        await n(e[s]);
      }
    });
  await Promise.all(o);
}
async function dZn() {
  if (vht) return vht;
  return vht = g4m().finally(() => {
    vht = null;
  }), vht;
}
async function g4m() {
  let e = Date.now(),
    t = new Map();
  try {
    wn("info", "skills_sync_starting");
    let n = await Fhc();
    if (!n.success) {
      wn("warn", "skills_sync_list_failed", {
        duration_ms: Date.now() - e
      }), W("tengu_skills_sync_list_failed", {
        duration_ms: Date.now() - e
      });
      return;
    }
    let r = await d4m(),
      {
        toDownload: o,
        toRemove: s,
        carryover: i,
        liveDirs: a
      } = m4m(n.skills, r?.skills ?? []),
      l = async m => {
        try {
          let f = wht(m);
          if (a.has(f)) return;
          await e2.rm(f, {
            recursive: true,
            force: true
          });
        } catch {}
      };
    await e2.rm(Z1o(), {
      recursive: true,
      force: true
    }).catch(() => {});
    let c = new Set(Array.from(a, m => bD.basename(m)));
    if (d$a(c) > 0) dq(), oB.emit();
    if (o.length === 0 && s.length === 0) {
      wn("info", "skills_sync_no_changes", {
        duration_ms: Date.now() - e
      });
      return;
    }
    let u = 0;
    for (let {
      skill: m,
      prev: f
    } of o) if (!f) l$a(f4m(m)), u++, t.set(m.skillId, a$a(bD.basename(wht(m.name))));
    if (u > 0) dq(), oB.emit();
    Q1o().resolve();
    let d = [],
      p = [];
    await Zic(o, Xic, async ({
      skill: m,
      prev: f
    }) => {
      let A = false;
      try {
        A = await h4m(m);
      } catch {
        wn("warn", "skills_sync_extract_failed");
      }
      if (A) {
        if (d.push(m), f && f.name !== m.name) await l(f.name);
        c$a(bD.basename(wht(m.name))), e8e(), dq();
      } else if (f) p.push(f);
      t.get(m.skillId)?.(A ? {
        ok: true
      } : {
        ok: false,
        reason: "download failed"
      });
    }), await Zic(s, Xic, m => l(m.name)), eNo(), await p4m({
      lastUpdated: Date.now(),
      skills: [...i, ...d, ...p]
    }), wn("info", "skills_sync_complete", {
      downloaded: d.length,
      removed: s.length,
      duration_ms: Date.now() - e
    }), W("tengu_skills_sync_success", {
      downloaded: d.length,
      removed: s.length,
      total: n.skills.length,
      duration_ms: Date.now() - e
    });
  } catch {
    wn("error", "skills_sync_unexpected_error", {
      duration_ms: Date.now() - e
    }), W("tengu_skills_sync_error", {
      duration_ms: Date.now() - e
    });
  } finally {
    for (let n of t.values()) n({
      ok: false,
      reason: "skills sync failed"
    });
    Q1o().resolve();
  }
}
var e2,
  bD,
  c4m = 600000,
  Xic = 15,
  u4m = "manifest.json",
  vht = null,
  nac = null,
  J1o = null,
  X1o = null,
  A4m = 500;
var aac = b(() => {
  lt();
  Mm();
  $q();
  Pv();
  pf();
  Ir();
  dn();
  DDe();
  zke();
  tn();
  UR();
  kt();
  Uhc();
  S3t();
  e2 = require("fs/promises"), bD = require("path");
});

export {eac as Ghc,tac as Vhc,Q1o as A$o,rac as zhc,oac as jhc,sac as Yhc,eNo as v$o,wVt as ejt,iac as Jhc,d4m as F7m,p4m as B7m,Z1o as R$o,wht as Yyt,m4m as U7m,f4m as $7m,Qic as qhc,h4m as W7m,Zic as Whc,dZn as Rrr,g4m as G7m,e2 as SU,bD as Dx,c4m as M7m,Xic as $hc,u4m as N7m,vht as jyt,nac as Khc,J1o as E$o,X1o as C$o,A4m as q7m,aac as Xhc};
