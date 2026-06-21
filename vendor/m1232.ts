// @ts-nocheck
import {Mze} from "./m1220.ts";
import {b} from "../runtime.ts";
import {ACr} from "./m1226.ts";
var N0s=(e)=>{let t=[];for(let n in Mze){let r=Mze[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},B0s=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var F0s=b(()=>{ACr()});
export {N0s,B0s,F0s};
