// @ts-nocheck
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {ai,wr} from "./m1053.ts";
import {ci,rDs} from "./m1068.ts";
import {yo} from "./m892.ts";
import {$Command} from "./m1043.ts";
var WPs,ListInferenceProfilesCommand;
var Run=b(()=>{$s();ai();ci();WPs=x(yo(),1);ListInferenceProfilesCommand=class ListInferenceProfilesCommand extends $Command.classBuilder().ep(wr).m(function(e,t,n,r){return[WPs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AmazonBedrockControlPlaneService","ListInferenceProfiles",{}).n("BedrockClient","ListInferenceProfilesCommand").sc(rDs).build(){}});
export {WPs,ListInferenceProfilesCommand,Run};
