// @ts-nocheck
import {isClaudeAISubscriber as Eo,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {CBs,BNe} from "../../vendor/m1291.ts";
import {rj,u6i,q$e} from "./2749_q$e.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Bj,__e} from "../../vendor/m3350.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Subscription-switch notification logic.
 *
 * Detects when a user has an active Claude subscription (Max or Pro) that
 * isn't yet linked to Claude Code, and renders a one-time notice nudging them
 * to `/login` and activate it. The notice is shown at most `nno` times, tracked
 * via the persisted `seenNotifications` map keyed by `XBt`.
 */

/**
 * Returns the user's eligible-but-unlinked subscription tier, or null.
 *
 * - `"Max"` when the account has Claude Max and Max isn't already active.
 * - `"Pro"` when the account has Claude Pro and Pro isn't already active.
 * - null when telemetry is disabled, the account can't be loaded, or neither
 *   tier qualifies.
 */
async function Jga(): Promise<"Max" | "Pro" | null> {
  if (Eo()) return null;
  let account = await CBs();
  if (!account) return null;
  if (account.account.has_claude_max && !rj()) return "Max";
  if (account.account.has_claude_pro && !u6i()) return "Pro";
  return null;
}

/**
 * True while the subscription-switch notice still has remaining shows
 * (seen fewer than `nno` times).
 */
function Xga(): boolean {
  return (Ot().seenNotifications?.[XBt] ?? 0) < nno;
}

/**
 * Records that the subscription-switch notice was shown: increments its
 * `seenNotifications` counter and emits the telemetry event.
 */
function Zep(): void {
  hn(prevConfig => {
    let seenNotifications = prevConfig.seenNotifications ?? {};
    return {
      ...prevConfig,
      seenNotifications: {
        ...seenNotifications,
        [XBt]: (seenNotifications[XBt] ?? 0) + 1
      }
    };
  }), W("tengu_switch_to_subscription_notice_shown", {});
}

/**
 * Renders the subscription-switch suggestion line, memoized on the
 * subscription type. Registers the `Zep` callback for the
 * `subscription-switch` notice key.
 */
function Qga(props: { subscriptionType: "Max" | "Pro" }) {
  let cache = Yga.c(3),
    {
      subscriptionType
    } = props;
  Bj("subscription-switch", Zep);
  let loginHint;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) loginHint = QBt.jsxs(v, {
    color: "text",
    dimColor: !0,
    children: [" ", "\xB7 /login to activate"]
  }), cache[0] = loginHint;else loginHint = cache[0];
  let element;
  if (cache[1] !== subscriptionType) element = QBt.jsx($, {
    children: QBt.jsxs(v, {
      color: "suggestion",
      children: ["Use your existing Claude ", subscriptionType, " plan with Claude Code", loginHint]
    })
  }), cache[1] = subscriptionType, cache[2] = element;else element = cache[2];
  return element;
}

var Yga: any,
  QBt: any,
  /** Notification key for the subscription-switch notice. */
  XBt = "subscription-switch",
  /** Maximum number of times the subscription-switch notice is shown. */
  nno = 3;

var rLn = b(() => {
  je();
  kt();
  BNe();
  lo();
  tr();
  q$e();
  __e();
  Yga = x(tt(), 1), QBt = x(oe(), 1);
});

export {Jga,Xga,Zep,Qga,Yga,QBt,XBt,nno,rLn};
