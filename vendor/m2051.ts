// @ts-nocheck
import {X} from "../runtime.ts";
import {ZBe} from "./m2050.ts";
var Qni=X((Uhn)=>{Object.defineProperty(Uhn,"__esModule",{value:!0});Uhn.DiagComponentLogger=void 0;var PVu=ZBe();class Xni{constructor(e){this._namespace=e.namespace||"DiagComponentLogger"}debug(...e){return Vkt("debug",this._namespace,e)}error(...e){return Vkt("error",this._namespace,e)}info(...e){return Vkt("info",this._namespace,e)}warn(...e){return Vkt("warn",this._namespace,e)}verbose(...e){return Vkt("verbose",this._namespace,e)}}Uhn.DiagComponentLogger=Xni;function Vkt(e,t,n){let r=(0,PVu.getGlobal)("diag");if(!r)return;return n.unshift(t),r[e](...n)}});
export {Qni};
