// @ts-nocheck
import {sPt as uIt,xy as Dy,nS as zS} from "./2351_nS.ts";
import {getAttacherCaps as Ey,lt as ct} from "../session/0132_sent.ts";
import {C5 as jj} from "./0577_externalHttp.ts";
import {YM as eie,Tve as FQe} from "../../vendor/m2279.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
// @ts-nocheck
function x1() {
  let e = uIt(),
    t = Ey(),
    n = t?.wheelFlood ?? Gv(),
    r = t ? jj.includes(t.terminal ?? "") : eie.isJetBrainsIdeTerminal(),
    o = t?.wtSession ?? !!process.env.WT_SESSION,
    s = Dy();
  if (rie && rie.xtversion === (e ?? "(no reply)") && rie.wheelFlood === n && rie.jediTerm === r && rie.wtSession === o && rie.xtermJs === s) return rie;
  let i = "darwin";
  return rie = {
    useDecayCurve: !n && (s || i === "win32" || o),
    useAdaptiveDrain: s,
    base: r ? 2 : computeBaseScrollSpeed(s, n, o),
    xtermJs: s,
    wheelFlood: n,
    jediTerm: r,
    termProgram: process.env.TERM_PROGRAM ?? "unset",
    termProgramVersion: process.env.TERM_PROGRAM_VERSION ?? "unset",
    xtversion: e ?? "(no reply)",
    wtSession: o,
    scrollSpeedEnv: process.env.CLAUDE_CODE_SCROLL_SPEED ?? "unset",
    platform: i
  }, rie;
}
function Gv() {
  if (process.env.CURSOR_TRACE_ID !== undefined) return true;
  if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("cursor")) return true;
  if (process.env.TERM_PROGRAM === "vscode") {
    let e = ny8(process.env.TERM_PROGRAM_VERSION);
    if (e !== null) return e >= 1092000 && e < 1105000;
  }
  return uIt()?.startsWith("xterm.js") ?? false;
}
function ny8(e) {
  if (!e) return null;
  let t = /^(\d+)\.(\d+)\.(\d+)/.exec(e);
  if (!t) return null;
  return +t[1] * 1e6 + +t[2] * 1000 + +t[3];
}
function parseVersionToInt(versionStr, t, n) {
  return !t && (versionStr || false || n) ? 3 : 1;
}
function computeBaseScrollSpeed(isXtermJs, isWheelFlood, isWtSession) {
  let r = parseVersionToInt(isXtermJs, isWheelFlood, isWtSession),
    o = process.env.CLAUDE_CODE_SCROLL_SPEED;
  if (!o) return r;
  let s = parseFloat(o);
  return Number.isNaN(s) || s <= 0 ? r : Math.min(s, 20);
}
function resolveScrollSpeed() {
  rie = undefined;
}
var rie;
var pXH = b(() => {
  ct();
  Or();
  FQe();
  zS();
});
export {x1 as XM,Gv as o4r,ny8 as mhd,parseVersionToInt as s4r,computeBaseScrollSpeed as fhd,resolveScrollSpeed as xCn,rie as fie,pXH as Ive};
