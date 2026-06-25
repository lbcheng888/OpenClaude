// @ts-nocheck
import {ft as j_,b as L,x as u} from "../../runtime.ts";
import {isClaudeAISubscriber as Lq,getClaudeAIOAuthTokens as H7,getOauthAccountInfo as r1,lo as Mq} from "../config/2036_withOAuthRefreshLock.ts";
import {bAe as hDH,BNe as qiH} from "../../vendor/m1291.ts";
import {Zl as o4,Jg as rw} from "../../vendor/m2044.ts";
import {Login as bGH,runPostLoginHooks as CGH,$3t as KI_} from "../tui/4014_runPostLoginHooks.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG as qHH} from "./4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {Ie as EH,vn as S6} from "../session/0621_length.ts";
import {oe as WH} from "../../vendor/m2275.ts";
/* Restored Claude Code 2.1.177 module: /upgrade command..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
var vDq = {};
j_(vDq, {
  call: (): any => call
});
/* Slash-command entry point. */
async function call(H: any, _: any): Promise<any> {
  try {
    if (Lq()) {
      let T = H7(),
        z = !1;
      if (T?.subscriptionType && T?.rateLimitTier) z = T.subscriptionType === "max" && T.rateLimitTier === "default_claude_max_20x";else if (T?.accessToken) {
        let $ = await hDH(T.accessToken);
        z = $?.organization?.organization_type === "claude_max" && $?.organization?.rate_limit_tier === "default_claude_max_20x";
      }
      if (z) return setTimeout(H, 0, "You are already on the highest Max subscription plan. For additional usage, run /login to switch to an API usage-billed account."), null;
    }
    await o4("https://claude.ai/upgrade/max");
    let K = r1(),
      O = K && {
        accountUuid: K.accountUuid,
        organizationUuid: K.organizationUuid
      };
    return yDq.createElement(bGH, {
      startingMessage: "Starting new login following /upgrade. Exit with Ctrl-C to use existing account.",
      onDone: async (T: any): Promise<any> => {
        let {
          bridgeDisconnected: z
        } = await CGH(_, T, {
          previousAccount: O
        });
        H(T ? z ? `Login successful. ${qHH}` : "Login successful" : "Login interrupted");
      }
    });
  } catch (q) {
    EH(q), setTimeout(H, 0, "Failed to open browser. Please visit https://claude.ai/upgrade/max to upgrade.");
  }
  return null;
}
var yDq;
var UB_ = L((): any => {
  qiH();
  Mq();
  rw();
  S6();
  KI_();
  yDq = u(WH(), 1);
});
export {vDq as hxo,call as JGt,yDq as W1l,UB_ as XGt};
