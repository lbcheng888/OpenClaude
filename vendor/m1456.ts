// @ts-nocheck
import {fromSanitizer_SANITIZER_OUTPUT_ONLY,Qe} from "./m5.ts";
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING} from "./m683.ts";
import {ws} from "./m228.ts";
function Br(e){if(e==null)return;return/^[A-Za-z0-9_-]{1,128}$/.test(e)?fromSanitizer_SANITIZER_OUTPUT_ONLY(e):Qe("nonconforming")}
var WS=()=>{};
var wYe={};
isFullscreenWithTTY(wYe,{sigtermThenKill:()=>sigtermThenKill,ownProcStartAsync:()=>ownProcStartAsync,ownProcStart:()=>ownProcStart,isSameProcessAsync:()=>isSameProcessAsync,isSameProcess:()=>isSameProcess,isProcessRunning:()=>isProcessRunning,getProcessStartTimeAsync:()=>getProcessStartTimeAsync,getProcessStartTime:()=>getProcessStartTime,getProcessCommand:()=>getProcessCommand,getChildPids:()=>getChildPids,getAncestorPidsAsync:()=>getAncestorPidsAsync,getAncestorCommandsAsync:()=>getAncestorCommandsAsync,_resetProcStartCacheForTesting:()=>_resetProcStartCacheForTesting});
function isProcessRunning(e){if(e<=1)return!1;try{return process.kill(e,0),!0}catch{return!1}}
function sigtermThenKill(e,t){for(let n of e){try{process.kill(n,"SIGTERM")}catch{continue}return setTimeout((r,o,s)=>{if(!isSameProcess(o,s))return;try{process.kill(r,"SIGKILL")}catch{}},5000,n,Math.abs(e[0]),t).unref(),!0}return!1}
async function getAncestorPidsAsync(e,t=10){let n=`pid=${String(e)}; for i in $(seq 1 ${t}); do ppid=$(ps -o ppid= -p $pid 2>/dev/null | tr -d ' '); if [ -z "$ppid" ] || [ "$ppid" = "0" ] || [ "$ppid" = "1" ]; then break; fi; echo $ppid; pid=$ppid; done`,r=await execFileNoThrowWithCwd("sh",["-c",n],{timeout:3000});if(r.code!==0||!r.stdout?.trim())return[];return r.stdout.trim().split(`
`).filter(Boolean).map((o)=>parseInt(o,10)).filter((o)=>!isNaN(o))}
function getProcessCommand(e){try{let n=`ps -o command= -p ${String(e)}`,r=execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(n,{timeout:1000});return r?r.trim():null}catch{return null}}
function getProcessStartTime(e){try{let t=execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(`LC_ALL=C TZ=UTC ps -o lstart= -p ${e}`,{timeout:1000});return t?t.trim():void 0}catch{return}}
function isSameProcess(e,t){if(t===void 0)return!0;let n=getProcessStartTime(e);return n===void 0||n===t}
async function isSameProcessAsync(e,t){if(t===void 0)return!0;let n=await getProcessStartTimeAsync(e);return n===void 0||n===t}
function ownProcStart(){return VRr??=getProcessStartTime(process.pid)}
async function ownProcStartAsync(){return VRr??=await getProcessStartTimeAsync(process.pid)}
async function getProcessStartTimeAsync(e,t){let n=Date.now();if(!t?.skipCache){let i=Yun.get(e),a=i?.miss?uOu:cOu;if(i&&n-i.at<a)return i.p}let r=pOu(e),o={at:n,p:r};Yun.set(e,o);let s=await r;if(s===void 0&&Yun.get(e)===o)o.miss=!0;return s}
function _resetProcStartCacheForTesting(){Yun.clear(),VRr=void 0}
async function pOu(e){try{let t=await execFileNoThrowWithCwd("ps",["-o","lstart=","-p",String(e)],{timeout:1000,env:{...process.env,LC_ALL:"C",TZ:"UTC"}});return t.code===0&&t.stdout?t.stdout.trim():void 0}catch{return}}
async function getAncestorCommandsAsync(e,t=10){let n=`currentpid=${String(e)}; for i in $(seq 1 ${t}); do cmd=$(ps -o command= -p $currentpid 2>/dev/null); if [ -n "$cmd" ]; then printf '%s\\0' "$cmd"; fi; ppid=$(ps -o ppid= -p $currentpid 2>/dev/null | tr -d ' '); if [ -z "$ppid" ] || [ "$ppid" = "0" ] || [ "$ppid" = "1" ]; then break; fi; currentpid=$ppid; done`,r=await execFileNoThrowWithCwd("sh",["-c",n],{timeout:3000});if(r.code!==0||!r.stdout?.trim())return[];return r.stdout.split("\x00").filter(Boolean)}
function getChildPids(e){try{let n=`pgrep -P ${String(e)}`,r=execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(n,{timeout:1000});if(!r)return[];return r.trim().split(`
`).filter(Boolean).map((o)=>parseInt(o,10)).filter((o)=>!isNaN(o))}catch{return[]}}
var VRr,cOu=60000,uOu=5000,Yun;
var rE=b(()=>{oa();ws();Yun=new Map});
export {Br,WS,wYe,isProcessRunning,sigtermThenKill,getAncestorPidsAsync,getProcessCommand,getProcessStartTime,isSameProcess,isSameProcessAsync,ownProcStart,ownProcStartAsync,getProcessStartTimeAsync,_resetProcStartCacheForTesting,pOu,getAncestorCommandsAsync,getChildPids,VRr,cOu,uOu,Yun,rE};
