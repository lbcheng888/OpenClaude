// @ts-nocheck
import {b,M} from "../runtime.ts";
import {LDo,wWt} from "./m5259.ts";
import {y$t,AIe} from "../src/tui/4027_type.ts";
import {s3t,n0e} from "../src/config/4313_onBackground.ts";
import {Te} from "./m2253.ts";
function aGl(e,t){switch(e.kind){case"background_hint":return OGt.background_hint(e,t);case"bash_mode_progress":return OGt.bash_mode_progress(e,t);case"it2_setup_prompt":return OGt.it2_setup_prompt(e,t);case"computer_use_approval":return OGt.computer_use_approval(e,t);case"agent_progress":return OGt.agent_progress(e,t);default:{let n=e;return null}}}
var LGt,OGt;
var lGl=b(()=>{LDo();y$t();s3t();LGt=M(Te(),1),OGt={background_hint:()=>LGt.createElement(n0e,null),bash_mode_progress:(e)=>LGt.createElement(wWt,{input:e.input,progress:e.progress,verbose:e.verbose}),agent_progress:(e,{tools:t,verbose:n})=>AIe(e.progressMessages,{tools:t,verbose:n}),it2_setup_prompt:()=>null,computer_use_approval:()=>null}});
export {aGl,LGt,OGt,lGl};
