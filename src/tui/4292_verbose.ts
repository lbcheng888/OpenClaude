// @ts-nocheck
import {qt as i_,Xt as t_} from "../config/0228_encoding.ts";
import {Gn as r6,sc as l4} from "../../vendor/m2455.ts";
import {Text} from "../../vendor/m2423.ts";
import {b as L,M as x} from "../../runtime.ts";
import {ze as rH} from "../../vendor/m2452.ts";
import {Te as ZH} from "../../vendor/m2253.ts";
// @ts-nocheck
// SendMessage 工具的提示文案生成、消息格式化与渲染。
// 负责生成 SendMessage 工具的系统提示、解析 plan_approval_response 类型的消息，
// 并渲染 agent 之间发送的消息内容（routing/request_id 类型跳过渲染）。

// 跨模块依赖（混淆名保持，编译期擦除）
declare const i_: (input: string) => any;
declare const t_: any;
declare const r6: any;
declare const l4: any;
declare const Text: any;
declare const L: (fn: () => void) => void;
declare const x: (mod: any, n: number) => any;
declare const rH: any;
declare const ZH: any;

/** 生成 SendMessage 工具的完整系统提示文本 */
function buildSendMessagePrompt(): string {
  return `
# SendMessage

Send a message to another agent.

\`\`\`json
{"to": "researcher", "summary": "assign task 1", "message": "start on task #1"}
\`\`\`

| \`to\` | |
|---|---|
| \`"researcher"\` | Teammate by name |
| \`"main"\` | The main conversation (background subagents only) |${""}

Your plain text output is NOT visible to other agents — to communicate, you MUST call this tool. Messages from teammates are delivered automatically; you don't check an inbox. Refer to active teammates by name; to resume a completed background agent, use the \`agentId\` (format \`a...-...\`) from its spawn result. When relaying, don't quote the original — it's already rendered to the user.${""}

## Protocol responses (legacy)

If you receive a JSON message with \`type: "shutdown_request"\` or \`type: "plan_approval_request"\`, respond with the matching \`_response\` type — echo the \`request_id\`, set \`approve\` true/false:

\`\`\`json
{"to": "team-lead", "message": {"type": "shutdown_response", "request_id": "...", "approve": true}}
{"to": "researcher", "message": {"type": "plan_approval_response", "request_id": "...", "approve": false, "feedback": "add error handling"}}
\`\`\`

Approving shutdown terminates your process. Rejecting plan sends the teammate back to revise. Don't originate \`shutdown_request\` unless asked. Don't send structured JSON status messages — use TaskUpdate.
`.trim()
}

/** SendMessage 工具的用户可见名称 */
var sendMessageUserFacingName = "Send a message to another agent";

/** 空的 noop 渲染函数（占位） */
var noopRender = () => {};

/**
 * 解析 plan_approval_response 类型消息，返回人类可读的审批摘要。
 * 若消息类型不匹配则返回 null。
 */
function parsePlanApprovalResponse(
  input: { message: any; to: string }
): string | null {
  if (typeof input.message !== "object" || input.message === null) return null;
  if (input.message.type === "plan_approval_response")
    return input.message.approve
      ? `approve plan from: ${input.to}`
      : `reject plan from: ${input.to}`;
  return null;
}

/**
 * 渲染 SendMessage 工具的输入内容。
 * routing 消息和 request_id 消息不渲染（返回 null）。
 */
function renderSendMessageToolUse(
  rawInput: string | object,
  _ctx: unknown,
  { verbose: isVerbose }: { verbose: boolean }
): any {
  let parsed = typeof rawInput === "string" ? i_(rawInput) : rawInput;
  if ("routing" in parsed && parsed.routing) return null;
  if ("request_id" in parsed && "target" in parsed) return null;
  return reactModule.default.createElement(
    r6,
    null,
    reactModule.default.createElement(Text, { dimColor: !0 }, parsed.message)
  );
}

/** React 模块引用（懒加载后赋值） */
var reactModule: any;

/** 懒加载初始化函数 */
var initSendMessageVerbose = L(() => {
  l4();
  rH();
  t_();
  reactModule = x(ZH(), 1);
});



export {buildSendMessagePrompt as m7a,sendMessageUserFacingName as p7a,noopRender as f7a,parsePlanApprovalResponse as A7a,renderSendMessageToolUse as h7a,reactModule as imo,initSendMessageVerbose as g7a};
