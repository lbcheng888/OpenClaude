// @ts-nocheck
import {Q} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
import {uRs} from "./m990.ts";
var dRs=Q((sln)=>{Object.defineProperty(sln,"__esModule",{value:!0});sln.defaultEndpointResolver=void 0;var RCu=Hoe(),HRr=zX(),vCu=uRs(),wCu=new HRr.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS","UseGlobalEndpoint"]}),kCu=(e,t={})=>wCu.get(e,()=>(0,HRr.resolveEndpoint)(vCu.ruleSet,{endpointParams:e,logger:t.logger}));sln.defaultEndpointResolver=kCu;HRr.customEndpointFunctions.aws=RCu.awsEndpointFunctions});
export {dRs};
