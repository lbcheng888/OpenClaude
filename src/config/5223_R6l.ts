// @ts-nocheck
import {getSubscriptionType,getRateLimitTier,lo as Ao} from "./2036_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
/** Wraps a background-task event message so the model does not confuse it with user input. */
function MBl(eventBody: string): string {
  return `[SYSTEM NOTIFICATION - NOT USER INPUT]
This is an automated background-task event, NOT a message from the user.
Do NOT interpret this as user acknowledgement, confirmation, or response to any pending question.

${eventBody}`;
}
/** Returns the parallel sub-agent count for Plan-v2 based on subscription/rate-limit tier. */
function NBl(): number {
  if (process.env.CLAUDE_CODE_PLAN_V2_AGENT_COUNT) {
    let envCount = parseInt(process.env.CLAUDE_CODE_PLAN_V2_AGENT_COUNT, 10);
    if (!isNaN(envCount) && envCount > 0 && envCount <= 10) return envCount;
  }
  let subscriptionType = getSubscriptionType(),
    rateLimitTier = getRateLimitTier();
  if (subscriptionType === "max" && rateLimitTier === "default_claude_max_20x") return 3;
  if (subscriptionType === "enterprise" || subscriptionType === "team") return 3;
  return 1;
}
/** Returns the explore-agent count for Plan-v2, defaulting to 3. */
function BBl(): number {
  if (process.env.CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT) {
    let envExploreCount = parseInt(process.env.CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT, 10);
    if (!isNaN(envExploreCount) && envExploreCount > 0 && envExploreCount <= 10) return envExploreCount;
  }
  return 3;
}
/** Module initializer — runs Ao() to set up OAuth/subscription state. */
var FBl = b(() => {
  Ao();
});
export {MBl as E6l,NBl as C6l,BBl as A6l,FBl as R6l};
