// @ts-nocheck
import {kbl,wbl,Hbl,Ibl} from "./m4705.ts";
import {Xe,Zs} from "./m2216.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function xbl({onComplete:e,target:t}){let n=W7n.useRef(new AbortController);return W7n.useEffect(()=>{let r=n.current;async function o(){if(!t){e(`Usage: /plugin eval [path]

Run trigger evaluations for a skill against the queries in its evals/ folder.

Examples:
  /plugin eval ./my-skill
  /plugin eval ~/.claude/skills/pdf-tools

Each evals/*.md file needs frontmatter with \`query\` (string)
and \`should_trigger\` (boolean). The spec recommends at least five.

Or from the command line:
  claude plugin eval [path]`);return}try{let s=await kbl(t,r.signal,wbl);process.exitCode=s.failCount>0?1:0;let i=s.queries.length===0?"":s.failCount>0?`

${Xe.cross} Evaluation failed`:s.skippedCount===s.queries.length?`

${Xe.info} Eval queries validated; trigger tests pending model integration`:`

${Xe.tick} Evaluation passed`;e(Hbl(s)+i)}catch(s){process.exitCode=2,logForDebugging(`Plugin eval failed for ${t}: ${Ce(s)}`,{level:"error"}),e(`${Xe.cross} ${Ce(s)}`)}}return o(),()=>r.abort()},[e,t]),hwo.jsx(Box,{flexDirection:"column",children:hwo.jsx(Text,{children:"Running evaluation\u2026"})})}
var W7n,hwo;
var Dbl=b(()=>{Zs();je();qe();Ct();Ibl();W7n=x(et(),1),hwo=x(oe(),1)});
export {xbl,W7n,hwo,Dbl};
