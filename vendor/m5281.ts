// @ts-nocheck
import {hee,o9i,Z2e,sA} from "./m2782.ts";
import {HYn,DYn} from "./m5280.ts";
import {b} from "../runtime.ts";
function DWt(){return hee(HYn)!==void 0||o9i(HYn)}
function QDo(e){let t=hee(e);if(!t||t.priority==="now")return t;return hee((n)=>e(n)&&HYn(n))??t}
function b3l(e){let t=QDo(e);if(t===void 0)return;return Z2e((n)=>n===t)}
var PYn=b(()=>{sA();DYn()});
export {DWt,QDo,b3l,PYn};
