// @ts-nocheck
import {isExemptDefaultResolvingPick,isModelAllowedUnderActiveEnforcement,getDefaultMainLoopModelSetting,parseUserSpecifiedModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {isModelAllowed,MO} from "./m1451.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {nqe,SUn} from "../src/core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {sy,e9} from "./m2808.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function bUn(e,t){for(let n of[e,t]){if(n==null)continue;if(isExemptDefaultResolvingPick(n)||(isModelAllowedUnderActiveEnforcement(n)??isModelAllowed(n)))return n}return getDefaultMainLoopModelSetting()}
function aIe(){let e=mt((o)=>o.mainLoopModel),t=mt((o)=>o.mainLoopModelForSession),n=nqe(),r=sy();return Oio.useMemo(()=>bUn(t,e),[t,e,n,r])}
function kE(){let e=mt((o)=>o.mainLoopModel),t=mt((o)=>o.mainLoopModelForSession),n=nqe(),r=sy();return Oio.useMemo(()=>parseUserSpecifiedModel(bUn(t,e)),[t,e,n,r])}
var Oio;
var jL=b(()=>{configProtoStore();Mo();MO();SUn();e9();Oio=M(Te(),1)});
export {bUn,aIe,kE,Oio,jL};
