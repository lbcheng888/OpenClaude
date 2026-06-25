// @ts-nocheck
import {Td,Cb} from "./m5036.ts";
import {D3t} from "./m3990.ts";
import {b} from "../runtime.ts";
import {fg,ls} from "./m2232.ts";
import {ymt,Tmt,aDe,lDe,cDe} from "../src/agent/4319_F5n.ts";
function Dnc(){Td({name:D3t,menuDescription:"Clean up the changed code without changing behavior",description:"Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only \u2014 it does not hunt for bugs; use /code-review for that.",argumentHint:"[<target>]",userInvocable:!0,async getPromptForCommand(e){let t=e.trim();return[{type:"text",text:`${t?`Review target: \`${t}\`

`:""}${xqm}`}]}})}
var xqm;
var Pnc=b(()=>{fg();Cb();xqm=`\`/simplify \u2192 4 cleanup agents in parallel \u2192 apply the fixes\`

You are improving the quality of the changed code, not hunting for bugs. Review
it for reuse, simplification, efficiency, and altitude issues, then fix what you
find. Do not look for correctness bugs \u2014 that is what \`/code-review\` is for.

${ymt}
## Phase 1 \u2014 Review (4 cleanup agents in parallel)

Launch **4 independent review agents** via the ${ls} tool, all in a
single message so they run concurrently. Pass each agent the diff and one of
the four angles below. Each returns its findings with \`file\`, \`line\`, a
one-line \`summary\`, and the concrete cost (what is duplicated, wasted, or
harder to maintain).

### Reuse

${Tmt}
${aDe}
${lDe}
${cDe}
## Phase 2 \u2014 Apply the fixes

Wait for all four agents to complete, dedup findings that point at the same
line or mechanism, and fix each remaining one directly. Skip any finding whose
fix would change intended behavior, require changes well outside the reviewed
diff, or that you judge to be a false positive \u2014 note the skip rather than
arguing with it. Finish with a brief summary of what was fixed and what was
skipped (or confirm the code was already clean).
`});
export {Dnc,xqm,Pnc};
