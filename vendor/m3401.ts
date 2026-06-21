// @ts-nocheck
import {X} from "../runtime.ts";
import {Yee} from "./m3362.ts";
import {Cda} from "./m3384.ts";
import {dpa} from "./m3400.ts";
import {BNt} from "./m3378.ts";
var mpa=X((cPn)=>{Object.defineProperty(cPn,"__esModule",{value:!0});cPn.MeterProviderSharedState=void 0;var A7d=Yee(),h7d=Cda(),g7d=dpa(),_7d=BNt();class ppa{resource;viewRegistry=new h7d.ViewRegistry;metricCollectors=[];meterSharedStates=new Map;constructor(e){this.resource=e}getMeterSharedState(e){let t=(0,A7d.instrumentationScopeId)(e),n=this.meterSharedStates.get(t);if(n==null)n=new g7d.MeterSharedState(this,e),this.meterSharedStates.set(t,n);return n}selectAggregations(e){let t=[];for(let n of this.metricCollectors)t.push([n,(0,_7d.toAggregation)(n.selectAggregation(e))]);return t}}cPn.MeterProviderSharedState=ppa});
export {mpa};
