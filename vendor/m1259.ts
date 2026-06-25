// @ts-nocheck
import {INs,xNs} from "./m1258.ts";
import {b,x} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
var DNs,NJe,QMu,PNs=(e,t={})=>QMu.get(e,()=>NJe.resolveEndpoint(INs,{endpointParams:e,logger:t.logger}));
var ONs=b(()=>{xNs();DNs=x(Hoe(),1),NJe=x(zX(),1),QMu=new NJe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});NJe.customEndpointFunctions.aws=DNs.awsEndpointFunctions});
export {DNs,NJe,QMu,PNs,ONs};
