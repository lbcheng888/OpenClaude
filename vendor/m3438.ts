// @ts-nocheck
import {QTa,Zno} from "./m3432.ts";
import {Vat} from "./m3435.ts";
import {jno,KTa} from "./m3425.ts";
import {b,x} from "../runtime.ts";
import {tro} from "./m3437.ts";
import {xi} from "./m2096.ts";
import {pg} from "./m2138.ts";
class nro{_sampler;_generalLimits;_spanLimits;_idGenerator;instrumentationScope;_resource;_spanProcessor;constructor(e,t,n,r){let o=QTa(t);this._sampler=o.sampler,this._generalLimits=o.generalLimits,this._spanLimits=o.spanLimits,this._idGenerator=t.idGenerator||new Vat,this._resource=n,this._spanProcessor=r,this.instrumentationScope=e}startSpan(e,t={},n=iv.context.active()){if(t.root)n=iv.trace.deleteSpan(n);let r=iv.trace.getSpan(n);if(Kat.isTracingSuppressed(n))return iv.diag.debug("Instrumentation suppressed, returning Noop Span"),iv.trace.wrapSpanContext(iv.INVALID_SPAN_CONTEXT);let o=r?.spanContext(),s=this._idGenerator.generateSpanId(),i,a,l;if(!o||!iv.trace.isSpanContextValid(o))a=this._idGenerator.generateTraceId();else a=o.traceId,l=o.traceState,i=o;let c=t.kind??iv.SpanKind.INTERNAL,u=(t.links??[]).map((_)=>({context:_.context,attributes:Kat.sanitizeAttributes(_.attributes)})),d=Kat.sanitizeAttributes(t.attributes),p=this._sampler.shouldSample(n,a,e,c,d,u);l=p.traceState??l;let m=p.decision===iv.SamplingDecision.RECORD_AND_SAMPLED?iv.TraceFlags.SAMPLED:iv.TraceFlags.NONE,f={traceId:a,spanId:s,traceFlags:m,traceState:l};if(p.decision===iv.SamplingDecision.NOT_RECORD)return iv.diag.debug("Recording is off, propagating context in a non-recording span"),iv.trace.wrapSpanContext(f);let h=Kat.sanitizeAttributes(Object.assign(d,p.attributes));return new jno({resource:this._resource,scope:this.instrumentationScope,context:n,spanContext:f,name:e,kind:c,links:u,parentSpanContext:i,attributes:h,startTime:t.startTime,spanProcessor:this._spanProcessor,spanLimits:this._spanLimits})}startActiveSpan(e,t,n,r){let o,s,i;if(arguments.length<2)return;else if(arguments.length===2)i=t;else if(arguments.length===3)o=t,i=n;else o=t,s=n,i=r;let a=s??iv.context.active(),l=this.startSpan(e,o,a),c=iv.trace.setSpan(a,l);return iv.context.with(c,i,void 0,l)}getGeneralLimits(){return this._generalLimits}getSpanLimits(){return this._spanLimits}}
var iv,Kat;
var sSa=b(()=>{KTa();Zno();tro();iv=x(xi(),1),Kat=x(pg(),1)});
export {nro,iv,Kat,sSa};
