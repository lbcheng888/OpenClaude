// @ts-nocheck
import {Uh,v$i} from "./m2682.ts";
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {subprocessEnv,VM} from "../src/agent/2231_subprocessEnv.ts";
import {Kd} from "./m4092.ts";
import {ONt,XJr} from "./m3152.ts";
import {zD,lxe} from "./m3979.ts";
import {getProxyUrl,shouldBypassProxy,ey} from "../src/config/1026_shouldBypassProxyWithCidr.ts";
import {externalHttp,_k} from "../src/core/0576_isCancel.ts";
import {K3l,z3l} from "./m5184.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function Tkm(){let{SandboxManager:e}=await Promise.resolve().then(() => (Uh(),v$i));if(!e.isSandboxingEnabled())return;await e.waitForNetworkInitialization();let t=e.getProxyPort();if(!t)return;let n=e.getProxyAuthToken();return{host:"127.0.0.1",port:t,protocol:"http",...n&&{auth:{username:"srt",password:n}}}}
function Skm(){let e=getInitialSettings();return{allowedUrls:e.allowedHttpHookUrls,allowedEnvVars:e.httpHookAllowedEnvVars}}
function bkm(e){return e.replace(/[\r\n\x00]/g,"")}
function Ekm(e,t){let n=e.replace(/\$\{([A-Z_][A-Z0-9_]*)\}|\$([A-Z_][A-Z0-9_]*)/g,(r,o,s)=>{let i=o??s;if(!t.has(i))return logForDebugging(`Hooks: env var $${i} not in allowedEnvVars, skipping interpolation`,{level:"warn"}),"";return subprocessEnv()[i]??""});return bkm(n)}
async function WOo(e,t,n,r,o=Kd){let s=Skm();if(s.allowedUrls!==void 0){if(!s.allowedUrls.some((u)=>ONt(e.url,u))){let u=`HTTP hook blocked: ${e.url} does not match any pattern in allowedHttpHookUrls`;return logForDebugging(u,{level:"warn"}),{ok:!1,body:"",error:u}}}let i=e.timeout?e.timeout*1000:o,{signal:a,cleanup:l}=zD(r,{timeoutMs:i});try{let c={"Content-Type":"application/json"};if(e.headers){let f=e.allowedEnvVars??[],h=s.allowedEnvVars!==void 0?f.filter((_)=>s.allowedEnvVars.includes(_)):f,g=new Set(h);for(let[_,T]of Object.entries(e.headers))c[_]=Ekm(T,g)}let u=await Tkm(),d=!u&&getProxyUrl()!==void 0&&!shouldBypassProxy(e.url);if(u)logForDebugging(`Hooks: HTTP hook POST to ${e.url} (via sandbox proxy :${u.port})`);else if(d)logForDebugging(`Hooks: HTTP hook POST to ${e.url} (via env-var proxy)`);else logForDebugging(`Hooks: HTTP hook POST to ${e.url}`);let p=await externalHttp.post(e.url,n,{headers:c,signal:a,responseType:"text",validateStatus:()=>!0,maxRedirects:0,proxy:u??!1,lookup:u||d?void 0:K3l});l();let m=p.data??"";return logForDebugging(`Hooks: HTTP hook response status ${p.status}, body length ${m.length}`),{ok:p.status>=200&&p.status<300,statusCode:p.status,body:m}}catch(c){if(l(),a.aborted)return{ok:!1,body:"",aborted:!0};let u=Ce(c);return logForDebugging(`Hooks: HTTP hook error: ${u}`,{level:"error"}),{ok:!1,body:"",error:u}}}
var j3l=b(()=>{_k();lxe();qe();Ct();ey();br();VM();XJr();z3l()});
export {Tkm,Skm,bkm,Ekm,WOo,j3l};
