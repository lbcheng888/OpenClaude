// @ts-nocheck
import {EHt,bHt,eOr} from "./m1657.ts";
import {Wjs,ZPr} from "./m1655.ts";
import {Gjs,Vjs} from "./m1656.ts";
import {b} from "../runtime.ts";
function nOr(e={}){var t;return{name:tOr,sendRequest:EHt([Wjs(),Gjs(e)],{maxRetries:(t=e.maxRetries)!==null&&t!==void 0?t:bHt}).sendRequest}}
var tOr="defaultRetryPolicy";
var Kjs=b(()=>{Vjs();ZPr();eOr()});
export {nOr,tOr,Kjs};
