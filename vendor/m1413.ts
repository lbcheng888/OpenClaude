// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Bqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var l6s,h0r;
var g0r=b(()=>{vy();SA();IR();l6s=x(yo(),1);h0r=class h0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[l6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","LookupDeveloperIdentity",{}).n("CognitoIdentityClient","LookupDeveloperIdentityCommand").sc(Bqs).build(){}});
export {l6s,h0r,g0r};
