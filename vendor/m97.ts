// @ts-nocheck
import {iqo,aqo} from "./m95.ts";
import {WYt,Ssr} from "./m96.ts";
import {oqo,sqo} from "./m93.ts";
import {b} from "../runtime.ts";
function tRc(e){var t=iqo(e);if(t.length==1&&t[0][2])return WYt(t[0][0],t[0][1]);return function(n){return n===e||oqo(n,e,t)}}
var lqo;
var cqo=b(()=>{sqo();aqo();Ssr();lqo=tRc});
export {tRc,lqo,cqo};
