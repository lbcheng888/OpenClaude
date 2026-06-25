// @ts-nocheck
import {Df,TI} from "../../vendor/m2577.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {THo,Lwl,ngt,kWe} from "../../vendor/m4827.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {ku,rS} from "../../vendor/m2582.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {H5,Pa} from "../../vendor/m720.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Guest passes dialog component.
 *
 * Fetches the user's guest-pass eligibility and referral redemption state,
 * renders a row of "pass cards" (available vs. redeemed), shows the referral
 * link, and lets the user copy that link to the clipboard with Enter or
 * dismiss the dialog with Escape.
 *
 * NOTE: this module is structurally unrelated to the v2.1.185 `4497_onDone.ts`
 * (Claude Desktop transfer dialog); names here are restored from the v190
 * structure directly rather than ported.
 */

/** Props for the guest passes dialog. */
interface GuestPassesDialogProps {
  /** Called when the dialog finishes/dismisses, with a status message + options. */
  onDone: (message: string, options?: { display?: string }) => void;
}

/** A single guest-pass slot (one card in the row). */
interface GuestPass {
  /** 1-based position of this pass. */
  passNumber: number;
  /** Whether the pass is still available (not yet redeemed). */
  isAvailable: boolean;
}

function IDl({
  onDone: onDone
}: GuestPassesDialogProps) {
  let [isLoading, setIsLoading] = Oue.useState(!0),
    [passes, setPasses] = Oue.useState([] as GuestPass[]),
    [isEligible, setIsEligible] = Oue.useState(!1),
    [referralLink, setReferralLink] = Oue.useState(null as string | null),
    [referrerReward, setReferrerReward] = Oue.useState(void 0 as unknown),
    exitHint = Df(() => onDone("Guest passes dialog dismissed", {
      display: "system"
    })),
    handleCancel = Oue.useCallback(() => {
      onDone("Guest passes dialog dismissed", {
        display: "system"
      });
    }, [onDone]);
  Or("confirm:no", handleCancel, {
    context: "Confirmation"
  });
  function handleKeyDown(keyEvent: any) {
    if (keyEvent.ctrl || keyEvent.meta) return;
    if (keyEvent.key === "return" && referralLink) keyEvent.preventDefault(), sw(referralLink).then((osc52: string | undefined) => {
      if (osc52) process.stdout.write(osc52);
      W("tengu_guest_passes_link_copied", {}), onDone("Referral link copied to clipboard!");
    });
  }
  if (Oue.useEffect(() => {
    async function loadGuestPasses() {
      try {
        let eligibility = await THo();
        if (!eligibility || !eligibility.eligible) {
          setIsEligible(!1), setIsLoading(!1);
          return;
        }
        if (setIsEligible(!0), eligibility.referral_code_details?.referral_link) setReferralLink(eligibility.referral_code_details.referral_link);
        setReferrerReward(eligibility.referrer_reward);
        let campaign = eligibility.referral_code_details?.campaign ?? "claude_code_guest_pass",
          redemptionsResult;
        try {
          redemptionsResult = await Lwl(campaign);
        } catch (fetchError) {
          A(`Failed to fetch referral redemptions: ${fetchError}`, {
            level: "error"
          }), setIsEligible(!1), setIsLoading(!1);
          return;
        }
        let redemptions = redemptionsResult.redemptions || [],
          limit = redemptionsResult.limit || 3,
          nextPasses: GuestPass[] = [];
        for (let slotIndex = 0; slotIndex < limit; slotIndex++) {
          let redemption = redemptions[slotIndex];
          nextPasses.push({
            passNumber: slotIndex + 1,
            isAvailable: !redemption
          });
        }
        setPasses(nextPasses), setIsLoading(!1);
      } catch (error) {
        Ie(error), setIsEligible(!1), setIsLoading(!1);
      }
    }
    loadGuestPasses();
  }, []), isLoading) return rm.jsx(ku, {
    children: rm.jsxs($, {
      flexDirection: "column",
      gap: 1,
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: handleKeyDown,
      children: [rm.jsx(v, {
        dimColor: !0,
        children: "Loading guest pass information…"
      }), rm.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: exitHint.pending ? rm.jsxs(rm.Fragment, {
          children: ["Press ", exitHint.keyName, " again to exit"]
        }) : rm.jsx(at, {
          chord: "escape",
          action: "cancel"
        })
      })]
    })
  });
  if (!isEligible) return rm.jsx(ku, {
    children: rm.jsxs($, {
      flexDirection: "column",
      gap: 1,
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: handleKeyDown,
      children: [rm.jsx(v, {
        children: "Guest passes are not currently available."
      }), rm.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: exitHint.pending ? rm.jsxs(rm.Fragment, {
          children: ["Press ", exitHint.keyName, " again to exit"]
        }) : rm.jsx(at, {
          chord: "escape",
          action: "cancel"
        })
      })]
    })
  });
  let availableCount = zn(passes, (pass: GuestPass) => pass.isAvailable),
    sortedPasses = [...passes].sort((a: GuestPass, b: GuestPass) => +b.isAvailable - +a.isAvailable);
  return rm.jsx(ku, {
    children: rm.jsxs($, {
      flexDirection: "column",
      gap: 1,
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: handleKeyDown,
      children: [rm.jsxs(v, {
        color: "permission",
        children: ["Guest passes \xB7 ", availableCount, " left"]
      }), rm.jsx($, {
        flexDirection: "row",
        marginLeft: 2,
        children: sortedPasses.slice(0, 3).map((pass: GuestPass) => rm.jsx(qhm, {
          pass: pass
        }, pass.passNumber))
      }), referralLink && rm.jsx($, {
        marginLeft: 2,
        children: rm.jsx(v, {
          children: referralLink
        })
      }), rm.jsx($, {
        flexDirection: "column",
        marginLeft: 2,
        children: rm.jsxs(v, {
          dimColor: !0,
          children: [referrerReward ? `Share a free week of Claude Code with friends. If they love it and subscribe, you'll get ${ngt(referrerReward)} in usage credits to keep building. ` : "Share a free week of Claude Code with friends. ", rm.jsx(Ss, {
            url: referrerReward ? "https://support.claude.com/en/articles/13456702-claude-code-guest-passes" : "https://support.claude.com/en/articles/12875061-claude-code-guest-passes",
            children: "Terms apply."
          })]
        })
      }), rm.jsx($, {
        children: rm.jsx(v, {
          dimColor: !0,
          italic: !0,
          children: exitHint.pending ? rm.jsxs(rm.Fragment, {
            children: ["Press ", exitHint.keyName, " again to exit"]
          }) : rm.jsxs(bn, {
            children: [rm.jsx(at, {
              chord: "enter",
              action: "copy link"
            }), rm.jsx(at, {
              chord: "escape",
              action: "cancel"
            })]
          })
        })
      })]
    })
  });
}
/** Renders one guest-pass card (memoized): redeemed style vs. available style. */
function qhm(props: { pass: GuestPass }) {
  let cache = HDl.c(3),
    {
      pass: pass
    } = props;
  if (!pass.isAvailable) {
    let redeemedCard;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) redeemedCard = rm.jsxs($, {
      flexDirection: "column",
      marginRight: 1,
      children: [rm.jsx(v, {
        dimColor: !0,
        children: "┌─────────╱"
      }), rm.jsx(v, {
        dimColor: !0,
        children: ` ) CC ${H5} ┊╱`
      }), rm.jsx(v, {
        dimColor: !0,
        children: "└───────╱"
      })]
    }), cache[0] = redeemedCard;else redeemedCard = cache[0];
    return redeemedCard;
  }
  let topBorder;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) topBorder = rm.jsx(v, {
    children: "┌──────────┐"
  }), cache[1] = topBorder;else topBorder = cache[1];
  let availableCard;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) availableCard = rm.jsxs($, {
    flexDirection: "column",
    marginRight: 1,
    children: [topBorder, rm.jsxs(v, {
      children: [" ) CC ", rm.jsx(v, {
        color: "claude",
        children: H5
      }), " ┊ ( "]
    }), rm.jsx(v, {
      children: "└──────────┘"
    })]
  }), cache[2] = availableCard;else availableCard = cache[2];
  return availableCard;
}
var HDl, Oue, rm;
var xDl = b(() => {
  Pa();
  TI();
  hg();
  je();
  ss();
  kt();
  kWe();
  qe();
  vn();
  Is();
  Wo();
  rS();
  HDl = x(tt(), 1), Oue = x(et(), 1), rm = x(oe(), 1);
});

export {IDl,qhm,HDl,Oue,rm,xDl};
