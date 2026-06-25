// @ts-nocheck
import {nln,SRr} from "./m986.ts";
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
var tvr,vws=async(e,t,n={})=>{let{fromSSO:r}=await Promise.resolve().then(() => (nln(),SRr));return r({profile:e,logger:n.logger,parentClientConfig:n.parentClientConfig,clientConfig:n.clientConfig})().then((o)=>{if(t.sso_session)return tvr.setCredentialFeature(o,"CREDENTIALS_PROFILE_SSO","r");else return tvr.setCredentialFeature(o,"CREDENTIALS_PROFILE_SSO_LEGACY","t")})},wws=(e)=>e&&(typeof e.sso_start_url==="string"||typeof e.sso_account_id==="string"||typeof e.sso_session==="string"||typeof e.sso_region==="string"||typeof e.sso_role_name==="string");
var kws=b(()=>{tvr=x(b0(),1)});
export {tvr,vws,wws,kws};
