// @ts-nocheck
import {X} from "../runtime.ts";
import {nC} from "./m880.ts";
import {TB} from "./m604.ts";
import {YTr} from "./m991.ts";
var zTr=X((mQ)=>{Object.defineProperty(mQ,"__esModule",{value:!0});mQ.resolveHttpAuthSchemeConfig=mQ.resolveStsAuthConfig=mQ.defaultSTSHttpAuthSchemeProvider=mQ.defaultSTSHttpAuthSchemeParametersProvider=void 0;var Zpu=nC(),KTr=TB(),emu=YTr(),tmu=async(e,t,n)=>({operation:(0,KTr.getSmithyContext)(t).operation,region:await(0,KTr.normalizeProvider)(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()});mQ.defaultSTSHttpAuthSchemeParametersProvider=tmu;function nmu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"sts",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}function rmu(e){return{schemeId:"smithy.api#noAuth"}}var omu=(e)=>{let t=[];switch(e.operation){case"AssumeRoleWithWebIdentity":{t.push(rmu(e));break}default:t.push(nmu(e))}return t};mQ.defaultSTSHttpAuthSchemeProvider=omu;var smu=(e)=>Object.assign(e,{stsClientCtor:emu.STSClient});mQ.resolveStsAuthConfig=smu;var imu=(e)=>{let t=(0,mQ.resolveStsAuthConfig)(e),n=(0,Zpu.resolveAwsSdkSigV4Config)(t);return Object.assign(n,{authSchemePreference:(0,KTr.normalizeProvider)(e.authSchemePreference??[])})};mQ.resolveHttpAuthSchemeConfig=imu});
export {zTr};
