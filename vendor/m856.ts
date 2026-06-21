// @ts-nocheck
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
import {_us} from "./m855.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
function ics(e,t){let n=Pru(e),r,o,s,i=async(a)=>{if(a?.forceRefresh)return await n(a);if(s?.expiration){if(s?.expiration?.getTime()<Date.now())s=void 0}if(r)await r;else if(!s||t?.(s))if(s){if(!o)o=n(a).then((l)=>{s=l,o=void 0})}else return r=n(a).then((l)=>{s=l,r=void 0}),i(a);return s};return i}
var Pru=(e)=>async(t)=>{let n;for(let r of e)try{return await r(t)}catch(o){if(n=o,o?.tryNextLink)continue;throw o}throw n};
var isSsoProfile=(e)=>e&&(typeof e.sso_start_url==="string"||typeof e.sso_account_id==="string"||typeof e.sso_session==="string"||typeof e.sso_region==="string"||typeof e.sso_role_name==="string");
var yus,Tus,L_r,ron=({logger:e,signingName:t}={})=>async()=>{if(e?.debug?.("@aws-sdk/token-providers - fromEnvSigningName"),!t)throw new L_r.TokenProviderError("Please pass 'signingName' to compute environment variable key",{logger:e});let n=Tus.getBearerTokenEnvKey(t);if(!(n in process.env))throw new L_r.TokenProviderError(`Token not present in '${n}' environment variable`,{logger:e});let r={token:process.env[n]};return yus.setTokenFeature(r,"BEARER_SERVICE_ENV_VARS","3"),r};
var Sus=b(()=>{yus=M(r0(),1),Tus=M(_us(),1),L_r=M(createDefaultGlobalConfig(),1)});
export {ics,Pru,isSsoProfile,yus,Tus,L_r,ron,Sus};
