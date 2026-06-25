// @ts-nocheck
import {hIs,gIs} from "./m1059.ts";
import {b,x} from "../runtime.ts";
import {Hoe} from "./m871.ts";
import {zX} from "./m612.ts";
var _Is,dJe,cwu,yIs=(e,t={})=>cwu.get(e,()=>dJe.resolveEndpoint(hIs,{endpointParams:e,logger:t.logger}));
var TIs=b(()=>{gIs();_Is=x(Hoe(),1),dJe=x(zX(),1),cwu=new dJe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});dJe.customEndpointFunctions.aws=_Is.awsEndpointFunctions});
export {_Is,dJe,cwu,yIs,TIs};
