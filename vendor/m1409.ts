// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,GUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var f2s,qwr;
var jwr=b(()=>{Ry();shouldUsePowerShellTool();vw();f2s=M(yo(),1);qwr=class qwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[f2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","MergeDeveloperIdentities",{}).n("CognitoIdentityClient","MergeDeveloperIdentitiesCommand").sc(GUs).build(){}});
export {f2s,qwr,jwr};
