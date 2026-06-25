// @ts-nocheck
import {nu,lr} from "./m233.ts";
import {fa,ry} from "./m2253.ts";
import {Ec,dw} from "./m2593.ts";
import {Y0} from "../src/tools/2710_allErrors.ts";
import {b} from "../runtime.ts";
function rdt(e,t,n){e.updateTranscript(t,(r)=>({...r,...n.turnStartTime!==void 0&&{turnStartTime:n.turnStartTime},...n.totalPausedMs!==void 0&&{totalPausedMs:n.totalPausedMs},...n.tokenCount!==void 0&&{progress:{toolUseCount:0,...r.progress,tokenCount:n.tokenCount}}}))}
function T9n(e){return typeof e==="string"&&e.length>0?nu(e,`
`)+1:0}
function b9n(e,t){if(typeof t!=="object"||t===null)return{added:0,removed:0};let n=t;if(e===fa)return{added:T9n(n.new_string),removed:T9n(n.old_string)};if(e===Ec)return{added:T9n(n.content),removed:0};if(e===Y0)return{added:T9n(n.new_source),removed:0};return{added:0,removed:0}}
var S9n;
var Hdo=b(()=>{ry();dw();lr();S9n=new Set([fa,Ec,Y0])});
export {rdt,T9n,b9n,S9n,Hdo};
