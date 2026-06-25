// @ts-nocheck
import {QJe} from "./m1306.ts";
import {b} from "../runtime.ts";
import {sIr} from "./m1312.ts";
var m2s=(e)=>{let t=[];for(let n in QJe){let r=QJe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},f2s=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var h2s=b(()=>{sIr()});
export {m2s,f2s,h2s};
