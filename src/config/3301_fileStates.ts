// @ts-nocheck
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {findGitRoot as Ou,findCanonicalGitRoot as Uf,gitExe as bo,Ba} from "../../vendor/m693.ts";
import {getOriginalCwd as gr,getSessionId as kt,lt as ct} from "../session/0131_sent.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {uJr as cia,dJr as uia} from "../../vendor/m3299.ts";
import {execFileNoThrowWithCwd as Vr,oa} from "../../vendor/m684.ts";
import {b} from "../../runtime.ts";
import {vO as hO,getRemoteUrlForDir as ybt} from "../../vendor/m691.ts";
import {Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {g7e as ZVe} from "../../vendor/m615.ts";
// @ts-nocheck
function h6d(e) {
  if (!/^https?:\/\//.test(e) && !/^ssh:\/\//.test(e) && !/^git@/.test(e)) return false;
  let t = e.replace(/^https?:\/\//, "").replace(/^ssh:\/\//, "").replace(/^[^@/]+@/, "").replace(/\/$/, "");
  if (t.split("/").includes("..")) return false;
  return A6d.some(n => {
    if (!t.startsWith(n)) return false;
    let r = t.slice(n.length);
    return r === "" || r === ".git" || r.startsWith("/");
  });
}
function cke() {
  let e = Pt();
  return Ou(e) ?? gr();
}
function g6d(e) {
  return Uf(e) ?? e;
}
function fia(e) {
  if (e.includes("fable-5")) return "claude-fable-5";
  if (e.includes("mythos-5")) return "claude-mythos-5";
  if (e.includes("opus-4-8")) return "claude-opus-4-8";
  if (e.includes("opus-4-7")) return "claude-opus-4-7";
  if (e.includes("opus-4-6")) return "claude-opus-4-6";
  if (e.includes("opus-4-5")) return "claude-opus-4-5";
  if (e.includes("opus-4-1")) return "claude-opus-4-1";
  if (e.includes("opus-4")) return "claude-opus-4";
  if (e.includes("sonnet-4-6")) return "claude-sonnet-4-6";
  if (e.includes("sonnet-4-5")) return "claude-sonnet-4-5";
  if (e.includes("sonnet-4")) return "claude-sonnet-4";
  if (e.includes("sonnet-3-7")) return "claude-sonnet-3-7";
  if (e.includes("haiku-4-5")) return "claude-haiku-4-5";
  if (e.includes("haiku-3-5")) return "claude-haiku-3-5";
  return "claude";
}
function Aia() {
  return process.env.CLAUDE_CODE_ENTRYPOINT ?? "cli";
}
function _6d(e) {
  return pia.createHash("sha256").update(e).digest("hex");
}
function FIn(e) {
  let t = jt(),
    n = cke();
  if (!jHK.isAbsolute(e)) return e;
  let r = e,
    o = n;
  try {
    r = t.realpathSync(e);
  } catch {}
  try {
    o = t.realpathSync(n);
  } catch {}
  if (r.startsWith(o + jHK.sep) || r === o) return jHK.relative(o, r).replaceAll(jHK.sep, "/");
  if (e.startsWith(n + jHK.sep) || e === n) return jHK.relative(n, e).replaceAll(jHK.sep, "/");
  return e;
}
function isInternalRepoUrl() {
  return {
    fileStates: new Map(),
    surface: Aia(),
    startingHeadSha: null,
    promptCount: 0,
    promptCountAtLastCommit: 0,
    permissionPromptCount: 0,
    permissionPromptCountAtLastCommit: 0,
    escapeCount: 0,
    escapeCountAtLastCommit: 0
  };
}
function hia(e, t, n, r, o) {
  let s = FIn(t);
  try {
    let i;
    if (n === "" || r === "") i = n === "" ? r.length : n.length;else {
      let c = Math.min(n.length, r.length),
        u = 0;
      while (u < c && n[u] === r[u]) u++;
      let d = 0;
      while (d < c - u && n[n.length - 1 - d] === r[r.length - 1 - d]) d++;
      let p = n.length - u - d,
        m = r.length - u - d;
      i = Math.max(p, m);
    }
    let l = e.get(s)?.claudeContribution ?? 0;
    return {
      contentHash: _6d(r),
      claudeContribution: l + i,
      mtime: o
    };
  } catch (i) {
    return Ie(i), null;
  }
}
function getProjectRoot(e, t, n, r, o, s = Date.now()) {
  let i = FIn(t),
    a = hia(e.fileStates, t, n, r, s);
  if (!a) return e;
  let l = new Map(e.fileStates);
  return l.set(i, a), v(`Attribution: Tracked ${a.claudeContribution} chars for ${i}`), {
    ...e,
    fileStates: l
  };
}
function hb3(filePath, t) {
  let n = new Map(filePath.fileStates);
  for (let r of t) {
    let o = r.mtime ?? Date.now();
    if (r.type === "deleted") {
      let s = FIn(r.path),
        a = n.get(s)?.claudeContribution ?? 0,
        l = r.oldContent.length;
      n.set(s, {
        contentHash: "",
        claudeContribution: a + l,
        mtime: o
      }), v(`Attribution: Tracked deletion of ${s} (${l} chars removed, total contribution: ${a + l})`);
    } else {
      let s = hia(n, r.path, r.oldContent, r.newContent, o);
      if (s) {
        let i = FIn(r.path);
        n.set(i, s), v(`Attribution: Tracked ${s.claudeContribution} chars for ${i}`);
      }
    }
  }
  return {
    ...filePath,
    fileStates: n
  };
}
function toProjectRelativePath(filePath, t) {
  switch (t.kind) {
    case "trackEdit":
      return getProjectRoot({
        ...filePath,
        surface: t.surface
      }, t.filePath, t.oldContent, t.newContent, t.userModified, t.mtime);
    case "trackBulk":
      return hb3({
        ...filePath,
        surface: t.surface
      }, t.changes);
    case "commitBoundary":
      return {
        ...filePath,
        promptCountAtLastCommit: t.promptCountAtLastCommit,
        permissionPromptCountAtLastCommit: t.permissionPromptCountAtLastCommit,
        escapeCountAtLastCommit: t.escapeCountAtLastCommit
      };
    case "incrementPermissionPrompt":
      return {
        ...filePath,
        permissionPromptCount: filePath.permissionPromptCount + 1
      };
  }
}
async function fYr(e, t) {
  let n = cke(),
    r = kt(),
    o = {},
    s = [],
    i = new Set(),
    a = {},
    l = 0,
    c = 0,
    u = new Map();
  for (let A of e) {
    i.add(A.surface);
    let h = A.fileStates instanceof Map ? A.fileStates : new Map(Object.entries(A.fileStates ?? {}));
    for (let [g, _] of h) {
      let y = u.get(g);
      if (y) u.set(g, {
        ..._,
        claudeContribution: y.claudeContribution + _.claudeContribution
      });else u.set(g, _);
    }
  }
  let d = await Promise.all(t.map(async A => {
    if (cia(A)) return {
      type: "generated",
      file: A
    };
    let h = jHK.join(n, A),
      g = u.get(A),
      _ = e[0].surface,
      y = 0,
      T = 0;
    if (await S6d(A)) {
      if (g) y = g.claudeContribution, T = 0;else {
        let k = await sha256Hex(A);
        T = k > 0 ? k : 100;
      }
    } else try {
      let k = await mia.stat(h);
      if (g) y = g.claudeContribution, T = 0;else {
        let x = await sha256Hex(A);
        T = x > 0 ? x : k.size;
      }
    } catch {
      return null;
    }
    y = Math.max(0, y), T = Math.max(0, T);
    let C = y + T,
      R = C > 0 ? Math.round(y / C * 100) : 0;
    return {
      type: "file",
      file: A,
      claudeChars: y,
      humanChars: T,
      percent: R,
      surface: _
    };
  }));
  for (let A of d) {
    if (!A) continue;
    if (A.type === "generated") {
      s.push(A.file);
      continue;
    }
    o[A.file] = {
      claudeChars: A.claudeChars,
      humanChars: A.humanChars,
      percent: A.percent,
      surface: A.surface
    }, l += A.claudeChars, c += A.humanChars, a[A.surface] = (a[A.surface] ?? 0) + A.claudeChars;
  }
  let p = l + c,
    m = p > 0 ? Math.round(l / p * 100) : 0,
    f = {};
  for (let [A, h] of Object.entries(a)) {
    let g = p > 0 ? Math.round(h / p * 100) : 0;
    f[A] = {
      claudeChars: h,
      percent: g
    };
  }
  return {
    version: 1,
    summary: {
      claudePercent: m,
      claudeChars: l,
      humanChars: c,
      surfaces: Array.from(i)
    },
    files: o,
    surfaceBreakdown: f,
    excludedGenerated: s,
    sessions: [r]
  };
}
async function sha256Hex(content) {
  let t = cke();
  try {
    let n = await Vr(bo(), ["diff", "--cached", "--stat", "--", content], {
      cwd: t,
      timeout: 5000
    });
    if (n.code !== 0 || !n.stdout) return 0;
    let r = n.stdout.split(`
`).filter(Boolean),
      o = 0;
    for (let s of r) if (s.includes("file changed") || s.includes("files changed")) {
      let i = s.match(/(\d+) insertions?/),
        a = s.match(/(\d+) deletions?/),
        l = i ? parseInt(i[1], 10) : 0,
        c = a ? parseInt(a[1], 10) : 0;
      o += (l + c) * 40;
    }
    return o;
  } catch {
    return 0;
  }
}
async function S6d(e) {
  let t = cke();
  try {
    let n = await Vr(bo(), ["diff", "--cached", "--name-status", "--", e], {
      cwd: t,
      timeout: 5000
    });
    if (n.code === 0 && n.stdout) return n.stdout.trim().startsWith("D\t");
  } catch {}
  return false;
}
var pia, mia, jHK, A6d, mYr, JHK;
var aW = b(() => {
  ct();
  Ko();
  je();
  oa();
  bs();
  uia();
  hO();
  Ba();
  wn();
  Fo();
  pia = require("crypto"), mia = require("fs/promises"), jHK = require("path"), A6d = [];
  mYr = new Map();
  JHK = ZVe(async e => {
    let t = g6d(e),
      n = mYr.get(t);
    if (n !== undefined) return n === "internal";
    let r = await ybt(e);
    if (!r) return mYr.set(t, "none"), false;
    let o = h6d(r);
    return mYr.set(t, o ? "internal" : "external"), o;
  });
});

export {h6d as F8d,cke as wke,g6d as U8d,fia as Raa,Aia as xaa,_6d as $8d,FIn as C0n,isInternalRepoUrl as Jot,hia as kaa,getProjectRoot as q8d,hb3 as j8d,toProjectRelativePath as w0n,fYr as mJr,sha256Hex as Caa,S6d as W8d,pia as vaa,mia as waa,jHK as rY,A6d as B8d,mYr as pJr,JHK as v0n,aW as vW};
