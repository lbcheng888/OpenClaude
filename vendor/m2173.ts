// @ts-nocheck
import {Y1r,z1r,Rmi} from "./m2172.ts";
import {b} from "../runtime.ts";
class J1r{resource;forceFlushTimeoutMillis;logRecordLimits;processors;loggers=new Map;activeProcessor;registeredLogRecordProcessors=[];constructor(e,t,n,r){if(this.resource=e,this.forceFlushTimeoutMillis=t,this.logRecordLimits=n,this.processors=r,r.length>0)this.registeredLogRecordProcessors=r,this.activeProcessor=new Y1r(this.registeredLogRecordProcessors,this.forceFlushTimeoutMillis);else this.activeProcessor=new z1r}}
var xmi=b(()=>{Rmi()});
export {J1r,xmi};
