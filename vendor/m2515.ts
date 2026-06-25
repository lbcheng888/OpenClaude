// @ts-nocheck
import {Q} from "../runtime.ts";
import {Tie} from "./m2479.ts";
var vOi=Q((pvg,ROi)=>{/*!
  Copyright 2013 Lovell Fuller and others.
  SPDX-License-Identifier: Apache-2.0
*/var Rie=Tie(),ZEd={and:"and",or:"or",eor:"eor"};function eCd(){return this.options.removeAlpha=!0,this}function tCd(e){if(Rie.defined(e))if(Rie.number(e)&&Rie.inRange(e,0,1))this.options.ensureAlpha=e;else throw Rie.invalidParameterError("alpha","number between 0 and 1",e);else this.options.ensureAlpha=1;return this}function nCd(e){let t={red:0,green:1,blue:2,alpha:3};if(Object.keys(t).includes(e))e=t[e];if(Rie.integer(e)&&Rie.inRange(e,0,4))this.options.extractChannel=e;else throw Rie.invalidParameterError("channel","integer or one of: red, green, blue, alpha",e);return this}function rCd(e,t){if(Array.isArray(e))e.forEach(function(n){this.options.joinChannelIn.push(this._createInputDescriptor(n,t))},this);else this.options.joinChannelIn.push(this._createInputDescriptor(e,t));return this}function oCd(e){if(Rie.string(e)&&Rie.inArray(e,["and","or","eor"]))this.options.bandBoolOp=e;else throw Rie.invalidParameterError("boolOp","one of: and, or, eor",e);return this}ROi.exports=(e)=>{Object.assign(e.prototype,{removeAlpha:eCd,ensureAlpha:tCd,extractChannel:nCd,joinChannel:rCd,bandbool:oCd}),e.bool=ZEd}});
export {vOi};
