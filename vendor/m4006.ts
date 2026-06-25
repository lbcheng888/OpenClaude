// @ts-nocheck
import {isExemptDefaultResolvingPick,isModelAllowedUnderActiveEnforcement,getDefaultMainLoopModelSetting,parseUserSpecifiedModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Oa,eO} from "./m1456.ts";
import {_t,uo} from "./m2468.ts";
import {P6e,J9n} from "../src/core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {ay,E$} from "./m2821.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function X9n(e,t){for(let n of[e,t]){if(n==null)continue;if(isExemptDefaultResolvingPick(n)||(isModelAllowedUnderActiveEnforcement(n)??Oa(n)))return n}return getDefaultMainLoopModelSetting()}
function Sdt(){let e=_t((o)=>o.mainLoopModel),t=_t((o)=>o.mainLoopModelForSession),n=P6e(),r=ay();return ppo.useMemo(()=>X9n(t,e),[t,e,n,r])}
function FE(){let e=_t((o)=>o.mainLoopModel),t=_t((o)=>o.mainLoopModelForSession),n=P6e(),r=ay();return ppo.useMemo(()=>parseUserSpecifiedModel(X9n(t,e)),[t,e,n,r])}
var ppo;
var V1=b(()=>{uo();Ro();eO();J9n();E$();ppo=x(et(),1)});
export {X9n,Sdt,FE,ppo,V1};
