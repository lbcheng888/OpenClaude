// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,xqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var e6s,GetIdCommand;
var n0r=b(()=>{vy();SA();IR();e6s=x(yo(),1);GetIdCommand=class GetIdCommand extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[e6s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetId",{}).n("CognitoIdentityClient","GetIdCommand").sc(xqs).build(){}});
export {e6s,GetIdCommand,n0r};
