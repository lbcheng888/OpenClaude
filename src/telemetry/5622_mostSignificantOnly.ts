// @ts-nocheck
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {formatDuration as Fi,Xo} from "../../vendor/m240.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {getIsRemoteMode as la,lt} from "../session/0132_sent.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {isClaudeAISubscriber as Eo,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {pXa,$_o} from "../../vendor/m4291.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/** Build the base URL for the routines section of the Claude AI web app. */
function nowForDurationFormat(): string {
  return `${Hs().CLAUDE_AI_ORIGIN}/code/routines`;
}
/**
 * Format how long ago an ISO timestamp fired, e.g. "5m ago".
 * Returns "just now" for anything under a minute (or non-finite deltas).
 */
function formatDurationPart(isoTimestamp: string): string {
  let elapsedMs = Date.now() - Date.parse(isoTimestamp);
  if (!Number.isFinite(elapsedMs) || elapsedMs < 60000) return "just now";
  return `${Fi(elapsedMs, {
    mostSignificantOnly: !0
  })} ago`;
}
/** True when ISO timestamp `laterIso` is strictly newer than `earlierIso`. */
function pluralizeDurationUnit(laterIso: string, earlierIso: string): boolean {
  return Date.parse(laterIso) > Date.parse(earlierIso);
}
/**
 * From a list of triggers, select the ones that fired after the watermark and
 * advance the watermark to the newest fired timestamp seen.
 */
function formatDurationParts(triggers, watermark) {
  let nextWatermark = watermark;
  return {
    fired: triggers.filter(trigger => {
      if (!trigger.run_once_at || !trigger.last_fired_at) return !1;
      if (!pluralizeDurationUnit(trigger.last_fired_at, watermark)) return !1;
      if (pluralizeDurationUnit(trigger.last_fired_at, nextWatermark)) nextWatermark = trigger.last_fired_at;
      return !0;
    }),
    nextWatermark: nextWatermark
  };
}
/**
 * Build the JSX notification (and deep-link URL) summarizing recently fired
 * routines. Renders a single-routine line or an aggregate "N routines ran" line.
 */
function splitDurationMillis(firedTriggers) {
  let routinesUrl = nowForDurationFormat(),
    latestTrigger = firedTriggers.reduce((acc, trigger) => pluralizeDurationUnit(trigger.last_fired_at ?? "", acc.last_fired_at ?? "") ? trigger : acc),
    latestAgo = latestTrigger.last_fired_at ? formatDurationPart(latestTrigger.last_fired_at) : "";
  if (firedTriggers.length === 1) {
    let onlyTrigger = firedTriggers[0];
    return {
      jsx: A9.jsxs(A9.Fragment, {
        children: [A9.jsx(bs, {
          status: "success",
          withSpace: !0
        }), A9.jsx(v, {
          dimColor: !0,
          children: "routine "
        }), A9.jsx(v, {
          color: "suggestion",
          children: onlyTrigger.name
        }), A9.jsxs(v, {
          dimColor: !0,
          children: [" ", "ran", latestAgo ? ` ${latestAgo}` : "", " \xB7 ", routinesUrl, "/"]
        }), A9.jsx(v, {
          color: "suggestion",
          children: onlyTrigger.id
        })]
      }),
      url: `${routinesUrl}/${onlyTrigger.id}`
    };
  }
  return {
    jsx: A9.jsxs(A9.Fragment, {
      children: [A9.jsx(bs, {
        status: "success",
        withSpace: !0
      }), A9.jsxs(v, {
        dimColor: !0,
        children: [firedTriggers.length, " routines ran", latestAgo ? ` (latest ${latestAgo})` : "", " \xB7", " "]
      }), A9.jsx(v, {
        color: "suggestion",
        children: "/routines"
      })]
    }),
    url: routinesUrl
  };
}
/**
 * React hook (compiler-memoized) that, once per mount, polls fired routine
 * triggers since the persisted watermark and surfaces a notification.
 */
function getDurationFormatter(): void {
  let cache = Ncc.c(3),
    {
      addNotification: addNotification
    } = Ci(),
    hasRunRef = Dnr.useRef(!1),
    effect,
    effectDeps;
  if (cache[0] !== addNotification) effect = () => {
    if (hasRunRef.current) return;
    if (hasRunRef.current = !0, la() || Vi() || !Eo() || !it("tengu_surreal_dali", !1) || !Xs("allow_remote_sessions")) return;
    let watermark = Ot().routineFiredWatermark;
    if (watermark === void 0) {
      let nowIso = new Date().toISOString();
      hn(config => config.routineFiredWatermark !== void 0 ? config : {
        ...config,
        routineFiredWatermark: nowIso
      });
      return;
    }
    (async () => {
      let triggers;
      try {
        triggers = await pXa();
      } catch (err) {
        A(`[routine-fired] fetchTriggers failed: ${err}`, {
          level: "warn"
        });
        return;
      }
      let {
        fired: firedTriggers,
        nextWatermark: nextWatermark
      } = formatDurationParts(triggers, watermark);
      if (firedTriggers.length === 0) return;
      let {
        jsx: notificationJsx
      } = splitDurationMillis(firedTriggers);
      addNotification({
        key: defaultDurationOptions,
        kind: "event",
        jsx: notificationJsx,
        priority: "medium",
        timeoutMs: 30000
      }), W("tengu_routine_fired_notification_shown", {
        count: firedTriggers.length,
        trigger_ids: firedTriggers.map(formatDuration).join(",")
      }), hn(config => config.routineFiredWatermark !== void 0 && !pluralizeDurationUnit(nextWatermark, config.routineFiredWatermark) ? config : {
        ...config,
        routineFiredWatermark: nextWatermark
      });
    })();
  }, effectDeps = [addNotification], cache[0] = addNotification, cache[1] = effect, cache[2] = effectDeps;else effect = cache[1], effectDeps = cache[2];
  Dnr.useEffect(effect, effectDeps);
}
/** Extract a trigger's id (used to join trigger ids for telemetry). */
function formatDuration(trigger): string {
  return trigger.id;
}
var Ncc,
  Dnr,
  A9,
  defaultDurationOptions = "routine-fired";
var initDurationFormatter = b(() => {
  lt();
  ff();
  Sc();
  fd();
  je();
  jn();
  kt();
  Bu();
  $_o();
  lo();
  tr();
  qe();
  Xo();
  $d();
  Ncc = x(tt(), 1), Dnr = x(et(), 1), A9 = x(oe(), 1);
});

export {nowForDurationFormat as wGm,formatDurationPart as kGm,pluralizeDurationUnit as xnr,formatDurationParts as HGm,splitDurationMillis as IGm,getDurationFormatter as Fcc,formatDuration as xGm,Ncc,Dnr,A9,defaultDurationOptions as vGm,initDurationFormatter as Bcc};
