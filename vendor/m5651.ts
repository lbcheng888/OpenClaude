// @ts-nocheck
import {U8,i4} from "./m2426.ts";
import {fD,y8} from "../src/telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {Cs,tp} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {Vve,BPt} from "../src/config/2430_BPt.ts";
import {Ne} from "./m583.ts";
import {tS,Qg,hg} from "./m2280.ts";
import {b,x} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {et} from "./m2261.ts";
function gdc(){let e=Fzt.useContext(U8),t=e!==null&&fD()&&!Cs()&&!Vve()&&Ne.terminal!=="WezTerm",n=Fzt.useCallback(()=>{if(!t||!e)return;e(tS(Qg.SEMANTIC_PROMPT,"A","redraw=0"))},[t,e]),r=Fzt.useCallback(()=>{if(!t||!e)return;e(tS(Qg.SEMANTIC_PROMPT,"C")+tS(Qg.SEMANTIC_PROMPT,"D"))},[t,e]);return{markTurnStart:n,markTurnDone:r}}
var Fzt;
var _dc=b(()=>{BPt();hg();i4();Ir();tp();y8();Fzt=x(et(),1)});
export {gdc,Fzt,_dc};
