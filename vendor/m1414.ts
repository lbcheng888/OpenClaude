// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,JUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var y2s,Qwr;
var Zwr=b(()=>{Ry();shouldUsePowerShellTool();vw();y2s=M(yo(),1);Qwr=class Qwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[y2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","UnlinkIdentity",{}).n("CognitoIdentityClient","UnlinkIdentityCommand").sc(JUs).build(){}});
export {y2s,Qwr,Zwr};
