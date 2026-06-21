// @ts-nocheck
import {Uu,dr} from "./m231.ts";
import {Ua,ty} from "./m2245.ts";
import {zc,ex} from "./m2582.ts";
import {I0} from "../src/tools/2698_allErrors.ts";
import {b} from "../runtime.ts";
function Wlt(e,t,n){e.updateTranscript(t,(r)=>({...r,...n.turnStartTime!==void 0&&{turnStartTime:n.turnStartTime},...n.totalPausedMs!==void 0&&{totalPausedMs:n.totalPausedMs},...n.tokenCount!==void 0&&{progress:{toolUseCount:0,...r.progress,tokenCount:n.tokenCount}}}))}
function jFn(e){return typeof e==="string"&&e.length>0?Uu(e,`
`)+1:0}
function GFn(e,t){if(typeof t!=="object"||t===null)return{added:0,removed:0};let n=t;if(e===Ua)return{added:jFn(n.new_string),removed:jFn(n.old_string)};if(e===zc)return{added:jFn(n.content),removed:0};if(e===I0)return{added:jFn(n.new_source),removed:0};return{added:0,removed:0}}
var WFn;
var Gso=b(()=>{ty();ex();dr();WFn=new Set([Ua,zc,I0])});
export {Wlt,jFn,GFn,WFn,Gso};
