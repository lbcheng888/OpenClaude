// @ts-nocheck
import {LCs,MCs} from "./m962.ts";
import {b,x} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
var NCs,jYe,KEu,FCs=(e,t={})=>KEu.get(e,()=>jYe.resolveEndpoint(LCs,{endpointParams:e,logger:t.logger}));
var BCs=b(()=>{MCs();NCs=x(Hoe(),1),jYe=x(zX(),1),KEu=new jYe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});jYe.customEndpointFunctions.aws=NCs.awsEndpointFunctions});
export {NCs,jYe,KEu,FCs,BCs};
