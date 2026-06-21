// @ts-nocheck
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {j3e,BFt,wNn} from "../../vendor/m3757.ts";
import {isAutoUpdaterDisabled,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {bat,bNn,MFt,TNn,Cat,Cge} from "./3756_minVersion.ts";
import {hJ,rDe} from "../../vendor/m4516.ts";
import {cE,b0} from "../../vendor/m2206.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {st} from "../../vendor/m5.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {execFileNoThrowWithCwd,oa} from "../../vendor/m684.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {sn} from "./0047_namespace.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function qxm(e: any, t: any): any {
  switch (e) {
    case "homebrew":
      return ["brew", "upgrade", "--cask", t ?? "claude-code"];
    case "winget":
      {
        let n: any = process.env.LOCALAPPDATA;
        return [n ? x4l.join(n, "Microsoft", "WindowsApps", "winget.exe") : "winget", "upgrade", "--id", "Anthropic.ClaudeCode", "--exact", "--silent", "--disable-interactivity"];
      }
    default:
      return null;
  }
}
function jxm(e: any, t: any): any {
  switch (e) {
    case "homebrew":
      return `brew upgrade ${t ?? "claude-code"}`;
    case "winget":
      return "winget upgrade Anthropic.ClaudeCode";
    case "mise":
      return "mise upgrade claude";
    case "apk":
      return "apk upgrade claude-code";
    default:
      return "your package manager update command";
  }
}
function k4l(e: any): any {
  let t: any = w4l.c(37),
    {
      isUpdating: n,
      onChangeIsUpdating: r,
      showSuccessMessage: o,
      verbose: s
    } = e,
    i: any = mt(Gxm),
    a: any = bo(),
    [l, c] = JJ.useState(GYn),
    [u, d] = JJ.useState("unknown"),
    [p, m] = JJ.useState(null),
    f: any = JJ.useRef(n),
    A: any;
  if (t[0] !== n) A = () => {
    f.current = n;
  }, t[0] = n, t[1] = A;else A = t[1];
  JJ.useEffect(A);
  let h: any = JJ.useRef(i),
    g: any;
  if (t[2] !== i) g = () => {
    h.current = i;
  }, t[2] = i, t[3] = g;else g = t[3];
  JJ.useEffect(g);
  let _: any, y: any;
  if (t[4] === Symbol.for("react.memo_cache_sentinel")) _ = () => {
    j3e().then((N: any) => {
      if (d(N), N === "homebrew") m(BFt());
    });
  }, y = [], t[4] = _, t[5] = y;else _ = t[4], y = t[5];
  JJ.useEffect(_, y);
  let T: any;
  if (t[6] !== r || t[7] !== a) T = async () => {
    if (f.current) return;
    if (h.current?.status === "success") return;
    if (isAutoUpdaterDisabled()) return;
    if (bat()) return;
    if (h.current?.status === "install_failed") {
      if (Date.now() - C4l < v4l) return;
      h.current = null, a(Wxm);
    }
    let [N, O] = await Promise.all([hJ(), j3e()]),
      $: any = N,
      U: any = null;
    if (O === "homebrew") U = BFt(), $ = U === "claude-code@latest" ? "latest" : "stable";
    let W: any = O === "homebrew" ? await bNn(U ?? "claude-code", $) : await MFt($),
      G: any = await TNn(),
      V: any = !1;
    if (G && W && cE(W, G)) {
      if (logForDebugging(`PackageManagerAutoUpdater: maxVersion ${G} is set, capping update from ${W} to ${G}`), b0({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION, G)) {
        logForDebugging(`PackageManagerAutoUpdater: current version ${{
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.VERSION} is already at or above maxVersion ${G}, skipping update`), GYn = null, c(null);
        return;
      }
      W = G, V = !0;
    }
    let Q: any = W && !b0({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION, W) && !Cat(W);
    if (GYn = Q ? W : null, c(GYn), !Q) return;
    logForDebugging(`PackageManagerAutoUpdater: Update available ${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION} -> ${W}`);
    let K: any = st(process.env.CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE),
      Y: any = qxm(O, U);
    if (!K || !Y || V) return;
    if (f.current) return;
    r(!0);
    let J: any = Date.now(),
      ee: any = {
        pm_homebrew: O === "homebrew",
        pm_winget: O === "winget"
      };
    logEvent("tengu_pkg_manager_auto_updater_start", ee);
    let [te, ...ne] = Y,
      re: any = await execFileNoThrowWithCwd(te, ne, {
        cwd: R4l.homedir(),
        timeout: 300000,
        env: O === "homebrew" ? {
          ...process.env,
          HOMEBREW_NO_AUTO_UPDATE: ""
        } : void 0
      }),
      oe: any = Date.now() - J;
    if (r(!1), re.code === 0) logEvent("tengu_pkg_manager_auto_updater_success", {
      ...ee,
      latency_ms: oe
    }), a((ce: any) => {
      let ue: any = ce.autoUpdaterResult;
      if (ue?.version === W && ue?.status === "success") return ce;
      return {
        ...ce,
        autoUpdaterResult: {
          version: W,
          status: "success"
        }
      };
    });else logForDebugging(`PackageManagerAutoUpdater: ${te} exited ${re.code}: ${re.stderr || re.error || re.stdout}`), logEvent("tengu_pkg_manager_auto_updater_fail", {
      ...ee,
      latency_ms: oe,
      exit_code: re.code
    }), C4l = Date.now(), a((ce: any) => {
      if (ce.autoUpdaterResult?.status === "install_failed") return ce;
      return {
        ...ce,
        autoUpdaterResult: {
          version: W,
          status: "install_failed"
        }
      };
    });
  }, t[6] = r, t[7] = a, t[8] = T;else T = t[8];
  let S: any = T,
    v: any,
    R: any;
  if (t[9] !== S) v = () => {
    S();
  }, R = [S], t[9] = S, t[10] = v, t[11] = R;else v = t[10], R = t[11];
  if (JJ.useEffect(v, R), useInterval(S, v4l), i?.status === "success") {
    if (!o) return null;
    let N: any;
    if (t[12] !== i || t[13] !== s) N = s && dH.createElement(Text, {
      dimColor: !0,
      wrap: "truncate"
    }, "current: ", {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION, " \xB7 latest:", " ", i.version), t[12] = i, t[13] = s, t[14] = N;else N = t[14];
    let O: any = u !== "unknown" && ` via ${u}`,
      $: any;
    if (t[15] !== O) $ = dH.createElement(Text, {
      color: "success",
      wrap: "truncate"
    }, "✓ Update installed", O, " \xB7 Restart to apply"), t[15] = O, t[16] = $;else $ = t[16];
    let U: any;
    if (t[17] !== $ || t[18] !== N) U = dH.createElement(Box, {
      flexDirection: "row",
      gap: 1
    }, N, $), t[17] = $, t[18] = N, t[19] = U;else U = t[19];
    return U;
  }
  if (n) {
    let N: any = u === "unknown" ? "Updating…" : `Updating via ${u}…`,
      O: any;
    if (t[20] !== N) O = dH.createElement(Text, {
      dimColor: !0,
      wrap: "truncate"
    }, N), t[20] = N, t[21] = O;else O = t[21];
    return O;
  }
  let k: any = i?.status === "install_failed";
  if (!l && !k || u === "unknown") return null;
  let x: any;
  if (t[22] !== s) x = s && dH.createElement(Text, {
    dimColor: !0,
    wrap: "truncate"
  }, "currentVersion: ", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION), t[22] = s, t[23] = x;else x = t[23];
  let H: any;
  if (t[24] !== p || t[25] !== u) H = jxm(u, p), t[24] = p, t[25] = u, t[26] = H;else H = t[26];
  let I: any;
  if (t[27] !== H) I = dH.createElement(Text, {
    bold: !0
  }, H), t[27] = H, t[28] = I;else I = t[28];
  let P: any;
  if (t[29] !== k) P = k && dH.createElement(Text, {
    dimColor: !0
  }, " (auto-update failed)"), t[29] = k, t[30] = P;else P = t[30];
  let L: any;
  if (t[31] !== I || t[32] !== P) L = dH.createElement(Text, {
    color: "warning",
    wrap: "truncate"
  }, "Update available! Run:", " ", I, P), t[31] = I, t[32] = P, t[33] = L;else L = t[33];
  let D: any;
  if (t[34] !== L || t[35] !== x) D = dH.createElement(dH.Fragment, null, x, L), t[34] = L, t[35] = x, t[36] = D;else D = t[36];
  return D;
}
function Wxm(e: any): any {
  return e.autoUpdaterResult?.status === "install_failed" ? {
    ...e,
    autoUpdaterResult: null
  } : e;
}
function Gxm(e: any): any {
  return e.autoUpdaterResult;
}
var w4l: any,
  R4l: any,
  x4l: any,
  dH: any,
  JJ: any,
  C4l = 0,
  v4l = 1800000,
  GYn = null;
var H4l = b(() => {
  Ct();
  ze();
  configProtoStore();
  Cge();
  Qn();
  qe();
  sn();
  oa();
  wNn();
  rDe();
  w4l = M(rt(), 1), R4l = require("os"), x4l = require("path"), dH = M(Te(), 1), JJ = M(Te(), 1);
});
export {qxm,jxm,k4l,Wxm,Gxm,w4l,R4l,x4l,dH,JJ,C4l,v4l,GYn,H4l};
