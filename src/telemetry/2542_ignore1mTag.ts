// @ts-nocheck
import {getCanonicalName as qo,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {oMi as Iki,gOt as g0t} from "../../vendor/m2540.ts";
import {j8 as h5,UOi as mxi,BZ as PZ} from "../../vendor/m2520.ts";
import {getAPIProvider as Hr,isFirstPartyAnthropicBaseUrl as Gu,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function sg(e) {
  let t = getImageLimits(),
    n = e ? qo(e) : undefined,
    r = e ? Iki(e, {
      ignore1mTag: true
    })?.imageLimits ?? (n && Object.hasOwn(HIGH_RES_MODEL_IMAGE_LIMITS, n) ? HIGH_RES_MODEL_IMAGE_LIMITS[n] : undefined) : undefined;
  if (!r) {
    if (t === h5.maxBase64Size) return h5;
    return {
      ...h5,
      maxBase64Size: t,
      targetRawSize: t * 3 / 4
    };
  }
  let o = r.maxBase64Size ?? t;
  return {
    maxWidth: r.maxWidth ?? h5.maxWidth,
    maxHeight: r.maxHeight ?? h5.maxHeight,
    maxBase64Size: o,
    targetRawSize: r.targetRawSize ?? o * 3 / 4
  };
}
function getImageLimits() {
  if (Hr() === "firstParty" && Gu() && ut("tengu_crimson_vector", false)) return mxi;
  return h5.maxBase64Size;
}
var HIGH_RES_MODEL_IMAGE_LIMITS;
var Nv = b(() => {
  PZ();
  Yn();
  g0t();
  Fo();
  si();
  HIGH_RES_MODEL_IMAGE_LIMITS = {
    "claude-fable-5": {
      maxWidth: 2000,
      maxHeight: 2000
    },
    "claude-mythos-5": {
      maxWidth: 2000,
      maxHeight: 2000
    },
    "claude-opus-4-7": {
      maxWidth: 2000,
      maxHeight: 2000
    },
    "claude-opus-4-8": {
      maxWidth: 2000,
      maxHeight: 2000
    }
  };
});
export {sg as gg,getImageLimits as jAd,HIGH_RES_MODEL_IMAGE_LIMITS as sMi,Nv as t1};
