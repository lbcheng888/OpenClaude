// @ts-nocheck
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
var QKo=(e,t)=>{if(t.pipeStrategy==="input")return Ad(e.in._def,t);else if(t.pipeStrategy==="output")return Ad(e.out._def,t);let n=Ad(e.in._def,{...t,currentPath:[...t.currentPath,"allOf","0"]}),r=Ad(e.out._def,{...t,currentPath:[...t.currentPath,"allOf",n?"1":"0"]});return{allOf:[n,r].filter((o)=>o!==void 0)}};
var jmr=b(()=>{h0()});
export {QKo,jmr};
