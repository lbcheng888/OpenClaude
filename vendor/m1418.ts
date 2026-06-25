// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Gqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var m6s,R0r;
var v0r=b(()=>{vy();SA();IR();m6s=x(yo(),1);R0r=class R0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[m6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","UnlinkDeveloperIdentity",{}).n("CognitoIdentityClient","UnlinkDeveloperIdentityCommand").sc(Gqs).build(){}});
export {m6s,R0r,v0r};
