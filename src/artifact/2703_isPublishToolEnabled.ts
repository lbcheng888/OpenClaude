// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {je as oH,tk as Sy} from "../../vendor/m577.ts";
import {hH as tZ,Kx as k0} from "../../vendor/m128.ts";
import {r7e as jdH,xH as kh} from "../config/0580_xH.ts";
import {isClaudeAISubscriber as Lq,getSubscriptionType as YK,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {getAPIProvider as l8,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {ra as KK,Ap as ZO} from "../config/0614_Ap.ts";
import {_l as P4,st as q_} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {isPolicyAllowed as Y7,rd as i5} from "../../vendor/m2205.ts";
import {sn as A6} from "../config/0047_namespace.ts";
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
var artifactGatingExports = {};
j_(artifactGatingExports, {
  isPublishToolEnabled: () => isPublishToolEnabled,
  isArtifactToolEnabled: () => isArtifactToolEnabled,
  isArtifactSdkDefaultOff: () => isArtifactSdkDefaultOff,
  isArtifactHardDisabled: () => isArtifactHardDisabled,
  isArtifactAdminAllowed: () => isArtifactAdminAllowed,
});

/**
 * True when the artifact tool is explicitly turned off, either by the
 * `CLAUDE_CODE_DISABLE_ARTIFACT` environment variable or by the
 * `disableArtifact` user/project setting. This is a hard kill switch that
 * short-circuits all other gating.
 */
function isArtifactHardDisabled(): boolean {
  return oH.CLAUDE_CODE_DISABLE_ARTIFACT || tZ()?.settings.disableArtifact === !0;
}

/**
 * True when the artifact tool should default to off because the session is
 * running through a non-interactive / SDK entrypoint (programmatic SDK,
 * GitHub Action, or MCP) rather than the interactive CLI.
 */
function isArtifactSdkDefaultOff(): boolean {
  let entrypoint: string | undefined = oH.CLAUDE_CODE_ENTRYPOINT;
  return jdH() || entrypoint === "claude-code-github-action" || entrypoint === "mcp";
}

/**
 * Master gate for the artifact tool. Returns true only when every required
 * condition is satisfied:
 *  - not hard-disabled,
 *  - the backing capability `Lq()` is present,
 *  - the auth/account type is "firstParty",
 *  - the entrypoint is not a local agent or coworker variant,
 *  - the `KK()` block does not apply,
 *  - the `CLAUDE_CODE_ARTIFACT` env override is not a falsey/parse-failure,
 *  - and, absent an explicit truthy override, the session is not an
 *    SDK-default-off entrypoint,
 *  - the `tengu_cobalt_plinth` feature flag is enabled,
 *  - and admin/subscription rules allow it.
 */
function isArtifactToolEnabled(): boolean {
  if (isArtifactHardDisabled()) return !1;
  if (!Lq()) return !1;
  if (l8() !== "firstParty") return !1;
  let entrypoint: string | undefined = oH.CLAUDE_CODE_ENTRYPOINT;
  if (entrypoint === "local-agent" || entrypoint?.startsWith("claude-coworker")) return !1;
  if (KK()) return !1;
  if (P4(oH.CLAUDE_CODE_ARTIFACT)) return !1;
  let artifactOverride = q_(oH.CLAUDE_CODE_ARTIFACT);
  if (!artifactOverride && isArtifactSdkDefaultOff()) return !1;
  if (!Y_("tengu_cobalt_plinth", !1)) return !1;
  return isArtifactAdminAllowed();
}

/**
 * Subscription / admin policy check for the artifact tool. Disallows the
 * tool for "pro" and "max" consumer plans; for other plans it defers to the
 * `allow_cobalt_plinth` admin permission.
 */
function isArtifactAdminAllowed(): boolean {
  let plan: string = YK();
  if (plan === "pro" || plan === "max") return !1;
  return Y7("allow_cobalt_plinth");
}

/**
 * Public entry point: whether the publish (artifact) tool is enabled in the
 * current session. Currently an alias of `isArtifactToolEnabled`.
 */
function isPublishToolEnabled(): boolean {
  return isArtifactToolEnabled();
}

// Lazy module initializer: runs the dependency-module init thunks the first
// time this module is touched (the bundler's `L(...)` deferred-init wrapper).
// `LPH` is referenced by name from other bundle modules and the manifest, so
// its identifier is preserved.
var LPH = L(() => {
  o6();
  i5();
  Mq();
  kh();
  Sy();
  A6();
  V7();
  ZO();
  k0();
});

export {artifactGatingExports as awn,isArtifactHardDisabled,isArtifactSdkDefaultOff,isArtifactToolEnabled,isArtifactAdminAllowed,isPublishToolEnabled,LPH as gae};
