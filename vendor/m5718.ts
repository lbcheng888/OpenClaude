// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {$b,QT} from "./m642.ts";
import {listAllLiveSessions,rlt} from "./m3865.ts";
import {nz,rDt,qwe,$ie,pg,qUe,mg} from "../src/agent/2580_level.ts";
import {X7n,Wft} from "../src/session/5127_confirmed.ts";
import {Kc,tv} from "./m232.ts";
import {APe,qU} from "./m5131.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
var Occ={};
isFullscreenWithTTY(Occ,{printAgentsJson:()=>printAgentsJson});
async function printAgentsJson(e,t){let n=e?await $b(Dht.resolve(e)):void 0;function r(d){if(!n)return!0;let p=Dht.relative(n,d);return p.split(/[/\\]/,1)[0]!==".."&&!Dht.isAbsolute(p)}let[o,s,i]=await Promise.all([listAllLiveSessions(),nz(),X7n()]),a=new Map;for(let d of o)if(d.kind==="bg"&&d.jobId)a.set(d.jobId,d);let l=new Set(i.shorts);for(let d of a.keys())l.add(d);let c=[],u=new Set;for(let d of rDt(s,l)){let p=a.get(d.id);if(p)u.add(p.pid);if(!r(qwe(d.state)))continue;let m=Eqm(d.state,p?.status);if(!t&&!p&&m!=="working"&&m!=="blocked")continue;let f=Dcc(p?.name??d.state.name??Kc(d.state.intent));c.push({...p&&{pid:p.pid},id:d.id,cwd:p?.cwd??d.state.cwd,kind:"background",startedAt:p?.startedAt??Date.parse(d.state.createdAt),sessionId:p?.sessionId??d.state.sessionId,...f&&{name:f},...p?.status&&{status:Pcc(p.status)},...p?.status==="waiting"&&p.waitingFor&&{waitingFor:p.waitingFor},state:m})}for(let d of o){if(d.kind!=="interactive"&&d.kind!=="bg"||u.has(d.pid))continue;if(d.kind==="bg"&&d.jobId)continue;if(!r(d.cwd))continue;let p=d.name&&Dcc(d.name);c.push({pid:d.pid,cwd:d.cwd,kind:d.kind==="bg"?"background":"interactive",startedAt:d.startedAt,...d.sessionId&&{sessionId:d.sessionId},...p&&{name:p},...d.status&&{status:Pcc(d.status)},...d.status==="waiting"&&d.waitingFor&&{waitingFor:d.waitingFor}})}c.sort((d,p)=>d.startedAt-p.startedAt),await APe(Le(c,null,2)+`
`),Ie("cli_agents_json")}
function Dcc(e){return e.replace(/[\x00-\x08\x0E-\x1F\x7F-\x9F]/g,"").replace(/\s+/g," ").trim()}
function Pcc(e){return e==="idle"?"idle":e==="waiting"?"waiting":"busy"}
function Eqm(e,t){if(t==="busy")return"working";let n=$ie(e.state);if(pg(e)&&!(n==="success"&&qUe(e)))return n==="success"?"done":n==="failure"?"failed":"stopped";if(e.tempo==="blocked"||t==="waiting")return"blocked";return"working"}
var Dht;
var Lcc=b(()=>{Wft();mg();ln();tv();QT();Xt();rlt();qU();Dht=require("path")});
export {Occ,printAgentsJson,Dcc,Pcc,Eqm,Dht,Lcc};
