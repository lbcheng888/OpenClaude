// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {Egt,SKt} from "./0128_sessionId.ts";
import {Dde,yKt} from "../../vendor/m124.ts";
import {Rm,zE} from "../../vendor/m125.ts";
import {OWe,e2o} from "../../vendor/m123.ts";
import {f_,Kx} from "../../vendor/m128.ts";
import {kg} from "../../vendor/m129.ts";
import {ca} from "../../vendor/m5.ts";
/** Create a fresh sticky-betas tracking object with empty sent/rejected sets. */
function wre() {
  return {
    sent: new Set(),
    rejected: new Set()
  };
}

/** Clone a sticky-betas state object (deep-copy the two sets). */
function $I(stickyBetas: any) {
  return {
    sent: new Set(stickyBetas.sent),
    rejected: new Set(stickyBetas.rejected)
  };
}

/** Mark a beta header as sent, unless it is already rejected. */
function QTe(stickyBetas: any, headerKey: any) {
  if (!stickyBetas.rejected.has(headerKey)) stickyBetas.sent.add(headerKey);
}

/** Return true if the header has been sent and not subsequently rejected. */
function WOe(stickyBetas: any, headerKey: any) {
  return stickyBetas.sent.has(headerKey) && !stickyBetas.rejected.has(headerKey);
}

/** Move a beta header from sent → rejected. */
function Rre(stickyBetas: any, headerKey: any) {
  stickyBetas.sent.delete(headerKey), stickyBetas.rejected.add(headerKey);
}

/** Return true if the header has been rejected. */
function GOe(stickyBetas: any, headerKey: any) {
  return stickyBetas.rejected.has(headerKey);
}
var jde = {};

/** Namespace export map – wires every public symbol to its lazy getter so tree-shaking works. */
isFullscreenWithTTY(jde, {
  waitForScrollIdle: () => waitForScrollIdle,
  updateLastInteractionTime: () => updateLastInteractionTime,
  switchSession: () => switchSession,
  snapshotOutputTokensForTurn: () => snapshotOutputTokensForTurn,
  setUserMsgOptIn: () => setUserMsgOptIn,
  setUseCoworkPlugins: () => setUseCoworkPlugins,
  setTracerProvider: () => setTracerProvider,
  setThinkingTypeOverride: () => setThinkingTypeOverride,
  setTerminalFocusForState: () => setTerminalFocusForState,
  setTeleportedSessionInfo: () => setTeleportedSessionInfo,
  setTeamMemoryServerStatus: () => setTeamMemoryServerStatus,
  setSystemPromptSectionCacheEntry: () => setSystemPromptSectionCacheEntry,
  setSyncedPluginDirs: () => setSyncedPluginDirs,
  setStrictToolResultPairing: () => setStrictToolResultPairing,
  setStrictMcpConfig: () => setStrictMcpConfig,
  setStatsStore: () => setStatsStore,
  setSessionTrustAccepted: () => setSessionTrustAccepted,
  setSessionStartType: () => setSessionStartType,
  setSessionSource: () => setSessionSource,
  setSessionSkillAllowlist: () => setSessionSkillAllowlist,
  setSessionPrResolved: () => setSessionPrResolved,
  setSessionPersistenceDisabled: () => setSessionPersistenceDisabled,
  setSessionOverridesGetter: () => setSessionOverridesGetter,
  setSessionIngressToken: () => setSessionIngressToken,
  setSessionBypassPermissionsMode: () => setSessionBypassPermissionsMode,
  setSearchToolsOptIn: () => setSearchToolsOptIn,
  setSdkSupportedDialogKinds: () => setSdkSupportedDialogKinds,
  setSdkOAuthTokenRefreshCallback: () => setSdkOAuthTokenRefreshCallback,
  setSdkDialogHostActive: () => setSdkDialogHostActive,
  setSdkBetas: () => setSdkBetas,
  setSdkAgentProgressSummariesEnabled: () => setSdkAgentProgressSummariesEnabled,
  setScheduledTasksEnabled: () => setScheduledTasksEnabled,
  setReplConfigArgv: () => setReplConfigArgv,
  setReplBridgeActive: () => setReplBridgeActive,
  setRendererModeForAnalytics: () => setRendererModeForAnalytics,
  setQuestionPreviewFormat: () => setQuestionPreviewFormat,
  setPromptId: () => setPromptId,
  setPromptCache1hAllowlist: () => setPromptCache1hAllowlist,
  setProjectRoot: () => setProjectRoot,
  setParentManagedSettings: () => setParentManagedSettings,
  setOriginalCwd: () => setOriginalCwd,
  setOnboardingShownThisSession: () => setOnboardingShownThisSession,
  setOauthTokenFromFd: () => setOauthTokenFromFd,
  setOauthScopesFromFd: () => setOauthScopesFromFd,
  setNeedsPlanModeExitAttachment: () => setNeedsPlanModeExitAttachment,
  setNeedsAutoModeExitAttachment: () => setNeedsAutoModeExitAttachment,
  setModelStrings: () => setModelStrings,
  setModelOverrideOptOutForSession: () => setModelOverrideOptOutForSession,
  setMeterProvider: () => setMeterProvider,
  setMeter: () => setMeter,
  setMemoryToggledOff: () => setMemoryToggledOff,
  setMcpConnectNonBlocking: () => setMcpConnectNonBlocking,
  setMcpClientsAccessor: () => setMcpClientsAccessor,
  setMainThreadAgentType: () => setMainThreadAgentType,
  setMainThreadAgentHooks: () => setMainThreadAgentHooks,
  setMainLoopModelOverride: () => setMainLoopModelOverride,
  setLspRecommendationShownThisSession: () => setLspRecommendationShownThisSession,
  setLoopTickInFlightPrompt: () => setLoopTickInFlightPrompt,
  setLoopConsecutiveKeepalives: () => setLoopConsecutiveKeepalives,
  setLoopChainStartedAt: () => setLoopChainStartedAt,
  setLongContext1mCreditsBlocked: () => setLongContext1mCreditsBlocked,
  setLoggerProvider: () => setLoggerProvider,
  setLastMainThreadCacheTtlMs: () => setLastMainThreadCacheTtlMs,
  setLastMainRequestId: () => setLastMainRequestId,
  setLastEmittedDate: () => setLastEmittedDate,
  setLastClassifierRequests: () => setLastClassifierRequests,
  setLastCancelledAPIMessageId: () => setLastCancelledAPIMessageId,
  setLastApiCompletionTimestamp: () => setLastApiCompletionTimestamp,
  setLastAPIRequestMessages: () => setLastAPIRequestMessages,
  setLastAPIRequest: () => setLastAPIRequest,
  setIsRemoteMode: () => setIsRemoteMode,
  setIsInteractive: () => setIsInteractive,
  setInlinePluginsNoMcp: () => setInlinePluginsNoMcp,
  setInlinePlugins: () => setInlinePlugins,
  setInlinePluginUrls: () => setInlinePluginUrls,
  setInitialMainLoopModel: () => setInitialMainLoopModel,
  setInitJsonSchema: () => setInitJsonSchema,
  setInheritedTeamName: () => setInheritedTeamName,
  setInferenceProfileBackingModel: () => setInferenceProfileBackingModel,
  setHostAuthTokenRefreshCallback: () => setHostAuthTokenRefreshCallback,
  setHasUnknownModelCost: () => setHasUnknownModelCost,
  setHasStreamingInput: () => setHasStreamingInput,
  setHasExitedPlanMode: () => setHasExitedPlanMode,
  setHasDevChannels: () => setHasDevChannels,
  setGatewayRefreshInFlight: () => setGatewayRefreshInFlight,
  setGatewayAuth: () => setGatewayAuth,
  setFlagSettingsPath: () => setFlagSettingsPath,
  setFlagSettingsInline: () => setFlagSettingsInline,
  setFlagSettingsExpectedContent: () => setFlagSettingsExpectedContent,
  setFableCreditsRequired: () => setFableCreditsRequired,
  setFableConsentSessionFallback: () => setFableConsentSessionFallback,
  setFableConsentDialogInteracted: () => setFableConsentDialogInteracted,
  setFableBridgeDialogTimedOut: () => setFableBridgeDialogTimedOut,
  setEventLogger: () => setEventLogger,
  setDisableSlashCommands: () => setDisableSlashCommands,
  setDirectConnectServerUrl: () => setDirectConnectServerUrl,
  setCwdState: () => setCwdState,
  setCostStateForRestore: () => setCostStateForRestore,
  setClientType: () => setClientType,
  setChromeFlagOverride: () => setChromeFlagOverride,
  setCaps: () => setCaps,
  setCachedTelemetryResource: () => setCachedTelemetryResource,
  setCachedOtlpHttpAgentFactory: () => setCachedOtlpHttpAgentFactory,
  setCachedClaudeMdContent: () => setCachedClaudeMdContent,
  setAttacherCaps: () => setAttacherCaps,
  setApiKeyFromFd: () => setApiKeyFromFd,
  setAllowedSettingSources: () => setAllowedSettingSources,
  setAllowedChannels: () => setAllowedChannels,
  setAdditionalDirectoriesForClaudeMd: () => setAdditionalDirectoriesForClaudeMd,
  setActiveRoutine: () => setActiveRoutine,
  rewriteRefusalFallbackPreviousOverride: () => rewriteRefusalFallbackPreviousOverride,
  resetTotalDurationStateAndCost_FOR_TESTS_ONLY: () => resetTotalDurationStateAndCost_FOR_TESTS_ONLY,
  resetStateForTests: () => resetStateForTests,
  resetStartTime: () => resetStartTime,
  resetModelStringsForTestingOnly: () => resetModelStringsForTestingOnly,
  resetModelStrings: () => resetModelStrings,
  resetInteractionBaseline: () => resetInteractionBaseline,
  resetFdCredentialState: () => resetFdCredentialState,
  resetCostState: () => resetCostState,
  removeSessionCronTasks: () => removeSessionCronTasks,
  registerHookCallbacks: () => registerHookCallbacks,
  regenerateSessionId: () => regenerateSessionId,
  preferThirdPartyAuthentication: () => preferThirdPartyAuthentication,
  onTerminalFocusChange: () => onTerminalFocusChange,
  onSessionSwitch: () => onSessionSwitch,
  onOriginalCwdChange: () => onOriginalCwdChange,
  onInteraction: () => onInteraction,
  onAttacherCapsChange: () => onAttacherCapsChange,
  needsPlanModeExitAttachment: () => needsPlanModeExitAttachment,
  needsAutoModeExitAttachment: () => needsAutoModeExitAttachment,
  markScrollActivity: () => markScrollActivity,
  markPostCompaction: () => markPostCompaction,
  markFirstTeleportMessageLogged: () => markFirstTeleportMessageLogged,
  mainAgentId: () => mainAgentId,
  latchRefusalFallbackModel: () => latchRefusalFallbackModel,
  isUserActiveForNotifications: () => isUserActiveForNotifications,
  isSessionPersistenceDisabled: () => isSessionPersistenceDisabled,
  isSdkDialogHostActive: () => isSdkDialogHostActive,
  isReplBridgeActive: () => yH,
  isLongContext1mCreditsBlocked: () => isLongContext1mCreditsBlocked,
  isGatewayAuthPinned: () => isGatewayAuthPinned,
  isGatewayAuthExpired: () => isGatewayAuthExpired,
  isFableCreditsRequired: () => isFableCreditsRequired,
  incrementPromptIndex: () => incrementPromptIndex,
  incrementBudgetContinuationCount: () => incrementBudgetContinuationCount,
  hasUnknownModelCost: () => hasUnknownModelCost,
  hasShownLspRecommendationThisSession: () => hasShownLspRecommendationThisSession,
  hasFableConsentSessionFallback: () => hasFableConsentSessionFallback,
  hasFableConsentDialogInteracted: () => hasFableConsentDialogInteracted,
  hasFableBridgeDialogTimedOut: () => hasFableBridgeDialogTimedOut,
  hasExitedPlanModeInSession: () => hasExitedPlanModeInSession,
  handlePlanModeTransition: () => handlePlanModeTransition,
  handleAutoModeTransition: () => handleAutoModeTransition,
  getUserMsgOptIn: () => getUserMsgOptIn,
  getUseCoworkPlugins: () => getUseCoworkPlugins,
  getUsageForModel: () => getUsageForModel,
  getTurnOutputTokens: () => getTurnOutputTokens,
  getTracerProvider: () => getTracerProvider,
  getTotalWebSearchRequests: () => getTotalWebSearchRequests,
  getTotalToolDuration: () => getTotalToolDuration,
  getTotalOutputTokens: () => getTotalOutputTokens,
  getTotalLinesRemoved: () => getTotalLinesRemoved,
  getTotalLinesAdded: () => getTotalLinesAdded,
  getTotalInputTokens: () => getTotalInputTokens,
  getTotalDuration: () => getTotalDuration,
  getTotalCostUSD: () => getTotalCostUSD,
  getTotalCacheReadInputTokens: () => getTotalCacheReadInputTokens,
  getTotalCacheCreationInputTokens: () => getTotalCacheCreationInputTokens,
  getTotalAPIDurationWithoutRetries: () => getTotalAPIDurationWithoutRetries,
  getTotalAPIDuration: () => getTotalAPIDuration,
  getTokenCounter: () => getTokenCounter,
  getThinkingTypeOverride: () => getThinkingTypeOverride,
  getTerminalFocus: () => getTerminalFocus,
  getTeleportedSessionInfo: () => getTeleportedSessionInfo,
  getTeamMemoryServerStatus: () => getTeamMemoryServerStatus,
  getSystemPromptSectionCache: () => getSystemPromptSectionCache,
  getSyncedPluginDirs: () => getSyncedPluginDirs,
  getStrictToolResultPairing: () => getStrictToolResultPairing,
  getStrictMcpConfig: () => getStrictMcpConfig,
  getStickyBetas: () => getStickyBetas,
  getStatsStore: () => getStatsStore,
  getSlowOperations: () => getSlowOperations,
  getSessionTrustAccepted: () => getSessionTrustAccepted,
  getSessionStartType: () => getSessionStartType,
  getSessionSource: () => getSessionSource,
  getSessionSkillAllowlist: () => getSessionSkillAllowlist,
  getSessionProjectDir: () => getSessionProjectDir,
  getSessionPrResolved: () => getSessionPrResolved,
  getSessionIngressToken: () => getSessionIngressToken,
  getSessionId: () => getSessionId,
  getSessionCronTasks: () => getSessionCronTasks,
  getSessionCreatedTeams: () => getSessionCreatedTeams,
  getSessionCounter: () => getSessionCounter,
  getSessionBypassPermissionsMode: () => getSessionBypassPermissionsMode,
  getSearchToolsOptIn: () => getSearchToolsOptIn,
  getSdkSupportedDialogKinds: () => getSdkSupportedDialogKinds,
  getSdkOAuthTokenRefreshCallback: () => getSdkOAuthTokenRefreshCallback,
  getSdkDialogCapabilitySource: () => getSdkDialogCapabilitySource,
  getSdkBetas: () => getSdkBetas,
  getSdkAgentProgressSummariesEnabled: () => getSdkAgentProgressSummariesEnabled,
  getScheduledTasksEnabled: () => getScheduledTasksEnabled,
  getReplConfigArgv: () => getReplConfigArgv,
  getRendererModeForAnalytics: () => getRendererModeForAnalytics,
  getRegisteredHooks: () => getRegisteredHooks,
  getRefusalFallbackModelLatch: () => getRefusalFallbackModelLatch,
  getQuestionPreviewFormat: () => getQuestionPreviewFormat,
  getPromptIndex: () => getPromptIndex,
  getPromptId: () => getPromptId,
  getPromptCache1hAllowlist: () => getPromptCache1hAllowlist,
  getProjectRoot: () => getProjectRoot,
  getPrCounter: () => getPrCounter,
  getPlanSlugCache: () => getPlanSlugCache,
  getParentSessionId: () => getParentSessionId,
  getParentManagedSettings: () => getParentManagedSettings,
  getOriginalCwd: () => getOriginalCwd,
  getOnboardingShownThisSession: () => getOnboardingShownThisSession,
  getOauthTokenFromFd: () => getOauthTokenFromFd,
  getOauthScopesFromFd: () => getOauthScopesFromFd,
  getModelUsage: () => getModelUsage,
  getModelStrings: () => getModelStrings,
  getModelOverrideOptOutForSession: () => getModelOverrideOptOutForSession,
  getMeterProvider: () => getMeterProvider,
  getMeter: () => getMeter,
  getMemoryToggledOff: () => getMemoryToggledOff,
  getMcpConnectNonBlocking: () => getMcpConnectNonBlocking,
  getMcpClientsFromAccessor: () => getMcpClientsFromAccessor,
  getMainThreadAgentType: () => getMainThreadAgentType,
  getMainThreadAgentHooks: () => getMainThreadAgentHooks,
  getMainLoopModelOverride: () => getMainLoopModelOverride,
  getLoopTickInFlightPrompt: () => getLoopTickInFlightPrompt,
  getLoopConsecutiveKeepalives: () => getLoopConsecutiveKeepalives,
  getLoopChainStartedAt: () => getLoopChainStartedAt,
  getLoggerProvider: () => getLoggerProvider,
  getLocCounter: () => getLocCounter,
  getLastMainThreadCacheTtlMs: () => getLastMainThreadCacheTtlMs,
  getLastMainRequestId: () => getLastMainRequestId,
  getLastInteractionTime: () => getLastInteractionTime,
  getLastEmittedDate: () => getLastEmittedDate,
  getLastClassifierRequests: () => getLastClassifierRequests,
  getLastCancelledAPIMessageId: () => getLastCancelledAPIMessageId,
  getLastApiCompletionTimestamp: () => getLastApiCompletionTimestamp,
  getLastAPIRequestMessages: () => getLastAPIRequestMessages,
  getLastAPIRequest: () => getLastAPIRequest,
  getIsScrollDraining: () => getIsScrollDraining,
  getIsRemoteMode: () => getIsRemoteMode,
  getIsNonInteractiveSession: () => getIsNonInteractiveSession,
  getIsInteractive: () => getIsInteractive,
  getInvokedSkillsForAgent: () => getInvokedSkillsForAgent,
  getInvokedSkills: () => getInvokedSkills,
  getInlinePluginsNoMcp: () => getInlinePluginsNoMcp,
  getInlinePlugins: () => getInlinePlugins,
  getInlinePluginUrls: () => getInlinePluginUrls,
  getInitialMainLoopModel: () => getInitialMainLoopModel,
  getInitJsonSchema: () => getInitJsonSchema,
  getInheritedTeamName: () => getInheritedTeamName,
  getInferenceProfileBackingModelCached: () => getInferenceProfileBackingModelCached,
  getHostAuthTokenRefreshCallback: () => getHostAuthTokenRefreshCallback,
  getHasStreamingInput: () => getHasStreamingInput,
  getHasDevChannels: () => getHasDevChannels,
  getGatewayRefreshInFlight: () => getGatewayRefreshInFlight,
  getGatewayAuth: () => getGatewayAuth,
  getFoundryDeploymentCapabilities: () => getFoundryDeploymentCapabilities,
  getFlagSettingsPath: () => getFlagSettingsPath,
  getFlagSettingsInline: () => getFlagSettingsInline,
  getFlagSettingsExpectedContent: () => getFlagSettingsExpectedContent,
  getEventLogger: () => getEventLogger,
  getDisableSlashCommands: () => getDisableSlashCommands,
  getDirectConnectServerUrl: () => getDirectConnectServerUrl,
  getCwdState: () => getCwdState,
  getCurrentTurnTokenBudget: () => getCurrentTurnTokenBudget,
  getCostCounter: () => getCostCounter,
  getCommitCounter: () => getCommitCounter,
  getCodeEditToolDecisionCounter: () => getCodeEditToolDecisionCounter,
  getClientType: () => getClientType,
  getChromeFlagOverride: () => getChromeFlagOverride,
  getCaps: () => getCaps,
  getCachedTelemetryResource: () => getCachedTelemetryResource,
  getCachedOtlpHttpAgentFactory: () => getCachedOtlpHttpAgentFactory,
  getCachedClaudeMdContent: () => getCachedClaudeMdContent,
  getBudgetContinuationCount: () => getBudgetContinuationCount,
  getAttacherCaps: () => getAttacherCaps,
  getApiKeyFromFd: () => getApiKeyFromFd,
  getAllowedSettingSources: () => getAllowedSettingSources,
  getAllowedChannels: () => getAllowedChannels,
  getAgentColorMap: () => getAgentColorMap,
  getAdditionalDirectoriesForClaudeMd: () => getAdditionalDirectoriesForClaudeMd,
  getActiveTimeCounter: () => getActiveTimeCounter,
  getActiveRoutine: () => getActiveRoutine,
  flushInteractionTime: () => flushInteractionTime,
  discardPendingOTelEvents: () => discardPendingOTelEvents,
  deleteLoopChainStartedAt: () => deleteLoopChainStartedAt,
  consumePostCompaction: () => consumePostCompaction,
  clearSystemPromptSectionState: () => clearSystemPromptSectionState,
  clearRegisteredPluginHooks: () => clearRegisteredPluginHooks,
  clearRegisteredHooks: () => clearRegisteredHooks,
  clearRefusalFallbackModelLatch: () => clearRefusalFallbackModelLatch,
  clearInvokedSkillsForAgent: () => clearInvokedSkillsForAgent,
  clearInvokedSkills: () => clearInvokedSkills,
  clearBetaHeaderLatches: () => clearBetaHeaderLatches,
  bufferPendingOTelEvent: () => bufferPendingOTelEvent,
  addToTotalLinesChanged: () => addToTotalLinesChanged,
  addToTotalDurationState: () => addToTotalDurationState,
  addToTotalCostState: () => addToTotalCostState,
  addToToolDuration: () => addToToolDuration,
  addToInMemoryErrorLog: () => addToInMemoryErrorLog,
  addSlowOperation: () => addSlowOperation,
  addSessionCronTask: () => addSessionCronTask,
  addInvokedSkill: () => addInvokedSkill,
  NOTIF_ACTIVE_THRESHOLD_MS: () => NOTIF_ACTIVE_THRESHOLD_MS
});

/** Build the initial global session state object. Sets cwd from process.cwd() via fs.realpathSync. */
function R2o() {
  let cwdRaw = "";
  if (typeof process < "u" && typeof process.cwd === "function" && typeof ctr.realpathSync === "function") {
    let rawCwd = w2o.cwd();
    try {
      cwdRaw = vgt(ctr.realpathSync(rawCwd));
    } catch {
      cwdRaw = vgt(rawCwd);
    }
  }
  return {
    originalCwd: cwdRaw,
    projectRoot: cwdRaw,
    totalCostUSD: 0,
    totalAPIDuration: 0,
    totalAPIDurationWithoutRetries: 0,
    totalToolDuration: 0,
    startTime: Date.now(),
    lastInteractionTime: Date.now(),
    totalLinesAdded: 0,
    totalLinesRemoved: 0,
    hasUnknownModelCost: !1,
    cwd: cwdRaw,
    modelUsage: {},
    mainLoopModelOverride: void 0,
    refusalFallbackModelLatch: void 0,
    sdkDialogHostActive: !1,
    sdkSupportedDialogKinds: void 0,
    sdkSupportedDialogKindsSource: void 0,
    replConfigArgv: [],
    initialMainLoopModel: void 0,
    modelStrings: null,
    isInteractive: !1,
    attacherCaps: null,
    hasStreamingInput: !1,
    modelOverrideOptOutForSession: !1,
    rendererMode: void 0,
    strictToolResultPairing: !1,
    memoryToggledOff: !1,
    teamMemoryServerStatus: void 0,
    sdkAgentProgressSummariesEnabled: !1,
    userMsgOptIn: !1,
    searchToolsOptIn: !1,
    clientType: "cli",
    sessionSource: void 0,
    sessionStartType: "fresh",
    questionPreviewFormat: void 0,
    sessionIngressToken: void 0,
    oauthTokenFromFd: void 0,
    oauthScopesFromFd: void 0,
    apiKeyFromFd: void 0,
    gatewayAuth: null,
    gatewayRefreshInFlight: null,
    flagSettingsPath: void 0,
    flagSettingsExpectedContent: void 0,
    flagSettingsInline: null,
    parentManagedSettings: null,
    allowedSettingSources: ["userSettings", "projectSettings", "localSettings", "flagSettings", "policySettings"],
    meter: null,
    sessionCounter: null,
    locCounter: null,
    prCounter: null,
    commitCounter: null,
    costCounter: null,
    tokenCounter: null,
    codeEditToolDecisionCounter: null,
    activeTimeCounter: null,
    statsStore: null,
    sessionId: Egt() ?? Dde.randomUUID(),
    mainAgentId: null,
    parentSessionId: void 0,
    loggerProvider: null,
    eventLogger: null,
    pendingOTelEvents: [],
    meterProvider: null,
    tracerProvider: null,
    cachedTelemetryResource: null,
    cachedOtlpHttpAgentFactory: {
      direct: null,
      proxied: null
    },
    foundryDeploymentCapabilities: new Map(),
    agentColorMap: new Map(),
    agentColorIndex: 0,
    lastAPIRequest: null,
    lastCancelledAPIMessageId: null,
    lastAPIRequestMessages: null,
    lastClassifierRequests: null,
    cachedClaudeMdContent: null,
    inMemoryErrorLog: [],
    inlinePlugins: [],
    inlinePluginsNoMcp: [],
    inlinePluginUrls: [],
    syncedPluginDirs: [],
    chromeFlagOverride: void 0,
    onboardingShownThisSession: !1,
    useCoworkPlugins: !1,
    disableSlashCommands: !1,
    sessionBypassPermissionsMode: !1,
    scheduledTasksEnabled: !1,
    sessionPrResolved: !1,
    sessionCronTasks: [],
    loopChainStartedAt: Object.create(null),
    loopTickInFlightPrompt: null,
    loopConsecutiveKeepalives: 0,
    sessionCreatedTeams: new Set(),
    inheritedTeamName: void 0,
    sessionTrustAccepted: !1,
    sessionPersistenceDisabled: !1,
    hasExitedPlanMode: !1,
    needsPlanModeExitAttachment: !1,
    needsAutoModeExitAttachment: !1,
    lspRecommendationShownThisSession: !1,
    initJsonSchema: null,
    registeredHooks: null,
    planSlugCache: new Map(),
    teleportedSessionInfo: null,
    invokedSkills: new Map(),
    slowOperations: [],
    sdkBetas: void 0,
    longContext1mCreditsBlocked: !1,
    fableCreditsRequired: !1,
    fableConsentSessionFallback: !1,
    fableBridgeDialogTimedOut: !1,
    fableConsentDialogInteracted: !1,
    sdkOAuthTokenRefreshCallback: null,
    hostAuthTokenRefreshCallback: null,
    mainThreadAgentType: void 0,
    mainThreadAgentHooks: void 0,
    sessionSkillAllowlist: void 0,
    caps: OAc,
    replBridgeActive: !1,
    directConnectServerUrl: void 0,
    mcpConnectNonBlocking: !1,
    strictMcpConfig: !1,
    activeRoutine: void 0,
    systemPromptSectionCache: new Map(),
    lastEmittedDate: null,
    additionalDirectoriesForClaudeMd: [],
    allowedChannels: [],
    hasDevChannels: !1,
    sessionProjectDir: null,
    promptCache1hAllowlist: null,
    stickyBetas: wre(),
    thinkingTypeOverrides: new Map(),
    inferenceProfileBackingModels: new Map(),
    promptId: null,
    promptIndex: 0,
    lastMainRequestId: void 0,
    lastMainThreadCacheTtlMs: null,
    lastApiCompletionTimestamp: null,
    pendingPostCompaction: !1
  };
}

/** Install the agent-context accessor used to read sub-agent session state. */
function setSessionOverridesGetter(e: any) {
  agentMcpClients = e;
}

/** Return the current session ID, preferring a sub-agent context if present. */
function getSessionId() {
  return agentMcpClients()?.sessionId ?? Nt.sessionId;
}

/** Return the stable "main agent" UUID, deriving it from the session ID on first call. */
function mainAgentId() {
  let agentCtx = agentMcpClients()?.sessionId;
  if (agentCtx) return Rm(agentCtx);
  return Nt.mainAgentId ??= Rm(Nt.sessionId), Nt.mainAgentId;
}

/** Generate a new session UUID, optionally recording the previous one as parent. */
function regenerateSessionId(opts: any = {}) {
  if (opts.setCurrentAsParent) Nt.parentSessionId = Nt.sessionId;
  Nt.planSlugCache.delete(Nt.sessionId), Nt.sessionId = Dde.randomUUID(), Nt.sessionProjectDir = null, Nt.promptIndex = 0, Nt.lastCancelledAPIMessageId = null;
  let restoredOverride = k2o();
  return x2o(Nt.sessionId, "clear", restoredOverride), Nt.sessionId;
}

/** Emit a session-switch event (with or without restored-model payload). */
function x2o(sessionId: any, reason: any, restoredOverride: any) {
  if (restoredOverride) vKt.emit(sessionId, reason, restoredOverride);else vKt.emit(sessionId, reason);
}

/** Return the parent session ID from sub-agent context or main state. */
function getParentSessionId() {
  let agentCtx = agentMcpClients();
  return agentCtx ? agentCtx.parentSessionId : Nt.parentSessionId;
}

/** Switch to a different session, cleaning up state from the old one. */
function switchSession(newSessionId: any, reason: any, projectDir: any = null) {
  let restoredOverride: any;
  if (Nt.sessionId !== newSessionId) Nt.planSlugCache.delete(Nt.sessionId), Nt.lastCancelledAPIMessageId = null, restoredOverride = k2o();
  Nt.sessionId = newSessionId, Nt.sessionProjectDir = projectDir, x2o(newSessionId, reason, restoredOverride);
}

/**
 * If a refusal-fallback model latch is active and the current main-loop model
 * still matches the fallback model, clear the latch and revert the model override,
 * returning the previous model info for callers (e.g. session-switch event).
 */
function k2o() {
  let latch = Nt.refusalFallbackModelLatch;
  if (Nt.refusalFallbackModelLatch = void 0, !latch || Nt.mainLoopModelOverride !== latch.fallbackModel) return;
  return Nt.mainLoopModelOverride = latch.previousOverride, {
    appStateModel: latch.previousAppStateModel,
    forSessionValue: latch.previousModelForSession,
    overrideValue: latch.previousOverride,
    restoredToExplicitOverride: latch.previousOverride !== void 0,
    fallbackModel: latch.fallbackModel
  };
}

/** Return the current session's project directory from sub-agent context or main state. */
function getSessionProjectDir() {
  let agentCtx = agentMcpClients();
  return agentCtx ? agentCtx.sessionProjectDir : Nt.sessionProjectDir;
}
function getOriginalCwd() {
  return agentMcpClients()?.originalCwd ?? Nt.originalCwd;
}
function getProjectRoot() {
  return agentMcpClients()?.projectRoot ?? Nt.projectRoot;
}

/** Normalize a path to NFC Unicode form. */
function vgt(pathStr: any) {
  return pathStr.normalize("NFC");
}
function setOriginalCwd(pathStr: any) {
  Nt.originalCwd = vgt(pathStr), mtr.emit(Nt.originalCwd);
}
function setProjectRoot(pathStr: any) {
  Nt.projectRoot = vgt(pathStr);
}
function getCwdState() {
  return Nt.cwd;
}
function setCwdState(pathStr: any) {
  Nt.cwd = vgt(pathStr);
}
function resetStartTime() {
  Nt.startTime = Date.now();
}
function getDirectConnectServerUrl() {
  return Nt.directConnectServerUrl;
}
function setDirectConnectServerUrl(url: any) {
  Nt.directConnectServerUrl = url;
}
function getMcpConnectNonBlocking() {
  return Nt.mcpConnectNonBlocking;
}
function setMcpConnectNonBlocking(val: any) {
  Nt.mcpConnectNonBlocking = val;
}
function getStrictMcpConfig() {
  return Nt.strictMcpConfig;
}
function setStrictMcpConfig(val: any) {
  Nt.strictMcpConfig = val;
}
function getActiveRoutine() {
  return Nt.activeRoutine;
}
function setActiveRoutine(routine: any) {
  Nt.activeRoutine = routine;
}

/** Accumulate API duration (total and excluding retries). */
function addToTotalDurationState(durationMs: any, durationWithoutRetriesMs: any) {
  Nt.totalAPIDuration += durationMs, Nt.totalAPIDurationWithoutRetries += durationWithoutRetriesMs;
}
function resetTotalDurationStateAndCost_FOR_TESTS_ONLY() {
  Nt.totalAPIDuration = 0, Nt.totalAPIDurationWithoutRetries = 0, Nt.totalCostUSD = 0;
}

/** Record per-model usage and add the cost increment to the session total. */
function addToTotalCostState(costDelta: any, modelUsageSnapshot: any, modelKey: any) {
  Nt.modelUsage[modelKey] = modelUsageSnapshot, Nt.totalCostUSD += costDelta;
}
function getTotalCostUSD() {
  return Nt.totalCostUSD;
}
function getTotalAPIDuration() {
  return Nt.totalAPIDuration;
}
function getTotalDuration() {
  return Date.now() - Nt.startTime;
}
function getTotalAPIDurationWithoutRetries() {
  return Nt.totalAPIDurationWithoutRetries;
}
function getTotalToolDuration() {
  return Nt.totalToolDuration;
}
function addToToolDuration(durationMs: any) {
  Nt.totalToolDuration += durationMs;
}
function getStatsStore() {
  return Nt.statsStore;
}
function setStatsStore(store: any) {
  Nt.statsStore = store;
}

/** Mark an interaction as happening. If immediate=true, flush the timestamp now; otherwise defer to next flush. */
function updateLastInteractionTime(immediate: any) {
  if (immediate) H2o();else xKt = !0;
}
function flushInteractionTime() {
  if (xKt) H2o();
}

/** Commit the deferred interaction timestamp and notify subscribers. */
function H2o() {
  Nt.lastInteractionTime = Date.now(), xKt = !1, vtr.emit();
}
function resetInteractionBaseline() {
  Nt.lastInteractionTime = Date.now(), xKt = !1;
}
function addToTotalLinesChanged(linesAdded: any, linesRemoved: any) {
  Nt.totalLinesAdded += linesAdded, Nt.totalLinesRemoved += linesRemoved;
}
function getTotalLinesAdded() {
  return Nt.totalLinesAdded;
}
function getTotalLinesRemoved() {
  return Nt.totalLinesRemoved;
}
function getTotalInputTokens() {
  return OWe(Object.values(Nt.modelUsage), "inputTokens");
}
function getTotalOutputTokens() {
  return OWe(Object.values(Nt.modelUsage), "outputTokens");
}
function getTotalCacheReadInputTokens() {
  return OWe(Object.values(Nt.modelUsage), "cacheReadInputTokens");
}
function getTotalCacheCreationInputTokens() {
  return OWe(Object.values(Nt.modelUsage), "cacheCreationInputTokens");
}
function getTotalWebSearchRequests() {
  return OWe(Object.values(Nt.modelUsage), "webSearchRequests");
}

/** Output tokens emitted in the current turn (since the last snapshot). */
function getTurnOutputTokens() {
  return getTotalOutputTokens() - xtr;
}
function getCurrentTurnTokenBudget() {
  return ktr;
}

/** Record a per-turn baseline for output tokens and set the token budget. */
function snapshotOutputTokensForTurn(budget: any) {
  xtr = getTotalOutputTokens(), ktr = budget, HKt = 0;
}
function getBudgetContinuationCount() {
  return HKt;
}
function incrementBudgetContinuationCount() {
  HKt++;
}
function setHasUnknownModelCost() {
  Nt.hasUnknownModelCost = !0;
}
function hasUnknownModelCost() {
  return Nt.hasUnknownModelCost;
}
function getLastMainRequestId() {
  return Nt.lastMainRequestId;
}
function setLastMainRequestId(requestId: any) {
  Nt.lastMainRequestId = requestId;
}
function getLastMainThreadCacheTtlMs() {
  return Nt.lastMainThreadCacheTtlMs;
}
function setLastMainThreadCacheTtlMs(ttlMs: any) {
  Nt.lastMainThreadCacheTtlMs = ttlMs;
}
function getLastApiCompletionTimestamp() {
  return Nt.lastApiCompletionTimestamp;
}
function setLastApiCompletionTimestamp(ts: any) {
  Nt.lastApiCompletionTimestamp = ts;
}
function markPostCompaction() {
  Nt.pendingPostCompaction = !0;
}
function consumePostCompaction() {
  let pending = Nt.pendingPostCompaction;
  return Nt.pendingPostCompaction = !1, pending;
}
function getLastInteractionTime() {
  return Nt.lastInteractionTime;
}
function setTerminalFocusForState(focused: any) {
  Otr = focused, Ltr.emit();
}
function getTerminalFocus() {
  return Otr;
}

/** User is "active for notifications" if the terminal has focus or if they interacted recently. */
function isUserActiveForNotifications() {
  let focus = getTerminalFocus();
  if (focus !== void 0) return focus;
  return Date.now() - getLastInteractionTime() < NOTIF_ACTIVE_THRESHOLD_MS;
}

/** Track scroll activity with a debounced timeout to determine drain state. */
function markScrollActivity() {
  if (wKt = !0, Cgt) clearTimeout(Cgt);
  Cgt = setTimeout(() => {
    wKt = !1, Cgt = void 0;
  }, I2o), Cgt.unref?.();
}
function getIsScrollDraining() {
  return wKt;
}
async function waitForScrollIdle() {
  while (wKt) await new Promise((resolve: any) => setTimeout(resolve, I2o));
}
function getModelUsage() {
  return Nt.modelUsage;
}
function getUsageForModel(modelKey: any) {
  return Nt.modelUsage[modelKey];
}
function getMainLoopModelOverride() {
  return Nt.mainLoopModelOverride;
}
function getInitialMainLoopModel() {
  return Nt.initialMainLoopModel;
}
function setMainLoopModelOverride(model: any) {
  Nt.mainLoopModelOverride = model;
}

/**
 * Latch a refusal-fallback model. If a latch already exists and the current
 * main-loop model is the latched fallback, update only the fallback model field
 * (preserve the rest of the latch so it can revert correctly on session switch).
 */
function latchRefusalFallbackModel(latchInfo: any) {
  let existing = Nt.refusalFallbackModelLatch;
  if (existing && Nt.mainLoopModelOverride === existing.fallbackModel) {
    Nt.refusalFallbackModelLatch = {
      ...existing,
      fallbackModel: latchInfo.fallbackModel
    };
    return;
  }
  Nt.refusalFallbackModelLatch = latchInfo;
}
function clearRefusalFallbackModelLatch() {
  Nt.refusalFallbackModelLatch = void 0;
}
function getRefusalFallbackModelLatch() {
  return Nt.refusalFallbackModelLatch;
}
function rewriteRefusalFallbackPreviousOverride(previousOverride: any) {
  if (Nt.refusalFallbackModelLatch) Nt.refusalFallbackModelLatch = {
    ...Nt.refusalFallbackModelLatch,
    previousOverride: previousOverride
  };
}
function setSdkDialogHostActive(active: any) {
  Nt.sdkDialogHostActive = active;
}
function isSdkDialogHostActive() {
  return Nt.sdkDialogHostActive;
}
function setSdkSupportedDialogKinds(kinds: any, source: any) {
  Nt.sdkSupportedDialogKinds = kinds, Nt.sdkSupportedDialogKindsSource = kinds === void 0 ? void 0 : source;
}
function getSdkSupportedDialogKinds() {
  return Nt.sdkSupportedDialogKinds;
}
function getSdkDialogCapabilitySource() {
  if (Nt.sdkSupportedDialogKinds === void 0) return "none";
  return Nt.sdkSupportedDialogKindsSource ?? "none";
}
function getReplConfigArgv() {
  return Nt.replConfigArgv;
}
function setReplConfigArgv(argv: any) {
  Nt.replConfigArgv = argv;
}
function setInitialMainLoopModel(model: any) {
  Nt.initialMainLoopModel = model;
}
function getSdkBetas() {
  return agentMcpClients()?.sdkBetas ?? Nt.sdkBetas;
}
function setSdkBetas(betas: any) {
  Nt.sdkBetas = betas;
}
function isLongContext1mCreditsBlocked() {
  return Nt.longContext1mCreditsBlocked;
}
function setLongContext1mCreditsBlocked(blocked: any) {
  Nt.longContext1mCreditsBlocked = blocked;
}
function isFableCreditsRequired() {
  return Nt.fableCreditsRequired;
}
function setFableCreditsRequired(required: any) {
  Nt.fableCreditsRequired = required;
}
function hasFableBridgeDialogTimedOut() {
  return Nt.fableBridgeDialogTimedOut;
}
function setFableBridgeDialogTimedOut(timedOut: any = !0) {
  Nt.fableBridgeDialogTimedOut = timedOut;
}
function hasFableConsentDialogInteracted() {
  return Nt.fableConsentDialogInteracted;
}
function setFableConsentDialogInteracted(interacted: any = !0) {
  Nt.fableConsentDialogInteracted = interacted;
}
function hasFableConsentSessionFallback() {
  return Nt.fableConsentSessionFallback;
}
function setFableConsentSessionFallback(fallback: any) {
  Nt.fableConsentSessionFallback = fallback;
}
function getSdkOAuthTokenRefreshCallback() {
  return Nt.sdkOAuthTokenRefreshCallback;
}
function setSdkOAuthTokenRefreshCallback(cb: any) {
  Nt.sdkOAuthTokenRefreshCallback = cb;
}
function getHostAuthTokenRefreshCallback() {
  return Nt.hostAuthTokenRefreshCallback;
}
function setHostAuthTokenRefreshCallback(cb: any) {
  Nt.hostAuthTokenRefreshCallback = cb;
}

/** Reset all cost/duration/line counters for the session. */
function resetCostState() {
  Nt.totalCostUSD = 0, Nt.totalAPIDuration = 0, Nt.totalAPIDurationWithoutRetries = 0, Nt.totalToolDuration = 0, Nt.startTime = Date.now(), Nt.totalLinesAdded = 0, Nt.totalLinesRemoved = 0, Nt.hasUnknownModelCost = !1, Nt.modelUsage = {}, Nt.promptId = null;
}

/** Restore cost/duration/line state from a persisted snapshot (e.g. session reload). */
function setCostStateForRestore({
  totalCostUSD: e,
  totalAPIDuration: t,
  totalAPIDurationWithoutRetries: n,
  totalToolDuration: r,
  totalLinesAdded: o,
  totalLinesRemoved: s,
  lastDuration: i,
  modelUsage: a
}: any) {
  if (Nt.totalCostUSD = e, Nt.totalAPIDuration = t, Nt.totalAPIDurationWithoutRetries = n, Nt.totalToolDuration = r, Nt.totalLinesAdded = o, Nt.totalLinesRemoved = s, a) Nt.modelUsage = a;
  if (i) Nt.startTime = Date.now() - i;
}
function resetStateForTests() {
  throw Error("resetStateForTests can only be called in tests");
}
function getModelStrings() {
  return Nt.modelStrings;
}
function setModelStrings(strings: any) {
  Nt.modelStrings = strings;
}
function resetModelStrings() {
  Nt.modelStrings = null;
}
function resetModelStringsForTestingOnly() {
  resetModelStrings();
}

/** Initialize all OTel metric counters using the provided meter factory. */
function setMeter(meter: any, counterFactory: any) {
  Nt.meter = meter, Nt.sessionCounter = counterFactory("claude_code.session.count", {
    description: "Count of CLI sessions started"
  }), Nt.locCounter = counterFactory("claude_code.lines_of_code.count", {
    description: "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed and the 'model' attribute indicating which model made the change"
  }), Nt.prCounter = counterFactory("claude_code.pull_request.count", {
    description: "Number of pull requests created"
  }), Nt.commitCounter = counterFactory("claude_code.commit.count", {
    description: "Number of git commits created"
  }), Nt.costCounter = counterFactory("claude_code.cost.usage", {
    description: "Cost of the Claude Code session",
    unit: "USD"
  }), Nt.tokenCounter = counterFactory("claude_code.token.usage", {
    description: "Number of tokens used",
    unit: "tokens"
  }), Nt.codeEditToolDecisionCounter = counterFactory("claude_code.code_edit_tool.decision", {
    description: "Count of code editing tool permission decisions (accept/reject) for Edit, Write, and NotebookEdit tools"
  }), Nt.activeTimeCounter = counterFactory("claude_code.active_time.total", {
    description: "Total active time in seconds",
    unit: "s"
  });
}
function getMeter() {
  return Nt.meter;
}
function getSessionCounter() {
  return Nt.sessionCounter;
}
function getLocCounter() {
  return Nt.locCounter;
}
function getPrCounter() {
  return Nt.prCounter;
}
function getCommitCounter() {
  return Nt.commitCounter;
}
function getCostCounter() {
  return Nt.costCounter;
}
function getTokenCounter() {
  return Nt.tokenCounter;
}
function getCodeEditToolDecisionCounter() {
  return Nt.codeEditToolDecisionCounter;
}
function getActiveTimeCounter() {
  return Nt.activeTimeCounter;
}
function getLoggerProvider() {
  return Nt.loggerProvider;
}
function setLoggerProvider(provider: any) {
  Nt.loggerProvider = provider;
}
function getEventLogger() {
  return Nt.eventLogger;
}

/** Install the event logger; flush any buffered OTel events to it immediately. */
function setEventLogger(logger: any) {
  if (Nt.eventLogger = logger, !logger) return;
  let pendingEvents = Nt.pendingOTelEvents;
  if (Nt.pendingOTelEvents = null, pendingEvents) for (let event of pendingEvents) logger.emit(event);
}

/** Buffer an OTel event until the event logger is ready. Returns false if buffer is full or null. */
function bufferPendingOTelEvent(event: any) {
  if (Nt.pendingOTelEvents === null || Nt.pendingOTelEvents.length >= GAc) return !1;
  return Nt.pendingOTelEvents.push(event), !0;
}
function discardPendingOTelEvents() {
  Nt.pendingOTelEvents = null;
}
function getMeterProvider() {
  return Nt.meterProvider;
}
function setMeterProvider(provider: any) {
  Nt.meterProvider = provider;
}
function getTracerProvider() {
  return Nt.tracerProvider;
}
function setTracerProvider(provider: any) {
  Nt.tracerProvider = provider;
}
function getFoundryDeploymentCapabilities() {
  return Nt.foundryDeploymentCapabilities;
}
function getCachedTelemetryResource() {
  return Nt.cachedTelemetryResource;
}
function setCachedTelemetryResource(resource: any) {
  Nt.cachedTelemetryResource = resource;
}
function getCachedOtlpHttpAgentFactory(proxied: any) {
  return Nt.cachedOtlpHttpAgentFactory[proxied ? "proxied" : "direct"];
}
function setCachedOtlpHttpAgentFactory(proxied: any, factory: any) {
  Nt.cachedOtlpHttpAgentFactory[proxied ? "proxied" : "direct"] = factory;
}
function getIsNonInteractiveSession() {
  return !Nt.isInteractive;
}
function getIsInteractive() {
  return Nt.isInteractive;
}
function setIsInteractive(interactive: any) {
  Nt.isInteractive = interactive;
}
function getAttacherCaps() {
  return Nt.attacherCaps;
}
function setAttacherCaps(caps: any) {
  Nt.attacherCaps = caps, hnr.emit();
}
function getModelOverrideOptOutForSession() {
  return Nt.modelOverrideOptOutForSession;
}
function setModelOverrideOptOutForSession() {
  Nt.modelOverrideOptOutForSession = !0;
}
function getHasStreamingInput() {
  return Nt.hasStreamingInput;
}
function setHasStreamingInput(streaming: any) {
  Nt.hasStreamingInput = streaming;
}
function getClientType() {
  return Nt.clientType;
}
function setClientType(clientType: any) {
  Nt.clientType = clientType;
}
function getSdkAgentProgressSummariesEnabled() {
  return Nt.sdkAgentProgressSummariesEnabled;
}
function setSdkAgentProgressSummariesEnabled(enabled: any) {
  Nt.sdkAgentProgressSummariesEnabled = enabled;
}
function getRendererModeForAnalytics() {
  return Nt.rendererMode;
}
function setRendererModeForAnalytics(mode: any) {
  Nt.rendererMode = mode;
}
function getStrictToolResultPairing() {
  return Nt.strictToolResultPairing;
}
function setStrictToolResultPairing(strict: any) {
  Nt.strictToolResultPairing = strict;
}
function getMemoryToggledOff() {
  return Nt.memoryToggledOff;
}
function setMemoryToggledOff(toggled: any) {
  Nt.memoryToggledOff = toggled;
}
function getTeamMemoryServerStatus() {
  return Nt.teamMemoryServerStatus;
}
function setTeamMemoryServerStatus(status: any) {
  Nt.teamMemoryServerStatus = status;
}
function getUserMsgOptIn() {
  return Nt.userMsgOptIn;
}
function setUserMsgOptIn(optIn: any) {
  Nt.userMsgOptIn = optIn;
}
function getSearchToolsOptIn() {
  return Nt.searchToolsOptIn;
}
function setSearchToolsOptIn(optIn: any) {
  Nt.searchToolsOptIn = optIn;
}
function getSessionSource() {
  return Nt.sessionSource;
}
function setSessionSource(source: any) {
  Nt.sessionSource = source;
}
function getSessionStartType() {
  return Nt.sessionStartType;
}
function setSessionStartType(startType: any) {
  Nt.sessionStartType = startType;
}
function getQuestionPreviewFormat() {
  return Nt.questionPreviewFormat;
}
function setQuestionPreviewFormat(format: any) {
  Nt.questionPreviewFormat = format;
}
function getAgentColorMap() {
  return Nt.agentColorMap;
}
function getFlagSettingsPath() {
  return Nt.flagSettingsPath;
}
function setFlagSettingsPath(flagPath: any) {
  Nt.flagSettingsPath = flagPath;
}
function getFlagSettingsExpectedContent() {
  return Nt.flagSettingsExpectedContent;
}
function setFlagSettingsExpectedContent(content: any) {
  Nt.flagSettingsExpectedContent = content;
}
function getFlagSettingsInline() {
  return Nt.flagSettingsInline;
}
function setFlagSettingsInline(inline: any) {
  Nt.flagSettingsInline = inline;
}
function getParentManagedSettings() {
  return Nt.parentManagedSettings;
}
function setParentManagedSettings(settings: any) {
  Nt.parentManagedSettings = settings;
}

/** Return the session ingress token, reading from agent secrets if in a sub-agent context. */
function getSessionIngressToken() {
  let agentCtx = agentMcpClients();
  return agentCtx ? agentCtx.secrets.sessionIngressToken : Nt.sessionIngressToken;
}
function setSessionIngressToken(token: any) {
  Nt.sessionIngressToken = token;
}
function getOauthTokenFromFd() {
  return Nt.oauthTokenFromFd;
}
function setOauthTokenFromFd(token: any) {
  Nt.oauthTokenFromFd = token;
}
function getOauthScopesFromFd() {
  return Nt.oauthScopesFromFd;
}
function setOauthScopesFromFd(scopes: any) {
  Nt.oauthScopesFromFd = scopes;
}
function getApiKeyFromFd() {
  return Nt.apiKeyFromFd;
}
function setApiKeyFromFd(apiKey: any) {
  Nt.apiKeyFromFd = apiKey;
}
function resetFdCredentialState() {
  Nt.oauthTokenFromFd = void 0, Nt.oauthScopesFromFd = void 0, Nt.apiKeyFromFd = void 0;
}
function getGatewayAuth() {
  return Nt.gatewayAuth;
}
function isGatewayAuthExpired() {
  let auth = Nt.gatewayAuth;
  return !!auth && auth.expiresAt <= Date.now();
}
function isGatewayAuthPinned(auth: any) {
  return !!auth && !auth.unpinned;
}
function setGatewayAuth(auth: any) {
  Nt.gatewayAuth = auth;
}
function getGatewayRefreshInFlight() {
  return Nt.gatewayRefreshInFlight;
}
function setGatewayRefreshInFlight(promise: any) {
  Nt.gatewayRefreshInFlight = promise;
}
function setLastAPIRequest(request: any) {
  Nt.lastAPIRequest = request;
}
function getLastAPIRequest() {
  return Nt.lastAPIRequest;
}
function setLastCancelledAPIMessageId(messageId: any) {
  Nt.lastCancelledAPIMessageId = messageId;
}
function getLastCancelledAPIMessageId() {
  return Nt.lastCancelledAPIMessageId;
}
function setLastAPIRequestMessages(messages: any) {
  Nt.lastAPIRequestMessages = messages;
}
function getLastAPIRequestMessages() {
  return Nt.lastAPIRequestMessages;
}
function setLastClassifierRequests(requests: any) {
  Nt.lastClassifierRequests = requests;
}
function getLastClassifierRequests() {
  return Nt.lastClassifierRequests;
}

/** Set cached CLAUDE.md content, routing to sub-agent context if active. */
function setCachedClaudeMdContent(content: any) {
  let agentCtx = agentMcpClients();
  if (agentCtx) agentCtx.cachedClaudeMdContent = content;else Nt.cachedClaudeMdContent = content;
}
function getCachedClaudeMdContent() {
  let agentCtx = agentMcpClients();
  return agentCtx ? agentCtx.cachedClaudeMdContent : Nt.cachedClaudeMdContent;
}

/** Append an error to the in-memory log, evicting the oldest entry when full (cap 100). */
function addToInMemoryErrorLog(error: any) {
  if (Nt.inMemoryErrorLog.length >= 100) Nt.inMemoryErrorLog.shift();
  Nt.inMemoryErrorLog.push(error);
}
function getAllowedSettingSources() {
  return Nt.allowedSettingSources;
}
function setAllowedSettingSources(sources: any) {
  Nt.allowedSettingSources = sources;
}

/** In non-interactive sessions that are not VS Code, prefer third-party auth flows. */
function preferThirdPartyAuthentication() {
  return getIsNonInteractiveSession() && Nt.clientType !== "claude-vscode";
}
function setInlinePlugins(plugins: any) {
  Nt.inlinePlugins = plugins;
}
function getInlinePlugins() {
  return Nt.inlinePlugins;
}
function setInlinePluginsNoMcp(plugins: any) {
  Nt.inlinePluginsNoMcp = plugins;
}
function getInlinePluginsNoMcp() {
  return Nt.inlinePluginsNoMcp;
}
function setInlinePluginUrls(urls: any) {
  Nt.inlinePluginUrls = urls;
}
function getInlinePluginUrls() {
  return Nt.inlinePluginUrls;
}
function setSyncedPluginDirs(dirs: any) {
  Nt.syncedPluginDirs = dirs;
}
function getSyncedPluginDirs() {
  return Nt.syncedPluginDirs;
}
function setChromeFlagOverride(flag: any) {
  Nt.chromeFlagOverride = flag;
}
function getChromeFlagOverride() {
  return Nt.chromeFlagOverride;
}
function setOnboardingShownThisSession(shown: any) {
  Nt.onboardingShownThisSession = shown;
}
function getOnboardingShownThisSession() {
  return Nt.onboardingShownThisSession;
}

/** Enable/disable co-work plugins and notify plugin system via f_(). */
function setUseCoworkPlugins(use: any) {
  Nt.useCoworkPlugins = use, f_();
}
function getUseCoworkPlugins() {
  return Nt.useCoworkPlugins;
}
function setDisableSlashCommands(disable: any) {
  Nt.disableSlashCommands = disable;
}
function getDisableSlashCommands() {
  return Nt.disableSlashCommands;
}
function setSessionBypassPermissionsMode(bypass: any) {
  Nt.sessionBypassPermissionsMode = bypass;
}
function getSessionBypassPermissionsMode() {
  return Nt.sessionBypassPermissionsMode;
}
function setScheduledTasksEnabled(enabled: any) {
  Nt.scheduledTasksEnabled = enabled;
}
function getScheduledTasksEnabled() {
  return Nt.scheduledTasksEnabled;
}

/** Return cron tasks for the current session (sub-agent aware). */
function getSessionCronTasks() {
  return agentMcpClients()?.sessionCronTasks ?? Nt.sessionCronTasks;
}
function getSessionPrResolved() {
  return Nt.sessionPrResolved;
}
function setSessionPrResolved(resolved: any) {
  Nt.sessionPrResolved = resolved;
}
function addSessionCronTask(task: any) {
  Nt.sessionCronTasks.push(task);
}
function getLoopChainStartedAt(chainKey: any) {
  return Nt.loopChainStartedAt[chainKey];
}
function setLoopChainStartedAt(chainKey: any, timestamp: any) {
  Nt.loopChainStartedAt[chainKey] = timestamp;
}
function deleteLoopChainStartedAt(chainKey: any) {
  delete Nt.loopChainStartedAt[chainKey];
}
function getLoopTickInFlightPrompt() {
  return Nt.loopTickInFlightPrompt;
}
function setLoopTickInFlightPrompt(promise: any) {
  Nt.loopTickInFlightPrompt = promise;
}
function getLoopConsecutiveKeepalives() {
  return Nt.loopConsecutiveKeepalives;
}
function setLoopConsecutiveKeepalives(count: any) {
  Nt.loopConsecutiveKeepalives = count;
}

/** Remove cron tasks by their IDs; returns count removed. */
function removeSessionCronTasks(taskIds: any) {
  if (taskIds.length === 0) return 0;
  let idSet = new Set(taskIds),
    filtered = Nt.sessionCronTasks.filter((task: any) => !idSet.has(task.id)),
    removedCount = Nt.sessionCronTasks.length - filtered.length;
  if (removedCount === 0) return 0;
  return Nt.sessionCronTasks = filtered, removedCount;
}
function setSessionTrustAccepted(accepted: any) {
  Nt.sessionTrustAccepted = accepted;
}
function getSessionTrustAccepted() {
  return Nt.sessionTrustAccepted;
}
function setSessionPersistenceDisabled(disabled: any) {
  Nt.sessionPersistenceDisabled = disabled;
}
function isSessionPersistenceDisabled() {
  return Nt.sessionPersistenceDisabled;
}
function hasExitedPlanModeInSession() {
  return Nt.hasExitedPlanMode;
}
function setHasExitedPlanMode(exited: any) {
  Nt.hasExitedPlanMode = exited;
}
function needsPlanModeExitAttachment() {
  return Nt.needsPlanModeExitAttachment;
}
function setNeedsPlanModeExitAttachment(needs: any) {
  Nt.needsPlanModeExitAttachment = needs;
}

/** Track plan-mode transitions: entering plan clears the attachment flag, leaving plan sets it. */
function handlePlanModeTransition(prevMode: any, nextMode: any) {
  if (nextMode === "plan" && prevMode !== "plan") Nt.needsPlanModeExitAttachment = !1;
  if (prevMode === "plan" && nextMode !== "plan") Nt.needsPlanModeExitAttachment = !0;
}
function needsAutoModeExitAttachment() {
  return Nt.needsAutoModeExitAttachment;
}
function setNeedsAutoModeExitAttachment(needs: any) {
  Nt.needsAutoModeExitAttachment = needs;
}

/** Track auto-mode transitions (auto↔plan transitions are ignored). */
function handleAutoModeTransition(prevMode: any, nextMode: any) {
  if (prevMode === "auto" && nextMode === "plan" || prevMode === "plan" && nextMode === "auto") return;
  let wasAuto = prevMode === "auto",
    isAuto = nextMode === "auto";
  if (isAuto && !wasAuto) Nt.needsAutoModeExitAttachment = !1;
  if (wasAuto && !isAuto) Nt.needsAutoModeExitAttachment = !0;
}
function hasShownLspRecommendationThisSession() {
  return Nt.lspRecommendationShownThisSession;
}
function setLspRecommendationShownThisSession(shown: any) {
  Nt.lspRecommendationShownThisSession = shown;
}
function setInitJsonSchema(schema: any) {
  Nt.initJsonSchema = schema;
}
function getInitJsonSchema() {
  return Nt.initJsonSchema;
}
function setMcpClientsAccessor(accessor: any) {
  urr = accessor;
}
function getMcpClientsFromAccessor() {
  return urr?.();
}

/** Return the active session context: sub-agent if available, otherwise main state. */
function XKt() {
  return agentMcpClients() ?? Nt;
}

/** Register one or more hook callbacks into the context's registeredHooks map. */
function registerHookCallbacks(hookMap: any) {
  let ctx = XKt();
  if (!ctx.registeredHooks) ctx.registeredHooks = {};
  for (let [hookName, callbacks] of Object.entries(hookMap)) {
    let key = hookName;
    if (!ctx.registeredHooks[key]) ctx.registeredHooks[key] = [];
    ctx.registeredHooks[key].push(...callbacks);
  }
}
function getRegisteredHooks() {
  return XKt().registeredHooks;
}
function clearRegisteredHooks() {
  XKt().registeredHooks = null;
}

/** Remove only plugin-owned hooks (those with a pluginRoot property), keeping non-plugin hooks. */
function clearRegisteredPluginHooks() {
  let ctx = XKt();
  if (!ctx.registeredHooks) return;
  let retained: any = {};
  for (let [hookName, callbacks] of Object.entries(ctx.registeredHooks)) {
    let nonPlugin = (callbacks as any[]).filter((cb: any) => !("pluginRoot" in cb));
    if (nonPlugin.length > 0) retained[hookName] = nonPlugin;
  }
  ctx.registeredHooks = Object.keys(retained).length > 0 ? retained : null;
}
function getPlanSlugCache() {
  return Nt.planSlugCache;
}
function getSessionCreatedTeams() {
  return agentMcpClients()?.sessionCreatedTeams ?? Nt.sessionCreatedTeams;
}
function getInheritedTeamName() {
  return Nt.inheritedTeamName;
}
function setInheritedTeamName(teamName: any) {
  Nt.inheritedTeamName = teamName;
}

/** Record that this session is a teleport; the first-message log flag starts false. */
function setTeleportedSessionInfo(info: any) {
  Nt.teleportedSessionInfo = {
    isTeleported: !0,
    hasLoggedFirstMessage: !1,
    sessionId: info.sessionId
  };
}
function getTeleportedSessionInfo() {
  return Nt.teleportedSessionInfo;
}
function markFirstTeleportMessageLogged() {
  if (Nt.teleportedSessionInfo) Nt.teleportedSessionInfo.hasLoggedFirstMessage = !0;
}

/** Record a skill invocation keyed by agentId+skillName. */
function addInvokedSkill(skillName: any, skillPath: any, content: any, agentId: any = null) {
  let skillKey = `${agentId ?? ""}:${skillName}`;
  Nt.invokedSkills.set(skillKey, {
    skillName: skillName,
    skillPath: skillPath,
    content: content,
    invokedAt: Date.now(),
    agentId: agentId
  });
}
function getInvokedSkills() {
  return Nt.invokedSkills;
}

/** Return a filtered map of skills invoked by a specific agent (or by the main agent if null). */
function getInvokedSkillsForAgent(agentId: any) {
  let targetAgentId = agentId ?? null,
    result = new Map();
  for (let [key, entry] of Nt.invokedSkills) if (entry.agentId === targetAgentId) result.set(key, entry);
  return result;
}

/**
 * Clear invoked skills. If an activeAgentIds set is provided, only remove
 * skills from agents NOT in that set (or from the main/null agent).
 */
function clearInvokedSkills(activeAgentIds: any) {
  if (!activeAgentIds || activeAgentIds.size === 0) {
    Nt.invokedSkills.clear();
    return;
  }
  for (let [key, entry] of Nt.invokedSkills) if (entry.agentId === null || !activeAgentIds.has(entry.agentId)) Nt.invokedSkills.delete(key);
}
function clearInvokedSkillsForAgent(agentId: any) {
  for (let [key, entry] of Nt.invokedSkills) if (entry.agentId === agentId) Nt.invokedSkills.delete(key);
}

/** No-op stub for recording slow operations (always returns immediately). */
function addSlowOperation(e: any, t: any) {
  return;
}

/** Return the list of recent slow operations, filtering out entries older than the TTL. */
function getSlowOperations() {
  if (Nt.slowOperations.length === 0) return v2o;
  let now = Date.now();
  if (Nt.slowOperations.some((op: any) => now - op.timestamp >= utr)) {
    if (Nt.slowOperations = Nt.slowOperations.filter((op: any) => now - op.timestamp < utr), Nt.slowOperations.length === 0) return v2o;
  }
  return Nt.slowOperations;
}

/** Return the main-thread agent type, reading from sub-agent context if active. */
function getMainThreadAgentType() {
  let agentCtx = agentMcpClients();
  return agentCtx ? agentCtx.mainThreadAgentType : Nt.mainThreadAgentType;
}
function setMainThreadAgentType(agentType: any) {
  let agentCtx = agentMcpClients();
  if (agentCtx) agentCtx.mainThreadAgentType = agentType;else Nt.mainThreadAgentType = agentType;
}
function getMainThreadAgentHooks() {
  let agentCtx = agentMcpClients();
  return agentCtx ? agentCtx.mainThreadAgentHooks : Nt.mainThreadAgentHooks;
}
function setMainThreadAgentHooks(hooks: any) {
  let agentCtx = agentMcpClients();
  if (agentCtx) agentCtx.mainThreadAgentHooks = hooks;else Nt.mainThreadAgentHooks = hooks;
}
function getSessionSkillAllowlist() {
  return Nt.sessionSkillAllowlist;
}
function setSessionSkillAllowlist(allowlist: any) {
  Nt.sessionSkillAllowlist = allowlist;
}
function getCaps() {
  return Nt.caps;
}
function setCaps(caps: any) {
  Nt.caps = caps;
}
function getIsRemoteMode() {
  return Nt.caps.workspace === "remote";
}
function setIsRemoteMode(remote: any) {
  Nt.caps = {
    ...Nt.caps,
    workspace: remote ? "remote" : "local"
  };
}
function getSystemPromptSectionCache() {
  return Nt.systemPromptSectionCache;
}
function setSystemPromptSectionCacheEntry(key: any, value: any) {
  Nt.systemPromptSectionCache.set(key, value);
}
function clearSystemPromptSectionState() {
  Nt.systemPromptSectionCache.clear();
}
function getLastEmittedDate() {
  return Nt.lastEmittedDate;
}
function setLastEmittedDate(date: any) {
  Nt.lastEmittedDate = date;
}
function getAdditionalDirectoriesForClaudeMd() {
  return Nt.additionalDirectoriesForClaudeMd;
}
function setAdditionalDirectoriesForClaudeMd(dirs: any) {
  Nt.additionalDirectoriesForClaudeMd = dirs;
}
function getAllowedChannels() {
  return Nt.allowedChannels;
}
function setAllowedChannels(channels: any) {
  Nt.allowedChannels = channels;
}
function getHasDevChannels() {
  return Nt.hasDevChannels;
}
function setHasDevChannels(hasDev: any) {
  Nt.hasDevChannels = hasDev;
}
function getPromptCache1hAllowlist() {
  return Nt.promptCache1hAllowlist;
}
function setPromptCache1hAllowlist(allowlist: any) {
  Nt.promptCache1hAllowlist = allowlist;
}
function getThinkingTypeOverride(modelKey: any) {
  return Nt.thinkingTypeOverrides.get(modelKey);
}
function setThinkingTypeOverride(modelKey: any, thinkingType: any) {
  Nt.thinkingTypeOverrides.set(modelKey, thinkingType);
}
function getInferenceProfileBackingModelCached(profileKey: any) {
  return Nt.inferenceProfileBackingModels.get(profileKey);
}
function setInferenceProfileBackingModel(profileKey: any, backingModel: any) {
  Nt.inferenceProfileBackingModels.set(profileKey, backingModel);
}
function getStickyBetas() {
  return agentMcpClients()?.stickyBetas ?? Nt.stickyBetas;
}

/** Reset sticky beta headers for the current context (sub-agent or main). */
function clearBetaHeaderLatches() {
  let agentCtx = agentMcpClients();
  if (agentCtx) agentCtx.stickyBetas = wre();else Nt.stickyBetas = wre();
}
function getPromptId() {
  return Nt.promptId;
}
function setPromptId(promptId: any) {
  Nt.promptId = promptId;
}
function incrementPromptIndex() {
  return Nt.promptIndex++, Nt.promptIndex;
}
function getPromptIndex() {
  return Nt.promptIndex;
}

/** Return whether the REPL bridge is currently active. */
function yH() {
  return Nt.replBridgeActive ?? !1;
}
function setReplBridgeActive(active: any) {
  if (Nt.replBridgeActive === active) return;
  Nt.replBridgeActive = active;
}

/** Module-level variables: lazy-initialized in the `lt` init block. */
var ctr,
  w2o,
  OAc,
  Nt,
  agentMcpClients = () => {
    return;
  },
  vKt,
  onSessionSwitch,
  mtr,
  onOriginalCwdChange,
  xKt = !1,
  vtr,
  onInteraction,
  xtr = 0,
  ktr = null,
  HKt = 0,
  NOTIF_ACTIVE_THRESHOLD_MS = 60000,
  Otr = void 0,
  Ltr,
  onTerminalFocusChange,
  wKt = !1,
  Cgt,
  I2o = 150,
  GAc = 100,
  hnr,
  onAttacherCapsChange,
  urr,
  C2o = 10,
  utr = 1e4,
  v2o;

/** Module initializer: require fs/process, set default caps, build initial state, wire event emitters. */
var lt = b(() => {
  e2o();
  yKt();
  SKt();
  Kx();
  kg();
  zE();
  ctr = require("fs"), w2o = require("process"), OAc = {
    renderTarget: "ink",
    workspace: "local",
    canDrive: !0,
    transcriptSource: "local-jsonl",
    remote: null
  };
  Nt = R2o();
  vKt = ca(), onSessionSwitch = vKt.subscribe;
  mtr = ca(), onOriginalCwdChange = mtr.subscribe;
  vtr = ca(), onInteraction = vtr.subscribe;
  Ltr = ca();
  onTerminalFocusChange = Ltr.subscribe;
  hnr = ca();
  onAttacherCapsChange = hnr.subscribe;
  v2o = [];
});
export {wre,$I,QTe,WOe,Rre,GOe,jde,R2o,setSessionOverridesGetter,getSessionId,mainAgentId,regenerateSessionId,x2o,getParentSessionId,switchSession,k2o,getSessionProjectDir,getOriginalCwd,getProjectRoot,vgt,setOriginalCwd,setProjectRoot,getCwdState,setCwdState,resetStartTime,getDirectConnectServerUrl,setDirectConnectServerUrl,getMcpConnectNonBlocking,setMcpConnectNonBlocking,getStrictMcpConfig,setStrictMcpConfig,getActiveRoutine,setActiveRoutine,addToTotalDurationState,resetTotalDurationStateAndCost_FOR_TESTS_ONLY,addToTotalCostState,getTotalCostUSD,getTotalAPIDuration,getTotalDuration,getTotalAPIDurationWithoutRetries,getTotalToolDuration,addToToolDuration,getStatsStore,setStatsStore,updateLastInteractionTime,flushInteractionTime,H2o,resetInteractionBaseline,addToTotalLinesChanged,getTotalLinesAdded,getTotalLinesRemoved,getTotalInputTokens,getTotalOutputTokens,getTotalCacheReadInputTokens,getTotalCacheCreationInputTokens,getTotalWebSearchRequests,getTurnOutputTokens,getCurrentTurnTokenBudget,snapshotOutputTokensForTurn,getBudgetContinuationCount,incrementBudgetContinuationCount,setHasUnknownModelCost,hasUnknownModelCost,getLastMainRequestId,setLastMainRequestId,getLastMainThreadCacheTtlMs,setLastMainThreadCacheTtlMs,getLastApiCompletionTimestamp,setLastApiCompletionTimestamp,markPostCompaction,consumePostCompaction,getLastInteractionTime,setTerminalFocusForState,getTerminalFocus,isUserActiveForNotifications,markScrollActivity,getIsScrollDraining,waitForScrollIdle,getModelUsage,getUsageForModel,getMainLoopModelOverride,getInitialMainLoopModel,setMainLoopModelOverride,latchRefusalFallbackModel,clearRefusalFallbackModelLatch,getRefusalFallbackModelLatch,rewriteRefusalFallbackPreviousOverride,setSdkDialogHostActive,isSdkDialogHostActive,setSdkSupportedDialogKinds,getSdkSupportedDialogKinds,getSdkDialogCapabilitySource,getReplConfigArgv,setReplConfigArgv,setInitialMainLoopModel,getSdkBetas,setSdkBetas,isLongContext1mCreditsBlocked,setLongContext1mCreditsBlocked,isFableCreditsRequired,setFableCreditsRequired,hasFableBridgeDialogTimedOut,setFableBridgeDialogTimedOut,hasFableConsentDialogInteracted,setFableConsentDialogInteracted,hasFableConsentSessionFallback,setFableConsentSessionFallback,getSdkOAuthTokenRefreshCallback,setSdkOAuthTokenRefreshCallback,getHostAuthTokenRefreshCallback,setHostAuthTokenRefreshCallback,resetCostState,setCostStateForRestore,resetStateForTests,getModelStrings,setModelStrings,resetModelStrings,resetModelStringsForTestingOnly,setMeter,getMeter,getSessionCounter,getLocCounter,getPrCounter,getCommitCounter,getCostCounter,getTokenCounter,getCodeEditToolDecisionCounter,getActiveTimeCounter,getLoggerProvider,setLoggerProvider,getEventLogger,setEventLogger,bufferPendingOTelEvent,discardPendingOTelEvents,getMeterProvider,setMeterProvider,getTracerProvider,setTracerProvider,getFoundryDeploymentCapabilities,getCachedTelemetryResource,setCachedTelemetryResource,getCachedOtlpHttpAgentFactory,setCachedOtlpHttpAgentFactory,getIsNonInteractiveSession,getIsInteractive,setIsInteractive,getAttacherCaps,setAttacherCaps,getModelOverrideOptOutForSession,setModelOverrideOptOutForSession,getHasStreamingInput,setHasStreamingInput,getClientType,setClientType,getSdkAgentProgressSummariesEnabled,setSdkAgentProgressSummariesEnabled,getRendererModeForAnalytics,setRendererModeForAnalytics,getStrictToolResultPairing,setStrictToolResultPairing,getMemoryToggledOff,setMemoryToggledOff,getTeamMemoryServerStatus,setTeamMemoryServerStatus,getUserMsgOptIn,setUserMsgOptIn,getSearchToolsOptIn,setSearchToolsOptIn,getSessionSource,setSessionSource,getSessionStartType,setSessionStartType,getQuestionPreviewFormat,setQuestionPreviewFormat,getAgentColorMap,getFlagSettingsPath,setFlagSettingsPath,getFlagSettingsExpectedContent,setFlagSettingsExpectedContent,getFlagSettingsInline,setFlagSettingsInline,getParentManagedSettings,setParentManagedSettings,getSessionIngressToken,setSessionIngressToken,getOauthTokenFromFd,setOauthTokenFromFd,getOauthScopesFromFd,setOauthScopesFromFd,getApiKeyFromFd,setApiKeyFromFd,resetFdCredentialState,getGatewayAuth,isGatewayAuthExpired,isGatewayAuthPinned,setGatewayAuth,getGatewayRefreshInFlight,setGatewayRefreshInFlight,setLastAPIRequest,getLastAPIRequest,setLastCancelledAPIMessageId,getLastCancelledAPIMessageId,setLastAPIRequestMessages,getLastAPIRequestMessages,setLastClassifierRequests,getLastClassifierRequests,setCachedClaudeMdContent,getCachedClaudeMdContent,addToInMemoryErrorLog,getAllowedSettingSources,setAllowedSettingSources,preferThirdPartyAuthentication,setInlinePlugins,getInlinePlugins,setInlinePluginsNoMcp,getInlinePluginsNoMcp,setInlinePluginUrls,getInlinePluginUrls,setSyncedPluginDirs,getSyncedPluginDirs,setChromeFlagOverride,getChromeFlagOverride,setOnboardingShownThisSession,getOnboardingShownThisSession,setUseCoworkPlugins,getUseCoworkPlugins,setDisableSlashCommands,getDisableSlashCommands,setSessionBypassPermissionsMode,getSessionBypassPermissionsMode,setScheduledTasksEnabled,getScheduledTasksEnabled,getSessionCronTasks,getSessionPrResolved,setSessionPrResolved,addSessionCronTask,getLoopChainStartedAt,setLoopChainStartedAt,deleteLoopChainStartedAt,getLoopTickInFlightPrompt,setLoopTickInFlightPrompt,getLoopConsecutiveKeepalives,setLoopConsecutiveKeepalives,removeSessionCronTasks,setSessionTrustAccepted,getSessionTrustAccepted,setSessionPersistenceDisabled,isSessionPersistenceDisabled,hasExitedPlanModeInSession,setHasExitedPlanMode,needsPlanModeExitAttachment,setNeedsPlanModeExitAttachment,handlePlanModeTransition,needsAutoModeExitAttachment,setNeedsAutoModeExitAttachment,handleAutoModeTransition,hasShownLspRecommendationThisSession,setLspRecommendationShownThisSession,setInitJsonSchema,getInitJsonSchema,setMcpClientsAccessor,getMcpClientsFromAccessor,XKt,registerHookCallbacks,getRegisteredHooks,clearRegisteredHooks,clearRegisteredPluginHooks,getPlanSlugCache,getSessionCreatedTeams,getInheritedTeamName,setInheritedTeamName,setTeleportedSessionInfo,getTeleportedSessionInfo,markFirstTeleportMessageLogged,addInvokedSkill,getInvokedSkills,getInvokedSkillsForAgent,clearInvokedSkills,clearInvokedSkillsForAgent,addSlowOperation,getSlowOperations,getMainThreadAgentType,setMainThreadAgentType,getMainThreadAgentHooks,setMainThreadAgentHooks,getSessionSkillAllowlist,setSessionSkillAllowlist,getCaps,setCaps,getIsRemoteMode,setIsRemoteMode,getSystemPromptSectionCache,setSystemPromptSectionCacheEntry,clearSystemPromptSectionState,getLastEmittedDate,setLastEmittedDate,getAdditionalDirectoriesForClaudeMd,setAdditionalDirectoriesForClaudeMd,getAllowedChannels,setAllowedChannels,getHasDevChannels,setHasDevChannels,getPromptCache1hAllowlist,setPromptCache1hAllowlist,getThinkingTypeOverride,setThinkingTypeOverride,getInferenceProfileBackingModelCached,setInferenceProfileBackingModel,getStickyBetas,clearBetaHeaderLatches,getPromptId,setPromptId,incrementPromptIndex,getPromptIndex,yH,setReplBridgeActive,ctr,w2o,OAc,Nt,agentMcpClients,vKt,onSessionSwitch,mtr,onOriginalCwdChange,xKt,vtr,onInteraction,xtr,ktr,HKt,NOTIF_ACTIVE_THRESHOLD_MS,Otr,Ltr,onTerminalFocusChange,wKt,Cgt,I2o,GAc,hnr,onAttacherCapsChange,urr,C2o,utr,v2o,lt};
