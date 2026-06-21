// @ts-nocheck
import {l1s,c1s} from "./m1325.ts";
import {b,M} from "../runtime.ts";
import {Ioe} from "./m866.ts";
import {JX} from "./m606.ts";
var u1s,nYe,QIu,d1s=(e,t={})=>QIu.get(e,()=>nYe.resolveEndpoint(l1s,{endpointParams:e,logger:t.logger}));
var p1s=b(()=>{c1s();u1s=M(Ioe(),1),nYe=M(JX(),1),QIu=new nYe.EndpointCache({size:50,params:["Endpoint","Region","UseDualStack","UseFIPS","UseGlobalEndpoint"]});nYe.customEndpointFunctions.aws=u1s.awsEndpointFunctions});
export {u1s,nYe,QIu,d1s,p1s};
