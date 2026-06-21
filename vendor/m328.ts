// @ts-nocheck
import {og} from "./m325.ts";
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
function lcr(e,t,n){let r=n??t.dateStrategy;if(Array.isArray(r))return{anyOf:r.map((o,s)=>lcr(e,t,o))};switch(r){case"string":case"format:date-time":return{type:"string",format:"date-time"};case"format:date":return{type:"string",format:"date"};case"integer":return wCc(e,t)}}
var wCc=(e,t)=>{let n={type:"integer",format:"unix-time"};if(t.target==="openApi3")return n;for(let r of e.checks)switch(r.kind){case"min":og(n,"minimum",r.value,r.message,t);break;case"max":og(n,"maximum",r.value,r.message,t);break}return n};
var ccr=()=>{};
function $6o(e,t){return{...Yd(e.innerType._def,t),default:e.defaultValue()}}
var ucr=b(()=>{JI()});
export {lcr,wCc,ccr,$6o,ucr};
