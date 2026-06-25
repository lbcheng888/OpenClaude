// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING,bTr} from "./m689.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {cn,sp,Ct} from "./m197.ts";
import {$1e,STr} from "./m687.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {bje} from "./m644.ts";
var mis={};
ft(mis,{execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING:()=>execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING,execFileNoThrowWithCwd:()=>execFileNoThrowWithCwd,execFileNoThrow:()=>execFileNoThrow});
function execFileNoThrow(e,t,n={timeout:10*CTr*ETr,preserveOutputOnError:!0,useCwd:!0}){return execFileNoThrowWithCwd(e,t,{abortSignal:n.abortSignal,timeout:n.timeout,preserveOutputOnError:n.preserveOutputOnError,cwd:n.useCwd?isTmuxControlMode():void 0,env:n.env,stdin:n.stdin,input:n.input})}
function Oiu(e){return cn(e)==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"||e?.isMaxBuffer===!0}
function Liu(e,t){if(e.shortMessage)return e.shortMessage;if(typeof e.signal==="string")return e.signal;return String(t)}
function execFileNoThrowWithCwd(e,t,{abortSignal:n,timeout:r=10*CTr*ETr,preserveOutputOnError:o=!0,cwd:s,env:i,maxBuffer:a,shell:l,stdin:c,input:u}={timeout:10*CTr*ETr,preserveOutputOnError:!0,maxBuffer:1e6}){let d=e;return new Promise((p)=>{$1e(d,t,{maxBuffer:a,signal:n,timeout:r,cwd:s,env:i,shell:l,stdin:c,input:u,reject:!1}).then((m)=>{if(m.failed)if(o){let f=m.exitCode??1;p({stdout:m.stdout||"",stderr:m.stderr||"",code:f,error:Liu(m,f)})}else p({stdout:"",stderr:"",code:m.exitCode??1});else p({stdout:m.stdout,stderr:m.stderr,code:0})}).catch((m)=>{let f=m.message;if(sp(m))logForDebugging(`execFileNoThrow spawn failed: ${cn(m)} ${f}`,{level:"error"});else if(Oiu(m))logForDebugging(`execFileNoThrow maxBuffer exceeded: ${f}`,{level:"error"});else Ie(m);p({stdout:"",stderr:"",code:1})})})}
var ETr=1000,CTr=60;
var Ii=b(()=>{STr();Po();qe();Ct();vn();bje();bTr()});
export {mis,execFileNoThrow,Oiu,Liu,execFileNoThrowWithCwd,ETr,CTr,Ii};
