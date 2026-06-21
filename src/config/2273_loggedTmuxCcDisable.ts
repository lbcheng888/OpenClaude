// @ts-nocheck
import {E7e as s7e,C7e as i7e} from "../../vendor/m638.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {st as rt} from "../../vendor/m5.ts";
import {k2 as GV,xH as JI} from "./0580_xH.ts";
import {tP as eP,r5 as F8} from "../telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {getInitialSettings as Kr,yr as Er} from "./0740_updateSettingsForSource.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getIsInteractive as Gx,lt as ct} from "../session/0131_sent.ts";
import {execFileNoThrow as Bn,oa} from "../../vendor/m684.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
function createTuiState() {
  return {
    loggedTmuxCcDisable: false,
    loggedWinSshDisable: false,
    checkedTmuxMouseHint: false,
    checkedTmuxFocusHint: false,
    tmuxControlModeProbed: undefined,
    gbGateCached: undefined,
    downsellGateCached: undefined
  };
}
function detectIterm2TmuxControlMode() {
  if (!process.env.TMUX) return false;
  if (process.env.TERM_PROGRAM !== "iTerm.app") return false;
  let termEnv = process.env.TERM ?? "";
  return !termEnv.startsWith("screen") && !termEnv.startsWith("tmux");
}
function probeTmuxControlMode(state) {
  if (state.tmuxControlModeProbed = detectIterm2TmuxControlMode(), state.tmuxControlModeProbed) return;
  if (!process.env.TMUX) return;
  if (process.env.TERM_PROGRAM) return;
  let spawnResult = s7e("tmux");
  if (spawnResult === null) return;
  let n;
  try {
    n = DO7.spawnSync(spawnResult, ["display-message", "-p", "#{client_control_mode}"], {
      encoding: "utf8",
      timeout: 2000,
      cwd: undefined,
      env: process.env
    });
  } catch {
    return;
  }
  if (n.status !== 0) return;
  state.tmuxControlModeProbed = n.stdout.trim() === "1";
}
function isTmuxControlMode(state = Rt) {
  if (state.tmuxControlModeProbed === undefined) probeTmuxControlMode(state);
  return state.tmuxControlModeProbed ?? false;
}
function isWindowsOverSsh() {
  if (Yt() !== "windows") return false;
  return Boolean(process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY);
}
function isAlternateScreenDisabledByEnv() {
  return Ge.CLAUDE_CODE_NO_FLICKER === false || rt(process.env.CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN);
}
function isFullscreenEnabled(state = Rt) {
  if (GV() === "local-agent") return false;
  if (process.env.CLAUDE_CODE_SESSION_KIND === "bg") return true;
  if (eP()) return false;
  if (isAlternateScreenDisabledByEnv()) return false;
  if (Ge.CLAUDE_CODE_NO_FLICKER === true) return true;
  if (isTmuxControlMode(state)) {
    if (!state.loggedTmuxCcDisable) state.loggedTmuxCcDisable = true, v("fullscreen disabled: tmux -CC (iTerm2 integration mode) detected \xB7 set CLAUDE_CODE_NO_FLICKER=1 to override");
    return false;
  }
  if (isWindowsOverSsh()) {
    if (!state.loggedWinSshDisable) state.loggedWinSshDisable = true, v("fullscreen disabled: Windows over SSH (ConPTY re-rendering) detected \xB7 set CLAUDE_CODE_NO_FLICKER=1 to override");
    return false;
  }
  switch (Kr().tui) {
    case "fullscreen":
      return true;
    case "default":
      return false;
  }
  if (checkDownsellGate(state)) return true;
  return state.gbGateCached ??= ut("tengu_pewter_brook", false), state.gbGateCached;
}
function checkDownsellGate(state = Rt) {
  return state.downsellGateCached ??= ut("tengu_amber_creek", false), state.downsellGateCached;
}
function isAlternateScreenEnabled(state = Rt) {
  if (eP()) return false;
  if (isAlternateScreenDisabledByEnv()) return false;
  if (Ge.CLAUDE_CODE_NO_FLICKER === true) return true;
  if (isWindowsOverSsh()) return false;
  return !isTmuxControlMode(state);
}
function getFullscreenDecisionReason(state = Rt) {
  if (process.env.CLAUDE_CODE_SESSION_KIND === "bg") return "bg_forced_on";
  if (eP()) return "sr_auto_off";
  if (isAlternateScreenDisabledByEnv()) return "env_off";
  if (Ge.CLAUDE_CODE_NO_FLICKER === true) return "env_on";
  if (isTmuxControlMode(state)) return "tmux_cc_auto_off";
  if (isWindowsOverSsh()) return "win_ssh_auto_off";
  switch (Kr().tui) {
    case "fullscreen":
      return "settings_on";
    case "default":
      return "settings_off";
  }
  if (state.downsellGateCached ?? ut("tengu_amber_creek", false)) return "downsell_on";
  return state.gbGateCached ?? ut("tengu_pewter_brook", false) ? "gb_on" : "gb_off";
}
function decisionReasonToTuiMode(reason) {
  switch (reason) {
    case "env_on":
    case "bg_forced_on":
    case "settings_on":
    case "ant_default":
    case "downsell_on":
    case "gb_on":
      return "fullscreen";
    case "env_off":
    case "sr_auto_off":
    case "tmux_cc_auto_off":
    case "win_ssh_auto_off":
    case "settings_off":
    case "gb_off":
      return "default";
  }
}
function getNoFlickerEnvState() {
  if (Ge.CLAUDE_CODE_NO_FLICKER === true) return "on";
  if (Ge.CLAUDE_CODE_NO_FLICKER === false) return "off";
  return;
}
function isMouseEnabled() {
  if (Ge.CLAUDE_CODE_SESSION_KIND === "bg") return true;
  if (Ge.CLAUDE_CODE_DISABLE_MOUSE !== undefined) return !Ge.CLAUDE_CODE_DISABLE_MOUSE;
  return true;
}
function isFullscreenWithTTY(state = Rt) {
  return Gx() && isFullscreenEnabled(state);
}
async function getTmuxMouseHint(state = Rt) {
  if (!process.env.TMUX) return null;
  if (!isFullscreenWithTTY(state) || isTmuxControlMode(state)) return null;
  if (state.checkedTmuxMouseHint) return null;
  state.checkedTmuxMouseHint = true;
  let {
    stdout: cmdStdout,
    code: exitCode
  } = await Bn("tmux", ["show", "-Av", "mouse"], {
    useCwd: false,
    timeout: 2000
  });
  if (exitCode !== 0 || cmdStdout.trim() === "on") return null;
  return "tmux detected \xB7 scroll with PgUp/PgDn \xB7 or add 'set -g mouse on' to ~/.tmux.conf for wheel scroll";
}
async function getTmuxFocusHint(state = Rt) {
  if (!process.env.TMUX) return null;
  if (isTmuxControlMode(state)) return null;
  if (state.checkedTmuxFocusHint) return null;
  state.checkedTmuxFocusHint = true;
  let {
    stdout: cmdStdout,
    code: exitCode
  } = await Bn("tmux", ["show", "-gv", "focus-events"], {
    useCwd: false,
    timeout: 2000
  });
  if (exitCode !== 0 || cmdStdout.trim() === "on") return null;
  return "tmux focus-events off \xB7 add 'set -g focus-events on' to ~/.tmux.conf and reattach for focus tracking";
}
var DO7, Rt;
var nO = b(() => {
  ct();
  Yn();
  je();
  JI();
  Or();
  an();
  oa();
  $s();
  i7e();
  F8();
  Er();
  DO7 = require("child_process");
  Rt = createTuiState();
});

export {createTuiState as Eed,detectIterm2TmuxControlMode as Ced,probeTmuxControlMode as ved,isTmuxControlMode as yZ,isWindowsOverSsh as DFr,isAlternateScreenDisabledByEnv as PFr,isFullscreenEnabled as Ms,checkDownsellGate as wed,isAlternateScreenEnabled as fIt,getFullscreenDecisionReason as Ove,decisionReasonToTuiMode as L_i,getNoFlickerEnvState as M_i,isMouseEnabled as QFe,isFullscreenWithTTY as TZ,getTmuxMouseHint as N_i,getTmuxFocusHint as B_i,DO7 as O_i,Rt as _Z,nO as Pp};
