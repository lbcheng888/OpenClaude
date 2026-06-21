// @ts-nocheck
import {sSn,iSn} from "./m2357.ts";
import {b} from "../runtime.ts";
import {BIt} from "./m2356.ts";
import {e2r} from "./m2359.ts";
function Wbi(e){let t=[],n=[];for(let r of e)if(r.type==="ansi")t=sSn(t,[r]);else if(r.type==="char")n.push({...r,styles:[...t]});return n}
var Gbi=b(()=>{BIt();e2r();iSn()});
export {Wbi,Gbi};
