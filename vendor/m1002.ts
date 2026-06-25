// @ts-nocheck
import {Q} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
import {bvs} from "./m1001.ts";
var Evs=Q((_ln)=>{Object.defineProperty(_ln,"__esModule",{value:!0});_ln.defaultEndpointResolver=void 0;var xRu=Hoe(),VRr=zX(),DRu=bvs(),PRu=new VRr.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]}),ORu=(e,t={})=>PRu.get(e,()=>(0,VRr.resolveEndpoint)(DRu.ruleSet,{endpointParams:e,logger:t.logger}));_ln.defaultEndpointResolver=ORu;VRr.customEndpointFunctions.aws=xRu.awsEndpointFunctions});
export {Evs};
