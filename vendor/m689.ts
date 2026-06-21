// @ts-nocheck
import {b} from "../runtime.ts";
async function $bt(e,t,n,r){try{let o=await Tes.readFile(Ses.join(e,"config"),"utf-8");return Xfr(o,t,n,r)}catch{return null}}
function Xfr(e,t,n,r){let o=e.split(`
`),s=t.toLowerCase(),i=r.toLowerCase(),a=!1;for(let l of o){let c=l.trim();if(c.length===0||c[0]==="#"||c[0]===";")continue;if(c[0]==="["){a=wJc(c,s,n);continue}if(!a)continue;let u=EJc(c);if(u&&u.key.toLowerCase()===i)return u.value}return null}
function EJc(e){let t=0;while(t<e.length&&RJc(e[t]))t++;if(t===0)return null;let n=e.slice(0,t);while(t<e.length&&(e[t]===" "||e[t]==="\t"))t++;if(t>=e.length||e[t]!=="=")return null;t++;while(t<e.length&&(e[t]===" "||e[t]==="\t"))t++;let r=CJc(e,t);return{key:n,value:r}}
function CJc(e,t){let n="",r=!1,o=t;while(o<e.length){let s=e[o];if(!r&&(s==="#"||s===";"))break;if(s==='"'){r=!r,o++;continue}if(s==="\\"&&o+1<e.length){let i=e[o+1];if(r){switch(i){case"n":n+=`
`;break;case"t":n+="\t";break;case"b":n+="\b";break;case'"':n+='"';break;case"\\":n+="\\";break;default:n+=i;break}o+=2;continue}if(i==="\\"){n+="\\",o+=2;continue}}n+=s,o++}if(!r)n=vJc(n);return n}
function vJc(e){let t=e.length;while(t>0&&(e[t-1]===" "||e[t-1]==="\t"))t--;return e.slice(0,t)}
function wJc(e,t,n){let r=1;while(r<e.length&&e[r]!=="]"&&e[r]!==" "&&e[r]!=="\t"&&e[r]!=='"')r++;if(e.slice(1,r).toLowerCase()!==t)return!1;if(n===null)return r<e.length&&e[r]==="]";while(r<e.length&&(e[r]===" "||e[r]==="\t"))r++;if(r>=e.length||e[r]!=='"')return!1;r++;let s="";while(r<e.length&&e[r]!=='"'){if(e[r]==="\\"&&r+1<e.length){let i=e[r+1];if(i==="\\"||i==='"'){s+=i,r+=2;continue}s+=i,r+=2;continue}s+=e[r],r++}if(r>=e.length||e[r]!=='"')return!1;if(r++,r>=e.length||e[r]!=="]")return!1;return s===n}
function RJc(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"||e>="0"&&e<="9"||e==="-"}
var Tes,Ses;
var Dtn=b(()=>{Tes=require("fs/promises"),Ses=require("path")});
export {$bt,Xfr,EJc,CJc,vJc,wJc,RJc,Tes,Ses,Dtn};
