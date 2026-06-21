// @ts-nocheck
import {xA as DA,jH as BH} from "../../vendor/m2566.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {zR as VR,lg as og} from "../../vendor/m2269.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {tCo as Jbo,Lyl as h_l,Wmt as Tmt,Jje as Hje} from "../../vendor/m4795.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Wu as Ku,lS as tS} from "../../vendor/m2571.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {m8 as Yj,sl as rl} from "../../vendor/m715.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function GuestPassesDialog({
  onDone: onDone
}) {
  let [isLoading, setIsLoading] = V1H.useState(true),
    [passes, setPasses] = V1H.useState([]),
    [isEligible, setIsEligible] = V1H.useState(false),
    [referralLink, setReferralLink] = V1H.useState(null),
    [referrerReward, setReferrerReward] = V1H.useState(undefined),
    escapeHook = DA(() => onDone("Guest passes dialog dismissed", {
      display: "system"
    })),
    handleDismiss = V1H.useCallback(() => {
      onDone("Guest passes dialog dismissed", {
        display: "system"
      });
    }, [onDone]);
  Ir("confirm:no", handleDismiss, {
    context: "Confirmation"
  });
  function handleKeyDown(event) {
    if (event.ctrl || event.meta) return;
    if (event.key === "return" && referralLink) event.preventDefault(), VR(referralLink).then(osc52Seq => {
      if (osc52Seq) process.stdout.write(osc52Seq);
      j("tengu_guest_passes_link_copied", {}), onDone("Referral link copied to clipboard!");
    });
  }
  if (V1H.useEffect(() => {
    async function loadGuestPassData() {
      try {
        let eligibilityResult = await Jbo();
        if (!eligibilityResult || !eligibilityResult.eligible) {
          setIsEligible(false), setIsLoading(false);
          return;
        }
        if (setIsEligible(true), eligibilityResult.referral_code_details?.referral_link) setReferralLink(eligibilityResult.referral_code_details.referral_link);
        setReferrerReward(eligibilityResult.referrer_reward);
        let campaign = eligibilityResult.referral_code_details?.campaign ?? "claude_code_guest_pass",
          redemptionsResult;
        try {
          redemptionsResult = await h_l(campaign);
        } catch (err) {
          v(`Failed to fetch referral redemptions: ${err}`, {
            level: "error"
          }), setIsEligible(false), setIsLoading(false);
          return;
        }
        let redemptionsList = redemptionsResult.redemptions || [],
          passLimit = redemptionsResult.limit || 3,
          passItems = [];
        for (let i = 0; i < passLimit; i++) {
          let redemption = redemptionsList[i];
          passItems.push({
            passNumber: i + 1,
            isAvailable: !redemption
          });
        }
        setPasses(passItems), setIsLoading(false);
      } catch (eligibilityResult) {
        Ie(eligibilityResult), setIsEligible(false), setIsLoading(false);
      }
    }
    loadGuestPassData();
  }, []), isLoading) return React.createElement(Ku, null, React.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown
  }, React.createElement(w, {
    dimColor: true
  }, "Loading guest pass information\u2026"), React.createElement(w, {
    dimColor: true,
    italic: true
  }, escapeHook.pending ? React.createElement(React.Fragment, null, "Press ", escapeHook.keyName, " again to exit") : React.createElement(lt, {
    chord: "escape",
    action: "cancel"
  }))));
  if (!isEligible) return React.createElement(Ku, null, React.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown
  }, React.createElement(w, null, "Guest passes are not currently available."), React.createElement(w, {
    dimColor: true,
    italic: true
  }, escapeHook.pending ? React.createElement(React.Fragment, null, "Press ", escapeHook.keyName, " again to exit") : React.createElement(lt, {
    chord: "escape",
    action: "cancel"
  }))));
  let availableCount = Gn(passes, pass => pass.isAvailable),
    sortedPasses = [...passes].sort((a, b) => +b.isAvailable - +a.isAvailable);
  return React.createElement(Ku, null, React.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown
  }, React.createElement(w, {
    color: "permission"
  }, "Guest passes \xB7 ", availableCount, " left"), React.createElement(B, {
    flexDirection: "row",
    marginLeft: 2
  }, sortedPasses.slice(0, 3).map(pass => React.createElement(PassCard, {
    key: pass.passNumber,
    pass: pass
  }))), referralLink && React.createElement(B, {
    marginLeft: 2
  }, React.createElement(w, null, referralLink)), React.createElement(B, {
    flexDirection: "column",
    marginLeft: 2
  }, React.createElement(w, {
    dimColor: true
  }, referrerReward ? `Share a free week of Claude Code with friends. If they love it and subscribe, you'll get ${Tmt(referrerReward)} in usage credits to keep building. ` : "Share a free week of Claude Code with friends. ", React.createElement(Fs, {
    url: referrerReward ? "https://support.claude.com/en/articles/13456702-claude-code-guest-passes" : "https://support.claude.com/en/articles/12875061-claude-code-guest-passes"
  }, "Terms apply."))), React.createElement(B, null, React.createElement(w, {
    dimColor: true,
    italic: true
  }, escapeHook.pending ? React.createElement(React.Fragment, null, "Press ", escapeHook.keyName, " again to exit") : React.createElement(hn, null, React.createElement(lt, {
    chord: "enter",
    action: "copy link"
  }), React.createElement(lt, {
    chord: "escape",
    action: "cancel"
  }))))));
}
function PassCard(H) {
  let memoCache = Pf4.c(3),
    {
      pass: pass
    } = H;
  if (!pass.isAvailable) {
    let usedCard;
    if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) usedCard = React.createElement(B, {
      flexDirection: "column",
      marginRight: 1
    }, React.createElement(w, {
      dimColor: true
    }, "\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2571"), React.createElement(w, {
      dimColor: true
    }, ` ) CC ${Yj} \u250A\u2571`), React.createElement(w, {
      dimColor: true
    }, "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2571")), memoCache[0] = usedCard;else usedCard = memoCache[0];
    return usedCard;
  }
  let topBorder;
  if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) topBorder = React.createElement(w, null, "\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510"), memoCache[1] = topBorder;else topBorder = memoCache[1];
  let availableCard;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) availableCard = React.createElement(B, {
    flexDirection: "column",
    marginRight: 1
  }, topBorder, React.createElement(w, null, " ) CC ", React.createElement(w, {
    color: "claude"
  }, Yj), " \u250A ( "), React.createElement(w, null, "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518")), memoCache[2] = availableCard;else availableCard = memoCache[2];
  return availableCard;
}
var Pf4, React, V1H;
var Zf4 = b(() => {
  rl();
  BH();
  og();
  Je();
  _s();
  Ct();
  Hje();
  je();
  wn();
  qs();
  ts();
  tS();
  Pf4 = L(nt(), 1), React = L(Te(), 1), V1H = L(Te(), 1);
});

export {GuestPassesDialog as _vl,PassCard as Him,Pf4 as gvl,React as ga,V1H as Due,Zf4 as yvl};
