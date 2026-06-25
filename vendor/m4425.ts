// @ts-nocheck
import {b} from "../runtime.ts";
function BWn(){return{consecutiveDenials:0,totalDenials:0}}
function Kil(e){return{...e,consecutiveDenials:e.consecutiveDenials+1,totalDenials:e.totalDenials+1}}
function b5t(e){if(e.consecutiveDenials===0)return e;return{...e,consecutiveDenials:0}}
function zil(e){return e.consecutiveDenials>=FWn.maxConsecutive||e.totalDenials>=FWn.maxTotal}
var FWn;
var Hbo=b(()=>{FWn={maxConsecutive:3,maxTotal:20}});
export {BWn,Kil,b5t,zil,FWn,Hbo};
