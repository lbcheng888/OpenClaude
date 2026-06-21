// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,PUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var n2s,bwr;
var Ewr=b(()=>{Ry();shouldUsePowerShellTool();vw();n2s=M(yo(),1);bwr=class bwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[n2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","DescribeIdentity",{}).n("CognitoIdentityClient","DescribeIdentityCommand").sc(PUs).build(){}});
export {n2s,bwr,Ewr};
