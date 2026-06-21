// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,jUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var p2s,Bwr;
var Fwr=b(()=>{Ry();shouldUsePowerShellTool();vw();p2s=M(yo(),1);Bwr=class Bwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[p2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","ListTagsForResource",{}).n("CognitoIdentityClient","ListTagsForResourceCommand").sc(jUs).build(){}});
export {p2s,Bwr,Fwr};
