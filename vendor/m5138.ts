// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Sn,lr} from "./m233.ts";
import {csl,uWn,Qmt,Ymt,Xmt,dWn,p8e} from "../src/telemetry/4398_condition.ts";
import {Pt,mn} from "../src/telemetry/0600_feature_name.ts";
var s2l={};
ft(s2l,{call:()=>QCm});
var QCm=async(e,t)=>{let n=e.trim();if(n===""){let o=t.options.activeGoal;if(!o)return{type:"text",value:"No goal set. Usage: `/goal <condition>`"};let s=o.iterations===0?"not yet evaluated":`${o.iterations} ${Sn(o.iterations,"turn")}`,i=o.lastReason?`
${csl(o.lastReason)}`:"";return{type:"text",value:`Goal active: ${o.condition} (${s})${i}`}}if(uWn(n)){let o=Qmt(t);return{type:"text",value:o===null?"No goal set":`Goal cleared: ${o}`}}if(n.length>Ymt)return Pt("goal_set","too_long"),{type:"text",value:`Goal condition is limited to ${Ymt} characters (got ${n.length})`};let r=Xmt(n,t);if(r!==null)return{type:"text",value:r};return{type:"query",value:`Goal set: ${n}`,prompt:dWn(n)}};
var i2l=b(()=>{mn();lr();p8e()});
export {s2l,QCm,i2l};
