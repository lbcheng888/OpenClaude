// @ts-nocheck
import {bc as Sc,Ug as jg} from "../../vendor/m2264.ts";
import {executeNotificationHooks as Nz} from "../../vendor/m5161.ts";
import {Oe as Pe,Ie as He,ln as cn} from "./0594_feature_name.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {getAttacherCaps as Ey,lt as ct} from "../session/0131_sent.ts";
import {execFileNoThrow as Bn,oa} from "../../vendor/m684.ts";
import {M as L,b} from "../../runtime.ts";
import {rHa as Wxa} from "../../vendor/m3809.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
// @ts-nocheck
async function Fle(e, t) {
  let n = Sc("preferredNotifChannel", "auto").value;
  await Nz(e);
  let r = await sendOSNotification(n, e, t);
  if (r === "error") Pe("notification_show", "send_failed");else He("notification_show");
  j("tengu_notification_method_used", {
    configured_channel: Ue(n),
    method_used: r,
    term: Ge.terminal,
    attacher_term: Ey()?.terminal ?? null
  });
}
async function sendOSNotification(input, driver, n) {
  let r = driver.title || Gxa;
  try {
    switch (input) {
      case "auto":
        return dispatchToChannel(driver, n);
      case "iterm2":
        return n.notifyITerm2(driver), "iterm2";
      case "iterm2_with_bell":
        return n.notifyITerm2(driver), n.notifyBell(), "iterm2_with_bell";
      case "kitty":
        return n.notifyKitty({
          ...driver,
          title: r,
          id: dispatchAutoChannel()
        }), "kitty";
      case "ghostty":
        return n.notifyGhostty({
          ...driver,
          title: r
        }), "ghostty";
      case "terminal_bell":
        return n.notifyBell(), "terminal_bell";
      case "notifications_disabled":
        return "disabled";
      default:
        return "none";
    }
  } catch {
    return "error";
  }
}
async function dispatchToChannel(channel, input) {
  let n = channel.title || Gxa;
  switch (Ey()?.terminal ?? Ge.terminal) {
    case "Apple_Terminal":
      {
        if (await randomKittyId()) return input.notifyBell(), "terminal_bell";
        return "no_method_available";
      }
    case "iTerm.app":
      return input.notifyITerm2(channel), "iterm2";
    case "kitty":
      return input.notifyKitty({
        ...channel,
        title: n,
        id: dispatchAutoChannel()
      }), "kitty";
    case "ghostty":
      return input.notifyGhostty({
        ...channel,
        title: n
      }), "ghostty";
    default:
      return "no_method_available";
  }
}
function dispatchAutoChannel() {
  return Math.floor(Math.random() * 1e4);
}
async function randomKittyId() {
  try {
    if ((Ey()?.terminal ?? Ge.terminal) !== "Apple_Terminal") return false;
    let t = (await Bn("osascript", ["-e", 'tell application "Terminal" to name of current settings of front window'])).stdout.trim();
    if (!t) return false;
    let n = await Bn("defaults", ["export", "com.apple.Terminal", "-"]);
    if (n.code !== 0) return false;
    let i = (await Promise.resolve().then(() => L(Wxa(), 1))).parse(n.stdout)?.["Window Settings"]?.[t];
    if (!i) return false;
    return i.Bell === false;
  } catch (e) {
    return v(`Failed to read Apple Terminal bell setting: ${e instanceof Error ? e.message : String(e)}`, {
      level: "error"
    }), false;
  }
}
var Gxa = "Claude Code";
var IS_ = b(() => {
  ct();
  je();
  Or();
  oa();
  Tp();
  jg();
  cn();
  Ct();
});

export {Fle as Jle,sendOSNotification as Wmp,dispatchToChannel as Gmp,dispatchAutoChannel as sHa,randomKittyId as Vmp,Gxa as oHa,IS_ as mUt};
