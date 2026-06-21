// @ts-nocheck
import {X} from "../runtime.ts";
var FUl=X((BUl)=>{function bCm(e,t){if(Math.abs(e.length-t.length)>3)return Math.max(e.length,t.length);let n=[];for(let r=0;r<=e.length;r++)n[r]=[r];for(let r=0;r<=t.length;r++)n[0][r]=r;for(let r=1;r<=t.length;r++)for(let o=1;o<=e.length;o++){let s=1;if(e[o-1]===t[r-1])s=0;else s=1;if(n[o][r]=Math.min(n[o-1][r]+1,n[o][r-1]+1,n[o-1][r-1]+s),o>1&&r>1&&e[o-1]===t[r-2]&&e[o-2]===t[r-1])n[o][r]=Math.min(n[o][r],n[o-2][r-2]+1)}return n[e.length][t.length]}function ECm(e,t){if(!t||t.length===0)return"";t=Array.from(new Set(t));let n=e.startsWith("--");if(n)e=e.slice(2),t=t.map((i)=>i.slice(2));let r=[],o=3,s=0.4;if(t.forEach((i)=>{if(i.length<=1)return;let a=bCm(e,i),l=Math.max(e.length,i.length);if((l-a)/l>s){if(a<o)o=a,r=[i];else if(a===o)r.push(i)}}),r.sort((i,a)=>i.localeCompare(a)),n)r=r.map((i)=>`--${i}`);if(r.length>1)return`
(Did you mean one of ${r.join(", ")}?)`;if(r.length===1)return`
(Did you mean ${r[0]}?)`;return""}BUl.suggestSimilar=ECm});
export {FUl};
