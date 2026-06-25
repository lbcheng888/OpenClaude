// @ts-nocheck
import {qt,tn} from "../config/0230_encoding.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * SendMessage tool definition for inter-agent communication.
 *
 * Provides:
 *  - the tool prompt text (with optional legacy protocol-response section),
 *  - a short tool description,
 *  - a no-op handler placeholder,
 *  - a label helper for plan-approval responses,
 *  - a React renderer for inbound messages (hides routing/protocol envelopes).
 */

/**
 * Builds the SendMessage tool prompt.
 * @param includeLegacyProtocol When true, appends the legacy "Protocol responses" section
 *   describing shutdown_request / plan_approval_request handling.
 */
function NQa(includeLegacyProtocol: boolean): string {
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

Your plain text output is NOT visible to other agents — to communicate, you MUST call this tool. Messages from teammates are delivered automatically; you don't check an inbox. Refer to active teammates by name; to resume a completed background agent, use the \`agentId\` (format \`a...-...\`) from its spawn result. When relaying, don't quote the original — it's already rendered to the user.${""}${includeLegacyProtocol ? '\n\n## Protocol responses (legacy)\n\nIf you receive a JSON message with `type: "shutdown_request"` or `type: "plan_approval_request"`, respond with the matching `_response` type — echo the `request_id`, set `approve` true/false:\n\n```json\n{"to": "team-lead", "message": {"type": "shutdown_response", "request_id": "...", "approve": true}}\n{"to": "researcher", "message": {"type": "plan_approval_response", "request_id": "...", "approve": false, "feedback": "add error handling"}}\n```\n\nApproving shutdown terminates your process. Rejecting plan sends the teammate back to revise. Don\'t originate `shutdown_request` unless asked. Don\'t send structured JSON status messages — use TaskUpdate.' : ""}
`.trim();
}
/** Short human-readable description of the SendMessage tool. */
var MQa = "Send a message to another agent";
/** No-op handler placeholder for the SendMessage tool. */
var FQa = () => {};
/**
 * Derives a concise action label for plan-approval response messages.
 * @param input Tool input with `to` (recipient) and `message` (response payload).
 * @returns A label like "approve plan from: X" / "reject plan from: X", or null for unrelated messages.
 */
function BQa(input: { to: string; message: any }): string | null {
  if (typeof input.message !== "object" || input.message === null) return null;
  if (input.message.type === "plan_approval_response") return input.message.approve ? `approve plan from: ${input.to}` : `reject plan from: ${input.to}`;
  return null;
}
/**
 * Renders an inbound message for display, hiding internal routing/protocol envelopes.
 * @param payload Raw message payload, either a JSON string or an already-parsed object.
 * @param _unused Reserved/ignored parameter.
 * @param options Render options ({ verbose }).
 * @returns A React element for the message text, or null when the payload is a routing/protocol envelope.
 */
function UQa(payload: string | any, _unused: unknown, {
  verbose: verbose
}: { verbose?: boolean }): any {
  let parsed = typeof payload === "string" ? qt(payload) : payload;
  if ("routing" in parsed && parsed.routing) return null;
  if ("request_id" in parsed && "target" in parsed) return null;
  return oyo.jsx(Yn, {
    children: oyo.jsx(v, {
      dimColor: !0,
      children: parsed.message
    })
  });
}
/** Lazily-bound React/JSX runtime module reference (initialized in $Qa). */
var oyo: any;
/** Module init thunk: resolves dependencies and binds the JSX runtime. */
var $Qa = b(() => {
  Pl();
  je();
  tn();
  oyo = x(oe(), 1);
});

export {NQa,MQa,FQa,BQa,UQa,oyo,$Qa};
