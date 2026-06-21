// @ts-nocheck
import {SPn,hQr} from "./m3415.ts";
import {Bpa,gQr} from "./m3416.ts";
import {SQr,Vpa} from "./m3423.ts";
import {TQr,Wpa} from "./m3422.ts";
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
import {zXe} from "./m2158.ts";
class GNt{_config;_tracers=new Map;_resource;_activeSpanProcessor;constructor(e={}){let t=Kpa.merge({},SPn(),Bpa(e));this._resource=t.resource??zpa.defaultResource(),this._config=Object.assign({},t,{resource:this._resource});let n=[];if(e.spanProcessors?.length)n.push(...e.spanProcessors);this._activeSpanProcessor=new SQr(n)}getTracer(e,t,n){let r=`${e}@${t||""}:${n?.schemaUrl||""}`;if(!this._tracers.has(r))this._tracers.set(r,new TQr({name:e,version:t,schemaUrl:n?.schemaUrl},this._config,this._resource,this._activeSpanProcessor));return this._tracers.get(r)}forceFlush(){let e=this._config.forceFlushTimeoutMillis,t=this._activeSpanProcessor._spanProcessors.map((n)=>new Promise((r)=>{let o,s=setTimeout(()=>{r(Error(`Span processor did not completed within timeout period of ${e} ms`)),o=J9e.timeout},e);n.forceFlush().then(()=>{if(clearTimeout(s),o!==J9e.timeout)o=J9e.resolved,r(o)}).catch((i)=>{clearTimeout(s),o=J9e.error,r(i)})}));return new Promise((n,r)=>{Promise.all(t).then((o)=>{let s=o.filter((i)=>i!==J9e.resolved);if(s.length>0)r(s);else n()}).catch((o)=>r([o]))})}shutdown(){return this._activeSpanProcessor.shutdown()}}
var Kpa,zpa,J9e;
var Ypa=b(()=>{Wpa();hQr();Vpa();gQr();Kpa=M(ag(),1),zpa=M(zXe(),1);(function(e){e[e.resolved=0]="resolved",e[e.timeout=1]="timeout",e[e.error=2]="error",e[e.unresolved=3]="unresolved"})(J9e||(J9e={}))});
export {GNt,Kpa,zpa,J9e,Ypa};
