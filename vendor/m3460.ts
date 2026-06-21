// @ts-nocheck
import {X} from "../runtime.ts";
var _fa=X((BPn)=>{Object.defineProperty(BPn,"__esModule",{value:!0});BPn.hexToBinary=void 0;function gfa(e){if(e>=48&&e<=57)return e-48;if(e>=97&&e<=102)return e-87;return e-55}function wKd(e){let t=new Uint8Array(e.length/2),n=0;for(let r=0;r<e.length;r+=2){let o=gfa(e.charCodeAt(r)),s=gfa(e.charCodeAt(r+1));t[n++]=o<<4|s}return t}BPn.hexToBinary=wKd});
export {_fa};
