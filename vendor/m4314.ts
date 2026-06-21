// @ts-nocheck
import {b} from "../runtime.ts";
function k_e(e){let t=e.replace(Zmo,"");for(;;)if(t.startsWith("<#")){let n=t.indexOf("#>",2);if(n<0)break;t=t.slice(n+2).replace(Zmo,"")}else if(t.startsWith("#")){let n=t.search(/[\r\n]/);if(n<0)break;t=t.slice(n).replace(Zmo,"")}else break;return t}
function XL(e){return e.replace(P1p,"")}
function L6(e){return e.replace(/`[\r\n]+\s*/g,"").replace(/`(?:u\{([0-9a-fA-F]{1,6})\}|([\s\S]?))/g,(t,n,r)=>{if(n!==void 0){let o=parseInt(n,16);return o<=1114111?String.fromCodePoint(o):"\uFFFD"}return r??""})}
var T6e,Zmo,P1p;
var S6e=b(()=>{T6e=/[\s\u0085]+/,Zmo=/^[\s\u0085]+/,P1p=/^['"\u2018-\u201F]+|['"\u2018-\u201F]+$/g});
export {k_e,XL,L6,T6e,Zmo,P1p,S6e};
