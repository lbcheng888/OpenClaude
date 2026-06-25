// @ts-nocheck
import {lg} from "./m327.ts";
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
function PKo(e,t){let n={type:"integer",format:"int64"};if(!e.checks)return n;for(let r of e.checks)switch(r.kind){case"min":if(t.target==="jsonSchema7")if(r.inclusive)lg(n,"minimum",r.value,r.message,t);else lg(n,"exclusiveMinimum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMinimum=!0;lg(n,"minimum",r.value,r.message,t)}break;case"max":if(t.target==="jsonSchema7")if(r.inclusive)lg(n,"maximum",r.value,r.message,t);else lg(n,"exclusiveMaximum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMaximum=!0;lg(n,"maximum",r.value,r.message,t)}break;case"multipleOf":lg(n,"multipleOf",r.value,r.message,t);break}return n}
var Pmr=()=>{};
function OKo(){return{type:"boolean"}}
function zen(e,t){return Ad(e.type._def,t)}
var jen=b(()=>{h0()});
export {PKo,Pmr,OKo,zen,jen};
