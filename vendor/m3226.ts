// @ts-nocheck
import {X} from "../runtime.ts";
var Tot=X((jF)=>{Object.defineProperty(jF,"__esModule",{value:!0});jF.stringArray=jF.array=jF.func=jF.error=jF.number=jF.string=jF.boolean=void 0;function Zqd(e){return e===!0||e===!1}jF.boolean=Zqd;function qra(e){return typeof e==="string"||e instanceof String}jF.string=qra;function e6d(e){return typeof e==="number"||e instanceof Number}jF.number=e6d;function t6d(e){return e instanceof Error}jF.error=t6d;function n6d(e){return typeof e==="function"}jF.func=n6d;function jra(e){return Array.isArray(e)}jF.array=jra;function r6d(e){return jra(e)&&e.every((t)=>qra(t))}jF.stringArray=r6d});
export {Tot};
