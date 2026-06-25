// @ts-nocheck
import {b,x} from "../runtime.ts";
import {iC} from "./m885.ts";
import {Zu} from "./m855.ts";
import {qN} from "./m610.ts";
function KMu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"bedrock",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function zMu(e){return{schemeId:"smithy.api#httpBearerAuth",propertiesExtractor:({profile:t,filepath:n,configFilepath:r,ignoreCache:o},s)=>({identityProperties:{profile:t,filepath:n,configFilepath:r,ignoreCache:o}})}}
var W1s,LJe,Nwt,G1s=async(e,t,n)=>({operation:Nwt.getSmithyContext(t).operation,region:await Nwt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),V1s=(e)=>{let t=[];switch(e.operation){default:t.push(KMu(e)),t.push(zMu(e))}return t},K1s=(e)=>{let t=LJe.memoizeIdentityProvider(e.token,LJe.isIdentityExpired,LJe.doesIdentityRequireRefresh),n=W1s.resolveAwsSdkSigV4Config(e);return Object.assign(n,{authSchemePreference:Nwt.normalizeProvider(e.authSchemePreference??[]),token:t})};
var Zkr=b(()=>{W1s=x(iC(),1),LJe=x(Zu(),1),Nwt=x(qN(),1)});
export {KMu,zMu,W1s,LJe,Nwt,G1s,V1s,K1s,Zkr};
