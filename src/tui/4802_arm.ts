// @ts-nocheck
import {cY,rge} from "../../vendor/m3334.ts";
import {UDe,dGn} from "../../vendor/m4790.ts";
import {POWERUP_DISCOVERY_COPY,uGn,resolvePowerupDiscoveryArm} from "../agent/4789_resolvePowerupDiscoveryArm.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum,st} from "../../vendor/m5.ts";
import {isEnterpriseSubscriber,Ao,getAuthTokenSource,isClaudeAISubscriber,getAnthropicApiKeyWithSource,getApiKeyFromConfigOrMacOSKeychain,describeHowToDisableAuthTokenSource} from "../config/2031_withOAuthRefreshLock.ts";
import {getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {ra,Ap} from "../config/0614_Ap.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {zw,getLargeMemoryFiles,getMaxMemoryCharacterCount} from "../config/2717_stripHtmlComments.ts";
import {ljt,GP} from "../../vendor/m4675.ts";
import {Go,Pt} from "../../vendor/m632.ts";
import {ps,formatNumber} from "../../vendor/m238.ts";
import {dr,Xx} from "../../vendor/m231.ts";
import {Qn,getGlobalConfig} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {KEe,Z1e} from "../../vendor/m1446.ts";
import {S5n,F6t,Ije,T5n} from "../../vendor/m4595.ts";
import {sn,Bl,KE} from "../config/0047_namespace.ts";
import {JEo,cGn} from "../../vendor/m4787.ts";
import {Lr} from "../../vendor/m578.ts";
import {lt,getOnboardingShownThisSession,getAllowedChannels} from "../session/0131_sent.ts";
import {gyl,hyl} from "../../vendor/m4789.ts";
import {Syl,Tyl} from "../../vendor/m4791.ts";
import {Cyl,Eyl} from "../../vendor/m4792.ts";
import {Mo,getModelSourceAnnotation} from "../permissions/1453_swapShrinksContextWindow.ts";
import {wyl,eCo,ZEo,vyl} from "../../vendor/m4793.ts";
import {Dyl,kyl,Iyl} from "../../vendor/m4794.ts";
import {Uyl,Byl,Fyl} from "../telemetry/4797_passesUpsellSeenCount.ts";
import {jyl,hGn,qyl} from "./4798_start.ts";
import {Jyl,zyl,Yyl} from "./4800_fullscreenDownsellSeenCount.tsx";
import {uDn,TXr,Uca} from "./3336_seenNotifications.ts";
import {sCo,oCo,Zyl} from "../telemetry/4801_planLimitsEndDate.ts";
import {Lct,WY,yIe,Oct} from "../telemetry/4037_level.ts";
import {Tst,Fke} from "../../vendor/m3332.ts";
import {qe,isDebugMode,isDebugToStdErr,getDebugLogPath} from "../config/0234_setHasFormattedOutput.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {_te} from "../config/3875_aU.ts";
import {je} from "../../vendor/m577.ts";
/** Renders the powerup-discovery banner, memoized via React cache. */
function Ftm() {
  let memoCache = rTl.c(1);
  cY("powerup-discovery", Utm);
  let bannerElement;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) bannerElement = Si.createElement(UDe, null, POWERUP_DISCOVERY_COPY.banner), memoCache[0] = bannerElement;else bannerElement = memoCache[0];
  return bannerElement;
}

/** Logs that the powerup-discovery banner was shown with the "banner" arm. */
function Utm() {
  return logEvent("tengu_powerup_discovery_shown", {
    arm: fromEnum("banner")
  });
}

/** Returns the subset of all notification items that are currently active. */
function sTl(context: any) {
  return Jtm.filter(item => item.isActive(context));
}

/** Returns the list of env-var names that disable prompt caching and are currently set. */
function eTl() {
  return ["DISABLE_PROMPT_CACHING", "DISABLE_PROMPT_CACHING_HAIKU", "DISABLE_PROMPT_CACHING_OPUS", "DISABLE_PROMPT_CACHING_SONNET", "DISABLE_PROMPT_CACHING_FABLE"].filter(envVar => st(process.env[envVar]));
}

/** Returns true for tiers that are renderable in the notification slot. */
function Xtm(tier: any, t: any) {
  switch (tier) {
    case "error":
    case "warning":
    case "info":
    case "announcement":
      return !0;
  }
}

/** Returns the numeric priority of a notification item (defaults to 0). */
function Qtm(item: any) {
  return item.priority ?? 0;
}

/**
 * Returns a sort key [rank, tieBreaker] for a notification item.
 * Announcements are ranked by priority tier; other items use the tTl order.
 */
function nTl(item: any) {
  if (item.tier === "announcement") {
    let priority = Qtm(item);
    if (priority >= fye.org) return [0, -priority];
    if (priority >= fye.launch) return [1, -priority];
    if (priority >= fye.campaign) return [2, -priority];
    return [4, -priority];
  }
  let knownIndex = tTl.indexOf(item.id);
  return [3, knownIndex === -1 ? tTl.length : knownIndex];
}

/** Returns true when promos should be suppressed (enterprise, non-first-party, or custom model config). */
function _Gn() {
  return isEnterpriseSubscriber() || getAPIProvider() !== "firstParty" || ra();
}

/** Resets the sticky slot state so the next render picks a fresh notification. */
function Ztm() {
  gGn = null, iCo = null;
}

/**
 * Selects the notification slot to show, persisting the chosen slot across renders
 * to avoid flickering when the active set changes.
 */
function iTl(items: any, t: any, defaults: any) {
  let resolvedDefaults = iCo ?? defaults,
    slotResult = aCo(items, t, resolvedDefaults);
  if (gGn === null) {
    if (slotResult.slot !== null) gGn = slotResult.slot, iCo = {
      suppressPromos: resolvedDefaults.suppressPromos
    };
    return slotResult;
  }
  let stickySlot = gGn;
  if (slotResult.slot?.id === stickySlot.id) return slotResult;
  let overflowAdj = slotResult.slot === null ? 0 : slotResult.slotOverflowCount + 1,
    stickyStillPresent = items.some((item: any) => item.id === stickySlot.id);
  return {
    ...slotResult,
    slot: stickySlot,
    slotOverflowCount: Math.max(0, overflowAdj - (stickyStillPresent ? 1 : 0))
  };
}

/**
 * Computes the current notification slot selection from the active item list.
 * Splits items into warnings, info/announcement (slot candidates), and ant-only items.
 */
function aCo(items: any, t: any, {
  suppressPromos: suppressPromos
}) {
  let filtered = items.filter((item: any) => Xtm(item.tier, t) && !(item.promo === !0 && suppressPromos)),
    warnings = filtered.filter((item: any) => item.antOnly !== !0 && item.tier !== "info" && item.tier !== "announcement"),
    antOnly = filtered.filter((item: any) => item.antOnly === !0),
    infoAndAnnouncements = filtered.filter((item: any) => item.antOnly !== !0 && (item.tier === "info" || item.tier === "announcement")),
    selectedSlot = infoAndAnnouncements.find((item: any) => item.claimsFirstShow?.() === !0) ?? null;
  if (selectedSlot === null) for (let item of infoAndAnnouncements) {
    if (selectedSlot === null) {
      selectedSlot = item;
      continue;
    }
    let [candidateRank, candidateTie] = nTl(item),
      [currentRank, currentTie] = nTl(selectedSlot);
    if (candidateRank < currentRank || candidateRank === currentRank && candidateTie < currentTie) selectedSlot = item;
  }
  return {
    warnings: warnings,
    slot: selectedSlot,
    slotOverflowCount: selectedSlot === null ? 0 : infoAndAnnouncements.length - 1,
    ant: antOnly
  };
}
var rTl,
  Si,
  oTl,
  fye,
  Ctm,
  vtm,
  wtm,
  Rtm,
  xtm,
  ktm,
  Htm,
  Itm,
  Dtm,
  Ptm,
  Otm,
  Ltm,
  Mtm,
  Ntm,
  Btm,
  $tm,
  qtm,
  jtm,
  Wtm,
  Gtm,
  Vtm,
  Ktm,
  ztm,
  Ytm,
  Jtm,
  tTl,
  gGn = null,
  iCo = null;
var lCo = b(() => {
  ze();
  zw();
  ljt();
  Go();
  ps();
  dr();
  Qn();
  Ao();
  Ap();
  KEe();
  li();
  S5n();
  sn();
  JEo();
  Lr();
  lt();
  uGn();
  Ct();
  gyl();
  dGn();
  rge();
  Syl();
  Cyl();
  Mo();
  wyl();
  Dyl();
  Uyl();
  jyl();
  Jyl();
  uDn();
  sCo();
  Lct();
  Tst();
  qe();
  rTl = M(rt(), 1), Si = M(Te(), 1), oTl = require("path"), fye = {
    org: 30,
    launch: 20,
    campaign: 15,
    promo: 10,
    hint: 5
  }, Ctm = {
    id: "safe-mode",
    tier: "warning",
    type: "warning",
    isActive: () => Bl(),
    render: () => Si.createElement(Si.Fragment, null, Si.createElement(GP, {
      status: "warning"
    }, "Safe mode: all customizations are disabled (CLAUDE.md, skills, plugins, hooks, MCP, agents, and more)", cGn() && Si.createElement(Si.Fragment, null, " \xB7 ", "managed hooks and settings policy from your organization still apply; managed plugins, skills, CLAUDE.md, and MCP servers do not")), Si.createElement(Box, {
      paddingLeft: 2
    }, Si.createElement(Text, {
      dimColor: !0
    }, `${Xx(KE())} to re-enable`)))
  }, vtm = {
    id: "large-memory-files",
    tier: "warning",
    type: "warning",
    isActive: e => getLargeMemoryFiles(e.memoryFiles).length > 0,
    render: e => {
      let t = getLargeMemoryFiles(e.memoryFiles),
        n = getMaxMemoryCharacterCount();
      return Si.createElement(Si.Fragment, null, t.map(r => {
        let o = r.path.startsWith(Pt()) ? oTl.relative(Pt(), r.path) : r.path;
        return Si.createElement(GP, {
          key: r.path,
          status: "warning"
        }, Si.createElement(Text, {
          bold: !0
        }, o), " is over the", " ", formatNumber(n), "-char limit (", formatNumber(r.content.length), " chars)", Si.createElement(Text, {
          dimColor: !0
        }, " \xB7 /memory to free up context"));
      }));
    }
  }, wtm = {
    id: "claude-ai-external-token",
    tier: "warning",
    type: "warning",
    isActive: () => {
      let e = getAuthTokenSource();
      return isClaudeAISubscriber() && (e.source === "ANTHROPIC_AUTH_TOKEN" || e.source === "apiKeyHelper");
    },
    render: () => {
      let e = getAuthTokenSource();
      return Si.createElement(Box, {
        marginTop: 1
      }, Si.createElement(GP, {
        status: "warning"
      }, e.source, " overriding Claude subscription login", Si.createElement(Text, {
        dimColor: !0
      }, " \xB7 unset it or /logout to sign it out")));
    }
  }, Rtm = {
    id: "api-key-conflict",
    tier: "warning",
    type: "warning",
    isActive: () => {
      let {
        source: e
      } = getAnthropicApiKeyWithSource({
        skipRetrievingKeyFromApiKeyHelper: !0
      });
      return !!getApiKeyFromConfigOrMacOSKeychain() && (e === "ANTHROPIC_API_KEY" || e === "apiKeyHelper");
    },
    render: () => {
      let {
        source: e
      } = getAnthropicApiKeyWithSource({
        skipRetrievingKeyFromApiKeyHelper: !0
      });
      return Si.createElement(Box, {
        marginTop: 1
      }, Si.createElement(GP, {
        status: "warning"
      }, e, " overriding saved Console key", Si.createElement(Text, {
        dimColor: !0
      }, " \xB7 unset it or /logout to clear the saved key")));
    }
  }, xtm = {
    id: "both-auth-methods",
    tier: "warning",
    type: "warning",
    isActive: () => {
      let {
          source: e
        } = getAnthropicApiKeyWithSource({
          skipRetrievingKeyFromApiKeyHelper: !0
        }),
        t = getAuthTokenSource();
      return e !== "none" && t.source !== "none" && !(e === "apiKeyHelper" && t.source === "apiKeyHelper");
    },
    render: () => {
      let {
          source: e
        } = getAnthropicApiKeyWithSource({
          skipRetrievingKeyFromApiKeyHelper: !0
        }),
        t = getAuthTokenSource();
      return Si.createElement(Box, {
        flexDirection: "column",
        marginTop: 1
      }, Si.createElement(GP, {
        status: "warning"
      }, "Both ", t.source, " and ", e, " set \xB7 auth may not work as expected"), Si.createElement(Box, {
        flexDirection: "column",
        paddingLeft: 2
      }, Si.createElement(Text, {
        dimColor: !0
      }, "\xB7 to use", " ", t.source === "claude.ai" ? "claude.ai" : t.source, ":", " ", e === "ANTHROPIC_API_KEY" ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.' : e === "apiKeyHelper" ? "Unset the apiKeyHelper setting." : "claude /logout"), Si.createElement(Text, {
        dimColor: !0
      }, "\xB7 to use ", e, ":", " ", describeHowToDisableAuthTokenSource(t.source))));
    }
  }, ktm = {
    id: "large-agent-descriptions",
    tier: "warning",
    type: "warning",
    isActive: e => F6t(e.agentDefinitions) > Ije,
    render: e => {
      let t = F6t(e.agentDefinitions);
      return Si.createElement(GP, {
        status: "warning"
      }, "Agent descriptions are over the", " ", formatNumber(Ije), "-token limit (~", formatNumber(t), " tokens)", Si.createElement(Text, {
        dimColor: !0
      }, " \xB7 /agents to free up context"));
    }
  }, Htm = {
    id: "model-source",
    tier: "info",
    type: "info",
    isActive: e => e.modelRestrictedWarning === null && (getModelSourceAnnotation() !== "" || T5n()),
    render: () => Si.createElement(Tyl, null)
  }, Itm = {
    id: "install-broken",
    tier: "warning",
    type: "warning",
    isActive: e => e.installBrokenMessages.length > 0,
    render: e => Si.createElement(Eyl, {
      messages: e.installBrokenMessages
    })
  }, Dtm = {
    id: "npm-deprecation",
    tier: "warning",
    type: "warning",
    isActive: e => e.npmInstallDeprecated,
    render: () => Si.createElement(GP, {
      status: "warning"
    }, "Installed via npm (deprecated)", Si.createElement(Text, {
      dimColor: !0
    }, " ", "\xB7 run claude install to switch to the native version"))
  }, Ptm = {
    id: "model-deprecation",
    tier: "warning",
    type: "warning",
    isActive: e => e.modelDeprecationWarning !== null,
    render: e => e.modelDeprecationWarning === null ? null : Si.createElement(GP, {
      status: "warning"
    }, e.modelDeprecationWarning.message, Si.createElement(Text, {
      dimColor: !0
    }, " \xB7 ", e.modelDeprecationWarning.action))
  }, Otm = {
    id: "model-restricted",
    tier: "warning",
    type: "warning",
    isActive: e => e.modelRestrictedWarning !== null,
    render: e => e.modelRestrictedWarning === null ? null : Si.createElement(GP, {
      status: "warning"
    }, _te(e.modelRestrictedWarning.requested, e.modelRestrictedWarning.effective))
  }, Ltm = {
    id: "hipaa-compliance",
    tier: "warning",
    type: "info",
    isActive: () => Z1e("hipaa"),
    render: () => Si.createElement(GP, {
      status: "info"
    }, "HIPAA \xB7 some features are restricted", Si.createElement(Text, {
      dimColor: !0
    }, " \xB7 /status for details"))
  }, Mtm = {
    id: "debug-mode",
    tier: "info",
    type: "info",
    isActive: () => isDebugMode(),
    render: () => Si.createElement(UDe, null, "Debug mode enabled \xB7 logging to", " ", isDebugToStdErr() ? "stderr" : getDebugLogPath())
  }, Ntm = {
    id: "tmux-session",
    tier: "info",
    type: "info",
    isActive: () => !!process.env.CLAUDE_CODE_TMUX_SESSION,
    render: () => Si.createElement(UDe, null, "tmux session: ", process.env.CLAUDE_CODE_TMUX_SESSION, " \xB7 detach with", " ", process.env.CLAUDE_CODE_TMUX_PREFIX_CONFLICTS ? `${process.env.CLAUDE_CODE_TMUX_PREFIX} ${process.env.CLAUDE_CODE_TMUX_PREFIX} d (press prefix twice - Claude uses ${process.env.CLAUDE_CODE_TMUX_PREFIX})` : `${process.env.CLAUDE_CODE_TMUX_PREFIX} d`)
  }, Btm = {
    id: "powerup-discovery",
    tier: "info",
    type: "info",
    isActive: () => getOnboardingShownThisSession() && resolvePowerupDiscoveryArm() === "banner",
    render: () => Si.createElement(Ftm, null)
  };
  $tm = {
    id: "emergency-tip",
    tier: "warning",
    type: "warning",
    isActive: () => eCo(ZEo()),
    render: () => Si.createElement(vyl, null)
  }, qtm = {
    id: "channels",
    tier: "info",
    type: "info",
    isActive: () => getAllowedChannels().length > 0,
    render: () => Si.createElement(hyl, null)
  }, jtm = {
    id: "prompt-caching-disabled",
    tier: "warning",
    type: "warning",
    isActive: () => eTl().length > 0,
    render: () => {
      let e = eTl();
      return Si.createElement(GP, {
        status: "warning"
      }, "Prompt caching off (", e.join(", "), "), requests will be slower and cost more", Si.createElement(Text, {
        dimColor: !0
      }, " \xB7 unset it to re-enable"));
    }
  }, Wtm = {
    id: "company-announcement",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: fye.org,
    isActive: () => kyl(),
    render: () => Si.createElement(Iyl, null)
  }, Gtm = {
    id: "fable5-launch",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: fye.launch,
    isActive: () => oCo() && !(WY()?.isTopPriorityAnnouncement === !0 && hGn()),
    render: () => Si.createElement(Zyl, null)
  }, Vtm = {
    id: "fotw-nudge",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: fye.campaign,
    isActive: () => hGn(),
    render: () => Si.createElement(qyl, null)
  }, Ktm = {
    id: "guest-passes",
    tier: "announcement",
    type: "info",
    promo: !0,
    maxImpressions: 3,
    priority: fye.promo,
    isActive: () => Byl() && !yIe() && !Oct(),
    render: () => Si.createElement(Fyl, null)
  }, ztm = {
    id: "fullscreen-downsell",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: fye.hint,
    claimsFirstShow: () => (getGlobalConfig().fullscreenDownsellSeenCount ?? 0) === 0,
    isActive: () => je.CLAUDE_CODE_TUI_JUST_SWITCHED === void 0 && zyl(),
    render: () => Si.createElement(Yyl, null)
  }, Ytm = {
    id: "subscription-switch",
    tier: "announcement",
    type: "info",
    promo: !0,
    maxImpressions: TXr,
    priority: fye.promo,
    isActive: e => e.existingClaudeSubscription !== null,
    render: e => e.existingClaudeSubscription === null ? null : Si.createElement(Uca, {
      subscriptionType: e.existingClaudeSubscription
    })
  }, Jtm = [Ctm, vtm, ktm, wtm, Rtm, xtm, qtm, jtm, $tm, Htm, Ptm, Otm, Itm, Dtm, Ltm, Mtm, Ntm, Btm, Wtm, Gtm, Vtm, Ktm, Ytm, ztm];
  tTl = ["debug-mode", "model-source", "channels", "tmux-session"];
  Fke(Ztm);
});
export {Ftm,Utm,sTl,eTl,Xtm,Qtm,nTl,_Gn,Ztm,iTl,aCo,rTl,Si,oTl,fye,Ctm,vtm,wtm,Rtm,xtm,ktm,Htm,Itm,Dtm,Ptm,Otm,Ltm,Mtm,Ntm,Btm,$tm,qtm,jtm,Wtm,Gtm,Vtm,Ktm,ztm,Ytm,Jtm,tTl,gGn,iCo,lCo};
