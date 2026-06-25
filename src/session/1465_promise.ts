// @ts-nocheck
import {or,dn} from "../config/0137_namespace.ts";
import {In,Ce,Jo,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getAgentId as aD,isNestedInteractiveClaudeSession as oFe,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {getSessionId as It,getOriginalCwd as gr,onSessionSwitch as gX,onOriginalCwdChange as Fsr,lt} from "./0132_sent.ts";
import {getProcessStartTimeAsync as mF,isProcessRunning as k0,xr,QT,lE} from "../../vendor/m1461.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
import {MS} from "../../vendor/m460.ts";
import {Ii} from "../../vendor/m690.ts";
import {ve} from "../../vendor/m461.ts";
import {jt} from "../../vendor/m253.ts";
// Creates a deferred promise with externally accessible resolve/reject handles
function T7(): {
  promise: Promise<any>;
  resolve: any;
  reject: any;
} {
  let resolveRef: any, rejectRef: any;
  return {
    promise: new Promise((resolve, reject) => {
      resolveRef = resolve, rejectRef = reject;
    }),
    resolve: resolveRef,
    reject: rejectRef
  };
}

// Returns the directory path where session PID files are stored
function zkt(): string {
  return Nme.join(or(), "sessions");
}

// Returns the session kind env var if it's a background/daemon kind, else undefined
function iFe(): string | undefined {
  let sessionKind = process.env.CLAUDE_CODE_SESSION_KIND;
  if (sessionKind === "bg" || sessionKind === "daemon" || sessionKind === "daemon-worker") return sessionKind;
  return;
}

// Returns true if this is a background (bg) session
function Ws(): boolean {
  return iFe() === "bg";
}

// Returns true if the background backend is set to "daemon" mode
function Fmn(): boolean {
  return process.env.CLAUDE_BG_BACKEND === "daemon";
}

// Removes the fleet-view heartbeat file from the sessions directory
async function V5s(): Promise<void> {
  try {
    await hF.unlink(Nme.join(zkt(), G5s));
  } catch {}
}

// Checks if the heartbeat file exists and was modified recently (within U9u ms), with 1s cache
function Bmn(): boolean {
  let nowMs = Date.now();
  if (Lmn && nowMs - Lmn.at < 1000) return Lmn.value;
  let isAlive = !1;
  try {
    let {
      mtimeMs: mtimeMs
    } = Nmn.statSync(Nme.join(zkt(), G5s));
    isAlive = nowMs - mtimeMs < U9u;
  } catch (statErr) {
    if (!In(statErr)) A(`[concurrentSessions] heartbeat stat failed: ${Ce(statErr)}`);
  }
  return Lmn = {
    at: nowMs,
    value: isAlive
  }, isAlive;
}

// Registers the current process as a session by writing a PID JSON file; returns true on success
async function K5s(): Promise<boolean> {
  if (aD() != null || oFe()) return !1;
  let deferred = T7();
  Ixr = deferred.promise;
  let sessionKind = iFe() ?? "interactive",
    sessionsDir = zkt(),
    pidFilePath = Nme.join(sessionsDir, `${process.pid}.json`);
  process.on("exit", () => {
    try {
      Nmn.unlinkSync(pidFilePath);
    } catch {}
  }), Si(async () => {
    try {
      await hF.unlink(pidFilePath);
    } catch {}
  });
  try {
    return await hF.mkdir(sessionsDir, {
      recursive: !0,
      mode: 448
    }), await hF.chmod(sessionsDir, 448), await hF.writeFile(pidFilePath, Pe({
      pid: process.pid,
      sessionId: It(),
      cwd: gr(),
      startedAt: Date.now(),
      procStart: await mF(process.pid),
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      peerProtocol: F9u,
      kind: sessionKind,
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT,
      ...void 0,
      ...{},
      ...{
        name: process.env.CLAUDE_CODE_SESSION_NAME,
        logPath: process.env.CLAUDE_CODE_SESSION_LOG,
        agent: process.env.CLAUDE_CODE_AGENT,
        jobId: sessionKind === "bg" && process.env.CLAUDE_JOB_DIR ? Nme.basename(process.env.CLAUDE_JOB_DIR) : void 0
      }
    })), gX(newSessionId => {
      Kkt({
        sessionId: newSessionId
      });
    }), Fsr(newCwd => {
      Kkt({
        cwd: newCwd
      });
    }), !0;
  } catch (writeErr) {
    return A(`[concurrentSessions] register failed: ${Ce(writeErr)}`), !1;
  } finally {
    deferred.resolve();
  }
}

// Updates fields in the current process's PID JSON file, chaining on the previous write promise
async function Kkt(updates) {
  let pidFilePath = Nme.join(zkt(), `${process.pid}.json`),
    writeChain = Ixr.then(async () => {
      try {
        let existingData = qt(await hF.readFile(pidFilePath, "utf8"));
        await hF.writeFile(pidFilePath, Pe({
          ...existingData,
          ...updates
        }));
      } catch (readErr) {
        A(`[concurrentSessions] updatePidFile failed: ${Ce(readErr)}`);
      }
    });
  Ixr = writeChain, await writeChain;
}

// Updates the session name and updatedAt timestamp in the PID file
async function S7(sessionName) {
  if (!sessionName) return;
  await Kkt({
    name: sessionName,
    updatedAt: Date.now()
  });
}

// Updates the bridge session ID in the PID file
async function z5s(bridgeSessionId) {
  await Kkt({
    bridgeSessionId: bridgeSessionId
  });
}

// Updates status fields in the PID file, also recording statusUpdatedAt when status changes
async function Umn(statusUpdate) {
  let nowMs = Date.now();
  await Kkt({
    ...statusUpdate,
    updatedAt: nowMs,
    ...(statusUpdate.status !== void 0 && {
      statusUpdatedAt: nowMs
    })
  });
}

// Scans sessions directory, counts live sessions, cleans up dead PID files, logs unclean exits
async function jkt(): Promise<number> {
  let sessionsDir = zkt(),
    pidFiles;
  try {
    pidFiles = await hF.readdir(sessionsDir);
  } catch (readdirErr) {
    if (!Jo(readdirErr)) A(`[concurrentSessions] readdir failed: ${Ce(readdirErr)}`);
    return 0;
  }
  let liveCount = 0;
  for (let pidFile of pidFiles) {
    if (!/^\d+\.json$/.test(pidFile)) continue;
    let pid = parseInt(pidFile.slice(0, -5), 10);
    if (pid === process.pid) {
      liveCount++;
      continue;
    }
    if (k0(pid)) liveCount++;else if (Yt() !== "wsl") {
      let fullPath = Nme.join(sessionsDir, pidFile),
        parsedSession = Hxr ? null : await hF.readFile(fullPath, "utf8").then(contents => B9u().safeParse(qt(contents))).catch(() => null);
      if ((await hF.unlink(fullPath).then(() => !0, () => !1)) && parsedSession?.success && parsedSession.data.kind === "interactive") W5s.push(parsedSession.data), A(`Prior session exited uncleanly: ${parsedSession.data.sessionId} (v${parsedSession.data.version ?? "?"})`), W("tengu_unclean_exit", {
        session_age_sec: Math.round((Date.now() - parsedSession.data.startedAt) / 1000),
        prior_version: parsedSession.data.version ?? "unknown",
        on_current_version: parsedSession.data.version === {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION,
        prior_session_id: xr(parsedSession.data.sessionId)
      });
    }
  }
  if (!Hxr) W5s.sort((a, b) => b.startedAt - a.startedAt), Hxr = !0;
  return liveCount;
}

// Module-level variables: fs, fs/promises, path, peer protocol version, session schema validator, unclean-exit list, flags, constants, cache, promise chain
var Nmn,
  hF,
  Nme,
  F9u = 1,
  B9u,
  W5s,
  Hxr = !1,
  G5s = ".fleetview-heartbeat",
  U9u = 5000,
  Lmn,
  Ixr;
var vd = b(() => {
  MS();
  lt();
  kt();
  QT();
  ud();
  qe();
  dn();
  Ct();
  Ii();
  lE();
  Es();
  tn();
  Op();
  Nmn = require("fs"), hF = require("fs/promises"), Nme = require("path"), B9u = ve(() => jt.object({
    pid: jt.number(),
    sessionId: jt.string(),
    cwd: jt.string().optional(),
    startedAt: jt.number(),
    version: jt.string().optional(),
    kind: jt.enum(["interactive", "bg", "daemon", "daemon-worker"])
  })), W5s = [];
  Ixr = Promise.resolve();
});

export {T7,zkt,iFe,Ws,Fmn,V5s,Bmn,K5s,Kkt,S7,z5s,Umn,jkt,Nmn,hF,Nme,F9u,B9u,W5s,Hxr,G5s,U9u,Lmn,Ixr,vd};
