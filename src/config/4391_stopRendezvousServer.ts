// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {rpt as Pdt,one as zte,opt as Odt} from "../../vendor/m4389.ts";
import {Pn as Dn,bt as St} from "../../vendor/m195.ts";
import {kA as PA,ma,xet as cet,Ret as aet,Lp as Fp,Q4 as F4,mg as cg} from "../agent/2580_level.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {Le as Oe,qt as Wt,Xt} from "./0228_encoding.ts";
import {ES as AS,EU as mU} from "../../vendor/m4256.ts";
import {JWe as DWe,ReactHooks as Jd} from "../../vendor/m133.ts";
import {sleep as Fn} from "../telemetry/1483_withTimeout.ts";
import {qu as Vu,bk as _k} from "../../vendor/m2291.ts";
import {UH as LH,uC as iC,zO as NO} from "../../vendor/m2268.ts";
import {setAttacherCaps as ktr,mainAgentId as ws,lt as ct} from "../session/0131_sent.ts";
import {zyi as q_i,E5 as s5} from "./2288_level.ts";
import {Ck as Tk,TF as dF} from "../../vendor/m2514.ts";
import {oy,sA as uA} from "../../vendor/m2782.ts";
import {Lr as Or} from "../../vendor/m578.ts";
// @ts-nocheck
function O3_(callback) {
  pendingQuestionCallback = callback;
}
function coK(text) {
  return pendingQuestionCallback?.(text) ?? false;
}
var pendingQuestionCallback = null;
var dp6 = {};
pt(dp6, {
  stopRendezvousServer: () => stopRendezvousServer,
  startRendezvousServer: () => startRendezvousServer,
  sendRv: () => sendRv,
  markStartupDialogBlocked: () => markStartupDialogBlocked,
  markReplayNoOp: () => markReplayNoOp,
  disarmStartupWedgeWatchdog: () => disarmStartupWedgeWatchdog,
  clearStartupDialogBlocked: () => clearStartupDialogBlocked
});
async function startRendezvousServer() {
  let sockPath = Ge.CLAUDE_BG_RENDEZVOUS_SOCK;
  if (!sockPath || rvServer) return;
  delete process.env.CLAUDE_BG_RENDEZVOUS_SOCK, rvAuthToken = Ge.CLAUDE_BG_RV_AUTH, delete process.env.CLAUDE_BG_RV_AUTH;
  let _ = Ge.CLAUDE_BG_SOCKET_TOKENS_PATH;
  if (delete process.env.CLAUDE_BG_SOCKET_TOKENS_PATH, _) {
    let q = await Pdt(_);
    if (q?.rvAuth) rvAuthToken = q.rvAuth;
    await fzq.unlink(_).catch(() => {});
  }
  await fzq.unlink(sockPath).catch(() => {}), rvServer = doK.createServer(q => {
    currentSocket?.destroy(), currentSocket = q, socketAuthenticated = false, onSocketConnected().catch(T => {
      if (!Dn(T)) PA(T);
    }), q.on("error", () => q.destroy()), q.once("close", () => {
      if (currentSocket === q) currentSocket = undefined;
    });
    let K = "",
      O = new loK.StringDecoder("utf8");
    q.on("data", T => {
      K += O.write(T);
      let z;
      while ((z = K.indexOf(`
`)) >= 0) {
        let $ = K.slice(0, z);
        if (K = K.slice(z + 1), $) handleIncomingLine($);
      }
      if (K.length > 1048576) K = "", q.destroy();
    });
  }), rvServer.on("error", q => v(`[bg-rv] server error: ${String(q)}`, {
    level: "warn"
  })), rvServer.listen(sockPath), rvServer.unref(), heartbeatTimer = setInterval(() => sendRv({
    type: "heartbeat"
  }), 30000), heartbeatTimer.unref();
}
function stopRendezvousServer() {
  if (heartbeatTimer) clearInterval(heartbeatTimer), heartbeatTimer = undefined;
  clearTimeout(wedgeWatchdogTimer), wedgeWatchdogTimer = undefined, wedgeWatchdogArmed = false, currentSocket?.destroy(), currentSocket = undefined, socketAuthenticated = false, rvAuthToken = undefined, rvServer?.close(), rvServer = undefined;
}
function sendRv(message) {
  if (!currentSocket || currentSocket.destroyed) return false;
  try {
    return currentSocket.write(Oe(message) + `
`), true;
  } catch {
    return false;
  }
}
function handleIncomingLine(line) {
  let parsed;
  try {
    parsed = Wt(line);
  } catch {
    return;
  }
  if (!parsed || typeof parsed !== "object") return;
  if ("role" in parsed) {
    if (rvAuthToken && "auth" in parsed && zte(parsed.auth, rvAuthToken)) socketAuthenticated = true;
    return;
  }
  let msg = parsed;
  if (rvAuthToken && !socketAuthenticated && msg.type !== "repaint") {
    if (v(`[bg-rv] dropped ${typeof msg.type === "string" ? msg.type : "unknown"} from un-authed connection`, {
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
    let bridge = AS(),
      pendingOps = [];
    if (bridge) {
      let lastSeq = bridge.getLastSequenceNum();
      bridge.teardown({
        skipArchive: true
      }).catch(() => {});
      let jobDir = Ge.CLAUDE_JOB_DIR;
      if (jobDir && lastSeq > 0) pendingOps.push(saveSessionSeq(jobDir, lastSeq).catch(() => {}));
    }
    pendingOps.push(DWe()), Promise.race([Promise.all(pendingOps), Fn(5000)]).finally(() => {
      process.exit(0);
    });
    return;
  }
  if (msg.type === "repaint") {
    if (!Vu.get(process.stdout)?.forceRedraw()) process.stdout.write(LH + iC + `
  \x1B[2mSession can't redraw right now \u2014 Ctrl+Z to detach\x1B[0m
`);
    sendRv({
      type: "repaint-done"
    });
    return;
  }
  if (msg.type === "attacher-caps") {
    ktr(msg.caps), q_i(msg.caps?.colorLevel);
    return;
  }
  if (msg.type === "reply" && typeof msg.text === "string") {
    if (coK(msg.text)) {
      v(`[bg-rv] peer reply answered question: ${msg.text.slice(0, 80)}`);
      return;
    }
    let inputMode = Tk(msg.text);
    oy({
      agentId: ws(),
      mode: inputMode,
      value: dF(msg.text),
      priority: "next",
      origin: {
        kind: "human"
      }
    }), v(`[bg-rv] enqueued reply: ${msg.text.slice(0, 80)}`);
  }
}
async function onSocketConnected() {
  let jobDir = Ge.CLAUDE_JOB_DIR;
  if (!jobDir) return;
  let connectedSocket = currentSocket;
  for (let checkIdx = 0; !Vu.has(process.stdout); checkIdx++) {
    if (checkIdx >= 60 || currentSocket !== connectedSocket) return;
    await Fn(500);
  }
  let jobState = await ma(jobDir);
  if (!jobState) return;
  if (jobState.state === "working" && jobState.detail === cet) armStartupWedgeWatchdog(jobDir);
  if (!aet.includes(jobState.state)) return;
  if (jobState.tempo === "blocked") return;
  await Fp(jobDir, {
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
function armStartupWedgeWatchdog(jobDir) {
  if (wedgeWatchdogArmed) return;
  clearTimeout(wedgeWatchdogTimer);
  let timeoutMs = Ge.CLAUDE_BG_STARTUP_WEDGE_MS || 45000;
  wedgeWatchdogTimer = setTimeout(handleStartupWedgeTimeout, timeoutMs, jobDir), wedgeWatchdogTimer.unref();
}
function disarmStartupWedgeWatchdog() {
  if (rvServer === undefined) return;
  wedgeWatchdogArmed = true, clearTimeout(wedgeWatchdogTimer), wedgeWatchdogTimer = undefined;
}
async function markStartupDialogBlocked(detail) {
  let jobDir = Ge.CLAUDE_JOB_DIR;
  if (!jobDir || wedgeWatchdogArmed) return;
  let jobState = await ma(jobDir);
  if (!jobState || jobState.tempo === "blocked" && jobState.needs !== F4) return;
  let fullDetail = detail ? `${STARTUP_DIALOG_BLOCKED_MESSAGE} (${detail})` : STARTUP_DIALOG_BLOCKED_MESSAGE;
  return await Fp(jobDir, {
    ...jobState,
    tempo: "blocked",
    detail: fullDetail,
    needs: STARTUP_NEEDS_LABEL,
    updatedAt: new Date().toISOString()
  }), sendRv({
    type: "state",
    patch: {
      tempo: "blocked",
      detail: fullDetail,
      needs: STARTUP_NEEDS_LABEL
    }
  }), {
    tempo: jobState.tempo,
    needs: jobState.needs,
    detail: jobState.detail
  };
}
async function clearStartupDialogBlocked(restoreState) {
  let jobDir = Ge.CLAUDE_JOB_DIR;
  if (!jobDir) return;
  let jobState = await ma(jobDir);
  if (!jobState || jobState.tempo !== "blocked" || jobState.needs !== STARTUP_NEEDS_LABEL) return;
  await Fp(jobDir, {
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
  let jobDir = Ge.CLAUDE_JOB_DIR;
  if (!jobDir || Ge.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  let jobState = await ma(jobDir);
  if (!jobState || jobState.state !== "working" || jobState.tempo !== "active") return;
  await Fp(jobDir, {
    ...jobState,
    tempo: "blocked",
    needs: F4,
    updatedAt: new Date().toISOString()
  }), sendRv({
    type: "state",
    patch: {
      tempo: "blocked",
      needs: F4
    }
  });
}
function handleStartupWedgeTimeout(jobDir) {
  ma(jobDir).then(async jobState => {
    if (wedgeWatchdogArmed || jobState?.state !== "working" || jobState.detail !== cet || jobState.tempo === "blocked") return;
    await Fp(jobDir, {
      ...jobState,
      tempo: "blocked",
      detail: STARTUP_DIALOG_BLOCKED_MESSAGE,
      needs: STARTUP_NEEDS_LABEL,
      updatedAt: new Date().toISOString()
    }), sendRv({
      type: "state",
      patch: {
        tempo: "blocked",
        detail: STARTUP_DIALOG_BLOCKED_MESSAGE,
        needs: STARTUP_NEEDS_LABEL
      }
    });
  }).catch(err => {
    if (!Dn(err)) PA(err);
  });
}
async function saveSessionSeq(jobDir, seqNum) {
  let jobState = await ma(jobDir);
  if (!jobState || jobState.bridgeSessionSeq === seqNum) return;
  await Fp(jobDir, {
    ...jobState,
    bridgeSessionSeq: seqNum,
    updatedAt: new Date().toISOString()
  });
}
var fzq,
  doK,
  loK,
  rvServer,
  currentSocket,
  heartbeatTimer,
  wedgeWatchdogTimer,
  wedgeWatchdogArmed = false,
  rvAuthToken,
  socketAuthenticated = false,
  STARTUP_DIALOG_BLOCKED_MESSAGE = "stuck on a startup dialog",
  STARTUP_NEEDS_LABEL = "open this session to continue setup";
var aBH = b(() => {
  ct();
  ct();
  mU();
  Odt();
  s5();
  _k();
  NO();
  Jd();
  je();
  Or();
  St();
  uA();
  Xt();
  cg();
  fzq = require("fs/promises"), doK = require("net"), loK = require("string_decoder");
});

export {O3_ as spt,coK as oZa,pendingQuestionCallback as rZa,dp6 as s6n,startRendezvousServer,stopRendezvousServer,sendRv,handleIncomingLine as K$p,onSocketConnected as z$p,armStartupWedgeWatchdog as Y$p,disarmStartupWedgeWatchdog,markStartupDialogBlocked,clearStartupDialogBlocked,markReplayNoOp,handleStartupWedgeTimeout as Q$p,saveSessionSeq as Z$p,fzq as dho,doK as sZa,loK as iZa,rvServer as k0e,currentSocket as sne,heartbeatTimer as N4t,wedgeWatchdogTimer as q6e,wedgeWatchdogArmed as F4t,rvAuthToken as ipt,socketAuthenticated as r6n,STARTUP_DIALOG_BLOCKED_MESSAGE as o6n,STARTUP_NEEDS_LABEL as B4t,aBH as j6e};
