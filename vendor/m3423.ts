// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {zZe} from "./m2163.ts";
import {kTa} from "./m3417.ts";
import {ITa} from "./m3418.ts";
import {UTa} from "./m3422.ts";
var qTa=Q((cMn)=>{Object.defineProperty(cMn,"__esModule",{value:!0});cMn.MeterProvider=void 0;var lMn=xi(),mrp=zZe(),frp=kTa(),hrp=ITa(),grp=UTa();class $Ta{_sharedState;_shutdown=!1;constructor(e){if(this._sharedState=new frp.MeterProviderSharedState(e?.resource??(0,mrp.defaultResource)()),e?.views!=null&&e.views.length>0)for(let t of e.views)this._sharedState.viewRegistry.addView(new grp.View(t));if(e?.readers!=null&&e.readers.length>0)for(let t of e.readers){let n=new hrp.MetricCollector(this._sharedState,t);t.setMetricProducer(n),this._sharedState.metricCollectors.push(n)}}getMeter(e,t="",n={}){if(this._shutdown)return lMn.diag.warn("A shutdown MeterProvider cannot provide a Meter"),(0,lMn.createNoopMeter)();return this._sharedState.getMeterSharedState({name:e,version:t,schemaUrl:n.schemaUrl}).meter}async shutdown(e){if(this._shutdown){lMn.diag.warn("shutdown may only be called once per MeterProvider");return}this._shutdown=!0,await Promise.all(this._sharedState.metricCollectors.map((t)=>t.shutdown(e)))}async forceFlush(e){if(this._shutdown){lMn.diag.warn("invalid attempt to force flush after MeterProvider shutdown");return}await Promise.all(this._sharedState.metricCollectors.map((t)=>t.forceFlush(e)))}}cMn.MeterProvider=$Ta});
export {qTa};
