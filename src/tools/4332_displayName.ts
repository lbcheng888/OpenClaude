// @ts-nocheck
import {RR,h7} from "../../vendor/m704.ts";
import {tr,dp,sn} from "../config/0047_namespace.ts";
import {$f,HF} from "../core/2683_HF.ts";
import {K3} from "../../vendor/m723.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {$Ht,iF,AQe,X_n,J_n,CFe,RA,Ev} from "../../vendor/m2211.ts";
import {Gce,iJ,N6,Ldt,D6,Qqe} from "../agent/5186_bigint.ts";
import {parseUserSpecifiedModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {aF,nP,jO,Om} from "../config/2215_level.ts";
import {NIn,Pot,T1t} from "../../vendor/m3251.ts";
import {Jrt,SMt} from "../../vendor/m3159.ts";
import {nY} from "../../vendor/m3250.ts";
import {getSessionId,getOriginalCwd,lt,getAdditionalDirectoriesForClaudeMd} from "../session/0131_sent.ts";
import {Fh,Ql} from "../../vendor/m4405.ts";
import {K4n,z4n,bfo} from "../config/4329_bfo.ts";
import {I_e,Pdt} from "../../vendor/m4327.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {ds,xp,Pn,qp,bt} from "../../vendor/m195.ts";
import {isTmuxControlMode,Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {hC,sh} from "../../vendor/m2589.ts";
import {getInitialSettings,yr} from "../config/0740_updateSettingsForSource.ts";
import {Xz} from "../../vendor/m3193.ts";
import {D_e,Efo} from "../../vendor/m4329.ts";
import {EFe,UHt} from "../permissions/2210_surface.ts";
import {De,Rn} from "../session/0615_length.ts";
import {iS,RK} from "../../vendor/m2231.ts";
import {xh,mf} from "../../vendor/m702.ts";
import {hc,Iy} from "../agent/2230_explicitlyRequested.ts";
import {$tn,TAr} from "../../vendor/m694.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe,st,ca} from "../../vendor/m5.ts";
import {b,M} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {Go} from "../../vendor/m632.ts";
import {_Yr} from "../../vendor/m3253.ts";
import {J3} from "../artifact/0731_allow.ts";
import {kg} from "../../vendor/m129.ts";
import {tx,Ywe} from "../telemetry/2595_skill_name.ts";
import {Cfo} from "../../vendor/m4330.ts";
import {HFe} from "../../vendor/m2228.ts";
import {I9i} from "../../vendor/m2797.ts";
function fBp(e: any, t: any): any {
  if (t === "policySettings") return !1;
  return e === "skills" || e === "commands_DEPRECATED" || e === "plugin";
}
function w6e(e: any, t: any): any {
  switch (e) {
    case "policySettings":
      return Cf.join(RR(), ".claude", t);
    case "userSettings":
      return Cf.join(tr(), t);
    case "projectSettings":
      return `.claude/${t}`;
    case "plugin":
      return "plugin";
    default:
      return "";
  }
}
function wfo(e: any): any {
  return [e.name, e.description, e.whenToUse].filter(Boolean).join(" ");
}
function e4t(e: any, t: any): any {
  return $f(wfo(e), t);
}
async function ABp(e: any): Promise<any> {
  try {
    return await vfo.realpath(e);
  } catch {
    return null;
  }
}
function hBp(e: any, t: any): any {
  if (!e.hooks) return;
  let n: any = K3().safeParse(e.hooks);
  if (!n.success) {
    logForDebugging(`Invalid hooks in skill '${t}': ${n.error.message}`);
    return;
  }
  return n.data;
}
function gBp(e: any): any {
  if (!e.paths) return;
  let t: any = $Ht(e.paths).map((n: any) => n.endsWith("/**") ? n.slice(0, -3) : n).filter((n: any) => n.length > 0);
  if (t.length === 0 || t.every((n: any) => n === "**")) return;
  return t;
}
function Rfo(e: any, t: any, n: any, r: any = "Skill"): any {
  let o: any = iF(e.description, n),
    s: any = o ?? Gce(t, r),
    i: any = e["user-invocable"] === void 0 ? !0 : AQe(e["user-invocable"]),
    a: any = e.model,
    l: any;
  if (typeof a === "string" && a.trim().length > 0) {
    let d: any = a.trim();
    l = d === "inherit" ? void 0 : parseUserSpecifiedModel(d);
  }
  let c: any = e.effort,
    u: any = c !== void 0 ? aF(c) : void 0;
  if (c !== void 0 && u === void 0) logForDebugging(`Skill ${n} has invalid effort '${c}'. Valid options: ${nP.join(", ")} or an integer`);
  return {
    displayName: e.name != null ? String(e.name) : void 0,
    description: s,
    hasUserSpecifiedDescription: o !== null,
    allowedTools: iJ(e["allowed-tools"]),
    disallowedTools: iJ(e["disallowed-tools"] ?? e.disallowedTools),
    argumentHint: e["argument-hint"] != null ? String(e["argument-hint"]) : void 0,
    argumentNames: NIn(e.arguments),
    whenToUse: e.when_to_use != null ? String(e.when_to_use) : void 0,
    version: e.version != null ? String(e.version) : void 0,
    model: l,
    disableModelInvocation: AQe(e["disable-model-invocation"]),
    userInvocable: i,
    hooks: hBp(e, n),
    executionContext: e.context === "fork" ? "fork" : void 0,
    agent: e.agent != null ? String(e.agent) : void 0,
    effort: u,
    shell: X_n(e.shell, n),
    createdBy: e.created_by === "dream-proposal" || e.improved_by === "dream-proposal" ? "dream-proposal" : void 0,
    declaredFields: J_n(e),
    fallback: CFe(e.fallback)
  };
}
function _Bp(e: any): any {
  let t: any = e.directoryRead ? ` The same call on "${e.uri}" or a subdirectory URI returns its listing.` : "";
  return `This skill is served by MCP server "${e.server}" at ${e.uri}. ` + `To read a supporting file this skill references by a relative path — for example "templates/invoice.md" — call ${Jrt} with server "${e.server}" and uri "${e.uri}/templates/invoice.md".${t}`;
}
function t4t({
  skillName: e,
  displayName: t,
  description: n,
  hasUserSpecifiedDescription: r,
  markdownContent: o,
  allowedTools: s,
  disallowedTools: i,
  argumentHint: a,
  argumentNames: l,
  whenToUse: c,
  version: u,
  model: d,
  disableModelInvocation: p,
  userInvocable: m,
  source: f,
  baseDir: A,
  mcpResourceRoot: h,
  loadedFrom: g,
  hooks: _,
  executionContext: y,
  agent: T,
  paths: S,
  effort: v,
  shell: R,
  createdBy: k,
  declaredFields: x,
  fallback: H
}: any): any {
  if (A && s.length > 0) {
    let I: any = A;
    s = s.map((P: any) => P.replace(/\$\{CLAUDE_SKILL_DIR\}/g, () => I));
  }
  return {
    type: "prompt",
    name: e,
    description: n,
    hasUserSpecifiedDescription: r,
    allowedTools: s,
    disallowedTools: i?.length ? i : void 0,
    argumentHint: a,
    argNames: l.length > 0 ? l : void 0,
    whenToUse: c,
    version: u,
    model: d,
    disableModelInvocation: p,
    userInvocable: m,
    context: y,
    agent: T,
    effort: v,
    paths: S,
    declaredFields: x,
    contentLength: o.length,
    isHidden: !m,
    progressMessage: "running",
    userFacingName() {
      return t || e;
    },
    source: f,
    loadedFrom: g,
    createdBy: k,
    fallback: H,
    hooks: _,
    skillRoot: A,
    async getPromptForCommand(I: any, P: any) {
      let L: any = A ? `Base directory for this skill: ${A}

${o}` : h ? `${_Bp(h)}

${o}` : o;
      if (L = Pot(L, I, !0, l, nY), A) {
        let D: any = A;
        L = L.replaceAll("${CLAUDE_SKILL_DIR}", D);
      }
      if (L = L.replace(/\$\{CLAUDE_SESSION_ID\}/g, getSessionId()), L = L.replaceAll("${CLAUDE_EFFORT}", jO(d ?? P.options.mainLoopModel, v ?? Fh(P))), fBp(g, f) && K4n()) L = z4n(L);else if (g !== "mcp") L = await I_e(L, {
        ...P,
        getAppState() {
          let D: any = P.getAppState();
          return {
            ...D,
            toolPermissionContext: {
              ...D.toolPermissionContext,
              alwaysAllowRules: {
                ...D.toolPermissionContext.alwaysAllowRules,
                command: s
              }
            }
          };
        }
      }, `/${e}`, R);
      return [{
        type: "text",
        text: L
      }];
    }
  };
}
async function Odt(e: any, t: any): Promise<any> {
  let n: any = jt(),
    r: any;
  try {
    r = await n.readdir(e);
  } catch (a: any) {
    if (!ds(a)) logForDebugging(`Failed to read skills directory ${e}: ${a}`, {
      level: "error"
    }), isTmuxControlMode("skill_load_dir", "skill_load_readdir_failed");
    return [];
  }
  if (r.length === 0 && e.startsWith("/mnt/")) {
    await sleep(250);
    try {
      let a: any = await n.readdir(e);
      if (a.length > 0) logForDebugging(`Skills directory ${e}: first readdir was empty, retry returned ${a.length} entries (transient mount race)`, {
        level: "warn"
      }), isTmuxControlMode("skill_load_dir", "skill_load_mnt_transient_empty"), r = a;else isTmuxControlMode("skill_load_dir", "skill_load_mnt_persistent_empty");
    } catch (a: any) {
      let l: any = xp(a);
      if (isTmuxControlMode("skill_load_dir", `skill_load_mnt_retry_${(l ?? "unknown").toLowerCase()}`), !ds(a)) logForDebugging(`Skills directory ${e}: retry readdir failed: ${a}`, {
        level: "error"
      });
    }
  }
  let o: any = null,
    s: any = new Set();
  {
    let a: any = `@${hC}`;
    if (t === "userSettings" && e === Cf.join(tr(), "skills") || t === "projectSettings" && e === Cf.join(getOriginalCwd(), ".claude", "skills")) {
      let c: any = getInitialSettings().enabledPlugins;
      for (let u in c) if (c[u] === !1 && u.endsWith(a)) s.add(u.slice(0, -a.length));
    }
  }
  let i: any = await Promise.all(r.map(async (a: any) => {
    try {
      if (!a.isDirectory() && !a.isSymbolicLink()) return null;
      let l: any = Cf.join(e, a.name),
        c: any = Cf.join(l, "SKILL.md");
      if (s.size > 0) {
        let _: any = a.name;
        try {
          let y: any = await n.readFile(Cf.join(l, ".claude-plugin", "plugin.json"), {
              encoding: "utf-8"
            }),
            T: any = JSON.parse(y);
          if (T !== null && typeof T === "object" && "name" in T && typeof T.name === "string" && T.name) _ = T.name;
        } catch (y: any) {
          if (!Pn(y)) ;else _ = null;
        }
        if (_ !== null && s.has(_)) return null;
      }
      let u: any = 0;
      try {
        u = (await n.stat(c)).size ?? 0;
      } catch {}
      if (u > Xz) return logForDebugging(`[skills] skipping ${c}: ${u} bytes exceeds ${Xz} byte limit`, {
        level: "warn"
      }), o = "skill_load_too_large", null;
      let d: any;
      try {
        d = await n.readFile(c, {
          encoding: "utf-8"
        });
      } catch (_: any) {
        if (!Pn(_)) logForDebugging(`[skills] failed to read ${c}: ${_}`, {
          level: "warn"
        }), o = "skill_load_read_failed";
        return null;
      }
      let {
          frontmatter: p,
          content: m
        }: any = RA(d, c, {
          normalizeKeys: !0
        }),
        f: any = D_e(c, m),
        A: any = a.name;
      EFe("skill", p);
      let h: any = Rfo(p, f, A),
        g: any = gBp(p);
      return {
        skill: t4t({
          ...h,
          skillName: A,
          markdownContent: f,
          source: t,
          baseDir: l,
          loadedFrom: "skills",
          paths: g
        }),
        filePath: c
      };
    } catch (l: any) {
      return logForDebugging(`[skills] failed to parse ${Cf.join(e, a.name, "SKILL.md")}: ${l}`, {
        level: "error"
      }), o = "skill_load_parse_failed", null;
    }
  }));
  if (o) Oe("skill_load_dir", o);else Ie("skill_load_dir");
  return i.filter((a: any) => a !== null).sort((a: any, l: any) => a.skill.name.localeCompare(l.skill.name));
}
function xfo(e: any): any {
  return /^skill\.md$/i.test(Cf.basename(e));
}
function yBp(e: any): any {
  let t: any = new Map();
  for (let r of e) {
    let o: any = Cf.dirname(r.filePath),
      s: any = t.get(o) ?? [];
    s.push(r), t.set(o, s);
  }
  let n: any = [];
  for (let [r, o] of t) {
    let s: any = o.filter((i: any) => xfo(i.filePath));
    if (s.length > 0) {
      let i: any = s[0];
      if (s.length > 1) logForDebugging(`Multiple skill files found in ${r}, using ${Cf.basename(i.filePath)}`);
      n.push(i);
    } else n.push(...o);
  }
  return n;
}
function AYa(e: any, t: any): any {
  let n: any = t.endsWith(Cf.sep) ? t.slice(0, -1) : t;
  if (!e.startsWith(n + Cf.sep)) return "";
  let r: any = e.slice(n.length + 1);
  return r ? r.split(Cf.sep).join(":") : "";
}
function TBp(e: any, t: any): any {
  let n: any = Cf.dirname(e),
    r: any = Cf.dirname(n),
    o: any = Cf.basename(n),
    s: any = AYa(r, t);
  return s ? `${s}:${o}` : o;
}
function SBp(e: any, t: any): any {
  let n: any = Cf.basename(e),
    r: any = Cf.dirname(e),
    o: any = n.replace(/\.md$/, ""),
    s: any = AYa(r, t);
  return s ? `${s}:${o}` : o;
}
function bBp(e: any): any {
  return xfo(e.filePath) ? TBp(e.filePath, e.baseDir) : SBp(e.filePath, e.baseDir);
}
async function EBp(e: any, t: any): Promise<any> {
  try {
    let [n, r]: any = await Promise.all([N6("commands", e), Promise.all(t.map((l: any) => {
        let c: any = Cf.join(l, ".claude", "commands");
        return Ldt(c).then((u: any) => u.map((d: any) => ({
          ...d,
          baseDir: c,
          source: "projectSettings"
        })));
      }))]),
      o: any = [...n, ...r.flat()],
      s: any = yBp(o),
      i: any = [],
      a: any = !1;
    for (let {
      baseDir: l,
      filePath: c,
      frontmatter: u,
      content: d,
      source: p
    } of s) try {
      let f: any = xfo(c) ? Cf.dirname(c) : void 0,
        A: any = bBp({
          baseDir: l,
          filePath: c,
          frontmatter: u,
          content: d,
          source: p
        });
      EFe("skill", u);
      let h: any = Rfo(u, d, A, "Custom command");
      i.push({
        skill: t4t({
          ...h,
          skillName: A,
          displayName: void 0,
          markdownContent: D_e(c, d),
          source: p,
          baseDir: f,
          loadedFrom: "commands_DEPRECATED",
          paths: void 0
        }),
        filePath: c
      });
    } catch (m: any) {
      logForDebugging(`[skills] failed to load command from ${c}: ${m}`, {
        level: "error"
      }), a = !0;
    }
    if (a) Oe("skill_load_commands_dir", "skill_load_commands_parse_failed");else Ie("skill_load_commands_dir");
    return i.sort((l: any, c: any) => l.skill.name.localeCompare(c.skill.name));
  } catch (n: any) {
    if (qp(n)) logForDebugging(`[skills] commands-dir load failed: ${n.code}`, {
      level: "error"
    });else De(n);
    return isTmuxControlMode("skill_load_commands_dir", "skill_load_commands_dir_failed"), [];
  }
}
async function hYa(): Promise<any> {
  if (iS("skills") || !xh("userSettings") || dp() || hc("skills")) return null;
  let e: any = Cf.join(tr(), "skills"),
    t: any;
  try {
    t = await jt().readdir(e);
  } catch {
    return null;
  }
  let n: any = `@${hC}`,
    r: any = getInitialSettings().enabledPlugins,
    o: any = new Set();
  for (let i in r) if (r[i] === !1 && i.endsWith(n)) o.add(i.slice(0, -n.length));
  let s: any = await Promise.all(t.map(async (i: any) => {
    if (!i.isDirectory() && !i.isSymbolicLink()) return null;
    if (o.has(i.name)) return null;
    try {
      return await vfo.realpath(Cf.join(e, i.name, "SKILL.md"));
    } catch {
      return null;
    }
  }));
  return new Set(s.filter((i: any) => i !== null));
}
function R6e(): any {
  Z3t.cache?.clear?.(), N6.cache?.clear?.();
  let e: any = o4t();
  if (e) e.conditionalSkills.clear(), e.activatedConditionalSkillNames.clear();
}
function kfo(): any {
  return {
    dynamicSkillDirs: new Set(),
    dynamicSkills: new Map(),
    conditionalSkills: new Map(),
    activatedConditionalSkillNames: new Set()
  };
}
function getDynamicSkillStateKey(): any {
  return n4t();
}
function M6(): any {
  let e: any = n4t(),
    t: any = Y4n.get(e);
  if (!t) t = kfo(), Y4n.set(e, t);
  return t;
}
function o4t(): any {
  return Y4n.get(n4t()) ?? null;
}
function gYa(e: any): any {
  Y4n.set(n4t(), e);
}
function _Ya(e: any): any {
  return Hfo.subscribe(() => {
    try {
      e();
    } catch (t: any) {
      De(t);
    }
  });
}
async function eut(e: any, t: any): Promise<any> {
  if (hc("skills")) return [];
  let n: any = jt(),
    r: any = t.endsWith(Cf.sep) ? t.slice(0, -1) : t,
    o: any = [];
  for (let s of e) {
    let i: any = Cf.dirname(s);
    while (i.startsWith(r + Cf.sep)) {
      let a: any = Cf.join(i, ".claude", "skills");
      if (!M6().dynamicSkillDirs.has(a)) {
        M6().dynamicSkillDirs.add(a);
        try {
          if (await n.stat(a), await $tn(i, r)) {
            logForDebugging(`[skills] Skipped gitignored skills dir: ${a}`);
            continue;
          }
          o.push(a);
        } catch {}
      }
      let l: any = Cf.dirname(i);
      if (l === i) break;
      i = l;
    }
  }
  return o;
}
function yYa(e: any): any {
  return `${e.type === "prompt" ? e.skillRoot ?? "" : ""}\x00${e.name}`;
}
async function tut(e: any): Promise<any> {
  if (hc("skills") || !xh("projectSettings") || iS("skills")) {
    logForDebugging("[skills] Dynamic skill discovery skipped: projectSettings disabled or plugin-only policy");
    return;
  }
  if (e.length === 0) return;
  let t: any = new Set(M6().dynamicSkills.keys()),
    n: any = await Promise.all(e.map((o: any) => Odt(o, "projectSettings")));
  for (let o of n) for (let {
    skill: s
  } of o) if (s.type === "prompt") M6().dynamicSkills.set(yYa(s), s);
  let r: any = n.flat().length;
  if (r > 0) {
    let o: any = [...M6().dynamicSkills.keys()].filter((s: any) => !t.has(s));
    if (logForDebugging(`[skills] Dynamically discovered ${r} skills from ${e.length} directories`), o.length > 0) logEvent("tengu_dynamic_skills_changed", {
      source: Qe("file_operation"),
      previousCount: t.size,
      newCount: M6().dynamicSkills.size,
      addedCount: o.length,
      directoryCount: e.length
    });
  }
  Hfo.emit();
}
function TYa(): any {
  return Array.from(o4t()?.dynamicSkills.entries() ?? []).sort(([e, t], [n, r]) => t.name === r.name ? e.localeCompare(n) : t.name.localeCompare(r.name)).map(([, e]) => e);
}
function nut(e: any, t: any): any {
  if ((o4t()?.conditionalSkills.size ?? 0) === 0) return [];
  let n: any = [];
  for (let [r, o] of M6().conditionalSkills) {
    if (o.type !== "prompt" || !o.paths || o.paths.length === 0) continue;
    let s: any = fYa.default().add(o.paths);
    for (let i of e) {
      let a: any = Cf.isAbsolute(i) ? Cf.relative(t, i) : i;
      if (!a || a.startsWith("..") || Cf.isAbsolute(a)) continue;
      if (s.ignores(a)) {
        M6().dynamicSkills.set(yYa(o), o), M6().conditionalSkills.delete(r), M6().activatedConditionalSkillNames.add(r), n.push(r), logForDebugging(`[skills] Activated conditional skill '${r}' (matched path: ${a})`);
        break;
      }
    }
  }
  if (n.length > 0) logEvent("tengu_dynamic_skills_changed", {
    source: Qe("conditional_paths"),
    previousCount: M6().dynamicSkills.size - n.length,
    newCount: M6().dynamicSkills.size,
    addedCount: n.length,
    directoryCount: 0
  }), Hfo.emit();
  return n;
}
function SYa(): any {
  return Array.from(o4t()?.conditionalSkills.values() ?? []);
}
function bYa(): any {
  let e: any = o4t();
  if (!e) return;
  e.dynamicSkillDirs.clear(), e.dynamicSkills.clear(), e.conditionalSkills.clear(), e.activatedConditionalSkillNames.clear();
}
var vfo: any,
  fYa: any,
  Cf: any,
  Z3t: any,
  CBp = "cli",
  n4t = () => CBp,
  Y4n: any,
  Hfo: any;
var x6 = b(() => {
  ta();
  lt();
  UHt();
  ln();
  Ct();
  HF();
  SMt();
  T1t();
  Ql();
  Iy();
  Go();
  qe();
  Om();
  sn();
  bt();
  Ev();
  ws();
  TAr();
  Rn();
  D6();
  Mo();
  sh();
  _Yr();
  Pdt();
  mf();
  h7();
  RK();
  yr();
  J3();
  kg();
  bfo();
  tx();
  Efo();
  Cfo();
  vfo = require("fs/promises"), fYa = M(HFe(), 1), Cf = require("path");
  Z3t = wn(async (e: any) => {
    let t: any = Cf.join(tr(), "skills"),
      n: any = Cf.join(RR(), ".claude", "skills"),
      r: any = Qqe("skills", e);
    logForDebugging(`Loading skills from: managed=${n}, user=${t}, project=[${r.join(", ")}]`);
    let o: any = getAdditionalDirectoriesForClaudeMd(),
      s: any = iS("skills"),
      i: any = xh("projectSettings") && !s;
    if (hc("skills", {
      explicitlyRequested: o.length > 0 && i
    })) return logForDebugging("[reduced mode] Skipping skill dir discovery"), [];
    if (dp()) return (await Promise.all(o.map((T: any) => Odt(Cf.join(T, ".claude", "skills"), "projectSettings")))).flat().map((T: any) => T.skill);
    let [a, l, c, u, d]: any = await Promise.all([st(process.env.CLAUDE_CODE_DISABLE_POLICY_SKILLS) ? Promise.resolve([]) : Odt(n, "policySettings"), xh("userSettings") && !s ? Odt(t, "userSettings") : Promise.resolve([]), i ? Promise.all(r.map((y: any) => Odt(y, "projectSettings"))) : Promise.resolve([]), i ? Promise.all(o.map((y: any) => Odt(Cf.join(y, ".claude", "skills"), "projectSettings"))) : Promise.resolve([]), s ? Promise.resolve([]) : EBp(e, i ? o : [])]),
      p: any = [...a, ...l, ...c.flat(), ...u.flat(), ...d],
      m: any = await Promise.all(p.map(({
        skill: y,
        filePath: T
      }: any) => y.type === "prompt" ? ABp(T) : Promise.resolve(null))),
      f: any = new Map(),
      A: any = [];
    for (let y = 0; y < p.length; y++) {
      let T: any = p[y];
      if (T === void 0 || T.skill.type !== "prompt") continue;
      let {
          skill: S
        }: any = T,
        v: any = m[y];
      if (v === null || v === void 0) {
        A.push(S);
        continue;
      }
      let R: any = f.get(v);
      if (R !== void 0) {
        logForDebugging(`Skipping duplicate skill '${S.name}' from ${S.source} (same file already loaded from ${R})`);
        continue;
      }
      f.set(v, S.source), A.push(S);
    }
    Ywe("skill", A.map((y: any) => ({
      name: y.name,
      source: y.source
    })), {
      resolves: !1
    });
    let h: any = p.length - A.length;
    if (h > 0) logForDebugging(`Deduplicated ${h} skills (same file)`);
    let g: any = [],
      _: any = [];
    for (let y of A) if (y.type === "prompt" && y.paths && y.paths.length > 0 && !M6().activatedConditionalSkillNames.has(y.name)) _.push(y);else g.push(y);
    for (let y of _) M6().conditionalSkills.set(y.name, y);
    if (_.length > 0) logForDebugging(`[skills] ${_.length} conditional skills stored (activated when matching files are touched)`);
    return logForDebugging(`Loaded ${A.length} unique skills (${g.length} unconditional, ${_.length} conditional, managed: ${a.length}, user: ${l.length}, project: ${c.flat().length}, additional: ${u.flat().length}, legacy commands: ${d.length})`), g;
  }, (e: any) => `${n4t()}:${e}`);
  if (!(Z3t.cache instanceof Map)) Z3t.cache = new Map();
  Y4n = new Map();
  Hfo = ca();
  I9i({
    createSkillCommand: t4t,
    parseSkillFrontmatterFields: Rfo
  });
});
export {fBp,w6e,wfo,e4t,ABp,hBp,gBp,Rfo,_Bp,t4t,Odt,xfo,yBp,AYa,TBp,SBp,bBp,EBp,hYa,R6e,kfo,getDynamicSkillStateKey,M6,o4t,gYa,_Ya,eut,yYa,tut,TYa,nut,SYa,bYa,vfo,fYa,Cf,Z3t,CBp,n4t,Y4n,Hfo,x6};
