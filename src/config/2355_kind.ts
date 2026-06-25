// @ts-nocheck
import {nt,Za} from "../../vendor/m127.ts";
import {getAttacherCaps as Ey,lt} from "../session/0132_sent.ts";
import {xve,iPt} from "../../vendor/m2353.ts";
import {EAi,CAi,yve,VUe,dO} from "../../vendor/m2278.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
// @ts-nocheck
function makePasteKeyEvent(pastedText) {
  return {
    kind: "key",
    name: "",
    fn: false,
    ctrl: false,
    meta: false,
    shift: false,
    option: false,
    super: false,
    sequence: pastedText,
    raw: pastedText,
    isPasted: true
  };
}
function parseTerminalResponse(seq) {
  if (seq.startsWith("\x1B[")) {
    let match;
    if (match = bhd.exec(seq)) return {
      type: "decrpm",
      mode: parseInt(match[1], 10),
      status: parseInt(match[2], 10)
    };
    if (match = Ehd.exec(seq)) return {
      type: "da1",
      params: parseParamList(match[1])
    };
    if (match = Chd.exec(seq)) return {
      type: "da2",
      params: parseParamList(match[1])
    };
    if (match = Ahd.exec(seq)) return {
      type: "kittyKeyboard",
      flags: parseInt(match[1], 10)
    };
    if (match = Rhd.exec(seq)) return {
      type: "cursorPosition",
      row: parseInt(match[1], 10),
      col: parseInt(match[2], 10)
    };
    if (match = vhd.exec(seq)) return {
      type: "themeNotify",
      dark: match[1] === "1"
    };
    return null;
  }
  if (seq.startsWith("\x1B]")) {
    let match = whd.exec(seq);
    if (match) return {
      type: "osc",
      code: parseInt(match[1], 10),
      data: match[2]
    };
  }
  if (seq.startsWith("\x1BP")) {
    let match = khd.exec(seq);
    if (match) return {
      type: "xtversion",
      name: match[1]
    };
  }
  return null;
}
function parseParamList(paramStr) {
  if (!paramStr) return [];
  return paramStr.split(";").map(p => parseInt(p, 10));
}
function bsAsCtrlBackspace(platform, env) {
  let envVal = env.CLAUDE_CODE_BS_AS_CTRL_BACKSPACE;
  if (nt(envVal)) return true;
  if (Za(envVal)) return false;
  return platform === "win32" && env.TERM_PROGRAM !== "mintty" && env.TERM !== "cygwin";
}
function isBsCtrlBackspace() {
  return bsAsCtrlBackspace("darwin", process.env);
}
function normaliseChunk(env, defaultEnabled) {
  let envVal = env.CLAUDE_CODE_ALTGR_AS_TEXT;
  if (nt(envVal)) return "force";
  if (Za(envVal)) return "off";
  return defaultEnabled ?? !!env.WT_SESSION ? "auto" : "off";
}
function parseInput() {
  return normaliseChunk(process.env, Ey()?.wtSession);
}
function decodeModifiers(codepoint) {
  return codepoint > 32 && codepoint < 127 || codepoint >= 160 && codepoint < 55296;
}
function codepointToKeyName(codepoint) {
  return codepoint >= 48 && codepoint <= 57 || codepoint >= 65 && codepoint <= 90 || codepoint >= 97 && codepoint <= 122;
}
function decodePasteCodepoint(seq, codepoint, shift) {
  return {
    kind: "key",
    name: String.fromCodePoint(codepoint),
    fn: false,
    ctrl: false,
    meta: false,
    shift: shift,
    option: false,
    super: false,
    sequence: seq,
    raw: seq,
    isPasted: false
  };
}
function isMouseOrFocusSequence(modifiers, codepoint) {
  if (!(modifiers.ctrl && modifiers.meta) || modifiers.super) return false;
  if (!decodeModifiers(codepoint)) return false;
  let mode = parseInput();
  if (mode === "off") return false;
  return mode === "force" || !codepointToKeyName(codepoint);
}
function parseSgrMouseEvent(chunk) {
  if (lPt.Buffer.isBuffer(chunk)) {
    if (chunk[0] > 127 && chunk[1] === undefined) return chunk[0] -= 128, "\x1B" + String(chunk);else return String(chunk);
  } else if (chunk !== undefined && typeof chunk !== "string") return String(chunk);else if (!chunk) return "";else return chunk;
}
function buildKeyEvent(state, chunk = "") {
  let isFlush = chunk === null,
    input = isFlush ? "" : parseSgrMouseEvent(chunk),
    tokenizer = state._tokenizer ?? xve({
      x10Mouse: true
    }),
    tokens = isFlush ? tokenizer.flush() : tokenizer.feed(input),
    events = [],
    inPaste = state.mode === "IN_PASTE",
    pasteBuffer = state.pasteBuffer,
    pendingBytes = state.pendingByteEvents;
  function emitByte(byteEvent) {
    if (inPaste) pasteBuffer += String.fromCharCode(byteEvent.byte);else events.push(aPt(byteEvent.seq));
  }
  function flushPending() {
    for (let pending of pendingBytes) emitByte(pending);
    pendingBytes = [];
  }
  function pushByte(seq, byte) {
    if (pendingBytes.length === 0) {
      if (byte >= 194 && byte <= 244) {
        pendingBytes = [{
          seq: seq,
          byte: byte
        }];
        return;
      }
      emitByte({
        seq: seq,
        byte: byte
      });
      return;
    }
    if (byte >= 128 && byte <= 191) {
      pendingBytes = [...pendingBytes, {
        seq: seq,
        byte: byte
      }];
      let leadByte = pendingBytes[0].byte,
        expectedLen = leadByte <= 223 ? 2 : leadByte <= 239 ? 3 : 4;
      if (pendingBytes.length < expectedLen) return;
      let collected = pendingBytes;
      pendingBytes = [];
      let decoded = lPt.Buffer.from(collected.map(b_2 => b_2.byte)).toString("utf8");
      if ([...decoded].length !== 1 || lPt.Buffer.byteLength(decoded, "utf8") !== collected.length) for (let b_2 of collected) emitByte(b_2);else if (inPaste) pasteBuffer += decoded;else events.push(aPt(decoded));
      return;
    }
    flushPending(), pushByte(seq, byte);
  }
  for (let token of tokens) if (token.type === "sequence") {
    if (token.value === EAi) flushPending(), inPaste = true, pasteBuffer = "";else if (token.value === CAi) flushPending(), events.push(makePasteKeyEvent(pasteBuffer)), inPaste = false, pasteBuffer = "";else if (inPaste) {
      if (Rki(token.value)) continue;
      let h = Cki(token.value);
      if (h !== undefined) {
        pushByte(token.value, h);
        continue;
      }
      if (!parseTerminalResponse(token.value) && !Aki.test(token.value)) flushPending();
      pasteBuffer += Fhd(token.value);
    } else {
      let h = Cki(token.value);
      if (h !== undefined) {
        pushByte(token.value, h);
        continue;
      }
      let g = parseTerminalResponse(token.value);
      if (g) {
        events.push({
          kind: "response",
          sequence: token.value,
          response: g
        });
        continue;
      }
      let _ = vki(token.value);
      if (_) {
        events.push(_);
        continue;
      }
      if (token.value === yve || !Rki(token.value) && !Aki.test(token.value)) flushPending();
      events.push(aPt(token.value));
    }
  } else if (token.type === "text") if (flushPending(), inPaste) pasteBuffer += token.value;else if (/^\[<\d+;\d+;\d+[Mm]$/.test(token.value) || /^\[M[\x60-\x7f][\x20-\uffff]{2}$/.test(token.value)) {
    let seq = "\x1B" + token.value,
      mouseEvent = vki(seq);
    events.push(mouseEvent ?? aPt(seq));
  } else events.push(aPt(token.value));
  if (isFlush) flushPending();
  if (isFlush && inPaste) {
    if (pasteBuffer) events.push(makePasteKeyEvent(pasteBuffer));
    inPaste = false, pasteBuffer = "";
  }
  let nextState = {
    mode: inPaste ? "IN_PASTE" : "NORMAL",
    incomplete: tokenizer.buffer(),
    pasteBuffer: pasteBuffer,
    pendingByteEvents: pendingBytes,
    _tokenizer: tokenizer
  };
  return [events, nextState];
}
function parseMouseWheelEvent(modifierValue) {
  let bits = modifierValue - 1;
  return {
    shift: !!(bits & 1),
    meta: !!(bits & 2),
    ctrl: !!(bits & 4),
    super: !!(bits & 8)
  };
}
function makeSimpleKeyEvent(codepoint) {
  switch (codepoint) {
    case 9:
      return "tab";
    case 13:
      return "return";
    case 27:
      return "escape";
    case 32:
      return "space";
    case 127:
      return "backspace";
    case 57399:
      return "0";
    case 57400:
      return "1";
    case 57401:
      return "2";
    case 57402:
      return "3";
    case 57403:
      return "4";
    case 57404:
      return "5";
    case 57405:
      return "6";
    case 57406:
      return "7";
    case 57407:
      return "8";
    case 57408:
      return "9";
    case 57409:
      return ".";
    case 57410:
      return "/";
    case 57411:
      return "*";
    case 57412:
      return "-";
    case 57413:
      return "+";
    case 57414:
      return "return";
    case 57415:
      return "=";
    case 57416:
      return ",";
    case 57417:
      return "left";
    case 57418:
      return "right";
    case 57419:
      return "up";
    case 57420:
      return "down";
    case 57421:
      return "pageup";
    case 57422:
      return "pagedown";
    case 57423:
      return "home";
    case 57424:
      return "end";
    case 57425:
      return "insert";
    case 57426:
      return "delete";
    default:
      if (codepoint >= 32 && codepoint <= 126) return String.fromCharCode(codepoint).toLowerCase();
      if (codepoint >= 160 && codepoint < 55296) return String.fromCodePoint(codepoint);
      return;
  }
}
function Cki(seq) {
  let codepoint,
    modifier,
    match = c4r.exec(seq);
  if (match) codepoint = parseInt(match[1], 10), modifier = match[2] === undefined ? undefined : parseInt(match[2], 10);else if (match = u4r.exec(seq)) modifier = parseInt(match[1], 10), codepoint = parseInt(match[2], 10);
  if (codepoint === undefined || codepoint < 128 || codepoint > 255) return;
  if (modifier !== undefined && modifier !== 1) return;
  return codepoint;
}
function Fhd(seq) {
  let match = c4r.exec(seq),
    codepoint = match ? parseInt(match[1], 10) : undefined;
  if (codepoint === undefined && (match = u4r.exec(seq))) codepoint = parseInt(match[2], 10);
  if (codepoint !== undefined && codepoint <= 1114111) return String.fromCodePoint(codepoint);
  return seq;
}
function Rki(seq) {
  return seq === VUe || seq === yve || d4r.test(seq) || Bhd.test(seq);
}
function vki(seq) {
  let match = d4r.exec(seq);
  if (!match) return null;
  let button = parseInt(match[1], 10);
  if ((button & 64) !== 0) return null;
  return {
    kind: "mouse",
    button: button,
    action: match[4] === "M" ? "press" : "release",
    col: parseInt(match[2], 10),
    row: parseInt(match[3], 10),
    sequence: seq
  };
}
function aPt(seq = "") {
  let metaMatch,
    event = {
      kind: "key",
      name: "",
      fn: false,
      ctrl: false,
      meta: false,
      shift: false,
      option: false,
      super: false,
      sequence: seq,
      raw: seq,
      isPasted: false
    };
  event.sequence = event.sequence || seq || event.name;
  let match;
  if (match = c4r.exec(seq)) {
    let codepoint = parseInt(match[1], 10),
      modifierValue = match[2] ? parseInt(match[2], 10) : 1,
      modifiers = parseMouseWheelEvent(modifierValue);
    if (isMouseOrFocusSequence(modifiers, codepoint)) return decodePasteCodepoint(seq, codepoint, modifiers.shift);
    return {
      kind: "key",
      name: makeSimpleKeyEvent(codepoint),
      fn: false,
      ctrl: modifiers.ctrl,
      meta: modifiers.meta,
      shift: modifiers.shift,
      option: false,
      super: modifiers.super,
      sequence: seq,
      raw: seq,
      isPasted: false
    };
  }
  if (match = u4r.exec(seq)) {
    let modifiers = parseMouseWheelEvent(parseInt(match[1], 10)),
      codepoint = parseInt(match[2], 10);
    if (isMouseOrFocusSequence(modifiers, codepoint)) return decodePasteCodepoint(seq, codepoint, modifiers.shift);
    return {
      kind: "key",
      name: makeSimpleKeyEvent(codepoint),
      fn: false,
      ctrl: modifiers.ctrl,
      meta: modifiers.meta,
      shift: modifiers.shift,
      option: false,
      super: modifiers.super,
      sequence: seq,
      raw: seq,
      isPasted: false
    };
  }
  if (match = d4r.exec(seq)) {
    let button = parseInt(match[1], 10),
      col = parseInt(match[2], 10),
      row = parseInt(match[3], 10);
    return wki(seq, button, col, row) ?? Dve(seq, "mouse", false);
  }
  if (seq.length === 6 && seq.startsWith("\x1B[M")) {
    let button = seq.charCodeAt(3) - 32,
      col = seq.charCodeAt(4) - 32,
      row = seq.charCodeAt(5) - 32;
    return wki(seq, button, col, row) ?? Dve(seq, "mouse", false);
  }
  if (seq === "\r" || seq === "\x1B\r") event.raw = undefined, event.name = "return", event.meta = seq.length === 2;else if (seq === `
` || seq === `\x1B
`) event.name = "enter", event.meta = seq.length === 2;else if (seq === "\t" || seq === "\x1B\t") event.name = "tab", event.meta = seq.length === 2;else if (seq === "\b" || seq === "\x1B\b") {
    if (event.name = "backspace", event.meta = seq.charAt(0) === "\x1B", isBsCtrlBackspace()) event.ctrl = true;
  } else if (seq === "\x7F" || seq === "\x1B\x7F") event.name = "backspace", event.meta = seq.charAt(0) === "\x1B";else if (seq === "\x1B" || seq === "\x1B\x1B") event.name = "escape", event.meta = seq.length === 2;else if (seq === " " || seq === "\x1B ") event.name = "space", event.meta = seq.length === 2;else if (seq === "\x1C") event.name = "\\", event.ctrl = true;else if (seq === "\x1D") event.name = "]", event.ctrl = true;else if (seq === "\x1E") event.name = "^", event.ctrl = true;else if (seq === "\x1F") event.name = "_", event.ctrl = true;else if (seq <= "\x1A" && seq.length === 1) event.name = String.fromCharCode(seq.charCodeAt(0) + 97 - 1), event.ctrl = true;else if (seq.length === 1 && seq >= "0" && seq <= "9") event.name = "number";else if (seq.length === 1 && seq >= "a" && seq <= "z") event.name = seq;else if (seq.length === 1 && seq >= "A" && seq <= "Z") event.name = seq.toLowerCase(), event.shift = true;else if (metaMatch = Thd.exec(seq)) event.meta = true, event.shift = /^[A-Z]$/.test(metaMatch[1]), event.name = metaMatch[1].toLowerCase();else if (metaMatch = Shd.exec(seq)) {
    let chars = [...seq];
    if (chars[0] === "\x1B" && chars[1] === "\x1B") event.option = true;
    let code = [metaMatch[1], metaMatch[2], metaMatch[4], metaMatch[6]].filter(Boolean).join(""),
      modBits = (metaMatch[3] || metaMatch[5] || 1) - 1;
    event.ctrl = !!(modBits & 4), event.meta = !!(modBits & 2), event.super = !!(modBits & 8), event.shift = !!(modBits & 1), event.code = code, event.name = Lhd[code], event.shift = Mhd(code) || event.shift, event.ctrl = Nhd(code) || event.ctrl;
  }
  if (event.raw === "\x1Bb") event.meta = true, event.name = "left";else if (event.raw === "\x1Bf") event.meta = true, event.name = "right";
  switch (seq) {
    case "\x1B[1~":
      return Dve(seq, "home", false);
    case "\x1B[4~":
      return Dve(seq, "end", false);
    case "\x1B[5~":
      return Dve(seq, "pageup", false);
    case "\x1B[6~":
      return Dve(seq, "pagedown", false);
    case "\x1B[1;5D":
      return Dve(seq, "left", true);
    case "\x1B[1;5C":
      return Dve(seq, "right", true);
  }
  return event;
}
function wki(seq, button, col, row) {
  let wheelBits = button & 67;
  if (wheelBits !== 64 && wheelBits !== 65) return null;
  return {
    kind: "key",
    name: wheelBits === 64 ? "wheelup" : "wheeldown",
    ctrl: (button & 16) !== 0,
    meta: (button & 8) !== 0,
    shift: (button & 4) !== 0,
    option: false,
    super: false,
    fn: false,
    sequence: seq,
    raw: seq,
    isPasted: false,
    col: col,
    row: row
  };
}
function Dve(seq, name, ctrl) {
  return {
    kind: "key",
    name: name,
    ctrl: ctrl,
    meta: false,
    shift: false,
    option: false,
    super: false,
    fn: false,
    sequence: seq,
    raw: seq,
    isPasted: false
  };
}
var lPt,
  Thd,
  Shd,
  c4r,
  u4r,
  bhd,
  Ehd,
  Chd,
  Ahd,
  Rhd,
  vhd,
  whd,
  khd,
  d4r,
  kki,
  Lhd,
  Mhd = code => ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(code),
  Nhd = code => ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(code),
  Bhd,
  Aki;
var m4r = b(() => {
  lt();
  dn();
  dO();
  iPt();
  lPt = require("buffer"), Thd = /^(?:\x1b)([a-zA-Z0-9])$/, Shd = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/, c4r = /^\x1b\[(\d+)(?:;(\d+))?u/, u4r = /^\x1b\[27;(\d+);(\d+)~/, bhd = /^\x1b\[\?(\d+);(\d+)\$y$/, Ehd = /^\x1b\[\?([\d;]*)c$/, Chd = /^\x1b\[>([\d;]*)c$/, Ahd = /^\x1b\[\?(\d+)u$/, Rhd = /^\x1b\[\?(\d+);(\d+)R$/, vhd = /^\x1b\[\?997;([12])n$/, whd = /^\x1b\](\d+);(.*?)(?:\x07|\x1b\\)$/s, khd = /^\x1bP>\|(.*?)(?:\x07|\x1b\\)$/s, d4r = /^\x1b\[<(\d+);(\d+);(\d+)([Mm])$/;
  kki = {
    mode: "NORMAL",
    incomplete: "",
    pasteBuffer: "",
    pendingByteEvents: []
  };
  Lhd = {
    OP: "f1",
    OQ: "f2",
    OR: "f3",
    OS: "f4",
    Op: "0",
    Oq: "1",
    Or: "2",
    Os: "3",
    Ot: "4",
    Ou: "5",
    Ov: "6",
    Ow: "7",
    Ox: "8",
    Oy: "9",
    Oj: "*",
    Ok: "+",
    Ol: ",",
    Om: "-",
    On: ".",
    Oo: "/",
    OM: "return",
    "[11~": "f1",
    "[12~": "f2",
    "[13~": "f3",
    "[14~": "f4",
    "[[A": "f1",
    "[[B": "f2",
    "[[C": "f3",
    "[[D": "f4",
    "[[E": "f5",
    "[15~": "f5",
    "[17~": "f6",
    "[18~": "f7",
    "[19~": "f8",
    "[20~": "f9",
    "[21~": "f10",
    "[23~": "f11",
    "[24~": "f12",
    "[A": "up",
    "[B": "down",
    "[C": "right",
    "[D": "left",
    "[E": "clear",
    "[F": "end",
    "[H": "home",
    OA: "up",
    OB: "down",
    OC: "right",
    OD: "left",
    OE: "clear",
    OF: "end",
    OH: "home",
    "[1~": "home",
    "[2~": "insert",
    "[3~": "delete",
    "[4~": "end",
    "[5~": "pageup",
    "[6~": "pagedown",
    "[[5~": "pageup",
    "[[6~": "pagedown",
    "[7~": "home",
    "[8~": "end",
    "[a": "up",
    "[b": "down",
    "[c": "right",
    "[d": "left",
    "[e": "clear",
    "[2$": "insert",
    "[3$": "delete",
    "[5$": "pageup",
    "[6$": "pagedown",
    "[7$": "home",
    "[8$": "end",
    Oa: "up",
    Ob: "down",
    Oc: "right",
    Od: "left",
    Oe: "clear",
    "[2^": "insert",
    "[3^": "delete",
    "[5^": "pageup",
    "[6^": "pagedown",
    "[7^": "home",
    "[8^": "end",
    "[Z": "tab"
  };
  Bhd = /^\x1b\[M[\x60-\x7f][\x20-\uffff]{2}$/, Aki = /^\x1b\[M[\x20-\x7f][\x20-\uffff]{2}$/;
});

export {makePasteKeyEvent as gki,parseTerminalResponse as _ki,parseParamList as yki,bsAsCtrlBackspace as Hhd,isBsCtrlBackspace as p4r,normaliseChunk as Ihd,parseInput as xhd,decodeModifiers as Dhd,codepointToKeyName as Phd,decodePasteCodepoint as Tki,isMouseOrFocusSequence as Ski,parseSgrMouseEvent as Ohd,buildKeyEvent as Hki,parseMouseWheelEvent as bki,makeSimpleKeyEvent as Eki,Cki,Fhd,Rki,vki,aPt,wki,Dve,lPt,Thd,Shd,c4r,u4r,bhd,Ehd,Chd,Ahd,Rhd,vhd,whd,khd,d4r,kki,Lhd,Mhd,Nhd,Bhd,Aki,m4r};
