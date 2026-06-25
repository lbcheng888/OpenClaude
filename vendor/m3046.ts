// @ts-nocheck
import {Q} from "../runtime.ts";
import {pQi} from "./m3043.ts";
import {fQi} from "./m3044.ts";
import {gQi} from "./m3045.ts";
var yQi=Q((HXg,lYr)=>{var Fqd=pQi(),Bqd=fQi(),Uqd=gQi(),_Qi=(e)=>{if(typeof e!=="string"||e.length===0)return 0;if(e=Fqd(e),e.length===0)return 0;e=e.replace(Uqd(),"  ");let t=0;for(let n=0;n<e.length;n++){let r=e.codePointAt(n);if(r<=31||r>=127&&r<=159)continue;if(r>=768&&r<=879)continue;if(r>65535)n++;t+=Bqd(r)?2:1}return t};lYr.exports=_Qi;lYr.exports.default=_Qi});
export {yQi};
