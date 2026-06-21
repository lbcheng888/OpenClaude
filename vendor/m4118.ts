// @ts-nocheck
import {X} from "../runtime.ts";
import {Xk} from "./m4102.ts";
var Fco=X((Ud_,M9a)=>{M9a.exports=L9a;var mut=Xk();function L9a(e){this.element=e}Object.defineProperties(L9a.prototype,{length:{get:mut.shouldOverride},item:{value:mut.shouldOverride},getNamedItem:{value:function(t){return this.element.getAttributeNode(t)}},getNamedItemNS:{value:function(t,n){return this.element.getAttributeNodeNS(t,n)}},setNamedItem:{value:mut.nyi},setNamedItemNS:{value:mut.nyi},removeNamedItem:{value:function(t){var n=this.element.getAttributeNode(t);if(n)return this.element.removeAttribute(t),n;mut.NotFoundError()}},removeNamedItemNS:{value:function(t,n){var r=this.element.getAttributeNodeNS(t,n);if(r)return this.element.removeAttributeNS(t,n),r;mut.NotFoundError()}}})});
export {Fco};
