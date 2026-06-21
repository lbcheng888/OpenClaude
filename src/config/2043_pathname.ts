// @ts-nocheck
import {st} from "../../vendor/m5.ts";
import {getInitialSettings,yr} from "./0740_updateSettingsForSource.ts";
import {dc,U8} from "../../vendor/m1480.ts";
import {on,Rn} from "../session/0615_length.ts";
import {Se,_o,bt} from "../../vendor/m195.ts";
import {getProxyFetchOptions,Z_} from "./1021_shouldBypassProxyWithCidr.ts";
import {fhn,Ukt} from "../../vendor/m2036.ts";
import {qt,Xt} from "./0228_encoding.ts";
import {Pse,bMr} from "../../vendor/m2040.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {Ul,ln} from "../telemetry/0594_feature_name.ts";
import {khn,qkt,vMr} from "../../vendor/m2041.ts";
import {gMr,Hni,rve} from "../../vendor/m2038.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {b} from "../../runtime.ts";
import {sn} from "./0047_namespace.ts";
function Ose(){return st(process.env.CLAUDE_CODE_ENABLE_XAA)}
function Lse(){return getInitialSettings().xaaIdp}
function hfe(e){try{let t=new URL(e);return t.pathname=t.pathname.replace(/\/+$/,""),t.host=t.host.toLowerCase(),t.toString()}catch{return e.replace(/\/+$/,"")}}
async function JBe(e){let r=(await dc().readAsync())?.mcpXaaIdp?.[hfe(e)];if(!r)return;if(r.expiresAt-Date.now()<=hVu*1000)return;return r.idToken}
async function Bni(e,t,n){await dc().mutate((r)=>({...r,mcpXaaIdp:{...r.mcpXaaIdp,[hfe(e)]:{idToken:t,expiresAt:n}}}))}
async function Fni(e,t){let n=$ni(t),r=n?n*1000:Date.now()+3600000;return await Bni(e,t,r),r}
async function ove(e){let t=hfe(e);try{await dc().mutate((n)=>{if(!n.mcpXaaIdp?.[t])return n;let r={...n.mcpXaaIdp};return delete r[t],{...n,mcpXaaIdp:r}})}catch(n){on("xaa",`clearIdpIdToken(${t}) failed: ${Se(n)}`)}}
async function Uni(e,t){try{return await dc().mutate((n)=>({...n,mcpXaaIdpConfig:{...n.mcpXaaIdpConfig,[hfe(e)]:{clientSecret:t}}}))}catch(n){return{success:!1,warning:Se(n)}}}
async function xXe(e){return(await dc().readAsync())?.mcpXaaIdpConfig?.[hfe(e)]?.clientSecret}
async function Hhn(e){let t=hfe(e);try{await dc().mutate((n)=>{if(!n.mcpXaaIdpConfig?.[t])return n;let r={...n.mcpXaaIdpConfig};return delete r[t],{...n,mcpXaaIdpConfig:r}})}catch(n){on("xaa",`clearIdpClientSecret(${t}) failed: ${Se(n)}`)}}
async function Ihn(e){let t=e.endsWith("/")?e:e+"/",n=new URL(".well-known/openid-configuration",t),r=await fetch(n,{...getProxyFetchOptions({url:String(n)}),headers:{Accept:"application/json"},signal:AbortSignal.timeout(Nni)});if(!r.ok)throw Error(`XAA IdP: OIDC discovery failed: HTTP ${r.status} at ${n}`);let o;try{o=await r.json()}catch{throw Error(`XAA IdP: OIDC discovery returned non-JSON at ${n} (captive portal or proxy?)`)}let s=fhn.safeParse(o);if(!s.success)throw Error(`XAA IdP: invalid OIDC metadata: ${s.error.message}`);if(new URL(s.data.token_endpoint).protocol!=="https:")throw Error(`XAA IdP: refusing non-HTTPS token endpoint: ${s.data.token_endpoint}`);return s.data}
function $ni(e){let t=e.split(".");if(t.length!==3)return;try{let n=qt(Buffer.from(t[1],"base64url").toString("utf-8"));return typeof n.exp==="number"?n.exp:void 0}catch{return}}
function gVu(e,t,n,r){let o=null,s=null,i=null,a=()=>{if(o?.removeAllListeners(),o?.on("error",()=>{}),o?.close(),o=null,s)clearTimeout(s),s=null;if(n&&i)n.removeEventListener("abort",i),i=null};return new Promise((l,c)=>{let u=!1,d=(m)=>{if(u)return;u=!0,a(),l(m)},p=(m)=>{if(u)return;u=!0,a(),c(m)};if(n){if(i=()=>p(Error("XAA IdP: login cancelled")),n.aborted){i();return}n.addEventListener("abort",i,{once:!0})}o=Lni.createServer((m,f)=>{let A=Mni.parse(m.url||"",!0);if(A.pathname!=="/callback"){f.writeHead(404),f.end();return}let h=A.query.code,g=A.query.state,_=A.query.error;if(_){let y=A.query.error_description;f.writeHead(400,{"Content-Type":"text/html"}),f.end(Pse({ok:!1,heading:"Sign-in failed",message:"Close this tab and try again from Claude Code.",detail:`${_}: ${y??""}`})),p(Error(`XAA IdP: ${_}${y?` \u2014 ${y}`:""}`));return}if(g!==t){f.writeHead(400,{"Content-Type":"text/html"}),f.end(Pse({ok:!1,heading:"Sign-in failed",message:"State mismatch. Close this tab and try again."})),p(Error("XAA IdP: state mismatch (possible CSRF)"));return}if(!h){f.writeHead(400,{"Content-Type":"text/html"}),f.end(Pse({ok:!1,heading:"Sign-in failed",message:"No authorization code received. Close this tab and try again."})),p(Error("XAA IdP: callback missing code"));return}f.writeHead(200,{"Content-Type":"text/html"}),f.end(Pse({ok:!0,heading:"Sign-in complete",message:"You can close this tab and return to Claude Code."})),d(h)}),o.on("error",(m)=>{if(m.code==="EADDRINUSE"){let f=zt()==="windows"?`netstat -ano | findstr :${e}`:`lsof -ti:${e} -sTCP:LISTEN`;p(Error(`XAA IdP: callback port ${e} is already in use. Run \`${f}\` to find the holder.`))}else p(Error(`XAA IdP: callback server failed: ${m.message}`))}),o.listen(e,"127.0.0.1",()=>{try{r()}catch(m){p(_o(m))}}),o.unref(),s=setTimeout((m)=>m(Error("XAA IdP: login timed out")),AVu,p),s.unref()})}
async function Dhn(e){return Ul("mcp_xaa_idp_login",async()=>{let{idpIssuer:t,idpClientId:n}=e,r=await JBe(t);if(r)return on("xaa",`Using cached id_token for ${t}`),r;on("xaa",`No cached id_token for ${t}; starting OIDC login`);let o=await Ihn(t),s=e.callbackPort??await khn(),i=qkt(s),a=Oni.randomBytes(32).toString("base64url"),l={client_id:n,...e.idpClientSecret&&{client_secret:e.idpClientSecret}},{authorizationUrl:c,codeVerifier:u}=await gMr(t,{metadata:o,clientInformation:l,redirectUrl:i,scope:"openid",state:a}),d=await gVu(s,a,e.abortSignal,()=>{if(e.onAuthorizationUrl(c.toString()),!e.skipBrowserOpen)on("xaa","Opening browser to IdP authorization endpoint"),Oc(c.toString())}),p=await Hni(t,{metadata:o,clientInformation:l,authorizationCode:d,codeVerifier:u,redirectUri:i,fetchFn:(A,h)=>fetch(A,{...h,...getProxyFetchOptions({url:String(A)}),signal:AbortSignal.timeout(Nni)})});if(!p.id_token)throw Error("XAA IdP: token response missing id_token (check scope=openid)");let m=$ni(p.id_token),f=m?m*1000:Date.now()+(p.expires_in??3600)*1000;try{await Bni(t,p.id_token,f),on("xaa",`Cached id_token for ${t} (expires ${new Date(f).toISOString()})`)}catch(A){on("xaa",`id_token cache write failed: ${Se(A)}`)}return p.id_token})}
var Oni,Lni,Mni,AVu=300000,Nni=30000,hVu=60;
var kXe=b(()=>{rve();Ukt();b_();sn();bt();Rn();qs();Z_();U8();yr();Xt();ln();bMr();vMr();Oni=require("crypto"),Lni=require("http"),Mni=require("url")});
export {Ose,Lse,hfe,JBe,Bni,Fni,ove,Uni,xXe,Hhn,Ihn,$ni,gVu,Dhn,Oni,Lni,Mni,AVu,Nni,hVu,kXe};
