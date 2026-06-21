// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,KUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var h2s,Vwr;
var Kwr=b(()=>{Ry();shouldUsePowerShellTool();vw();h2s=M(yo(),1);Vwr=class Vwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[h2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","SetPrincipalTagAttributeMap",{}).n("CognitoIdentityClient","SetPrincipalTagAttributeMapCommand").sc(KUs).build(){}});
export {h2s,Vwr,Kwr};
