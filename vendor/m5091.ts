// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {k1e,Arn} from "./m617.ts";
import {WKe} from "./m133.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {Wt,ps} from "./m230.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Si,ud} from "./m134.ts";
import {vNi,oS} from "../src/config/2605_event_name.ts";
import {ho} from "./m572.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {Zns,vn,Qns} from "../src/session/0621_length.ts";
import {ap} from "./m573.ts";
import {Uto} from "./m3345.ts";
var eJn={};
ft(eJn,{initializeErrorLogSink:()=>initializeErrorLogSink,getMCPLogsPath:()=>getMCPLogsPath,getErrorsPath:()=>getErrorsPath,_flushLogWritersForTesting:()=>_flushLogWritersForTesting,_clearLogWritersForTesting:()=>_clearLogWritersForTesting});
function getErrorsPath(){return oVt.join(k1e.errors(),iFl+".jsonl")}
function getMCPLogsPath(e){return oVt.join(k1e.mcpLogs(e),iFl+".jsonl")}
function zSm(e){let t=WKe(e);return{write(n){t.write(TeamDeleteToolName(n)+`
`)},flush:t.flush,dispose:t.dispose}}
function _flushLogWritersForTesting(){for(let e of rVt.values())e.flush()}
function _clearLogWritersForTesting(){for(let e of rVt.values())e.dispose();rVt.clear()}
function Fxo(e){let t=rVt.get(e);if(!t){let n=oVt.dirname(e),r=!1;t=zSm({writeFn:(o)=>{try{try{Wt().appendFileSync(e,o)}catch{Wt().mkdirSync(n),Wt().appendFileSync(e,o)}}catch(s){if(!r)r=!0,logForDebugging(`Dropping log batch for ${e}: ${s instanceof Error?s.message:String(s)}`)}},flushIntervalMs:1000,maxBufferSize:50}),rVt.set(e,t),Si(async()=>t?.dispose())}return t}
function JSm(e,t){return}
function XSm(e){if(typeof e==="string")return e;if(e&&typeof e==="object"){let t=e;if(typeof t.message==="string")return t.message;if(typeof t.error==="object"&&t.error&&"message"in t.error&&typeof t.error.message==="string")return t.error.message}return}
function QSm(e){vNi(e);let t=e.stack||e.message,n="";if(ho.isAxiosError(e)&&e.config?.url){let r=[`url=${e.config.url}`];if(e.response?.status!==void 0)r.push(`status=${e.response.status}`);let o=XSm(e.response?.data);if(o)r.push(`body=${o}`);n=`[${r.join(",")}] `}logForDebugging(`${e.name}: ${n}${t}`,{level:"error"}),JSm(getErrorsPath(),{error:`${n}${t}`})}
function ZSm(e,t){logForDebugging(`MCP server "${e}" ${t}`,{level:"error"});let n=getMCPLogsPath(e),o={error:t instanceof Error?t.stack||t.message:String(t),timestamp:new Date().toISOString(),sessionId:getSessionId(),cwd:Wt().cwd()};Fxo(n).write(o)}
function ebm(e,t){logForDebugging(`MCP server "${e}": ${t}`);let n=getMCPLogsPath(e),r={debug:t,timestamp:new Date().toISOString(),sessionId:getSessionId(),cwd:Wt().cwd()};Fxo(n).write(r)}
function initializeErrorLogSink(){Zns({logError:QSm,logMCPError:ZSm,logMCPDebug:ebm,getErrorsPath:getErrorsPath,getMCPLogsPath:getMCPLogsPath}),logForDebugging("Error log sink initialized")}
var oVt,iFl,rVt;
var sVt=b(()=>{ap();lt();Uto();Arn();ud();qe();ps();vn();tn();oS();oVt=require("path"),iFl=Qns(new Date);rVt=new Map});
export {eJn,getErrorsPath,getMCPLogsPath,zSm,_flushLogWritersForTesting,_clearLogWritersForTesting,Fxo,JSm,XSm,QSm,ZSm,ebm,initializeErrorLogSink,oVt,iFl,rVt,sVt};
