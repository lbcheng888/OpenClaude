// @ts-nocheck
import {b} from "../runtime.ts";
function _ep(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function yep(e){return typeof e==="string"&&e.trim()!==""}
function xBt(e){if(!_ep(e))return null;let t=[],n={...e},r=[[hep,"taskId"],[gep,"activeForm"]];for(let[o,s]of r)for(let i of o)if(i in n&&!(s in n)&&yep(n[i]))n[s]=n[i],delete n[i],t.push(`alias_${i}`);if(t.length===0)return null;return{input:n,shapeClass:t.join("+")}}
var hep,gep;
var yto=b(()=>{hep=["id","task_id"],gep=["active_form"]});
export {_ep,yep,xBt,hep,gep,yto};
