// @ts-nocheck
import {L$e,CL} from "../src/mcp/3149_scope.ts";
import {getMcpConfigsByScope,px} from "../src/telemetry/3148_unwrapCcrProxyUrl.ts";
import {loadAllPluginsCacheOnly,gg} from "../src/agent/4445_resolvePluginRoot.ts";
import {Net,sh} from "./m2589.ts";
import {Hkn,qxe} from "../src/config/3142_i.ts";
import {Cbe,scalar} from "../src/mcp/0728_serverName.ts";
import {AppStateProvider,Jq} from "./m3354.ts";
import {KeybindingSetup,xW} from "./m3346.ts";
import {c2l,u2l} from "../src/tui/5223_serverName.ts";
import {d2l,p2l} from "../src/tui/5224_serverNames.ts";
import {_i,hp} from "../src/session/1460_promise.ts";
import {ma,Lp,kA,mg} from "../src/agent/2580_level.ts";
import {Cn,dr} from "./m231.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
async function oDo(){let{serverNames:e,pluginServerNames:t}=await sDo();return{pendingServers:e.filter((r)=>L$e(r)==="pending"),pluginServerNames:t}}
async function sDo(){let{servers:e}=getMcpConfigsByScope("project"),t=Object.keys(e),n=new Set(t),r=new Set,{enabled:o}=await loadAllPluginsCacheOnly(),s=o.filter(Net);for(let i of s){let a=await Hkn(i);if(!a)continue;for(let l of Object.keys(a)){if(n.has(l)||r.has(l))continue;t.push(l),r.add(l)}}return{serverNames:t,pluginServerNames:r,rootServers:e}}
async function m2l(e,t){let{pendingServers:n,pluginServerNames:r}=t??await oDo();if(n.length===0)return{persistFailed:!1};let o;o=await LCm(n.map((s)=>Cbe(s,r.has(s))));try{return await new Promise((s)=>{let i=(a)=>void s(a);if(n.length===1&&n[0]!==void 0){let a=n[0];e.render(N8e.default.createElement(AppStateProvider,null,N8e.default.createElement(KeybindingSetup,null,N8e.default.createElement(c2l,{serverName:a,isPluginServer:r.has(a),onDone:i}))))}else e.render(N8e.default.createElement(AppStateProvider,null,N8e.default.createElement(KeybindingSetup,null,N8e.default.createElement(d2l,{serverNames:n,pluginServerNames:r,onDone:i}))))})}finally{await MCm(o)}}
async function LCm(e){{if(!_i())return;let t=process.env.CLAUDE_JOB_DIR;if(!t)return;let n=await ma(t);if(!n)return;let r=e.length,o=Cn(r,"server"),s=Cn(r,"needs","need");try{return await Lp(t,{...n,state:"blocked",detail:`${r} new MCP ${o} ${s} approval`,tempo:"blocked",needs:`approve ${r} new project MCP ${o} (${e.join(", ")}) \u2014 attach to respond`,updatedAt:new Date().toISOString()}),{state:n.state,tempo:n.tempo,needs:n.needs,detail:n.detail}}catch(i){kA(i)}}return}
async function MCm(e){{if(!e||!_i())return;let t=process.env.CLAUDE_JOB_DIR;if(!t)return;let n=await ma(t);if(!n||n.state!=="blocked")return;try{await Lp(t,{...n,...e,block:void 0,updatedAt:new Date().toISOString()})}catch(r){kA(r)}}}
var N8e;
var iDo=b(()=>{u2l();p2l();mg();xW();Jq();hp();qxe();sh();gg();dr();px();scalar();CL();N8e=M(Te(),1)});
export {oDo,sDo,m2l,LCm,MCm,N8e,iDo};
