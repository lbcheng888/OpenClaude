// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING,Vfr} from "./m683.ts";
import {Pt,Go} from "./m632.ts";
import {dn,qp,bt} from "./m195.ts";
import {zMe,Gfr} from "./m681.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {C7e} from "./m638.ts";
var hes={};
isFullscreenWithTTY(hes,{execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING:()=>execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING,execFileNoThrowWithCwd:()=>execFileNoThrowWithCwd,execFileNoThrow:()=>execFileNoThrow});
function execFileNoThrow(e,t,n={timeout:10*zfr*Kfr,preserveOutputOnError:!0,useCwd:!0}){return execFileNoThrowWithCwd(e,t,{abortSignal:n.abortSignal,timeout:n.timeout,preserveOutputOnError:n.preserveOutputOnError,cwd:n.useCwd?Pt():void 0,env:n.env,stdin:n.stdin,input:n.input})}
function gJc(e){return dn(e)==="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"||e?.isMaxBuffer===!0}
function _Jc(e,t){if(e.shortMessage)return e.shortMessage;if(typeof e.signal==="string")return e.signal;return String(t)}
function execFileNoThrowWithCwd(e,t,{abortSignal:n,timeout:r=10*zfr*Kfr,preserveOutputOnError:o=!0,cwd:s,env:i,maxBuffer:a,shell:l,stdin:c,input:u}={timeout:10*zfr*Kfr,preserveOutputOnError:!0,maxBuffer:1e6}){let d=e;return new Promise((p)=>{zMe(d,t,{maxBuffer:a,signal:n,timeout:r,cwd:s,env:i,shell:l,stdin:c,input:u,reject:!1}).then((m)=>{if(m.failed)if(o){let f=m.exitCode??1;p({stdout:m.stdout||"",stderr:m.stderr||"",code:f,error:_Jc(m,f)})}else p({stdout:"",stderr:"",code:m.exitCode??1});else p({stdout:m.stdout,stderr:m.stderr,code:0})}).catch((m)=>{let f=m.message;if(qp(m))logForDebugging(`execFileNoThrow spawn failed: ${dn(m)} ${f}`,{level:"error"});else if(gJc(m))logForDebugging(`execFileNoThrow maxBuffer exceeded: ${f}`,{level:"error"});else De(m);p({stdout:"",stderr:"",code:1})})})}
var Kfr=1000,zfr=60;
var oa=b(()=>{Gfr();Go();qe();bt();Rn();C7e();Vfr()});
export {hes,execFileNoThrow,gJc,_Jc,execFileNoThrowWithCwd,Kfr,zfr,oa};
