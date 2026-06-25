// @ts-nocheck
import {b} from "../runtime.ts";
function ELs(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in xkr)t[n/2]=xkr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}
function pAe(e){let t="";for(let n=0;n<e.byteLength;n++)t+=bLs[e[n]];return t}
var bLs,xkr;
var Dkr=b(()=>{bLs={},xkr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;bLs[e]=t,xkr[t]=e}});
export {ELs,pAe,bLs,xkr,Dkr};
