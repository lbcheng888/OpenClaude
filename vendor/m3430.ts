// @ts-nocheck
import {y_e,uMn} from "./m3426.ts";
import {b,x} from "../runtime.ts";
import {xi} from "./m2096.ts";
class dMn{_ratio;_upperBound;constructor(e=0){this._ratio=e,this._ratio=this._normalize(e),this._upperBound=Math.floor(this._ratio*4294967295)}shouldSample(e,t){return{decision:YTa.isValidTraceId(t)&&this._accumulate(t)<this._upperBound?y_e.RECORD_AND_SAMPLED:y_e.NOT_RECORD}}toString(){return`TraceIdRatioBased{${this._ratio}}`}_normalize(e){if(typeof e!=="number"||isNaN(e))return 0;return e>=1?1:e<=0?0:e}_accumulate(e){let t=0;for(let n=0;n<e.length/8;n++){let r=n*8,o=parseInt(e.slice(r,r+8),16);t=(t^o)>>>0}return t}}
var YTa;
var JTa=b(()=>{uMn();YTa=x(xi(),1)});
export {dMn,YTa,JTa};
