// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Oqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var r6s,a0r;
var l0r=b(()=>{vy();SA();IR();r6s=x(yo(),1);a0r=class a0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[r6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetOpenIdTokenForDeveloperIdentity",{}).n("CognitoIdentityClient","GetOpenIdTokenForDeveloperIdentityCommand").sc(Oqs).build(){}});
export {r6s,a0r,l0r};
