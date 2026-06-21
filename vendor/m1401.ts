// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,NUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var i2s,xwr;
var kwr=b(()=>{Ry();shouldUsePowerShellTool();vw();i2s=M(yo(),1);xwr=class xwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[i2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetIdentityPoolRoles",{}).n("CognitoIdentityClient","GetIdentityPoolRolesCommand").sc(NUs).build(){}});
export {i2s,xwr,kwr};
