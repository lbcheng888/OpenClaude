// @ts-nocheck
import {getAttacherCaps,lt} from "../session/0131_sent.ts";
import {b0} from "../../vendor/m2206.ts";
import {st} from "../../vendor/m5.ts";
import {die,rZe} from "../../vendor/m2292.ts";
import {je} from "../../vendor/m577.ts";
import {lie,g_i,__i,UH,uC,Jfe,tTn,aie,eTn,zO} from "../../vendor/m2268.ts";
import {jTn,VSi,kIt,M4,N1,iZe,BK} from "../../vendor/m2339.ts";
import {getClearTerminalSequence,eraseViewportInPlace,bUr} from "../../vendor/m2338.ts";
import {VQe,lg} from "../../vendor/m2269.ts";
import {b,M} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "./0047_namespace.ts";
import {O4} from "../../vendor/m2337.ts";
/** Returns whether progress reporting is supported in the current terminal. */
function oUe() {
  let progressCap = getAttacherCaps()?.progressReporting;
  if (progressCap !== void 0) return progressCap;
  if (!process.stdout.isTTY) return !1;
  if (process.env.WT_SESSION) return !1;
  if (process.env.ConEmuANSI || process.env.ConEmuPID || process.env.ConEmuTask) return !0;
  let termVersion = YSi.coerce(process.env.TERM_PROGRAM_VERSION);
  if (!termVersion) return !1;
  if (process.env.TERM_PROGRAM === "ghostty") return b0(termVersion.version, "1.2.0");
  if (process.env.TERM_PROGRAM === "iTerm.app") return b0(termVersion.version, "3.6.6");
  return !1;
}

/** Sets the override flag for sync output. */
function XSi(syncOutputOverride: any) {
  JSi = syncOutputOverride;
}

/** Returns whether the current terminal supports synchronized output. */
function pF() {
  if (process.env.CLAUDE_BG_BACKEND === "daemon") return getAttacherCaps()?.syncOutput !== !1;
  if (process.env.TMUX) return !1;
  if (st(process.env.CLAUDE_CODE_FORCE_SYNC_OUTPUT)) return !0;
  let termProgram = process.env.TERM_PROGRAM,
    term = process.env.TERM;
  if (termProgram === "iTerm.app" || termProgram === "WezTerm" || termProgram === "WarpTerminal" || termProgram === "ghostty" || termProgram === "contour" || termProgram === "vscode" || termProgram === "alacritty" || termProgram === "mintty" || termProgram === "rio" || termProgram === "Tabby") return !0;
  if (die.isJetBrainsIdeTerminal()) return !0;
  if (parseInt(process.env.KONSOLE_VERSION ?? "", 10) >= 211200) return !0;
  if (term?.includes("kitty") || process.env.KITTY_WINDOW_ID) return !0;
  if (term === "xterm-ghostty") return !0;
  if (term?.startsWith("foot")) return !0;
  if (term?.includes("alacritty")) return !0;
  if (process.env.ZED_TERM) return !0;
  if (process.env.WT_SESSION) return !0;
  let vteVersion = process.env.VTE_VERSION;
  if (vteVersion) {
    if (parseInt(vteVersion, 10) >= 6800) return !0;
  }
  if (JSi) return !0;
  return !1;
}

/** Sets the renderer identifier string (e.g. "xterm.js"). */
function QSi(rendererName: any) {
  CUr = rendererName;
}

/** Returns the current renderer identifier string. */
function IIt() {
  return CUr;
}

/** Returns whether the current terminal is VS Code's integrated terminal. */
function Oy() {
  if (getAttacherCaps()?.isVscodeTerm) return !0;
  if (process.env.TERM_PROGRAM === "vscode") return !0;
  return CUr?.startsWith("xterm.js") ?? !1;
}

/** Returns whether a terminal name is in the list of terminals with image support. */
function Nod(termName: any) {
  return Mod.includes(termName ?? je.terminal ?? "");
}

/** Returns ANSI escape sequences for inline image display if terminal supports it. */
function RZ() {
  return Nod() ? lie + g_i + __i : "";
}

/** Returns the full terminal capability prefix string. */
function Wve() {
  return jTn + UH + uC + RZ();
}

/** Returns the terminal media feature string. */
function mF() {
  return lie + VSi + Jfe;
}

/** Returns whether the current session is a Windows Terminal session. */
function ZSi() {
  return !!process.env.WT_SESSION;
}

/** Returns whether inline rendering (viewport updates) is available. */
function vUr() {
  if (process.env.CLAUDE_BG_BACKEND === "daemon") return !1;
  return pF() && process.env.ZELLIJ == null && !die.isJetBrainsIdeTerminal() && !Oy() && je.WT_SESSION == null;
}

/** Writes a sequence of render operations to the given process stdout. */
function wUr(proc: any, operations: any, clearFirst: boolean = !1, viewportRows: any) {
  let adjustedRows = viewportRows !== void 0 && viewportRows > 1 ? viewportRows - 1 : void 0;
  if (operations.length === 0) return;
  let needsSync = !clearFirst,
    output = needsSync ? kIt : "";
  for (let op of operations) switch (op.type) {
    case "stdout":
      output += op.content;
      break;
    case "clear":
      if (op.count > 0) output += tTn(op.count);
      break;
    case "clearTerminal":
      output += op.altScreen ? getClearTerminalSequence() : eraseViewportInPlace(op.viewportRows);
      break;
    case "cursorHide":
      output += M4;
      break;
    case "cursorShow":
      output += N1;
      break;
    case "cursorMove":
      output += aie(op.x, adjustedRows !== void 0 ? Math.max(-adjustedRows, Math.min(adjustedRows, op.y)) : op.y);
      break;
    case "cursorTo":
      output += eTn(op.col);
      break;
    case "carriageReturn":
      output += "\r";
      break;
    case "hyperlink":
      output += VQe(op.uri);
      break;
    case "styleStr":
      output += op.str;
      break;
  }
  if (needsSync) output += iZe;
  if (KSi) return;
  try {
    proc.stdout.write(output);
  } catch (err) {
    if (Fod() && (zSi(err) === "EIO" || zSi(err) === "EPIPE")) {
      KSi = !0;
      return;
    }
    throw err;
  }
}

/** Returns whether the current process is a daemon background backend. */
function Fod() {
  return Bod ??= process.env.CLAUDE_BG_BACKEND === "daemon";
}

/** Extracts the error code string from an error object if present. */
function zSi(err: any) {
  return err && typeof err === "object" && "code" in err ? String(err.code) : void 0;
}
var YSi,
  JSi,
  CUr,
  Mod,
  znh,
  WTn,
  KSi = !1,
  Bod;
var XS = b(() => {
  lt();
  Lr();
  sn();
  bUr();
  rZe();
  zO();
  BK();
  lg();
  YSi = M(O4(), 1);
  Mod = ["iTerm.app", "kitty", "WezTerm", "ghostty", "tmux", "windows-terminal", "WarpTerminal"];
  znh = pF();
  WTn = vUr();
});
export {oUe,XSi,pF,QSi,IIt,Oy,Nod,RZ,Wve,mF,ZSi,vUr,wUr,Fod,zSi,YSi,JSi,CUr,Mod,znh,WTn,KSi,Bod,XS};
