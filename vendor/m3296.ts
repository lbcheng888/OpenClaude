// @ts-nocheck
import {C} from "./m321.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
function hB(e=C.number()){return C.preprocess((t)=>{if(typeof t==="string"){let n=t.trim();if(/^[-+]?\d+(\.\d+)?$/.test(n)){let r=Number(n);if(Number.isFinite(r))return r}}return t},e)}
var qit=b(()=>{Qr()});
export {hB,qit};
