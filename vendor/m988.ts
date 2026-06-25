// @ts-nocheck
import {Q} from "../runtime.ts";
import {iC} from "./m885.ts";
import {qN} from "./m610.ts";
import {ARr} from "./m996.ts";
var CRr=Q((uQ)=>{Object.defineProperty(uQ,"__esModule",{value:!0});uQ.resolveHttpAuthSchemeConfig=uQ.resolveStsAuthConfig=uQ.defaultSTSHttpAuthSchemeProvider=uQ.defaultSTSHttpAuthSchemeParametersProvider=void 0;var hCu=iC(),ERr=qN(),gCu=ARr(),_Cu=async(e,t,n)=>({operation:(0,ERr.getSmithyContext)(t).operation,region:await(0,ERr.normalizeProvider)(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()});uQ.defaultSTSHttpAuthSchemeParametersProvider=_Cu;function yCu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"sts",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}function TCu(e){return{schemeId:"smithy.api#noAuth"}}var SCu=(e)=>{let t=[];switch(e.operation){case"AssumeRoleWithWebIdentity":{t.push(TCu(e));break}default:t.push(yCu(e))}return t};uQ.defaultSTSHttpAuthSchemeProvider=SCu;var bCu=(e)=>Object.assign(e,{stsClientCtor:gCu.STSClient});uQ.resolveStsAuthConfig=bCu;var ECu=(e)=>{let t=(0,uQ.resolveStsAuthConfig)(e),n=(0,hCu.resolveAwsSdkSigV4Config)(t);return Object.assign(n,{authSchemePreference:(0,ERr.normalizeProvider)(e.authSchemePreference??[])})};uQ.resolveHttpAuthSchemeConfig=ECu});
export {CRr};
