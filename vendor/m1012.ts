// @ts-nocheck
import {M,b} from "../runtime.ts";
import {ksn} from "./m992.ts";
import {r0} from "./m751.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
import {I2} from "./m600.ts";
var fromWebToken=(e)=>async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");let{roleArn:n,roleSessionName:r,webIdentityToken:o,providerId:s,policyArns:i,policy:a,durationSeconds:l}=e,{roleAssumerWithWebIdentity:c}=e;if(!c){let{getDefaultRoleAssumerWithWebIdentity:u}=await Promise.resolve().then(() => M(ksn(),1));c=u({...e.clientConfig,credentialProviderLogger:e.logger,parentClientConfig:{...t?.callerClientConfig,...e.parentClientConfig}},e.clientPlugins)}return c({RoleArn:n,RoleSessionName:r??`aws-sdk-js-session-${Date.now()}`,WebIdentityToken:o,ProviderId:s,PolicyArns:i,Policy:a,DurationSeconds:l})};
var BSs,FSs,USs,$Ss,NSs="AWS_WEB_IDENTITY_TOKEN_FILE",bhu="AWS_ROLE_ARN",Ehu="AWS_ROLE_SESSION_NAME",fromTokenFile=(e={})=>async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");let n=e?.webIdentityTokenFile??process.env[NSs],r=e?.roleArn??process.env[bhu],o=e?.roleSessionName??process.env[Ehu];if(!n||!r)throw new FSs.CredentialsProviderError("Web identity configuration not specified",{logger:e.logger});let s=await fromWebToken({...e,webIdentityToken:USs.externalDataInterceptor?.getTokenRecord?.()[n]??$Ss.readFileSync(n,{encoding:"ascii"}),roleArn:r,roleSessionName:o})(t);if(n===process.env[NSs])BSs.setCredentialFeature(s,"CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN","h");return s};
var qSs=b(()=>{BSs=M(r0(),1),FSs=M(createDefaultGlobalConfig(),1),USs=M(I2(),1),$Ss=require("fs")});
export {fromWebToken,BSs,FSs,USs,$Ss,NSs,bhu,Ehu,fromTokenFile,qSs};
