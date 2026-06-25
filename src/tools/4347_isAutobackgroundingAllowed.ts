// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Sf,Imt,Kel,X5n} from "../../vendor/m4337.ts";
import {ptl,ftl,mtl} from "../../vendor/m4343.ts";
import {M$n,q$n,F$n,$$n,U$n,N$n,X9t,B$n} from "../telemetry/3921_mediaType.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {s8n,g6t,gtl,htl} from "../config/4345_gtl.ts";
import {LW,oIe,rBt} from "../../vendor/m3272.ts";
import {Xae,KO} from "../agent/3295_code.ts";
import {buildDefaultSystemPromptSections as mL,A5e} from "../../vendor/m5213.ts";
import {allTools as R_,sp,Ce,Ct,Ta,XL} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Kxe,a8n,l8n,Dmt,i8n,c8n,vG} from "../../vendor/m4362.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {My,T3e} from "../../vendor/m3275.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {Yxe,Eqt} from "../config/4333_onBackground.ts";
import {Qr} from "../../vendor/m323.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {Lit,eBt} from "../../vendor/m3270.ts";
import {Ir} from "../../vendor/m584.ts";
import {Xo} from "../../vendor/m240.ts";
import {t1,gg} from "../telemetry/2542_ignore1mTag.ts";
import {o9e,A1t,TW} from "../../vendor/m2790.ts";
import {OPn,tBt} from "../config/3272_name.ts";
import {Yae,r_e,ex} from "../config/3274_errors.ts";
import {lIe,xI} from "../../vendor/m3295.ts";
import {qit,hB} from "../../vendor/m3296.ts";
import {Zm,ws,Yc} from "../config/2709_Zm.ts";
import {lr,Gbt} from "../../vendor/m233.ts";
import {wE,gf} from "../../vendor/m5177.ts";
import {rHe,T1} from "../../vendor/m2813.ts";
import {HI,YNt,zst,BHe,qge,jNt} from "../telemetry/3173_error.ts";
import {dm,vs} from "../../vendor/m2256.ts";
import {qz,v4} from "../telemetry/2700_qz.ts";
import {iat,HOn,DOn,sat} from "../telemetry/3329_prNumber.ts";
import {kel,wel,Rel,vel} from "../../vendor/m4333.ts";
import {AOn,RBt} from "../../vendor/m3322.ts";
import {Ctl,ytl,Ttl,Stl,btl,Etl} from "../../vendor/m4345.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {oe} from "../../vendor/m2275.ts";
import {Ne} from "../../vendor/m583.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
import {DD} from "../telemetry/2792_eventName.ts";
/**
 * PowerShell tool module (Windows).
 *
 * Exports:
 *  - {@link isAutobackgroundingAllowed} — whether a command may be auto-backgrounded.
 *  - {@link detectBlockedSleepPattern} — detect Start-Sleep/sleep patterns that are blocked.
 *  - {@link PowerShellTool} — the tool definition (execution, permissions, rendering).
 *
 * Internal helpers classify commands as search/read and map them to telemetry
 * command-type buckets. The async generator `qqp` drives a single PowerShell
 * invocation: streaming progress, optional sandboxing, timeout, and the
 * auto-background / explicit-background / user-background lifecycle.
 */
var moduleExports = {};
ft(moduleExports, {
  isAutobackgroundingAllowed: () => isAutobackgroundingAllowed,
  detectBlockedSleepPattern: () => detectBlockedSleepPattern,
  PowerShellTool: () => PowerShellTool
});
/**
 * Classify a PowerShell command line as a search and/or read operation.
 * Splits on `;` / `|` segment separators; each segment's first token is
 * normalized and matched against the known search / read / passthrough sets.
 * Any unrecognized command yields neither (conservatively non-search/non-read).
 */
function classifySearchOrRead(commandLine: string): { isSearch: boolean; isRead: boolean } {
  let trimmedCommand = commandLine.trim();
  if (!trimmedCommand) return {
    isSearch: !1,
    isRead: !1
  };
  let segments = trimmedCommand.split(/\s*[;|]\s*/).filter(Boolean);
  if (segments.length === 0) return {
    isSearch: !1,
    isRead: !1
  };
  let sawSearch = !1,
    sawRead = !1,
    sawClassifiableCommand = !1;
  for (let segment of segments) {
    let leadingToken = segment.trim().split(/\s+/)[0];
    if (!leadingToken) continue;
    let normalizedToken = Sf(leadingToken);
    if (Lqp.has(normalizedToken)) continue;
    sawClassifiableCommand = !0;
    let isSearchCommand = Pqp.has(normalizedToken),
      isReadCommand = Oqp.has(normalizedToken);
    if (!isSearchCommand && !isReadCommand) return {
      isSearch: !1,
      isRead: !1
    };
    if (isSearchCommand) sawSearch = !0;
    if (isReadCommand) sawRead = !0;
  }
  if (!sawClassifiableCommand) return {
    isSearch: !1,
    isRead: !1
  };
  return {
    isSearch: sawSearch,
    isRead: sawRead
  };
}
/**
 * Whether the given command line is eligible to be auto-backgrounded.
 * Returns false if a quick prior check (`ptl`) blocks it, or if the leading
 * command is in the non-backgroundable list (`Fqp`, e.g. sleep commands).
 */
async function isAutobackgroundingAllowed(commandLine: string): Promise<boolean> {
  if (await ptl(commandLine)) return !1;
  let leadingToken = commandLine.trim().split(/\s+/)[0];
  if (!leadingToken) return !0;
  let normalizedToken = Sf(leadingToken);
  return !Fqp.includes(normalizedToken);
}
/**
 * Detect a blocked standalone/leading Start-Sleep (or sleep) whose duration is
 * at or above the policy threshold (`M$n`). Returns a human-readable description
 * of the offending pattern, or null when nothing is blocked.
 */
function detectBlockedSleepPattern(commandLine: string): string | null {
  let firstStatement = commandLine.trim().split(/[;|&\r\n]/)[0]?.trim() ?? "",
    sleepMatch = /^(?:start-sleep|sleep)(?:\s+-s(?:econds)?)?\s+(\d+(?:\.\d*)?)\s*$/i.exec(firstStatement);
  if (!sleepMatch) return null;
  let sleepSeconds = parseFloat(sleepMatch[1]);
  if (sleepSeconds < M$n) return null;
  let remainder = commandLine.trim().slice(firstStatement.length).replace(/^[\s;|&]+/, "");
  return remainder ? `Start-Sleep ${sleepSeconds} followed by: ${remainder}` : `standalone Start-Sleep ${sleepSeconds}`;
}
/**
 * True when running on native Windows with enterprise sandboxing required by
 * policy but unavailable (so shell execution must be blocked).
 */
function isWindowsSandboxRequiredButUnavailable(): boolean {
  return Yt() === "windows" && xo.isSandboxEnabledInSettings() && xo.isPlatformInEnabledList() && !xo.areUnsandboxedCommandsAllowed();
}
/**
 * Map a command line to a telemetry command-type bucket. Matches the leading
 * token (case-insensitively) against the known list (`$qp`); falls back to
 * the "other" bucket.
 */
function classifyCommandType(commandLine: string) {
  let leadingToken = commandLine.trim().split(/\s+/)[0] || "";
  for (let knownCommand of $qp) if (leadingToken.toLowerCase() === knownCommand.toLowerCase()) return Le(knownCommand);
  return Ve("other");
}
/**
 * Drive a single PowerShell command invocation.
 *
 * Yields `progress` events while running and returns the final result. Handles
 * sandboxing, timeouts, output persistence, and the three backgrounding paths:
 * auto-background (timeout/interrupt), explicit `run_in_background`, and
 * user-initiated background (Ctrl+B).
 */
async function* runPowerShellCommand({
  input: input,
  abortController: abortController,
  taskRegistry: taskRegistry,
  setToolJSX: setToolJSX,
  emitToolProgress: emitToolProgress,
  preventCwdChanges: preventCwdChanges,
  isMainThread: isMainThread,
  toolUseId: toolUseId,
  agentId: agentId,
  sessionEnvVars: sessionEnvVars
}) {
  let {
      command: command,
      description: description,
      timeout: timeout,
      run_in_background: runInBackground,
      dangerouslyDisableSandbox: dangerouslyDisableSandbox
    } = input,
    effectiveTimeout = Math.min(timeout || s8n(), g6t()),
    fullOutput = "",
    output = "",
    totalLines = 0,
    totalBytes = 0,
    backgroundTaskId = void 0,
    interrupted = !1,
    resolveBackgroundReady = null;
  /** Returns a promise that resolves (with null) once a background task id is assigned. */
  function waitForBackgroundReady() {
    return new Promise(resolve => {
      resolveBackgroundReady = () => resolve(null);
    });
  }
  let autoBackgroundAllowed = !_6t && (await isAutobackgroundingAllowed(command));
  if (!(await LW())) return {
    stdout: "",
    stderr: "PowerShell is not available on this system.",
    code: 0,
    interrupted: !1
  };
  let shellExecution;
  try {
    shellExecution = await Xae(command, abortController.signal, "powershell", {
      timeout: effectiveTimeout,
      onProgress(nextOutput, nextFullOutput, nextTotalLines, nextTotalBytes, hasBytes) {
        output = nextOutput, fullOutput = nextFullOutput, totalLines = nextTotalLines, totalBytes = hasBytes ? nextTotalBytes : 0;
      },
      preventCwdChanges: preventCwdChanges,
      shouldUseSandbox: Yt() === "windows" ? !1 : mL({
        command: command,
        dangerouslyDisableSandbox: dangerouslyDisableSandbox
      }),
      shouldAutoBackground: autoBackgroundAllowed,
      sessionEnvVars: sessionEnvVars
    });
  } catch (execError) {
    if (R_(execError)) return {
      stdout: "",
      stderr: "Command aborted before execution",
      code: 145,
      interrupted: !0
    };
    if (sp(execError)) return A(`PowerShellTool: exec spawn failed: ${execError}`), {
      stdout: "",
      stderr: `Failed to execute PowerShell command: ${Ce(execError)}`,
      code: 0,
      interrupted: !1
    };
    return Ie(execError), {
      stdout: "",
      stderr: `Failed to execute PowerShell command: ${Ce(execError)}`,
      code: 0,
      interrupted: !1
    };
  }
  let resultPromise = shellExecution.result;
  /** Register this command as a background task and resolve to its task id. */
  async function registerBackgroundTask() {
    return (await Kxe({
      command: command,
      description: description || command,
      shellCommand: shellExecution,
      toolUseId: toolUseId,
      agentId: agentId
    }, {
      abortController: abortController,
      taskRegistry: taskRegistry
    })).taskId;
  }
  /**
   * Move the current command to the background, emitting the given telemetry
   * event. If a pending user-background already exists, reuse it; otherwise
   * register a fresh background task.
   */
  function moveToBackground(telemetryEvent, onBackgrounded?) {
    if (pendingUserBackgroundId) {
      if (!a8n(pendingUserBackgroundId, shellExecution, description || command, taskRegistry, toolUseId)) return;
      backgroundTaskId = pendingUserBackgroundId, W(telemetryEvent, {
        command_type: classifyCommandType(command)
      }), onBackgrounded?.(pendingUserBackgroundId);
      return;
    }
    registerBackgroundTask().then(newTaskId => {
      backgroundTaskId = newTaskId;
      let pendingResolve = resolveBackgroundReady;
      if (pendingResolve) resolveBackgroundReady = null, pendingResolve();
      if (W(telemetryEvent, {
        command_type: classifyCommandType(command)
      }), onBackgrounded) onBackgrounded(newTaskId);
    });
  }
  if (shellExecution.onTimeout && autoBackgroundAllowed) shellExecution.onTimeout(onBackgrounded => {
    moveToBackground("tengu_powershell_command_timeout_backgrounded", onBackgrounded);
  });
  if (runInBackground === !0 && !_6t) {
    let explicitBackgroundTaskId = await registerBackgroundTask();
    return W("tengu_powershell_command_explicitly_backgrounded", {
      command_type: classifyCommandType(command)
    }), {
      stdout: "",
      stderr: "",
      code: 0,
      interrupted: !1,
      backgroundTaskId: explicitBackgroundTaskId
    };
  }
  My.startPolling(shellExecution.taskOutput.taskId);
  let startTime = Date.now(),
    nextProgressDeadline = startTime + Rtl,
    pendingUserBackgroundId = void 0,
    lastResult = null;
  try {
    while (!0) {
      let now = Date.now(),
        remainingUntilDeadline = Math.max(0, nextProgressDeadline - now),
        backgroundReadyPromise = waitForBackgroundReady(),
        racedResult = await Promise.race([resultPromise, new Promise(resolve => setTimeout(timeoutResolve => timeoutResolve(null), remainingUntilDeadline, resolve).unref()), backgroundReadyPromise]);
      if (racedResult !== null) {
        if (lastResult = racedResult, racedResult.backgroundTaskId !== void 0) {
          if (l8n(racedResult.backgroundTaskId, racedResult, taskRegistry)) hf(racedResult.backgroundTaskId, Dmt(racedResult), {
            toolUseId: toolUseId,
            summary: description || command
          });
          let backgroundResult = {
              ...racedResult,
              backgroundTaskId: void 0
            },
            {
              taskOutput: taskOutput
            } = shellExecution;
          if (taskOutput.stdoutToFile && !taskOutput.outputFileRedundant) backgroundResult.outputFilePath = taskOutput.path, backgroundResult.outputFileSize = taskOutput.outputFileSize, backgroundResult.outputTaskId = taskOutput.taskId;
          return backgroundResult;
        }
        return racedResult;
      }
      if (backgroundTaskId) return {
        stdout: interrupted ? fullOutput : "",
        stderr: "",
        code: 0,
        interrupted: !1,
        backgroundTaskId: backgroundTaskId
      };
      if (abortController.signal.aborted && abortController.signal.reason === "interrupt" && !interrupted) {
        if (interrupted = !0, autoBackgroundAllowed) {
          moveToBackground("tengu_powershell_command_interrupt_backgrounded");
          continue;
        }
        shellExecution.kill();
      }
      if (pendingUserBackgroundId) {
        if (shellExecution.status === "backgrounded") return {
          stdout: "",
          stderr: "",
          code: 0,
          interrupted: !1,
          backgroundTaskId: pendingUserBackgroundId,
          backgroundedByUser: !0
        };
      }
      let elapsedMs = Date.now() - startTime,
        elapsedSeconds = Math.floor(elapsedMs / 1000);
      if (!_6t && backgroundTaskId === void 0 && elapsedSeconds >= Rtl / 1000) {
        if (!pendingUserBackgroundId) pendingUserBackgroundId = i8n({
          command: command,
          description: description || command,
          shellCommand: shellExecution,
          agentId: agentId
        }, taskRegistry, toolUseId);
        if (setToolJSX?.({
          jsx: xtl.jsx(Yxe, {}),
          shouldHidePromptInput: !1,
          shouldContinueAnimation: !0,
          showSpinner: !0
        }), toolUseId) emitToolProgress?.({
          kind: "background_hint",
          toolUseId: toolUseId
        });
      }
      yield {
        type: "progress",
        fullOutput: fullOutput,
        output: output,
        elapsedTimeSeconds: elapsedSeconds,
        totalLines: totalLines,
        totalBytes: totalBytes,
        taskId: shellExecution.taskOutput.taskId,
        ...(timeout ? {
          timeoutMs: effectiveTimeout
        } : void 0)
      }, nextProgressDeadline = Date.now() + Nqp;
    }
  } finally {
    if (My.stopPolling(shellExecution.taskOutput.taskId), !backgroundTaskId && shellExecution.status !== "backgrounded") {
      if (pendingUserBackgroundId) c8n(pendingUserBackgroundId, lastResult ? Dmt(lastResult) : "stopped", taskRegistry);
      shellExecution.cleanup();
    }
  }
}
var pDe,
  xtl,
  outputTrailingNewline = `
`,
  Pqp,
  Oqp,
  Lqp,
  Rtl = 2000,
  Nqp = 1000,
  Fqp,
  windowsSandboxBlockedMessage = "Enterprise policy requires sandboxing, but sandboxing is not available on native Windows. Shell command execution is blocked on this platform by policy.",
  _6t,
  ktl,
  Bqp,
  Uqp,
  $qp,
  PowerShellTool;
var Upt = b(() => {
  Qr();
  kt();
  ri();
  vG();
  Lit();
  qe();
  Ir();
  Ct();
  Xo();
  vn();
  t1();
  o9e();
  Es();
  OPn();
  Yae();
  KO();
  Uh();
  RE();
  lIe();
  qit();
  oIe();
  Zm();
  lr();
  wE();
  T3e();
  rHe();
  HI();
  A5e();
  Eqt();
  q$n();
  dm();
  qz();
  iat();
  kel();
  AOn();
  ftl();
  gtl();
  Imt();
  Ctl();
  xl();
  pDe = require("fs/promises"), xtl = x(oe(), 1), Pqp = new Set(["select-string", "get-childitem", "findstr", "where.exe"]), Oqp = new Set(["get-content", "get-item", "test-path", "resolve-path", "get-process", "get-service", "get-childitem", "get-location", "get-filehash", "get-acl", "format-hex"]), Lqp = new Set(["write-output", "write-host"]);
  Fqp = ["start-sleep", "sleep"];
  _6t = Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS, ktl = ve(() => C.strictObject({
    command: C.string().describe("The PowerShell command to execute"),
    timeout: hB(C.number().optional()).describe(`Optional timeout in milliseconds (max ${g6t()})`),
    description: C.string().optional().describe("Clear, concise description of what this command does in active voice."),
    run_in_background: xI(C.boolean().optional()).describe("Set to true to run this command in the background."),
    dangerouslyDisableSandbox: xI(C.boolean().optional()).describe("Set this to true to dangerously override sandbox mode and run commands without sandboxing.")
  })), Bqp = ve(() => _6t ? ktl().omit({
    run_in_background: !0
  }) : ktl()), Uqp = ve(() => C.object({
    stdout: C.string().describe("The standard output of the command"),
    stderr: C.string().describe("The standard error output of the command"),
    interrupted: C.boolean().describe("Whether the command was interrupted"),
    returnCodeInterpretation: C.string().optional().describe("Semantic interpretation for non-error exit codes with special meaning"),
    isImage: C.boolean().optional().describe("Flag to indicate if stdout contains image data"),
    persistedOutputPath: C.string().optional().describe("Path to persisted full output when too large for inline"),
    persistedOutputSize: C.number().optional().describe("Total output size in bytes when persisted"),
    backgroundTaskId: C.string().optional().describe("ID of the background task if command is running in background"),
    backgroundedByUser: C.boolean().optional().describe("True if the user manually backgrounded the command with Ctrl+B"),
    gitOperation: HOn().optional().describe("@internal Structured classification of git/gh operations detected in this command (commit/push/merge/rebase/PR). Client-facing — lets clients render git activity without re-parsing stdout; not surfaced to the model.")
  })), $qp = ["npm", "yarn", "pnpm", "node", "python", "python3", "go", "cargo", "make", "docker", "terraform", "webpack", "vite", "jest", "pytest", "curl", "Invoke-WebRequest", "build", "test", "serve", "watch", "dev"];
  PowerShellTool = Ks({
    name: ws,
    ruleContentField: "command",
    searchHint: "execute Windows PowerShell commands",
    maxResultSizeChars: 30000,
    strict: !0,
    async description({
      description: description
    }) {
      return description || "Run PowerShell command";
    },
    async prompt() {
      return htl();
    },
    isConcurrencySafe(input) {
      return this.isReadOnly?.(input) ?? !1;
    },
    isSearchOrReadCommand(input) {
      if (!input?.command) return {
        isSearch: !1,
        isRead: !1
      };
      return classifySearchOrRead(input.command);
    },
    isReadOnly(input) {
      if (Kel(input.command)) return !1;
      return X5n(input.command);
    },
    toAutoClassifierInput(input) {
      return input.command;
    },
    async preparePermissionMatcher({
      command: command
    }) {
      let parsed = await r_e(command);
      if (!parsed.valid) return () => !0;
      let candidateMatchers = ex(parsed).flatMap(parsedCommand => {
        let rawForm = [parsedCommand.name, ...parsedCommand.args].join(" "),
          normalizedForm = [Sf(parsedCommand.name), ...parsedCommand.args].join(" ");
        return rawForm.toLowerCase() === normalizedForm ? [rawForm] : [rawForm, normalizedForm];
      });
      return rule => {
        let ruleCommand = A1t(rule);
        return candidateMatchers.some(candidate => {
          if (ruleCommand !== null) {
            let ruleLower = ruleCommand.toLowerCase(),
              candidateLower = candidate.toLowerCase();
            return candidateLower === ruleLower || candidateLower.startsWith(`${ruleLower} `);
          }
          return TW(rule, candidate, !0, !0);
        });
      };
    },
    get inputSchema() {
      return Bqp();
    },
    get outputSchema() {
      return Uqp();
    },
    userFacingName() {
      return "PowerShell";
    },
    getToolUseSummary(input) {
      if (!input?.command) return null;
      let {
        command: command,
        description: description
      } = input;
      if (description) return description;
      return Ha(command, DD);
    },
    getActivityDescription(input) {
      if (!input?.command) return "Running command";
      return `Running ${input.description ?? Ha(input.command, DD)}`;
    },
    isEnabled() {
      return !0;
    },
    async validateInput(input) {
      if (isWindowsSandboxRequiredButUnavailable()) return {
        result: !1,
        message: windowsSandboxBlockedMessage,
        errorCode: 11
      };
      if (v4() && Yc() && !_6t && !input.run_in_background) {
        let blockedSleep = detectBlockedSleepPattern(input.command);
        if (blockedSleep !== null) return {
          result: !1,
          message: `Blocked: ${blockedSleep}. To wait for a condition, use Monitor with an until-loop (e.g. \`until <check>; do sleep 2; done\` — Monitor runs bash). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.`,
          errorCode: 10
        };
      }
      return {
        result: !0
      };
    },
    async checkPermissions(input, context) {
      return await mtl(input, context);
    },
    renderToolUseMessage: ytl,
    renderToolUseProgressMessage: Ttl,
    renderToolUseQueuedMessage: Stl,
    renderToolResultMessage: btl,
    renderToolUseErrorMessage: Etl,
    mapToolResultToToolResultBlockParam({
      interrupted: interrupted,
      stdout: stdout,
      stderr: stderr,
      isImage: isImage,
      persistedOutputPath: persistedOutputPath,
      persistedOutputSize: persistedOutputSize,
      backgroundTaskId: backgroundTaskId,
      backgroundedByUser: backgroundedByUser
    }, toolUseId) {
      if (isImage) {
        let imageBlock = F$n(stdout, toolUseId);
        if (imageBlock) return imageBlock;
      }
      let stdoutContent = stdout;
      if (persistedOutputPath) {
        let cleanedStdout = stdout ? stdout.replace(/^(\s*\n)+/, "").trimEnd() : "",
          previewResult = YNt(cleanedStdout, zst);
        stdoutContent = BHe({
          filepath: persistedOutputPath,
          originalSize: persistedOutputSize ?? 0,
          isJson: !1,
          preview: previewResult.preview,
          hasMore: previewResult.hasMore
        });
      } else if (stdout) stdoutContent = stdout.replace(/^(\s*\n)+/, ""), stdoutContent = stdoutContent.trimEnd();
      let stderrContent = stderr.trim();
      if (interrupted) {
        if (stderr) stderrContent += outputTrailingNewline;
        stderrContent += "<error>Command was aborted before completion</error>";
      }
      let backgroundNotice = "";
      if (backgroundTaskId) {
        let outputPath = gf(backgroundTaskId);
        if (backgroundedByUser) backgroundNotice = `Command was manually backgrounded by user with ID: ${backgroundTaskId}. Output is being written to: ${outputPath}`;else backgroundNotice = `Command running in background with ID: ${backgroundTaskId}. Output is being written to: ${outputPath}. You will be notified when it completes. To check interim output, use ${vs} on that file path.`;
      }
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: [stdoutContent, stderrContent, backgroundNotice].filter(Boolean).join(`
`),
        is_error: interrupted
      };
    },
    async call(input, context, _unused, _unused2, onProgressEvent) {
      if (isWindowsSandboxRequiredButUnavailable()) throw Error(windowsSandboxBlockedMessage);
      let {
          abortController: abortController,
          setToolJSX: setToolJSX,
          emitToolProgress: emitToolProgress
        } = context,
        isMainThread = !context.agentId,
        progressIndex = 0;
      try {
        let commandRunner = runPowerShellCommand({
            input: input,
            abortController: abortController,
            taskRegistry: context.taskRegistry,
            setToolJSX: setToolJSX,
            emitToolProgress: emitToolProgress,
            preventCwdChanges: !isMainThread,
            isMainThread: isMainThread,
            toolUseId: context.toolUseId,
            agentId: context.agentId,
            sessionEnvVars: context.sessionEnvVars
          }),
          iterStep;
        do if (iterStep = await commandRunner.next(), !iterStep.done && onProgressEvent) {
          let progressValue = iterStep.value;
          onProgressEvent({
            type: "progress",
            toolUseID: `ps-progress-${progressIndex++}`,
            data: {
              type: "powershell_progress",
              output: progressValue.output,
              fullOutput: progressValue.fullOutput,
              elapsedTimeSeconds: progressValue.elapsedTimeSeconds,
              totalLines: progressValue.totalLines,
              totalBytes: progressValue.totalBytes,
              timeoutMs: progressValue.timeoutMs,
              taskId: progressValue.taskId
            }
          });
        } while (!iterStep.done);
        let finalResult = iterStep.value,
          isEmptyErrorResult = finalResult.code === 0 && !finalResult.stdout && finalResult.stderr && !finalResult.backgroundTaskId;
        if (!isEmptyErrorResult) DOn(input.command, finalResult.code, finalResult.stdout);
        let interruptedByUser = finalResult.interrupted && abortController.signal.reason === "interrupt",
          interruptedOrCanceled = finalResult.interrupted && (abortController.signal.reason === "interrupt" || abortController.signal.reason === "user-cancel" || abortController.signal.reason === "remote-cancel"),
          mainThreadHint = "";
        if (isMainThread) {
          if ($$n(Mr(context))) mainThreadHint = U$n("");
        }
        if (finalResult.backgroundTaskId) {
          let strippedBackground = eBt(finalResult.stdout || "", input.command);
          if (isMainThread && strippedBackground.hints.length > 0) for (let hint of strippedBackground.hints) tBt(hint);
          return {
            data: {
              stdout: strippedBackground.stripped,
              stderr: [finalResult.stderr || "", mainThreadHint].filter(Boolean).join(`
`),
              interrupted: !1,
              backgroundTaskId: finalResult.backgroundTaskId,
              backgroundedByUser: finalResult.backgroundedByUser
            }
          };
        }
        let outputBuffer = new Gbt(),
          trimmedStdout = (finalResult.stdout || "").trimEnd();
        outputBuffer.append(trimmedStdout + outputTrailingNewline);
        let returnCodeInfo = wel(input.command, finalResult.code, trimmedStdout, finalResult.stderr || ""),
          processedStdout = N$n(outputBuffer.toString()),
          strippedHints = eBt(processedStdout, input.command);
        if (processedStdout = strippedHints.stripped, isMainThread && strippedHints.hints.length > 0) for (let hint of strippedHints.hints) tBt(hint);
        if (finalResult.preSpawnError) throw new Ta(finalResult.preSpawnError, "PowerShell: pre-spawn error (cwd/argv redacted)");
        if (returnCodeInfo.isError && !interruptedByUser) {
          let truncatedStdout = trimmedStdout.length <= 8192 ? trimmedStdout : trimmedStdout.slice(0, 4096) + trimmedStdout.slice(-4096),
            errorClass = Rel(truncatedStdout);
          throw W("tengu_powershell_tool_command_failed", {
            command_type: classifyCommandType(input.command),
            exit_code: finalResult.code,
            stdout_length: trimmedStdout.length,
            error_class: errorClass,
            not_recognized_kind: errorClass === "not_recognized" || errorClass === "command_not_found" ? Le(vel(truncatedStdout) ?? "unextracted") : void 0,
            powershell_edition: Le((await rBt()) ?? "unknown"),
            destructive_category: Le(RBt(input.command) ?? "none"),
            permission_mode: Le(Mr(context).mode)
          }), new XL(processedStdout, finalResult.stderr || "", finalResult.code, interruptedOrCanceled);
        }
        let maxPersistedBytes = 67108864,
          persistedOutputPath,
          persistedOutputSize;
        if (finalResult.outputFilePath && finalResult.outputTaskId) try {
          let fileStat = await pDe.stat(finalResult.outputFilePath);
          persistedOutputSize = fileStat.size, await qge();
          let persistedTargetPath = jNt(finalResult.outputTaskId, !1);
          if (fileStat.size > maxPersistedBytes) await pDe.truncate(finalResult.outputFilePath, maxPersistedBytes);
          try {
            await pDe.link(finalResult.outputFilePath, persistedTargetPath);
          } catch {
            await pDe.copyFile(finalResult.outputFilePath, persistedTargetPath);
          }
          persistedOutputPath = persistedTargetPath;
        } catch {}
        let isImage = X9t(processedStdout),
          finalStdout = processedStdout;
        if (isImage) {
          let imageStdout = await B$n(processedStdout, finalResult.outputFilePath, persistedOutputSize, gg(context.options.mainLoopModel));
          if (imageStdout) finalStdout = imageStdout;else isImage = !1;
        }
        let finalStderr = [finalResult.stderr || "", mainThreadHint].filter(Boolean).join(`
`),
          gitOperation;
        if (!isEmptyErrorResult) {
          let detectedGitOp = sat(input.command, finalResult.stdout || "");
          if (Object.keys(detectedGitOp).length > 0) gitOperation = detectedGitOp;
        }
        return W("tengu_powershell_tool_command_executed", {
          command_type: classifyCommandType(input.command),
          stdout_length: finalStdout.length,
          stderr_length: finalStderr.length,
          exit_code: finalResult.code,
          interrupted: finalResult.interrupted,
          powershell_edition: Le((await rBt()) ?? "unknown"),
          destructive_category: Le(RBt(input.command) ?? "none"),
          permission_mode: Le(Mr(context).mode)
        }), {
          data: {
            stdout: finalStdout,
            stderr: finalStderr,
            interrupted: finalResult.interrupted,
            returnCodeInterpretation: returnCodeInfo.message,
            isImage: isImage,
            persistedOutputPath: persistedOutputPath,
            persistedOutputSize: persistedOutputSize,
            gitOperation: gitOperation
          }
        };
      } finally {
        if (setToolJSX) setToolJSX(null);
        if (context.toolUseId) emitToolProgress?.({
          kind: "clear",
          toolUseId: context.toolUseId
        });
      }
    },
    isResultTruncated(result, {
      columns: columns
    }) {
      if (result.isImage) return !1;
      return T1(result.stdout, columns) || T1(result.stderr, columns);
    }
  });
});

export {moduleExports as r6t,classifySearchOrRead as Mqp,isAutobackgroundingAllowed,detectBlockedSleepPattern,isWindowsSandboxRequiredButUnavailable as wtl,classifyCommandType as y6t,runPowerShellCommand as qqp,pDe,xtl,outputTrailingNewline as Atl,Pqp,Oqp,Lqp,Rtl,Nqp,Fqp,windowsSandboxBlockedMessage as vtl,_6t,ktl,Bqp,Uqp,$qp,PowerShellTool,Upt};
