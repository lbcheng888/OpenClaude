// @ts-nocheck
import {isForkSubagentEnabled,LRe as h$H} from "../permissions/2706_isInForkChild.ts";
import {Cs as G9,Ph as _A} from "../../vendor/m2224.ts";
import {Dh as hY,NH as pG} from "../config/2024_NH.ts";
import {getSubscriptionType,Ao as jq} from "../config/2031_withOAuthRefreshLock.ts";
import {Zw as FP,bW as initSystemPromptSections} from "../config/3273_bW.ts";
import {Su as D5,oA as $$} from "../config/2697_oA.ts";
import {$c as p1,Vw as xP} from "../../vendor/m2695.ts";
import {Ws as E9,ef as eT} from "../../vendor/m2248.ts";
import {je as nH} from "../../vendor/m577.ts";
import {isInProcessTeammate as mG,Q2 as oh} from "../../vendor/m1457.ts";
import {isTeammate,Am as Xz} from "./1459_waitForTeammatesToBecomeIdle.ts";
import {n3t as ux_,Zdo as B1q} from "../config/4214_Zdo.ts";
import {freshFeatureValues as UA} from "../tools/2698_allErrors.ts";
import {b as L} from "../../runtime.ts";
import {Lr as d8} from "../../vendor/m578.ts";
// @ts-nocheck
// Agent 工具系统提示生成模块。根据会话模式（fork 子代理启用与否、订阅类型、
// 是否在 teammate 模式等）动态拼接 Agent 工具描述文本，包含用法示例、
// 提示写作指南、fork 机制说明等。

// 跨模块依赖（混淆名保持，编译期擦除）
declare const isForkSubagentEnabled: () => boolean;
declare const h$H: () => void;
declare const G9: string;              // Agent 工具名称
declare const _A: () => void;
declare const hY: (model: string) => boolean;
declare const pG: () => void;
declare const getSubscriptionType: () => string;
declare const jq: () => void;
declare const FP: () => boolean;
declare const initSystemPromptSections: () => void;
declare const D5: () => boolean;
declare const $$: () => void;
declare const p1: string;              // Grep 工具名称
declare const xP: () => void;
declare const E9: string;              // Read 工具名称
declare const eT: () => void;
declare const nH: Record<string, any>; // 环境变量对象
declare const mG: () => boolean;
declare const oh: () => void;
declare const isTeammate: () => boolean;
declare const Xz: () => void;
declare const ux_: () => boolean;
declare const B1q: () => void;
declare const UA: string;              // SendMessage 工具名称
declare const L: (fn: () => void) => () => void;
declare const d8: () => void;

/**
 * 格式化单个 agent 定义的可用工具描述字符串。
 * 规则：仅有 tools → 列举；仅有 disallowedTools → "All except ...";
 *       两者均有 → 从 tools 中排除 disallowedTools；均无 → "All tools"。
 */
function diffTask(agentDef: any): string {
  let { tools: allowedTools, disallowedTools: blockedTools } = agentDef;
  let hasAllowed = allowedTools && allowedTools.length > 0;
  let hasBlocked = blockedTools && blockedTools.length > 0;
  if (hasAllowed && hasBlocked) {
    let blockedSet = new Set(blockedTools);
    let filteredTools = allowedTools.filter(($: string) => !blockedSet.has($));
    if (filteredTools.length === 0) return "None";
    return filteredTools.join(", ");
  } else if (hasAllowed) return allowedTools.join(", ");
  else if (hasBlocked) return `All tools except ${blockedTools.join(", ")}`;
  return "All tools";
}

/**
 * 将 agent 定义格式化为 system-reminder 中的单行描述。
 * @param agentDef  agent 定义对象
 * @param useLean   是否使用精简版的 whenToUse 描述
 */
function mpK(agentDef: any, useLean: boolean): string {
  let toolsDesc = diffTask(agentDef);
  let description = useLean && agentDef.whenToUseLean || agentDef.whenToUse;
  return `- ${agentDef.agentType}: ${description} (Tools: ${toolsDesc})`;
}

/**
 * 生成 Agent 工具的完整描述字符串，根据当前会话配置动态调整内容。
 * @param toolUseContext   工具使用上下文对象
 * @param isCompactMode    是否为紧凑模式（只返回基础描述，省略用法指南）
 * @param enableForkOpt    可选覆盖：是否启用 fork subagent（默认由 isForkSubagentEnabled() 决定）
 */
async function ppK(toolUseContext: any, isCompactMode: boolean, enableForkOpt?: boolean): Promise<string> {
  let forkEnabled = isForkSubagentEnabled();
  let forkActive = forkEnabled && (enableForkOpt ?? !0);
  let forkSection = forkActive ? `

## When to fork

Fork yourself (pass \`subagent_type: "fork"\`) when the intermediate tool output isn't worth keeping in your context. The criterion is qualitative — "will I need this output again" — not task size. Fork open-ended questions. If research can be broken into independent questions, launch parallel forks in one message. A fork beats a fresh subagent for this — it inherits context and shares your cache.

Forks are cheap because they share your prompt cache.

**Don't peek.** The tool result includes an \`output_file\` path — do not Read or tail it. You get a completion notification; trust it. Reading the transcript mid-flight pulls the fork's tool noise into your context, which defeats the point of forking.

**Don't race.** After launching, you know nothing about what the fork found. Never fabricate or predict fork results in any format — not as prose, summary, or structured output. The notification arrives as a user-role message in a later turn; it is never something you write yourself. If the user asks a follow-up before the notification lands, tell them the fork is still running — give status, not a guess.

**Writing a fork prompt.** Since the fork inherits your context, the prompt is a *directive* — what to do, not what the situation is. Be specific about scope: what's in, what's out, what another agent is handling. Don't re-explain background.
` : "";
  let promptWritingSection = `

## Writing the prompt

${forkActive ? "Any agent other than a fork starts with zero context. " : ""}Brief the agent like a smart colleague who just walked into the room — it hasn't seen this conversation, doesn't know what you've tried, doesn't understand why this task matters.
- Explain what you're trying to accomplish and why.
- Describe what you've already learned or ruled out.
- Give enough context about the surrounding problem that the agent can make judgment calls rather than just following a narrow instruction.
- If you need a short response, say so ("report in under 200 words").
- Lookups: hand over the exact command. Investigations: hand over the question — prescribed steps become dead weight when the premise is wrong.

${forkActive ? "For fresh agents, terse" : "Terse"} command-style prompts produce shallow, generic work.

**Never delegate understanding.** Don't write "based on your findings, fix the bug" or "based on the research, implement it." Those phrases push synthesis onto the agent instead of doing it yourself. Write prompts that prove you understood: include file paths, line numbers, what specifically to change.`;
  let forkExampleBlock = `Example usage:

<example>
user: "What's left on this branch before we can ship?"
assistant: <thinking>Forking this — it's a survey question. I want the punch list, not the git output in my context.</thinking>
${G9}({
  subagent_type: "fork",
  name: "ship-audit",
  description: "Branch ship-readiness audit",
  prompt: "Audit what's left before this branch can ship. Check: uncommitted changes, commits ahead of main, whether tests exist, whether the GrowthBook gate is wired up, whether CI-relevant files changed. Report a punch list — done vs. missing. Under 200 words."
})
assistant: Ship-readiness audit running.
<commentary>
Turn ends here. The coordinator knows nothing about the findings yet. What follows is a SEPARATE turn — the notification arrives from outside, as a user-role message. It is not something the coordinator writes.
</commentary>
[later turn — notification arrives as user message]
assistant: Audit's back. Three blockers: no tests for the new prompt path, GrowthBook gate wired but not in build_flags.yaml, and one uncommitted file.
</example>

<example>
user: "so is the gate wired up or not"
<commentary>
User asks mid-wait. The audit fork was launched to answer exactly this, and it hasn't returned. The coordinator does not have this answer. Give status, not a fabricated result.
</commentary>
assistant: Still waiting on the audit — that's one of the things it's checking. Should land shortly.
</example>

<example>
user: "Can you get a second opinion on whether this migration is safe?"
assistant: <thinking>I'll ask the code-reviewer agent — it won't see my analysis, so it can give an independent read.</thinking>
<commentary>
A non-fork subagent_type is specified, so the agent starts fresh. It needs full context in the prompt. The briefing explains what to assess and why.
</commentary>
${G9}({
  name: "migration-review",
  description: "Independent migration review",
  subagent_type: "code-reviewer",
  prompt: "Review migration 0042_user_schema.sql for safety. Context: we're adding a NOT NULL column to a 50M-row table. Existing rows get a backfill default. I want a second opinion on whether the backfill approach is safe under concurrent writes — I've checked locking behavior but want independent verification. Report: is this safe, and if not, what specifically breaks?"
})
</example>
`;
  let noForkExampleBlock = `Example usage:

<example>
user: "What's left on this branch before we can ship?"
assistant: <thinking>A survey question across git state, tests, and config. I'll delegate it and ask for a short report so the raw command output stays out of my context.</thinking>
${G9}({
  description: "Branch ship-readiness audit",
  prompt: "Audit what's left before this branch can ship. Check: uncommitted changes, commits ahead of main, whether tests exist, whether the GrowthBook gate is wired up, whether CI-relevant files changed. Report a punch list — done vs. missing. Under 200 words."
})
<commentary>
The prompt is self-contained: it states the goal, lists what to check, and caps the response length. The agent's report comes back as the tool result; relay the findings to the user.
</commentary>
</example>

<example>
user: "Can you get a second opinion on whether this migration is safe?"
assistant: <thinking>I'll ask the code-reviewer agent — it won't see my analysis, so it can give an independent read.</thinking>
${G9}({
  description: "Independent migration review",
  subagent_type: "code-reviewer",
  prompt: "Review migration 0042_user_schema.sql for safety. Context: we're adding a NOT NULL column to a 50M-row table. Existing rows get a backfill default. I want a second opinion on whether the backfill approach is safe under concurrent writes — I've checked locking behavior but want independent verification. Report: is this safe, and if not, what specifically breaks?"
})
<commentary>
The agent starts with no context from this conversation, so the prompt briefs it: what to assess, the relevant background, and what form the answer should take.
</commentary>
</example>
`;
  let isLeanModel = hY(toolUseContext);
  let agentTypesNote = "Available agent types are listed in <system-reminder> messages in the conversation.";
  let proOnlyNote = getSubscriptionType() === "pro" ? `

**Do not spawn agents unless the user asks.** Each spawn starts cold and re-derives context you already have — it's the expensive path on this plan. A task with "multiple angles," "thorough," or several parts is not a request to spawn; handle it inline with your own tools. Only use this tool when the user explicitly says to use a subagent, or names one of the available agent types.` : "";
  let baseDescription = `Launch a new agent to handle complex, multi-step tasks. Each agent type has specific capabilities and tools available to it.

Available agent types are listed in <system-reminder> messages in the conversation.${proOnlyNote}

${forkActive ? `When using the ${G9} tool, specify a subagent_type to select an agent: \`"fork"\` forks yourself (the fork inherits your full conversation context and always runs on your model — a \`model\` override is ignored); any other type — or omitting it — starts a fresh agent (general-purpose by default).` : `When using the ${G9} tool, specify a subagent_type parameter to select which agent type to use. If omitted, the general-purpose agent is used.`}`;
  if (isCompactMode) return baseDescription;
  let grepToolRef = FP() && D5() ? "`grep` via the Bash tool" : `the ${p1} tool`;
  let whenNotToUseSection = forkActive ? "" : `
## When not to use

If the target is already known, use the direct tool: ${E9} for a known path, ${grepToolRef} for a specific symbol or string. Reserve this tool for open-ended questions that span the codebase, or tasks that match an available agent type.
`;
  if (isLeanModel) {
    let backgroundNote = !nH.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS && !mG() && !forkEnabled ? "\n- `run_in_background: true` runs the agent asynchronously; you'll be notified when it completes." : "";
    let modeNote = mG() ? "\n- `run_in_background`, `name`, and `mode` are unavailable here — only synchronous subagents." : isTeammate() ? "\n- `name` and `mode` are unavailable here — teammates cannot spawn teammates." : "";
    let remoteNote = ux_() ? '\n- `isolation: "remote"` runs the agent in a remote CCR sandbox (always background).' : "";
    return `${baseDescription}${proOnlyNote ? "" : `

## When to use

Reach for this when the task matches an available agent type, when you have independent work to run in parallel, or when answering would mean reading across several files — delegate it and you keep the conclusion, not the file dumps. For a single-fact lookup where you already know the file, symbol, or value, search directly. Once you've delegated a search, don't also run it yourself — wait for the result.`}${forkActive ? `

A fork runs in the background and keeps its tool output out of your context. If you are the fork, execute directly — don't re-delegate.` : ""}

- The agent's final message is returned to you as the tool result; it is not shown to the user — relay what matters.
- Use ${UA} with the agent's ID or name to continue a previously spawned agent with its context intact; a new ${G9} call starts fresh${forkActive ? ' (except subagent_type: "fork", which inherits your context)' : ""}.
- \`isolation: "worktree"\` gives the agent its own git worktree (auto-cleaned if unchanged).${remoteNote}${backgroundNote}${modeNote}`;
  }
  return `${baseDescription}
${whenNotToUseSection}
## Usage notes

- Always include a short description summarizing what the agent will do
- When the agent is done, it will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.
- Trust but verify: an agent's summary describes what it intended to do, not necessarily what it did. When an agent writes or edits code, check the actual changes before reporting the work as done.${!nH.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS && !mG() && !forkEnabled ? `
- You can optionally run agents in the background using the run_in_background parameter. When an agent runs in the background, you will be automatically notified when it completes — do NOT sleep, poll, or proactively check on its progress. Continue with other work or respond to the user instead.
- **Foreground vs background**: Use foreground (default) when you need the agent's results before you can proceed — e.g., research agents whose findings inform your next steps. Use background when you have genuinely independent work to do in parallel.` : ""}
- To continue a previously spawned agent, use ${UA} with the agent's ID or name as the \`to\` field — that resumes it with full context. A new ${G9} call starts a fresh agent with no memory of prior runs${forkActive ? ' (except subagent_type: "fork")' : ""}, so the prompt must be self-contained.
- Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since a fresh agent is not aware of the user's intent
- If the agent description mentions that it should be used proactively, then you should try your best to use it without the user having to ask for it first.
- If the user specifies that they want you to run agents "in parallel", you MUST send a single message with multiple ${G9} tool use content blocks. For example, if you need to launch both a build-validator agent and a test-runner agent in parallel, send a single message with both tool calls.
- With \`isolation: "worktree"\`, the worktree is automatically cleaned up if the agent makes no changes; otherwise the path and branch are returned in the result.${ux_() ? '\n- You can set `isolation: "remote"` to run the agent in a remote CCR environment. This is always a background task; you\'ll be notified when it completes. Use for long-running tasks that need a fresh sandbox.' : ""}${mG() ? `
- The run_in_background, name, and mode parameters are not available in this context. Only synchronous subagents are supported.` : isTeammate() ? `
- The name and mode parameters are not available in this context — teammates cannot spawn other teammates. Omit them to spawn a subagent.` : ""}${forkSection}${promptWritingSection}

${forkActive ? forkExampleBlock : noForkExampleBlock}`;
}

/** 懒初始化：依赖各子模块的副作用 */
var U1q = L(() => {
  jq();
  initSystemPromptSections();
  d8();
  pG();
  $$();
  Xz();
  oh();
  eT();
  xP();
  _A();
  h$H();
  B1q();
});



export {diffTask as MDp,mpK as C8a,ppK as v8a,U1q as epo};
