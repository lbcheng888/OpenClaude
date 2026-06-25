// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Fqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var a6s,m0r;
var f0r=b(()=>{vy();SA();IR();a6s=x(yo(),1);m0r=class m0r extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[a6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","ListTagsForResource",{}).n("CognitoIdentityClient","ListTagsForResourceCommand").sc(Fqs).build(){}});
export {a6s,m0r,f0r};
