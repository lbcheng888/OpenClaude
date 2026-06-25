// @ts-nocheck
import {eQi,tQi} from "./m3035.ts";
import {b} from "../runtime.ts";
function nQi(e){if(typeof e!=="object"||e===null)return!1;let t=e;while(Object.getPrototypeOf(t)!==null)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}
function rQi(...e){let t={};for(let n of e)for(let[r,o]of Object.entries(n)){let s=t[r];t[r]=nQi(s)&&nQi(o)?rQi(s,o):o}return t}
function Ige(...e){let t=[eQi,...e.filter((n)=>n!=null)];return rQi(...t)}
var sYr=b(()=>{tQi()});
export {nQi,rQi,Ige,sYr};
