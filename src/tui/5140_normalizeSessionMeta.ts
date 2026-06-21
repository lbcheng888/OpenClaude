// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {getDefaultOpusModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {tr,sn} from "../config/0047_namespace.ts";
import {Cs,p5,Ph} from "../../vendor/m2224.ts";
import {rxe} from "../../vendor/m2758.ts";
import {Uu,Di,dr} from "../../vendor/m231.ts";
import {getSessionIdFromLog,getSessionFilesWithMtime,loadAllLogsFromSessionFile,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {edt,rb} from "../permissions/5178_level.ts";
import {Wc} from "../api/3868_level.ts";
import {Af,S_} from "../agent/1454_agentType.ts";
import {wc,lo} from "../tools/5190_userPromptCount.ts";
import {qt,Le,Xt} from "../config/0228_encoding.ts";
import {ds,_o,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Tp,QH} from "../../vendor/m2784.ts";
import {Dz,ry} from "../agent/2772_withFileTypes.ts";
import {W2e} from "../../vendor/m2761.ts";
import {oa} from "../../vendor/m684.ts";
import {Mw} from "../config/2221_recursive.ts";
var vLl={};
isFullscreenWithTTY(vLl,{normalizeSessionMeta:()=>normalizeSessionMeta,generateUsageReport:()=>generateUsageReport,extractToolStats:()=>extractToolStats,detectMultiClauding:()=>detectMultiClauding,default:()=>fgm,deduplicateSessionBranches:()=>deduplicateSessionBranches,buildInsightsResponsePrompt:()=>buildInsightsResponsePrompt,buildExportData:()=>buildExportData,aggregateData:()=>aggregateData});
function gLl(){return getDefaultOpusModel()}
function Uhm(){return getDefaultOpusModel()}
function w5t(){return jG.join(tr(),"usage-data")}
function mKn(){return jG.join(w5t(),"facets")}
function Rko(){return jG.join(w5t(),"session-meta")}
function Whm(e){let t=jG.extname(e).toLowerCase();return $hm[t]||null}
function v5t(e){return typeof e==="string"?e:""}
function extractToolStats(e){let t={},n={},r=0,o=0,s=0,i=0,a=0,l=[],c=0,u={},d=!1,p=0,m=0,f=new Set,A=[],h=[],g=!1,_=!1,y=!1,T=null;for(let S of e.messages){let v=S.timestamp;if(S.type==="assistant"&&S.message){if(v)T=v;let R=S.message.usage;if(R)s+=R.input_tokens||0,i+=R.output_tokens||0;let k=S.message.content;if(Array.isArray(k)){for(let x of k)if(x.type==="tool_use"&&"name"in x){let H=x.name;if(t[H]=(t[H]||0)+1,H===Cs||H===p5)d=!0;if(H.startsWith("mcp__"))g=!0;if(H==="WebSearch")_=!0;if(H==="WebFetch")y=!0;let I=x.input;if(I){let P=v5t(I.file_path);if(P){let D=Whm(P);if(D)n[D]=(n[D]||0)+1;if(H==="Edit"||H==="Write")f.add(P)}if(H==="Edit"){let D=v5t(I.old_string),N=v5t(I.new_string);for(let O of rxe(D,N)){if(O.added)p+=O.count||0;if(O.removed)m+=O.count||0}}if(H==="Write"){let D=v5t(I.content);if(D)p+=Uu(D,`
`)+1}let L=v5t(I.command);if(L.includes("git commit"))r++;if(L.includes("git push"))o++}}}}if(S.type==="user"&&S.message){let R=S.message.content,k=!1;if(typeof R==="string"&&R.trim())k=!0;else if(Array.isArray(R)){for(let x of R)if(x.type==="text"&&"text"in x){k=!0;break}}if(k){if(v){let x=new Date(v);if(Number.isFinite(x.getTime())){let H=x.getHours();A.push(H),h.push(v)}}if(T&&v){let x=new Date(T).getTime(),I=(new Date(v).getTime()-x)/1000;if(I>2&&I<3600)l.push(I)}}if(Array.isArray(R)){for(let x of R)if(x.type==="tool_result"&&"content"in x){if(x.is_error){c++;let I=x.content,P="Other";if(typeof I==="string"){let L=I.toLowerCase();if(L.includes("exit code"))P="Command Failed";else if(L.includes("rejected")||L.includes("doesn't want"))P="User Rejected";else if(L.includes("string to replace not found")||L.includes("no changes"))P="Edit Failed";else if(L.includes("modified since read"))P="File Changed";else if(L.includes("exceeds maximum")||L.includes("too large"))P="File Too Large";else if(L.includes("file not found")||L.includes("does not exist"))P="File Not Found"}u[P]=(u[P]||0)+1}}}if(typeof R==="string"){if(R.includes("[Request interrupted by user"))a++}else if(Array.isArray(R)){for(let x of R)if(x.type==="text"&&"text"in x&&x.text.includes("[Request interrupted by user")){a++;break}}}}return{toolCounts:t,languages:n,gitCommits:r,gitPushes:o,inputTokens:s,outputTokens:i,userInterruptions:a,userResponseTimes:l,toolErrors:c,toolErrorCategories:u,usesTaskAgent:d,usesMcp:g,usesWebSearch:_,usesWebFetch:y,linesAdded:p,linesRemoved:m,filesModified:f,messageHours:A,userMessageTimestamps:h}}
function Ghm(e){return!Number.isNaN(e.created.getTime())&&!Number.isNaN(e.modified.getTime())}
function kko(e){let t=extractToolStats(e),n=getSessionIdFromLog(e)||"unknown",r=e.created.toISOString(),o=Math.round((e.modified.getTime()-e.created.getTime())/1000/60),s=0,i=0;for(let a of e.messages){if(a.type==="assistant")i++;if(a.type==="user"&&a.message){let l=a.message.content,c=!1;if(typeof l==="string"&&l.trim())c=!0;else if(Array.isArray(l)){for(let u of l)if(u.type==="text"&&"text"in u){c=!0;break}}if(c)s++}}return{session_id:n,project_path:e.projectPath||"",start_time:r,duration_minutes:o,user_message_count:s,assistant_message_count:i,tool_counts:t.toolCounts,languages:t.languages,git_commits:t.gitCommits,git_pushes:t.gitPushes,input_tokens:t.inputTokens,output_tokens:t.outputTokens,first_prompt:e.firstPrompt||"",summary:e.summary,user_interruptions:t.userInterruptions,user_response_times:t.userResponseTimes,tool_errors:t.toolErrors,tool_error_categories:t.toolErrorCategories,uses_task_agent:t.usesTaskAgent,uses_mcp:t.usesMcp,uses_web_search:t.usesWebSearch,uses_web_fetch:t.usesWebFetch,lines_added:t.linesAdded,lines_removed:t.linesRemoved,files_modified:t.filesModified.size,message_hours:t.messageHours,user_message_timestamps:t.userMessageTimestamps}}
function xko(e,t){if(!t)return!0;if(e.user_message_count!==t.user_message_count)return e.user_message_count>t.user_message_count;return e.duration_minutes>t.duration_minutes}
function deduplicateSessionBranches(e){let t=new Map;for(let n of e){let r=n.meta.session_id;if(xko(n.meta,t.get(r)?.meta))t.set(r,n)}return[...t.values()]}
function Khm(e){let t=[],n=kko(e);t.push(`Session: ${n.session_id.slice(0,8)}`),t.push(`Date: ${n.start_time}`),t.push(`Project: ${n.project_path}`),t.push(`Duration: ${n.duration_minutes} min`),t.push("");for(let r of e.messages)if(r.type==="user"&&r.message){let o=r.message.content;if(typeof o==="string")t.push(`[User]: ${o.slice(0,500)}`);else if(Array.isArray(o)){for(let s of o)if(s.type==="text"&&"text"in s)t.push(`[User]: ${s.text.slice(0,500)}`)}}else if(r.type==="assistant"&&r.message){let o=r.message.content;if(Array.isArray(o)){for(let s of o)if(s.type==="text"&&"text"in s)t.push(`[Assistant]: ${s.text.slice(0,300)}`);else if(s.type==="tool_use"&&"name"in s)t.push(`[Tool: ${s.name}]`)}}return t.join(`
`)}
async function Yhm(e){try{let t=await edt({systemPrompt:Wc([]),userPrompt:zhm+e,signal:new AbortController().signal,options:{model:gLl(),querySource:"insights",agents:[],isNonInteractiveSession:!0,hasAppendSystemPrompt:!1,mcpTools:[],maxOutputTokensOverride:500,agentContext:Af()}});return wc(t.message.content)||e.slice(0,2000)}catch{return e.slice(0,2000)}}
async function Jhm(e){let t=Khm(e);if(t.length<=30000)return t;let n=25000,r=[];for(let a=0;a<t.length;a+=n)r.push(t.slice(a,a+n));let o=await Promise.all(r.map(Yhm)),s=kko(e);return[`Session: ${s.session_id.slice(0,8)}`,`Date: ${s.start_time}`,`Project: ${s.project_path}`,`Duration: ${s.duration_minutes} min`,`[Long session - ${r.length} parts summarized]`,""].join(`
`)+o.join(`

---

`)}
async function Xhm(e){let t=jG.join(mKn(),`${e}.json`);try{let n=await jU.readFile(t,{encoding:"utf-8"}),r=qt(n);if(!CLl(r)){try{await jU.unlink(t)}catch{}return null}return r}catch{return null}}
async function Qhm(e){try{await jU.mkdir(mKn(),{recursive:!0})}catch{}let t=jG.join(mKn(),`${e.session_id}.json`);await jU.writeFile(t,Le(e,null,2),{encoding:"utf-8",mode:384})}
async function Zhm(e){let t=jG.join(Rko(),`${e}.json`);try{let n=await jU.readFile(t,{encoding:"utf-8"});return normalizeSessionMeta(qt(n))}catch{return null}}
function normalizeSessionMeta(e){return{...e,tool_counts:e.tool_counts??{},languages:e.languages??{},tool_error_categories:e.tool_error_categories??{},user_response_times:e.user_response_times??[],message_hours:e.message_hours??[],user_message_timestamps:e.user_message_timestamps??[],user_interruptions:e.user_interruptions??0,tool_errors:e.tool_errors??0,lines_added:e.lines_added??0,lines_removed:e.lines_removed??0,files_modified:e.files_modified??0}}
async function egm(e){try{await jU.mkdir(Rko(),{recursive:!0});let t=jG.join(Rko(),`${e.session_id}.json`);await jU.writeFile(t,Le(e,null,2),{encoding:"utf-8",mode:384})}catch(t){if(ds(t)){logForDebugging(`saveSessionMeta: cache write failed: ${t}`);return}De(t)}}
async function tgm(e,t){try{let n=await Jhm(e),r=`${jhm}${n}

RESPOND WITH ONLY A VALID JSON OBJECT matching this schema:
{
  "underlying_goal": "What the user fundamentally wanted to achieve",
  "goal_categories": {"category_name": count, ...},
  "outcome": "fully_achieved|mostly_achieved|partially_achieved|not_achieved|unclear_from_transcript",
  "user_satisfaction_counts": {"level": count, ...},
  "claude_helpfulness": "unhelpful|slightly_helpful|moderately_helpful|very_helpful|essential",
  "session_type": "single_task|multi_task|iterative_refinement|exploration|quick_question",
  "friction_counts": {"friction_type": count, ...},
  "friction_detail": "One sentence describing friction or empty",
  "primary_success": "none|fast_accurate_search|correct_code_edits|good_explanations|proactive_help|multi_file_changes|good_debugging",
  "brief_summary": "One sentence: what user wanted and whether they got it"
}`,o=await edt({systemPrompt:Wc([]),userPrompt:r,signal:new AbortController().signal,options:{model:gLl(),querySource:"insights",agents:[],isNonInteractiveSession:!0,hasAppendSystemPrompt:!1,mcpTools:[],maxOutputTokensOverride:4096,agentContext:Af()}}),i=wc(o.message.content).match(/\{[\s\S]*\}/);if(!i)return null;let a=qt(i[0]);if(!CLl(a))return null;return{...a,session_id:t}}catch(n){return logForDebugging(`Facet extraction failed: ${_o(n).message}`,{level:"error"}),null}}
function detectMultiClauding(e){let n=[];for(let l of e)for(let c of l.user_message_timestamps){let u=new Date(c).getTime();if(!Number.isFinite(u))continue;n.push({ts:u,sessionId:l.session_id})}n.sort((l,c)=>l.ts-c.ts);let r=new Set,o=new Set,s=0,i=new Map;for(let l=0;l<n.length;l++){let c=n[l];while(s<l&&c.ts-n[s].ts>1800000){let d=n[s];if(i.get(d.sessionId)===s)i.delete(d.sessionId);s++}let u=i.get(c.sessionId);if(u!==void 0)for(let d=u+1;d<l;d++){let p=n[d];if(p.sessionId!==c.sessionId){let m=[c.sessionId,p.sessionId].sort().join(":");r.add(m),o.add(`${n[u].ts}:${c.sessionId}`),o.add(`${p.ts}:${p.sessionId}`),o.add(`${c.ts}:${c.sessionId}`);break}}i.set(c.sessionId,l)}let a=new Set;for(let l of r){let[c,u]=l.split(":");if(c)a.add(c);if(u)a.add(u)}return{overlap_events:r.size,sessions_involved:a.size,user_messages_during:o.size}}
function aggregateData(e,t){let n={total_sessions:e.length,sessions_with_facets:t.size,date_range:{start:"",end:""},total_messages:0,total_duration_hours:0,total_input_tokens:0,total_output_tokens:0,tool_counts:{},languages:{},git_commits:0,git_pushes:0,projects:{},goal_categories:{},outcomes:{},satisfaction:{},helpfulness:{},session_types:{},friction:{},success:{},session_summaries:[],total_interruptions:0,total_tool_errors:0,tool_error_categories:{},user_response_times:[],median_response_time:0,avg_response_time:0,sessions_using_task_agent:0,sessions_using_mcp:0,sessions_using_web_search:0,sessions_using_web_fetch:0,total_lines_added:0,total_lines_removed:0,total_files_modified:0,days_active:0,messages_per_day:0,message_hours:[],multi_clauding:{overlap_events:0,sessions_involved:0,user_messages_during:0}},r=[],o=[],s=[];for(let a of e){r.push(a.start_time),n.total_messages+=a.user_message_count,n.total_duration_hours+=a.duration_minutes/60,n.total_input_tokens+=a.input_tokens,n.total_output_tokens+=a.output_tokens,n.git_commits+=a.git_commits,n.git_pushes+=a.git_pushes,n.total_interruptions+=a.user_interruptions,n.total_tool_errors+=a.tool_errors;for(let[c,u]of Object.entries(a.tool_error_categories))n.tool_error_categories[c]=(n.tool_error_categories[c]||0)+u;if(o.push(...a.user_response_times),a.uses_task_agent)n.sessions_using_task_agent++;if(a.uses_mcp)n.sessions_using_mcp++;if(a.uses_web_search)n.sessions_using_web_search++;if(a.uses_web_fetch)n.sessions_using_web_fetch++;n.total_lines_added+=a.lines_added,n.total_lines_removed+=a.lines_removed,n.total_files_modified+=a.files_modified,s.push(...a.message_hours);for(let[c,u]of Object.entries(a.tool_counts))n.tool_counts[c]=(n.tool_counts[c]||0)+u;for(let[c,u]of Object.entries(a.languages))n.languages[c]=(n.languages[c]||0)+u;if(a.project_path)n.projects[a.project_path]=(n.projects[a.project_path]||0)+1;let l=t.get(a.session_id);if(l){for(let[c,u]of Xft(l.goal_categories))if(u>0)n.goal_categories[c]=(n.goal_categories[c]||0)+u;n.outcomes[l.outcome]=(n.outcomes[l.outcome]||0)+1;for(let[c,u]of Xft(l.user_satisfaction_counts))if(u>0)n.satisfaction[c]=(n.satisfaction[c]||0)+u;n.helpfulness[l.claude_helpfulness]=(n.helpfulness[l.claude_helpfulness]||0)+1,n.session_types[l.session_type]=(n.session_types[l.session_type]||0)+1;for(let[c,u]of Xft(l.friction_counts))if(u>0)n.friction[c]=(n.friction[c]||0)+u;if(l.primary_success!=="none")n.success[l.primary_success]=(n.success[l.primary_success]||0)+1}if(n.session_summaries.length<50)n.session_summaries.push({id:a.session_id.slice(0,8),date:Di(a.start_time,"T"),summary:a.summary||a.first_prompt.slice(0,100),goal:l?.underlying_goal})}if(r.sort(),n.date_range.start=Di(r[0]??"","T"),n.date_range.end=Di(r.at(-1)??"","T"),n.user_response_times=o,o.length>0){let a=[...o].sort((l,c)=>l-c);n.median_response_time=a[Math.floor(a.length/2)]||0,n.avg_response_time=o.reduce((l,c)=>l+c,0)/o.length}let i=new Set(r.map((a)=>Di(a,"T")));return n.days_active=i.size,n.messages_per_day=n.days_active>0?Math.round(n.total_messages/n.days_active*10)/10:0,n.message_hours=s,n.multi_clauding=detectMultiClauding(e),n}
async function hLl(e,t){try{let n=await edt({systemPrompt:Wc([]),userPrompt:e.prompt+`

DATA:
`+t,signal:new AbortController().signal,options:{model:Uhm(),querySource:"insights",agents:[],isNonInteractiveSession:!0,hasAppendSystemPrompt:!1,mcpTools:[],maxOutputTokensOverride:e.maxTokens,agentContext:Af()}}),r=wc(n.message.content);if(r){let o=r.match(/\{[\s\S]*\}/);if(o)try{return{name:e.name,result:qt(o[0])}}catch{return{name:e.name,result:null}}}return{name:e.name,result:null}}catch(n){return De(Error(`${e.name} failed: ${_o(n).message}`)),{name:e.name,result:null}}}
async function rgm(e,t){let n=Array.from(t.values()).slice(0,50).map((_)=>`- ${_.brief_summary} (${_.outcome}, ${_.claude_helpfulness})`).join(`
`),r=Array.from(t.values()).filter((_)=>_.friction_detail).slice(0,20).map((_)=>`- ${_.friction_detail}`).join(`
`),o=Array.from(t.values()).flatMap((_)=>_.user_instructions_to_claude||[]).slice(0,15).map((_)=>`- ${_}`).join(`
`),i=Le({sessions:e.total_sessions,analyzed:e.sessions_with_facets,date_range:e.date_range,messages:e.total_messages,hours:Math.round(e.total_duration_hours),commits:e.git_commits,top_tools:Object.entries(e.tool_counts).sort((_,y)=>y[1]-_[1]).slice(0,8),top_goals:Object.entries(e.goal_categories).sort((_,y)=>y[1]-_[1]).slice(0,8),outcomes:e.outcomes,satisfaction:e.satisfaction,friction:e.friction,success:e.success,languages:e.languages},null,2)+`

SESSION SUMMARIES:
`+n+`

FRICTION DETAILS:
`+r+`

USER INSTRUCTIONS TO CLAUDE:
`+(o||"None captured"),a=await Promise.all(ngm.map((_)=>hLl(_,i))),l={};for(let{name:_,result:y}of a)if(y)l[_]=y;let c=l.project_areas?.areas?.map((_)=>`- ${_.name}: ${_.description}`).join(`
`)||"",u=l.what_works?.impressive_workflows?.map((_)=>`- ${_.title}: ${_.description}`).join(`
`)||"",d=l.friction_analysis?.categories?.map((_)=>`- ${_.category}: ${_.description}`).join(`
`)||"",p=l.suggestions?.features_to_try?.map((_)=>`- ${_.feature}: ${_.one_liner}`).join(`
`)||"",m=l.suggestions?.usage_patterns?.map((_)=>`- ${_.title}: ${_.suggestion}`).join(`
`)||"",f=l.on_the_horizon?.opportunities?.map((_)=>`- ${_.title}: ${_.whats_possible}`).join(`
`)||"",h={name:"at_a_glance",prompt:`You're writing an "At a Glance" summary for a Claude Code usage insights report for Claude Code users. The goal is to help them understand their usage and improve how they can use Claude better, especially as models improve.

Use this 4-part structure:

1. **What's working** - What is the user's unique style of interacting with Claude and what are some impactful things they've done? You can include one or two details, but keep it high level since things might not be fresh in the user's memory. Don't be fluffy or overly complimentary. Also, don't focus on the tool calls they use.

2. **What's hindering you** - Split into (a) Claude's fault (misunderstandings, wrong approaches, bugs) and (b) user-side friction (not providing enough context, environment issues -- ideally more general than just one project). Be honest but constructive.

3. **Quick wins to try** - Specific Claude Code features they could try from the examples below, or a workflow technique if you think it's really compelling. (Avoid stuff like "Ask Claude to confirm before taking actions" or "Type out more context up front" which are less compelling.)

4. **Ambitious workflows for better models** - As we move to much more capable models over the next 3-6 months, what should they prepare for? What workflows that seem impossible now will become possible? Draw from the appropriate section below.

Keep each section to 2-3 not-too-long sentences. Don't overwhelm the user. Don't mention specific numerical stats or underlined_categories from the session data below. Use a coaching tone.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "whats_working": "(refer to instructions above)",
  "whats_hindering": "(refer to instructions above)",
  "quick_wins": "(refer to instructions above)",
  "ambitious_workflows": "(refer to instructions above)"
}

SESSION DATA:
${i}

## Project Areas (what user works on)
${c}

## Big Wins (impressive accomplishments)
${u}

## Friction Categories (where things go wrong)
${d}

## Features to Try
${p}

## Usage Patterns to Adopt
${m}

## On the Horizon (ambitious workflows for better models)
${f}`,maxTokens:8192},g=await hLl(h,"");if(g.result)l.at_a_glance=g.result;return l}
function pKn(e){return Tp(e).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}
function Bye(e,t,n=6,r){let o;if(r)o=r.filter((i)=>(i in e)&&(e[i]??0)>0).map((i)=>[i,e[i]??0]);else o=Object.entries(e).sort((i,a)=>a[1]-i[1]).slice(0,n);if(o.length===0)return'<p class="empty">No data</p>';let s=Math.max(...o.map((i)=>i[1]));return o.map(([i,a])=>{let l=a/s*100,c=qhm[i]||i.replaceAll("_"," ").replace(/\b\w/g,(u)=>u.toUpperCase());return`<div class="bar-row">
        <div class="bar-label">${Tp(c)}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${l}%;background:${t}"></div></div>
        <div class="bar-value">${a}</div>
      </div>`}).join(`
`)}
function igm(e){if(e.length===0)return'<p class="empty">No response time data</p>';let t={"2-10s":0,"10-30s":0,"30s-1m":0,"1-2m":0,"2-5m":0,"5-15m":0,">15m":0};for(let r of e)if(r<10)t["2-10s"]=(t["2-10s"]??0)+1;else if(r<30)t["10-30s"]=(t["10-30s"]??0)+1;else if(r<60)t["30s-1m"]=(t["30s-1m"]??0)+1;else if(r<120)t["1-2m"]=(t["1-2m"]??0)+1;else if(r<300)t["2-5m"]=(t["2-5m"]??0)+1;else if(r<900)t["5-15m"]=(t["5-15m"]??0)+1;else t[">15m"]=(t[">15m"]??0)+1;let n=Math.max(...Object.values(t));if(n===0)return'<p class="empty">No response time data</p>';return Object.entries(t).map(([r,o])=>{let s=o/n*100;return`<div class="bar-row">
        <div class="bar-label">${r}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${s}%;background:#6366f1"></div></div>
        <div class="bar-value">${o}</div>
      </div>`}).join(`
`)}
function agm(e){if(e.length===0)return'<p class="empty">No time data</p>';let t=[{label:"Morning (6-12)",range:[6,7,8,9,10,11]},{label:"Afternoon (12-18)",range:[12,13,14,15,16,17]},{label:"Evening (18-24)",range:[18,19,20,21,22,23]},{label:"Night (0-6)",range:[0,1,2,3,4,5]}],n={};for(let i of e)n[i]=(n[i]||0)+1;let r=t.map((i)=>({label:i.label,count:i.range.reduce((a,l)=>a+(n[l]||0),0)})),o=Math.max(...r.map((i)=>i.count))||1;return`<div id="hour-histogram">${r.map((i)=>`
      <div class="bar-row">
        <div class="bar-label">${i.label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${i.count/o*100}%;background:#8b5cf6"></div></div>
        <div class="bar-value">${i.count}</div>
      </div>`).join(`
`)}</div>`}
function lgm(e){let t={};for(let n of e)t[n]=(t[n]||0)+1;return Le(t)}
function cgm(e,t){let n=(x)=>{if(!x)return"";return x.split(`

`).map((H)=>{let I=Tp(H);return I=I.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),I=I.replace(/^- /gm,"\u2022 "),I=I.replaceAll(`
`,"<br>"),`<p>${I}</p>`}).join(`
`)},r=t.at_a_glance,o=r?`
    <div class="at-a-glance">
      <div class="glance-title">At a Glance</div>
      <div class="glance-sections">
        ${r.whats_working?`<div class="glance-section"><strong>What's working:</strong> ${pKn(r.whats_working)} <a href="#section-wins" class="see-more">Impressive Things You Did \u2192</a></div>`:""}
        ${r.whats_hindering?`<div class="glance-section"><strong>What's hindering you:</strong> ${pKn(r.whats_hindering)} <a href="#section-friction" class="see-more">Where Things Go Wrong \u2192</a></div>`:""}
        ${r.quick_wins?`<div class="glance-section"><strong>Quick wins to try:</strong> ${pKn(r.quick_wins)} <a href="#section-features" class="see-more">Features to Try \u2192</a></div>`:""}
        ${r.ambitious_workflows?`<div class="glance-section"><strong>Ambitious workflows:</strong> ${pKn(r.ambitious_workflows)} <a href="#section-horizon" class="see-more">On the Horizon \u2192</a></div>`:""}
      </div>
    </div>
    `:"",s=t.project_areas?.areas||[],i=s.length>0?`
    <h2 id="section-work">What You Work On</h2>
    <div class="project-areas">
      ${s.map((x)=>`
        <div class="project-area">
          <div class="area-header">
            <span class="area-name">${Tp(x.name)}</span>
            <span class="area-count">~${x.session_count} sessions</span>
          </div>
          <div class="area-desc">${Tp(x.description)}</div>
        </div>
      `).join("")}
    </div>
    `:"",a=t.interaction_style,l=a?.narrative?`
    <h2 id="section-usage">How You Use Claude Code</h2>
    <div class="narrative">
      ${n(a.narrative)}
      ${a.key_pattern?`<div class="key-insight"><strong>Key pattern:</strong> ${Tp(a.key_pattern)}</div>`:""}
    </div>
    `:"",c=t.what_works,u=c?.impressive_workflows&&c.impressive_workflows.length>0?`
    <h2 id="section-wins">Impressive Things You Did</h2>
    ${c.intro?`<p class="section-intro">${Tp(c.intro)}</p>`:""}
    <div class="big-wins">
      ${c.impressive_workflows.map((x)=>`
        <div class="big-win">
          <div class="big-win-title">${Tp(x.title||"")}</div>
          <div class="big-win-desc">${Tp(x.description||"")}</div>
        </div>
      `).join("")}
    </div>
    `:"",d=t.friction_analysis,p=d?.categories&&d.categories.length>0?`
    <h2 id="section-friction">Where Things Go Wrong</h2>
    ${d.intro?`<p class="section-intro">${Tp(d.intro)}</p>`:""}
    <div class="friction-categories">
      ${d.categories.map((x)=>`
        <div class="friction-category">
          <div class="friction-title">${Tp(x.category||"")}</div>
          <div class="friction-desc">${Tp(x.description||"")}</div>
          ${x.examples?`<ul class="friction-examples">${x.examples.map((H)=>`<li>${Tp(H)}</li>`).join("")}</ul>`:""}
        </div>
      `).join("")}
    </div>
    `:"",m=t.suggestions,f=m?`
    ${m.claude_md_additions&&m.claude_md_additions.length>0?`
    <h2 id="section-features">Existing CC Features to Try</h2>
    <div class="claude-md-section">
      <h3>Suggested CLAUDE.md Additions</h3>
      <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Just copy this into Claude Code to add it to your CLAUDE.md.</p>
      <div class="claude-md-actions">
        <button class="copy-all-btn" onclick="copyAllCheckedClaudeMd()">Copy All Checked</button>
      </div>
      ${m.claude_md_additions.map((x,H)=>`
        <div class="claude-md-item">
          <input type="checkbox" id="cmd-${H}" class="cmd-checkbox" checked data-text="${Tp(x.prompt_scaffold||x.where||"Add to CLAUDE.md")}\\n\\n${Tp(x.addition)}">
          <label for="cmd-${H}">
            <code class="cmd-code">${Tp(x.addition)}</code>
            <button class="copy-btn" onclick="copyCmdItem(${H})">Copy</button>
          </label>
          <div class="cmd-why">${Tp(x.why)}</div>
        </div>
      `).join("")}
    </div>
    `:""}
    ${m.features_to_try&&m.features_to_try.length>0?`
    <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Just copy this into Claude Code and it'll set it up for you.</p>
    <div class="features-section">
      ${m.features_to_try.map((x)=>`
        <div class="feature-card">
          <div class="feature-title">${Tp(x.feature||"")}</div>
          <div class="feature-oneliner">${Tp(x.one_liner||"")}</div>
          <div class="feature-why"><strong>Why for you:</strong> ${Tp(x.why_for_you||"")}</div>
          ${x.example_code?`
          <div class="feature-examples">
            <div class="feature-example">
              <div class="example-code-row">
                <code class="example-code">${Tp(x.example_code)}</code>
                <button class="copy-btn" onclick="copyText(this)">Copy</button>
              </div>
            </div>
          </div>
          `:""}
        </div>
      `).join("")}
    </div>
    `:""}
    ${m.usage_patterns&&m.usage_patterns.length>0?`
    <h2 id="section-patterns">New Ways to Use Claude Code</h2>
    <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Just copy this into Claude Code and it'll walk you through it.</p>
    <div class="patterns-section">
      ${m.usage_patterns.map((x)=>`
        <div class="pattern-card">
          <div class="pattern-title">${Tp(x.title||"")}</div>
          <div class="pattern-summary">${Tp(x.suggestion||"")}</div>
          ${x.detail?`<div class="pattern-detail">${Tp(x.detail)}</div>`:""}
          ${x.copyable_prompt?`
          <div class="copyable-prompt-section">
            <div class="prompt-label">Paste into Claude Code:</div>
            <div class="copyable-prompt-row">
              <code class="copyable-prompt">${Tp(x.copyable_prompt)}</code>
              <button class="copy-btn" onclick="copyText(this)">Copy</button>
            </div>
          </div>
          `:""}
        </div>
      `).join("")}
    </div>
    `:""}
    `:"",A=t.on_the_horizon,h=A?.opportunities&&A.opportunities.length>0?`
    <h2 id="section-horizon">On the Horizon</h2>
    ${A.intro?`<p class="section-intro">${Tp(A.intro)}</p>`:""}
    <div class="horizon-section">
      ${A.opportunities.map((x)=>`
        <div class="horizon-card">
          <div class="horizon-title">${Tp(x.title||"")}</div>
          <div class="horizon-possible">${Tp(x.whats_possible||"")}</div>
          ${x.how_to_try?`<div class="horizon-tip"><strong>Getting started:</strong> ${Tp(x.how_to_try)}</div>`:""}
          ${x.copyable_prompt?`<div class="pattern-prompt"><div class="prompt-label">Paste into Claude Code:</div><code>${Tp(x.copyable_prompt)}</code><button class="copy-btn" onclick="copyText(this)">Copy</button></div>`:""}
        </div>
      `).join("")}
    </div>
    `:"",g=[],_=[],y=g.length>0||_.length>0?`
    <h2 id="section-feedback" class="feedback-header">Closing the Loop: Feedback for Other Teams</h2>
    <p class="feedback-intro">Suggestions for the CC product and model teams based on your usage patterns. Click to expand.</p>
    ${g.length>0?`
    <div class="collapsible-section">
      <div class="collapsible-header" onclick="toggleCollapsible(this)">
        <span class="collapsible-arrow">\u25B6</span>
        <h3>Product Improvements for CC Team</h3>
      </div>
      <div class="collapsible-content">
        <div class="suggestions-section">
          ${g.map((x)=>`
            <div class="feedback-card team-card">
              <div class="feedback-title">${Tp(x.title||"")}</div>
              <div class="feedback-detail">${Tp(x.detail||"")}</div>
              ${x.evidence?`<div class="feedback-evidence"><em>Evidence:</em> ${Tp(x.evidence)}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    </div>
    `:""}
    ${_.length>0?`
    <div class="collapsible-section">
      <div class="collapsible-header" onclick="toggleCollapsible(this)">
        <span class="collapsible-arrow">\u25B6</span>
        <h3>Model Behavior Improvements</h3>
      </div>
      <div class="collapsible-content">
        <div class="suggestions-section">
          ${_.map((x)=>`
            <div class="feedback-card model-card">
              <div class="feedback-title">${Tp(x.title||"")}</div>
              <div class="feedback-detail">${Tp(x.detail||"")}</div>
              ${x.evidence?`<div class="feedback-evidence"><em>Evidence:</em> ${Tp(x.evidence)}</div>`:""}
            </div>
          `).join("")}
        </div>
      </div>
    </div>
    `:""}
    `:"",T=t.fun_ending,S=T?.headline?`
    <div class="fun-ending">
      <div class="fun-headline">"${Tp(T.headline)}"</div>
      ${T.detail?`<div class="fun-detail">${Tp(T.detail)}</div>`:""}
    </div>
    `:"",v=`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #334155; line-height: 1.65; padding: 48px 24px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 32px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
    h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 48px; margin-bottom: 16px; }
    .subtitle { color: #64748b; font-size: 15px; margin-bottom: 32px; }
    .nav-toc { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 32px 0; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
    .nav-toc a { font-size: 12px; color: #64748b; text-decoration: none; padding: 6px 12px; border-radius: 6px; background: #f1f5f9; transition: all 0.15s; }
    .nav-toc a:hover { background: #e2e8f0; color: #334155; }
    .stats-row { display: flex; gap: 24px; margin-bottom: 40px; padding: 20px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-value { font-size: 24px; font-weight: 700; color: #0f172a; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .at-a-glance { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
    .glance-title { font-size: 16px; font-weight: 700; color: #92400e; margin-bottom: 16px; }
    .glance-sections { display: flex; flex-direction: column; gap: 12px; }
    .glance-section { font-size: 14px; color: #78350f; line-height: 1.6; }
    .glance-section strong { color: #92400e; }
    .see-more { color: #b45309; text-decoration: none; font-size: 13px; white-space: nowrap; }
    .see-more:hover { text-decoration: underline; }
    .project-areas { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .project-area { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .area-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .area-name { font-weight: 600; font-size: 15px; color: #0f172a; }
    .area-count { font-size: 12px; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
    .area-desc { font-size: 14px; color: #475569; line-height: 1.5; }
    .narrative { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .narrative p { margin-bottom: 12px; font-size: 14px; color: #475569; line-height: 1.7; }
    .key-insight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 14px; color: #166534; }
    .section-intro { font-size: 14px; color: #64748b; margin-bottom: 16px; }
    .big-wins { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .big-win { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; }
    .big-win-title { font-weight: 600; font-size: 15px; color: #166534; margin-bottom: 8px; }
    .big-win-desc { font-size: 14px; color: #15803d; line-height: 1.5; }
    .friction-categories { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .friction-category { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; }
    .friction-title { font-weight: 600; font-size: 15px; color: #991b1b; margin-bottom: 6px; }
    .friction-desc { font-size: 13px; color: #7f1d1d; margin-bottom: 10px; }
    .friction-examples { margin: 0 0 0 20px; font-size: 13px; color: #334155; }
    .friction-examples li { margin-bottom: 4px; }
    .claude-md-section { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
    .claude-md-section h3 { font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0; }
    .claude-md-actions { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #dbeafe; }
    .copy-all-btn { background: #2563eb; color: white; border: none; border-radius: 4px; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .copy-all-btn:hover { background: #1d4ed8; }
    .copy-all-btn.copied { background: #16a34a; }
    .claude-md-item { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px; padding: 10px 0; border-bottom: 1px solid #dbeafe; }
    .claude-md-item:last-child { border-bottom: none; }
    .cmd-checkbox { margin-top: 2px; }
    .cmd-code { background: white; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #1e40af; border: 1px solid #bfdbfe; font-family: monospace; display: block; white-space: pre-wrap; word-break: break-word; flex: 1; }
    .cmd-why { font-size: 12px; color: #64748b; width: 100%; padding-left: 24px; margin-top: 4px; }
    .features-section, .patterns-section { display: flex; flex-direction: column; gap: 12px; margin: 16px 0; }
    .feature-card { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; }
    .pattern-card { background: #f0f9ff; border: 1px solid #7dd3fc; border-radius: 8px; padding: 16px; }
    .feature-title, .pattern-title { font-weight: 600; font-size: 15px; color: #0f172a; margin-bottom: 6px; }
    .feature-oneliner { font-size: 14px; color: #475569; margin-bottom: 8px; }
    .pattern-summary { font-size: 14px; color: #475569; margin-bottom: 8px; }
    .feature-why, .pattern-detail { font-size: 13px; color: #334155; line-height: 1.5; }
    .feature-examples { margin-top: 12px; }
    .feature-example { padding: 8px 0; border-top: 1px solid #d1fae5; }
    .feature-example:first-child { border-top: none; }
    .example-desc { font-size: 13px; color: #334155; margin-bottom: 6px; }
    .example-code-row { display: flex; align-items: flex-start; gap: 8px; }
    .example-code { flex: 1; background: #f1f5f9; padding: 8px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; overflow-x: auto; white-space: pre-wrap; }
    .copyable-prompt-section { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; }
    .copyable-prompt-row { display: flex; align-items: flex-start; gap: 8px; }
    .copyable-prompt { flex: 1; background: #f8fafc; padding: 10px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; border: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.5; }
    .feature-code { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-start; gap: 8px; }
    .feature-code code { flex: 1; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; }
    .pattern-prompt { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; }
    .pattern-prompt code { font-family: monospace; font-size: 12px; color: #334155; display: block; white-space: pre-wrap; margin-bottom: 8px; }
    .prompt-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .copy-btn { background: #e2e8f0; border: none; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; color: #475569; flex-shrink: 0; }
    .copy-btn:hover { background: #cbd5e1; }
    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0; }
    .chart-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .chart-title { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
    .bar-row { display: flex; align-items: center; margin-bottom: 6px; }
    .bar-label { width: 100px; font-size: 11px; color: #475569; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bar-track { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; margin: 0 8px; }
    .bar-fill { height: 100%; border-radius: 3px; }
    .bar-value { width: 28px; font-size: 11px; font-weight: 500; color: #64748b; text-align: right; }
    .empty { color: #94a3b8; font-size: 13px; }
    .horizon-section { display: flex; flex-direction: column; gap: 16px; }
    .horizon-card { background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%); border: 1px solid #c4b5fd; border-radius: 8px; padding: 16px; }
    .horizon-title { font-weight: 600; font-size: 15px; color: #5b21b6; margin-bottom: 8px; }
    .horizon-possible { font-size: 14px; color: #334155; margin-bottom: 10px; line-height: 1.5; }
    .horizon-tip { font-size: 13px; color: #6b21a8; background: rgba(255,255,255,0.6); padding: 8px 12px; border-radius: 4px; }
    .feedback-header { margin-top: 48px; color: #64748b; font-size: 16px; }
    .feedback-intro { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
    .feedback-section { margin-top: 16px; }
    .feedback-section h3 { font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 12px; }
    .feedback-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .feedback-card.team-card { background: #eff6ff; border-color: #bfdbfe; }
    .feedback-card.model-card { background: #faf5ff; border-color: #e9d5ff; }
    .feedback-title { font-weight: 600; font-size: 14px; color: #0f172a; margin-bottom: 6px; }
    .feedback-detail { font-size: 13px; color: #475569; line-height: 1.5; }
    .feedback-evidence { font-size: 12px; color: #64748b; margin-top: 8px; }
    .fun-ending { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #fbbf24; border-radius: 12px; padding: 24px; margin-top: 40px; text-align: center; }
    .fun-headline { font-size: 18px; font-weight: 600; color: #78350f; margin-bottom: 8px; }
    .fun-detail { font-size: 14px; color: #92400e; }
    .collapsible-section { margin-top: 16px; }
    .collapsible-header { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .collapsible-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #475569; }
    .collapsible-arrow { font-size: 12px; color: #94a3b8; transition: transform 0.2s; }
    .collapsible-content { display: none; padding-top: 16px; }
    .collapsible-content.open { display: block; }
    .collapsible-header.open .collapsible-arrow { transform: rotate(90deg); }
    @media (max-width: 640px) { .charts-row { grid-template-columns: 1fr; } .stats-row { justify-content: center; } }
  `,k=`
    function toggleCollapsible(header) {
      header.classList.toggle('open');
      const content = header.nextElementSibling;
      content.classList.toggle('open');
    }
    function copyText(btn) {
      const code = btn.previousElementSibling;
      navigator.clipboard.writeText(code.textContent).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    }
    function copyCmdItem(idx) {
      const checkbox = document.getElementById('cmd-' + idx);
      if (checkbox) {
        const text = checkbox.dataset.text;
        navigator.clipboard.writeText(text).then(() => {
          const btn = checkbox.nextElementSibling.querySelector('.copy-btn');
          if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = 'Copy'; }, 2000); }
        });
      }
    }
    function copyAllCheckedClaudeMd() {
      const checkboxes = document.querySelectorAll('.cmd-checkbox:checked');
      const texts = [];
      checkboxes.forEach(cb => {
        if (cb.dataset.text) { texts.push(cb.dataset.text); }
      });
      const combined = texts.join('\\n');
      const btn = document.querySelector('.copy-all-btn');
      if (btn) {
        navigator.clipboard.writeText(combined).then(() => {
          btn.textContent = 'Copied ' + texts.length + ' items!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy All Checked'; btn.classList.remove('copied'); }, 2000);
        });
      }
    }
    // Timezone selector for time of day chart (data is from our own analytics, not user input)
    const rawHourCounts = ${lgm(e.message_hours)};
    function updateHourHistogram(offsetFromPT) {
      const periods = [
        { label: "Morning (6-12)", range: [6,7,8,9,10,11] },
        { label: "Afternoon (12-18)", range: [12,13,14,15,16,17] },
        { label: "Evening (18-24)", range: [18,19,20,21,22,23] },
        { label: "Night (0-6)", range: [0,1,2,3,4,5] }
      ];
      const adjustedCounts = {};
      for (const [hour, count] of Object.entries(rawHourCounts)) {
        const newHour = (parseInt(hour) + offsetFromPT + 24) % 24;
        adjustedCounts[newHour] = (adjustedCounts[newHour] || 0) + count;
      }
      const periodCounts = periods.map(p => ({
        label: p.label,
        count: p.range.reduce((sum, h) => sum + (adjustedCounts[h] || 0), 0)
      }));
      const maxCount = Math.max(...periodCounts.map(p => p.count)) || 1;
      const container = document.getElementById('hour-histogram');
      container.textContent = '';
      periodCounts.forEach(p => {
        const row = document.createElement('div');
        row.className = 'bar-row';
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = p.label;
        const track = document.createElement('div');
        track.className = 'bar-track';
        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        fill.style.width = (p.count / maxCount) * 100 + '%';
        fill.style.background = '#8b5cf6';
        track.appendChild(fill);
        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = p.count;
        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        container.appendChild(row);
      });
    }
    document.getElementById('timezone-select').addEventListener('change', function() {
      const customInput = document.getElementById('custom-offset');
      if (this.value === 'custom') {
        customInput.style.display = 'inline-block';
        customInput.focus();
      } else {
        customInput.style.display = 'none';
        updateHourHistogram(parseInt(this.value));
      }
    });
    document.getElementById('custom-offset').addEventListener('change', function() {
      const parsed = parseInt(this.value, 10);
      if (isNaN(parsed)) return;
      updateHourHistogram(parsed + 8);
    });
  `;return`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Claude Code Insights</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #334155; line-height: 1.65; padding: 48px 24px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 32px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
    h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 48px; margin-bottom: 16px; }
    .subtitle { color: #64748b; font-size: 15px; margin-bottom: 32px; }
    .nav-toc { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 32px 0; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
    .nav-toc a { font-size: 12px; color: #64748b; text-decoration: none; padding: 6px 12px; border-radius: 6px; background: #f1f5f9; transition: all 0.15s; }
    .nav-toc a:hover { background: #e2e8f0; color: #334155; }
    .stats-row { display: flex; gap: 24px; margin-bottom: 40px; padding: 20px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-value { font-size: 24px; font-weight: 700; color: #0f172a; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .at-a-glance { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
    .glance-title { font-size: 16px; font-weight: 700; color: #92400e; margin-bottom: 16px; }
    .glance-sections { display: flex; flex-direction: column; gap: 12px; }
    .glance-section { font-size: 14px; color: #78350f; line-height: 1.6; }
    .glance-section strong { color: #92400e; }
    .see-more { color: #b45309; text-decoration: none; font-size: 13px; white-space: nowrap; }
    .see-more:hover { text-decoration: underline; }
    .project-areas { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .project-area { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .area-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .area-name { font-weight: 600; font-size: 15px; color: #0f172a; }
    .area-count { font-size: 12px; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
    .area-desc { font-size: 14px; color: #475569; line-height: 1.5; }
    .narrative { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .narrative p { margin-bottom: 12px; font-size: 14px; color: #475569; line-height: 1.7; }
    .key-insight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 14px; color: #166534; }
    .section-intro { font-size: 14px; color: #64748b; margin-bottom: 16px; }
    .big-wins { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .big-win { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; }
    .big-win-title { font-weight: 600; font-size: 15px; color: #166534; margin-bottom: 8px; }
    .big-win-desc { font-size: 14px; color: #15803d; line-height: 1.5; }
    .friction-categories { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .friction-category { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; }
    .friction-title { font-weight: 600; font-size: 15px; color: #991b1b; margin-bottom: 6px; }
    .friction-desc { font-size: 13px; color: #7f1d1d; margin-bottom: 10px; }
    .friction-examples { margin: 0 0 0 20px; font-size: 13px; color: #334155; }
    .friction-examples li { margin-bottom: 4px; }
    .claude-md-section { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
    .claude-md-section h3 { font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0; }
    .claude-md-actions { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #dbeafe; }
    .copy-all-btn { background: #2563eb; color: white; border: none; border-radius: 4px; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .copy-all-btn:hover { background: #1d4ed8; }
    .copy-all-btn.copied { background: #16a34a; }
    .claude-md-item { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px; padding: 10px 0; border-bottom: 1px solid #dbeafe; }
    .claude-md-item:last-child { border-bottom: none; }
    .cmd-checkbox { margin-top: 2px; }
    .cmd-code { background: white; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #1e40af; border: 1px solid #bfdbfe; font-family: monospace; display: block; white-space: pre-wrap; word-break: break-word; flex: 1; }
    .cmd-why { font-size: 12px; color: #64748b; width: 100%; padding-left: 24px; margin-top: 4px; }
    .features-section, .patterns-section { display: flex; flex-direction: column; gap: 12px; margin: 16px 0; }
    .feature-card { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; }
    .pattern-card { background: #f0f9ff; border: 1px solid #7dd3fc; border-radius: 8px; padding: 16px; }
    .feature-title, .pattern-title { font-weight: 600; font-size: 15px; color: #0f172a; margin-bottom: 6px; }
    .feature-oneliner { font-size: 14px; color: #475569; margin-bottom: 8px; }
    .pattern-summary { font-size: 14px; color: #475569; margin-bottom: 8px; }
    .feature-why, .pattern-detail { font-size: 13px; color: #334155; line-height: 1.5; }
    .feature-examples { margin-top: 12px; }
    .feature-example { padding: 8px 0; border-top: 1px solid #d1fae5; }
    .feature-example:first-child { border-top: none; }
    .example-desc { font-size: 13px; color: #334155; margin-bottom: 6px; }
    .example-code-row { display: flex; align-items: flex-start; gap: 8px; }
    .example-code { flex: 1; background: #f1f5f9; padding: 8px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; overflow-x: auto; white-space: pre-wrap; }
    .copyable-prompt-section { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; }
    .copyable-prompt-row { display: flex; align-items: flex-start; gap: 8px; }
    .copyable-prompt { flex: 1; background: #f8fafc; padding: 10px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; border: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.5; }
    .feature-code { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-start; gap: 8px; }
    .feature-code code { flex: 1; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; }
    .pattern-prompt { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; }
    .pattern-prompt code { font-family: monospace; font-size: 12px; color: #334155; display: block; white-space: pre-wrap; margin-bottom: 8px; }
    .prompt-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .copy-btn { background: #e2e8f0; border: none; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; color: #475569; flex-shrink: 0; }
    .copy-btn:hover { background: #cbd5e1; }
    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0; }
    .chart-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .chart-title { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
    .bar-row { display: flex; align-items: center; margin-bottom: 6px; }
    .bar-label { width: 100px; font-size: 11px; color: #475569; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bar-track { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; margin: 0 8px; }
    .bar-fill { height: 100%; border-radius: 3px; }
    .bar-value { width: 28px; font-size: 11px; font-weight: 500; color: #64748b; text-align: right; }
    .empty { color: #94a3b8; font-size: 13px; }
    .horizon-section { display: flex; flex-direction: column; gap: 16px; }
    .horizon-card { background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%); border: 1px solid #c4b5fd; border-radius: 8px; padding: 16px; }
    .horizon-title { font-weight: 600; font-size: 15px; color: #5b21b6; margin-bottom: 8px; }
    .horizon-possible { font-size: 14px; color: #334155; margin-bottom: 10px; line-height: 1.5; }
    .horizon-tip { font-size: 13px; color: #6b21a8; background: rgba(255,255,255,0.6); padding: 8px 12px; border-radius: 4px; }
    .feedback-header { margin-top: 48px; color: #64748b; font-size: 16px; }
    .feedback-intro { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
    .feedback-section { margin-top: 16px; }
    .feedback-section h3 { font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 12px; }
    .feedback-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .feedback-card.team-card { background: #eff6ff; border-color: #bfdbfe; }
    .feedback-card.model-card { background: #faf5ff; border-color: #e9d5ff; }
    .feedback-title { font-weight: 600; font-size: 14px; color: #0f172a; margin-bottom: 6px; }
    .feedback-detail { font-size: 13px; color: #475569; line-height: 1.5; }
    .feedback-evidence { font-size: 12px; color: #64748b; margin-top: 8px; }
    .fun-ending { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #fbbf24; border-radius: 12px; padding: 24px; margin-top: 40px; text-align: center; }
    .fun-headline { font-size: 18px; font-weight: 600; color: #78350f; margin-bottom: 8px; }
    .fun-detail { font-size: 14px; color: #92400e; }
    .collapsible-section { margin-top: 16px; }
    .collapsible-header { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .collapsible-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #475569; }
    .collapsible-arrow { font-size: 12px; color: #94a3b8; transition: transform 0.2s; }
    .collapsible-content { display: none; padding-top: 16px; }
    .collapsible-content.open { display: block; }
    .collapsible-header.open .collapsible-arrow { transform: rotate(90deg); }
    @media (max-width: 640px) { .charts-row { grid-template-columns: 1fr; } .stats-row { justify-content: center; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>Claude Code Insights</h1>
    <p class="subtitle">${e.total_messages.toLocaleString()} messages across ${e.total_sessions} sessions${e.total_sessions_scanned&&e.total_sessions_scanned>e.total_sessions?` (${e.total_sessions_scanned.toLocaleString()} total)`:""} | ${e.date_range.start} to ${e.date_range.end}</p>

    ${o}

    <nav class="nav-toc">
      <a href="#section-work">What You Work On</a>
      <a href="#section-usage">How You Use CC</a>
      <a href="#section-wins">Impressive Things</a>
      <a href="#section-friction">Where Things Go Wrong</a>
      <a href="#section-features">Features to Try</a>
      <a href="#section-patterns">New Usage Patterns</a>
      <a href="#section-horizon">On the Horizon</a>
      <a href="#section-feedback">Team Feedback</a>
    </nav>

    <div class="stats-row">
      <div class="stat"><div class="stat-value">${e.total_messages.toLocaleString()}</div><div class="stat-label">Messages</div></div>
      <div class="stat"><div class="stat-value">+${e.total_lines_added.toLocaleString()}/-${e.total_lines_removed.toLocaleString()}</div><div class="stat-label">Lines</div></div>
      <div class="stat"><div class="stat-value">${e.total_files_modified}</div><div class="stat-label">Files</div></div>
      <div class="stat"><div class="stat-value">${e.days_active}</div><div class="stat-label">Days</div></div>
      <div class="stat"><div class="stat-value">${e.messages_per_day}</div><div class="stat-label">Msgs/Day</div></div>
    </div>

    ${i}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">What You Wanted</div>
        ${Bye(e.goal_categories,"#2563eb")}
      </div>
      <div class="chart-card">
        <div class="chart-title">Top Tools Used</div>
        ${Bye(e.tool_counts,"#0891b2")}
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Languages</div>
        ${Bye(e.languages,"#10b981")}
      </div>
      <div class="chart-card">
        <div class="chart-title">Session Types</div>
        ${Bye(e.session_types||{},"#8b5cf6")}
      </div>
    </div>

    ${l}

    <!-- Response Time Distribution -->
    <div class="chart-card" style="margin: 24px 0;">
      <div class="chart-title">User Response Time Distribution</div>
      ${igm(e.user_response_times)}
      <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
        Median: ${e.median_response_time.toFixed(1)}s &bull; Average: ${e.avg_response_time.toFixed(1)}s
      </div>
    </div>

    <!-- Multi-clauding Section (matching Python reference) -->
    <div class="chart-card" style="margin: 24px 0;">
      <div class="chart-title">Multi-Clauding (Parallel Sessions)</div>
      ${e.multi_clauding.overlap_events===0?`
        <p style="font-size: 14px; color: #64748b; padding: 8px 0;">
          No parallel session usage detected. You typically work with one Claude Code session at a time.
        </p>
      `:`
        <div style="display: flex; gap: 24px; margin: 12px 0;">
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">${e.multi_clauding.overlap_events}</div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Overlap Events</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">${e.multi_clauding.sessions_involved}</div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Sessions Involved</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">${e.total_messages>0?Math.round(100*e.multi_clauding.user_messages_during/e.total_messages):0}%</div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Of Messages</div>
          </div>
        </div>
        <p style="font-size: 13px; color: #475569; margin-top: 12px;">
          You run multiple Claude Code sessions simultaneously. Multi-clauding is detected when sessions
          overlap in time, suggesting parallel workflows.
        </p>
      `}
    </div>

    <!-- Time of Day & Tool Errors -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title" style="display: flex; align-items: center; gap: 12px;">
          User Messages by Time of Day
          <select id="timezone-select" style="font-size: 12px; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <option value="0">PT (UTC-8)</option>
            <option value="3">ET (UTC-5)</option>
            <option value="8">London (UTC)</option>
            <option value="9">CET (UTC+1)</option>
            <option value="17">Tokyo (UTC+9)</option>
            <option value="custom">Custom offset...</option>
          </select>
          <input type="number" id="custom-offset" placeholder="UTC offset" style="display: none; width: 80px; font-size: 12px; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
        </div>
        ${agm(e.message_hours)}
      </div>
      <div class="chart-card">
        <div class="chart-title">Tool Errors Encountered</div>
        ${Object.keys(e.tool_error_categories).length>0?Bye(e.tool_error_categories,"#dc2626"):'<p class="empty">No tool errors</p>'}
      </div>
    </div>

    ${u}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">What Helped Most (Claude's Capabilities)</div>
        ${Bye(e.success,"#16a34a")}
      </div>
      <div class="chart-card">
        <div class="chart-title">Outcomes</div>
        ${Bye(e.outcomes,"#8b5cf6",6,sgm)}
      </div>
    </div>

    ${p}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Primary Friction Types</div>
        ${Bye(e.friction,"#dc2626")}
      </div>
      <div class="chart-card">
        <div class="chart-title">Inferred Satisfaction (model-estimated)</div>
        ${Bye(e.satisfaction,"#eab308",6,ogm)}
      </div>
    </div>

    ${f}

    ${h}

    ${S}

    ${y}
  </div>
  <script>${k}</script>
</body>
</html>`}
function buildExportData(e,t,n,r){let o={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION,s=r?.hosts.filter((a)=>a.sessionCount>0).map((a)=>a.name),i={total:n.size,goal_categories:{},outcomes:{},satisfaction:{},friction:{}};for(let a of n.values()){for(let[l,c]of Xft(a.goal_categories))if(c>0)i.goal_categories[l]=(i.goal_categories[l]||0)+c;i.outcomes[a.outcome]=(i.outcomes[a.outcome]||0)+1;for(let[l,c]of Xft(a.user_satisfaction_counts))if(c>0)i.satisfaction[l]=(i.satisfaction[l]||0)+c;for(let[l,c]of Xft(a.friction_counts))if(c>0)i.friction[l]=(i.friction[l]||0)+c}return{metadata:{username:process.env.SAFEUSER||process.env.USER||"unknown",generated_at:new Date().toISOString(),claude_code_version:o,date_range:e.date_range,session_count:e.total_sessions,...s&&s.length>0&&{remote_hosts_collected:s}},aggregated_data:e,insights:t,facets_summary:i}}
async function dgm(){let e=Dz(),t;try{t=await jU.readdir(e,{withFileTypes:!0})}catch{return[]}let n=t.filter((o)=>o.isDirectory()).map((o)=>jG.join(e,o.name)),r=[];for(let o=0;o<n.length;o++){let s=await getSessionFilesWithMtime(n[o]);for(let[i,a]of s)r.push({sessionId:i,path:a.path,mtime:a.mtime,size:a.size});if(o%10===9)await new Promise((i)=>setImmediate(i))}return r.sort((o,s)=>s.mtime-o.mtime),r}
async function generateUsageReport(e){let t,n=await dgm(),r=n.length,o=50,s=200,i=[],a=[];for(let N=0;N<n.length;N+=o){let O=n.slice(N,N+o),$=await Promise.all(O.map(async(U)=>({sessionInfo:U,cached:await Zhm(U.sessionId)})));for(let{sessionInfo:U,cached:W}of $)if(W)i.push(W);else if(a.length<s)a.push(U)}let l=new Map,c=(N)=>{for(let O of N.messages.slice(0,5))if(O.type==="user"&&O.message){let $=O.message.content;if(typeof $==="string"){if($.includes("RESPOND WITH ONLY A VALID JSON OBJECT")||$.includes("record_facets"))return!0}}return!1},u=10;for(let N=0;N<a.length;N+=u){let O=a.slice(N,N+u),$=await Promise.all(O.map(async(W)=>{try{return await loadAllLogsFromSessionFile(W.path)}catch{return[]}})),U=new Map;for(let W of $)for(let G of W){if(c(G)||!Ghm(G))continue;let V=kko(G);if(i.push(V),xko(V,U.get(V.session_id)))U.set(V.session_id,V);l.set(V.session_id,G)}await Promise.all([...U.values()].map((W)=>egm(W)))}let d=new Map;for(let N of i)if(xko(N,d.get(N.session_id)))d.set(N.session_id,N);let p=new Set(d.keys());i=[...d.values()];for(let N of l.keys())if(!p.has(N))l.delete(N);i.sort((N,O)=>O.start_time.localeCompare(N.start_time));let m=(N)=>{if(N.user_message_count<2)return!1;if(N.duration_minutes<1)return!1;return!0},f=i.filter(m),A=new Map,h=[],g=50,_=await Promise.all(f.map(async(N)=>({sessionId:N.session_id,cached:await Xhm(N.session_id)})));for(let{sessionId:N,cached:O}of _)if(O)A.set(N,O);else{let $=l.get(N);if($&&h.length<g)h.push({log:$,sessionId:N})}let y=50;for(let N=0;N<h.length;N+=y){let O=h.slice(N,N+y),$=await Promise.all(O.map(async({log:W,sessionId:G})=>{let V=await tgm(W,G);return{sessionId:G,newFacets:V}})),U=[];for(let{sessionId:W,newFacets:G}of $)if(G)A.set(W,G),U.push(G);await Promise.all(U.map((W)=>Qhm(W)))}let T=(N)=>{let O=A.get(N);if(!O)return!1;let $=O.goal_categories,U=pgm($).filter((W)=>($[W]??0)>0);return U.length===1&&U[0]==="warmup_minimal"},S=f.filter((N)=>!T(N.session_id)),v=new Map;for(let[N,O]of A)if(!T(N))v.set(N,O);let R=aggregateData(S,v);R.total_sessions_scanned=r;let k=await rgm(R,A),x=cgm(R,k);try{await jU.mkdir(w5t(),{recursive:!0})}catch{}let H=new Date,I=(N)=>String(N).padStart(2,"0"),P=`${H.getFullYear()}-${I(H.getMonth()+1)}-${I(H.getDate())}-${I(H.getHours())}${I(H.getMinutes())}${I(H.getSeconds())}`,L=jG.join(w5t(),`report-${P}.html`),D=jG.join(w5t(),"report.html");return await jU.writeFile(L,x,{encoding:"utf-8",mode:384}),await jU.writeFile(D,x,{encoding:"utf-8",mode:384}),{insights:k,htmlPath:L,data:R,remoteStats:t,facets:v}}
function Xft(e){return e?Object.entries(e):[]}
function pgm(e){return e?Object.keys(e):[]}
function buildInsightsResponsePrompt({insightsJson:e,reportUrl:t,htmlPath:n,facetsDir:r,header:o,summaryText:s}){return`The user just ran /insights to generate a usage report analyzing their Claude Code sessions.

Here is the full insights data:
${e}

Report URL: ${t}
HTML file: ${n}
Facets directory: ${r}

At-a-glance summary (for your context only \u2014 the user has not seen any output yet):
${o}${s}

Output the text between <message> tags verbatim as your entire response. Do not omit any line:

<message>
Your shareable insights report is ready:
${t}

Want to dig into any section or try one of the suggestions?
</message>`}
function CLl(e){if(!e||typeof e!=="object")return!1;let t=e;return typeof t.underlying_goal==="string"&&typeof t.outcome==="string"&&typeof t.brief_summary==="string"&&t.goal_categories!==null&&typeof t.goal_categories==="object"&&t.user_satisfaction_counts!==null&&typeof t.user_satisfaction_counts==="object"&&t.friction_counts!==null&&typeof t.friction_counts==="object"}
var jU,jG,$hm,qhm,jhm=`Analyze this Claude Code session and extract structured facets.

CRITICAL GUIDELINES:

1. **goal_categories**: Count ONLY what the USER explicitly asked for.
   - DO NOT count Claude's autonomous codebase exploration
   - DO NOT count work Claude decided to do on its own
   - ONLY count when user says "can you...", "please...", "I need...", "let's..."

2. **user_satisfaction_counts**: Base ONLY on explicit user signals.
   - "Yay!", "great!", "perfect!" \u2192 happy
   - "thanks", "looks good", "that works" \u2192 satisfied
   - "ok, now let's..." (continuing without complaint) \u2192 likely_satisfied
   - "that's not right", "try again" \u2192 dissatisfied
   - "this is broken", "I give up" \u2192 frustrated

3. **friction_counts**: Be specific about what went wrong.
   - misunderstood_request: Claude interpreted incorrectly
   - wrong_approach: Right goal, wrong solution method
   - buggy_code: Code didn't work correctly
   - user_rejected_action: User said no/stop to a tool call
   - excessive_changes: Over-engineered or changed too much

4. If very short or just warmup, use warmup_minimal for goal_category

SESSION:
`,zhm=`Summarize this portion of a Claude Code session transcript. Focus on:
1. What the user asked for
2. What Claude did (tools used, files modified)
3. Any friction or issues
4. The outcome

Keep it concise - 3-5 sentences. Preserve specific details like file names, error messages, and user feedback.

TRANSCRIPT CHUNK:
`,ngm,ogm,sgm,mgm,fgm;
var wLl=b(()=>{W2e();rb();Ph();S_();qe();sn();bt();oa();Rn();lo();Mo();ry();ja();Xt();dr();Mw();QH();jU=require("fs/promises"),jG=require("path");$hm={".ts":"TypeScript",".tsx":"TypeScript",".js":"JavaScript",".jsx":"JavaScript",".py":"Python",".rb":"Ruby",".go":"Go",".rs":"Rust",".java":"Java",".c":"C",".h":"C",".cpp":"C++",".cc":"C++",".cxx":"C++",".hpp":"C++",".hh":"C++",".hxx":"C++",".ipp":"C++",".md":"Markdown",".json":"JSON",".yaml":"YAML",".yml":"YAML",".sh":"Shell",".css":"CSS",".html":"HTML"},qhm={debug_investigate:"Debug/Investigate",implement_feature:"Implement Feature",fix_bug:"Fix Bug",write_script_tool:"Write Script/Tool",refactor_code:"Refactor Code",configure_system:"Configure System",create_pr_commit:"Create PR/Commit",analyze_data:"Analyze Data",understand_codebase:"Understand Codebase",write_tests:"Write Tests",write_docs:"Write Docs",deploy_infra:"Deploy/Infra",warmup_minimal:"Cache Warmup",fast_accurate_search:"Fast/Accurate Search",correct_code_edits:"Correct Code Edits",good_explanations:"Good Explanations",proactive_help:"Proactive Help",multi_file_changes:"Multi-file Changes",handled_complexity:"Multi-file Changes",good_debugging:"Good Debugging",misunderstood_request:"Misunderstood Request",wrong_approach:"Wrong Approach",buggy_code:"Buggy Code",user_rejected_action:"User Rejected Action",claude_got_blocked:"Claude Got Blocked",user_stopped_early:"User Stopped Early",wrong_file_or_location:"Wrong File/Location",excessive_changes:"Excessive Changes",slow_or_verbose:"Slow/Verbose",tool_failed:"Tool Failed",user_unclear:"User Unclear",external_issue:"External Issue",frustrated:"Frustrated",dissatisfied:"Dissatisfied",likely_satisfied:"Likely Satisfied",satisfied:"Satisfied",happy:"Happy",unsure:"Unsure",neutral:"Neutral",delighted:"Delighted",single_task:"Single Task",multi_task:"Multi Task",iterative_refinement:"Iterative Refinement",exploration:"Exploration",quick_question:"Quick Question",fully_achieved:"Fully Achieved",mostly_achieved:"Mostly Achieved",partially_achieved:"Partially Achieved",not_achieved:"Not Achieved",unclear_from_transcript:"Unclear",unhelpful:"Unhelpful",slightly_helpful:"Slightly Helpful",moderately_helpful:"Moderately Helpful",very_helpful:"Very Helpful",essential:"Essential"};ngm=[{name:"project_areas",prompt:`Analyze this Claude Code usage data and identify project areas.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "areas": [
    {"name": "Area name", "session_count": N, "description": "2-3 sentences about what was worked on and how Claude Code was used."}
  ]
}

Include 4-5 areas. Skip internal CC operations.`,maxTokens:8192},{name:"interaction_style",prompt:`Analyze this Claude Code usage data and describe the user's interaction style.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "narrative": "2-3 paragraphs analyzing HOW the user interacts with Claude Code. Use second person 'you'. Describe patterns: iterate quickly vs detailed upfront specs? Interrupt often or let Claude run? Include specific examples. Use **bold** for key insights.",
  "key_pattern": "One sentence summary of most distinctive interaction style"
}`,maxTokens:8192},{name:"what_works",prompt:`Analyze this Claude Code usage data and identify what's working well for this user. Use second person ("you").

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "1 sentence of context",
  "impressive_workflows": [
    {"title": "Short title (3-6 words)", "description": "2-3 sentences describing the impressive workflow or approach. Use 'you' not 'the user'."}
  ]
}

Include 3 impressive workflows.`,maxTokens:8192},{name:"friction_analysis",prompt:`Analyze this Claude Code usage data and identify friction points for this user. Use second person ("you").

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "1 sentence summarizing friction patterns",
  "categories": [
    {"category": "Concrete category name", "description": "1-2 sentences explaining this category and what could be done differently. Use 'you' not 'the user'.", "examples": ["Specific example with consequence", "Another example"]}
  ]
}

Include 3 friction categories with 2 examples each.`,maxTokens:8192},{name:"suggestions",prompt:`Analyze this Claude Code usage data and suggest improvements.

## CC FEATURES REFERENCE (pick from these for features_to_try):
1. **MCP Servers**: Connect Claude to external tools, databases, and APIs via Model Context Protocol.
   - How to use: Run \`claude mcp add <server-name> -- <command>\`
   - Good for: database queries, Slack integration, GitHub issue lookup, connecting to internal APIs

2. **Custom Skills**: Reusable prompts you define as markdown files that run with a single /command.
   - How to use: Create \`.claude/skills/commit/SKILL.md\` with instructions. Then type \`/commit\` to run it.
   - Good for: repetitive workflows - /commit, /review, /test, /deploy, /pr, or complex multi-step workflows

3. **Hooks**: Shell commands that auto-run at specific lifecycle events.
   - How to use: Add to \`.claude/settings.json\` under "hooks" key.
   - Good for: auto-formatting code, running type checks, enforcing conventions

4. **Headless Mode**: Run Claude non-interactively from scripts and CI/CD.
   - How to use: \`claude -p "fix lint errors" --allowedTools "Edit,Read,Bash"\`
   - Good for: CI/CD integration, batch code fixes, automated reviews

5. **Task Agents**: Claude spawns focused subagents for complex exploration or parallel work.
   - How to use: Claude auto-invokes when helpful, or ask "use an agent to explore X"
   - Good for: codebase exploration, understanding complex systems

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "claude_md_additions": [
    {"addition": "A specific line or block to add to CLAUDE.md based on workflow patterns. E.g., 'Always run tests after modifying auth-related files'", "why": "1 sentence explaining why this would help based on actual sessions", "prompt_scaffold": "Instructions for where to add this in CLAUDE.md. E.g., 'Add under ## Testing section'"}
  ],
  "features_to_try": [
    {"feature": "Feature name from CC FEATURES REFERENCE above", "one_liner": "What it does", "why_for_you": "Why this would help YOU based on your sessions", "example_code": "Actual command or config to copy"}
  ],
  "usage_patterns": [
    {"title": "Short title", "suggestion": "1-2 sentence summary", "detail": "3-4 sentences explaining how this applies to YOUR work", "copyable_prompt": "A specific prompt to copy and try"}
  ]
}

IMPORTANT for claude_md_additions: PRIORITIZE instructions that appear MULTIPLE TIMES in the user data. If user told Claude the same thing in 2+ sessions (e.g., 'always run tests', 'use TypeScript'), that's a PRIME candidate - they shouldn't have to repeat themselves.

IMPORTANT for features_to_try: Pick 2-3 from the CC FEATURES REFERENCE above. Include 2-3 items for each category.`,maxTokens:8192},{name:"on_the_horizon",prompt:`Analyze this Claude Code usage data and identify future opportunities.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "1 sentence about evolving AI-assisted development",
  "opportunities": [
    {"title": "Short title (4-8 words)", "whats_possible": "2-3 ambitious sentences about autonomous workflows", "how_to_try": "1-2 sentences mentioning relevant tooling", "copyable_prompt": "Detailed prompt to try"}
  ]
}

Include 3 opportunities. Think BIG - autonomous workflows, parallel agents, iterating against tests.`,maxTokens:8192},...[],{name:"fun_ending",prompt:`Analyze this Claude Code usage data and find a memorable moment.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "headline": "A memorable QUALITATIVE moment from the transcripts - not a statistic. Something human, funny, or surprising.",
  "detail": "Brief context about when/where this happened"
}

Find something genuinely interesting or amusing from the session summaries.`,maxTokens:8192}];ogm=["frustrated","dissatisfied","likely_satisfied","satisfied","happy","unsure"],sgm=["not_achieved","partially_achieved","mostly_achieved","fully_achieved","unclear_from_transcript"];mgm={type:"prompt",name:"insights",description:"Generate a report analyzing your Claude Code sessions",contentLength:0,progressMessage:"analyzing your sessions",source:"builtin",async getPromptForCommand(e){let t=!1,n=[],r=!1,{insights:o,htmlPath:s,data:i,remoteStats:a}=await generateUsageReport({collectRemote:t}),l=`file://${s}`,u=[i.total_sessions_scanned&&i.total_sessions_scanned>i.total_sessions?`${i.total_sessions_scanned.toLocaleString()} sessions total \xB7 ${i.total_sessions} analyzed`:`${i.total_sessions} sessions`,`${i.total_messages.toLocaleString()} messages`,`${Math.round(i.total_duration_hours)}h`,`${i.git_commits} commits`].join(" \xB7 "),d="",p=o.at_a_glance,m=p?`## At a Glance

${p.whats_working?`**What's working:** ${p.whats_working} See _Impressive Things You Did_.`:""}

${p.whats_hindering?`**What's hindering you:** ${p.whats_hindering} See _Where Things Go Wrong_.`:""}

${p.quick_wins?`**Quick wins to try:** ${p.quick_wins} See _Features to Try_.`:""}

${p.ambitious_workflows?`**Ambitious workflows:** ${p.ambitious_workflows} See _On the Horizon_.`:""}`:"_No insights generated_",f=`# Claude Code Insights

${u}
${i.date_range.start} to ${i.date_range.end}
${d}
`;return[{type:"text",text:buildInsightsResponsePrompt({insightsJson:Le(o,null,2),reportUrl:l,htmlPath:s,facetsDir:mKn(),header:f,summaryText:m})}]}};fgm=mgm});
export {vLl,gLl,Uhm,w5t,mKn,Rko,Whm,v5t,extractToolStats,Ghm,kko,xko,deduplicateSessionBranches,Khm,Yhm,Jhm,Xhm,Qhm,Zhm,normalizeSessionMeta,egm,tgm,detectMultiClauding,aggregateData,hLl,rgm,pKn,Bye,igm,agm,lgm,cgm,buildExportData,dgm,generateUsageReport,Xft,pgm,buildInsightsResponsePrompt,CLl,jU,jG,$hm,qhm,jhm,zhm,ngm,ogm,sgm,mgm,fgm,wLl};
