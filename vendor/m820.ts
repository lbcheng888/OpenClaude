// @ts-nocheck
import {Q} from "../runtime.ts";
import {Avt} from "./m795.ts";
import {BS} from "./m793.ts";
import {zbr} from "./m796.ts";
import {mps} from "./m800.ts";
import {Sps} from "./m803.ts";
import {bps} from "./m804.ts";
import {Aps} from "./m806.ts";
import {Kps} from "./m817.ts";
import {Jps} from "./m819.ts";
import {bCe} from "./m797.ts";
var aEr=Q((jP)=>{var Xps=Avt(),Qps=BS(),Zps=zbr(),ems=mps(),tms=Sps(),nms=bps(),rms=Aps(),oms=Kps(),sms=Jps(),ims=bCe();class vvt extends Uint8Array{static fromString(e,t="utf-8"){if(typeof e==="string"){if(t==="base64")return vvt.mutate(Xps.fromBase64(e));return vvt.mutate(Qps.fromUtf8(e))}throw Error(`Unsupported conversion from ${typeof e} to Uint8ArrayBlobAdapter.`)}static mutate(e){return Object.setPrototypeOf(e,vvt.prototype),e}transformToString(e="utf-8"){if(e==="base64")return Xps.toBase64(this);return Qps.toUtf8(this)}}jP.Uint8ArrayBlobAdapter=vvt;Object.keys(Zps).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return Zps[e]}})});Object.keys(ems).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return ems[e]}})});Object.keys(tms).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return tms[e]}})});Object.keys(nms).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return nms[e]}})});Object.keys(rms).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return rms[e]}})});Object.keys(oms).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return oms[e]}})});Object.keys(sms).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return sms[e]}})});Object.keys(ims).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(jP,e))Object.defineProperty(jP,e,{enumerable:!0,get:function(){return ims[e]}})})});
export {aEr};
