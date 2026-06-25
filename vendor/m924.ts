// @ts-nocheck
import {x,b} from "../runtime.ts";
import {JAr} from "./m923.ts";
import {Vg} from "./m600.ts";
var ggs=300000,HYe="To refresh this SSO session run 'aws sso login' with the corresponding profile.";
var ibs=async(e,t={})=>{let{SSOOIDCClient:n}=await Promise.resolve().then(() => x(JAr(),1)),r=(s)=>t.clientConfig?.[s]??t.parentClientConfig?.[s];return new n(Object.assign({},t.clientConfig??{},{region:e??t.clientConfig?.region,logger:r("logger"),userAgentAppId:r("userAgentAppId")}))};
var abs=async(e,t,n={})=>{let{CreateTokenCommand:r}=await Promise.resolve().then(() => x(JAr(),1));return(await ibs(t,n)).send(new r({clientId:e.clientId,clientSecret:e.clientSecret,refreshToken:e.refreshToken,grantType:"refresh_token"}))};
var lbs=()=>{};
var cbs,XAr=(e)=>{if(e.expiration&&e.expiration.getTime()<Date.now())throw new cbs.TokenProviderError(`Token is expired. ${HYe}`,!1)};
var ubs=b(()=>{cbs=x(Vg(),1)});
export {ggs,HYe,ibs,abs,lbs,cbs,XAr,ubs};
