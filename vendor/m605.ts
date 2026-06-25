// @ts-nocheck
import {Q} from "../runtime.ts";
var ans=Q((A5)=>{Object.defineProperty(A5,"__esModule",{value:!0});A5.readFile=A5.fileIntercept=A5.filePromises=void 0;var Lnu=require("fs/promises");A5.filePromises={};A5.fileIntercept={};var Mnu=(e,t)=>{if(A5.fileIntercept[e]!==void 0)return A5.fileIntercept[e];if(!A5.filePromises[e]||t?.ignoreCache)A5.filePromises[e]=(0,Lnu.readFile)(e,"utf8");return A5.filePromises[e]};A5.readFile=Mnu});
export {ans};
