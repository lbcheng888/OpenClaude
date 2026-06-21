// @ts-nocheck
import {I2s,D2s} from "./m1424.ts";
import {sRr,oRr} from "./m1422.ts";
import {Wcn} from "./m1352.ts";
import {bun,iRr} from "./m1423.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
function O2s({accountId:e,cache:t=I2s(),client:n,clientConfig:r,customRoleArn:o,identityPoolId:s,logins:i,userIdentifier:a=!i||Object.keys(i).length===0?"ANONYMOUS":void 0,logger:l,parentClientConfig:c}){l?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");let u=a?`aws:cognito-identity-credentials:${s}:${a}`:void 0,d=async(p)=>{let{GetIdCommand:m,CognitoIdentityClient:f}=await Promise.resolve().then(() => (sRr(),oRr)),A=(_)=>r?.[_]??c?.[_]??p?.callerClientConfig?.[_],h=n??new f(Object.assign({},r??{},{region:A("region"),profile:A("profile"),userAgentAppId:A("userAgentAppId")})),g=u&&await t.getItem(u);if(!g){let{IdentityId:_=CPu(l)}=await h.send(new m({AccountId:e,IdentityPoolId:s,Logins:i?await Wcn(i):void 0}));if(g=_,u)Promise.resolve(t.setItem(u,g)).catch(()=>{})}return d=bun({client:h,customRoleArn:o,logins:i,identityId:g}),d(p)};return(p)=>d(p).catch(async(m)=>{if(u)Promise.resolve(t.removeItem(u)).catch(()=>{});throw m})}
function CPu(e){throw new P2s.CredentialsProviderError("Response from Amazon Cognito contained no identity ID",{logger:e})}
var P2s;
var L2s=b(()=>{iRr();D2s();P2s=M(createDefaultGlobalConfig(),1)});
export {O2s,CPu,P2s,L2s};
