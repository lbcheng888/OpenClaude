// @ts-nocheck
import {Q} from "../runtime.ts";
import {iC} from "./m885.ts";
import {qN} from "./m610.ts";
var URr=Q((QCe)=>{Object.defineProperty(QCe,"__esModule",{value:!0});QCe.resolveHttpAuthSchemeConfig=QCe.defaultSigninHttpAuthSchemeProvider=QCe.defaultSigninHttpAuthSchemeParametersProvider=void 0;var ARu=iC(),BRr=qN(),RRu=async(e,t,n)=>({operation:(0,BRr.getSmithyContext)(t).operation,region:await(0,BRr.normalizeProvider)(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()});QCe.defaultSigninHttpAuthSchemeParametersProvider=RRu;function vRu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"signin",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}function wRu(e){return{schemeId:"smithy.api#noAuth"}}var kRu=(e)=>{let t=[];switch(e.operation){case"CreateOAuth2Token":{t.push(wRu(e));break}default:t.push(vRu(e))}return t};QCe.defaultSigninHttpAuthSchemeProvider=kRu;var HRu=(e)=>{let t=(0,ARu.resolveAwsSdkSigV4Config)(e);return Object.assign(t,{authSchemePreference:(0,BRr.normalizeProvider)(e.authSchemePreference??[])})};QCe.resolveHttpAuthSchemeConfig=HRu});
export {URr};
