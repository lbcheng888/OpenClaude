// @ts-nocheck
import {G6n,mgo} from "./m4419.ts";
import {b} from "../runtime.ts";
function O0e(e){return G6n(e.viewingAgentTaskId,e.tasks).teammate}
function eqt(e){let{teammate:t,localAgent:n}=G6n(e.viewingAgentTaskId,e.tasks);if(t)return{type:"viewed",task:t};if(n)return{type:"named_agent",task:n};return{type:"leader"}}
var tqt=b(()=>{mgo()});
export {O0e,eqt,tqt};
