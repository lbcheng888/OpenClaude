// @ts-nocheck
import {KYe} from "./m938.ts";
import {b} from "../runtime.ts";
import {ZAr} from "./m944.ts";
var JEs=(e)=>{let t=[];for(let n in KYe){let r=KYe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},XEs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var QEs=b(()=>{ZAr()});
export {JEs,XEs,QEs};
