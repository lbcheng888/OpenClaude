// @ts-nocheck
import {X} from "../runtime.ts";
import {dno} from "./m3665.ts";
import {ZMn} from "./m3666.ts";
import {t1n} from "./m3667.ts";
var aEa=X((n1n)=>{Object.defineProperty(n1n,"__esModule",{value:!0});n1n.ExponentMapping=void 0;var Jit=dno(),zap=ZMn(),sEa=t1n();class iEa{_shift;constructor(e){this._shift=-e}mapToIndex(e){if(e<Jit.MIN_VALUE)return this._minNormalLowerBoundaryIndex();let t=Jit.getNormalBase2(e),n=this._rightShift(Jit.getSignificand(e)-1,Jit.SIGNIFICAND_WIDTH);return t+n>>this._shift}lowerBoundary(e){let t=this._minNormalLowerBoundaryIndex();if(e<t)throw new sEa.MappingError(`underflow: ${e} is < minimum lower boundary: ${t}`);let n=this._maxNormalLowerBoundaryIndex();if(e>n)throw new sEa.MappingError(`overflow: ${e} is > maximum lower boundary: ${n}`);return zap.ldexp(1,e<<this._shift)}get scale(){if(this._shift===0)return 0;return-this._shift}_minNormalLowerBoundaryIndex(){let e=Jit.MIN_NORMAL_EXPONENT>>this._shift;if(this._shift<2)e--;return e}_maxNormalLowerBoundaryIndex(){return Jit.MAX_NORMAL_EXPONENT>>this._shift}_rightShift(e,t){return Math.floor(e*Math.pow(2,-t))}}n1n.ExponentMapping=iEa});
export {aEa};
