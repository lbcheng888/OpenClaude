// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {dEt,snn,inn,sl} from "./m715.ts";
import {_t,cu} from "./m582.ts";
import {truncateToWidth} from "./m237.ts";
import {wHa,SHa,bBn,EBn,hUt,DHe,vHa,mte} from "./m3821.ts";
import {formatDuration} from "./m238.ts";
import {bT} from "../src/core/2797_toInfraSessionId.ts";
import {b,M} from "../runtime.ts";
import {Omt} from "./m4753.ts";
async function umm(e){return(await gDl.toString(e,cmm)).split(`
`).filter((n)=>n.length>0)}
function _Dl(e){let t=e.write??(($)=>process.stdout.write($)),n=e.verbose,r=0,o="idle",s="Ready",i="",a="",l="",c="",u="",d=null,p=[],m=!1,f="",A=null,h=0,g=0,_=1,y=null,T="single-session",S=new Map,v=null,R=0;function k($){let U=process.stdout.columns||80,W=0;for(let G of $.split(`
`)){if(G.length===0){W++;continue}let V=tn(G);W+=Math.max(1,Math.ceil(V/U))}if($.endsWith(`
`))W--;return W}function x($){t($),r+=k($)}function H(){if(r<=0)return;t(`\x1B[${r}A`),t("\x1B[J"),r=0}function I($){H(),t($),O()}function P($){if($===f)return;f=$,umm($).then((U)=>{p=U,O()}).catch((U)=>{logForDebugging(`QR code generation failed: ${U}`,{level:"error"})})}function L(){H();let $=dEt[R%dEt.length],U="";if(i)U+=_t.dim(" \xB7 ")+_t.dim(i);if(a)U+=_t.dim(" \xB7 ")+_t.dim(a);x(`${_t.yellow($)} ${_t.yellow("Connecting")}${U}
`)}function D(){N(),L(),v=setInterval(()=>{R++,L()},150)}function N(){if(v)clearInterval(v),v=null}function O(){if(o==="reconnecting"||o==="failed")return;H();let $=o==="idle";if(m)for(let Y of p)x(`${_t.dim(Y)}
`);let U=snn,W=$?_t.green:_t.cyan,V=($?_t.green:_t.cyan)(s),Q="";if(i)Q+=_t.dim(" \xB7 ")+_t.dim(i);if(a&&T!=="worktree")Q+=_t.dim(" \xB7 ")+_t.dim(a);if(x(`${W(U)} ${V}${Q}
`),_>1){let Y=T==="worktree"?"New sessions will be created in an isolated worktree":"New sessions will be created in the current directory";x(`    ${_t.dim(`Capacity: ${g}/${_} \xB7 ${Y}`)}
`);for(let[,J]of S){let ee=J.title?truncateToWidth(J.title,35):_t.dim("Attached"),te=wHa(ee,J.url),ne=J.activity,oe=ne&&ne.type!=="result"&&ne.type!=="error"?_t.dim(` ${truncateToWidth(ne.summary,40)}`):"";x(`    ${te}${oe}
`)}}if(_===1){let Y=T==="single-session"?"Single session \xB7 exits when complete":T==="worktree"?`Capacity: ${g}/1 \xB7 New sessions will be created in an isolated worktree`:`Capacity: ${g}/1 \xB7 New sessions will be created in the current directory`;x(`    ${_t.dim(Y)}
`)}if(_===1&&!$&&A&&Date.now()-h<SHa)x(`  ${_t.dim(truncateToWidth(A,60))}
`);let K=d??c;if(K){x(`
`);let Y=$?bBn(K):EBn(K),J=m?_t.dim.italic("space to hide QR code"):_t.dim.italic("space to show QR code"),ee=y?_t.dim.italic(" \xB7 w to toggle spawn mode"):"";x(`${_t.dim(Y)}
`),x(`${J}${ee}
`)}}return{printBanner($,U){if(u=$.sessionIngressUrl,c=hUt(U,u),P(c),n)t(_t.dim("Remote Control")+` v${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION}
`);if(n){if($.spawnMode!=="single-session")t(_t.dim("Spawn mode: ")+`${$.spawnMode}
`),t(_t.dim("Max concurrent sessions: ")+`${$.maxSessions}
`);t(_t.dim("Environment ID: ")+`${U}
`)}if($.sandbox)t(_t.dim("Sandbox: ")+`${_t.green("Enabled")}
`);if($.livePreviewPorts&&$.livePreviewPorts.size>0){let W=[...$.livePreviewPorts].sort((G,V)=>G-V).join(", ");t(_t.yellow(`\u26A0  Live preview enabled: 127.0.0.1 port${$.livePreviewPorts.size>1?"s":""} ${W} ${$.livePreviewPorts.size>1?"are":"is"} reachable from this session's livepreview URL while Remote Control is running.
`))}t(`
`),D()},logSessionStart($,U){if(n){let W=truncateToWidth(U,80);I(_t.dim(`[${DHe()}]`)+` Session started: ${_t.white(`"${W}"`)} (${_t.dim($)})
`)}},logSessionComplete($,U){I(_t.dim(`[${DHe()}]`)+` Session ${_t.green("completed")} (${formatDuration(U)}) ${_t.dim($)}
`)},logSessionFailed($,U){I(_t.dim(`[${DHe()}]`)+` Session ${_t.red("failed")}: ${U} ${_t.dim($)}
`)},logStatus($){I(_t.dim(`[${DHe()}]`)+` ${$}
`)},logVerbose($){if(n)I(_t.dim(`[${DHe()}] ${$}`)+`
`)},logError($){I(_t.red(`[${DHe()}] Error: ${$}`)+`
`)},logReconnected($){I(_t.dim(`[${DHe()}]`)+` ${_t.green("Reconnected")} after ${formatDuration($)}
`)},setRepoInfo($,U){i=$,a=U},setDebugLogPath($){l=$},updateIdleStatus(){N(),o="idle",s="Ready",A=null,h=0,d=null,P(c),O()},setAttached($){if(N(),o="attached",s="Connected",A=null,h=0,_<=1)d=bT($,u),P(d);O()},updateReconnectingStatus($,U){if(N(),H(),o="reconnecting",m)for(let G of p)x(`${_t.dim(G)}
`);let W=dEt[R%dEt.length];R++,x(`${_t.yellow(W)} ${_t.yellow("Reconnecting")} ${_t.dim("\xB7")} ${_t.dim(`retrying in ${$}`)} ${_t.dim("\xB7")} ${_t.dim(`disconnected ${U}`)}
`)},updateFailedStatus($){N(),H(),o="failed";let U="";if(i)U+=_t.dim(" \xB7 ")+_t.dim(i);if(a)U+=_t.dim(" \xB7 ")+_t.dim(a);if(x(`${_t.red(inn)} ${_t.red("Remote Control Failed")}${U}
`),x(`${_t.dim(vHa)}
`),$)x(`${_t.red($)}
`)},updateSessionStatus($,U,W,G){if(W.type==="tool_start")A=W.summary,h=Date.now();O()},clearStatus(){N(),H()},toggleQr(){m=!m,O()},updateSessionCount($,U,W){if(g===$&&_===U&&T===W)return;g=$,_=U,T=W},setSpawnModeDisplay($){if(y===$)return;if(y=$,$)T=$},addSession($,U){S.set($,{url:U})},updateSessionActivity($,U){let W=S.get($);if(!W)return;W.activity=U},setSessionTitle($,U){let W=S.get($);if(!W)return;if(W.title=U,o==="reconnecting"||o==="failed")return;if(_===1)o="titled",s=truncateToWidth(U,40);O()},removeSession($){S.delete($)},refreshDisplay(){if(o==="reconnecting"||o==="failed")return;O()}}}
var gDl,cmm;
var yDl=b(()=>{cu();sl();Hc();qe();mte();gDl=M(Omt(),1),cmm={type:"utf8",errorCorrectionLevel:"L",small:!0}});
export {umm,_Dl,gDl,cmm,yDl};
