// @ts-nocheck
import {getAgentColorMap,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function mS(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="in_process_teammate"}
function b0e(e,t){if(e===void 0||e.length===0)return[t];if(e.length>=T2n){let n=e.slice(-(T2n-1));return n.push(t),n}return[...e,t]}
function XMa(e,t){let n=e===void 0||e.every((r)=>r.uuid!==t.uuid)?e:e.filter((r)=>r.uuid!==t.uuid);return b0e(n,t)}
var T2n=50;
function QMa(e){return e!==void 0&&__.includes(e)}
function eut(e){return e.userOverride??e.agentDefinitionColor}
function j_e(e){if(e==="general-purpose")return;let n=getAgentColorMap().get(e);if(n&&__.includes(n))return tL[n];return}
function E0e(e,t){let n=getAgentColorMap();if(!t){n.delete(e);return}if(__.includes(t))n.set(e,t)}
var __,tL;
var ix=b(()=>{lt();__=["red","blue","green","yellow","purple","orange","pink","cyan"],tL={red:"red_FOR_SUBAGENTS_ONLY",blue:"blue_FOR_SUBAGENTS_ONLY",green:"green_FOR_SUBAGENTS_ONLY",yellow:"yellow_FOR_SUBAGENTS_ONLY",purple:"purple_FOR_SUBAGENTS_ONLY",orange:"orange_FOR_SUBAGENTS_ONLY",pink:"pink_FOR_SUBAGENTS_ONLY",cyan:"cyan_FOR_SUBAGENTS_ONLY"}});
export {mS,b0e,XMa,T2n,QMa,eut,j_e,E0e,__,tL,ix};
