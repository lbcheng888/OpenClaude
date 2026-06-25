// @ts-nocheck
import {$4s,q4s} from "./m1389.ts";
import {b,x} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
var W4s,sXe,v2u,G4s=(e,t={})=>v2u.get(e,()=>sXe.resolveEndpoint($4s,{endpointParams:e,logger:t.logger}));
var V4s=b(()=>{q4s();W4s=x(Hoe(),1),sXe=x(zX(),1),v2u=new sXe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});sXe.customEndpointFunctions.aws=W4s.awsEndpointFunctions});
export {W4s,sXe,v2u,G4s,V4s};
