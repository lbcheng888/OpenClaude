// @ts-nocheck
import {Q} from "../runtime.ts";
import {pg} from "./m2138.ts";
import {Pba} from "./m3476.ts";
var DMn=Q((zj)=>{Object.defineProperty(zj,"__esModule",{value:!0});zj.getOtlpEncoder=zj.encodeAsString=zj.encodeAsLongBits=zj.toLongBits=zj.hrTimeToNanos=void 0;var fop=pg(),Iro=Pba();function xro(e){let t=BigInt(1e9);return BigInt(Math.trunc(e[0]))*t+BigInt(Math.trunc(e[1]))}zj.hrTimeToNanos=xro;function Lba(e){let t=Number(BigInt.asUintN(32,e)),n=Number(BigInt.asUintN(32,e>>BigInt(32)));return{low:t,high:n}}zj.toLongBits=Lba;function Dro(e){let t=xro(e);return Lba(t)}zj.encodeAsLongBits=Dro;function Mba(e){return xro(e).toString()}zj.encodeAsString=Mba;var hop=typeof BigInt<"u"?Mba:fop.hrTimeToNanoseconds;function Oba(e){return e}function Nba(e){if(e===void 0)return;return(0,Iro.hexToBinary)(e)}var gop={encodeHrTime:Dro,encodeSpanContext:Iro.hexToBinary,encodeOptionalSpanContext:Nba};function _op(e){if(e===void 0)return gop;let t=e.useLongBits??!0,n=e.useHex??!1;return{encodeHrTime:t?Dro:hop,encodeSpanContext:n?Oba:Iro.hexToBinary,encodeOptionalSpanContext:n?Oba:Nba}}zj.getOtlpEncoder=_op});
export {DMn};
