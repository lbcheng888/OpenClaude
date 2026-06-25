// @ts-nocheck
import {Q} from "../runtime.ts";
import {agentMcpClients} from "./m4115.ts";
var wfo=Q((gAy,V8a)=>{V8a.exports=G8a;var upt=agentMcpClients();function G8a(e){this.element=e}Object.defineProperties(G8a.prototype,{length:{get:upt.shouldOverride},item:{value:upt.shouldOverride},getNamedItem:{value:function(t){return this.element.getAttributeNode(t)}},getNamedItemNS:{value:function(t,n){return this.element.getAttributeNodeNS(t,n)}},setNamedItem:{value:upt.nyi},setNamedItemNS:{value:upt.nyi},removeNamedItem:{value:function(t){var n=this.element.getAttributeNode(t);if(n)return this.element.removeAttribute(t),n;upt.NotFoundError()}},removeNamedItemNS:{value:function(t,n){var r=this.element.getAttributeNodeNS(t,n);if(r)return this.element.removeAttributeNS(t,n),r;upt.NotFoundError()}}})});
export {wfo};
