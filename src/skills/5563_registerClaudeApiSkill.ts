// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Dsc,xsc} from "../tools/5562_SKILL_PROMPT.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {Td,Cb} from "../../vendor/m5036.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
var Bsc = {};
ft(Bsc, {
  registerClaudeApiSkill: () => registerClaudeApiSkill,
  processSkillMarkdown: () => processSkillMarkdown,
  matchSubcommand: () => matchSubcommand,
  CLAUDE_API_SKILL_DESCRIPTION: () => CLAUDE_API_SKILL_DESCRIPTION
});
/** Lazily import the skill-prompt module (the doc files + prompt text), memoized. */
function loadSkillPromptModule() {
  return skillPromptModulePromise ??= Promise.resolve().then(() => (Dsc(), xsc));
}
/** Render every doc file in the skill module's SKILL_FILES through the markdown templater. */
function renderAllSkillFiles(skillModule) {
  let renderedFiles = {};
  for (let [filePath, markdown] of Object.entries(skillModule.SKILL_FILES)) renderedFiles[filePath] = processSkillMarkdown(markdown, skillModule.SKILL_MODEL_VARS);
  return renderedFiles;
}
/** Detect the project's primary language by scanning the cwd for telltale files/extensions. */
async function detectProjectLanguage(): Promise<string | null> {
  let cwd = Lt(),
    dirEntries;
  try {
    dirEntries = await Lsc.readdir(cwd);
  } catch {
    return null;
  }
  for (let [lang, markers] of Object.entries(LANGUAGE_MARKERS)) {
    if (markers.length === 0) continue;
    for (let marker of markers) if (marker.startsWith(".")) {
      if (dirEntries.some(entry => entry.endsWith(marker))) return lang;
    } else if (dirEntries.includes(marker)) return lang;
  }
  return null;
}
/** Select doc file paths relevant to a language: that language's folder plus all shared docs. */
function selectDocPathsForLanguage(lang, skillFiles) {
  return Object.keys(skillFiles).filter(filePath => {
    if (filePath.startsWith(`${lang}/`)) return !0;
    return filePath.startsWith("shared/");
  });
}
/** Strip HTML comments and substitute {{var}} placeholders from the given vars map. */
function processSkillMarkdown(markdown, vars) {
  let current = markdown,
    previous;
  do previous = current, current = current.replace(/<!--[\s\S]*?-->\n?/g, ""); while (current !== previous);
  return current = current.replace(/\{\{(\w+)\}\}/g, (whole, name) => vars[name] ?? whole), current;
}
/** Render a doc's markdown using the skill module's model-vars table. */
function renderDocMarkdown(markdown, skillModule) {
  return processSkillMarkdown(markdown, skillModule.SKILL_MODEL_VARS);
}
/** Wrap each selected doc file in a <doc path="..."> block and join them into one string. */
function buildIncludedDocsBlock(docPaths, skillFiles, skillModule) {
  let docBlocks = [];
  for (let docPath of docPaths.sort()) {
    let markdown = skillFiles[docPath];
    if (!markdown) continue;
    docBlocks.push(`<doc path="${docPath}">
${renderDocMarkdown(markdown, skillModule).trim()}
</doc>`);
  }
  return docBlocks.join(`

`);
}
/** Assemble the full skill prompt: header + reference guide + included docs + optional user request. */
function buildSkillPrompt(lang, userRequest, skillModule) {
  let renderedPrompt = renderDocMarkdown(skillModule.SKILL_PROMPT, skillModule),
    readingGuideIndex = renderedPrompt.indexOf("## Reading Guide"),
    promptParts = [readingGuideIndex !== -1 ? renderedPrompt.slice(0, readingGuideIndex).trimEnd() : renderedPrompt],
    referenceGuide = REFERENCE_DOCUMENTATION.replace(/\{lang\}/g, lang ?? "unknown");
  if (lang) {
    let docPaths = selectDocPathsForLanguage(lang, skillModule.SKILL_FILES);
    promptParts.push(referenceGuide), promptParts.push(`---

## Included Documentation

` + buildIncludedDocsBlock(docPaths, skillModule.SKILL_FILES, skillModule));
  } else promptParts.push(referenceGuide), promptParts.push("No project language was auto-detected. Ask the user which language they are using, then refer to the matching docs below."), promptParts.push(`---

## Included Documentation

` + buildIncludedDocsBlock(Object.keys(skillModule.SKILL_FILES), skillModule.SKILL_FILES, skillModule));
  let webFetchIndex = renderedPrompt.indexOf("## When to Use WebFetch");
  if (webFetchIndex !== -1) promptParts.push(renderedPrompt.slice(webFetchIndex).trimEnd());
  if (userRequest) promptParts.push(`## User Request

${userRequest}`);
  return promptParts.join(`

`);
}
/** Map the first whitespace-delimited token of the arg string to a known subcommand, or "none". */
function matchSubcommand(args) {
  let firstToken = args.trim().toLowerCase().split(/\s+/)[0] ?? "";
  return SUBCOMMANDS.find(subcommand => subcommand === firstToken) ?? "none";
}
/** Register the claude-api skill with the command/skill registry. */
function registerClaudeApiSkill() {
  Td({
    name: "claude-api",
    menuDescription: "Build and debug apps that use the Claude API",
    description: CLAUDE_API_SKILL_DESCRIPTION,
    allowedTools: ["Read", "Grep", "Glob", "WebFetch"],
    userInvocable: !0,
    files: () => loadSkillPromptModule().then(renderAllSkillFiles),
    async getPromptForCommand(args) {
      let [lang, skillModule] = await Promise.all([detectProjectLanguage(), loadSkillPromptModule()]);
      return W("tengu_claude_api_skill_loaded", {
        detected_lang: Le(lang ?? "none"),
        subcommand: matchSubcommand(args),
        has_args: args.trim().length > 0
      }), [{
        type: "text",
        text: buildSkillPrompt(lang, args, skillModule)
      }];
    }
  });
}
var Lsc,
  skillPromptModulePromise,
  LANGUAGE_MARKERS,
  REFERENCE_DOCUMENTATION = `## Reference Documentation

The relevant documentation for your detected language is included below in \`<doc>\` tags. Each tag has a \`path\` attribute showing its original file path. Use this to find the right section:

### Quick Task Reference

> All SDK languages use the same per-language \`claude-api/\` directory layout (cURL: \`curl/examples.md\`). Not every language has every file — if a file is absent, that feature's example is not yet documented for that language; fall back to the cURL shape or WebFetch the SDK repo.

**Single text classification/summarization/extraction/Q&A:**
→ Refer to \`{lang}/claude-api/README.md\`

**Chat UI or real-time response display:**
→ Refer to \`{lang}/claude-api/README.md\` + \`{lang}/claude-api/streaming.md\`

**Long-running conversations (may exceed context window):**
→ Refer to \`{lang}/claude-api/README.md\` — see Compaction section

**Migrating to a newer model or replacing a retired model:**
→ Refer to \`shared/model-migration.md\`

**Prompt caching / optimize caching / "why is my cache hit rate low":**
→ Refer to \`shared/prompt-caching.md\` + \`{lang}/claude-api/README.md\` (Prompt Caching section)

**Count tokens in a file / prompt / diff ("how many tokens is X"):**
→ Refer to \`shared/token-counting.md\` — use \`messages.count_tokens\`, never \`tiktoken\`

**Function calling / tool use / agents:**
→ Refer to \`{lang}/claude-api/README.md\` + \`shared/tool-use-concepts.md\` + \`{lang}/claude-api/tool-use.md\`

**Batch processing (non-latency-sensitive):**
→ Refer to \`{lang}/claude-api/README.md\` + \`{lang}/claude-api/batches.md\`

**File uploads across multiple requests:**
→ Refer to \`{lang}/claude-api/README.md\` + \`{lang}/claude-api/files-api.md\`

**Agent design (tool surface, context management, caching strategy):**
→ Refer to \`shared/agent-design.md\`

**Anthropic CLI (\`ant\`) — terminal access, version-controlled agent/environment YAML, scripting:**
→ Refer to \`shared/anthropic-cli.md\`

**Managed Agents (server-managed stateful agents):**
→ Refer to \`shared/managed-agents-overview.md\` and the rest of the \`shared/managed-agents-*.md\` files. For Python, TypeScript, Go, Ruby, PHP, and Java, read the \`managed-agents/README.md\` in the language folder for code examples. For cURL, read \`curl/managed-agents.md\`. C# has beta Managed Agents support — use \`curl/managed-agents.md\` as the wire-level reference (the C# SDK mirrors it via \`client.Beta.Agents\`; see \`csharp/claude-api/README.md\`).

**Error handling:**
→ Refer to \`shared/error-codes.md\`

**Latest docs via WebFetch:**
→ Refer to \`shared/live-sources.md\` for URLs`,
  CLAUDE_API_SKILL_DESCRIPTION,
  SUBCOMMANDS;
var Usc = b(() => {
  kt();
  Po();
  Cb();
  Lsc = require("fs/promises");
  LANGUAGE_MARKERS = {
    python: [".py", "requirements.txt", "pyproject.toml", "setup.py", "Pipfile"],
    typescript: [".ts", ".tsx", "tsconfig.json", "package.json"],
    java: [".java", "pom.xml", "build.gradle"],
    go: [".go", "go.mod"],
    ruby: [".rb", "Gemfile"],
    csharp: [".cs", ".csproj"],
    php: [".php", "composer.json"],
    curl: []
  };
  CLAUDE_API_SKILL_DESCRIPTION = ["Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.", 'TRIGGER — read BEFORE opening the target file; don\'t skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).', "SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file)."].join(`
`), SUBCOMMANDS = ["migrate", "managed-agents-onboard"];
});

export {Bsc,loadSkillPromptModule as Psc,renderAllSkillFiles as C5m,detectProjectLanguage as R5m,selectDocPathsForLanguage as v5m,processSkillMarkdown,renderDocMarkdown as Msc,buildIncludedDocsBlock as Osc,buildSkillPrompt as k5m,matchSubcommand,registerClaudeApiSkill,Lsc,skillPromptModulePromise as E5m,LANGUAGE_MARKERS as A5m,REFERENCE_DOCUMENTATION as w5m,CLAUDE_API_SKILL_DESCRIPTION,SUBCOMMANDS as H5m,Usc};
