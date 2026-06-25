// @ts-nocheck
import {Q} from "../runtime.ts";
import {zio} from "./m3681.ts";
import {KFn} from "./m3682.ts";
import {jFn} from "./m3683.ts";
var EIa=Q((YFn)=>{Object.defineProperty(YFn,"__esModule",{value:!0});YFn.ExponentMapping=void 0;var zlt=zio(),Lyp=KFn(),SIa=jFn();class bIa{_shift;constructor(e){this._shift=-e}mapToIndex(e){if(e<zlt.MIN_VALUE)return this._minNormalLowerBoundaryIndex();let t=zlt.getNormalBase2(e),n=this._rightShift(zlt.getSignificand(e)-1,zlt.SIGNIFICAND_WIDTH);return t+n>>this._shift}lowerBoundary(e){let t=this._minNormalLowerBoundaryIndex();if(e<t)throw new SIa.MappingError(`underflow: ${e} is < minimum lower boundary: ${t}`);let n=this._maxNormalLowerBoundaryIndex();if(e>n)throw new SIa.MappingError(`overflow: ${e} is > maximum lower boundary: ${n}`);return Lyp.ldexp(1,e<<this._shift)}get scale(){if(this._shift===0)return 0;return-this._shift}_minNormalLowerBoundaryIndex(){let e=zlt.MIN_NORMAL_EXPONENT>>this._shift;if(this._shift<2)e--;return e}_maxNormalLowerBoundaryIndex(){return zlt.MAX_NORMAL_EXPONENT>>this._shift}_rightShift(e,t){return Math.floor(e*Math.pow(2,-t))}}YFn.ExponentMapping=bIa});
export {EIa};
