// @ts-nocheck
import {x,b} from "../runtime.ts";
import {pln} from "./m997.ts";
import {b0} from "./m756.ts";
import {Vg} from "./m600.ts";
import {ZU} from "./m606.ts";
var fromWebToken=(e)=>async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");let{roleArn:n,roleSessionName:r,webIdentityToken:o,providerId:s,policyArns:i,policy:a,durationSeconds:l}=e,{roleAssumerWithWebIdentity:c}=e;if(!c){let{getDefaultRoleAssumerWithWebIdentity:u}=await Promise.resolve().then(() => x(pln(),1));c=u({...e.clientConfig,credentialProviderLogger:e.logger,parentClientConfig:{...t?.callerClientConfig,...e.parentClientConfig}},e.clientPlugins)}return c({RoleArn:n,RoleSessionName:r??`aws-sdk-js-session-${Date.now()}`,WebIdentityToken:o,ProviderId:s,PolicyArns:i,Policy:a,DurationSeconds:l})};
var Dws,Pws,Ows,Lws,xws="AWS_WEB_IDENTITY_TOKEN_FILE",Fvu="AWS_ROLE_ARN",Bvu="AWS_ROLE_SESSION_NAME",fromTokenFile=(e={})=>async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");let n=e?.webIdentityTokenFile??process.env[xws],r=e?.roleArn??process.env[Fvu],o=e?.roleSessionName??process.env[Bvu];if(!n||!r)throw new Pws.CredentialsProviderError("Web identity configuration not specified",{logger:e.logger});let s=await fromWebToken({...e,webIdentityToken:Ows.externalDataInterceptor?.getTokenRecord?.()[n]??Lws.readFileSync(n,{encoding:"ascii"}),roleArn:r,roleSessionName:o})(t);if(n===process.env[xws])Dws.setCredentialFeature(s,"CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN","h");return s};
var Mws=b(()=>{Dws=x(b0(),1),Pws=x(Vg(),1),Ows=x(ZU(),1),Lws=require("fs")});
export {fromWebToken,Dws,Pws,Ows,Lws,xws,Fvu,Bvu,fromTokenFile,Mws};
