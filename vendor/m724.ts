// @ts-nocheck
import {rRt,Pyr} from "./m646.ts";
import {b} from "../runtime.ts";
function foldSessionSummary(e,t,n,r){let o=r?.mtime??e?.mtime??0,s=e!==void 0?{sessionId:e.sessionId,mtime:o,data:{...e.data}}:{sessionId:t.sessionId,mtime:o,data:{}},i=s.data;for(let a of n){let l=Fau(a.timestamp);if(i.isSidechain===void 0)i.isSidechain=a.isSidechain===!0;if(i.createdAt===void 0&&l!==void 0)i.createdAt=l;if(i.cwd===void 0){let c=a.cwd;if(typeof c==="string"&&c)i.cwd=c}Bau(i,a);for(let[c,u]of Object.entries(Mau)){let d=a[c];if(typeof d==="string")i[u]=d}if(a.type==="tag"){let c=a.tag;if(typeof c==="string"&&c)i.tag=c;else delete i.tag}}return s}
function Qas(e,t){let n=e.data;if(n.isSidechain===!0)return null;let r=nCe(n.firstPromptLocked===!0?n.firstPrompt:n.commandFallback)||void 0,o=nCe(n.customTitle)||nCe(n.aiTitle)||void 0,s=o||nCe(n.lastPrompt)||nCe(n.summaryHint)||r;if(!s)return null;return{sessionId:e.sessionId,summary:s,lastModified:e.mtime,fileSize:void 0,customTitle:o,firstPrompt:r,gitBranch:nCe(n.gitBranch)||void 0,cwd:nCe(n.cwd)||t||void 0,tag:nCe(n.tag)||void 0,createdAt:Nau(n.createdAt)}}
function nCe(e){return typeof e==="string"?e:void 0}
function Nau(e){return typeof e==="number"?e:void 0}
function Fau(e){if(typeof e!=="string")return;let t=Date.parse(e);return Number.isNaN(t)?void 0:t}
function Bau(e,t){if(e.firstPromptLocked)return;let n={commandFallback:e.commandFallback??""},r=rRt(t,n);if(n.commandFallback&&!e.commandFallback)e.commandFallback=n.commandFallback;if(r!==void 0)e.firstPrompt=r,e.firstPromptLocked=!0}
var Mau;
var GRt=b(()=>{Pyr();Mau={customTitle:"customTitle",aiTitle:"aiTitle",lastPrompt:"lastPrompt",summary:"summaryHint",gitBranch:"gitBranch"}});
export {foldSessionSummary,Qas,nCe,Nau,Fau,Bau,Mau,GRt};
