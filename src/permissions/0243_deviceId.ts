// @ts-nocheck
import {SocketConnectionError as WI,NoExtensionConnectedError as pLe,ExtensionDisconnectedMidCallError as sSe,ToolCallTimeoutError as mLe,vGe as aGe} from "../../vendor/m241.ts";
import {b,M as L} from "../../runtime.ts";
// @ts-nocheck
var DEFAULT_TOOL_CALL_TIMEOUT_MS = 60000,
  PEER_CONNECT_WAIT_MS = 1e4,
  LIST_EXTENSIONS_TIMEOUT_MS = 5000,
  jA_ = 10;
function getLocalOsPlatform() {
  return "macOS";
}
function sanitizeString(value, maxLength) {
  if (typeof value !== "string") return;
  let cleaned = value.replace(/[\r\n\t\u0000-\u001f]/g, " ").trim();
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength)}\u2026` : cleaned;
}
function j51(raw) {
  return {
    deviceId: sanitizeString(raw.deviceId, 64) ?? "",
    name: sanitizeString(raw.name, 50),
    osPlatform: sanitizeString(raw.osPlatform, 30),
    connectedAt: typeof raw.connectedAt === "number" ? raw.connectedAt : 0
  };
}
class An_ {
  ws = null;
  connected = false;
  authenticated = false;
  connecting = false;
  reconnectTimer = null;
  handshakeTimer = null;
  reconnectAttempts = 0;
  pendingCalls = new Map();
  timedOutCalls = new Map();
  notificationHandler = null;
  context;
  permissionMode = "ask";
  allowedDomains;
  connectionStartTime = null;
  connectionEstablishedTime = null;
  selectedDeviceId;
  discoveryComplete = false;
  multiBrowserPendingSelection = false;
  lastKnownExtensionIds = [];
  discoveryPromise = null;
  pendingDiscovery = null;
  listExtensionsPromise = null;
  previousSelectedDeviceId;
  peerConnectedWaiters = [];
  pendingPairingRequestId;
  pairingInProgress = false;
  persistedDeviceId;
  pendingSwitchResolve = null;
  pairingPromptAbort = null;
  pairingPromptTimeout = null;
  keepAliveInterval = null;
  lastPongReceived = 0;
  constructor(context) {
    if (this.context = context, context.initialPermissionMode) this.permissionMode = context.initialPermissionMode;
  }
  async ensureConnected() {
    let {
      logger: logger,
      serverName: serverName
    } = this.context;
    if (logger.info(`[${serverName}] ensureConnected called, connected=${this.connected}, authenticated=${this.authenticated}, wsState=${this.ws?.readyState}`), this.connected && this.authenticated && this.ws?.readyState === c5H.default.OPEN) return logger.info(`[${serverName}] Already connected and authenticated`), true;
    if (!this.connecting && !this.reconnectTimer) logger.info(`[${serverName}] Not connecting, starting connection...`), await this.connect();else logger.info(`[${serverName}] Connect in progress or reconnect scheduled, waiting...`);
    return new Promise(resolve => {
      let pollTimer = null,
        overallTimeout = setTimeout(() => {
          if (pollTimer) clearTimeout(pollTimer);
          logger.info(`[${serverName}] Connection timeout, connected=${this.connected}, authenticated=${this.authenticated}`), resolve(false);
        }, 1e4),
        poll = () => {
          if (this.connected && this.authenticated) logger.info(`[${serverName}] Connection successful`), clearTimeout(overallTimeout), resolve(true);else if (!this.connecting && !this.reconnectTimer) logger.info(`[${serverName}] No longer connecting, giving up`), clearTimeout(overallTimeout), resolve(false);else pollTimer = setTimeout(poll, 200);
        };
      poll();
    });
  }
  async callTool(toolName, args, options) {
    let {
      logger: logger,
      serverName: serverName,
      trackEvent: trackEvent
    } = this.context;
    if (!this.ws || this.ws.readyState !== c5H.default.OPEN) throw new WI(`[${serverName}] Bridge not connected`);
    if (!this.selectedDeviceId && !this.discoveryComplete) this.discoveryPromise ??= this.discoverAndSelectExtension().finally(() => {
      this.discoveryPromise = null;
    }), await this.discoveryPromise;
    if (this.discoveryComplete && !this.selectedDeviceId && !this.pairingInProgress && !this.multiBrowserPendingSelection) throw new pLe(`[${serverName}] No Chrome extension connected after discovery`);
    let toolUseId = crypto.randomUUID(),
      startTime = Date.now(),
      timeoutMs = this.context.getToolCallTimeoutMs?.(toolName) ?? DEFAULT_TOOL_CALL_TIMEOUT_MS,
      sessionId = options?.sessionScope?.sessionId,
      userMessageUuid = options?.sessionScope?.userMessageUuid;
    trackEvent?.("chrome_bridge_tool_call_started", {
      tool_name: toolName,
      tool_use_id: toolUseId,
      session_id: sessionId,
      user_message_uuid: userMessageUuid,
      timeout_ms: timeoutMs
    });
    let permissionMode = options?.permissionMode ?? this.permissionMode,
      allowedDomains = options?.allowedDomains ?? this.allowedDomains,
      message = {
        type: "tool_call",
        tool_use_id: toolUseId,
        client_type: this.context.clientTypeId,
        tool: toolName,
        args: args
      };
    if (this.selectedDeviceId) message.target_device_id = this.selectedDeviceId;
    if (permissionMode) message.permission_mode = permissionMode;
    if (allowedDomains?.length) message.allowed_domains = allowedDomains;
    if (options?.onPermissionRequest) message.handle_permission_prompts = true;
    if (options?.sessionScope) message.session_scope = options.sessionScope;
    return new Promise((resolve, reject) => {
      let timer = this.createTimeoutTimer(toolUseId, timeoutMs);
      this.pendingCalls.set(toolUseId, {
        resolve: resolve,
        reject: reject,
        timer: timer,
        onPermissionRequest: options?.onPermissionRequest,
        startTime: startTime,
        toolName: toolName,
        timeoutMs: timeoutMs,
        sessionId: sessionId,
        userMessageUuid: userMessageUuid
      }), logger.debug(`[${serverName}] Sending tool_call: ${toolName} (${toolUseId.slice(0, 8)})`), this.ws.send(JSON.stringify(message));
    });
  }
  isConnected() {
    return this.connected && this.authenticated && this.ws?.readyState === c5H.default.OPEN;
  }
  disconnect() {
    this.cleanup();
  }
  setNotificationHandler(handler) {
    this.notificationHandler = handler;
  }
  async discoverAndSelectExtension() {
    let {
      logger: logger,
      serverName: serverName
    } = this.context;
    this.persistedDeviceId = this.context.getPersistedDeviceId?.();
    let extensions = await this.queryBridgeExtensions();
    if (extensions.length === 0) {
      if (logger.info(`[${serverName}] No extensions connected, waiting up to ${PEER_CONNECT_WAIT_MS}ms for peer_connected`), await this.waitForPeerConnected(PEER_CONNECT_WAIT_MS)) extensions = await this.queryBridgeExtensions();
    }
    if (this.context.getRequirePairedDevice?.()) {
      if (!this.persistedDeviceId) {
        logger.info(`[${serverName}] requirePairedDevice set but no persistedDeviceId; refusing to auto-select`), this.discoveryComplete = true;
        return;
      }
      let requiredDeviceId = this.persistedDeviceId,
        match = extensions.find(extension => extension.deviceId === requiredDeviceId);
      if (!match) {
        if (logger.info(`[${serverName}] requirePairedDevice: persisted ${requiredDeviceId.slice(0, 8)} not connected (${extensions.length} other(s) visible); waiting`), await this.waitForPeerConnected(PEER_CONNECT_WAIT_MS)) extensions = await this.queryBridgeExtensions(), match = extensions.find(extension => extension.deviceId === requiredDeviceId);
      }
      if (this.discoveryComplete = true, match) this.selectExtension(match.deviceId);else logger.info(`[${serverName}] requirePairedDevice: persisted device never arrived; refusing to auto-select`);
      return;
    }
    if (this.discoveryComplete = true, this.selectedDeviceId) return;
    if (extensions.length === 0) {
      logger.info(`[${serverName}] No extensions found after waiting`);
      return;
    }
    if (extensions.length === 1) {
      let onlyExtension = extensions[0];
      if (!this.isLocalExtension(onlyExtension)) this.context.onRemoteExtensionWarning?.(onlyExtension);
      this.selectExtension(onlyExtension.deviceId);
      return;
    }
    if (this.persistedDeviceId) {
      let persistedMatch = extensions.find(extension => extension.deviceId === this.persistedDeviceId);
      if (persistedMatch) {
        logger.info(`[${serverName}] Auto-connecting to persisted extension: ${persistedMatch.name || persistedMatch.deviceId.slice(0, 8)}`), this.selectExtension(persistedMatch.deviceId);
        return;
      }
    }
    if (this.context.askUserToolName) {
      this.multiBrowserPendingSelection = true;
      return;
    }
    this.broadcastPairingRequest(), this.pairingInProgress = true, this.firePairingPrompt();
  }
  queryBridgeExtensions() {
    if (this.listExtensionsPromise) return this.listExtensionsPromise;
    let query = new Promise(resolve => {
      let timeout = setTimeout(() => {
        this.pendingDiscovery = null, resolve([]);
      }, LIST_EXTENSIONS_TIMEOUT_MS);
      this.pendingDiscovery = {
        resolve: resolve,
        timeout: timeout
      }, this.ws?.send(JSON.stringify({
        type: "list_extensions"
      }));
    }).then(rawExtensions => {
      let latestByDevice = new Map();
      for (let extension of rawExtensions) {
        let existing = latestByDevice.get(extension.deviceId);
        if (!existing || extension.connectedAt > existing.connectedAt) latestByDevice.set(extension.deviceId, extension);
      }
      let normalized = [...latestByDevice.values()].map(j51);
      return this.lastKnownExtensionIds = normalized.map(extension => extension.deviceId), normalized;
    });
    return this.listExtensionsPromise = query, query.finally(() => {
      if (this.listExtensionsPromise === query) this.listExtensionsPromise = null;
    }), query;
  }
  getSelectedDeviceId() {
    return this.selectedDeviceId ?? this.context.getPersistedDeviceId?.();
  }
  hasActiveSelection() {
    return this.selectedDeviceId !== undefined;
  }
  clearSelection() {
    this.selectedDeviceId = undefined, this.previousSelectedDeviceId = undefined, this.discoveryComplete = false, this.multiBrowserPendingSelection = false, this.lastKnownExtensionIds = [], this.pairingInProgress = false, this.abortPairingPrompt();
  }
  selectExtension(deviceId) {
    let {
      logger: logger,
      serverName: serverName
    } = this.context;
    this.selectedDeviceId = deviceId, this.previousSelectedDeviceId = undefined, this.multiBrowserPendingSelection = false, logger.info(`[${serverName}] Selected Chrome extension: ${deviceId.slice(0, 8)}...`);
  }
  async listConnectedExtensions() {
    if (!(await this.ensureConnected())) return [];
    return (await this.queryBridgeExtensions()).map(extension => ({
      ...extension,
      isLocal: this.isLocalExtension(extension)
    }));
  }
  selectExtensionById(deviceId, name, knownDeviceIds) {
    if (this.discoveryComplete = true, this.pairingInProgress = false, this.pendingPairingRequestId = undefined, this.selectExtension(deviceId), this.context.onExtensionPaired?.(deviceId, name, knownDeviceIds ?? this.lastKnownExtensionIds), this.pendingSwitchResolve) this.pendingSwitchResolve({
      deviceId: deviceId,
      name: name
    });
    this.abortPairingPrompt();
  }
  firePairingPrompt() {
    if (this.abortPairingPrompt(), !this.context.onPairingPrompted) return;
    let abortController = new AbortController();
    this.pairingPromptAbort = abortController, this.pairingPromptTimeout = setTimeout(() => this.abortPairingPrompt(), 120000), this.context.onPairingPrompted(abortController.signal);
  }
  abortPairingPrompt() {
    if (this.pairingPromptTimeout) clearTimeout(this.pairingPromptTimeout), this.pairingPromptTimeout = null;
    if (this.pairingPromptAbort) this.pairingPromptAbort.abort(), this.pairingPromptAbort = null;
  }
  isLocalExtension(extension) {
    if (!extension.osPlatform) return false;
    return extension.osPlatform === getLocalOsPlatform();
  }
  waitForPeerConnected(timeoutMs) {
    return new Promise(resolve => {
      let timeout = setTimeout(() => {
          this.peerConnectedWaiters = this.peerConnectedWaiters.filter(other => other !== waiter), resolve(false);
        }, timeoutMs),
        waiter = connected => {
          clearTimeout(timeout), resolve(connected);
        };
      this.peerConnectedWaiters.push(waiter);
    });
  }
  broadcastPairingRequest() {
    let requestId = crypto.randomUUID();
    this.pendingPairingRequestId = requestId, this.ws?.send(JSON.stringify({
      type: "pairing_request",
      request_id: requestId,
      client_type: this.context.clientTypeId
    }));
  }
  async switchBrowser() {
    let extensions = await this.queryBridgeExtensions(),
      currentOrPrevious = this.selectedDeviceId ?? this.previousSelectedDeviceId;
    if (extensions.length === 0 || extensions.length === 1 && (!currentOrPrevious || extensions[0].deviceId === currentOrPrevious)) return "no_other_browsers";
    this.previousSelectedDeviceId = this.selectedDeviceId, this.selectedDeviceId = undefined, this.discoveryComplete = false, this.pairingInProgress = false;
    let requestId = crypto.randomUUID();
    if (this.pendingPairingRequestId = requestId, this.ws?.readyState !== c5H.default.OPEN) return null;
    if (this.ws.send(JSON.stringify({
      type: "pairing_request",
      request_id: requestId,
      client_type: this.context.clientTypeId
    })), this.firePairingPrompt(), this.pendingSwitchResolve) this.pendingSwitchResolve(null);
    return new Promise(resolve => {
      let timeout = setTimeout(() => {
        if (this.pendingPairingRequestId === requestId) this.pendingPairingRequestId = undefined;
        this.pendingSwitchResolve = null, this.abortPairingPrompt(), resolve(null);
      }, 120000);
      this.pendingSwitchResolve = result => {
        clearTimeout(timeout), this.pendingSwitchResolve = null, resolve(result);
      };
    });
  }
  async connect() {
    let {
      logger: logger,
      serverName: serverName,
      bridgeConfig: bridgeConfig,
      trackEvent: trackEvent
    } = this.context;
    if (!bridgeConfig) {
      logger.error(`[${serverName}] No bridge config provided`);
      return;
    }
    if (this.connecting) return;
    this.connecting = true, this.authenticated = false, this.connectionStartTime = Date.now(), this.closeSocket(), this.handshakeTimer = setTimeout(() => {
      if (this.handshakeTimer = null, !this.connecting) return;
      let wsState = this.ws?.readyState;
      if (logger.warn(`[${serverName}] Bridge connect stuck after ${HANDSHAKE_TIMEOUT_MS}ms (ws_state=${wsState})`), trackEvent?.("chrome_bridge_handshake_timeout", {
        duration_ms: Date.now() - (this.connectionStartTime ?? 0),
        ws_state: wsState
      }), wsState === undefined) return;
      this.connecting = false, this.closeSocket(), this.scheduleReconnect();
    }, HANDSHAKE_TIMEOUT_MS);
    let userId, oauthToken;
    if (bridgeConfig.devUserId) userId = bridgeConfig.devUserId, logger.debug(`[${serverName}] Using dev user ID for bridge connection`);else {
      logger.debug(`[${serverName}] Fetching user ID for bridge connection`);
      let userIdError, resolvedUserId;
      if (bridgeConfig.getUserIdResult) {
        let result = await bridgeConfig.getUserIdResult();
        if (result.ok) resolvedUserId = result.userId;else userIdError = result.error;
      } else resolvedUserId = await bridgeConfig.getUserId();
      if (!resolvedUserId) {
        let duration = Date.now() - this.connectionStartTime;
        logger.error(`[${serverName}] No user ID available after ${duration}ms`), trackEvent?.("chrome_bridge_connection_failed", {
          duration_ms: duration,
          error_type: "no_user_id",
          error_detail: userIdError,
          reconnect_attempt: this.reconnectAttempts
        }), this.connecting = false, this.scheduleReconnect();
        return;
      }
      if (userId = resolvedUserId, logger.debug(`[${serverName}] Fetching OAuth token for bridge connection`), oauthToken = await bridgeConfig.getOAuthToken(), !oauthToken) {
        let duration = Date.now() - this.connectionStartTime;
        logger.error(`[${serverName}] No OAuth token available after ${duration}ms`), trackEvent?.("chrome_bridge_connection_failed", {
          duration_ms: duration,
          error_type: "no_oauth_token",
          reconnect_attempt: this.reconnectAttempts
        }), this.connecting = false, this.scheduleReconnect();
        return;
      }
    }
    let bridgeUrl = `${bridgeConfig.url}/chrome/${userId}`;
    logger.info(`[${serverName}] Connecting to bridge: ${bridgeUrl}`), trackEvent?.("chrome_bridge_connection_started", {
      bridge_url: bridgeUrl
    });
    try {
      let wsOptions = (await bridgeConfig.getWsOptions?.()) ?? bridgeConfig.wsOptions;
      this.ws = new c5H.default(bridgeUrl, wsOptions ? {
        ...wsOptions,
        tls: wsOptions
      } : undefined);
    } catch (error) {
      let duration = Date.now() - this.connectionStartTime;
      logger.error(`[${serverName}] Failed to create WebSocket after ${duration}ms:`, error), trackEvent?.("chrome_bridge_connection_failed", {
        duration_ms: duration,
        error_type: "websocket_error",
        error_code: error?.code,
        reconnect_attempt: this.reconnectAttempts
      }), this.connecting = false, this.scheduleReconnect();
      return;
    }
    this.ws.on("open", () => {
      logger.info(`[${serverName}] WebSocket connected, sending connect message`);
      let connectMessage = {
        type: "connect",
        client_type: this.context.clientTypeId
      };
      if (bridgeConfig.devUserId) connectMessage.dev_user_id = bridgeConfig.devUserId;else connectMessage.oauth_token = oauthToken;
      this.ws?.send(JSON.stringify(connectMessage));
    }), this.ws.on("message", data => {
      try {
        let parsed = JSON.parse(data.toString());
        logger.debug(`[${serverName}] Bridge received: ${JSON.stringify(parsed)}`), this.handleMessage(parsed);
      } catch (error) {
        logger.error(`[${serverName}] Failed to parse bridge message:`, error);
      }
    }), this.ws.on("close", closeCode => {
      let duration = this.connectionEstablishedTime ? Date.now() - this.connectionEstablishedTime : 0;
      logger.info(`[${serverName}] Bridge connection closed (code: ${closeCode}, duration: ${duration}ms)`), trackEvent?.("chrome_bridge_disconnected", {
        close_code: closeCode,
        duration_since_connect_ms: duration,
        reconnect_attempt: this.reconnectAttempts + 1
      }), this.connected = false, this.authenticated = false, this.connecting = false, this.connectionEstablishedTime = null, this.rejectPendingCalls(new WI("Bridge connection closed mid-call")), this.scheduleReconnect();
    }), this.ws.on("error", error => {
      let duration = this.connectionStartTime ? Date.now() - this.connectionStartTime : 0;
      logger.error(`[${serverName}] Bridge WebSocket error after ${duration}ms: ${error.message}`), trackEvent?.("chrome_bridge_connection_failed", {
        duration_ms: duration,
        error_type: "websocket_error",
        error_code: error.code,
        reconnect_attempt: this.reconnectAttempts
      }), this.connected = false, this.authenticated = false, this.connecting = false, this.rejectPendingCalls(new WI(`Bridge connection error: ${error.message}`));
    });
  }
  handleMessage(message) {
    let {
      logger: logger,
      serverName: serverName,
      trackEvent: trackEvent
    } = this.context;
    switch (message.type) {
      case "paired":
        {
          let duration = this.connectionStartTime ? Date.now() - this.connectionStartTime : 0;
          logger.info(`[${serverName}] Paired with Chrome extension (duration: ${duration}ms)`), this.connected = true, this.authenticated = true, this.connecting = false, this.reconnectAttempts = 0, this.connectionEstablishedTime = Date.now(), this.startKeepAlive(), trackEvent?.("chrome_bridge_connection_succeeded", {
            duration_ms: duration,
            status: "paired"
          });
          break;
        }
      case "waiting":
        {
          let duration = this.connectionStartTime ? Date.now() - this.connectionStartTime : 0;
          logger.info(`[${serverName}] Waiting for Chrome extension to connect (duration: ${duration}ms)`), this.connected = true, this.authenticated = true, this.connecting = false, this.reconnectAttempts = 0, this.connectionEstablishedTime = Date.now(), this.startKeepAlive(), trackEvent?.("chrome_bridge_connection_succeeded", {
            duration_ms: duration,
            status: "waiting"
          });
          break;
        }
      case "peer_connected":
        if (logger.info(`[${serverName}] Chrome extension connected to bridge`), trackEvent?.("chrome_bridge_peer_connected", null), !this.selectedDeviceId) this.discoveryComplete = false;
        if (this.previousSelectedDeviceId && message.deviceId === this.previousSelectedDeviceId && !this.pendingSwitchResolve) logger.info(`[${serverName}] Previously selected extension reconnected, auto-reselecting`), this.selectExtension(this.previousSelectedDeviceId), this.previousSelectedDeviceId = undefined;
        if (this.peerConnectedWaiters.length > 0) {
          let waiters = this.peerConnectedWaiters;
          this.peerConnectedWaiters = [];
          for (let waiter of waiters) waiter(true);
        }
        break;
      case "peer_disconnected":
        {
          let disconnectedDeviceId = message.deviceId;
          if (logger.info(`[${serverName}] Chrome extension disconnected from bridge (deviceId=${disconnectedDeviceId ?? "none"}, selected=${this.selectedDeviceId ?? "none"})`), trackEvent?.("chrome_bridge_peer_disconnected", {
            disconnected_device_id: disconnectedDeviceId ?? null,
            selected_device_id: this.selectedDeviceId ?? null,
            had_match: disconnectedDeviceId != null && disconnectedDeviceId === this.selectedDeviceId,
            pending_calls: this.pendingCalls.size
          }), message.deviceId && message.deviceId === this.selectedDeviceId) logger.info(`[${serverName}] Selected extension disconnected, clearing selection`), this.previousSelectedDeviceId = this.selectedDeviceId, this.selectedDeviceId = undefined, this.discoveryComplete = false, this.rejectPendingCalls(new sSe("Chrome extension disconnected mid-call"));else if (!this.selectedDeviceId && this.multiBrowserPendingSelection) this.discoveryComplete = false, this.multiBrowserPendingSelection = false;
          break;
        }
      case "routing_ack":
        {
          trackEvent?.("chrome_bridge_routing_ack", {
            tool_use_id: message.tool_use_id ?? null,
            routed_to: message.routed_to ?? null,
            target_connected_at: message.target_connected_at ?? null,
            target_pong_age_ms: message.target_pong_age_ms ?? null,
            extension_sockets: message.extension_sockets ?? null,
            mcp_sockets: message.mcp_sockets ?? null
          });
          let pendingCall = this.pendingCalls.get(message.tool_use_id ?? "");
          if (pendingCall) pendingCall.routingAckReceived = true, pendingCall.routingAckPongAgeMs = message.target_pong_age_ms ?? null;
          break;
        }
      case "extensions_list":
        if (this.pendingDiscovery) clearTimeout(this.pendingDiscovery.timeout), this.pendingDiscovery.resolve(message.extensions ?? []), this.pendingDiscovery = null;
        break;
      case "pairing_response":
        {
          let requestId = message.request_id;
          if (this.pendingPairingRequestId !== requestId) break;
          if (message.dismissed === true) {
            logger.info(`[${serverName}] Pairing prompt dismissed in extension`), this.abortPairingPrompt();
            break;
          }
          let deviceId = sanitizeString(message.device_id, 64),
            name = sanitizeString(message.name, 50);
          if (deviceId && name) {
            if (this.pendingPairingRequestId = undefined, this.pairingInProgress = false, this.selectExtension(deviceId), this.context.onExtensionPaired?.(deviceId, name, this.lastKnownExtensionIds), this.abortPairingPrompt(), logger.info(`[${serverName}] Paired with "${name}" (${deviceId.slice(0, 8)})`), this.pendingSwitchResolve) this.pendingSwitchResolve({
              deviceId: deviceId,
              name: name
            }), this.pendingSwitchResolve = null;
          }
          break;
        }
      case "ping":
        this.ws?.send(JSON.stringify({
          type: "pong"
        }));
        break;
      case "pong":
        this.lastPongReceived = Date.now();
        break;
      case "tool_result":
        this.handleToolResult(message);
        break;
      case "permission_request":
        this.handlePermissionRequest(message);
        break;
      case "notification":
        if (this.notificationHandler) this.notificationHandler({
          method: message.method,
          params: message.params
        });
        break;
      case "error":
        if (logger.warn(`[${serverName}] Bridge error: ${message.error}`), this.selectedDeviceId) this.selectedDeviceId = undefined, this.discoveryComplete = false;
        break;
      default:
        logger.warn(`[${serverName}] Unrecognized bridge message type: ${message.type}`);
    }
  }
  async handlePermissionRequest(message) {
    let {
        logger: logger,
        serverName: serverName
      } = this.context,
      toolUseId = message.tool_use_id,
      requestId = message.request_id;
    if (!toolUseId || !requestId) {
      logger.warn(`[${serverName}] permission_request missing tool_use_id or request_id`);
      return;
    }
    let pendingCall = this.pendingCalls.get(toolUseId);
    if (!pendingCall?.onPermissionRequest) {
      logger.debug(`[${serverName}] Ignoring permission_request for unknown tool_use_id ${toolUseId.slice(0, 8)} (not our call)`);
      return;
    }
    let request = {
      toolUseId: toolUseId,
      requestId: requestId,
      toolType: message.tool_type ?? "unknown",
      url: message.url ?? "",
      actionData: message.action_data
    };
    clearTimeout(pendingCall.timer), pendingCall.permissionPaused = true;
    try {
      let allowed = await pendingCall.onPermissionRequest(request);
      this.sendPermissionResponse(requestId, allowed);
    } catch (error) {
      logger.error(`[${serverName}] Error handling permission request:`, error), this.sendPermissionResponse(requestId, false);
    }
    let stillPending = this.pendingCalls.get(toolUseId);
    if (stillPending) stillPending.timer = this.createTimeoutTimer(toolUseId, stillPending.timeoutMs);
  }
  sendPermissionResponse(requestId, allowed) {
    if (this.ws?.readyState === c5H.default.OPEN) {
      let message = {
        type: "permission_response",
        request_id: requestId,
        allowed: allowed
      };
      if (this.selectedDeviceId) message.target_device_id = this.selectedDeviceId;
      this.ws.send(JSON.stringify(message));
    }
  }
  handleToolResult(message) {
    let {
        logger: logger,
        serverName: serverName,
        trackEvent: trackEvent
      } = this.context,
      toolUseId = message.tool_use_id;
    if (!toolUseId) {
      logger.warn(`[${serverName}] Received tool_result without tool_use_id`);
      return;
    }
    let pendingCall = this.pendingCalls.get(toolUseId);
    if (!pendingCall) {
      logger.debug(`[${serverName}] Received tool_result for unknown call: ${toolUseId.slice(0, 8)}`);
      let timedOutAt = this.timedOutCalls.get(toolUseId);
      if (trackEvent?.("chrome_bridge_tool_call_late_result", {
        tool_use_id: toolUseId,
        gap_from_timeout_ms: timedOutAt ? Date.now() - timedOutAt : null,
        reason: timedOutAt ? "post_timeout" : "unknown",
        is_error: typeof message.is_error === "boolean" ? message.is_error : null
      }), timedOutAt) this.timedOutCalls.delete(toolUseId);
      return;
    }
    let duration = Date.now() - pendingCall.startTime,
      normalized = this.normalizeBridgeResponse(message),
      isError = Boolean(message.is_error) || "error" in normalized;
    if (clearTimeout(pendingCall.timer), this.pendingCalls.delete(toolUseId), isError) {
      let errorContent = normalized.error?.content,
        errorMessage = "Unknown error";
      if (typeof errorContent === "string" && errorContent) errorMessage = errorContent.slice(0, 200);else if (Array.isArray(errorContent)) {
        let textBlock = errorContent.find(block => typeof block === "object" && block !== null && "text" in block);
        if (textBlock?.text) errorMessage = textBlock.text.slice(0, 200);
      }
      if (logger.warn(`[${serverName}] Tool call error: ${pendingCall.toolName} (${toolUseId.slice(0, 8)}) after ${duration}ms`), trackEvent?.("chrome_bridge_tool_call_error", {
        tool_name: pendingCall.toolName,
        tool_use_id: toolUseId,
        duration_ms: duration,
        error_message: errorMessage,
        session_id: pendingCall.sessionId,
        user_message_uuid: pendingCall.userMessageUuid
      }), !this.selectedDeviceId && !this.pairingInProgress) {
        this.discoveryComplete = false, pendingCall.reject(new sSe(`[${serverName}] Extension disconnected during tool call: ${pendingCall.toolName}`));
        return;
      }
    } else logger.debug(`[${serverName}] Tool call completed: ${pendingCall.toolName} (${toolUseId.slice(0, 8)}) in ${duration}ms`), trackEvent?.("chrome_bridge_tool_call_completed", {
      tool_name: pendingCall.toolName,
      tool_use_id: toolUseId,
      duration_ms: duration,
      session_id: pendingCall.sessionId,
      user_message_uuid: pendingCall.userMessageUuid
    });
    pendingCall.resolve(normalized);
  }
  normalizeBridgeResponse(message) {
    if (message.result || message.error) return message;
    if (message.content) {
      if (message.is_error) return {
        error: {
          content: message.content
        }
      };
      return {
        result: {
          content: message.content
        }
      };
    }
    return message;
  }
  getTimeoutDiagnostics() {
    let freeMemPct = -1;
    try {
      let memInfo = process.getSystemMemoryInfo(),
        availableMem = memInfo.free + (memInfo.fileBacked ?? 0);
      freeMemPct = memInfo.total > 0 ? Math.round(availableMem / memInfo.total * 1000) / 10 : -1;
    } catch {}
    let pongAgeMs = this.lastPongReceived > 0 ? Date.now() - this.lastPongReceived : undefined;
    return {
      free_mem_pct: freeMemPct,
      pong_age_ms: pongAgeMs
    };
  }
  createTimeoutTimer(toolUseId, timeoutMs) {
    let {
      logger: logger,
      serverName: serverName,
      trackEvent: trackEvent
    } = this.context;
    return setTimeout(() => {
      let pendingCall = this.pendingCalls.get(toolUseId);
      if (!pendingCall) return;
      if (this.timedOutCalls.set(toolUseId, Date.now()), this.timedOutCalls.size > 200) {
        let oldestKey = this.timedOutCalls.keys().next().value;
        if (oldestKey) this.timedOutCalls.delete(oldestKey);
      }
      this.pendingCalls.delete(toolUseId);
      let duration = Date.now() - pendingCall.startTime,
        diagnostics = this.getTimeoutDiagnostics();
      if (logger.warn(`[${serverName}] Tool call timeout: ${pendingCall.toolName} (${toolUseId.slice(0, 8)}) after ${duration}ms, pending calls: ${this.pendingCalls.size}`), trackEvent?.("chrome_bridge_tool_call_timeout", {
        tool_name: pendingCall.toolName,
        tool_use_id: toolUseId,
        duration_ms: duration,
        timeout_ms: timeoutMs,
        session_id: pendingCall.sessionId,
        user_message_uuid: pendingCall.userMessageUuid,
        routing_ack_received: pendingCall.routingAckReceived ?? false,
        routing_ack_pong_age_ms: pendingCall.routingAckPongAgeMs ?? null,
        permission_paused: pendingCall.permissionPaused ?? false,
        ...diagnostics
      }), this.isConnected()) pendingCall.reject(new mLe(`[${serverName}] Tool call timed out: ${pendingCall.toolName}`));else pendingCall.reject(new WI(`[${serverName}] Tool call timed out with bridge disconnected: ${pendingCall.toolName}`));
    }, timeoutMs);
  }
  scheduleReconnect() {
    let {
      logger: logger,
      serverName: serverName,
      trackEvent: trackEvent
    } = this.context;
    if (this.reconnectTimer) return;
    if (this.reconnectAttempts++, this.reconnectAttempts > 100) {
      logger.warn(`[${serverName}] Giving up bridge reconnection after 100 attempts`), trackEvent?.("chrome_bridge_reconnect_exhausted", {
        total_attempts: 100
      }), this.reconnectAttempts = 0;
      return;
    }
    let delayMs = Math.min(2000 * Math.pow(1.5, this.reconnectAttempts - 1), 30000);
    if (this.reconnectAttempts <= 10 || this.reconnectAttempts % 10 === 0) logger.info(`[${serverName}] Bridge reconnecting in ${Math.round(delayMs)}ms (attempt ${this.reconnectAttempts})`);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null, this.connect();
    }, delayMs);
  }
  startKeepAlive() {
    this.stopKeepAlive(), this.lastPongReceived = Date.now();
    let {
      logger: logger,
      serverName: serverName
    } = this.context;
    this.keepAliveInterval = setInterval(() => {
      if (this.ws?.readyState === c5H.default.OPEN) this.ws.send(JSON.stringify({
        type: "ping"
      }));
      if (this.lastPongReceived > 0 && Date.now() - this.lastPongReceived > PONG_TIMEOUT_MS) logger.warn(`[${serverName}] No pong received in ${PONG_TIMEOUT_MS}ms, closing dead connection`), this.rejectPendingCalls(new WI("Bridge keepalive timeout \u2014 connection dead")), this.closeSocket(), this.scheduleReconnect();
    }, KEEP_ALIVE_INTERVAL_MS);
  }
  stopKeepAlive() {
    if (this.keepAliveInterval) clearInterval(this.keepAliveInterval), this.keepAliveInterval = null;
    this.lastPongReceived = 0;
  }
  closeSocket() {
    if (this.stopKeepAlive(), this.handshakeTimer) clearTimeout(this.handshakeTimer), this.handshakeTimer = null;
    if (this.ws) {
      if (this.ws.removeAllListeners(), this.ws.on("error", () => {}), this.ws.readyState === c5H.default.OPEN) this.ws.close();else this.ws.terminate();
      this.ws = null;
    }
    if (this.connected = false, this.authenticated = false, this.selectedDeviceId) this.previousSelectedDeviceId = this.selectedDeviceId;
    if (this.selectedDeviceId = undefined, this.discoveryComplete = false, this.multiBrowserPendingSelection = false, this.pendingPairingRequestId = undefined, this.pairingInProgress = false, this.abortPairingPrompt(), this.pendingSwitchResolve) this.pendingSwitchResolve(null), this.pendingSwitchResolve = null;
    if (this.pendingDiscovery) clearTimeout(this.pendingDiscovery.timeout), this.pendingDiscovery.resolve([]), this.pendingDiscovery = null;
    if (this.peerConnectedWaiters.length > 0) {
      let waiters = this.peerConnectedWaiters;
      this.peerConnectedWaiters = [];
      for (let waiter of waiters) waiter(false);
    }
  }
  rejectPendingCalls(error) {
    for (let pendingCall of this.pendingCalls.values()) clearTimeout(pendingCall.timer), pendingCall.reject(error);
    this.pendingCalls.clear();
  }
  cleanup() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
    this.rejectPendingCalls(new WI("Bridge client disconnected")), this.closeSocket(), this.reconnectAttempts = 0;
  }
}
function wn_(context) {
  return new An_(context);
}
var c5H,
  KEEP_ALIVE_INTERVAL_MS = 30000,
  PONG_TIMEOUT_MS = 90000,
  HANDSHAKE_TIMEOUT_MS = 30000;
var K_8 = b(() => {
  aGe();
  c5H = L(require("ws"));
});

export {DEFAULT_TOOL_CALL_TIMEOUT_MS,PEER_CONNECT_WAIT_MS as PEER_WAIT_TIMEOUT_MS,LIST_EXTENSIONS_TIMEOUT_MS as DISCOVERY_TIMEOUT_MS,jA_ as WAIT_MAX_DURATION_S,getLocalOsPlatform as localPlatformLabel,sanitizeString as xyt,j51 as hyc,An_ as BridgeClient,wn_ as createBridgeClient,c5H as ipe,KEEP_ALIVE_INTERVAL_MS as Ayc,PONG_TIMEOUT_MS as K3o,HANDSHAKE_TIMEOUT_MS as z3o,K_8 as Csr};
