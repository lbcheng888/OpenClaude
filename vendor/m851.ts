// @ts-nocheck
import {X} from "../runtime.ts";
var Dcs=X((y_r)=>{var Ics={},__r={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;Ics[e]=t,__r[t]=e}function you(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in __r)t[n/2]=__r[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}function Tou(e){let t="";for(let n=0;n<e.byteLength;n++)t+=Ics[e[n]];return t}y_r.fromHex=you;y_r.toHex=Tou});
export {Dcs};
