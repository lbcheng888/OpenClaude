// @ts-nocheck
import {b} from "../runtime.ts";
function _id(){return{seconds:0,nanos:0}}
function PTi(e){return e!==null&&e!==void 0}
var Gxt;
var v2r=b(()=>{Gxt={fromJSON(e){return{seconds:PTi(e.seconds)?globalThis.Number(e.seconds):0,nanos:PTi(e.nanos)?globalThis.Number(e.nanos):0}},toJSON(e){let t={};if(e.seconds!==void 0)t.seconds=Math.round(e.seconds);if(e.nanos!==void 0)t.nanos=Math.round(e.nanos);return t},create(e){return Gxt.fromPartial(e??{})},fromPartial(e){let t=_id();return t.seconds=e.seconds??0,t.nanos=e.nanos??0,t}}});
export {_id,PTi,Gxt,v2r};
