// @ts-nocheck
import {X} from "../runtime.ts";
import {ag} from "./m2133.ts";
import {_fa} from "./m3460.ts";
var FPn=X((hY)=>{Object.defineProperty(hY,"__esModule",{value:!0});hY.getOtlpEncoder=hY.encodeAsString=hY.encodeAsLongBits=hY.toLongBits=hY.hrTimeToNanos=void 0;var RKd=ag(),zQr=_fa();function YQr(e){let t=BigInt(1e9);return BigInt(Math.trunc(e[0]))*t+BigInt(Math.trunc(e[1]))}hY.hrTimeToNanos=YQr;function Tfa(e){let t=Number(BigInt.asUintN(32,e)),n=Number(BigInt.asUintN(32,e>>BigInt(32)));return{low:t,high:n}}hY.toLongBits=Tfa;function JQr(e){let t=YQr(e);return Tfa(t)}hY.encodeAsLongBits=JQr;function Sfa(e){return YQr(e).toString()}hY.encodeAsString=Sfa;var xKd=typeof BigInt<"u"?Sfa:RKd.hrTimeToNanoseconds;function yfa(e){return e}function bfa(e){if(e===void 0)return;return(0,zQr.hexToBinary)(e)}var kKd={encodeHrTime:JQr,encodeSpanContext:zQr.hexToBinary,encodeOptionalSpanContext:bfa};function HKd(e){if(e===void 0)return kKd;let t=e.useLongBits??!0,n=e.useHex??!1;return{encodeHrTime:t?JQr:xKd,encodeSpanContext:n?yfa:zQr.hexToBinary,encodeOptionalSpanContext:n?yfa:bfa}}hY.getOtlpEncoder=HKd});
export {FPn};
