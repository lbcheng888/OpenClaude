// @ts-nocheck
import {sRr,oRr} from "./m1422.ts";
import {Wcn} from "./m1352.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
function bun(e){return async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");let{GetCredentialsForIdentityCommand:n,CognitoIdentityClient:r}=await Promise.resolve().then(() => (sRr(),oRr)),o=(c)=>e.clientConfig?.[c]??e.parentClientConfig?.[c]??t?.callerClientConfig?.[c],{Credentials:{AccessKeyId:s=TPu(e.logger),Expiration:i,SecretKey:a=bPu(e.logger),SessionToken:l}=SPu(e.logger)}=await(e.client??new r(Object.assign({},e.clientConfig??{},{region:o("region"),profile:o("profile"),userAgentAppId:o("userAgentAppId")}))).send(new n({CustomRoleArn:e.customRoleArn,IdentityId:e.identityId,Logins:e.logins?await Wcn(e.logins):void 0}));return{identityId:e.identityId,accessKeyId:s,secretAccessKey:a,sessionToken:l,expiration:i}}}
function TPu(e){throw new Sun.CredentialsProviderError("Response from Amazon Cognito contained no access key ID",{logger:e})}
function SPu(e){throw new Sun.CredentialsProviderError("Response from Amazon Cognito contained no credentials",{logger:e})}
function bPu(e){throw new Sun.CredentialsProviderError("Response from Amazon Cognito contained no secret key",{logger:e})}
var Sun;
var iRr=b(()=>{Sun=M(createDefaultGlobalConfig(),1)});
export {bun,TPu,SPu,bPu,Sun,iRr};
