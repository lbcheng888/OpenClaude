// @ts-nocheck
import {ics} from "./m856.ts";
import {ENV_KEY,ENV_SECRET,fromEnv} from "./m752.ts";
import {ysn,GTr} from "./m981.ts";
import {PSr,JSs} from "./m1017.ts";
import {Vsn,vSr} from "./m1008.ts";
import {UCt,HSr} from "./m1013.ts";
import {ocs,scs} from "./m844.ts";
import {b,M} from "../runtime.ts";
import {Jnn} from "./m753.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
import {I2} from "./m600.ts";
var zsn,QSs,XSs=!1,defaultProvider=(e={})=>ics([async()=>{if(e.profile??process.env[QSs.ENV_PROFILE]){if(process.env[ENV_KEY]&&process.env[ENV_SECRET]){if(!XSs)(e.logger?.warn&&e.logger?.constructor?.name!=="NoOpLogger"?e.logger.warn.bind(e.logger):console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`),XSs=!0}throw new zsn.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.",{logger:e.logger,tryNextLink:!0})}return e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"),fromEnv(e)()},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");let{ssoStartUrl:n,ssoAccountId:r,ssoRegion:o,ssoRoleName:s,ssoSession:i}=e;if(!n&&!r&&!o&&!s&&!i)throw new zsn.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).",{logger:e.logger});let{fromSSO:a}=await Promise.resolve().then(() => (ysn(),GTr));return a(e)(t)},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");let{fromIni:n}=await Promise.resolve().then(() => (PSr(),JSs));return n(e)(t)},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");let{fromProcess:n}=await Promise.resolve().then(() => (Vsn(),vSr));return n(e)(t)},async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");let{fromTokenFile:n}=await Promise.resolve().then(() => (UCt(),HSr));return n(e)(t)},async()=>(e.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"),(await ocs(e))()),async()=>{throw new zsn.CredentialsProviderError("Could not load credentials from any providers",{tryNextLink:!1,logger:e.logger})}],credentialsTreatedAsExpired),credentialsWillNeedRefresh=(e)=>e?.expiration!==void 0,credentialsTreatedAsExpired=(e)=>e?.expiration!==void 0&&e.expiration.getTime()-Date.now()<300000;
var ebs=b(()=>{Jnn();scs();zsn=M(createDefaultGlobalConfig(),1),QSs=M(I2(),1)});
export {zsn,QSs,XSs,defaultProvider,credentialsWillNeedRefresh,credentialsTreatedAsExpired,ebs};
