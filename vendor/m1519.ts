// @ts-nocheck
import {b} from "../runtime.ts";
function qGs(e){if(e.length%2!==0)throw Error("Hex encoded strings must have an even number length");let t=new Uint8Array(e.length/2);for(let n=0;n<e.length;n+=2){let r=e.slice(n,n+2).toLowerCase();if(r in hDr)t[n/2]=hDr[r];else throw Error(`Cannot decode unrecognized sequence ${r} as hexadecimal`)}return t}
function AQ(e){let t="";for(let n=0;n<e.byteLength;n++)t+=$Gs[e[n]];return t}
var $Gs,hDr;
var rHt=b(()=>{$Gs={},hDr={};for(let e=0;e<256;e++){let t=e.toString(16).toLowerCase();if(t.length===1)t=`0${t}`;$Gs[e]=t,hDr[t]=e}});
export {qGs,AQ,$Gs,hDr,rHt};
