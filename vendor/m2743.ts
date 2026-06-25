// @ts-nocheck
import {getDynamicConfig_BLOCKS_ON_INIT,getDynamicConfig_CACHED_MAY_BE_STALE,jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../runtime.ts";
function DMd(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)?e:o7r}
function bqi(e,t){if(typeof t!=="string"||t==="")return;let n=DMd(e)[t];return typeof n==="object"&&n!==null?n:void 0}
async function Eqi(e){let t=await getDynamicConfig_BLOCKS_ON_INIT(Sqi,o7r);return Cqi(bqi(t,e))}
function Cqi(e){return Rqi(e?.block)}
function Aqi(e){let t=bqi(getDynamicConfig_CACHED_MAY_BE_STALE(Sqi,o7r),e),n=Cqi(t);if(n===null)return null;return Rqi(t?.pickerHint)??n}
function Rqi(e){if(typeof e!=="string")return null;let t=e.trim();return t===""?null:t}
var Sqi="tengu-model-error-overrides",o7r;
var s7r=b(()=>{jn();o7r={}});
export {DMd,bqi,Eqi,Cqi,Aqi,Rqi,Sqi,o7r,s7r};
