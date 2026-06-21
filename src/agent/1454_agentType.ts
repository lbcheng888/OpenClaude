// @ts-nocheck
import {getSessionId,lt as ct} from "../session/0131_sent.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
// Agent 上下文类型定义：主 Agent / 子 Agent 判断、深度计算、调用事件提取

declare const getSessionId: any;
declare const ct: any;
declare const b: any;

/** 在给定 Agent 上下文中执行回调（AsyncLocalStorage.run） */
function runWithAgentContext<T>(context: AgentContext, fn: () => T): T {
  return agentContextStorage.run(context, fn);
}

/** 构造主 Agent 上下文 */
function createMainAgentContext(): MainAgentContext {
  return {
    agentType: "main",
    agentId: getSessionId()
  };
}

/** 判断是否为主 Agent */
function isMainAgent(ctx: AgentContext): ctx is MainAgentContext {
  return ctx.agentType === "main";
}

/** 获取 Agent 调用深度（主 Agent 为 0） */
function getAgentDepth(ctx: AgentContext): number {
  if (ctx.agentType === "main") return 0;
  return ctx.depth ?? 0;
}

/** 判断是否为子 Agent */
function isSubAgent(ctx: AgentContext): ctx is SubAgentContext {
  return ctx.agentType === "subagent";
}

/** 获取子 Agent 的用户可见名称（built-in 用原名，用户自定义统一返回 "user-defined"） */
function getSubAgentDisplayName(ctx: AgentContext): string | undefined {
  if (!isSubAgent(ctx) || !ctx.subagentName) return;
  return ctx.isBuiltIn ? ctx.subagentName : "user-defined";
}

/** 提取子 Agent 初次调用事件信息（仅触发一次，之后打标防重发） */
function extractInvocationEvent(ctx: AgentContext): InvocationEvent | undefined {
  if (ctx.agentType === "main" || !ctx.invokingRequestId || ctx.invocationEmitted) return;
  return ctx.invocationEmitted = !0, {
    invokingRequestId: ctx.invokingRequestId,
    invocationKind: ctx.invocationKind
  };
}
interface MainAgentContext {
  agentType: "main";
  agentId: string;
}
interface SubAgentContext {
  agentType: "subagent";
  depth?: number;
  subagentName?: string;
  isBuiltIn?: boolean;
  invokingRequestId?: string;
  invocationKind?: string;
  invocationEmitted?: boolean;
}
type AgentContext = MainAgentContext | SubAgentContext;
interface InvocationEvent {
  invokingRequestId: string;
  invocationKind: string | undefined;
}
var asyncHooksModule: typeof import("async_hooks"), agentContextStorage: import("async_hooks").AsyncLocalStorage<AgentContext>;
var initModule = b(() => {
  ct();
  asyncHooksModule = require("async_hooks"), agentContextStorage = new asyncHooksModule.AsyncLocalStorage();
});
export {runWithAgentContext as B8,createMainAgentContext as Af,isMainAgent as V7,getAgentDepth as POWERSHELL_TOOL_NAME,isSubAgent as $Rr,getSubAgentDisplayName as $$s,extractInvocationEvent as qRr,asyncHooksModule as U$s,agentContextStorage as mwt,initModule as S_};
