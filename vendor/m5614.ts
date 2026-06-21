// @ts-nocheck
import {w5,F4} from "./m2416.ts";
import {tP,r5} from "../src/telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {Ms,Pp} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {awe,l0t} from "../src/config/2420_l0t.ts";
import {je} from "./m577.ts";
import {aS,$g,lg} from "./m2269.ts";
import {b,M} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {Te} from "./m2253.ts";
function Hnc(){let e=cVt.useContext(w5),t=e!==null&&tP()&&!Ms()&&!awe()&&je.terminal!=="WezTerm",n=cVt.useCallback(()=>{if(!t||!e)return;e(aS($g.SEMANTIC_PROMPT,"A","redraw=0"))},[t,e]),r=cVt.useCallback(()=>{if(!t||!e)return;e(aS($g.SEMANTIC_PROMPT,"C")+aS($g.SEMANTIC_PROMPT,"D"))},[t,e]);return{markTurnStart:n,markTurnDone:r}}
var cVt;
var Inc=b(()=>{l0t();lg();F4();Lr();Pp();r5();cVt=M(Te(),1)});
export {Hnc,cVt,Inc};
