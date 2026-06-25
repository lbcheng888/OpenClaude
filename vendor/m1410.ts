// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Mqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var s6s,d0r;
var p0r=b(()=>{vy();SA();IR();s6s=x(yo(),1);d0r=class d0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[s6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","ListIdentities",{}).n("CognitoIdentityClient","ListIdentitiesCommand").sc(Mqs).build(){}});
export {s6s,d0r,p0r};
