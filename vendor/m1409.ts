// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Lqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var o6s,c0r;
var u0r=b(()=>{vy();SA();IR();o6s=x(yo(),1);c0r=class c0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[o6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetPrincipalTagAttributeMap",{}).n("CognitoIdentityClient","GetPrincipalTagAttributeMapCommand").sc(Lqs).build(){}});
export {o6s,c0r,u0r};
