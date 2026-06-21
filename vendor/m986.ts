// @ts-nocheck
import {X} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
import {hys} from "./m985.ts";
var gys=X((bsn)=>{Object.defineProperty(bsn,"__esModule",{value:!0});bsn.defaultEndpointResolver=void 0;var cmu=Ioe(),eSr=JX(),umu=hys(),dmu=new eSr.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS","UseGlobalEndpoint"]}),pmu=(e,t={})=>dmu.get(e,()=>(0,eSr.resolveEndpoint)(umu.ruleSet,{endpointParams:e,logger:t.logger}));bsn.defaultEndpointResolver=pmu;eSr.customEndpointFunctions.aws=cmu.awsEndpointFunctions});
export {gys};
