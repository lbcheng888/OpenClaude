// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,MUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var s2s,GetIdCommand;
var Rwr=b(()=>{Ry();shouldUsePowerShellTool();vw();s2s=M(yo(),1);GetIdCommand=class GetIdCommand extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[s2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetId",{}).n("CognitoIdentityClient","GetIdCommand").sc(MUs).build(){}});
export {s2s,GetIdCommand,Rwr};
