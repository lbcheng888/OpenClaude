// @ts-nocheck
import {Su,tN,oA} from "../src/config/2697_oA.ts";
import {Rl,TU} from "../src/tui/4359_isSearch.ts";
import {MIn,Dot} from "./m3250.ts";
import {hasPermissionsToUseTool,ay} from "../src/tools/5184_toolAlwaysAllowedRule.ts";
import {SS,lo} from "../src/tools/5190_userPromptCount.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {UV,BM,Se,bt} from "./m195.ts";
import {zrt,eI} from "../src/telemetry/3157_error.ts";
import {b,ro} from "../runtime.ts";
import {qut,N3t} from "../src/tui/4327_detectBlockedSleepPattern.ts";
async function I_e(e,t,n,r){let o=e;if(r==="bash"&&!Su())throw Error(`Skill ${n} requires bash (\`shell: bash\` in frontmatter) but Git Bash was not found. Install Git for Windows (https://git-scm.com/downloads/win), or change the skill's frontmatter to \`shell: powershell\`.`);let s=r==="powershell"&&tN()?cYa():Su()?Rl:cYa(),i=e.matchAll(lBp),a=e.includes("!`")?MIn(e).matchAll(cBp):[];return await Promise.all([...i,...a].map(async(l)=>{let c=l[1]?.trim();if(c)try{let u=await hasPermissionsToUseTool(s,{command:c},t,SS({content:[]}),"");if(u.behavior!=="allow")throw logForDebugging(`Shell command permission check failed for command in ${n}: ${c}. Error: ${u.message}`),new UV(`Shell command permission check failed for pattern "${l[0]}": ${u.message||"Permission denied"}`);let{data:d}=await s.call({command:c},t),p=await zrt(s,d,uYa.randomUUID()),m=typeof p.content==="string"?p.content:dYa(d.stdout,d.stderr);o=o.replace(l[0],()=>m)}catch(u){if(u instanceof UV)throw u;uBp(u,l[0])}})),o}
function dYa(e,t,n=!1){let r=[];if(e.trim())r.push(e.trim());if(t.trim())if(n)r.push(`[stderr: ${t.trim()}]`);else r.push(`[stderr]
${t.trim()}`);return r.join(n?" ":`
`)}
function uBp(e,t,n=!1){if(e instanceof BM){if(e.interrupted)throw new UV(`Shell command interrupted for pattern "${t}": [Command interrupted]`);let s=dYa(e.stdout,e.stderr,n);throw new UV(`Shell command failed for pattern "${t}": ${s}`)}let r=Se(e),o=n?`[Error: ${r}]`:`[Error]
${r}`;throw new UV(o)}
var uYa,cYa,lBp,cBp;
var Pdt=b(()=>{TU();qe();bt();lo();ay();Dot();eI();oA();uYa=require("crypto"),cYa=(()=>{let e;return()=>{if(!e)e=(qut(),ro(N3t)).PowerShellTool;return e}})(),lBp=/```!\s*\n?([\s\S]*?)\n?```/g,cBp=/(?<=^|\s)!`([^`]+)`/gm});
export {I_e,dYa,uBp,uYa,cYa,lBp,cBp,Pdt};
