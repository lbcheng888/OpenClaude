// @ts-nocheck
import {X} from "../runtime.ts";
import {XEt} from "./m790.ts";
import {FS} from "./m788.ts";
import {_gr} from "./m791.ts";
import {yis} from "./m795.ts";
import {wis} from "./m798.ts";
import {Ris} from "./m799.ts";
import {His} from "./m801.ts";
import {Qis} from "./m812.ts";
import {nas} from "./m814.ts";
import {Fbe} from "./m792.ts";
var Dgr=X((kO)=>{var ras=XEt(),oas=FS(),sas=_gr(),ias=yis(),aas=wis(),las=Ris(),cas=His(),uas=Qis(),das=nas(),pas=Fbe();class ZEt extends Uint8Array{static fromString(e,t="utf-8"){if(typeof e==="string"){if(t==="base64")return ZEt.mutate(ras.fromBase64(e));return ZEt.mutate(oas.fromUtf8(e))}throw Error(`Unsupported conversion from ${typeof e} to Uint8ArrayBlobAdapter.`)}static mutate(e){return Object.setPrototypeOf(e,ZEt.prototype),e}transformToString(e="utf-8"){if(e==="base64")return ras.toBase64(this);return oas.toUtf8(this)}}kO.Uint8ArrayBlobAdapter=ZEt;Object.keys(sas).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return sas[e]}})});Object.keys(ias).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return ias[e]}})});Object.keys(aas).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return aas[e]}})});Object.keys(las).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return las[e]}})});Object.keys(cas).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return cas[e]}})});Object.keys(uas).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return uas[e]}})});Object.keys(das).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return das[e]}})});Object.keys(pas).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(kO,e))Object.defineProperty(kO,e,{enumerable:!0,get:function(){return pas[e]}})})});
export {Dgr};
