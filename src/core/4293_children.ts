// @ts-nocheck
import {nu,lr} from "../../vendor/m233.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * RemoteTrigger tool metadata and renderers.
 *
 * Defines the tool name, short description, and full prompt for the
 * `RemoteTrigger` tool, which manages scheduled remote Claude Code agents
 * (routines) through the claude.ai CCR API. Also provides helpers to render a
 * one-line invocation summary and an Ink result line.
 */

/** Tool name surfaced to the model/runtime. */
var M5e = "RemoteTrigger",
  /** Short, user-facing description of the tool. */
  mXa = "Manage scheduled remote Claude Code agents (routines) via the claude.ai CCR API. Auth is handled in-process — the token never reaches the shell.",
  /** Full prompt describing the supported actions and response shape. */
  fXa = `Call the claude.ai remote-trigger API. Use this instead of curl — the OAuth token is added automatically in-process and never exposed.

Actions:
- list: GET /v1/code/triggers
- get: GET /v1/code/triggers/{trigger_id}
- create: POST /v1/code/triggers (requires body)
- update: POST /v1/code/triggers/{trigger_id} (requires body, partial update)
- run: POST /v1/code/triggers/{trigger_id}/run (optional body)

The response is the raw JSON from the API. For create/update, a summary line is appended with the server-parsed run time and the routine's claude.ai URL — relay both to the user so they can confirm the time is right and know where the result will appear.`;

/**
 * Build a compact one-line summary of a tool invocation: the action followed
 * by the trigger id when present.
 *
 * @param invocation - The tool input, carrying `action` and optional `trigger_id`.
 * @returns A summary string such as `"run abc123"` or just `"list"`.
 */
function hXa(invocation: { action?: string; trigger_id?: string }): string {
  return `${invocation.action ?? ""}${invocation.trigger_id ? ` ${invocation.trigger_id}` : ""}`;
}

/**
 * Render the result header line for a RemoteTrigger response, showing the HTTP
 * status and the number of lines in the JSON body.
 *
 * @param result - Carries the raw `json` body and the HTTP `status`.
 * @returns An Ink element describing the response.
 */
function gXa(result: { json: string; status: number }) {
  let lineCount = nu(result.json, `
`) + 1;
  return $qt.jsx(Yn, {
    children: $qt.jsxs(v, {
      children: ["HTTP ", result.status, " ", $qt.jsxs(v, {
        dimColor: !0,
        children: ["(", lineCount, " lines)"]
      })]
    })
  });
}

/** Lazily-initialized React/JSX runtime namespace. */
var $qt;

/** Module initializer: wires up dependencies and resolves the JSX runtime. */
var _Xa = b(() => {
  Pl();
  je();
  lr();
  $qt = x(oe(), 1);
});

export {M5e,mXa,fXa,hXa,gXa,$qt,_Xa};
