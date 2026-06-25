// @ts-nocheck
import {gYe} from "./m778.ts";
import {b} from "../runtime.ts";
import {$br} from "./m784.ts";
var wfs=(e)=>{let t=[];for(let n in gYe){let r=gYe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},kfs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var Hfs=b(()=>{$br()});
export {wfs,kfs,Hfs};
