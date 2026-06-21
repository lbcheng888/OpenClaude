// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,$Us} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var u2s,Mwr;
var Nwr=b(()=>{Ry();shouldUsePowerShellTool();vw();u2s=M(yo(),1);Mwr=class Mwr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[u2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","ListIdentities",{}).n("CognitoIdentityClient","ListIdentitiesCommand").sc($Us).build(){}});
export {u2s,Mwr,Nwr};
