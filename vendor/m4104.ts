// @ts-nocheck
import {X} from "../runtime.ts";
import {Xk} from "./m4102.ts";
var hco=X((Rd_,K$a)=>{var h_e=Xk(),YY=K$a.exports={valid:function(e){return h_e.assert(e,"list falsy"),h_e.assert(e._previousSibling,"previous falsy"),h_e.assert(e._nextSibling,"next falsy"),!0},insertBefore:function(e,t){h_e.assert(YY.valid(e)&&YY.valid(t));var n=e,r=e._previousSibling,o=t,s=t._previousSibling;n._previousSibling=s,r._nextSibling=o,s._nextSibling=n,o._previousSibling=r,h_e.assert(YY.valid(e)&&YY.valid(t))},replace:function(e,t){if(h_e.assert(YY.valid(e)&&(t===null||YY.valid(t))),t!==null)YY.insertBefore(t,e);YY.remove(e),h_e.assert(YY.valid(e)&&(t===null||YY.valid(t)))},remove:function(e){h_e.assert(YY.valid(e));var t=e._previousSibling;if(t===e)return;var n=e._nextSibling;t._nextSibling=n,n._previousSibling=t,e._previousSibling=e._nextSibling=e,h_e.assert(YY.valid(e))}}});
export {hco};
