// @ts-nocheck
import {b} from "../../runtime.ts";
import {sQ,AbortError} from "../../vendor/m721.ts";
import {Xt,Le} from "../config/0228_encoding.ts";
import {WRe,pq} from "../../vendor/m2722.ts";
import {ln,Ul} from "../telemetry/0594_feature_name.ts";
import {Ct,logEvent} from "../../vendor/m131.ts";
import {yKt,Dde} from "../../vendor/m124.ts";
import {qe,logForDebugging} from "../config/0234_setHasFormattedOutput.ts";
import {bt,Se} from "../../vendor/m195.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {vKr} from "../../vendor/m3191.ts";
var zIl, LRo;
/** Module initializer: defines the suppressControlResponse symbol and the Query (LRo) class. */
var YIl = b(() => {
  sQ();
  Xt();
  WRe();
  ln();
  Ct();
  yKt();
  qe();
  bt();
  // Symbol used to suppress sending a control response back to the transport
  zIl = Symbol("suppressControlResponse");

  /**
   * LRo — the Query class that wraps a transport connection to the Claude Code CLI.
   * Manages bidirectional control requests, MCP servers, hook callbacks, and the
   * async-iterable stream of SDK messages.
   */
  LRo = class LRo {
    transport;
    isSingleUserTurn;
    canUseTool;
    hooks;
    abortController;
    jsonSchema;
    initConfig;
    onElicitation;
    getOAuthToken;
    getHostAuthToken;
    onUserDialog;
    /** Pending control responses keyed by request_id */
    pendingControlResponses = new Map();
    cleanupPerformed = !1;
    sdkMessages;
    /** Inbound message queue from the transport */
    inputStream = new pq();
    initialization;
    /** Per-request abort controllers for in-flight control requests */
    cancelControllers = new Map();
    hookCallbacks = new Map();
    nextCallbackId = 0;
    sdkMcpTransports = new Map();
    sdkMcpServerInstances = new Map();
    pendingMcpResponses = new Map();
    firstResultReceivedResolve;
    firstResultReceived = !1;
    lastErrorResultText;
    transcriptMirrorBatcher;
    cleanupCallbacks = [];
    cleanupPromise;
    setIsSingleUserTurn(isSingleUserTurn) {
      this.isSingleUserTurn = isSingleUserTurn;
    }
    setTranscriptMirrorBatcher(batcher) {
      this.transcriptMirrorBatcher = batcher;
    }

    /** Report a mirror error into the input stream */
    reportMirrorError(key, error) {
      let mirrorErrorMsg = {
        type: "system",
        subtype: "mirror_error",
        error: error,
        key: key,
        uuid: Dde.randomUUID(),
        session_id: key.sessionId
      };
      this.inputStream.enqueue(mirrorErrorMsg);
    }
    addCleanupCallback(callback) {
      if (this.cleanupPerformed) callback();else this.cleanupCallbacks.push(callback);
    }
    isClosed() {
      return this.cleanupPerformed;
    }

    /** Returns true if this query needs a bidirectional (full-duplex) transport */
    hasBidirectionalNeeds() {
      return this.sdkMcpTransports.size > 0 || this.hooks !== void 0 && Object.keys(this.hooks).length > 0 || this.canUseTool !== void 0 || this.onElicitation !== void 0 || this.onUserDialog !== void 0 || this.getOAuthToken !== void 0 || this.getHostAuthToken !== void 0;
    }
    constructor(transport, isSingleUserTurn, canUseTool, hooks, abortController, sdkMcpServerMap = new Map(), jsonSchema, initConfig, onElicitation, getOAuthToken, getHostAuthToken, onUserDialog) {
      this.transport = transport;
      this.isSingleUserTurn = isSingleUserTurn;
      this.canUseTool = canUseTool;
      this.hooks = hooks;
      this.abortController = abortController;
      this.jsonSchema = jsonSchema;
      this.initConfig = initConfig;
      this.onElicitation = onElicitation;
      this.getOAuthToken = getOAuthToken;
      this.getHostAuthToken = getHostAuthToken;
      this.onUserDialog = onUserDialog;
      for (let [serverName, serverInstance] of sdkMcpServerMap) this.connectSdkMcpServer(serverName, serverInstance);
      this.sdkMessages = this.readSdkMessages(), this.readMessages(), this.initialization = this.initialize(), this.initialization.catch(() => {});
    }
    setError(error) {
      this.inputStream.error(error);
    }
    async stopTask(taskId) {
      await this.request({
        subtype: "stop_task",
        task_id: taskId
      });
    }
    async backgroundTasks(toolUseId) {
      return (await this.request({
        subtype: "background_tasks",
        tool_use_id: toolUseId
      })).response.backgrounded ?? !0;
    }
    close() {
      this.cleanup();
    }
    cleanup(error) {
      if (this.cleanupPromise) return this.cleanupPromise;
      return this.cleanupPerformed = !0, this.cleanupPromise = this.performCleanup(error), this.cleanupPromise;
    }
    async performCleanup(error) {
      // Run cleanup callbacks
      for (let callback of this.cleanupCallbacks) try {
        callback();
      } catch {}
      if (this.cleanupCallbacks = [], this.transcriptMirrorBatcher) try {
        await this.transcriptMirrorBatcher.flush();
      } catch {}
      try {
        // Abort all in-flight control requests
        for (let cancelController of this.cancelControllers.values()) cancelController.abort();
        this.cancelControllers.clear(), this.transport.close();
        let closeError = error ?? Error("Query closed before response received");
        for (let {
          reject: rejectFn
        } of this.pendingControlResponses.values()) rejectFn(closeError);
        this.pendingControlResponses.clear();
        for (let {
          reject: rejectFn
        } of this.pendingMcpResponses.values()) rejectFn(closeError);
        this.pendingMcpResponses.clear(), this.hookCallbacks.clear();
        for (let mcpTransport of this.sdkMcpTransports.values()) mcpTransport.close().catch(() => {});
        if (this.sdkMcpTransports.clear(), error) this.inputStream.error(error);else this.inputStream.done();
      } catch (cleanupErr) {}
      if (this.transport.waitForExit) {
        let exitAbortController = new AbortController();
        try {
          await Promise.race([this.transport.waitForExit(), sleep(2000, exitAbortController.signal)]);
        } catch {} finally {
          exitAbortController.abort();
        }
      }
    }
    next(...[value]) {
      return this.sdkMessages.next(...[value]);
    }
    async return(value) {
      return await this.cleanup(), this.sdkMessages.return(value);
    }
    async throw(value) {
      return await this.cleanup(), this.sdkMessages.throw(value);
    }
    [Symbol.asyncIterator]() {
      return this.sdkMessages;
    }
    async [Symbol.asyncDispose]() {
      await this.cleanup();
    }

    /** Main loop: read messages from the transport and dispatch them */
    async readMessages() {
      try {
        for await (let msg of this.transport.readMessages()) {
          if (msg.type === "control_response") {
            let pendingEntry = this.pendingControlResponses.get(msg.response.request_id);
            if (pendingEntry) pendingEntry.handler(msg.response);
            continue;
          } else if (msg.type === "control_request") {
            this.handleControlRequest(msg);
            continue;
          } else if (msg.type === "control_cancel_request") {
            this.handleControlCancelRequest(msg);
            continue;
          } else if (msg.type === "keep_alive") continue;else if (msg.type === "transcript_mirror") {
            this.transcriptMirrorBatcher?.enqueue(msg.filePath, msg.entries);
            continue;
          }
          if (msg.type === "system" && (msg.subtype === "post_turn_summary" || msg.subtype === "task_summary")) {
            this.inputStream.enqueue(msg);
            continue;
          }
          if (msg.type === "result") {
            if (this.transcriptMirrorBatcher) await this.transcriptMirrorBatcher.flush();
            if (this.lastErrorResultText = msg.is_error ? msg.subtype === "success" ? msg.result : msg.errors.join("; ") : void 0, this.firstResultReceived = !0, this.firstResultReceivedResolve) this.firstResultReceivedResolve();
            if (this.isSingleUserTurn) logForDebugging("[Query.readMessages] First result received for single-turn query, closing stdin"), this.transport.endInput();
          } else if (!(msg.type === "system" && msg.subtype === "session_state_changed")) this.lastErrorResultText = void 0;
          this.inputStream.enqueue(msg);
        }
        if (this.transcriptMirrorBatcher) await this.transcriptMirrorBatcher.flush();
        if (this.firstResultReceivedResolve) this.firstResultReceivedResolve();
        this.inputStream.done(), this.cleanup();
      } catch (err) {
        if (this.transcriptMirrorBatcher) await this.transcriptMirrorBatcher.flush();
        if (this.firstResultReceivedResolve) this.firstResultReceivedResolve();
        if (this.lastErrorResultText !== void 0 && !(err instanceof AbortError)) {
          let wrappedError = Error(`Claude Code returned an error result: ${this.lastErrorResultText}`);
          logForDebugging(`[Query.readMessages] Replacing exit error with result text. Original: ${Se(err)}`), this.inputStream.error(wrappedError), this.cleanup(wrappedError);
          return;
        }
        this.inputStream.error(err), this.cleanup(err);
      }
    }

    /** Handle an inbound control request from the CLI, dispatching and writing a response */
    async handleControlRequest(controlRequest) {
      // Skip duplicate in-flight requests
      if (this.cancelControllers.has(controlRequest.request_id)) {
        logForDebugging(`[Query.handleControlRequest] Duplicate delivery of in-flight request ${controlRequest.request_id} (${controlRequest.request.subtype}) — skipping`);
        return;
      }
      let cancelController = new AbortController();
      this.cancelControllers.set(controlRequest.request_id, cancelController);
      try {
        let result = await this.processControlRequest(controlRequest, cancelController.signal);
        if (this.cleanupPerformed) return;
        if (result === zIl) return;
        let successResponse = {
          type: "control_response",
          response: {
            subtype: "success",
            request_id: controlRequest.request_id,
            response: result
          }
        };
        await Promise.resolve(this.transport.write(Le(successResponse) + `
`));
      } catch (handlerErr) {
        if (this.cleanupPerformed) return;
        let errorResponse = {
          type: "control_response",
          response: {
            subtype: "error",
            request_id: controlRequest.request_id,
            error: Se(handlerErr)
          }
        };
        try {
          await Promise.resolve(this.transport.write(Le(errorResponse) + `
`));
        } catch (writeErr) {
          logForDebugging(`[Query.handleControlRequest] Error-response write failed: ${Se(writeErr)}`, {
            level: "error"
          });
        }
      } finally {
        this.cancelControllers.delete(controlRequest.request_id);
      }
    }
    handleControlCancelRequest(cancelRequest) {
      let cancelController = this.cancelControllers.get(cancelRequest.request_id);
      if (cancelController) cancelController.abort(), this.cancelControllers.delete(cancelRequest.request_id);
    }

    /** Dispatch a control request to the appropriate handler by subtype */
    async processControlRequest(controlRequest, signal) {
      if (controlRequest.request.subtype === "can_use_tool") {
        if (!this.canUseTool) throw Error("canUseTool callback is not provided.");
        return {
          ...(await this.canUseTool(controlRequest.request.tool_name, controlRequest.request.input, {
            signal: signal,
            suggestions: controlRequest.request.permission_suggestions,
            blockedPath: controlRequest.request.blocked_path,
            decisionReason: controlRequest.request.decision_reason,
            title: controlRequest.request.title,
            displayName: controlRequest.request.display_name,
            description: controlRequest.request.description,
            toolUseID: controlRequest.request.tool_use_id,
            agentID: controlRequest.request.agent_id
          })),
          toolUseID: controlRequest.request.tool_use_id
        };
      } else if (controlRequest.request.subtype === "hook_callback") return await this.handleHookCallbacks(controlRequest.request.callback_id, controlRequest.request.input, controlRequest.request.tool_use_id, signal);else if (controlRequest.request.subtype === "mcp_message") {
        let mcpRequest = controlRequest.request,
          mcpTransport = this.sdkMcpTransports.get(mcpRequest.server_name);
        if (!mcpTransport) throw Error(`SDK MCP server not found: ${mcpRequest.server_name}`);
        if ("method" in mcpRequest.message && "id" in mcpRequest.message && mcpRequest.message.id !== null) return {
          mcp_response: await this.handleMcpControlRequest(mcpRequest.server_name, mcpRequest, mcpTransport)
        };else {
          if (mcpTransport.onmessage) mcpTransport.onmessage(mcpRequest.message);
          return {
            mcp_response: {
              jsonrpc: "2.0",
              result: {},
              id: 0
            }
          };
        }
      } else if (controlRequest.request.subtype === "elicitation") {
        let elicitationReq = controlRequest.request;
        if (this.onElicitation) return await this.onElicitation({
          serverName: elicitationReq.mcp_server_name,
          message: elicitationReq.message,
          mode: elicitationReq.mode,
          url: elicitationReq.url,
          elicitationId: elicitationReq.elicitation_id,
          requestedSchema: elicitationReq.requested_schema,
          title: elicitationReq.title,
          displayName: elicitationReq.display_name,
          description: elicitationReq.description
        }, {
          signal: signal
        });
        return {
          action: "decline"
        };
      } else if (controlRequest.request.subtype === "request_user_dialog") {
        if (this.onUserDialog) return await this.onUserDialog({
          dialogKind: controlRequest.request.dialog_kind,
          payload: controlRequest.request.payload,
          toolUseID: controlRequest.request.tool_use_id
        }, {
          signal: signal
        });
        return logForDebugging(`[Query] No onUserDialog handler for request_user_dialog (kind=${controlRequest.request.dialog_kind}) — staying silent so a capable client (or the worker's park deadline) settles it`), logEvent("tengu_request_user_dialog_response_ignored", {
          shape: fromEnum("auto_cancel")
        }), zIl;
      } else if (controlRequest.request.subtype === "oauth_token_refresh") {
        if (!this.getOAuthToken) throw Error("getOAuthToken callback is not provided.");
        return {
          accessToken: (await this.getOAuthToken({
            signal: signal
          })) ?? null
        };
      } else if (controlRequest.request.subtype === "host_auth_token_refresh") {
        if (!this.getHostAuthToken) throw Error("getHostAuthToken callback is not provided.");
        return {
          authToken: (await this.getHostAuthToken({
            signal: signal
          })) ?? null
        };
      }
      throw Error("Unsupported control request subtype: " + controlRequest.request.subtype);
    }
    async *readSdkMessages() {
      try {
        for await (let msg of this.inputStream) yield msg;
      } finally {
        await this.cleanup();
      }
    }

    /** Send the initialize control request, registering hooks and MCP servers */
    async initialize() {
      let hooksPayload;
      if (this.hooks) {
        hooksPayload = {};
        for (let [hookType, hookEntries] of Object.entries(this.hooks)) if (hookEntries.length > 0) hooksPayload[hookType] = hookEntries.map(hookEntry => {
          let callbackIds = [];
          for (let hookDef of hookEntry.hooks) {
            let callbackId = `hook_${this.nextCallbackId++}`;
            this.hookCallbacks.set(callbackId, hookDef), callbackIds.push(callbackId);
          }
          return {
            matcher: hookEntry.matcher,
            hookCallbackIds: callbackIds,
            timeout: hookEntry.timeout
          };
        });
      }
      let sdkMcpServerNames = this.sdkMcpTransports.size > 0 ? Array.from(this.sdkMcpTransports.keys()) : void 0,
        initRequest = {
          subtype: "initialize",
          hooks: hooksPayload,
          sdkMcpServers: sdkMcpServerNames,
          jsonSchema: this.jsonSchema,
          systemPrompt: typeof this.initConfig?.systemPrompt === "string" ? [this.initConfig.systemPrompt] : this.initConfig?.systemPrompt,
          appendSystemPrompt: this.initConfig?.appendSystemPrompt,
          planModeInstructions: this.initConfig?.planModeInstructions,
          appendSubagentSystemPrompt: this.initConfig?.appendSubagentSystemPrompt,
          toolAliases: this.initConfig?.toolAliases,
          excludeDynamicSections: this.initConfig?.excludeDynamicSections,
          agents: this.initConfig?.agents,
          title: this.initConfig?.title,
          skills: Array.isArray(this.initConfig?.skills) ? this.initConfig.skills : void 0,
          webSearchIsolationExemptMcpServers: this.initConfig?.webSearchIsolationExemptMcpServers,
          promptSuggestions: this.initConfig?.promptSuggestions,
          agentProgressSummaries: this.initConfig?.agentProgressSummaries,
          forwardSubagentText: this.initConfig?.forwardSubagentText,
          supportedDialogKinds: this.initConfig?.supportedDialogKinds
        };
      return (await this.request(initRequest)).response;
    }
    async interrupt() {
      return Ul("sdk_interrupt", async () => {
        await this.request({
          subtype: "interrupt"
        });
      });
    }
    async setPermissionMode(mode) {
      await this.request({
        subtype: "set_permission_mode",
        mode: mode
      });
    }
    async setModel(model) {
      await this.request({
        subtype: "set_model",
        model: model
      });
    }
    async setMaxThinkingTokens(maxThinkingTokens, thinkingDisplay) {
      await this.request({
        subtype: "set_max_thinking_tokens",
        max_thinking_tokens: maxThinkingTokens,
        thinking_display: thinkingDisplay
      });
    }
    async applyFlagSettings(settings) {
      return Ul("sdk_apply_flag_settings", async () => {
        await this.request({
          subtype: "apply_flag_settings",
          settings: settings
        });
      });
    }
    async getSettings() {
      return (await this.request({
        subtype: "get_settings"
      })).response;
    }
    async rewindFiles(userMessageId, options) {
      return Ul("sdk_rewind_files", async () => (await this.request({
        subtype: "rewind_files",
        user_message_id: userMessageId,
        dry_run: options?.dryRun
      })).response);
    }
    async cancelAsyncMessage(messageUuid) {
      return (await this.request({
        subtype: "cancel_async_message",
        message_uuid: messageUuid
      })).response.cancelled;
    }
    async seedReadState(path, mtime) {
      await this.request({
        subtype: "seed_read_state",
        path: path,
        mtime: mtime
      });
    }
    async enableRemoteControl(enabled, name) {
      return (await this.request({
        subtype: "remote_control",
        enabled: enabled,
        ...(name !== void 0 && {
          name: name
        })
      })).response;
    }
    async submitFeedback(description, options) {
      return (await this.request({
        subtype: "submit_feedback",
        description: description,
        surface: options?.surface
      })).response;
    }
    async generateSessionTitle(description, options) {
      return Ul("sdk_session_title_generate", async () => (await this.request({
        subtype: "generate_session_title",
        description: description,
        persist: options?.persist
      })).response.title);
    }
    async askSideQuestion(question) {
      return Ul("sdk_side_question", async () => {
        let sideQuestionResult = (await this.request({
          subtype: "side_question",
          question: question
        })).response;
        return sideQuestionResult.response === null ? null : {
          response: sideQuestionResult.response,
          synthetic: sideQuestionResult.synthetic ?? !1
        };
      });
    }
    async launchUltrareview(args, options) {
      return (await this.request({
        subtype: "ultrareview_launch",
        args: args,
        confirm: options?.confirm ?? !1
      })).response;
    }
    async messageRated(ratingInfo) {
      await this.request({
        subtype: "message_rated",
        messageUuid: ratingInfo.messageUuid,
        sentiment: ratingInfo.sentiment,
        surface: ratingInfo.surface,
        cleared: ratingInfo.cleared ?? !1
      });
    }
    processPendingPermissionRequests(pendingRequests) {
      for (let pendingReq of pendingRequests) if (pendingReq.request.subtype === "can_use_tool") this.handleControlRequest(pendingReq).catch(() => {});
    }
    processPendingUserDialogRequests(pendingRequests) {
      for (let pendingReq of pendingRequests) if (pendingReq.request.subtype === "request_user_dialog") this.handleControlRequest(pendingReq).catch(() => {});
    }

    /** Send a control request and return a promise that resolves with the response */
    request(requestBody) {
      let requestId = Math.random().toString(36).substring(2, 15),
        controlRequestMsg = {
          request_id: requestId,
          type: "control_request",
          request: requestBody
        },
        isInitialize = requestBody.subtype === "initialize";
      return new Promise((resolve, reject) => {
        this.pendingControlResponses.set(requestId, {
          handler: response => {
            if (this.pendingControlResponses.delete(requestId), response.subtype === "success") resolve(response);else reject(Error(response.error));
            if (!isInitialize && (response.pending_permission_requests || response.pending_user_dialog_requests)) logForDebugging(`[Query] Ignoring prompt-redelivery fields on non-initialize response (subtype=${requestBody.subtype})`);else {
              if (response.pending_permission_requests) this.processPendingPermissionRequests(response.pending_permission_requests);
              if (response.pending_user_dialog_requests) this.processPendingUserDialogRequests(response.pending_user_dialog_requests);
            }
          },
          reject: reject
        }), Promise.resolve(this.transport.write(Le(controlRequestMsg) + `
`)).catch(writeErr => {
          this.pendingControlResponses.delete(requestId), reject(writeErr);
        });
      });
    }
    initializationResult() {
      return this.initialization;
    }
    async supportedCommands() {
      return (await this.initialization).commands;
    }
    async supportedModels() {
      return (await this.initialization).models;
    }
    async supportedAgents() {
      return (await this.initialization).agents;
    }
    async reconnectMcpServer(serverName) {
      await this.request({
        subtype: "mcp_reconnect",
        serverName: serverName
      });
    }
    async toggleMcpServer(serverName, enabled) {
      return Ul("sdk_mcp_toggle_server", async () => {
        await this.request({
          subtype: "mcp_toggle",
          serverName: serverName,
          enabled: enabled
        });
      });
    }
    async enableChannel(serverName) {
      return Ul("sdk_mcp_enable_channel", async () => {
        await this.request({
          subtype: "channel_enable",
          serverName: serverName
        });
      });
    }
    async mcpAuthenticate(serverName, redirectUri) {
      return (await this.request({
        subtype: "mcp_authenticate",
        serverName: serverName,
        redirectUri: redirectUri
      })).response;
    }
    async mcpClearAuth(serverName) {
      return (await this.request({
        subtype: "mcp_clear_auth",
        serverName: serverName
      })).response;
    }
    async mcpSubmitOAuthCallbackUrl(serverName, callbackUrl) {
      return (await this.request({
        subtype: "mcp_oauth_callback_url",
        serverName: serverName,
        callbackUrl: callbackUrl
      })).response;
    }
    async claudeAuthenticate(loginWithClaudeAi) {
      return (await this.request({
        subtype: "claude_authenticate",
        loginWithClaudeAi: loginWithClaudeAi
      })).response;
    }
    async claudeOAuthCallback(authorizationCode, state) {
      return (await this.request({
        subtype: "claude_oauth_callback",
        authorizationCode: authorizationCode,
        state: state
      })).response;
    }
    async claudeOAuthWaitForCompletion() {
      return (await this.request({
        subtype: "claude_oauth_wait_for_completion"
      })).response;
    }
    async mcpServerStatus() {
      return (await this.request({
        subtype: "mcp_status"
      })).response.mcpServers;
    }
    async getContextUsage() {
      return (await this.request({
        subtype: "get_context_usage"
      })).response;
    }
    async usage_EXPERIMENTAL_MAY_CHANGE_DO_NOT_RELY_ON_THIS_API_YET() {
      return (await this.request({
        subtype: "get_usage"
      })).response;
    }
    async readFile(path, options) {
      try {
        return (await this.request({
          subtype: "read_file",
          path: path,
          max_bytes: options?.maxBytes,
          encoding: options?.encoding
        })).response;
      } catch {
        return null;
      }
    }
    async reloadPlugins() {
      return Ul("sdk_reload_plugins", async () => (await this.request({
        subtype: "reload_plugins"
      })).response);
    }
    async reloadSkills() {
      return Ul("sdk_reload_skills", async () => (await this.request({
        subtype: "reload_skills"
      })).response);
    }
    async setMcpServers(serversMap) {
      return Ul("sdk_mcp_set_servers", async () => {
        let sdkServers = {},
          nonSdkServers = {};
        for (let [serverName, serverConfig] of Object.entries(serversMap)) if (serverConfig.type === "sdk" && "instance" in serverConfig) sdkServers[serverName] = serverConfig.instance;else nonSdkServers[serverName] = serverConfig;
        let existingServerNames = new Set(this.sdkMcpServerInstances.keys()),
          newServerNames = new Set(Object.keys(sdkServers));
        for (let serverName of existingServerNames) if (!newServerNames.has(serverName)) await this.disconnectSdkMcpServer(serverName);
        for (let [serverName, serverInstance] of Object.entries(sdkServers)) if (!existingServerNames.has(serverName)) this.connectSdkMcpServer(serverName, serverInstance);
        let sdkServerStubs = {};
        for (let serverName of Object.keys(sdkServers)) sdkServerStubs[serverName] = {
          type: "sdk",
          name: serverName
        };
        return (await this.request({
          subtype: "mcp_set_servers",
          servers: {
            ...nonSdkServers,
            ...sdkServerStubs
          }
        })).response;
      });
    }
    async accountInfo() {
      return (await this.initialization).account;
    }

    /** Stream input messages to the transport, then signal end of input */
    async streamInput(inputIterable) {
      logForDebugging("[Query.streamInput] Starting to process input stream");
      try {
        let msgCount = 0;
        for await (let msg of inputIterable) {
          if (msgCount++, logForDebugging(`[Query.streamInput] Processing message ${msgCount}: ${msg.type}`), this.abortController?.signal.aborted) break;
          await Promise.resolve(this.transport.write(Le(msg) + `
`));
        }
        if (logForDebugging(`[Query.streamInput] Finished processing ${msgCount} messages from input stream`), msgCount > 0 && this.hasBidirectionalNeeds()) logForDebugging("[Query.streamInput] Has bidirectional needs, waiting for first result"), await this.waitForFirstResult();
        logForDebugging("[Query] Calling transport.endInput() to close stdin to CLI process"), this.transport.endInput();
      } catch (err) {
        if (!(err instanceof AbortError)) throw err;
      }
    }
    waitForFirstResult() {
      if (this.firstResultReceived) return logForDebugging("[Query.waitForFirstResult] Result already received, returning immediately"), Promise.resolve();
      return new Promise(resolve => {
        if (this.abortController?.signal.aborted) {
          resolve();
          return;
        }
        this.abortController?.signal.addEventListener("abort", () => resolve(), {
          once: !0
        }), this.firstResultReceivedResolve = resolve;
      });
    }
    handleHookCallbacks(callbackId, input, toolUseId, signal) {
      let hookCallback = this.hookCallbacks.get(callbackId);
      if (!hookCallback) throw Error(`No hook callback found for ID: ${callbackId}`);
      return hookCallback(input, toolUseId, {
        signal: signal
      });
    }

    /** Connect an SDK MCP server instance via an in-process transport */
    connectSdkMcpServer(serverName, serverInstance) {
      let mcpTransport = new vKr(msg => this.sendMcpServerMessageToCli(serverName, msg));
      this.sdkMcpTransports.set(serverName, mcpTransport), this.sdkMcpServerInstances.set(serverName, serverInstance), serverInstance.connect(mcpTransport).catch(connectErr => {
        if (this.sdkMcpTransports.get(serverName) === mcpTransport) this.sdkMcpTransports.delete(serverName);
        if (this.sdkMcpServerInstances.get(serverName) === serverInstance) this.sdkMcpServerInstances.delete(serverName);
        logForDebugging(`[Query.connectSdkMcpServer] Failed to connect MCP server '${serverName}': ${connectErr}`, {
          level: "error"
        });
      });
    }
    async disconnectSdkMcpServer(serverName) {
      let mcpTransport = this.sdkMcpTransports.get(serverName);
      if (mcpTransport) await mcpTransport.close(), this.sdkMcpTransports.delete(serverName);
      this.sdkMcpServerInstances.delete(serverName);
    }

    /** Forward an MCP message from an SDK server to the CLI, tracking pending responses */
    sendMcpServerMessageToCli(serverName, message) {
      if ("id" in message && message.id !== null && message.id !== void 0) {
        let pendingKey = `${serverName}:${message.id}`,
          pendingEntry = this.pendingMcpResponses.get(pendingKey);
        if (pendingEntry) {
          pendingEntry.resolve(message), this.pendingMcpResponses.delete(pendingKey);
          return;
        }
      }
      let controlRequest = {
        type: "control_request",
        request_id: Dde.randomUUID(),
        request: {
          subtype: "mcp_message",
          server_name: serverName,
          message: message
        }
      };
      Promise.resolve(this.transport.write(Le(controlRequest) + `
`)).catch(writeErr => {
        logForDebugging(`[Query.sendMcpServerMessageToCli] Transport write failed: ${writeErr}`, {
          level: "error"
        });
      });
    }

    /** Wait for a response to an MCP request that requires an ID-matched reply */
    handleMcpControlRequest(serverName, mcpRequest, mcpTransport) {
      let messageId = "id" in mcpRequest.message ? mcpRequest.message.id : null,
        pendingKey = `${serverName}:${messageId}`;
      return new Promise((resolve, reject) => {
        let cleanup = () => {
            this.pendingMcpResponses.delete(pendingKey);
          },
          resolveFn = response => {
            cleanup(), resolve(response);
          },
          rejectFn = err => {
            cleanup(), reject(err);
          };
        if (this.pendingMcpResponses.set(pendingKey, {
          resolve: resolveFn,
          reject: rejectFn
        }), mcpTransport.onmessage) mcpTransport.onmessage(mcpRequest.message);else {
          cleanup(), reject(Error("No message handler registered"));
          return;
        }
      });
    }
  };
});
export {zIl,LRo,YIl};
