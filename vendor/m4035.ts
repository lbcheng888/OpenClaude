// @ts-nocheck
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {saveGlobalConfig,getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
import {kg} from "./m129.ts";
import {ca} from "./m5.ts";
function A2n(e,t,n="replace"){e((r)=>{let o=r.alwaysDenyRules.command,s=n==="union"?fs([...o??[],...t]):[...t];if((o?.length??0)===s.length&&(o??[]).every((a,l)=>a===s[l]))return r;return{...r,alwaysDenyRules:{...r.alwaysDenyRules,command:s.length>0?s:void 0}}})}
var Zao=()=>{};
function Pct(e){let t=e.startsWith("/")?e.slice(1):e,n=t.search(/\s/);if(n===-1)return{name:t,args:""};return{name:t.slice(0,n),args:t.slice(n+1).trim()}}
function _Ie(e){let t=e.trim();if(!t.startsWith("/"))return null;let{name:n,args:r}=Pct(t);if(!n)return null;let o="(MCP)";if(r===o)return{commandName:`${n} ${o}`,args:"",isMcp:!0};if(r.startsWith(o)&&/\s/.test(r.charAt(o.length)))return{commandName:`${n} ${o}`,args:r.slice(o.length).trimStart(),isMcp:!0};return{commandName:n,args:r,isMcp:!1}}
var C$t=()=>{};
function h2n(e,t){if(!e.subcommands)return;let n=t.trimStart(),r=n.search(/\s/),o=r===-1?n:n.slice(0,r),s=o?e.subcommands[o.toLowerCase()]:void 0;if(s===void 0)return;let i=r===-1?"":n.slice(r+1).trimStart();return{targetName:s,consumedToken:o,remainingArgs:i.replace(/(?:^|\s)--comment(?=\s|$)/g,"").trim()}}
function g2n(e){elo.emit(e);let t=Date.now(),n=HFa.get(e);if(n!==void 0&&t-n<Avp)return;HFa.set(e,t),saveGlobalConfig((r)=>{let o=r.skillUsage?.[e];return{...r,skillUsage:{...r.skillUsage,[e]:{usageCount:(o?.usageCount??0)+1,lastUsedAt:t}}}})}
function Tqe(e){let n=getGlobalConfig().skillUsage?.[e];if(!n)return 0;let r=(Date.now()-n.lastUsedAt)/86400000,o=Math.pow(0.5,r/7);return n.usageCount*Math.max(o,0.1)}
var Avp=60000,elo,HFa;
var Sqe=b(()=>{Qn();kg();elo=ca(),HFa=new Map});
export {A2n,Zao,Pct,_Ie,C$t,h2n,g2n,Tqe,Avp,elo,HFa,Sqe};
