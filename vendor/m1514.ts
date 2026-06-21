// @ts-nocheck
import {b} from "../runtime.ts";
function K4s(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in Fxr)t[n/2]=Fxr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}
function xQ(e){let t="";for(let n=0;n<e.byteLength;n++)t+=V4s[e[n]];return t}
var V4s,Fxr;
var Hwt=b(()=>{V4s={},Fxr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;V4s[e]=t,Fxr[t]=e}});
export {K4s,xQ,V4s,Fxr,Hwt};
