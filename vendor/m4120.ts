// @ts-nocheck
import {X} from "../runtime.ts";
import {DN} from "./m4106.ts";
import {Mqe} from "./m4109.ts";
import {Xk} from "./m4102.ts";
var Vco=X((qd_,V9a)=>{V9a.exports=G9a;var j9a=DN(),zxp=Mqe(),W9a=Xk(),q9a=W9a.HierarchyRequestError,Yxp=W9a.NotFoundError;function G9a(){j9a.call(this)}G9a.prototype=Object.create(j9a.prototype,{hasChildNodes:{value:function(){return!1}},firstChild:{value:null},lastChild:{value:null},insertBefore:{value:function(e,t){if(!e.nodeType)throw TypeError("not a node");q9a()}},replaceChild:{value:function(e,t){if(!e.nodeType)throw TypeError("not a node");q9a()}},removeChild:{value:function(e){if(!e.nodeType)throw TypeError("not a node");Yxp()}},removeChildren:{value:function(){}},childNodes:{get:function(){if(!this._childNodes)this._childNodes=new zxp;return this._childNodes}}})});
export {Vco};
