// @ts-nocheck
import {aYe} from "./m1360.ts";
import {b} from "../runtime.ts";
import {rwr} from "./m1366.ts";
var aFs=(e)=>{let t=[];for(let n in aYe){let r=aYe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},lFs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var cFs=b(()=>{rwr()});
export {aFs,lFs,cFs};
