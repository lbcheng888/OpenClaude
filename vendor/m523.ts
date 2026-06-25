// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
class QQo{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){if(this.handlers[e])this.handlers[e]=null}clear(){if(this.handlers)this.handlers=[]}forEach(e){rr.forEach(this.handlers,function(n){if(n!==null)e(n)})}}
var jgr;
var ZQo=b(()=>{oC();jgr=QQo});
export {QQo,jgr,ZQo};
