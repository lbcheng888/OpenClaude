// @ts-nocheck
import {Q_n as r16,rBr as AP8} from "../config/2213_rBr.ts";
import {st as q_,_l as P4} from "../../vendor/m5.ts";
import {hH as tZ,Kx as k0} from "../../vendor/m128.ts";
import {isPolicyAllowed as Y7,rd as i5} from "../../vendor/m2205.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getSubscriptionType as YK,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "../config/0047_namespace.ts";
// Workflows feature gating for the agent subsystem.
//
// This module decides whether the "Workflows" capability is enabled for the
// current session and exposes the individual gates that combine into that
// decision: account entitlement, feature flag, environment overrides, user
// settings, and subscription tier. The results of the availability probe are
// memoized in `workflowsAvailabilityCache`.
//
// External helpers (resolved cross-module by the bundler):
//   r16   -> areWorkflowsDisabled():   env / settings "off" switch
//   hg9   -> hasWorkflowsEntitlement(): account-level capability check (Y7)
//   Y7    -> entitlement lookup by name
//   tZ    -> getConfig(): current config object exposing `.settings`
//   Y_    -> getFeatureGate(name, default): statsig feature flag
//   q_    -> isEnvFlagTruthy(env): true when env string is "true"/"1"
//   P4    -> isEnvFlagExplicitlyFalse(env): true when env string is "false"/"0"
//   YK    -> getSubscriptionTier(): "pro" | "enterprise" | null | ...
//   L     -> __esm lazy module initializer

/** Availability probe result: whether workflows can be used at all, and the
 *  default toggle state when the user has not explicitly chosen. */
interface WorkflowsAvailability {
  available: boolean;
  defaultOn: boolean;
}

// ---- external helpers (declared for typing only; defined in sibling modules) ----
declare function r16(): boolean;
declare function Y7(entitlement: string): boolean;
declare function tZ(): {
  settings: WorkflowSettings;
} | undefined;
declare function Y_(gate: string, defaultValue: boolean): boolean;
declare function q_(envValue: string | undefined): boolean;
declare function P4(envValue: string | undefined): boolean;
declare function YK(): string | null;
declare function L(init: () => void): () => void;

// Sibling module initializers invoked by this module's `__esm` body.
declare function o6(): void;
declare function i5(): void;
declare function Mq(): void;
declare function A6(): void;
declare function k0(): void;
declare function AP8(): void;

/** Subset of the user/project settings consumed here. */
interface WorkflowSettings {
  disableWorkflows?: boolean;
  enableWorkflows?: boolean;
  workflowKeywordTriggerEnabled?: boolean;
}

/**
 * Whether the Workflows feature is effectively ON for the current session.
 * Returns false if disabled (env/settings), if the account lacks the
 * entitlement, or if the availability probe reports it unavailable. Otherwise
 * honors the user's explicit setting, falling back to the probe's `defaultOn`.
 */
function TP(): boolean {
  if (r16()) return !1;
  if (!hg9()) return !1;
  let {
    available: isWorkflowsAvailable,
    defaultOn: workflowsDefaultOn
  } = fP8();
  if (!isWorkflowsAvailable) return !1;
  return SL5() ?? workflowsDefaultOn;
}
function wP8(): boolean {
  return fP8().defaultOn;
}
function Lg9(): boolean {
  return hg9() && !q_(process.env.CLAUDE_CODE_DISABLE_WORKFLOWS) && fP8().available;
}
function a16(): boolean {
  return tZ()?.settings.workflowKeywordTriggerEnabled ?? !0;
}
function hg9(): boolean {
  return Y7("allow_workflows");
}
function SL5(): boolean | undefined {
  return tZ()?.settings.enableWorkflows;
}
function fP8(): WorkflowsAvailability {
  if (o16 !== void 0) return o16;
  return o16 = CL5(), o16;
}
function CL5(): WorkflowsAvailability {
  if (q_(process.env.CLAUDE_CODE_WORKFLOWS)) {
    let gateEnabled = Y_("tengu_workflows_enabled", !0);
    return {
      available: gateEnabled,
      defaultOn: gateEnabled
    };
  }
  if (P4(process.env.CLAUDE_CODE_WORKFLOWS)) return {
    available: !1,
    defaultOn: !1
  };
  if (!Y_("tengu_workflows_enabled", !0)) return {
    available: !1,
    defaultOn: !1
  };
  return {
    available: !0,
    defaultOn: YK() !== "pro"
  };
}
/** Memo cache for `fP8()`/`CL5()`; `undefined` until first probe. */
var o16: WorkflowsAvailability | undefined;

/** Lazy `__esm` initializer wiring up sibling modules this code depends on. */
var Dn = L(() => {
  o6();
  i5();
  Mq();
  A6();
  k0();
  AP8();
});
export {TP as Ow,wP8 as oBr,Lg9 as eyn,a16 as tyn,hg9 as AAi,SL5 as LXu,fP8 as sBr,CL5 as MXu,o16 as Z_n,Dn as R4};
