// @ts-nocheck
import {nT,d2} from "./m64.ts";
import {SGo,bGo} from "./m447.ts";
import {vGo,wGo} from "./m450.ts";
import {T3,XTe} from "./m121.ts";
import {b} from "../runtime.ts";
function c0c(e,t){return function(n,r){var o=nT(n)?SGo:vGo,s=t?t():{};return o(n,e,T3(r,2),s)}}
var RGo;
var xGo=b(()=>{bGo();wGo();XTe();d2();RGo=c0c});
export {c0c,RGo,xGo};
