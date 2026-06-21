// @ts-nocheck
import {tYe} from "./m1301.ts";
import {b} from "../runtime.ts";
import {Hvr} from "./m1307.ts";
var _Ms=(e)=>{let t=[];for(let n in tYe){let r=tYe[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},yMs=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var TMs=b(()=>{Hvr()});
export {_Ms,yMs,TMs};
