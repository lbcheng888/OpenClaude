// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,zUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var g2s,zwr;
var Ywr=b(()=>{Ry();shouldUsePowerShellTool();vw();g2s=M(yo(),1);zwr=class zwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[g2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","TagResource",{}).n("CognitoIdentityClient","TagResourceCommand").sc(zUs).build(){}});
export {g2s,zwr,Ywr};
