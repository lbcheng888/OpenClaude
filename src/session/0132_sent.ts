// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {XTt,YYt} from "./0125_sessionId.ts";
import {Fde,zYt} from "../../vendor/m121.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {wKe,Lqo} from "../../vendor/m120.ts";
import {C_,lk} from "../../vendor/m125.ts";
import {ig} from "../../vendor/m130.ts";
import {Ni} from "../../vendor/m127.ts";
// @ts-nocheck
/** Create a fresh sticky-betas tracking object with empty sent/rejected sets. */
function Ere() {
  return {
    sent: new Set(),
    rejected: new Set()
  };
}

/** Clone a sticky-betas state object (deep-copy the two sets). */
function l0(stickyBetas: any) {
  return {
    sent: new Set(stickyBetas.sent),
    rejected: new Set(stickyBetas.rejected)
  };
}

/** Mark a beta header as sent, unless it is already rejected. */
function xbe(stickyBetas: any, headerKey: any) {
  if (!stickyBetas.rejected.has(headerKey)) stickyBetas.sent.add(headerKey);
}

/** Return true if the header has been sent and not subsequently rejected. */
function ULe(stickyBetas: any, headerKey: any) {
  return stickyBetas.sent.has(headerKey) && !stickyBetas.rejected.has(headerKey);
}

/** Move a beta header from sent → rejected. */
function Cre(stickyBetas: any, headerKey: any) {
  stickyBetas.sent.delete(headerKey), stickyBetas.rejected.add(headerKey);
}

/** Return true if the header has been rejected. */
function $Le(stickyBetas: any, headerKey: any) {
  return stickyBetas.rejected.has(headerKey);
}
var $be = {};

/** Namespace export map – wires every public symbol to its lazy getter so tree-shaking works. */
ft($be, {
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
  setStartupPolicySnapshot: () => setStartupPolicySnapshot,
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
  setPermissionPromptToolName: () => setPermissionPromptToolName,
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
  isReplBridgeActive: () => isReplBridgeActive,
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
  getStartupPolicySnapshot: () => getStartupPolicySnapshot,
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
  getPermissionPromptToolName: () => getPermissionPromptToolName,
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
function p6o() {
  let cwdRaw = "";
  if (typeof process < "u" && typeof process.cwd === "function" && typeof Psr.realpathSync === "function") {
    let rawCwd = d6o.cwd();
    try {
      cwdRaw = ZTt(Psr.realpathSync(rawCwd));
    } catch {
      cwdRaw = ZTt(rawCwd);
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
    permissionPromptToolName: void 0,
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
    startupPolicySnapshot: void 0,
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
    sessionId: XTt() ?? Fde.randomUUID(),
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
    caps: FRc,
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
    stickyBetas: Ere(),
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
function setSessionOverridesGetter(accessor: any) {
  VH = accessor;
}

/** Return the current session ID, preferring a sub-agent context if present. */
function getSessionId() {
  return VH()?.sessionId ?? Bt.sessionId;
}

/** Return the stable "main agent" UUID, deriving it from the session ID on first call. */
function mainAgentId() {
  let agentSessionId = VH()?.sessionId;
  if (agentSessionId) return cd(agentSessionId);
  return Bt.mainAgentId ??= cd(Bt.sessionId), Bt.mainAgentId;
}

/** Generate a new session UUID, optionally recording the previous one as parent. */
function regenerateSessionId(opts: any = {}) {
  if (opts.setCurrentAsParent) Bt.parentSessionId = Bt.sessionId;
  Bt.planSlugCache.delete(Bt.sessionId), Bt.sessionId = Fde.randomUUID(), Bt.sessionProjectDir = null, Bt.promptIndex = 0, Bt.lastCancelledAPIMessageId = null;
  let restoredOverride = f6o();
  return m6o(Bt.sessionId, "clear", restoredOverride), Bt.sessionId;
}

/** Emit a session-switch event (with or without restored-model payload). */
function m6o(sessionId: any, reason: any, restoredOverride: any) {
  if (restoredOverride) ZYt.emit(sessionId, reason, restoredOverride);else ZYt.emit(sessionId, reason);
}

/** Return the parent session ID from sub-agent context or main state. */
function getParentSessionId() {
  let agentCtx = VH();
  return agentCtx ? agentCtx.parentSessionId : Bt.parentSessionId;
}

/** Switch to a different session, cleaning up state from the old one. */
function switchSession(newSessionId: any, reason: any, projectDir: any = null) {
  let restoredOverride: any;
  if (Bt.sessionId !== newSessionId) Bt.planSlugCache.delete(Bt.sessionId), Bt.lastCancelledAPIMessageId = null, restoredOverride = f6o();
  Bt.sessionId = newSessionId, Bt.sessionProjectDir = projectDir, m6o(newSessionId, reason, restoredOverride);
}

/**
 * If a refusal-fallback model latch is active and the current main-loop model
 * still matches the fallback model, clear the latch and revert the model override,
 * returning the previous model info for callers (e.g. session-switch event).
 */
function f6o() {
  let latch = Bt.refusalFallbackModelLatch;
  if (Bt.refusalFallbackModelLatch = void 0, !latch || Bt.mainLoopModelOverride !== latch.fallbackModel) return;
  return Bt.mainLoopModelOverride = latch.previousOverride, {
    appStateModel: latch.previousAppStateModel,
    forSessionValue: latch.previousModelForSession,
    overrideValue: latch.previousOverride,
    restoredToExplicitOverride: latch.previousOverride !== void 0,
    fallbackModel: latch.fallbackModel
  };
}

/** Return the current session's project directory from sub-agent context or main state. */
function getSessionProjectDir() {
  let agentCtx = VH();
  return agentCtx ? agentCtx.sessionProjectDir : Bt.sessionProjectDir;
}
function getOriginalCwd() {
  return VH()?.originalCwd ?? Bt.originalCwd;
}
function getProjectRoot() {
  return VH()?.projectRoot ?? Bt.projectRoot;
}

/** Normalize a path to NFC Unicode form. */
function ZTt(pathStr: any) {
  return pathStr.normalize("NFC");
}
function setOriginalCwd(pathStr: any) {
  Bt.originalCwd = ZTt(pathStr), Nsr.emit(Bt.originalCwd);
}
function setProjectRoot(pathStr: any) {
  Bt.projectRoot = ZTt(pathStr);
}
function getCwdState() {
  return Bt.cwd;
}
function setCwdState(pathStr: any) {
  Bt.cwd = ZTt(pathStr);
}
function resetStartTime() {
  Bt.startTime = Date.now();
}
function getDirectConnectServerUrl() {
  return Bt.directConnectServerUrl;
}
function setDirectConnectServerUrl(url: any) {
  Bt.directConnectServerUrl = url;
}
function getMcpConnectNonBlocking() {
  return Bt.mcpConnectNonBlocking;
}
function setMcpConnectNonBlocking(val: any) {
  Bt.mcpConnectNonBlocking = val;
}
function getStrictMcpConfig() {
  return Bt.strictMcpConfig;
}
function setStrictMcpConfig(val: any) {
  Bt.strictMcpConfig = val;
}
function getActiveRoutine() {
  return Bt.activeRoutine;
}
function setActiveRoutine(routine: any) {
  Bt.activeRoutine = routine;
}

/** Accumulate API duration (total and excluding retries). */
function addToTotalDurationState(durationMs: any, durationWithoutRetriesMs: any) {
  Bt.totalAPIDuration += durationMs, Bt.totalAPIDurationWithoutRetries += durationWithoutRetriesMs;
}
function resetTotalDurationStateAndCost_FOR_TESTS_ONLY() {
  Bt.totalAPIDuration = 0, Bt.totalAPIDurationWithoutRetries = 0, Bt.totalCostUSD = 0;
}

/** Record per-model usage and add the cost increment to the session total. */
function addToTotalCostState(costDelta: any, modelUsageSnapshot: any, modelKey: any) {
  Bt.modelUsage[modelKey] = modelUsageSnapshot, Bt.totalCostUSD += costDelta;
}
function getTotalCostUSD() {
  return Bt.totalCostUSD;
}
function getTotalAPIDuration() {
  return Bt.totalAPIDuration;
}
function getTotalDuration() {
  return Date.now() - Bt.startTime;
}
function getTotalAPIDurationWithoutRetries() {
  return Bt.totalAPIDurationWithoutRetries;
}
function getTotalToolDuration() {
  return Bt.totalToolDuration;
}
function addToToolDuration(durationMs: any) {
  Bt.totalToolDuration += durationMs;
}
function getStatsStore() {
  return Bt.statsStore;
}
function setStatsStore(store: any) {
  Bt.statsStore = store;
}

/** Mark an interaction as happening. If immediate=true, flush the timestamp now; otherwise defer to next flush. */
function updateLastInteractionTime(immediate: any) {
  if (immediate) h6o();else nJt = !0;
}
function flushInteractionTime() {
  if (nJt) h6o();
}

/** Commit the deferred interaction timestamp and notify subscribers. */
function h6o() {
  Bt.lastInteractionTime = Date.now(), nJt = !1, Ysr.emit();
}
function resetInteractionBaseline() {
  Bt.lastInteractionTime = Date.now(), nJt = !1;
}
function addToTotalLinesChanged(linesAdded: any, linesRemoved: any) {
  Bt.totalLinesAdded += linesAdded, Bt.totalLinesRemoved += linesRemoved;
}
function getTotalLinesAdded() {
  return Bt.totalLinesAdded;
}
function getTotalLinesRemoved() {
  return Bt.totalLinesRemoved;
}
function getTotalInputTokens() {
  return wKe(Object.values(Bt.modelUsage), "inputTokens");
}
function getTotalOutputTokens() {
  return wKe(Object.values(Bt.modelUsage), "outputTokens");
}
function getTotalCacheReadInputTokens() {
  return wKe(Object.values(Bt.modelUsage), "cacheReadInputTokens");
}
function getTotalCacheCreationInputTokens() {
  return wKe(Object.values(Bt.modelUsage), "cacheCreationInputTokens");
}
function getTotalWebSearchRequests() {
  return wKe(Object.values(Bt.modelUsage), "webSearchRequests");
}

/** Output tokens emitted in the current turn (since the last snapshot). */
function getTurnOutputTokens() {
  return getTotalOutputTokens() - Qsr;
}
function getCurrentTurnTokenBudget() {
  return Zsr;
}

/** Record a per-turn baseline for output tokens and set the token budget. */
function snapshotOutputTokensForTurn(budget: any) {
  Qsr = getTotalOutputTokens(), Zsr = budget, oJt = 0;
}
function getBudgetContinuationCount() {
  return oJt;
}
function incrementBudgetContinuationCount() {
  oJt++;
}
function setHasUnknownModelCost() {
  Bt.hasUnknownModelCost = !0;
}
function hasUnknownModelCost() {
  return Bt.hasUnknownModelCost;
}
function getLastMainRequestId() {
  return Bt.lastMainRequestId;
}
function setLastMainRequestId(requestId: any) {
  Bt.lastMainRequestId = requestId;
}
function getLastMainThreadCacheTtlMs() {
  return Bt.lastMainThreadCacheTtlMs;
}
function setLastMainThreadCacheTtlMs(ttlMs: any) {
  Bt.lastMainThreadCacheTtlMs = ttlMs;
}
function getLastApiCompletionTimestamp() {
  return Bt.lastApiCompletionTimestamp;
}
function setLastApiCompletionTimestamp(ts: any) {
  Bt.lastApiCompletionTimestamp = ts;
}
function markPostCompaction() {
  Bt.pendingPostCompaction = !0;
}
function consumePostCompaction() {
  let pending = Bt.pendingPostCompaction;
  return Bt.pendingPostCompaction = !1, pending;
}
function getLastInteractionTime() {
  return Bt.lastInteractionTime;
}
function setTerminalFocusForState(focused: any) {
  oir = focused, sir.emit();
}
function getTerminalFocus() {
  return oir;
}

/** User is "active for notifications" if the terminal has focus or if they interacted recently. */
function isUserActiveForNotifications() {
  let focus = getTerminalFocus();
  if (focus !== void 0) return focus;
  return Date.now() - getLastInteractionTime() < NOTIF_ACTIVE_THRESHOLD_MS;
}

/** Track scroll activity with a debounced timeout to determine drain state. */
function markScrollActivity() {
  if (eJt = !0, QTt) clearTimeout(QTt);
  QTt = setTimeout(() => {
    eJt = !1, QTt = void 0;
  }, g6o), QTt.unref?.();
}
function getIsScrollDraining() {
  return eJt;
}
async function waitForScrollIdle() {
  while (eJt) await new Promise((resolve: any) => setTimeout(resolve, g6o));
}
function getModelUsage() {
  return Bt.modelUsage;
}
function getUsageForModel(modelKey: any) {
  return Bt.modelUsage[modelKey];
}
function getMainLoopModelOverride() {
  return Bt.mainLoopModelOverride;
}
function getInitialMainLoopModel() {
  return Bt.initialMainLoopModel;
}
function setMainLoopModelOverride(model: any) {
  Bt.mainLoopModelOverride = model;
}

/**
 * Latch a refusal-fallback model. If a latch already exists and the current
 * main-loop model is the latched fallback, update only the fallback model field
 * (preserve the rest of the latch so it can revert correctly on session switch).
 */
function latchRefusalFallbackModel(latchInfo: any) {
  let existing = Bt.refusalFallbackModelLatch;
  if (existing && Bt.mainLoopModelOverride === existing.fallbackModel) {
    Bt.refusalFallbackModelLatch = {
      ...existing,
      fallbackModel: latchInfo.fallbackModel
    };
    return;
  }
  Bt.refusalFallbackModelLatch = latchInfo;
}
function clearRefusalFallbackModelLatch() {
  Bt.refusalFallbackModelLatch = void 0;
}
function getRefusalFallbackModelLatch() {
  return Bt.refusalFallbackModelLatch;
}
function rewriteRefusalFallbackPreviousOverride(previousOverride: any) {
  if (Bt.refusalFallbackModelLatch) Bt.refusalFallbackModelLatch = {
    ...Bt.refusalFallbackModelLatch,
    previousOverride: previousOverride
  };
}
function setSdkDialogHostActive(active: any) {
  Bt.sdkDialogHostActive = active;
}
function isSdkDialogHostActive() {
  return Bt.sdkDialogHostActive;
}
function setSdkSupportedDialogKinds(kinds: any, source: any) {
  Bt.sdkSupportedDialogKinds = kinds, Bt.sdkSupportedDialogKindsSource = kinds === void 0 ? void 0 : source;
}
function getSdkSupportedDialogKinds() {
  return Bt.sdkSupportedDialogKinds;
}
function getSdkDialogCapabilitySource() {
  if (Bt.sdkSupportedDialogKinds === void 0) return "none";
  return Bt.sdkSupportedDialogKindsSource ?? "none";
}
function getReplConfigArgv() {
  return Bt.replConfigArgv;
}
function setReplConfigArgv(argv: any) {
  Bt.replConfigArgv = argv;
}
function setInitialMainLoopModel(model: any) {
  Bt.initialMainLoopModel = model;
}
function getSdkBetas() {
  return VH()?.sdkBetas ?? Bt.sdkBetas;
}
function setSdkBetas(betas: any) {
  Bt.sdkBetas = betas;
}
function isLongContext1mCreditsBlocked() {
  return Bt.longContext1mCreditsBlocked;
}
function setLongContext1mCreditsBlocked(blocked: any) {
  Bt.longContext1mCreditsBlocked = blocked;
}
function isFableCreditsRequired() {
  return Bt.fableCreditsRequired;
}
function setFableCreditsRequired(required: any) {
  Bt.fableCreditsRequired = required;
}
function hasFableBridgeDialogTimedOut() {
  return Bt.fableBridgeDialogTimedOut;
}
function setFableBridgeDialogTimedOut(timedOut: any = !0) {
  Bt.fableBridgeDialogTimedOut = timedOut;
}
function hasFableConsentDialogInteracted() {
  return Bt.fableConsentDialogInteracted;
}
function setFableConsentDialogInteracted(interacted: any = !0) {
  Bt.fableConsentDialogInteracted = interacted;
}
function hasFableConsentSessionFallback() {
  return Bt.fableConsentSessionFallback;
}
function setFableConsentSessionFallback(fallback: any) {
  Bt.fableConsentSessionFallback = fallback;
}
function getSdkOAuthTokenRefreshCallback() {
  return Bt.sdkOAuthTokenRefreshCallback;
}
function setSdkOAuthTokenRefreshCallback(cb: any) {
  Bt.sdkOAuthTokenRefreshCallback = cb;
}
function getHostAuthTokenRefreshCallback() {
  return Bt.hostAuthTokenRefreshCallback;
}
function setHostAuthTokenRefreshCallback(cb: any) {
  Bt.hostAuthTokenRefreshCallback = cb;
}

/** Reset all cost/duration/line counters for the session. */
function resetCostState() {
  Bt.totalCostUSD = 0, Bt.totalAPIDuration = 0, Bt.totalAPIDurationWithoutRetries = 0, Bt.totalToolDuration = 0, Bt.startTime = Date.now(), Bt.totalLinesAdded = 0, Bt.totalLinesRemoved = 0, Bt.hasUnknownModelCost = !1, Bt.modelUsage = {}, Bt.promptId = null;
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
  if (Bt.totalCostUSD = e, Bt.totalAPIDuration = t, Bt.totalAPIDurationWithoutRetries = n, Bt.totalToolDuration = r, Bt.totalLinesAdded = o, Bt.totalLinesRemoved = s, a) Bt.modelUsage = a;
  if (i) Bt.startTime = Date.now() - i;
}
function resetStateForTests() {
  throw Error("resetStateForTests can only be called in tests");
}
function getModelStrings() {
  return Bt.modelStrings;
}
function setModelStrings(strings: any) {
  Bt.modelStrings = strings;
}
function resetModelStrings() {
  Bt.modelStrings = null;
}
function resetModelStringsForTestingOnly() {
  resetModelStrings();
}

/** Initialize all OTel metric counters using the provided meter factory. */
function setMeter(meter: any, counterFactory: any) {
  Bt.meter = meter, Bt.sessionCounter = counterFactory("claude_code.session.count", {
    description: "Count of CLI sessions started"
  }), Bt.locCounter = counterFactory("claude_code.lines_of_code.count", {
    description: "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed and the 'model' attribute indicating which model made the change"
  }), Bt.prCounter = counterFactory("claude_code.pull_request.count", {
    description: "Number of pull requests created"
  }), Bt.commitCounter = counterFactory("claude_code.commit.count", {
    description: "Number of git commits created"
  }), Bt.costCounter = counterFactory("claude_code.cost.usage", {
    description: "Cost of the Claude Code session",
    unit: "USD"
  }), Bt.tokenCounter = counterFactory("claude_code.token.usage", {
    description: "Number of tokens used",
    unit: "tokens"
  }), Bt.codeEditToolDecisionCounter = counterFactory("claude_code.code_edit_tool.decision", {
    description: "Count of code editing tool permission decisions (accept/reject) for Edit, Write, and NotebookEdit tools"
  }), Bt.activeTimeCounter = counterFactory("claude_code.active_time.total", {
    description: "Total active time in seconds",
    unit: "s"
  });
}
function getMeter() {
  return Bt.meter;
}
function getSessionCounter() {
  return Bt.sessionCounter;
}
function getLocCounter() {
  return Bt.locCounter;
}
function getPrCounter() {
  return Bt.prCounter;
}
function getCommitCounter() {
  return Bt.commitCounter;
}
function getCostCounter() {
  return Bt.costCounter;
}
function getTokenCounter() {
  return Bt.tokenCounter;
}
function getCodeEditToolDecisionCounter() {
  return Bt.codeEditToolDecisionCounter;
}
function getActiveTimeCounter() {
  return Bt.activeTimeCounter;
}
function getLoggerProvider() {
  return Bt.loggerProvider;
}
function setLoggerProvider(provider: any) {
  Bt.loggerProvider = provider;
}
function getEventLogger() {
  return Bt.eventLogger;
}

/** Install the event logger; flush any buffered OTel events to it immediately. */
function setEventLogger(logger: any) {
  if (Bt.eventLogger = logger, !logger) return;
  let pendingEvents = Bt.pendingOTelEvents;
  if (Bt.pendingOTelEvents = null, pendingEvents) for (let event of pendingEvents) logger.emit(event);
}

/** Buffer an OTel event until the event logger is ready. Returns false if buffer is full or null. */
function bufferPendingOTelEvent(event: any) {
  if (Bt.pendingOTelEvents === null || Bt.pendingOTelEvents.length >= YRc) return !1;
  return Bt.pendingOTelEvents.push(event), !0;
}
function discardPendingOTelEvents() {
  Bt.pendingOTelEvents = null;
}
function getMeterProvider() {
  return Bt.meterProvider;
}
function setMeterProvider(provider: any) {
  Bt.meterProvider = provider;
}
function getTracerProvider() {
  return Bt.tracerProvider;
}
function setTracerProvider(provider: any) {
  Bt.tracerProvider = provider;
}
function getFoundryDeploymentCapabilities() {
  return Bt.foundryDeploymentCapabilities;
}
function getCachedTelemetryResource() {
  return Bt.cachedTelemetryResource;
}
function setCachedTelemetryResource(resource: any) {
  Bt.cachedTelemetryResource = resource;
}
function getCachedOtlpHttpAgentFactory(proxied: any) {
  return Bt.cachedOtlpHttpAgentFactory[proxied ? "proxied" : "direct"];
}
function setCachedOtlpHttpAgentFactory(proxied: any, factory: any) {
  Bt.cachedOtlpHttpAgentFactory[proxied ? "proxied" : "direct"] = factory;
}
function getIsNonInteractiveSession() {
  return !Bt.isInteractive;
}
function getIsInteractive() {
  return Bt.isInteractive;
}
function setIsInteractive(interactive: any) {
  Bt.isInteractive = interactive;
}
function getPermissionPromptToolName() {
  return Bt.permissionPromptToolName;
}
function setPermissionPromptToolName(toolName: any) {
  Bt.permissionPromptToolName = toolName;
}
function getAttacherCaps() {
  return Bt.attacherCaps;
}
function setAttacherCaps(caps: any) {
  Bt.attacherCaps = caps, $ir.emit();
}
function getModelOverrideOptOutForSession() {
  return Bt.modelOverrideOptOutForSession;
}
function setModelOverrideOptOutForSession() {
  Bt.modelOverrideOptOutForSession = !0;
}
function getHasStreamingInput() {
  return Bt.hasStreamingInput;
}
function setHasStreamingInput(streaming: any) {
  Bt.hasStreamingInput = streaming;
}
function getClientType() {
  return Bt.clientType;
}
function setClientType(clientType: any) {
  Bt.clientType = clientType;
}
function getSdkAgentProgressSummariesEnabled() {
  return Bt.sdkAgentProgressSummariesEnabled;
}
function setSdkAgentProgressSummariesEnabled(enabled: any) {
  Bt.sdkAgentProgressSummariesEnabled = enabled;
}
function getRendererModeForAnalytics() {
  return Bt.rendererMode;
}
function setRendererModeForAnalytics(mode: any) {
  Bt.rendererMode = mode;
}
function getStrictToolResultPairing() {
  return Bt.strictToolResultPairing;
}
function setStrictToolResultPairing(strict: any) {
  Bt.strictToolResultPairing = strict;
}
function getMemoryToggledOff() {
  return Bt.memoryToggledOff;
}
function setMemoryToggledOff(toggled: any) {
  Bt.memoryToggledOff = toggled;
}
function getTeamMemoryServerStatus() {
  return Bt.teamMemoryServerStatus;
}
function setTeamMemoryServerStatus(status: any) {
  Bt.teamMemoryServerStatus = status;
}
function getUserMsgOptIn() {
  return Bt.userMsgOptIn;
}
function setUserMsgOptIn(optIn: any) {
  Bt.userMsgOptIn = optIn;
}
function getSearchToolsOptIn() {
  return Bt.searchToolsOptIn;
}
function setSearchToolsOptIn(optIn: any) {
  Bt.searchToolsOptIn = optIn;
}
function getSessionSource() {
  return Bt.sessionSource;
}
function setSessionSource(source: any) {
  Bt.sessionSource = source;
}
function getSessionStartType() {
  return Bt.sessionStartType;
}
function setSessionStartType(startType: any) {
  Bt.sessionStartType = startType;
}
function getQuestionPreviewFormat() {
  return Bt.questionPreviewFormat;
}
function setQuestionPreviewFormat(format: any) {
  Bt.questionPreviewFormat = format;
}
function getAgentColorMap() {
  return Bt.agentColorMap;
}
function getFlagSettingsPath() {
  return Bt.flagSettingsPath;
}
function setFlagSettingsPath(flagPath: any) {
  Bt.flagSettingsPath = flagPath;
}
function getFlagSettingsExpectedContent() {
  return Bt.flagSettingsExpectedContent;
}
function setFlagSettingsExpectedContent(content: any) {
  Bt.flagSettingsExpectedContent = content;
}
function getFlagSettingsInline() {
  return Bt.flagSettingsInline;
}
function setFlagSettingsInline(inline: any) {
  Bt.flagSettingsInline = inline;
}
function getParentManagedSettings() {
  return Bt.parentManagedSettings;
}
function setParentManagedSettings(settings: any) {
  Bt.parentManagedSettings = settings;
}

/** Return the session ingress token, reading from agent secrets if in a sub-agent context. */
function getSessionIngressToken() {
  let agentCtx = VH();
  return agentCtx ? agentCtx.secrets.sessionIngressToken : Bt.sessionIngressToken;
}
function setSessionIngressToken(token: any) {
  Bt.sessionIngressToken = token;
}
function getOauthTokenFromFd() {
  return Bt.oauthTokenFromFd;
}
function setOauthTokenFromFd(token: any) {
  Bt.oauthTokenFromFd = token;
}
function getOauthScopesFromFd() {
  return Bt.oauthScopesFromFd;
}
function setOauthScopesFromFd(scopes: any) {
  Bt.oauthScopesFromFd = scopes;
}
function getApiKeyFromFd() {
  return Bt.apiKeyFromFd;
}
function setApiKeyFromFd(apiKey: any) {
  Bt.apiKeyFromFd = apiKey;
}
function resetFdCredentialState() {
  Bt.oauthTokenFromFd = void 0, Bt.oauthScopesFromFd = void 0, Bt.apiKeyFromFd = void 0;
}
function getGatewayAuth() {
  return Bt.gatewayAuth;
}
function isGatewayAuthExpired() {
  let auth = Bt.gatewayAuth;
  return !!auth && auth.expiresAt <= Date.now();
}
function isGatewayAuthPinned(auth: any) {
  return !!auth && !auth.unpinned;
}
function setGatewayAuth(auth: any) {
  Bt.gatewayAuth = auth;
}
function getStartupPolicySnapshot() {
  return Bt.startupPolicySnapshot;
}
function setStartupPolicySnapshot(snapshot: any) {
  Bt.startupPolicySnapshot = snapshot;
}
function getGatewayRefreshInFlight() {
  return Bt.gatewayRefreshInFlight;
}
function setGatewayRefreshInFlight(promise: any) {
  Bt.gatewayRefreshInFlight = promise;
}
function setLastAPIRequest(request: any) {
  Bt.lastAPIRequest = request;
}
function getLastAPIRequest() {
  return Bt.lastAPIRequest;
}
function setLastCancelledAPIMessageId(messageId: any) {
  Bt.lastCancelledAPIMessageId = messageId;
}
function getLastCancelledAPIMessageId() {
  return Bt.lastCancelledAPIMessageId;
}
function setLastAPIRequestMessages(messages: any) {
  Bt.lastAPIRequestMessages = messages;
}
function getLastAPIRequestMessages() {
  return Bt.lastAPIRequestMessages;
}
function setLastClassifierRequests(requests: any) {
  Bt.lastClassifierRequests = requests;
}
function getLastClassifierRequests() {
  return Bt.lastClassifierRequests;
}

/** Set cached CLAUDE.md content, routing to sub-agent context if active. */
function setCachedClaudeMdContent(content: any) {
  let agentCtx = VH();
  if (agentCtx) agentCtx.cachedClaudeMdContent = content;else Bt.cachedClaudeMdContent = content;
}
function getCachedClaudeMdContent() {
  let agentCtx = VH();
  return agentCtx ? agentCtx.cachedClaudeMdContent : Bt.cachedClaudeMdContent;
}

/** Append an error to the in-memory log, evicting the oldest entry when full (cap 100). */
function addToInMemoryErrorLog(error: any) {
  if (Bt.inMemoryErrorLog.length >= 100) Bt.inMemoryErrorLog.shift();
  Bt.inMemoryErrorLog.push(error);
}
function getAllowedSettingSources() {
  return Bt.allowedSettingSources;
}
function setAllowedSettingSources(sources: any) {
  Bt.allowedSettingSources = sources;
}

/** In non-interactive sessions that are not VS Code, prefer third-party auth flows. */
function preferThirdPartyAuthentication() {
  return getIsNonInteractiveSession() && Bt.clientType !== "claude-vscode";
}
function setInlinePlugins(plugins: any) {
  Bt.inlinePlugins = plugins;
}
function getInlinePlugins() {
  return Bt.inlinePlugins;
}
function setInlinePluginsNoMcp(plugins: any) {
  Bt.inlinePluginsNoMcp = plugins;
}
function getInlinePluginsNoMcp() {
  return Bt.inlinePluginsNoMcp;
}
function setInlinePluginUrls(urls: any) {
  Bt.inlinePluginUrls = urls;
}
function getInlinePluginUrls() {
  return Bt.inlinePluginUrls;
}
function setSyncedPluginDirs(dirs: any) {
  Bt.syncedPluginDirs = dirs;
}
function getSyncedPluginDirs() {
  return Bt.syncedPluginDirs;
}
function setChromeFlagOverride(flag: any) {
  Bt.chromeFlagOverride = flag;
}
function getChromeFlagOverride() {
  return Bt.chromeFlagOverride;
}
function setOnboardingShownThisSession(shown: any) {
  Bt.onboardingShownThisSession = shown;
}
function getOnboardingShownThisSession() {
  return Bt.onboardingShownThisSession;
}

/** Enable/disable co-work plugins and notify plugin system via C_(). */
function setUseCoworkPlugins(use: any) {
  Bt.useCoworkPlugins = use, C_();
}
function getUseCoworkPlugins() {
  return Bt.useCoworkPlugins;
}
function setDisableSlashCommands(disable: any) {
  Bt.disableSlashCommands = disable;
}
function getDisableSlashCommands() {
  return Bt.disableSlashCommands;
}
function setSessionBypassPermissionsMode(bypass: any) {
  Bt.sessionBypassPermissionsMode = bypass;
}
function getSessionBypassPermissionsMode() {
  return Bt.sessionBypassPermissionsMode;
}
function setScheduledTasksEnabled(enabled: any) {
  Bt.scheduledTasksEnabled = enabled;
}
function getScheduledTasksEnabled() {
  return Bt.scheduledTasksEnabled;
}

/** Return cron tasks for the current session (sub-agent aware). */
function getSessionCronTasks() {
  return VH()?.sessionCronTasks ?? Bt.sessionCronTasks;
}
function getSessionPrResolved() {
  return Bt.sessionPrResolved;
}
function setSessionPrResolved(resolved: any) {
  Bt.sessionPrResolved = resolved;
}
function addSessionCronTask(task: any) {
  Bt.sessionCronTasks.push(task);
}
function getLoopChainStartedAt(chainKey: any) {
  return Bt.loopChainStartedAt[chainKey];
}
function setLoopChainStartedAt(chainKey: any, timestamp: any) {
  Bt.loopChainStartedAt[chainKey] = timestamp;
}
function deleteLoopChainStartedAt(chainKey: any) {
  delete Bt.loopChainStartedAt[chainKey];
}
function getLoopTickInFlightPrompt() {
  return Bt.loopTickInFlightPrompt;
}
function setLoopTickInFlightPrompt(promise: any) {
  Bt.loopTickInFlightPrompt = promise;
}
function getLoopConsecutiveKeepalives() {
  return Bt.loopConsecutiveKeepalives;
}
function setLoopConsecutiveKeepalives(count: any) {
  Bt.loopConsecutiveKeepalives = count;
}

/** Remove cron tasks by their IDs; returns count removed. */
function removeSessionCronTasks(taskIds: any) {
  if (taskIds.length === 0) return 0;
  let idSet = new Set(taskIds),
    filtered = Bt.sessionCronTasks.filter((task: any) => !idSet.has(task.id)),
    removedCount = Bt.sessionCronTasks.length - filtered.length;
  if (removedCount === 0) return 0;
  return Bt.sessionCronTasks = filtered, removedCount;
}
function setSessionTrustAccepted(accepted: any) {
  Bt.sessionTrustAccepted = accepted;
}
function getSessionTrustAccepted() {
  return Bt.sessionTrustAccepted;
}
function setSessionPersistenceDisabled(disabled: any) {
  Bt.sessionPersistenceDisabled = disabled;
}
function isSessionPersistenceDisabled() {
  return Bt.sessionPersistenceDisabled;
}
function hasExitedPlanModeInSession() {
  return Bt.hasExitedPlanMode;
}
function setHasExitedPlanMode(exited: any) {
  Bt.hasExitedPlanMode = exited;
}
function needsPlanModeExitAttachment() {
  return Bt.needsPlanModeExitAttachment;
}
function setNeedsPlanModeExitAttachment(needs: any) {
  Bt.needsPlanModeExitAttachment = needs;
}

/** Track plan-mode transitions: entering plan clears the attachment flag, leaving plan sets it. */
function handlePlanModeTransition(prevMode: any, nextMode: any) {
  if (nextMode === "plan" && prevMode !== "plan") Bt.needsPlanModeExitAttachment = !1;
  if (prevMode === "plan" && nextMode !== "plan") Bt.needsPlanModeExitAttachment = !0;
}
function needsAutoModeExitAttachment() {
  return Bt.needsAutoModeExitAttachment;
}
function setNeedsAutoModeExitAttachment(needs: any) {
  Bt.needsAutoModeExitAttachment = needs;
}

/** Track auto-mode transitions (auto↔plan transitions are ignored). */
function handleAutoModeTransition(prevMode: any, nextMode: any) {
  if (prevMode === "auto" && nextMode === "plan" || prevMode === "plan" && nextMode === "auto") return;
  let wasAuto = prevMode === "auto",
    isAuto = nextMode === "auto";
  if (isAuto && !wasAuto) Bt.needsAutoModeExitAttachment = !1;
  if (wasAuto && !isAuto) Bt.needsAutoModeExitAttachment = !0;
}
function hasShownLspRecommendationThisSession() {
  return Bt.lspRecommendationShownThisSession;
}
function setLspRecommendationShownThisSession(shown: any) {
  Bt.lspRecommendationShownThisSession = shown;
}
function setInitJsonSchema(schema: any) {
  Bt.initJsonSchema = schema;
}
function getInitJsonSchema() {
  return Bt.initJsonSchema;
}
function setMcpClientsAccessor(accessor: any) {
  Nar = accessor;
}
function getMcpClientsFromAccessor() {
  return Nar?.();
}

/** Return the active session context: sub-agent if available, otherwise main state. */
function kJt() {
  return VH() ?? Bt;
}

/** Register one or more hook callbacks into the context's registeredHooks map. */
function registerHookCallbacks(hookMap: any) {
  let ctx = kJt();
  if (!ctx.registeredHooks) ctx.registeredHooks = {};
  for (let [hookName, callbacks] of Object.entries(hookMap)) {
    let key = hookName;
    if (!ctx.registeredHooks[key]) ctx.registeredHooks[key] = [];
    ctx.registeredHooks[key].push(...callbacks);
  }
}
function getRegisteredHooks() {
  return kJt().registeredHooks;
}
function clearRegisteredHooks() {
  kJt().registeredHooks = null;
}

/** Remove only plugin-owned hooks (those with a pluginRoot property), keeping non-plugin hooks. */
function clearRegisteredPluginHooks() {
  let ctx = kJt();
  if (!ctx.registeredHooks) return;
  let retained: any = {};
  for (let [hookName, callbacks] of Object.entries(ctx.registeredHooks)) {
    let nonPlugin = (callbacks as any[]).filter((cb: any) => !("pluginRoot" in cb));
    if (nonPlugin.length > 0) retained[hookName] = nonPlugin;
  }
  ctx.registeredHooks = Object.keys(retained).length > 0 ? retained : null;
}
function getPlanSlugCache() {
  return Bt.planSlugCache;
}
function getSessionCreatedTeams() {
  return VH()?.sessionCreatedTeams ?? Bt.sessionCreatedTeams;
}
function getInheritedTeamName() {
  return Bt.inheritedTeamName;
}
function setInheritedTeamName(teamName: any) {
  Bt.inheritedTeamName = teamName;
}

/** Record that this session is a teleport; the first-message log flag starts false. */
function setTeleportedSessionInfo(info: any) {
  Bt.teleportedSessionInfo = {
    isTeleported: !0,
    hasLoggedFirstMessage: !1,
    sessionId: info.sessionId
  };
}
function getTeleportedSessionInfo() {
  return Bt.teleportedSessionInfo;
}
function markFirstTeleportMessageLogged() {
  if (Bt.teleportedSessionInfo) Bt.teleportedSessionInfo.hasLoggedFirstMessage = !0;
}

/** Record a skill invocation keyed by agentId+skillName. */
function addInvokedSkill(skillName: any, skillPath: any, content: any, agentId: any = null) {
  let skillKey = `${agentId ?? ""}:${skillName}`;
  Bt.invokedSkills.set(skillKey, {
    skillName: skillName,
    skillPath: skillPath,
    content: content,
    invokedAt: Date.now(),
    agentId: agentId
  });
}
function getInvokedSkills() {
  return Bt.invokedSkills;
}

/** Return a filtered map of skills invoked by a specific agent (or by the main agent if null). */
function getInvokedSkillsForAgent(agentId: any) {
  let targetAgentId = agentId ?? null,
    result = new Map();
  for (let [key, entry] of Bt.invokedSkills) if (entry.agentId === targetAgentId) result.set(key, entry);
  return result;
}

/**
 * Clear invoked skills. If an activeAgentIds set is provided, only remove
 * skills from agents NOT in that set (or from the main/null agent).
 */
function clearInvokedSkills(activeAgentIds: any) {
  if (!activeAgentIds || activeAgentIds.size === 0) {
    Bt.invokedSkills.clear();
    return;
  }
  for (let [key, entry] of Bt.invokedSkills) if (entry.agentId === null || !activeAgentIds.has(entry.agentId)) Bt.invokedSkills.delete(key);
}
function clearInvokedSkillsForAgent(agentId: any) {
  for (let [key, entry] of Bt.invokedSkills) if (entry.agentId === agentId) Bt.invokedSkills.delete(key);
}

/** No-op stub for recording slow operations (always returns immediately). */
function addSlowOperation(e: any, t: any) {
  return;
}

/** Return the list of recent slow operations, filtering out entries older than the TTL. */
function getSlowOperations() {
  if (Bt.slowOperations.length === 0) return u6o;
  let now = Date.now();
  if (Bt.slowOperations.some((op: any) => now - op.timestamp >= Osr)) {
    if (Bt.slowOperations = Bt.slowOperations.filter((op: any) => now - op.timestamp < Osr), Bt.slowOperations.length === 0) return u6o;
  }
  return Bt.slowOperations;
}

/** Return the main-thread agent type, reading from sub-agent context if active. */
function getMainThreadAgentType() {
  let agentCtx = VH();
  return agentCtx ? agentCtx.mainThreadAgentType : Bt.mainThreadAgentType;
}
function setMainThreadAgentType(agentType: any) {
  let agentCtx = VH();
  if (agentCtx) agentCtx.mainThreadAgentType = agentType;else Bt.mainThreadAgentType = agentType;
}
function getMainThreadAgentHooks() {
  let agentCtx = VH();
  return agentCtx ? agentCtx.mainThreadAgentHooks : Bt.mainThreadAgentHooks;
}
function setMainThreadAgentHooks(hooks: any) {
  let agentCtx = VH();
  if (agentCtx) agentCtx.mainThreadAgentHooks = hooks;else Bt.mainThreadAgentHooks = hooks;
}
function getSessionSkillAllowlist() {
  return Bt.sessionSkillAllowlist;
}
function setSessionSkillAllowlist(allowlist: any) {
  Bt.sessionSkillAllowlist = allowlist;
}
function getCaps() {
  return Bt.caps;
}
function setCaps(caps: any) {
  Bt.caps = caps;
}
function getIsRemoteMode() {
  return Bt.caps.workspace === "remote";
}
function setIsRemoteMode(remote: any) {
  Bt.caps = {
    ...Bt.caps,
    workspace: remote ? "remote" : "local"
  };
}
function getSystemPromptSectionCache() {
  return Bt.systemPromptSectionCache;
}
function setSystemPromptSectionCacheEntry(key: any, value: any) {
  Bt.systemPromptSectionCache.set(key, value);
}
function clearSystemPromptSectionState() {
  Bt.systemPromptSectionCache.clear();
}
function getLastEmittedDate() {
  return Bt.lastEmittedDate;
}
function setLastEmittedDate(date: any) {
  Bt.lastEmittedDate = date;
}
function getAdditionalDirectoriesForClaudeMd() {
  return Bt.additionalDirectoriesForClaudeMd;
}
function setAdditionalDirectoriesForClaudeMd(dirs: any) {
  Bt.additionalDirectoriesForClaudeMd = dirs;
}
function getAllowedChannels() {
  return Bt.allowedChannels;
}
function setAllowedChannels(channels: any) {
  Bt.allowedChannels = channels;
}
function getHasDevChannels() {
  return Bt.hasDevChannels;
}
function setHasDevChannels(hasDev: any) {
  Bt.hasDevChannels = hasDev;
}
function getPromptCache1hAllowlist() {
  return Bt.promptCache1hAllowlist;
}
function setPromptCache1hAllowlist(allowlist: any) {
  Bt.promptCache1hAllowlist = allowlist;
}
function getThinkingTypeOverride(modelKey: any) {
  return Bt.thinkingTypeOverrides.get(modelKey);
}
function setThinkingTypeOverride(modelKey: any, thinkingType: any) {
  Bt.thinkingTypeOverrides.set(modelKey, thinkingType);
}
function getInferenceProfileBackingModelCached(profileKey: any) {
  return Bt.inferenceProfileBackingModels.get(profileKey);
}
function setInferenceProfileBackingModel(profileKey: any, backingModel: any) {
  Bt.inferenceProfileBackingModels.set(profileKey, backingModel);
}
function getStickyBetas() {
  return VH()?.stickyBetas ?? Bt.stickyBetas;
}

/** Reset sticky beta headers for the current context (sub-agent or main). */
function clearBetaHeaderLatches() {
  let agentCtx = VH();
  if (agentCtx) agentCtx.stickyBetas = Ere();else Bt.stickyBetas = Ere();
}
function getPromptId() {
  return Bt.promptId;
}
function setPromptId(promptId: any) {
  Bt.promptId = promptId;
}
function incrementPromptIndex() {
  return Bt.promptIndex++, Bt.promptIndex;
}
function getPromptIndex() {
  return Bt.promptIndex;
}

/** Return whether the REPL bridge is currently active. */
function isReplBridgeActive() {
  return Bt.replBridgeActive ?? !1;
}
function setReplBridgeActive(active: any) {
  if (Bt.replBridgeActive === active) return;
  Bt.replBridgeActive = active;
}

/** Module-level variables: lazy-initialized in the `lt` init block. */
var Psr,
  d6o,
  FRc,
  Bt,
  VH = () => {
    return;
  },
  ZYt,
  onSessionSwitch,
  Nsr,
  onOriginalCwdChange,
  nJt = !1,
  Ysr,
  onInteraction,
  Qsr = 0,
  Zsr = null,
  oJt = 0,
  NOTIF_ACTIVE_THRESHOLD_MS = 60000,
  oir = void 0,
  sir,
  onTerminalFocusChange,
  eJt = !1,
  QTt,
  g6o = 150,
  YRc = 100,
  $ir,
  onAttacherCapsChange,
  Nar,
  c6o = 10,
  Osr = 1e4,
  u6o;

/** Module initializer: require fs/process, set default caps, build initial state, wire event emitters. */
var lt = b(() => {
  Lqo();
  zYt();
  YYt();
  lk();
  ig();
  xS();
  Psr = require("fs"), d6o = require("process"), FRc = {
    renderTarget: "ink",
    workspace: "local",
    canDrive: !0,
    transcriptSource: "local-jsonl",
    remote: null
  };
  Bt = p6o();
  ZYt = Ni(), onSessionSwitch = ZYt.subscribe;
  Nsr = Ni(), onOriginalCwdChange = Nsr.subscribe;
  Ysr = Ni(), onInteraction = Ysr.subscribe;
  sir = Ni();
  onTerminalFocusChange = sir.subscribe;
  $ir = Ni();
  onAttacherCapsChange = $ir.subscribe;
  u6o = [];
});

export {Ere,l0,xbe,ULe,Cre,$Le,$be,p6o,setSessionOverridesGetter,getSessionId,mainAgentId,regenerateSessionId,m6o,getParentSessionId,switchSession,f6o,getSessionProjectDir,getOriginalCwd,getProjectRoot,ZTt,setOriginalCwd,setProjectRoot,getCwdState,setCwdState,resetStartTime,getDirectConnectServerUrl,setDirectConnectServerUrl,getMcpConnectNonBlocking,setMcpConnectNonBlocking,getStrictMcpConfig,setStrictMcpConfig,getActiveRoutine,setActiveRoutine,addToTotalDurationState,resetTotalDurationStateAndCost_FOR_TESTS_ONLY,addToTotalCostState,getTotalCostUSD,getTotalAPIDuration,getTotalDuration,getTotalAPIDurationWithoutRetries,getTotalToolDuration,addToToolDuration,getStatsStore,setStatsStore,updateLastInteractionTime,flushInteractionTime,h6o,resetInteractionBaseline,addToTotalLinesChanged,getTotalLinesAdded,getTotalLinesRemoved,getTotalInputTokens,getTotalOutputTokens,getTotalCacheReadInputTokens,getTotalCacheCreationInputTokens,getTotalWebSearchRequests,getTurnOutputTokens,getCurrentTurnTokenBudget,snapshotOutputTokensForTurn,getBudgetContinuationCount,incrementBudgetContinuationCount,setHasUnknownModelCost,hasUnknownModelCost,getLastMainRequestId,setLastMainRequestId,getLastMainThreadCacheTtlMs,setLastMainThreadCacheTtlMs,getLastApiCompletionTimestamp,setLastApiCompletionTimestamp,markPostCompaction,consumePostCompaction,getLastInteractionTime,setTerminalFocusForState,getTerminalFocus,isUserActiveForNotifications,markScrollActivity,getIsScrollDraining,waitForScrollIdle,getModelUsage,getUsageForModel,getMainLoopModelOverride,getInitialMainLoopModel,setMainLoopModelOverride,latchRefusalFallbackModel,clearRefusalFallbackModelLatch,getRefusalFallbackModelLatch,rewriteRefusalFallbackPreviousOverride,setSdkDialogHostActive,isSdkDialogHostActive,setSdkSupportedDialogKinds,getSdkSupportedDialogKinds,getSdkDialogCapabilitySource,getReplConfigArgv,setReplConfigArgv,setInitialMainLoopModel,getSdkBetas,setSdkBetas,isLongContext1mCreditsBlocked,setLongContext1mCreditsBlocked,isFableCreditsRequired,setFableCreditsRequired,hasFableBridgeDialogTimedOut,setFableBridgeDialogTimedOut,hasFableConsentDialogInteracted,setFableConsentDialogInteracted,hasFableConsentSessionFallback,setFableConsentSessionFallback,getSdkOAuthTokenRefreshCallback,setSdkOAuthTokenRefreshCallback,getHostAuthTokenRefreshCallback,setHostAuthTokenRefreshCallback,resetCostState,setCostStateForRestore,resetStateForTests,getModelStrings,setModelStrings,resetModelStrings,resetModelStringsForTestingOnly,setMeter,getMeter,getSessionCounter,getLocCounter,getPrCounter,getCommitCounter,getCostCounter,getTokenCounter,getCodeEditToolDecisionCounter,getActiveTimeCounter,getLoggerProvider,setLoggerProvider,getEventLogger,setEventLogger,bufferPendingOTelEvent,discardPendingOTelEvents,getMeterProvider,setMeterProvider,getTracerProvider,setTracerProvider,getFoundryDeploymentCapabilities,getCachedTelemetryResource,setCachedTelemetryResource,getCachedOtlpHttpAgentFactory,setCachedOtlpHttpAgentFactory,getIsNonInteractiveSession,getIsInteractive,setIsInteractive,getPermissionPromptToolName,setPermissionPromptToolName,getAttacherCaps,setAttacherCaps,getModelOverrideOptOutForSession,setModelOverrideOptOutForSession,getHasStreamingInput,setHasStreamingInput,getClientType,setClientType,getSdkAgentProgressSummariesEnabled,setSdkAgentProgressSummariesEnabled,getRendererModeForAnalytics,setRendererModeForAnalytics,getStrictToolResultPairing,setStrictToolResultPairing,getMemoryToggledOff,setMemoryToggledOff,getTeamMemoryServerStatus,setTeamMemoryServerStatus,getUserMsgOptIn,setUserMsgOptIn,getSearchToolsOptIn,setSearchToolsOptIn,getSessionSource,setSessionSource,getSessionStartType,setSessionStartType,getQuestionPreviewFormat,setQuestionPreviewFormat,getAgentColorMap,getFlagSettingsPath,setFlagSettingsPath,getFlagSettingsExpectedContent,setFlagSettingsExpectedContent,getFlagSettingsInline,setFlagSettingsInline,getParentManagedSettings,setParentManagedSettings,getSessionIngressToken,setSessionIngressToken,getOauthTokenFromFd,setOauthTokenFromFd,getOauthScopesFromFd,setOauthScopesFromFd,getApiKeyFromFd,setApiKeyFromFd,resetFdCredentialState,getGatewayAuth as z_,isGatewayAuthExpired,isGatewayAuthPinned,setGatewayAuth,getStartupPolicySnapshot,setStartupPolicySnapshot,getGatewayRefreshInFlight,setGatewayRefreshInFlight,setLastAPIRequest,getLastAPIRequest,setLastCancelledAPIMessageId,getLastCancelledAPIMessageId,setLastAPIRequestMessages,getLastAPIRequestMessages,setLastClassifierRequests,getLastClassifierRequests,setCachedClaudeMdContent,getCachedClaudeMdContent,addToInMemoryErrorLog,getAllowedSettingSources,setAllowedSettingSources,preferThirdPartyAuthentication,setInlinePlugins,getInlinePlugins,setInlinePluginsNoMcp,getInlinePluginsNoMcp as ZV,setInlinePluginUrls,getInlinePluginUrls,setSyncedPluginDirs,getSyncedPluginDirs,setChromeFlagOverride,getChromeFlagOverride,setOnboardingShownThisSession,getOnboardingShownThisSession,setUseCoworkPlugins,getUseCoworkPlugins,setDisableSlashCommands,getDisableSlashCommands,setSessionBypassPermissionsMode,getSessionBypassPermissionsMode,setScheduledTasksEnabled,getScheduledTasksEnabled,getSessionCronTasks,getSessionPrResolved,setSessionPrResolved,addSessionCronTask,getLoopChainStartedAt,setLoopChainStartedAt,deleteLoopChainStartedAt,getLoopTickInFlightPrompt,setLoopTickInFlightPrompt,getLoopConsecutiveKeepalives,setLoopConsecutiveKeepalives,removeSessionCronTasks,setSessionTrustAccepted,getSessionTrustAccepted,setSessionPersistenceDisabled,isSessionPersistenceDisabled,hasExitedPlanModeInSession,setHasExitedPlanMode as tK,needsPlanModeExitAttachment,setNeedsPlanModeExitAttachment,handlePlanModeTransition,needsAutoModeExitAttachment,setNeedsAutoModeExitAttachment as MU,handleAutoModeTransition,hasShownLspRecommendationThisSession,setLspRecommendationShownThisSession,setInitJsonSchema,getInitJsonSchema,setMcpClientsAccessor,getMcpClientsFromAccessor,kJt,registerHookCallbacks,getRegisteredHooks,clearRegisteredHooks,clearRegisteredPluginHooks,getPlanSlugCache,getSessionCreatedTeams,getInheritedTeamName,setInheritedTeamName,setTeleportedSessionInfo,getTeleportedSessionInfo,markFirstTeleportMessageLogged,addInvokedSkill,getInvokedSkills,getInvokedSkillsForAgent,clearInvokedSkills,clearInvokedSkillsForAgent,addSlowOperation,getSlowOperations,getMainThreadAgentType,setMainThreadAgentType,getMainThreadAgentHooks,setMainThreadAgentHooks,getSessionSkillAllowlist,setSessionSkillAllowlist,getCaps,setCaps,getIsRemoteMode,setIsRemoteMode,getSystemPromptSectionCache,setSystemPromptSectionCacheEntry,clearSystemPromptSectionState,getLastEmittedDate,setLastEmittedDate,getAdditionalDirectoriesForClaudeMd,setAdditionalDirectoriesForClaudeMd,getAllowedChannels,setAllowedChannels,getHasDevChannels,setHasDevChannels,getPromptCache1hAllowlist,setPromptCache1hAllowlist,getThinkingTypeOverride,setThinkingTypeOverride,getInferenceProfileBackingModelCached,setInferenceProfileBackingModel,getStickyBetas,clearBetaHeaderLatches,getPromptId,setPromptId,incrementPromptIndex,getPromptIndex,isReplBridgeActive,setReplBridgeActive,Psr,d6o,FRc,Bt,VH,ZYt,onSessionSwitch,Nsr,onOriginalCwdChange,nJt,Ysr,onInteraction,Qsr,Zsr,oJt,NOTIF_ACTIVE_THRESHOLD_MS,oir,sir,onTerminalFocusChange,eJt,QTt,g6o,YRc,$ir,onAttacherCapsChange,Nar,c6o,Osr,u6o,lt};
