// @ts-nocheck
import {mue,aJ,CL} from "../../vendor/m4609.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Bo,Le} from "../../vendor/m5.ts";
import {kVt,jDo} from "../../vendor/m5149.ts";
import {isNonMainSubagent as EZ,n2e,MF,Hve,LF,nS} from "../config/2351_nS.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {p4r,m4r} from "../config/2355_kind.ts";
import {JM,r4,itt,pz,n4,mz} from "../../vendor/m2349.ts";
import {Qqr,f2e} from "../config/2431_f2e.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {bgSupervisorNoun as wy,daemonHint as Yse,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {O8,Mk,yE,dO} from "../../vendor/m2278.ts";
import {WEn,hg} from "../../vendor/m2280.ts";
import {W0,vve} from "../../vendor/m2296.ts";
import {AT,fue} from "../../vendor/m4610.ts";
import {zd,dpl,bL,NG} from "../../vendor/m4515.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {Ne} from "../../vendor/m583.ts";
import {o4r,Ive} from "../config/2352_useDecayCurve.ts";
import {lw,a4} from "../../vendor/m2436.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {iAi,cZ} from "../../vendor/m2273.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
function bufferMatchesAt(haystack, at, needle) {
  return haystack.length - at >= needle.length && haystack.compare(needle, 0, needle.length, at, at + needle.length) === 0;
}
function sharedSuffixPrefixLength(buf, pattern) {
  let maxLen = Math.min(buf.length, pattern.length - 1);
  e: for (let len = maxLen; len > 0; len--) {
    let start = buf.length - len;
    for (let k = 0; k < len; k++) if (buf[start + k] !== pattern[k]) continue e;
    return len;
  }
  return 0;
}
function waitForDetach(stream) {
  let done = false,
    escaped = false,
    resolveDetach,
    detachPromise = new Promise(resolve => {
      resolveDetach = resolve;
    }),
    onReadable = () => {
      if (done) return;
      let chunk;
      while ((chunk = stream.read()) !== null) {
        let buf = typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk;
        for (let i = 0; i < buf.length; i++) {
          let byte = buf[i];
          if (escaped) {
            if (escaped = false, byte === DETACH_CHAR) {
              done = true, resolveDetach();
              return;
            }
            continue;
          }
          if (byte === CTRL_Z || byte === CTRL_C || bufferMatchesAt(buf, i, KITTY_Z_LO) || bufferMatchesAt(buf, i, KITTY_Z_HI) || bufferMatchesAt(buf, i, zAm) || bufferMatchesAt(buf, i, jAm)) {
            done = true, resolveDetach();
            return;
          }
          let skip = byte === ESCAPE_BYTE ? 1 : bufferMatchesAt(buf, i, KITTY_B_LO) ? KITTY_B_LO.length : bufferMatchesAt(buf, i, KITTY_B_HI) ? KITTY_B_HI.length : 0;
          if (skip) i += skip - 1, escaped = true;
        }
      }
    };
  if (stream.on("readable", onReadable), "resume" in stream && "pause" in stream) stream.resume(), stream.pause();
  return onReadable(), {
    promise: detachPromise,
    cancel: () => {
      done = true, stream.removeListener("readable", onReadable);
    }
  };
}
async function attachToBackgroundSession(shortId, opts = {}) {
  let stdin = opts.stdin ?? process.stdin,
    stdout = opts.stdout ?? process.stdout,
    initialCols = "columns" in stdout ? stdout.columns || 120 : 120,
    initialRows = "rows" in stdout ? stdout.rows || 30 : 30,
    cols = initialCols,
    rows = initialRows,
    attachId = L2l.randomUUID(),
    auth = await mue(),
    startedAt = Date.now(),
    ackMs,
    via,
    tempo,
    state,
    firstFrameReported = false;
  function reportFirstFrame() {
    if (firstFrameReported) return;
    firstFrameReported = true, W("tengu_bg_attach_first_frame", {
      ms: Date.now() - startedAt,
      ack_ms: ackMs,
      via: Bo(via),
      tempo: Bo(tempo),
      state: state
    });
  }
  let resolveOutcome,
    outcomePromise = new Promise(resolve => {
      resolveOutcome = resolve;
    }),
    finished = false,
    gotAck = false,
    inEscape = false,
    altRedrawTimer,
    lastCols = initialCols,
    lastRows = initialRows,
    screen = kVt(),
    cursorRestore = EZ(),
    isWindows = Yt() === "windows" && !p4r(),
    keepRaw = opts.holdScreenOnDisconnect && Yt() === "windows" ? true : "isRaw" in stdin ? Boolean(stdin.isRaw) : false,
    platformIsWindows = Yt() === "windows",
    altEnterBuf = Buffer.from(JM, "ascii"),
    altExitBuf = Buffer.from(r4, "ascii"),
    tracksAltScreen = platformIsWindows && Qqr(),
    inAltScreen = false,
    altRedrawTimer_2,
    socket;
  try {
    socket = M2l.connect(aJ());
  } catch (err) {
    return {
      outcome: "error",
      msg: Ce(err)
    };
  }
  socket.setTimeout(1e4, () => {
    if (!gotAck) finish("error", `${wy()} did not respond \u2014 it may be stalled${Yse("restart")}`);
  });
  function finish(outcome, msg) {
    if (finished) return;
    if (finished = true, clearTimeout(altRedrawTimer_2), W("tengu_bg_attach_outcome", {
      outcome: Le(outcome),
      got_ack: gotAck,
      got_first_frame: firstFrameReported,
      ms: Date.now() - startedAt,
      via: Bo(via),
      tempo: Bo(tempo)
    }), gotAck) {
      let keepScreen = opts.alreadyInAlt || outcome === "disconnected" && opts.holdScreenOnDisconnect;
      stdout.write(itt + screen.snapshot().map(pz).reverse().join("") + JM + (Yt() === "windows" ? YAm : "") + "\x1B[0m\x1B7" + O8 + "\x1B8" + (n2e() ? WEn : "") + (keepScreen ? "" : MF()));
    }
    if (!keepRaw) W0(stdin, false);
    if (stdin.removeListener("readable", onStdinReadable), stdin.removeListener("end", onStdinEnd), "removeListener" in stdout) stdout.removeListener("resize", onResize);
    clearTimeout(altRedrawTimer), socket.destroy(), resolveOutcome({
      outcome: outcome,
      msg: msg
    });
  }
  function onResize() {
    if (finished) return;
    if (altRedrawTimer === undefined) lastCols = cols, lastRows = rows;
    cols = "columns" in stdout ? stdout.columns || initialCols : initialCols, rows = "rows" in stdout ? stdout.rows || initialRows : initialRows, clearTimeout(altRedrawTimer), altRedrawTimer = setTimeout(() => {
      if (altRedrawTimer = undefined, finished) return;
      if (cols < lastCols || rows < lastRows) stdout.write(Mk + yE);
      AT({
        proto: zd,
        op: "resize",
        short: shortId,
        cols: cols,
        rows: rows,
        attachId: attachId
      });
    }, 50);
  }
  function forwardStdin(data) {
    if (finished) return;
    let buf = typeof data === "string" ? Buffer.from(data, "utf8") : data,
      flushStart = 0;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      if (inEscape) {
        if (inEscape = false, i > flushStart) socket.write(buf.subarray(flushStart, i));
        if (byte === DETACH_CHAR) return finish("detached");
        socket.write(Buffer.from([ESCAPE_BYTE, byte])), flushStart = i + 1;
        continue;
      }
      if (byte === CTRL_Z || bufferMatchesAt(buf, i, KITTY_Z_LO) || bufferMatchesAt(buf, i, KITTY_Z_HI)) {
        if (i > flushStart) socket.write(buf.subarray(flushStart, i));
        return finish("detached");
      }
      if (isWindows && byte === BACKSPACE) {
        if (i > flushStart) socket.write(buf.subarray(flushStart, i));
        socket.write(VAm), flushStart = i + 1;
        continue;
      }
      let skip = byte === ESCAPE_BYTE ? 1 : bufferMatchesAt(buf, i, KITTY_B_LO) ? KITTY_B_LO.length : bufferMatchesAt(buf, i, KITTY_B_HI) ? KITTY_B_HI.length : 0;
      if (skip) {
        if (i > flushStart) socket.write(buf.subarray(flushStart, i));
        i += skip - 1, flushStart = i + 1, inEscape = true;
      }
    }
    if (flushStart < buf.length) socket.write(buf.subarray(flushStart));
  }
  function onStdinReadable() {
    let data;
    while ((data = stdin.read()) !== null) forwardStdin(data);
  }
  function onStdinEnd() {
    finish("detached");
  }
  let dataResidual = wJ,
    ackResidual = wJ,
    altResidual = wJ,
    modeResidual = wJ;
  function stripAltSequences(data) {
    if (!platformIsWindows) return data;
    let hasResidual = altResidual.length > 0,
      buf = hasResidual ? Buffer.concat([altResidual, data]) : data;
    if (hasResidual) altResidual = wJ;
    if (tracksAltScreen) {
      let lastEnter = buf.lastIndexOf(altEnterBuf),
        lastExit = buf.lastIndexOf(altExitBuf);
      if (lastEnter !== lastExit) inAltScreen = lastEnter > lastExit;
    }
    let idx = buf.indexOf(altEnterBuf);
    if (idx < 0) {
      let tail = sharedSuffixPrefixLength(buf, altEnterBuf);
      if (tail === 0) return buf;
      return altResidual = Buffer.from(buf.subarray(buf.length - tail)), buf.subarray(0, buf.length - tail);
    }
    let parts = [],
      segStart = 0,
      pos = idx;
    for (;;) {
      if (pos > segStart) parts.push(buf.subarray(segStart, pos));
      if (segStart = pos + altEnterBuf.length, pos = buf.indexOf(altEnterBuf, segStart), pos < 0) break;
    }
    let rest = buf.subarray(segStart),
      restTail = sharedSuffixPrefixLength(rest, altEnterBuf);
    if (restTail > 0) altResidual = Buffer.from(rest.subarray(rest.length - restTail));
    if (rest.length > restTail) parts.push(rest.subarray(0, rest.length - restTail));
    if (parts.length === 0) return wJ;
    if (parts.length === 1) return parts[0];
    return Buffer.concat(parts);
  }
  function stripModeSequences(data) {
    let hasResidual = modeResidual.length > 0,
      buf = hasResidual ? Buffer.concat([modeResidual, data]) : data;
    if (hasResidual) modeResidual = wJ;
    let idx = buf.indexOf(HVt);
    if (idx < 0) {
      let tail = sharedSuffixPrefixLength(buf, HVt);
      if (tail === 0) return buf;
      return modeResidual = Buffer.from(buf.subarray(buf.length - tail)), buf.subarray(0, buf.length - tail);
    }
    let parts = [],
      segStart = 0,
      pos = idx;
    while (pos >= 0) {
      let after = pos + HVt.length;
      if (after >= buf.length) {
        if (pos > segStart) parts.push(buf.subarray(segStart, pos));
        modeResidual = Buffer.from(buf.subarray(pos)), segStart = buf.length;
        break;
      }
      let suffixByte = buf[after];
      if (suffixByte === 104 || suffixByte === 108) {
        if (pos > segStart) parts.push(buf.subarray(segStart, pos));
        segStart = after + 1;
      }
      pos = buf.indexOf(HVt, Math.max(segStart, pos + 1));
    }
    if (segStart < buf.length) {
      let rest = buf.subarray(segStart),
        restTail = sharedSuffixPrefixLength(rest, HVt);
      if (restTail > 0) modeResidual = Buffer.from(rest.subarray(rest.length - restTail));
      if (rest.length > restTail) parts.push(rest.subarray(0, rest.length - restTail));
    }
    if (parts.length === 0) return wJ;
    if (parts.length === 1) return parts[0];
    return Buffer.concat(parts);
  }
  let pendingExitAlt = opts.alreadyInAlt && !opts.holdingFrame;
  function writeFrame(data) {
    if (pendingExitAlt) pendingExitAlt = false, stdout.write(Mk + yE);
    stdout.write(data), screen.feed(data.toString("latin1"), code => {
      if (code === 1004 && cursorRestore) stdout.write(cursorRestore);
    }), reportFirstFrame();
  }
  function onFrameData(data) {
    if (finished) return;
    let buf = ackResidual.length > 0 ? Buffer.concat([ackResidual, data]) : data,
      detachIdx = buf.indexOf(P2l);
    if (detachIdx >= 0) {
      let head = buf.subarray(0, detachIdx);
      if (detachIdx > 0) {
        let cleaned = stripModeSequences(stripAltSequences(head));
        if (cleaned.length > 0) writeFrame(cleaned);
      }
      return ackResidual = wJ, altResidual = wJ, modeResidual = wJ, finish("detached", dpl(head));
    }
    let tail = sharedSuffixPrefixLength(buf, P2l);
    if (buf.length > tail) {
      let head = buf.subarray(0, buf.length - tail),
        cleaned = stripModeSequences(stripAltSequences(head));
      if (cleaned.length > 0) writeFrame(cleaned);
    }
    if (ackResidual = tail > 0 ? Buffer.from(buf.subarray(buf.length - tail)) : wJ, tracksAltScreen) clearTimeout(altRedrawTimer_2), altRedrawTimer_2 = setTimeout(() => {
      if (!finished && inAltScreen) stdout.write(JM);
    }, JAm);
  }
  return socket.on("data", data => {
    if (finished) return;
    if (gotAck) {
      onFrameData(data);
      return;
    }
    dataResidual = Buffer.concat([dataResidual, data]);
    let newlineIdx = dataResidual.indexOf(10);
    if (newlineIdx < 0) return;
    let ackLine = dataResidual.subarray(0, newlineIdx).toString("utf8"),
      remainder = dataResidual.subarray(newlineIdx + 1),
      ack;
    try {
      ack = qt(ackLine);
    } catch (err) {
      return finish("error", `bad ack: ${Ce(err)}`);
    }
    if (!ack.ok) return finish("error", `${ack.code}: ${ack.error}`);
    if (gotAck = true, socket.setTimeout(0), ackMs = Date.now() - startedAt, via = ack.op === "attach" ? ack.via : undefined, tempo = ack.op === "attach" ? ack.tempo : undefined, state = ack.op === "attach" ? ack.state : undefined, process.env.TMUX && !O2l) O2l = true, Fn("tmux", ["set", "-as", "terminal-features", ",*:RGB"]);
    let decModes = ((ack.op === "attach" ? ack.decModes : undefined) ?? []).map(n4).join("");
    if (screen.feed(decModes), stdout.write(opts.alreadyInAlt ? r4 + EZ() + decModes : Hve() + decModes + (platformIsWindows ? r4 : "") + `
  \x1B[2mAttaching\u2026\x1B[0m
`), "ref" in stdin) stdin.ref();
    if (W0(stdin, true), "on" in stdout) stdout.on("resize", onResize);
    if (stdin.on("readable", onStdinReadable), "resume" in stdin && "pause" in stdin) stdin.resume(), stdin.pause();
    if (stdin.once("end", onStdinEnd), onStdinReadable(), remainder.length) onFrameData(remainder);
  }), socket.on("error", err => finish("error", Ce(err))), socket.once("close", () => {
    if (!finished) finish(gotAck ? "disconnected" : "error", "control socket closed");
  }), socket.once("connect", () => {
    socket.write(Pe({
      proto: zd,
      op: "attach",
      short: shortId,
      auth: auth,
      cols: initialCols,
      rows: initialRows,
      attachId: attachId,
      caps: XAm(),
      ...(opts.holdingFrame && {
        holdingFrame: true
      })
    }) + `
`);
  }), outcomePromise;
}
function XAm() {
  return {
    terminal: Ne.terminal,
    mux: process.env.TMUX ? "tmux" : process.env.ZELLIJ != null ? "zellij" : process.env.STY ? "screen" : null,
    ssh: Ne.isSSH(),
    wheelFlood: o4r(),
    hyperlinks: lw(),
    progressReporting: n2e(),
    wtSession: !!process.env.WT_SESSION,
    isVscodeTerm: process.env.TERM_PROGRAM === "vscode",
    browser: process.env.BROWSER ?? null,
    colorLevel: bt.level,
    syncOutput: LF(),
    editor: process.env.VISUAL?.trim() || process.env.EDITOR?.trim() || null,
    systemTheme: iAi()
  };
}
var L2l,
  M2l,
  ESCAPE_BYTE = 2,
  CTRL_Z = 26,
  DETACH_CHAR = 100,
  BACKSPACE = 8,
  VAm,
  KITTY_B_LO,
  KITTY_B_HI,
  KITTY_Z_LO,
  KITTY_Z_HI,
  CTRL_C = 3,
  zAm,
  jAm,
  P2l,
  HVt,
  YAm = "\x1B[?9001l",
  JAm = 100,
  wJ,
  O2l = false;
var JDo = b(() => {
  Gc();
  fC();
  m4r();
  Ive();
  a4();
  nS();
  dO();
  mz();
  hg();
  kt();
  Ir();
  Ct();
  Ii();
  f2e();
  Es();
  vve();
  tn();
  cZ();
  fue();
  jDo();
  CL();
  bL();
  L2l = require("crypto"), M2l = require("net"), VAm = Buffer.from([127]), KITTY_B_LO = Buffer.from("\x1B[98;5u", "latin1"), KITTY_B_HI = Buffer.from("\x1B[27;5;98~", "latin1"), KITTY_Z_LO = Buffer.from("\x1B[122;5u", "latin1"), KITTY_Z_HI = Buffer.from("\x1B[27;5;122~", "latin1"), zAm = Buffer.from("\x1B[99;5u", "latin1"), jAm = Buffer.from("\x1B[27;5;99~", "latin1"), P2l = Buffer.from(NG, "ascii"), HVt = Buffer.from("\x1B[?9001", "ascii");
  wJ = Buffer.alloc(0);
});

export {bufferMatchesAt as Vue,sharedSuffixPrefixLength as IVt,waitForDetach as $2l,attachToBackgroundSession as kJ,XAm,L2l,M2l,ESCAPE_BYTE as YDo,CTRL_Z as N2l,DETACH_CHAR as F2l,BACKSPACE as GAm,VAm,KITTY_B_LO as OJn,KITTY_B_HI as LJn,KITTY_Z_LO as B2l,KITTY_Z_HI as U2l,CTRL_C as KAm,zAm,jAm,P2l,HVt,YAm,JAm,wJ,O2l,JDo};
