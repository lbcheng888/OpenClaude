// @ts-nocheck
import {Su as J5,Js as i9,oA as H$} from "../config/2697_oA.ts";
import {ns as _9} from "../mcp/2194_mcpServerName.ts";
import {Zw as xP,bW as QQ} from "../config/3273_bW.ts";
import {yu as E5,VR as AZ} from "../../vendor/m2249.ts";
import {$c as u1,Vw as vP} from "../../vendor/m2695.ts";
import {Ws as I9,ef as oT} from "../../vendor/m2248.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getAPIProvider,li as $7} from "../api/1282_usesFirstPartyModelIds.ts";
import {B_n as Bw6} from "../../vendor/m2198.ts";
import {b as L} from "../../runtime.ts";
import {ty as cA,Ua as mK} from "../../vendor/m2245.ts";
import {ex as cW,zc as a1} from "../../vendor/m2582.ts";
import {Ph as rY,Cs as h9} from "../../vendor/m2224.ts";
import {Tk as HZ} from "../config/2251_zBr.ts";
import {I0 as LL} from "../tools/2698_allErrors.ts";
// @ts-nocheck
// Explore Agent 定义模块:生成只读代码搜索 agent 的系统提示,
// 根据 API provider 和 GrowthBook flag 动态选择模型(haiku/sonnet/opus)。

// 跨模块依赖(混淆名保持,编译期擦除)
declare const J5: () => boolean; // 是否在 macOS/Linux
declare const i9: string; // 非 macOS bash 工具名
declare const H$: any;
declare const _9: string; // VSCode MCP server 工具名
declare const xP: () => boolean; // 是否启用 VSCode MCP
declare const QQ: any;
declare const E5: string; // GlobTool 名
declare const AZ: any;
declare const u1: string; // GrepTool 名
declare const vP: any;
declare const I9: string; // ReadFile 工具名
declare const oT: any;
declare const j_: (key: string, defaultValue: any) => any;
declare const t6: any;
declare const getAPIProvider: () => string;
declare const $7: any;
declare const Bw6: (model: string, list: string[]) => boolean;
declare const L: (init: () => void) => any;
declare const cA: any;
declare const mK: string; // tool name
declare const cW: any;
declare const a1: string; // tool name
declare const rY: any;
declare const h9: string; // tool name (disallowed for Explore)
declare const HZ: string; // tool name (disallowed for Explore)
declare const LL: any;

/** 生成只读代码搜索 agent 的系统提示文本 */
function buildExploreSystemPrompt(): string {
  let isUnixLike = J5(),
    shellToolName = isUnixLike ? _9 : i9,
    hasVscodeMcp = xP() && isUnixLike,
    globHint = hasVscodeMcp
      ? `- Use \`find\` via ${_9} for broad file pattern matching`
      : `- Use ${E5} for broad file pattern matching`,
    grepHint = hasVscodeMcp
      ? `- Use \`grep\` via ${_9} for searching file contents with regex`
      : `- Use ${u1} for searching file contents with regex`;
  return `You are a file search specialist for Claude Code, Anthropic's official CLI for Claude. You excel at thoroughly navigating and exploring codebases.

=== CRITICAL: READ-ONLY MODE - NO FILE MODIFICATIONS ===
This is a READ-ONLY exploration task. You are STRICTLY PROHIBITED from:
- Creating new files (no Write, touch, or file creation of any kind)
- Modifying existing files (no Edit operations)
- Deleting files (no rm or deletion)
- Moving or copying files (no mv or cp)
- Creating temporary files anywhere, including /tmp
- Using redirect operators (>, >>, |) or heredocs to write to files
- Running ANY commands that change system state

Your role is EXCLUSIVELY to search and analyze existing code. You do NOT have access to file editing tools - attempting to edit files will fail.

Your strengths:
- Rapidly finding files using glob patterns
- Searching code and text with powerful regex patterns
- Reading and analyzing file contents

Guidelines:
${globHint}
${grepHint}
- Use ${I9} when you know the specific file path you need to read
- Use ${shellToolName} ONLY for read-only operations (${isUnixLike ? `ls, git status, git log, git diff, find${hasVscodeMcp ? ", grep" : ""}, cat, head, tail` : "Get-ChildItem, git status, git log, git diff, Get-Content, Select-Object -First/-Last"})
- NEVER use ${shellToolName} for: ${isUnixLike ? "mkdir, touch, rm, cp, mv, git add, git commit, npm install, pip install" : "New-Item, Remove-Item, Copy-Item, Move-Item, git add, git commit, npm install, pip install"}, or any file creation/modification
- Adapt your search approach based on the thoroughness level specified by the caller
- Communicate your final report directly as a regular message - do NOT attempt to create files

NOTE: You are meant to be a fast agent that returns output as quickly as possible. In order to achieve this you must:
- Make efficient use of the tools that you have at your disposal: be smart about how you search for files and implementations
- Wherever possible you should try to spawn multiple parallel tool calls for grepping and reading files

Complete the user's search request efficiently and report your findings clearly.`;
}

/**
 * 为给定 agent 选择模型:
 * 仅 Explore agent 且来自 built-in 时进行动态降级判断;其余直接返回配置模型。
 */
function selectExploreAgentModel(agentDef: any, contextWindow: number): string {
  if (agentDef.agentType !== exploreAgentDefinition.agentType || agentDef.source !== "built-in")
    return agentDef.model;
  if (!j_("tengu_quartz_heron", !1)) return "haiku";
  return shouldUseOpusForExplore(contextWindow) ? OPUS_MODEL : "inherit";
}

/** 判断当前上下文窗口是否需要升级到 opus(已接近 haiku 上限) */
function shouldUseOpusForExplore(contextWindow: number): boolean {
  if (getAPIProvider() !== "firstParty") return !1;
  let modelsBeforeOpus = modelSelectionOrder.slice(0, modelSelectionOrder.indexOf(OPUS_MODEL) + 1);
  return !Bw6(contextWindow, modelsBeforeOpus);
}

/** Explore agent 并发限制 */
var MAX_EXPLORE_CONCURRENCY = 3;

/** Explore agent 简短描述(用于 UI 展示) */
var EXPLORE_AGENT_WHEN_TO_USE =
  'Fast read-only search agent for locating code. Use it to find files by pattern (eg. "src/components/**/*.tsx"), grep for symbols or keywords (eg. "API endpoints"), or answer "where is X defined / which files reference Y." Do NOT use it for code review, design-doc auditing, cross-file consistency checks, or open-ended analysis — it reads excerpts rather than whole files and will miss content past its read window. When calling, specify search breadth: "quick" for a single targeted lookup, "medium" for moderate exploration, or "very thorough" to search across multiple locations and naming conventions.';

/** Explore agent 精简描述(lean 模式) */
var EXPLORE_AGENT_WHEN_TO_USE_LEAN =
  `Read-only search agent for broad fan-out searches — when answering means sweeping many files, directories, or naming conventions and you only need the conclusion, not the file dumps. It reads excerpts rather than whole files, so it locates code; it doesn't review or audit it. Specify search breadth: "medium" for moderate exploration, "very thorough" for multiple locations and naming conventions.`;

/** Explore agent 定义对象(运行时初始化后填充) */
var exploreAgentDefinition: any,
  modelSelectionOrder: string[],
  OPUS_MODEL = "opus";

var AwH = L(() => {
  t6();
  cA();
  oT();
  cW();
  AZ();
  vP();
  QQ();
  $7();
  H$();
  rY();
  exploreAgentDefinition = {
    agentType: "Explore",
    whenToUse: EXPLORE_AGENT_WHEN_TO_USE,
    whenToUseLean: EXPLORE_AGENT_WHEN_TO_USE_LEAN,
    disallowedTools: [h9, HZ, mK, a1, LL],
    source: "built-in",
    baseDir: "built-in",
    model: "haiku",
    omitClaudeMd: !0,
    getSystemPrompt: () => buildExploreSystemPrompt(),
  };
  modelSelectionOrder = ["haiku", "sonnet", "opus"];
});

export {buildExploreSystemPrompt as tSp,selectExploreAgentModel as Xge,shouldUseOpusForExplore as oSp,MAX_EXPLORE_CONCURRENCY as RLa,EXPLORE_AGENT_WHEN_TO_USE as nSp,EXPLORE_AGENT_WHEN_TO_USE_LEAN as rSp,exploreAgentDefinition as pce,modelSelectionOrder as wLa,OPUS_MODEL as xLa,AwH as Qge};
