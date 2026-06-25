// @ts-nocheck
import {FF,w4r} from "./m2365.ts";
import {WCn,fPt} from "./m2366.ts";
import {b} from "../runtime.ts";
function hz(e){return VCn([],e)}
function VCn(e,t){let n=[...e];for(let r of t)if(r.code===FF.reset.open)n=[];else if(WCn.has(r.code))n=n.filter((o)=>o.endCode!==r.code);else if(r.code===FF.bold.open||r.code===FF.dim.open){if(!n.find((s)=>s.code===r.code&&s.endCode===r.endCode))n.push(r)}else n=n.filter((s)=>s.endCode!==r.endCode),n.push(r);return n}
var KCn=b(()=>{w4r();fPt()});
export {hz,VCn,KCn};
