// @ts-nocheck
import {E} from "./m319.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
function VF(e=E.number()){return E.preprocess((t)=>{if(typeof t==="string"){let n=t.trim();if(/^[-+]?\d+(\.\d+)?$/.test(n)){let r=Number(n);if(Number.isFinite(r))return r}}return t},e)}
var jot=b(()=>{Xr()});
export {VF,jot};
