// @ts-nocheck
import {lc as Sc,mg as jg} from "../../vendor/m2209.ts";
import {executeNotificationHooks as Nz} from "../../vendor/m5194.ts";
import {xe as Pe,He,mn as cn} from "./0600_feature_name.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {getAttacherCaps as Ey,lt as ct} from "../session/0132_sent.ts";
import {execFileNoThrow as Bn,Ii as oa} from "../../vendor/m690.ts";
import {x as L,b} from "../../runtime.ts";
import {EMa as Wxa} from "../../vendor/m3825.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {Wd as Tp} from "../tools/5204_shouldSkipHookDueToTrust.ts";
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
export {Fle as jle,sendOSNotification as xAp,dispatchToChannel as DAp,dispatchAutoChannel as AMa,randomKittyId as PAp,Gxa as CMa,IS_ as W$t};
