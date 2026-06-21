// @ts-nocheck
import {getMainLoopModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {b} from "../runtime.ts";
function GBr(e){let t=e.trim();if(!t)return null;if(t.endsWith("-")){let s=parseInt(t.slice(0,-1),10);if(isNaN(s)||s<1)return null;return{firstPage:s,lastPage:1/0}}let n=t.indexOf("-");if(n===-1){let s=parseInt(t,10);if(isNaN(s)||s<1)return null;return{firstPage:s,lastPage:s}}let r=parseInt(t.slice(0,n),10),o=parseInt(t.slice(n+1),10);if(isNaN(r)||isNaN(o)||r<1||o<1||o<r)return null;return{firstPage:r,lastPage:o}}
function PQe(){return!getMainLoopModel().toLowerCase().includes("claude-3-haiku")}
function OQe(e){let t=e.startsWith(".")?e.slice(1):e;return rZu.has(t.toLowerCase())}
var rZu;
var Dyn=b(()=>{Mo();rZu=new Set(["pdf"])});
export {GBr,PQe,OQe,rZu,Dyn};
