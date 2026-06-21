// @ts-nocheck
import {ysn,GTr} from "./m981.ts";
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
var wSr,DSs=async(e,t,n={})=>{let{fromSSO:r}=await Promise.resolve().then(() => (ysn(),GTr));return r({profile:e,logger:n.logger,parentClientConfig:n.parentClientConfig,clientConfig:n.clientConfig})().then((o)=>{if(t.sso_session)return wSr.setCredentialFeature(o,"CREDENTIALS_PROFILE_SSO","r");else return wSr.setCredentialFeature(o,"CREDENTIALS_PROFILE_SSO_LEGACY","t")})},PSs=(e)=>e&&(typeof e.sso_start_url==="string"||typeof e.sso_account_id==="string"||typeof e.sso_session==="string"||typeof e.sso_region==="string"||typeof e.sso_role_name==="string");
var OSs=b(()=>{wSr=M(r0(),1)});
export {wSr,DSs,PSs,OSs};
