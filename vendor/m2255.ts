// @ts-nocheck
import {getMainLoopModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {b} from "../runtime.ts";
function E9r(e){let t=e.trim();if(!t)return null;if(t.endsWith("-")){let s=parseInt(t.slice(0,-1),10);if(isNaN(s)||s<1)return null;return{firstPage:s,lastPage:1/0}}let n=t.indexOf("-");if(n===-1){let s=parseInt(t,10);if(isNaN(s)||s<1)return null;return{firstPage:s,lastPage:s}}let r=parseInt(t.slice(0,n),10),o=parseInt(t.slice(n+1),10);if(isNaN(r)||isNaN(o)||r<1||o<1||o<r)return null;return{firstPage:r,lastPage:o}}
function Oet(){return!getMainLoopModel().toLowerCase().includes("claude-3-haiku")}
function Let(e){let t=e.startsWith(".")?e.slice(1):e;return wcd.has(t.toLowerCase())}
var wcd;
var hEn=b(()=>{Ro();wcd=new Set(["pdf"])});
export {E9r,Oet,Let,wcd,hEn};
