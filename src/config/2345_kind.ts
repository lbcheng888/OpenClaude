// @ts-nocheck
import {st as rt,_l as hl} from "../../vendor/m5.ts";
import {getAttacherCaps as Ey,lt as ct} from "../session/0131_sent.ts";
import {Vve as Hve,DIt as dIt} from "../../vendor/m2343.ts";
import {A_i as cgi,h_i as ugi,VFe as bFe,KFe as EFe,zO as NO} from "../../vendor/m2268.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "./0047_namespace.ts";
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
    if (match = decrpmRegex.exec(seq)) return {
      type: "decrpm",
      mode: parseInt(match[1], 10),
      status: parseInt(match[2], 10)
    };
    if (match = da1Regex_2.exec(seq)) return {
      type: "da1",
      params: parseParamList(match[1])
    };
    if (match = da2Regex_2.exec(seq)) return {
      type: "da2",
      params: parseParamList(match[1])
    };
    if (match = kittyKeyboardRegex_2.exec(seq)) return {
      type: "kittyKeyboard",
      flags: parseInt(match[1], 10)
    };
    if (match = cursorPositionRegex_2.exec(seq)) return {
      type: "cursorPosition",
      row: parseInt(match[1], 10),
      col: parseInt(match[2], 10)
    };
    if (match = themeNotifyRegex_2.exec(seq)) return {
      type: "themeNotify",
      dark: match[1] === "1"
    };
    return null;
  }
  if (seq.startsWith("\x1B]")) {
    let match = oscRegex.exec(seq);
    if (match) return {
      type: "osc",
      code: parseInt(match[1], 10),
      data: match[2]
    };
  }
  if (seq.startsWith("\x1BP")) {
    let match = xtVersionRegex.exec(seq);
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
  if (rt(envVal)) return true;
  if (hl(envVal)) return false;
  return platform === "win32" && env.TERM_PROGRAM !== "mintty" && env.TERM !== "cygwin";
}
function isBsCtrlBackspace() {
  return bsAsCtrlBackspace("darwin", process.env);
}
function normaliseChunk(chunk, t) {
  let n = chunk.CLAUDE_CODE_ALTGR_AS_TEXT;
  if (rt(n)) return "force";
  if (hl(n)) return "off";
  return t ?? !!chunk.WT_SESSION ? "auto" : "off";
}
function parseInput() {
  return normaliseChunk(process.env, Ey()?.wtSession);
}
function decodeModifiers(modifierValue) {
  return modifierValue > 32 && modifierValue < 127 || modifierValue >= 160 && modifierValue < 55296;
}
function codepointToKeyName(codepoint) {
  return codepoint >= 48 && codepoint <= 57 || codepoint >= 65 && codepoint <= 90 || codepoint >= 97 && codepoint <= 122;
}
function decodePasteCodepoint(seq, t, n) {
  return {
    kind: "key",
    name: String.fromCodePoint(t),
    fn: false,
    ctrl: false,
    meta: false,
    shift: n,
    option: false,
    super: false,
    sequence: seq,
    raw: seq,
    isPasted: false
  };
}
function isMouseOrFocusSequence(seq, t) {
  if (!(seq.ctrl && seq.meta) || seq.super) return false;
  if (!decodeModifiers(t)) return false;
  let n = parseInput();
  if (n === "off") return false;
  return n === "force" || !codepointToKeyName(t);
}
function parseSgrMouseEvent(seq) {
  if (da1Regex.Buffer.isBuffer(seq)) {
    if (seq[0] > 127 && seq[1] === undefined) return seq[0] -= 128, "\x1B" + String(seq);else return String(seq);
  } else if (seq !== undefined && typeof seq !== "string") return String(seq);else if (!seq) return "";else return seq;
}
function buildKeyEvent(e, t = "") {
  let n = t === null,
    r = n ? "" : parseSgrMouseEvent(t),
    o = e._tokenizer ?? Hve({
      x10Mouse: true
    }),
    s = n ? o.flush() : o.feed(r),
    i = [],
    a = e.mode === "IN_PASTE",
    l = e.pasteBuffer;
  for (let u of s) if (u.type === "sequence") {
    if (u.value === cgi) a = true, l = "";else if (u.value === ugi) i.push(makePasteKeyEvent(l)), a = false, l = "";else if (a) {
      if (Und(u.value)) continue;
      l += Bnd(u.value);
    } else {
      let d = parseTerminalResponse(u.value);
      if (d) i.push({
        kind: "response",
        sequence: u.value,
        response: d
      });else {
        let p = aSi(u.value);
        if (p) i.push(p);else i.push(BFr(u.value));
      }
    }
  } else if (u.type === "text") if (a) l += u.value;else if (/^\[<\d+;\d+;\d+[Mm]$/.test(u.value) || /^\[M[\x60-\x7f][\x20-\uffff]{2}$/.test(u.value)) {
    let d = "\x1B" + u.value,
      p = aSi(d);
    i.push(p ?? BFr(d));
  } else i.push(BFr(u.value));
  if (n && a) {
    if (l) i.push(makePasteKeyEvent(l));
    a = false, l = "";
  }
  let c = {
    mode: a ? "IN_PASTE" : "NORMAL",
    incomplete: o.buffer(),
    pasteBuffer: l,
    _tokenizer: o
  };
  return [i, c];
}
function parseMouseWheelEvent(seq) {
  let t = seq - 1;
  return {
    shift: !!(t & 1),
    meta: !!(t & 2),
    ctrl: !!(t & 4),
    super: !!(t & 8)
  };
}
function makeSimpleKeyEvent(seq) {
  switch (seq) {
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
    default:
      if (seq >= 32 && seq <= 126) return String.fromCharCode(seq).toLowerCase();
      if (seq >= 160 && seq < 55296) return String.fromCodePoint(seq);
      return;
  }
}
function Bnd(e) {
  let t = cursorPositionRegex.exec(e),
    n = t ? parseInt(t[1], 10) : undefined;
  if (n === undefined && (t = themeNotifyRegex.exec(e))) n = parseInt(t[2], 10);
  if (n !== undefined && n <= 1114111) return String.fromCodePoint(n);
  return e;
}
function Und(e) {
  return e === bFe || e === EFe || Hv8.test(e) || Fnd.test(e);
}
function aSi(e) {
  let t = Hv8.exec(e);
  if (!t) return null;
  let n = parseInt(t[1], 10);
  if ((n & 64) !== 0) return null;
  return {
    kind: "mouse",
    button: n,
    action: t[4] === "M" ? "press" : "release",
    col: parseInt(t[2], 10),
    row: parseInt(t[3], 10),
    sequence: e
  };
}
function BFr(e = "") {
  let t,
    n = {
      kind: "key",
      name: "",
      fn: false,
      ctrl: false,
      meta: false,
      shift: false,
      option: false,
      super: false,
      sequence: e,
      raw: e,
      isPasted: false
    };
  n.sequence = n.sequence || e || n.name;
  let r;
  if (r = cursorPositionRegex.exec(e)) {
    let o = parseInt(r[1], 10),
      s = r[2] ? parseInt(r[2], 10) : 1,
      i = parseMouseWheelEvent(s);
    if (isMouseOrFocusSequence(i, o)) return decodePasteCodepoint(e, o, i.shift);
    return {
      kind: "key",
      name: makeSimpleKeyEvent(o),
      fn: false,
      ctrl: i.ctrl,
      meta: i.meta,
      shift: i.shift,
      option: false,
      super: i.super,
      sequence: e,
      raw: e,
      isPasted: false
    };
  }
  if (r = themeNotifyRegex.exec(e)) {
    let o = parseMouseWheelEvent(parseInt(r[1], 10)),
      s = parseInt(r[2], 10);
    if (isMouseOrFocusSequence(o, s)) return decodePasteCodepoint(e, s, o.shift);
    return {
      kind: "key",
      name: makeSimpleKeyEvent(s),
      fn: false,
      ctrl: o.ctrl,
      meta: o.meta,
      shift: o.shift,
      option: false,
      super: o.super,
      sequence: e,
      raw: e,
      isPasted: false
    };
  }
  if (r = Hv8.exec(e)) {
    let o = parseInt(r[1], 10),
      s = parseInt(r[2], 10),
      i = parseInt(r[3], 10);
    return lSi(e, o, s, i) ?? Ive(e, "mouse", false);
  }
  if (e.length === 6 && e.startsWith("\x1B[M")) {
    let o = e.charCodeAt(3) - 32,
      s = e.charCodeAt(4) - 32,
      i = e.charCodeAt(5) - 32;
    return lSi(e, o, s, i) ?? Ive(e, "mouse", false);
  }
  if (e === "\r" || e === "\x1B\r") n.raw = undefined, n.name = "return", n.meta = e.length === 2;else if (e === `
` || e === `\x1B
`) n.name = "enter", n.meta = e.length === 2;else if (e === "\t" || e === "\x1B\t") n.name = "tab", n.meta = e.length === 2;else if (e === "\b" || e === "\x1B\b") {
    if (n.name = "backspace", n.meta = e.charAt(0) === "\x1B", isBsCtrlBackspace()) n.ctrl = true;
  } else if (e === "\x7F" || e === "\x1B\x7F") n.name = "backspace", n.meta = e.charAt(0) === "\x1B";else if (e === "\x1B" || e === "\x1B\x1B") n.name = "escape", n.meta = e.length === 2;else if (e === " " || e === "\x1B ") n.name = "space", n.meta = e.length === 2;else if (e === "\x1C") n.name = "\\", n.ctrl = true;else if (e === "\x1D") n.name = "]", n.ctrl = true;else if (e === "\x1E") n.name = "^", n.ctrl = true;else if (e === "\x1F") n.name = "_", n.ctrl = true;else if (e <= "\x1A" && e.length === 1) n.name = String.fromCharCode(e.charCodeAt(0) + 97 - 1), n.ctrl = true;else if (e.length === 1 && e >= "0" && e <= "9") n.name = "number";else if (e.length === 1 && e >= "a" && e <= "z") n.name = e;else if (e.length === 1 && e >= "A" && e <= "Z") n.name = e.toLowerCase(), n.shift = true;else if (t = da2Regex.exec(e)) n.meta = true, n.shift = /^[A-Z]$/.test(t[1]), n.name = t[1].toLowerCase();else if (t = kittyKeyboardRegex.exec(e)) {
    let o = [...e];
    if (o[0] === "\x1B" && o[1] === "\x1B") n.option = true;
    let s = [t[1], t[2], t[4], t[6]].filter(Boolean).join(""),
      i = (t[3] || t[5] || 1) - 1;
    n.ctrl = !!(i & 4), n.meta = !!(i & 2), n.super = !!(i & 8), n.shift = !!(i & 1), n.code = s, n.name = Lnd[s], n.shift = Mnd(s) || n.shift, n.ctrl = Nnd(s) || n.ctrl;
  }
  if (n.raw === "\x1Bb") n.meta = true, n.name = "left";else if (n.raw === "\x1Bf") n.meta = true, n.name = "right";
  switch (e) {
    case "\x1B[1~":
      return Ive(e, "home", false);
    case "\x1B[4~":
      return Ive(e, "end", false);
    case "\x1B[5~":
      return Ive(e, "pageup", false);
    case "\x1B[6~":
      return Ive(e, "pagedown", false);
    case "\x1B[1;5D":
      return Ive(e, "left", true);
    case "\x1B[1;5C":
      return Ive(e, "right", true);
  }
  return n;
}
function lSi(e, t, n, r) {
  let o = t & 67;
  if (o !== 64 && o !== 65) return null;
  return {
    kind: "key",
    name: o === 64 ? "wheelup" : "wheeldown",
    ctrl: (t & 16) !== 0,
    meta: (t & 8) !== 0,
    shift: (t & 4) !== 0,
    option: false,
    super: false,
    fn: false,
    sequence: e,
    raw: e,
    isPasted: false,
    col: n,
    row: r
  };
}
function Ive(e, t, n) {
  return {
    kind: "key",
    name: t,
    ctrl: n,
    meta: false,
    shift: false,
    option: false,
    super: false,
    fn: false,
    sequence: e,
    raw: e,
    isPasted: false
  };
}
var da1Regex,
  da2Regex,
  kittyKeyboardRegex,
  cursorPositionRegex,
  themeNotifyRegex,
  decrpmRegex,
  da1Regex_2,
  da2Regex_2,
  kittyKeyboardRegex_2,
  cursorPositionRegex_2,
  themeNotifyRegex_2,
  oscRegex,
  xtVersionRegex,
  Hv8,
  pSi,
  Lnd,
  Mnd = e => ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(e),
  Nnd = e => ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(e),
  Fnd;
var $Fr = b(() => {
  ct();
  an();
  NO();
  dIt();
  da1Regex = require("buffer"), da2Regex = /^(?:\x1b)([a-zA-Z0-9])$/, kittyKeyboardRegex = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/, cursorPositionRegex = /^\x1b\[(\d+)(?:;(\d+))?u/, themeNotifyRegex = /^\x1b\[27;(\d+);(\d+)~/, decrpmRegex = /^\x1b\[\?(\d+);(\d+)\$y$/, da1Regex_2 = /^\x1b\[\?([\d;]*)c$/, da2Regex_2 = /^\x1b\[>([\d;]*)c$/, kittyKeyboardRegex_2 = /^\x1b\[\?(\d+)u$/, cursorPositionRegex_2 = /^\x1b\[\?(\d+);(\d+)R$/, themeNotifyRegex_2 = /^\x1b\[\?997;([12])n$/, oscRegex = /^\x1b\](\d+);(.*?)(?:\x07|\x1b\\)$/s, xtVersionRegex = /^\x1bP>\|(.*?)(?:\x07|\x1b\\)$/s, Hv8 = /^\x1b\[<(\d+);(\d+);(\d+)([Mm])$/;
  pSi = {
    mode: "NORMAL",
    incomplete: "",
    pasteBuffer: ""
  };
  Lnd = {
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
  Fnd = /^\x1b\[M[\x60-\x7f][\x20-\uffff]{2}$/;
});

export {makePasteKeyEvent as abi,parseTerminalResponse as nsd,parseParamList as lbi,bsAsCtrlBackspace as rsd,isBsCtrlBackspace as OUr,normaliseChunk as osd,parseInput as ssd,decodeModifiers as isd,codepointToKeyName as asd,decodePasteCodepoint as cbi,isMouseOrFocusSequence as ubi,parseSgrMouseEvent as lsd,buildKeyEvent as ybi,parseMouseWheelEvent as dbi,makeSimpleKeyEvent as pbi,Bnd as psd,Und as fsd,aSi as mbi,BFr as DUr,lSi as fbi,Ive as Kve,da1Regex as Abi,da2Regex as Vod,kittyKeyboardRegex as Kod,cursorPositionRegex as hbi,themeNotifyRegex as gbi,decrpmRegex as zod,da1Regex_2 as Yod,da2Regex_2 as Jod,kittyKeyboardRegex_2 as Xod,cursorPositionRegex_2 as Qod,themeNotifyRegex_2 as Zod,oscRegex as esd,xtVersionRegex as tsd,Hv8 as PUr,pSi as _bi,Lnd as csd,Mnd as usd,Nnd as dsd,Fnd as msd,$Fr as LUr};
