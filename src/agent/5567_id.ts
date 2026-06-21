// @ts-nocheck
import {NP as MP,V6 as O6,hS as cS} from "../config/4438_source.ts";
import {nx as ZR,XUe as xUe} from "../../vendor/m2597.ts";
import {$q as Rq,Mk as Pk} from "../config/4439_operation.ts";
import {Lk as Dk,UIn as tIn,$In as nIn,nI as JH} from "../../vendor/m3252.ts";
import {V5n as s5n,G5n as o5n,njt as x6t} from "../../vendor/m4663.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {No as Uo,lwe as Kve} from "../../vendor/m2421.ts";
import {N6 as C6,D6 as T6} from "./5186_bigint.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {MRe as yRe,xk as Ck} from "../../vendor/m2715.ts";
import {MF as HF,s$e as N2e} from "../../vendor/m2801.ts";
import {pDe as z0e,J8n as u8n,v6t as Qqt} from "../../vendor/m4564.ts";
import {getInitialSettings as Kr,yr as Er,getSettings_DEPRECATED as es} from "../config/0740_updateSettingsForSource.ts";
import {Zat as Pat} from "../../vendor/m3822.ts";
import {getAPIProvider as Hr,isFirstPartyAnthropicBaseUrl as Gu,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {b} from "../../runtime.ts";
import {cu as au,_t as gt} from "../../vendor/m582.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {_6 as s6,vT as _T} from "../session/3862_trackSequence.ts";
import {cbo as oSo,pjt as B6t} from "./4686_days.ts";
import {Vk as qk,isBridgeEnabled as eH,isRunningInRemoteEnvironment as vW} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {Bpt as hpt,AJ as tJ} from "../../vendor/m4508.ts";
import {Cwe as cwe,shouldOfferTerminalSetup as lUe} from "../../vendor/m2517.ts";
import {BMo as RLo,_Qn as IXn} from "../tui/5566_onDone.ts";
import {oGn as gWn,rGn as hWn} from "../tui/4781_status.ts";
import {sl as rl,A8 as Xj} from "../../vendor/m715.ts";
import {XS as zS,Oy as Dy} from "../config/2341_XS.ts";
import {UZ as HZ,qw as Bw} from "../telemetry/2468_action.ts";
import {z5 as I5,IF as wF} from "../config/2700_isKairosCronEnabled.ts";
import {Ao as mo,isClaudeAISubscriber as Co,isMaxSubscriber as Woe,is1PApiCustomer as EBe} from "../config/2031_withOAuthRefreshLock.ts";
import {Iwo as wvo,oPe as UDe} from "../../vendor/m5004.ts";
import {hp as gp,Swt as Yvt,_i as wi} from "../session/1460_promise.ts";
import {Qn as nr,getGlobalConfig as vt,getRemoteControlAtStartup as Xce} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Zge as Bge,H_ as k_} from "../../vendor/m3951.ts";
import {Iy as ky,hc as Tc} from "./2230_explicitlyRequested.ts";
import {cyo as s_o,ayo as r_o} from "../core/4496_code.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an,YC as zC} from "../config/0047_namespace.ts";
import {Pp as tm,Ms as Ds} from "../config/2273_loggedTmuxCcDisable.ts";
import {Ba,getWorktreeCount as C7e} from "../../vendor/m693.ts";
import {L1 as v1,uE as lE} from "../../vendor/m2232.ts";
import {ab as ob,CMt as QLt,iea as WQi,oea as qQi,sea as jQi,FF as PF,hHn as Dkn,aea as GQi} from "../config/3178_path.ts";
import {Mo as Fo,getUserSpecifiedModelSetting as H7} from "../permissions/1453_swapShrinksContextWindow.ts";
import {qs as $s,zt as Yt} from "../../vendor/m635.ts";
import {ja as za,getCurrentSessionAgentColor as a5t,isCustomTitleEnabled as X_e} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {t5t as R8t,Nft as mft} from "../../vendor/m5100.ts";
import {ln as cn,isTmuxControlMode as Bt} from "../telemetry/0594_feature_name.ts";
import {zn as Yn,getFeatureValue_CACHED_MAY_BE_STALE as ut} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Lct as uct,WY as kY,l_e as Kge,yIe as tIe,Oct as cct} from "../telemetry/4037_level.ts";
import {Jje as Hje,Gmt as Smt,Wmt as Tmt,jmt as ymt} from "../../vendor/m4795.ts";
import {b4n as O3n,hdt as Vut} from "../telemetry/4297_content.ts";
import {D8t as o8t,SIl as Zkl} from "../../vendor/m5056.ts";
import {$2t as y2t,FLa as bOa,$La as COa,ULa as EOa,qLa as vOa,BLa as SOa} from "../artifact/3925_kind.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {st as rt} from "../../vendor/m5.ts";
// @ts-nocheck
async function modelKeyFromVertexId() {
  if (cachedVertexKeyMap !== undefined) return cachedVertexKeyMap;
  return cachedVertexKeyMap = await MP(), cachedVertexKeyMap;
}
async function runPendingProjectMcpApproval(pluginName, tipContext, relevanceOpts, marketplace = ZR) {
  if (!(await modelKeyFromVertexId())[marketplace]) return false;
  if (Rq(`${pluginName}@${marketplace}`)) return false;
  if (Dk(`${pluginName}@${marketplace}`)) return false;
  return (await s5n(relevanceOpts, tipContext)) !== null;
}
async function SCROLL_IDLE_DEBOUNCE_MS() {
  if (cachedMarketplaceTips !== undefined) return cachedMarketplaceTips;
  let marketplaceSet = new Set(tIn());
  if (marketplaceSet.size === 0) return cachedMarketplaceTips = [], cachedMarketplaceTips;
  let keyMap = await modelKeyFromVertexId(),
    tips = [];
  for (let marketplace of marketplaceSet) {
    let marketplaceKey = keyMap[marketplace];
    if (!marketplaceKey) continue;
    if (marketplace !== ZR && !nIn(marketplace, marketplaceKey.source)) {
      v(`Skipping plugin suggestion tips for marketplace "${marketplace}": its registered source is not declared in managed settings (extraKnownMarketplaces or strictKnownMarketplaces)`);
      continue;
    }
    let marketplaceData = await O6(marketplace).catch(() => null);
    if (!marketplaceData) continue;
    for (let plugin of marketplaceData.plugins) {
      let relevance = plugin.relevance,
        relevanceOpts = o5n(plugin.name, relevance);
      if (!relevanceOpts) continue;
      if (marketplace === ZR && BUILT_IN_TIPS.some(tip => tip.id === `${plugin.name}-plugin`)) continue;
      let displayName = relevance?.topic ?? plugin.name.split("-").map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : word).join("-"),
        tipId = marketplace === ZR ? `marketplace-plugin:${plugin.name}` : `marketplace-plugin:${plugin.name}@${marketplace}`;
      tips.push({
        id: tipId,
        pluginId: `${plugin.name}@${marketplace}`,
        priority: 1,
        providerAgnostic: true,
        cooldownSessions: 3,
        content: async tipCtx => {
          let highlight = Uo("suggestion", tipCtx.theme);
          return `Working with ${displayName}? Install the ${plugin.name} plugin:
${highlight(`/plugin install ${plugin.name}@${marketplace}`)}`;
        },
        isRelevant: async tipCtx => runPendingProjectMcpApproval(plugin.name, tipCtx, relevanceOpts, marketplace)
      });
    }
  }
  return cachedMarketplaceTips = tips, cachedMarketplaceTips;
}
async function emitSessionSwitch(dirName) {
  try {
    return (await C6(dirName, Pt())).length > 0;
  } catch (err) {
    return v(`hasUserDefined(${dirName}) failed: ${err}`), false;
  }
}
function hasUiRelatedContext(tipContext) {
  let {
    bashTools: bashTools,
    readFileState: readFileState
  } = tipContext ?? {};
  if (bashTools) {
    for (let tool of bashTools) if (WEB_DEV_SERVER_COMMANDS.has(tool)) return true;
  }
  if (readFileState) {
    for (let filePath of yRe(readFileState)) if (WEB_ASSET_FILE_PATTERN.test(filePath)) return true;
  }
  return false;
}
function revertRefusalFallbackOverride(tipContext) {
  return `available in Claude for Enterprise \xB7 ${HF("https://clau.de/enterprise", "Learn more", {
    themeName: tipContext.theme
  })}`;
}
function flushLastInteractionTime(tipId) {
  return C4E_TIP_IDS.some(id => id !== tipId && z0e(id) < C4E_COOLDOWN_SESSIONS);
}
function getCustomTips() {
  let override = Kr().spinnerTipsOverride;
  if (!override?.tips?.length) return [];
  return override.tips.map((text, idx) => ({
    id: `custom-tip-${idx}`,
    content: async () => text,
    cooldownSessions: 0,
    isRelevant: async () => true
  }));
}
async function la6(tipContext) {
  let initialSettings = Kr(),
    customTips = getCustomTips();
  if (Pat(initialSettings.spinnerTipsOverride)) return customTips;
  let allTipsCombined = [...BUILT_IN_TIPS, ...EXTRA_TIPS, ...(await SCROLL_IDLE_DEBOUNCE_MS())],
    filteredByProvider = Hr() !== "firstParty" || !Gu() ? allTipsCombined.filter(tip => tip.providerAgnostic) : allTipsCombined,
    relevanceResults = await Promise.all(filteredByProvider.map(tip => tip.isRelevant(tipContext)));
  return [...filteredByProvider.filter((tip, idx) => relevanceResults[idx]).filter(tip => z0e(tip.id) >= tip.cooldownSessions).filter(tip => tip.maxLifetimeShows === undefined || u8n(tip.id) < tip.maxLifetimeShows), ...customTips];
}
var cachedVertexKeyMap,
  cachedMarketplaceTips,
  modelKeyFromBedrockId,
  WEB_ASSET_FILE_PATTERN,
  WEB_DEV_SERVER_COMMANDS,
  C4E_TIP_IDS,
  C4E_COOLDOWN_SESSIONS = 5,
  BUILT_IN_TIPS,
  EXTRA_TIPS;
var spinnerTipsInit = b(() => {
  au();
  na();
  Ko();
  je();
  s6();
  Er();
  oSo();
  qk();
  hpt();
  cwe();
  RLo();
  Kve();
  gWn();
  rl();
  zS();
  HZ();
  I5();
  mo();
  wvo();
  gp();
  nr();
  Bge();
  ky();
  s_o();
  Or();
  an();
  Ck();
  tm();
  Ba();
  v1();
  N2e();
  ob();
  T6();
  Fo();
  si();
  $s();
  Pk();
  cS();
  xUe();
  JH();
  x6t();
  za();
  R8t();
  cn();
  Yn();
  uct();
  Hje();
  O3n();
  o8t();
  y2t();
  Qqt();
  modelKeyFromBedrockId = bn(() => r_o()), WEB_ASSET_FILE_PATTERN = /\.(html?|css|s[ac]ss|less|[jt]sx|vue|svelte|astro|png|jpe?g|gif|svg|webp|avif|ico)$/i, WEB_DEV_SERVER_COMMANDS = new Set(["vite", "next", "nuxt", "astro", "gatsby", "ng", "parcel", "webpack-dev-server", "serve", "http-server", "live-server", "browser-sync"]);
  C4E_TIP_IDS = ["c4e-desktop", "c4e-remote-sessions", "c4e-ultrareview"];
  BUILT_IN_TIPS = [{
    id: "team-artifacts",
    priority: 4,
    content: async () => {
      let e = await bOa().catch(t => (Bt("tips_team_artifact_show", t instanceof Error ? "content_scan_error" : "content_unknown_error"), []));
      if (e.length === 0) return "";
      return COa(e), EOa(), vOa(e);
    },
    cooldownSessions: 1,
    isRelevant: async () => SOa()
  }, {
    id: "fotw-campaign",
    priority: 4,
    content: async () => {
      let e = kY();
      if (!e?.command) return "";
      let t = Kge();
      if (!t) return "";
      let n = k_(t.amountMinorUnits, t.currency, "fit"),
        r = e.tipBlurb ? `/${e.command} ${e.tipBlurb}` : `/${e.command}`,
        o = e.tips?.[u8n("fotw-campaign") % e.tips.length] ?? "";
      if (o) return `${o} Try it for ${n} in usage credits.`;
      return `${e.titleLabel ?? "Feature of the week:"} ${r}. Try it for ${n} in usage credits.`;
    },
    cooldownSessions: 1,
    isRelevant: async () => tIe()
  }, {
    id: "fotw-campaign-upsell",
    priority: 4,
    content: async () => {
      let e = kY();
      if (!e?.command) return "";
      let t = e.tips?.[u8n("fotw-campaign-upsell") % e.tips.length] ?? "";
      if (t) return t;
      let n = e.tipBlurb ? `/${e.command} ${e.tipBlurb}` : `/${e.command}`;
      return `${e.titleLabel ?? "Feature of the week:"} ${n}.`;
    },
    cooldownSessions: 1,
    isRelevant: async () => cct()
  }, {
    id: "powerup-onboarding",
    priority: 3,
    providerAgnostic: true,
    content: async e => `New to Claude Code? Run ${Uo("suggestion", e.theme)("/powerup")} for a quick interactive tutorial`,
    cooldownSessions: 1,
    async isRelevant() {
      let e = vt();
      if (e.numStartups >= 10) return false;
      if (e.powerupsUnlocked?.length) return false;
      return ut("tengu_alder_compass", false);
    }
  }, {
    id: "new-user-warmup",
    priority: 2,
    providerAgnostic: true,
    content: async () => "Start with small features or bug fixes, tell Claude to propose a plan, and verify its suggested edits",
    cooldownSessions: 3,
    async isRelevant() {
      return vt().numStartups < 10;
    }
  }, {
    id: "plan-mode-for-complex-tasks",
    priority: 2,
    providerAgnostic: true,
    content: async () => `Use Plan Mode to prepare for a complex request before making changes. Press ${Bw("chat:cycleMode", "Chat", "shift+tab")} twice to enable.`,
    cooldownSessions: 5,
    isRelevant: async () => {
      let e = vt();
      return (e.lastPlanModeUse ? (Date.now() - e.lastPlanModeUse) / 86400000 : 1 / 0) > 7;
    }
  }, {
    id: "default-permission-mode-config",
    providerAgnostic: true,
    content: async () => "Use /config to change your default permission mode (including Plan Mode)",
    cooldownSessions: 10,
    isRelevant: async () => {
      try {
        let e = vt(),
          t = es(),
          n = Boolean(e.lastPlanModeUse),
          r = Boolean(t?.permissions?.defaultMode);
        return n && !r;
      } catch (e) {
        return v(`Failed to check default-permission-mode-config tip relevance: ${e}`, {
          level: "warn"
        }), false;
      }
    }
  }, {
    id: "git-worktrees",
    providerAgnostic: true,
    content: async () => "Use git worktrees to run multiple Claude sessions in parallel.",
    cooldownSessions: 10,
    isRelevant: async () => {
      try {
        let e = vt();
        return (await C7e()) <= 1 && e.numStartups > 50;
      } catch (e) {
        return false;
      }
    }
  }, {
    id: "color-when-multi-clauding",
    providerAgnostic: true,
    content: async () => "Running multiple Claude sessions? Use /color and /rename to tell them apart at a glance.",
    cooldownSessions: 10,
    isRelevant: async () => {
      if (a5t()) return false;
      return (await Yvt()) >= 2;
    }
  }, {
    id: "agents-view-multiclauding",
    priority: 3,
    providerAgnostic: true,
    maxLifetimeShows: 5,
    cooldownSessions: 1,
    content: async e => {
      let t = Uo("suggestion", e.theme);
      return `Running multiple Claude sessions? Run ${t("claude agents")} to see them all in one place \xB7 or press ${t(Xj)} twice on an empty prompt when Claude is idle`;
    },
    isRelevant: async () => {
      if (!tJ()) return false;
      let e = vt();
      if (e.leftArrowOpensAgents === false) return false;
      if (wi()) return false;
      if (e.hasOpenedAgentsView || e.hasUsedAgentsFleet) return false;
      return (await Yvt()) >= 2;
    }
  }, {
    id: "terminal-setup",
    providerAgnostic: true,
    content: async () => Ge.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable convenient terminal integration like Option + Enter for new line and more" : "Run /terminal-setup to enable convenient terminal integration like Shift + Enter for new line and more",
    cooldownSessions: 10,
    async isRelevant() {
      if (!lUe()) return false;
      let e = vt();
      if (Ge.terminal === "Apple_Terminal") return !e.optionAsMetaKeyInstalled;
      return !e.shiftEnterKeyBindingInstalled;
    }
  }, {
    id: "vscode-gpu-accel-garbled-glyphs",
    providerAgnostic: true,
    maxLifetimeShows: 5,
    content: async () => "Corrupted terminal glyphs? Disable terminal GPU acceleration in settings or run /terminal-setup",
    cooldownSessions: 8,
    async isRelevant() {
      return Dy();
    }
  }, {
    id: "shift-enter",
    providerAgnostic: true,
    content: async () => Ge.terminal === "Apple_Terminal" ? "Press Option+Enter to send a multi-line message" : "Press Shift+Enter to send a multi-line message",
    cooldownSessions: 10,
    async isRelevant() {
      let e = vt();
      return Boolean((Ge.terminal === "Apple_Terminal" ? e.optionAsMetaKeyInstalled : e.shiftEnterKeyBindingInstalled) && e.numStartups > 3);
    }
  }, {
    id: "shift-enter-setup",
    providerAgnostic: true,
    content: async () => Ge.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable Option+Enter for new lines" : "Run /terminal-setup to enable Shift+Enter for new lines",
    cooldownSessions: 10,
    async isRelevant() {
      if (!lUe()) return false;
      let e = vt();
      return !(Ge.terminal === "Apple_Terminal" ? e.optionAsMetaKeyInstalled : e.shiftEnterKeyBindingInstalled);
    }
  }, {
    id: "memory-command",
    providerAgnostic: true,
    content: async () => "Use /memory to view and manage Claude memory",
    cooldownSessions: 15,
    async isRelevant() {
      return vt().memoryUsageCount <= 0;
    }
  }, {
    id: "theme-command",
    providerAgnostic: true,
    content: async () => "Use /theme to change the color theme",
    cooldownSessions: 20,
    isRelevant: async () => true
  }, {
    id: "colorterm-truecolor",
    providerAgnostic: true,
    content: async () => "Try setting environment variable COLORTERM=truecolor for richer colors",
    cooldownSessions: 30,
    isRelevant: async () => !process.env.COLORTERM && gt.level < 3
  }, {
    id: "powershell-tool-env",
    providerAgnostic: true,
    content: async () => "Set CLAUDE_CODE_USE_POWERSHELL_TOOL=1 to enable the PowerShell tool (preview)",
    cooldownSessions: 10,
    isRelevant: async () => Yt() === "windows" && process.env.CLAUDE_CODE_USE_POWERSHELL_TOOL === undefined
  }, {
    id: "status-line",
    providerAgnostic: true,
    content: async () => "Use /statusline to set up a custom status line that will display beneath the input box",
    cooldownSessions: 25,
    isRelevant: async () => !lE() && es().statusLine === undefined
  }, {
    id: "prompt-queue",
    providerAgnostic: true,
    content: async () => "Hit Enter to queue up additional messages while Claude is working.",
    cooldownSessions: 5,
    async isRelevant() {
      return vt().promptQueueUseCount <= 3;
    }
  }, {
    id: "enter-to-steer-in-relatime",
    providerAgnostic: true,
    content: async () => "Send messages to Claude while it works to steer Claude in real-time",
    cooldownSessions: 20,
    isRelevant: async () => true
  }, {
    id: "todo-list",
    providerAgnostic: true,
    content: async () => "Ask Claude to create a todo list when working on complex tasks to track progress and remain on track",
    cooldownSessions: 20,
    isRelevant: async () => true
  }, {
    id: "vscode-command-install",
    providerAgnostic: true,
    content: async () => `Open the Command Palette (Cmd+Shift+P) and run "Shell Command: Install '${Ge.terminal === "vscode" ? "code" : Ge.terminal}' command in PATH" to enable IDE integration`,
    cooldownSessions: 0,
    async isRelevant() {
      if (!QLt()) return false;
      if (Yt() !== "macos") return false;
      switch (Ge.terminal) {
        case "vscode":
          return !(await WQi());
        case "cursor":
          return !(await qQi());
        case "windsurf":
          return !(await jQi());
        default:
          return false;
      }
    }
  }, {
    id: "ide-upsell-external-terminal",
    providerAgnostic: true,
    content: async () => "Connect Claude to your IDE \xB7 /ide",
    cooldownSessions: 4,
    async isRelevant() {
      if (PF()) return false;
      if ((await Dkn()).length !== 0) return false;
      return (await GQi()).length > 0;
    }
  }, {
    id: "install-github-app",
    content: async () => "Run /install-github-app to tag @claude right from your Github issues and PRs",
    cooldownSessions: 10,
    isRelevant: async () => !vt().githubActionSetupCount
  }, {
    id: "install-slack-app",
    content: async () => "Run /install-slack-app to use Claude in Slack",
    cooldownSessions: 10,
    isRelevant: async () => !vt().slackAppInstallCount
  }, {
    id: "permissions",
    providerAgnostic: true,
    content: async () => "Use /permissions to pre-approve and pre-deny bash, edit, and MCP tools",
    cooldownSessions: 10,
    async isRelevant() {
      return vt().numStartups > 10;
    }
  }, {
    id: "drag-and-drop-images",
    providerAgnostic: true,
    content: async () => "Did you know you can drag and drop image files into your terminal?",
    cooldownSessions: 10,
    isRelevant: async () => !Ge.isSSH()
  }, {
    id: "paste-images-mac",
    providerAgnostic: true,
    content: async () => "Paste images into Claude Code using control+v (not cmd+v!)",
    cooldownSessions: 10,
    isRelevant: async () => Yt() === "macos"
  }, {
    id: "double-esc",
    providerAgnostic: true,
    content: async () => "Double-tap esc to rewind the conversation to a previous point in time",
    cooldownSessions: 10,
    isRelevant: async () => !_T()
  }, {
    id: "double-esc-code-restore",
    providerAgnostic: true,
    content: async () => "Double-tap esc to rewind the code and/or conversation to a previous point in time",
    cooldownSessions: 10,
    isRelevant: async () => _T()
  }, {
    id: "continue",
    providerAgnostic: true,
    content: async () => "Run claude --continue or claude --resume to resume a conversation",
    cooldownSessions: 10,
    isRelevant: async () => true
  }, {
    id: "rename-conversation",
    providerAgnostic: true,
    content: async () => "Name your conversations with /rename to find them easily in /resume later",
    cooldownSessions: 15,
    isRelevant: async () => X_e() && vt().numStartups > 10
  }, {
    id: "custom-commands",
    providerAgnostic: true,
    content: async () => "Create skills by adding .md files to .claude/skills/ in your project or ~/.claude/skills/ for skills that work in any project",
    cooldownSessions: 15,
    async isRelevant() {
      let e = vt();
      return !Tc("skills") && e.numStartups > 10 && !(await emitSessionSwitch("skills"));
    }
  }, {
    id: "shift-tab",
    providerAgnostic: true,
    content: async () => `Hit ${Bw("chat:cycleMode", "Chat", "shift+tab")} to cycle between default mode, auto-accept edit mode, and plan mode`,
    cooldownSessions: 10,
    isRelevant: async () => true
  }, {
    id: "image-paste",
    providerAgnostic: true,
    content: async () => `Use ${Bw("chat:imagePaste", "Chat", "ctrl+v")} to paste images from your clipboard`,
    cooldownSessions: 20,
    isRelevant: async () => true
  }, {
    id: "custom-agents",
    providerAgnostic: true,
    content: async () => "Use /agents to optimize specific tasks. Eg. Software Architect, Code Writer, Code Reviewer",
    cooldownSessions: 15,
    async isRelevant() {
      let e = vt();
      return !Tc("agents") && e.numStartups > 5 && !(await emitSessionSwitch("agents"));
    }
  }, {
    id: "agent-flag",
    providerAgnostic: true,
    content: async () => "Use --agent <agent_name> to directly start a conversation with a subagent",
    cooldownSessions: 15,
    async isRelevant() {
      let e = vt();
      return !Tc("agents") && e.numStartups > 5 && (await emitSessionSwitch("agents"));
    }
  }, {
    id: "desktop-app",
    content: async () => "Run Claude Code locally or remotely using the Claude desktop app: clau.de/desktop",
    cooldownSessions: 15,
    isRelevant: async () => !UDe() && Yt() !== "linux" && !(await modelKeyFromBedrockId())
  }, {
    id: "desktop-shortcut",
    content: async e => `Continue your session in Claude Code Desktop with ${Uo("suggestion", e.theme)("/desktop")}`,
    cooldownSessions: 15,
    isRelevant: async () => {
      if (!IXn().enable_shortcut_tip) return false;
      return true;
    }
  }, {
    id: "desktop-contextual",
    priority: 1,
    content: async e => {
      let t = Uo("suggestion", e.theme);
      if (await modelKeyFromBedrockId()) return `Working on UI? See a live preview in Claude Code Desktop \xB7 run ${t("/desktop")}`;
      return `Working on UI? Claude Code Desktop has live preview and inline images \xB7 ${t("clau.de/desktop")}`;
    },
    cooldownSessions: 15,
    isRelevant: async e => {
      if (!IXn().enable_contextual_tip) return false;
      return hasUiRelatedContext(e);
    }
  }, {
    id: "claude-design-contextual",
    priority: 1,
    content: async e => `Use Claude Design to mock up screens before you build \xB7 ${HF("https://claude.ai/design?utm_source=claude_code&utm_medium=tip&utm_campaign=tengu_cedar_plume", "claude.ai/design", {
      themeName: e.theme
    })}`,
    cooldownSessions: 15,
    isRelevant: async e => {
      if (!Co()) return false;
      if (!hasUiRelatedContext(e)) return false;
      return ut("tengu_cedar_plume", false);
    }
  }, {
    id: "web-app",
    content: async () => "Run tasks in the cloud while you keep coding locally \xB7 clau.de/web",
    cooldownSessions: 15,
    isRelevant: async () => !UDe()
  }, {
    id: "remote-control",
    content: async e => {
      let t = Uo("suggestion", e.theme);
      return `Control this session from ${HF("https://claude.com/download#mobile", "the Claude mobile app", {
        themeName: e.theme
      })} \xB7 run ${t("/remote-control")}`;
    },
    cooldownSessions: 15,
    isRelevant: async () => eH() && !vt().hasUsedRemoteControl && !Xce()
  }, {
    id: "push-notif",
    content: async e => `Get pinged on your phone when long tasks finish \xB7 enable push notifications in ${Uo("suggestion", e.theme)("/config")}`,
    cooldownSessions: 15,
    isRelevant: async () => Zkl()
  }, {
    id: "voice-mode",
    content: async () => "Use /voice to enable push-to-talk dictation",
    cooldownSessions: 10,
    isRelevant: async () => mft() && Kr().voiceEnabled === undefined && !zC() && !rt(process.env.CLAUDE_CODE_REMOTE) && !Ge.isSSH()
  }, {
    id: "no-flicker",
    providerAgnostic: true,
    content: async () => "Try the new fullscreen renderer \u2014 flicker-free output, mouse support, auto-copy on select \xB7 /tui fullscreen",
    cooldownSessions: 10,
    isRelevant: async () => !Ds() && Kr().tui === undefined && hWn()
  }, {
    id: "console-api-key",
    content: async e => `Build your AI product with Claude API. Run ${Uo("suggestion", e.theme)("/claude-api")} to get started`,
    cooldownSessions: 15,
    isRelevant: async () => {
      if (!Co() || !Woe()) return false;
      let e = vt();
      if (e.primaryApiKey) return false;
      if (e.customApiKeyResponses?.approved?.length) return false;
      if (process.env.ANTHROPIC_API_KEY) return false;
      if (e.numStartups <= 10) return false;
      return ut("tengu_kestrel_arch", "off") === "on";
    }
  }, {
    id: "c4e-desktop",
    content: async e => `Run Claude Code locally or remotely using the Claude desktop app \u2014 ${revertRefusalFallbackOverride(e)}`,
    cooldownSessions: 15,
    isRelevant: async () => {
      if (!UDe() || flushLastInteractionTime("c4e-desktop")) return false;
      return true;
    }
  }, {
    id: "c4e-remote-sessions",
    content: async e => `Run tasks in the cloud while you keep coding locally \u2014 ${revertRefusalFallbackOverride(e)}`,
    cooldownSessions: 15,
    isRelevant: async () => UDe() && !flushLastInteractionTime("c4e-remote-sessions")
  }, {
    id: "c4e-ultrareview",
    content: async e => `/ultrareview runs a deep, multi-agent review of your changes \u2014 ${revertRefusalFallbackOverride(e)}`,
    cooldownSessions: 15,
    isRelevant: async () => UDe() && !flushLastInteractionTime("c4e-ultrareview")
  }, {
    id: "opusplan-mode-reminder",
    providerAgnostic: true,
    content: async () => `Your default model setting is Opus Plan Mode. Press ${Bw("chat:cycleMode", "Chat", "shift+tab")} twice to activate Plan Mode and plan with Claude Opus.`,
    cooldownSessions: 2,
    async isRelevant() {
      let e = vt(),
        n = H7() === "opusplan",
        r = e.lastPlanModeUse ? (Date.now() - e.lastPlanModeUse) / 86400000 : 1 / 0;
      return n && r > 3;
    }
  }, {
    id: "frontend-design-plugin",
    priority: 1,
    providerAgnostic: true,
    content: async e => `Working with HTML/CSS? Install the frontend-design plugin:
${Uo("suggestion", e.theme)(`/plugin install frontend-design@${ZR}`)}`,
    cooldownSessions: 3,
    isRelevant: async e => runPendingProjectMcpApproval("frontend-design", e, {
      filesRead: ["**/*.html", "**/*.css", "**/*.htm"]
    })
  }, {
    id: "subagent-fanout-nudge",
    providerAgnostic: true,
    content: async e => `Say ${Uo("suggestion", e.theme)('"fan out subagents"')} and Claude sends a team. Each one digs deep so nothing gets missed.`,
    cooldownSessions: 3,
    isRelevant: async () => !Co()
  }, {
    id: "loop-command-nudge",
    providerAgnostic: true,
    content: async e => `${Uo("suggestion", e.theme)("/loop")} runs any prompt on a recurring schedule. Great for monitoring deploys, babysitting PRs, or polling status.`,
    cooldownSessions: 3,
    isRelevant: async () => {
      if (vW()) return false;
      if (!wF()) return false;
      return !Co();
    }
  }, {
    id: "plugin-disuse-review",
    providerAgnostic: true,
    content: async e => {
      let t = Uo("suggestion", e.theme),
        n = await B6t(),
        r = n[0];
      if (!r) return "";
      if (n.length === 1) return `You haven't used the ${gt.bold(r.name)} plugin in a while. It still adds startup and context cost \u2014 review it with ${t("/plugin")}`;
      return `You have ${n.length} plugins you haven't used in a while. They still add startup and context cost \u2014 review them with ${t("/plugin")}`;
    },
    cooldownSessions: 30,
    isRelevant: async () => (await B6t()).length > 0
  }, {
    id: "goal-command-nudge",
    content: async e => `Set an objective with ${Uo("suggestion", e.theme)("/goal")} \u2014 Claude keeps working until it's met`,
    cooldownSessions: 3,
    isRelevant: async () => EBe()
  }, {
    id: "guest-passes",
    content: async e => {
      let t = Uo("claude", e.theme),
        n = Smt();
      return n ? `Share Claude Code and earn ${t(Tmt(n))} in usage credits \xB7 ${t("/passes")}` : `You have free guest passes to share \xB7 ${t("/passes")}`;
    },
    cooldownSessions: 3,
    isRelevant: async () => {
      if (vt().hasVisitedPasses) return false;
      let {
        eligible: t
      } = ymt();
      return t;
    }
  }, {
    id: "feedback-command",
    content: async () => "Use /feedback to help us improve!",
    cooldownSessions: 15,
    async isRelevant() {
      return vt().numStartups > 5;
    }
  }, {
    id: "team-onboarding-share",
    content: async e => `Run ${Uo("suggestion", e.theme)("/team-onboarding")} to turn your Claude usage into an onboarding guide \u2014 share it with your team in one link`,
    cooldownSessions: 5,
    async isRelevant() {
      let e = vt();
      if (e.numStartups < 15) return false;
      if (e.teamOnboardingLastUsedAt !== undefined && Date.now() - e.teamOnboardingLastUsedAt < 2592000000) return false;
      return Vut();
    }
  }], EXTRA_TIPS = [];
});

export {modelKeyFromVertexId as nec,runPendingProjectMcpApproval as rec,SCROLL_IDLE_DEBOUNCE_MS as qMo,emitSessionSwitch as FMo,hasUiRelatedContext as tec,revertRefusalFallbackOverride as UMo,flushLastInteractionTime as $Mo,getCustomTips as L2m,la6 as TQn,cachedVertexKeyMap as yQn,cachedMarketplaceTips as Aht,modelKeyFromBedrockId as eec,WEB_ASSET_FILE_PATTERN as H2m,WEB_DEV_SERVER_COMMANDS as I2m,C4E_TIP_IDS as D2m,C4E_COOLDOWN_SESSIONS as P2m,BUILT_IN_TIPS as oec,EXTRA_TIPS as O2m,spinnerTipsInit as jMo};
