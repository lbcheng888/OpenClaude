// @ts-nocheck
import {b} from "../runtime.ts";
function XYu(){return{seconds:0,nanos:0}}
function Bmi(e){return e!==null&&e!==void 0}
var gHt;
var Z1r=b(()=>{gHt={fromJSON(e){return{seconds:Bmi(e.seconds)?globalThis.Number(e.seconds):0,nanos:Bmi(e.nanos)?globalThis.Number(e.nanos):0}},toJSON(e){let t={};if(e.seconds!==void 0)t.seconds=Math.round(e.seconds);if(e.nanos!==void 0)t.nanos=Math.round(e.nanos);return t},create(e){return gHt.fromPartial(e??{})},fromPartial(e){let t=XYu();return t.seconds=e.seconds??0,t.nanos=e.nanos??0,t}}});
export {XYu,Bmi,gHt,Z1r};
