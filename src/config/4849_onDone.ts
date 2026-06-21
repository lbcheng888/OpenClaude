// @ts-nocheck
import {ny,v5 as a5} from "../../vendor/m2375.ts";
import {B1 as x1,xUr as OFr,GTn as lTn,Gve as kve} from "./2342_useDecayCurve.ts";
import {u$r as g2r,IZe as mZe,rvi as QEi,fUe as WFe} from "../../vendor/m2408.ts";
import {updateSettingsForSource as ao,getSettingsFilePathForSource as ZA,yr as Er} from "./0740_updateSettingsForSource.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {_T as WS,$u as od} from "../mcp/2194_mcpServerName.ts";
import {EO as fO,Iu as Pu} from "../../vendor/m643.ts";
import {Cn as En,uf as ff,dr as fr} from "../../vendor/m231.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Wu as Ku,lS as tS} from "../../vendor/m2571.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {ntn as men,qs as $s} from "../../vendor/m635.ts";
import {pmr as Epr,wen as NZt} from "./0571_externalHttp.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function WEo(e, t) {
  let n = e < 1 ? Math.round(e / MY4_2) * MY4_2 : Math.round(e);
  return ny(n, t, J$_2);
}
function GTl({
  onDone: e,
  showDemoRuler: t = true,
  editorSensitivity: n = null
}) {
  let r = _wH.useRef(process.env[_wH_2]),
    o = x1(),
    s = OFr(o.xtermJs, o.wheelFlood, o.wtSession),
    i = o.useDecayCurve ? WTl : qtm,
    [a, l] = _wH.useState(() => WEo(o.base, i)),
    [c, u] = _wH.useState(r.current !== undefined),
    d = _wH.useRef(false),
    p = _wH.useRef(false),
    m = !o.xtermJs && !o.wheelFlood;
  _wH.useEffect(() => {
    g2r(true, {
      demoRuler: t
    });
    let S = m ? mZe(() => {
      let C = QEi();
      if (!C) return;
      if (C.wheelMode) d.current = true;else p.current = true;
    }) : undefined;
    return () => {
      S?.(), g2r(false);
    };
  }, [t, m]);
  function f(S) {
    let C = S < 0 ? a <= 1 ? -MY4_2 : -1 : a < 1 ? MY4_2 : 1,
      R = WEo(a + C, i);
    if (R === a) return;
    process.env[_wH_2] = String(R), lTn(), u(true), l(R);
  }
  function A() {
    delete process.env[_wH_2], lTn(), l(WEo(s, i)), u(false);
  }
  function h() {
    if (r.current === undefined) delete process.env[_wH_2];else process.env[_wH_2] = r.current;
    lTn();
  }
  function g() {
    h(), e("Scroll speed unchanged");
  }
  function _() {
    let S = !c,
      C = {
        [_wH_2]: S ? undefined : String(a)
      },
      {
        error: R
      } = ao("userSettings", {
        env: C
      });
    if (R) {
      Ie(R), h(), e(`Couldn't save scroll speed: ${R.message}`);
      return;
    }
    j("tengu_scroll_speed_set", {
      scroll_speed: S ? s : a,
      scroll_speed_auto: s,
      reset_to_auto: S,
      xterm_js: o.xtermJs,
      wheel_flood: o.wheelFlood,
      wt_session: o.wtSession,
      use_decay_curve: o.useDecayCurve,
      saw_scroll_wheel: d.current,
      saw_trackpad: p.current,
      editor_wheel_sensitivity: n?.sensitivity ?? undefined,
      term_program: o.termProgram,
      term_program_version: WS(o.termProgramVersion)
    });
    let k = `\`${fO(ZA("userSettings") ?? "settings.json")}\``;
    e(S ? `Scroll speed reset to auto (${s} ${En(s, "line")} per notch) \xB7 removed from ${k}` : `Scroll speed set to ${a} ${En(a, "line")} per notch \xB7 saved to ${k}`);
  }
  function y(S) {
    if (S.key === "left") S.preventDefault(), f(-1);else if (S.key === "right") S.preventDefault(), f(1);else if (S.key === "return") S.preventDefault(), _();else if (S.key === "escape" || S.ctrl && (S.key === "c" || S.key === "d")) S.preventDefault(), g();else if (S.key === "r") S.preventDefault(), A();
  }
  let T = !c;
  return J$.createElement(B, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: y
  }, J$.createElement(Ku, {
    color: "permission"
  }, J$.createElement(B, {
    flexDirection: "column"
  }, J$.createElement(w, {
    bold: true
  }, "Scroll speed"), J$.createElement(B, {
    height: 1
  }), J$.createElement(B, null, J$.createElement(w, {
    color: "permission"
  }, jtm(a)), J$.createElement(w, null, "  ", a, " ", En(a, "line"), " per wheel notch"), T && J$.createElement(w, {
    dimColor: true
  }, " (auto)"), !T && J$.createElement(w, {
    dimColor: true
  }, " \xB7 auto is ", s)), J$.createElement(B, {
    height: 1
  }), J$.createElement(qTl, {
    label: "Terminal",
    value: Wtm(o)
  }), n && J$.createElement(qTl, {
    label: "Editor",
    value: ScrollSpeedDialog(n)
  }), J$.createElement(B, {
    height: 1
  }), J$.createElement(w, {
    dimColor: true
  }, "Scroll to feel it \xB7 \u2190/\u2192 adjust \xB7 r reset to auto \xB7 Enter save \xB7 Esc cancel"))));
}
function qTl(e) {
  let t = MY4.c(7),
    {
      label: n,
      value: r
    } = e,
    o;
  if (t[0] !== n) o = J$.createElement(B, {
    width: 12
  }, J$.createElement(w, {
    dimColor: true
  }, n)), t[0] = n, t[1] = o;else o = t[1];
  let s;
  if (t[2] !== r) s = J$.createElement(w, null, r), t[2] = r, t[3] = s;else s = t[3];
  let i;
  if (t[4] !== o || t[5] !== s) i = J$.createElement(B, null, o, s), t[4] = o, t[5] = s, t[6] = i;else i = t[6];
  return i;
}
function jtm(e) {
  if (e < 1) return "\u25AA" + ff("\xB7", J$_2 - 1);
  let t = ny(Math.round(e), WTl, J$_2);
  return "\u25A0".repeat(t) + ff("\xB7", J$_2 - t);
}
function Wtm(e) {
  let t = [quantizeScrollSpeed(e), men(e.platform)];
  if (e.wheelFlood) t.push("high-rate wheel events");else if (e.xtermJs) t.push("xterm.js");else if (e.wtSession) t.push("Windows Terminal");
  return t.join(" \xB7 ");
}
function quantizeScrollSpeed(rawSpeed) {
  if (process.env.CURSOR_TRACE_ID !== undefined) return "Cursor";
  let t = process.env.VSCODE_GIT_ASKPASS_MAIN ?? "";
  if (t.includes("cursor")) return "Cursor (remote)";
  if (Epr(t)) return "Devin Desktop";
  if (t.includes("antigravity")) return "Antigravity";
  if (rawSpeed.termProgram === "vscode") return `VS Code${rawSpeed.termProgramVersion !== "unset" ? ` ${rawSpeed.termProgramVersion}` : ""}`;
  switch (rawSpeed.termProgram) {
    case "unset":
      return rawSpeed.wtSession || rawSpeed.platform === "win32" ? "Windows console" : "terminal";
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
      return rawSpeed.termProgram;
  }
}
function ScrollSpeedDialog(e) {
  let initialEnvValue = e.editor === "VSCode" ? "VS Code" : e.editor;
  if (e.sensitivity === null) return `${initialEnvValue} wheel sensitivity unset \xB7 /terminal-setup sets it to ${e.recommended}`;
  if (e.sensitivity >= e.recommended) return `${initialEnvValue} wheel sensitivity ${e.sensitivity}`;
  return `${initialEnvValue} wheel sensitivity ${e.sensitivity} \xB7 /terminal-setup raises it to ${e.recommended}`;
}
var MY4,
  J$,
  _wH,
  WTl = 1,
  qtm = 0.25,
  MY4_2 = 0.25,
  J$_2 = 10,
  _wH_2 = "CLAUDE_CODE_SCROLL_SPEED";
var WY4 = b(() => {
  a5();
  WFe();
  kve();
  Je();
  Ct();
  od();
  NZt();
  wn();
  Pu();
  $s();
  Er();
  fr();
  tS();
  MY4 = L(nt(), 1), J$ = L(Te(), 1), _wH = L(Te(), 1);
});

export {WEo as YCo,GTl as mbl,qTl as ubl,jtm as Tom,Wtm as Som,quantizeScrollSpeed as bom,ScrollSpeedDialog as Eom,MY4 as dbl,J$ as REPL_CONTEXT_NAME,_wH as hye,WTl as pbl,qtm as yom,MY4_2 as jGn,J$_2 as qGn,_wH_2 as eft,WY4 as fbl};
