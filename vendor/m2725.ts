// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Tae(e,t,n,r){if(!t)return{effective:n,status:"valid"};let o=parseInt(t,10);if(isNaN(o)||o<=0){let s={effective:n,status:"invalid",message:`Invalid value "${t}" (using default: ${n})`};return logForDebugging(`${e} ${s.message}`),s}if(o>r){let s={effective:r,status:"capped",message:`Capped from ${o} to ${r}`};return logForDebugging(`${e} ${s.message}`),s}return{effective:o,status:"valid"}}
var Jtt=b(()=>{qe()});
export {Tae,Jtt};
