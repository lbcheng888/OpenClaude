// @ts-nocheck
import {p$s as LC9,zEe as DMH,eNe as wvH,vA as g$,Woe as PqH,l4 as Fm,tE as nX} from "../api/1448_month.ts";
import {updateSettingsForSource as Jq,yr as v8} from "../config/0740_updateSettingsForSource.ts";
import {jb as yD,dd as j3,Dd as L3} from "../../vendor/m687.ts";
import {De as SH,Rn as y6} from "./0615_length.ts";
import {parseUserSpecifiedModel as J9,getDefaultMainLoopModelSetting as r0,getMainLoopModel as Q9,getCanonicalName as lq,Mo as Qq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {fromEnum as QH} from "../../vendor/m5.ts";
import {XDe as PhH,mVn as jd6} from "../../vendor/m4910.ts";
import {$B as IS,_Ye as krH,P8 as rF} from "../telemetry/1449_model.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function CLH(delta, updater) {
  updater(draft => {
    let next = draft;
    if ("cacheBreakerPhrase" in delta) {
      let rawValue = delta.cacheBreakerPhrase,
        coerced = rawValue == null ? undefined : String(rawValue);
      if (next.cacheBreakerPhrase !== coerced) next = {
        ...next,
        cacheBreakerPhrase: coerced
      };
    }
    if ("autoCompactWindow" in delta) {
      let rawValue = delta.autoCompactWindow,
        coerced = rawValue == null ? undefined : Number(rawValue);
      if (next.autoCompactWindow !== coerced) next = {
        ...next,
        autoCompactWindow: coerced
      };
    }
    if ("briefTranscript" in delta) {
      let coerced = Boolean(delta.briefTranscript);
      if (next.briefTranscript !== coerced) next = {
        ...next,
        briefTranscript: coerced
      };
    }
    if ("isBriefOnly" in delta) {
      let coerced = Boolean(delta.isBriefOnly);
      if (next.isBriefOnly !== coerced) next = {
        ...next,
        isBriefOnly: coerced
      };
    }
    if ("fastMode" in delta) {
      let coerced = Boolean(delta.fastMode);
      if (next.fastMode !== coerced) next = {
        ...next,
        fastMode: coerced
      };
    }
    if ("model" in delta) {
      let rawValue = delta.model,
        coerced = rawValue == null ? null : String(rawValue);
      if (next.mainLoopModelForSession !== coerced) next = {
        ...next,
        mainLoopModelForSession: coerced
      };
      if (next.mainLoopModel !== coerced) next = {
        ...next,
        mainLoopModel: coerced
      };
    }
    return next;
  });
}
function _Jq() {
  let sunsetDate = LC9();
  if (!sunsetDate) return null;
  return {
    key: "opus46-fast-mode-deprecation",
    text: `Opus 4.6 fast mode is deprecated and will be removed on ${sunsetDate}`,
    priority: "immediate",
    color: "warning"
  };
}
function Cg6(enabled, updater) {
  if (DMH(), Jq("userSettings", {
    fastMode: enabled ? true : undefined
  }), yD()) j3()?.sendControlRequest({
    subtype: "apply_flag_settings",
    settings: {
      fastMode: enabled ? true : null,
      ...(enabled && {
        model: wvH()
      })
    }
  }).catch(SH);
  if (CLH({
    fastMode: enabled
  }, updater), enabled) updater(draft => {
    if (g$(draft.mainLoopModel)) return draft;
    let fastModelId = wvH(),
      isDefaultModel = J9(fastModelId) === J9(r0());
    return {
      ...draft,
      mainLoopModel: isDefaultModel ? null : fastModelId,
      mainLoopModelForSession: null
    };
  });
}
async function bg6(enabled, getAppState, setAppState, source, onQueryEvent) {
  let unavailableReason = PqH();
  if (unavailableReason) return `Fast mode unavailable: ${unavailableReason}`;
  let {
    mainLoopModel: currentMainLoopModel
  } = getAppState();
  if (Cg6(enabled, setAppState), c("tengu_fast_mode_toggled", {
    enabled: enabled,
    source: QH(source)
  }), enabled) {
    let statusLabel = PhH(true),
      modelSwitchSuffix = !g$(currentMainLoopModel) ? ` \xB7 model set to ${Fm()}` : "",
      activeModel = Q9(),
      resolvedModel = g$(activeModel) ? lq(activeModel) : "claude-opus-4-8",
      pricingString = IS(krH(true, resolvedModel)),
      deprecationNotification = _Jq();
    if (deprecationNotification) onQueryEvent?.({
      type: "notification",
      notification: deprecationNotification
    });
    return `${statusLabel} Fast mode ON${modelSwitchSuffix} \xB7 ${pricingString}`;
  } else return "Fast mode OFF";
}
var qJq = L(() => {
  jd6();
  L3();
  v_();
  nX();
  y6();
  Qq();
  rF();
  v8();
});

export {CLH as QDe,_Jq as Uvo,Cg6 as fVn,bg6 as AVn,qJq as $vo};
