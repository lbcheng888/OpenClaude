// @ts-nocheck
import {Q} from "../runtime.ts";
import {SOi} from "./m2513.ts";
import {Tie} from "./m2479.ts";
var AOi=Q((dvg,COi)=>{/*!
  Copyright 2013 Lovell Fuller and others.
  SPDX-License-Identifier: Apache-2.0
*/var GEd=SOi(),Che=Tie(),bOi={multiband:"multiband","b-w":"b-w",bw:"b-w",cmyk:"cmyk",srgb:"srgb"};function VEd(e){return this._setBackgroundColourOption("tint",e),this}function KEd(e){return this.options.greyscale=Che.bool(e)?e:!0,this}function zEd(e){return this.greyscale(e)}function jEd(e){if(!Che.string(e))throw Che.invalidParameterError("colourspace","string",e);return this.options.colourspacePipeline=e,this}function YEd(e){return this.pipelineColourspace(e)}function JEd(e){if(!Che.string(e))throw Che.invalidParameterError("colourspace","string",e);return this.options.colourspace=e,this}function XEd(e){return this.toColourspace(e)}function EOi(e){if(Che.object(e)||Che.string(e)&&e.length>=3&&e.length<=200){let t=GEd(e);return[t.red(),t.green(),t.blue(),Math.round(t.alpha()*255)]}else throw Che.invalidParameterError("background","object or string",e)}function QEd(e,t){if(Che.defined(t))this.options[e]=EOi(t)}COi.exports=(e)=>{Object.assign(e.prototype,{tint:VEd,greyscale:KEd,grayscale:zEd,pipelineColourspace:jEd,pipelineColorspace:YEd,toColourspace:JEd,toColorspace:XEd,_getBackgroundColourOption:EOi,_setBackgroundColourOption:QEd}),e.colourspace=bOi,e.colorspace=bOi}});
export {AOi};
