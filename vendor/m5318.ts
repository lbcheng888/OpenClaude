// @ts-nocheck
import {lj,Y8i,a9e,ef} from "./m2794.ts";
import {MZn,FZn} from "./m5317.ts";
import {b} from "../runtime.ts";
function d7t(){return lj(MZn)!==void 0||Y8i(MZn)}
function RNo(e){let t=lj(e);if(!t||t.priority==="now")return t;return lj((n)=>e(n)&&MZn(n))??t}
function xKl(e){let t=RNo(e);if(t===void 0)return;return a9e((n)=>n===t)}
var BZn=b(()=>{ef();FZn()});
export {d7t,RNo,xKl,BZn};
