// @ts-nocheck
import {b,x} from "../runtime.ts";
import {iC} from "./m885.ts";
import {qN} from "./m610.ts";
function E2u(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"cognito-identity",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function Ppn(e){return{schemeId:"smithy.api#noAuth"}}
var f4s,_kt,h4s=async(e,t,n)=>({operation:_kt.getSmithyContext(t).operation,region:await _kt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),g4s=(e)=>{let t=[];switch(e.operation){case"GetCredentialsForIdentity":{t.push(Ppn(e));break}case"GetId":{t.push(Ppn(e));break}case"GetOpenIdToken":{t.push(Ppn(e));break}case"UnlinkIdentity":{t.push(Ppn(e));break}default:t.push(E2u(e))}return t},_4s=(e)=>{let t=f4s.resolveAwsSdkSigV4Config(e);return Object.assign(t,{authSchemePreference:_kt.normalizeProvider(e.authSchemePreference??[])})};
var $Ir=b(()=>{f4s=x(iC(),1),_kt=x(qN(),1)});
export {E2u,Ppn,f4s,_kt,h4s,g4s,_4s,$Ir};
