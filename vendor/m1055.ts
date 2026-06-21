// @ts-nocheck
import {SCs,bCs} from "./m1054.ts";
import {b,M} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
var ECs,mze,Khu,CCs=(e,t={})=>Khu.get(e,()=>mze.resolveEndpoint(SCs,{endpointParams:e,logger:t.logger}));
var vCs=b(()=>{bCs();ECs=M(Ioe(),1),mze=M(JX(),1),Khu=new mze.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});mze.customEndpointFunctions.aws=ECs.awsEndpointFunctions});
export {ECs,mze,Khu,CCs,vCs};
