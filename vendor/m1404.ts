// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,UUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var c2s,Owr;
var Lwr=b(()=>{Ry();shouldUsePowerShellTool();vw();c2s=M(yo(),1);Owr=class Owr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[c2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetPrincipalTagAttributeMap",{}).n("CognitoIdentityClient","GetPrincipalTagAttributeMapCommand").sc(UUs).build(){}});
export {c2s,Owr,Lwr};
