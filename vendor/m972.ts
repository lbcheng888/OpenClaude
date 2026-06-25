// @ts-nocheck
import {b,x} from "../runtime.ts";
import {n7} from "./m954.ts";
import {zYe,KCe} from "./m956.ts";
import {rwt,hAs} from "./m971.ts";
import {yo} from "./m892.ts";
import {cQ} from "./m946.ts";
var TAs,GetRoleCredentialsCommand;
var pRr=b(()=>{n7();zYe();rwt();TAs=x(yo(),1);GetRoleCredentialsCommand=class GetRoleCredentialsCommand extends cQ.classBuilder().ep(KCe).m(function(e,t,n,r){return[TAs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("SWBPortalService","GetRoleCredentials",{}).n("SSOClient","GetRoleCredentialsCommand").sc(hAs).build(){}});
export {TAs,GetRoleCredentialsCommand,pRr};
