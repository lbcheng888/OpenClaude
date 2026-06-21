// @ts-nocheck
import {b,M} from "../runtime.ts";
import {nC} from "./m880.ts";
import {Sd} from "./m850.ts";
import {TB} from "./m604.ts";
function qhu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"bedrock",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function jhu(e){return{schemeId:"smithy.api#httpBearerAuth",propertiesExtractor:({profile:t,filepath:n,configFilepath:r,ignoreCache:o},s)=>({identityProperties:{profile:t,filepath:n,configFilepath:r,ignoreCache:o}})}}
var YEs,pze,WCt,JEs=async(e,t,n)=>({operation:WCt.getSmithyContext(t).operation,region:await WCt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),XEs=(e)=>{let t=[];switch(e.operation){default:t.push(qhu(e)),t.push(jhu(e))}return t},QEs=(e)=>{let t=pze.memoizeIdentityProvider(e.token,pze.isIdentityExpired,pze.doesIdentityRequireRefresh),n=YEs.resolveAwsSdkSigV4Config(e);return Object.assign(n,{authSchemePreference:WCt.normalizeProvider(e.authSchemePreference??[]),token:t})};
var ZSr=b(()=>{YEs=M(nC(),1),pze=M(Sd(),1),WCt=M(TB(),1)});
export {qhu,jhu,YEs,pze,WCt,JEs,XEs,QEs,ZSr};
