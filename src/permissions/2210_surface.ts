// @ts-nocheck
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {E} from "../../vendor/m319.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {we as Re} from "../../vendor/m455.ts";
// @ts-nocheck
function emitShadowEventOnce(event, surface, detail) {
  let dedupeKey = `${event}:${surface}:${detail}`;
  if (shadowEventsSeen.has(dedupeKey)) return;
  shadowEventsSeen.add(dedupeKey), j(event, {
    surface: Ue(surface),
    detail: detail
  });
}
function shadowValidateFrontmatter(kind, value) {
  try {
    let parseResult = strictFrontmatterSchemas[kind]().safeParse(value);
    if (parseResult.success) return;
    for (let issue of parseResult.error.issues) if (issue.code === "unrecognized_keys") for (let unknownKey of issue.keys) emitShadowEventOnce("tengu_frontmatter_shadow_unknown_key", kind, unknownKey);else {
      let fieldName = String(issue.path[0] ?? "");
      emitShadowEventOnce("tengu_frontmatter_shadow_mismatch", kind, `${fieldName}:${issue.code}`);
    }
  } catch {}
}
var scalarSchema = () => E.union([E.string(), E.number(), E.boolean(), E.null()]),
  scalar,
  booleanFlag,
  scalarOrStringListSchema = () => E.union([scalarSchema(), E.array(E.string())]),
  baseFrontmatterSchema,
  skillFrontmatterSchema,
  agentFrontmatterSchema,
  outputStyleFrontmatterSchema,
  strictFrontmatterSchemas,
  shadowEventsSeen;
var initFrontmatterSchemas = b(() => {
  Xr();
  Ct();
  scalar = scalarSchema, booleanFlag = scalarSchema, baseFrontmatterSchema = Re(() => E.object({
    name: scalar().optional().describe("Display name. Defaults to the filename without extension."),
    description: scalar().optional().describe("One-line summary shown in listings and the Skill tool."),
    model: scalar().optional().describe("Model override (`haiku`, `sonnet`, `opus`, `fable`, or a full ID). Use `inherit` to match the parent conversation."),
    "allowed-tools": scalarOrStringListSchema().optional().describe("Tools available to the model while this file is active. Comma-separated string or YAML list."),
    "disallowed-tools": scalarOrStringListSchema().optional().describe("Tools removed from the model while this file is active. Comma-separated string or YAML list. Cleared when the user sends the next message."),
    disallowedTools: scalarOrStringListSchema().optional().describe("Canonical (normalized) alias of `disallowed-tools`."),
    "argument-hint": scalar().optional().describe("Placeholder text shown after the slash command name."),
    arguments: scalarOrStringListSchema().optional().describe("@internal \u2014 typed variant of argument-hint; argument-hint is the documented form"),
    "disable-model-invocation": booleanFlag().optional().describe("If true, the model cannot invoke this via the Skill tool; only users can type the slash command."),
    "user-invocable": booleanFlag().optional().describe("If false, hides the slash command from users; only the model can invoke it via the Skill tool."),
    effort: scalar().optional().describe("Thinking effort for the model: `low`, `medium`, `high`, `max`, or an integer."),
    shell: scalar().optional().describe("Shell for `!`-command blocks: `bash` or `powershell`. Defaults to bash regardless of platform."),
    version: scalar().optional().describe("@internal \u2014 bookkeeping, not surfaced to users")
  })), skillFrontmatterSchema = Re(() => baseFrontmatterSchema().extend({
    when_to_use: scalar().optional().describe("Guidance for when the model should reach for this skill. Becomes part of the tool description."),
    paths: scalarOrStringListSchema().optional().describe("Glob patterns this skill applies to. The skill only loads when the model touches matching files."),
    hooks: E.unknown().optional().describe("Hooks registered while this skill is active. Same shape as settings.json `hooks`."),
    context: E.enum(["inline", "fork"]).nullable().optional().describe("Where the skill runs: `inline` expands into the current conversation; `fork` spawns a subagent."),
    agent: scalar().optional().describe("Agent type to spawn when `context: fork`."),
    fallback: booleanFlag().optional().describe("@internal \u2014 interim defense-in-depth for thin-pointer skill stubs. If true, this skill yields to a same-suffix plugin or MCP skill (`<plugin>:<name>` / `<server>:<name>`) when one is loaded. Stubs carrying this should be deleted once their canonical plugin/MCP skill ships, not maintained."),
    created_by: scalar().optional().describe("@internal \u2014 provenance marker (e.g. dream-proposal)"),
    improved_by: scalar().optional().describe("@internal \u2014 provenance marker (e.g. dream-proposal)"),
    mcpServers: E.unknown().optional().describe("@internal"),
    lspServers: E.unknown().optional().describe("@internal"),
    agents: E.unknown().optional().describe("@internal"),
    outputStyles: E.unknown().optional().describe("@internal"),
    themes: E.unknown().optional().describe("@internal"),
    workflows: E.unknown().optional().describe("@internal"),
    channels: E.unknown().optional().describe("@internal"),
    monitors: E.unknown().optional().describe("@internal"),
    settings: E.unknown().optional().describe("@internal"),
    experimental: E.unknown().optional().describe("@internal"),
    dependencies: E.unknown().optional().describe("@internal"),
    metadata: E.unknown().optional().describe("@internal")
  })), agentFrontmatterSchema = Re(() => E.object({
    name: scalar().describe("Agent identifier. Required \u2014 this is how the Agent tool and `--agent` flag address it."),
    description: scalar().describe("When to use this agent. Required \u2014 shown in the Agent tool listing."),
    model: scalar().optional().describe("Model override for this agent. Use `inherit` to match the spawning conversation."),
    tools: scalarOrStringListSchema().optional().describe("Tools available to this agent. Replaces the default set."),
    disallowedTools: scalarOrStringListSchema().optional().describe("Tools removed from the default set. Ignored if `tools` is set."),
    color: scalar().optional().describe("@internal \u2014 display color in the agents UI"),
    effort: scalar().optional().describe("Thinking effort: `low`, `medium`, `high`, `max`, or an integer."),
    permissionMode: scalar().optional().describe("Permission mode the agent runs in."),
    mcpServers: E.unknown().optional().describe("MCP servers to connect when this agent runs."),
    hooks: E.unknown().optional().describe("Hooks registered while this agent runs."),
    maxTurns: E.union([E.number(), E.string(), E.null()]).optional().describe("Maximum conversation turns before the agent stops."),
    skills: scalarOrStringListSchema().optional().describe("Skills preloaded for this agent."),
    initialPrompt: scalar().optional().describe("Auto-submitted first message when this agent runs as the main session (via `--agent` or settings). Not read when spawned as a subagent."),
    memory: scalar().optional().describe("Memory scope: `user`, `project`, or `local`."),
    background: booleanFlag().optional().describe("If true, the agent runs in the background by default."),
    isolation: scalar().optional().describe("Filesystem isolation: `worktree` runs in a temporary git worktree.")
  })), outputStyleFrontmatterSchema = Re(() => E.object({
    name: scalar().optional().describe("Style name used in the Output style picker in `/config` and in settings. Defaults to the filename."),
    description: scalar().optional().describe("Shown in the Output style picker in `/config`."),
    "keep-coding-instructions": booleanFlag().optional().describe("If true, the default coding instructions stay in the system prompt alongside this style."),
    "force-for-plugin": booleanFlag().optional().describe("@internal \u2014 only meaningful for plugin-bundled styles; ignored for user styles")
  })), strictFrontmatterSchemas = {
    skill: Re(() => skillFrontmatterSchema().strict()),
    agent: Re(() => agentFrontmatterSchema().strict()),
    "output-style": Re(() => outputStyleFrontmatterSchema().strict())
  }, shadowEventsSeen = new Set();
});

export {emitShadowEventOnce as uAi,shadowValidateFrontmatter as EFe,scalarSchema as tBr,scalar as _k,booleanFlag as fQe,scalarOrStringListSchema as _ve,baseFrontmatterSchema as RXu,skillFrontmatterSchema as nBr,agentFrontmatterSchema as xXu,outputStyleFrontmatterSchema as kXu,strictFrontmatterSchemas as HXu,shadowEventsSeen as cAi,initFrontmatterSchemas as UHt};
