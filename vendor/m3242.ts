// @ts-nocheck
import {Q} from "../runtime.ts";
var bit=Q((pB)=>{Object.defineProperty(pB,"__esModule",{value:!0});pB.stringArray=pB.array=pB.func=pB.error=pB.number=pB.string=pB.boolean=void 0;function UYd(e){return e===!0||e===!1}pB.boolean=UYd;function jua(e){return typeof e==="string"||e instanceof String}pB.string=jua;function $Yd(e){return typeof e==="number"||e instanceof Number}pB.number=$Yd;function qYd(e){return e instanceof Error}pB.error=qYd;function WYd(e){return typeof e==="function"}pB.func=WYd;function Yua(e){return Array.isArray(e)}pB.array=Yua;function GYd(e){return Yua(e)&&e.every((t)=>jua(t))}pB.stringArray=GYd});
export {bit};
