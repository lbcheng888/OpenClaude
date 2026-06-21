// @ts-nocheck
import {STSClient,Dvt} from "./m1331.ts";
import {b,M} from "../runtime.ts";
import {nC} from "./m880.ts";
import {TB} from "./m604.ts";
function KIu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"sts",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function HMs(e){return{schemeId:"smithy.api#noAuth"}}
var IMs,Ivt,DMs=async(e,t,n)=>({operation:Ivt.getSmithyContext(t).operation,region:await Ivt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),PMs=(e)=>{let t=[];switch(e.operation){case"AssumeRoleWithSAML":{t.push(HMs(e));break}case"AssumeRoleWithWebIdentity":{t.push(HMs(e));break}default:t.push(KIu(e))}return t},zIu=(e)=>Object.assign(e,{stsClientCtor:STSClient}),OMs=(e)=>{let t=zIu(e),n=IMs.resolveAwsSdkSigV4Config(t);return Object.assign(n,{authSchemePreference:Ivt.normalizeProvider(e.authSchemePreference??[])})};
var Fvr=b(()=>{Dvt();IMs=M(nC(),1),Ivt=M(TB(),1)});
export {KIu,HMs,IMs,Ivt,DMs,PMs,zIu,OMs,Fvr};
