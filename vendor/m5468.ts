// @ts-nocheck
import {b,x} from "../runtime.ts";
import {aNo,r7t} from "./m5294.ts";
import {s4t,Axe} from "../src/tools/4091_type.ts";
import {Eqt,Yxe} from "../src/config/4333_onBackground.ts";
import {oe} from "./m2275.ts";
function GQl(e,t){switch(e.kind){case"background_hint":return izt.background_hint(e,t);case"bash_mode_progress":return izt.bash_mode_progress(e,t);case"it2_setup_prompt":return izt.it2_setup_prompt(e,t);case"computer_use_approval":return izt.computer_use_approval(e,t);case"agent_progress":return izt.agent_progress(e,t);default:{let n=e;return null}}}
var LBo,izt;
var VQl=b(()=>{aNo();s4t();Eqt();LBo=x(oe(),1),izt={background_hint:()=>LBo.jsx(Yxe,{}),bash_mode_progress:(e)=>LBo.jsx(r7t,{input:e.input,progress:e.progress,verbose:e.verbose}),agent_progress:(e,{tools:t,verbose:n})=>Axe(e.progressMessages,{tools:t,verbose:n}),it2_setup_prompt:()=>null,computer_use_approval:()=>null}});
export {GQl,LBo,izt,VQl};
