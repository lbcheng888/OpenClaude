// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,U$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var X$s,AssumeRoleWithSAMLCommand;
var SIr=b(()=>{rD();V5();p7();X$s=x(yo(),1);AssumeRoleWithSAMLCommand=class AssumeRoleWithSAMLCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[X$s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRoleWithSAML",{}).n("STSClient","AssumeRoleWithSAMLCommand").sc(U$s).build(){}});
export {X$s,AssumeRoleWithSAMLCommand,SIr};
