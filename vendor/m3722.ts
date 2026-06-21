// @ts-nocheck
import {X} from "../runtime.ts";
import {Mle} from "./m3660.ts";
import {yCa} from "./m3705.ts";
import {iva} from "./m3721.ts";
import {yFt} from "./m3676.ts";
var lva=X((V1n)=>{Object.defineProperty(V1n,"__esModule",{value:!0});V1n.MeterProviderSharedState=void 0;var Ycp=Mle(),Jcp=yCa(),Xcp=iva(),Qcp=yFt();class ava{viewRegistry=new Jcp.ViewRegistry;metricCollectors=[];meterSharedStates=new Map;resource;constructor(e){this.resource=e}getMeterSharedState(e){let t=(0,Ycp.instrumentationScopeId)(e),n=this.meterSharedStates.get(t);if(n==null)n=new Xcp.MeterSharedState(this,e),this.meterSharedStates.set(t,n);return n}selectAggregations(e){let t=[];for(let n of this.metricCollectors)t.push([n,(0,Qcp.toAggregation)(n.selectAggregation(e))]);return t}}V1n.MeterProviderSharedState=ava});
export {lva};
