// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {gCa} from "./m3704.ts";
import {lva} from "./m3722.ts";
import {uva} from "./m3723.ts";
import {Tva} from "./m3727.ts";
var bva=X((Z1n)=>{Object.defineProperty(Z1n,"__esModule",{value:!0});Z1n.MeterProvider=void 0;var Q1n=Xi(),iup=gCa(),aup=lva(),lup=uva(),cup=Tva();class Sva{_sharedState;_shutdown=!1;constructor(e){if(this._sharedState=new aup.MeterProviderSharedState(e?.resource??(0,iup.defaultResource)()),e?.views!=null&&e.views.length>0)for(let t of e.views)this._sharedState.viewRegistry.addView(new cup.View(t));if(e?.readers!=null&&e.readers.length>0)for(let t of e.readers){let n=new lup.MetricCollector(this._sharedState,t);t.setMetricProducer(n),this._sharedState.metricCollectors.push(n)}}getMeter(e,t="",n={}){if(this._shutdown)return Q1n.diag.warn("A shutdown MeterProvider cannot provide a Meter"),(0,Q1n.createNoopMeter)();return this._sharedState.getMeterSharedState({name:e,version:t,schemaUrl:n.schemaUrl}).meter}async shutdown(e){if(this._shutdown){Q1n.diag.warn("shutdown may only be called once per MeterProvider");return}this._shutdown=!0,await Promise.all(this._sharedState.metricCollectors.map((t)=>t.shutdown(e)))}async forceFlush(e){if(this._shutdown){Q1n.diag.warn("invalid attempt to force flush after MeterProvider shutdown");return}await Promise.all(this._sharedState.metricCollectors.map((t)=>t.forceFlush(e)))}}Z1n.MeterProvider=Sva});
export {bva};
