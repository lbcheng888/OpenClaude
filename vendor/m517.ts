// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
class tKo{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){if(this.handlers[e])this.handlers[e]=null}clear(){if(this.handlers)this.handlers=[]}forEach(e){er.forEach(this.handlers,function(n){if(n!==null)e(n)})}}
var ypr;
var nKo=b(()=>{ZE();ypr=tKo});
export {tKo,ypr,nKo};
