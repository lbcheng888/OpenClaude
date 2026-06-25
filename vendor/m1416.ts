// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,qqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var d6s,b0r;
var E0r=b(()=>{vy();SA();IR();d6s=x(yo(),1);b0r=class b0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[d6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","SetPrincipalTagAttributeMap",{}).n("CognitoIdentityClient","SetPrincipalTagAttributeMapCommand").sc(qqs).build(){}});
export {d6s,b0r,E0r};
