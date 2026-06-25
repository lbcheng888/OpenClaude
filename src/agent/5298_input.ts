// @ts-nocheck
import {initKp as kp,d8e} from "../config/4397_kind.ts";
import {Mr,Kh,xl} from "../../vendor/m4427.ts";
import {t4n,wxe,n4n,Umo,c4t} from "../../vendor/m4099.ts";
import {CY,wc,Mn,Mw,po} from "../tools/5224_userPromptCount.ts";
import {executeUserPromptSubmitHooks as gKt,applyHookSessionTitle as QXn} from "../../vendor/m5200.ts";
import {getUserPromptSubmitHookBlockingMessage as JOo,Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {createAttachmentMessage as ti,getAttachmentMessages as X6e,GA} from "./4451_tryGetPDFReference.ts";
import {Mc,W$} from "../config/3882_entrypoint.ts";
import {_Vl} from "../../vendor/m5294.ts";
import {gg,t1} from "../telemetry/2542_ignore1mTag.ts";
import {ZOi,cnt,gO,f4} from "../telemetry/2522_error_name.ts";
import {A8e} from "../telemetry/4444_name.ts";
import {uVl,V_t} from "../../vendor/m5292.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {mcpTools as eH,kee} from "../telemetry/3165_kee.ts";
import {U9n,fdt} from "../../vendor/m3990.ts";
import {findCommand as hb,isBridgeSafeCommand as b_t,findBridgeFallback as E_t,Mm} from "../tools/5174_toSlashCommands.ts";
import {isCommandEnabled as YD,getCommandName as mu,Q3n,z6e} from "../tools/4092_done.ts";
import {wue,EGt} from "../telemetry/4868_EGt.ts";
import {Yal,yGn,k5t} from "../../vendor/m4447.ts";
import {ept,d4t} from "../telemetry/4103_runUserPromptExpansionHook.ts";
import {SVl,TVl} from "./5297_processBashCommand.ts";
import {setPromptId as $Ke,lt} from "../session/0132_sent.ts";
import {hVl,gVl} from "../permissions/5294_prompt_length.ts";
import {$0,Cp} from "../config/2223_level.ts";
import {b} from "../../runtime.ts";
import {iVl} from "../../vendor/m5291.ts";
// @ts-nocheck
async function o7t({
  input: input,
  preExpansionInput: preExpansionInput,
  suppressWorkflowKeyword: suppressWorkflowKeyword,
  mode: mode,
  setToolJSX: setToolJSX,
  context: context,
  pastedContents: pastedContents,
  ideSelection: ideSelection,
  messages: messages,
  setUserInputOnProcessing: setUserInputOnProcessing,
  uuid: uuid,
  isAlreadyProcessing: isAlreadyProcessing,
  querySource: querySource,
  canUseTool: canUseTool,
  skipSlashCommands: skipSlashCommands,
  bridgeOrigin: bridgeOrigin,
  isMeta: isMeta,
  skipAttachments: skipAttachments,
  shouldQuery: shouldQuery,
  promptSource: promptSource,
  origin: origin
}) {
  let inputText = typeof input === "string" ? input : null;
  if (mode === "prompt" && inputText !== null && !isMeta) setUserInputOnProcessing?.(inputText);
  kp("query_process_user_input_base_start");
  let result = await wLm(input, mode, setToolJSX, context, pastedContents, ideSelection, messages, uuid, isAlreadyProcessing, querySource, canUseTool, Mr(context).mode, skipSlashCommands, bridgeOrigin, isMeta, skipAttachments, preExpansionInput, promptSource, suppressWorkflowKeyword, origin);
  if (kp("query_process_user_input_base_end"), !isAlreadyProcessing) t4n(context.setToolPermissionContext, result.disallowedTools ?? []);
  if (shouldQuery === false) result.shouldQuery = false;
  if (!result.shouldQuery || mode === "bash") return result;
  kp("query_hooks_start");
  let hookPromptText = CY(input) || "",
    sessionTitle,
    hookStartTime = performance.now();
  for await (let hookResult of gKt(hookPromptText, Mr(context).mode, context)) {
    if (hookResult.message?.type === "progress") continue;
    if (hookResult.blockingError) {
      let blockingMessage = JOo(hookResult.blockingError),
        finalBlockingText = hookResult.suppressOriginalPrompt ? blockingMessage : `${blockingMessage}

Original prompt: ${hookPromptText}`;
      return {
        messages: [wc(finalBlockingText, "warning", undefined, true)],
        shouldQuery: false,
        resultText: finalBlockingText
      };
    }
    if (hookResult.preventContinuation) {
      let stopText = hookResult.stopReason ? `Operation stopped by hook: ${hookResult.stopReason}` : "Operation stopped by hook";
      return result.messages.push(Mn({
        content: stopText
      }), wc(stopText, "warning", undefined, true)), result.shouldQuery = false, result.resultText = stopText, result.allowedTools = undefined, result;
    }
    if (hookResult.sessionTitle) sessionTitle = hookResult.sessionTitle;
    if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) result.messages.push(ti({
      type: "hook_additional_context",
      content: hookResult.additionalContexts,
      hookName: "UserPromptSubmit",
      toolUseID: `hook-${HZn.randomUUID()}`,
      hookEvent: "UserPromptSubmit"
    }));
    if (hookResult.message) switch (hookResult.message.attachment.type) {
      case "hook_success":
        if (!hookResult.message.attachment.content) break;
        result.messages.push(hookResult.message);
        break;
      default:
        result.messages.push(hookResult.message);
        break;
    }
  }
  if (Mc("prompt_submit_hooks_ms", performance.now() - hookStartTime, hookStartTime), sessionTitle) await QXn(sessionTitle);
  return kp("query_hooks_end"), result;
}
async function wLm(input, mode, setToolJSX, context, pastedContents, ideSelection, messages, ideSelection_2, messages_2, querySource, uuid, contextMode, skipSlashCommands, bridgeOrigin, isMeta, skipAttachments, isMeta_2, promptSource, suppressWorkflowKeyword, origin) {
  let callerSource = _Vl({
      isNonInteractive: context.options.isNonInteractiveSession,
      isMeta: isMeta,
      callerSource: promptSource
    }),
    inputText = null,
    attachmentBlocks = [],
    imageDescriptions = [],
    imageLimits = gg(context.options.mainLoopModel),
    normalizedInput = input;
  if (typeof input === "string") inputText = input;else if (input.length > 0) {
    kp("query_image_processing_start");
    let processedBlocks = [];
    for (let block of input) if (block.type === "image") {
      let processedImage = await ZOi(block, imageLimits);
      if (processedImage.dimensions) {
        let imageDescription = cnt(processedImage.dimensions);
        if (imageDescription) imageDescriptions.push(imageDescription);
      }
      processedBlocks.push(processedImage.block);
    } else processedBlocks.push(block);
    normalizedInput = processedBlocks, kp("query_image_processing_end");
    let lastBlock = processedBlocks.at(-1);
    if (lastBlock?.type === "text") inputText = lastBlock.text, attachmentBlocks = processedBlocks.slice(0, -1);else attachmentBlocks = processedBlocks;
  }
  if (inputText === null && mode !== "prompt") throw Error(`Mode: ${mode} requires a string input.`);
  let pastedImages = pastedContents ? Object.values(pastedContents).filter(A8e) : [],
    pastedImageSourcePaths = pastedContents ? await uVl(pastedContents, context.setAppState) : new Map();
  kp("query_pasted_image_processing_start");
  let resizedPastedImages = await Promise.all(pastedImages.map(async pastedImage => {
      W("tengu_pasted_image_resize_attempt", {
        original_size_bytes: pastedImage.content.length
      });
      let resized = await gO({
        data: pastedImage.content,
        mediaType: pastedImage.mediaType,
        limits: imageLimits
      });
      return resized.block.type, {
        id: pastedImage.id,
        resized: resized,
        originalDimensions: pastedImage.dimensions,
        sourcePath: pastedImage.sourcePath ?? pastedImageSourcePaths.get(pastedImage.id)
      };
    })),
    pastedImageBlocks = [],
    pastedImageIds = [];
  for (let {
    id: pastedImageId,
    resized: resized,
    originalDimensions: originalDimensions,
    sourcePath: sourcePath
  } of resizedPastedImages) {
    if (pastedImageBlocks.push(resized.block), resized.block.type !== "image") continue;
    if (pastedImageIds.push(pastedImageId), resized.dimensions) {
      let imageDescription = cnt(resized.dimensions, sourcePath);
      if (imageDescription) imageDescriptions.push(imageDescription);
    } else if (originalDimensions) {
      let imageDescription = cnt(originalDimensions, sourcePath);
      if (imageDescription) imageDescriptions.push(imageDescription);
    } else if (sourcePath) imageDescriptions.push(`[Image source: ${sourcePath}]`);
  }
  kp("query_pasted_image_processing_end");
  let useBridge = skipSlashCommands,
    bridgeContext = context,
    resolvedInputText = inputText;
  if (bridgeOrigin && inputText !== null && inputText.startsWith("/")) {
    let parsedCommand = wxe(inputText),
      commandName = parsedCommand?.commandName;
    if (eH()) {
      if (commandName) {
        let resolvedName = U9n(commandName, context.options.commands);
        if (resolvedName) commandName = resolvedName.commandName;
      }
    }
    let command = commandName ? hb(commandName, context.options.commands) : undefined;
    if (command) {
      let aliasResolution = parsedCommand ? n4n(command, parsedCommand.args) : undefined,
        aliasTargetCommand = aliasResolution ? hb(aliasResolution.targetName, context.options.commands) : undefined,
        aliasTarget = aliasResolution && aliasTargetCommand && YD(aliasTargetCommand) ? {
          command: aliasTargetCommand,
          consumedToken: aliasResolution.consumedToken,
          args: aliasResolution.remainingArgs
        } : undefined,
        effectiveCommand = aliasTarget ? aliasTarget.command : command;
      if (b_t(effectiveCommand)) useBridge = false;else {
        let bridgeFallback = E_t(effectiveCommand);
        if (bridgeFallback) useBridge = false, resolvedInputText = aliasTarget ? `/${bridgeFallback.name}${aliasTarget.args ? ` ${aliasTarget.args}` : ""}` : inputText.replace(/^\/\S+/, `/${bridgeFallback.name}`), bridgeContext = {
          ...context,
          options: {
            ...context.options,
            commands: [bridgeFallback, ...context.options.commands]
          }
        };else {
          let unavailableMessage = aliasTarget ? `/${mu(command)} ${aliasTarget.consumedToken} isn't available over Remote Control.` : `/${mu(effectiveCommand)} isn't available over Remote Control.`;
          return {
            messages: [Mn({
              content: inputText,
              uuid: ideSelection_2,
              origin: origin
            }), Mw(`<local-command-stdout>${unavailableMessage}</local-command-stdout>`)],
            shouldQuery: false,
            resultText: unavailableMessage
          };
        }
      }
    }
  }
  if (wue() && mode === "prompt" && !context.options.isNonInteractiveSession && inputText !== null && !useBridge && !inputText.startsWith("/") && !context.options.ultraplanSessionUrl && !context.getAppState().ultraplanLaunching && Yal(isMeta_2 ?? inputText)) {
    W("tengu_ultraplan_keyword", {});
    let ultraplanArgs = yGn(inputText).trim(),
      {
        processSlashCommand: processSlashCommand
      } = await Promise.resolve().then(() => (ept(), d4t)),
      ultraplanResult = await processSlashCommand(`/ultraplan ${ultraplanArgs}`, attachmentBlocks, pastedImageBlocks, [], context, setToolJSX, ideSelection_2, messages_2, uuid, callerSource);
    return context.setAppState(state => state.ultraplanLaunchPending ? {
      ...state,
      ultraplanLaunchPending: {
        ...state.ultraplanLaunchPending,
        source: "keyword"
      }
    } : state), kZn(ultraplanResult, imageDescriptions);
  }
  if (inputText !== null && mode === "bash") {
    let {
      processBashCommand: processBashCommand
    } = await Promise.resolve().then(() => (SVl(), TVl));
    return kZn(await processBashCommand(inputText, attachmentBlocks, context, setToolJSX), imageDescriptions);
  }
  let shouldLoadAttachments = !skipAttachments && (mode !== "prompt" || useBridge || !inputText?.startsWith("/")),
    promptId = HZn.randomUUID();
  $Ke(promptId);
  let isRegularUserPrompt = mode === "prompt" && !isMeta;
  kp("query_attachment_loading_start");
  let attachmentMessages = shouldLoadAttachments ? await Q3n(X6e(inputText, context, ideSelection ?? null, [], {
    now: () => new Date().toISOString(),
    uuid: () => HZn.randomUUID()
  }, messages, querySource, {
    isRegularUserPrompt: isRegularUserPrompt,
    preExpansionInput: isMeta_2,
    suppressWorkflowKeyword: suppressWorkflowKeyword
  })) : [];
  if (kp("query_attachment_loading_end"), resolvedInputText !== null && !useBridge && resolvedInputText.startsWith("/")) {
    let {
        processSlashCommand: processSlashCommand
      } = await Promise.resolve().then(() => (ept(), d4t)),
      slashCommandResult = await processSlashCommand(resolvedInputText, attachmentBlocks, pastedImageBlocks, attachmentMessages, bridgeContext, setToolJSX, ideSelection_2, messages_2, uuid, callerSource);
    return kZn(slashCommandResult, imageDescriptions);
  }
  if (inputText !== null && mode === "prompt") {
    let trimmedInput = inputText.trim(),
      agentMention = attachmentMessages.find(attachmentMessage => attachmentMessage.attachment.type === "agent_mention");
    if (agentMention) {
      let mentionToken = `@agent-${agentMention.attachment.agentType}`,
        isSubagentOnly = trimmedInput === mentionToken,
        isPrefix = trimmedInput.startsWith(mentionToken) && !isSubagentOnly;
      W("tengu_subagent_at_mention", {
        is_subagent_only: isSubagentOnly,
        is_prefix: isPrefix
      });
    }
  }
  return kZn(hVl(normalizedInput, pastedImageBlocks, pastedImageIds, attachmentMessages, promptId, ideSelection_2, contextMode, isMeta, $0(context.options.mainLoopModel, Kh(context)), callerSource, origin), imageDescriptions);
}
function kZn(bundle, imageDescriptions) {
  if (imageDescriptions.length > 0) bundle.messages.push(Mn({
    content: imageDescriptions.map(text => ({
      type: "text",
      text: text
    })),
    isMeta: true
  }));
  return bundle;
}
var HZn;
var IZn = b(() => {
  lt();
  kt();
  po();
  Mm();
  kee();
  fdt();
  GA();
  xl();
  Cp();
  z6e();
  Wd();
  iVl();
  f4();
  V_t();
  po();
  t1();
  Umo();
  d8e();
  c4t();
  W$();
  EGt();
  k5t();
  gVl();
  HZn = require("crypto");
});

export {o7t,wLm,kZn,HZn,IZn};
