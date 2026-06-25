// @ts-nocheck
import {Q} from "../runtime.ts";
import {iC} from "./m885.ts";
import {qN} from "./m610.ts";
var wAr=Q((BCe)=>{Object.defineProperty(BCe,"__esModule",{value:!0});BCe.resolveHttpAuthSchemeConfig=BCe.defaultSSOOIDCHttpAuthSchemeProvider=BCe.defaultSSOOIDCHttpAuthSchemeParametersProvider=void 0;var VTu=iC(),vAr=qN(),KTu=async(e,t,n)=>({operation:(0,vAr.getSmithyContext)(t).operation,region:await(0,vAr.normalizeProvider)(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()});BCe.defaultSSOOIDCHttpAuthSchemeParametersProvider=KTu;function zTu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"sso-oauth",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}function jTu(e){return{schemeId:"smithy.api#noAuth"}}var YTu=(e)=>{let t=[];switch(e.operation){case"CreateToken":{t.push(jTu(e));break}default:t.push(zTu(e))}return t};BCe.defaultSSOOIDCHttpAuthSchemeProvider=YTu;var JTu=(e)=>{let t=(0,VTu.resolveAwsSdkSigV4Config)(e);return Object.assign(t,{authSchemePreference:(0,vAr.normalizeProvider)(e.authSchemePreference??[])})};BCe.resolveHttpAuthSchemeConfig=JTu});
export {wAr};
