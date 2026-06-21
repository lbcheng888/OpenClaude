// @ts-nocheck
import {sU as QF,Pge as hge} from "../../vendor/m3855.ts";
import {getMaterializedSessionFile as GL,flushSessionStorage as eD,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {getSessionId as kt,getOriginalCwd as gr,getProjectRoot as yc,lt as ct} from "../session/0131_sent.ts";
import {claimShutdown as Q1t,cleanupTerminalModes as i9e,emitScrollTelemetrySummary as C0n,P9e as l9e,ym as Km} from "./3332_flushAnalyticsSinks.ts";
import {withTimeout as lu} from "../telemetry/1483_withTimeout.ts";
import {JWe as DWe,ReactHooks as Jd} from "../../vendor/m133.ts";
import {SCl as Zbl,bCl as eEl} from "../../vendor/m4892.ts";
import {setBgExitCause as XC,qV as xV} from "../../vendor/m229.ts";
import {_g as fg,ry} from "../agent/2772_withFileTypes.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function getRelaunchCwd(e = {}) {
  let {
      cmd: t,
      prefixArgs: n
    } = e.launcher ?? QF(),
    r = GL(),
    o = e.extraArgs ?? [],
    s;
  if (e.args) s = e.args;else if (e.freshIfNoTranscript && (!r || !(await Nw4.stat(r).then(c => c.size > 0, () => false)))) s = o;else s = ["--resume", kt(), ...o];
  Q1t(), i9e(), C0n(), await Promise.all([lu(eD(), 30000, "flush timeout (relaunch)").catch(() => {}), lu(DWe(), 2000, "cleanup timeout").catch(() => {}).then(() => lu(l9e(), 1000, "analytics flush timeout").catch(() => {}))]), e.preSpawn?.();
  let i = {
    ...process.env
  };
  delete i.CLAUDE_CODE_TUI_JUST_SWITCHED, delete i.CLAUDE_BRIDGE_REATTACH_SESSION, delete i.CLAUDE_BRIDGE_REATTACH_SEQ, delete i.CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY, Object.assign(i, e.env);
  for (let c of e.dropEnv ?? []) delete i[c];
  let a = relaunchClaudeCode();
  Zbl(t, [t, ...n, ...s], i, a);
  for (let c of ["SIGINT", "SIGTERM", "SIGHUP"]) process.removeAllListeners(c), process.on(c, () => {});
  let l = kw4.spawnSync(t, [...n, ...s], {
    stdio: "inherit",
    env: i,
    cwd: a
  });
  if (process.removeAllListeners("beforeExit"), process.removeAllListeners("exit"), l.error) process.stderr.write(`Failed to relaunch Claude Code: ${l.error.message}
`), XC("relaunch_spawn_error"), process.exit(1);
  if (l.signal) process.removeAllListeners(l.signal), process.kill(process.pid, l.signal), process.exit(128 + (Vw4.constants.signals[l.signal] ?? 0));
  process.exit(l.status ?? (l.signal ? 1 : 0));
}
function relaunchClaudeCode() {
  let e = GL(),
    t = gr();
  if (e && yw4.dirname(e) === fg(t)) return t;
  return yc();
}
var kw4, Nw4, Vw4, yw4;
var ZB_ = b(() => {
  ct();
  xV();
  Jd();
  eEl();
  Km();
  hge();
  ry();
  za();
  kw4 = require("child_process"), Nw4 = require("fs/promises"), Vw4 = require("os"), yw4 = require("path");
});

export {getRelaunchCwd as zDe,relaunchClaudeCode as Hvo,kw4 as ECl,Nw4 as CCl,Vw4 as vCl,yw4 as wCl,ZB_ as c8t};
