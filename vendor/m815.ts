// @ts-nocheck
import {Q} from "../runtime.ts";
var Ups=Q((rEr)=>{var Bps={},nEr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;Bps[e]=t,nEr[t]=e}function Fdu(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in nEr)t[n/2]=nEr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}function Bdu(e){let t="";for(let n=0;n<e.byteLength;n++)t+=Bps[e[n]];return t}rEr.fromHex=Fdu;rEr.toHex=Bdu});
export {Ups};
