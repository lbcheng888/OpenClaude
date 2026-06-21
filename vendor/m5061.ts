// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {LMe,jen} from "./m611.ts";
import {YWe} from "./m132.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {jt,ws} from "./m228.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {z0i,uS} from "../src/config/2594_event_name.ts";
import {fo} from "./m566.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {nXo,Rn,tXo} from "../src/session/0615_length.ts";
import {Gp} from "./m567.ts";
import {oXr} from "./m3329.ts";
var a7n={};
isFullscreenWithTTY(a7n,{initializeErrorLogSink:()=>initializeErrorLogSink,getMCPLogsPath:()=>getMCPLogsPath,getErrorsPath:()=>getErrorsPath,_flushLogWritersForTesting:()=>_flushLogWritersForTesting,_clearLogWritersForTesting:()=>_clearLogWritersForTesting});
function getErrorsPath(){return L8t.join(LMe.errors(),OIl+".jsonl")}
function getMCPLogsPath(e){return L8t.join(LMe.mcpLogs(e),OIl+".jsonl")}
function Mdm(e){let t=YWe(e);return{write(n){t.write(Le(n)+`
`)},flush:t.flush,dispose:t.dispose}}
function _flushLogWritersForTesting(){for(let e of O8t.values())e.flush()}
function _clearLogWritersForTesting(){for(let e of O8t.values())e.dispose();O8t.clear()}
function HRo(e){let t=O8t.get(e);if(!t){let n=L8t.dirname(e),r=!1;t=Mdm({writeFn:(o)=>{try{try{jt().appendFileSync(e,o)}catch{jt().mkdirSync(n),jt().appendFileSync(e,o)}}catch(s){if(!r)r=!0,logForDebugging(`Dropping log batch for ${e}: ${s instanceof Error?s.message:String(s)}`)}},flushIntervalMs:1000,maxBufferSize:50}),O8t.set(e,t),Gi(async()=>t?.dispose())}return t}
function Fdm(e,t){return}
function Udm(e){if(typeof e==="string")return e;if(e&&typeof e==="object"){let t=e;if(typeof t.message==="string")return t.message;if(typeof t.error==="object"&&t.error&&"message"in t.error&&typeof t.error.message==="string")return t.error.message}return}
function $dm(e){z0i(e);let t=e.stack||e.message,n="";if(fo.isAxiosError(e)&&e.config?.url){let r=[`url=${e.config.url}`];if(e.response?.status!==void 0)r.push(`status=${e.response.status}`);let o=Udm(e.response?.data);if(o)r.push(`body=${o}`);n=`[${r.join(",")}] `}logForDebugging(`${e.name}: ${n}${t}`,{level:"error"}),Fdm(getErrorsPath(),{error:`${n}${t}`})}
function qdm(e,t){logForDebugging(`MCP server "${e}" ${t}`,{level:"error"});let n=getMCPLogsPath(e),o={error:t instanceof Error?t.stack||t.message:String(t),timestamp:new Date().toISOString(),sessionId:getSessionId(),cwd:jt().cwd()};HRo(n).write(o)}
function jdm(e,t){logForDebugging(`MCP server "${e}": ${t}`);let n=getMCPLogsPath(e),r={debug:t,timestamp:new Date().toISOString(),sessionId:getSessionId(),cwd:jt().cwd()};HRo(n).write(r)}
function initializeErrorLogSink(){nXo({logError:$dm,logMCPError:qdm,logMCPDebug:jdm,getErrorsPath:getErrorsPath,getMCPLogsPath:getMCPLogsPath}),logForDebugging("Error log sink initialized")}
var L8t,OIl,O8t;
var M8t=b(()=>{Gp();lt();oXr();jen();ReactHooks();qe();ws();Rn();Xt();uS();L8t=require("path"),OIl=tXo(new Date);O8t=new Map});
export {a7n,getErrorsPath,getMCPLogsPath,Mdm,_flushLogWritersForTesting,_clearLogWritersForTesting,HRo,Fdm,Udm,$dm,qdm,jdm,initializeErrorLogSink,L8t,OIl,O8t,M8t};
