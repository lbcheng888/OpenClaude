// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {OP,YL} from "../../vendor/m123.ts";
import {Vnt,$he,qhe,zOt,slowOpTracer as pw} from "./2606_skill_name.ts";
import {builtInCommandNames as kY,attributionSkillName as Hxe,findCommand as hb,isSkillOff as Pte,getCommand as Q6e,shippedCommandNames as f4t,Mm} from "../tools/5174_toSlashCommands.ts";
import {CD,ts,oh} from "../../vendor/m2600.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {a6e,y3t} from "../artifact/3966_kind.ts";
import {prepareForkedCommandContext as p4t,extractResultText as m4t,ID} from "../artifact/4427_withDisallowedCommandTools.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Axe,s4t} from "../tools/4091_type.ts";
import {Q$,fye} from "../permissions/4104_clients.ts";
import {ST,Mn,EG,Dte,wc,Mw,NE,qmo,HY,Ixe,po} from "../tools/5224_userPromptCount.ts";
import {fHn,g1} from "../core/2741_input_tokens.ts";
import {getCommandName as mu,isCommandEnabled as YD,Rxe,Q3n,z6e} from "../tools/4092_done.ts";
import {setPromptId as $Ke,getSessionId as It,addInvokedSkill as OSt,lt} from "../session/0132_sent.ts";
import {$0,M2,Cp} from "../config/2223_level.ts";
import {Kh,Mr,xl} from "../../vendor/m4427.ts";
import {bu,KOt,oS} from "../config/2605_event_name.ts";
import {wxe,n4n,s5a,t4n,Umo,c4t,r4n} from "../../vendor/m4099.ts";
import {xe,He,ons,mn} from "./0600_feature_name.ts";
import {mcpTools as eH,kee} from "./3165_kee.ts";
import {U9n,Sye,fdt} from "../../vendor/m3990.ts";
import {N9n,uxe} from "../config/3990_maxFiles.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {ixe,T3t} from "../config/3968_maxEditDistance.ts";
import {If,cT,vu} from "../mcp/2200_mcpServerName.ts";
import {f9n,u6e} from "../../vendor/m3968.ts";
import {t$,eW} from "../../vendor/m2601.ts";
import {f5a,h5a} from "../../vendor/m4101.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {FR} from "../../vendor/m2215.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Iye,dee} from "../permissions/4431_prompt.ts";
import {allTools as R_,$c,uK,Ct} from "../../vendor/m197.ts";
import {hasPermissionsToUseTool as lx,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {xv,n2,Ud} from "../../vendor/m615.ts";
import {executeUserPromptExpansionHooks as a4t,Nmo} from "../../vendor/m4092.ts";
import {createAttachmentMessage as ti,getAttachmentMessages as X6e,GA} from "../agent/4451_tryGetPDFReference.ts";
import {yw,jz} from "../config/2716_jz.ts";
import {parseToolListFromCLI as j1,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {JS,Jfe,ez} from "../../vendor/m2239.ts";
import {n5a,r5a} from "../../vendor/m4098.ts";
// @ts-nocheck
var d4t = {};
ft(d4t, {
  runUserPromptExpansionHook: () => runUserPromptExpansionHook,
  processSlashCommand: () => processSlashCommand,
  processPromptSlashCommand: () => processPromptSlashCommand,
  looksLikeCommand: () => looksLikeCommand,
  formatSkillLoadingMetadata: () => formatSkillLoadingMetadata
});
async function runForkedSlashCommand(command, args, toolUseContext, precedingInputBlocks, setStreamingUI, canUseTool, hookMessages = []) {
  let agentId = OP(),
    {
      sanitizedName: sanitizedName,
      skillNameHash: skillNameHash
    } = Vnt({
      rawName: command.name,
      canonicalName: command.name,
      isMcp: command.loadedFrom === "mcp",
      isBuiltIn: kY().has(command.name),
      isBundled: command.source === "bundled",
      isOfficial: command.source === "plugin" && !!command.pluginInfo?.repository && CD(ts(command.pluginInfo.repository).marketplace)
    });
  W("tengu_slash_command_forked", {
    command_name: sanitizedName,
    ...skillNameHash,
    _PROTO_skill_name: command.name,
    invocation_trigger: Ve("user-slash"),
    ...$he(command.source, command.loadedFrom, command.kind, command.createdBy),
    ...a6e(command.source, command.name),
    ...(command.pluginInfo && qhe(command.pluginInfo))
  });
  let {
      skillContent: skillContent,
      modifiedGetAppState: modifiedGetAppState,
      contextLayers: contextLayers,
      baseAgent: baseAgent,
      promptMessages: promptMessages
    } = await p4t(command, args, toolUseContext),
    permissionLayers = contextLayers.length > 0 ? [...(toolUseContext.permissionLayers ?? []), ...contextLayers] : toolUseContext.permissionLayers;
  promptMessages.push(...hookMessages);
  let effort = command.getEffort?.(args) ?? command.effort,
    agentDefinition = effort !== undefined ? {
      ...baseAgent,
      effort: effort
    } : baseAgent;
  A(`Executing forked slash command /${command.name} with agent ${agentDefinition.agentType}`);
  let collectedMessages = [],
    progressEvents = [],
    parentToolUseId = `forked-command-${command.name}`,
    progressCounter = 0,
    makeProgressEvent = message => (progressCounter++, {
      type: "progress",
      data: {
        message: message,
        type: "agent_progress",
        prompt: skillContent,
        agentId: agentId,
        agentType: agentDefinition.agentType,
        description: command.description
      },
      parentToolUseID: parentToolUseId,
      toolUseID: `${parentToolUseId}-${progressCounter}`,
      timestamp: new Date().toISOString(),
      uuid: Zdt.randomUUID()
    }),
    renderProgress = () => {
      setStreamingUI({
        jsx: Axe(progressEvents, {
          tools: toolUseContext.options.tools,
          verbose: false
        }),
        shouldHidePromptInput: false,
        shouldContinueAnimation: true,
        showSpinner: true
      }), toolUseContext.emitToolProgress?.({
        kind: "agent_progress",
        toolUseId: parentToolUseId,
        progressMessages: [...progressEvents]
      });
    };
  renderProgress();
  try {
    for await (let event of Q$({
      agentDefinition: agentDefinition,
      promptMessages: promptMessages,
      toolUseContext: {
        ...toolUseContext,
        getAppState: modifiedGetAppState,
        permissionLayers: permissionLayers
      },
      canUseTool: canUseTool,
      isAsync: false,
      querySource: "agent:custom",
      spawnedBySkill: Hxe(command),
      model: command.model,
      availableTools: toolUseContext.options.tools
    })) {
      if (event.type === "api_metrics" || event.type === "set_in_progress_tool_use_ids" || event.type === "spinner_mode") continue;
      collectedMessages.push(event);
      let normalized = ST([event]);
      if (event.type === "assistant") {
        let responseLength = fHn(event);
        if (responseLength > 0) toolUseContext.onQueryEvent?.({
          type: "response_length",
          op: "add",
          delta: responseLength
        });
        let first = normalized[0];
        if (first && first.type === "assistant") progressEvents.push(makeProgressEvent(event)), renderProgress();
      }
      if (event.type === "user") {
        let first = normalized[0];
        if (first && first.type === "user") progressEvents.push(makeProgressEvent(first)), renderProgress();
      }
    }
  } finally {
    setStreamingUI(null), toolUseContext.emitToolProgress?.({
      kind: "clear",
      toolUseId: parentToolUseId
    });
  }
  let resultText = m4t(collectedMessages, "Command completed");
  return A(`Forked slash command /${command.name} completed with agent ${agentId}`), {
    messages: [Mn({
      content: EG({
        inputString: `/${mu(command)} ${args}`.trim(),
        precedingInputBlocks: precedingInputBlocks
      })
    }), Mn({
      content: `<local-command-stdout>
${resultText}
</local-command-stdout>`
    })],
    shouldQuery: false,
    command: command,
    resultText: resultText
  };
}
function looksLikeCommand(input) {
  return !/[^a-zA-Z0-9:\-_]/.test(input);
}
async function processSlashCommand(input, precedingInputBlocks, setStreamingUI, extraMessages, toolUseContext, abortController, setToolJSX, setInProgressToolUseIDs, getBinaryFeedbackResponse, promptSource) {
  function asPlainPrompt() {
    let promptId = Zdt.randomUUID();
    $Ke(promptId);
    let effortLevel = $0(toolUseContext.options.mainLoopModel, Kh(toolUseContext));
    return W("tengu_input_prompt", {
      ...(promptSource && {
        prompt_source: Le(promptSource)
      }),
      ...(effortLevel && {
        effort_level: Le(effortLevel)
      })
    }), bu("user_prompt", {
      prompt_length: String(input.length),
      prompt: KOt(input),
      "prompt.id": promptId
    }), {
      messages: [Mn({
        content: EG({
          inputString: input,
          precedingInputBlocks: precedingInputBlocks
        }),
        uuid: setToolJSX,
        promptSource: promptSource
      }), ...extraMessages],
      shouldQuery: true
    };
  }
  let parsed = wxe(input);
  if (!parsed) {
    if (W("tengu_input_slash_missing", {}), toolUseContext.options.isNonInteractiveSession) return asPlainPrompt();
    xe("cmd_dispatch", "cmd_parse_failed");
    let helpText = "Commands are in the form `/command [args]`";
    return {
      messages: [Dte(), ...extraMessages, Mn({
        content: EG({
          inputString: helpText,
          precedingInputBlocks: precedingInputBlocks
        })
      })],
      shouldQuery: false,
      resultText: helpText
    };
  }
  let {
      commandName: commandName,
      args: args
    } = parsed,
    {
      isMcp: isMcp
    } = parsed,
    isMcpTemplateUnmatched = false;
  if (eH()) {
    let mcpTemplate = U9n(commandName, toolUseContext.options.commands);
    if (mcpTemplate) commandName = mcpTemplate.commandName, args = mcpTemplate.args;else if (commandName.includes("://")) isMcpTemplateUnmatched = true;
  }
  let command = hb(commandName, toolUseContext.options.commands);
  if (!command && !isMcp && args.trim()) {
    let trimmedArgs = args.trimStart(),
      spaceIndex = trimmedArgs.search(/\s/),
      subName = spaceIndex === -1 ? trimmedArgs : trimmedArgs.slice(0, spaceIndex),
      namespacedName = `${commandName}:${subName}`,
      namespacedCommand = hb(namespacedName, toolUseContext.options.commands);
    if (namespacedCommand) command = namespacedCommand, commandName = namespacedName, args = spaceIndex === -1 ? "" : trimmedArgs.slice(spaceIndex + 1).trimStart();
  }
  let warningMessage;
  if (command && !Pte(command)) {
    let redirect = n4n(command, args);
    if (redirect) {
      let redirectTarget = hb(redirect.targetName, toolUseContext.options.commands);
      if (redirectTarget && YD(redirectTarget)) command = redirectTarget, commandName = redirect.targetName, args = redirect.remainingArgs;else if (command.name === Sye) {
        let reviewWarning = N9n();
        if (reviewWarning) warningMessage = wc(`${reviewWarning} Running a local review instead.`, "warning");
      }
    }
  }
  let isBuiltIn = kY().has(commandName),
    isBundled = command?.type === "prompt" && command.source === "bundled",
    isOfficial = command?.type === "prompt" && command.source === "plugin" && !!command.pluginInfo?.repository && CD(ts(command.pluginInfo.repository).marketplace),
    isMcpCommand = isMcp || command?.type === "prompt" && command.source === "mcp";
  if (!command) {
    let isPath = false;
    try {
      await Wt().stat(`/${commandName}`), isPath = true;
    } catch {}
    if ((looksLikeCommand(commandName) || isMcpTemplateUnmatched) && !isPath) {
      if (toolUseContext.options.isNonInteractiveSession && kY().has(commandName)) {
        let unavailableText = `/${commandName} isn't available in this environment.`;
        return W("tengu_input_slash_invalid", {
          input_length: commandName.length,
          had_suggestion: false
        }), xe("cmd_dispatch", "cmd_unavailable_headless"), {
          messages: [Mw(`/${commandName}${args ? ` ${args}` : ""}`), Mw(`<local-command-stdout>${unavailableText}</local-command-stdout>`)],
          shouldQuery: false,
          resultText: unavailableText
        };
      }
      let suggestion = ixe(commandName, toolUseContext.options.commands.filter(entry => !entry.isHidden && !Pte(entry)).map(entry => ({
        name: mu(entry),
        aliases: entry.aliases
      })), {
        maxEditDistance: 2
      });
      W("tengu_input_slash_invalid", {
        input_length: commandName.length,
        is_mcp_template_unmatched: isMcpTemplateUnmatched,
        had_suggestion: Boolean(suggestion),
        suggestion_distance: suggestion ? T3t(commandName, suggestion) : undefined
      }), xe("cmd_dispatch", "cmd_unknown");
      let unknownText = suggestion ? `Unknown command: /${commandName}. Did you mean /${suggestion}?` : `Unknown command: /${commandName}`;
      if (toolUseContext.options.isNonInteractiveSession) return {
        messages: [...extraMessages, Mw(`/${commandName}${args ? ` ${args}` : ""}`), Mw(`<local-command-stdout>${unknownText}</local-command-stdout>`)],
        shouldQuery: false,
        resultText: unknownText
      };
      return {
        messages: [...extraMessages, wc(unknownText, "warning"), ...(args ? [wc(`Args from unknown skill: ${args}`, "warning")] : [])],
        shouldQuery: false,
        resultText: unknownText
      };
    }
    return asPlainPrompt();
  }
  let commandSource = isMcpCommand || command.loadedFrom === "mcp" ? "mcp" : isBuiltIn || command.type === "prompt" && (command.source === "bundled" || command.source === "builtin") ? "builtin" : "custom",
    redactedInput = command.isSensitive && args.trim() ? `/${commandName} ***` : input;
  if (!(toolUseContext.deferSlashToEngine?.(command) ?? false)) {
    let promptId = Zdt.randomUUID();
    $Ke(promptId), bu("user_prompt", {
      prompt_length: String(redactedInput.length),
      prompt: KOt(redactedInput),
      "prompt.id": promptId,
      command_name: commandSource === "builtin" || If() ? commandName : commandSource,
      command_source: commandSource
    });
  }
  let {
      messages: messages,
      shouldQuery: shouldQuery,
      allowedTools: allowedTools,
      disallowedTools: disallowedTools,
      model: model,
      effort: effort,
      command: resolvedCommand,
      resultText: resultText,
      nextInput: nextInput,
      submitNextInput: submitNextInput,
      engineDeferredSlash: engineDeferredSlash
    } = await runResolvedSlashCommand(commandName, args, abortController, toolUseContext, precedingInputBlocks, setStreamingUI, setInProgressToolUseIDs, getBinaryFeedbackResponse, setToolJSX),
    {
      sanitizedName: sanitizedName,
      skillNameHash: skillNameHash
    } = Vnt({
      rawName: commandName,
      canonicalName: resolvedCommand.name,
      isMcp: isMcpCommand || resolvedCommand.loadedFrom === "mcp",
      isBuiltIn: isBuiltIn,
      isBundled: isBundled,
      isOfficial: isOfficial
    });
  if (messages.length === 0) {
    let eventProps = {
      input: sanitizedName,
      ...skillNameHash
    };
    if (resolvedCommand.type === "prompt" && resolvedCommand.pluginInfo) {
      let {
          pluginManifest: pluginManifest,
          repository: repository
        } = resolvedCommand.pluginInfo,
        {
          marketplace: marketplace
        } = ts(repository),
        isFirstParty = CD(marketplace);
      if (eventProps.plugin_repository = isFirstParty ? repository : "third-party", eventProps.plugin_name = isFirstParty ? pluginManifest.name : "third-party", isFirstParty && pluginManifest.version) eventProps.plugin_version = cT(pluginManifest.version);
      Object.assign(eventProps, qhe(resolvedCommand.pluginInfo));
    }
    return W("tengu_input_command", {
      ...eventProps,
      invocation_trigger: Ve("user-slash"),
      ...$he(resolvedCommand.type === "prompt" ? resolvedCommand.source : undefined, resolvedCommand.loadedFrom, resolvedCommand.kind, resolvedCommand.type === "prompt" ? resolvedCommand.createdBy : undefined),
      ...a6e(resolvedCommand.type === "prompt" ? resolvedCommand.source : undefined, commandName),
      ...(resolvedCommand.type === "prompt" && {
        command_content_chars: resolvedCommand.contentLength
      }),
      ...(resolvedCommand.type === "prompt" && {
        _PROTO_skill_name: resolvedCommand.name
      }),
      ...false
    }), {
      messages: [],
      shouldQuery: false,
      model: model,
      nextInput: nextInput,
      submitNextInput: submitNextInput
    };
  }
  if (messages.length === 2 && messages[1].type === "user" && typeof messages[1].message.content === "string" && messages[1].message.content.startsWith("Unknown command:")) {
    if (!(input.startsWith("/var") || input.startsWith("/tmp") || input.startsWith("/private"))) W("tengu_input_slash_invalid", {
      input_length: commandName.length,
      had_suggestion: false
    }), xe("cmd_dispatch", "cmd_unknown");
    return {
      messages: [Dte(), ...messages],
      shouldQuery: shouldQuery,
      allowedTools: allowedTools,
      disallowedTools: disallowedTools,
      model: model
    };
  }
  if (!engineDeferredSlash) He("cmd_dispatch");
  let commandEventProps = {
    input: sanitizedName,
    ...skillNameHash
  };
  if (resolvedCommand.type === "prompt" && resolvedCommand.pluginInfo) {
    let {
        pluginManifest: pluginManifest,
        repository: repository
      } = resolvedCommand.pluginInfo,
      {
        marketplace: marketplace
      } = ts(repository),
      isFirstParty = CD(marketplace);
    if (commandEventProps.plugin_repository = isFirstParty ? repository : "third-party", commandEventProps.plugin_name = isFirstParty ? pluginManifest.name : "third-party", isFirstParty && pluginManifest.version) commandEventProps.plugin_version = cT(pluginManifest.version);
    Object.assign(commandEventProps, qhe(resolvedCommand.pluginInfo));
  }
  if (!engineDeferredSlash) W("tengu_input_command", {
    ...commandEventProps,
    invocation_trigger: Ve("user-slash"),
    ...$he(resolvedCommand.type === "prompt" ? resolvedCommand.source : undefined, resolvedCommand.loadedFrom, resolvedCommand.kind, resolvedCommand.type === "prompt" ? resolvedCommand.createdBy : undefined),
    ...a6e(resolvedCommand.type === "prompt" ? resolvedCommand.source : undefined, commandName),
    ...(resolvedCommand.type === "prompt" && {
      command_content_chars: resolvedCommand.contentLength
    }),
    ...(resolvedCommand.type === "prompt" && {
      _PROTO_skill_name: resolvedCommand.name
    }),
    ...false
  });
  let firstIsToolUseMessage = messages.length > 0 && messages[0] && NE(messages[0]),
    finalMessages = shouldQuery || messages.every(message => qmo(message) || message.type === "system" && message.subtype === "informational" || message.type === "user" && message.isMeta) || firstIsToolUseMessage || engineDeferredSlash ? messages : [Dte(), ...messages];
  return {
    messages: warningMessage && shouldQuery ? [...finalMessages, warningMessage] : finalMessages,
    shouldQuery: shouldQuery,
    allowedTools: allowedTools,
    disallowedTools: disallowedTools,
    model: model,
    effort: effort,
    resultText: resultText,
    nextInput: nextInput,
    submitNextInput: submitNextInput,
    engineDeferredSlash: engineDeferredSlash
  };
}
async function runResolvedSlashCommand(commandName, args, setStreamingUI, toolUseContext, precedingInputBlocks, extraMessages, setToolJSX, canUseTool, getBinaryFeedbackResponse) {
  let command = Q6e(commandName, toolUseContext.options.commands),
    dispatchKey = ons(f4t().has(commandName) ? commandName : "custom");
  if (Pte(command)) {
    if (xe(dispatchKey, "cmd_skill_override_off"), toolUseContext.options.isNonInteractiveSession) {
      let headlessText = `Skill "${command.name}" is disabled via skillOverrides. Remove the override from your settings to run it.`;
      return {
        messages: [Mw(J6e(command, args)), Mw(`<local-command-stdout>${headlessText}</local-command-stdout>`)],
        shouldQuery: false,
        command: command,
        resultText: headlessText
      };
    }
    let disabledText = `Skill "${command.name}" is disabled via skillOverrides. Re-enable it in /skills or remove the override from your settings to run it.`;
    return {
      messages: [wc(disabledText, "warning"), ...(args ? [wc(`Args from disabled skill: ${args}`, "warning")] : [])],
      shouldQuery: false,
      command: command,
      resultText: disabledText
    };
  }
  if (command.type === "prompt" && command.userInvocable !== false) f9n(command.name);
  if (command.type === "prompt" && command.pluginInfo) t$(command.pluginInfo.repository);
  if (!toolUseContext.deferSlashToEngine?.(command)) f5a({
    commandName: command.name,
    agentId: toolUseContext.agentId,
    isNonInteractiveSession: Boolean(toolUseContext.options.isNonInteractiveSession),
    setAppState: toolUseContext.setAppState
  });
  if (command.userInvocable === false) return xe(dispatchKey, "cmd_not_user_invocable"), {
    messages: [Mn({
      content: EG({
        inputString: `/${commandName}`,
        precedingInputBlocks: precedingInputBlocks
      })
    }), Mn({
      content: `This skill can only be invoked by Claude, not directly by users. Ask Claude to use the "${commandName}" skill for you.`
    })],
    shouldQuery: false,
    command: command
  };
  if (command.type === "local-jsx" && toolUseContext.options.isNonInteractiveSession) {
    xe(dispatchKey, "cmd_local_jsx_headless");
    let headlessText = `/${mu(command)} opens an interactive panel and isn't available in this environment. Run it from the Claude Code terminal instead.`;
    return {
      messages: [Mw(J6e(command, args)), Mw(`<local-command-stdout>${headlessText}</local-command-stdout>`)],
      shouldQuery: false,
      command: command,
      resultText: headlessText
    };
  }
  try {
    switch (command.type) {
      case "local-jsx":
        return new Promise(resolve => {
          let settled = false,
            onDone = (output, options) => {
              if (settled = true, He(dispatchKey), options?.display === "skip") {
                resolve({
                  messages: [],
                  shouldQuery: false,
                  command: command,
                  nextInput: options?.nextInput,
                  submitNextInput: options?.submitNextInput
                });
                return;
              }
              let metaMessages = (options?.metaMessages ?? []).map(content => Mn({
                  content: content,
                  isMeta: true
                })),
                isDismissed = Cs() && typeof output === "string" && output.endsWith(" dismissed");
              resolve({
                messages: options?.display === "system" ? isDismissed ? metaMessages : [Mw(J6e(command, args)), Mw(`<local-command-stdout>${output}</local-command-stdout>`), ...metaMessages] : [Mn({
                  content: EG({
                    inputString: J6e(command, args),
                    precedingInputBlocks: precedingInputBlocks
                  })
                }), output ? Mn({
                  content: `<local-command-stdout>${output}</local-command-stdout>`
                }) : Mn({
                  content: `<local-command-stdout>${FR}</local-command-stdout>`
                }), ...metaMessages],
                shouldQuery: options?.shouldQuery ?? false,
                command: command,
                nextInput: options?.nextInput,
                submitNextInput: options?.submitNextInput
              });
            };
          command.load().then(loaded => loaded.call(onDone, {
            ...toolUseContext,
            canUseTool: canUseTool
          }, args, commandName)).then(jsx => {
            if (jsx == null) return;
            if (settled) return;
            setStreamingUI({
              jsx: jsx,
              shouldHidePromptInput: true,
              showSpinner: false,
              isLocalJSXCommand: true,
              isImmediate: Rxe(command, args)
            });
          }).catch(error => {
            if (Ie(error), xe(dispatchKey, "cmd_local_jsx_threw"), settled) return;
            settled = true, setStreamingUI({
              jsx: null,
              shouldHidePromptInput: false,
              clearLocalJSX: true
            }), resolve({
              messages: [],
              shouldQuery: false,
              command: command
            });
          });
        });
      case "local":
        {
          if (toolUseContext.deferSlashToEngine?.(command)) {
            let deferredText = `/${mu(command)} ${args}`.trim(),
              deferredMessage = Mn({
                content: EG({
                  inputString: deferredText,
                  precedingInputBlocks: precedingInputBlocks
                })
              });
            return {
              messages: [deferredMessage],
              shouldQuery: false,
              command: command,
              engineDeferredSlash: {
                text: deferredText,
                messageUuid: deferredMessage.uuid
              }
            };
          }
          let displayArgs = command.isSensitive && args.trim() ? "***" : args,
            userMessage = Mn({
              content: EG({
                inputString: J6e(command, displayArgs),
                precedingInputBlocks: precedingInputBlocks
              })
            });
          try {
            let initialMessage = Dte(),
              result = await (await command.load()).call(args, toolUseContext);
            if (He(dispatchKey), result.type === "skip") return {
              messages: [],
              shouldQuery: false,
              command: command
            };
            if (result.type === "compact") {
              let stdoutMessages = [initialMessage, userMessage, ...(result.displayText ? [Mn({
                  content: `<local-command-stdout>${result.displayText}</local-command-stdout>`,
                  timestamp: new Date(Date.now() + 100).toISOString()
                })] : [])],
                compaction = {
                  ...result.compactionResult,
                  messagesToKeep: [...result.compactionResult.messagesToKeep, ...stdoutMessages]
                };
              return {
                messages: Iye(compaction),
                shouldQuery: false,
                command: command
              };
            }
            if (result.type === "query") return {
              messages: [userMessage, Mn({
                content: `<local-command-stdout>${result.value}</local-command-stdout>`
              }), Mn({
                content: result.prompt,
                isMeta: true
              })],
              shouldQuery: true,
              command: command,
              resultText: result.value
            };
            return {
              messages: [userMessage, Mw(`<local-command-stdout>${result.value}</local-command-stdout>`)],
              shouldQuery: false,
              command: command,
              resultText: result.value
            };
          } catch (error) {
            if (R_(error)) A(`local command aborted: ${error instanceof Error ? error.message : String(error)}`);else Ie(error);
            return xe(dispatchKey, "cmd_local_threw"), {
              messages: [userMessage, Mw(`<local-command-stderr>${String(error)}</local-command-stderr>`)],
              shouldQuery: false,
              command: command
            };
          }
        }
      case "prompt":
        {
          if (!(command.isMcp && command.loadedFrom !== "mcp")) zOt(command.name, command, "user-slash");
          try {
            let hookResult = await runUserPromptExpansionHook(command, args, toolUseContext);
            if ("blocked" in hookResult) return xe(dispatchKey, "cmd_hook_blocked"), hookResult.blocked;
            if (command.getEffort?.(args) !== undefined && !toolUseContext.options.isNonInteractiveSession) M2();
            if (command.context === "fork") {
              let forkResult = await runForkedSlashCommand(command, args, toolUseContext, precedingInputBlocks, setStreamingUI, canUseTool ?? lx, hookResult.hookMessages);
              return He(dispatchKey), forkResult;
            }
            let promptResult = await S5a(command, args, toolUseContext, precedingInputBlocks, extraMessages, getBinaryFeedbackResponse, hookResult.hookMessages);
            return He(dispatchKey), promptResult;
          } catch (error) {
            if (error instanceof $c) return xe(dispatchKey, "cmd_prompt_aborted"), {
              messages: [Mn({
                content: EG({
                  inputString: J6e(command, args),
                  precedingInputBlocks: precedingInputBlocks
                })
              }), HY({
                toolUse: false
              })],
              shouldQuery: false,
              command: command
            };
            return xe(dispatchKey, "cmd_prompt_threw"), {
              messages: [Mn({
                content: EG({
                  inputString: J6e(command, args),
                  precedingInputBlocks: precedingInputBlocks
                })
              }), Mn({
                content: `<local-command-stderr>${String(error)}</local-command-stderr>`
              })],
              shouldQuery: false,
              command: command
            };
          }
        }
    }
  } catch (error) {
    if (error instanceof uK) return xe(dispatchKey, "cmd_malformed"), {
      messages: [Mn({
        content: EG({
          inputString: error.message,
          precedingInputBlocks: precedingInputBlocks
        })
      })],
      shouldQuery: false,
      command: command
    };
    throw error;
  }
}
function J6e(command, args) {
  return Ixe(mu(command), args);
}
function formatSkillLoadingMetadata(skillName, mode = "loading") {
  return [`<${xv}>${skillName}</${xv}>`, `<${n2}>${skillName}</${n2}>`, "<skill-format>true</skill-format>"].join(`
`);
}
function g5a(commandName, args) {
  return [`<${xv}>${commandName}</${xv}>`, `<${n2}>/${commandName}</${n2}>`, args ? `<command-args>${args}</command-args>` : null].filter(Boolean).join(`
`);
}
function _5a(command, args) {
  if (command.userInvocable !== false) return g5a(command.name, args);
  if (command.loadedFrom === "skills" || command.loadedFrom === "plugin" || command.loadedFrom === "mcp") return formatSkillLoadingMetadata(command.name, command.progressMessage);
  return g5a(command.name, args);
}
async function runUserPromptExpansionHook(command, args, toolUseContext) {
  let hookMessages = [],
    originalPrompt = args ? `/${command.name} ${args}` : `/${command.name}`;
  for await (let hookOutput of a4t(command.source === "mcp" ? "mcp_prompt" : "slash_command", command.name, args, command.source, originalPrompt, Mr(toolUseContext).mode, toolUseContext)) {
    if (hookOutput.message?.type === "progress") continue;
    if (hookOutput.blockingError) {
      let blockedText = `UserPromptExpansion operation blocked by hook:
${hookOutput.blockingError.blockingError}

Original prompt: ${originalPrompt}`;
      return {
        blocked: {
          messages: [wc(blockedText, "warning", undefined, true)],
          shouldQuery: false,
          resultText: blockedText,
          command: command
        }
      };
    }
    if (hookOutput.preventContinuation) {
      let stoppedText = hookOutput.stopReason ? `Operation stopped by hook: ${hookOutput.stopReason}` : "Operation stopped by hook";
      return {
        blocked: {
          messages: [Mn({
            content: stoppedText
          }), wc(stoppedText, "warning", undefined, true)],
          shouldQuery: false,
          resultText: stoppedText,
          command: command
        }
      };
    }
    if (hookOutput.additionalContexts?.length) hookMessages.push(ti({
      type: "hook_additional_context",
      content: hookOutput.additionalContexts,
      hookName: "UserPromptExpansion",
      toolUseID: `hook-${Zdt.randomUUID()}`,
      hookEvent: "UserPromptExpansion"
    }));
    if (hookOutput.message && !(hookOutput.message.type === "attachment" && hookOutput.message.attachment.type === "hook_success" && hookOutput.message.attachment.content === "")) hookMessages.push(hookOutput.message);
  }
  return {
    hookMessages: hookMessages
  };
}
async function processPromptSlashCommand(commandName, args, commands, toolUseContext, precedingInputBlocks = []) {
  let command = hb(commandName, commands);
  if (!command) throw new uK(`Unknown command: ${commandName}`);
  if (command.type !== "prompt") throw Error(`Unexpected ${command.type} command. Expected 'prompt' command. Use /${commandName} directly in the main conversation.`);
  return S5a(command, args, toolUseContext, [], precedingInputBlocks);
}
async function S5a(command, args, toolUseContext, precedingInputBlocks = [], extraMessages = [], messageUuid, hookMessages = []) {
  if (yw() && !toolUseContext.agentId) {
    let metadata = _5a(command, args),
      lines = [`Skill "/${command.name}" is available for workers.`];
    if (command.description) lines.push(`Description: ${command.description}`);
    if (command.whenToUse) lines.push(`When to use: ${command.whenToUse}`);
    let toolPermissions = command.allowedTools ?? [];
    if (toolPermissions.length > 0) lines.push(`This skill grants workers additional tool permissions: ${toolPermissions.join(", ")}`);
    lines.push(`
Instruct a worker to use this skill by including "Use the /${command.name} skill" in your Agent prompt. The worker has access to the Skill tool and will receive the skill's content and permissions when it invokes it.`);
    let metaContent = [{
      type: "text",
      text: lines.join(`
`)
    }];
    return {
      messages: [Mn({
        content: metadata,
        uuid: messageUuid
      }), Mn({
        content: metaContent,
        isMeta: true
      })],
      shouldQuery: true,
      disallowedTools: j1(command.disallowedTools ?? []),
      model: command.model,
      effort: command.getEffort?.(args) ?? command.effort,
      command: command
    };
  }
  let promptBlocks = await command.getPromptForCommand(args, toolUseContext),
    hooksEnabled = !JS("hooks") || Jfe(command.source);
  if (command.hooks && hooksEnabled) {
    let sessionId = It();
    n5a(toolUseContext.setAppState, sessionId, command.hooks, command.name, command.type === "prompt" ? command.skillRoot : undefined);
  }
  let qualifiedName = command.source ? `${command.source}:${command.name}` : command.name,
    promptText = promptBlocks.filter(block => block.type === "text").map(block => block.text).join(`

`);
  OSt(command.name, qualifiedName, promptText, toolUseContext.agentId ?? null);
  let verificationMethod = s5a(command.name);
  if (verificationMethod) toolUseContext.applyAttributionOp({
    kind: "recordVerification",
    method: verificationMethod
  });
  toolUseContext.options.activeSkill = Hxe(command);
  let metadata = _5a(command, args),
    allowedTools = j1(command.allowedTools ?? []),
    disallowedTools = j1(command.disallowedTools ?? []);
  if (disallowedTools.length > 0) t4n(toolUseContext.setToolPermissionContext, disallowedTools, "union");
  let combinedBlocks = extraMessages.length > 0 || precedingInputBlocks.length > 0 ? [...extraMessages, ...precedingInputBlocks, ...promptBlocks] : promptBlocks,
    attachmentMessages = await Q3n(X6e(promptBlocks.filter(block => block.type === "text").map(block => block.text).join(" "), toolUseContext, null, [], {
      now: () => new Date().toISOString(),
      uuid: () => Zdt.randomUUID()
    }, toolUseContext.messages, "repl_main_thread", {
      planSlugSeed: args
    }));
  return {
    messages: [Mn({
      content: metadata,
      uuid: messageUuid
    }), Mn({
      content: combinedBlocks,
      isMeta: true
    }), ...attachmentMessages, ...hookMessages, ti({
      type: "command_permissions",
      allowedTools: allowedTools,
      model: command.model
    })],
    shouldQuery: true,
    allowedTools: allowedTools,
    disallowedTools: disallowedTools,
    model: command.model,
    effort: command.getEffort?.(args) ?? command.effort,
    command: command
  };
}
var Zdt;
var ept = b(() => {
  lt();
  Mm();
  lt();
  uxe();
  Ud();
  jz();
  mn();
  kt();
  vu();
  dee();
  kee();
  fdt();
  y3t();
  fye();
  s4t();
  GA();
  xl();
  qe();
  Cp();
  Ct();
  ID();
  ps();
  tp();
  z6e();
  Nmo();
  r5a();
  vn();
  po();
  cy();
  ly();
  Umo();
  oh();
  ez();
  c4t();
  eW();
  u6e();
  oS();
  pw();
  g1();
  YL();
  r4n();
  h5a();
  Zdt = require("crypto");
});

export {d4t,runForkedSlashCommand as yOp,looksLikeCommand,processSlashCommand,runResolvedSlashCommand as SOp,J6e,formatSkillLoadingMetadata,g5a,_5a,runUserPromptExpansionHook,processPromptSlashCommand,S5a,Zdt,ept};
