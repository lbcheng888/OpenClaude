// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Ne} from "../../vendor/m583.ts";
import {rft,Jte,oft} from "../../vendor/m4411.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {Pm,Oi,Pnt,Dnt,Id,T4,Pf} from "../agent/2591_level.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "./0230_encoding.ts";
import {yS,WB} from "../../vendor/m4274.ts";
import {GKe,ud} from "../../vendor/m134.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {du,iw} from "../../vendor/m2302.ts";
import {Mk,yE,dO} from "../../vendor/m2278.ts";
import {setAttacherCaps as qir,mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {rvi,N8} from "./2299_level.ts";
import {MEn,cZ} from "../../vendor/m2273.ts";
import {React as Bk,qF} from "../../vendor/m2525.ts";
import {iy,ef} from "../../vendor/m2794.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
function sft(callback) {
  pendingQuestionCallback = callback;
}
function $sl(text) {
  return pendingQuestionCallback?.(text) ?? false;
}
var pendingQuestionCallback = null;
var RWn = {};
ft(RWn, {
  stopRendezvousServer: () => stopRendezvousServer,
  startRendezvousServer: () => startRendezvousServer,
  sendRv: () => sendRv,
  markStartupDialogBlocked: () => markStartupDialogBlocked,
  markReplayNoOp: () => markReplayNoOp,
  disarmStartupWedgeWatchdog: () => disarmStartupWedgeWatchdog,
  clearStartupDialogBlocked: () => clearStartupDialogBlocked
});
function Gsl() {
  if (savedBrowserEnv === undefined) delete process.env.BROWSER;else process.env.BROWSER = savedBrowserEnv;
}
async function startRendezvousServer() {
  let sockPath = Ne.CLAUDE_BG_RENDEZVOUS_SOCK;
  if (!sockPath || rvServer) return;
  savedBrowserEnv = Ne.BROWSER, delete process.env.CLAUDE_BG_RENDEZVOUS_SOCK, rvAuthToken = Ne.CLAUDE_BG_RV_AUTH, delete process.env.CLAUDE_BG_RV_AUTH;
  let tokensPath = Ne.CLAUDE_BG_SOCKET_TOKENS_PATH;
  if (delete process.env.CLAUDE_BG_SOCKET_TOKENS_PATH, tokensPath) {
    let tokens = await rft(tokensPath);
    if (tokens?.rvAuth) rvAuthToken = tokens.rvAuth;
    await nbo.unlink(tokensPath).catch(() => {});
  }
  await nbo.unlink(sockPath).catch(() => {}), rvServer = qsl.createServer(socket => {
    currentSocket?.destroy(), currentSocket = socket, socketAuthenticated = false, IGp().catch(err => {
      if (!In(err)) Pm(err);
    }), socket.on("error", () => socket.destroy()), socket.once("close", () => {
      if (currentSocket === socket) currentSocket = undefined;
    });
    let buffer = "",
      decoder = new Wsl.StringDecoder("utf8");
    socket.on("data", chunk => {
      buffer += decoder.write(chunk);
      let newlineIdx;
      while ((newlineIdx = buffer.indexOf(`
`)) >= 0) {
        let line = buffer.slice(0, newlineIdx);
        if (buffer = buffer.slice(newlineIdx + 1), line) HGp(line);
      }
      if (buffer.length > 1048576) buffer = "", socket.destroy();
    });
  }), rvServer.on("error", err => A(`[bg-rv] server error: ${String(err)}`, {
    level: "warn"
  })), rvServer.listen(sockPath), rvServer.unref(), heartbeatTimer = setInterval(() => sendRv({
    type: "heartbeat"
  }), 30000), heartbeatTimer.unref();
}
function stopRendezvousServer() {
  if (heartbeatTimer) clearInterval(heartbeatTimer), heartbeatTimer = undefined;
  if (clearTimeout(wedgeWatchdogTimer), wedgeWatchdogTimer = undefined, wedgeWatchdogArmed = false, currentSocket?.destroy(), currentSocket = undefined, socketAuthenticated = false, rvAuthToken = undefined, rvServer) Gsl();
  rvServer?.close(), rvServer = undefined;
}
function sendRv(message) {
  if (!currentSocket || currentSocket.destroyed) return false;
  try {
    return currentSocket.write(Pe(message) + `
`), true;
  } catch {
    return false;
  }
}
function HGp(line) {
  let parsed;
  try {
    parsed = qt(line);
  } catch {
    return;
  }
  if (!parsed || typeof parsed !== "object") return;
  if ("role" in parsed) {
    if (rvAuthToken && "auth" in parsed && Jte(parsed.auth, rvAuthToken)) socketAuthenticated = true;
    return;
  }
  let msg = parsed;
  if (rvAuthToken && !socketAuthenticated && msg.type !== "repaint") {
    if (A(`[bg-rv] dropped ${typeof msg.type === "string" ? msg.type : "unknown"} from un-authed connection`, {
      level: "warn"
    }), msg.type === "reply") sendRv({
      type: "reply-rejected"
    });
    return;
  }
  if (msg.type === "shutdown") {
    sendRv({
      type: "shutting-down"
    });
    let bridge = yS(),
      pendingOps = [];
    if (bridge) {
      let lastSeq = bridge.getLastSequenceNum();
      bridge.teardown({
        skipArchive: true
      }).catch(() => {});
      let jobDir = Ne.CLAUDE_JOB_DIR;
      if (jobDir && lastSeq > 0) pendingOps.push(LGp(jobDir, lastSeq).catch(() => {}));
    }
    pendingOps.push(GKe()), Promise.race([Promise.all(pendingOps), Kn(5000)]).finally(() => {
      process.exit(0);
    });
    return;
  }
  if (msg.type === "repaint") {
    if (!du.get(process.stdout)?.forceRedraw({
      flushReact: true
    })) process.stdout.write(Mk + yE + `
  \x1B[2mSession can't redraw right now \u2014 Ctrl+Z to detach\x1B[0m
`);
    sendRv({
      type: "repaint-done"
    });
    return;
  }
  if (msg.type === "attacher-caps") {
    if (qir(msg.caps), rvi(msg.caps?.colorLevel), !msg.caps) Gsl();else if (typeof msg.caps.browser === "string") process.env.BROWSER = msg.caps.browser;else delete process.env.BROWSER;
    if (msg.caps?.systemTheme) MEn(msg.caps.systemTheme);
    return;
  }
  if (msg.type === "reply" && typeof msg.text === "string") {
    if ($sl(msg.text)) {
      A(`[bg-rv] peer reply answered question: ${msg.text.slice(0, 80)}`);
      return;
    }
    let inputMode = Bk(msg.text);
    iy({
      agentId: rs(),
      mode: inputMode,
      value: qF(msg.text),
      priority: "next",
      origin: {
        kind: "human"
      }
    }), A(`[bg-rv] enqueued reply: ${msg.text.slice(0, 80)}`);
  }
}
async function IGp() {
  let jobDir = Ne.CLAUDE_JOB_DIR;
  if (!jobDir) return;
  let connectedSocket = currentSocket;
  for (let checkIdx = 0; !du.has(process.stdout); checkIdx++) {
    if (checkIdx >= 60 || currentSocket !== connectedSocket) return;
    await Kn(500);
  }
  let jobState = await Oi(jobDir);
  if (!jobState) return;
  if (jobState.state === "working" && jobState.detail === Pnt) xGp(jobDir);
  if (!Dnt.includes(jobState.state)) return;
  if (jobState.tempo === "blocked") return;
  await Id(jobDir, {
    ...jobState,
    state: "running",
    tempo: "idle",
    updatedAt: new Date().toISOString()
  }), sendRv({
    type: "state",
    patch: {
      state: "running",
      tempo: "idle"
    }
  });
}
function xGp(jobDir) {
  if (wedgeWatchdogArmed) return;
  clearTimeout(wedgeWatchdogTimer);
  let timeoutMs = Ne.CLAUDE_BG_STARTUP_WEDGE_MS || 45000;
  wedgeWatchdogTimer = setTimeout(OGp, timeoutMs, jobDir), wedgeWatchdogTimer.unref();
}
function disarmStartupWedgeWatchdog() {
  if (rvServer === undefined) return;
  wedgeWatchdogArmed = true, clearTimeout(wedgeWatchdogTimer), wedgeWatchdogTimer = undefined;
}
async function markStartupDialogBlocked(detail) {
  let jobDir = Ne.CLAUDE_JOB_DIR;
  if (!jobDir || wedgeWatchdogArmed) return;
  let jobState = await Oi(jobDir);
  if (!jobState || jobState.tempo === "blocked" && jobState.needs !== T4) return;
  let fullDetail = detail ? `${AWn} (${detail})` : AWn;
  return await Id(jobDir, {
    ...jobState,
    tempo: "blocked",
    detail: fullDetail,
    needs: u5t,
    updatedAt: new Date().toISOString()
  }), sendRv({
    type: "state",
    patch: {
      tempo: "blocked",
      detail: fullDetail,
      needs: u5t
    }
  }), {
    tempo: jobState.tempo,
    needs: jobState.needs,
    detail: jobState.detail
  };
}
async function clearStartupDialogBlocked(restoreState) {
  let jobDir = Ne.CLAUDE_JOB_DIR;
  if (!jobDir) return;
  let jobState = await Oi(jobDir);
  if (!jobState || jobState.tempo !== "blocked" || jobState.needs !== u5t) return;
  await Id(jobDir, {
    ...jobState,
    ...restoreState,
    updatedAt: new Date().toISOString()
  }), sendRv({
    type: "state",
    patch: {
      tempo: restoreState.tempo,
      needs: restoreState.needs,
      detail: restoreState.detail
    }
  });
}
async function markReplayNoOp() {
  let jobDir = Ne.CLAUDE_JOB_DIR;
  if (!jobDir || Ne.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  let jobState = await Oi(jobDir);
  if (!jobState || jobState.state !== "working" || jobState.tempo !== "active") return;
  await Id(jobDir, {
    ...jobState,
    tempo: "blocked",
    needs: T4,
    updatedAt: new Date().toISOString()
  }), sendRv({
    type: "state",
    patch: {
      tempo: "blocked",
      needs: T4
    }
  });
}
function OGp(jobDir) {
  Oi(jobDir).then(async jobState => {
    if (wedgeWatchdogArmed || jobState?.state !== "working" || jobState.detail !== Pnt || jobState.tempo === "blocked") return;
    await Id(jobDir, {
      ...jobState,
      tempo: "blocked",
      detail: AWn,
      needs: u5t,
      updatedAt: new Date().toISOString()
    }), sendRv({
      type: "state",
      patch: {
        tempo: "blocked",
        detail: AWn,
        needs: u5t
      }
    });
  }).catch(err => {
    if (!In(err)) Pm(err);
  });
}
async function LGp(jobDir, seqNum) {
  let jobState = await Oi(jobDir);
  if (!jobState || jobState.bridgeSessionSeq === seqNum) return;
  await Id(jobDir, {
    ...jobState,
    bridgeSessionSeq: seqNum,
    updatedAt: new Date().toISOString()
  });
}
var nbo,
  qsl,
  Wsl,
  rvServer,
  currentSocket,
  heartbeatTimer,
  wedgeWatchdogTimer,
  wedgeWatchdogArmed = false,
  rvAuthToken,
  socketAuthenticated = false,
  savedBrowserEnv,
  AWn = "stuck on a startup dialog",
  u5t = "open this session to continue setup";
var g8e = b(() => {
  lt();
  lt();
  WB();
  oft();
  N8();
  iw();
  dO();
  ud();
  qe();
  Ir();
  Ct();
  ef();
  tn();
  cZ();
  Pf();
  nbo = require("fs/promises"), qsl = require("net"), Wsl = require("string_decoder");
});

export {sft,$sl,pendingQuestionCallback as Usl,RWn,Gsl,startRendezvousServer,stopRendezvousServer,sendRv,HGp,IGp,xGp,disarmStartupWedgeWatchdog,markStartupDialogBlocked,clearStartupDialogBlocked,markReplayNoOp,OGp,LGp,nbo,qsl,Wsl,rvServer as sTe,currentSocket as Xte,heartbeatTimer as c5t,wedgeWatchdogTimer as h8e,wedgeWatchdogArmed as d5t,rvAuthToken as ift,socketAuthenticated as CWn,savedBrowserEnv as rbo,AWn,u5t,g8e};
