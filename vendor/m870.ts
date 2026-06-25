// @ts-nocheck
import {Q} from "../runtime.ts";
import {Pgs} from "./m869.ts";
var ime=Q((Kin)=>{var fCr=Pgs(),Ohu={step:"build",tags:["RECURSION_DETECTION"],name:"recursionDetectionMiddleware",override:!0,priority:"low"},Lhu=(e)=>({applyToStack:(t)=>{t.add(fCr.recursionDetectionMiddleware(),Ohu)}});Kin.getRecursionDetectionPlugin=Lhu;Object.keys(fCr).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(Kin,e))Object.defineProperty(Kin,e,{enumerable:!0,get:function(){return fCr[e]}})})});
export {ime};
