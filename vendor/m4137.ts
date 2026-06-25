// @ts-nocheck
import {Q} from "../runtime.ts";
import {Y1} from "./m4119.ts";
import {r5e} from "./m4122.ts";
import {A4n} from "./m4123.ts";
import {ppt} from "./m4132.ts";
import {H4n} from "./m4128.ts";
import {agentMcpClients} from "./m4115.ts";
var Ufo=Q((EAy,mWa)=>{mWa.exports=Bfo;var gMp=Y1(),_Mp=r5e(),pWa=A4n(),O4n=ppt(),yMp=H4n(),dWa=agentMcpClients();function Bfo(e){pWa.call(this),this.nodeType=gMp.DOCUMENT_FRAGMENT_NODE,this.ownerDocument=e}Bfo.prototype=Object.create(pWa.prototype,{nodeName:{value:"#document-fragment"},nodeValue:{get:function(){return null},set:function(){}},textContent:Object.getOwnPropertyDescriptor(O4n.prototype,"textContent"),innerText:Object.getOwnPropertyDescriptor(O4n.prototype,"innerText"),querySelector:{value:function(e){var t=this.querySelectorAll(e);return t.length?t[0]:null}},querySelectorAll:{value:function(e){var t=Object.create(this);t.isHTML=!0,t.getElementsByTagName=O4n.prototype.getElementsByTagName,t.nextElement=Object.getOwnPropertyDescriptor(O4n.prototype,"firstElementChild").get;var n=yMp(e,t);return n.item?n:new _Mp(n)}},clone:{value:function(){return new Bfo(this.ownerDocument)}},isEqual:{value:function(t){return!0}},innerHTML:{get:function(){return this.serialize()},set:dWa.nyi},outerHTML:{get:function(){return this.serialize()},set:dWa.nyi}})});
export {Ufo};
