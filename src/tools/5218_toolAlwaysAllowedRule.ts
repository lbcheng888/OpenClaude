// @ts-nocheck
import {ft,b,oo} from "../../runtime.ts";
import {nas,a2,fA,wm} from "../../vendor/m707.ts";
import {Jf,Gp,Kpe,evt,aCe,FSr,sI,isn,NSr,T0,gA} from "../mcp/0733_serverName.ts";
import {isDangerousClassifierPermission as u5e,fqn} from "../../vendor/m4172.ts";
import {tle,H1} from "../telemetry/5213_commandWithoutRedirections.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {tQ,FS} from "../../vendor/m722.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {executePermissionRequestHooks as Fye} from "../hooks/5200_level.ts";
import {HOOK_REWRITE_HEADLESS_DENY_REASON as $Rt,CLASSIFIER_TRANSCRIPT_TOO_LONG_REASON as URt,CLASSIFIER_UNAVAILABLE_REASON as X1e,jN} from "../../vendor/m721.ts";
import {yW,S$,i_,Sw} from "../../vendor/m2789.ts";
import {mo,$c,allTools as R_,Ct} from "../../vendor/m197.ts";
import {IK,AR} from "../../vendor/m583.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {zil,FWn,b5t,BWn,Kil,Hbo} from "../../vendor/m4425.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le,Bo} from "../../vendor/m5.ts";
import {Pi,Mo,vu} from "../mcp/2200_mcpServerName.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {buildDefaultSystemPromptSections as mL,A5e} from "../../vendor/m5213.ts";
import {qp} from "../../vendor/m137.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {n3e,IDn} from "../../vendor/m3210.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {C8i,n9e,Cae} from "../../vendor/m2788.ts";
import {SQn,a6l,i6l,s6l,po} from "./5224_userPromptCount.ts";
import {ws} from "../config/2709_Zm.ts";
import {ls,fg} from "../../vendor/m2232.ts";
import {CR,toe} from "../../vendor/m450.ts";
import {c5,dn} from "../config/0137_namespace.ts";
import {PLo,Vql} from "../../vendor/m5215.ts";
import {qdo,H3t,gye} from "../permissions/3986_editRemovalVisibility.ts";
import {_6a,Exe} from "../tui/4086_classifierApprovals.ts";
import {isModelDrivenSession as rFe,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {YNe,h7} from "../telemetry/1454_model.ts";
import {getTotalInputTokens as tSt,getTotalOutputTokens as Yy,getTotalCacheReadInputTokens as nSt,getTotalCacheCreationInputTokens as rSt,lt} from "../session/0132_sent.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {npe} from "../../vendor/m170.ts";
import {yQn} from "../../vendor/m5214.ts";
import {Wd} from "./5204_shouldSkipHookDueToTrust.ts";
import {Zql,Qql} from "../../vendor/m5216.ts";
import {bte,lce} from "../../vendor/m3960.ts";
import {bgo,Sgo} from "../agent/4211_workflowNeedsUsageConsentPrompt.ts";
// @ts-nocheck
var Gul = {};
ft(Gul, {
  toolAlwaysAllowedRule: () => toolAlwaysAllowedRule,
  syncPermissionRulesFromDisk: () => syncPermissionRulesFromDisk,
  permissionRuleSourceDisplayString: () => permissionRuleSourceDisplayString,
  hasPermissionsToUseToolWithSink: () => hasPermissionsToUseToolWithSink,
  hasPermissionsToUseTool: () => hasPermissionsToUseTool,
  guardHookUpdatedInput: () => guardHookUpdatedInput,
  getRuleByContentsForToolName: () => getRuleByContentsForToolName,
  getRuleByContentsForTool: () => getRuleByContentsForTool,
  getInputParamRule: () => getInputParamRule,
  getDenyRules: () => getDenyRules,
  getDenyRuleForTool: () => getDenyRuleForTool,
  getDenyRuleForAgent: () => getDenyRuleForAgent,
  getAskRules: () => getAskRules,
  getAskRuleForTool: () => getAskRuleForTool,
  getAllowRules: () => getAllowRules,
  findSafetyCheckReason: () => findSafetyCheckReason,
  filterDeniedAgents: () => filterDeniedAgents,
  deletePermissionRule: () => deletePermissionRule,
  createPermissionRequestMessage: () => createPermissionRequestMessage,
  checkRuleBasedPermissions: () => checkRuleBasedPermissions,
  applyPermissionRulesToPermissionContext: () => applyPermissionRulesToPermissionContext,
  PERMISSION_RULE_SOURCES: () => PERMISSION_RULE_SOURCES
});
function permissionRuleSourceDisplayString(source) {
  return nas(source);
}
function isAutoModeForPermissions(mode) {
  return mode === "auto" || mode === "plan" && (wIm?.isAutoModeActive() ?? false);
}
function getAllowRules(permissionContext) {
  if (isAutoModeForPermissions(permissionContext.mode)) {
    let allowRulesBySource = permissionContext.alwaysAllowRules,
      allowRules = [];
    for (let source of PERMISSION_RULE_SOURCES) {
      let rawRules = allowRulesBySource[source];
      if (rawRules === undefined) continue;
      for (let rawRule of rawRules) {
        let ruleValue = Jf(rawRule);
        if (u5e(ruleValue.toolName, ruleValue.ruleContent)) continue;
        allowRules.push({
          source: source,
          ruleBehavior: "allow",
          ruleValue: ruleValue
        });
      }
    }
    return allowRules;
  }
  return collectRulesFromSources(permissionContext.alwaysAllowRules, "allow");
}
function createPermissionRequestMessage(toolName, decisionReason) {
  if (decisionReason) {
    if (decisionReason.type === "classifier") return `Classifier '${decisionReason.classifier}' requires approval for this ${toolName} command: ${decisionReason.reason}`;
    switch (decisionReason.type) {
      case "hook":
        return decisionReason.reason ? `Hook '${decisionReason.hookName}' blocked this action: ${decisionReason.reason}` : `Hook '${decisionReason.hookName}' requires approval for this ${toolName} command`;
      case "rule":
        {
          let ruleDisplay = Gp(decisionReason.rule.ruleValue),
            sourceDisplay = permissionRuleSourceDisplayString(decisionReason.rule.source);
          return `Permission rule '${ruleDisplay}' from ${sourceDisplay} requires approval for this ${toolName} command`;
        }
      case "subcommandResults":
        {
          let parts = [];
          for (let [subcommand, subResult] of decisionReason.reasons) if (subResult.behavior === "ask" || subResult.behavior === "passthrough") if (toolName === "Bash") {
            let {
                commandWithoutRedirections: bareCommand,
                redirections: redirections
              } = tle(subcommand),
              displayCommand = redirections.length > 0 ? bareCommand : subcommand;
            parts.push(displayCommand);
          } else parts.push(subcommand);
          if (parts.length > 0) {
            let count = parts.length;
            return `This ${toolName} command contains multiple operations. The following ${Sn(count, "part")} ${Sn(count, "requires", "require")} approval: ${parts.join(", ")}`;
          }
          return `This ${toolName} command contains multiple operations that require approval`;
        }
      case "permissionPromptTool":
        return `Tool '${decisionReason.permissionPromptToolName}' requires approval for this ${toolName} command`;
      case "sandboxOverride":
        return "Run outside of the sandbox";
      case "workingDir":
        return decisionReason.reason;
      case "safetyCheck":
      case "other":
        return decisionReason.reason;
      case "mode":
        return `Current permission mode (${tQ(decisionReason.mode)}) requires approval for this ${toolName} command`;
      case "asyncAgent":
        return decisionReason.reason;
    }
  }
  return `Claude requested permissions to use ${toolName}, but you haven't granted it yet.`;
}
function collectRulesFromSources(rulesBySource, ruleBehavior) {
  let rules = [];
  for (let source of PERMISSION_RULE_SOURCES) {
    let rawRules = rulesBySource[source];
    if (rawRules === undefined) continue;
    for (let rawRule of rawRules) rules.push({
      source: source,
      ruleBehavior: ruleBehavior,
      ruleValue: Jf(rawRule)
    });
  }
  return rules;
}
function getDenyRules(permissionContext) {
  return collectRulesFromSources(permissionContext.alwaysDenyRules, "deny");
}
function getAskRules(permissionContext) {
  return collectRulesFromSources(permissionContext.alwaysAskRules, "ask");
}
function matchesToolRule(tool, rule, {
  proxyExpansion = false,
  globMatching = false,
  toolAliases: toolAliases
} = {}) {
  if (rule.ruleValue.ruleContent !== undefined) return false;
  let toolName = Kpe(tool);
  if (rule.ruleValue.toolName === toolName) return true;
  if (proxyExpansion && evt(rule.ruleValue.toolName, toolAliases).includes(toolName)) return true;
  if (globMatching && aCe(rule.ruleValue.toolName) && FSr(rule.ruleValue.toolName, toolName)) return true;
  let ruleMcp = sI(rule.ruleValue.toolName),
    toolMcp = sI(toolName);
  return ruleMcp !== null && toolMcp !== null && ruleMcp.serverName === toolMcp.serverName && (ruleMcp.toolName === undefined || ruleMcp.toolName === "*" || toolMcp.toolName !== undefined && aCe(ruleMcp.toolName) && FSr(ruleMcp.toolName, toolMcp.toolName));
}
function toolAlwaysAllowedRule(permissionContext, tool) {
  return getAllowRules(permissionContext).find(rule => matchesToolRule(tool, rule)) || null;
}
function allowsProxyExpansion(rule) {
  return rule.source !== "cliArg" && rule.source !== "toolsNarrowing";
}
function getDenyRuleForTool(permissionContext, tool) {
  return getDenyRules(permissionContext).find(rule => matchesToolRule(tool, rule, {
    proxyExpansion: allowsProxyExpansion(rule),
    globMatching: true,
    toolAliases: permissionContext.toolAliases
  })) || null;
}
function getAskRuleForTool(permissionContext, tool) {
  return getAskRules(permissionContext).find(rule => matchesToolRule(tool, rule, {
    proxyExpansion: allowsProxyExpansion(rule),
    globMatching: true,
    toolAliases: permissionContext.toolAliases
  })) || null;
}
function getInputParamRule(permissionContext, tool, input, ruleBehavior) {
  let toolName = Kpe(tool);
  for (let aliasName of [toolName, ...isn(toolName, permissionContext.toolAliases)]) for (let [ruleContent, rule] of getRuleByContentsForToolName(permissionContext, aliasName, ruleBehavior)) {
    if (aliasName !== toolName && !allowsProxyExpansion(rule)) continue;
    let colonIndex = ruleContent.indexOf(":");
    if (colonIndex <= 0) continue;
    let fieldName = ruleContent.slice(0, colonIndex).trim(),
      fieldPattern = ruleContent.slice(colonIndex + 1).trim();
    if (fieldName === "" || fieldPattern === "") continue;
    if (fieldName === tool.ruleContentField) continue;
    if (!Object.hasOwn(input, fieldName)) continue;
    let fieldValue = input[fieldName];
    if (fieldValue === undefined || fieldValue === null || typeof fieldValue === "object") continue;
    if (NSr(fieldPattern, String(fieldValue).trim())) return rule;
  }
  return null;
}
function getDenyRuleForAgent(permissionContext, toolName, agentType) {
  return getDenyRules(permissionContext).find(rule => rule.ruleValue.toolName === toolName && rule.ruleValue.ruleContent === agentType) || null;
}
function filterDeniedAgents(agents, permissionContext, toolName) {
  let deniedAgentTypes = new Set();
  for (let rule of getDenyRules(permissionContext)) if (rule.ruleValue.toolName === toolName && rule.ruleValue.ruleContent !== undefined) deniedAgentTypes.add(rule.ruleValue.ruleContent);
  return agents.filter(agent => !deniedAgentTypes.has(agent.agentType));
}
function getRuleByContentsForTool(permissionContext, tool, ruleBehavior) {
  return getRuleByContentsForToolName(permissionContext, Kpe(tool), ruleBehavior);
}
function getRuleByContentsForToolName(permissionContext, toolName, ruleBehavior) {
  let rulesByContent = new Map(),
    rules = [];
  switch (ruleBehavior) {
    case "allow":
      rules = getAllowRules(permissionContext);
      break;
    case "deny":
      rules = getDenyRules(permissionContext);
      break;
    case "ask":
      rules = getAskRules(permissionContext);
      break;
  }
  for (let rule of rules) if (rule.ruleValue.toolName === toolName && rule.ruleValue.ruleContent !== undefined && rule.ruleBehavior === ruleBehavior) rulesByContent.set(rule.ruleValue.ruleContent, rule);
  return rulesByContent;
}
function guardHookUpdatedInput(decision, toolName) {
  if (decision?.behavior === "deny" || decision?.behavior === "ask") return A(`PermissionRequest hook allowed ${toolName} with updatedInput, but ${decision.behavior} rule overrides: ${decision.message}`), decision;
  return null;
}
async function runPermissionRequestHooksForHeadless(tool, input, toolUseId, context, agentMessage, suggestions) {
  try {
    for await (let hookEvent of Fye(tool.name, toolUseId, input, context, agentMessage, suggestions, context.abortController.signal)) {
      if (!hookEvent.permissionRequestResult) continue;
      let result = hookEvent.permissionRequestResult;
      if (result.behavior === "allow") {
        let updatedInput = result.updatedInput ?? input;
        if (result.updatedInput) {
          let overrideRule = guardHookUpdatedInput(await checkRuleBasedPermissions(tool, updatedInput, context), tool.name);
          if (overrideRule) return overrideRule.behavior === "ask" ? {
            behavior: "deny",
            message: overrideRule.message,
            decisionReason: overrideRule.decisionReason ?? $Rt
          } : overrideRule;
        }
        if (result.updatedPermissions?.length) {
          let updatedPermissions = result.updatedPermissions;
          yW(updatedPermissions), context.setToolPermissionContext(ctx => S$(ctx, updatedPermissions));
        }
        return {
          behavior: "allow",
          updatedInput: updatedInput,
          decisionReason: {
            type: "hook",
            hookName: "PermissionRequest"
          }
        };
      }
      if (result.behavior === "deny") {
        if (result.interrupt) A(`Hook interrupt: tool=${tool.name} hookMessage=${result.message}`), context.abortController.abort();
        return {
          behavior: "deny",
          message: result.message || "Permission denied by hook",
          decisionReason: {
            type: "hook",
            hookName: "PermissionRequest",
            reason: result.message
          }
        };
      }
    }
  } catch (err) {
    A(`PermissionRequest hook failed for headless agent: ${mo(err).message}`, {
      level: "error"
    });
  }
  return null;
}
function isSameTurnSiblingContextEnabled() {
  let envValue = IK.CLAUDE_CODE_AUTO_MODE_SIBLING_CONTEXT;
  if (envValue !== undefined) return envValue;
  let config = it("tengu_auto_mode_config", {});
  if (typeof config?.sameTurnSiblingContext === "boolean") return config.sameTurnSiblingContext;
  return false;
}
function setDenialTracking(context, denialTracking) {
  if (context.localDenialTracking) Object.assign(context.localDenialTracking, denialTracking);else context.setAppState(appState => {
    if (appState.denialTracking === denialTracking) return appState;
    return {
      ...appState,
      denialTracking: denialTracking
    };
  });
}
function handleClassifierDenialLimit(denialTracking, blockedAction, agentMessage, tool, decision, context) {
  if (!zil(denialTracking)) return null;
  let totalLimitExceeded = denialTracking.totalDenials >= FWn.maxTotal,
    shouldAvoidPrompts = Mr(context).shouldAvoidPermissionPrompts,
    totalDenials = denialTracking.totalDenials,
    consecutiveDenials = denialTracking.consecutiveDenials,
    limitMessage = totalLimitExceeded ? `${totalDenials} actions were blocked this session. Please review the transcript before continuing.` : `${consecutiveDenials} consecutive actions were blocked. Please review the transcript before continuing.`;
  if (W("tengu_auto_mode_denial_limit_exceeded", {
    limit: Ve(totalLimitExceeded ? "total" : "consecutive"),
    mode: Ve(shouldAvoidPrompts ? "headless" : "cli"),
    messageID: agentMessage.message.id,
    consecutiveDenials: consecutiveDenials,
    totalDenials: totalDenials,
    toolName: Pi(tool.name)
  }), shouldAvoidPrompts) throw new $c("Agent aborted: too many classifier denials in headless mode");
  if (A(`Classifier denial limit exceeded, falling back to prompting: ${limitMessage}`, {
    level: "warn"
  }), totalLimitExceeded) setDenialTracking(context, {
    ...denialTracking,
    totalDenials: 0,
    consecutiveDenials: 0
  });
  let classifier = decision.decisionReason?.type === "classifier" ? decision.decisionReason.classifier : "auto-mode";
  return {
    ...decision,
    decisionReason: {
      type: "classifier",
      classifier: classifier,
      reason: `${limitMessage}

Latest blocked action: ${blockedAction}`
    }
  };
}
function isAskRuleDecision(decisionReason) {
  if (decisionReason?.type === "rule" && decisionReason.rule.ruleBehavior === "ask") return true;
  if (decisionReason?.type === "subcommandResults") {
    for (let subResult of decisionReason.reasons.values()) if (subResult.behavior === "ask" && isAskRuleDecision(subResult.decisionReason)) return true;
  }
  return false;
}
function isMcpServerPolicyAskRule(decisionReason) {
  return decisionReason?.type === "rule" && decisionReason.rule.ruleBehavior === "ask" && decisionReason.rule.source === "mcpServerPolicy";
}
function isPlanModeReason(decisionReason) {
  return decisionReason?.type === "mode" && decisionReason.mode === "plan";
}
async function checkRuleBasedPermissions(tool, input, context) {
  let permissionContext = Mr(context),
    denyRule = getDenyRuleForTool(permissionContext, tool);
  if (denyRule) return {
    behavior: "deny",
    decisionReason: {
      type: "rule",
      rule: denyRule
    },
    message: `Permission to use ${tool.name} has been denied.`
  };
  let inputDenyRule = getInputParamRule(permissionContext, tool, input, "deny");
  if (inputDenyRule) return {
    behavior: "deny",
    decisionReason: {
      type: "rule",
      rule: inputDenyRule
    },
    message: `Permission to use ${tool.name} with ${inputDenyRule.ruleValue.ruleContent} has been denied.`
  };
  let askRule = getAskRuleForTool(permissionContext, tool);
  if (askRule) {
    if (!(tool.name === Mo && xo.isSandboxingEnabled() && xo.isAutoAllowBashIfSandboxedEnabled() && mL(input))) return {
      behavior: "ask",
      decisionReason: {
        type: "rule",
        rule: askRule
      },
      message: createPermissionRequestMessage(tool.name)
    };
  }
  let decision = {
    behavior: "passthrough",
    message: createPermissionRequestMessage(tool.name)
  };
  try {
    let parsedInput = tool.inputSchema.parse(input);
    decision = await tool.checkPermissions(parsedInput, context);
  } catch (err) {
    if (err instanceof $c || err instanceof qp) throw err;
    if (!R_(err)) Ie(err);
  }
  if (decision?.behavior === "deny") return decision;
  let inputAskRule = getInputParamRule(permissionContext, tool, input, "ask");
  if (inputAskRule) return {
    behavior: "ask",
    decisionReason: {
      type: "rule",
      rule: inputAskRule
    },
    message: createPermissionRequestMessage(tool.name)
  };
  if (decision?.behavior === "ask" && isAskRuleDecision(decision.decisionReason)) return decision;
  if (tool.mcpInfo?.effectiveMaxPermission === "ask") {
    let orgAskReason = {
      type: "other",
      reason: ORG_REQUIRES_APPROVAL_REASON
    };
    return {
      behavior: "ask",
      message: createPermissionRequestMessage(tool.name, orgAskReason),
      decisionReason: orgAskReason
    };
  }
  if (decision?.behavior === "ask" && (findSafetyCheckReason(decision.decisionReason) || decision.decisionReason?.type === "sandboxOverride")) return decision;
  return null;
}
async function evaluateToolPermissions(tool, input, context, agentMessage) {
  if (context.abortController.signal.aborted) throw new $c();
  let permissionContext = Mr(context),
    denyRule = getDenyRuleForTool(permissionContext, tool);
  if (denyRule) return {
    behavior: "deny",
    decisionReason: {
      type: "rule",
      rule: denyRule
    },
    message: `Permission to use ${tool.name} has been denied.`
  };
  let inputDenyRule = getInputParamRule(permissionContext, tool, input, "deny");
  if (inputDenyRule) return {
    behavior: "deny",
    decisionReason: {
      type: "rule",
      rule: inputDenyRule
    },
    message: `Permission to use ${tool.name} with ${inputDenyRule.ruleValue.ruleContent} has been denied.`
  };
  let askRule = getAskRuleForTool(permissionContext, tool);
  if (askRule) {
    if (!(tool.name === Mo && xo.isSandboxingEnabled() && xo.isAutoAllowBashIfSandboxedEnabled() && mL(input))) return {
      behavior: "ask",
      decisionReason: {
        type: "rule",
        rule: askRule
      },
      message: createPermissionRequestMessage(tool.name)
    };
  }
  let decision = {
    behavior: "passthrough",
    message: createPermissionRequestMessage(tool.name)
  };
  try {
    let parsedInput = tool.inputSchema.parse(input);
    decision = await tool.checkPermissions(parsedInput, context);
  } catch (err) {
    if (err instanceof $c || err instanceof qp) throw err;
    if (!R_(err)) Ie(err);
  }
  if (decision?.behavior === "deny") return decision;
  let inputAskRule = getInputParamRule(permissionContext, tool, input, "ask");
  if (inputAskRule) return {
    behavior: "ask",
    decisionReason: {
      type: "rule",
      rule: inputAskRule
    },
    message: createPermissionRequestMessage(tool.name)
  };
  if (tool.requiresUserInteraction?.() && decision?.behavior === "ask") return decision;
  if (decision?.behavior === "ask" && isAskRuleDecision(decision.decisionReason)) return decision;
  if (tool.mcpInfo?.effectiveMaxPermission === "ask") {
    let orgAskReason = {
      type: "other",
      reason: ORG_REQUIRES_APPROVAL_REASON
    };
    return {
      behavior: "ask",
      message: createPermissionRequestMessage(tool.name, orgAskReason),
      decisionReason: orgAskReason
    };
  }
  let permissionContext2 = Mr(context),
    mode = n3e(tool, permissionContext2),
    isBypassMode = mode === "bypassPermissions" || mode === "plan" && permissionContext2.isBypassPermissionsModeAvailable,
    dangerousRmSafetyReason = isBypassMode && decision?.behavior === "ask" ? findSafetyCheckReason(decision.decisionReason, safetyReason => safetyReason.reason.startsWith("Dangerous rm operation") || safetyReason.reason.startsWith("Dangerous rmdir operation")) : undefined;
  if (decision?.behavior === "ask" && (dangerousRmSafetyReason || !isBypassMode && (findSafetyCheckReason(decision.decisionReason) || decision.decisionReason?.type === "sandboxOverride" || isPlanModeReason(decision.decisionReason)))) return decision;
  if (isBypassMode) return {
    behavior: "allow",
    updatedInput: resolveUpdatedInput(decision, input),
    decisionReason: {
      type: "mode",
      mode: mode
    }
  };
  let allowRule = toolAlwaysAllowedRule(Mr(context), tool);
  if (allowRule && !(Mr(context).chromeClassifierFloorEnabled === true && OLo.isChromeMcpToolName(Kpe(tool)))) return {
    behavior: "allow",
    updatedInput: resolveUpdatedInput(decision, input),
    decisionReason: {
      type: "rule",
      rule: allowRule
    }
  };
  let finalDecision = decision.behavior === "passthrough" ? {
    ...decision,
    behavior: "ask",
    message: createPermissionRequestMessage(tool.name, decision.decisionReason)
  } : decision;
  if (finalDecision.behavior === "ask" && finalDecision.suggestions) A(`Permission suggestions for ${tool.name}: ${Pe(finalDecision.suggestions, null, 2)}`);
  return finalDecision;
}
async function deletePermissionRule({
  rule: rule,
  initialContext: initialContext,
  setToolPermissionContext: setToolPermissionContext
}) {
  if (rule.source === "policySettings" || rule.source === "flagSettings" || rule.source === "command") throw Error("Cannot delete permission rules from read-only settings");
  let updatedContext = i_(initialContext, {
    type: "removeRules",
    rules: [rule.ruleValue],
    behavior: rule.ruleBehavior,
    destination: rule.source
  });
  switch (rule.source) {
    case "localSettings":
    case "userSettings":
    case "projectSettings":
      {
        C8i(rule);
        break;
      }
    case "cliArg":
    case "session":
      break;
  }
  setToolPermissionContext(updatedContext);
}
function buildRuleUpdateOperations(rules, operationType) {
  let rulesBySourceBehavior = new Map();
  for (let rule of rules) {
    let key = `${rule.source}:${rule.ruleBehavior}`;
    if (!rulesBySourceBehavior.has(key)) rulesBySourceBehavior.set(key, []);
    rulesBySourceBehavior.get(key).push(rule.ruleValue);
  }
  let operations = [];
  for (let [key, ruleValues] of rulesBySourceBehavior) {
    let [source, behavior] = key.split(":");
    operations.push({
      type: operationType,
      rules: ruleValues,
      behavior: behavior,
      destination: source
    });
  }
  return operations;
}
function applyPermissionRulesToPermissionContext(permissionContext, rules) {
  let operations = buildRuleUpdateOperations(rules, "addRules");
  return S$(permissionContext, operations);
}
function syncPermissionRulesFromDisk(permissionContext, rules) {
  let updatedContext = permissionContext;
  if (n9e()) {
    let sources = [...a2, "cliArg", "session"],
      behaviors = ["allow", "deny", "ask"];
    for (let source of sources) for (let behavior of behaviors) updatedContext = i_(updatedContext, {
      type: "replaceRules",
      rules: [],
      behavior: behavior,
      destination: source
    });
  }
  for (let source of fA) for (let behavior of ["allow", "deny", "ask"]) updatedContext = i_(updatedContext, {
    type: "replaceRules",
    rules: [],
    behavior: behavior,
    destination: source
  });
  let operations = buildRuleUpdateOperations(rules, "replaceRules");
  return S$(updatedContext, operations);
}
function resolveUpdatedInput(decision, input) {
  return ("updatedInput" in decision ? decision.updatedInput : undefined) ?? input;
}
function findSafetyCheckReason(decisionReason, predicate = () => true) {
  if (!decisionReason) return;
  if (decisionReason.type === "safetyCheck") return predicate(decisionReason) ? decisionReason : undefined;
  if (decisionReason.type === "subcommandResults") for (let subResult of decisionReason.reasons.values()) {
    let found = findSafetyCheckReason(subResult.decisionReason, predicate);
    if (found) return found;
  }
  return;
}
var OLo,
  wIm,
  kIm,
  ORG_REQUIRES_APPROVAL_REASON = "Your organization requires approval for this tool",
  PERMISSION_RULE_SOURCES,
  hasPermissionsToUseTool = async (tool, input, context, agentMessage, toolUseId) => hasPermissionsToUseToolWithSink(tool, input, context, agentMessage, toolUseId, undefined),
  hasPermissionsToUseToolWithSink = async (tool, input, context, agentMessage, toolUseId, sink, signal) => {
    let decision = await resolveToolPermission(tool, input, context, agentMessage, toolUseId, sink, signal);
    return decision.behavior === "deny" ? {
      ...decision,
      decideLocation: "pre-ask",
      ...false
    } : decision;
  },
  resolveToolPermission = async (tool, input, context, agentMessage, toolUseId, sink, signal) => {
    let decision = await evaluateToolPermissions(tool, input, {
      ...context,
      toolUseId: toolUseId
    }, sink);
    if (decision.behavior === "allow") {
      let appState = context.getAppState();
      {
        let denialTracking = context.localDenialTracking ?? appState.denialTracking;
        if (n3e(tool, Mr(context)) === "auto" && denialTracking && denialTracking.consecutiveDenials > 0) {
          let reset = b5t(denialTracking);
          setDenialTracking(context, reset);
        }
      }
      return decision;
    }
    if (decision.behavior === "ask") {
      let appState = context.getAppState(),
        permissionContext = Mr(context),
        mode = n3e(tool, permissionContext),
        isChromeMcpTool = OLo?.isChromeMcpToolName(Kpe(tool)) ?? false,
        chromeClassifierFloorAllowed = permissionContext.chromeClassifierFloorEnabled === true && permissionContext.canAutoClassifierRun === true && isChromeMcpTool && (decision.metadata?.command?.chrome?.domainAllowed === true || toolAlwaysAllowedRule(permissionContext, tool) !== null);
      if (mode === "dontAsk" && !chromeClassifierFloorAllowed) return {
        behavior: "deny",
        decisionReason: {
          type: "mode",
          mode: "dontAsk"
        },
        message: SQn(tool.name)
      };
      if (isAutoModeForPermissions(mode) || chromeClassifierFloorAllowed) {
        let nonApprovableSafetyReason = findSafetyCheckReason(decision.decisionReason, safetyReason => !safetyReason.classifierApprovable),
          isSandboxOverride = decision.decisionReason?.type === "sandboxOverride",
          isAskRuleFloor = isAskRuleDecision(decision.decisionReason) && !(isMcpServerPolicyAskRule(decision.decisionReason) && !(tool.isDestructive?.(input) ?? false)),
          isOrgAskCeiling = tool.mcpInfo?.effectiveMaxPermission === "ask",
          isPlanFloor = isPlanModeReason(decision.decisionReason);
        if (nonApprovableSafetyReason || isSandboxOverride || isAskRuleFloor || isOrgAskCeiling || isPlanFloor) {
          if (permissionContext.shouldAvoidPermissionPrompts) return {
            behavior: "deny",
            message: decision.message,
            decisionReason: {
              type: "asyncAgent",
              reason: "Action requires interactive approval and permission prompts are not available in this context"
            }
          };
          if (nonApprovableSafetyReason || isAskRuleFloor || isOrgAskCeiling || isPlanFloor) return W("tengu_auto_mode_fallback_to_ask", {
            reason: Ve(nonApprovableSafetyReason ? "safety_check" : isAskRuleFloor ? "ask_rule" : isPlanFloor ? "plan_mode_floor" : "org_ask_ceiling"),
            toolName: Pi(tool.name)
          }), decision;
        }
        if (tool.requiresUserInteraction?.() && decision.behavior === "ask") return W("tengu_auto_mode_fallback_to_ask", {
          reason: Ve("requires_user_interaction"),
          toolName: Pi(tool.name)
        }), decision;
        if (kIm?.workflowNeedsUsageConsentPrompt(tool.name, context)) return W("tengu_auto_mode_fallback_to_ask", {
          reason: Ve("workflow_usage_consent"),
          toolName: Pi(tool.name)
        }), decision;
        let denialTracking = context.localDenialTracking ?? appState.denialTracking ?? BWn();
        if (tool.name, ws, tool.name !== ls && !isSandboxOverride) try {
          let parsedInput = tool.inputSchema.parse(input),
            keepNonDangerousRule = rawRule => {
              let ruleValue = Jf(rawRule);
              return !u5e(ruleValue.toolName, ruleValue.ruleContent);
            },
            filteredAllowRules = CR(permissionContext.alwaysAllowRules, rawRules => (rawRules ?? []).filter(keepNonDangerousRule)),
            filteredPermissionLayers = context.permissionLayers?.map(layer => layer.kind === "allowed_tools" ? {
              ...layer,
              allowedTools: layer.allowedTools.filter(keepNonDangerousRule)
            } : layer),
            acceptEditsDecision = await tool.checkPermissions(parsedInput, {
              ...context,
              permissionLayers: filteredPermissionLayers,
              getAppState: () => {
                let innerAppState = context.getAppState();
                return {
                  ...innerAppState,
                  toolPermissionContext: {
                    ...innerAppState.toolPermissionContext,
                    mode: "acceptEdits",
                    alwaysAllowRules: filteredAllowRules
                  }
                };
              }
            });
          if (acceptEditsDecision.behavior === "allow") {
            let reset = b5t(denialTracking);
            return setDenialTracking(context, reset), A(`Skipping auto mode classifier for ${tool.name}: would be allowed in acceptEdits mode`), W("tengu_auto_mode_decision", {
              decision: Ve("allowed"),
              toolName: Pi(tool.name),
              inProtectedNamespace: c5(),
              chromeAutomode: isChromeMcpTool,
              agentMsgId: agentMessage.message.id,
              confidence: Ve("high"),
              fastPath: Ve("acceptEdits")
            }), {
              behavior: "allow",
              updatedInput: acceptEditsDecision.updatedInput ?? input,
              decisionReason: {
                type: "mode",
                mode: "auto"
              }
            };
          }
        } catch (err) {
          if (err instanceof $c || err instanceof qp) throw err;
          if (!R_(err)) Ie(err);
          W("tengu_auto_mode_decision", {
            decision: Ve("fastpath_error"),
            toolName: Pi(tool.name),
            inProtectedNamespace: c5(),
            chromeAutomode: isChromeMcpTool,
            agentMsgId: agentMessage.message.id,
            fastPath: Ve("acceptEdits"),
            error: err instanceof Error ? err.name : "unknown"
          });
        }
        if (OLo.isAutoModeAllowlistedTool(tool.name, input)) {
          let reset = b5t(denialTracking);
          return setDenialTracking(context, reset), A(`Skipping auto mode classifier for ${tool.name}: tool is on the safe allowlist`), PLo({
            tool: tool.name,
            allowlisted: true,
            decision: "allowed",
            durationMs: 0
          }), W("tengu_auto_mode_decision", {
            decision: Ve("allowed"),
            toolName: Pi(tool.name),
            inProtectedNamespace: c5(),
            chromeAutomode: isChromeMcpTool,
            agentMsgId: agentMessage.message.id,
            confidence: Ve("high"),
            fastPath: Ve("allowlist")
          }), {
            behavior: "allow",
            updatedInput: decision.updatedInput ?? input,
            decisionReason: {
              type: "mode",
              mode: "auto"
            }
          };
        }
        let siblingToolUses = isSameTurnSiblingContextEnabled() ? context.sameTurnToolUses ?? [] : [],
          classifierInput = qdo(tool.name, input);
        _6a(signal, toolUseId);
        let classifierResult;
        try {
          classifierResult = await H3t(siblingToolUses.length > 0 ? [...context.messages, ...siblingToolUses] : context.messages, classifierInput, context.options.tools, Mr(context), context.abortController.signal, {
            isSubagentLoop: rFe(context.agentId),
            recordPresumed: context.agentId === undefined
          });
        } finally {
          Exe(signal, toolUseId);
        }
        let classifierDecision = classifierResult.unavailable ? "unavailable" : classifierResult.shouldBlock ? "blocked" : "allowed",
          classifierCostUSD = classifierResult.usage && classifierResult.model ? YNe(classifierResult.model, classifierResult.usage) : undefined;
        if (PLo({
          tool: tool.name,
          allowlisted: false,
          decision: classifierDecision,
          classifierModel: classifierResult.model,
          inputTokens: classifierResult.usage?.inputTokens,
          outputTokens: classifierResult.usage?.outputTokens,
          cacheReadInputTokens: classifierResult.usage?.cacheReadInputTokens,
          cacheCreationInputTokens: classifierResult.usage?.cacheCreationInputTokens,
          durationMs: classifierResult.durationMs,
          costUSD: classifierCostUSD,
          stage: classifierResult.stage
        }), W("tengu_auto_mode_decision", {
          decision: Le(classifierDecision),
          toolName: Pi(tool.name),
          inProtectedNamespace: c5(),
          chromeAutomode: isChromeMcpTool,
          stripAllBashFlag: it("tengu_bash_allowlist_strip_all", false),
          originalDecisionReasonType: Bo(decision.decisionReason?.type),
          agentMsgId: agentMessage.message.id,
          sameTurnSiblings: siblingToolUses.length,
          classifierModel: classifierResult.model,
          consecutiveDenials: classifierResult.shouldBlock ? denialTracking.consecutiveDenials + 1 : 0,
          totalDenials: classifierResult.shouldBlock ? denialTracking.totalDenials + 1 : denialTracking.totalDenials,
          classifierInputTokens: classifierResult.usage?.inputTokens,
          classifierOutputTokens: classifierResult.usage?.outputTokens,
          classifierCacheReadInputTokens: classifierResult.usage?.cacheReadInputTokens,
          classifierCacheCreationInputTokens: classifierResult.usage?.cacheCreationInputTokens,
          classifierDurationMs: classifierResult.durationMs,
          classifierSystemPromptLength: classifierResult.promptLengths?.systemPrompt,
          classifierToolCallsLength: classifierResult.promptLengths?.toolCalls,
          classifierUserPromptsLength: classifierResult.promptLengths?.userPrompts,
          sessionInputTokens: tSt(),
          sessionOutputTokens: Yy(),
          sessionCacheReadInputTokens: nSt(),
          sessionCacheCreationInputTokens: rSt(),
          classifierCostUSD: classifierCostUSD,
          classifierStage: Bo(classifierResult.stage),
          classifierFailureMode: Bo(classifierResult.failureMode),
          classifierStage1InputTokens: classifierResult.stage1Usage?.inputTokens,
          classifierStage1OutputTokens: classifierResult.stage1Usage?.outputTokens,
          classifierStage1CacheReadInputTokens: classifierResult.stage1Usage?.cacheReadInputTokens,
          classifierStage1CacheCreationInputTokens: classifierResult.stage1Usage?.cacheCreationInputTokens,
          classifierStage1DurationMs: classifierResult.stage1DurationMs,
          classifierStage1RequestId: xr(classifierResult.stage1RequestId),
          classifierStage1MsgId: xr(classifierResult.stage1MsgId),
          classifierStage1CostUSD: classifierResult.stage1Usage && classifierResult.model ? YNe(classifierResult.model, classifierResult.stage1Usage) : undefined,
          classifierStage2InputTokens: classifierResult.stage2Usage?.inputTokens,
          classifierStage2OutputTokens: classifierResult.stage2Usage?.outputTokens,
          classifierStage2CacheReadInputTokens: classifierResult.stage2Usage?.cacheReadInputTokens,
          classifierStage2CacheCreationInputTokens: classifierResult.stage2Usage?.cacheCreationInputTokens,
          classifierStage2DurationMs: classifierResult.stage2DurationMs,
          classifierStage2RequestId: xr(classifierResult.stage2RequestId),
          classifierStage2MsgId: xr(classifierResult.stage2MsgId),
          classifierStage2CostUSD: classifierResult.stage2Usage && classifierResult.model ? YNe(classifierResult.model, classifierResult.stage2Usage) : undefined
        }), classifierResult.shouldBlock) {
          if (classifierResult.transcriptTooLong) {
            if (tool.name === ls) return {
              behavior: "allow",
              updatedInput: input,
              decisionReason: {
                type: "mode",
                mode: "auto"
              }
            };
            if (permissionContext.shouldAvoidPermissionPrompts) throw new $c("Agent aborted: auto mode classifier transcript exceeded context window in headless mode");
            if (A("Auto mode classifier transcript too long, falling back to normal permission handling", {
              level: "warn"
            }), W("tengu_auto_mode_fallback_to_ask", {
              reason: Ve("transcript_too_long"),
              toolName: Pi(tool.name)
            }), mode === "dontAsk") return {
              behavior: "deny",
              decisionReason: {
                type: "mode",
                mode: "dontAsk"
              },
              message: SQn(tool.name)
            };
            return {
              ...decision,
              decisionReason: {
                type: "other",
                reason: URt
              }
            };
          }
          if (classifierResult.unavailable) return A("Auto mode classifier unavailable, denying with retry guidance (fail closed)", {
            level: "warn"
          }), {
            behavior: "deny",
            decisionReason: {
              type: "classifier",
              classifier: "auto-mode",
              reason: X1e
            },
            message: a6l(tool.name, classifierResult.model, classifierResult.httpStatus, classifierResult.errorKind)
          };
          let incremented = Kil(denialTracking);
          setDenialTracking(context, incremented), A(`Auto mode classifier blocked action: ${classifierResult.reason}`, {
            level: "warn"
          });
          let limitDecision = handleClassifierDenialLimit(incremented, classifierResult.reason, agentMessage, tool, decision, context);
          if (limitDecision) {
            if (mode === "dontAsk") return {
              behavior: "deny",
              decisionReason: {
                type: "mode",
                mode: "dontAsk"
              },
              message: SQn(tool.name)
            };
            return limitDecision;
          }
          return {
            behavior: "deny",
            decisionReason: {
              type: "classifier",
              classifier: "auto-mode",
              reason: classifierResult.reason
            },
            message: i6l(classifierResult.reason)
          };
        }
        let reset = b5t(denialTracking);
        return setDenialTracking(context, reset), {
          behavior: "allow",
          updatedInput: decision.updatedInput ?? input,
          decisionReason: {
            type: "classifier",
            classifier: "auto-mode",
            reason: classifierResult.reason
          }
        };
      }
      let permissionContext3 = Mr(context);
      if (permissionContext3.shouldAvoidPermissionPrompts) {
        let hookDecision = await runPermissionRequestHooksForHeadless(tool, decision.updatedInput ?? input, toolUseId, context, n3e(tool, permissionContext3), decision.suggestions);
        if (hookDecision) return hookDecision;
        return {
          behavior: "deny",
          decisionReason: {
            type: "asyncAgent",
            reason: "Permission prompts are not available in this context"
          },
          message: s6l(tool.name)
        };
      }
    }
    return decision;
  };
var ly = b(() => {
  npe();
  toe();
  T0();
  fg();
  A5e();
  jN();
  H1();
  qe();
  Ct();
  vn();
  Uh();
  wm();
  lr();
  yQn();
  Vql();
  fqn();
  IDn();
  FS();
  Sw();
  gA();
  Cae();
  lt();
  jn();
  kt();
  vu();
  QT();
  xl();
  AR();
  dn();
  Wd();
  po();
  h7();
  tn();
  Op();
  Hbo();
  gye();
  OLo = (Zql(), oo(Qql)), wIm = (bte(), oo(lce)), kIm = (bgo(), oo(Sgo)), PERMISSION_RULE_SOURCES = [...fA, "cliArg", "command", "session", "toolsNarrowing", "mcpServerPolicy"];
});

export {Gul,permissionRuleSourceDisplayString,isAutoModeForPermissions as n6l,getAllowRules,createPermissionRequestMessage as dp,collectRulesFromSources as MLo,getDenyRules,getAskRules,matchesToolRule as NLo,toolAlwaysAllowedRule,allowsProxyExpansion as BLo,getDenyRuleForTool,getAskRuleForTool,getInputParamRule,getDenyRuleForAgent,filterDeniedAgents,getRuleByContentsForTool,getRuleByContentsForToolName,guardHookUpdatedInput,runPermissionRequestHooksForHeadless as HIm,isSameTurnSiblingContextEnabled as IIm,setDenialTracking as x_t,handleClassifierDenialLimit as DIm,isAskRuleDecision as bQn,isMcpServerPolicyAskRule as PIm,isPlanModeReason as r6l,checkRuleBasedPermissions,evaluateToolPermissions as OIm,deletePermissionRule,buildRuleUpdateOperations as o6l,applyPermissionRulesToPermissionContext,syncPermissionRulesFromDisk,resolveUpdatedInput as e6l,findSafetyCheckReason as o6,OLo,wIm,kIm,ORG_REQUIRES_APPROVAL_REASON as t6l,PERMISSION_RULE_SOURCES,hasPermissionsToUseTool,hasPermissionsToUseToolWithSink,resolveToolPermission as xIm,ly};
