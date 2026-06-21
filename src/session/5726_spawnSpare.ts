// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {EVt,vZn} from "../permissions/5725_startDeferredPrefetches.ts";
import {Se,xp,vX,dn,bt} from "../../vendor/m195.ts";
import {setBgExitCause,qV} from "../../vendor/m229.ts";
import {Yzn,Jzn,D0o} from "../../vendor/m5202.ts";
import {je} from "../../vendor/m577.ts";
import {rpt,opt} from "../../vendor/m4389.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {Ul,ln} from "../telemetry/0594_feature_name.ts";
import {wcl,Rcl,SJ,iD,WP,sM} from "../../vendor/m4581.ts";
import {B0o,F0o,$0o,U0o,zG,N0o,q0o} from "../agent/5207_cmd.ts";
import {wN,$He} from "../../vendor/m3864.ts";
import {J0t,X0t,BUe} from "../agent/2578_BUe.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {FP,dje} from "../../vendor/m4492.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {_A} from "../../vendor/m459.ts";
import {Lr} from "../../vendor/m578.ts";
var iuc = {};
isFullscreenWithTTY(iuc, {
  spawnSpare: () => spawnSpare,
  runBgSpare: () => runBgSpare,
  reapOrphanSpares: () => reapOrphanSpares,
  claimSpare: () => claimSpare
});
async function runBgSpare(args: any) {
  let claimSockPath = args[0];
  if (!claimSockPath) process.stderr.write(`[bg-spare] missing claim sock path\n`), process.exit(2);
  let prefetchedAuth = await c6m(),
    permissionsPromise = Promise.resolve().then(() => (EVt(), vZn)),
    cleanupSock = () => {
      try {
        suc.unlinkSync(claimSockPath);
      } catch {}
    },
    exitClean = () => {
      cleanupSock(), process.exit(0);
    },
    handleUncaught = (err: any) => {
      cleanupSock(), process.stderr.write(`[bg-spare] uncaughtException: ${Se(err)}\n`), setBgExitCause("spare_uncaught"), process.exit(1);
    },
    parentPid = process.ppid,
    orphanTimer = setInterval((ppid: any, cleanup: any) => {
      if (process.ppid !== ppid) cleanup(), process.exit(0);
    }, 2000, parentPid, cleanupSock);
  orphanTimer.unref();
  for (let sig of ["SIGTERM", "SIGHUP", "SIGINT"]) process.on(sig, exitClean);
  process.on("uncaughtException", handleUncaught);
  let stopListeners = () => {
      clearInterval(orphanTimer);
      for (let sig of ["SIGTERM", "SIGHUP", "SIGINT"]) process.off(sig, exitClean);
      process.off("uncaughtException", handleUncaught);
    },
    claimMsg: any;
  try {
    claimMsg = await Yzn(claimSockPath, void 0, prefetchedAuth);
  } catch (err: any) {
    cleanupSock(), process.stderr.write(`[bg-spare] claim recv failed: ${Se(err)}\n`), setBgExitCause("spare_claim_recv"), process.exit(1);
  }
  stopListeners();
  try {
    await permissionsPromise, await Jzn(claimMsg, permissionsPromise);
  } catch (err: any) {
    let errCode = xp(err) ?? vX(err) ?? "Error";
    throw setBgExitCause("spare_postclaim:" + errCode, claimMsg.env.CLAUDE_JOB_DIR), process.stderr.write(`[bg-spare] post-claim init failed: ${Se(err)}\n`), err;
  }
}
async function c6m() {
  let claimAuth = je.CLAUDE_BG_CLAIM_AUTH;
  delete process.env.CLAUDE_BG_CLAIM_AUTH;
  let tokensPath = je.CLAUDE_BG_SOCKET_TOKENS_PATH;
  if (delete process.env.CLAUDE_BG_SOCKET_TOKENS_PATH, !tokensPath) return claimAuth;
  let tokensData = await rpt(tokensPath);
  if (await ZP.unlink(tokensPath).catch(() => {}), !tokensData?.claimAuth) logForDebugging("[bg-spare] tokens file unreadable; claim gate degraded", {
    level: "warn"
  });
  return tokensData?.claimAuth ?? claimAuth;
}
async function spawnSpare(e: any) {
  if (zt() === "windows") return null;
  return Ul("daemon_bg_spare_refill", async () => {
    let spareId = wZn.randomBytes(4).toString("hex"),
      ptySockPath = wcl(spareId),
      claimSockPath = Rcl(spareId),
      ptyAuth = wZn.randomBytes(16).toString("hex"),
      claimAuth = wZn.randomBytes(16).toString("hex");
    await ZP.mkdir(SJ(), {
      recursive: !0,
      mode: 448
    }).catch(() => {});
    let tokensFile = await B0o(`spare-${spareId}`, {
      ptyAuth: ptyAuth,
      claimAuth: claimAuth
    });
    await ZP.unlink(ptySockPath).catch(() => {}), await ZP.unlink(claimSockPath).catch(() => {});
    let [execBin, ...execArgs] = f6m(),
      stderrFile = await ZP.open(iD(ptySockPath), "w").catch(() => null),
      spawnHandle: any;
    try {
      spawnHandle = Bun.spawn([execBin, ...execArgs, "--bg-pty-host", ptySockPath, "200", "50", "--", execBin, ...execArgs, "--bg-spare", claimSockPath], {
        cwd: SJ(),
        env: u6m(tokensFile ? {
          tokensPath: tokensFile
        } : {
          ptyAuth: ptyAuth,
          claimAuth: claimAuth
        }),
        stdio: ["ignore", "ignore", stderrFile?.fd ?? "ignore"],
        detached: !0,
        windowsHide: !0
      }), spawnHandle.unref();
    } catch (spawnErr: any) {
      if (tokensFile) ZP.unlink(tokensFile).catch(() => {});
      throw spawnErr;
    } finally {
      await stderrFile?.close().catch(() => {});
    }
    let spareRecord: any = {
      hostPid: spawnHandle.pid,
      ptySock: ptySockPath,
      claimSock: claimSockPath,
      ptyAuth: ptyAuth,
      claimAuth: claimAuth,
      startedAt: Date.now(),
      cliVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION,
      dispose() {
        try {
          spawnHandle.kill("SIGTERM");
        } catch {}
      }
    };
    return spawnHandle.exited.then(async () => {
      if (ZP.unlink(ptySockPath).catch(() => {}), ZP.unlink(claimSockPath).catch(() => {}), tokensFile) ZP.unlink(tokensFile).catch(() => {});
      let stderrOutput = ((await wN(iD(ptySockPath), 1048576)) ?? "").slice(0, 2000).trim();
      if (stderrOutput.length > 0) logForDebugging(`bg spare host pid=${spawnHandle.pid} exit stderr:
${stderrOutput}`, {
        level: "warn"
      });
      ZP.unlink(iD(ptySockPath)).catch(() => {}), ZP.unlink(WP(ptySockPath)).catch(() => {}), e.onExit();
    }), e.log(`bg spare spawned host pid=${spawnHandle.pid}`), spareRecord;
  });
}
function u6m(e: any) {
  let envCopy: any = {
    ...process.env
  };
  for (let key of F0o) delete envCopy[key];
  if ($0o(envCopy)) {
    let hostAuthVar = envCopy.CLAUDE_CODE_HOST_AUTH_ENV_VAR;
    if (hostAuthVar) delete envCopy[hostAuthVar];
    for (let key of J0t) delete envCopy[key];
  } else if (envCopy.ANTHROPIC_BASE_URL) delete envCopy.ANTHROPIC_AUTH_TOKEN;
  for (let key of U0o) delete envCopy[key];
  for (let key of Object.keys(envCopy)) if (X0t.some((prefix: any) => key.startsWith(prefix))) delete envCopy[key];
  if (zt() === "macos") delete envCopy.CLAUDE_CODE_OAUTH_TOKEN;
  return Object.assign(envCopy, {
    CLAUDE_CODE_SESSION_KIND: "bg",
    CLAUDE_BG_BACKEND: "daemon",
    CLAUDE_ENABLE_STREAM_WATCHDOG: "1",
    FORCE_COLOR: "3",
    COLORTERM: "truecolor",
    BROWSER: "true",
    ...("tokensPath" in e ? {
      CLAUDE_BG_SOCKET_TOKENS_PATH: e.tokensPath
    } : {
      CLAUDE_BG_PTY_AUTH: e.ptyAuth,
      CLAUDE_BG_CLAIM_AUTH: e.claimAuth
    })
  }), envCopy;
}
function claimSpare(e: any, t: any, spawnPtyFn: any, getAuthSnapshot: any) {
  let claimHandle = zG.claim(e, {
    pid: t.hostPid,
    ptySockPath: t.ptySock,
    spawnPty: spawnPtyFn,
    getAuthSnapshot: getAuthSnapshot,
    ptyAuth: t.ptyAuth
  });
  return N0o(e.short, getAuthSnapshot?.()).then((authSnap: any) => p6m(t.claimSock, d6m(e, authSnap, claimHandle.socketAuth(), t.claimAuth))).catch((sendErr: any) => {
    logEvent("tengu_bg_sendclaim_failed", {
      short: e.short,
      errno: xp(sendErr),
      error: Se(sendErr).slice(0, 100)
    }), logForDebugging(`[bg-spare] send-claim failed: ${Se(sendErr)}`, {
      level: "warn"
    });
    let killConn = xZn.connect(t.ptySock);
    killConn.on("error", () => {}), killConn.once("connect", () => {
      killConn.write(FP({
        t: "kill",
        sig: "SIGTERM"
      })), killConn.end();
    });
  }), claimHandle;
}
function d6m(e: any, t: any, socketAuth: any, claimAuth: any) {
  let {
    env: envVars,
    argv: argvList
  } = zG.buildClaimFrame(e, t, socketAuth);
  return {
    cwd: e.cwd,
    env: envVars,
    argv: argvList,
    sessionId: e.sessionId,
    auth: claimAuth
  };
}
async function p6m(sockPath: any, payload: any) {
  let startTime = Date.now(),
    timeoutMs = 5000;
  for (let attempt = 0;; attempt++) {
    if (Date.now() - startTime > 5000) throw Error("send-claim timeout");
    try {
      await m6m(sockPath, payload);
      return;
    } catch (sendErr: any) {
      let errCode = dn(sendErr);
      if (!(errCode === "ENOENT" || errCode === "ECONNREFUSED") || attempt >= ouc.length) throw sendErr;
      await sleep(ouc[attempt] ?? 500);
    }
  }
}
function m6m(sockPath: any, payload: any) {
  return new Promise((resolve, reject) => {
    let conn = xZn.connect(sockPath);
    conn.once("error", reject), conn.once("connect", () => {
      conn.end(Le(payload) + `
`, () => resolve());
    });
  });
}
async function reapOrphanSpares(e: any, logFn: any) {
  if (zt() === "windows") return;
  let activeSocks = new Set();
  for (let spare of e.values()) {
    let ptySock = spare.rosterEntry().ptySock;
    if (ptySock) activeSocks.add(ptySock);
  }
  let dirEntries = await ZP.readdir(SJ()).catch(() => []),
    orphanCount = 0;
  for (let entry of dirEntries) {
    if (!entry.endsWith(".pty.sock")) continue;
    let fullPath = RZn.join(SJ(), entry);
    if (activeSocks.has(fullPath)) continue;
    orphanCount++;
    let killConn = xZn.connect(fullPath);
    killConn.on("error", () => {
      ZP.unlink(fullPath).catch(() => {});
    }), killConn.once("connect", () => {
      killConn.resume(), killConn.write(FP({
        t: "kill",
        sig: "SIGTERM"
      })), killConn.end(), setTimeout((conn: any) => conn.destroy(), 2000, killConn).unref();
    });
  }
  for (let entry of dirEntries) {
    let suffix = [".err", ".late"].find((ext: any) => entry.endsWith(`.pty.sock${ext}`));
    if (suffix) {
      let baseName = entry.slice(0, -suffix.length);
      if (!dirEntries.includes(baseName)) ZP.unlink(RZn.join(SJ(), entry)).catch(() => {});
    }
    if (entry.endsWith(".claim.sock")) ZP.unlink(RZn.join(SJ(), entry)).catch(() => {});
  }
  if (orphanCount) logFn(`bg orphan-spare reap: ${orphanCount}`);
}
function f6m() {
  return _A() ? [process.execPath] : [process.execPath, process.argv[1]];
}
var wZn, suc, ZP, xZn, RZn, ouc;
var FNo = b(() => {
  ln();
  Ct();
  qe();
  Lr();
  bt();
  $He();
  BUe();
  qs();
  Xt();
  D0o();
  q0o();
  sM();
  dje();
  opt();
  qV();
  wZn = require("crypto"), suc = require("fs"), ZP = require("fs/promises"), xZn = require("net"), RZn = require("path");
  ouc = [50, 100, 150, 200, 250, 300, 400, 500, 500, 500];
});
export {iuc,runBgSpare,c6m,spawnSpare,u6m,claimSpare,d6m,p6m,m6m,reapOrphanSpares,f6m,wZn,suc,ZP,xZn,RZn,ouc,FNo};
