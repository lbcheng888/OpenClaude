// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {isDaemonServiceInstallEnabled,ensureFleetGateHydrated,isDaemonCliEnabled,fleetGateRejected,isDaemonWorkerRegistryEnabled,bv} from "./2204_shouldShowLaunchComposer.ts";
import {X6,fDe,ADe} from "../../vendor/m4578.ts";
import {Fa,Pd} from "../../vendor/m701.ts";
import {shutdown1PEventLogging,initialize1PEventLogging,logEventTo1PAwaitable,I1} from "../session/2197_shutdown1PEventLogging.ts";
import {shutdownDatadog,trackDatadogEvent,iZ} from "../permissions/5195_trackDatadogEvent.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {runFastPathPolicyHelper,Jue} from "../../vendor/m5199.ts";
import {ZNo,QNo} from "../../vendor/m5735.ts";
import {xxo,Rxo} from "../../vendor/m5098.ts";
import {uQe,W_n} from "./2203_W_n.ts";
import {getDebugFilePath,qe} from "./0234_setHasFormattedOutput.ts";
import {Y3e} from "./3762_level.ts";
import {Fuc,Uuc} from "./5735_target.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {hDe,I6t,TJ,o5n,r5n,Tcl,Zpt,D6t,gDe} from "../../vendor/m4579.ts";
import {k6t,yI,yne} from "../../vendor/m4577.ts";
import {mPe,Uue,h8e} from "./5123_proto.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {Cn,dr} from "../../vendor/m231.ts";
import {OT,gue} from "../../vendor/m4582.ts";
import {Cp,rM} from "../../vendor/m4493.ts";
import {tko,m5t} from "../../vendor/m5125.ts";
import {dn,Se,xp,bt} from "../../vendor/m195.ts";
import {u5n,qTo} from "../../vendor/m4584.ts";
import {W7n,Kxo} from "./5122_cmd.ts";
import {Le,Xt} from "./0228_encoding.ts";
import {wY} from "../../vendor/m3762.ts";
var zuc = {};
isFullscreenWithTTY(zuc, {
  tailLog: () => tailLog,
  parseArgs: () => Vuc,
  daemonMain: () => daemonMain
});
function quc() {
  return Z6m + (isDaemonServiceInstallEnabled() ? ejm : tjm) + njm + rjm;
}
function Vuc(e: any) {
  let t = X6(),
    n = !1,
    r = fDe(),
    o: any,
    s: any,
    i = new Set();
  for (let f = 0; f < e.length; f++) {
    let A = e[f];
    if (A === "--json-path" && e[f + 1]) i.add(f), i.add(++f), t = e[f], n = !0;else if (A.startsWith("--json-path=")) i.add(f), t = A.slice(12), n = !0;else if (A === "--log-file" && e[f + 1]) i.add(f), i.add(++f), r = e[f];else if (A.startsWith("--log-file=")) i.add(f), r = A.slice(11);else if (A === "--origin" && e[f + 1]) i.add(f), i.add(++f), o = juc(e[f]);else if (A.startsWith("--origin=")) i.add(f), o = juc(A.slice(9));else if (A === "--spawned-by" && e[f + 1]) i.add(f), i.add(++f), s = ajm(e[f]);
  }
  let a: any[] = [];
  for (let f = 0; f < e.length; f++) if (!i.has(f)) a.push(e[f]);
  let l = new Set(["run", "install", "uninstall", "start", "stop", "restart", "status", "logs", "log", "list", "scheduled", "remote-control", "hub"]),
    c = process.stdin.isTTY ? "hub" : "run",
    u = -1;
  for (let f = 0; f < a.length; f++) if (!a[f].startsWith("-")) {
    u = f;
    break;
  }
  if (u === -1) return {
    sub: c,
    jsonPath: t,
    logPath: r,
    origin: o,
    spawnedBy: s,
    rest: a
  };
  let d = a[u];
  if (!l.has(d)) {
    if (!/[./\\~]/.test(d)) return {
      sub: d,
      jsonPath: t,
      logPath: r,
      origin: o,
      spawnedBy: s,
      rest: []
    };
    return {
      sub: "run",
      jsonPath: n ? t : d,
      logPath: r,
      origin: o,
      spawnedBy: s,
      rest: []
    };
  }
  let p = [...a.slice(0, u), ...a.slice(u + 1)],
    m = d;
  if (m === "run" && !n) {
    let f = p.find((A: any) => !A.startsWith("-"));
    if (f) t = f;
  }
  return {
    sub: m,
    jsonPath: t,
    logPath: r,
    origin: o,
    spawnedBy: s,
    rest: p
  };
}
function juc(e: any) {
  if (e === "service" || e === "transient" || e === "foreground") return e;
  if (e === "auto") return "transient";
  return;
}
function ijm(e: any) {
  let t = e.origin ?? "unknown";
  if (t !== "transient" && t !== "auto") return t;
  let n = e.spawnedBy;
  if (!n) return "transient \u2014 started on-demand by a client";
  return `transient \u2014 started on-demand by \`${n.label}\` (pid ${n.pid}) in ${n.cwd}`;
}
function ajm(e: any) {
  let t = Fa(e, !1);
  if (t === null || typeof t !== "object") return;
  let n = t;
  if (typeof n.label === "string" && typeof n.cwd === "string" && typeof n.pid === "number") return {
    label: n.label,
    cwd: n.cwd,
    pid: n.pid
  };
  return;
}
function c_(e: any) {
  process.stdout.write(e + `
`);
}
function WC(e: any) {
  process.stderr.write(e + `
`);
}
function uOe(e: any, t: any) {
  let n: any[] = [];
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    if (t.includes(o)) continue;
    if (o === "--debug" || o === "-d" || o === "--debug-to-stderr" || o === "-d2e" || o.startsWith("--debug=") || o.startsWith("--debug-file=")) continue;
    if (o === "--debug-file" && r + 1 < e.length) {
      r++;
      continue;
    }
    n.push(o);
  }
  if (n.length > 0) WC(`warning: extra arguments ignored: ${n.join(" ")}`);
}
async function bj(e: any) {
  await Promise.race([Promise.all([shutdown1PEventLogging(), shutdownDatadog()]), sleep(500, void 0, {
    unref: !0
  })]).catch(() => {}), process.exit(e);
}
async function daemonMain(e: any) {
  if (await ensureFleetGateHydrated(), e.includes("--help") || e.includes("-h")) {
    if (!isDaemonCliEnabled()) return fleetGateRejected("daemon");
    c_(quc());
    return;
  }
  let t = Vuc(e),
    {
      jsonPath: n,
      logPath: r,
      origin: o,
      spawnedBy: s,
      rest: i
    } = t,
    a = t.sub === "hub" && !isDaemonWorkerRegistryEnabled() ? "status" : t.sub;
  if (!sjm.has(a)) {
    let l = await runFastPathPolicyHelper();
    if (l) process.stderr.write(`${l}
`), process.exit(1);
    if (!isDaemonCliEnabled()) return fleetGateRejected("daemon");
  }
  if (ojm.has(a) && !isDaemonWorkerRegistryEnabled()) return fleetGateRejected(`daemon ${a}`);
  switch (initialize1PEventLogging(), a) {
    case "list":
      {
        uOe(i, ["--json"]);
        let {
          handleListAllKinds: l
        } = await Promise.resolve().then(() => (ZNo(), QNo));
        await l(i.includes("--json"), n);
        return;
      }
    case "scheduled":
    case "remote-control":
      {
        let {
          handleCliKind: l
        } = await Promise.resolve().then(() => (ZNo(), QNo));
        await l(a, i, n);
        return;
      }
    case "hub":
      {
        if (uOe(i, []), !process.stdin.isTTY || !process.stdout.isTTY) {
          c_("Interactive hub requires a TTY. See `claude daemon --help`.");
          return;
        }
        let {
          renderDaemonHubStandalone: l
        } = await Promise.resolve().then(() => (xxo(), Rxo));
        return await l(), process.exit(0);
      }
    case "run":
      {
        if (uQe()) return WC("claude daemon: background agents disabled (3P/opt-out)"), process.exit(0);
        process.title = "claude daemon";
        let l = FVt.resolve(n),
          c = FVt.resolve(r);
        getDebugFilePath();
        try {
          process.chdir(Guc.homedir());
        } catch {}
        Y3e();
        let u = new AbortController(),
          d = !1,
          p = () => {
            if (d) WC("forced shutdown"), process.exit(1);
            d = !0, u.abort();
          };
        process.on("SIGINT", p), process.on("SIGTERM", p);
        let m = o ?? "foreground",
          f: any,
          A: any;
        try {
          ({
            upgradeDetected: f,
            exitCode: A
          } = await Fuc({
            jsonPath: l,
            logPath: c,
            origin: m,
            spawnedBy: s,
            signal: u.signal
          }));
        } catch (h) {
          return De(h), Oe("daemon_start", "daemon_start_crash"), await Promise.all([logEventTo1PAwaitable("tengu_daemon_startup_crash", {}), trackDatadogEvent("tengu_daemon_startup_crash", {})]), bj(1);
        }
        if (f) {
          if (m === "service") return bj(Q6m);
          await cjm(l, c, m, s);
        }
        return bj(A);
      }
    case "install":
      {
        if (uOe(i, []), !isDaemonServiceInstallEnabled()) return WC(`\`claude daemon ${a}\` is disabled in this version \u2014 the daemon runs on demand and exits when the last client disconnects.`), await logEventTo1PAwaitable("tengu_daemon_install", {
          ok: !1,
          disabled: !0
        }), bj(1);
        if (!hDe()) return WC(`Service install isn't available on ${"darwin"} \u2014 the daemon still runs on demand when a client connects.`), Oe("daemon_service_install", "daemon_service_install_unsupported"), bj(1);
        if (process.env.CLAUDE_CONFIG_DIR) return WC("service install only supports the default config dir \u2014 the launchd/systemd unit is a per-user singleton"), Oe("daemon_service_install", "daemon_service_install_config_dir"), bj(1);
        let l = await k6t();
        if (l !== null) c_(`stopped detached daemon (pid ${l})`);
        let c = await I6t({
          jsonPath: n,
          logPath: r
        });
        if (!c.ok) return await logEventTo1PAwaitable("tengu_daemon_install", {
          ok: !1
        }), Oe("daemon_service_install", "daemon_service_install_failed"), WC(`install failed: ${c.error}`), WC(`  (service file was written to ${c.servicePath})`), bj(1);
        Ie("daemon_service_install"), c_(`installed: ${c.servicePath}`);
        let u = await mPe(Uue);
        if (await logEventTo1PAwaitable("tengu_daemon_install", {
          ok: !0,
          reachable: u
        }), u) {
          let d = await yI().catch(() => null);
          c_(`running: pid=${d?.pid ?? "?"} origin=${d?.origin ?? "?"} (managed by ${zt() === "macos" ? "launchd" : "systemd"})`);
        } else WC(`warning: service installed but daemon not reachable within ${Uue / 1000}s \u2014 check \`claude daemon logs\``);
        return bj(0);
      }
    case "start":
    case "restart":
      {
        if (uOe(i, []), !isDaemonServiceInstallEnabled()) return WC(`\`claude daemon ${a}\` is disabled in this version \u2014 the daemon runs on demand and exits when the last client disconnects.`), await logEventTo1PAwaitable("tengu_daemon_install", {
          ok: !1,
          disabled: !0
        }), bj(1);
        if (!hDe()) WC(`\`claude daemon ${a}\` isn't available on ${"darwin"} (no launchd/systemd) \u2014 the daemon runs on demand instead.`), process.exit(1);
        if (process.env.CLAUDE_CONFIG_DIR) WC("the launchd/systemd unit is a per-user singleton for the default config dir"), process.exit(1);
        if (!(await TJ())) WC("service not installed \u2014 run `claude daemon install` first"), process.exit(1);
        if (await o5n()) {
          c_("service binary missing \u2014 regenerating service file");
          let c = await k6t();
          if (c !== null) c_(`stopped detached daemon (pid ${c})`);
          let u = await I6t({
            jsonPath: n,
            logPath: r
          });
          if (await logEventTo1PAwaitable("tengu_daemon_control", {
            op_start: a === "start",
            op_restart: a === "restart",
            ok: u.ok,
            regenerated: !0
          }), u.ok) c_(a === "start" ? "started" : "restarted");else WC(`regenerate failed: ${u.error}`);
          return bj(u.ok ? 0 : 1);
        }
        let l = await (a === "start" ? r5n() : Tcl());
        if (await logEventTo1PAwaitable("tengu_daemon_control", {
          op_start: a === "start",
          op_restart: a === "restart",
          ok: l.ok
        }), l.ok) c_(a === "start" ? "started" : "restarted");else WC(`${a} failed: ${l.error}`);
        return bj(l.ok ? 0 : 1);
      }
    case "uninstall":
      {
        uOe(i, []);
        let l = await Zpt();
        if (await logEventTo1PAwaitable("tengu_daemon_control", {
          op_uninstall: !0,
          ok: l.ok
        }), l.ok) Ie("daemon_service_uninstall"), c_("uninstalled");else Oe("daemon_service_uninstall", "daemon_service_uninstall_failed"), WC(`uninstall failed: ${l.error}`);
        return bj(l.ok ? 0 : 1);
      }
    case "stop":
      {
        let l = i.includes("--keep-workers");
        uOe(i, ["--keep-workers", "--any"]);
        let c = (h: any) => l || h === 0 ? "stopped" : `stopped (terminated ${h} ${Cn(h, "background session")})`,
          u = async (h: any, g: any) => {
            if (h) Ie("daemon_stop");else Oe("daemon_stop", "daemon_stop_failed");
            return await logEventTo1PAwaitable("tengu_daemon_control", {
              op_stop: !0,
              ok: h,
              reaped: g
            }), bj(h ? 0 : 1);
          },
          d = await TJ(),
          p = await yI();
        if (!d && p && !i.includes("--any")) return WC(`no background service is installed, but a daemon is running (pid=${p.pid}, origin=${p.origin ?? "unknown"}). Run \`claude daemon stop --any\` to stop it.`), bj(1);
        let m = await OT({
          proto: Cp,
          op: "shutdown",
          reapWorkers: !l
        });
        if (m.ok && m.op === "shutdown") {
          let h = l ? 0 : (await tko()).reaped,
            g = Math.max(m.reaped, h);
          if (d) {
            let _ = await D6t();
            if (!_.ok) return WC(`stop failed: ${_.error}`), u(!1, g);
          }
          if (c_(c(g)), !d) c_("note: the next `claude agents` or `claude --bg` will start a new one");
          return u(!0, g);
        }
        let f = !1;
        if (d) {
          let h = await D6t();
          if (!h.ok) return WC(`stop failed: ${h.error}`), u(!1, 0);
          f = !0;
        } else if (p && zt() !== "windows") try {
          process.kill(p.pid, "SIGTERM"), f = !0;
        } catch (h) {
          if (dn(h) === "ESRCH") f = !0;else {
            let g = dn(h) === "EPERM" ? " (running as another user \u2014 try with elevated privileges)" : "";
            return WC(`could not stop daemon (pid=${p.pid}): ${Se(h)}${g}`), u(!1, 0);
          }
        }
        let A = l ? 0 : (await tko()).reaped;
        if (p && !f && zt() === "windows") return WC((A > 0 ? `terminated ${A} background session(s); ` : "") + `supervisor (pid=${p.pid}) is still running \u2014 stop it with ` + `\`taskkill /PID ${p.pid}\` or close the terminal it was started in.`), u(!1, A);
        if (!f && !p && A === 0) c_("no daemon running");else if (c_(c(A)), !d && p) c_("note: the next `claude agents` or `claude --bg` will start a new one");
        return u(!0, A);
      }
    case "status":
      {
        uOe(i, []);
        let l = await yI();
        if (!l) {
          c_("not running");
          let {
            getBgDaemonStatus: f,
            formatBgDaemonStatus: A
          } = await Promise.resolve().then(() => (u5n(), qTo));
          c_(A(await f())), process.exit(1);
        }
        let c = Math.floor((Date.now() - l.startedAt) / 1000);
        c_(`pid:     ${l.pid}`), c_(`version: ${l.version}`), c_(`uptime:  ${c}s`), c_(`origin:  ${ijm(l)}`), c_(`config:  ${l.jsonPath}`), c_(`log:     ${l.logPath}`);
        let {
            getBgDaemonStatus: u,
            formatBgDaemonStatus: d
          } = await Promise.resolve().then(() => (u5n(), qTo)),
          p = await u();
        c_(d(p));
        let m = l.origin;
        if (m === "transient" || m === "auto") {
          c_("");
          let f = p.workersLive ?? 0,
            A = p.leaseClients;
          if (f > 0 || A.length > 0) {
            if (c_("holding this daemon open:"), f > 0) c_(`  ${f} ${Cn(f, "bg worker")} running (daemon waits for them to settle)`);
            for (let h of A) c_(`  \`${h.label}\` (pid ${h.pid}) in ${h.cwd}`);
            c_(""), c_("to let it idle-exit: wait for (or cancel) bg workers and close any `claude agents`");
          } else if (p.workersLive === 0) c_("nothing holding this daemon open \u2014 will idle-exit shortly");
        }
        if (l.version !== {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.VERSION) {
          c_(""), c_(`warning: running daemon is ${l.version}, but this claude is ${{
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.185",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-20T06:38:30Z",
            GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
          }.VERSION}`);
          let f = (await TJ()) ? "claude daemon stop" : "claude daemon stop --any";
          c_(`  run \`${f}\` to pick up the new version`);
        }
        return process.exit(0);
      }
    case "logs":
    case "log":
      {
        uOe(i, []), await tailLog(r);
        return;
      }
    default:
      WC(`unknown subcommand: ${a}`), WC(""), WC(quc()), process.exit(1);
  }
}
async function cjm(e: any, t: any, n: any, r: any) {
  let {
    err: o,
    stderrPath: s
  } = await W7n(["daemon", "run", "--json-path", e, "--log-file", t, "--origin", n, ...(r ? ["--spawned-by", Le(r)] : [])]);
  if (s) OZn.rm(FVt.dirname(s), {
    recursive: !0,
    force: !0
  }).catch(() => {});
  if (o) De(`daemon: upgrade self-respawn failed: ${Se(o)}`), await logEventTo1PAwaitable("tengu_bg_daemon_spawn_failed", {
    respawn: !0,
    errno_enoent: dn(o) === "ENOENT",
    errno_eacces: dn(o) === "EACCES",
    errno: xp(o) ?? "unknown"
  });
}
async function tailLog(e: any) {
  {
    let s = Wuc.spawn("tail", ["-f", e], {
      stdio: "inherit"
    });
    await new Promise(i => {
      s.on("exit", (a: any) => {
        if (a) process.exitCode = a;
        i();
      }), s.on("error", (a: any) => {
        WC(`tail failed: ${a.message}`), process.exit(1);
      });
    });
    return;
  }
  let t: any;
  try {
    t = await OZn.open(e, "r");
  } catch (s) {
    WC(`cannot open ${e}: ${Se(s)}`), process.exit(1);
  }
  let n = (await t.stat()).size,
    r = Buffer.alloc(65536),
    o = !1;
  process.on("SIGINT", () => {
    o = !0;
  });
  while (!o) {
    if ((await t.stat()).size < n) n = 0;
    let {
      bytesRead: i
    } = await t.read(r, 0, r.length, n);
    if (i > 0) process.stdout.write(r.subarray(0, i)), n += i;else await sleep(500);
  }
  await t.close();
}
var Wuc: any,
  OZn: any,
  Guc: any,
  FVt: any,
  Q6m = 70,
  Z6m = `Usage: claude daemon [subcommand] [options]

Service lifecycle:
  run [json-path]   Run the supervisor in the foreground (default when piped)
  status            Show daemon pid, version, uptime
  logs              Tail the daemon log (Ctrl-C to stop)
  uninstall         Remove the background service (launchctl/systemd)
  stop              Shut down the supervisor and terminate background sessions
                      --any           also stop a transient (non-service) daemon
                      --keep-workers  leave detached sessions running
`,
  ejm = `  install           Install as a launchctl/systemd service (persists across reboot)
  start             Start the installed service
  restart           Restart the installed service
`,
  tjm = `
  Service install is disabled in this version \u2014 the daemon runs on demand
  and exits when the last client disconnects.
`,
  njm = "",
  rjm = `
Options:
  --json-path <p>   Config file (default: ~/.claude/daemon.json)
  --log-file <p>    Log file (default: ~/.claude/daemon.log)
  --help, -h        Show this help
`,
  ojm: any,
  sjm: any;
var Yuc = b(() => {
  bv();
  W_n();
  iZ();
  ln();
  I1();
  qe();
  bt();
  Pd();
  Rn();
  wY();
  qs();
  Jue();
  Xt();
  dr();
  gue();
  h8e();
  rM();
  m5t();
  Kxo();
  yne();
  ADe();
  gDe();
  Uuc();
  Wuc = require("child_process"), OZn = require("fs/promises"), Guc = require("os"), FVt = require("path"), ojm = new Set(["list", "scheduled", "remote-control", "hub"]), sjm = new Set(["run", "status", "stop", "uninstall"]);
});
export {zuc,quc,Vuc,juc,ijm,ajm,c_,WC,uOe,bj,daemonMain,cjm,tailLog,Wuc,OZn,Guc,FVt,Q6m,Z6m,ejm,tjm,njm,rjm,ojm,sjm,Yuc};
