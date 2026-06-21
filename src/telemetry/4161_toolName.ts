// @ts-nocheck
import {ns as aq} from "../mcp/2194_mcpServerName.ts";
import {Js as K7} from "../config/2697_oA.ts";
import {isDangerousBashPermission as oC_,isDangerousPowerShellPermission as sC_,A9n as gE6} from "../../vendor/m4159.ts";
import {bA as d$,Sw as $W} from "../mcp/0728_serverName.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/**
 * Telemetry helpers for shell allow-rule categorisation.
 *
 * Emits `tengu_shell_allow_rules_at_init` once on startup (summary counts)
 * and `tengu_shell_allow_rule_added` for each incremental rule addition,
 * both broken down by tool name (Bash / PowerShell) and rule category
 * (bare / dangerous_prefix / scoped).
 */

// ---------------------------------------------------------------------------
// Cross-module imports (minified names kept AS-IS to preserve linkage)
// ---------------------------------------------------------------------------

// aq  = "Bash"         (mcp/1630_mcpServerName.ts)
// K7  = "PowerShell"   (config/2689_O$.ts)
// oC_ = isDangerousBashPermission       (permissions/4427_verifyAutoModeGateAccess.ts)
// sC_ = isDangerousPowerShellPermission (permissions/4427_verifyAutoModeGateAccess.ts)
// d$  = parseToolPermissionEntry → { toolName, ruleContent }  (mcp/0724_serverName.ts)
// c   = logEvent  (analytics sink)
// tH  = toSafeString / serialise tag value  (computer-use/0006_getPrototypeOf.ts)
// L   = lazy module initialiser
// y_  = module dependency init  (cross-module)
// gE6 = module dependency init  (cross-module)
// $W  = module dependency init for mcp/0724_serverName.ts

/** @internal Known shell tool names: "Bash" or "PowerShell". */
type ShellToolName = typeof aq | typeof K7;

/**
 * Normalise a raw tool name to its canonical shell tool name constant,
 * or return `null` if it is not a shell tool.
 */
function normalizeShellToolName(toolName: string): ShellToolName | null {
  if (toolName === aq) return aq;
  if (toolName === K7) return K7;
  return null;
}

/**
 * Classify a shell allow-rule into one of three categories:
 * - `"bare"` — no meaningful rule content (wildcard / whitespace / undefined)
 * - `"dangerous_prefix"` — matches a known-dangerous command prefix
 * - `"scoped"` — a normal, acceptably-scoped rule
 *
 * Returns `null` when `toolName` is not a recognised shell tool.
 */
function classifyShellAllowRule(
  toolName: string,
  ruleContent: string | undefined,
): "bare" | "dangerous_prefix" | "scoped" | null {
  let shellName = normalizeShellToolName(toolName);
  if (shellName === null) return null;
  if (ruleContent === void 0 || ruleContent === "" || /^[\s*]+$/.test(ruleContent)) return "bare";
  return (shellName === aq ? oC_(shellName, ruleContent) : sC_(shellName, ruleContent)) ? "dangerous_prefix" : "scoped";
}

/**
 * Build a flat telemetry payload that counts all shell allow-rules present
 * in the given permission settings object, keyed as
 * `"<source>_<toolName>_<category>"` (e.g. `"userSettings_Bash_scoped"`).
 * Also adds a `total_shell_allow_rules` summary count.
 */
function buildShellAllowRuleCounts(
  permissionsSettings: Record<string, Array<unknown> | undefined>,
): Record<string, number> {
  let counts: Record<string, number> = {},
    total = 0;
  for (let source of settingsSourceKeys)
    for (let entry of permissionsSettings[source] ?? []) {
      let {
          toolName: toolName,
          ruleContent: ruleContent,
        } = d$(entry as string),
        shellName = normalizeShellToolName(toolName);
      if (shellName === null) continue;
      let category = classifyShellAllowRule(shellName, ruleContent);
      if (category === null) continue;
      let key = `${source}_${shellName}_${category}`;
      counts[key] = (counts[key] ?? 0) + 1, total++;
    }
  return counts.total_shell_allow_rules = total, counts;
}

/**
 * Fire `tengu_shell_allow_rules_at_init` with a summary of all shell
 * allow-rules currently stored across all settings sources.
 */
function logShellAllowRulesAtInit(permissionsSettings: Record<string, Array<unknown> | undefined>): void {
  c("tengu_shell_allow_rules_at_init", buildShellAllowRuleCounts(permissionsSettings));
}

/**
 * Scan a list of permission-mutation operations and emit
 * `tengu_shell_allow_rule_added` for every Bash / PowerShell allow-rule
 * that is being added.
 */
function logShellAllowRuleAdded(
  operations: Array<{
    type: string;
    behavior: string;
    rules: Array<{ toolName: string; ruleContent?: string }>;
    destination: string;
  }>,
): void {
  for (let op of operations) {
    if (op.type !== "addRules" || op.behavior !== "allow") continue;
    for (let rule of op.rules) {
      let shellName = normalizeShellToolName(rule.toolName);
      if (shellName === null) continue;
      let category = classifyShellAllowRule(rule.toolName, rule.ruleContent);
      if (category === null) continue;
      c("tengu_shell_allow_rule_added", {
        toolName: tH(shellName),
        category: tH(category),
        destination: tH(op.destination),
      });
    }
  }
}

/** All settings sources whose allow-rules are tallied at init time. */
var settingsSourceKeys: string[];

/** Lazy module initialiser. */
var cE6 = L(() => {
  y_();
  gE6();
  $W();
  settingsSourceKeys = ["userSettings", "projectSettings", "localSettings", "flagSettings", "cliArg", "session"];
});

export {normalizeShellToolName as Yuo,classifyShellAllowRule as Pqa,buildShellAllowRuleCounts as hIp,logShellAllowRulesAtInit as Oqa,logShellAllowRuleAdded as h9n,settingsSourceKeys as AIp,cE6 as g9n};
