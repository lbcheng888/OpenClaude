// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Pqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var n6s,s0r;
var i0r=b(()=>{vy();SA();IR();n6s=x(yo(),1);s0r=class s0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[n6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetOpenIdToken",{}).n("CognitoIdentityClient","GetOpenIdTokenCommand").sc(Pqs).build(){}});
export {n6s,s0r,i0r};
