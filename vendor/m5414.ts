// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {getSessionId,getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {BS} from "./m642.ts";
import {jt,ws} from "./m228.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {YWe} from "./m132.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Iu} from "./m643.ts";
var yWl={};
isFullscreenWithTTY(yWl,{renameRecordingForSession:()=>renameRecordingForSession,installAsciicastRecorder:()=>installAsciicastRecorder,getSessionRecordingPaths:()=>getSessionRecordingPaths,getRecordFilePath:()=>getRecordFilePath,flushAsciicastRecorder:()=>flushAsciicastRecorder,_resetRecordingStateForTesting:()=>_resetRecordingStateForTesting});
function getRecordFilePath(){if(sV.filePath!==null)return sV.filePath;return null}
function _resetRecordingStateForTesting(){sV.filePath=null,sV.timestamp=0}
function getSessionRecordingPaths(){let e=getSessionId(),t=Z9.join(tr(),"projects"),n=Z9.join(t,BS(getOriginalCwd()));try{let r=jt().readdirSync(n);return(typeof r[0]==="string"?r:r.map((i)=>i.name)).filter((i)=>i.startsWith(e)&&i.endsWith(".cast")).sort().map((i)=>Z9.join(n,i))}catch{return[]}}
async function renameRecordingForSession(){let e=sV.filePath;if(!e||sV.timestamp===0)return;let t=Z9.join(tr(),"projects"),n=Z9.join(t,BS(getOriginalCwd())),r=Z9.join(n,`${getSessionId()}-${sV.timestamp}.cast`);if(e===r)return;await CGt?.flush();let o=Z9.basename(e),s=Z9.basename(r);try{await dXn.rename(e,r),sV.filePath=r,logForDebugging(`[asciicast] Renamed recording: ${o} \u2192 ${s}`)}catch{logForDebugging(`[asciicast] Failed to rename recording from ${o} to ${s}`)}}
function gWl(){let e=process.stdout.columns||80,t=process.stdout.rows||24;return{cols:e,rows:t}}
async function flushAsciicastRecorder(){await CGt?.flush()}
function installAsciicastRecorder(){let e=getRecordFilePath();if(!e)return;let{cols:t,rows:n}=gWl(),r=performance.now(),o=Le({version:2,width:t,height:n,timestamp:Math.floor(Date.now()/1000),env:{SHELL:process.env.SHELL||"",TERM:process.env.TERM||""}});try{jt().mkdirSync(Z9.dirname(e))}catch{}jt().appendFileSync(e,o+`
`,{mode:384});let s=Promise.resolve(),i=YWe({writeFn(c){let u=sV.filePath;if(!u)return;s=s.then(()=>dXn.appendFile(u,c)).catch(()=>{})},flushIntervalMs:500,maxBufferSize:50,maxBufferBytes:10485760}),a=process.stdout.write.bind(process.stdout);process.stdout.write=function(c,u,d){let p=(performance.now()-r)/1000,m=typeof c==="string"?c:Buffer.from(c).toString("utf-8");if(i.write(Le([p,"o",m])+`
`),typeof u==="function")return a(c,u);return a(c,u,d)};function l(){let c=(performance.now()-r)/1000,{cols:u,rows:d}=gWl();i.write(Le([c,"r",`${u}x${d}`])+`
`)}process.stdout.on("resize",l),CGt={async flush(){i.flush(),await s},async dispose(){i.dispose(),await s,process.stdout.removeListener("resize",l),process.stdout.write=a}},Gi(async()=>{await CGt?.dispose(),CGt=null}),logForDebugging(`[asciicast] Recording to ${e}`)}
var dXn,Z9,sV,CGt=null;
var wGt=b(()=>{lt();zn();ReactHooks();qe();sn();ws();Iu();Xt();dXn=require("fs/promises"),Z9=require("path"),sV={filePath:null,timestamp:0}});
export {yWl,getRecordFilePath,_resetRecordingStateForTesting,getSessionRecordingPaths,renameRecordingForSession,gWl,flushAsciicastRecorder,installAsciicastRecorder,dXn,Z9,sV,CGt,wGt};
