// @ts-nocheck
import {b} from "../runtime.ts";
function jwt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)&&!(e instanceof RegExp)&&!(e instanceof Date)}
function CNe(e){if(jwt(e)){let t=typeof e.name==="string",n=typeof e.message==="string";return t&&n}return!1}
var uHr=()=>{};
var P5s,O5s;
var L5s=b(()=>{P5s=require("util"),O5s=P5s.inspect.custom});
export {jwt,CNe,uHr,P5s,O5s,L5s};
