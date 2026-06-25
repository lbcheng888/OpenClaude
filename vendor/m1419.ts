// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Vqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var f6s,w0r;
var k0r=b(()=>{vy();SA();IR();f6s=x(yo(),1);w0r=class w0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[f6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","UnlinkIdentity",{}).n("CognitoIdentityClient","UnlinkIdentityCommand").sc(Vqs).build(){}});
export {f6s,w0r,k0r};
