// @ts-nocheck
import {Q} from "../runtime.ts";
import {xno} from "./m3383.ts";
import {vLn} from "./m3384.ts";
import {kLn} from "./m3385.ts";
var sya=Q((HLn)=>{Object.defineProperty(HLn,"__esModule",{value:!0});HLn.ExponentMapping=void 0;var Iat=xno(),ztp=vLn(),rya=kLn();class oya{_shift;constructor(e){this._shift=-e}mapToIndex(e){if(e<Iat.MIN_VALUE)return this._minNormalLowerBoundaryIndex();let t=Iat.getNormalBase2(e),n=this._rightShift(Iat.getSignificand(e)-1,Iat.SIGNIFICAND_WIDTH);return t+n>>this._shift}lowerBoundary(e){let t=this._minNormalLowerBoundaryIndex();if(e<t)throw new rya.MappingError(`underflow: ${e} is < minimum lower boundary: ${t}`);let n=this._maxNormalLowerBoundaryIndex();if(e>n)throw new rya.MappingError(`overflow: ${e} is > maximum lower boundary: ${n}`);return ztp.ldexp(1,e<<this._shift)}get scale(){if(this._shift===0)return 0;return-this._shift}_minNormalLowerBoundaryIndex(){let e=Iat.MIN_NORMAL_EXPONENT>>this._shift;if(this._shift<2)e--;return e}_maxNormalLowerBoundaryIndex(){return Iat.MAX_NORMAL_EXPONENT>>this._shift}_rightShift(e,t){return Math.floor(e*Math.pow(2,-t))}}HLn.ExponentMapping=oya});
export {sya};
