// @ts-nocheck
import {lg} from "./m327.ts";
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
function Lmr(e,t,n){let r=n??t.dateStrategy;if(Array.isArray(r))return{anyOf:r.map((o,s)=>Lmr(e,t,o))};switch(r){case"string":case"format:date-time":return{type:"string",format:"date-time"};case"format:date":return{type:"string",format:"date"};case"integer":return IPc(e,t)}}
var IPc=(e,t)=>{let n={type:"integer",format:"unix-time"};if(t.target==="openApi3")return n;for(let r of e.checks)switch(r.kind){case"min":lg(n,"minimum",r.value,r.message,t);break;case"max":lg(n,"maximum",r.value,r.message,t);break}return n};
var Mmr=()=>{};
function MKo(e,t){return{...Ad(e.innerType._def,t),default:e.defaultValue()}}
var Nmr=b(()=>{h0()});
export {Lmr,IPc,Mmr,MKo,Nmr};
