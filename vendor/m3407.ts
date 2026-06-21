// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {zXe} from "./m2158.ts";
import {mpa} from "./m3401.ts";
import {Apa} from "./m3402.ts";
import {vpa} from "./m3406.ts";
var Rpa=X((hPn)=>{Object.defineProperty(hPn,"__esModule",{value:!0});hPn.MeterProvider=void 0;var APn=Xi(),w7d=zXe(),R7d=mpa(),x7d=Apa(),k7d=vpa();class wpa{_sharedState;_shutdown=!1;constructor(e){if(this._sharedState=new R7d.MeterProviderSharedState(e?.resource??(0,w7d.defaultResource)()),e?.views!=null&&e.views.length>0)for(let t of e.views)this._sharedState.viewRegistry.addView(new k7d.View(t));if(e?.readers!=null&&e.readers.length>0)for(let t of e.readers){let n=new x7d.MetricCollector(this._sharedState,t);t.setMetricProducer(n),this._sharedState.metricCollectors.push(n)}}getMeter(e,t="",n={}){if(this._shutdown)return APn.diag.warn("A shutdown MeterProvider cannot provide a Meter"),(0,APn.createNoopMeter)();return this._sharedState.getMeterSharedState({name:e,version:t,schemaUrl:n.schemaUrl}).meter}async shutdown(e){if(this._shutdown){APn.diag.warn("shutdown may only be called once per MeterProvider");return}this._shutdown=!0,await Promise.all(this._sharedState.metricCollectors.map((t)=>t.shutdown(e)))}async forceFlush(e){if(this._shutdown){APn.diag.warn("invalid attempt to force flush after MeterProvider shutdown");return}await Promise.all(this._sharedState.metricCollectors.map((t)=>t.forceFlush(e)))}}hPn.MeterProvider=wpa});
export {Rpa};
