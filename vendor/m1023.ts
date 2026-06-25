// @ts-nocheck
import {ehs} from "./m861.ts";
import {ENV_KEY,ENV_SECRET,fromEnv} from "./m757.ts";
import {nln,SRr} from "./m986.ts";
import {lvr,Gws} from "./m1022.ts";
import {Hln,evr} from "./m1013.ts";
import {mwt,svr} from "./m1018.ts";
import {Qfs,Zfs} from "./m849.ts";
import {b,x} from "../runtime.ts";
import {Psn} from "./m758.ts";
import {Vg} from "./m600.ts";
import {ZU} from "./m606.ts";
var xln,Kws,Vws=!1,defaultProvider=(e={})=>ehs([async()=>{if(e.profile??process.env[Kws.ENV_PROFILE]){if(process.env[ENV_KEY]&&process.env[ENV_SECRET]){if(!Vws)(e.logger?.warn&&e.logger?.constructor?.name!=="NoOpLogger"?e.logger.warn.bind(e.logger):console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`),Vws=!0}throw new xln.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.",{logger:e.logger,tryNextLink:!0})}return e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"),fromEnv(e)()},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");let{ssoStartUrl:n,ssoAccountId:r,ssoRegion:o,ssoRoleName:s,ssoSession:i}=e;if(!n&&!r&&!o&&!s&&!i)throw new xln.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).",{logger:e.logger});let{fromSSO:a}=await Promise.resolve().then(() => (nln(),SRr));return a(e)(t)},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");let{fromIni:n}=await Promise.resolve().then(() => (lvr(),Gws));return n(e)(t)},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");let{fromProcess:n}=await Promise.resolve().then(() => (Hln(),evr));return n(e)(t)},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");let{fromTokenFile:n}=await Promise.resolve().then(() => (mwt(),svr));return n(e)(t)},async()=>(e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"),(await Qfs(e))()),async()=>{throw new xln.CredentialsProviderError("Could not load credentials from any providers",{tryNextLink:!1,logger:e.logger})}],credentialsTreatedAsExpired),credentialsWillNeedRefresh=(e)=>e?.expiration!==void 0,credentialsTreatedAsExpired=(e)=>e?.expiration!==void 0&&e.expiration.getTime()-Date.now()<300000;
var jws=b(()=>{Psn();Zfs();xln=x(Vg(),1),Kws=x(ZU(),1)});
export {xln,Kws,Vws,defaultProvider,credentialsWillNeedRefresh,credentialsTreatedAsExpired,jws};
