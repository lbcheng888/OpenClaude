// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,VUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var A2s,Wwr;
var Gwr=b(()=>{Ry();shouldUsePowerShellTool();vw();A2s=M(yo(),1);Wwr=class Wwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[A2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","SetIdentityPoolRoles",{}).n("CognitoIdentityClient","SetIdentityPoolRolesCommand").sc(VUs).build(){}});
export {A2s,Wwr,Gwr};
