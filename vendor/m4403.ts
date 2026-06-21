// @ts-nocheck
import {b} from "../runtime.ts";
function T6n(){return{consecutiveDenials:0,totalDenials:0}}
function oel(e){return{...e,consecutiveDenials:e.consecutiveDenials+1,totalDenials:e.totalDenials+1}}
function Y4t(e){if(e.consecutiveDenials===0)return e;return{...e,consecutiveDenials:0}}
function sel(e){return e.consecutiveDenials>=y6n.maxConsecutive||e.totalDenials>=y6n.maxTotal}
var y6n;
var Mho=b(()=>{y6n={maxConsecutive:3,maxTotal:20}});
export {T6n,oel,Y4t,sel,y6n,Mho};
