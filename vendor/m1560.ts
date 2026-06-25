// @ts-nocheck
import {b} from "../runtime.ts";
function d7s(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in $Dr)t[n/2]=$Dr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}
function zAe(e){let t="";for(let n=0;n<e.byteLength;n++)t+=u7s[e[n]];return t}
var u7s,$Dr;
var qDr=b(()=>{u7s={},$Dr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;u7s[e]=t,$Dr[t]=e}});
export {d7s,zAe,u7s,$Dr,qDr};
