// @ts-nocheck
import {Q} from "../runtime.ts";
import {oyr} from "./m602.ts";
var sns=Q((NEe)=>{Object.defineProperty(NEe,"__esModule",{value:!0});NEe.getSSOTokenFromFile=NEe.tokenIntercept=void 0;var wnu=require("fs/promises"),knu=oyr();NEe.tokenIntercept={};var Hnu=async(e)=>{if(NEe.tokenIntercept[e])return NEe.tokenIntercept[e];let t=(0,knu.getSSOTokenFilepath)(e),n=await(0,wnu.readFile)(t,"utf8");return JSON.parse(n)};NEe.getSSOTokenFromFile=Hnu});
export {sns};
