// @ts-nocheck
import {Bj,__e} from "../../vendor/m3350.ts";
import {FPe,Qzn} from "../../vendor/m4822.ts";
import {POWERUP_DISCOVERY_COPY as egt,Jzn,resolvePowerupDiscoveryArm as hHo} from "../agent/4821_resolvePowerupDiscoveryArm.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {nt} from "../../vendor/m127.ts";
import {isEnterpriseSubscriber as yZe,lo,getAuthTokenSource as Ak,isClaudeAISubscriber as Eo,getAnthropicApiKeyWithSource as Yg,getApiKeyFromConfigOrMacOSKeychain as qBe,describeHowToDisableAuthTokenSource as UBe} from "./2036_withOAuthRefreshLock.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Vi,$d} from "./0620_$d.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {ZR,getLargeMemoryFiles as Ake,getMaxMemoryCharacterCount as Cke} from "./2729_stripHtmlComments.ts";
import {yht,YI} from "../../vendor/m4692.ts";
import {Po,isTmuxControlMode as Lt} from "../../vendor/m638.ts";
import {Xo,formatNumber as qc} from "../../vendor/m240.ts";
import {lr,fk} from "../../vendor/m233.ts";
import {tr,getGlobalConfig as Ot} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {IAe,zNe} from "../../vendor/m1451.ts";
import {n7n,lWt,oWe,t7n} from "../../vendor/m4623.ts";
import {dn,dl,eC} from "./0137_namespace.ts";
import {fHo,Yzn} from "../../vendor/m4819.ts";
import {Ir} from "../../vendor/m584.ts";
import {lt,getOnboardingShownThisSession as Rar,getAllowedChannels as Nb} from "../session/0132_sent.ts";
import {gwl,hwl} from "../../vendor/m4821.ts";
import {bwl,Twl} from "../../vendor/m4823.ts";
import {Awl,Cwl} from "../../vendor/m4824.ts";
import {Ro,getModelSourceAnnotation as Nkt} from "../permissions/1458_swapShrinksContextWindow.ts";
import {vwl,yHo,_Ho,Rwl} from "../../vendor/m4825.ts";
import {Dwl,Hwl,xwl} from "../../vendor/m4826.ts";
import {Uwl,Fwl,Bwl} from "../telemetry/4829_passesUpsellSeenCount.ts";
import {Wwl,rjn,qwl} from "../tui/4830_start.ts";
import {Jwl,jwl,Ywl} from "../telemetry/4832_fullscreenDownsellSeenCount.ts";
import {rLn,nno,Qga} from "../telemetry/3352_seenNotifications.ts";
import {EHo,sjn,rkl} from "../tui/4833_id.ts";
import {Qdt,wY,kxe,Xdt} from "../telemetry/4101_level.ts";
import {V3e,ole} from "../../vendor/m3348.ts";
import {qe,isDebugMode as QL,isDebugToStdErr as ZL,getDebugLogPath as dpe} from "./0236_setHasFormattedOutput.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {mte} from "./3893_wB.ts";
import {Ne} from "../../vendor/m583.ts";
/**
 * Startup banner / warning notification registry for the Claude Code TUI.
 *
 * Defines a list of "notification" descriptors (`ddm`), each with a `tier`
 * (error/warning/info/announcement), an `isActive` predicate, and a `render`
 * function that returns the Ink/React element shown at startup. `AHo` selects
 * which warnings to show and which single announcement slot to fill, with
 * sticky-slot logic in `ukl` so the chosen announcement does not flicker
 * between renders. Announcement priority is resolved by `ikl` using the
 * `FTe` priority thresholds (org/launch/campaign/promo/hint).
 */

/** Render the powerup-discovery banner and fire its "shown" telemetry once. */
function edm() {
  let cache = akl.c(1);
  Bj("powerup-discovery", tdm);
  let element;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) element = id.jsx(FPe, {
    children: egt.banner
  }), cache[0] = element;else element = cache[0];
  return element;
}

/** Telemetry: powerup-discovery banner was shown. */
function tdm() {
  return W("tengu_powerup_discovery_shown", {
    arm: Le("banner")
  });
}

/** Return every registered notification that is currently active for `context`. */
function ckl(context: any) {
  return ddm.filter(notification => notification.isActive(context));
}

/** Names of the prompt-caching disable env vars that are currently truthy. */
function okl() {
  return ["DISABLE_PROMPT_CACHING", "DISABLE_PROMPT_CACHING_HAIKU", "DISABLE_PROMPT_CACHING_OPUS", "DISABLE_PROMPT_CACHING_SONNET", "DISABLE_PROMPT_CACHING_FABLE"].filter(envVar => nt(process.env[envVar]));
}

/** Whether a notification of the given tier should be shown at all. */
function pdm(tier: string, context: any) {
  switch (tier) {
    case "error":
    case "warning":
    case "info":
    case "announcement":
      return !0;
  }
}

/** Numeric priority of a notification (defaults to 0). */
function mdm(notification: any) {
  return notification.priority ?? 0;
}

/**
 * Sort key `[group, tiebreak]` for an info/announcement notification.
 * Announcements are bucketed by priority threshold (org/launch/campaign),
 * info notifications fall into group 3 ordered by their position in `skl`.
 */
function ikl(notification: any): [number, number] {
  if (notification.tier === "announcement") {
    let priority = mdm(notification);
    if (priority >= FTe.org) return [0, -priority];
    if (priority >= FTe.launch) return [1, -priority];
    if (priority >= FTe.campaign) return [2, -priority];
    return [4, -priority];
  }
  let infoIndex = skl.indexOf(notification.id);
  return [3, infoIndex === -1 ? skl.length : infoIndex];
}

function ajn() {
  return yZe() || Rr() !== "firstParty" || Vi();
}

/** Reset the sticky announcement slot state. */
function fdm() {
  ijn = null, CHo = null;
}

/**
 * Resolve which notifications to render, keeping a sticky announcement slot
 * across renders so the chosen announcement does not change once shown.
 */
function ukl(notifications: any[], context: any, options: any) {
  let effectiveOptions = CHo ?? options,
    resolved = AHo(notifications, context, effectiveOptions);
  if (ijn === null) {
    if (resolved.slot !== null) ijn = resolved.slot, CHo = {
      suppressPromos: effectiveOptions.suppressPromos
    };
    return resolved;
  }
  let stickySlot = ijn;
  if (resolved.slot?.id === stickySlot.id) return resolved;
  let overflowBase = resolved.slot === null ? 0 : resolved.slotOverflowCount + 1,
    stickyStillPresent = notifications.some(notification => notification.id === stickySlot.id);
  return {
    ...resolved,
    slot: stickySlot,
    slotOverflowCount: Math.max(0, overflowBase - (stickyStillPresent ? 1 : 0))
  };
}

/**
 * Partition active notifications into warnings, the single chosen
 * announcement/info slot, its overflow count, and ant-only entries.
 */
function AHo(notifications: any[], context: any, {
  suppressPromos: suppressPromos
}: { suppressPromos: boolean }) {
  let visible = notifications.filter(notification => pdm(notification.tier, context) && !(notification.promo === !0 && suppressPromos)),
    warnings = visible.filter(notification => notification.antOnly !== !0 && notification.tier !== "info" && notification.tier !== "announcement"),
    antNotifications = visible.filter(notification => notification.antOnly === !0),
    slotCandidates = visible.filter(notification => notification.antOnly !== !0 && (notification.tier === "info" || notification.tier === "announcement")),
    chosenSlot = slotCandidates.find(notification => notification.claimsFirstShow?.() === !0) ?? null;
  if (chosenSlot === null) for (let candidate of slotCandidates) {
    if (chosenSlot === null) {
      chosenSlot = candidate;
      continue;
    }
    let [candidateGroup, candidateTiebreak] = ikl(candidate),
      [chosenGroup, chosenTiebreak] = ikl(chosenSlot);
    if (candidateGroup < chosenGroup || candidateGroup === chosenGroup && candidateTiebreak < chosenTiebreak) chosenSlot = candidate;
  }
  return {
    warnings: warnings,
    slot: chosenSlot,
    slotOverflowCount: chosenSlot === null ? 0 : slotCandidates.length - 1,
    ant: antNotifications
  };
}
var akl,
  lkl,
  id,
  FTe,
  Bum,
  Uum,
  $um,
  qum,
  Wum,
  Gum,
  Vum,
  Kum,
  zum,
  jum,
  Yum,
  Jum,
  Xum,
  Qum,
  Zum,
  ndm,
  rdm,
  odm,
  sdm,
  idm,
  adm,
  ldm,
  cdm,
  udm,
  ddm,
  skl,
  ijn = null,
  CHo = null;
var RHo = b(() => {
  je();
  ZR();
  yht();
  Po();
  Xo();
  lr();
  tr();
  lo();
  $d();
  IAe();
  Ps();
  n7n();
  dn();
  fHo();
  Ir();
  lt();
  Jzn();
  kt();
  gwl();
  Qzn();
  __e();
  bwl();
  Awl();
  Ro();
  vwl();
  Dwl();
  Uwl();
  Wwl();
  Jwl();
  rLn();
  EHo();
  Qdt();
  V3e();
  qe();
  akl = x(tt(), 1), lkl = require("path"), id = x(oe(), 1), FTe = {
    org: 30,
    launch: 20,
    campaign: 15,
    promo: 10,
    hint: 5
  }, Bum = {
    id: "safe-mode",
    tier: "warning",
    type: "warning",
    isActive: () => dl(),
    render: () => id.jsxs(id.Fragment, {
      children: [id.jsxs(YI, {
        status: "warning",
        children: ["Safe mode: all customizations are disabled (CLAUDE.md, skills, plugins, hooks, MCP, agents, and more)", Yzn() && id.jsxs(id.Fragment, {
          children: [" \xB7 ", "managed hooks and settings policy from your organization still apply; managed plugins, skills, CLAUDE.md, and MCP servers do not"]
        })]
      }), id.jsx($, {
        paddingLeft: 2,
        children: id.jsx(v, {
          dimColor: !0,
          children: `${fk(eC())} to re-enable`
        })
      })]
    })
  }, Uum = {
    id: "large-memory-files",
    tier: "warning",
    type: "warning",
    isActive: e => Ake(e.memoryFiles).length > 0,
    render: e => {
      let t = Ake(e.memoryFiles),
        n = Cke();
      return id.jsx(id.Fragment, {
        children: t.map(r => {
          let o = r.path.startsWith(Lt()) ? lkl.relative(Lt(), r.path) : r.path;
          return id.jsxs(YI, {
            status: "warning",
            children: [id.jsx(v, {
              bold: !0,
              children: o
            }), " is over the", " ", qc(n), "-char limit (", qc(r.content.length), " chars)", id.jsx(v, {
              dimColor: !0,
              children: " \xB7 /memory to free up context"
            })]
          }, r.path);
        })
      });
    }
  }, $um = {
    id: "claude-ai-external-token",
    tier: "warning",
    type: "warning",
    isActive: () => {
      let e = Ak();
      return Eo() && (e.source === "ANTHROPIC_AUTH_TOKEN" || e.source === "apiKeyHelper");
    },
    render: () => {
      let e = Ak();
      return id.jsx($, {
        marginTop: 1,
        children: id.jsxs(YI, {
          status: "warning",
          children: [e.source, " overriding Claude subscription login", id.jsx(v, {
            dimColor: !0,
            children: " \xB7 unset it or /logout to sign it out"
          })]
        })
      });
    }
  }, qum = {
    id: "api-key-conflict",
    tier: "warning",
    type: "warning",
    isActive: () => {
      let {
        source: e
      } = Yg({
        skipRetrievingKeyFromApiKeyHelper: !0
      });
      return !!qBe() && (e === "ANTHROPIC_API_KEY" || e === "apiKeyHelper");
    },
    render: () => {
      let {
        source: e
      } = Yg({
        skipRetrievingKeyFromApiKeyHelper: !0
      });
      return id.jsx($, {
        marginTop: 1,
        children: id.jsxs(YI, {
          status: "warning",
          children: [e, " overriding saved Console key", id.jsx(v, {
            dimColor: !0,
            children: " \xB7 unset it or /logout to clear the saved key"
          })]
        })
      });
    }
  }, Wum = {
    id: "both-auth-methods",
    tier: "warning",
    type: "warning",
    isActive: () => {
      let {
          source: e
        } = Yg({
          skipRetrievingKeyFromApiKeyHelper: !0
        }),
        t = Ak();
      return e !== "none" && t.source !== "none" && !(e === "apiKeyHelper" && t.source === "apiKeyHelper");
    },
    render: () => {
      let {
          source: e
        } = Yg({
          skipRetrievingKeyFromApiKeyHelper: !0
        }),
        t = Ak();
      return id.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [id.jsxs(YI, {
          status: "warning",
          children: ["Both ", t.source, " and ", e, " set \xB7 auth may not work as expected"]
        }), id.jsxs($, {
          flexDirection: "column",
          paddingLeft: 2,
          children: [id.jsxs(v, {
            dimColor: !0,
            children: ["\xB7 to use", " ", t.source === "claude.ai" ? "claude.ai" : t.source, ":", " ", e === "ANTHROPIC_API_KEY" ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.' : e === "apiKeyHelper" ? "Unset the apiKeyHelper setting." : "claude /logout"]
          }), id.jsxs(v, {
            dimColor: !0,
            children: ["\xB7 to use ", e, ":", " ", UBe(t.source)]
          })]
        })]
      });
    }
  }, Gum = {
    id: "large-agent-descriptions",
    tier: "warning",
    type: "warning",
    isActive: e => lWt(e.agentDefinitions) > oWe,
    render: e => {
      let t = lWt(e.agentDefinitions);
      return id.jsxs(YI, {
        status: "warning",
        children: ["Agent descriptions are over the", " ", qc(oWe), "-token limit (~", qc(t), " tokens)", id.jsx(v, {
          dimColor: !0,
          children: " \xB7 /agents to free up context"
        })]
      });
    }
  }, Vum = {
    id: "model-source",
    tier: "info",
    type: "info",
    isActive: e => e.modelRestrictedWarning === null && (Nkt() !== "" || t7n()),
    render: () => id.jsx(Twl, {})
  }, Kum = {
    id: "install-broken",
    tier: "warning",
    type: "warning",
    isActive: e => e.installBrokenMessages.length > 0,
    render: e => id.jsx(Cwl, {
      messages: e.installBrokenMessages
    })
  }, zum = {
    id: "npm-deprecation",
    tier: "warning",
    type: "warning",
    isActive: e => e.npmInstallDeprecated,
    render: () => id.jsxs(YI, {
      status: "warning",
      children: ["Installed via npm (deprecated)", id.jsxs(v, {
        dimColor: !0,
        children: [" ", "\xB7 run claude install to switch to the native version"]
      })]
    })
  }, jum = {
    id: "model-deprecation",
    tier: "warning",
    type: "warning",
    isActive: e => e.modelDeprecationWarning !== null,
    render: e => e.modelDeprecationWarning === null ? null : id.jsxs(YI, {
      status: "warning",
      children: [e.modelDeprecationWarning.message, id.jsxs(v, {
        dimColor: !0,
        children: [" \xB7 ", e.modelDeprecationWarning.action]
      })]
    })
  }, Yum = {
    id: "model-restricted",
    tier: "warning",
    type: "warning",
    isActive: e => e.modelRestrictedWarning !== null,
    render: e => e.modelRestrictedWarning === null ? null : id.jsx(YI, {
      status: "warning",
      children: mte(e.modelRestrictedWarning.requested, e.modelRestrictedWarning.effective)
    })
  }, Jum = {
    id: "hipaa-compliance",
    tier: "warning",
    type: "info",
    isActive: () => zNe("hipaa"),
    render: () => id.jsxs(YI, {
      status: "info",
      children: ["HIPAA \xB7 some features are restricted", id.jsx(v, {
        dimColor: !0,
        children: " \xB7 /status for details"
      })]
    })
  }, Xum = {
    id: "debug-mode",
    tier: "info",
    type: "info",
    isActive: () => QL(),
    render: () => id.jsxs(FPe, {
      children: ["Debug mode enabled \xB7 logging to", " ", ZL() ? "stderr" : dpe()]
    })
  }, Qum = {
    id: "tmux-session",
    tier: "info",
    type: "info",
    isActive: () => !!process.env.CLAUDE_CODE_TMUX_SESSION,
    render: () => id.jsxs(FPe, {
      children: ["tmux session: ", process.env.CLAUDE_CODE_TMUX_SESSION, " \xB7 detach with", " ", process.env.CLAUDE_CODE_TMUX_PREFIX_CONFLICTS ? `${process.env.CLAUDE_CODE_TMUX_PREFIX} ${process.env.CLAUDE_CODE_TMUX_PREFIX} d (press prefix twice - Claude uses ${process.env.CLAUDE_CODE_TMUX_PREFIX})` : `${process.env.CLAUDE_CODE_TMUX_PREFIX} d`]
    })
  }, Zum = {
    id: "powerup-discovery",
    tier: "info",
    type: "info",
    isActive: () => Rar() && hHo() === "banner",
    render: () => id.jsx(edm, {})
  };
  ndm = {
    id: "emergency-tip",
    tier: "warning",
    type: "warning",
    isActive: () => yHo(_Ho()),
    render: () => id.jsx(Rwl, {})
  }, rdm = {
    id: "channels",
    tier: "info",
    type: "info",
    isActive: () => Nb().length > 0,
    render: () => id.jsx(hwl, {})
  }, odm = {
    id: "prompt-caching-disabled",
    tier: "warning",
    type: "warning",
    isActive: () => okl().length > 0,
    render: () => {
      let e = okl();
      return id.jsxs(YI, {
        status: "warning",
        children: ["Prompt caching off (", e.join(", "), "), requests will be slower and cost more", id.jsx(v, {
          dimColor: !0,
          children: " \xB7 unset it to re-enable"
        })]
      });
    }
  }, sdm = {
    id: "company-announcement",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: FTe.org,
    isActive: () => Hwl(),
    render: () => id.jsx(xwl, {})
  }, idm = {
    id: "startup-announcement",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: FTe.launch,
    isActive: () => sjn(!1) !== void 0 && !(wY()?.isTopPriorityAnnouncement === !0 && rjn()),
    render: () => id.jsx(rkl, {})
  }, adm = {
    id: "fotw-nudge",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: FTe.campaign,
    isActive: () => rjn(),
    render: () => id.jsx(qwl, {})
  }, ldm = {
    id: "guest-passes",
    tier: "announcement",
    type: "info",
    promo: !0,
    maxImpressions: 3,
    priority: FTe.promo,
    isActive: () => Fwl() && !kxe() && !Xdt(),
    render: () => id.jsx(Bwl, {})
  }, cdm = {
    id: "fullscreen-downsell",
    tier: "announcement",
    type: "info",
    promo: !1,
    priority: FTe.hint,
    claimsFirstShow: () => (Ot().fullscreenDownsellSeenCount ?? 0) === 0,
    isActive: () => Ne.CLAUDE_CODE_TUI_JUST_SWITCHED === void 0 && jwl(),
    render: () => id.jsx(Ywl, {})
  }, udm = {
    id: "subscription-switch",
    tier: "announcement",
    type: "info",
    promo: !0,
    maxImpressions: nno,
    priority: FTe.promo,
    isActive: e => e.existingClaudeSubscription !== null,
    render: e => e.existingClaudeSubscription === null ? null : id.jsx(Qga, {
      subscriptionType: e.existingClaudeSubscription
    })
  }, ddm = [Bum, Uum, Gum, $um, qum, Wum, rdm, odm, ndm, Vum, jum, Yum, Kum, zum, Jum, Xum, Qum, Zum, sdm, idm, adm, ldm, udm, cdm];
  skl = ["debug-mode", "model-source", "channels", "tmux-session"];
  ole(fdm);
});

export {edm,tdm,ckl,okl,pdm,mdm,ikl,ajn,fdm,ukl,AHo,akl,lkl,id,FTe,Bum,Uum,$um,qum,Wum,Gum,Vum,Kum,zum,jum,Yum,Jum,Xum,Qum,Zum,ndm,rdm,odm,sdm,idm,adm,ldm,cdm,udm,ddm,skl,ijn,CHo,RHo};
