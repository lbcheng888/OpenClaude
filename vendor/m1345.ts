// @ts-nocheck
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {V5,getTeamByName} from "./m1324.ts";
import {p7,G$s} from "./m1339.ts";
import {yo} from "./m892.ts";
import {lC} from "./m1314.ts";
var t9s,GetAccessKeyInfoCommand;
var CIr=b(()=>{rD();V5();p7();t9s=x(yo(),1);GetAccessKeyInfoCommand=class GetAccessKeyInfoCommand extends lC.classBuilder().ep(getTeamByName).m(function(e,t,n,r){return[t9s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSSecurityTokenServiceV20110615","GetAccessKeyInfo",{}).n("STSClient","GetAccessKeyInfoCommand").sc(G$s).build(){}});
export {t9s,GetAccessKeyInfoCommand,CIr};
