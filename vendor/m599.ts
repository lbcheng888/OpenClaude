// @ts-nocheck
import {X} from "../runtime.ts";
var uJo=X((l8)=>{Object.defineProperty(l8,"__esModule",{value:!0});l8.readFile=l8.fileIntercept=l8.filePromises=void 0;var _7c=require("fs/promises");l8.filePromises={};l8.fileIntercept={};var y7c=(e,t)=>{if(l8.fileIntercept[e]!==void 0)return l8.fileIntercept[e];if(!l8.filePromises[e]||t?.ignoreCache)l8.filePromises[e]=(0,_7c.readFile)(e,"utf8");return l8.filePromises[e]};l8.readFile=y7c});
export {uJo};
