// @ts-nocheck
import {tr,sn} from "../config/0047_namespace.ts";
import {Pn,Se,ds,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {getAgentId,isNestedInteractiveClaudeSession,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Gi,ReactHooks} from "../../vendor/m133.ts";
import {Le,qt,Xt} from "../config/0228_encoding.ts";
import {getSessionId,getOriginalCwd,onSessionSwitch,onOriginalCwdChange,lt} from "./0131_sent.ts";
import {getProcessStartTimeAsync,isProcessRunning,Br,WS,rE} from "../../vendor/m1456.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
import {iv} from "../../vendor/m454.ts";
import {oa} from "../../vendor/m684.ts";
import {we} from "../../vendor/m455.ts";
import {hn} from "../../vendor/m251.ts";
// Creates a deferred promise with externally accessible resolve/reject handles
function z7(): {
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
function Twt(): string {
  return xme.join(tr(), "sessions");
}

// Returns the session kind env var if it's a background/daemon kind, else undefined
function uNe(): string | undefined {
  let sessionKind = process.env.CLAUDE_CODE_SESSION_KIND;
  if (sessionKind === "bg" || sessionKind === "daemon" || sessionKind === "daemon-worker") return sessionKind;
  return;
}

// Returns true if this is a background (bg) session
function _i(): boolean {
  return uNe() === "bg";
}

// Returns true if the background backend is set to "daemon" mode
function ndn(): boolean {
  return process.env.CLAUDE_BG_BACKEND === "daemon";
}

// Removes the fleet-view heartbeat file from the sessions directory
async function J$s(): Promise<void> {
  try {
    await VB.unlink(xme.join(Twt(), Y$s));
  } catch {}
}

// Checks if the heartbeat file exists and was modified recently (within SOu ms), with 1s cache
function rdn(): boolean {
  let nowMs = Date.now();
  if (Zun && nowMs - Zun.at < 1000) return Zun.value;
  let isAlive = !1;
  try {
    let {
      mtimeMs: mtimeMs
    } = tdn.statSync(xme.join(Twt(), Y$s));
    isAlive = nowMs - mtimeMs < SOu;
  } catch (statErr) {
    if (!Pn(statErr)) logForDebugging(`[concurrentSessions] heartbeat stat failed: ${Se(statErr)}`);
  }
  return Zun = {
    at: nowMs,
    value: isAlive
  }, isAlive;
}

// Registers the current process as a session by writing a PID JSON file; returns true on success
async function X$s(): Promise<boolean> {
  if (getAgentId() != null || isNestedInteractiveClaudeSession()) return !1;
  let deferred = z7();
  exr = deferred.promise;
  let sessionKind = uNe() ?? "interactive",
    sessionsDir = Twt(),
    pidFilePath = xme.join(sessionsDir, `${process.pid}.json`);
  process.on("exit", () => {
    try {
      tdn.unlinkSync(pidFilePath);
    } catch {}
  }), Gi(async () => {
    try {
      await VB.unlink(pidFilePath);
    } catch {}
  });
  try {
    return await VB.mkdir(sessionsDir, {
      recursive: !0,
      mode: 448
    }), await VB.chmod(sessionsDir, 448), await VB.writeFile(pidFilePath, Le({
      pid: process.pid,
      sessionId: getSessionId(),
      cwd: getOriginalCwd(),
      startedAt: Date.now(),
      procStart: await getProcessStartTimeAsync(process.pid),
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION,
      peerProtocol: yOu,
      kind: sessionKind,
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT,
      ...void 0,
      ...{},
      ...{
        name: process.env.CLAUDE_CODE_SESSION_NAME,
        logPath: process.env.CLAUDE_CODE_SESSION_LOG,
        agent: process.env.CLAUDE_CODE_AGENT,
        jobId: sessionKind === "bg" && process.env.CLAUDE_JOB_DIR ? xme.basename(process.env.CLAUDE_JOB_DIR) : void 0
      }
    })), onSessionSwitch(newSessionId => {
      ywt({
        sessionId: newSessionId
      });
    }), onOriginalCwdChange(newCwd => {
      ywt({
        cwd: newCwd
      });
    }), !0;
  } catch (writeErr) {
    return logForDebugging(`[concurrentSessions] register failed: ${Se(writeErr)}`), !1;
  } finally {
    deferred.resolve();
  }
}

// Updates fields in the current process's PID JSON file, chaining on the previous write promise
async function ywt(updates: any): Promise<void> {
  let pidFilePath = xme.join(Twt(), `${process.pid}.json`),
    writeChain = exr.then(async () => {
      try {
        let existingData = qt(await VB.readFile(pidFilePath, "utf8"));
        await VB.writeFile(pidFilePath, Le({
          ...existingData,
          ...updates
        }));
      } catch (readErr) {
        logForDebugging(`[concurrentSessions] updatePidFile failed: ${Se(readErr)}`);
      }
    });
  exr = writeChain, await writeChain;
}

// Updates the session name and updatedAt timestamp in the PID file
async function Y7(sessionName: string | undefined): Promise<void> {
  if (!sessionName) return;
  await ywt({
    name: sessionName,
    updatedAt: Date.now()
  });
}

// Updates the bridge session ID in the PID file
async function Q$s(bridgeSessionId: any): Promise<void> {
  await ywt({
    bridgeSessionId: bridgeSessionId
  });
}

// Updates status fields in the PID file, also recording statusUpdatedAt when status changes
async function odn(statusUpdate: any): Promise<void> {
  let nowMs = Date.now();
  await ywt({
    ...statusUpdate,
    updatedAt: nowMs,
    ...(statusUpdate.status !== void 0 && {
      statusUpdatedAt: nowMs
    })
  });
}

// Scans sessions directory, counts live sessions, cleans up dead PID files, logs unclean exits
async function Swt(): Promise<number> {
  let sessionsDir = Twt(),
    pidFiles;
  try {
    pidFiles = await VB.readdir(sessionsDir);
  } catch (readdirErr) {
    if (!ds(readdirErr)) logForDebugging(`[concurrentSessions] readdir failed: ${Se(readdirErr)}`);
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
    if (isProcessRunning(pid)) liveCount++;else if (zt() !== "wsl") {
      let fullPath = xme.join(sessionsDir, pidFile),
        parsedSession = ZRr ? null : await VB.readFile(fullPath, "utf8").then(contents => TOu().safeParse(qt(contents))).catch(() => null);
      if ((await VB.unlink(fullPath).then(() => !0, () => !1)) && parsedSession?.success && parsedSession.data.kind === "interactive") z$s.push(parsedSession.data), logForDebugging(`Prior session exited uncleanly: ${parsedSession.data.sessionId} (v${parsedSession.data.version ?? "?"})`), logEvent("tengu_unclean_exit", {
        session_age_sec: Math.round((Date.now() - parsedSession.data.startedAt) / 1000),
        prior_version: parsedSession.data.version ?? "unknown",
        on_current_version: parsedSession.data.version === {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.VERSION,
        prior_session_id: Br(parsedSession.data.sessionId)
      });
    }
  }
  if (!ZRr) z$s.sort((a, b) => b.startedAt - a.startedAt), ZRr = !0;
  return liveCount;
}

// Module-level variables: fs, fs/promises, path, session schema validator, unclean-exit list, flags, constants, cache, promise chain
var tdn: any,
  VB: any,
  xme: any,
  yOu = 1,
  TOu: any,
  z$s: any[],
  ZRr = !1,
  Y$s = ".fleetview-heartbeat",
  SOu = 5000,
  Zun: any,
  exr: Promise<any>;
var hp = b(() => {
  iv();
  lt();
  Ct();
  WS();
  ReactHooks();
  qe();
  sn();
  bt();
  oa();
  rE();
  qs();
  Xt();
  Am();
  tdn = require("fs"), VB = require("fs/promises"), xme = require("path"), TOu = we(() => hn.object({
    pid: hn.number(),
    sessionId: hn.string(),
    cwd: hn.string().optional(),
    startedAt: hn.number(),
    version: hn.string().optional(),
    kind: hn.enum(["interactive", "bg", "daemon", "daemon-worker"])
  })), z$s = [];
  exr = Promise.resolve();
});
export {z7,Twt,uNe,_i,ndn,J$s,rdn,X$s,ywt,Y7,Q$s,odn,Swt,tdn,VB,xme,yOu,TOu,z$s,ZRr,Y$s,SOu,Zun,exr,hp};
