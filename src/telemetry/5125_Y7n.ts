// @ts-nocheck
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
// 后台云会话参数计算：校验 --cloud 标志组合合法性，剥离 cloud/remote 参数，及内存与优雅退出超时阈值计算

declare const Yt: any;
declare const $s: any;
declare const getFeatureValue_CACHED_MAY_BE_STALE: any;
declare const Yn: any;
declare const b: any;

/**
 * 校验 --cloud 标志与其他标志的互斥关系。
 * 返回错误消息字符串，无冲突返回 null。
 */
function JDl(flags: {
  print?: boolean;
  hasPool?: boolean;
  isCloudAttach?: boolean;
  nonInteractive?: boolean;
  continue?: boolean;
  hasConnect?: boolean;
  hasSSH?: boolean;
  hasAssistant?: boolean;
  hasTeleport?: boolean;
  resume?: boolean;
  fromPr?: boolean;
}): string | null {
  if (flags.print && !flags.hasPool && !flags.isCloudAttach) return `Error: --cloud cannot be combined with --print.
Cloud sessions are interactive only. Drop --print, or drop --cloud to run locally.`;
  if (flags.nonInteractive && !flags.hasPool && !flags.isCloudAttach) return `Error: --cloud requires an interactive terminal.
Non-interactive invocations (piped stdout, --init-only, --sdk-url) run locally and would silently ignore --cloud. Drop --cloud, or run from a TTY.`;
  let cloudFlag = "--cloud";
  let reattachHint = "\nTo reattach to a cloud session, pass its id: `claude --cloud <session-id>` (find IDs at claude.ai/code).";
  if (flags.continue) return `Error: ${cloudFlag} cannot be combined with --continue.${reattachHint}`;
  if (flags.hasConnect || flags.hasSSH || flags.hasAssistant || flags.hasTeleport) {
    let conflictingFlag = flags.hasConnect ? "a cc:// connect URL" : flags.hasSSH ? "`claude ssh`" : flags.hasAssistant ? "`claude assistant`" : "--teleport";
    return `Error: ${cloudFlag} cannot be combined with ${conflictingFlag} — both select a remote backend; pick one.`;
  }
  if (flags.resume || flags.fromPr) {
    let conflictFlag = flags.resume ? "--resume" : "--from-pr";
    return `Error: ${cloudFlag} cannot be combined with ${conflictFlag}.${reattachHint}`;
  }
  return null;
}

/** 返回 --bg 与 --cloud 不兼容的提示信息 */
function VRo(context: unknown): string {
  return "--bg and --cloud are different backends. Use `claude --cloud '<task>'` directly to start a cloud session.";
}

/** 判断参数列表中是否包含 --cloud 或 --remote 标志 */
function KRo(args: string[]): boolean {
  return args.some(arg => arg === "--cloud" || arg.startsWith("--cloud=") || arg === "--remote" || arg.startsWith("--remote="));
}

/**
 * 从参数列表中剥离 --cloud/--remote 标志及其可选的 session-id 参数值。
 * 保留 `--` 之后的所有参数。
 */
function _ft(args: string[]): string[] {
  let result: string[] = [];
  for (let idx = 0; idx < args.length; idx++) {
    let arg = args[idx];
    if (arg === "--") {
      for (let tail = idx; tail < args.length; tail++) result.push(args[tail]);
      break;
    }
    if (arg.startsWith("--cloud=") || arg.startsWith("--remote=")) continue;
    if (arg === "--cloud" || arg === "--remote") {
      if (args[idx + 1] !== undefined && !args[idx + 1].startsWith("-")) idx++;
      continue;
    }
    result.push(arg);
  }
  return result;
}

/** 返回后台任务触发低内存保护的字节阈值（macOS 返回 0 表示禁用） */
function s7n(): number {
  if (Yt() === "macos") return 0;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_low_mem_mb", 1024) * 1024 * 1024;
}

/** 判断当前系统可用内存是否低于阈值 */
function B8t(): boolean {
  let threshold = s7n();
  return threshold > 0 && XDl.freemem() < threshold;
}

/** 返回桥接模式下后台会话优雅退出的宽限期毫秒数 */
function QDl(): number {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_retire_grace_bridged_min", 480) * 60000;
}

/** 判断是否启用后台会话自动升级附加功能 */
function i7n(): boolean {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_bg_attach_upgrade", true);
}

/** Node.js os 模块，用于获取系统可用内存 */
var XDl: typeof import("os");

/** 懒加载初始化块 */
var a7n = b(() => {
  Yn();
  $s();
  XDl = require("os");
});
export {JDl as _Ol,VRo as Xxo,KRo as Qxo,_ft as qft,s7n as K7n,B8t as p5t,QDl as TOl,i7n as z7n,XDl as yOl,a7n as Y7n};
