// @ts-nocheck
import {getOauthConfig as Is,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {formatDuration as ea,ps as ds} from "../../vendor/m238.ts";
import {Bs as Os,rA as lA} from "../../vendor/m2550.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Ui as ji,Ld as np} from "../../vendor/m2459.ts";
import {getIsRemoteMode as ya,lt as ct} from "../session/0131_sent.ts";
import {ra as ta,Ap as hp} from "../config/0614_Ap.ts";
import {isClaudeAISubscriber as Co,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyAllowed as ii,rd as sd} from "../../vendor/m2205.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {VGa as wWa,Gpo as Fdo} from "../../vendor/m4273.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function nowForDurationFormat() {
  return `${Is().CLAUDE_AI_ORIGIN}/code/routines`;
}
function formatDurationPart(H) {
  let _ = Date.now() - Date.parse(H);
  if (!Number.isFinite(_) || _ < 60000) return "just now";
  return `${ea(_, {
    mostSignificantOnly: true
  })} ago`;
}
function pluralizeDurationUnit(H, _) {
  return Date.parse(H) > Date.parse(_);
}
function formatDurationParts(H, _) {
  let q = _;
  return {
    fired: H.filter(O => {
      if (!O.run_once_at || !O.last_fired_at) return false;
      if (!pluralizeDurationUnit(O.last_fired_at, _)) return false;
      if (pluralizeDurationUnit(O.last_fired_at, q)) q = O.last_fired_at;
      return true;
    }),
    nextWatermark: q
  };
}
function splitDurationMillis(H) {
  let _ = nowForDurationFormat(),
    q = H.reduce((O, T) => pluralizeDurationUnit(T.last_fired_at ?? "", O.last_fired_at ?? "") ? T : O),
    K = q.last_fired_at ? formatDurationPart(q.last_fired_at) : "";
  if (H.length === 1) {
    let O = H[0];
    return {
      jsx: durationUnitMillis.createElement(durationUnitMillis.Fragment, null, durationUnitMillis.createElement(Os, {
        status: "success",
        withSpace: true
      }), durationUnitMillis.createElement(w, {
        dimColor: true
      }, "routine "), durationUnitMillis.createElement(w, {
        color: "suggestion"
      }, O.name), durationUnitMillis.createElement(w, {
        dimColor: true
      }, " ", "ran", K ? ` ${K}` : "", " \xB7 ", _, "/"), durationUnitMillis.createElement(w, {
        color: "suggestion"
      }, O.id)),
      url: `${_}/${O.id}`
    };
  }
  return {
    jsx: durationUnitMillis.createElement(durationUnitMillis.Fragment, null, durationUnitMillis.createElement(Os, {
      status: "success",
      withSpace: true
    }), durationUnitMillis.createElement(w, {
      dimColor: true
    }, H.length, " routines ran", K ? ` (latest ${K})` : "", " \xB7", " "), durationUnitMillis.createElement(w, {
      color: "suggestion"
    }, "/routines")),
    url: _
  };
}
function getDurationFormatter() {
  let H = durationUnits.c(3),
    {
      addNotification: _
    } = ji(),
    q = durationUnitLabels.useRef(false),
    K,
    O;
  if (H[0] !== _) K = () => {
    if (q.current) return;
    if (q.current = true, ya() || ta() || !Co() || !ut("tengu_surreal_dali", false) || !ii("allow_remote_sessions")) return;
    let T = vt().routineFiredWatermark;
    if (T === undefined) {
      let z = new Date().toISOString();
      un($ => $.routineFiredWatermark !== undefined ? $ : {
        ...$,
        routineFiredWatermark: z
      });
      return;
    }
    (async () => {
      let z;
      try {
        z = await wWa();
      } catch (w) {
        v(`[routine-fired] fetchTriggers failed: ${w}`, {
          level: "warn"
        });
        return;
      }
      let {
        fired: $,
        nextWatermark: Y
      } = formatDurationParts(z, T);
      if ($.length === 0) return;
      let {
        jsx: A
      } = splitDurationMillis($);
      _({
        key: defaultDurationOptions,
        kind: "event",
        jsx: A,
        priority: "medium",
        timeoutMs: 30000
      }), j("tengu_routine_fired_notification_shown", {
        count: $.length,
        trigger_ids: $.map(formatDuration).join(",")
      }), un(w => w.routineFiredWatermark !== undefined && !pluralizeDurationUnit(Y, w.routineFiredWatermark) ? w : {
        ...w,
        routineFiredWatermark: Y
      });
    })();
  }, O = [_], H[0] = _, H[1] = K, H[2] = O;else K = H[1], O = H[2];
  durationUnitLabels.useEffect(K, O);
}
function formatDuration(H) {
  return H.id;
}
var durationUnits,
  durationUnitMillis,
  durationUnitLabels,
  defaultDurationOptions = "routine-fired";
var initDurationFormatter = b(() => {
  ct();
  lA();
  Hc();
  np();
  Je();
  Yn();
  Ct();
  sd();
  Fdo();
  mo();
  nr();
  je();
  ds();
  hp();
  durationUnits = L(nt(), 1), durationUnitMillis = L(Te(), 1), durationUnitLabels = L(Te(), 1);
});

export {nowForDurationFormat as Q2m,formatDurationPart as Z2m,pluralizeDurationUnit as xQn,formatDurationParts as e$m,splitDurationMillis as t$m,getDurationFormatter as Jec,formatDuration as n$m,durationUnits as Yec,durationUnitMillis as qC,durationUnitLabels as kQn,defaultDurationOptions as X2m,initDurationFormatter as Xec};
