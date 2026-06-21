// @ts-nocheck
import {X} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
import {RTs} from "./m996.ts";
var xTs=X((Osn)=>{Object.defineProperty(Osn,"__esModule",{value:!0});Osn.defaultEndpointResolver=void 0;var AAu=Ioe(),hSr=JX(),hAu=RTs(),gAu=new hSr.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]}),_Au=(e,t={})=>gAu.get(e,()=>(0,hSr.resolveEndpoint)(hAu.ruleSet,{endpointParams:e,logger:t.logger}));Osn.defaultEndpointResolver=_Au;hSr.customEndpointFunctions.aws=AAu.awsEndpointFunctions});
export {xTs};
