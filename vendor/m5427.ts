// @ts-nocheck
import {mS,mee} from "./m2749.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function DGt(e,t){if(e&&t&&t.length>0)return mS([...e,...t],"name");return e||[]}
function GWl(e,t){return WWl.useMemo(()=>DGt(e,t),[e,t])}
var WWl;
var VWl=b(()=>{mee();WWl=M(Te(),1)});
export {DGt,GWl,WWl,VWl};
