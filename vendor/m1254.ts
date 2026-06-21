// @ts-nocheck
import {MDs,NDs} from "./m1253.ts";
import {b,M} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
var BDs,Fze,MRu,FDs=(e,t={})=>MRu.get(e,()=>Fze.resolveEndpoint(MDs,{endpointParams:e,logger:t.logger}));
var UDs=b(()=>{NDs();BDs=M(Ioe(),1),Fze=M(JX(),1),MRu=new Fze.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});Fze.customEndpointFunctions.aws=BDs.awsEndpointFunctions});
export {BDs,Fze,MRu,FDs,UDs};
