// @ts-nocheck
import {Yd,JI} from "./m347.ts";
import {b} from "../runtime.ts";
function ijo(e,t){if(e.rest)return{type:"array",minItems:e.items.length,items:e.items.map((n,r)=>Yd(n._def,{...t,currentPath:[...t.currentPath,"items",`${r}`]})).reduce((n,r)=>r===void 0?n:[...n,r],[]),additionalItems:Yd(e.rest._def,{...t,currentPath:[...t.currentPath,"additionalItems"]})};else return{type:"array",minItems:e.items.length,maxItems:e.items.length,items:e.items.map((n,r)=>Yd(n._def,{...t,currentPath:[...t.currentPath,"items",`${r}`]})).reduce((n,r)=>r===void 0?n:[...n,r],[])}}
var Ccr=b(()=>{JI()});
export {ijo,Ccr};
