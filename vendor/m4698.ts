// @ts-nocheck
import {X} from "../runtime.ts";
var SWn=X((vJ)=>{vJ.L={bit:1};vJ.M={bit:0};vJ.Q={bit:3};vJ.H={bit:2};function eXp(e){if(typeof e!=="string")throw Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return vJ.L;case"m":case"medium":return vJ.M;case"q":case"quartile":return vJ.Q;case"h":case"high":return vJ.H;default:throw Error("Unknown EC Level: "+e)}}vJ.isValid=function(t){return t&&typeof t.bit<"u"&&t.bit>=0&&t.bit<4};vJ.from=function(t,n){if(vJ.isValid(t))return t;try{return eXp(t)}catch(r){return n}}});
export {SWn};
