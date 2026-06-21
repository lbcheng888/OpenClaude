// @ts-nocheck
import {b} from "../runtime.ts";
function xHs(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in nCr)t[n/2]=nCr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}
function HEe(e){let t="";for(let n=0;n<e.byteLength;n++)t+=RHs[e[n]];return t}
var RHs,nCr;
var rCr=b(()=>{RHs={},nCr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;RHs[e]=t,nCr[t]=e}});
export {xHs,HEe,RHs,nCr,rCr};
