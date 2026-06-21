// @ts-nocheck
import {X} from "../runtime.ts";
import {nC} from "./m880.ts";
import {TB} from "./m604.ts";
var Qyr=X((rEe)=>{Object.defineProperty(rEe,"__esModule",{value:!0});rEe.resolveHttpAuthSchemeConfig=rEe.defaultSSOOIDCHttpAuthSchemeProvider=rEe.defaultSSOOIDCHttpAuthSchemeParametersProvider=void 0;var kcu=nC(),Xyr=TB(),Hcu=async(e,t,n)=>({operation:(0,Xyr.getSmithyContext)(t).operation,region:await(0,Xyr.normalizeProvider)(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()});rEe.defaultSSOOIDCHttpAuthSchemeParametersProvider=Hcu;function Icu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"sso-oauth",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}function Dcu(e){return{schemeId:"smithy.api#noAuth"}}var Pcu=(e)=>{let t=[];switch(e.operation){case"CreateToken":{t.push(Dcu(e));break}default:t.push(Icu(e))}return t};rEe.defaultSSOOIDCHttpAuthSchemeProvider=Pcu;var Ocu=(e)=>{let t=(0,kcu.resolveAwsSdkSigV4Config)(e);return Object.assign(t,{authSchemePreference:(0,Xyr.normalizeProvider)(e.authSchemePreference??[])})};rEe.resolveHttpAuthSchemeConfig=Ocu});
export {Qyr};
