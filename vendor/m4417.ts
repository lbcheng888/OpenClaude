// @ts-nocheck
import {b} from "../runtime.ts";
import {p0} from "./m236.ts";
var tVp,puT;
var DWn=b(()=>{p0();tVp=/\b(?:use|spend)\s+(\d+(?:\.\d+)?)\s*(k|m|b)\s*tokens?\b/i,puT=new RegExp(tVp.source,"gi")});
export {tVp,puT,DWn};
