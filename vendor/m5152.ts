// @ts-nocheck
import {Ag,qMi} from "./m2671.ts";
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {subprocessEnv,P1} from "../src/agent/2223_subprocessEnv.ts";
import {Ep} from "./m4028.ts";
import {iMt,h7r} from "./m3142.ts";
import {xP,QHe} from "./m3908.ts";
import {getProxyUrl,O7,Z_} from "../src/config/1021_shouldBypassProxyWithCidr.ts";
import {externalHttp,ek} from "../src/core/0570_isCancel.ts";
import {l1l,c1l} from "./m5151.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function J_m(){let{SandboxManager:e}=await Promise.resolve().then(() => (Ag(),qMi));if(!e.isSandboxingEnabled())return;await e.waitForNetworkInitialization();let t=e.getProxyPort();if(!t)return;return{host:"127.0.0.1",port:t,protocol:"http"}}
function X_m(){let e=getInitialSettings();return{allowedUrls:e.allowedHttpHookUrls,allowedEnvVars:e.httpHookAllowedEnvVars}}
function Q_m(e){return e.replace(/[\r\n\x00]/g,"")}
function Z_m(e,t){let n=e.replace(/\$\{([A-Z_][A-Z0-9_]*)\}|\$([A-Z_][A-Z0-9_]*)/g,(r,o,s)=>{let i=o??s;if(!t.has(i))return logForDebugging(`Hooks: env var $${i} not in allowedEnvVars, skipping interpolation`,{level:"warn"}),"";return subprocessEnv()[i]??""});return Q_m(n)}
async function kHo(e,t,n,r,o=Ep){let s=X_m();if(s.allowedUrls!==void 0){if(!s.allowedUrls.some((u)=>iMt(e.url,u))){let u=`HTTP hook blocked: ${e.url} does not match any pattern in allowedHttpHookUrls`;return logForDebugging(u,{level:"warn"}),{ok:!1,body:"",error:u}}}let i=e.timeout?e.timeout*1000:o,{signal:a,cleanup:l}=xP(r,{timeoutMs:i});try{let c={"Content-Type":"application/json"};if(e.headers){let f=e.allowedEnvVars??[],A=s.allowedEnvVars!==void 0?f.filter((g)=>s.allowedEnvVars.includes(g)):f,h=new Set(A);for(let[g,_]of Object.entries(e.headers))c[g]=Z_m(_,h)}let u=await J_m(),d=!u&&getProxyUrl()!==void 0&&!O7(e.url);if(u)logForDebugging(`Hooks: HTTP hook POST to ${e.url} (via sandbox proxy :${u.port})`);else if(d)logForDebugging(`Hooks: HTTP hook POST to ${e.url} (via env-var proxy)`);else logForDebugging(`Hooks: HTTP hook POST to ${e.url}`);let p=await externalHttp.post(e.url,n,{headers:c,signal:a,responseType:"text",validateStatus:()=>!0,maxRedirects:0,proxy:u??!1,lookup:u||d?void 0:l1l});l();let m=p.data??"";return logForDebugging(`Hooks: HTTP hook response status ${p.status}, body length ${m.length}`),{ok:p.status>=200&&p.status<300,statusCode:p.status,body:m}}catch(c){if(l(),a.aborted)return{ok:!1,body:"",aborted:!0};let u=Se(c);return logForDebugging(`Hooks: HTTP hook error: ${u}`,{level:"error"}),{ok:!1,body:"",error:u}}}
var u1l=b(()=>{ek();QHe();qe();bt();Z_();yr();P1();h7r();c1l()});
export {J_m,X_m,Q_m,Z_m,kHo,u1l};
