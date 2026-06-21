// @ts-nocheck
import {X} from "../runtime.ts";
import {Zxi} from "./m2503.ts";
import {Cie} from "./m2469.ts";
var rki=X((Hmh,nki)=>{/*!
  Copyright 2013 Lovell Fuller and others.
  SPDX-License-Identifier: Apache-2.0
*/var Tpd=Zxi(),uAe=Cie(),eki={multiband:"multiband","b-w":"b-w",bw:"b-w",cmyk:"cmyk",srgb:"srgb"};function Spd(e){return this._setBackgroundColourOption("tint",e),this}function bpd(e){return this.options.greyscale=uAe.bool(e)?e:!0,this}function Epd(e){return this.greyscale(e)}function Cpd(e){if(!uAe.string(e))throw uAe.invalidParameterError("colourspace","string",e);return this.options.colourspacePipeline=e,this}function vpd(e){return this.pipelineColourspace(e)}function wpd(e){if(!uAe.string(e))throw uAe.invalidParameterError("colourspace","string",e);return this.options.colourspace=e,this}function Rpd(e){return this.toColourspace(e)}function tki(e){if(uAe.object(e)||uAe.string(e)&&e.length>=3&&e.length<=200){let t=Tpd(e);return[t.red(),t.green(),t.blue(),Math.round(t.alpha()*255)]}else throw uAe.invalidParameterError("background","object or string",e)}function xpd(e,t){if(uAe.defined(t))this.options[e]=tki(t)}nki.exports=(e)=>{Object.assign(e.prototype,{tint:Spd,greyscale:bpd,grayscale:Epd,pipelineColourspace:Cpd,pipelineColorspace:vpd,toColourspace:wpd,toColorspace:Rpd,_getBackgroundColourOption:tki,_setBackgroundColourOption:xpd}),e.colourspace=eki,e.colorspace=eki}});
export {rki};
