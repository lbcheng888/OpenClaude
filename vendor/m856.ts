// @ts-nocheck
import {Q} from "../runtime.ts";
var vhs=Q((jEr)=>{var Rhs={},zEr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;Rhs[e]=t,zEr[t]=e}function Lfu(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in zEr)t[n/2]=zEr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}function Mfu(e){let t="";for(let n=0;n<e.byteLength;n++)t+=Rhs[e[n]];return t}jEr.fromHex=Lfu;jEr.toHex=Mfu});
export {vhs};
