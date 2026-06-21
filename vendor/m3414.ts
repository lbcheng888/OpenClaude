// @ts-nocheck
import {oge,gPn} from "./m3410.ts";
import {b,M} from "../runtime.ts";
import {Xi} from "./m2091.ts";
class _Pn{_ratio;_upperBound;constructor(e=0){this._ratio=e,this._ratio=this._normalize(e),this._upperBound=Math.floor(this._ratio*4294967295)}shouldSample(e,t){return{decision:Opa.isValidTraceId(t)&&this._accumulate(t)<this._upperBound?oge.RECORD_AND_SAMPLED:oge.NOT_RECORD}}toString(){return`TraceIdRatioBased{${this._ratio}}`}_normalize(e){if(typeof e!=="number"||isNaN(e))return 0;return e>=1?1:e<=0?0:e}_accumulate(e){let t=0;for(let n=0;n<e.length/8;n++){let r=n*8,o=parseInt(e.slice(r,r+8),16);t=(t^o)>>>0}return t}}
var Opa;
var Lpa=b(()=>{gPn();Opa=M(Xi(),1)});
export {_Pn,Opa,Lpa};
