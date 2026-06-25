// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,$qs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var u6s,T0r;
var S0r=b(()=>{vy();SA();IR();u6s=x(yo(),1);T0r=class T0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[u6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","SetIdentityPoolRoles",{}).n("CognitoIdentityClient","SetIdentityPoolRolesCommand").sc($qs).build(){}});
export {u6s,T0r,S0r};
