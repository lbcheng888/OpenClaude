// @ts-nocheck
import {B9e,qO} from "../src/mcp/3159_scope.ts";
import {getMcpConfigsByScope,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {loadAllPluginsCacheOnly,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {qnt,oh} from "./m2600.ts";
import {Txn,IHe} from "../src/config/3152_i.ts";
import {iCe,T0} from "../src/mcp/0733_serverName.ts";
import {AppStateProvider,pq} from "./m3370.ts";
import {KeybindingSetup,WW} from "./m3362.ts";
import {Q8l,Z8l} from "../src/telemetry/5256_serverName.ts";
import {tWl,nWl} from "../src/telemetry/5257_serverNames.ts";
import {Ws,vd} from "../src/session/1465_promise.ts";
import {Oi,Id,Pm,Pf} from "../src/agent/2591_level.ts";
import {Sn,lr} from "./m233.ts";
import {b,x} from "../runtime.ts";
import {oe} from "./m2275.ts";
async function E1o(){let{serverNames:e,pluginServerNames:t}=await C1o();return{pendingServers:e.filter((r)=>B9e(r)==="pending"),pluginServerNames:t}}
async function C1o(){let{servers:e}=getMcpConfigsByScope("project"),t=Object.keys(e),n=new Set(t),r=new Set,{enabled:o}=await loadAllPluginsCacheOnly(),s=o.filter(qnt);for(let i of s){let a=await Txn(i);if(!a)continue;for(let l of Object.keys(a)){if(n.has(l)||r.has(l))continue;t.push(l),r.add(l)}}return{serverNames:t,pluginServerNames:r,rootServers:e}}
async function rWl(e,t){let{pendingServers:n,pluginServerNames:r}=t??await E1o();if(n.length===0)return{persistFailed:!1};let o;o=await jDm(n.map((s)=>iCe(s,r.has(s))));try{return await new Promise((s)=>{let i=(a)=>void s(a);if(n.length===1&&n[0]!==void 0){let a=n[0];e.render(kGe.jsx(AppStateProvider,{children:kGe.jsx(KeybindingSetup,{children:kGe.jsx(Q8l,{serverName:a,isPluginServer:r.has(a),onDone:i})})}))}else e.render(kGe.jsx(AppStateProvider,{children:kGe.jsx(KeybindingSetup,{children:kGe.jsx(tWl,{serverNames:n,pluginServerNames:r,onDone:i})})}))})}finally{await YDm(o)}}
async function jDm(e){{if(!Ws())return;let t=process.env.CLAUDE_JOB_DIR;if(!t)return;let n=await Oi(t);if(!n)return;let r=e.length,o=Sn(r,"server"),s=Sn(r,"needs","need");try{return await Id(t,{...n,state:"blocked",detail:`${r} new MCP ${o} ${s} approval`,tempo:"blocked",needs:`approve ${r} new project MCP ${o} (${e.join(", ")}) \u2014 attach to respond`,updatedAt:new Date().toISOString()}),{state:n.state,tempo:n.tempo,needs:n.needs,detail:n.detail}}catch(i){Pm(i)}}return}
async function YDm(e){{if(!e||!Ws())return;let t=process.env.CLAUDE_JOB_DIR;if(!t)return;let n=await Oi(t);if(!n||n.state!=="blocked")return;try{await Id(t,{...n,...e,block:void 0,updatedAt:new Date().toISOString()})}catch(r){Pm(r)}}}
var kGe;
var A1o=b(()=>{Z8l();nWl();Pf();WW();pq();vd();IHe();oh();path();lr();KA();T0();qO();kGe=x(oe(),1)});
export {E1o,C1o,rWl,jDm,YDm,kGe,A1o};
