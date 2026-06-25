// @ts-nocheck
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {Yx as su,lr as P8} from "../../vendor/m233.ts";
import {getGlobalConfig as C_,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getMainLoopModel as g9,Ro as iq} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Wq as wB,cxe as L0H} from "../api/3982_model.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Pi as HK,vu as E3} from "../mcp/2200_mcpServerName.ts";
import {He as vH,Pt as n_,xe as IH,mn as M6} from "../telemetry/0600_feature_name.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
/**
 * Semantic restoration for agent/5413_toolName.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Restored helper; preserves the original bundled control flow. */
function stringifyToolInputForExplainer(H): any {
  if (typeof H === "string") return H;
  try {
    return bH(H, null, 2);
  } catch {
    return String(H);
  }
}
/** Restored helper; preserves the original bundled control flow. */
function summarizeRecentAssistantText(H, _ = 1000): any {
  let q = H.filter(T => T.type === "assistant").slice(-3),
    K = [],
    O = 0;
  for (let T of q.reverse()) {
    let z = T.message.content.filter($ => $.type === "text").map($ => "text" in $ ? $.text : "").join(" ");
    if (z && O < _) {
      let $ = _ - O,
        Y = z.length > $ ? su(z, $) + "..." : z;
      K.unshift(Y), O += Y.length;
    }
  }
  return K.join(`

`);
}
/** Restored helper; preserves the original bundled control flow. */
function isPermissionExplainerEnabled(): any {
  return C_().permissionExplainerEnabled !== !1;
}
/** Uses the permission explainer model call to classify a tool request. */
async function generatePermissionExplanation({
  toolName: H,
  toolInput: _,
  toolDescription: q,
  messages: K,
  signal: O
}): any {
  if (!isPermissionExplainerEnabled()) return null;
  let T = Date.now();
  try {
    let z = stringifyToolInputForExplainer(_),
      $ = K.length ? summarizeRecentAssistantText(K) : "",
      Y = `Tool: ${H}
${q ? `Description: ${q}
` : ""}
Input:
${z}
${$ ? `
Recent conversation context:
${$}` : ""}

Explain this command in context.`,
      A = g9(),
      w = await wB({
        model: A,
        system: PERMISSION_EXPLAINER_SYSTEM_PROMPT,
        messages: [{
          role: "user",
          content: Y
        }],
        tools: [explainCommandToolSchema],
        tool_choice: {
          type: "tool",
          name: "explain_command"
        },
        signal: O,
        querySource: "permission_explainer"
      }),
      f = Date.now() - T;
    N(`Permission explainer: API returned in ${f}ms, stop_reason=${w.stop_reason}`);
    let j = w.content.find(J => J.type === "tool_use");
    if (j && j.type === "tool_use") {
      N(`Permission explainer: tool input: ${bH(j.input).slice(0, 500)}`);
      let J = getExplanationSchema().safeParse(j.input);
      if (J.success) {
        let D = {
          riskLevel: J.data.riskLevel,
          explanation: J.data.explanation,
          reasoning: J.data.reasoning,
          risk: J.data.risk
        };
        return c("tengu_permission_explainer_generated", {
          tool_name: HK(H),
          risk_level: RISK_LEVEL_TELEMETRY_VALUE[D.riskLevel],
          latency_ms: f
        }), vH("permission_explainer_generate"), N(`Permission explainer: ${D.riskLevel} risk for ${H} (${f}ms)`), D;
      }
    }
    return c("tengu_permission_explainer_error", {
      tool_name: HK(H),
      error_type: PARSE_ERROR_TYPE,
      latency_ms: f
    }), n_("permission_explainer_generate", "parse_failed"), N("Permission explainer: no parsed output in response"), null;
  } catch (z) {
    let $ = Date.now() - T;
    if (O.aborted) return N(`Permission explainer: request aborted for ${H}`), null;
    return N(`Permission explainer error: ${GH(z)}`, {
      level: "error"
    }), c("tengu_permission_explainer_error", {
      tool_name: HK(H),
      error_type: z instanceof Error && z.name === "AbortError" ? ABORT_ERROR_TYPE : API_ERROR_TYPE,
      latency_ms: $
    }), IH("permission_explainer_generate", "api_error"), null;
  }
}
var RISK_LEVEL_TELEMETRY_VALUE,
  PARSE_ERROR_TYPE = 1,
  ABORT_ERROR_TYPE = 2,
  API_ERROR_TYPE = 3,
  PERMISSION_EXPLAINER_SYSTEM_PROMPT = "Analyze shell commands and explain what they do, why you're running them, and potential risks.",
  explainCommandToolSchema,
  getExplanationSchema;
var tm4 = L(() => {
  a8();
  M6();
  y_();
  E3();
  T8();
  FH();
  L_();
  iq();
  L0H();
  H6();
  P8();
  RISK_LEVEL_TELEMETRY_VALUE = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3
  }, explainCommandToolSchema = {
    name: "explain_command",
    description: "Provide an explanation of a shell command",
    input_schema: {
      type: "object",
      properties: {
        explanation: {
          type: "string",
          description: "What this command does (1-2 sentences)"
        },
        reasoning: {
          type: "string",
          description: 'Why YOU are running this command. Start with "I" - e.g. "I need to check the file contents"'
        },
        risk: {
          type: "string",
          description: "What could go wrong, under 15 words"
        },
        riskLevel: {
          type: "string",
          enum: ["LOW", "MEDIUM", "HIGH"],
          description: "LOW (safe dev workflows), MEDIUM (recoverable changes), HIGH (dangerous/irreversible)"
        }
      },
      required: ["explanation", "reasoning", "risk", "riskLevel"]
    }
  }, getExplanationSchema = kH(() => k.object({
    riskLevel: k.enum(["LOW", "MEDIUM", "HIGH"]),
    explanation: k.string(),
    reasoning: k.string(),
    risk: k.string()
  }));
});
export {stringifyToolInputForExplainer as p9m,summarizeRecentAssistantText as m9m,isPermissionExplainerEnabled as WBo,generatePermissionExplanation as CZl,RISK_LEVEL_TELEMETRY_VALUE as s9m,PARSE_ERROR_TYPE as i9m,ABORT_ERROR_TYPE as a9m,API_ERROR_TYPE as l9m,PERMISSION_EXPLAINER_SYSTEM_PROMPT as c9m,explainCommandToolSchema as u9m,getExplanationSchema as d9m,tm4 as AZl};
