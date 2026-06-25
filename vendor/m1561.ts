// @ts-nocheck
import {zAe,qDr} from "./m1560.ts";
import {b} from "../runtime.ts";
class $Xe{constructor(e){if(this.bytes=e,e.byteLength!==8)throw Error("Int64 buffers must be exactly 8 bytes")}static fromNumber(e){if(e>9223372036854776000||e<-9223372036854776000)throw Error(`${e} is too large (or, if negative, too small) to represent as an Int64`);let t=new Uint8Array(8);for(let n=7,r=Math.abs(Math.round(e));n>-1&&r>0;n--,r/=256)t[n]=r;if(e<0)p7s(t);return new $Xe(t)}valueOf(){let e=this.bytes.slice(0),t=e[0]&128;if(t)p7s(e);return parseInt(zAe(e),16)*(t?-1:1)}toString(){return String(this.valueOf())}}
function p7s(e){for(let t=0;t<8;t++)e[t]^=255;for(let t=7;t>-1;t--)if(e[t]++,e[t]!==0)break}
var WDr=b(()=>{qDr()});
export {$Xe,p7s,WDr};
