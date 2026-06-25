// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,B$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var J$s,AssumeRoleCommand;
var gpn=b(()=>{rD();V5();p7();J$s=x(yo(),1);AssumeRoleCommand=class AssumeRoleCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[J$s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRole",{}).n("STSClient","AssumeRoleCommand").sc(B$s).build(){}});
export {J$s,AssumeRoleCommand,gpn};
