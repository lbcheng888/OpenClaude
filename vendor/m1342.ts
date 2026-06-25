// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,$$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var Q$s,AssumeRoleWithWebIdentityCommand;
var ypn=b(()=>{rD();V5();p7();Q$s=x(yo(),1);AssumeRoleWithWebIdentityCommand=class AssumeRoleWithWebIdentityCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[Q$s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRoleWithWebIdentity",{}).n("STSClient","AssumeRoleWithWebIdentityCommand").sc($$s).build(){}});
export {Q$s,AssumeRoleWithWebIdentityCommand,ypn};
