// @ts-nocheck
import {Yc,ws,Zm} from "../config/2709_Zm.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {ov,NW} from "../config/3289_NW.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Tbn} from "../../vendor/m2204.ts";
import {b} from "../../runtime.ts";
import {iee,ARTIFACT_TOOL_NAME as uW} from "../artifact/2713_uuidSlugFromUrl.ts";
import {ry,fa} from "../../vendor/m2253.ts";
import {dw,Ec} from "../../vendor/m2593.ts";
import {fg,ls} from "../../vendor/m2232.ts";
import {Lk} from "../config/2259_R9r.ts";
import {Y0} from "../tools/2710_allErrors.ts";
// @ts-nocheck
// Explore Agent 定义模块:生成只读代码搜索 agent 的系统提示,
// 根据 API provider 和 GrowthBook flag 动态选择模型(haiku/sonnet/opus)。
//
// 注:v190 为 bundle 形态(无 import/export 头),跨模块符号沿用混淆名:
//   Yc  -> 是否在 macOS/Linux(isUnixLike)
//   Mo  -> Unix 下的 shell 工具名 / VSCode MCP 工具名
//   ws  -> 非 Unix(Windows)下的 shell 工具名
//   ov  -> 是否启用 VSCode MCP
//   su  -> GlobTool 名
//   Cc  -> GrepTool 名
//   vs  -> ReadFile 工具名
//   it  -> getFeatureValue(GrowthBook flag)
//   Rr  -> getAPIProvider
//   Tbn -> (model, list) => boolean,判断 model 是否在 list 范围内
//   b   -> 运行时模块注册器(lazy init)
//   ls/uW/Lk/fa/Ec/Y0 -> Explore 禁用的工具名

/** 生成只读代码搜索 agent 的系统提示文本 */
function h0p(): string {
  let isUnixLike = Yc(),
    shellToolName = isUnixLike ? Mo : ws,
    hasVscodeMcp = ov() && isUnixLike,
    globHint = hasVscodeMcp ? `- Use \`find\` via ${Mo} for broad file pattern matching` : `- Use ${su} for broad file pattern matching`,
    grepHint = hasVscodeMcp ? `- Use \`grep\` via ${Mo} for searching file contents with regex` : `- Use ${Cc} for searching file contents with regex`;
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
- Use ${vs} when you know the specific file path you need to read
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
function yye(agentDef: any, contextWindow: number): string {
  if (agentDef.agentType !== uce.agentType || agentDef.source !== "built-in") return agentDef.model;
  if (!it("tengu_quartz_heron", !1)) return "haiku";
  return y0p(contextWindow) ? T9a : "inherit";
}

/** 判断当前上下文窗口是否需要升级到 opus(已接近 haiku 上限) */
function y0p(contextWindow: number): boolean {
  if (Rr() !== "firstParty") return !1;
  let modelsBeforeOpus = _9a.slice(0, _9a.indexOf(T9a) + 1);
  return !Tbn(contextWindow, modelsBeforeOpus);
}

/** Explore agent 并发限制 */
var y9a = 3,
  /** Explore agent 简短描述(用于 UI 展示) */
  g0p = 'Fast read-only search agent for locating code. Use it to find files by pattern (eg. "src/components/**/*.tsx"), grep for symbols or keywords (eg. "API endpoints"), or answer "where is X defined / which files reference Y." Do NOT use it for code review, design-doc auditing, cross-file consistency checks, or open-ended analysis — it reads excerpts rather than whole files and will miss content past its read window. When calling, specify search breadth: "quick" for a single targeted lookup, "medium" for moderate exploration, or "very thorough" to search across multiple locations and naming conventions.',
  /** Explore agent 精简描述(lean 模式) */
  _0p = `Read-only search agent for broad fan-out searches — when answering means sweeping many files, directories, or naming conventions and you only need the conclusion, not the file dumps. It reads excerpts rather than whole files, so it locates code; it doesn't review or audit it. Specify search breadth: "medium" for moderate exploration, "very thorough" for multiple locations and naming conventions.`,
  /** Explore agent 定义对象(运行时初始化后填充) */
  uce,
  /** 模型选择顺序(由低到高) */
  _9a,
  /** opus 模型名常量 */
  T9a = "opus";
var Tye = b(() => {
  jn();
  iee();
  ry();
  dm();
  dw();
  ow();
  XR();
  NW();
  Ps();
  Zm();
  fg();
  uce = {
    agentType: "Explore",
    whenToUse: g0p,
    whenToUseLean: _0p,
    disallowedTools: [ls, uW, Lk, fa, Ec, Y0],
    source: "built-in",
    baseDir: "built-in",
    model: "haiku",
    omitClaudeMd: !0,
    getSystemPrompt: () => h0p()
  };
  _9a = ["haiku", "sonnet", "opus"];
});

export {h0p,yye,y0p,y9a,g0p,_0p,uce,_9a,T9a,Tye};
