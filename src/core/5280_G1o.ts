// @ts-nocheck
import {getAPIProvider as l8,THIRD_PARTY_PROVIDER_LABELS as ys,Ps as V7} from "../api/1287_usesFirstPartyModelIds.ts";
import {isPolicyAllowed as Y7,getResponseFromCache as qMH,Bu as i5} from "../../vendor/m2213.ts";
import {b as L} from "../../runtime.ts";
/**
 * Returns a human-readable reason why cloud (remote) sessions are unavailable,
 * or null if cloud sessions are available for the current auth configuration.
 *
 * Checks two conditions in order:
 * 1. Auth provider must be "firstParty" (Anthropic API); third-party providers
 *    (Bedrock, Vertex, etc.) cannot access Anthropic-operated remote infrastructure.
 * 2. The org-level policy flag "allow_remote_sessions" must be enabled; if the
 *    policy cannot be read (qMH() returns null), a network-error message is returned
 *    instead of the policy-disabled message.
 */
function getCloudSessionUnavailableReason(): string | null {
  let authProvider = l8();
  if (authProvider !== "firstParty") return `Cloud sessions aren't available with ${ys[authProvider]}. They run on Anthropic's infrastructure and require an Anthropic account.`;
  if (!Y7("allow_remote_sessions")) return qMH() === null ? "Couldn't verify your organization's policy for cloud sessions. Check your network connection and try again." : "Cloud sessions are disabled by your organization's policy.";
  return null;
}
var JWq = L(() => {
  i5();
  V7();
});
export {getCloudSessionUnavailableReason as JKt,JWq as G1o};
