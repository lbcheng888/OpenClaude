// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function gVp(e){if(!e||typeof e!=="object")return!1;let t=e,n=typeof t.filePath==="string",r=Array.isArray(t.structuredPatch)&&t.structuredPatch.length>0,o=t.type==="create"&&typeof t.content==="string";return n&&(r||o)}
function _Vp(e){return"type"in e&&(e.type==="create"||e.type==="update")}
function yVp(e){let t=0,n=0;for(let r of e)for(let o of r.lines)if(o.startsWith("+"))t++;else if(o.startsWith("-"))n++;return{added:t,removed:n}}
function TVp(e){if(e.type!=="user")return"";let t=e.message.content,n=typeof t==="string"?t:"";if(n.length<=30)return n;return n.slice(0,29)+"\u2026"}
function Hll(e){let t=0,n=0;for(let r of e.files.values())t+=r.linesAdded,n+=r.linesRemoved;e.stats={filesChanged:e.files.size,linesAdded:t,linesRemoved:n}}
function Ill(e){let t=G8n.useRef({completedTurns:[],currentTurn:null,lastProcessedIndex:0,lastTurnIndex:0});return G8n.useMemo(()=>{let n=t.current;if(e.length<n.lastProcessedIndex)n.completedTurns=[],n.currentTurn=null,n.lastProcessedIndex=0,n.lastTurnIndex=0;for(let o=n.lastProcessedIndex;o<e.length;o++){let s=e[o];if(!s||s.type!=="user")continue;if(!(s.toolUseResult||Array.isArray(s.message.content)&&s.message.content[0]?.type==="tool_result")&&!s.isMeta){if(n.currentTurn&&n.currentTurn.files.size>0)Hll(n.currentTurn),n.completedTurns.push(n.currentTurn);n.lastTurnIndex++,n.currentTurn={turnIndex:n.lastTurnIndex,userPromptPreview:TVp(s),timestamp:s.timestamp,files:new Map,stats:{filesChanged:0,linesAdded:0,linesRemoved:0}}}else if(n.currentTurn&&s.toolUseResult){let a=s.toolUseResult;if(gVp(a)){let{filePath:l,structuredPatch:c}=a,u="type"in a&&a.type==="create",d=n.currentTurn.files.get(l);if(!d)d={filePath:l,hunks:[],isNewFile:u,linesAdded:0,linesRemoved:0},n.currentTurn.files.set(l,d);if(u&&c.length===0&&_Vp(a)){let m=a.content.split(`
`),f={oldStart:0,oldLines:0,newStart:1,newLines:m.length,lines:m.map((A)=>"+"+A)};d.hunks.push(f),d.linesAdded+=m.length}else{d.hunks.push(...c);let{added:p,removed:m}=yVp(c);d.linesAdded+=p,d.linesRemoved+=m}if(u)d.isNewFile=!0}}}n.lastProcessedIndex=e.length;let r=[...n.completedTurns];if(n.currentTurn&&n.currentTurn.files.size>0)Hll(n.currentTurn),r.push(n.currentTurn);return r.reverse()},[e])}
var G8n;
var Dll=b(()=>{G8n=M(Te(),1)});
export {gVp,_Vp,yVp,TVp,Hll,Ill,G8n,Dll};
