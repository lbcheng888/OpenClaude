// @ts-nocheck
import {fMn,Qno} from "./m3431.ts";
import {ZTa,Zno} from "./m3432.ts";
import {rro,aSa} from "./m3439.ts";
import {nro,sSa} from "./m3438.ts";
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
import {zZe} from "./m2163.ts";
class bUt{_config;_tracers=new Map;_resource;_activeSpanProcessor;constructor(e={}){let t=lSa.merge({},fMn(),ZTa(e));this._resource=t.resource??cSa.defaultResource(),this._config=Object.assign({},t,{resource:this._resource});let n=[];if(e.spanProcessors?.length)n.push(...e.spanProcessors);this._activeSpanProcessor=new rro(n)}getTracer(e,t,n){let r=`${e}@${t||""}:${n?.schemaUrl||""}`;if(!this._tracers.has(r))this._tracers.set(r,new nro({name:e,version:t,schemaUrl:n?.schemaUrl},this._config,this._resource,this._activeSpanProcessor));return this._tracers.get(r)}forceFlush(){let e=this._config.forceFlushTimeoutMillis,t=this._activeSpanProcessor._spanProcessors.map((n)=>new Promise((r)=>{let o,s=setTimeout(()=>{r(Error(`Span processor did not completed within timeout period of ${e} ms`)),o=u4e.timeout},e);n.forceFlush().then(()=>{if(clearTimeout(s),o!==u4e.timeout)o=u4e.resolved,r(o)}).catch((i)=>{clearTimeout(s),o=u4e.error,r(i)})}));return new Promise((n,r)=>{Promise.all(t).then((o)=>{let s=o.filter((i)=>i!==u4e.resolved);if(s.length>0)r(s);else n()}).catch((o)=>r([o]))})}shutdown(){return this._activeSpanProcessor.shutdown()}}
var lSa,cSa,u4e;
var uSa=b(()=>{sSa();Qno();aSa();Zno();lSa=x(pg(),1),cSa=x(zZe(),1);(function(e){e[e.resolved=0]="resolved",e[e.timeout=1]="timeout",e[e.error=2]="error",e[e.unresolved=3]="unresolved"})(u4e||(u4e={}))});
export {bUt,lSa,cSa,u4e,uSa};
