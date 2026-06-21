// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {shouldUsePowerShellTool,Kp} from "./m1378.ts";
import {vw,IUs} from "./m1393.ts";
import {yo} from "./m887.ts";
import {Jd} from "./m1368.ts";
var e2s,_wr;
var ywr=b(()=>{Ry();shouldUsePowerShellTool();vw();e2s=M(yo(),1);_wr=class _wr extends Jd.classBuilder().ep(Kp).m(function(e,t,n,r){return[e2s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","DeleteIdentities",{}).n("CognitoIdentityClient","DeleteIdentitiesCommand").sc(IUs).build(){}});
export {e2s,_wr,ywr};
