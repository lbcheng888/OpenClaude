// @ts-nocheck
import {VCn,KCn} from "./m2367.ts";
import {b} from "../runtime.ts";
import {fPt} from "./m2366.ts";
import {D4r} from "./m2369.ts";
function eHi(e){let t=[],n=[];for(let r of e)if(r.type==="ansi")t=VCn(t,[r]);else if(r.type==="char")n.push({...r,styles:[...t]});return n}
var tHi=b(()=>{fPt();D4r();KCn()});
export {eHi,tHi};
