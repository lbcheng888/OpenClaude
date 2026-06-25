// @ts-nocheck
import {Q} from "../runtime.ts";
var azn=Q((fJ)=>{fJ.L={bit:1};fJ.M={bit:0};fJ.Q={bit:3};fJ.H={bit:2};function mim(e){if(typeof e!=="string")throw Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return fJ.L;case"m":case"medium":return fJ.M;case"q":case"quartile":return fJ.Q;case"h":case"high":return fJ.H;default:throw Error("Unknown EC Level: "+e)}}fJ.isValid=function(t){return t&&typeof t.bit<"u"&&t.bit>=0&&t.bit<4};fJ.from=function(t,n){if(fJ.isValid(t))return t;try{return mim(t)}catch(r){return n}}});
export {azn};
