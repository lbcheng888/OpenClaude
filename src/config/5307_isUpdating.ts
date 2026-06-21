// @ts-nocheck
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {WYn,yPo} from "../../vendor/m5304.ts";
import {hJ,rDe} from "../../vendor/m4516.ts";
import {isAutoUpdaterDisabled,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {TNn,Nwa,bat,Cge} from "./3756_minVersion.ts";
import {cE} from "../../vendor/m2206.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {z3e} from "./3762_level.ts";
import {q3e,Rat} from "../../vendor/m3756.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {xp,bt} from "../../vendor/m195.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Bs,rA} from "../../vendor/m2550.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {wY} from "../../vendor/m3762.ts";
import {Te} from "../../vendor/m2253.ts";
function $xm(e: any) {
  if (e.includes("timeout")) return "timeout";
  if (e.includes("Checksum mismatch")) return "checksum_mismatch";
  if (e.includes("ENOENT") || e.includes("not found")) return "not_found";
  if (e.includes("EACCES") || e.includes("permission")) return "permission_denied";
  if (e.includes("ENOSPC")) return "disk_full";
  if (e.includes("npm")) return "npm_error";
  if (e.includes("network") || e.includes("ECONNREFUSED") || e.includes("ENOTFOUND")) return "network_error";
  let t: any = e.toLowerCase();
  if (e.includes("ENOEXEC") || t.includes("exec format error") || t.includes("bad cpu type") || t.includes("cannot execute binary") || t.includes("code signature") || t.includes("gatekeeper") || t.includes("killed: 9")) return "exec_format";
  if (t.includes("virus") || t.includes("quarantine") || t.includes("defender") || t.includes("operation did not complete successfully because the file contains")) return "av_quarantine";
  if (e.includes("EXDEV") || e.includes("EEXIST") || e.includes("EBUSY") || t.includes("rename") || t.includes("move failed") || t.includes("cross-device")) return "swap_failure";
  return "unknown";
}
function b4l({
  isUpdating: e,
  onChangeIsUpdating: t,
  showSuccessMessage: n,
  verbose: r
}: any) {
  let o: any = mt((_: any) => _.autoUpdaterResult),
    s: any = bo(),
    [i, a]: any = YJ.useState({
      current: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    }),
    [l, c]: any = YJ.useState(null),
    u: any = WYn(o?.version),
    d: any = hJ(),
    p: any = YJ.useRef(e);
  YJ.useEffect(() => {
    p.current = e;
  });
  let m: any = YJ.useRef(o);
  YJ.useEffect(() => {
    m.current = o;
  });
  let f: any = YJ.useCallback(async () => {
    if (p.current) return;
    if (m.current?.status === "success") return;
    if (isAutoUpdaterDisabled()) return;
    let _: any = await TNn();
    if (_ && cE({
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION, _)) {
      let T: any = await Nwa();
      c(T ?? "affects your version");
    }
    if (bat()) return;
    t(!0);
    let y: any = Date.now();
    logEvent("tengu_native_auto_updater_start", {});
    try {
      let T: any = await z3e(d),
        S: any = {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.VERSION,
        v: any = Date.now() - y;
      if (T.lockFailed) {
        logEvent("tengu_native_auto_updater_lock_contention", {
          latency_ms: v
        });
        return;
      }
      if (a({
        current: S,
        latest: T.latestVersion
      }), T.wasUpdated) q3e({
        timestamp: new Date().toISOString(),
        path: "native",
        outcome: "success",
        status: "success",
        version_from: S,
        version_to: T.latestVersion ?? null,
        error_code: null
      }), logEvent("tengu_native_auto_updater_success", {
        latency_ms: v
      }), s((R: any) => {
        let k: any = R.autoUpdaterResult;
        if (k?.version === T.latestVersion && k?.status === "success") return R;
        return {
          ...R,
          autoUpdaterResult: {
            version: T.latestVersion,
            status: "success"
          }
        };
      });else logEvent("tengu_native_auto_updater_up_to_date", {
        latency_ms: v
      });
    } catch (T: any) {
      let S: any = Date.now() - y,
        v: any = T instanceof Error ? T.message : String(T);
      logForDebugging(`Native auto-updater failed: ${v}`, {
        level: "error"
      }), q3e({
        timestamp: new Date().toISOString(),
        path: "native",
        outcome: "failed",
        status: "install_failed",
        version_from: {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.185",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-20T06:38:30Z",
          GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
        }.VERSION,
        version_to: null,
        error_code: null
      });
      let R: any = $xm(v),
        k: any = xp(T) ?? "none";
      logEvent("tengu_native_auto_updater_fail", {
        latency_ms: S,
        error_code: k,
        error_timeout: R === "timeout",
        error_checksum: R === "checksum_mismatch",
        error_not_found: R === "not_found",
        error_permission: R === "permission_denied",
        error_disk_full: R === "disk_full",
        error_npm: R === "npm_error",
        error_network: R === "network_error",
        error_swap_failure: R === "swap_failure",
        error_exec_format: R === "exec_format",
        error_av_quarantine: R === "av_quarantine"
      }), s((x: any) => {
        let H: any = x.autoUpdaterResult;
        if (H?.version === null && H?.status === "install_failed") return x;
        return {
          ...x,
          autoUpdaterResult: {
            version: null,
            status: "install_failed"
          }
        };
      });
    } finally {
      t(!1);
    }
  }, [s, d]);
  YJ.useEffect(() => {
    f();
  }, [f]), useInterval(f, 1800000);
  let A: any = !!o?.status,
    h: any = !!i.current && !!i.latest;
  if (!(!!l || A || e && h)) return null;
  return JP.createElement(Box, {
    flexDirection: "row",
    gap: 1
  }, r && JP.createElement(Text, {
    dimColor: !0,
    wrap: "truncate"
  }, "current: ", i.current, " \xB7 ", d, ": ", i.latest), e ? JP.createElement(Box, null, JP.createElement(Text, {
    dimColor: !0,
    wrap: "truncate"
  }, "Checking for updates")) : o?.status === "success" && n && u && JP.createElement(Text, {
    color: "success",
    wrap: "truncate"
  }, JP.createElement(Bs, {
    status: "success",
    withSpace: !0
  }), "Update installed \xB7 Restart to update"), o?.status === "install_failed" && JP.createElement(Text, {
    color: "error",
    wrap: "truncate"
  }, JP.createElement(Bs, {
    status: "error",
    withSpace: !0
  }), "Auto-update failed \xB7 Run ", JP.createElement(Text, {
    bold: !0
  }, "/doctor")), l && !1);
}
var JP: any, YJ: any;
var E4l = b(() => {
  Ct();
  qe();
  bt();
  yPo();
  ze();
  configProtoStore();
  Cge();
  Qn();
  Rat();
  wY();
  rDe();
  rA();
  JP = M(Te(), 1), YJ = M(Te(), 1);
});
export {$xm,b4l,JP,YJ,E4l};
