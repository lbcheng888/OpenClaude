// @ts-nocheck
import {Q} from "../runtime.ts";
var Pba=Q((xMn)=>{Object.defineProperty(xMn,"__esModule",{value:!0});xMn.hexToBinary=void 0;function Dba(e){if(e>=48&&e<=57)return e-48;if(e>=97&&e<=102)return e-87;return e-55}function mop(e){let t=new Uint8Array(e.length/2),n=0;for(let r=0;r<e.length;r+=2){let o=Dba(e.charCodeAt(r)),s=Dba(e.charCodeAt(r+1));t[n++]=o<<4|s}return t}xMn.hexToBinary=mop});
export {Pba};
