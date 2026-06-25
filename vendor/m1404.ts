// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,Iqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var Zqs,GetCredentialsForIdentityCommand;
var t0r=b(()=>{vy();SA();IR();Zqs=x(yo(),1);GetCredentialsForIdentityCommand=class GetCredentialsForIdentityCommand extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[Zqs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetCredentialsForIdentity",{}).n("CognitoIdentityClient","GetCredentialsForIdentityCommand").sc(Iqs).build(){}});
export {Zqs,GetCredentialsForIdentityCommand,t0r};
