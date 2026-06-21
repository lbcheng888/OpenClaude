// @ts-nocheck
import {getProxyUrl,getProxyFetchOptions,Z_} from "../src/config/1021_shouldBypassProxyWithCidr.ts";
import {agentProxyEnv,P1} from "../src/agent/2223_subprocessEnv.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function xHn(e){if(!getProxyUrl()){let t=agentProxyEnv();if(t.HTTPS_PROXY&&URL.parse(e)?.protocol==="https:"){let n;if(t.SSL_CERT_FILE)try{n=await sta.readFile(t.SSL_CERT_FILE,"utf8")}catch(r){logForDebugging(`MCP agent-proxy fallback: failed to read CA bundle: ${r instanceof Error?r.message:String(r)}`,{level:"warn"})}return getProxyFetchOptions({url:e,fallbackProxy:{url:t.HTTPS_PROXY,noProxy:t.NO_PROXY,ca:n}})}}return getProxyFetchOptions({url:e})}
var sta;
var ita=b(()=>{qe();Z_();P1();sta=require("fs/promises")});
export {xHn,sta,ita};
