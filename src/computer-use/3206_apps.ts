// @ts-nocheck
import {Qz as Fz,UHn as rHn} from "../../vendor/m3198.ts";
import {zKr as Z7r,KKr as Q7r,_na as rta,yna as ota} from "../mcp/3204_content.ts";
import {bpe as rpe,OSt as cSt} from "../session/0426_level.ts";
import {Q$e as x$e,JKr as tKr} from "../tools/3205_type.ts";
import {XV as NV,t8 as Nj,YT as HS} from "../tools/0323_ttl.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function mergeGrantedApps(currentApps, currentFlags, requestResult) {
  let existingBundleIds = new Set(currentApps.map(app => app.bundleId)),
    mergedApps = [...currentApps, ...requestResult.granted.filter(app => !existingBundleIds.has(app.bundleId))],
    newlyEnabledFlags = Object.fromEntries(Object.entries(requestResult.flags).filter(([, enabled]) => enabled === true)),
    mergedFlags = {
      ...Fz,
      ...currentFlags,
      ...newlyEnabledFlags
    };
  return {
    apps: mergedApps,
    flags: mergedFlags
  };
}
function createToolCallHandler(serverCtx, coordinateMode, session) {
  let {
      logger: logger,
      serverName: serverName
    } = serverCtx,
    lastScreenshot,
    handlePermissionRequest = session.onPermissionRequest ? async (request, signal) => {
      let result = await session.onPermissionRequest(request, signal),
        {
          apps: apps,
          flags: flags
        } = mergeGrantedApps(session.getAllowedApps(), session.getGrantFlags(), result);
      return logger.debug(`[${serverName}] permission result: granted=${result.granted.length} denied=${result.denied.length}`), session.onAllowedAppsChanged?.(apps, flags), result;
    } : undefined,
    handleTeachPermissionRequest = session.onTeachPermissionRequest ? async (request, signal) => {
      let result = await session.onTeachPermissionRequest(request, signal);
      logger.debug(`[${serverName}] teach permission result: granted=${result.granted.length} denied=${result.denied.length}`);
      let {
        apps: apps
      } = mergeGrantedApps(session.getAllowedApps(), session.getGrantFlags(), result);
      return session.onAllowedAppsChanged?.(apps, {
        ...Fz,
        ...session.getGrantFlags()
      }), result;
    } : undefined;
  return async (toolName, toolArgs) => {
    if (session.checkCuLock) {
      let lockState = await session.checkCuLock();
      if (lockState.holder !== undefined && !lockState.isSelf) return {
        content: [{
          type: "text",
          text: session.formatLockHeldMessage?.(lockState.holder) ?? CU_LOCK_HELD_MESSAGE
        }],
        isError: true,
        telemetry: {
          error_kind: "cu_lock_held"
        }
      };
      if (lockState.holder === undefined && !Z7r(toolName)) {
        await session.acquireCuLock?.();
        let recheck = await session.checkCuLock();
        if (recheck.holder !== undefined && !recheck.isSelf) return {
          content: [{
            type: "text",
            text: session.formatLockHeldMessage?.(recheck.holder) ?? CU_LOCK_HELD_MESSAGE
          }],
          isError: true,
          telemetry: {
            error_kind: "cu_lock_held"
          }
        };
        Q7r();
      }
    }
    let priorDims = lastScreenshot ? undefined : session.getLastScreenshotDims?.(),
      abortController = new AbortController(),
      sessionState = {
        allowedApps: [...session.getAllowedApps()],
        grantFlags: session.getGrantFlags(),
        userDeniedBundleIds: session.getUserDeniedBundleIds(),
        coordinateMode: coordinateMode,
        selectedDisplayId: session.getSelectedDisplayId(),
        displayPinnedByModel: session.getDisplayPinnedByModel?.(),
        displayResolvedForApps: session.getDisplayResolvedForApps?.(),
        lastScreenshot: lastScreenshot ?? (priorDims ? {
          ...priorDims,
          base64: ""
        } : undefined),
        onPermissionRequest: handlePermissionRequest ? request => handlePermissionRequest(request, abortController.signal) : undefined,
        onTeachPermissionRequest: handleTeachPermissionRequest ? request => handleTeachPermissionRequest(request, abortController.signal) : undefined,
        onAppsHidden: session.onAppsHidden,
        getClipboardStash: session.getClipboardStash,
        onClipboardStashChanged: session.onClipboardStashChanged,
        onResolvedDisplayUpdated: session.onResolvedDisplayUpdated,
        onDisplayPinned: session.onDisplayPinned,
        onDisplayResolvedForApps: session.onDisplayResolvedForApps,
        onTeachModeActivated: session.onTeachModeActivated,
        onTeachStep: session.onTeachStep,
        onTeachWorking: session.onTeachWorking,
        getTeachModeActive: session.getTeachModeActive,
        checkCuLock: undefined,
        acquireCuLock: undefined,
        isAborted: session.isAborted
      };
    logger.debug(`[${serverName}] tool=${toolName} allowedApps=${sessionState.allowedApps.length} coordMode=${coordinateMode}`);
    try {
      let result = await rta(serverCtx, toolName, toolArgs, sessionState);
      if (result.screenshot) {
        lastScreenshot = result.screenshot;
        let {
          base64: base64,
          ...dims
        } = result.screenshot;
        logger.debug(`[${serverName}] screenshot dims: ${JSON.stringify(dims)}`), session.onScreenshotCaptured?.(dims);
      }
      return result;
    } finally {
      abortController.abort();
    }
  };
}
function createComputerUseServer(serverCtx, coordinateMode, session) {
  let {
      serverName: serverName,
      logger: logger
    } = serverCtx,
    server = new rpe({
      name: serverName,
      version: "0.1.3"
    }, {
      capabilities: {
        tools: {},
        logging: {}
      }
    }),
    toolDefinitions = x$e(serverCtx.executor.capabilities, coordinateMode);
  if (server.setRequestHandler(NV, async () => serverCtx.isDisabled() ? {
    tools: []
  } : {
    tools: toolDefinitions
  }), session) {
    let handleToolCall = createToolCallHandler(serverCtx, coordinateMode, session);
    return server.setRequestHandler(Nj, async request => {
      let {
        screenshot: screenshot,
        telemetry: telemetry,
        ...mcpResult
      } = await handleToolCall(request.params.name, request.params.arguments ?? {});
      return mcpResult;
    }), server;
  }
  return server.setRequestHandler(Nj, async request => (logger.warn(`[${serverName}] tool call "${request.params.name}" reached the stub handler \u2014 no session context bound. Per-session state unavailable.`), {
    content: [{
      type: "text",
      text: "This computer-use server instance is not wired to a session. Per-session app permissions are not available on this code path."
    }],
    isError: true
  })), server;
}
var CU_LOCK_HELD_MESSAGE = "Another Claude session is currently using the computer. Wait for that session to finish, or find a non-computer-use approach.";
var initComputerUseAppsModule = b(() => {
  cSt();
  HS();
  ota();
  tKr();
  rHn();
});

export {mergeGrantedApps as bna,createToolCallHandler as zHn,createComputerUseServer as XKr,CU_LOCK_HELD_MESSAGE as Sna,initComputerUseAppsModule as Ena};
