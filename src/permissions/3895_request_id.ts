// @ts-nocheck
import {b as L} from "../../runtime.ts";
// @ts-nocheck
// 权限决策辅助工具:行为描述文本生成、原因提取、规范化 requestId 字段以及构造 dialog 工具使用记录

// 跨模块依赖(混淆名保持,编译期擦除)
declare const L: any;
function describePermissionBehavior(behavior: string): string {
  switch (behavior) {
    case "allow":
      return "allowed";
    case "deny":
      return "denied";
    default:
      return "asked for confirmation for";
  }
}

/** 从权限决策结果中提取可显示原因字符串 */
function extractPermissionReason(decisionReason: any): string | undefined {
  if (!decisionReason) return;
  if (decisionReason.type === "classifier") return decisionReason.reason;
  switch (decisionReason.type) {
    case "rule":
    case "mode":
    case "subcommandResults":
    case "permissionPromptTool":
    case "classifier":
      return;
    case "hook":
    case "asyncAgent":
    case "sandboxOverride":
    case "workingDir":
    case "safetyCheck":
    case "other":
      return decisionReason.reason;
  }
}

/** 判断对象是否为有效的权限行为结果(allow 或 deny) */
function isPermissionBehaviorResult(value: any): boolean {
  if (!value || typeof value !== "object") return false;
  return "behavior" in value && (value.behavior === "allow" || value.behavior === "deny");
}

/** 将工具名（含双下划线命名空间）转换为可读标签 */
function toolNameToReadableLabel(toolName: string): string {
  return (toolName.split("__").pop() || toolName).replace(/_/g, " ").replace(/\b\w/g, ch => ch.toUpperCase());
}

/** 空操作函数(占位用) */
var noOpFn = () => {};

/**
 * 规范化消息对象中的 requestId / request_id 字段:
 * 将 requestId 重命名为 request_id(兼容旧协议)
 */
function normalizeRequestId(message: any): any {
  if (message === null || typeof message !== "object") return message;
  let msg = message;
  if ("requestId" in msg && !("request_id" in msg)) msg.request_id = msg.requestId, delete msg.requestId;
  if ("response" in msg && msg.response !== null && typeof msg.response === "object") {
    let resp = msg.response;
    if ("requestId" in resp && !("request_id" in resp)) resp.request_id = resp.requestId, delete resp.requestId;
  }
  return message;
}

/** 构造 dialog 类型的工具使用记录对象 */
function buildDialogToolUse(dialogKind: string, payload: any, requestId: string, toolUseId?: string): any {
  return {
    tool_name: `dialog:${dialogKind}`,
    display_tool_name: "Claude needs your input",
    action_description: dialogActionDescriptions[dialogKind] ?? `Respond to the ${dialogKind} dialog to continue`,
    raw_command: void 0,
    tool_use_id: toolUseId ?? "",
    request_id: requestId,
    input: {
      dialog_kind: dialogKind,
      payload: payload
    }
  };
}
var dialogActionDescriptions: Record<string, string>;
var initDialogActionDescriptions = L(() => {
  dialogActionDescriptions = {
    refusal_fallback_prompt: "choose: retry on fallback model or edit prompt"
  };
});
export {describePermissionBehavior as Mso,extractPermissionReason as OFn,isPermissionBehaviorResult as tOa,toolNameToReadableLabel as dce,noOpFn as LFn,normalizeRequestId as MFn,buildDialogToolUse as nOa,dialogActionDescriptions as xyp,initDialogActionDescriptions as rOa};
