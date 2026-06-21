// @ts-nocheck
import {b} from "../runtime.ts";
function szc(e){var t=0,n=0;return function(){var r=ozc(),o=rzc-(r-n);if(n=r,o>0){if(++t>=nzc)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}
var nzc=800,rzc=16,ozc,TXo;
var SXo=b(()=>{ozc=Date.now;TXo=szc});
export {szc,nzc,rzc,ozc,TXo,SXo};
