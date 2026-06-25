// @ts-nocheck
import {tP,d6,dS} from "../config/4460_source.ts";
import {mw,X2e} from "../../vendor/m2608.ts";
import {rq,rH} from "../config/4461_operation.ts";
import {nH,IPn,xPn,II} from "../../vendor/m3268.ts";
import {H7n,k7n,_ht} from "../../vendor/m4691.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {color as wo,Kve} from "../../vendor/m2431.ts";
import {n6,Xq} from "./5220_bigint.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {Ske,Gk} from "../../vendor/m2727.ts";
import {LD,oHe} from "../../vendor/m2814.ts";
import {dPe,IKn,Q8t} from "../../vendor/m4592.ts";
import {getInitialSettings as Fr,br,getSettings_DEPRECATED as $o} from "../config/0745_updateSettingsForSource.ts";
import {Zct} from "../../vendor/m3840.ts";
import {getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {b} from "../../runtime.ts";
import {Gc,bt} from "../../vendor/m588.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Pq,TT} from "../session/3880_trackSequence.ts";
import {vwo,xWt} from "../../vendor/m4715.ts";
import {pH,isBridgeEnabled as AH,isRunningInRemoteEnvironment as hG} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {B5e,iDe} from "../core/4310_inFlight.ts";
import {cwe,shouldOfferTerminalSetup as H2e} from "../../vendor/m2528.ts";
import {Gzn,Wzn} from "../config/4813_children.ts";
import {Pa,x5} from "../../vendor/m720.ts";
import {nS,xy} from "../config/2351_nS.ts";
import {NZ,KR} from "../telemetry/2478_action.ts";
import {cW,isKairosCronEnabled as ZF} from "../config/2712_isKairosCronEnabled.ts";
import {L2,hC} from "./2222_available.ts";
import {lo,isClaudeAISubscriber as Eo,isMaxSubscriber as ese,is1PApiCustomer as WBe} from "../config/2036_withOAuthRefreshLock.ts";
import {G0o,nOe} from "../../vendor/m5034.ts";
import {vd,jkt,Ws} from "../session/1465_promise.ts";
import {tr,getGlobalConfig as Ot,getRemoteControlAtStartup as sue} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {bye,initY_ as y_} from "../../vendor/m4018.ts";
import {ky,buildMcpToolName as Vl} from "./2238_explicitlyRequested.ts";
import {rAo,tAo} from "../core/4518_code.ts";
import {Ulc,a2o} from "../telemetry/5604_enable_shortcut_tip.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn,rA} from "../config/0137_namespace.ts";
import {tp,Cs} from "../config/2284_loggedTmuxCcDisable.ts";
import {ia,getWorktreeCount as Uje} from "../../vendor/m698.ts";
import {zM,eS} from "../../vendor/m2240.ts";
import {uS,tFt,saa,raa,oaa,cB,sDn,iaa} from "../config/3192_path.ts";
import {Ro,getUserSpecifiedModelSetting as w3} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Es,Yt} from "../../vendor/m641.ts";
import {_a,getCurrentSessionAgentColor as cKt,isCustomTitleEnabled as UTe} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {AVt,t_t} from "../../vendor/m5130.ts";
import {mn,Pt} from "../telemetry/0600_feature_name.ts";
import {jn,getFeatureValue_CACHED_MAY_BE_STALE as it} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Qdt,wY,Hye,kxe,Xdt} from "../telemetry/4101_level.ts";
import {kWe,rgt,ngt,tgt} from "../../vendor/m4827.ts";
import {L5n,gmt} from "../telemetry/4317_content.ts";
import {tVt,zNl} from "../../vendor/m5086.ts";
import {y3t,r$a,s$a,o$a,i$a,n$a} from "../artifact/3966_kind.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
// @ts-nocheck

/** Resolve and cache the Vertex/marketplace key map (lazy, memoized in `Snr`). */
async function Wlc() {
  if (Snr !== void 0) return Snr;
  return Snr = await tP(), Snr;
}

/**
 * Decide whether a marketplace plugin suggestion tip is currently relevant.
 * Returns false unless the marketplace is registered, not already installed/dismissed,
 * and the relevance scan against the read-file state matches.
 */
async function Glc(pluginName, tipContext, relevanceOpts, marketplace = mw) {
  if (!(await Wlc())[marketplace]) return !1;
  if (rq(`${pluginName}@${marketplace}`)) return !1;
  if (nH(`${pluginName}@${marketplace}`)) return !1;
  return (await H7n(relevanceOpts, tipContext)) !== null;
}

/** Build (and memoize) the list of marketplace-plugin suggestion tips across all known marketplaces. */
async function d2o() {
  if (Myt !== void 0) return Myt;
  let marketplaceSet = new Set(IPn());
  if (marketplaceSet.size === 0) return Myt = [], Myt;
  let keyMap = await Wlc(),
    tips = [];
  for (let marketplace of marketplaceSet) {
    let marketplaceKey = keyMap[marketplace];
    if (!marketplaceKey) continue;
    if (marketplace !== mw && !xPn(marketplace, marketplaceKey.source)) {
      A(`Skipping plugin suggestion tips for marketplace "${marketplace}": its registered source is not declared in managed settings (extraKnownMarketplaces or strictKnownMarketplaces)`);
      continue;
    }
    let marketplaceData = await d6(marketplace).catch(() => null);
    if (!marketplaceData) continue;
    for (let plugin of marketplaceData.plugins) {
      let relevance = plugin.relevance,
        relevanceOpts = k7n(plugin.name, relevance);
      if (!relevanceOpts) continue;
      if (marketplace === mw && Vlc.some(tip => tip.id === `${plugin.name}-plugin`)) continue;
      let displayName = relevance?.topic ?? plugin.name.split("-").map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : word).join("-"),
        tipId = marketplace === mw ? `marketplace-plugin:${plugin.name}` : `marketplace-plugin:${plugin.name}@${marketplace}`;
      tips.push({
        id: tipId,
        pluginId: `${plugin.name}@${marketplace}`,
        priority: 1,
        providerAgnostic: !0,
        cooldownSessions: 3,
        content: async tipCtx => {
          let highlight = wo("suggestion", tipCtx.theme);
          return `Working with ${displayName}? Install the ${plugin.name} plugin:
${highlight(`/plugin install ${plugin.name}@${marketplace}`)}`;
        },
        isRelevant: async tipCtx => Glc(plugin.name, tipCtx, relevanceOpts, marketplace)
      });
    }
  }
  return Myt = tips, Myt;
}

/** Return true if the user has any user-defined entries of the given kind (e.g. skills/agents). */
async function l2o(dirName) {
  try {
    return (await n6(dirName, Lt())).length > 0;
  } catch (err) {
    return A(`hasUserDefined(${dirName}) failed: ${err}`), !1;
  }
}

/** Heuristic: does the current tip context indicate the user is working on UI/front-end files? */
function qlc(tipContext) {
  let {
    bashTools: bashTools,
    readFileState: readFileState
  } = tipContext ?? {};
  if (bashTools) {
    for (let tool of bashTools) if (iGm.has(tool)) return !0;
  }
  if (readFileState) {
    for (let filePath of Ske(readFileState)) if (sGm.test(filePath)) return !0;
  }
  return !1;
}

/** Render the shared "available in Claude for Enterprise" suffix with a Learn more link. */
function c2o(tipContext) {
  return `available in Claude for Enterprise \xB7 ${LD("https://clau.de/enterprise", "Learn more", {
    themeName: tipContext.theme
  })}`;
}

/** True if any *other* C4E tip is still within its cooldown window (avoids showing two at once). */
function u2o(tipId) {
  return aGm.some(id => id !== tipId && dPe(id) < lGm);
}

/** Read user-configured spinner tips override and map each into a tip descriptor. */
function uGm() {
  let override = Fr().spinnerTipsOverride;
  if (!override?.tips?.length) return [];
  return override.tips.map((text, idx) => ({
    id: `custom-tip-${idx}`,
    content: async () => text,
    cooldownSessions: 0,
    isRelevant: async () => !0
  }));
}

/** Compute the ordered list of relevant spinner tips for the given context. */
async function bnr(tipContext) {
  let initialSettings = Fr(),
    customTips = uGm();
  if (Zct(initialSettings.spinnerTipsOverride)) return customTips;
  let allTipsCombined = [...Vlc, ...cGm, ...(await d2o())],
    filteredByProvider = Rr() !== "firstParty" || !Su() ? allTipsCombined.filter(tip => tip.providerAgnostic) : allTipsCombined,
    relevanceResults = await Promise.all(filteredByProvider.map(tip => tip.isRelevant(tipContext)));
  return [...filteredByProvider.filter((tip, idx) => relevanceResults[idx]).filter(tip => dPe(tip.id) >= tip.cooldownSessions).filter(tip => tip.maxLifetimeShows === void 0 || IKn(tip.id) < tip.maxLifetimeShows), ...customTips];
}

var Snr,
  Myt,
  $lc,
  sGm,
  iGm,
  aGm,
  lGm = 5,
  Vlc,
  cGm;
var p2o = b(() => {
  Gc();
  Wi();
  Po();
  qe();
  Pq();
  br();
  vwo();
  pH();
  B5e();
  cwe();
  Kve();
  Gzn();
  Pa();
  nS();
  NZ();
  cW();
  L2();
  lo();
  G0o();
  vd();
  tr();
  bye();
  ky();
  rAo();
  Ulc();
  Ir();
  dn();
  Gk();
  tp();
  ia();
  zM();
  oHe();
  uS();
  Xq();
  Ro();
  Ps();
  Es();
  rH();
  dS();
  X2e();
  II();
  _ht();
  _a();
  AVt();
  mn();
  jn();
  Qdt();
  kWe();
  L5n();
  tVt();
  y3t();
  Q8t();
  $lc = Hn(() => tAo()), sGm = /\.(html?|css|s[ac]ss|less|[jt]sx|vue|svelte|astro|png|jpe?g|gif|svg|webp|avif|ico)$/i, iGm = new Set(["vite", "next", "nuxt", "astro", "gatsby", "ng", "parcel", "webpack-dev-server", "serve", "http-server", "live-server", "browser-sync"]);
  aGm = ["c4e-desktop", "c4e-remote-sessions", "c4e-ultrareview"];
  Vlc = [{
    id: "team-artifacts",
    priority: 4,
    content: async () => {
      let teamArtifacts = await r$a().catch(scanError => (Pt("tips_team_artifact_show", scanError instanceof Error ? "content_scan_error" : "content_unknown_error"), []));
      if (teamArtifacts.length === 0) return "";
      return s$a(teamArtifacts), o$a(), i$a(teamArtifacts);
    },
    cooldownSessions: 1,
    isRelevant: async () => n$a()
  }, {
    id: "fotw-campaign",
    priority: 4,
    content: async () => {
      let campaign = wY();
      if (!campaign?.command) return "";
      let creditOffer = Hye();
      if (!creditOffer) return "";
      let creditText = y_(creditOffer.amountMinorUnits, creditOffer.currency, "fit"),
        commandWithBlurb = campaign.tipBlurb ? `/${campaign.command} ${campaign.tipBlurb}` : `/${campaign.command}`,
        rotatedTip = campaign.tips?.[IKn("fotw-campaign") % campaign.tips.length] ?? "";
      if (rotatedTip) return `${rotatedTip} Try it for ${creditText} in usage credits.`;
      return `${campaign.titleLabel ?? "Feature of the week:"} ${commandWithBlurb}. Try it for ${creditText} in usage credits.`;
    },
    cooldownSessions: 1,
    isRelevant: async () => kxe()
  }, {
    id: "fotw-campaign-upsell",
    priority: 4,
    content: async () => {
      let campaign = wY();
      if (!campaign?.command) return "";
      let rotatedTip = campaign.tips?.[IKn("fotw-campaign-upsell") % campaign.tips.length] ?? "";
      if (rotatedTip) return rotatedTip;
      let commandWithBlurb = campaign.tipBlurb ? `/${campaign.command} ${campaign.tipBlurb}` : `/${campaign.command}`;
      return `${campaign.titleLabel ?? "Feature of the week:"} ${commandWithBlurb}.`;
    },
    cooldownSessions: 1,
    isRelevant: async () => Xdt()
  }, {
    id: "powerup-onboarding",
    priority: 3,
    providerAgnostic: !0,
    content: async tipCtx => `New to Claude Code? Run ${wo("suggestion", tipCtx.theme)("/powerup")} for a quick interactive tutorial`,
    cooldownSessions: 1,
    async isRelevant() {
      let config = Ot();
      if (config.numStartups >= 10) return !1;
      if (config.powerupsUnlocked?.length) return !1;
      return it("tengu_alder_compass", !1);
    }
  }, {
    id: "new-user-warmup",
    priority: 2,
    providerAgnostic: !0,
    content: async () => "Start with small features or bug fixes, tell Claude to propose a plan, and verify its suggested edits",
    cooldownSessions: 3,
    async isRelevant() {
      return Ot().numStartups < 10;
    }
  }, {
    id: "plan-mode-for-complex-tasks",
    priority: 2,
    providerAgnostic: !0,
    content: async () => `Use Plan Mode to prepare for a complex request before making changes. Press ${KR("chat:cycleMode", "Chat", "shift+tab")} twice to enable.`,
    cooldownSessions: 5,
    isRelevant: async () => {
      let config = Ot();
      return (config.lastPlanModeUse ? (Date.now() - config.lastPlanModeUse) / 86400000 : 1 / 0) > 7;
    }
  }, {
    id: "default-permission-mode-config",
    providerAgnostic: !0,
    content: async () => "Use /config to change your default permission mode (including Plan Mode)",
    cooldownSessions: 10,
    isRelevant: async () => {
      try {
        let config = Ot(),
          settings = $o(),
          hasUsedPlanMode = Boolean(config.lastPlanModeUse),
          hasDefaultMode = Boolean(settings?.permissions?.defaultMode);
        return hasUsedPlanMode && !hasDefaultMode;
      } catch (err) {
        return A(`Failed to check default-permission-mode-config tip relevance: ${err}`, {
          level: "warn"
        }), !1;
      }
    }
  }, {
    id: "git-worktrees",
    providerAgnostic: !0,
    content: async () => "Use git worktrees to run multiple Claude sessions in parallel.",
    cooldownSessions: 10,
    isRelevant: async () => {
      try {
        let config = Ot();
        return (await Uje()) <= 1 && config.numStartups > 50;
      } catch (err) {
        return !1;
      }
    }
  }, {
    id: "color-when-multi-clauding",
    providerAgnostic: !0,
    content: async () => "Running multiple Claude sessions? Use /color and /rename to tell them apart at a glance.",
    cooldownSessions: 10,
    isRelevant: async () => {
      if (cKt()) return !1;
      return (await jkt()) >= 2;
    }
  }, {
    id: "agents-view-multiclauding",
    priority: 3,
    providerAgnostic: !0,
    maxLifetimeShows: 5,
    cooldownSessions: 1,
    content: async tipCtx => {
      let highlight = wo("suggestion", tipCtx.theme);
      return `Running multiple Claude sessions? Run ${highlight("claude agents")} to see them all in one place \xB7 or press ${highlight(x5)} twice on an empty prompt when Claude is idle`;
    },
    isRelevant: async () => {
      if (!iDe()) return !1;
      let config = Ot();
      if (config.leftArrowOpensAgents === !1) return !1;
      if (Ws()) return !1;
      if (config.hasOpenedAgentsView || config.hasUsedAgentsFleet) return !1;
      return (await jkt()) >= 2;
    }
  }, {
    id: "terminal-setup",
    providerAgnostic: !0,
    content: async () => Ne.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable convenient terminal integration like Option + Enter for new line and more" : "Run /terminal-setup to enable convenient terminal integration like Shift + Enter for new line and more",
    cooldownSessions: 10,
    async isRelevant() {
      if (!H2e()) return !1;
      let config = Ot();
      if (Ne.terminal === "Apple_Terminal") return !config.optionAsMetaKeyInstalled;
      return !config.shiftEnterKeyBindingInstalled;
    }
  }, {
    id: "vscode-gpu-accel-garbled-glyphs",
    providerAgnostic: !0,
    maxLifetimeShows: 5,
    content: async () => "Corrupted terminal glyphs? Disable terminal GPU acceleration in settings or run /terminal-setup",
    cooldownSessions: 8,
    async isRelevant() {
      return xy();
    }
  }, {
    id: "shift-enter",
    providerAgnostic: !0,
    content: async () => Ne.terminal === "Apple_Terminal" ? "Press Option+Enter to send a multi-line message" : "Press Shift+Enter to send a multi-line message",
    cooldownSessions: 10,
    async isRelevant() {
      let config = Ot();
      return Boolean((Ne.terminal === "Apple_Terminal" ? config.optionAsMetaKeyInstalled : config.shiftEnterKeyBindingInstalled) && config.numStartups > 3);
    }
  }, {
    id: "shift-enter-setup",
    providerAgnostic: !0,
    content: async () => Ne.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable Option+Enter for new lines" : "Run /terminal-setup to enable Shift+Enter for new lines",
    cooldownSessions: 10,
    async isRelevant() {
      if (!H2e()) return !1;
      let config = Ot();
      return !(Ne.terminal === "Apple_Terminal" ? config.optionAsMetaKeyInstalled : config.shiftEnterKeyBindingInstalled);
    }
  }, {
    id: "memory-command",
    providerAgnostic: !0,
    content: async () => "Use /memory to view and manage Claude memory",
    cooldownSessions: 15,
    async isRelevant() {
      return Ot().memoryUsageCount <= 0;
    }
  }, {
    id: "theme-command",
    providerAgnostic: !0,
    content: async () => "Use /theme to change the color theme",
    cooldownSessions: 20,
    isRelevant: async () => !0
  }, {
    id: "colorterm-truecolor",
    providerAgnostic: !0,
    content: async () => "Try setting environment variable COLORTERM=truecolor for richer colors",
    cooldownSessions: 30,
    isRelevant: async () => !process.env.COLORTERM && bt.level < 3
  }, {
    id: "powershell-tool-env",
    providerAgnostic: !0,
    content: async () => "Set CLAUDE_CODE_USE_POWERSHELL_TOOL=1 to enable the PowerShell tool (preview)",
    cooldownSessions: 10,
    isRelevant: async () => Yt() === "windows" && process.env.CLAUDE_CODE_USE_POWERSHELL_TOOL === void 0
  }, {
    id: "status-line",
    providerAgnostic: !0,
    content: async () => "Use /statusline to set up a custom status line that will display beneath the input box",
    cooldownSessions: 25,
    isRelevant: async () => !eS() && $o().statusLine === void 0
  }, {
    id: "prompt-queue",
    providerAgnostic: !0,
    content: async () => "Hit Enter to queue up additional messages while Claude is working.",
    cooldownSessions: 5,
    async isRelevant() {
      return Ot().promptQueueUseCount <= 3;
    }
  }, {
    id: "enter-to-steer-in-relatime",
    providerAgnostic: !0,
    content: async () => "Send messages to Claude while it works to steer Claude in real-time",
    cooldownSessions: 20,
    isRelevant: async () => !0
  }, {
    id: "todo-list",
    providerAgnostic: !0,
    content: async () => "Ask Claude to create a todo list when working on complex tasks to track progress and remain on track",
    cooldownSessions: 20,
    isRelevant: async () => !0
  }, {
    id: "vscode-command-install",
    providerAgnostic: !0,
    content: async () => `Open the Command Palette (Cmd+Shift+P) and run "Shell Command: Install '${Ne.terminal === "vscode" ? "code" : Ne.terminal}' command in PATH" to enable IDE integration`,
    cooldownSessions: 0,
    async isRelevant() {
      if (!tFt()) return !1;
      if (Yt() !== "macos") return !1;
      switch (Ne.terminal) {
        case "vscode":
          return !(await saa());
        case "cursor":
          return !(await raa());
        case "windsurf":
          return !(await oaa());
        default:
          return !1;
      }
    }
  }, {
    id: "ide-upsell-external-terminal",
    providerAgnostic: !0,
    content: async () => "Connect Claude to your IDE \xB7 /ide",
    cooldownSessions: 4,
    async isRelevant() {
      if (cB()) return !1;
      if ((await sDn()).length !== 0) return !1;
      return (await iaa()).length > 0;
    }
  }, {
    id: "install-github-app",
    content: async () => "Run /install-github-app to tag @claude right from your Github issues and PRs",
    cooldownSessions: 10,
    isRelevant: async () => !Ot().githubActionSetupCount
  }, {
    id: "install-slack-app",
    content: async () => "Run /install-slack-app to use Claude in Slack",
    cooldownSessions: 10,
    isRelevant: async () => !Ot().slackAppInstallCount
  }, {
    id: "permissions",
    providerAgnostic: !0,
    content: async () => "Use /permissions to pre-approve and pre-deny bash, edit, and MCP tools",
    cooldownSessions: 10,
    async isRelevant() {
      return Ot().numStartups > 10;
    }
  }, {
    id: "drag-and-drop-images",
    providerAgnostic: !0,
    content: async () => "Did you know you can drag and drop image files into your terminal?",
    cooldownSessions: 10,
    isRelevant: async () => !Ne.isSSH()
  }, {
    id: "paste-images-mac",
    providerAgnostic: !0,
    content: async () => "Paste images into Claude Code using control+v (not cmd+v!)",
    cooldownSessions: 10,
    isRelevant: async () => Yt() === "macos"
  }, {
    id: "double-esc",
    providerAgnostic: !0,
    content: async () => "Double-tap esc to rewind the conversation to a previous point in time",
    cooldownSessions: 10,
    isRelevant: async () => !TT()
  }, {
    id: "double-esc-code-restore",
    providerAgnostic: !0,
    content: async () => "Double-tap esc to rewind the code and/or conversation to a previous point in time",
    cooldownSessions: 10,
    isRelevant: async () => TT()
  }, {
    id: "continue",
    providerAgnostic: !0,
    content: async () => "Run claude --continue or claude --resume to resume a conversation",
    cooldownSessions: 10,
    isRelevant: async () => !0
  }, {
    id: "rename-conversation",
    providerAgnostic: !0,
    content: async () => "Name your conversations with /rename to find them easily in /resume later",
    cooldownSessions: 15,
    isRelevant: async () => UTe() && Ot().numStartups > 10
  }, {
    id: "custom-commands",
    providerAgnostic: !0,
    content: async () => "Create skills by adding .md files to .claude/skills/ in your project or ~/.claude/skills/ for skills that work in any project",
    cooldownSessions: 15,
    async isRelevant() {
      let config = Ot();
      return !Vl("skills") && config.numStartups > 10 && !(await l2o("skills"));
    }
  }, {
    id: "shift-tab",
    providerAgnostic: !0,
    content: async () => `Hit ${KR("chat:cycleMode", "Chat", "shift+tab")} to cycle between default mode, auto-accept edit mode, and plan mode`,
    cooldownSessions: 10,
    isRelevant: async () => !0
  }, {
    id: "image-paste",
    providerAgnostic: !0,
    content: async () => `Use ${KR("chat:imagePaste", "Chat", "ctrl+v")} to paste images from your clipboard`,
    cooldownSessions: 20,
    isRelevant: async () => !0
  }, {
    id: "custom-agents",
    providerAgnostic: !0,
    content: async () => "Use /agents to optimize specific tasks. Eg. Software Architect, Code Writer, Code Reviewer",
    cooldownSessions: 15,
    async isRelevant() {
      let config = Ot();
      return !Vl("agents") && config.numStartups > 5 && !(await l2o("agents"));
    }
  }, {
    id: "agent-flag",
    providerAgnostic: !0,
    content: async () => "Use --agent <agent_name> to directly start a conversation with a subagent",
    cooldownSessions: 15,
    async isRelevant() {
      let config = Ot();
      return !Vl("agents") && config.numStartups > 5 && (await l2o("agents"));
    }
  }, {
    id: "desktop-app",
    content: async () => "Run Claude Code locally or remotely using the Claude desktop app: clau.de/desktop",
    cooldownSessions: 15,
    isRelevant: async () => !nOe() && Yt() !== "linux" && !(await $lc())
  }, {
    id: "desktop-shortcut",
    content: async tipCtx => `Continue your session in Claude Code Desktop with ${wo("suggestion", tipCtx.theme)("/desktop")}`,
    cooldownSessions: 15,
    isRelevant: async () => {
      if (!a2o().enable_shortcut_tip) return !1;
      return !0;
    }
  }, {
    id: "desktop-contextual",
    priority: 1,
    content: async tipCtx => {
      let highlight = wo("suggestion", tipCtx.theme);
      if (await $lc()) return `Working on UI? See a live preview in Claude Code Desktop \xB7 run ${highlight("/desktop")}`;
      return `Working on UI? Claude Code Desktop has live preview and inline images \xB7 ${highlight("clau.de/desktop")}`;
    },
    cooldownSessions: 15,
    isRelevant: async tipCtx => {
      if (!a2o().enable_contextual_tip) return !1;
      return qlc(tipCtx);
    }
  }, {
    id: "claude-design-contextual",
    priority: 1,
    content: async tipCtx => `Use Claude Design to mock up screens before you build \xB7 ${LD("https://claude.ai/design?utm_source=claude_code&utm_medium=tip&utm_campaign=tengu_cedar_plume", "claude.ai/design", {
      themeName: tipCtx.theme
    })}`,
    cooldownSessions: 15,
    isRelevant: async tipCtx => {
      if (!Eo()) return !1;
      if (!qlc(tipCtx)) return !1;
      return it("tengu_cedar_plume", !1);
    }
  }, {
    id: "web-app",
    content: async () => "Run tasks in the cloud while you keep coding locally \xB7 clau.de/web",
    cooldownSessions: 15,
    isRelevant: async () => !nOe()
  }, {
    id: "remote-control",
    content: async tipCtx => {
      let highlight = wo("suggestion", tipCtx.theme);
      return `Control this session from ${LD("https://claude.com/download#mobile", "the Claude mobile app", {
        themeName: tipCtx.theme
      })} \xB7 run ${highlight("/remote-control")}`;
    },
    cooldownSessions: 15,
    isRelevant: async () => AH() && !Ot().hasUsedRemoteControl && !sue()
  }, {
    id: "push-notif",
    content: async tipCtx => `Get pinged on your phone when long tasks finish \xB7 enable push notifications in ${wo("suggestion", tipCtx.theme)("/config")}`,
    cooldownSessions: 15,
    isRelevant: async () => zNl()
  }, {
    id: "voice-mode",
    content: async () => "Use /voice to enable push-to-talk dictation",
    cooldownSessions: 10,
    isRelevant: async () => t_t() && Fr().voiceEnabled === void 0 && !rA() && !nt(process.env.CLAUDE_CODE_REMOTE) && !Ne.isSSH()
  }, {
    id: "no-flicker",
    providerAgnostic: !0,
    content: async () => "Try the new fullscreen renderer \u2014 flicker-free output, mouse support, auto-copy on select \xB7 /tui fullscreen",
    cooldownSessions: 10,
    isRelevant: async () => !Cs() && Fr().tui === void 0 && Wzn()
  }, {
    id: "console-api-key",
    content: async tipCtx => `Build your AI product with Claude API. Run ${wo("suggestion", tipCtx.theme)("/claude-api")} to get started`,
    cooldownSessions: 15,
    isRelevant: async () => {
      if (!Eo() || !ese()) return !1;
      let config = Ot();
      if (config.primaryApiKey) return !1;
      if (config.customApiKeyResponses?.approved?.length) return !1;
      if (process.env.ANTHROPIC_API_KEY) return !1;
      if (config.numStartups <= 10) return !1;
      return it("tengu_kestrel_arch", "off") === "on";
    }
  }, {
    id: "c4e-desktop",
    content: async tipCtx => `Run Claude Code locally or remotely using the Claude desktop app \u2014 ${c2o(tipCtx)}`,
    cooldownSessions: 15,
    isRelevant: async () => {
      if (!nOe() || u2o("c4e-desktop")) return !1;
      return !0;
    }
  }, {
    id: "c4e-remote-sessions",
    content: async tipCtx => `Run tasks in the cloud while you keep coding locally \u2014 ${c2o(tipCtx)}`,
    cooldownSessions: 15,
    isRelevant: async () => nOe() && !u2o("c4e-remote-sessions")
  }, {
    id: "c4e-ultrareview",
    content: async tipCtx => `/ultrareview runs a deep, multi-agent review of your changes \u2014 ${c2o(tipCtx)}`,
    cooldownSessions: 15,
    isRelevant: async () => nOe() && !u2o("c4e-ultrareview")
  }, {
    id: "opusplan-mode-reminder",
    providerAgnostic: !0,
    content: async () => `Your default model setting is Opus Plan Mode. Press ${KR("chat:cycleMode", "Chat", "shift+tab")} twice to activate Plan Mode and plan with Claude Opus.`,
    cooldownSessions: 2,
    async isRelevant() {
      let config = Ot(),
        isOpusPlan = w3() === "opusplan",
        daysSincePlanMode = config.lastPlanModeUse ? (Date.now() - config.lastPlanModeUse) / 86400000 : 1 / 0;
      return isOpusPlan && daysSincePlanMode > 3;
    }
  }, {
    id: "frontend-design-plugin",
    priority: 1,
    providerAgnostic: !0,
    content: async tipCtx => `Working with HTML/CSS? Install the frontend-design plugin:
${wo("suggestion", tipCtx.theme)(`/plugin install frontend-design@${mw}`)}`,
    cooldownSessions: 3,
    isRelevant: async tipCtx => Glc("frontend-design", tipCtx, {
      filesRead: ["**/*.html", "**/*.css", "**/*.htm"]
    })
  }, {
    id: "subagent-fanout-nudge",
    providerAgnostic: !0,
    content: async tipCtx => `Say ${wo("suggestion", tipCtx.theme)('"fan out subagents"')} and Claude sends a team. Each one digs deep so nothing gets missed.`,
    cooldownSessions: 3,
    isRelevant: async () => !Eo()
  }, {
    id: "dynamic-workflows",
    providerAgnostic: !0,
    content: async tipCtx => `Dynamic workflows let Claude write a script that orchestrates many agents for you. Mention the keyword ${wo("suggestion", tipCtx.theme)("ultracode")} or ask Claude to use a workflow directly.`,
    cooldownSessions: 3,
    isRelevant: async () => hC()
  }, {
    id: "loop-command-nudge",
    providerAgnostic: !0,
    content: async tipCtx => `${wo("suggestion", tipCtx.theme)("/loop")} runs any prompt on a recurring schedule. Great for monitoring deploys, babysitting PRs, or polling status.`,
    cooldownSessions: 3,
    isRelevant: async () => {
      if (hG()) return !1;
      if (!ZF()) return !1;
      return !Eo();
    }
  }, {
    id: "plugin-disuse-review",
    providerAgnostic: !0,
    content: async tipCtx => {
      let highlight = wo("suggestion", tipCtx.theme),
        unusedPlugins = await xWt(),
        firstUnused = unusedPlugins[0];
      if (!firstUnused) return "";
      if (unusedPlugins.length === 1) return `You haven't used the ${bt.bold(firstUnused.name)} plugin in a while. It still adds startup and context cost \u2014 review it with ${highlight("/plugin")}`;
      return `You have ${unusedPlugins.length} plugins you haven't used in a while. They still add startup and context cost \u2014 review them with ${highlight("/plugin")}`;
    },
    cooldownSessions: 30,
    isRelevant: async () => (await xWt()).length > 0
  }, {
    id: "goal-command-nudge",
    content: async tipCtx => `Set an objective with ${wo("suggestion", tipCtx.theme)("/goal")} \u2014 Claude keeps working until it's met`,
    cooldownSessions: 3,
    isRelevant: async () => WBe()
  }, {
    id: "guest-passes",
    content: async tipCtx => {
      let highlight = wo("claude", tipCtx.theme),
        passCount = rgt();
      return passCount ? `Share Claude Code and earn ${highlight(ngt(passCount))} in usage credits \xB7 ${highlight("/passes")}` : `You have free guest passes to share \xB7 ${highlight("/passes")}`;
    },
    cooldownSessions: 3,
    isRelevant: async () => {
      if (Ot().hasVisitedPasses) return !1;
      let {
        eligible: eligible
      } = tgt();
      return eligible;
    }
  }, {
    id: "feedback-command",
    content: async () => "Use /feedback to help us improve!",
    cooldownSessions: 15,
    async isRelevant() {
      return Ot().numStartups > 5;
    }
  }, {
    id: "team-onboarding-share",
    content: async tipCtx => `Run ${wo("suggestion", tipCtx.theme)("/team-onboarding")} to turn your Claude usage into an onboarding guide \u2014 share it with your team in one link`,
    cooldownSessions: 5,
    async isRelevant() {
      let config = Ot();
      if (config.numStartups < 15) return !1;
      if (config.teamOnboardingLastUsedAt !== void 0 && Date.now() - config.teamOnboardingLastUsedAt < 2592000000) return !1;
      return gmt();
    }
  }], cGm = [];
});

export {Wlc,Glc,d2o,l2o,qlc,c2o,u2o,uGm,bnr,Snr,Myt,$lc,sGm,iGm,aGm,lGm,Vlc,cGm,p2o};
