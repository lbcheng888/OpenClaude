// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {FRt,Uon,$on,Pa} from "./m720.ts";
import {bt,Gc} from "./m588.ts";
import {truncateToWidth} from "./m239.ts";
import {JMa,VMa,g2n,_2n,V$t,S0e,YMa,ate} from "./m3839.ts";
import {formatDuration} from "./m240.ts";
import {gT} from "../src/core/2809_toInfraSessionId.ts";
import {b,x} from "../runtime.ts";
import {Kht} from "./m4785.ts";
async function bEm(e){return(await VBl.toString(e,SEm)).split(`
`).filter((n)=>n.length>0)}
function KBl(e){let t=e.write??((N)=>process.stdout.write(N)),n=e.verbose,r=0,o="idle",s="Ready",i="",a="",l="",c="",u="",d=null,p=[],m=!1,f="",h=null,g=0,_=0,T=1,y=null,S="single-session",E=new Map,R=null,w=0;function H(N){let F=process.stdout.columns||80,V=0;for(let G of N.split(`
`)){if(G.length===0){V++;continue}let z=sn(G);V+=Math.max(1,Math.ceil(z/F))}if(N.endsWith(`
`))V--;return V}function k(N){t(N),r+=H(N)}function I(){if(r<=0)return;t(`\x1B[${r}A`),t("\x1B[J"),r=0}function D(N){I(),t(N),B()}function O(N){if(N===f)return;f=N,bEm(N).then((F)=>{p=F,B()}).catch((F)=>{logForDebugging(`QR code generation failed: ${F}`,{level:"error"})})}function L(){I();let N=FRt[w%FRt.length],F="";if(i)F+=bt.dim(" \xB7 ")+bt.dim(i);if(a)F+=bt.dim(" \xB7 ")+bt.dim(a);k(`${bt.yellow(N)} ${bt.yellow("Connecting")}${F}
`)}function P(){M(),L(),R=setInterval(()=>{w++,L()},150)}function M(){if(R)clearInterval(R),R=null}function B(){if(o==="reconnecting"||o==="failed")return;I();let N=o==="idle";if(m)for(let j of p)k(`${bt.dim(j)}
`);let F=Uon,V=N?bt.green:bt.cyan,z=(N?bt.green:bt.cyan)(s),J="";if(i)J+=bt.dim(" \xB7 ")+bt.dim(i);if(a&&S!=="worktree")J+=bt.dim(" \xB7 ")+bt.dim(a);if(k(`${V(F)} ${z}${J}
`),T>1){let j=S==="worktree"?"New sessions will be created in an isolated worktree":"New sessions will be created in the current directory";k(`    ${bt.dim(`Capacity: ${_}/${T} \xB7 ${j}`)}
`);for(let[,X]of E){let ee=X.title?truncateToWidth(X.title,35):bt.dim("Attached"),te=JMa(ee,X.url),ne=X.activity,re=ne&&ne.type!=="result"&&ne.type!=="error"?bt.dim(` ${truncateToWidth(ne.summary,40)}`):"";k(`    ${te}${re}
`)}}if(T===1){let j=S==="single-session"?"Single session \xB7 exits when complete":S==="worktree"?`Capacity: ${_}/1 \xB7 New sessions will be created in an isolated worktree`:`Capacity: ${_}/1 \xB7 New sessions will be created in the current directory`;k(`    ${bt.dim(j)}
`)}if(T===1&&!N&&h&&Date.now()-g<VMa)k(`  ${bt.dim(truncateToWidth(h,60))}
`);let K=d??c;if(K){k(`
`);let j=N?g2n(K):_2n(K),X=m?bt.dim.italic("space to hide QR code"):bt.dim.italic("space to show QR code"),ee=y?bt.dim.italic(" \xB7 w to toggle spawn mode"):"";k(`${bt.dim(j)}
`),k(`${X}${ee}
`)}}return{printBanner(N,F){if(u=N.sessionIngressUrl,c=V$t(F,u),O(c),n)t(bt.dim("Remote Control")+` v${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION}
`);if(n){if(N.spawnMode!=="single-session")t(bt.dim("Spawn mode: ")+`${N.spawnMode}
`),t(bt.dim("Max concurrent sessions: ")+`${N.maxSessions}
`);t(bt.dim("Environment ID: ")+`${F}
`)}if(N.sandbox)t(bt.dim("Sandbox: ")+`${bt.green("Enabled")}
`);if(N.livePreviewPorts&&N.livePreviewPorts.size>0){let V=[...N.livePreviewPorts].sort((G,z)=>G-z).join(", ");t(bt.yellow(`\u26A0  Live preview enabled: 127.0.0.1 port${N.livePreviewPorts.size>1?"s":""} ${V} ${N.livePreviewPorts.size>1?"are":"is"} reachable from this session's livepreview URL while Remote Control is running.
`))}t(`
`),P()},logSessionStart(N,F){if(n){let V=truncateToWidth(F,80);D(bt.dim(`[${S0e()}]`)+` Session started: ${bt.white(`"${V}"`)} (${bt.dim(N)})
`)}},logSessionComplete(N,F){D(bt.dim(`[${S0e()}]`)+` Session ${bt.green("completed")} (${formatDuration(F)}) ${bt.dim(N)}
`)},logSessionFailed(N,F){D(bt.dim(`[${S0e()}]`)+` Session ${bt.red("failed")}: ${F} ${bt.dim(N)}
`)},logStatus(N){D(bt.dim(`[${S0e()}]`)+` ${N}
`)},logVerbose(N){if(n)D(bt.dim(`[${S0e()}] ${N}`)+`
`)},logError(N){D(bt.red(`[${S0e()}] Error: ${N}`)+`
`)},logReconnected(N){D(bt.dim(`[${S0e()}]`)+` ${bt.green("Reconnected")} after ${formatDuration(N)}
`)},setRepoInfo(N,F){i=N,a=F},setDebugLogPath(N){l=N},updateIdleStatus(){M(),o="idle",s="Ready",h=null,g=0,d=null,O(c),B()},setAttached(N){if(M(),o="attached",s="Connected",h=null,g=0,T<=1)d=gT(N,u),O(d);B()},updateReconnectingStatus(N,F){if(M(),I(),o="reconnecting",m)for(let G of p)k(`${bt.dim(G)}
`);let V=FRt[w%FRt.length];w++,k(`${bt.yellow(V)} ${bt.yellow("Reconnecting")} ${bt.dim("\xB7")} ${bt.dim(`retrying in ${N}`)} ${bt.dim("\xB7")} ${bt.dim(`disconnected ${F}`)}
`)},updateFailedStatus(N){M(),I(),o="failed";let F="";if(i)F+=bt.dim(" \xB7 ")+bt.dim(i);if(a)F+=bt.dim(" \xB7 ")+bt.dim(a);if(k(`${bt.red($on)} ${bt.red("Remote Control Failed")}${F}
`),k(`${bt.dim(YMa)}
`),N)k(`${bt.red(N)}
`)},updateSessionStatus(N,F,V,G){if(V.type==="tool_start")h=V.summary,g=Date.now();B()},clearStatus(){M(),I()},toggleQr(){m=!m,B()},updateSessionCount(N,F,V){if(_===N&&T===F&&S===V)return;_=N,T=F,S=V},setSpawnModeDisplay(N){if(y===N)return;if(y=N,N)S=N},addSession(N,F){E.set(N,{url:F})},updateSessionActivity(N,F){let V=E.get(N);if(!V)return;V.activity=F},setSessionTitle(N,F){let V=E.get(N);if(!V)return;if(V.title=F,o==="reconnecting"||o==="failed")return;if(T===1)o="titled",s=truncateToWidth(F,40);B()},removeSession(N){E.delete(N)},refreshDisplay(){if(o==="reconnecting"||o==="failed")return;B()}}}
var VBl,SEm;
var zBl=b(()=>{Gc();Pa();mc();qe();ate();VBl=x(Kht(),1),SEm={type:"utf8",errorCorrectionLevel:"L",small:!0}});
export {bEm,KBl,VBl,SEm,zBl};
