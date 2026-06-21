// @ts-nocheck
import {_Ke} from "./m773.ts";
import {b} from "../runtime.ts";
import {pgr} from "./m779.ts";
var Pls=(e)=>{let t=[];for(let n in _Ke){let r=_Ke[n];if(e[r]===void 0)continue;t.push({algorithmId:()=>r,checksumConstructor:()=>e[r]})}return{addChecksumAlgorithm(n){t.push(n)},checksumAlgorithms(){return t}}},Ols=(e)=>{let t={};return e.checksumAlgorithms().forEach((n)=>{t[n.algorithmId()]=n.checksumConstructor()}),t};
var Lls=b(()=>{pgr()});
export {Pls,Ols,Lls};
