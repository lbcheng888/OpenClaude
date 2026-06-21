// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,XUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var T2s,eRr;
var tRr=b(()=>{Ry();shouldUsePowerShellTool();vw();T2s=M(yo(),1);eRr=class eRr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[T2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","UntagResource",{}).n("CognitoIdentityClient","UntagResourceCommand").sc(XUs).build(){}});
export {T2s,eRr,tRr};
