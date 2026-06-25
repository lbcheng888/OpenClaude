// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {getSessionId,getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {NS} from "./m648.ts";
import {Wt,ps} from "./m230.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {WKe} from "./m133.ts";
import {Si,ud} from "./m134.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Tu} from "./m649.ts";
var tQl={};
ft(tQl,{renameRecordingForSession:()=>renameRecordingForSession,installAsciicastRecorder:()=>installAsciicastRecorder,getSessionRecordingPaths:()=>getSessionRecordingPaths,getRecordFilePath:()=>getRecordFilePath,flushAsciicastRecorder:()=>flushAsciicastRecorder,_resetRecordingStateForTesting:()=>_resetRecordingStateForTesting});
function getRecordFilePath(){if(AV.filePath!==null)return AV.filePath;return null}
function _resetRecordingStateForTesting(){AV.filePath=null,AV.timestamp=0}
function getSessionRecordingPaths(){let e=getSessionId(),t=S9.join(or(),"projects"),n=S9.join(t,NS(getOriginalCwd()));try{let r=Wt().readdirSync(n);return(typeof r[0]==="string"?r:r.map((i)=>i.name)).filter((i)=>i.startsWith(e)&&i.endsWith(".cast")).sort().map((i)=>S9.join(n,i))}catch{return[]}}
async function renameRecordingForSession(){let e=AV.filePath;if(!e||AV.timestamp===0)return;let t=S9.join(or(),"projects"),n=S9.join(t,NS(getOriginalCwd())),r=S9.join(n,`${getSessionId()}-${AV.timestamp}.cast`);if(e===r)return;await J7t?.flush();let o=S9.basename(e),s=S9.basename(r);try{await ptr.rename(e,r),AV.filePath=r,logForDebugging(`[asciicast] Renamed recording: ${o} \u2192 ${s}`)}catch{logForDebugging(`[asciicast] Failed to rename recording from ${o} to ${s}`)}}
function ZXl(){let e=process.stdout.columns||80,t=process.stdout.rows||24;return{cols:e,rows:t}}
async function flushAsciicastRecorder(){await J7t?.flush()}
function installAsciicastRecorder(){let e=getRecordFilePath();if(!e)return;let{cols:t,rows:n}=ZXl(),r=performance.now(),o=TeamDeleteToolName({version:2,width:t,height:n,timestamp:Math.floor(Date.now()/1000),env:{SHELL:process.env.SHELL||"",TERM:process.env.TERM||""}});try{Wt().mkdirSync(S9.dirname(e))}catch{}Wt().appendFileSync(e,o+`
`,{mode:384});let s=Promise.resolve(),i=WKe({writeFn(c){let u=AV.filePath;if(!u)return;s=s.then(()=>ptr.appendFile(u,c)).catch(()=>{})},flushIntervalMs:500,maxBufferSize:50,maxBufferBytes:10485760}),a=process.stdout.write.bind(process.stdout);process.stdout.write=function(c,u,d){let p=(performance.now()-r)/1000,m=typeof c==="string"?c:Buffer.from(c).toString("utf-8");if(i.write(TeamDeleteToolName([p,"o",m])+`
`),typeof u==="function")return a(c,u);return a(c,u,d)};function l(){let c=(performance.now()-r)/1000,{cols:u,rows:d}=ZXl();i.write(TeamDeleteToolName([c,"r",`${u}x${d}`])+`
`)}process.stdout.on("resize",l),J7t={async flush(){i.flush(),await s},async dispose(){i.dispose(),await s,process.stdout.removeListener("resize",l),process.stdout.write=a}},Si(async()=>{await J7t?.dispose(),J7t=null}),logForDebugging(`[asciicast] Recording to ${e}`)}
var ptr,S9,AV,J7t=null;
var Q7t=b(()=>{lt();jn();ud();qe();dn();ps();Tu();tn();ptr=require("fs/promises"),S9=require("path"),AV={filePath:null,timestamp:0}});
export {tQl,getRecordFilePath,_resetRecordingStateForTesting,getSessionRecordingPaths,renameRecordingForSession,ZXl,flushAsciicastRecorder,installAsciicastRecorder,ptr,S9,AV,J7t,Q7t};
