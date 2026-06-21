// @ts-nocheck
import {og} from "./m325.ts";
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
function B6o(e,t){let n={type:"integer",format:"int64"};if(!e.checks)return n;for(let r of e.checks)switch(r.kind){case"min":if(t.target==="jsonSchema7")if(r.inclusive)og(n,"minimum",r.value,r.message,t);else og(n,"exclusiveMinimum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMinimum=!0;og(n,"minimum",r.value,r.message,t)}break;case"max":if(t.target==="jsonSchema7")if(r.inclusive)og(n,"maximum",r.value,r.message,t);else og(n,"exclusiveMaximum",r.value,r.message,t);else{if(!r.inclusive)n.exclusiveMaximum=!0;og(n,"maximum",r.value,r.message,t)}break;case"multipleOf":og(n,"multipleOf",r.value,r.message,t);break}return n}
var icr=()=>{};
function F6o(){return{type:"boolean"}}
function fQt(e,t){return Yd(e.type._def,t)}
var AQt=b(()=>{JI()});
export {B6o,icr,F6o,fQt,AQt};
