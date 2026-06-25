// @ts-nocheck
import {b,x} from "../runtime.ts";
import {iC} from "./m885.ts";
import {qN} from "./m610.ts";
function qEu(e){return{schemeId:"aws.auth#sigv4",signingProperties:{name:"awsssoportal",region:e.region},propertiesExtractor:(t,n)=>({signingProperties:{config:t,context:n}})}}
function Fan(e){return{schemeId:"smithy.api#noAuth"}}
var lCs,twt,cCs=async(e,t,n)=>({operation:twt.getSmithyContext(t).operation,region:await twt.normalizeProvider(e.region)()||(()=>{throw Error("expected `region` to be configured for `aws.auth#sigv4`")})()}),uCs=(e)=>{let t=[];switch(e.operation){case"GetRoleCredentials":{t.push(Fan(e));break}case"ListAccountRoles":{t.push(Fan(e));break}case"ListAccounts":{t.push(Fan(e));break}case"Logout":{t.push(Fan(e));break}default:t.push(qEu(e))}return t},dCs=(e)=>{let t=lCs.resolveAwsSdkSigV4Config(e);return Object.assign(t,{authSchemePreference:twt.normalizeProvider(e.authSchemePreference??[])})};
var lRr=b(()=>{lCs=x(iC(),1),twt=x(qN(),1)});
export {qEu,Fan,lCs,twt,cCs,uCs,dCs,lRr};
