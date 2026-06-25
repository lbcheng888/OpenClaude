// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var Lio=Q((_Fn)=>{Object.defineProperty(_Fn,"__esModule",{value:!0});_Fn.loggingErrorHandler=void 0;var Ggp=xi();function Vgp(){return(e)=>{Ggp.diag.error(Kgp(e))}}_Fn.loggingErrorHandler=Vgp;function Kgp(e){if(typeof e==="string")return e;else return JSON.stringify(zgp(e))}function zgp(e){let t={},n=e;while(n!==null)Object.getOwnPropertyNames(n).forEach((r)=>{if(t[r])return;let o=n[r];if(o)t[r]=String(o)}),n=Object.getPrototypeOf(n);return t}});
export {Lio};
