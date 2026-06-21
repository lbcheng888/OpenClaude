// @ts-nocheck
import {AF,YUr} from "./m2355.ts";
import {rSn,BIt} from "./m2356.ts";
import {b} from "../runtime.ts";
function UK(e){return sSn([],e)}
function sSn(e,t){let n=[...e];for(let r of t)if(r.code===AF.reset.open)n=[];else if(rSn.has(r.code))n=n.filter((o)=>o.endCode!==r.code);else if(r.code===AF.bold.open||r.code===AF.dim.open){if(!n.find((s)=>s.code===r.code&&s.endCode===r.endCode))n.push(r)}else n=n.filter((s)=>s.endCode!==r.endCode),n.push(r);return n}
var iSn=b(()=>{YUr();BIt()});
export {UK,sSn,iSn};
