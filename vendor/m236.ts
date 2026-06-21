// @ts-nocheck
import {b} from "../runtime.ts";
function buildSystemPrompt(e,t,n){if(!(t>0))return e;let r=Bun.wrapAnsi(e,t,n);if(oyc.test(e)&&r.includes(`
`))return ayc(r);return r}
function ayc(e){let t="",n="",r="",o=0;Asr.lastIndex=0;let s;while((s=Asr.exec(e))!==null){t+=x3o(e.slice(o,s.index),n,r),t+=s[0],o=Asr.lastIndex;let i=s[1];if(i===""||i==="0")n="",r="";else if(i.startsWith("38;"))n=s[0];else if(syc.test(i))n="";else if(i.startsWith("48;"))r=s[0];else if(iyc.test(i))r=""}return t+=x3o(e.slice(o),n,r),t}
function x3o(e,t,n){if(e===""||t===""&&n==="")return e;let r="",o=0;for(let s=0;s<e.length;s++)if(e.charCodeAt(s)===10){if(r+=e.slice(o,s),t)r+="\x1B[39m";if(n)r+="\x1B[49m";r+=`
`+t+n,o=s+1}return r+=e.slice(o),r}
var oyc,Asr,syc,iyc;
var ope=b(()=>{oyc=/\x1b\[[34]8;[25];/;Asr=/\x1b\[([\d;]*)m/g,syc=/^(3[0-79]|9[0-7])$/,iyc=/^(4[0-79]|10[0-7])$/});
export {buildSystemPrompt,ayc,x3o,oyc,Asr,syc,iyc,ope};
