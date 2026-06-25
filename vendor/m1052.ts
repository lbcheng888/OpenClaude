// @ts-nocheck
import {b,x} from "../runtime.ts";
import {iC} from "./m885.ts";
import {Zu} from "./m855.ts";
import {qN} from "./m610.ts";
function owu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"bedrock",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function swu(e){return{schemeId:"smithy.api#httpBearerAuth",propertiesExtractor:({profile:t,filepath:n,configFilepath:r,ignoreCache:o},s)=>({identityProperties:{profile:t,filepath:n,configFilepath:r,ignoreCache:o}})}}
var WHs,uJe,_wt,GHs=async(e,t,n)=>({operation:_wt.getSmithyContext(t).operation,region:await _wt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),VHs=(e)=>{let t=[];switch(e.operation){default:t.push(owu(e)),t.push(swu(e))}return t},KHs=(e)=>{let t=uJe.memoizeIdentityProvider(e.token,uJe.isIdentityExpired,uJe.doesIdentityRequireRefresh),n=WHs.resolveAwsSdkSigV4Config(e);return Object.assign(n,{authSchemePreference:_wt.normalizeProvider(e.authSchemePreference??[]),token:t})};
var kvr=b(()=>{WHs=x(iC(),1),uJe=x(Zu(),1),_wt=x(qN(),1)});
export {owu,swu,WHs,uJe,_wt,GHs,VHs,KHs,kvr};
