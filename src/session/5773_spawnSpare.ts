// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Xzt,Grr} from "../permissions/5772_startDeferredPrefetches.ts";
import {Ce,Xd,dK,cn,Ct} from "../../vendor/m197.ts";
import {setBgExitCause as iA,mK} from "../../vendor/m231.ts";
import {KQn,zQn,XMo} from "../../vendor/m5235.ts";
import {Ne} from "../../vendor/m583.ts";
import {rft,oft} from "../../vendor/m4411.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Tl,mn} from "../telemetry/0600_feature_name.ts";
import {a_l,l_l,iJ,Tx,lP,CL} from "../../vendor/m4609.ts";
import {r1o,o1o,i1o,s1o,uV,n1o,a1o} from "../agent/5240_cmd.ts";
import {U1,x0e} from "../config/3883_x0e.ts";
import {wOt,kOt,F2e} from "../agent/2589_F2e.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {gx,F8e} from "../../vendor/m4514.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Rf} from "../../vendor/m465.ts";
import {Ir} from "../../vendor/m584.ts";
var fSc = {};
ft(fSc, {
  spawnSpare: () => spawnSpare,
  runBgSpare: () => runBgSpare,
  reapOrphanSpares: () => reapOrphanSpares,
  claimSpare: () => claimSpare
});
/** Entry point run in the background spare process (--bg-spare). Receives a claim over the socket, then initializes from it. */
async function runBgSpare(args: any) {
  let claimSockPath = args[0];
  if (!claimSockPath) process.stderr.write(`[bg-spare] missing claim sock path
`), process.exit(2);
  let prefetchedAuth = await gXm(),
    permissionsPromise = Promise.resolve().then(() => (Xzt(), Grr)),
    cleanupSock = () => {
      try {
        mSc.unlinkSync(claimSockPath);
      } catch {}
    },
    exitClean = () => {
      cleanupSock(), process.exit(0);
    },
    handleUncaught = (err: any) => {
      cleanupSock(), process.stderr.write(`[bg-spare] uncaughtException: ${Ce(err)}
`), iA("spare_uncaught"), process.exit(1);
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
    claimMsg = await KQn(claimSockPath, void 0, prefetchedAuth);
  } catch (err: any) {
    cleanupSock(), process.stderr.write(`[bg-spare] claim recv failed: ${Ce(err)}
`), iA("spare_claim_recv"), process.exit(1);
  }
  stopListeners();
  try {
    await permissionsPromise, await zQn(claimMsg, permissionsPromise);
  } catch (err: any) {
    let errCode = Xd(err) ?? dK(err) ?? "Error";
    throw iA("spare_postclaim:" + errCode, claimMsg.env.CLAUDE_JOB_DIR), process.stderr.write(`[bg-spare] post-claim init failed: ${Ce(err)}
`), err;
  }
}
/** Resolves the claim auth secret, preferring a tokens file over the env var; deletes both from the environment after reading. */
async function gXm() {
  let claimAuth = Ne.CLAUDE_BG_CLAIM_AUTH;
  delete process.env.CLAUDE_BG_CLAIM_AUTH;
  let tokensPath = Ne.CLAUDE_BG_SOCKET_TOKENS_PATH;
  if (delete process.env.CLAUDE_BG_SOCKET_TOKENS_PATH, !tokensPath) return claimAuth;
  let tokensData = await rft(tokensPath);
  if (await AP.unlink(tokensPath).catch(() => {}), !tokensData?.claimAuth) A("[bg-spare] tokens file unreadable; claim gate degraded", {
    level: "warn"
  });
  return tokensData?.claimAuth ?? claimAuth;
}
/** Spawns a detached background PTY host + spare process pair, returning a record describing the spare or null on Windows. */
async function spawnSpare(e: any) {
  if (Yt() === "windows") return null;
  return Tl("daemon_bg_spare_refill", async () => {
    let spareId = Vrr.randomBytes(4).toString("hex"),
      ptySockPath = a_l(spareId),
      claimSockPath = l_l(spareId),
      ptyAuth = Vrr.randomBytes(16).toString("hex"),
      claimAuth = Vrr.randomBytes(16).toString("hex");
    await AP.mkdir(iJ(), {
      recursive: !0,
      mode: 448
    }).catch(() => {});
    let tokensFile = await r1o(`spare-${spareId}`, {
      ptyAuth: ptyAuth,
      claimAuth: claimAuth
    });
    await AP.unlink(ptySockPath).catch(() => {}), await AP.unlink(claimSockPath).catch(() => {});
    let [execBin, ...execArgs] = bXm(),
      stderrFile = await AP.open(Tx(ptySockPath), "w").catch(() => null),
      spawnHandle: any;
    try {
      spawnHandle = Bun.spawn([execBin, ...execArgs, "--bg-pty-host", ptySockPath, "200", "50", "--", execBin, ...execArgs, "--bg-spare", claimSockPath], {
        cwd: iJ(),
        env: _Xm(tokensFile ? {
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
      if (tokensFile) AP.unlink(tokensFile).catch(() => {});
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
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      dispose() {
        try {
          spawnHandle.kill("SIGTERM");
        } catch {}
      }
    };
    return spawnHandle.exited.then(async () => {
      if (AP.unlink(ptySockPath).catch(() => {}), AP.unlink(claimSockPath).catch(() => {}), tokensFile) AP.unlink(tokensFile).catch(() => {});
      let stderrOutput = ((await U1(Tx(ptySockPath), 1048576)) ?? "").slice(0, 2000).trim();
      if (stderrOutput.length > 0) A(`bg spare host pid=${spawnHandle.pid} exit stderr:
${stderrOutput}`, {
        level: "warn"
      });
      AP.unlink(Tx(ptySockPath)).catch(() => {}), AP.unlink(lP(ptySockPath)).catch(() => {}), e.onExit();
    }), e.log(`bg spare spawned host pid=${spawnHandle.pid}`), spareRecord;
  });
}
/** Builds the sanitized environment for the spawned spare: strips auth/host env vars, then injects the bg session env. */
function _Xm(e: any) {
  let envCopy: any = {
    ...process.env
  };
  for (let key of o1o) delete envCopy[key];
  if (i1o(envCopy)) {
    let hostAuthVar = envCopy.CLAUDE_CODE_HOST_AUTH_ENV_VAR;
    if (hostAuthVar) delete envCopy[hostAuthVar];
    for (let key of wOt) delete envCopy[key];
  } else if (envCopy.ANTHROPIC_BASE_URL) delete envCopy.ANTHROPIC_AUTH_TOKEN;
  for (let key of s1o) delete envCopy[key];
  for (let key of Object.keys(envCopy)) if (kOt.some((prefix: any) => key.startsWith(prefix))) delete envCopy[key];
  if (Yt() === "macos") delete envCopy.CLAUDE_CODE_OAUTH_TOKEN;
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
/** Claims a ready spare for a job, sends the claim frame over its socket, and kills the host if sending fails. */
function claimSpare(e: any, t: any, spawnPtyFn: any, getAuthSnapshot: any) {
  let claimHandle = uV.claim(e, {
    pid: t.hostPid,
    ptySockPath: t.ptySock,
    spawnPty: spawnPtyFn,
    getAuthSnapshot: getAuthSnapshot,
    ptyAuth: t.ptyAuth
  });
  return n1o(e.short, getAuthSnapshot?.()).then((authSnap: any) => TXm(t.claimSock, yXm(e, authSnap, claimHandle.socketAuth(), t.claimAuth))).catch((sendErr: any) => {
    W("tengu_bg_sendclaim_failed", {
      short: e.short,
      errno: Xd(sendErr),
      error: Ce(sendErr).slice(0, 100)
    }), A(`[bg-spare] send-claim failed: ${Ce(sendErr)}`, {
      level: "warn"
    });
    let killConn = zrr.connect(t.ptySock);
    killConn.on("error", () => {}), killConn.once("connect", () => {
      killConn.write(gx({
        t: "kill",
        sig: "SIGTERM"
      })), killConn.end();
    });
  }), claimHandle;
}
/** Assembles the claim frame payload (cwd/env/argv/sessionId/auth) sent to a spare on claim. */
function yXm(e: any, t: any, socketAuth: any, claimAuth: any) {
  let {
    env: envVars,
    argv: argvList
  } = uV.buildClaimFrame(e, t, socketAuth);
  return {
    cwd: e.cwd,
    env: envVars,
    argv: argvList,
    sessionId: e.sessionId,
    auth: claimAuth
  };
}
/** Sends the claim payload to the socket, retrying with backoff on ENOENT/ECONNREFUSED until a 5s timeout. */
async function TXm(sockPath: any, payload: any) {
  let startTime = Date.now(),
    timeoutMs = 5000;
  for (let attempt = 0;; attempt++) {
    if (Date.now() - startTime > 5000) throw Error("send-claim timeout");
    try {
      await SXm(sockPath, payload);
      return;
    } catch (sendErr: any) {
      let errCode = cn(sendErr);
      if (!(errCode === "ENOENT" || errCode === "ECONNREFUSED") || attempt >= pSc.length) throw sendErr;
      await Kn(pSc[attempt] ?? 500);
    }
  }
}
/** Single-shot connect-and-write of the newline-delimited claim payload to a unix socket. */
function SXm(sockPath: any, payload: any) {
  return new Promise((resolve, reject) => {
    let conn = zrr.connect(sockPath);
    conn.once("error", reject), conn.once("connect", () => {
      conn.end(Pe(payload) + `
`, () => resolve());
    });
  });
}
/** Scans the spare dir for orphaned pty sockets not in the active roster and kills/cleans them up. */
async function reapOrphanSpares(e: any, logFn: any) {
  if (Yt() === "windows") return;
  let activeSocks = new Set();
  for (let spare of e.values()) {
    let ptySock = spare.rosterEntry().ptySock;
    if (ptySock) activeSocks.add(ptySock);
  }
  let dirEntries = await AP.readdir(iJ()).catch(() => []),
    orphanCount = 0;
  for (let entry of dirEntries) {
    if (!entry.endsWith(".pty.sock")) continue;
    let fullPath = Krr.join(iJ(), entry);
    if (activeSocks.has(fullPath)) continue;
    orphanCount++;
    let killConn = zrr.connect(fullPath);
    killConn.on("error", () => {
      AP.unlink(fullPath).catch(() => {});
    }), killConn.once("connect", () => {
      killConn.resume(), killConn.write(gx({
        t: "kill",
        sig: "SIGTERM"
      })), killConn.end(), setTimeout((conn: any) => conn.destroy(), 2000, killConn).unref();
    });
  }
  for (let entry of dirEntries) {
    let suffix = [".err", ".late"].find((ext: any) => entry.endsWith(`.pty.sock${ext}`));
    if (suffix) {
      let baseName = entry.slice(0, -suffix.length);
      if (!dirEntries.includes(baseName)) AP.unlink(Krr.join(iJ(), entry)).catch(() => {});
    }
    if (entry.endsWith(".claim.sock")) AP.unlink(Krr.join(iJ(), entry)).catch(() => {});
  }
  if (orphanCount) logFn(`bg orphan-spare reap: ${orphanCount}`);
}
/** Returns the command line prefix to re-exec this CLI: [execPath] when standalone, else [execPath, scriptPath]. */
function bXm() {
  return Rf() ? [process.execPath] : [process.execPath, process.argv[1]];
}
var Vrr, mSc, AP, zrr, Krr, pSc;
var x9o = b(() => {
  mn();
  kt();
  qe();
  Ir();
  Ct();
  x0e();
  F2e();
  Es();
  tn();
  XMo();
  a1o();
  CL();
  F8e();
  oft();
  mK();
  Vrr = require("crypto"), mSc = require("fs"), AP = require("fs/promises"), zrr = require("net"), Krr = require("path");
  pSc = [50, 100, 150, 200, 250, 300, 400, 500, 500, 500];
});

export {fSc,runBgSpare,gXm,spawnSpare,_Xm,claimSpare,yXm,TXm,SXm,reapOrphanSpares,bXm,Vrr,mSc,AP,zrr,Krr,pSc,x9o};
