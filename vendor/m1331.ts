// @ts-nocheck
import {r$s,o$s} from "./m1330.ts";
import {b,x} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
var s$s,ZJe,hUu,i$s=(e,t={})=>hUu.get(e,()=>ZJe.resolveEndpoint(r$s,{endpointParams:e,logger:t.logger}));
var a$s=b(()=>{o$s();s$s=x(Hoe(),1),ZJe=x(zX(),1),hUu=new ZJe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS","UseGlobalEndpoint"]});ZJe.customEndpointFunctions.aws=s$s.awsEndpointFunctions});
export {s$s,ZJe,hUu,i$s,a$s};
