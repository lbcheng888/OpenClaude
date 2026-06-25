// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Wqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var p6s,C0r;
var A0r=b(()=>{vy();SA();IR();p6s=x(yo(),1);C0r=class C0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[p6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","TagResource",{}).n("CognitoIdentityClient","TagResourceCommand").sc(Wqs).build(){}});
export {p6s,C0r,A0r};
