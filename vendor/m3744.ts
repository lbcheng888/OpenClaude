// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {D0a} from "./m3720.ts";
import {Cxa} from "./m3738.ts";
import {Rxa} from "./m3739.ts";
import {Lxa} from "./m3743.ts";
var Nxa=Q((KBn)=>{Object.defineProperty(KBn,"__esModule",{value:!0});KBn.MeterProvider=void 0;var VBn=xi(),zSp=D0a(),jSp=Cxa(),YSp=Rxa(),JSp=Lxa();class Mxa{_sharedState;_shutdown=!1;constructor(e){if(this._sharedState=new jSp.MeterProviderSharedState(e?.resource??(0,zSp.defaultResource)()),e?.views!=null&&e.views.length>0)for(let t of e.views)this._sharedState.viewRegistry.addView(new JSp.View(t));if(e?.readers!=null&&e.readers.length>0)for(let t of e.readers){let n=new YSp.MetricCollector(this._sharedState,t);t.setMetricProducer(n),this._sharedState.metricCollectors.push(n)}}getMeter(e,t="",n={}){if(this._shutdown)return VBn.diag.warn("A shutdown MeterProvider cannot provide a Meter"),(0,VBn.createNoopMeter)();return this._sharedState.getMeterSharedState({name:e,version:t,schemaUrl:n.schemaUrl}).meter}async shutdown(e){if(this._shutdown){VBn.diag.warn("shutdown may only be called once per MeterProvider");return}this._shutdown=!0,await Promise.all(this._sharedState.metricCollectors.map((t)=>t.shutdown(e)))}async forceFlush(e){if(this._shutdown){VBn.diag.warn("invalid attempt to force flush after MeterProvider shutdown");return}await Promise.all(this._sharedState.metricCollectors.map((t)=>t.forceFlush(e)))}}KBn.MeterProvider=Mxa});
export {Nxa};
