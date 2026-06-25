// @ts-nocheck
import {Q} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
import {ySs} from "./m915.ts";
var TSs=Q((Ran)=>{Object.defineProperty(Ran,"__esModule",{value:!0});Ran.defaultEndpointResolver=void 0;var kSu=Hoe(),VAr=zX(),HSu=ySs(),ISu=new VAr.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]}),xSu=(e,t={})=>ISu.get(e,()=>(0,VAr.resolveEndpoint)(HSu.ruleSet,{endpointParams:e,logger:t.logger}));Ran.defaultEndpointResolver=xSu;VAr.customEndpointFunctions.aws=kSu.awsEndpointFunctions});
export {TSs};
