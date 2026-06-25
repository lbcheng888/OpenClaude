// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
class b2r{forceFlush(){return Promise.resolve()}onEmit(e,t){}shutdown(){return Promise.resolve()}}
class E2r{processors;forceFlushTimeoutMillis;constructor(e,t){this.processors=e,this.forceFlushTimeoutMillis=t}async forceFlush(){let e=this.forceFlushTimeoutMillis;await Promise.all(this.processors.map((t)=>bTi.callWithTimeout(t.forceFlush(),e)))}onEmit(e,t){this.processors.forEach((n)=>n.onEmit(e,t))}async shutdown(){await Promise.all(this.processors.map((e)=>e.shutdown()))}}
var bTi;
var ETi=b(()=>{bTi=x(pg(),1)});
export {b2r,E2r,bTi,ETi};
