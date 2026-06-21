// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Cn,dr} from "./m231.ts";
import {wQa,Gqn,Qdt,Ydt,Xdt,Vqn,F6e} from "../src/telemetry/4376_condition.ts";
import {isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
var HPl={};
isFullscreenWithTTY(HPl,{call:()=>$fm});
var $fm=async(e,t)=>{let n=e.trim();if(n===""){let o=t.options.activeGoal;if(!o)return{type:"text",value:"No goal set. Usage: `/goal <condition>`"};let s=o.iterations===0?"not yet evaluated":`${o.iterations} ${Cn(o.iterations,"turn")}`,i=o.lastReason?`
${wQa(o.lastReason)}`:"";return{type:"text",value:`Goal active: ${o.condition} (${s})${i}`}}if(Gqn(n)){let o=Qdt(t);return{type:"text",value:o===null?"No goal set":`Goal cleared: ${o}`}}if(n.length>Ydt)return isTmuxControlMode("goal_set","too_long"),{type:"text",value:`Goal condition is limited to ${Ydt} characters (got ${n.length})`};let r=Xdt(n,t);if(r!==null)return{type:"text",value:r};return{type:"query",value:`Goal set: ${n}`,prompt:Vqn(n)}};
var IPl=b(()=>{ln();dr();F6e()});
export {HPl,$fm,IPl};
