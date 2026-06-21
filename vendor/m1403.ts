// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,FUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var l2s,Dwr;
var Pwr=b(()=>{Ry();shouldUsePowerShellTool();vw();l2s=M(yo(),1);Dwr=class Dwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[l2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetOpenIdTokenForDeveloperIdentity",{}).n("CognitoIdentityClient","GetOpenIdTokenForDeveloperIdentityCommand").sc(FUs).build(){}});
export {l2s,Dwr,Pwr};
