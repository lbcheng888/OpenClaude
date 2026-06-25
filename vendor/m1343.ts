// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,q$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var Z$s,AssumeRootCommand;
var bIr=b(()=>{rD();V5();p7();Z$s=x(yo(),1);AssumeRootCommand=class AssumeRootCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[Z$s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","AssumeRoot",{}).n("STSClient","AssumeRootCommand").sc(q$s).build(){}});
export {Z$s,AssumeRootCommand,bIr};
