// @ts-nocheck
import {b} from "../runtime.ts";
function HWd(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function IWd(e){return typeof e==="string"&&e.trim()!==""}
function tNt(e){if(!HWd(e))return null;let t=[],n={...e},r=[[xWd,"taskId"],[kWd,"activeForm"]];for(let[o,s]of r)for(let i of o)if(i in n&&!(s in n)&&IWd(n[i]))n[s]=n[i],delete n[i],t.push(`alias_${i}`);if(t.length===0)return null;return{input:n,shapeClass:t.join("+")}}
var xWd,kWd;
var MJr=b(()=>{xWd=["id","task_id"],kWd=["active_form"]});
export {HWd,IWd,tNt,xWd,kWd,MJr};
