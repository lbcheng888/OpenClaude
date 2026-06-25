// @ts-nocheck
import {G7r,V7r,i1t,K7r} from "./m2765.ts";
import {Z6t,e5t,jSo} from "./m4400.ts";
import {sleep} from "../src/telemetry/1488_withTimeout.ts";
import {Pt,He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {Wq,cxe} from "../src/api/3982_model.ts";
import {getDefaultSonnetModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {i2,pd} from "./m706.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function Zal(e){return e.map((t)=>{let n=t.chunk.slice(0,300).replace(/\s+/g," ").trim();return`- {id: "${t.id}", source: ${t.source}} ${t.title}: ${n}${t.chunk.length>300?"\u2026":""}`}).join(`
`)}
async function ell(e,t,n,r,o=new Set,s=Promise.resolve([])){n.lastUsage=null;let i={type:"ephemeral"},a=G7r(n,t)??await Z6t(t,r).then((_)=>_.length>0&&!r.aborted?V7r(n,t,_,e5t(_),i):void 0),c=(await Promise.race([s,sleep(Qal,r,{unref:!0}).then(()=>[])])).filter((_)=>!o.has(_.url||`aki:${_.id}`));if(c.length===0&&(!a||a.memories.every((_)=>o.has(_.filePath)))){if(!r.aborted)Pt("memory_recall_select",a?"all_surfaced":"no_candidates");return{memories:[],knowledge:[]}}let u=a?.messages??[{role:"user",content:[{type:"text",text:`Available memories:
(none \u2014 this session has no local memory files yet)`,...i&&{cache_control:i}}]}],d=new Map((a?.memories??[]).map((_)=>[_.filename,_])),{selectedMemories:p,selectedKnowledgeIds:m}=await qKp(e,t,n,u,d,i,r,c),f=new Map(c.map((_)=>[_.id,_])),h=os(m).map((_)=>f.get(_)).filter((_)=>_!==void 0).slice(0,3);return{memories:p.map((_)=>d.get(_)).filter((_)=>_!==void 0&&!o.has(_.filePath)).map((_)=>({path:_.filePath,mtimeMs:_.mtimeMs})),knowledge:h}}
async function qKp(e,t,n,r,o,s,i,a){let l=a.length>0?`

Knowledge-index results for this query (select by id):
${Zal(a)}`:"",c=`Select memories relevant to:
${e}${l}`,u=a.length>0?`Select memories relevant to:
${e}

(${a.length} knowledge-index results were offered for this query)`:c,d={selectedMemories:[],selectedKnowledgeIds:[]};try{let p=await Wq({model:getDefaultSonnetModel(),system:[{type:"text",text:UKp,cache_control:s}],skipSystemPromptPrefix:!0,messages:[...r,{role:"user",content:[{type:"text",text:c,cache_control:s}]}],max_tokens:256,output_format:{type:"json_schema",schema:{type:"object",properties:{selected_memories:{type:"array",items:{type:"string"}},selected_knowledge_ids:{type:"array",items:{type:"string"}}},required:["selected_memories"],additionalProperties:!1}},signal:i,querySource:i1t}),m=p.content.find((h)=>h.type==="text");if(!m||m.type!=="text")return d;let f=qt(i2(m.text));return K7r(n,t,u,m.text),n.lastUsage={cacheReadInputTokens:p.usage.cache_read_input_tokens??0,cacheCreationInputTokens:p.usage.cache_creation_input_tokens??0,turnCount:(r.length+1)/2},He("memory_recall_select"),{selectedMemories:f.selected_memories.filter((h)=>o.has(h)),selectedKnowledgeIds:f.selected_knowledge_ids??[]}}catch(p){if(n.lastUsage=null,i.aborted)return d;return Pt("memory_recall_select","memory_recall_select_query_failed"),logForDebugging(`[memdir] selectRelevantMemories failed: ${Ce(p)}`,{level:"warn"}),d}}
async function tll(e,t,n,r,o=Promise.resolve([])){n.lastUsage=null;let s={type:"ephemeral"},i=G7r(n,t)??await Z6t(t,r).then((c)=>c.length>0&&!r.aborted?V7r(n,t,c,e5t(c),s):void 0),a=await Promise.race([o,sleep(Qal,r,{unref:!0}).then(()=>[])]);if(!i&&a.length===0)return null;let l=i?.messages??[{role:"user",content:[{type:"text",text:`Available memories:
(none \u2014 this session has no local memory files yet)`,...s&&{cache_control:s}}]}];return WKp(e,t,n,l,new Map((i?.memories??[]).map((c)=>[c.filename,c])),s,r,a)}
async function WKp(e,t,n,r,o,s,i,a){let l=a.length>0?`

Knowledge-index results for this query (cite by id):
${Zal(a)}`:"",c=`Extract facts relevant to:
${e}${l}`,u=a.length>0?`Extract facts relevant to:
${e}

(${a.length} knowledge-index results were offered for this query)`:c;try{let d=await Wq({model:getDefaultSonnetModel(),system:[{type:"text",text:$Kp,cache_control:s}],skipSystemPromptPrefix:!0,messages:[...r,{role:"user",content:[{type:"text",text:c,cache_control:s}]}],max_tokens:2000,output_format:{type:"json_schema",schema:{type:"object",properties:{relevant_facts:{type:"array",items:{type:"string"}},cited_memories:{type:"array",items:{type:"string"}},cited_knowledge_ids:{type:"array",items:{type:"string"}}},required:["relevant_facts","cited_memories"],additionalProperties:!1}},signal:i,querySource:i1t}),p=d.content.find((y)=>y.type==="text");if(!p||p.type!=="text")return null;let m=qt(i2(p.text));K7r(n,t,u,p.text),n.lastUsage={cacheReadInputTokens:d.usage.cache_read_input_tokens??0,cacheCreationInputTokens:d.usage.cache_creation_input_tokens??0,turnCount:(r.length+1)/2};let f=m.relevant_facts.map((y)=>y.trim()).filter((y)=>y.length>0).slice(0,7);if(f.length===0)return null;let h=f.map((y)=>`- ${y}`).join(`
`),g=m.cited_memories.filter((y)=>o.has(y)),_=new Map(a.map((y)=>[y.id,y])),T=os(m.cited_knowledge_ids??[]).map((y)=>_.get(y)).filter((y)=>y!==void 0).slice(0,3);return He("memory_recall_synthesize"),{synthesis:h,citedMemories:g,citedKnowledge:T}}catch(d){if(n.lastUsage=null,i.aborted)return null;return xe("memory_recall_synthesize","memory_recall_synthesize_query_failed"),logForDebugging(`[memdir] synthesizeRelevantMemories failed: ${Ce(d)}`,{level:"warn"}),null}}
var Qal=3500,FKp="",BKp="",UKp,$Kp;
var nll=b(()=>{mn();qe();Ct();pd();Ro();cxe();tn();jSo();UKp=`You are selecting memories that will be useful to Claude Code as it processes a user's query. The first message lists the available memory files with their filenames and descriptions; subsequent messages each contain one user query.

Return a list of filenames for the memories that will clearly be useful to Claude Code as it processes the user's query (up to 5). Only include memories that you are certain will be helpful based on their name and description.
- If you are unsure if a memory will be useful in processing the user's query, then do not include it in your list. Be selective and discerning.
- If there are no memories in the list that would clearly be useful, feel free to return an empty list.
- Be especially conservative with user-profile and project-overview memories ([user], [project]). These describe the user's ongoing focus, not what every question is about. A profile saying "works on DB performance" is NOT relevant to a question that merely contains the word "performance" unless the question is actually about that DB work. Match on what the question IS ABOUT, not on surface keyword overlap with who the user is.
- Do not re-select memories you already returned for an earlier query in this conversation.${FKp}
`,$Kp=`You read persistent memory files for an AI coding assistant and extract facts to help the coding assistant answer queries. The first message lists every available memory file with its frontmatter and full body; each subsequent user message contains one query.

For each query, return a JSON object:
- relevant_facts: an array of facts (max 7) that would be useful for processing the query. Each fact is 1-2 sentences and stands on its own.
- cited_memories: array of filenames (matching the manifest exactly) for the memories you drew from

If no memories are relevant, return relevant_facts: [] and cited_memories: [].${BKp}

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
export {Zal,ell,qKp,tll,WKp,Qal,FKp,BKp,UKp,$Kp,nll};
