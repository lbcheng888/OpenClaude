// @ts-nocheck
import {zKe} from "./m933.ts";
import {b} from "../runtime.ts";
import {CTr} from "./m939.ts";
var ngs=(e)=>{let t=[];for(let n in zKe){let r=zKe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},rgs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var ogs=b(()=>{CTr()});
export {ngs,rgs,ogs};
