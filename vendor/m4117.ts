// @ts-nocheck
import {Q} from "../runtime.ts";
import {agentMcpClients} from "./m4115.ts";
var ofo=Q((rAy,n8a)=>{var Lye=agentMcpClients(),DY=n8a.exports={valid:function(e){return Lye.assert(e,"list falsy"),Lye.assert(e._previousSibling,"previous falsy"),Lye.assert(e._nextSibling,"next falsy"),!0},insertBefore:function(e,t){Lye.assert(DY.valid(e)&&DY.valid(t));var n=e,r=e._previousSibling,o=t,s=t._previousSibling;n._previousSibling=s,r._nextSibling=o,s._nextSibling=n,o._previousSibling=r,Lye.assert(DY.valid(e)&&DY.valid(t))},replace:function(e,t){if(Lye.assert(DY.valid(e)&&(t===null||DY.valid(t))),t!==null)DY.insertBefore(t,e);DY.remove(e),Lye.assert(DY.valid(e)&&(t===null||DY.valid(t)))},remove:function(e){Lye.assert(DY.valid(e));var t=e._previousSibling;if(t===e)return;var n=e._nextSibling;t._nextSibling=n,n._previousSibling=t,e._previousSibling=e._nextSibling=e,Lye.assert(DY.valid(e))}}});
export {ofo};
