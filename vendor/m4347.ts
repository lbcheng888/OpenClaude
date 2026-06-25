// @ts-nocheck
import {Yc,m1,Zm} from "../src/config/2709_Zm.ts";
import {sl,UB} from "../src/tools/4381_isSearch.ts";
import {vPn,_3e} from "./m3266.ts";
import {hasPermissionsToUseTool,ly} from "../src/tools/5218_toolAlwaysAllowedRule.ts";
import {fS,po} from "../src/tools/5224_userPromptCount.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {uK,XL,Ce,Ct} from "./m197.ts";
import {jst,HI} from "../src/telemetry/3173_error.ts";
import {b,oo} from "../runtime.ts";
import {Upt,r6t} from "../src/tools/4347_isAutobackgroundingAllowed.ts";
async function Uce(e,t,n,r){let o=e;if(r==="bash"&&!Yc())throw Error(`Skill ${n} requires bash (\`shell: bash\` in frontmatter) but Git Bash was not found. Install Git for Windows (https://git-scm.com/downloads/win), or change the skill's frontmatter to \`shell: powershell\`.`);let s=r==="powershell"&&m1()?Dtl():Yc()?sl:Dtl(),i=e.matchAll(Wqp),a=e.includes("!`")?vPn(e).matchAll(Gqp):[];return await Promise.all([...i,...a].map(async(l)=>{let c=l[1]?.trim();if(c)try{let u=await hasPermissionsToUseTool(s,{command:c},t,fS({content:[]}),"");if(u.behavior!=="allow")throw logForDebugging(`Shell command permission check failed for command in ${n}: ${c}. Error: ${u.message}`),new uK(`Shell command permission check failed for pattern "${l[0]}": ${u.message||"Permission denied"}`);let{data:d}=await s.call({command:c},t),p=await jst(s,d,Ptl.randomUUID()),m=typeof p.content==="string"?p.content:Otl(d.stdout,d.stderr);o=o.replace(l[0],()=>m)}catch(u){if(u instanceof uK)throw u;Vqp(u,l[0])}})),o}
function Otl(e,t,n=!1){let r=[];if(e.trim())r.push(e.trim());if(t.trim())if(n)r.push(`[stderr: ${t.trim()}]`);else r.push(`[stderr]
${t.trim()}`);return r.join(n?" ":`
`)}
function Vqp(e,t,n=!1){if(e instanceof XL){if(e.interrupted)throw new uK(`Shell command interrupted for pattern "${t}": [Command interrupted]`);let s=Otl(e.stdout,e.stderr,n);throw new uK(`Shell command failed for pattern "${t}": ${s}`)}let r=Ce(e),o=n?`[Error: ${r}]`:`[Error]
${r}`;throw new uK(o)}
var Ptl,Dtl,Wqp,Gqp;
var Q5e=b(()=>{UB();qe();Ct();po();ly();_3e();HI();Zm();Ptl=require("crypto"),Dtl=(()=>{let e;return()=>{if(!e)e=(Upt(),oo(r6t)).PowerShellTool;return e}})(),Wqp=/```!\s*\n?([\s\S]*?)\n?```/g,Gqp=/(?<=^|\s)!`([^`]+)`/gm});
export {Uce,Otl,Vqp,Ptl,Dtl,Wqp,Gqp,Q5e};
