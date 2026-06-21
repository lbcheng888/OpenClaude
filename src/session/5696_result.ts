// @ts-nocheck
import {Mh,GAe} from "../core/2689_GAe.ts";
import {b} from "../../runtime.ts";
import {lt,getSessionId} from "./0131_sent.ts";
import {v9e,gst,Q0n} from "../../vendor/m3325.ts";
import {ixo,lPe} from "../telemetry/5087_message.ts";
import {lY,getAttestationFilterPolicy} from "../telemetry/3327_untrustedDeviceHint.ts";
import {ReactHooks,Gi} from "../../vendor/m133.ts";
import {qe,logForDebugging,isDebugMode} from "../config/0234_setHasFormattedOutput.ts";
import {SA,kn} from "../config/0689_timestamp.ts";
import {sn} from "../config/0047_namespace.ts";
import {bt,Se} from "../../vendor/m195.ts";
import {ym,gracefulShutdown} from "../config/3332_flushAnalyticsSinks.ts";
import {Rn,De} from "./0615_length.ts";
import {fO,writeToStdout} from "../../vendor/m230.ts";
import {g6e,Mmo,NKa} from "../config/4304_activityCallback.ts";
import {UO,sS} from "../config/2189_level.ts";
import {ja,setInternalEventWriter,setInternalEventReader,updateCCRTipFromAckedBatch,getValidatedCCRTip} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {SKt,Egt} from "./0128_sessionId.ts";
import {_9,tu,P0a} from "../config/3864_entrypoint.ts";
import {sNo,fZn} from "../telemetry/5694_sNo.ts";
import {Nso,I4e} from "../../vendor/m3897.ts";
import {Nyn,rgi} from "../config/2252_level.ts";
import {w2t,v2t} from "../permissions/3899_level.ts";
import {rPo,OWt,$Pe,M3l} from "../api/5286_send.ts";
import {Fac,Bac} from "../../vendor/m5694.ts";
import {getClientPlatform} from "../config/0048_ISSUES_EXPLAINER.ts";
import {st} from "../../vendor/m5.ts";
function I4m(e){let t=e,n=t.subtype;if(e.type==="result"||e.type==="system"&&n==="init")return e.type==="result"?{...e,result:void 0,permission_denials:void 0,structured_output:void 0,deferred_tool_use:void 0,errors:void 0}:e;if(e.type==="system"&&n==="task_started")return{type:"system",subtype:n,task_id:t.task_id,task_type:t.task_type};if(e.type==="system"&&n==="task_updated"){let r=t.patch;return{type:"system",subtype:n,task_id:t.task_id,patch:{status:r?.status}}}if(e.type==="system"&&n==="task_notification")return{type:"system",subtype:n,task_id:t.task_id};if(e.type==="user")return{type:e.type,subtype:n};if(e.type==="assistant"){let r=t.message?.content;if(Array.isArray(r)){let o=r.find((s)=>s&&typeof s==="object"&&s.type==="tool_use"&&s.name===Mh);if(o){let s=o.input;return{type:"assistant",subtype:n,message:{content:[{type:"tool_use",name:Mh,input:{delaySeconds:s?.delaySeconds}}]}}}}return{type:e.type,subtype:n}}return}
function D4m(e){for(let t of e){if(t==="--")return!1;if(t==="--resume"||t==="-r"||t.startsWith("--resume="))return!0}return!1}
var Uac,$ac,xht;
var qac=b(()=>{lt();v9e();ixo();lY();GAe();ReactHooks();qe();SA();sn();bt();ym();Rn();fO();g6e();UO();ja();SKt();_9();sNo();Nso();Nyn();w2t();rPo();Fac();Uac=require("stream"),$ac=require("url");xht=class xht extends v2t{url;transport;inputStream;isBridge=!1;isDebug=!1;teeStdout=!1;ccrClient;keepAliveTimer=null;permanentCloseCode;constructor(e,t,n,r){let o=new Uac.PassThrough({encoding:"utf8"});super(o,n,r);if(this.inputStream=o,this.url=new $ac.URL(e),this.url.protocol==="wss:")this.url.protocol="https:";else if(this.url.protocol==="ws:")this.url.protocol="http:";let s={"anthropic-client-platform":getClientPlatform()},i=sS();if(i)s.Authorization=`Bearer ${i}`;else logForDebugging("[remote-io] No session ingress token available",{level:"error"});let a=process.env.CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION;if(a)s["x-environment-runner-version"]=a;let l=()=>{let f={},A=sS();if(A)f.Authorization=`Bearer ${A}`;let h=process.env.CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION;if(h)f["x-environment-runner-version"]=h;return f};this.transport=Bac(this.url,s,getSessionId(),l),this.isBridge=process.env.CLAUDE_CODE_ENVIRONMENT_KIND==="bridge",this.isDebug=isDebugMode(),this.teeStdout=st(process.env.CLAUDE_CODE_TEE_SDK_STDOUT),this.transport.setOnData((f)=>{if(this.inputStream.write(f),this.isBridge&&this.isDebug)writeToStdout(f.endsWith(`
`)?f:f+`
`)}),this.transport.setOnClose((f)=>{if(f!==void 0)this.permanentCloseCode=f,process.stderr.write(`RemoteIO: transport closed permanently (code ${f})
`);this.inputStream.end()});let c=this.isBridge?void 0:(f)=>{process.stderr.write(`SDKStartup: ${f}
`)};if(c)this.transport.setOnDiagnostic?.(c);this.ccrClient=new OWt(this.transport,this.url,{onDiagnostic:c});let u=this.ccrClient.initialize();if(this.restoredWorkerState=u.catch(()=>null),u.then(()=>c?.("worker registered"),(f)=>{let A=f instanceof $Pe?f.reason:Se(f);kn("error","cli_worker_lifecycle_init_failed",{reason:f instanceof $Pe?f.reason:"unknown"});let h=`CCRClient initialization failed: ${Se(f)}`;if(M3l(f))logForDebugging(h,{level:"error"});else De(Error(h));c?.(`worker registration failed (${A}), exiting`),gracefulShutdown(1,"other")}),Gi(async()=>this.ccrClient.close()),setInternalEventWriter((f,A,h)=>this.ccrClient.writeInternalEvent(f,A,h)),setInternalEventReader((f)=>this.ccrClient.readInternalEvents(f),()=>this.ccrClient.readSubagentInternalEvents()),this.ccrClient.onInternalBatchAcked=updateCCRTipFromAckedBatch,D4m(process.argv)){let f=performance.now(),A=this.ccrClient;this.hydratePrefetch=(async()=>{let h=A.readSubagentInternalEvents(),g,_=Egt();if(_)g=await getValidatedCCRTip(_,fZn());let[y,T]=await Promise.all([A.readInternalEvents(g?.eventId),h]);return[y,T,g]})().catch((h)=>(De(h),null)),this.hydratePrefetch.then(()=>{tu("resume_hydrate_fetch_ms",performance.now()-f,f),P0a()})}let d={started:"processing",completed:"processed"};if(this.onCommandLifecycle=(f,A)=>{this.ccrClient.reportDelivery(f,d[A])},this.isBridge)gst(getAttestationFilterPolicy),this.transport.setEventFilter((f)=>{let A=Q0n(f);if(A)this.ccrClient.reportDelivery(f.event_id,"received"),this.ccrClient.reportDelivery(f.event_id,"processed");return A});let p=(f)=>{if(this.teeStdout&&!this.isBridge)try{writeToStdout(I4e({type:"system",subtype:"session_state_changed",state:f,waiting_on_user:this.sessionState.waitingOnUser})+`
`)}catch{}};this.sessionState.onStateChanged=(f,A)=>{this.ccrClient.reportState(f,A),p(f)},this.sessionState.onWaitingOnUserChanged=()=>{p(this.sessionState.getState())},this.sessionState.onTurnStarting=()=>{if(this.teeStdout&&!this.isBridge)try{writeToStdout(I4e({type:"system",subtype:"turn_starting"})+`
`)}catch{}},Mmo((f)=>this.sessionState.setMainLoopRefcount(f)),this.sessionState.setMainLoopRefcount(NKa()),this.sessionState.onMetadataChanged=(f)=>{this.ccrClient.reportMetadata(f)},this.sessionState.onInternalMetadataChanged=(f)=>{this.ccrClient.reportInternalMetadata(f)},rgi((f)=>this.sessionState.notifyMetadataChanged(f)),this.transport.connect();let m=lPe().session_keepalive_interval_v2_ms;if(this.isBridge&&m>0)this.keepAliveTimer=setInterval(()=>{logForDebugging("[remote-io] keep_alive sent"),this.write({type:"keep_alive"}).catch((f)=>{logForDebugging(`[remote-io] keep_alive write failed: ${Se(f)}`)})},m),this.keepAliveTimer.unref?.();if(Gi(async()=>this.close()),t){let f=this.inputStream;(async()=>{for await(let A of t)f.write(String(A).replace(/\n$/,"")+`
`)})()}}flushInternalEvents(){return this.ccrClient.flushInternalEvents()}flushDeliveryAcks(){return this.ccrClient.flushDeliveryAcks()}async flushClientEvents(){let e=this.ccrClient.droppedDurableBatches;return await this.ccrClient.flush(),this.ccrClient.droppedDurableBatches===e}flushSessionState(){return this.ccrClient.flushWorkerState()}get internalEventsPending(){return this.ccrClient.internalEventsPending}async write(e){if(e.type==="transcript_mirror")return;if(this.trackWrite(e),this.teeStdout&&!this.isBridge){let t=I4m(e);if(t!==void 0)try{writeToStdout(I4e(t)+`
`)}catch{}}if(await this.ccrClient.writeEvent(e),this.isBridge){if(e.type==="control_request"||this.isDebug)writeToStdout(I4e(e)+`
`)}}close(){if(Mmo(null),this.keepAliveTimer)clearInterval(this.keepAliveTimer),this.keepAliveTimer=null;this.transport.close(),this.inputStream.end()}}});
export {I4m,D4m,Uac,$ac,xht,qac};
