// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Hqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var Qqs,ZIr;
var e0r=b(()=>{vy();SA();IR();Qqs=x(yo(),1);ZIr=class ZIr extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[Qqs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","DescribeIdentityPool",{}).n("CognitoIdentityClient","DescribeIdentityPoolCommand").sc(Hqs).build(){}});
export {Qqs,ZIr,e0r};
