// @ts-nocheck
import {VFs,KFs} from "./m1384.ts";
import {b,M} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
var zFs,lYe,cDu,YFs=(e,t={})=>cDu.get(e,()=>lYe.resolveEndpoint(VFs,{endpointParams:e,logger:t.logger}));
var JFs=b(()=>{KFs();zFs=M(Ioe(),1),lYe=M(JX(),1),cDu=new lYe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS"]});lYe.customEndpointFunctions.aws=zFs.awsEndpointFunctions});
export {zFs,lYe,cDu,YFs,JFs};
