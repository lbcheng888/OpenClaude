// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,WUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var m2s,Uwr;
var $wr=b(()=>{Ry();shouldUsePowerShellTool();vw();m2s=M(yo(),1);Uwr=class Uwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[m2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","LookupDeveloperIdentity",{}).n("CognitoIdentityClient","LookupDeveloperIdentityCommand").sc(WUs).build(){}});
export {m2s,Uwr,$wr};
