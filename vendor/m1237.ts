// @ts-nocheck
import {b,M} from "../runtime.ts";
import {nC} from "./m880.ts";
import {Sd} from "./m850.ts";
import {TB} from "./m604.ts";
function HRu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"bedrock",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function IRu(e){return{schemeId:"smithy.api#httpBearerAuth",propertiesExtractor:({profile:t,filepath:n,configFilepath:r,ignoreCache:o},s)=>({identityProperties:{profile:t,filepath:n,configFilepath:r,ignoreCache:o}})}}
var Y0s,Nze,uvt,J0s=async(e,t,n)=>({operation:uvt.getSmithyContext(t).operation,region:await uvt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),X0s=(e)=>{let t=[];switch(e.operation){default:t.push(HRu(e)),t.push(IRu(e))}return t},Q0s=(e)=>{let t=Nze.memoizeIdentityProvider(e.token,Nze.isIdentityExpired,Nze.doesIdentityRequireRefresh),n=Y0s.resolveAwsSdkSigV4Config(e);return Object.assign(n,{authSchemePreference:uvt.normalizeProvider(e.authSchemePreference??[]),token:t})};
var CCr=b(()=>{Y0s=M(nC(),1),Nze=M(Sd(),1),uvt=M(TB(),1)});
export {HRu,IRu,Y0s,Nze,uvt,J0s,X0s,Q0s,CCr};
