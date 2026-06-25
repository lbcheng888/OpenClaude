// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Dqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var t6s,r0r;
var o0r=b(()=>{vy();SA();IR();t6s=x(yo(),1);r0r=class r0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[t6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetIdentityPoolRoles",{}).n("CognitoIdentityClient","GetIdentityPoolRolesCommand").sc(Dqs).build(){}});
export {t6s,r0r,o0r};
