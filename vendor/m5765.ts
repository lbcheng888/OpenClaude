// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Vb,VT} from "./m648.ts";
import {listAllLiveSessions,rut} from "./m3883.ts";
import {Hz,OOt,Rwe,Fie,Tg,q2e,Pf} from "../src/agent/2591_level.ts";
import {GJn,a_t} from "../src/session/5157_confirmed.ts";
import {kc,aA} from "./m234.ts";
import {fOe,_N} from "./m5161.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
var $Tc={};
ft($Tc,{printAgentsJson:()=>printAgentsJson});
async function printAgentsJson(e,t){let n=e?await Vb(oTt.resolve(e)):void 0;function r(d){if(!n)return!0;let p=oTt.relative(n,d);return p.split(/[/\\]/,1)[0]!==".."&&!oTt.isAbsolute(p)}let[o,s,i]=await Promise.all([listAllLiveSessions(),Hz(),GJn()]),a=new Map;for(let d of o)if(d.kind==="bg"&&d.jobId)a.set(d.jobId,d);let l=new Set(i.shorts);for(let d of a.keys())l.add(d);let c=[],u=new Set;for(let d of OOt(s,l)){let p=a.get(d.id);if(p)u.add(p.pid);if(!r(Rwe(d.state)))continue;let m=IJm(d.state,p?.status);if(!t&&!p&&m!=="working"&&m!=="blocked")continue;let f=BTc(p?.name??d.state.name??kc(d.state.intent));c.push({...p&&{pid:p.pid},id:d.id,cwd:p?.cwd??d.state.cwd,kind:"background",startedAt:p?.startedAt??Date.parse(d.state.createdAt),sessionId:p?.sessionId??d.state.sessionId,...f&&{name:f},...p?.status&&{status:UTc(p.status)},...p?.status==="waiting"&&p.waitingFor&&{waitingFor:p.waitingFor},state:m})}for(let d of o){if(d.kind!=="interactive"&&d.kind!=="bg"||u.has(d.pid))continue;if(d.kind==="bg"&&d.jobId)continue;if(!r(d.cwd))continue;let p=d.name&&BTc(d.name);c.push({pid:d.pid,cwd:d.cwd,kind:d.kind==="bg"?"background":"interactive",startedAt:d.startedAt,...d.sessionId&&{sessionId:d.sessionId},...p&&{name:p},...d.status&&{status:UTc(d.status)},...d.status==="waiting"&&d.waitingFor&&{waitingFor:d.waitingFor}})}c.sort((d,p)=>d.startedAt-p.startedAt),await fOe(TeamDeleteToolName(c,null,2)+`
`),He("cli_agents_json")}
function BTc(e){return e.replace(/[\x00-\x08\x0E-\x1F\x7F-\x9F]/g,"").replace(/\s+/g," ").trim()}
function UTc(e){return e==="idle"?"idle":e==="waiting"?"waiting":"busy"}
function IJm(e,t){if(t==="busy")return"working";let n=Fie(e.state);if(Tg(e)&&!(n==="success"&&q2e(e)))return n==="success"?"done":n==="failure"?"failed":"stopped";if(e.tempo==="blocked"||t==="waiting")return"blocked";return"working"}
var oTt;
var qTc=b(()=>{a_t();Pf();mn();aA();VT();tn();rut();_N();oTt=require("path")});
export {$Tc,printAgentsJson,BTc,UTc,IJm,oTt,qTc};
