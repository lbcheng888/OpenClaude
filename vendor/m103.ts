// @ts-nocheck
import {nT,d2} from "./m64.ts";
import {zTe,ygt} from "./m102.ts";
import {b} from "../runtime.ts";
function oAc(e,t){if(nT(e))return!1;var n=typeof e;if(n=="number"||n=="symbol"||n=="boolean"||e==null||zTe(e))return!0;return rAc.test(e)||!nAc.test(e)||t!=null&&e in Object(t)}
var nAc,rAc,IWe;
var hKt=b(()=>{d2();ygt();nAc=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,rAc=/^\w*$/;IWe=oAc});
export {oAc,nAc,rAc,IWe,hKt};
