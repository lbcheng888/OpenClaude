// @ts-nocheck
import {OJe} from "./m1225.ts";
import {b} from "../runtime.ts";
import {Gkr} from "./m1231.ts";
var x1s=(e)=>{let t=[];for(let n in OJe){let r=OJe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},D1s=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var P1s=b(()=>{Gkr()});
export {x1s,D1s,P1s};
