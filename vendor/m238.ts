// @ts-nocheck
import {b} from "../runtime.ts";
function DN(e,t,n){if(!(t>0))return e;let r=Bun.wrapAnsi(e,t,n);if(lHc.test(e)&&r.includes(`
`))return dHc(r);return r}
function dHc(e){let t="",n="",r="",o=0;Wcr.lastIndex=0;let s;while((s=Wcr.exec(e))!==null){t+=CWo(e.slice(o,s.index),n,r),t+=s[0],o=Wcr.lastIndex;let i=s[1];if(i===""||i==="0")n="",r="";else if(i.startsWith("38;"))n=s[0];else if(cHc.test(i))n="";else if(i.startsWith("48;"))r=s[0];else if(uHc.test(i))r=""}return t+=CWo(e.slice(o),n,r),t}
function CWo(e,t,n){if(e===""||t===""&&n==="")return e;let r="",o=0;for(let s=0;s<e.length;s++)if(e.charCodeAt(s)===10){if(r+=e.slice(o,s),t)r+="\x1B[39m";if(n)r+="\x1B[49m";r+=`
`+t+n,o=s+1}return r+=e.slice(o),r}
var lHc,Wcr,cHc,uHc;
var ppe=b(()=>{lHc=/\x1b\[[34]8;[25];/;Wcr=/\x1b\[([\d;]*)m/g,cHc=/^(3[0-79]|9[0-7])$/,uHc=/^(4[0-79]|10[0-7])$/});
export {DN,dHc,CWo,lHc,Wcr,cHc,uHc,ppe};
