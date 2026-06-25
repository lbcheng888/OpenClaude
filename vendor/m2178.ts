// @ts-nocheck
import {E2r,b2r,ETi} from "./m2177.ts";
import {b} from "../runtime.ts";
class C2r{resource;forceFlushTimeoutMillis;logRecordLimits;processors;loggers=new Map;activeProcessor;registeredLogRecordProcessors=[];constructor(e,t,n,r){if(this.resource=e,this.forceFlushTimeoutMillis=t,this.logRecordLimits=n,this.processors=r,r.length>0)this.registeredLogRecordProcessors=r,this.activeProcessor=new E2r(this.registeredLogRecordProcessors,this.forceFlushTimeoutMillis);else this.activeProcessor=new b2r}}
var CTi=b(()=>{ETi()});
export {C2r,CTi};
