// @ts-nocheck
import {b} from "../runtime.ts";
function Izt(e){return typeof e==="object"&&e!==null&&D_t in e}
function zrr(e,t){let n=new Set;if(e){for(let r of e)if(Izt(r))n.add(r[D_t])}if(t)for(let r of t){if(Izt(r))n.add(r[D_t]);if(Array.isArray(r.content)){for(let o of r.content)if(Izt(o))n.add(o[D_t])}}return Array.from(n)}
function Dzt(e,t){let n=zrr(e,t);if(n.length===0)return{};return{"x-stainless-helper":n.join(", ")}}
function D$o(e){if(Izt(e))return{"x-stainless-helper":e[D_t]};return{}}
var D_t;
var P_t=b(()=>{D_t=Symbol("anthropic.sdk.stainlessHelper")});
export {Izt,zrr,Dzt,D$o,D_t,P_t};
