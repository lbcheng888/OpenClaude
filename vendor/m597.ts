// @ts-nocheck
import {X} from "../runtime.ts";
import {kmr} from "./m596.ts";
var lJo=X((nbe)=>{Object.defineProperty(nbe,"__esModule",{value:!0});nbe.getSSOTokenFromFile=nbe.tokenIntercept=void 0;var u7c=require("fs/promises"),d7c=kmr();nbe.tokenIntercept={};var p7c=async(e)=>{if(nbe.tokenIntercept[e])return nbe.tokenIntercept[e];let t=(0,d7c.getSSOTokenFilepath)(e),n=await(0,u7c.readFile)(t,"utf8");return JSON.parse(n)};nbe.getSSOTokenFromFile=p7c});
export {lJo};
