// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {wbe,zTt} from "./m98.ts";
import {b} from "../runtime.ts";
function iRc(e,t){if(jy(e))return!1;var n=typeof e;if(n=="number"||n=="symbol"||n=="boolean"||e==null||wbe(e))return!0;return sRc.test(e)||!oRc.test(e)||t!=null&&e in Object(t)}
var oRc,sRc,AKe;
var GYt=b(()=>{DU();zTt();oRc=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,sRc=/^\w*$/;AKe=iRc});
export {iRc,oRc,sRc,AKe,GYt};
