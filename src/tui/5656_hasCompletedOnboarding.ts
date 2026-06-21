// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,checkHasTrustDialogAccepted,getCustomApiKeyStatus,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {oDo,m2l,iDo} from "../../vendor/m5224.ts";
import {ONn,kat} from "../../vendor/m3763.ts";
import {Oe,Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {fs} from "../api/0459_getOauthConfig.ts";
import {ze,_F} from "../../vendor/m2452.ts";
import {qV,o3o} from "../../vendor/m229.ts";
import {ym,yNt,gracefulShutdown,gracefulShutdownSync} from "../config/3332_flushAnalyticsSinks.ts";
import {j6e,s6n} from "../config/4391_stopRendezvousServer.ts";
import {AppStateProvider,Jq} from "../../vendor/m3354.ts";
import {KeybindingSetup,xW} from "../../vendor/m3346.ts";
import {startDeferredPrefetches,EVt} from "../permissions/5725_startDeferredPrefetches.ts";
import {_i,hp} from "../session/1460_promise.ts";
import {setSessionTrustAccepted,getIsRemoteMode,getAllowedChannels,setAllowedChannels,setHasDevChannels,lt,jde,setStatsStore} from "../session/0131_sent.ts";
import {resetGrowthBook,initializeGrowthBook,checkGate_CACHED_OR_BLOCKING,getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {De,Rn} from "../session/0615_length.ts";
import {_o,bt} from "../../vendor/m195.ts";
import {hE,dq} from "../config/2722_duration_ms.ts";
import {jJ,yAt} from "../config/5198_ANTHROPIC_UNIX_SOCKET.ts";
import {bWt,DDo} from "../config/5254_level.ts";
import {st,Qe,TBo} from "../../vendor/m5.ts";
import {je} from "../../vendor/m577.ts";
import {roc,noc} from "./5643_SkippableStep.ts";
import {Xye,bAt} from "../../vendor/m5237.ts";
import {Coc,Eoc} from "./5645_TrustDialog.ts";
import {ax,gg} from "../agent/4445_resolvePluginRoot.ts";
import {tve,JQ} from "../../vendor/m2034.ts";
import {withTimeout,xwt} from "../telemetry/1483_withTimeout.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {shouldShowClaudeMdExternalIncludesWarning,getExternalClaudeMdIncludes,getMemoryFiles,zw} from "../config/2717_stripHtmlComments.ts";
import {jyo,Oil} from "./4527_recordExternalIncludesDecision.ts";
import {Nrc,T1o,gVt} from "../../vendor/m5636.ts";
import {Orc,Lrc} from "../../vendor/m5635.ts";
import {dp,YC,sn} from "../config/0047_namespace.ts";
import {hqn,Aqn} from "../telemetry/4354_stopMemoryWatcher.ts";
import {bst,Est} from "../telemetry/3337_level.ts";
import {zvo,Evl} from "./4919_PrivacySettingsDialog.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {$mt,W_l} from "../../vendor/m4779.ts";
import {xoc,Roc} from "./5646_ProTrialStartScreen.ts";
import {uGn,myl} from "../agent/4789_resolvePowerupDiscoveryArm.ts";
import {Doc,Ioc} from "../telemetry/5647_PowerupDiscoveryStep.ts";
import {getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {MB,eYe} from "../../vendor/m1292.ts";
import {b1o,Wrc} from "../../vendor/m5638.ts";
import {hasSkipDangerousModePermissionPrompt,hasAutoModeOptIn,yr,y7} from "../config/0740_updateSettingsForSource.ts";
import {Loc,Ooc} from "./5648_BypassPermissionsModeDialog.ts";
import {hJn,KPo} from "./5334_AutoModeOptInDialog.ts";
import {xut,Wqa} from "../telemetry/4165_isChannelsEnabled.ts";
import {Gqe,Vqa} from "../../vendor/m4165.ts";
import {Boc,Noc} from "../../vendor/m5648.ts";
import {$oc,Uoc} from "../computer-use/5650_ClaudeInChromeOnboarding.ts";
import {rye,SSo} from "../permissions/4648_shouldSuppressChromeOffer.ts";
import {px,CQi} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {oL,C0i} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {Woc,joc} from "./5651_ChromeAutoEnableDialog.ts";
import {R1o,w1o} from "../api/5652_upgradeKey.ts";
import {k1o,x1o} from "../../vendor/m5652.ts";
import {kUt,xUt} from "../../vendor/m3856.ts";
import {D1o,I1o} from "../api/5654_vertexUpgradeKey.ts";
import {Joc,Yoc} from "../api/5655_probeMantleModel.ts";
import {Mo,jun} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getBaseRenderOptions,zee} from "../telemetry/3356_getBaseRenderOptions.ts";
import {UDo,$Do} from "../../vendor/m5265.ts";
import {pF,XS} from "../config/2341_XS.ts";
import {b,M} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {Te} from "../../vendor/m2253.ts";
function A3m() {
  saveGlobalConfig((e: any) => ({
    ...e,
    hasCompletedOnboarding: !0,
    lastOnboardingVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION
  }));
}
function bht(inkInstance: any, renderFn: any) {
  return new Promise((resolve: any) => {
    let onDone = (result: any) => void resolve(result);
    inkInstance.render(renderFn(onDone));
  });
}
async function Qoc(inkInstance: any) {
  let pendingData = await oDo(),
    settingsErrors = ONn();
  if (pendingData.pendingServers.length === 0) return null;
  if (settingsErrors.length === 0) {
    let approvalResult: any;
    try {
      approvalResult = await m2l(inkInstance, pendingData);
    } catch (err: any) {
      throw Oe("mcp_project_approval_dialog", "mcp_project_approval_dialog_threw"), err;
    }
    if (approvalResult.persistFailed) return Oe("mcp_project_approval_dialog", "mcp_approval_persist_failed"), {
      key: "mcp-approval-persist-failed",
      text: "one or more of your MCP server choices could not be saved (check permissions on .claude/settings.local.json) \xB7 you will be asked again next startup"
    };
    return Ie("mcp_project_approval_dialog"), null;
  }
  let errorFiles = fs(settingsErrors.map((errEntry: any) => errEntry.file).filter(Boolean)).join(", ");
  return isTmuxControlMode("mcp_project_approval_dialog", "mcp_project_approval_skipped_settings_errors"), {
    key: "mcp-approval-skipped",
    text: `skipping .mcp.json server approval (settings errors${errorFiles ? ` in ${errorFiles}` : ""}) \xB7 run /doctor and fix them, then restart`
  };
}
async function tB(inkInstance: any, message: any, beforeExit: any) {
  return h3m(inkInstance, message, {
    color: "error",
    beforeExit
  });
}
async function h3m(inkInstance: any, message: any, opts: any) {
  let {
      Text: TextComp
    } = await Promise.resolve().then(() => (ze(), _F)),
    color = opts?.color,
    exitCode = opts?.exitCode ?? 1;
  if (inkInstance.render(color ? Db.default.createElement(TextComp, {
    color
  }, message) : Db.default.createElement(TextComp, null, message)), inkInstance.unmount(), await opts?.beforeExit?.(), exitCode !== 0) {
    let {
      setBgExitCause: setBgExitCause
    } = await Promise.resolve().then(() => (qV(), o3o));
    setBgExitCause("exit_with_message");
  }
  let {
    flushAnalyticsSinks: flushAnalyticsSinks
  } = await Promise.resolve().then(() => (ym(), yNt));
  await flushAnalyticsSinks(), process.exit(exitCode);
}
function CM(inkInstance: any, renderFn: any, options: any) {
  let startupBlockedPromise = process.env.CLAUDE_JOB_DIR ? Promise.resolve().then(() => (j6e(), s6n)).then((mod: any) => mod.markStartupDialogBlocked()).catch(() => {
      return;
    }) : void 0,
    dialogPromise = bht(inkInstance, (onDone: any) => Db.default.createElement(AppStateProvider, {
      onChangeAppState: options?.onChangeAppState
    }, Db.default.createElement(KeybindingSetup, null, renderFn(onDone))));
  if (!startupBlockedPromise) return dialogPromise;
  return dialogPromise.finally(() => startupBlockedPromise.then((blockToken: any) => blockToken ? Promise.resolve().then(() => (j6e(), s6n)).then((mod: any) => mod.clearStartupDialogBlocked(blockToken)) : void 0).catch(() => {}));
}
async function k5e(inkInstance: any, appElement: any) {
  inkInstance.render(appElement), startDeferredPrefetches(), await inkInstance.waitUntilExit(), await gracefulShutdown(0);
}
async function tsc(inkInstance: any, permMode: any, isDangerousMode: any, commands: any, hasChromeExtension: any, devChannels: any, offerChromeAutoEnable: any) {
  let mcpApprovalWarning: any = null;
  if (_i()) return setSessionTrustAccepted(!0), resetGrowthBook(), initializeGrowthBook().catch((err: any) => De(_o(err))), hE(), mcpApprovalWarning = await Qoc(inkInstance), jJ(), setImmediate(() => bWt()), {
    onboardingShown: !1,
    mcpApprovalSkipWarning: mcpApprovalWarning,
    claudeInChromeAccepted: !1
  };
  if (st(!1) || process.env.IS_DEMO) return {
    onboardingShown: !1,
    mcpApprovalSkipWarning: mcpApprovalWarning,
    claudeInChromeAccepted: !1
  };
  let globalConfig = getGlobalConfig(),
    onboardingWasShown = !1;
  if (!globalConfig.hasCompletedOnboarding || je.CLAUDE_CODE_POWERUP_ONBOARDING === "banner" || je.CLAUDE_CODE_POWERUP_ONBOARDING === "step") {
    onboardingWasShown = !0;
    let {
      Onboarding: OnboardingComp
    } = await Promise.resolve().then(() => (roc(), noc));
    await CM(inkInstance, (onDone: any) => Db.default.createElement(OnboardingComp, {
      onDone: () => {
        A3m(), onDone();
      }
    }), {
      onChangeAppState: Xye
    });
  }
  let trustDialogWasShown = !1;
  if (!je.CLAUBBIT) {
    if (!checkHasTrustDialogAccepted()) {
      trustDialogWasShown = !0;
      let {
        TrustDialog: TrustDialogComp
      } = await Promise.resolve().then(() => (Coc(), Eoc));
      await CM(inkInstance, (onDone: any) => Db.default.createElement(TrustDialogComp, {
        commands,
        onDone
      }));
    }
    if (setSessionTrustAccepted(!0), trustDialogWasShown) ax("post-trust: re-discover project @skills-dir plugins");
    if (resetGrowthBook(), !globalConfig.hasCompletedOnboarding) {
      tve();
      let gbStartTime = Date.now();
      try {
        await withTimeout(initializeGrowthBook(), g3m, Zoc), logForDebugging(`[STARTUP] post-onboarding GB await ${Date.now() - gbStartTime}ms`);
      } catch (err: any) {
        if (logForDebugging(`[STARTUP] post-onboarding GB await ${Date.now() - gbStartTime}ms: ${err}`, {
          level: "warn"
        }), !(err instanceof Error && err.message === Zoc)) De(_o(err));
      }
    } else initializeGrowthBook().catch((err: any) => De(_o(err)));
    if (hE(), mcpApprovalWarning = await Qoc(inkInstance), await shouldShowClaudeMdExternalIncludesWarning()) {
      let externalIncludes = getExternalClaudeMdIncludes(await getMemoryFiles(!0)),
        {
          ClaudeMdExternalIncludesDialog: ExternalIncludesDialogComp
        } = await Promise.resolve().then(() => (jyo(), Oil));
      await CM(inkInstance, (onDone: any) => Db.default.createElement(ExternalIncludesDialogComp, {
        onDone,
        isStandaloneDialog: !0,
        externalIncludes
      }));
    }
  }
  if (Nrc(), Orc(), jJ(), trustDialogWasShown) {
    if (!getIsRemoteMode() && !dp()) Promise.resolve().then(() => (hqn(), Aqn)).then((mod: any) => mod.startMemoryWatcher());
  }
  if (setImmediate(() => bWt()), await bst()) {
    let {
      GroveDialog: GroveDialogComp
    } = await Promise.resolve().then(() => (zvo(), Evl));
    if ((await CM(inkInstance, (onDone: any) => Db.default.createElement(GroveDialogComp, {
      showIfAlreadyViewed: !1,
      location: onboardingWasShown ? "onboarding" : "policy_update_modal",
      onDone
    }))) === "escape") return logEvent("tengu_grove_policy_exited", {}), gracefulShutdownSync(0), {
      onboardingShown: !1,
      mcpApprovalSkipWarning: mcpApprovalWarning,
      claudeInChromeAccepted: !1
    };
  }
  {
    let {
      getProTrialState: getProTrialState
    } = await Promise.resolve().then(() => ($mt(), W_l));
    if (getProTrialState().status === "not_started") {
      let {
        ProTrialStartScreen: ProTrialStartScreenComp
      } = await Promise.resolve().then(() => (xoc(), Roc));
      logEvent("tengu_pro_trial_start_screen_shown", {}), await CM(inkInstance, (onDone: any) => Db.default.createElement(ProTrialStartScreenComp, {
        onDone
      }));
    }
  }
  if (onboardingWasShown) {
    let {
      resolvePowerupDiscoveryArm: resolvePowerupDiscoveryArm
    } = await Promise.resolve().then(() => (uGn(), myl));
    if (resolvePowerupDiscoveryArm() === "step") {
      let {
        PowerupDiscoveryStep: PowerupDiscoveryStepComp
      } = await Promise.resolve().then(() => (Doc(), Ioc));
      await CM(inkInstance, (onDone: any) => Db.default.createElement(PowerupDiscoveryStepComp, {
        onDone
      }));
    }
  }
  if (process.env.ANTHROPIC_API_KEY && !YC() && getAPIProvider() === "firstParty") {
    let truncatedKey = MB(process.env.ANTHROPIC_API_KEY);
    if (getCustomApiKeyStatus(truncatedKey) === "new") {
      let {
        ApproveApiKey: ApproveApiKeyComp
      } = await Promise.resolve().then(() => (b1o(), Wrc));
      await CM(inkInstance, (onDone: any) => Db.default.createElement(ApproveApiKeyComp, {
        customApiKeyTruncated: truncatedKey,
        onDone
      }), {
        onChangeAppState: Xye
      });
    }
  }
  try {
    await _3m(inkInstance);
  } catch (err: any) {
    De(err);
  }
  try {
    await y3m(inkInstance);
  } catch (err: any) {
    De(err);
  }
  try {
    await T3m(inkInstance);
  } catch (err: any) {
    De(err);
  }
  try {
    await S3m(inkInstance);
  } catch (err: any) {
    De(err);
  }
  try {
    await b3m(inkInstance);
  } catch (err: any) {
    De(err);
  }
  if ((permMode === "bypassPermissions" || isDangerousMode) && !hasSkipDangerousModePermissionPrompt()) {
    let {
      BypassPermissionsModeDialog: BypassPermissionsModeDialogComp
    } = await Promise.resolve().then(() => (Loc(), Ooc));
    await CM(inkInstance, (onDone: any) => Db.default.createElement(BypassPermissionsModeDialogComp, {
      onAccept: onDone
    }));
  }
  if (permMode === "auto" && !hasAutoModeOptIn()) {
    let {
      AutoModeOptInDialog: AutoModeOptInDialogComp
    } = await Promise.resolve().then(() => (hJn(), KPo));
    await CM(inkInstance, (onDone: any) => Db.default.createElement(AutoModeOptInDialogComp, {
      onAccept: onDone,
      onDecline: () => gracefulShutdownSync(1),
      declineExits: !0
    }));
  }
  if (getAllowedChannels().length > 0 || (devChannels?.length ?? 0) > 0) await checkGate_CACHED_OR_BLOCKING("tengu_harbor");
  if (devChannels && devChannels.length > 0) {
    let [{
      isChannelsEnabled: isChannelsEnabled
    }, {
      isChannelsPolicyBlocked: isChannelsPolicyBlocked
    }, {
      getSettingsForSource: getSettingsForSource
    }] = await Promise.all([Promise.resolve().then(() => (xut(), Wqa)), Promise.resolve().then(() => (Gqe(), Vqa)), Promise.resolve().then(() => (yr(), y7))]);
    if (!isChannelsEnabled() || getAPIProvider() !== "firstParty" || isChannelsPolicyBlocked(getSettingsForSource("policySettings"))) setAllowedChannels([...getAllowedChannels(), ...devChannels.map((ch: any) => ({
      ...ch,
      dev: !0
    }))]), setHasDevChannels(!0);else {
      let {
        DevChannelsDialog: DevChannelsDialogComp
      } = await Promise.resolve().then(() => (Boc(), Noc));
      await CM(inkInstance, (onDone: any) => Db.default.createElement(DevChannelsDialogComp, {
        channels: devChannels,
        onAccept: () => {
          setAllowedChannels([...getAllowedChannels(), ...devChannels.map((ch: any) => ({
            ...ch,
            dev: !0
          }))]), setHasDevChannels(!0), onDone();
        }
      }));
    }
  }
  if (hasChromeExtension && !getGlobalConfig().hasCompletedClaudeInChromeOnboarding) {
    let {
      ClaudeInChromeOnboarding: ClaudeInChromeOnboardingComp
    } = await Promise.resolve().then(() => ($oc(), Uoc));
    await CM(inkInstance, (onDone: any) => Db.default.createElement(ClaudeInChromeOnboardingComp, {
      onDone
    }));
  }
  let chromeAutoEnableAccepted = !1;
  if (offerChromeAutoEnable) {
    let {
        isChromeExtensionInstalled: isChromeExtensionInstalled
      } = await Promise.resolve().then(() => (rye(), SSo)),
      isInstalled = await withTimeout(isChromeExtensionInstalled(), 1500, "chrome extension scan timed out before offer").catch(() => !0),
      alreadyPaired = Boolean(getGlobalConfig().chromeExtension?.pairedDeviceId);
    if (isInstalled || alreadyPaired) {
      await withTimeout(initializeGrowthBook().catch(() => {}), 1500, "GrowthBook init timed out before chrome offer").catch(() => {});
      let chromeAutoEnableFlag = getFeatureValue_CACHED_MAY_BE_STALE("tengu_chrome_auto_enable", !1),
        decisionAlreadyRecorded = getGlobalConfig().claudeInChromeDefaultEnabled !== void 0,
        {
          doesEnterpriseMcpConfigExist: doesEnterpriseMcpConfigExist,
          isMcpServerDenied: isMcpServerDenied
        } = await Promise.resolve().then(() => (px(), CQi)),
        {
          CLAUDE_IN_CHROME_MCP_SERVER_NAME: CHROME_MCP_SERVER_NAME
        } = await Promise.resolve().then(() => (oL(), C0i)),
        {
          getClaudeInChromeMcpServerConfig: getClaudeInChromeMcpServerConfig
        } = await Promise.resolve().then(() => (rye(), SSo));
      if (doesEnterpriseMcpConfigExist() || isMcpServerDenied(CHROME_MCP_SERVER_NAME, getClaudeInChromeMcpServerConfig())) logForDebugging("[Claude in Chrome] Skipping offer: blocked by enterprise MCP config or managed deniedMcpServers policy");else if (decisionAlreadyRecorded) logForDebugging("[Claude in Chrome] Skipping offer: decision already recorded (another instance answered)"), chromeAutoEnableAccepted = getGlobalConfig().claudeInChromeDefaultEnabled === !0;else if (chromeAutoEnableFlag) {
        let {
          ChromeAutoEnableDialog: ChromeAutoEnableDialogComp
        } = await Promise.resolve().then(() => (Woc(), joc));
        chromeAutoEnableAccepted = await CM(inkInstance, (onDone: any) => Db.default.createElement(ChromeAutoEnableDialogComp, {
          onDone,
          isDontAskMode: permMode === "dontAsk",
          isAutoMode: permMode === "auto"
        }));
      } else logForDebugging("[Claude in Chrome] Skipping offer: tengu_chrome_auto_enable no longer set (stale GB cache)");
    } else logForDebugging("[Claude in Chrome] Skipping offer: extension not present locally (stale cache)");
  }
  return {
    onboardingShown: onboardingWasShown,
    mcpApprovalSkipWarning: mcpApprovalWarning,
    claudeInChromeAccepted: chromeAutoEnableAccepted
  };
}
async function bVt(label: any, probePromise: any) {
  let timeoutHandle: any;
  try {
    return await Promise.race([probePromise, new Promise((resolve: any) => {
      timeoutHandle = setTimeout((resolveFn: any, lbl: any) => {
        logForDebugging(`[3p-probe] ${lbl} hit ${esc}ms deadline; proceeding without it`), resolveFn([]);
      }, esc, resolve, label);
    })]);
  } finally {
    clearTimeout(timeoutHandle);
  }
}
async function _3m(inkInstance: any) {
  let {
      findBedrockUpgradeCandidates: findBedrockUpgradeCandidates,
      upgradeKey: upgradeKey
    } = await Promise.resolve().then(() => (R1o(), w1o)),
    candidates = await bVt("bedrock-upgrade", findBedrockUpgradeCandidates());
  if (candidates.length === 0) return;
  let declinedUpgrades = getGlobalConfig().bedrockDeclinedUpgrades ?? {},
    pendingCandidates = candidates.filter((candidate: any) => declinedUpgrades[candidate.tier] !== upgradeKey(candidate));
  if (pendingCandidates.length === 0) return;
  let {
      updateSettingsForSource: updateSettingsForSource
    } = await Promise.resolve().then(() => (yr(), y7)),
    {
      ThirdPartyModelUpgradeDialog: ThirdPartyModelUpgradeDialogComp
    } = await Promise.resolve().then(() => (k1o(), x1o)),
    anyAccepted = !1;
  for (let candidate of pendingCandidates) if (await CM(inkInstance, (onDone: any) => Db.default.createElement(ThirdPartyModelUpgradeDialogComp, {
    tierLabel: ude[candidate.tier],
    fromName: candidate.fromMarketingName,
    toName: candidate.toMarketingName,
    toProviderId: candidate.toBedrockId,
    onDone
  }))) {
    let envVarUpdates = candidate.tier === "haiku" ? {
        ANTHROPIC_DEFAULT_HAIKU_MODEL: candidate.toBedrockId,
        ...(candidate.envVar === "ANTHROPIC_SMALL_FAST_MODEL" && {
          ANTHROPIC_SMALL_FAST_MODEL: candidate.toBedrockId
        })
      } : {
        [candidate.envVar]: candidate.toBedrockId
      },
      {
        error: saveError
      } = updateSettingsForSource("userSettings", {
        env: envVarUpdates
      });
    if (saveError) {
      logEvent("tengu_bedrock_upgrade_save_failed", {
        tier: candidate.tier
      });
      let {
        Text: TextComp
      } = await Promise.resolve().then(() => (ze(), _F));
      await bht(inkInstance, (onDone: any) => (setTimeout(onDone, 2000), Db.default.createElement(TextComp, {
        color: "error"
      }, "Failed to save ", ude[candidate.tier], " upgrade to settings.")));
    } else {
      for (let envKey of Object.keys(envVarUpdates)) process.env[envKey] = candidate.toBedrockId;
      anyAccepted = !0, logEvent("tengu_bedrock_upgrade_accepted", {
        tier: candidate.tier,
        from_key: candidate.fromKey,
        to_key: candidate.toKey
      });
    }
  } else saveGlobalConfig((cfg: any) => ({
    ...cfg,
    bedrockDeclinedUpgrades: {
      ...cfg.bedrockDeclinedUpgrades,
      [candidate.tier]: upgradeKey(candidate)
    }
  })), logEvent("tengu_bedrock_upgrade_declined", {
    tier: candidate.tier,
    from_key: candidate.fromKey,
    to_key: candidate.toKey
  });
  if (anyAccepted) logEvent("tengu_bedrock_upgrade_relaunch", {}), await nsc(inkInstance);
}
async function nsc(inkInstance: any) {
  let {
    Text: TextComp
  } = await Promise.resolve().then(() => (ze(), _F));
  inkInstance.render(Db.default.createElement(TextComp, {
    dimColor: !0
  }, "Restarting Claude Code to apply the new model…"));
  let {
    sleep: sleep
  } = await Promise.resolve().then(() => xwt);
  await sleep(250), inkInstance.unmount();
  let {
    execRelaunch: execRelaunch
  } = await Promise.resolve().then(() => (kUt(), xUt));
  await execRelaunch();
}
async function y3m(inkInstance: any) {
  let {
      checkBedrockDefaultAvailability: checkBedrockDefaultAvailability
    } = await Promise.resolve().then(() => (R1o(), w1o)),
    fallbacks = await bVt("bedrock-fallback", checkBedrockDefaultAvailability());
  if (fallbacks.length === 0) return;
  for (let fallbackEntry of fallbacks) {
    if (process.env[fallbackEntry.envVar] = fallbackEntry.fallbackBedrockId, fallbackEntry.tier === "haiku") process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL = fallbackEntry.fallbackBedrockId;
    if (fallbackEntry.crossTier) process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME = fallbackEntry.fallbackName, process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION = `Opus unavailable — using ${fallbackEntry.fallbackName}`;
    logEvent("tengu_bedrock_default_fallback", {
      tier: fallbackEntry.tier,
      default_key: fallbackEntry.defaultKey,
      fallback_key: fallbackEntry.fallbackKey,
      cross_tier: Qe(fallbackEntry.crossTier ? "true" : "false")
    });
  }
  let {
      Box: BoxComp,
      Text: TextComp
    } = await Promise.resolve().then(() => (ze(), _F)),
    warningMessages = fallbacks.map((fallbackEntry: any) => fallbackEntry.crossTier ? `${ude[fallbackEntry.tier]}: ${fallbackEntry.defaultName} not available — using ${fallbackEntry.fallbackName}. Enable ${fallbackEntry.defaultName} in the Bedrock console to upgrade.` : `${ude[fallbackEntry.tier]}: ${fallbackEntry.defaultName} not available — using ${fallbackEntry.fallbackName} for this session`);
  await bht(inkInstance, (onDone: any) => (setTimeout(onDone, 1500), Db.default.createElement(BoxComp, {
    flexDirection: "column"
  }, warningMessages.map((msg: any) => Db.default.createElement(TextComp, {
    key: msg,
    color: "warning"
  }, msg)))));
}
async function T3m(inkInstance: any) {
  let {
      findVertexUpgradeCandidates: findVertexUpgradeCandidates,
      vertexUpgradeKey: vertexUpgradeKey
    } = await Promise.resolve().then(() => (D1o(), I1o)),
    candidates = await bVt("vertex-upgrade", findVertexUpgradeCandidates());
  if (candidates.length === 0) return;
  let declinedUpgrades = getGlobalConfig().vertexDeclinedUpgrades ?? {},
    pendingCandidates = candidates.filter((candidate: any) => declinedUpgrades[candidate.tier] !== vertexUpgradeKey(candidate));
  if (pendingCandidates.length === 0) return;
  let {
      updateSettingsForSource: updateSettingsForSource
    } = await Promise.resolve().then(() => (yr(), y7)),
    {
      ThirdPartyModelUpgradeDialog: ThirdPartyModelUpgradeDialogComp
    } = await Promise.resolve().then(() => (k1o(), x1o)),
    anyAccepted = !1;
  for (let candidate of pendingCandidates) if (await CM(inkInstance, (onDone: any) => Db.default.createElement(ThirdPartyModelUpgradeDialogComp, {
    tierLabel: ude[candidate.tier],
    fromName: candidate.fromMarketingName,
    toName: candidate.toMarketingName,
    toProviderId: candidate.toVertexId,
    onDone
  }))) {
    let envVarUpdates = candidate.tier === "haiku" ? {
        ANTHROPIC_DEFAULT_HAIKU_MODEL: candidate.toVertexId,
        ...(candidate.envVar === "ANTHROPIC_SMALL_FAST_MODEL" && {
          ANTHROPIC_SMALL_FAST_MODEL: candidate.toVertexId
        })
      } : {
        [candidate.envVar]: candidate.toVertexId
      },
      {
        error: saveError
      } = updateSettingsForSource("userSettings", {
        env: envVarUpdates
      });
    if (saveError) {
      logEvent("tengu_vertex_upgrade_save_failed", {
        tier: candidate.tier
      });
      let {
        Text: TextComp
      } = await Promise.resolve().then(() => (ze(), _F));
      await bht(inkInstance, (onDone: any) => (setTimeout(onDone, 2000), Db.default.createElement(TextComp, {
        color: "error"
      }, "Failed to save ", ude[candidate.tier], " upgrade to settings.")));
    } else {
      for (let envKey of Object.keys(envVarUpdates)) process.env[envKey] = candidate.toVertexId;
      anyAccepted = !0, logEvent("tengu_vertex_upgrade_accepted", {
        tier: candidate.tier,
        from_key: candidate.fromKey,
        to_key: candidate.toKey
      });
    }
  } else saveGlobalConfig((cfg: any) => ({
    ...cfg,
    vertexDeclinedUpgrades: {
      ...cfg.vertexDeclinedUpgrades,
      [candidate.tier]: vertexUpgradeKey(candidate)
    }
  })), logEvent("tengu_vertex_upgrade_declined", {
    tier: candidate.tier,
    from_key: candidate.fromKey,
    to_key: candidate.toKey
  });
  if (anyAccepted) logEvent("tengu_vertex_upgrade_relaunch", {}), await nsc(inkInstance);
}
async function S3m(inkInstance: any) {
  let {
      checkVertexDefaultAvailability: checkVertexDefaultAvailability
    } = await Promise.resolve().then(() => (D1o(), I1o)),
    fallbacks = await bVt("vertex-fallback", checkVertexDefaultAvailability());
  if (fallbacks.length === 0) return;
  for (let fallbackEntry of fallbacks) {
    if (process.env[fallbackEntry.envVar] = fallbackEntry.fallbackVertexId, fallbackEntry.tier === "haiku") process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL = fallbackEntry.fallbackVertexId;
    if (fallbackEntry.crossTier) process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME = fallbackEntry.fallbackName, process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION = `Opus unavailable — using ${fallbackEntry.fallbackName}`;
    logEvent("tengu_vertex_default_fallback", {
      tier: fallbackEntry.tier,
      default_key: fallbackEntry.defaultKey,
      fallback_key: fallbackEntry.fallbackKey,
      cross_tier: Qe(fallbackEntry.crossTier ? "true" : "false")
    });
  }
  let {
      Box: BoxComp,
      Text: TextComp
    } = await Promise.resolve().then(() => (ze(), _F)),
    warningMessages = fallbacks.map((fallbackEntry: any) => fallbackEntry.crossTier ? `${ude[fallbackEntry.tier]}: ${fallbackEntry.defaultName} not available — using ${fallbackEntry.fallbackName}. Enable ${fallbackEntry.defaultName} in Model Garden to upgrade.` : `${ude[fallbackEntry.tier]}: ${fallbackEntry.defaultName} not available — using ${fallbackEntry.fallbackName} for this session`);
  await bht(inkInstance, (onDone: any) => (setTimeout(onDone, 1500), Db.default.createElement(BoxComp, {
    flexDirection: "column"
  }, warningMessages.map((msg: any) => Db.default.createElement(TextComp, {
    key: msg,
    color: "warning"
  }, msg)))));
}
async function b3m(inkInstance: any) {
  let {
      checkMantleDefaultAvailability: checkMantleDefaultAvailability
    } = await Promise.resolve().then(() => (Joc(), Yoc)),
    fallbacks = await bVt("mantle-fallback", checkMantleDefaultAvailability());
  if (fallbacks.length === 0) return;
  let {
      lit: lit,
      fromEnum: fromEnum
    } = await Promise.resolve().then(() => TBo),
    {
      getUserSpecifiedModelSetting: getUserSpecifiedModelSetting
    } = await Promise.resolve().then(() => (Mo(), jun)),
    {
      setMainLoopModelOverride: setMainLoopModelOverride
    } = await Promise.resolve().then(() => (lt(), jde)),
    warningMessages: any[] = [];
  for (let fallbackEntry of fallbacks) if (fallbackEntry.kind === "fallback") {
    if (process.env[fallbackEntry.envVar] = fallbackEntry.fallbackMantleId, getUserSpecifiedModelSetting() == null) setMainLoopModelOverride(fallbackEntry.fallbackMantleId);
    logEvent("tengu_mantle_default_fallback", {
      default_key: fromEnum(fallbackEntry.defaultKey),
      fallback_key: fromEnum(fallbackEntry.fallbackKey)
    }), warningMessages.push(`${ude[fallbackEntry.tier]}: ${fallbackEntry.defaultName} not available — using ${fallbackEntry.fallbackName} for this session`);
  } else logEvent("tengu_mantle_default_fallback", {
    default_key: lit("exhausted")
  }), warningMessages.push(`${ude[fallbackEntry.tier]}: no accessible model (tried ${fallbackEntry.triedNames.join(", ")}). Enable ${fallbackEntry.defaultName} in Amazon Bedrock (Mantle).`);
  let {
      Box: BoxComp,
      Text: TextComp
    } = await Promise.resolve().then(() => (ze(), _F)),
    displayDurationMs = fallbacks.some((fallbackEntry: any) => fallbackEntry.kind === "exhausted") ? 4000 : 1500;
  await bht(inkInstance, (onDone: any) => (setTimeout(onDone, displayDurationMs), Db.default.createElement(BoxComp, {
    flexDirection: "column"
  }, warningMessages.map((msg: any) => Db.default.createElement(TextComp, {
    key: msg,
    color: "warning"
  }, msg)))));
}
function rsc(renderConfig: any) {
  let lastFlickerTime = 0,
    renderOptions = getBaseRenderOptions(renderConfig);
  if (renderOptions.stdin) logEvent("tengu_stdin_interactive", {});
  let fpsTracker = new T1o(),
    statsStore = UDo();
  setStatsStore(statsStore);
  let frameTimingLogPath = process.env.CLAUDE_CODE_FRAME_TIMING_LOG,
    frameTimingFd = -1;
  if (frameTimingLogPath) try {
    frameTimingFd = sZn.openSync(frameTimingLogPath, "a");
  } catch {}
  return {
    getFpsMetrics: () => fpsTracker.getMetrics(),
    stats: statsStore,
    renderOptions: {
      ...renderOptions,
      onFrame: (frameData: any) => {
        if (fpsTracker.record(frameData.durationMs), statsStore.observe("frame_duration_ms", frameData.durationMs), frameTimingFd >= 0 && frameData.phases) {
          let logLine = JSON.stringify({
            total: frameData.durationMs,
            ...frameData.phases,
            rss: process.memoryUsage.rss(),
            cpu: process.cpuUsage()
          }) + `
`;
          sZn.writeSync(frameTimingFd, logLine);
        }
        if (pF()) return;
        for (let flickerEvent of frameData.flickers) {
          if (flickerEvent.reason === "resize") continue;
          let nowMs = Date.now();
          if (nowMs - lastFlickerTime < 1000) logEvent("tengu_flicker", {
            desiredHeight: flickerEvent.desiredHeight,
            actualHeight: flickerEvent.availableHeight,
            reason: flickerEvent.reason
          });
          lastFlickerTime = nowMs;
        }
      }
    }
  };
}
var sZn,
  Db,
  g3m = 2000,
  Zoc = "GB post-onboarding init",
  ude,
  esc = 20000;
var O1o = b(() => {
  Ct();
  ym();
  lt();
  $Do();
  dq();
  DDo();
  XS();
  xW();
  EVt();
  ln();
  zn();
  Est();
  iDo();
  Jq();
  bAt();
  eYe();
  zw();
  hp();
  Qn();
  qe();
  Lrc();
  Lr();
  sn();
  bt();
  gVt();
  Rn();
  yAt();
  li();
  gg();
  zee();
  kat();
  yr();
  JQ();
  sZn = require("fs"), Db = M(Te(), 1);
  ude = {
    fable: "Fable",
    sonnet: "Sonnet",
    opus: "Opus",
    haiku: "Haiku"
  };
});
export {A3m,bht,Qoc,tB,h3m,CM,k5e,tsc,bVt,_3m,nsc,y3m,T3m,S3m,b3m,rsc,sZn,Db,g3m,Zoc,ude,esc,O1o};
