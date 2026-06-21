// @ts-nocheck
import {X} from "../runtime.ts";
import {yVi} from "./m3033.ts";
import {SVi} from "./m3034.ts";
import {EVi} from "./m3035.ts";
var vVi=X((Uqh,RGr)=>{var r1d=yVi(),o1d=SVi(),s1d=EVi(),CVi=(e)=>{if(typeof e!=="string"||e.length===0)return 0;if(e=r1d(e),e.length===0)return 0;e=e.replace(s1d(),"  ");let t=0;for(let n=0;n<e.length;n++){let r=e.codePointAt(n);if(r<=31||r>=127&&r<=159)continue;if(r>=768&&r<=879)continue;if(r>65535)n++;t+=o1d(r)?2:1}return t};RGr.exports=CVi;RGr.exports.default=CVi});
export {vVi};
