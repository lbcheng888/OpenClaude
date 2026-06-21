// @ts-nocheck
import {dze} from "./m1030.ts";
import {b} from "../runtime.ts";
import {WSr} from "./m1036.ts";
var NEs=(e)=>{let t=[];for(let n in dze){let r=dze[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},BEs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var FEs=b(()=>{WSr()});
export {NEs,BEs,FEs};
