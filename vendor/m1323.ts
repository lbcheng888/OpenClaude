// @ts-nocheck
import {STSClient,okt} from "./m1336.ts";
import {b,x} from "../runtime.ts";
import {iC} from "./m885.ts";
import {qN} from "./m610.ts";
function uUu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"sts",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function R2s(e){return{schemeId:"smithy.api#noAuth"}}
var v2s,rkt,w2s=async(e,t,n)=>({operation:rkt.getSmithyContext(t).operation,region:await rkt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),k2s=(e)=>{let t=[];switch(e.operation){case"AssumeRoleWithSAML":{t.push(R2s(e));break}case"AssumeRoleWithWebIdentity":{t.push(R2s(e));break}default:t.push(uUu(e))}return t},dUu=(e)=>Object.assign(e,{stsClientCtor:STSClient}),H2s=(e)=>{let t=dUu(e),n=v2s.resolveAwsSdkSigV4Config(t);return Object.assign(n,{authSchemePreference:rkt.normalizeProvider(e.authSchemePreference??[])})};
var fIr=b(()=>{okt();v2s=x(iC(),1),rkt=x(qN(),1)});
export {uUu,R2s,v2s,rkt,w2s,k2s,dUu,H2s,fIr};
