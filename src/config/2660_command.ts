// @ts-nocheck
import {ZCn as gCn,$Dt as TDt,wqr as P4r,B$ as R$,QCn as hCn,att as jet,p2e as jUe} from "./2658_recursive.ts";
import {hLi as uOi,gLi as dOi} from "../../vendor/m2656.ts";
import {Jo as Qo} from "../../vendor/m2601.ts";
import {LAe as hAe,UDt as yDt} from "../../vendor/m2651.ts";
import {kqr as M4r,ELi as gOi} from "../../vendor/m2658.ts";
import {b,M as L} from "../../runtime.ts";
import {Cqr as I4r} from "../../vendor/m2655.ts";
// @ts-nocheck
function H_d(e, t) {
  let n = e.split(ZP.default.sep),
    r = "";
  for (let o of n) {
    if (!o) continue;
    let s = r + ZP.default.sep + o;
    try {
      if (mA.lstatSync(s).isSymbolicLink()) {
        if (t.some(l => s.startsWith(l + "/") || s === l)) return s;
      }
    } catch {
      break;
    }
    r = s;
  }
  return null;
}
function I_d(e) {
  let t = e.split(ZP.default.sep),
    n = "";
  for (let r of t) {
    if (!r) continue;
    let o = n + ZP.default.sep + r;
    try {
      let s = mA.statSync(o);
      if (s.isFile() || s.isSymbolicLink()) return true;
    } catch {
      break;
    }
    n = o;
  }
  return false;
}
function D_d(e) {
  let t = e.split(ZP.default.sep),
    n = "";
  for (let r of t) {
    if (!r) continue;
    let o = n + ZP.default.sep + r;
    if (!mA.existsSync(o)) return o;
    n = o;
  }
  return e;
}
async function P_d(e = {
  command: "rg"
}, t = B4r, n = false, r) {
  let o = process.cwd(),
    s = new AbortController(),
    i = r ?? s.signal,
    a = gCn(),
    l = [...TDt.map(m => ZP.default.resolve(o, m)), ...a.map(m => ZP.default.resolve(o, m))],
    c = ZP.default.resolve(o, ".git"),
    u = false;
  try {
    u = mA.statSync(c).isDirectory();
  } catch {}
  if (u) {
    if (l.push(ZP.default.resolve(o, ".git/hooks")), !n) l.push(ZP.default.resolve(o, ".git/config"));
  }
  let d = [];
  for (let m of TDt) d.push("--iglob", m);
  for (let m of a) d.push("--iglob", `**/${m}/**`);
  if (d.push("--iglob", "**/.git/hooks/**"), !n) d.push("--iglob", "**/.git/config");
  let p = [];
  try {
    p = await uOi(["--files", "--hidden", "--max-depth", String(t), ...d, "-g", "!**/node_modules/**"], o, i, e);
  } catch (m) {
    Qo(`[Sandbox] ripgrep scan failed: ${m}`);
  }
  for (let m of p) {
    let f = ZP.default.resolve(o, m),
      A = false;
    for (let h of [...a, ".git"]) {
      let g = P4r(h),
        _ = f.split(ZP.default.sep),
        y = _.findIndex(T => P4r(T) === g);
      if (y !== -1) {
        if (h === ".git") {
          let T = _.slice(0, y + 1).join(ZP.default.sep);
          if (m.includes(".git/hooks")) l.push(ZP.default.join(T, "hooks"));else if (m.includes(".git/config")) l.push(ZP.default.join(T, "config"));
        } else l.push(_.slice(0, y + 1).join(ZP.default.sep));
        A = true;
        break;
      }
    }
    if (!A) l.push(f);
  }
  return [...new Set(l)];
}
function yOi() {
  if (_Oi) return;
  process.on("exit", () => {
    bCn({
      force: true
    });
  }), _Oi = true;
}
function bCn(e) {
  if (!e?.force) {
    if (Ywe > 0) Ywe--;
    if (Ywe > 0) {
      Qo(`[Sandbox Linux] Deferring mount point cleanup \u2014 ${Ywe} sandbox(es) still active`);
      return;
    }
  } else Ywe = 0;
  for (let t of IJ6) try {
    let n = mA.statSync(t);
    if (n.isFile() && n.size === 0) mA.unlinkSync(t), Qo(`[Sandbox Linux] Cleaned up bwrap mount point (file): ${t}`);else if (n.isDirectory()) {
      if (mA.readdirSync(t).length === 0) mA.rmdirSync(t), Qo(`[Sandbox Linux] Cleaned up bwrap mount point (dir): ${t}`);
    }
  } catch {}
  IJ6.clear();
}
function TOi(e) {
  try {
    return mA.accessSync(e, mA.constants.X_OK), true;
  } catch {
    return false;
  }
}
function bOi(e) {
  let {
      seccompConfig: t,
      bwrapPath: n,
      socatPath: r
    } = e ?? {},
    o = [],
    s = [];
  if (n) {
    if (!TOi(n)) o.push(`bubblewrap (bwrap) not executable at ${n}`);
  } else if (hAe("bwrap") === null) o.push("bubblewrap (bwrap) not installed");
  if (r) {
    if (!TOi(r)) o.push(`socat not executable at ${r}`);
  } else if (hAe("socat") === null) o.push("socat not installed");
  if (!t?.argv0 && M4r(t?.applyPath) === null) s.push("seccomp not available - unix socket access not restricted");
  return {
    warnings: s,
    errors: o
  };
}
async function EOi(e, t, n) {
  let r = n ?? "socat",
    o = JG7.randomBytes(8).toString("hex"),
    s = ZP.join(bJ6.tmpdir(), `claude-http-${o}.sock`),
    i = ZP.join(bJ6.tmpdir(), `claude-socks-${o}.sock`),
    a = [`UNIX-LISTEN:${s},fork,reuseaddr`, `TCP:localhost:${e},keepalive,keepidle=10,keepintvl=5,keepcnt=3`];
  Qo(`Starting HTTP bridge: ${r} ${a.join(" ")}`);
  let l = Tx8.spawn(r, a, {
    stdio: "ignore"
  });
  if (l.on("error", p => {
    Qo(`HTTP bridge process error: ${p}`, {
      level: "error"
    });
  }), l.on("exit", (p, m) => {
    Qo(`HTTP bridge process exited with code ${p}, signal ${m}`, {
      level: p === 0 ? "info" : "error"
    });
  }), !l.pid) throw Error("Failed to start HTTP bridge process");
  let c = [`UNIX-LISTEN:${i},fork,reuseaddr`, `TCP:localhost:${t},keepalive,keepidle=10,keepintvl=5,keepcnt=3`];
  Qo(`Starting SOCKS bridge: ${r} ${c.join(" ")}`);
  let u = Tx8.spawn(r, c, {
    stdio: "ignore"
  });
  if (u.on("error", p => {
    Qo(`SOCKS bridge process error: ${p}`, {
      level: "error"
    });
  }), u.on("exit", (p, m) => {
    Qo(`SOCKS bridge process exited with code ${p}, signal ${m}`, {
      level: p === 0 ? "info" : "error"
    });
  }), !u.pid) {
    if (l.pid) try {
      process.kill(l.pid, "SIGTERM");
    } catch {}
    throw Error("Failed to start SOCKS bridge process");
  }
  let d = 5;
  for (let p = 0; p < d; p++) {
    if (!l.pid || l.killed || !u.pid || u.killed) throw Error("Linux bridge process died unexpectedly");
    try {
      if (mA.existsSync(s) && mA.existsSync(i)) {
        Qo(`Linux bridges ready after ${p + 1} attempts`);
        break;
      }
    } catch (m) {
      Qo(`Error checking sockets (attempt ${p + 1}): ${m}`, {
        level: "error"
      });
    }
    if (p === d - 1) {
      if (l.pid) try {
        process.kill(l.pid, "SIGTERM");
      } catch {}
      if (u.pid) try {
        process.kill(u.pid, "SIGTERM");
      } catch {}
      throw Error(`Failed to create bridge sockets after ${d} attempts`);
    }
    await new Promise(m => setTimeout(m, p * 100));
  }
  return {
    httpSocketPath: s,
    socksSocketPath: i,
    httpBridgeProcess: l,
    socksBridgeProcess: u,
    httpProxyPort: e,
    socksProxyPort: t
  };
}
function O_d(e, t) {
  if (t) {
    if (!e) throw Error("seccompConfig.argv0 requires seccompConfig.applyPath");
    return `ARGV0=${Ye.default.quote([t])} ${Ye.default.quote([e])} `;
  }
  let n = M4r(e);
  return n ? `${Ye.default.quote([n])} ` : undefined;
}
function findSymlinkInPath(filePath, allowedWritePaths, n, r, o, s) {
  let i = o || "bash",
    a = Ye.default.quote([s ?? "socat"]),
    l = [`${a} TCP-LISTEN:3128,fork,reuseaddr UNIX-CONNECT:${filePath} >/dev/null 2>&1 &`, `${a} TCP-LISTEN:1080,fork,reuseaddr UNIX-CONNECT:${allowedWritePaths} >/dev/null 2>&1 &`, 'trap "kill %1 %2 2>/dev/null; exit" EXIT'];
  if (r) {
    let c = r + Ye.default.quote([i, "-c", n]),
      u = [...l, c].join(`
`);
    return `${i} -c ${Ye.default.quote([u])}`;
  } else {
    let c = [...l, `eval ${Ye.default.quote([n])}`].join(`
`);
    return `${i} -c ${Ye.default.quote([c])}`;
  }
}
async function hasFileAncestor(filePath, t, n = {
  command: "rg"
}, r = B4r, o = false, s) {
  let i = [],
    a = [],
    l = [];
  if (t) {
    i.push("--ro-bind", "/", "/");
    for (let h of t.allowOnly || []) {
      let g = R$(h);
      if (Qo(`[Sandbox Linux] Processing write path: ${h} -> ${g}`), g.startsWith("/dev/")) {
        Qo(`[Sandbox Linux] Skipping /dev path: ${g}`);
        continue;
      }
      if (!mA.existsSync(g)) {
        Qo(`[Sandbox Linux] Skipping non-existent write path: ${g}`);
        continue;
      }
      try {
        let _ = mA.realpathSync(g),
          y = g.replace(/\/+$/, "");
        if (_ !== y && hCn(g, _)) {
          Qo(`[Sandbox Linux] Skipping symlink write path pointing outside expected location: ${h} -> ${_}`);
          continue;
        }
      } catch {
        Qo(`[Sandbox Linux] Skipping write path that could not be resolved: ${g}`);
        continue;
      }
      i.push("--bind", g, g), a.push(g);
    }
    let f = [...(t.denyWithinAllow || []), ...(await P_d(n, r, o, s))],
      A = new Set();
    for (let h of f) {
      let g = R$(h);
      if (A.has(g)) continue;
      if (A.add(g), g.startsWith("/dev/")) continue;
      let _ = H_d(g, a);
      if (_) {
        l.push("--ro-bind", "/dev/null", _), Qo(`[Sandbox Linux] Mounted /dev/null at symlink ${_} to prevent symlink replacement attack`);
        continue;
      }
      if (!mA.existsSync(g)) {
        if (I_d(g)) {
          Qo(`[Sandbox Linux] Skipping deny path with file ancestor (cannot create paths under a file): ${g}`);
          continue;
        }
        let T = ZP.default.dirname(g);
        while (T !== "/" && !mA.existsSync(T)) T = ZP.default.dirname(T);
        if (a.some(C => T.startsWith(C + "/") || T === C || g.startsWith(C + "/"))) {
          let C = D_d(g);
          if (C !== g) {
            let R = mA.mkdtempSync(ZP.default.join(bJ6.tmpdir(), "claude-empty-"));
            l.push("--ro-bind", R, C), IJ6.add(C), yOi(), Qo(`[Sandbox Linux] Mounted empty dir at ${C} to block creation of ${g}`);
          } else l.push("--ro-bind", "/dev/null", C), IJ6.add(C), yOi(), Qo(`[Sandbox Linux] Mounted /dev/null at ${C} to block creation of ${g}`);
        } else Qo(`[Sandbox Linux] Skipping non-existent deny path not within allowed paths: ${g}`);
        continue;
      }
      if (a.some(T => g.startsWith(T + "/") || g === T)) l.push("--ro-bind", g, g);else Qo(`[Sandbox Linux] Skipping deny path not within allowed paths: ${g}`);
    }
  } else i.push("--bind", "/", "/");
  let c = [],
    u = (filePath?.allowWithinDeny || []).map(f => R$(f)),
    d = new Set(),
    p = new Set(["proc", "dev", "sys"]);
  for (let f of filePath?.denyOnly || []) if (R$(f) === "/") {
    for (let A of mA.readdirSync("/")) if (!p.has(A)) c.push("/" + A);
  } else c.push(f);
  if (mA.existsSync("/etc/ssh/ssh_config.d")) c.push("/etc/ssh/ssh_config.d");
  let m = c.map(f => R$(f)).sort((f, A) => f.split("/").length - A.split("/").length);
  for (let f of m) {
    if (!mA.existsSync(f)) {
      Qo(`[Sandbox Linux] Skipping non-existent read deny path: ${f}`);
      continue;
    }
    let A = f === "/" ? "/" : f + "/";
    if (mA.statSync(f).isDirectory()) {
      i.push("--tmpfs", f);
      for (let g of a) if (g.startsWith(A) || g === f) i.push("--bind", g, g), Qo(`[Sandbox Linux] Re-bound write path wiped by denyRead tmpfs: ${g}`);
      for (let g of u) if (g.startsWith(A) || g === f) {
        if (!mA.existsSync(g)) {
          Qo(`[Sandbox Linux] Skipping non-existent read allow path: ${g}`);
          continue;
        }
        if (a.some(_ => (_.startsWith(A) || _ === f) && (g === _ || g.startsWith(_ + "/")))) continue;
        i.push("--ro-bind", g, g), Qo(`[Sandbox Linux] Re-allowed read access within denied region: ${g}`);
      }
    } else {
      if (u.includes(f)) {
        Qo(`[Sandbox Linux] Skipping read deny for re-allowed path: ${f}`);
        continue;
      }
      i.push("--ro-bind", "/dev/null", f), d.add(f);
    }
  }
  for (let f = 0; f < l.length; f += 3) {
    let A = l[f + 2];
    if (d.has(A)) continue;
    i.push(l[f], l[f + 1], A);
  }
  return i;
}
async function findFirstMissingPathComponent(filePath) {
  let {
      command: t,
      needsNetworkRestriction: n,
      httpSocketPath: r,
      socksSocketPath: o,
      httpProxyPort: s,
      socksProxyPort: i,
      caCertPath: a,
      readConfig: l,
      writeConfig: c,
      enableWeakerNestedSandbox: u,
      allowAllUnixSockets: d,
      binShell: p,
      ripgrepConfig: m = {
        command: "rg"
      },
      mandatoryDenySearchDepth: f = B4r,
      allowGitConfig: A = false,
      seccompConfig: h,
      bwrapPath: g,
      socatPath: _,
      abortSignal: y
    } = filePath,
    accumulated = l && l.denyOnly.length > 0,
    S = c !== undefined;
  if (!n && !accumulated && !S) return t;
  Ywe++;
  let C = ["--new-session", "--die-with-parent"],
    R;
  try {
    if (!d) {
      if (R = O_d(h?.applyPath, h?.argv0), !R) Qo("[Sandbox Linux] apply-seccomp binary not available - unix socket blocking disabled. Install @anthropic-ai/sandbox-runtime globally for full protection.", {
        level: "warn"
      });else Qo("[Sandbox Linux] Applying seccomp filter for Unix socket blocking");
    } else Qo("[Sandbox Linux] Skipping seccomp filter - allowAllUnixSockets is enabled");
    if (n) {
      if (C.push("--unshare-net"), r && o) {
        if (!mA.existsSync(r)) throw Error(`Linux HTTP bridge socket does not exist: ${r}. The bridge process may have died. Try reinitializing the sandbox.`);
        if (!mA.existsSync(o)) throw Error(`Linux SOCKS bridge socket does not exist: ${o}. The bridge process may have died. Try reinitializing the sandbox.`);
        C.push("--bind", r, r), C.push("--bind", o, o);
        let O = jet(3128, 1080, a);
        if (C.push(...O.flatMap(D => {
          let M = D.indexOf("="),
            U = D.slice(0, M),
            $ = D.slice(M + 1);
          return ["--setenv", U, $];
        })), s !== undefined) C.push("--setenv", "CLAUDE_CODE_HOST_HTTP_PROXY_PORT", String(s));
        if (i !== undefined) C.push("--setenv", "CLAUDE_CODE_HOST_SOCKS_PROXY_PORT", String(i));
      }
    }
    let k = await hasFileAncestor(l, c, m, f, A, y);
    if (C.push(...k), C.push("--dev", "/dev"), C.push("--unshare-pid"), !u) C.push("--proc", "/proc");else C.push("--unshare-user", "--bind", "/proc", "/proc");
    let x = p || "bash",
      I = hAe(x);
    if (!I) throw Error(`Shell '${x}' not found in PATH`);
    if (C.push("--", I, "-c"), n && r && o) {
      let O = findSymlinkInPath(r, o, t, R, I, _);
      C.push(O);
    } else if (R) {
      let O = R + Ye.default.quote([I, "-c", t]);
      C.push(O);
    } else C.push(t);
    let H = Ye.default.quote([g ?? "bwrap", ...C]),
      P = [];
    if (n) P.push("network");
    if (accumulated || S) P.push("filesystem");
    if (R) P.push("seccomp(unix-block)");
    return Qo(`[Sandbox Linux] Wrapped command with bwrap (${P.join(", ")} restrictions)`), H;
  } catch (k) {
    if (Ywe > 0) Ywe--;
    throw k;
  }
}
var Ye,
  JG7,
  mA,
  Tx8,
  bJ6,
  ZP,
  B4r = 3,
  IJ6,
  Ywe = 0,
  _Oi = false;
var PG7 = b(() => {
  yDt();
  dOi();
  jUe();
  gOi();
  Ye = L(I4r(), 1), JG7 = require("crypto"), mA = L(require("fs")), Tx8 = require("child_process"), bJ6 = require("os"), ZP = L(require("path"));
  IJ6 = new Set();
});

export {H_d as ZTd,I_d as eSd,D_d as tSd,P_d as nSd,yOi as vLi,bCn as ovn,TOi as wLi,bOi as xLi,EOi as kLi,O_d as rSd,findSymlinkInPath as oSd,hasFileAncestor as sSd,findFirstMissingPathComponent as HLi,Ye as nee,JG7 as RLi,mA as Vg,Tx8 as Hqr,bJ6 as nvn,ZP as Ww,B4r as Iqr,IJ6 as rvn,Ywe as uRe,_Oi as CLi,PG7 as ILi};
