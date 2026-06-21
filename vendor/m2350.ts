// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {b} from "../runtime.ts";
function cZe(e){let t=eSn.get(e);if(t!==void 0)return t;let n=tn(e);if(eSn.size>=hsd)eSn.clear();return eSn.set(e,n),n}
var eSn,hsd=4096;
var tSn=b(()=>{Hc();eSn=new Map});
export {cZe,eSn,hsd,tSn};
