// @ts-nocheck
import {fw,QV} from "./m325.ts";
import {b} from "../runtime.ts";
function z6o(e){let t=e.values,r=Object.keys(e.values).filter((s)=>typeof t[t[s]]!=="number").map((s)=>t[s]),o=Array.from(new Set(r.map((s)=>typeof s)));return{type:o.length===1?o[0]==="string"?"string":"number":["string","number"],enum:r}}
function Y6o(e){return e.target==="openAi"?void 0:{not:fw({...e,currentPath:[...e.currentPath,"not"]})}}
var hcr=b(()=>{QV()});
export {z6o,Y6o,hcr};
