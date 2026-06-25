// @ts-nocheck
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
import {pgs} from "./m860.ts";
import {Vg} from "./m600.ts";
function ehs(e,t){let n=Ymu(e),r,o,s,i=async(a)=>{if(a?.forceRefresh)return await n(a);if(s?.expiration){if(s?.expiration?.getTime()<Date.now())s=void 0}if(r)await r;else if(!s||t?.(s))if(s){if(!o)o=n(a).then((l)=>{s=l,o=void 0})}else return r=n(a).then((l)=>{s=l,r=void 0}),i(a);return s};return i}
var Ymu=(e)=>async(t)=>{let n;for(let r of e)try{return await r(t)}catch(o){if(n=o,o?.tryNextLink)continue;throw o}throw n};
var isSsoProfile=(e)=>e&&(typeof e.sso_start_url==="string"||typeof e.sso_account_id==="string"||typeof e.sso_session==="string"||typeof e.sso_region==="string"||typeof e.sso_role_name==="string");
var mgs,fgs,uCr,Uin=({logger:e,signingName:t}={})=>async()=>{if(e?.debug?.("@aws-sdk/token-providers - fromEnvSigningName"),!t)throw new uCr.TokenProviderError("Please pass 'signingName' to compute environment variable key",{logger:e});let n=fgs.getBearerTokenEnvKey(t);if(!(n in process.env))throw new uCr.TokenProviderError(`Token not present in '${n}' environment variable`,{logger:e});let r={token:process.env[n]};return mgs.setTokenFeature(r,"BEARER_SERVICE_ENV_VARS","3"),r};
var hgs=b(()=>{mgs=x(b0(),1),fgs=x(pgs(),1),uCr=x(Vg(),1)});
export {ehs,Ymu,isSsoProfile,mgs,fgs,uCr,Uin,hgs};
