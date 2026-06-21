// @ts-nocheck
import {X} from "../runtime.ts";
var Vis=X((xgr)=>{var Gis={},Rgr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;Gis[e]=t,Rgr[t]=e}function btu(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in Rgr)t[n/2]=Rgr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}function Etu(e){let t="";for(let n=0;n<e.byteLength;n++)t+=Gis[e[n]];return t}xgr.fromHex=btu;xgr.toHex=Etu});
export {Vis};
