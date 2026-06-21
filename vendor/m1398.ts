// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,OUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var r2s,Cwr;
var vwr=b(()=>{Ry();shouldUsePowerShellTool();vw();r2s=M(yo(),1);Cwr=class Cwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[r2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","DescribeIdentityPool",{}).n("CognitoIdentityClient","DescribeIdentityPoolCommand").sc(OUs).build(){}});
export {r2s,Cwr,vwr};
