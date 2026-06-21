// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {yI,yne} from "./m4577.ts";
import {fDe,X6,ADe} from "./m4578.ts";
import {OT,gue} from "./m4582.ts";
import {Cp,rM} from "./m4493.ts";
import {vG,omt} from "../src/session/4584_proto.ts";
import {Sne,bJ,Tne,sM} from "./m4581.ts";
import {TJ,gDe} from "./m4579.ts";
import {zt,qs} from "./m635.ts";
import {Wn} from "../src/api/0459_getOauthConfig.ts";
import {Fa,Pd} from "./m701.ts";
import {Cn,dr} from "./m231.ts";
var qTo={};
isFullscreenWithTTY(qTo,{getBgDaemonStatus:()=>getBgDaemonStatus,formatBgDaemonStatus:()=>formatBgDaemonStatus});
async function getBgDaemonStatus(){let e=await yI().catch(()=>null),t=e?.logPath??fDe(),[n,r,o,s,i,a]=await Promise.all([OT({op:"ping",proto:Cp},{timeoutMs:1000}).catch((p)=>({ok:!1,code:"ENOCONN",error:String(p)})),vG({silent:!0}),smt.stat(Sne()).catch(()=>null),smt.stat(t).catch(()=>null),TJ().catch(()=>!1),C7p(X6())]),l;try{l=bJ()}catch{l=zt()==="windows"?"\\\\.\\pipe\\cc-daemon-*":"<unavailable>"}let c=null,u=null,d=[];if(n.ok){let p={ok:!1},[m,f]=await Promise.all([OT({op:"list",proto:Cp},{timeoutMs:1000}).catch(()=>p),OT({op:"leases",proto:Cp},{timeoutMs:1000}).catch(()=>p)]);if(m.ok&&"jobs"in m){c=Wn(m.jobs,(h)=>!h.outcome);let A=e?.version??{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION;u=Wn(m.jobs,(h)=>!h.outcome&&h.cliVersion!==void 0&&h.cliVersion!==A)}if(f.ok&&"clients"in f)d=f.clients}return{supervisor:e?{pid:e.pid,version:e.version,uptimeSec:Math.floor((Date.now()-e.startedAt)/1000)}:null,sockDir:zt()==="windows"?"\\\\.\\pipe\\cc-daemon-*":Tne(),controlSock:l,controlReachable:n.ok,controlError:n.ok?void 0:n.error,workersLive:c,workersSkewed:u,workersRoster:Object.keys(r.workers).length,rosterAgeSec:o?Math.floor((Date.now()-o.mtimeMs)/1000):null,logPath:t,logSizeBytes:s?.size??null,serviceInstalled:i,configuredWorkers:a,leaseClients:d}}
async function C7p(e){let t;try{let o=await smt.stat(e);if(!o.isFile()||o.size>1048576)return 0;t=await smt.readFile(e,"utf8")}catch{return 0}let n=Fa(t,!1);if(n===null||typeof n!=="object")return 0;let r=0;for(let[o,s]of Object.entries(n)){if(o==="$schema")continue;r+=Array.isArray(s)?s.length:1}return r}
function formatBgDaemonStatus(e){let t=["","bg sessions:"];if(t.push(`  sock dir:     ${e.sockDir}`),t.push(`  control.sock: ${e.controlReachable?"reachable":`unreachable (${e.controlError??"unknown"})`}`),e.workersLive!==null){if(t.push(`  bg workers:   ${e.workersLive} running (control.sock), ${e.workersRoster} in roster.json`),e.workersSkewed&&e.workersSkewed>0)t.push(`                ${e.workersSkewed} from a different CLI version (most stay attachable and upgrade automatically once idle \u2014 exec runs never respawn)`)}else t.push(`  bg workers:   ${e.workersRoster} in roster.json (${e.controlReachable?"live count unavailable":"control unreachable"})`);if(t.push(`  roster.json:  ${e.rosterAgeSec===null?"absent":`updated ${e.rosterAgeSec}s ago`}`),t.push(`  daemon.log:   ${e.logSizeBytes===null?"absent":`${w7p(e.logSizeBytes)} at ${e.logPath}`}`),!e.supervisor&&!e.controlReachable&&e.workersRoster>0)t.push(`  warning:      supervisor not running but ${e.workersRoster} ${Cn(e.workersRoster,"worker")} in roster \u2014 running \`claude agents\` restarts the daemon and re-adopts still-running sessions; run \`claude daemon stop --any\` to reap them instead`);return t.join(`
`)}
function w7p(e){if(e<1024)return`${e}B`;if(e<1048576)return`${(e/1024).toFixed(1)}KB`;return`${(e/1024/1024).toFixed(1)}MB`}
var smt;
var u5n=b(()=>{Pd();qs();dr();yne();ADe();gDe();gue();sM();rM();omt();smt=require("fs/promises")});
export {qTo,getBgDaemonStatus,C7p,formatBgDaemonStatus,w7p,smt,u5n};
