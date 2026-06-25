// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {VI,dne} from "./m4605.ts";
import {fPe,_6,hPe} from "./m4606.ts";
import {AT,fue} from "./m4610.ts";
import {zd,bL} from "./m4515.ts";
import {qG,uht} from "../src/session/4612_proto.ts";
import {mne,aJ,pne,CL} from "./m4609.ts";
import {sJ,_Pe} from "./m4607.ts";
import {Yt,Es} from "./m641.ts";
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {ba,pd} from "./m706.ts";
import {Sn,lr} from "./m233.ts";
var tvo={};
ft(tvo,{getBgDaemonStatus:()=>getBgDaemonStatus,formatBgDaemonStatus:()=>formatBgDaemonStatus});
async function getBgDaemonStatus(){let e=await VI().catch(()=>null),t=e?.logPath??fPe(),[n,r,o,s,i,a]=await Promise.all([AT({op:"ping",proto:zd},{timeoutMs:1000}).catch((p)=>({ok:!1,code:"ENOCONN",error:String(p)})),qG({silent:!0}),dht.stat(mne()).catch(()=>null),dht.stat(t).catch(()=>null),sJ().catch(()=>!1),ktm(_6())]),l;try{l=aJ()}catch{l=Yt()==="windows"?"\\\\.\\pipe\\cc-daemon-*":"<unavailable>"}let c=null,u=null,d=[];if(n.ok){let p={ok:!1},[m,f]=await Promise.all([AT({op:"list",proto:zd},{timeoutMs:1000}).catch(()=>p),AT({op:"leases",proto:zd},{timeoutMs:1000}).catch(()=>p)]);if(m.ok&&"jobs"in m){c=zn(m.jobs,(g)=>!g.outcome);let h=e?.version??{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION;u=zn(m.jobs,(g)=>!g.outcome&&g.cliVersion!==void 0&&g.cliVersion!==h)}if(f.ok&&"clients"in f)d=f.clients}return{supervisor:e?{pid:e.pid,version:e.version,uptimeSec:Math.floor((Date.now()-e.startedAt)/1000)}:null,sockDir:Yt()==="windows"?"\\\\.\\pipe\\cc-daemon-*":pne(),controlSock:l,controlReachable:n.ok,controlError:n.ok?void 0:n.error,workersLive:c,workersSkewed:u,workersRoster:Object.keys(r.workers).length,rosterAgeSec:o?Math.floor((Date.now()-o.mtimeMs)/1000):null,logPath:t,logSizeBytes:s?.size??null,serviceInstalled:i,configuredWorkers:a,leaseClients:d}}
async function ktm(e){let t;try{let o=await dht.stat(e);if(!o.isFile()||o.size>1048576)return 0;t=await dht.readFile(e,"utf8")}catch{return 0}let n=ba(t,!1);if(n===null||typeof n!=="object")return 0;let r=0;for(let[o,s]of Object.entries(n)){if(o==="$schema")continue;r+=Array.isArray(s)?s.length:1}return r}
function formatBgDaemonStatus(e){let t=["","bg sessions:"];if(t.push(`  sock dir:     ${e.sockDir}`),t.push(`  control.sock: ${e.controlReachable?"reachable":`unreachable (${e.controlError??"unknown"})`}`),e.workersLive!==null){if(t.push(`  bg workers:   ${e.workersLive} running (control.sock), ${e.workersRoster} in roster.json`),e.workersSkewed&&e.workersSkewed>0)t.push(`                ${e.workersSkewed} from a different CLI version (most stay attachable and upgrade automatically once idle \u2014 exec runs never respawn)`)}else t.push(`  bg workers:   ${e.workersRoster} in roster.json (${e.controlReachable?"live count unavailable":"control unreachable"})`);if(t.push(`  roster.json:  ${e.rosterAgeSec===null?"absent":`updated ${e.rosterAgeSec}s ago`}`),t.push(`  daemon.log:   ${e.logSizeBytes===null?"absent":`${Itm(e.logSizeBytes)} at ${e.logPath}`}`),!e.supervisor&&!e.controlReachable&&e.workersRoster>0)t.push(`  warning:      supervisor not running but ${e.workersRoster} ${Sn(e.workersRoster,"worker")} in roster \u2014 running \`claude agents\` restarts the daemon and re-adopts still-running sessions; run \`claude daemon stop --any\` to reap them instead`);return t.join(`
`)}
function Itm(e){if(e<1024)return`${e}B`;if(e<1048576)return`${(e/1024).toFixed(1)}KB`;return`${(e/1024/1024).toFixed(1)}MB`}
var dht;
var GKn=b(()=>{pd();Es();lr();dne();hPe();_Pe();fue();CL();bL();uht();dht=require("fs/promises")});
export {tvo,getBgDaemonStatus,ktm,formatBgDaemonStatus,Itm,dht,GKn};
