// @ts-nocheck
import {znt,f$e,A$e} from "./m3020.ts";
import {b} from "../runtime.ts";
function h$e(e,t){znt((n)=>{let r=n.get();if(!Array.isArray(r)||t.some((s,i)=>!Object.is(s,r[i])))f$e.queue(e);n.set(t)})}
var kxn=b(()=>{A$e()});
export {h$e,kxn};
