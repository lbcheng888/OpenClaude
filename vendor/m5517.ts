// @ts-nocheck
import {ap,BE} from "./m5006.ts";
import {F2t} from "./m3923.ts";
import {b} from "../runtime.ts";
import {Ph,Cs} from "./m2224.ts";
import {_dt,ydt,f0e,A0e,h0e} from "../src/agent/4299_Rmo.ts";
function KKl(){ap({name:F2t,menuDescription:"Clean up the changed code without changing behavior",description:"Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only \u2014 it does not hunt for bugs; use /code-review for that.",argumentHint:"[<target>]",userInvocable:!0,async getPromptForCommand(e){let t=e.trim();return[{type:"text",text:`${t?`Review target: \`${t}\`

`:""}${fNm}`}]}})}
var fNm;
var zKl=b(()=>{Ph();BE();fNm=`\`/simplify \u2192 4 cleanup agents in parallel \u2192 apply the fixes\`

You are improving the quality of the changed code, not hunting for bugs. Review
it for reuse, simplification, efficiency, and altitude issues, then fix what you
find. Do not look for correctness bugs \u2014 that is what \`/code-review\` is for.

${_dt}
## Phase 1 \u2014 Review (4 cleanup agents in parallel)

Launch **4 independent review agents** via the ${Cs} tool, all in a
single message so they run concurrently. Pass each agent the diff and one of
the four angles below. Each returns its findings with \`file\`, \`line\`, a
one-line \`summary\`, and the concrete cost (what is duplicated, wasted, or
harder to maintain).

### Reuse

${ydt}
${f0e}
${A0e}
${h0e}
## Phase 2 \u2014 Apply the fixes

Wait for all four agents to complete, dedup findings that point at the same
line or mechanism, and fix each remaining one directly. Skip any finding whose
fix would change intended behavior, require changes well outside the reviewed
diff, or that you judge to be a false positive \u2014 note the skip rather than
arguing with it. Finish with a brief summary of what was fixed and what was
skipped (or confirm the code was already clean).
`});
export {KKl,fNm,zKl};
