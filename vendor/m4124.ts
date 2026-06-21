// @ts-nocheck
import {X} from "../runtime.ts";
import {DN} from "./m4106.ts";
import {Mqe} from "./m4109.ts";
import {w$n} from "./m4110.ts";
import {Aut} from "./m4119.ts";
import {I$n} from "./m4115.ts";
import {Xk} from "./m4102.ts";
var Qco=X((Vd_,o3a)=>{o3a.exports=Xco;var Zxp=DN(),ekp=Mqe(),r3a=w$n(),M$n=Aut(),tkp=I$n(),n3a=Xk();function Xco(e){r3a.call(this),this.nodeType=Zxp.DOCUMENT_FRAGMENT_NODE,this.ownerDocument=e}Xco.prototype=Object.create(r3a.prototype,{nodeName:{value:"#document-fragment"},nodeValue:{get:function(){return null},set:function(){}},textContent:Object.getOwnPropertyDescriptor(M$n.prototype,"textContent"),innerText:Object.getOwnPropertyDescriptor(M$n.prototype,"innerText"),querySelector:{value:function(e){var t=this.querySelectorAll(e);return t.length?t[0]:null}},querySelectorAll:{value:function(e){var t=Object.create(this);t.isHTML=!0,t.getElementsByTagName=M$n.prototype.getElementsByTagName,t.nextElement=Object.getOwnPropertyDescriptor(M$n.prototype,"firstElementChild").get;var n=tkp(e,t);return n.item?n:new ekp(n)}},clone:{value:function(){return new Xco(this.ownerDocument)}},isEqual:{value:function(t){return!0}},innerHTML:{get:function(){return this.serialize()},set:n3a.nyi},outerHTML:{get:function(){return this.serialize()},set:n3a.nyi}})});
export {Qco};
