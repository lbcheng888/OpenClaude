// @ts-nocheck
import {v6s,w6s} from "./m1429.ts";
import {O0r,P0r} from "./m1427.ts";
import {kpn} from "./m1357.ts";
import {imn,L0r} from "./m1428.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
function H6s({accountId:e,cache:t=v6s(),client:n,clientConfig:r,customRoleArn:o,identityPoolId:s,logins:i,userIdentifier:a=!i||Object.keys(i).length===0?"ANONYMOUS":void 0,logger:l,parentClientConfig:c}){l?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");let u=a?`aws:cognito-identity-credentials:${s}:${a}`:void 0,d=async(p)=>{let{GetIdCommand:m,CognitoIdentityClient:f}=await Promise.resolve().then(() => (O0r(),P0r)),h=(T)=>r?.[T]??c?.[T]??p?.callerClientConfig?.[T],g=n??new f(Object.assign({},r??{},{region:h("region"),profile:h("profile"),userAgentAppId:h("userAgentAppId")})),_=u&&await t.getItem(u);if(!_){let{IdentityId:T=$$u(l)}=await g.send(new m({AccountId:e,IdentityPoolId:s,Logins:i?await kpn(i):void 0}));if(_=T,u)Promise.resolve(t.setItem(u,_)).catch(()=>{})}return d=imn({client:g,customRoleArn:o,logins:i,identityId:_}),d(p)};return(p)=>d(p).catch(async(m)=>{if(u)Promise.resolve(t.removeItem(u)).catch(()=>{});throw m})}
function $$u(e){throw new k6s.CredentialsProviderError("Response from Amazon Cognito contained no identity ID",{logger:e})}
var k6s;
var I6s=b(()=>{L0r();w6s();k6s=x(Vg(),1)});
export {H6s,$$u,k6s,I6s};
