// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,LUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var o2s,GetCredentialsForIdentityCommand;
var wwr=b(()=>{Ry();shouldUsePowerShellTool();vw();o2s=M(yo(),1);GetCredentialsForIdentityCommand=class GetCredentialsForIdentityCommand extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[o2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","GetCredentialsForIdentity",{}).n("CognitoIdentityClient","GetCredentialsForIdentityCommand").sc(LUs).build(){}});
export {o2s,GetCredentialsForIdentityCommand,wwr};
