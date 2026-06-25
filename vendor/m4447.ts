// @ts-nocheck
import {b} from "../runtime.ts";
function dEo(e,t){if(!new RegExp(t,"i").test(e))return[];if(e.startsWith("/"))return[];let r=[],o=null,s=0,i=(u)=>!!u&&/[\p{L}\p{N}_]/u.test(u);for(let u=0;u<e.length;u++){let d=e[u];if(o){if(o==="["&&d==="["){s=u;continue}if(d!==zal[o])continue;if(o==="'"&&i(e[u+1]))continue;r.push({start:s,end:u+1}),o=null}else if(d==="<"&&u+1<e.length&&/[a-zA-Z/]/.test(e[u+1])||d==="'"&&!i(e[u-1])||d!=="<"&&d!=="'"&&d in zal)o=d,s=u}let a=[],l=new RegExp(`\\b${t}\\b`,"gi"),c=e.matchAll(l);for(let u of c){if(u.index===void 0)continue;let d=u.index,p=d+u[0].length;if(r.some((h)=>d>=h.start&&d<h.end))continue;let m=e[d-1],f=e[p];if(m==="/"||m==="\\"||m==="-")continue;if(f==="/"||f==="\\"||f==="-"||f==="?")continue;if(f==="."&&i(e[p+1]))continue;a.push({word:u[0],start:d,end:p})}return a}
function _Gn(e){return dEo(e,"ultraplan")}
function jal(e){return dEo(e,"ultrareview")}
function pEo(e){return dEo(e,"ultracode")}
function Yal(e){return _Gn(e).length>0}
function Jal(e){return pEo(e).length>0}
function yGn(e){let[t]=_Gn(e);if(!t)return e;let n=e.slice(0,t.start),r=e.slice(t.end);if(!(n+r).trim())return"";return n=n.replace(/\b(a)n(\s+)$/i,"$1$2"),n+t.word.slice(5)+r}
var zal;
var k5t=b(()=>{zal={"`":"`",'"':'"',"<":">","{":"}","[":"]","(":")","'":"'"}});
export {dEo,_Gn,jal,pEo,Yal,Jal,yGn,zal,k5t};
