// @ts-nocheck
import {Npa,gQr} from "./m3416.ts";
import {zst} from "./m3419.ts";
import {pQr,Ipa} from "./m3409.ts";
import {b,M} from "../runtime.ts";
import {yQr} from "./m3421.ts";
import {Xi} from "./m2091.ts";
import {ag} from "./m2133.ts";
class TQr{_sampler;_generalLimits;_spanLimits;_idGenerator;instrumentationScope;_resource;_spanProcessor;constructor(e,t,n,r){let o=Npa(t);this._sampler=o.sampler,this._generalLimits=o.generalLimits,this._spanLimits=o.spanLimits,this._idGenerator=t.idGenerator||new zst,this._resource=n,this._spanProcessor=r,this.instrumentationScope=e}startSpan(e,t={},n=tR.context.active()){if(t.root)n=tR.trace.deleteSpan(n);let r=tR.trace.getSpan(n);if(Yst.isTracingSuppressed(n))return tR.diag.debug("Instrumentation suppressed, returning Noop Span"),tR.trace.wrapSpanContext(tR.INVALID_SPAN_CONTEXT);let o=r?.spanContext(),s=this._idGenerator.generateSpanId(),i,a,l;if(!o||!tR.trace.isSpanContextValid(o))a=this._idGenerator.generateTraceId();else a=o.traceId,l=o.traceState,i=o;let c=t.kind??tR.SpanKind.INTERNAL,u=(t.links??[]).map((g)=>({context:g.context,attributes:Yst.sanitizeAttributes(g.attributes)})),d=Yst.sanitizeAttributes(t.attributes),p=this._sampler.shouldSample(n,a,e,c,d,u);l=p.traceState??l;let m=p.decision===tR.SamplingDecision.RECORD_AND_SAMPLED?tR.TraceFlags.SAMPLED:tR.TraceFlags.NONE,f={traceId:a,spanId:s,traceFlags:m,traceState:l};if(p.decision===tR.SamplingDecision.NOT_RECORD)return tR.diag.debug("Recording is off, propagating context in a non-recording span"),tR.trace.wrapSpanContext(f);let A=Yst.sanitizeAttributes(Object.assign(d,p.attributes));return new pQr({resource:this._resource,scope:this.instrumentationScope,context:n,spanContext:f,name:e,kind:c,links:u,parentSpanContext:i,attributes:A,startTime:t.startTime,spanProcessor:this._spanProcessor,spanLimits:this._spanLimits})}startActiveSpan(e,t,n,r){let o,s,i;if(arguments.length<2)return;else if(arguments.length===2)i=t;else if(arguments.length===3)o=t,i=n;else o=t,s=n,i=r;let a=s??tR.context.active(),l=this.startSpan(e,o,a),c=tR.trace.setSpan(a,l);return tR.context.with(c,i,void 0,l)}getGeneralLimits(){return this._generalLimits}getSpanLimits(){return this._spanLimits}}
var tR,Yst;
var Wpa=b(()=>{Ipa();gQr();yQr();tR=M(Xi(),1),Yst=M(ag(),1)});
export {TQr,tR,Yst,Wpa};
