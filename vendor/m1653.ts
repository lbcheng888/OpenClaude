// @ts-nocheck
import {Ywt,zwt,CHr} from "./m1652.ts";
import {z5s,EHr} from "./m1650.ts";
import {Y5s,J5s} from "./m1651.ts";
import {b} from "../runtime.ts";
function wHr(e={}){var t;return{name:vHr,sendRequest:Ywt([z5s(),Y5s(e)],{maxRetries:(t=e.maxRetries)!==null&&t!==void 0?t:zwt}).sendRequest}}
var vHr="defaultRetryPolicy";
var X5s=b(()=>{J5s();EHr();CHr()});
export {wHr,vHr,X5s};
