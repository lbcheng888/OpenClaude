// @ts-nocheck
import {gc,bo,_t,uo} from "./m2468.ts";
import {shellToolNames,isReplMode} from "./m4331.ts";
import {OBo,LQl} from "./m5464.ts";
import {bdo,u6e} from "./m3968.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function NQl({enabled:e}){let t=gc(),n=bo(),r=shellToolNames(),o=_t((s)=>s.plugins.enabled);MQl.useEffect(()=>{if(!e)return;let s=()=>({abortController:new AbortController,taskRegistry:r});return OBo(o,(i)=>i.when==="always",s()),bdo.subscribe((i)=>{OBo(t.getState().plugins.enabled,(a)=>a.when===`on-skill-invoke:${i}`,s())})},[e,o,t,n,r])}
var MQl;
var FQl=b(()=>{uo();isReplMode();LQl();u6e();MQl=x(et(),1)});
export {NQl,MQl,FQl};
