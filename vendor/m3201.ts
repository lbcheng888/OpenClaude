// @ts-nocheck
import {getProxyUrl,getProxyFetchOptions,ey} from "../src/config/1026_shouldBypassProxyWithCidr.ts";
import {agentProxyEnv,VM} from "../src/agent/2231_subprocessEnv.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
var wj=2048;
async function TDn(e){if(!getProxyUrl()){let t=agentProxyEnv();if(t.HTTPS_PROXY&&URL.parse(e)?.protocol==="https:"){let n;if(t.SSL_CERT_FILE)try{n=await ola.readFile(t.SSL_CERT_FILE,"utf8")}catch(r){logForDebugging(`MCP agent-proxy fallback: failed to read CA bundle: ${r instanceof Error?r.message:String(r)}`,{level:"warn"})}return getProxyFetchOptions({url:e,fallbackProxy:{url:t.HTTPS_PROXY,noProxy:t.NO_PROXY,ca:n}})}}return getProxyFetchOptions({url:e})}
var ola;
var sla=b(()=>{qe();ey();VM();ola=require("fs/promises")});
export {wj,TDn,ola,sla};
