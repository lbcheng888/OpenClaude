// @ts-nocheck
import {getCommandName} from "../src/tools/4092_done.ts";
import {aS,uee} from "./m2762.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function t$m(e,t){if(t.length===0)return e;let n=new Set(e.map(getCommandName)),r=t.map((o)=>o.isMcp&&n.has(getCommandName(o))?{...o,isHidden:!0}:o);return aS([...e,...r],"name")}
function DBo(e,t){return IQl.useMemo(()=>t$m(e,t),[e,t])}
var IQl;
var xQl=b(()=>{uee();IQl=x(et(),1)});
export {t$m,DBo,IQl,xQl};
