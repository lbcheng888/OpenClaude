// @ts-nocheck
import {oXe} from "./m1365.ts";
import {b} from "../runtime.ts";
import {DIr} from "./m1371.ts";
var n4s=(e)=>{let t=[];for(let n in oXe){let r=oXe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},r4s=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var o4s=b(()=>{DIr()});
export {n4s,r4s,o4s};
