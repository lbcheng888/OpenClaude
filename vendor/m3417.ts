// @ts-nocheck
import {Q} from "../runtime.ts";
import {Wee} from "./m3378.ts";
import {Bya} from "./m3400.ts";
import {vTa} from "./m3416.ts";
import {fUt} from "./m3394.ts";
var kTa=Q((nMn)=>{Object.defineProperty(nMn,"__esModule",{value:!0});nMn.MeterProviderSharedState=void 0;var nrp=Wee(),rrp=Bya(),orp=vTa(),srp=fUt();class wTa{resource;viewRegistry=new rrp.ViewRegistry;metricCollectors=[];meterSharedStates=new Map;constructor(e){this.resource=e}getMeterSharedState(e){let t=(0,nrp.instrumentationScopeId)(e),n=this.meterSharedStates.get(t);if(n==null)n=new orp.MeterSharedState(this,e),this.meterSharedStates.set(t,n);return n}selectAggregations(e){let t=[];for(let n of this.metricCollectors)t.push([n,(0,srp.toAggregation)(n.selectAggregation(e))]);return t}}nMn.MeterProviderSharedState=wTa});
export {kTa};
