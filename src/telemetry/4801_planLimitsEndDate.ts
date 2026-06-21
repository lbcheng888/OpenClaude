// @ts-nocheck
import {getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {isFableAvailable,getDefaultFableModel,parseUserSpecifiedModel,mv,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {isModelAllowed,MO} from "../../vendor/m1451.ts";
import {the,X$,D0,xwn,eW} from "./2730_raw.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {aIe,jL} from "../../vendor/m3944.ts";
import {cY,rge} from "../../vendor/m3334.ts";
import {isTeamSubscriber,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {Cw,LB} from "../../vendor/m1284.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
/** Returns true if the Fable launch banner should be shown. */
function oCo() {
  if (getAPIProvider() !== "firstParty") return !1;
  if (!isFableAvailable()) return !1;
  if (!isModelAllowed(getDefaultFableModel())) return !1;
  return the().enabled !== !1;
}

/** Serializes current plan-limits state to a JSON string, or false if banner shouldn't show. */
function Qyl() {
  if (!oCo()) return !1;
  return JSON.stringify({
    planLimitsEndDate: the().planLimitsEndDate,
    isFirstParty: getAPIProvider() === "firstParty",
    promoOver: X$(),
    permanentAccess: D0()
  });
}

/** Logs the telemetry event when the Fable 5 launch banner is shown. */
function Etm() {
  logEvent("tengu_fable5_launch_shown", {});
}

/** React component rendering the Fable 5 launch / plan-limits banner. */
function Zyl() {
  let cacheSlots = Xyl.c(8),
    currentModel = aIe(),
    parsedModel = parseUserSpecifiedModel(currentModel),
    isFable5 = mv(parsedModel),
    apiProvider;
  if (cacheSlots[0] === Symbol.for("react.memo_cache_sentinel")) apiProvider = getAPIProvider(), cacheSlots[0] = apiProvider;else apiProvider = cacheSlots[0];
  let isFirstParty = apiProvider === "firstParty",
    promoOver,
    endDateFormatted;
  if (cacheSlots[1] === Symbol.for("react.memo_cache_sentinel")) {
    let planEndDate = the().planLimitsEndDate;
    promoOver = X$(), endDateFormatted = xwn(planEndDate), cacheSlots[1] = promoOver, cacheSlots[2] = endDateFormatted;
  } else promoOver = cacheSlots[1], endDateFormatted = cacheSlots[2];
  let endDateLabel = endDateFormatted;
  if (cY("fable5-launch", Etm), promoOver && !D0()) {
    let isNotTeamWithPremium = !(isTeamSubscriber() && !Cw()),
      promoOverBanner;
    if (cacheSlots[3] === Symbol.for("react.memo_cache_sentinel")) promoOverBanner = Px.createElement(Text, null, Px.createElement(Text, {
      bold: !0,
      color: "claude"
    }, "Fable now runs on usage credits.")), cacheSlots[3] = promoOverBanner;else promoOverBanner = cacheSlots[3];
    let promoOverBox;
    if (cacheSlots[4] === Symbol.for("react.memo_cache_sentinel")) promoOverBox = Px.createElement(Box, {
      flexDirection: "column"
    }, promoOverBanner, Px.createElement(Text, {
      dimColor: !0
    }, "Fable was included in your plan for a limited time, and now requires usage credits.", isNotTeamWithPremium ? " Run /model and select Fable — you'll be guided through usage credits setup if needed." : "")), cacheSlots[4] = promoOverBox;else promoOverBox = cacheSlots[4];
    return promoOverBox;
  }
  let includedInPlanNote;
  if (cacheSlots[5] === Symbol.for("react.memo_cache_sentinel")) includedInPlanNote = isFirstParty && !promoOver && !D0() ? Px.createElement(Text, {
    dimColor: !0
  }, "Included in your plan limits", " ", endDateLabel ? `until ${endDateLabel}` : "for a limited time", ", then switch to usage credits to continue.") : null, cacheSlots[5] = includedInPlanNote;else includedInPlanNote = cacheSlots[5];
  let planIncludedEl = includedInPlanNote;
  if (isFable5) {
    let fable5Banner;
    if (cacheSlots[6] === Symbol.for("react.memo_cache_sentinel")) fable5Banner = Px.createElement(Box, {
      flexDirection: "column"
    }, Px.createElement(Text, null, Px.createElement(Text, {
      bold: !0,
      color: "claude"
    }, "Fable 5 is here!"), " ", "Our newest model for complex, long-running work."), planIncludedEl), cacheSlots[6] = fable5Banner;else fable5Banner = cacheSlots[6];
    return fable5Banner;
  }
  let genericBanner;
  if (cacheSlots[7] === Symbol.for("react.memo_cache_sentinel")) genericBanner = Px.createElement(Box, {
    flexDirection: "column"
  }, Px.createElement(Text, null, "Meet", " ", Px.createElement(Text, {
    bold: !0,
    color: "claude"
  }, "Fable 5"), ", our newest model for complex, long-running work. Switch anytime with /model."), planIncludedEl), cacheSlots[7] = genericBanner;else genericBanner = cacheSlots[7];
  return genericBanner;
}
var Xyl, Px;
var sCo = b(() => {
  jL();
  ze();
  Ct();
  Ao();
  LB();
  eW();
  Mo();
  MO();
  li();
  rge();
  Xyl = M(rt(), 1), Px = M(Te(), 1);
});
export {oCo,Qyl,Etm,Zyl,Xyl,Px,sCo};
