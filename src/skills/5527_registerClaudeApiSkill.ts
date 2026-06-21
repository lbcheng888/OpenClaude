// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {SKILL_FILES,SKILL_MODEL_VARS,qLo,KJl} from "../tools/5526_SKILL_PROMPT.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {ap,BE} from "../../vendor/m5006.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
var ZJl={};
isFullscreenWithTTY(ZJl,{registerClaudeApiSkill:()=>registerClaudeApiSkill,processSkillMarkdown:()=>processSkillMarkdown,matchSubcommand:()=>matchSubcommand,CLAUDE_API_SKILL_DESCRIPTION:()=>CLAUDE_API_SKILL_DESCRIPTION});
function tFm(){let e={};for(let[t,n]of Object.entries(SKILL_FILES))e[t]=processSkillMarkdown(n,SKILL_MODEL_VARS);return e}
async function rFm(){let e=Pt(),t;try{t=await YJl.readdir(e)}catch{return null}for(let[n,r]of Object.entries(nFm)){if(r.length===0)continue;for(let o of r)if(o.startsWith(".")){if(t.some((s)=>s.endsWith(o)))return n}else if(t.includes(o))return n}return null}
function oFm(e,t){return Object.keys(t).filter((n)=>{if(n.startsWith(`${e}/`))return!0;return n.startsWith("shared/")})}
function processSkillMarkdown(e,t){let n=e,r;do r=n,n=n.replace(/<!--[\s\S]*?-->\n?/g,"");while(n!==r);return n=n.replace(/\{\{(\w+)\}\}/g,(o,s)=>t[s]??o),n}
function JJl(e,t){return processSkillMarkdown(e,t.SKILL_MODEL_VARS)}
function zJl(e,t,n){let r=[];for(let o of e.sort()){let s=t[o];if(!s)continue;r.push(`<doc path="${o}">
${JJl(s,n).trim()}
</doc>`)}return r.join(`

`)}
function iFm(e,t,n){let r=JJl(n.SKILL_PROMPT,n),o=r.indexOf("## Reading Guide"),i=[o!==-1?r.slice(0,o).trimEnd():r],a=sFm.replace(/\{lang\}/g,e??"unknown");if(e){let c=oFm(e,n.SKILL_FILES);i.push(a),i.push(`---

## Included Documentation

`+zJl(c,n.SKILL_FILES,n))}else i.push(a),i.push("No project language was auto-detected. Ask the user which language they are using, then refer to the matching docs below."),i.push(`---

## Included Documentation

`+zJl(Object.keys(n.SKILL_FILES),n.SKILL_FILES,n));let l=r.indexOf("## When to Use WebFetch");if(l!==-1)i.push(r.slice(l).trimEnd());if(t)i.push(`## User Request

${t}`);return i.join(`

`)}
function matchSubcommand(e){let t=e.trim().toLowerCase().split(/\s+/)[0]??"";return aFm.find((n)=>n===t)??"none"}
function registerClaudeApiSkill(){ap({name:"claude-api",menuDescription:"Build and debug apps that use the Claude API",description:CLAUDE_API_SKILL_DESCRIPTION,allowedTools:["Read","Grep","Glob","WebFetch"],userInvocable:!0,files:tFm(),async getPromptForCommand(e){let t=await rFm();return logEvent("tengu_claude_api_skill_loaded",{detected_lang:fromEnum(t??"none"),subcommand:matchSubcommand(e),has_args:e.trim().length>0}),[{type:"text",text:iFm(t,e,qLo)}]}})}
var YJl,nFm,sFm=`## Reference Documentation

The relevant documentation for your detected language is included below in \`<doc>\` tags. Each tag has a \`path\` attribute showing its original file path. Use this to find the right section:

### Quick Task Reference

> All SDK languages use the same per-language \`claude-api/\` directory layout (cURL: \`curl/examples.md\`). Not every language has every file \u2014 if a file is absent, that feature's example is not yet documented for that language; fall back to the cURL shape or WebFetch the SDK repo.

**Single text classification/summarization/extraction/Q&A:**
\u2192 Refer to \`{lang}/claude-api/README.md\`

**Chat UI or real-time response display:**
\u2192 Refer to \`{lang}/claude-api/README.md\` + \`{lang}/claude-api/streaming.md\`

**Long-running conversations (may exceed context window):**
\u2192 Refer to \`{lang}/claude-api/README.md\` \u2014 see Compaction section

**Migrating to a newer model or replacing a retired model:**
\u2192 Refer to \`shared/model-migration.md\`

**Prompt caching / optimize caching / "why is my cache hit rate low":**
\u2192 Refer to \`shared/prompt-caching.md\` + \`{lang}/claude-api/README.md\` (Prompt Caching section)

**Count tokens in a file / prompt / diff ("how many tokens is X"):**
\u2192 Refer to \`shared/token-counting.md\` \u2014 use \`messages.count_tokens\`, never \`tiktoken\`

**Function calling / tool use / agents:**
\u2192 Refer to \`{lang}/claude-api/README.md\` + \`shared/tool-use-concepts.md\` + \`{lang}/claude-api/tool-use.md\`

**Batch processing (non-latency-sensitive):**
\u2192 Refer to \`{lang}/claude-api/README.md\` + \`{lang}/claude-api/batches.md\`

**File uploads across multiple requests:**
\u2192 Refer to \`{lang}/claude-api/README.md\` + \`{lang}/claude-api/files-api.md\`

**Agent design (tool surface, context management, caching strategy):**
\u2192 Refer to \`shared/agent-design.md\`

**Anthropic CLI (\`ant\`) \u2014 terminal access, version-controlled agent/environment YAML, scripting:**
\u2192 Refer to \`shared/anthropic-cli.md\`

**Managed Agents (server-managed stateful agents):**
\u2192 Refer to \`shared/managed-agents-overview.md\` and the rest of the \`shared/managed-agents-*.md\` files. For Python, TypeScript, Go, Ruby, PHP, and Java, read the \`managed-agents/README.md\` in the language folder for code examples. For cURL, read \`curl/managed-agents.md\`. C# has beta Managed Agents support \u2014 use \`curl/managed-agents.md\` as the wire-level reference (the C# SDK mirrors it via \`client.Beta.Agents\`; see \`csharp/claude-api/README.md\`).

**Error handling:**
\u2192 Refer to \`shared/error-codes.md\`

**Latest docs via WebFetch:**
\u2192 Refer to \`shared/live-sources.md\` for URLs`,CLAUDE_API_SKILL_DESCRIPTION,aFm;
var eXl=b(()=>{Ct();Go();BE();KJl();YJl=require("fs/promises");nFm={python:[".py","requirements.txt","pyproject.toml","setup.py","Pipfile"],typescript:[".ts",".tsx","tsconfig.json","package.json"],java:[".java","pom.xml","build.gradle"],go:[".go","go.mod"],ruby:[".rb","Gemfile"],csharp:[".cs",".csproj"],php:[".php","composer.json"],curl:[]};CLAUDE_API_SKILL_DESCRIPTION=["Reference for the Claude API / Anthropic SDK \u2014 model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.",'TRIGGER \u2014 read BEFORE opening the target file; don\'t skip because it "looks like a one-liner" \u2014 whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) \u2014 never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).',"SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named \u2014 don't Read the file)."].join(`
`),aFm=["migrate","managed-agents-onboard"]});
export {ZJl,tFm,rFm,oFm,processSkillMarkdown,JJl,zJl,iFm,matchSubcommand,registerClaudeApiSkill,YJl,nFm,sFm,CLAUDE_API_SKILL_DESCRIPTION,aFm,eXl};
