// @ts-nocheck
import {Ne as Ge} from "../../vendor/m583.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {dn as an} from "./0137_namespace.ts";
// @ts-nocheck
// 进入点(entrypoint)检测与设置：识别当前运行环境（CLI/SDK/MCP/远程/Slack等），并提供各类环境判断工具函数

declare const Ge: any;
declare const rt: any;
declare const b: any;
declare const Or: any;
declare const an: any;

/** 返回当前 entrypoint（若在已知集合内），否则返回 undefined */
function GV(): string | undefined {
  let entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT;
  return entrypoint && y5c.has(entrypoint) ? entrypoint : void 0;
}

/** 判断当前 entrypoint 是否属于"本地代理"模式集合 */
function Jre(): boolean {
  let entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT;
  return entrypoint !== undefined && T5c.has(entrypoint);
}

/** 判断是否通过 remote_trigger 入口启动 */
function BZt(): boolean {
  return process.env.CLAUDE_CODE_ENTRYPOINT === "remote_trigger";
}

/** 判断是否在 Slack 中运行 */
function JKo(): boolean {
  let entrypoint = Ge.CLAUDE_CODE_ENTRYPOINT;
  return entrypoint === "claude_in_slack" || entrypoint === "claude-in-slack";
}

/** 判断是否在 Teams 中运行 */
function XKo(): boolean {
  return Ge.CLAUDE_CODE_ENTRYPOINT === "claude-in-teams";
}

/** 判断是否需要展示设置提示（非静默远程模式） */
function QKo(): boolean {
  if (rt(Ge.CLAUDE_CODE_HIDE_SETTINGS_HINT)) return false;
  let entrypoint = Ge.CLAUDE_CODE_ENTRYPOINT;
  return entrypoint === undefined || !S5c.has(entrypoint);
}

/** 判断是否通过 SDK（TypeScript/Python/CLI）启动 */
function FVe(): boolean {
  let entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT;
  return entrypoint === "sdk-ts" || entrypoint === "sdk-py" || entrypoint === "sdk-cli";
}

/**
 * 根据进程参数或是否为 SDK 模式设置 CLAUDE_CODE_ENTRYPOINT 环境变量。
 * 若已设置则仅在 cli+sdk 情况下升级为 sdk-cli。
 */
function ZKo(isSdkMode: boolean): void {
  if (process.env.CLAUDE_CODE_ENTRYPOINT) {
    if (process.env.CLAUDE_CODE_ENTRYPOINT === "cli" && isSdkMode) process.env.CLAUDE_CODE_ENTRYPOINT = "sdk-cli";
    return;
  }
  let args = process.argv.slice(2);
  let mcpIdx = args.indexOf("mcp");
  if (mcpIdx !== -1 && args[mcpIdx + 1] === "serve") {
    process.env.CLAUDE_CODE_ENTRYPOINT = "mcp";
    return;
  }
  if (rt(process.env.CLAUDE_CODE_ACTION)) {
    process.env.CLAUDE_CODE_ENTRYPOINT = "claude-code-github-action";
    return;
  }
  process.env.CLAUDE_CODE_ENTRYPOINT = isSdkMode ? "sdk-cli" : "cli";
}

/**
 * 从命令行参数推断会话启动模式：resume / continue / fresh
 */
function ezo(args: string[]): "resume" | "continue" | "fresh" {
  let doubleDashIdx = args.indexOf("--");
  let argsBeforeDoubleDash = doubleDashIdx === -1 ? args : args.slice(0, doubleDashIdx);
  if (argsBeforeDoubleDash.includes("-r") || argsBeforeDoubleDash.includes("--resume") || argsBeforeDoubleDash.includes("--from-pr") || argsBeforeDoubleDash.some(arg => arg.startsWith("--resume=") || arg.startsWith("--from-pr="))) return "resume";
  if (argsBeforeDoubleDash.includes("-c") || argsBeforeDoubleDash.includes("--continue")) return "continue";
  return "fresh";
}

/** 所有已知的合法 entrypoint 值集合 */
var y5c: Set<string>;
/** 属于本地代理模式的 entrypoint 集合 */
var T5c: Set<string>;
/** 静默模式（不显示设置提示）的 entrypoint 集合 */
var S5c: Set<string>;

/** 懒加载初始化块 */
var JI = b(() => {
  Or();
  an();
  y5c = new Set(["cli", "mcp", "sdk-cli", "sdk-ts", "sdk-py", "bench", "claude-vscode", "claude-code-github-action", "local-agent", "claude-desktop", "remote", "remote_baku", "remote_cowork", "remote_trigger", "remote_desktop", "remote_mobile", "claude_in_slack", "claude-in-slack", "claude-in-teams", "claude-desktop-3p", "claude-security", "ssh-remote"]);
  T5c = new Set(["claude-desktop", "claude-desktop-3p", "local-agent"]);
  S5c = new Set(["claude_in_slack", "claude-in-slack", "claude-in-teams", "remote_trigger", "remote_cowork", "remote_baku"]);
});
export {GV as XU,Jre as xK,BZt as lrn,JKo as nts,XKo as rts,QKo as ots,FVe as tje,ZKo as sts,ezo as its,y5c as utu,T5c as dtu,S5c as ptu,JI as rI};
