// @ts-nocheck
import {ds,bt} from "./m195.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
function acn(){getWIFPrecedenceSource.cache.clear?.(),getWIFAuthType.cache.clear?.(),RIu.cache.clear?.()}
function isWIFActive(){return getWIFPrecedenceSource()!==null}
function getWIFStatusLine(){let e=getWIFPrecedenceSource();if(e==="env-quad"){let t=process.env.ANTHROPIC_WORKSPACE_ID?.trim();return`env-quad \xB7 org ${vvr(process.env.ANTHROPIC_ORGANIZATION_ID??"")} \xB7 rule ${vvr(process.env.ANTHROPIC_FEDERATION_RULE_ID??"")}${t?` \xB7 ws ${t.startsWith("wrkspc_")?vvr(t):t}`:""}`}if(e==="profile-explicit"||e==="profile-implicit"){let t=dcn(),n=t===null?"default":e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":ucn(t);return`credentials-file \xB7 ${getWIFAuthType()??"unknown"} \xB7 profile ${n}`}return"inactive"}
function vvr(e){return e.length<=6?e:`\u2026${e.slice(-6)}`}
function ucn(e){return Rvt(V1e.join(e,"active_config"))?.trim()||"default"}
function wvr(e,t){let n=Rvt(V1e.join(e,"configs",`${t}.json`));if(n===null)return null;let r;try{r=JSON.parse(n)}catch{return null}let o=r?.authentication?.type??null;if(o==="user_oauth"){if(Rvt(DOs(e,t,r))===null)return null}return o}
function DOs(e,t,n){if(n===void 0){let r=Rvt(V1e.join(e,"configs",`${t}.json`));if(r!==null)try{n=JSON.parse(r)}catch{}}return n?.authentication?.credentials_path??V1e.join(e,"credentials",`${t}.json`)}
function dcn(){let e=process.env.ANTHROPIC_CONFIG_DIR?.trim();if(e)return e;let t=process.env.XDG_CONFIG_HOME?.trim();if(t)return V1e.join(t,"anthropic");let n=process.env.HOME?.trim();return n?V1e.join(n,".config","anthropic"):null}
function Rvt(e){try{return IOs.readFileSync(e,"utf-8")}catch(t){if(ds(t))return null;throw t}}
var IOs,V1e,wIu,getWIFPrecedenceSource,getWIFAuthType,RIu;
var Zze=b(()=>{ta();bt();IOs=require("fs"),V1e=require("path"),wIu=["ANTHROPIC_FEDERATION_RULE_ID","ANTHROPIC_ORGANIZATION_ID"],getWIFPrecedenceSource=wn(()=>{let e=dcn(),t=process.env.ANTHROPIC_PROFILE?.trim();if(t){if(e===null)return null;let n=wvr(e,t);return n==="oidc_federation"||n==="user_oauth"?"profile-explicit":null}if(wIu.every((n)=>process.env[n]?.trim()))return"env-quad";if(e!==null){let n=wvr(e,ucn(e));if(n==="oidc_federation"||n==="user_oauth")return"profile-implicit"}return null});getWIFAuthType=wn(()=>{let e=getWIFPrecedenceSource();if(e===null)return null;if(e==="env-quad")return"oidc_federation";let t=dcn();if(t===null)return null;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":ucn(t),r=wvr(t,n);return r==="oidc_federation"||r==="user_oauth"?r:null}),RIu=wn(()=>{let e=getWIFPrecedenceSource();if(e===null||e==="env-quad")return;let t=dcn();if(t===null)return;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":ucn(t),r=Rvt(DOs(t,n));if(r===null)return;try{let o=JSON.parse(r);return{organizationUuid:o.organization_uuid,organizationName:o.organization_name,accountEmail:o.account_email,workspaceName:o.workspace_name}}catch{return}})});
export {acn,isWIFActive,getWIFStatusLine,vvr,ucn,wvr,DOs,dcn,Rvt,IOs,V1e,wIu,getWIFPrecedenceSource,getWIFAuthType,RIu,Zze};
