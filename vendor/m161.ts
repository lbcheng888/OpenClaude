// @ts-nocheck
import {b} from "../runtime.ts";
function uXt(e){return typeof e==="object"&&e!==null&&ibt in e}
function Clr(e,t){let n=new Set;if(e){for(let r of e)if(uXt(r))n.add(r[ibt])}if(t)for(let r of t){if(uXt(r))n.add(r[ibt]);if(Array.isArray(r.content)){for(let o of r.content)if(uXt(o))n.add(o[ibt])}}return Array.from(n)}
function dXt(e,t){let n=Clr(e,t);if(n.length===0)return{};return{"x-stainless-helper":n.join(", ")}}
function C5o(e){if(uXt(e))return{"x-stainless-helper":e[ibt]};return{}}
var ibt;
var abt=b(()=>{ibt=Symbol("anthropic.sdk.stainlessHelper")});
export {uXt,Clr,dXt,C5o,ibt,abt};
