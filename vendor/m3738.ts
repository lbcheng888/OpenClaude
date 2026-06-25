// @ts-nocheck
import {Q} from "../runtime.ts";
import {Lle} from "./m3676.ts";
import {O0a} from "./m3721.ts";
import {bxa} from "./m3737.ts";
import {Y2t} from "./m3692.ts";
var Cxa=Q((BBn)=>{Object.defineProperty(BBn,"__esModule",{value:!0});BBn.MeterProviderSharedState=void 0;var MSp=Lle(),NSp=O0a(),FSp=bxa(),BSp=Y2t();class Exa{viewRegistry=new NSp.ViewRegistry;metricCollectors=[];meterSharedStates=new Map;resource;constructor(e){this.resource=e}getMeterSharedState(e){let t=(0,MSp.instrumentationScopeId)(e),n=this.meterSharedStates.get(t);if(n==null)n=new FSp.MeterSharedState(this,e),this.meterSharedStates.set(t,n);return n}selectAggregations(e){let t=[];for(let n of this.metricCollectors)t.push([n,(0,BSp.toAggregation)(n.selectAggregation(e))]);return t}}BBn.MeterProviderSharedState=Exa});
export {Cxa};
