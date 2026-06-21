// @ts-nocheck
import {Nml,Mml,Bml,Fml} from "./m4677.ts";
import {et,Ai} from "./m2208.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Uml({onComplete:e,target:t}){let n=iWn.useRef(new AbortController);return iWn.useEffect(()=>{let r=n.current;async function o(){if(!t){e(`Usage: /plugin eval [path]

Run trigger evaluations for a skill against the queries in its evals/ folder.

Examples:
  /plugin eval ./my-skill
  /plugin eval ~/.claude/skills/pdf-tools

Each evals/*.md file needs frontmatter with \`query\` (string)
and \`should_trigger\` (boolean). The spec recommends at least five.

Or from the command line:
  claude plugin eval [path]`);return}try{let s=await Nml(t,r.signal,Mml);process.exitCode=s.failCount>0?1:0;let i=s.queries.length===0?"":s.failCount>0?`

${et.cross} Evaluation failed`:s.skippedCount===s.queries.length?`

${et.info} Eval queries validated; trigger tests pending model integration`:`

${et.tick} Evaluation passed`;e(Bml(s)+i)}catch(s){process.exitCode=2,logForDebugging(`Plugin eval failed for ${t}: ${Se(s)}`,{level:"error"}),e(`${et.cross} ${Se(s)}`)}}return o(),()=>r.abort()},[e,t]),ujt.createElement(Box,{flexDirection:"column"},ujt.createElement(Text,null,"Running evaluation\u2026"))}
var ujt,iWn;
var $ml=b(()=>{Ai();ze();qe();bt();Fml();ujt=M(Te(),1),iWn=M(Te(),1)});
export {Uml,ujt,iWn,$ml};
