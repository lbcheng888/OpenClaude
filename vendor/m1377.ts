// @ts-nocheck
import {b,M} from "../runtime.ts";
import {nC} from "./m880.ts";
import {TB} from "./m604.ts";
function sDu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"cognito-identity",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function Ycn(e){return{schemeId:"smithy.api#noAuth"}}
var yFs,Gvt,TFs=async(e,t,n)=>({operation:Gvt.getSmithyContext(t).operation,region:await Gvt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),SFs=(e)=>{let t=[];switch(e.operation){case"GetCredentialsForIdentity":{t.push(Ycn(e));break}case"GetId":{t.push(Ycn(e));break}case"GetOpenIdToken":{t.push(Ycn(e));break}case"UnlinkIdentity":{t.push(Ycn(e));break}default:t.push(sDu(e))}return t},bFs=(e)=>{let t=yFs.resolveAwsSdkSigV4Config(e);return Object.assign(t,{authSchemePreference:Gvt.normalizeProvider(e.authSchemePreference??[])})};
var pwr=b(()=>{yFs=M(nC(),1),Gvt=M(TB(),1)});
export {sDu,Ycn,yFs,Gvt,TFs,SFs,bFs,pwr};
