// @ts-nocheck
import {b,M} from "../runtime.ts";
import {nC} from "./m880.ts";
import {TB} from "./m604.ts";
function wpu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"awsssoportal",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function tsn(e){return{schemeId:"smithy.api#noAuth"}}
var fgs,xCt,Ags=async(e,t,n)=>({operation:xCt.getSmithyContext(t).operation,region:await xCt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),hgs=(e)=>{let t=[];switch(e.operation){case"GetRoleCredentials":{t.push(tsn(e));break}case"ListAccountRoles":{t.push(tsn(e));break}case"ListAccounts":{t.push(tsn(e));break}case"Logout":{t.push(tsn(e));break}default:t.push(wpu(e))}return t},ggs=(e)=>{let t=fgs.resolveAwsSdkSigV4Config(e);return Object.assign(t,{authSchemePreference:xCt.normalizeProvider(e.authSchemePreference??[])})};
var PTr=b(()=>{fgs=M(nC(),1),xCt=M(TB(),1)});
export {wpu,tsn,fgs,xCt,Ags,hgs,ggs,PTr};
