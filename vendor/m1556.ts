// @ts-nocheck
import {uCe,pkr} from "./m1555.ts";
import {b} from "../runtime.ts";
class jYe{constructor(e){if(this.bytes=e,e.byteLength!==8)throw Error("Int64 buffers must be exactly 8 bytes")}static fromNumber(e){if(e>9223372036854776000||e<-9223372036854776000)throw Error(`${e} is too large (or, if negative, too small) to represent as an Int64`);let t=new Uint8Array(8);for(let n=7,r=Math.abs(Math.round(e));n>-1&&r>0;n--,r/=256)t[n]=r;if(e<0)gjs(t);return new jYe(t)}valueOf(){let e=this.bytes.slice(0),t=e[0]&128;if(t)gjs(e);return parseInt(uCe(e),16)*(t?-1:1)}toString(){return String(this.valueOf())}}
function gjs(e){for(let t=0;t<8;t++)e[t]^=255;for(let t=7;t>-1;t--)if(e[t]++,e[t]!==0)break}
var mkr=b(()=>{pkr()});
export {jYe,gjs,mkr};
