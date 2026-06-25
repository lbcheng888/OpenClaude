// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {GH,lk} from "../../vendor/m125.ts";
import {tje,rI} from "../config/0586_rI.ts";
import {isClaudeAISubscriber as Eo,getSubscriptionType as vi,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {Za,nt} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {dn} from "../config/0137_namespace.ts";
// Artifact / Publish tool gating.
//
// This module decides whether the "artifact" (a.k.a. "publish") tool is
// available in the current Claude Code session. The artifact tool publishes
// local HTML/Markdown to claude.ai web pages via the frame backend, gated
// behind the "tengu_cobalt_plinth" feature flag plus several environment,
// auth, and subscription constraints.
//
// `isPublishToolEnabled` is the public entry point; the other exports expose
// the individual gating predicates it composes.

// Local export-namespace object for this lazily-initialized bundle module.
var Jkn = {};
ft(Jkn, {
  isPublishToolEnabled: () => isPublishToolEnabled,
  isArtifactToolEnabled: () => isArtifactToolEnabled,
  isArtifactToolEligible: () => isArtifactToolEligible,
  isArtifactSdkDefaultOff: () => isArtifactSdkDefaultOff,
  isArtifactHardDisabled: () => isArtifactHardDisabled,
  isArtifactAdminAllowed: () => isArtifactAdminAllowed
});

/**
 * True when the artifact tool is explicitly turned off, either by the
 * `CLAUDE_CODE_DISABLE_ARTIFACT` environment variable or by the
 * `disableArtifact` user/project setting. This is a hard kill switch that
 * short-circuits all other gating.
 */
function isArtifactHardDisabled(): boolean {
  return Ne.CLAUDE_CODE_DISABLE_ARTIFACT || GH()?.settings.disableArtifact === !0;
}

/**
 * True when the artifact tool should default to off because the session is
 * running through a non-interactive / SDK entrypoint (programmatic SDK,
 * GitHub Action, or MCP) rather than the interactive CLI.
 */
function isArtifactSdkDefaultOff(): boolean {
  let entrypoint: string | undefined = Ne.CLAUDE_CODE_ENTRYPOINT;
  return tje() || entrypoint === "claude-code-github-action" || entrypoint === "mcp";
}

/**
 * Eligibility gate for the artifact tool: every environment / auth / override
 * precondition that must hold before the feature flag and admin checks are
 * even consulted. Returns true only when:
 *  - not hard-disabled,
 *  - the backing capability `Eo()` is present,
 *  - the auth/account type is "firstParty",
 *  - the entrypoint is not a local agent or coworker variant,
 *  - the `Vi()` block does not apply,
 *  - the `CLAUDE_CODE_ARTIFACT` env override is not a falsey/parse-failure,
 *  - and, absent an explicit truthy override, the session is not an
 *    SDK-default-off entrypoint.
 */
function isArtifactToolEligible(): boolean {
  if (isArtifactHardDisabled()) return !1;
  if (!Eo()) return !1;
  if (Rr() !== "firstParty") return !1;
  let entrypoint: string | undefined = Ne.CLAUDE_CODE_ENTRYPOINT;
  if (entrypoint === "local-agent" || entrypoint?.startsWith("claude-coworker")) return !1;
  if (Vi()) return !1;
  if (Za(Ne.CLAUDE_CODE_ARTIFACT)) return !1;
  if (!nt(Ne.CLAUDE_CODE_ARTIFACT) && isArtifactSdkDefaultOff()) return !1;
  return !0;
}

/**
 * Master gate for the artifact tool. Requires basic eligibility, then the
 * `tengu_cobalt_plinth` feature flag, then admin/subscription rules.
 */
function isArtifactToolEnabled(): boolean {
  if (!isArtifactToolEligible()) return !1;
  if (!it("tengu_cobalt_plinth", !1)) return !1;
  return isArtifactAdminAllowed();
}

/**
 * Subscription / admin policy check for the artifact tool. Only allows the
 * tool for "team" / "enterprise" plans (or an absent plan); for any other
 * concrete plan it is disallowed, and otherwise it defers to the
 * `allow_cobalt_plinth` admin permission.
 */
function isArtifactAdminAllowed(): boolean {
  let plan: string | null = vi();
  if (plan !== "team" && plan !== "enterprise" && plan != null) return !1;
  return Xs("allow_cobalt_plinth");
}

/**
 * Public entry point: whether the publish (artifact) tool is enabled in the
 * current session. Currently an alias of `isArtifactToolEnabled`.
 */
function isPublishToolEnabled(): boolean {
  return isArtifactToolEnabled();
}

// Lazy module initializer: runs the dependency-module init thunks the first
// time this module is touched (the bundler's `b(...)` deferred-init wrapper).
var fae = b(() => {
  jn();
  Bu();
  lo();
  rI();
  AR();
  dn();
  Ps();
  $d();
  lk();
});

export {Jkn,isArtifactHardDisabled,isArtifactSdkDefaultOff,isArtifactToolEligible,isArtifactToolEnabled,isArtifactAdminAllowed,isPublishToolEnabled,fae};
