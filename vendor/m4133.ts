// @ts-nocheck
import {Q} from "../runtime.ts";
import {Y1} from "./m4119.ts";
import {r5e} from "./m4122.ts";
import {agentMcpClients} from "./m4115.ts";
var Ofo=Q((yAy,tWa)=>{tWa.exports=eWa;var Q8a=Y1(),dMp=r5e(),Z8a=agentMcpClients(),X8a=Z8a.HierarchyRequestError,pMp=Z8a.NotFoundError;function eWa(){Q8a.call(this)}eWa.prototype=Object.create(Q8a.prototype,{hasChildNodes:{value:function(){return!1}},firstChild:{value:null},lastChild:{value:null},insertBefore:{value:function(e,t){if(!e.nodeType)throw TypeError("not a node");X8a()}},replaceChild:{value:function(e,t){if(!e.nodeType)throw TypeError("not a node");X8a()}},removeChild:{value:function(e){if(!e.nodeType)throw TypeError("not a node");pMp()}},removeChildren:{value:function(){}},childNodes:{get:function(){if(!this._childNodes)this._childNodes=new dMp;return this._childNodes}}})});
export {Ofo};
