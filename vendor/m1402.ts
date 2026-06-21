// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,BUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var a2s,Hwr;
var Iwr=b(()=>{Ry();shouldUsePowerShellTool();vw();a2s=M(yo(),1);Hwr=class Hwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[a2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetOpenIdToken",{}).n("CognitoIdentityClient","GetOpenIdTokenCommand").sc(BUs).build(){}});
export {a2s,Hwr,Iwr};
