// @ts-nocheck
import {X} from "../runtime.ts";
import {YXr} from "./m3367.ts";
import {PDn} from "./m3368.ts";
import {LDn} from "./m3369.ts";
var Wua=X((MDn)=>{Object.defineProperty(MDn,"__esModule",{value:!0});MDn.ExponentMapping=void 0;var Pst=YXr(),iVd=PDn(),qua=LDn();class jua{_shift;constructor(e){this._shift=-e}mapToIndex(e){if(e<Pst.MIN_VALUE)return this._minNormalLowerBoundaryIndex();let t=Pst.getNormalBase2(e),n=this._rightShift(Pst.getSignificand(e)-1,Pst.SIGNIFICAND_WIDTH);return t+n>>this._shift}lowerBoundary(e){let t=this._minNormalLowerBoundaryIndex();if(e<t)throw new qua.MappingError(`underflow: ${e} is < minimum lower boundary: ${t}`);let n=this._maxNormalLowerBoundaryIndex();if(e>n)throw new qua.MappingError(`overflow: ${e} is > maximum lower boundary: ${n}`);return iVd.ldexp(1,e<<this._shift)}get scale(){if(this._shift===0)return 0;return-this._shift}_minNormalLowerBoundaryIndex(){let e=Pst.MIN_NORMAL_EXPONENT>>this._shift;if(this._shift<2)e--;return e}_maxNormalLowerBoundaryIndex(){return Pst.MAX_NORMAL_EXPONENT>>this._shift}_rightShift(e,t){return Math.floor(e*Math.pow(2,-t))}}MDn.ExponentMapping=jua});
export {Wua};
