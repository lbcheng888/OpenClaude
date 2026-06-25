// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Nqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var i6s,Ekt;
var omn=b(()=>{vy();SA();IR();i6s=x(yo(),1);Ekt=class Ekt extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[i6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","ListIdentityPools",{}).n("CognitoIdentityClient","ListIdentityPoolsCommand").sc(Nqs).build(){}});
export {i6s,Ekt,omn};
