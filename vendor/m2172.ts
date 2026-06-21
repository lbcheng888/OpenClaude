// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
class z1r{forceFlush(){return Promise.resolve()}onEmit(e,t){}shutdown(){return Promise.resolve()}}
class Y1r{processors;forceFlushTimeoutMillis;constructor(e,t){this.processors=e,this.forceFlushTimeoutMillis=t}async forceFlush(){let e=this.forceFlushTimeoutMillis;await Promise.all(this.processors.map((t)=>wmi.callWithTimeout(t.forceFlush(),e)))}onEmit(e,t){this.processors.forEach((n)=>n.onEmit(e,t))}async shutdown(){await Promise.all(this.processors.map((e)=>e.shutdown()))}}
var wmi;
var Rmi=b(()=>{wmi=M(ag(),1)});
export {z1r,Y1r,wmi,Rmi};
