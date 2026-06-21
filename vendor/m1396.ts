// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,DUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var t2s,Twr;
var Swr=b(()=>{Ry();shouldUsePowerShellTool();vw();t2s=M(yo(),1);Twr=class Twr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[t2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","DeleteIdentityPool",{}).n("CognitoIdentityClient","DeleteIdentityPoolCommand").sc(DUs).build(){}});
export {t2s,Twr,Swr};
