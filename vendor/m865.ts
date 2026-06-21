// @ts-nocheck
import {X} from "../runtime.ts";
import {Fus} from "./m864.ts";
var Qpe=X((con)=>{var F_r=Fus(),_su={step:"build",tags:["RECURSION_DETECTION"],name:"recursionDetectionMiddleware",override:!0,priority:"low"},ysu=(e)=>({applyToStack:(t)=>{t.add(F_r.recursionDetectionMiddleware(),_su)}});con.getRecursionDetectionPlugin=ysu;Object.keys(F_r).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(con,e))Object.defineProperty(con,e,{enumerable:!0,get:function(){return F_r[e]}})})});
export {Qpe};
