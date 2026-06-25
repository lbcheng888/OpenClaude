// @ts-nocheck
import {Q} from "../runtime.ts";
var bfr=Q((gze)=>{Object.defineProperty(gze,"__esModule",{value:!0});gze.getRules=gze.isJSONType=void 0;var ROc=["string","number","integer","boolean","null","object","array"],vOc=new Set(ROc);function wOc(e){return typeof e=="string"&&vOc.has(e)}gze.isJSONType=wOc;function kOc(){let e={number:{type:"number",rules:[]},string:{type:"string",rules:[]},array:{type:"array",rules:[]},object:{type:"object",rules:[]}};return{types:{...e,integer:!0,boolean:!0,null:!0},rules:[{rules:[]},e.number,e.string,e.array,e.object],post:{rules:[]},all:{},keywords:{}}}gze.getRules=kOc});
export {bfr};
