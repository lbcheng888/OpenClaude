// @ts-nocheck
import {X} from "../runtime.ts";
var zcr=X((_Ve)=>{Object.defineProperty(_Ve,"__esModule",{value:!0});_Ve.getRules=_Ve.isJSONType=void 0;var Svc=["string","number","integer","boolean","null","object","array"],bvc=new Set(Svc);function Evc(e){return typeof e=="string"&&bvc.has(e)}_Ve.isJSONType=Evc;function Cvc(){let e={number:{type:"number",rules:[]},string:{type:"string",rules:[]},array:{type:"array",rules:[]},object:{type:"object",rules:[]}};return{types:{...e,integer:!0,boolean:!0,null:!0},rules:[{rules:[]},e.number,e.string,e.array,e.object],post:{rules:[]},all:{},keywords:{}}}_Ve.getRules=Cvc});
export {zcr};
