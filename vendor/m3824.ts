// @ts-nocheck
import {getAgentColorMap,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function yS(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="in_process_teammate"}
function PHe(e,t){if(e===void 0||e.length===0)return[t];if(e.length>=vBn){let n=e.slice(-(vBn-1));return n.push(t),n}return[...e,t]}
function RHa(e,t){let n=e===void 0||e.every((r)=>r.uuid!==t.uuid)?e:e.filter((r)=>r.uuid!==t.uuid);return PHe(n,t)}
var vBn=50;
function xHa(e){return e!==void 0&&i_.includes(e)}
function elt(e){return e.userOverride??e.agentDefinitionColor}
function Dge(e){if(e==="general-purpose")return;let n=getAgentColorMap().get(e);if(n&&i_.includes(n))return NL[n];return}
function OHe(e,t){let n=getAgentColorMap();if(!t){n.delete(e);return}if(i_.includes(t))n.set(e,t)}
var i_,NL;
var K0=b(()=>{lt();i_=["red","blue","green","yellow","purple","orange","pink","cyan"],NL={red:"red_FOR_SUBAGENTS_ONLY",blue:"blue_FOR_SUBAGENTS_ONLY",green:"green_FOR_SUBAGENTS_ONLY",yellow:"yellow_FOR_SUBAGENTS_ONLY",purple:"purple_FOR_SUBAGENTS_ONLY",orange:"orange_FOR_SUBAGENTS_ONLY",pink:"pink_FOR_SUBAGENTS_ONLY",cyan:"cyan_FOR_SUBAGENTS_ONLY"}});
export {yS,PHe,RHa,vBn,xHa,elt,Dge,OHe,i_,NL,K0};
