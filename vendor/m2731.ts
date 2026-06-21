// @ts-nocheck
import {getDynamicConfig_BLOCKS_ON_INIT,getDynamicConfig_CACHED_MAY_BE_STALE,zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../runtime.ts";
function Vwd(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)?e:x8r}
function IFi(e,t){if(typeof t!=="string"||t==="")return;let n=Vwd(e)[t];return typeof n==="object"&&n!==null?n:void 0}
async function DFi(e){let t=await getDynamicConfig_BLOCKS_ON_INIT(HFi,x8r);return PFi(IFi(t,e))}
function PFi(e){return LFi(e?.block)}
function OFi(e){let t=IFi(getDynamicConfig_CACHED_MAY_BE_STALE(HFi,x8r),e),n=PFi(t);if(n===null)return null;return LFi(t?.pickerHint)??n}
function LFi(e){if(typeof e!=="string")return null;let t=e.trim();return t===""?null:t}
var HFi="tengu-model-error-overrides",x8r;
var k8r=b(()=>{zn();x8r={}});
export {Vwd,IFi,DFi,PFi,OFi,LFi,HFi,x8r,k8r};
