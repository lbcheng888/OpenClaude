// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,HUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var ZUs,hwr;
var gwr=b(()=>{Ry();shouldUsePowerShellTool();vw();ZUs=M(yo(),1);hwr=class hwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[ZUs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","CreateIdentityPool",{}).n("CognitoIdentityClient","CreateIdentityPoolCommand").sc(HUs).build(){}});
export {ZUs,hwr,gwr};
