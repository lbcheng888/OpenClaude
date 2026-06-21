// @ts-nocheck
import {getCommandName} from "../src/tools/4028_maxEditDistance.ts";
import {mS,mee} from "./m2749.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function VPm(e,t){if(t.length===0)return e;let n=new Set(e.map(getCommandName)),r=t.map((o)=>o.isMcp&&n.has(getCommandName(o))?{...o,isHidden:!0}:o);return mS([...e,...r],"name")}
function dLo(e,t){return KWl.useMemo(()=>VPm(e,t),[e,t])}
var KWl;
var zWl=b(()=>{mee();KWl=M(Te(),1)});
export {VPm,dLo,KWl,zWl};
