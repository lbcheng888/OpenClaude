// @ts-nocheck
import {X} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
import {Cfs} from "./m910.ts";
var vfs=X((qon)=>{Object.defineProperty(qon,"__esModule",{value:!0});qon.defaultEndpointResolver=void 0;var puu=Ioe(),hTr=JX(),muu=Cfs(),fuu=new hTr.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]}),Auu=(e,t={})=>fuu.get(e,()=>(0,hTr.resolveEndpoint)(muu.ruleSet,{endpointParams:e,logger:t.logger}));qon.defaultEndpointResolver=Auu;hTr.customEndpointFunctions.aws=puu.awsEndpointFunctions});
export {vfs};
