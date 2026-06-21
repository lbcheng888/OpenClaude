// @ts-nocheck
import {aVi,lVi} from "./m3025.ts";
import {b} from "../runtime.ts";
function cVi(e){if(typeof e!=="object"||e===null)return!1;let t=e;while(Object.getPrototypeOf(t)!==null)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}
function uVi(...e){let t={};for(let n of e)for(let[r,o]of Object.entries(n)){let s=t[r];t[r]=cVi(s)&&cVi(o)?uVi(s,o):o}return t}
function yhe(...e){let t=[aVi,...e.filter((n)=>n!=null)];return uVi(...t)}
var CGr=b(()=>{lVi()});
export {cVi,uVi,yhe,CGr};
