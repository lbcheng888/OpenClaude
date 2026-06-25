// @ts-nocheck
import {oy,B8} from "../../vendor/m2385.ts";
import {XM,s4r,xCn,Ive} from "./2352_useDecayCurve.ts";
import {$qr,Dtt,g0i,d2e} from "../../vendor/m2418.ts";
import {ao,getSettingsFilePathForSource as Xf,br} from "./0745_updateSettingsForSource.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {cT,vu} from "../mcp/2200_mcpServerName.ts";
import {WP,Tu} from "../../vendor/m649.ts";
import {Sn,getFastModeModelDisplayName as Cm,lr} from "../../vendor/m233.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {ku,rS} from "../../vendor/m2582.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Nrn,Es} from "../../vendor/m641.ts";
import {$_r,arn} from "./0577_externalHttp.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Quantize a raw scroll-speed value to the nearest step.
 * Values below 1 snap to multiples of the fine step (SCROLL_STEP_FINE),
 * larger values round to whole numbers; result is clamped via `oy`.
 */
function quantizeScrollSpeed(rawSpeed: number, useDecayCurve: number): number {
  let snapped = rawSpeed < 1 ? Math.round(rawSpeed / SCROLL_STEP_FINE) * SCROLL_STEP_FINE : Math.round(rawSpeed);
  return oy(snapped, useDecayCurve, SCROLL_GAUGE_WIDTH);
}

/** Interactive dialog for tuning terminal wheel scroll speed. */
function ScrollSpeedDialog({
  onDone,
  showDemoRuler = !0,
  editorSensitivity = null
}: {
  onDone: (message: string) => void;
  showDemoRuler?: boolean;
  editorSensitivity?: { editor: string; sensitivity: number | null; recommended: number } | null;
}) {
  let originalEnvValue = $Te.useRef(process.env[SCROLL_SPEED_ENV]),
    termInfo = XM(),
    autoSpeed = s4r(termInfo.xtermJs, termInfo.wheelFlood, termInfo.wtSession),
    curveMax = termInfo.useDecayCurve ? SCROLL_DECAY_MAX : SCROLL_DECAY_MIN,
    [speed, setSpeed] = $Te.useState(() => quantizeScrollSpeed(termInfo.base, curveMax)),
    [isCustom, setIsCustom] = $Te.useState(originalEnvValue.current !== void 0),
    sawScrollWheel = $Te.useRef(!1),
    sawTrackpad = $Te.useRef(!1),
    canDetectInput = !termInfo.xtermJs && !termInfo.wheelFlood;
  $Te.useEffect(() => {
    $qr(!0, {
      demoRuler: showDemoRuler
    });
    let cleanup = canDetectInput ? Dtt(() => {
      let event = g0i();
      if (!event) return;
      if (event.wheelMode) sawScrollWheel.current = !0;else sawTrackpad.current = !0;
    }) : void 0;
    return () => {
      cleanup?.(), $qr(!1);
    };
  }, [showDemoRuler, canDetectInput]);
  /** Adjust the scroll speed by one step in the given direction. */
  function adjustSpeed(direction: number) {
    let step = direction < 0 ? speed <= 1 ? -SCROLL_STEP_FINE : -1 : speed < 1 ? SCROLL_STEP_FINE : 1,
      next = quantizeScrollSpeed(speed + step, curveMax);
    if (next === speed) return;
    process.env[SCROLL_SPEED_ENV] = String(next), xCn(), setIsCustom(!0), setSpeed(next);
  }
  /** Reset to the auto-detected speed (clears the override env). */
  function resetToAuto() {
    delete process.env[SCROLL_SPEED_ENV], xCn(), setSpeed(quantizeScrollSpeed(autoSpeed, curveMax)), setIsCustom(!1);
  }
  /** Restore the env var to whatever it was when the dialog opened. */
  function restoreOriginal() {
    if (originalEnvValue.current === void 0) delete process.env[SCROLL_SPEED_ENV];else process.env[SCROLL_SPEED_ENV] = originalEnvValue.current;
    xCn();
  }
  /** Cancel: restore original and report no change. */
  function cancel() {
    restoreOriginal(), onDone("Scroll speed unchanged");
  }
  /** Persist the current speed (or auto) to user settings. */
  function save() {
    let resetToAutoMode = !isCustom,
      envPatch = {
        [SCROLL_SPEED_ENV]: resetToAutoMode ? void 0 : String(speed)
      },
      {
        error: saveError
      } = ao("userSettings", {
        env: envPatch
      });
    if (saveError) {
      Ie(saveError), restoreOriginal(), onDone(`Couldn't save scroll speed: ${saveError.message}`);
      return;
    }
    W("tengu_scroll_speed_set", {
      scroll_speed: resetToAutoMode ? autoSpeed : speed,
      scroll_speed_auto: autoSpeed,
      reset_to_auto: resetToAutoMode,
      xterm_js: termInfo.xtermJs,
      wheel_flood: termInfo.wheelFlood,
      wt_session: termInfo.wtSession,
      use_decay_curve: termInfo.useDecayCurve,
      saw_scroll_wheel: sawScrollWheel.current,
      saw_trackpad: sawTrackpad.current,
      editor_wheel_sensitivity: editorSensitivity?.sensitivity ?? void 0,
      term_program: termInfo.termProgram,
      term_program_version: cT(termInfo.termProgramVersion)
    });
    let settingsPath = `\`${WP(Xf("userSettings") ?? "settings.json")}\``;
    onDone(resetToAutoMode ? `Scroll speed reset to auto (${autoSpeed} ${Sn(autoSpeed, "line")} per notch) \xB7 removed from ${settingsPath}` : `Scroll speed set to ${speed} ${Sn(speed, "line")} per notch \xB7 saved to ${settingsPath}`);
  }
  /** Keyboard handler: arrows adjust, Enter saves, Esc/Ctrl-C/D cancel, r resets. */
  function handleKey(key: { key: string; ctrl?: boolean; preventDefault: () => void }) {
    if (key.key === "left") key.preventDefault(), adjustSpeed(-1);else if (key.key === "right") key.preventDefault(), adjustSpeed(1);else if (key.key === "return") key.preventDefault(), save();else if (key.key === "escape" || key.ctrl && (key.key === "c" || key.key === "d")) key.preventDefault(), cancel();else if (key.key === "r") key.preventDefault(), resetToAuto();
  }
  let isAuto = !isCustom;
  return XI.jsx($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKey,
    children: XI.jsx(ku, {
      color: "permission",
      children: XI.jsxs($, {
        flexDirection: "column",
        children: [XI.jsx(v, {
          bold: !0,
          children: "Scroll speed"
        }), XI.jsx($, {
          height: 1
        }), XI.jsxs($, {
          children: [XI.jsx(v, {
            color: "permission",
            children: renderScrollGauge(speed)
          }), XI.jsxs(v, {
            children: ["  ", speed, " ", Sn(speed, "line"), " per wheel notch"]
          }), isAuto && XI.jsx(v, {
            dimColor: !0,
            children: " (auto)"
          }), !isAuto && XI.jsxs(v, {
            dimColor: !0,
            children: [" \xB7 auto is ", autoSpeed]
          })]
        }), XI.jsx($, {
          height: 1
        }), XI.jsx(InfoRow, {
          label: "Terminal",
          value: describeTerminal(termInfo)
        }), editorSensitivity && XI.jsx(InfoRow, {
          label: "Editor",
          value: describeEditorSensitivity(editorSensitivity)
        }), XI.jsx($, {
          height: 1
        }), XI.jsx(v, {
          dimColor: !0,
          children: "Scroll to feel it \xB7 ←/→ adjust \xB7 r reset to auto \xB7 Enter save \xB7 Esc cancel"
        })]
      })
    })
  });
}

/** A two-column label/value row (memoized via the compiler cache). */
function InfoRow(props: { label: string; value: string }) {
  let cache = yIl.c(7),
    {
      label,
      value
    } = props,
    labelEl;
  if (cache[0] !== label) labelEl = XI.jsx($, {
    width: 12,
    children: XI.jsx(v, {
      dimColor: !0,
      children: label
    })
  }), cache[0] = label, cache[1] = labelEl;else labelEl = cache[1];
  let valueEl;
  if (cache[2] !== value) valueEl = XI.jsx(v, {
    children: value
  }), cache[2] = value, cache[3] = valueEl;else valueEl = cache[3];
  let row;
  if (cache[4] !== labelEl || cache[5] !== valueEl) row = XI.jsxs($, {
    children: [labelEl, valueEl]
  }), cache[4] = labelEl, cache[5] = valueEl, cache[6] = row;else row = cache[6];
  return row;
}

/** Render the filled/empty box gauge for the current speed. */
function renderScrollGauge(speed: number): string {
  if (speed < 1) return "▪" + Cm("\xB7", SCROLL_GAUGE_WIDTH - 1);
  let filled = oy(Math.round(speed), SCROLL_DECAY_MAX, SCROLL_GAUGE_WIDTH);
  return "■".repeat(filled) + Cm("\xB7", SCROLL_GAUGE_WIDTH - filled);
}

/** Build the terminal description line (program name + platform + mode tags). */
function describeTerminal(termInfo: any): string {
  let parts = [describeTerminalProgram(termInfo), Nrn(termInfo.platform)];
  if (termInfo.wheelFlood) parts.push("high-rate wheel events");else if (termInfo.xtermJs) parts.push("xterm.js");else if (termInfo.wtSession) parts.push("Windows Terminal");
  return parts.join(" \xB7 ");
}

/** Resolve a human-readable name for the host terminal program. */
function describeTerminalProgram(termInfo: any): string {
  if (process.env.CURSOR_TRACE_ID !== void 0) return "Cursor";
  let askpassMain = process.env.VSCODE_GIT_ASKPASS_MAIN ?? "";
  if (askpassMain.includes("cursor")) return "Cursor (remote)";
  if ($_r(askpassMain)) return "Devin Desktop";
  if (askpassMain.includes("antigravity")) return "Antigravity";
  if (termInfo.termProgram === "vscode") return `VS Code${termInfo.termProgramVersion !== "unset" ? ` ${termInfo.termProgramVersion}` : ""}`;
  switch (termInfo.termProgram) {
    case "unset":
      return termInfo.wtSession || termInfo.platform === "win32" ? "Windows console" : "terminal";
    case "iTerm.app":
      return "iTerm2";
    case "Apple_Terminal":
      return "Terminal.app";
    case "ghostty":
      return "Ghostty";
    case "WezTerm":
      return "WezTerm";
    case "WarpTerminal":
      return "Warp";
    default:
      return termInfo.termProgram;
  }
}

/** Describe the editor's wheel sensitivity vs. the recommended value. */
function describeEditorSensitivity(editorSensitivity: { editor: string; sensitivity: number | null; recommended: number }): string {
  let editorName = editorSensitivity.editor === "VSCode" ? "VS Code" : editorSensitivity.editor;
  if (editorSensitivity.sensitivity === null) return `${editorName} wheel sensitivity unset \xB7 /terminal-setup sets it to ${editorSensitivity.recommended}`;
  if (editorSensitivity.sensitivity >= editorSensitivity.recommended) return `${editorName} wheel sensitivity ${editorSensitivity.sensitivity}`;
  return `${editorName} wheel sensitivity ${editorSensitivity.sensitivity} \xB7 /terminal-setup raises it to ${editorSensitivity.recommended}`;
}

var yIl,
  $Te,
  XI,
  SCROLL_DECAY_MAX = 1,
  SCROLL_DECAY_MIN = 0.25,
  SCROLL_STEP_FINE = 0.25,
  SCROLL_GAUGE_WIDTH = 10,
  SCROLL_SPEED_ENV = "CLAUDE_CODE_SCROLL_SPEED";
var bIl = b(() => {
  B8();
  d2e();
  Ive();
  je();
  kt();
  vu();
  arn();
  vn();
  Tu();
  Es();
  br();
  lr();
  rS();
  yIl = x(tt(), 1), $Te = x(et(), 1), XI = x(oe(), 1);
});

export {quantizeScrollSpeed as fIo,ScrollSpeedDialog as SIl,InfoRow as _Il,renderScrollGauge as Omm,describeTerminal as Lmm,describeTerminalProgram as Mmm,describeEditorSensitivity as Nmm,yIl,$Te,XI,SCROLL_DECAY_MAX as TIl,SCROLL_DECAY_MIN as Pmm,SCROLL_STEP_FINE as Djn,SCROLL_GAUGE_WIDTH as xjn,SCROLL_SPEED_ENV as mgt,bIl};
