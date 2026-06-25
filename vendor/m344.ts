// @ts-nocheck
import {Ad,h0} from "./m349.ts";
import {b} from "../runtime.ts";
function t7o(e,t){if(e.rest)return{type:"array",minItems:e.items.length,items:e.items.map((n,r)=>Ad(n._def,{...t,currentPath:[...t.currentPath,"items",`${r}`]})).reduce((n,r)=>r===void 0?n:[...n,r],[]),additionalItems:Ad(e.rest._def,{...t,currentPath:[...t.currentPath,"additionalItems"]})};else return{type:"array",minItems:e.items.length,maxItems:e.items.length,items:e.items.map((n,r)=>Ad(n._def,{...t,currentPath:[...t.currentPath,"items",`${r}`]})).reduce((n,r)=>r===void 0?n:[...n,r],[])}}
var Xmr=b(()=>{h0()});
export {t7o,Xmr};
