// @ts-nocheck
import {Q} from "../runtime.ts";
import {JBe} from "./m2055.ts";
var zli=Q((TTn)=>{Object.defineProperty(TTn,"__esModule",{value:!0});TTn.DiagComponentLogger=void 0;var Qtd=JBe();class Kli{constructor(e){this._namespace=e.namespace||"DiagComponentLogger"}debug(...e){return Txt("debug",this._namespace,e)}error(...e){return Txt("error",this._namespace,e)}info(...e){return Txt("info",this._namespace,e)}warn(...e){return Txt("warn",this._namespace,e)}verbose(...e){return Txt("verbose",this._namespace,e)}}TTn.DiagComponentLogger=Kli;function Txt(e,t,n){let r=(0,Qtd.getGlobal)("diag");if(!r)return;return n.unshift(t),r[e](...n)}});
export {zli};
