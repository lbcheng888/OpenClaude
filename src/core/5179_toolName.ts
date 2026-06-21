// @ts-nocheck
import {CR as ER,u8 as Vj} from "../../vendor/m637.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {iU as ZF,rb as eb} from "../permissions/5178_level.ts";
import {Wc as jc} from "../api/3868_level.ts";
import {Af as yf,S_ as y_} from "../agent/1454_agentType.ts";
import {sN as J1,fP as mP} from "../api/2741_actualTokens.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function IaK(config) {
  let {
      toolName: toolName,
      policySpec: policySpec,
      eventName: eventName,
      querySource: querySource,
      preCheck: preCheck
    } = config,
    detector = ER((command, signal, isNonInteractiveSession) => {
      let pending = detectCommandPrefix(command, signal, isNonInteractiveSession, toolName, policySpec, eventName, querySource, preCheck);
      return pending.catch(() => {
        if (detector.cache.get(command) === pending) detector.cache.delete(command);
      }), pending;
    }, command => command, 200);
  return detector;
}
function xaK(detectPrefix, splitSubcommands) {
  let detector = ER((command, signal, isNonInteractiveSession) => {
    let pending = detectCommandWithSubcommandPrefixes(command, signal, isNonInteractiveSession, detectPrefix, splitSubcommands);
    return pending.catch(() => {
      if (detector.cache.get(command) === pending) detector.cache.delete(command);
    }), pending;
  }, command => command, 200);
  return detector;
}
async function detectCommandPrefix(command, signal, isNonInteractiveSession, toolName, policySpec, eventName, querySource, preCheck) {
  if (preCheck) {
    let preCheckResult = preCheck(command);
    if (preCheckResult !== null) return preCheckResult;
  }
  let slowWarningTimer,
    startTime = Date.now(),
    result = null;
  try {
    slowWarningTimer = setTimeout((toolNameArg, isNonInteractiveArg) => {
      let warningMessage = `[${toolNameArg}Tool] Pre-flight check is taking longer than expected. Run with ANTHROPIC_LOG=debug to check for failed or slow API requests.`;
      if (isNonInteractiveArg) process.stderr.write(Oe({
        level: "warn",
        message: warningMessage
      }) + `
`);else console.warn(gt.yellow(`\u26A0\uFE0F  ${warningMessage}`));
    }, 1e4, toolName, isNonInteractiveSession);
    let response = await ZF({
      systemPrompt: jc([`Your task is to process ${toolName} commands that an AI coding agent wants to run.

${policySpec}`]),
      userPrompt: `Command: ${command}`,
      signal: signal,
      options: {
        enablePromptCaching: true,
        querySource: querySource,
        agents: [],
        isNonInteractiveSession: isNonInteractiveSession,
        hasAppendSystemPrompt: false,
        mcpTools: [],
        agentContext: yf()
      }
    });
    clearTimeout(slowWarningTimer);
    let durationMs = Date.now() - startTime,
      responseText = typeof response.message.content === "string" ? response.message.content : Array.isArray(response.message.content) ? response.message.content.find(block => block.type === "text")?.text ?? "none" : "none";
    if (J1(responseText)) j(eventName, {
      success: false,
      error: Qe("API error"),
      durationMs: durationMs
    }), result = null;else if (responseText === "command_injection_detected") j(eventName, {
      success: false,
      error: Qe("command_injection_detected"),
      durationMs: durationMs
    }), result = {
      commandPrefix: null
    };else if (responseText === "git" || DANGEROUS_SHELL_PREFIXES.has(responseText.toLowerCase())) j(eventName, {
      success: false,
      error: Qe("dangerous_shell_prefix"),
      durationMs: durationMs
    }), result = {
      commandPrefix: null
    };else if (responseText === "none") j(eventName, {
      success: false,
      error: Qe('prefix "none"'),
      durationMs: durationMs
    }), result = {
      commandPrefix: null
    };else if (!command.startsWith(responseText)) j(eventName, {
      success: false,
      error: Qe("command did not start with prefix"),
      durationMs: durationMs
    }), result = {
      commandPrefix: null
    };else j(eventName, {
      success: true,
      durationMs: durationMs
    }), result = {
      commandPrefix: responseText
    };
    return result;
  } catch (error) {
    throw clearTimeout(slowWarningTimer), error;
  }
}
async function detectCommandWithSubcommandPrefixes(command, signal, isNonInteractiveSession, detectPrefix, splitSubcommands) {
  let subcommands = await splitSubcommands(command),
    [topLevelResult, ...subcommandResults] = await Promise.all([detectPrefix(command, signal, isNonInteractiveSession), ...subcommands.map(async subcommand => ({
      subcommand: subcommand,
      prefix: await detectPrefix(subcommand, signal, isNonInteractiveSession)
    }))]);
  if (!topLevelResult) return null;
  let subcommandPrefixes = subcommandResults.reduce((map, {
    subcommand: subcommand,
    prefix: prefix
  }) => {
    if (prefix) map.set(subcommand, prefix);
    return map;
  }, new Map());
  return {
    ...topLevelResult,
    subcommandPrefixes: subcommandPrefixes
  };
}
var DANGEROUS_SHELL_PREFIXES;
var uaK = b(() => {
  au();
  Ct();
  eb();
  mP();
  y_();
  Vj();
  Xt();
  DANGEROUS_SHELL_PREFIXES = new Set(["sh", "bash", "zsh", "fish", "csh", "tcsh", "ksh", "dash", "cmd", "cmd.exe", "powershell", "powershell.exe", "pwsh", "pwsh.exe", "bash.exe"]);
});

export {IaK as VNl,xaK as KNl,detectCommandPrefix as $Tm,detectCommandWithSubcommandPrefixes as qTm,DANGEROUS_SHELL_PREFIXES as UTm,uaK as zNl};
