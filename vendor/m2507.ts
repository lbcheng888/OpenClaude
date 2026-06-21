// @ts-nocheck
import {X} from "../runtime.ts";
import {_bn} from "./m2473.ts";
import {Cie} from "./m2469.ts";
import {f9r} from "./m2495.ts";
import {w0t} from "./m2496.ts";
import {u9r} from "./m2494.ts";
var fki=X((Pmh,mki)=>{/*!
  Copyright 2013 Lovell Fuller and others.
  SPDX-License-Identifier: Apache-2.0
*/var umd=require("events"),Hbn=_bn(),XK=Cie(),{runtimePlatformArch:dmd}=f9r(),w$=w0t(),dki=dmd(),w9r=w$.libvipsVersion(),Swe=w$.format();Swe.heif.output.alias=["avif","heic"];Swe.jpeg.output.alias=["jpe","jpg"];Swe.tiff.output.alias=["tif"];Swe.jp2k.output.alias=["j2c","j2k","jp2","jpx"];var pmd={nearest:"nearest",bilinear:"bilinear",bicubic:"bicubic",locallyBoundedBicubic:"lbb",nohalo:"nohalo",vertexSplitQuadraticBasisSpline:"vsqbs"},iet={vips:w9r.semver};if(!w9r.isGlobal)if(!w9r.isWasm)try{iet=require(`@img/sharp-${dki}/versions`)}catch(e){try{iet=require(`@img/sharp-libvips-${dki}/versions`)}catch(t){}}else try{iet=(()=>{throw new Error("Cannot require module "+"@img/sharp-wasm32/versions");})()}catch(e){}iet.sharp=u9r().version;if(iet.heif&&Swe.heif)Swe.heif.input.fileSuffix=[".avif"],Swe.heif.output.alias=["avif"];function pki(e){if(XK.bool(e))if(e)return w$.cache(50,20,100);else return w$.cache(0,0,0);else if(XK.object(e))return w$.cache(e.memory,e.files,e.items);else return w$.cache()}pki(!0);function mmd(e){return w$.concurrency(XK.integer(e)?e:null)}if(Hbn.familySync()===Hbn.GLIBC&&!w$._isUsingJemalloc())w$.concurrency(1);else if(Hbn.familySync()===Hbn.MUSL&&w$.concurrency()===1024)w$.concurrency(require("os").availableParallelism());var fmd=new umd.EventEmitter;function Amd(){return w$.counters()}function hmd(e){return w$.simd(XK.bool(e)?e:null)}function gmd(e){if(XK.object(e))if(Array.isArray(e.operation)&&e.operation.every(XK.string))w$.block(e.operation,!0);else throw XK.invalidParameterError("operation","Array<string>",e.operation);else throw XK.invalidParameterError("options","object",e)}function _md(e){if(XK.object(e))if(Array.isArray(e.operation)&&e.operation.every(XK.string))w$.block(e.operation,!1);else throw XK.invalidParameterError("operation","Array<string>",e.operation);else throw XK.invalidParameterError("options","object",e)}mki.exports=(e)=>{e.cache=pki,e.concurrency=mmd,e.counters=Amd,e.simd=hmd,e.format=Swe,e.interpolators=pmd,e.versions=iet,e.queue=fmd,e.block=gmd,e.unblock=_md}});
export {fki};
