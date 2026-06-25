// @ts-nocheck
import {cJe} from "./m1035.ts";
import {b} from "../runtime.ts";
import {Tvr} from "./m1041.ts";
var xHs=(e)=>{let t=[];for(let n in cJe){let r=cJe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},DHs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var PHs=b(()=>{Tvr()});
export {xHs,DHs,PHs};
