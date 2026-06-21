// @ts-nocheck
import {b,M} from "../runtime.ts";
import {H7} from "./m949.ts";
import {YKe,uEe} from "./m951.ts";
import {HCt,S_s} from "./m966.ts";
import {yo} from "./m887.ts";
import {pQ} from "./m941.ts";
var v_s,GetRoleCredentialsCommand;
var NTr=b(()=>{H7();YKe();HCt();v_s=M(yo(),1);GetRoleCredentialsCommand=class GetRoleCredentialsCommand extends pQ.classBuilder().ep(uEe).m(function(e,t,n,r){return[v_s.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("SWBPortalService","GetRoleCredentials",{}).n("SSOClient","GetRoleCredentialsCommand").sc(S_s).build(){}});
export {v_s,GetRoleCredentialsCommand,NTr};
