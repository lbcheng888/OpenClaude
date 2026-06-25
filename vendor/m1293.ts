// @ts-nocheck
import {Jo,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
function Vdn(){getWIFPrecedenceSource.cache.clear?.(),getWIFAuthType.cache.clear?.(),GBu.cache.clear?.()}
function isWIFActive(){return getWIFPrecedenceSource()!==null}
function getWIFStatusLine(){let e=getWIFPrecedenceSource();if(e==="env-quad"){let t=process.env.ANTHROPIC_WORKSPACE_ID?.trim();return`env-quad \xB7 org ${eIr(process.env.ANTHROPIC_ORGANIZATION_ID??"")} \xB7 rule ${eIr(process.env.ANTHROPIC_FEDERATION_RULE_ID??"")}${t?` \xB7 ws ${t.startsWith("wrkspc_")?eIr(t):t}`:""}`}if(e==="profile-explicit"||e==="profile-implicit"){let t=Ydn(),n=t===null?"default":e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":jdn(t);return`credentials-file \xB7 ${getWIFAuthType()??"unknown"} \xB7 profile ${n}`}return"inactive"}
function eIr(e){return e.length<=6?e:`\u2026${e.slice(-6)}`}
function jdn(e){return Zwt(UNe.join(e,"active_config"))?.trim()||"default"}
function tIr(e,t){let n=Zwt(UNe.join(e,"configs",`${t}.json`));if(n===null)return null;let r;try{r=JSON.parse(n)}catch{return null}let o=r?.authentication?.type??null;if(o==="user_oauth"){if(Zwt(wBs(e,t,r))===null)return null}return o}
function wBs(e,t,n){if(n===void 0){let r=Zwt(UNe.join(e,"configs",`${t}.json`));if(r!==null)try{n=JSON.parse(r)}catch{}}return n?.authentication?.credentials_path??UNe.join(e,"credentials",`${t}.json`)}
function Ydn(){let e=process.env.ANTHROPIC_CONFIG_DIR?.trim();if(e)return e;let t=process.env.XDG_CONFIG_HOME?.trim();if(t)return UNe.join(t,"anthropic");let n=process.env.HOME?.trim();return n?UNe.join(n,".config","anthropic"):null}
function Zwt(e){try{return vBs.readFileSync(e,"utf-8")}catch(t){if(Jo(t))return null;throw t}}
var vBs,UNe,WBu,getWIFPrecedenceSource,getWIFAuthType,GBu;
var JJe=b(()=>{Wi();Ct();vBs=require("fs"),UNe=require("path"),WBu=["ANTHROPIC_FEDERATION_RULE_ID","ANTHROPIC_ORGANIZATION_ID"],getWIFPrecedenceSource=Hn(()=>{let e=Ydn(),t=process.env.ANTHROPIC_PROFILE?.trim();if(t){if(e===null)return null;let n=tIr(e,t);return n==="oidc_federation"||n==="user_oauth"?"profile-explicit":null}if(WBu.every((n)=>process.env[n]?.trim()))return"env-quad";if(e!==null){let n=tIr(e,jdn(e));if(n==="oidc_federation"||n==="user_oauth")return"profile-implicit"}return null});getWIFAuthType=Hn(()=>{let e=getWIFPrecedenceSource();if(e===null)return null;if(e==="env-quad")return"oidc_federation";let t=Ydn();if(t===null)return null;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":jdn(t),r=tIr(t,n);return r==="oidc_federation"||r==="user_oauth"?r:null}),GBu=Hn(()=>{let e=getWIFPrecedenceSource();if(e===null||e==="env-quad")return;let t=Ydn();if(t===null)return;let n=e==="profile-explicit"?process.env.ANTHROPIC_PROFILE?.trim()??"default":jdn(t),r=Zwt(wBs(t,n));if(r===null)return;try{let o=JSON.parse(r);return{organizationUuid:o.organization_uuid,organizationName:o.organization_name,accountEmail:o.account_email,workspaceName:o.workspace_name}}catch{return}})});
export {Vdn,isWIFActive,getWIFStatusLine,eIr,jdn,tIr,wBs,Ydn,Zwt,vBs,UNe,WBu,getWIFPrecedenceSource,getWIFAuthType,GBu,JJe};
