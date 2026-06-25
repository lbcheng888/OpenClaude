// @ts-nocheck
import {getSettingsForSource as C6,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {Mo as aq} from "../mcp/2200_mcpServerName.ts";
import {E1t as Ph_,Cae as szH} from "../../vendor/m2788.ts";
import {Int as NtH,F2e as iSH} from "./2589_F2e.ts";
import {b as L} from "../../runtime.ts";
/**
 * Semantic restoration for agent/5600_yo4.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Restored helper; preserves the original bundled control flow. */
function hasCustomUiConfig(H): any {
  if (H === null) return !1;
  if (H.statusLine) return !0;
  if (H.fileSuggestion) return !0;
  if (H.subagentStatusLine) return !0;
  if (!H.hooks) return !1;
  for (let _ of Object.values(H.hooks)) if (_.length > 0) return !0;
  return !1;
}
/** Restored helper; preserves the original bundled control flow. */
function getCustomUiSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasCustomUiConfig(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasCustomUiConfig(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasAllowedClaudeToolRule(H): any {
  return H.some(_ => _.ruleBehavior === "allow" && (_.ruleValue.toolName === aq || _.ruleValue.toolName.startsWith(aq + "(")));
}
/** Restored helper; preserves the original bundled control flow. */
function getClaudeToolRuleSettingsFiles(): any {
  let H = [],
    _ = Ph_("projectSettings");
  if (hasAllowedClaudeToolRule(_)) H.push(".claude/settings.json");
  let q = Ph_("localSettings");
  if (hasAllowedClaudeToolRule(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasOtelHeadersHelper(H): any {
  return !!H?.otelHeadersHelper;
}
/** Restored helper; preserves the original bundled control flow. */
function getOtelHeadersHelperSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasOtelHeadersHelper(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasOtelHeadersHelper(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function getAutoMemoryDirectorySettingsFiles(): any {
  let H = [];
  if (C6("projectSettings")?.autoMemoryDirectory !== void 0) H.push(".claude/settings.json");
  if (C6("localSettings")?.autoMemoryDirectory !== void 0) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasApiKeyHelper(H): any {
  return !!H?.apiKeyHelper;
}
/** Restored helper; preserves the original bundled control flow. */
function getApiKeyHelperSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasApiKeyHelper(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasApiKeyHelper(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasAwsAuthHelper(H): any {
  return !!(H?.awsAuthRefresh || H?.awsCredentialExport);
}
/** Restored helper; preserves the original bundled control flow. */
function getAwsAuthHelperSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasAwsAuthHelper(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasAwsAuthHelper(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasGcpAuthRefresh(H): any {
  return !!H?.gcpAuthRefresh;
}
/** Restored helper; preserves the original bundled control flow. */
function getGcpAuthRefreshSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasGcpAuthRefresh(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasGcpAuthRefresh(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasProxyAuthHelper(H): any {
  return !!H?.proxyAuthHelper;
}
/** Restored helper; preserves the original bundled control flow. */
function getProxyAuthHelperSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasProxyAuthHelper(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasProxyAuthHelper(q)) H.push(".claude/settings.local.json");
  return H;
}
/** Restored helper; preserves the original bundled control flow. */
function hasNonSecretEnvKeys(H): any {
  if (!H?.env) return !1;
  return Object.keys(H.env).some(_ => !NtH.has(_.toUpperCase()));
}
/** Restored helper; preserves the original bundled control flow. */
function getNonSecretEnvSettingsFiles(): any {
  let H = [],
    _ = C6("projectSettings");
  if (hasNonSecretEnvKeys(_)) H.push(".claude/settings.json");
  let q = C6("localSettings");
  if (hasNonSecretEnvKeys(q)) H.push(".claude/settings.local.json");
  return H;
}
var yo4 = L(() => {
  N8();
  iSH();
  szH();
});
export {hasCustomUiConfig as Zpc,getCustomUiSettingsFiles as amc,hasAllowedClaudeToolRule as emc,getClaudeToolRuleSettingsFiles as lmc,hasOtelHeadersHelper as tmc,getOtelHeadersHelperSettingsFiles as cmc,getAutoMemoryDirectorySettingsFiles as umc,hasApiKeyHelper as nmc,getApiKeyHelperSettingsFiles as dmc,hasAwsAuthHelper as rmc,getAwsAuthHelperSettingsFiles as pmc,hasGcpAuthRefresh as omc,getGcpAuthRefreshSettingsFiles as mmc,hasProxyAuthHelper as smc,getProxyAuthHelperSettingsFiles as fmc,hasNonSecretEnvKeys as imc,getNonSecretEnvSettingsFiles as hmc,yo4 as gmc};
