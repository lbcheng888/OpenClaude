// @ts-nocheck
import {saveGlobalConfig as hn,getGlobalConfig as Ot,checkHasTrustDialogAccepted as kd,getCustomApiKeyStatus as LKt,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {E1o,rWl,A1o} from "../../vendor/m5257.ts";
import {RUn,kct} from "../../vendor/m3779.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {je,d4} from "../../vendor/m2462.ts";
import {mK,Z8o} from "../../vendor/m231.ts";
import {isAmberSentinelEnabled as Np,YBt,gracefulShutdown as gi,gracefulShutdownSync as Rc} from "./3348_flushAnalyticsSinks.ts";
import {g8e,RWn} from "./4413_stopRendezvousServer.ts";
import {AppStateProvider as IE,pq} from "../../vendor/m3370.ts";
import {KeybindingSetup as kC,WW} from "../../vendor/m3362.ts";
import {startDeferredPrefetches as yrr,Xzt} from "../permissions/5772_startDeferredPrefetches.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {Ne} from "../../vendor/m583.ts";
import {setSessionTrustAccepted as Fbe,getIsRemoteMode as la,getAllowedChannels as Nb,setAllowedChannels as Jde,setHasDevChannels as NJt,setStatsStore as zsr,lt} from "../session/0132_sent.ts";
import {resetGrowthBook as iet,initializeGrowthBook as B0,checkGate_CACHED_OR_BLOCKING as wF,getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {AE,y$} from "./2734_duration_ms.ts";
import {Kq,L6e} from "./4012_ANTHROPIC_UNIX_SOCKET.ts";
import {Q9n,e3n} from "../../vendor/m4007.ts";
import {QKt,oNo} from "./5288_level.ts";
import {nt} from "../../vendor/m127.ts";
import {Qpc,Xpc} from "../tui/5684_SkippableStep.ts";
import {wSe,U_t} from "../../vendor/m5270.ts";
import {Tmc,ymc} from "../tui/5686_TrustDialog.ts";
import {clearPluginCache as Tw,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {FRe,KQ} from "../../vendor/m2039.ts";
import {withTimeout as Oc,tHt} from "../telemetry/1488_withTimeout.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {shouldShowClaudeMdExternalIncludesWarning as DKr,getExternalClaudeMdIncludes as Yrt,getMemoryFiles as qA,ZR} from "./2729_stripHtmlComments.ts";
import {NAo,Aml} from "../tui/4547_recordExternalIncludesDecision.ts";
import {Rpc,W2o,Kzt} from "../../vendor/m5673.ts";
import {Epc,Cpc} from "../../vendor/m5672.ts";
import {Ed,rA,dn} from "./0137_namespace.ts";
import {N8n,M8n} from "../telemetry/4376_stopMemoryWatcher.ts";
import {Sat,bat} from "../telemetry/3353_level.ts";
import {u0o,MDl} from "../tui/4949_PrivacySettingsDialog.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Zht,qvl} from "../../vendor/m4811.ts";
import {Cmc,Emc} from "../tui/5687_ProTrialStartScreen.ts";
import {Jzn,pwl} from "../agent/4821_resolvePowerupDiscoveryArm.ts";
import {wmc,vmc} from "../telemetry/5688_PowerupDiscoveryStep.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {sF,XJe} from "../../vendor/m1297.ts";
import {e$o,Bpc} from "../../vendor/m5679.ts";
import {hasSkipDangerousModePermissionPrompt as c2,hasAutoModeOptIn as _3,br,VK} from "./0745_updateSettingsForSource.ts";
import {Imc,Hmc} from "../tui/5689_BypassPermissionsModeDialog.ts";
import {Her,CFo} from "../tui/5371_AutoModeOptInDialog.ts";
import {wpt,QVa} from "../telemetry/4178_isChannelsEnabled.ts";
import {d5e,eKa} from "../../vendor/m4178.ts";
import {Pmc,Dmc} from "../../vendor/m5689.ts";
import {Mmc,Lmc} from "../computer-use/5691_ClaudeInChromeOnboarding.ts";
import {kTe,Lvo} from "../permissions/4676_shouldSuppressChromeOffer.ts";
import {KA,gsa} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {bO,nNi} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {Bmc,Fmc} from "../tui/5692_ChromeAutoEnableDialog.ts";
import {K2o,V2o} from "../api/5675_upgradeKey.ts";
import {withProbeDeadline as hVe,TIER_LABELS as zJ,apply3PDefaultFallbacks as X2o,Q2o} from "../telemetry/5678_withProbeDeadline.ts";
import {s$o,o$o} from "../../vendor/m5692.ts";
import {Cqe,Eqe} from "../../vendor/m3874.ts";
import {Y2o,j2o} from "../api/5676_vertexUpgradeKey.ts";
import {getBaseRenderOptions as D1,qee} from "../telemetry/3372_getBaseRenderOptions.ts";
import {pNo,mNo} from "../../vendor/m5301.ts";
import {LF,nS} from "./2351_nS.ts";
import {b,x} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function GKm() {
  hn(config => ({
    ...config,
    hasCompletedOnboarding: true,
    lastOnboardingVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION
  }));
}
function _rr(instance, renderDialog) {
  return new Promise(resolve => {
    let done = value => void resolve(value);
    instance.render(renderDialog(done));
  });
}
async function qmc(instance) {
  let mcpState = await E1o(),
    settingsErrors = RUn();
  if (mcpState.pendingServers.length === 0) return null;
  if (settingsErrors.length === 0) {
    let approvalResult;
    try {
      approvalResult = await rWl(instance, mcpState);
    } catch (err) {
      throw xe("mcp_project_approval_dialog", "mcp_project_approval_dialog_threw"), err;
    }
    if (approvalResult.persistFailed) return xe("mcp_project_approval_dialog", "mcp_approval_persist_failed"), {
      key: "mcp-approval-persist-failed",
      text: "one or more of your MCP server choices could not be saved (check permissions on .claude/settings.local.json) \xB7 you will be asked again next startup"
    };
    return He("mcp_project_approval_dialog"), null;
  }
  let errorFiles = os(settingsErrors.map(settingsError => settingsError.file).filter(Boolean)).join(", ");
  return Pt("mcp_project_approval_dialog", "mcp_project_approval_skipped_settings_errors"), {
    key: "mcp-approval-skipped",
    text: `skipping .mcp.json server approval (settings errors${errorFiles ? ` in ${errorFiles}` : ""}) \xB7 run /doctor and fix them, then restart`
  };
}
async function CN(instance, message, beforeExit) {
  return VKm(instance, message, {
    color: "error",
    beforeExit: beforeExit
  });
}
async function VKm(instance, message, options) {
  let {
      Text: Text
    } = await Promise.resolve().then(() => (je(), d4)),
    color = options?.color,
    exitCode = options?.exitCode ?? 1;
  if (instance.render(color ? pR.jsx(Text, {
    color: color,
    children: message
  }) : pR.jsx(Text, {
    children: message
  })), instance.unmount(), await options?.beforeExit?.(), exitCode !== 0) {
    let {
      setBgExitCause: setBgExitCause
    } = await Promise.resolve().then(() => (mK(), Z8o));
    setBgExitCause("exit_with_message");
  }
  let {
    flushAnalyticsSinks: flushAnalyticsSinks
  } = await Promise.resolve().then(() => (Np(), YBt));
  await flushAnalyticsSinks(), process.exit(exitCode);
}
function FL(instance, renderDialog, options) {
  let blockHandle = process.env.CLAUDE_JOB_DIR ? Promise.resolve().then(() => (g8e(), RWn)).then(mod => mod.markStartupDialogBlocked()).catch(() => {
      return;
    }) : undefined,
    dialogPromise = _rr(instance, done => pR.jsx(IE, {
      onChangeAppState: options?.onChangeAppState,
      children: pR.jsx(kC, {
        children: renderDialog(done)
      })
    }));
  if (!blockHandle) return dialogPromise;
  return dialogPromise.finally(() => blockHandle.then(handle => handle ? Promise.resolve().then(() => (g8e(), RWn)).then(mod => mod.clearStartupDialogBlocked(handle)) : undefined).catch(() => {}));
}
async function _Ve(instance, element) {
  instance.render(element), yrr(), await instance.waitUntilExit(), await gi(0);
}
async function Gmc(instance, permissionMode, forceBypassDialog, claudeInChromeOffer, devChannels, devChannels_2, offerChromeExtension) {
  let mcpApprovalSkipWarning = null;
  if (Ws() || Ne.CLAUDE_BRIDGE_REATTACH_SESSION) return Fbe(true), iet(), B0().catch(err => Ie(mo(err))), AE(), mcpApprovalSkipWarning = await qmc(instance), Kq(), Q9n(), setImmediate(() => QKt()), {
    onboardingShown: false,
    mcpApprovalSkipWarning: mcpApprovalSkipWarning,
    claudeInChromeAccepted: false
  };
  if (nt(false) || process.env.IS_DEMO) return Q9n(), {
    onboardingShown: false,
    mcpApprovalSkipWarning: mcpApprovalSkipWarning,
    claudeInChromeAccepted: false
  };
  let config = Ot(),
    onboardingShown = false;
  if (!config.hasCompletedOnboarding || Ne.CLAUDE_CODE_POWERUP_ONBOARDING === "banner" || Ne.CLAUDE_CODE_POWERUP_ONBOARDING === "step") {
    onboardingShown = true;
    let {
      Onboarding: Onboarding
    } = await Promise.resolve().then(() => (Qpc(), Xpc));
    await FL(instance, done => pR.jsx(Onboarding, {
      onDone: () => {
        GKm(), done();
      }
    }), {
      onChangeAppState: wSe
    });
  }
  let trustDialogShown = false;
  if (!Ne.CLAUBBIT) {
    if (!kd()) {
      trustDialogShown = true;
      let {
        TrustDialog: TrustDialog
      } = await Promise.resolve().then(() => (Tmc(), ymc));
      await FL(instance, done => pR.jsx(TrustDialog, {
        commands: claudeInChromeOffer,
        onDone: done
      }));
    }
    if (Fbe(true), trustDialogShown) Tw("post-trust: re-discover project @skills-dir plugins");
    if (iet(), !config.hasCompletedOnboarding) {
      FRe();
      let startTime = Date.now();
      try {
        await Oc(B0(), KKm, Wmc), A(`[STARTUP] post-onboarding GB await ${Date.now() - startTime}ms`);
      } catch (err) {
        if (A(`[STARTUP] post-onboarding GB await ${Date.now() - startTime}ms: ${err}`, {
          level: "warn"
        }), !(err instanceof Error && err.message === Wmc)) Ie(mo(err));
      }
    } else B0().catch(err => Ie(mo(err)));
    if (AE(), mcpApprovalSkipWarning = await qmc(instance), await DKr()) {
      let externalIncludes = Yrt(await qA(true)),
        {
          ClaudeMdExternalIncludesDialog: ClaudeMdExternalIncludesDialog
        } = await Promise.resolve().then(() => (NAo(), Aml));
      await FL(instance, done => pR.jsx(ClaudeMdExternalIncludesDialog, {
        onDone: done,
        isStandaloneDialog: true,
        externalIncludes: externalIncludes
      }));
    }
  }
  if (Rpc(), Epc(), Kq(), Q9n(), trustDialogShown) {
    if (!la() && !Ed()) Promise.resolve().then(() => (N8n(), M8n)).then(mod => mod.startMemoryWatcher());
  }
  if (setImmediate(() => QKt()), await Sat()) {
    let {
      GroveDialog: GroveDialog
    } = await Promise.resolve().then(() => (u0o(), MDl));
    if ((await FL(instance, done => pR.jsx(GroveDialog, {
      showIfAlreadyViewed: false,
      location: onboardingShown ? "onboarding" : "policy_update_modal",
      onDone: done
    }))) === "escape") return W("tengu_grove_policy_exited", {}), Rc(0), {
      onboardingShown: false,
      mcpApprovalSkipWarning: mcpApprovalSkipWarning,
      claudeInChromeAccepted: false
    };
  }
  {
    let {
      getProTrialState: getProTrialState
    } = await Promise.resolve().then(() => (Zht(), qvl));
    if (getProTrialState().status === "not_started") {
      let {
        ProTrialStartScreen: ProTrialStartScreen
      } = await Promise.resolve().then(() => (Cmc(), Emc));
      W("tengu_pro_trial_start_screen_shown", {}), await FL(instance, done => pR.jsx(ProTrialStartScreen, {
        onDone: done
      }));
    }
  }
  if (onboardingShown) {
    let {
      resolvePowerupDiscoveryArm: resolvePowerupDiscoveryArm
    } = await Promise.resolve().then(() => (Jzn(), pwl));
    if (resolvePowerupDiscoveryArm() === "step") {
      let {
        PowerupDiscoveryStep: PowerupDiscoveryStep
      } = await Promise.resolve().then(() => (wmc(), vmc));
      await FL(instance, done => pR.jsx(PowerupDiscoveryStep, {
        onDone: done
      }));
    }
  }
  if (process.env.ANTHROPIC_API_KEY && !rA() && Rr() === "firstParty") {
    let apiKeyTruncated = sF(process.env.ANTHROPIC_API_KEY);
    if (LKt(apiKeyTruncated) === "new") {
      let {
        ApproveApiKey: ApproveApiKey
      } = await Promise.resolve().then(() => (e$o(), Bpc));
      await FL(instance, done => pR.jsx(ApproveApiKey, {
        customApiKeyTruncated: apiKeyTruncated,
        onDone: done
      }), {
        onChangeAppState: wSe
      });
    }
  }
  try {
    await zKm(instance);
  } catch (err) {
    Ie(err);
  }
  try {
    await YKm(instance);
  } catch (err) {
    Ie(err);
  }
  try {
    await jKm(instance);
  } catch (err) {
    Ie(err);
  }
  if ((permissionMode === "bypassPermissions" || forceBypassDialog) && !c2()) {
    let {
      BypassPermissionsModeDialog: BypassPermissionsModeDialog
    } = await Promise.resolve().then(() => (Imc(), Hmc));
    await FL(instance, done => pR.jsx(BypassPermissionsModeDialog, {
      onAccept: done
    }));
  }
  if (permissionMode === "auto" && !_3()) {
    let {
      AutoModeOptInDialog: AutoModeOptInDialog
    } = await Promise.resolve().then(() => (Her(), CFo));
    await FL(instance, done => pR.jsx(AutoModeOptInDialog, {
      onAccept: done,
      onDecline: () => Rc(1),
      declineExits: true
    }));
  }
  if (Nb().length > 0 || (devChannels_2?.length ?? 0) > 0) await wF("tengu_harbor");
  if (devChannels_2 && devChannels_2.length > 0) {
    let [{
      isChannelsEnabled: isChannelsEnabled
    }, {
      isChannelsPolicyBlocked: isChannelsPolicyBlocked
    }, {
      getSettingsForSource: getSettingsForSource
    }] = await Promise.all([Promise.resolve().then(() => (wpt(), QVa)), Promise.resolve().then(() => (d5e(), eKa)), Promise.resolve().then(() => (br(), VK))]);
    if (!isChannelsEnabled() || Rr() !== "firstParty" || isChannelsPolicyBlocked(getSettingsForSource("policySettings"))) Jde([...Nb(), ...devChannels_2.map(channel => ({
      ...channel,
      dev: true
    }))]), NJt(true);else {
      let {
        DevChannelsDialog: DevChannelsDialog
      } = await Promise.resolve().then(() => (Pmc(), Dmc));
      await FL(instance, done => pR.jsx(DevChannelsDialog, {
        channels: devChannels_2,
        onAccept: () => {
          Jde([...Nb(), ...devChannels_2.map(channel => ({
            ...channel,
            dev: true
          }))]), NJt(true), done();
        }
      }));
    }
  }
  if (devChannels && !Ot().hasCompletedClaudeInChromeOnboarding) {
    let {
      ClaudeInChromeOnboarding: ClaudeInChromeOnboarding
    } = await Promise.resolve().then(() => (Mmc(), Lmc));
    await FL(instance, done => pR.jsx(ClaudeInChromeOnboarding, {
      onDone: done
    }));
  }
  let claudeInChromeAccepted = false;
  if (offerChromeExtension) {
    let {
        isChromeExtensionInstalled: isChromeExtensionInstalled
      } = await Promise.resolve().then(() => (kTe(), Lvo)),
      extensionInstalled = await Oc(isChromeExtensionInstalled(), 1500, "chrome extension scan timed out before offer").catch(() => true),
      hasPairedDevice = Boolean(Ot().chromeExtension?.pairedDeviceId);
    if (extensionInstalled || hasPairedDevice) {
      await Oc(B0().catch(() => {}), 1500, "GrowthBook init timed out before chrome offer").catch(() => {});
      let autoEnableEnabled = it("tengu_chrome_auto_enable", false),
        decisionAlreadyRecorded = Ot().claudeInChromeDefaultEnabled !== undefined,
        {
          doesEnterpriseMcpConfigExist: doesEnterpriseMcpConfigExist,
          isMcpServerDenied: isMcpServerDenied
        } = await Promise.resolve().then(() => (KA(), gsa)),
        {
          CLAUDE_IN_CHROME_MCP_SERVER_NAME: CLAUDE_IN_CHROME_MCP_SERVER_NAME
        } = await Promise.resolve().then(() => (bO(), nNi)),
        {
          getClaudeInChromeMcpServerConfig: getClaudeInChromeMcpServerConfig
        } = await Promise.resolve().then(() => (kTe(), Lvo));
      if (doesEnterpriseMcpConfigExist() || isMcpServerDenied(CLAUDE_IN_CHROME_MCP_SERVER_NAME, getClaudeInChromeMcpServerConfig())) A("[Claude in Chrome] Skipping offer: blocked by enterprise MCP config or managed deniedMcpServers policy");else if (decisionAlreadyRecorded) A("[Claude in Chrome] Skipping offer: decision already recorded (another instance answered)"), claudeInChromeAccepted = Ot().claudeInChromeDefaultEnabled === true;else if (autoEnableEnabled) {
        let {
          ChromeAutoEnableDialog: ChromeAutoEnableDialog
        } = await Promise.resolve().then(() => (Bmc(), Fmc));
        claudeInChromeAccepted = await FL(instance, done => pR.jsx(ChromeAutoEnableDialog, {
          onDone: done,
          isDontAskMode: permissionMode === "dontAsk",
          isAutoMode: permissionMode === "auto"
        }));
      } else A("[Claude in Chrome] Skipping offer: tengu_chrome_auto_enable no longer set (stale GB cache)");
    } else A("[Claude in Chrome] Skipping offer: extension not present locally (stale cache)");
  }
  return {
    onboardingShown: onboardingShown,
    mcpApprovalSkipWarning: mcpApprovalSkipWarning,
    claudeInChromeAccepted: claudeInChromeAccepted
  };
}
async function zKm(instance) {
  let {
      findBedrockUpgradeCandidates: findBedrockUpgradeCandidates,
      upgradeKey: upgradeKey
    } = await Promise.resolve().then(() => (K2o(), V2o)),
    candidates = await hVe("bedrock-upgrade", findBedrockUpgradeCandidates());
  if (candidates.length === 0) return;
  let declinedUpgrades = Ot().bedrockDeclinedUpgrades ?? {},
    pendingUpgrades = candidates.filter(candidate => declinedUpgrades[candidate.tier] !== upgradeKey(candidate));
  if (pendingUpgrades.length === 0) return;
  let {
      updateSettingsForSource: updateSettingsForSource
    } = await Promise.resolve().then(() => (br(), VK)),
    {
      ThirdPartyModelUpgradeDialog: ThirdPartyModelUpgradeDialog
    } = await Promise.resolve().then(() => (s$o(), o$o)),
    anyAccepted = false;
  for (let candidate of pendingUpgrades) if (await FL(instance, done => pR.jsx(ThirdPartyModelUpgradeDialog, {
    tierLabel: zJ[candidate.tier],
    fromName: candidate.fromMarketingName,
    toName: candidate.toMarketingName,
    toProviderId: candidate.toBedrockId,
    onDone: done
  }))) {
    let envUpdate = candidate.tier === "haiku" ? {
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
        env: envUpdate
      });
    if (saveError) {
      W("tengu_bedrock_upgrade_save_failed", {
        tier: candidate.tier
      });
      let {
        Text: Text
      } = await Promise.resolve().then(() => (je(), d4));
      await _rr(instance, done => (setTimeout(done, 2000), pR.jsxs(Text, {
        color: "error",
        children: ["Failed to save ", zJ[candidate.tier], " upgrade to settings."]
      })));
    } else {
      for (let envKey of Object.keys(envUpdate)) process.env[envKey] = candidate.toBedrockId;
      anyAccepted = true, W("tengu_bedrock_upgrade_accepted", {
        tier: candidate.tier,
        from_key: candidate.fromKey,
        to_key: candidate.toKey
      });
    }
  } else hn(config => ({
    ...config,
    bedrockDeclinedUpgrades: {
      ...config.bedrockDeclinedUpgrades,
      [candidate.tier]: upgradeKey(candidate)
    }
  })), W("tengu_bedrock_upgrade_declined", {
    tier: candidate.tier,
    from_key: candidate.fromKey,
    to_key: candidate.toKey
  });
  if (anyAccepted) W("tengu_bedrock_upgrade_relaunch", {}), await Vmc(instance);
}
async function Vmc(instance) {
  let {
    Text: Text
  } = await Promise.resolve().then(() => (je(), d4));
  instance.render(pR.jsx(Text, {
    dimColor: true,
    children: "Restarting Claude Code to apply the new model\u2026"
  }));
  let {
    sleep: sleep
  } = await Promise.resolve().then(() => tHt);
  await sleep(250), instance.unmount();
  let {
    execRelaunch: execRelaunch
  } = await Promise.resolve().then(() => (Cqe(), Eqe));
  await execRelaunch();
}
async function jKm(instance) {
  let {
    lines: lines,
    hasHardFailure: hasHardFailure
  } = await X2o();
  if (lines.length === 0) return;
  let {
      Box: Box,
      Text: Text
    } = await Promise.resolve().then(() => (je(), d4)),
    dwellMs = hasHardFailure ? 4000 : 1500;
  await _rr(instance, done => (setTimeout(done, dwellMs), pR.jsx(Box, {
    flexDirection: "column",
    children: lines.map(line => pR.jsx(Text, {
      color: "warning",
      children: line
    }, line))
  })));
}
async function YKm(instance) {
  let {
      findVertexUpgradeCandidates: findVertexUpgradeCandidates,
      vertexUpgradeKey: vertexUpgradeKey
    } = await Promise.resolve().then(() => (Y2o(), j2o)),
    candidates = await hVe("vertex-upgrade", findVertexUpgradeCandidates());
  if (candidates.length === 0) return;
  let declinedUpgrades = Ot().vertexDeclinedUpgrades ?? {},
    pendingUpgrades = candidates.filter(candidate => declinedUpgrades[candidate.tier] !== vertexUpgradeKey(candidate));
  if (pendingUpgrades.length === 0) return;
  let {
      updateSettingsForSource: updateSettingsForSource
    } = await Promise.resolve().then(() => (br(), VK)),
    {
      ThirdPartyModelUpgradeDialog: ThirdPartyModelUpgradeDialog
    } = await Promise.resolve().then(() => (s$o(), o$o)),
    anyAccepted = false;
  for (let candidate of pendingUpgrades) if (await FL(instance, done => pR.jsx(ThirdPartyModelUpgradeDialog, {
    tierLabel: zJ[candidate.tier],
    fromName: candidate.fromMarketingName,
    toName: candidate.toMarketingName,
    toProviderId: candidate.toVertexId,
    onDone: done
  }))) {
    let envUpdate = candidate.tier === "haiku" ? {
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
        env: envUpdate
      });
    if (saveError) {
      W("tengu_vertex_upgrade_save_failed", {
        tier: candidate.tier
      });
      let {
        Text: Text
      } = await Promise.resolve().then(() => (je(), d4));
      await _rr(instance, done => (setTimeout(done, 2000), pR.jsxs(Text, {
        color: "error",
        children: ["Failed to save ", zJ[candidate.tier], " upgrade to settings."]
      })));
    } else {
      for (let envKey of Object.keys(envUpdate)) process.env[envKey] = candidate.toVertexId;
      anyAccepted = true, W("tengu_vertex_upgrade_accepted", {
        tier: candidate.tier,
        from_key: candidate.fromKey,
        to_key: candidate.toKey
      });
    }
  } else hn(config => ({
    ...config,
    vertexDeclinedUpgrades: {
      ...config.vertexDeclinedUpgrades,
      [candidate.tier]: vertexUpgradeKey(candidate)
    }
  })), W("tengu_vertex_upgrade_declined", {
    tier: candidate.tier,
    from_key: candidate.fromKey,
    to_key: candidate.toKey
  });
  if (anyAccepted) W("tengu_vertex_upgrade_relaunch", {}), await Vmc(instance);
}
function Kmc(instance) {
  let lastFlickerTime = 0,
    renderOpts = D1(instance);
  if (renderOpts.stdin) W("tengu_stdin_interactive", {});
  let fpsTracker = new W2o(),
    stats = pNo();
  zsr(stats);
  let frameTimingLogPath = process.env.CLAUDE_CODE_FRAME_TIMING_LOG,
    frameTimingLogFd = -1;
  if (frameTimingLogPath) try {
    frameTimingLogFd = grr.openSync(frameTimingLogPath, "a");
  } catch {}
  return {
    getFpsMetrics: () => fpsTracker.getMetrics(),
    stats: stats,
    renderOptions: {
      ...renderOpts,
      onFrame: frame => {
        if (fpsTracker.record(frame.durationMs), stats.observe("frame_duration_ms", frame.durationMs), frameTimingLogFd >= 0 && frame.phases) {
          let logLine = JSON.stringify({
            total: frame.durationMs,
            ...frame.phases,
            rss: process.memoryUsage.rss(),
            cpu: process.cpuUsage()
          }) + `
`;
          grr.writeSync(frameTimingLogFd, logLine);
        }
        if (LF()) return;
        for (let flicker of frame.flickers) {
          if (flicker.reason === "resize") continue;
          let now = Date.now();
          if (now - lastFlickerTime < 1000) W("tengu_flicker", {
            desiredHeight: flicker.desiredHeight,
            actualHeight: flicker.availableHeight,
            reason: flicker.reason
          });
          lastFlickerTime = now;
        }
      }
    }
  };
}
var grr,
  pR,
  KKm = 2000,
  Wmc = "GB post-onboarding init";
var i$o = b(() => {
  kt();
  Np();
  lt();
  mNo();
  y$();
  oNo();
  nS();
  WW();
  Xzt();
  mn();
  jn();
  bat();
  A1o();
  pq();
  U_t();
  e3n();
  XJe();
  ZR();
  vd();
  tr();
  qe();
  Cpc();
  Ir();
  dn();
  Ct();
  Kzt();
  vn();
  L6e();
  Q2o();
  Ps();
  Eg();
  qee();
  kct();
  br();
  KQ();
  grr = require("fs"), pR = x(oe(), 1);
});

export {GKm,_rr,qmc,CN,VKm,FL,_Ve,Gmc,zKm,Vmc,jKm,YKm,Kmc,grr,pR,KKm,Wmc,i$o};
