// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,qUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var d2s,Jvt;
var Tun=b(()=>{Ry();shouldUsePowerShellTool();vw();d2s=M(yo(),1);Jvt=class Jvt extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[d2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","ListIdentityPools",{}).n("CognitoIdentityClient","ListIdentityPoolsCommand").sc(qUs).build(){}});
export {d2s,Jvt,Tun};
