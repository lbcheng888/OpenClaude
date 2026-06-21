// @ts-nocheck
import {isFirstPartyProvider,li as $7} from "../api/1282_usesFirstPartyModelIds.ts";
import {je as dH} from "../../vendor/m577.ts";
import {hasStoredOAuthToken,Ao as Xq} from "./2031_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {hasWorktreeCreateHook,IFe as uSH} from "../../vendor/m2233.ts";
import {findCanonicalGitRoot,getBranch,isBranchOnOrigin,Ba as uK} from "../../vendor/m693.ts";
import {Pt as x_,Go as dq} from "../../vendor/m632.ts";
import {logForDebugging,qe as UH} from "./0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Lr as l8} from "../../vendor/m578.ts";
// @ts-nocheck
// 远程/Team 模式功能开关：判断是否支持 neapolitan 模式、worktree 创建提示、分支推送状态

// 跨模块依赖（混淆名保持，编译期擦除）
declare const isFirstPartyProvider: () => boolean;
declare const $7: any;
declare const dH: any;
declare const hasStoredOAuthToken: () => boolean;
declare const Xq: any;
declare const j_: (flag: string, defaultVal: any) => any;
declare const t6: any;
declare const hasWorktreeCreateHook: () => boolean;
declare const uSH: any;
declare const findCanonicalGitRoot: (cwd: string) => string | null;
declare const getBranch: (repoPath: string) => Promise<string>;
declare const isBranchOnOrigin: (branch: string, repoPath: string) => Promise<boolean>;
declare const uK: any;
declare const x_: () => string;
declare const dq: any;
declare const logForDebugging: (msg: string, opts?: { level?: string }) => void;
declare const UH: any;
declare const L: (fn: () => void) => () => void;
declare const l8: any;

/** 判断是否可以启用 neapolitan 模式（首方 provider、非远程、有 OAuth token、feature flag 开启） */
function Ux_(): boolean {
  if (!isFirstPartyProvider()) return false
  if (dH.CLAUDE_CODE_REMOTE) return false
  if (!hasStoredOAuthToken()) return false
  return j_("tengu_neapolitan", false)
}

/** 判断是否应该显示 team create 工具使用提示（有 worktree hook 或位于 git 仓库中） */
function getTeamCreatePrompt(): boolean {
  return hasWorktreeCreateHook() || findCanonicalGitRoot(x_()) !== null
}

/** 获取用于远程 agent 的分支名称（如果本地分支已推送到 origin 则返回分支名，否则返回 undefined） */
async function renderTeamCreateToolUseMessage(): Promise<string | undefined> {
  let cwd = x_(), branch = await getBranch(cwd)
  if (branch === "HEAD") return
  if (await isBranchOnOrigin(branch, cwd)) return branch
  logForDebugging(`[remote agent] local branch '${branch}' is not pushed to origin; remote agent will run against the repository's default branch`)
  return
}

/** 将权限模式映射为 auto 模式（bubble 保持 undefined，bypassPermissions 映射为 "auto"） */
function ZBK(permissionMode: string): string | undefined {
  if (permissionMode === "bubble") return
  if (permissionMode === "bypassPermissions") return "auto"
  return permissionMode
}

var H5q = L(() => {
  t6(); Xq(); dq(); UH(); l8(); uK(); uSH(); $7()
})

export {Ux_ as n3t,getTeamCreatePrompt as S8a,renderTeamCreateToolUseMessage as b8a,ZBK as E8a,H5q as Zdo};
