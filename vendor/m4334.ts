// @ts-nocheck
import {b} from "../runtime.ts";
function Vte(e){let t=e.replace(Xyo,"");for(;;)if(t.startsWith("<#")){let n=t.indexOf("#>",2);if(n<0)break;t=t.slice(n+2).replace(Xyo,"")}else if(t.startsWith("#")){let n=t.search(/[\r\n]/);if(n<0)break;t=t.slice(n).replace(Xyo,"")}else break;return t}
function QD(e){return e.replace(i4p,"")}
function e6(e){return e.replace(/`[\r\n]+\s*/g,"").replace(/`(?:u\{([0-9a-fA-F]{1,6})\}|([\s\S]?))/g,(t,n,r)=>{if(n!==void 0){let o=parseInt(n,16);return o<=1114111?String.fromCodePoint(o):"\uFFFD"}return r??""})}
var K5e,Xyo,i4p;
var z5e=b(()=>{K5e=/[\s\u0085]+/,Xyo=/^[\s\u0085]+/,i4p=/^['"\u2018-\u201F]+|['"\u2018-\u201F]+$/g});
export {Vte,QD,e6,K5e,Xyo,i4p,z5e};
