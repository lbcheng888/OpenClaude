// @ts-nocheck
import {WT,VEe,Vrn,VT} from "./m648.ts";
import {emt,w6n} from "./m4235.ts";
import {b} from "../runtime.ts";
async function HFl(e,t={}){let n=WT(e);if(!n)return;let r=await VEe(n,t.dir);if(!r)return;let o=await Vrn(r.filePath);if(!o)return;return emt(n,o,r.projectPath)??void 0}
var IFl=b(()=>{w6n();VT()});
export {HFl,IFl};
