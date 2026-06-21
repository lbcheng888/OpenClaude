// @ts-nocheck
import {M,b} from "../runtime.ts";
import {STr} from "./m918.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var bus=300000,IKe="To refresh this SSO session run 'aws sso login' with the corresponding profile.";
var pAs=async(e,t={})=>{let{SSOOIDCClient:n}=await Promise.resolve().then(() => M(STr(),1)),r=(s)=>t.clientConfig?.[s]??t.parentClientConfig?.[s];return new n(Object.assign({},t.clientConfig??{},{region:e??t.clientConfig?.region,logger:r("logger"),userAgentAppId:r("userAgentAppId")}))};
var mAs=async(e,t,n={})=>{let{CreateTokenCommand:r}=await Promise.resolve().then(() => M(STr(),1));return(await pAs(t,n)).send(new r({clientId:e.clientId,clientSecret:e.clientSecret,refreshToken:e.refreshToken,grantType:"refresh_token"}))};
var fAs=()=>{};
var AAs,bTr=(e)=>{if(e.expiration&&e.expiration.getTime()<Date.now())throw new AAs.TokenProviderError(`Token is expired. ${IKe}`,!1)};
var hAs=b(()=>{AAs=M(createDefaultGlobalConfig(),1)});
export {bus,IKe,pAs,mAs,fAs,AAs,bTr,hAs};
