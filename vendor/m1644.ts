// @ts-nocheck
import {b} from "../runtime.ts";
function gHt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)&&!(e instanceof RegExp)&&!(e instanceof Date)}
function SFe(e){if(gHt(e)){let t=typeof e.name==="string",n=typeof e.message==="string";return t&&n}return!1}
var UPr=()=>{};
var kjs,Hjs;
var Ijs=b(()=>{kjs=require("util"),Hjs=kjs.inspect.custom});
export {gHt,SFe,UPr,kjs,Hjs,Ijs};
