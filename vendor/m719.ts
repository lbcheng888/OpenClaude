// @ts-nocheck
import {Ibt,ofr} from "./m640.ts";
import {b} from "../runtime.ts";
function foldSessionSummary(e,t,n,r){let o=r?.mtime??e?.mtime??0,s=e!==void 0?{sessionId:e.sessionId,mtime:o,data:{...e.data}}:{sessionId:t.sessionId,mtime:o,data:{}},i=s.data;for(let a of n){let l=bXc(a.timestamp);if(i.isSidechain===void 0)i.isSidechain=a.isSidechain===!0;if(i.createdAt===void 0&&l!==void 0)i.createdAt=l;if(i.cwd===void 0){let c=a.cwd;if(typeof c==="string"&&c)i.cwd=c}EXc(i,a);for(let[c,u]of Object.entries(TXc)){let d=a[c];if(typeof d==="string")i[u]=d}if(a.type==="tag"){let c=a.tag;if(typeof c==="string"&&c)i.tag=c;else delete i.tag}}return s}
function ons(e,t){let n=e.data;if(n.isSidechain===!0)return null;let r=Tbe(n.firstPromptLocked===!0?n.firstPrompt:n.commandFallback)||void 0,o=Tbe(n.customTitle)||Tbe(n.aiTitle)||void 0,s=o||Tbe(n.lastPrompt)||Tbe(n.summaryHint)||r;if(!s)return null;return{sessionId:e.sessionId,summary:s,lastModified:e.mtime,fileSize:void 0,customTitle:o,firstPrompt:r,gitBranch:Tbe(n.gitBranch)||void 0,cwd:Tbe(n.cwd)||t||void 0,tag:Tbe(n.tag)||void 0,createdAt:SXc(n.createdAt)}}
function Tbe(e){return typeof e==="string"?e:void 0}
function SXc(e){return typeof e==="number"?e:void 0}
function bXc(e){if(typeof e!=="string")return;let t=Date.parse(e);return Number.isNaN(t)?void 0:t}
function EXc(e,t){if(e.firstPromptLocked)return;let n={commandFallback:e.commandFallback??""},r=Ibt(t,n);if(n.commandFallback&&!e.commandFallback)e.commandFallback=n.commandFallback;if(r!==void 0)e.firstPrompt=r,e.firstPromptLocked=!0}
var TXc;
var gEt=b(()=>{ofr();TXc={customTitle:"customTitle",aiTitle:"aiTitle",lastPrompt:"lastPrompt",summary:"summaryHint",gitBranch:"gitBranch"}});
export {foldSessionSummary,ons,Tbe,SXc,bXc,EXc,TXc,gEt};
