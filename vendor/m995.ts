// @ts-nocheck
import {X} from "../runtime.ts";
import {nC} from "./m880.ts";
import {TB} from "./m604.ts";
var dSr=X((hEe)=>{Object.defineProperty(hEe,"__esModule",{value:!0});hEe.resolveHttpAuthSchemeConfig=hEe.defaultSigninHttpAuthSchemeProvider=hEe.defaultSigninHttpAuthSchemeParametersProvider=void 0;var lAu=nC(),uSr=TB(),cAu=async(e,t,n)=>({operation:(0,uSr.getSmithyContext)(t).operation,region:await(0,uSr.normalizeProvider)(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()});hEe.defaultSigninHttpAuthSchemeParametersProvider=cAu;function uAu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"signin",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}function dAu(e){return{schemeId:"smithy.api#noAuth"}}var pAu=(e)=>{let t=[];switch(e.operation){case"CreateOAuth2Token":{t.push(dAu(e));break}default:t.push(uAu(e))}return t};hEe.defaultSigninHttpAuthSchemeProvider=pAu;var mAu=(e)=>{let t=(0,lAu.resolveAwsSdkSigV4Config)(e);return Object.assign(t,{authSchemePreference:(0,uSr.normalizeProvider)(e.authSchemePreference??[])})};hEe.resolveHttpAuthSchemeConfig=mAu});
export {dSr};
