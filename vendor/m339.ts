// @ts-nocheck
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
var rjo=(e,t)=>{if(t.pipeStrategy==="input")return Yd(e.in._def,t);else if(t.pipeStrategy==="output")return Yd(e.out._def,t);let n=Yd(e.in._def,{...t,currentPath:[...t.currentPath,"allOf","0"]}),r=Yd(e.out._def,{...t,currentPath:[...t.currentPath,"allOf",n?"1":"0"]});return{allOf:[n,r].filter((o)=>o!==void 0)}};
var Scr=b(()=>{JI()});
export {rjo,Scr};
