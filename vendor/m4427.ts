// @ts-nocheck
import {d5r,p5r,ROt,m5r} from "./m2753.ts";
import {R4t,x4t,rho} from "./m4378.ts";
import {sleep} from "../src/telemetry/1483_withTimeout.ts";
import {isTmuxControlMode,Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {v6,ZHe} from "../src/api/3911_model.ts";
import {getDefaultSonnetModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {B2,Pd} from "./m701.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
function dtl(e){return e.map((t)=>{let n=t.chunk.slice(0,300).replace(/\s+/g," ").trim();return`- {id: "${t.id}", source: ${t.source}} ${t.title}: ${n}${t.chunk.length>300?"\u2026":""}`}).join(`
`)}
async function ptl(e,t,n,r,o=new Set,s=Promise.resolve([])){n.lastUsage=null;let i={type:"ephemeral"},a=d5r(n,t)??await R4t(t,r).then((g)=>g.length>0&&!r.aborted?p5r(n,t,g,x4t(g),i):void 0),c=(await Promise.race([s,sleep(utl,r,{unref:!0}).then(()=>[])])).filter((g)=>!o.has(g.url||`aki:${g.id}`));if(c.length===0&&(!a||a.memories.every((g)=>o.has(g.filePath)))){if(!r.aborted)isTmuxControlMode("memory_recall_select",a?"all_surfaced":"no_candidates");return{memories:[],knowledge:[]}}let u=a?.messages??[{role:"user",content:[{type:"text",text:`Available memories:
(none \u2014 this session has no local memory files yet)`,...i&&{cache_control:i}}]}],d=new Map((a?.memories??[]).map((g)=>[g.filename,g])),{selectedMemories:p,selectedKnowledgeIds:m}=await s4p(e,t,n,u,d,i,r,c),f=new Map(c.map((g)=>[g.id,g])),A=fs(m).map((g)=>f.get(g)).filter((g)=>g!==void 0).slice(0,3);return{memories:p.map((g)=>d.get(g)).filter((g)=>g!==void 0&&!o.has(g.filePath)).map((g)=>({path:g.filePath,mtimeMs:g.mtimeMs})),knowledge:A}}
async function s4p(e,t,n,r,o,s,i,a){let l=a.length>0?`

Knowledge-index results for this query (select by id):
${dtl(a)}`:"",c=`Select memories relevant to:
${e}${l}`,u=a.length>0?`Select memories relevant to:
${e}

(${a.length} knowledge-index results were offered for this query)`:c,d={selectedMemories:[],selectedKnowledgeIds:[]};try{let p=await v6({model:getDefaultSonnetModel(),system:[{type:"text",text:r4p,cache_control:s}],skipSystemPromptPrefix:!0,messages:[...r,{role:"user",content:[{type:"text",text:c,cache_control:s}]}],max_tokens:256,output_format:{type:"json_schema",schema:{type:"object",properties:{selected_memories:{type:"array",items:{type:"string"}},selected_knowledge_ids:{type:"array",items:{type:"string"}}},required:["selected_memories"],additionalProperties:!1}},signal:i,querySource:ROt}),m=p.content.find((A)=>A.type==="text");if(!m||m.type!=="text")return d;let f=qt(B2(m.text));return m5r(n,t,u,m.text),n.lastUsage={cacheReadInputTokens:p.usage.cache_read_input_tokens??0,cacheCreationInputTokens:p.usage.cache_creation_input_tokens??0,turnCount:(r.length+1)/2},Ie("memory_recall_select"),{selectedMemories:f.selected_memories.filter((A)=>o.has(A)),selectedKnowledgeIds:f.selected_knowledge_ids??[]}}catch(p){if(n.lastUsage=null,i.aborted)return d;return isTmuxControlMode("memory_recall_select","memory_recall_select_query_failed"),logForDebugging(`[memdir] selectRelevantMemories failed: ${Se(p)}`,{level:"warn"}),d}}
async function mtl(e,t,n,r,o=Promise.resolve([])){n.lastUsage=null;let s={type:"ephemeral"},i=d5r(n,t)??await R4t(t,r).then((c)=>c.length>0&&!r.aborted?p5r(n,t,c,x4t(c),s):void 0),a=await Promise.race([o,sleep(utl,r,{unref:!0}).then(()=>[])]);if(!i&&a.length===0)return null;let l=i?.messages??[{role:"user",content:[{type:"text",text:`Available memories:
(none \u2014 this session has no local memory files yet)`,...s&&{cache_control:s}}]}];return i4p(e,t,n,l,new Map((i?.memories??[]).map((c)=>[c.filename,c])),s,r,a)}
async function i4p(e,t,n,r,o,s,i,a){let l=a.length>0?`

Knowledge-index results for this query (cite by id):
${dtl(a)}`:"",c=`Extract facts relevant to:
${e}${l}`,u=a.length>0?`Extract facts relevant to:
${e}

(${a.length} knowledge-index results were offered for this query)`:c;try{let d=await v6({model:getDefaultSonnetModel(),system:[{type:"text",text:o4p,cache_control:s}],skipSystemPromptPrefix:!0,messages:[...r,{role:"user",content:[{type:"text",text:c,cache_control:s}]}],max_tokens:2000,output_format:{type:"json_schema",schema:{type:"object",properties:{relevant_facts:{type:"array",items:{type:"string"}},cited_memories:{type:"array",items:{type:"string"}},cited_knowledge_ids:{type:"array",items:{type:"string"}}},required:["relevant_facts","cited_memories"],additionalProperties:!1}},signal:i,querySource:ROt}),p=d.content.find((y)=>y.type==="text");if(!p||p.type!=="text")return null;let m=qt(B2(p.text));m5r(n,t,u,p.text),n.lastUsage={cacheReadInputTokens:d.usage.cache_read_input_tokens??0,cacheCreationInputTokens:d.usage.cache_creation_input_tokens??0,turnCount:(r.length+1)/2};let f=m.relevant_facts.map((y)=>y.trim()).filter((y)=>y.length>0).slice(0,7);if(f.length===0)return null;let A=f.map((y)=>`- ${y}`).join(`
`),h=m.cited_memories.filter((y)=>o.has(y)),g=new Map(a.map((y)=>[y.id,y])),_=fs(m.cited_knowledge_ids??[]).map((y)=>g.get(y)).filter((y)=>y!==void 0).slice(0,3);return Ie("memory_recall_synthesize"),{synthesis:A,citedMemories:h,citedKnowledge:_}}catch(d){if(n.lastUsage=null,i.aborted)return null;return Oe("memory_recall_synthesize","memory_recall_synthesize_query_failed"),logForDebugging(`[memdir] synthesizeRelevantMemories failed: ${Se(d)}`,{level:"warn"}),null}}
var utl=3500,t4p="",n4p="",r4p,o4p;
var ftl=b(()=>{ln();qe();bt();Pd();Mo();ZHe();Xt();rho();r4p=`You are selecting memories that will be useful to Claude Code as it processes a user's query. The first message lists the available memory files with their filenames and descriptions; subsequent messages each contain one user query.

Return a list of filenames for the memories that will clearly be useful to Claude Code as it processes the user's query (up to 5). Only include memories that you are certain will be helpful based on their name and description.
- If you are unsure if a memory will be useful in processing the user's query, then do not include it in your list. Be selective and discerning.
- If there are no memories in the list that would clearly be useful, feel free to return an empty list.
- Be especially conservative with user-profile and project-overview memories ([user], [project]). These describe the user's ongoing focus, not what every question is about. A profile saying "works on DB performance" is NOT relevant to a question that merely contains the word "performance" unless the question is actually about that DB work. Match on what the question IS ABOUT, not on surface keyword overlap with who the user is.
- Do not re-select memories you already returned for an earlier query in this conversation.${t4p}
`,o4p=`You read persistent memory files for an AI coding assistant and extract facts to help the coding assistant answer queries. The first message lists every available memory file with its frontmatter and full body; each subsequent user message contains one query.

For each query, return a JSON object:
- relevant_facts: an array of facts (max 7) that would be useful for processing the query. Each fact is 1-2 sentences and stands on its own.
- cited_memories: array of filenames (matching the manifest exactly) for the memories you drew from

If no memories are relevant, return relevant_facts: [] and cited_memories: [].${n4p}

A fact is useful when it lets the assistant do one of these things:
- Avoid re-asking: supply something the user would otherwise have to restate (a path, a name, a config value, a decision already made).
- Apply user preferences: surface conventions, styles, or tooling choices the assistant should follow for this query.
- Maintain continuity: surface the state of an ongoing project, goal, or prior thread that this query is continuing.
- Avoid a known pitfall: surface past corrections or mistakes so the assistant pre-empts repeating them.

Style and length:
- Each fact is 1-2 sentences. State the fact directly, then add the context needed to act on it.
- Name a path, flag, or identifier only when it is the thing the assistant must use or avoid. Drop supporting details like timestamps, byte counts, version numbers, and historical asides.
- Do not answer or solve the query yourself. You are a retrieval step, not the assistant: every fact must be lifted from a memory file body, not derived from general knowledge or your own reasoning about the query. If no memory covers it, return relevant_facts: [].
- Do not restate the query.
- If a prior turn in this conversation already returned the relevant facts for this query, return relevant_facts: [] and cited_memories: [] rather than restating.
`});
export {dtl,ptl,s4p,mtl,i4p,utl,t4p,n4p,r4p,o4p,ftl};
