// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {formatRelativeTime as g6H,Xo as H9} from "../../vendor/m240.ts";
import {getOauthConfig as F9,Sc as u1} from "../api/0465_getOauthConfig.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {jn as o6,getFeatureValue_CACHED_MAY_BE_STALE as Y_} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {kt as y_,logEvent as c} from "../../vendor/m132.ts";
import {lT as rf,Vs as _7} from "../../vendor/m2195.ts";
import {Bu as i5,isPolicyAllowed as Y7} from "../../vendor/m2213.ts";
import {$_o as nKq,U_o as lKq} from "../../vendor/m4291.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {lo as Mq,isClaudeAISubscriber as Lq} from "../config/2036_withOAuthRefreshLock.ts";
import {dn as A6} from "../config/0137_namespace.ts";
import {Ps as V7,isFirstPartyProvider as i1} from "../api/1287_usesFirstPartyModelIds.ts";
import {tn as H6,TeamDeleteToolName as bH} from "../config/0230_encoding.ts";
import {_Xa as JpK,M5e as WpH,mXa as ApK,fXa as wpK,hXa as fpK,gXa as jpK} from "../core/4293_children.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {Le as tH} from "../../vendor/m5.ts";
// Subsystem: tools — RemoteTrigger tool (manage scheduled cloud agent "routines").
//
// This module defines:
//   - triggerResponseSchema: schema for a single trigger/routine object returned by the API.
//   - buildScheduleSummary: turns a trigger object into a short human-readable schedule blurb.
//   - RemoteTriggerTool: the tool definition (list/get/create/update/run cloud triggers).
//
// NOTE: Identifiers that are NOT declared in this file (XpK, PpK, JpK, j_, L, kH, k, c9,
// F9, g6H, WpH, lKq, ApK, wpK, fpK, jpK, _7, tH, bH, c, BPO, UPO, and the isEnabled gates
// i1/Lq/q_/Y_/Y7) are cross-module references resolved elsewhere in the bundle. They are
// kept byte-identical so cross-module linkage and behavior are preserved exactly. Only
// function-internal locals/params have been renamed, and types/comments added.
//
// Cross-module symbol legend (inferred from usage, kept unchanged):
//   j_  — CommonJS-style __export helper (binds getters onto the module namespace object).
//   L   — lazy module-init wrapper (runs deps once on first access).
//   kH  — memoized lazy schema factory (returns a getter that builds the schema once).
//   k   — Zod-like schema builder library.
//   c9  — tool definition factory.
//   F9  — runtime config accessor (exposes CLAUDE_AI_ORIGIN, etc.).
//   g6H — relative-time formatter (e.g. "in 5 minutes" / "2 hours ago") given a `now`.
//   WpH — the RemoteTrigger tool's user-facing name constant.
//   lKq — value for the "anthropic-beta" request header.
//   ApK / wpK — async description / prompt text for the tool.
//   fpK / jpK — renderToolUseMessage / renderToolResultMessage renderers.
//   _7  — HTTP client (.get / .post returning { ok, status, data, reason }).
//   tH  — normalizes an action string for telemetry.
//   bH  — JSON serializer for tool result payloads.
//   c   — telemetry event logger.
//   i1 / Lq / q_ / Y_ / Y7 — feature / env / gate predicates used by isEnabled.

var XpK = {};
j_(XpK, {
  triggerResponseSchema: () => triggerResponseSchema,
  buildScheduleSummary: () => buildScheduleSummary,
  RemoteTriggerTool: () => RemoteTriggerTool
});

/** Shape of a trigger/routine object as parsed by `triggerResponseSchema`. */
interface TriggerResponse {
  id?: string;
  enabled?: boolean;
  next_run_at?: string;
  cron_expression?: string;
  run_once_at?: string;
}

/**
 * Build a short, human-readable multi-line summary describing when a trigger/routine
 * will next run (or that it is disabled / overdue), plus a management link.
 *
 * @param trigger - The parsed trigger object (enabled state, next run time, cron, etc.).
 * @param now - Reference time used for relative formatting (defaults to the current time).
 * @returns A newline-joined summary string, or `undefined` when there is nothing to report.
 */
function buildScheduleSummary(trigger: TriggerResponse, now: Date = new Date()): string | undefined {
  let isEnabled = trigger.enabled ?? !0,
    lines: string[] = [],
    nextRunAt = trigger.next_run_at ? new Date(trigger.next_run_at) : void 0;
  if (nextRunAt && !Number.isNaN(nextRunAt.getTime())) {
    let relativeWhen = g6H(nextRunAt, {
        now: now
      }),
      utcTimestamp = nextRunAt.toISOString().replace(/\.\d{3}Z$/, "Z"),
      runLabel = trigger.run_once_at ? "runs once" : trigger.cron_expression ? `next run (cron ${trigger.cron_expression})` : "next run";
    if (isEnabled) {
      if (lines.push(`→ Scheduled: ${runLabel} ${relativeWhen} (${utcTimestamp} UTC)`), trigger.run_once_at && nextRunAt.getTime() < now.getTime()) lines.push("⚠ next_run_at is in the past — confirm the date/timezone is intended.");
    } else lines.push(`→ Disabled (next run would be ${relativeWhen}, ${utcTimestamp} UTC)`);
  }
  if (trigger.id) lines.push(`→ View/manage: ${F9().CLAUDE_AI_ORIGIN}/code/routines/${trigger.id}`);
  return lines.length ? lines.join(`
`) : void 0;
}
var BPO, UPO, triggerResponseSchema, RemoteTriggerTool;
var PpK = L(() => {
  a8();
  u1();
  o6();
  y_();
  rf();
  i5();
  nKq();
  M7();
  Mq();
  A6();
  H9();
  V7();
  H6();
  JpK();
  // Lazy input schema: the RemoteTrigger tool's argument validator.
  BPO = kH(() => k.strictObject({
    action: k.enum(["list", "get", "create", "update", "run"]),
    trigger_id: k.string().regex(/^[\w-]+$/).optional().describe("Required for get, update, and run"),
    body: k.record(k.string(), k.unknown()).optional().describe("Required for create and update; optional for run")
  })), UPO = kH(() => k.object({
    status: k.number(),
    json: k.string(),
    summary: k.string().optional()
  })), triggerResponseSchema = kH(() => {
    // Empty strings for cron_expression / run_once_at are coerced to undefined.
    let emptyToUndefined = k.string().transform((value: string) => value || void 0);
    return k.object({
      id: k.coerce.string(),
      enabled: k.boolean(),
      next_run_at: k.string(),
      cron_expression: emptyToUndefined,
      run_once_at: emptyToUndefined
    }).partial();
  });
  RemoteTriggerTool = c9({
    name: WpH,
    searchHint: "manage scheduled cloud agent routines",
    maxResultSizeChars: 1e5,
    shouldDefer: !0,
    get inputSchema() {
      return BPO();
    },
    get outputSchema() {
      return UPO();
    },
    isEnabled() {
      return i1() && Lq() && !q_(process.env.CLAUDE_CODE_REMOTE) && Y_("tengu_surreal_dali", !1) && Y7("allow_remote_sessions");
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly(input: {
      action: string;
    }) {
      return input.action === "list" || input.action === "get";
    },
    toAutoClassifierInput(input: {
      action: string;
      trigger_id?: string;
    }) {
      return `RemoteTrigger ${input.action}${input.trigger_id ? ` ${input.trigger_id}` : ""}`;
    },
    async description() {
      return ApK;
    },
    async prompt() {
      return wpK;
    },
    async call(input: {
      action: string;
      trigger_id?: string;
      body?: Record<string, unknown>;
    }, context: {
      abortController: AbortController;
    }) {
      let {
          action: action,
          trigger_id: triggerId,
          body: body
        } = input,
        requestPath: string,
        httpMethod: "get" | "post",
        requestBody: Record<string, unknown> | undefined;
      switch (action) {
        case "list":
          httpMethod = "get", requestPath = "/v1/code/triggers";
          break;
        case "get":
          if (!triggerId) throw Error("get requires trigger_id");
          httpMethod = "get", requestPath = `/v1/code/triggers/${triggerId}`;
          break;
        case "create":
          if (!body) throw Error("create requires body");
          httpMethod = "post", requestPath = "/v1/code/triggers", requestBody = body;
          break;
        case "update":
          if (!triggerId) throw Error("update requires trigger_id");
          if (!body) throw Error("update requires body");
          httpMethod = "post", requestPath = `/v1/code/triggers/${triggerId}`, requestBody = body;
          break;
        case "run":
          {
            if (!triggerId) throw Error("run requires trigger_id");
            httpMethod = "post", requestPath = `/v1/code/triggers/${triggerId}/run`;
            let {
              trigger_id: _ignoredTriggerId,
              ...runBody
            } = body ?? {};
            requestBody = runBody;
            break;
          }
      }
      let requestOptions = {
          auth: "teleport-org",
          headers: {
            "anthropic-beta": lKq
          },
          timeout: 20000,
          signal: context.abortController.signal,
          validateStatus: () => !0
        },
        response = httpMethod! === "get" ? await _7.get(requestPath!, requestOptions) : await _7.post(requestPath!, requestBody, requestOptions);
      if (!response.ok) throw Error(response.reason === "no-auth" ? "Not authenticated with a claude.ai account. Run /login and try again." : `Remote triggers unavailable: ${response.reason}`);
      let scheduleSummary: string | undefined;
      if (action === "create" || action === "update") {
        let succeeded = response.status >= 200 && response.status < 300;
        if (c("tengu_remote_trigger", {
          action: tH(action),
          has_run_once_at: typeof body?.run_once_at === "string" && body.run_once_at !== "",
          has_cron: typeof body?.cron_expression === "string" && body.cron_expression !== "",
          success: succeeded
        }), succeeded) {
          let parsed = triggerResponseSchema().safeParse(response.data);
          scheduleSummary = parsed.success ? buildScheduleSummary(parsed.data) : void 0;
        }
      }
      return {
        data: {
          status: response.status,
          json: bH(response.data),
          summary: scheduleSummary
        }
      };
    },
    mapToolResultToToolResultBlockParam(result: {
      status: number;
      json: string;
      summary?: string;
    }, toolUseId: string) {
      let content = result.summary ? `HTTP ${result.status}
${result.json}

${result.summary}` : `HTTP ${result.status}
${result.json}`;
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: content
      };
    },
    renderToolUseMessage: fpK,
    renderToolResultMessage: jpK
  });
});
export {XpK as SXa,buildScheduleSummary,BPO as M$p,UPO as N$p,triggerResponseSchema,RemoteTriggerTool,PpK as bXa};
