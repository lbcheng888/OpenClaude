// @ts-nocheck
import {getAttacherCaps as Ey,lt} from "../session/0132_sent.ts";
import {U0} from "../../vendor/m2214.ts";
import {nt} from "../../vendor/m127.ts";
import {YM,Tve} from "../../vendor/m2279.ts";
import {Ne} from "../../vendor/m583.ts";
import {aie,AAi,RAi,Mk,yE,ihe,UEn,iie,BEn,dO} from "../../vendor/m2278.ts";
import {HCn,eki,rPt,r4,JM,itt,mz} from "../../vendor/m2349.ts";
import {getClearTerminalSequence as X3r,eraseViewportInPlace as Q3r,Z3r} from "../../vendor/m2348.ts";
import {Ket,hg} from "../../vendor/m2280.ts";
import {b,x} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "./0137_namespace.ts";
import {t4} from "../../vendor/m2347.ts";
/**
 * Terminal capability detection module.
 *
 * Detects which ANSI/terminal features the current terminal emulator supports
 * (progress reporting, synchronized output, strikethrough, etc.) based on
 * environment variables (TERM, TERM_PROGRAM, WT_SESSION, ...) and config.
 * Also provides the low-level routine that flushes a batch of render ops to
 * stdout as a single escape-sequence string.
 */

/**
 * Whether the terminal supports OSC progress reporting (e.g. taskbar progress).
 * Honors an explicit config override first, then falls back to terminal sniffing.
 */
function n2e(): boolean {
  let configuredProgressReporting = Ey()?.progressReporting;
  if (configuredProgressReporting !== void 0) return configuredProgressReporting;
  if (!process.stdout.isTTY) return !1;
  if (process.env.WT_SESSION) return !1;
  if (process.env.ConEmuANSI || process.env.ConEmuPID || process.env.ConEmuTask) return !0;
  let parsedTermVersion = rki.coerce(process.env.TERM_PROGRAM_VERSION);
  if (!parsedTermVersion) return !1;
  if (process.env.TERM_PROGRAM === "ghostty") return U0(parsedTermVersion.version, "1.2.0");
  if (process.env.TERM_PROGRAM === "iTerm.app") return U0(parsedTermVersion.version, "3.6.6");
  return !1;
}

/** Override the cached "supports synchronized output" flag (test/IDE injection). */
function ski(forcedSyncSupport: boolean): void {
  oki = forcedSyncSupport;
}

/**
 * Whether the terminal supports synchronized output (DEC 2026 begin/end sync).
 * Used to batch a frame so the terminal renders it atomically without tearing.
 */
function LF(): boolean {
  if (process.env.CLAUDE_BG_BACKEND === "daemon") return Ey()?.syncOutput !== !1;
  if (process.env.TMUX) return !1;
  if (nt(process.env.CLAUDE_CODE_FORCE_SYNC_OUTPUT)) return !0;
  let termProgram = process.env.TERM_PROGRAM,
    term = process.env.TERM;
  if (termProgram === "iTerm.app" || termProgram === "WezTerm" || termProgram === "WarpTerminal" || termProgram === "ghostty" || termProgram === "contour" || termProgram === "vscode" || termProgram === "alacritty" || termProgram === "mintty" || termProgram === "rio" || termProgram === "Tabby") return !0;
  if (YM.isJetBrainsIdeTerminal()) return !0;
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
  if (oki) return !0;
  return !1;
}

/** Whether the terminal renders strikethrough (SGR 9) text correctly. */
function iki(): boolean {
  if (Ne.CLAUDE_CODE_FORCE_STRIKETHROUGH) return !0;
  let term = Ne.TERM;
  if (Ne.TERM_PROGRAM === "Apple_Terminal" || term === "linux") return !1;
  return lhd.has(Ne.TERM_PROGRAM ?? "") || YM.isGhostty() || YM.isMintty() || YM.isJetBrainsIdeTerminal() || Ne.LC_TERMINAL === "iTerm2" || !!term?.includes("kitty") || !!term?.includes("alacritty") || !!term?.startsWith("foot") || !!Ne.KITTY_WINDOW_ID || !!Ne.ALACRITTY_LOG || !!Ne.KONSOLE_VERSION || !!Ne.WT_SESSION || !!Ne.ZED_TERM || parseInt(Ne.VTE_VERSION ?? "", 10) >= 4400;
}

/** Override the cached detected terminal-name string (test/IDE injection). */
function aki(detectedTerminalName: string | undefined): void {
  t4r = detectedTerminalName;
}

/** The currently detected terminal-name string, if any. */
function sPt(): string | undefined {
  return t4r;
}

/** Whether running inside a VS Code integrated terminal (xterm.js based). */
function xy(): boolean {
  if (Ey()?.isVscodeTerm) return !0;
  if (process.env.TERM_PROGRAM === "vscode") return !0;
  return t4r?.startsWith("xterm.js") ?? !1;
}

/** Whether the given (or detected) terminal is in the hyperlink-capable allowlist. */
function uhd(terminalName?: string): boolean {
  return chd.includes(terminalName ?? Ne.terminal ?? "");
}

/** Emit the escape prefix that enables hyperlink support, or empty if unsupported. */
function EZ(): string {
  return uhd() ? aie + AAi + RAi : "";
}

/** Build the full terminal-init escape sequence (mode setup + hyperlink enable). */
function Hve(): string {
  return HCn + Mk + yE + EZ();
}

/** Build the terminal teardown/reset escape sequence. */
function MF(): string {
  return aie + eki + ihe;
}

/** Whether running inside Windows Terminal (WT_SESSION present). */
function lki(): boolean {
  return !!process.env.WT_SESSION;
}

/**
 * Whether synchronized-output batching should actually be used, after excluding
 * multiplexers/IDEs (zellij, JetBrains, VS Code, Windows Terminal) where it is
 * unreliable even if the underlying terminal claims support.
 */
function n4r(): boolean {
  if (process.env.CLAUDE_BG_BACKEND === "daemon") return !1;
  return LF() && process.env.ZELLIJ == null && !YM.isJetBrainsIdeTerminal() && !xy() && Ne.WT_SESSION == null;
}

/** A single render operation to flush to the terminal. */
type RenderOp =
  | { type: "stdout"; content: string }
  | { type: "clear"; count: number }
  | { type: "clearTerminal"; altScreen: boolean; viewportRows: number }
  | { type: "cursorHide" }
  | { type: "cursorShow" }
  | { type: "cursorMove"; x: number; y: number }
  | { type: "cursorTo"; col: number }
  | { type: "carriageReturn" }
  | { type: "hyperlink"; uri: string }
  | { type: "styleStr"; str: string };

/**
 * Serialize a batch of render ops into one escape-sequence string and write it
 * to the stream's stdout, optionally wrapped in begin/end synchronized-output
 * markers. `clampRows` bounds vertical cursor moves; `skipSync` disables the
 * sync wrapper. Swallows EIO/EPIPE in daemon mode (terminal gone away).
 */
function r4r(
  stream: { stdout: { write(chunk: string): unknown } },
  ops: RenderOp[],
  skipSync: boolean = !1,
  rowLimit?: number,
): void {
  let maxCursorY = rowLimit !== void 0 && rowLimit > 1 ? rowLimit - 1 : void 0;
  if (ops.length === 0) return;
  let useSync = !skipSync,
    output = useSync ? rPt : "";
  for (let op of ops) switch (op.type) {
    case "stdout":
      output += op.content;
      break;
    case "clear":
      if (op.count > 0) output += UEn(op.count);
      break;
    case "clearTerminal":
      output += op.altScreen ? X3r() : Q3r(op.viewportRows);
      break;
    case "cursorHide":
      output += r4;
      break;
    case "cursorShow":
      output += JM;
      break;
    case "cursorMove":
      output += iie(op.x, maxCursorY !== void 0 ? Math.max(-maxCursorY, Math.min(maxCursorY, op.y)) : op.y);
      break;
    case "cursorTo":
      output += BEn(op.col);
      break;
    case "carriageReturn":
      output += "\r";
      break;
    case "hyperlink":
      output += Ket(op.uri);
      break;
    case "styleStr":
      output += op.str;
      break;
  }
  if (useSync) output += itt;
  if (tki) return;
  try {
    stream.stdout.write(output);
  } catch (writeError) {
    if (phd() && (nki(writeError) === "EIO" || nki(writeError) === "EPIPE")) {
      tki = !0;
      return;
    }
    throw writeError;
  }
}

/** Whether running under the background daemon backend (cached). */
function phd(): boolean {
  return dhd ??= process.env.CLAUDE_BG_BACKEND === "daemon";
}

/** Extract the string error code from a thrown value, if present. */
function nki(error: unknown): string | undefined {
  return error && typeof error === "object" && "code" in error ? String(error.code) : void 0;
}

var rki: any,
  oki: boolean | undefined,
  lhd: Set<string>,
  t4r: string | undefined,
  chd: string[],
  khg: boolean,
  ICn: boolean,
  tki = !1,
  dhd: boolean | undefined;
var nS = b(() => {
  lt();
  Ir();
  dn();
  Z3r();
  Tve();
  dO();
  mz();
  hg();
  rki = x(t4(), 1);
  lhd = new Set(["iTerm.app", "vscode", "WezTerm", "WarpTerminal", "Hyper", "Tabby", "rio", "contour", "alacritty"]);
  chd = ["iTerm.app", "kitty", "WezTerm", "ghostty", "tmux", "windows-terminal", "WarpTerminal"];
  khg = LF();
  ICn = n4r();
});

export {n2e,ski,LF,iki,aki,sPt,xy,uhd,EZ as isNonMainSubagent,Hve,MF,lki,n4r,r4r,phd,nki,rki,oki,lhd,t4r,chd,khg,ICn,tki,dhd,nS};
