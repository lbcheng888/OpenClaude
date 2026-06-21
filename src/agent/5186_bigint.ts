// @ts-nocheck
import {parseToolListFromCLI as EN,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {findGitRoot as Ou,findCanonicalGitRoot as Uf,Ba} from "../../vendor/m693.ts";
import {getProjectRoot as yc,lt as ct,getAdditionalDirectoriesForClaudeMd as UI} from "../session/0131_sent.ts";
import {av as rv,mc} from "../config/0645_maxBytes.ts";
import {ds as ls,dn as ln,bt as St} from "../../vendor/m195.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {st as rt,fromEnum as Ue} from "../../vendor/m5.ts";
import {tae as Wie,pvn as HCn,oee as YZ} from "../config/2670_cause.ts";
import {RA as Hh,Ev as Hw} from "../../vendor/m2211.ts";
import {b} from "../../runtime.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {Ct,logEvent as j} from "../../vendor/m131.ts";
import {sn as an,tr as sr} from "../config/0047_namespace.ts";
import {mf as gf,xh as eg} from "../../vendor/m702.ts";
import {h7 as r7,RR as wR} from "../../vendor/m704.ts";
import {RK as pK,iS as VS} from "../../vendor/m2231.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
// @ts-nocheck
function n9K(e, t = "Custom item") {
  let n = e.split(`
`);
  for (let r of n) {
    let o = r.trim();
    if (o) {
      let i = o.match(/^#+\s+(.+)$/)?.[1] ?? o;
      return i.length > 100 ? i.substring(0, 97) + "..." : i;
    }
  }
  return t;
}
function Q5T(H) {
  if (H === undefined || H === null) return null;
  if (!H) return [];
  let t = [];
  if (typeof H === "string") t = [H];else if (Array.isArray(H)) t = H.filter(r => typeof r === "string");
  if (t.length === 0) return [];
  let n = EN(t);
  if (n.includes("*")) return ["*"];
  return n;
}
function c5T(H) {
  let t = Q5T(H);
  if (t === null) return H === undefined ? undefined : [];
  if (t.includes("*")) return;
  return t;
}
function VY(e) {
  let t = Q5T(e);
  if (t === null) return [];
  return t;
}
async function $_m(e) {
  try {
    let t = await fL4.lstat(e, {
      bigint: true
    });
    if (t.dev === 0n && t.ino === 0n) return null;
    return `${t.dev}:${t.ino}`;
  } catch {
    return null;
  }
}
function h06(H) {
  let t = Ou(H),
    n = Ou(yc());
  if (!t || !n) return t;
  let r = Uf(H);
  if (r && rv(r) === rv(n)) return t;
  let o = rv(t),
    s = rv(n);
  if (o !== s && o.startsWith(s + AL4.sep)) return n;
  return t;
}
function opt(e, t) {
  let n = r => r === undefined ? 1 / 0 : r.match(/[/\\]/g)?.length ?? 0;
  return n(e.baseDir) - n(t.baseDir);
}
function ve7(e, t) {
  let n = AL4.resolve(Yd6.homedir()).normalize("NFC"),
    r = h06(t),
    o = AL4.resolve(t),
    s = [];
  while (true) {
    if (rv(o) === rv(n)) break;
    let i = AL4.join(o, ".claude", e);
    try {
      Ad6.statSync(i), s.push(i);
    } catch (l) {
      if (ls(l)) ;else if (ln(l) === "ENFILE") v(`getProjectDirsUpToHome: stat ${i} hit ENFILE (system fd-table full); skipping`, {
        level: "error"
      });else throw l;
    }
    if (r && rv(o) === rv(r)) break;
    let a = AL4.dirname(o);
    if (a === o) break;
    o = a;
  }
  return s;
}
async function wL4(H, t) {
  let n = [],
    r = new Set();
  async function o(s) {
    if (t.aborted) return;
    try {
      let i = await fL4.stat(s, {
        bigint: true
      });
      if (i.isDirectory()) {
        let a = i.dev !== undefined && i.ino !== undefined ? `${i.dev}:${i.ino}` : await fL4.realpath(s);
        if (r.has(a)) {
          v(`Skipping already visited directory (circular symlink): ${s}`);
          return;
        }
        r.add(a);
      }
    } catch (i) {
      let a = i instanceof Error ? i.message : String(i);
      v(`Failed to stat directory ${s}: ${a}`);
      return;
    }
    try {
      let i = await fL4.readdir(s, {
        withFileTypes: true
      });
      for (let a of i) {
        if (t.aborted) break;
        let l = AL4.join(s, a.name);
        try {
          if (a.isSymbolicLink()) try {
            let c = await fL4.stat(l);
            if (c.isDirectory()) await o(l);else if (c.isFile() && a.name.endsWith(".md")) n.push(l);
          } catch (c) {
            let u = c instanceof Error ? c.message : String(c);
            v(`Failed to follow symlink ${l}: ${u}`);
          } else if (a.isDirectory()) await o(l);else if (a.isFile() && a.name.endsWith(".md")) n.push(l);
        } catch (c) {
          let u = c instanceof Error ? c.message : String(c);
          v(`Failed to access ${l}: ${u}`);
        }
      }
    } catch (i) {
      let a = i instanceof Error ? i.message : String(i);
      v(`Failed to read directory ${s}: ${a}`);
    }
  }
  return await o(H), n;
}
async function R06(stderr) {
  let taskOutput = rt("true"),
    n = AbortSignal.timeout(3000),
    r = null,
    o;
  try {
    o = taskOutput ? await wL4(stderr, n) : await Wie(["--files", "--hidden", "--follow", "--no-ignore", "--glob", "*.md"], stderr, n);
  } catch (i) {
    if (ls(i)) return [];
    if (i instanceof HCn) return v(`loadMarkdownFilesFromDir: ripgrep timed out scanning ${stderr}`), [];
    throw i;
  }
  return (await Promise.all(o.map(async i => {
    try {
      let a = await fL4.readFile(i, {
          encoding: "utf-8"
        }),
        {
          frontmatter: l,
          content: c
        } = Hh(a, i, {
          normalizeKeys: true
        });
      return {
        filePath: i,
        frontmatter: l,
        content: c
      };
    } catch (a) {
      let l = a instanceof Error ? a.message : String(a);
      return v(`Failed to read/parse markdown file:  ${i}: ${l}`), null;
    }
  }))).filter(i => i !== null);
}
var Ad6, fL4, Yd6, AL4, U5T, F5T;
var p2q = b(() => {
  na();
  Ct();
  ct();
  je();
  an();
  St();
  mc();
  Hw();
  Ba();
  ly();
  YZ();
  gf();
  r7();
  pK();
  Ad6 = require("fs"), fL4 = require("fs/promises"), Yd6 = require("os"), AL4 = require("path"), U5T = ["commands", "agents", "output-styles", "skills", "workflows", "routines"];
  F5T = bn(async function (e, t) {
    let n = Date.now(),
      r = AL4.join(sr(), e),
      o = AL4.join(wR(), ".claude", e),
      s = ve7(e, t),
      i = new Set(await Promise.all(s.map(async S => rv(await fL4.realpath(S).catch(() => S))))),
      a = e === "agents" ? ps(await Promise.all(UI().map(async S => {
        let C = AL4.join(AL4.resolve(S), ".claude", e);
        return await fL4.realpath(C).catch(() => C);
      }))).filter(S => !i.has(rv(S))) : [],
      l = Ou(t),
      c = Uf(t);
    if (l && c && c !== l) {
      let S = rv(AL4.join(l, ".claude", e));
      if (!s.some(R => rv(R) === S)) {
        let R = AL4.join(c, ".claude", e);
        if (!s.includes(R)) s.push(R);
      }
    }
    let [u, d, p, m] = await Promise.all([R06(o).then(S => S.map(C => ({
        ...C,
        baseDir: o,
        source: "policySettings"
      }))), eg("userSettings") && !(e === "agents" && VS("agents")) ? R06(r).then(S => S.map(C => ({
        ...C,
        baseDir: r,
        source: "userSettings"
      }))) : Promise.resolve([]), eg("projectSettings") && !(e === "agents" && VS("agents")) ? Promise.all(s.map(S => R06(S).then(C => C.map(R => ({
        ...R,
        baseDir: S,
        source: "projectSettings"
      }))))) : Promise.resolve([]), eg("projectSettings") && !(e === "agents" && VS("agents")) ? Promise.all(a.map(S => R06(S).then(C => C.map(R => ({
        ...R,
        baseDir: S,
        source: "projectSettings",
        fromAdditionalDirectory: true
      }))))) : Promise.resolve([])]),
      f = p.flat(),
      A = m.flat(),
      h = [...u, ...d, ...A, ...f],
      g = await Promise.all(h.map(S => $_m(S.filePath))),
      _ = new Map(),
      y = [];
    for (let [S, C] of h.entries()) {
      let R = g[S] ?? null;
      if (R === null) {
        y.push(C);
        continue;
      }
      let k = _.get(R);
      if (k !== undefined) {
        v(`Skipping duplicate file '${C.filePath}' from ${C.source} (same inode already loaded from ${k})`);
        continue;
      }
      _.set(R, C.source), y.push(C);
    }
    let T = h.length - y.length;
    if (T > 0) v(`Deduplicated ${T} files in ${e} (same inode via symlinks or hard links)`);
    return j("tengu_dir_search", {
      durationMs: Date.now() - n,
      managedFilesFound: u.length,
      userFilesFound: d.length,
      projectFilesFound: f.length,
      projectDirsSearched: s.length,
      subdir: Ue(e)
    }), y;
  }, (e, t) => `${e}:${t}`);
});

export {n9K as Gce,Q5T as IBl,c5T as Y0e,VY as iJ,$_m as SSm,h06 as bSm,opt as xpt,ve7 as Qqe,wL4 as ESm,R06 as Ldt,Ad6 as kBl,fL4 as GG,Yd6 as HBl,AL4 as GU,U5T as Wol,F5T as N6,p2q as D6};
