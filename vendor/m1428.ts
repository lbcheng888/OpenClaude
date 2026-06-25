// @ts-nocheck
import {O0r,P0r} from "./m1427.ts";
import {kpn} from "./m1357.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
function imn(e){return async(t)=>{e.logger?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");let{GetCredentialsForIdentityCommand:n,CognitoIdentityClient:r}=await Promise.resolve().then(() => (O0r(),P0r)),o=(c)=>e.clientConfig?.[c]??e.parentClientConfig?.[c]??t?.callerClientConfig?.[c],{Credentials:{AccessKeyId:s=N$u(e.logger),Expiration:i,SecretKey:a=B$u(e.logger),SessionToken:l}=F$u(e.logger)}=await(e.client??new r(Object.assign({},e.clientConfig??{},{region:o("region"),profile:o("profile"),userAgentAppId:o("userAgentAppId")}))).send(new n({CustomRoleArn:e.customRoleArn,IdentityId:e.identityId,Logins:e.logins?await kpn(e.logins):void 0}));return{identityId:e.identityId,accessKeyId:s,secretAccessKey:a,sessionToken:l,expiration:i}}}
function N$u(e){throw new smn.CredentialsProviderError("Response from Amazon Cognito contained no access key ID",{logger:e})}
function F$u(e){throw new smn.CredentialsProviderError("Response from Amazon Cognito contained no credentials",{logger:e})}
function B$u(e){throw new smn.CredentialsProviderError("Response from Amazon Cognito contained no secret key",{logger:e})}
var smn;
var L0r=b(()=>{smn=x(Vg(),1)});
export {imn,N$u,F$u,B$u,smn,L0r};
