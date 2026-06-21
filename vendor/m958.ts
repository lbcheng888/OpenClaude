// @ts-nocheck
import {$gs,qgs} from "./m957.ts";
import {b,M} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
var jgs,JKe,Hpu,Wgs=(e,t={})=>Hpu.get(e,()=>JKe.resolveEndpoint($gs,{endpointParams:e,logger:t.logger}));
var Ggs=b(()=>{qgs();jgs=M(Ioe(),1),JKe=M(JX(),1),Hpu=new JKe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});JKe.customEndpointFunctions.aws=jgs.awsEndpointFunctions});
export {jgs,JKe,Hpu,Wgs,Ggs};
