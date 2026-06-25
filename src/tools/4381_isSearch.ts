// @ts-nocheck
import {u_,H1} from "../telemetry/5213_commandWithoutRedirections.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {mi,lr,Gbt,Sn} from "../../vendor/m233.ts";
import {DO,eke} from "../../vendor/m2683.ts";
import {T$e,nee,brt} from "../../vendor/m2685.ts";
import {H3e,jO,d6t,uol,l8e,dqt} from "./4385_stripAllEnvVars.ts";
import {M$n,q$n,F$n,$$n,U$n,N$n,X9t,B$n} from "../telemetry/3921_mediaType.ts";
import {hs,Tu} from "../../vendor/m649.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {Yrn,Xrs,zEe,jEe,U1e,Xl} from "../config/0651_maxBytes.ts";
import {In,Ct,$c,Ta,XL} from "../../vendor/m197.ts";
import {TT,I0e,Pq} from "../session/3880_trackSequence.ts";
import {Xke,s9e,DD} from "../telemetry/2792_eventName.ts";
import {M6t,Gmt,nol,tol} from "../config/4380_commit.ts";
import {Xae,KO,weo} from "../agent/3295_code.ts";
import {buildDefaultSystemPromptSections as mL,A5e} from "../../vendor/m5213.ts";
import {Kxe,a8n,l8n,Dmt,i8n,c8n,vG} from "../../vendor/m4362.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {My,T3e} from "../../vendor/m3275.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {Yxe,Eqt,Sel,bel,Eel,Cel,Ael} from "../config/4333_onBackground.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,getProjectRoot as ic} from "../session/0132_sent.ts";
import {ri,Ks,Gl} from "./2235_userFacingName.ts";
import {Mnl,Lnl} from "../../vendor/m4363.ts";
import {Lit,eBt} from "../../vendor/m3270.ts";
import {AXr,_ia} from "../../vendor/m3177.ts";
import {Po,isTmuxControlMode as Lt} from "../../vendor/m638.ts";
import {Cp,BR,iO} from "../config/2223_level.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {Xo} from "../../vendor/m240.ts";
import {t1,gg} from "../telemetry/2542_ignore1mTag.ts";
import {OPn,tBt} from "../config/3272_name.ts";
import {H6t,T8n} from "../../vendor/m4364.ts";
import {Uh,SandboxManager as xo} from "../../vendor/m2682.ts";
import {lIe,xI} from "../../vendor/m3295.ts";
import {qit,hB} from "../../vendor/m3296.ts";
import {wE,gf} from "../../vendor/m5177.ts";
import {rHe,T1} from "../../vendor/m2813.ts";
import {HI,YNt,zst,BHe,qge,jNt} from "../telemetry/3173_error.ts";
import {HTo,m8n} from "../core/4355_file_path.ts";
import {dm,vs} from "../../vendor/m2256.ts";
import {qz,v4} from "../telemetry/2700_qz.ts";
import {nge,getLimitedSkillToolCommands as R$e} from "./2691_getSkillToolInfo.ts";
import {iat,HOn,DOn,Yha,sat} from "../telemetry/3329_prNumber.ts";
import {Bnl,Nnl,Fnl} from "../../vendor/m4365.ts";
import {COn,ABt} from "../../vendor/m3321.ts";
import {qnl,$nl} from "../../vendor/m4366.ts";
import {CBt,EOn} from "../../vendor/m3320.ts";
import {Z9t,Zqe} from "../../vendor/m3923.ts";
import {xl,Kh,Mr} from "../../vendor/m4427.ts";
import {oe} from "../../vendor/m2275.ts";
import {Ne} from "../../vendor/m583.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {CE} from "./2710_allErrors.ts";
import {nt} from "../../vendor/m127.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
/**
 * Bash tool implementation for Claude Code.
 *
 * This module classifies shell commands (search / read / list / no-output /
 * command category), detects sleep-blocking, simulated sed edits, and stale
 * file reads, then defines the `sl` Bash tool object with its full lifecycle:
 * input schema, permission matching, sandbox handling, streaming progress,
 * background tasking, and result rendering.
 *
 * Single-letter externals (u_, Ve, Le, mi, DO, etc.) are cross-module symbols
 * left untouched per the 1:1 restoration contract.
 */

interface CommandReadKind {
  isSearch: boolean;
  isRead: boolean;
  isList: boolean;
}

/**
 * Classify a shell command string by whether every statement is a known
 * search / read / list builtin. Returns flags for each category; an unknown
 * command in any statement collapses all flags to false.
 */
function x8p(command: string): CommandReadKind {
  let statements = u_(command);
  if (statements.length === 0) return {
    isSearch: !1,
    isRead: !1,
    isList: !1
  };
  let anySearch = !1,
    anyRead = !1,
    anyList = !1,
    sawRealCommand = !1;
  for (let statement of statements) {
    let head = statement.trim().split(/\s+/)[0];
    if (!head || H8p.has(head)) continue;
    sawRealCommand = !0;
    let isSearchCmd = v8p.has(head),
      isReadCmd = w8p.has(head),
      isListCmd = k8p.has(head);
    if (!isSearchCmd && !isReadCmd && !isListCmd) return {
      isSearch: !1,
      isRead: !1,
      isList: !1
    };
    if (isSearchCmd) anySearch = !0;
    if (isReadCmd) anyRead = !0;
    if (isListCmd) anyList = !0;
  }
  if (!sawRealCommand) return {
    isSearch: !1,
    isRead: !1,
    isList: !1
  };
  return {
    isSearch: anySearch,
    isRead: anyRead,
    isList: anyList
  };
}

/**
 * Return true when every statement of the command is a known no-output
 * filesystem/shell builtin (mv, cp, rm, ...), i.e. success produces no stdout.
 */
function D8p(command: string): boolean {
  let statements = u_(command);
  if (statements.length === 0) return !1;
  let sawRealCommand = !1;
  for (let statement of statements) {
    let head = statement.trim().split(/\s+/)[0];
    if (!head) continue;
    if (sawRealCommand = !0, !I8p.has(head)) return !1;
  }
  return sawRealCommand;
}

/**
 * Map a command to a coarse telemetry category (npm, node, docker, ...),
 * falling back to "other" when no leading token matches the known list.
 */
function F6t(command: string) {
  let statements = u_(command);
  if (statements.length === 0) return Ve("other");
  for (let statement of statements) {
    let head = mi(statement, " "),
      matched = O8p.find(known => known === head);
    if (matched) return Le(matched);
  }
  return Ve("other");
}

/**
 * Decide whether a command may be auto-backgrounded: it must parse as a
 * single simple command, contain no heredocs, and not start with a token in
 * the deny list (e.g. "sleep").
 */
function M8p(command: string): boolean {
  let parsed = DO()?.parse(command);
  if (!parsed) return !1;
  {
    let analysis = T$e(command, parsed);
    if (analysis.kind !== "simple") return !1;
    if (analysis.commands.some(cmd => H3e(cmd.text))) return !1;
  }
  let statements = u_(command);
  if (statements.length === 0) return !0;
  let head = statements[0]?.trim().split(/\s+/)[0];
  if (!head) return !0;
  return !P8p.includes(head);
}

/**
 * Detect a standalone `sleep N` (N >= threshold) as the first statement and
 * produce a human-readable description used to block such commands. Returns
 * null when the command is not a blocking sleep.
 */
function N8p(command: string): string | null {
  let statements = u_(command);
  if (statements.length === 0) return null;
  let firstStatement = statements[0]?.trim() ?? "",
    sleepMatch = /^sleep\s+(\d+(?:\.\d*)?)\s*$/.exec(firstStatement);
  if (!sleepMatch) return null;
  let sleepSeconds = parseFloat(sleepMatch[1]);
  if (sleepSeconds < M$n) return null;
  let remainder = statements.slice(1).join(" ").trim();
  return remainder ? `sleep ${sleepSeconds} followed by: ${remainder}` : `standalone sleep ${sleepSeconds}`;
}

/**
 * Apply a pre-computed simulated sed edit: read the existing file, optionally
 * record file history, then atomically write the new content and update the
 * read-file state. Returns a fake bash result (no stdout/stderr).
 */
async function F8p(simulatedEdit, toolContext, message) {
  let {
      filePath: rawPath,
      newContent: newContent
    } = simulatedEdit,
    absPath = hs(rawPath),
    fileService = Wt(),
    encoding = Yrn(absPath),
    previousContent;
  try {
    previousContent = await fileService.readFile(absPath, {
      encoding: encoding
    });
  } catch (err) {
    if (In(err)) return {
      data: {
        stdout: "",
        stderr: `sed: ${rawPath}: No such file or directory
Exit code 1`,
        interrupted: !1
      }
    };
    throw err;
  }
  if (TT() && message) await I0e(toolContext.getFileHistoryState, toolContext.applyFileHistoryOp, absPath, message.uuid);
  let lineEnding = Xrs(absPath);
  return await zEe(absPath, async () => {
    let writeTimestamp = await jEe(absPath, newContent, encoding, lineEnding);
    toolContext.readFileState.set(absPath, {
      content: newContent,
      timestamp: writeTimestamp,
      offset: void 0,
      limit: void 0
    });
  }), Xke(absPath, previousContent, newContent), {
    data: {
      stdout: "",
      stderr: "",
      interrupted: !1
    }
  };
}

/**
 * Given a command and the read-file state, return the list of previously-read
 * file paths whose mtime is newer than the command-start timestamp and newer
 * than their recorded read timestamp — i.e. files this command likely modified.
 * Only runs when the command matches the write-command marker regex.
 */
async function U8p(command: string, readFileState, commandStartTs: number): Promise<string[]> {
  if (!B8p.test(command)) return [];
  let modifiedPaths: string[] = [];
  return await Promise.all(Array.from(readFileState.entries(), ([filePath, state]) => U1e(filePath).then(mtime => {
    if (mtime > commandStartTs && mtime > state.timestamp) modifiedPaths.push(filePath);
  }).catch(() => {}))), modifiedPaths;
}

/**
 * Recursively determine whether a permission decision is fully rule-based:
 * either a direct "rule" decision, or a subcommandResults whose every nested
 * decision reason is itself rule-based.
 */
function lol(decisionReason): boolean {
  if (decisionReason?.type === "rule") return !0;
  if (decisionReason?.type === "subcommandResults") return [...decisionReason.reasons.values()].every(entry => lol(entry.decisionReason));
  return !1;
}

/**
 * Core Bash execution generator. Spawns the shell command, streams progress
 * updates, handles timeout/auto-background, explicit background requests, and
 * user-initiated (Ctrl+B) backgrounding, yielding "progress" events until the
 * command completes or is backgrounded.
 */
async function* $8p({
  input: input,
  abortController: abortController,
  taskRegistry: taskRegistry,
  setToolJSX: setToolJSX,
  emitToolProgress: emitToolProgress,
  preventCwdChanges: preventCwdChanges,
  isMainThread: isMainThread,
  toolUseId: toolUseId,
  agentId: agentId,
  sessionEnvVars: sessionEnvVars,
  effortLevel: effortLevel
}) {
  let {
      command: command,
      description: description,
      timeout: requestedTimeout,
      run_in_background: runInBackground
    } = input,
    timeoutMs = Math.min(requestedTimeout || M6t(), Gmt()),
    fullOutput = "",
    output = "",
    totalLines = 0,
    totalBytes = 0,
    backgroundTaskId = void 0,
    progressResolver = null;
  /** Returns a promise that resolves to null when the next progress arrives. */
  function awaitProgress() {
    return new Promise(resolve => {
      progressResolver = () => resolve(null);
    });
  }
  let shouldAutoBackground = !N6t && M8p(command),
    shellCommand = await Xae(command, abortController.signal, "bash", {
      timeout: timeoutMs,
      onProgress(latestOutput, latestFullOutput, latestLines, latestBytes, hasBytes) {
        output = latestOutput, fullOutput = latestFullOutput, totalLines = latestLines, totalBytes = hasBytes ? latestBytes : 0;
        let pending = progressResolver;
        if (pending) progressResolver = null, pending();
      },
      preventCwdChanges: preventCwdChanges,
      shouldUseSandbox: mL(input),
      shouldAutoBackground: shouldAutoBackground,
      sessionEnvVars: sessionEnvVars,
      effortLevel: effortLevel
    }),
    resultPromise = shellCommand.result;
  /** Register this shell command as a background task and return its id. */
  async function registerBackgroundTask() {
    return (await Kxe({
      command: command,
      description: description || command,
      shellCommand: shellCommand,
      toolUseId: toolUseId,
      agentId: agentId
    }, {
      abortController: abortController,
      taskRegistry: taskRegistry
    })).taskId;
  }
  /**
   * Transition to background: reuse the user-initiated background task id if
   * present, otherwise register a fresh one, emit the given telemetry event,
   * and invoke the optional callback with the resulting task id.
   */
  function moveToBackground(telemetryEvent, onBackgrounded) {
    if (userBackgroundTaskId) {
      if (!a8n(userBackgroundTaskId, shellCommand, description || command, taskRegistry, toolUseId)) return;
      backgroundTaskId = userBackgroundTaskId, W(telemetryEvent, {
        command_type: F6t(command)
      }), onBackgrounded?.(userBackgroundTaskId);
      return;
    }
    registerBackgroundTask().then(newTaskId => {
      backgroundTaskId = newTaskId;
      let pending = progressResolver;
      if (pending) progressResolver = null, pending();
      if (W(telemetryEvent, {
        command_type: F6t(command)
      }), onBackgrounded) onBackgrounded(newTaskId);
    });
  }
  if (shellCommand.onTimeout && shouldAutoBackground) shellCommand.onTimeout(taskId => {
    moveToBackground("tengu_bash_command_timeout_backgrounded", taskId);
  });
  if (runInBackground === !0 && !N6t) {
    let newTaskId = await registerBackgroundTask();
    return W("tengu_bash_command_explicitly_backgrounded", {
      command_type: F6t(command)
    }), {
      stdout: "",
      stderr: "",
      code: 0,
      interrupted: !1,
      backgroundTaskId: newTaskId
    };
  }
  let startTime = Date.now(),
    userBackgroundTaskId = void 0;
  {
    let earlyResult = await Promise.race([resultPromise, new Promise(resolve => {
      setTimeout(timeoutResolve => timeoutResolve(null), ool, resolve).unref();
    })]);
    if (earlyResult !== null) return shellCommand.cleanup(), earlyResult;
    if (backgroundTaskId) return {
      stdout: "",
      stderr: "",
      code: 0,
      interrupted: !1,
      backgroundTaskId: backgroundTaskId
    };
  }
  My.startPolling(shellCommand.taskOutput.taskId);
  let lastResult = null;
  try {
    while (!0) {
      let progressPromise = awaitProgress(),
        raced = await Promise.race([resultPromise, progressPromise]);
      if (raced !== null) {
        if (lastResult = raced, raced.backgroundTaskId !== void 0) {
          if (l8n(raced.backgroundTaskId, raced, taskRegistry)) hf(raced.backgroundTaskId, Dmt(raced), {
            toolUseId: toolUseId,
            summary: description || command
          });
          let resultCopy = {
              ...raced,
              backgroundTaskId: void 0
            },
            {
              taskOutput: taskOutput
            } = shellCommand;
          if (taskOutput.stdoutToFile && !taskOutput.outputFileRedundant) resultCopy.outputFilePath = taskOutput.path, resultCopy.outputFileSize = taskOutput.outputFileSize, resultCopy.outputTaskId = taskOutput.taskId;
          return resultCopy;
        }
        return raced;
      }
      if (backgroundTaskId) return {
        stdout: "",
        stderr: "",
        code: 0,
        interrupted: !1,
        backgroundTaskId: backgroundTaskId
      };
      if (userBackgroundTaskId) {
        if (shellCommand.status === "backgrounded") return {
          stdout: "",
          stderr: "",
          code: 0,
          interrupted: !1,
          backgroundTaskId: userBackgroundTaskId,
          backgroundedByUser: !0
        };
      }
      let elapsedMs = Date.now() - startTime,
        elapsedSeconds = Math.floor(elapsedMs / 1000);
      if (!N6t && backgroundTaskId === void 0 && elapsedSeconds >= ool / 1000) {
        if (!userBackgroundTaskId) userBackgroundTaskId = i8n({
          command: command,
          description: description || command,
          shellCommand: shellCommand,
          agentId: agentId
        }, taskRegistry, toolUseId);
        if (setToolJSX?.({
          jsx: col.jsx(Yxe, {}),
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
        taskId: shellCommand.taskOutput.taskId,
        ...(requestedTimeout ? {
          timeoutMs: timeoutMs
        } : void 0)
      };
    }
  } finally {
    if (My.stopPolling(shellCommand.taskOutput.taskId), !backgroundTaskId && shellCommand.status !== "backgrounded") {
      if (userBackgroundTaskId) c8n(userBackgroundTaskId, lastResult ? Dmt(lastResult) : "stopped", taskRegistry);
      shellCommand.cleanup();
    }
  }
}
var _De,
  aol,
  col,
  rol = `
`,
  R8p,
  ool = 2000,
  v8p,
  w8p,
  k8p,
  H8p,
  I8p,
  P8p,
  N6t,
  sol,
  iol,
  O8p,
  L8p,
  B8p,
  sl;
var UB = b(() => {
  Qr();
  lt();
  kt();
  s9e();
  ri();
  vG();
  nee();
  eke();
  H1();
  Mnl();
  Lit();
  AXr();
  Po();
  Cp();
  Ir();
  dn();
  Ct();
  Xl();
  Pq();
  Xo();
  ps();
  t1();
  Tu();
  OPn();
  H6t();
  KO();
  Uh();
  RE();
  lIe();
  qit();
  lr();
  wE();
  T3e();
  rHe();
  HI();
  HTo();
  dm();
  qz();
  nge();
  iat();
  jO();
  Bnl();
  COn();
  qnl();
  nol();
  CBt();
  Z9t();
  A5e();
  Eqt();
  q$n();
  xl();
  _De = require("fs/promises"), aol = require("path"), col = x(oe(), 1), R8p = new Set(["command_substitution", "simple_expansion", "string"]), v8p = new Set(["find", "grep", "rg", "ag", "ack", "locate", "which", "whereis"]), w8p = new Set(["cat", "head", "tail", "less", "more", "wc", "stat", "file", "strings", "jq", "awk", "cut", "sort", "uniq", "tr"]), k8p = new Set(["ls", "tree", "du"]), H8p = new Set(["echo", "printf", "true", "false", ":"]), I8p = new Set(["mv", "cp", "rm", "mkdir", "rmdir", "chmod", "chown", "chgrp", "touch", "ln", "cd", "export", "unset", "wait"]);
  P8p = ["sleep"], N6t = Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS, sol = ve(() => C.strictObject({
    command: C.string().describe("The command to execute"),
    timeout: hB(C.number().optional()).describe(`Optional timeout in milliseconds (max ${Gmt()})`),
    description: C.string().optional().describe(`Clear, concise description of what this command does in active voice. Never use words like "complex" or "risk" in the description - just describe what it does.

For simple commands (git, npm, standard CLI tools), keep it brief (5-10 words):
- ls → "List files in current directory"
- git status → "Show working tree status"
- npm install → "Install package dependencies"

For commands that are harder to parse at a glance (piped commands, obscure flags, etc.), add enough context to clarify what it does:
- find . -name "*.tmp" -exec rm {} \\; → "Find and delete all .tmp files recursively"
- git reset --hard origin/main → "Discard all local changes and match remote main"
- curl -s url | jq '.data[]' → "Fetch JSON from URL and extract data array elements"`),
    run_in_background: xI(C.boolean().optional()).describe("Set to true to run this command in the background."),
    dangerouslyDisableSandbox: xI(C.boolean().optional()).describe("Set this to true to dangerously override sandbox mode and run commands without sandboxing."),
    _simulatedSedEdit: C.object({
      filePath: C.string(),
      newContent: C.string()
    }).optional().describe("Internal: pre-computed sed edit result from preview")
  })), iol = ve(() => N6t ? sol().omit({
    run_in_background: !0,
    _simulatedSedEdit: !0
  }) : sol().omit({
    _simulatedSedEdit: !0
  })), O8p = ["npm", "yarn", "pnpm", "node", "python", "python3", "go", "cargo", "make", "docker", "terraform", "webpack", "vite", "jest", "pytest", "curl", "wget", "build", "test", "serve", "watch", "dev"];
  L8p = ve(() => C.object({
    stdout: C.string().describe("The standard output of the command"),
    stderr: C.string().describe("The standard error output of the command"),
    rawOutputPath: C.string().optional().describe("Path to raw output file for large MCP tool outputs"),
    interrupted: C.boolean().describe("Whether the command was interrupted"),
    isImage: C.boolean().optional().describe("Flag to indicate if stdout contains image data"),
    backgroundTaskId: C.string().optional().describe("ID of the background task if command is running in background"),
    backgroundedByUser: C.boolean().optional().describe("True if the user manually backgrounded the command with Ctrl+B"),
    dangerouslyDisableSandbox: C.boolean().optional().describe("Flag to indicate if sandbox mode was overridden"),
    returnCodeInterpretation: C.string().optional().describe("Semantic interpretation for non-error exit codes with special meaning"),
    noOutputExpected: C.boolean().optional().describe("Whether the command is expected to produce no output on success"),
    structuredContent: C.array(C.any()).optional().describe("Structured content blocks"),
    persistedOutputPath: C.string().optional().describe("Path to the persisted full output in tool-results dir (set when output is too large for inline)"),
    persistedOutputSize: C.number().optional().describe("Total size of the output in bytes (set when output is too large for inline)"),
    staleReadFileStateHint: C.string().optional().describe("Model-facing note listing readFileState entries whose mtime bumped during this command (set when WRITE_COMMAND_MARKERS matches)"),
    ghRateLimitHint: C.string().optional().describe("Model-facing system-reminder appended when a gh command reports a GitHub API rate-limit error"),
    gitOperation: HOn().optional().describe("@internal Structured classification of git/gh operations detected in this command (commit/push/merge/rebase/PR). Client-facing — lets clients render git activity without re-parsing stdout; not surfaced to the model.")
  }));
  B8p = new RegExp(["--write", "--fix", "--in-place", "--auto-correct", "\\brun\\s+format\\b", "\\brun\\s+fix\\b", "\\b(yarn|pnpm)\\s+format\\b", "\\blint:file\\b", "\\blint:fix\\b", "\\bblack\\b", "\\bisort\\b", "\\bruff\\s+format\\b", "\\bcargo\\s+(fmt|fix)\\b", "\\brustfmt\\b", "\\bgo\\s+fmt\\b", "\\bterraform\\s+fmt\\b", "\\bdprint\\s+fmt\\b", "\\bswiftformat\\b", "\\bphpcbf\\b"].join("|"));
  sl = Ks({
    name: Mo,
    ruleContentField: "command",
    searchHint: "execute shell commands",
    maxResultSizeChars: 30000,
    strict: !0,
    async description({
      description: description
    }) {
      return description || "Run shell command";
    },
    async prompt({
      model: model,
      tools: tools
    }) {
      let webSearchExamples = tools.some(tool => Gl(tool, CE)) ? await R$e(ic()) : [];
      return tol(model, T8n(webSearchExamples));
    },
    isConcurrencySafe(input) {
      return this.isReadOnly?.(input) ?? !1;
    },
    isReadOnly(input) {
      let parsed = d6t(input.command);
      return EOn(input, parsed).behavior === "allow";
    },
    toAutoClassifierInput(input) {
      return input.command;
    },
    async preparePermissionMatcher({
      command: command
    }) {
      let parsed = await brt(command),
        matchTargets,
        globMatch = !1;
      if (parsed.kind === "simple") matchTargets = parsed.commands.map(cmd => cmd.argv.join(" "));else if (parsed.differential || !R8p.has(parsed.nodeType ?? "")) return () => !0;else {
        let globs = Lnl(command);
        if (globs === null || globs.length === 0) return () => !0;
        matchTargets = globs, globMatch = !0;
      }
      return candidate => {
        let firstWord = uol(candidate);
        if (globMatch && !(firstWord !== null ? !/\s/.test(firstWord) : /^[^\s*?[]+\s?\*$/.test(candidate))) return !0;
        return matchTargets.some(target => {
          if (firstWord !== null) return target === firstWord || target.startsWith(`${firstWord} `) || target === `xargs ${firstWord}` || target.startsWith(`xargs ${firstWord} `);
          return l8e(candidate, target) || l8e(`xargs ${candidate}`, target);
        });
      };
    },
    isSearchOrReadCommand(input) {
      let parsed = iol().safeParse(input);
      if (!parsed.success) return {
        isSearch: !1,
        isRead: !1,
        isList: !1
      };
      return x8p(parsed.data.command);
    },
    get inputSchema() {
      return iol();
    },
    coerceInput: Nnl,
    get outputSchema() {
      return L8p();
    },
    userFacingName(input) {
      if (!input) return "Bash";
      if (input.command) {
        let sedEdit = Zqe(input.command);
        if (sedEdit) return m8n({
          file_path: sedEdit.filePath,
          old_string: "x"
        });
      }
      return nt(process.env.CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR) && mL(input) ? "SandboxedBash" : "Bash";
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
    async validateInput(input) {
      if (v4() && !N6t && !input.run_in_background) {
        let sleepReason = N8p(input.command);
        if (sleepReason !== null) return {
          result: !1,
          message: `Blocked: ${sleepReason}. To wait for a condition, use Monitor with an until-loop (e.g. \`until <check>; do sleep 2; done\`). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.`,
          errorCode: 10
        };
      }
      return {
        result: !0
      };
    },
    async checkPermissions(input, permissionContext) {
      let decision = await dqt(input, permissionContext);
      if (input.dangerouslyDisableSandbox && decision.behavior !== "deny" && decision.behavior !== "ask" && !lol(decision.decisionReason) && !mL(input) && mL({
        ...input,
        dangerouslyDisableSandbox: !1
      })) return {
        behavior: "ask",
        decisionReason: {
          type: "sandboxOverride",
          reason: "dangerouslyDisableSandbox"
        },
        message: "Run outside of the sandbox"
      };
      return decision;
    },
    renderToolUseMessage: Sel,
    renderToolUseProgressMessage: bel,
    renderToolUseQueuedMessage: Eel,
    renderToolResultMessage: Cel,
    extractSearchText({
      stdout: stdout,
      stderr: stderr
    }) {
      return stderr ? `${stdout}
${stderr}` : stdout;
    },
    mapToolResultToToolResultBlockParam({
      interrupted: interrupted,
      stdout: stdout,
      stderr: stderr,
      isImage: isImage,
      backgroundTaskId: backgroundTaskId,
      backgroundedByUser: backgroundedByUser,
      structuredContent: structuredContent,
      persistedOutputPath: persistedOutputPath,
      persistedOutputSize: persistedOutputSize,
      staleReadFileStateHint: staleReadFileStateHint,
      ghRateLimitHint: ghRateLimitHint
    }, toolUseId) {
      if (structuredContent && structuredContent.length > 0) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: structuredContent
      };
      if (isImage) {
        let imageResult = F$n(stdout, toolUseId);
        if (imageResult) return imageResult;
      }
      let renderedStdout = stdout;
      if (stdout) renderedStdout = stdout.replace(/^(\s*\n)+/, ""), renderedStdout = renderedStdout.trimEnd();
      if (persistedOutputPath) {
        let preview = YNt(renderedStdout, zst);
        renderedStdout = BHe({
          filepath: persistedOutputPath,
          originalSize: persistedOutputSize ?? 0,
          isJson: !1,
          preview: preview.preview,
          hasMore: preview.hasMore
        });
      }
      let renderedStderr = stderr.trim();
      if (interrupted) {
        if (stderr) renderedStderr += rol;
        renderedStderr += "<error>Command was aborted before completion</error>";
      }
      let backgroundNote = "";
      if (backgroundTaskId) {
        let outputFilePath = gf(backgroundTaskId);
        if (backgroundedByUser) backgroundNote = `Command was manually backgrounded by user with ID: ${backgroundTaskId}. Output is being written to: ${outputFilePath}`;else backgroundNote = `Command running in background with ID: ${backgroundTaskId}. Output is being written to: ${outputFilePath}. You will be notified when it completes. To check interim output, use ${vs} on that file path.`;
      }
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: [renderedStdout, renderedStderr, backgroundNote, staleReadFileStateHint, ghRateLimitHint].filter(Boolean).join(`
`),
        is_error: interrupted
      };
    },
    async call(input, toolContext, n, message, onProgress) {
      if (input._simulatedSedEdit) return F8p(input._simulatedSedEdit, toolContext, message);
      let commandStartTs = Math.floor(Date.now() / 1000) * 1000,
        {
          abortController: abortController,
          getAppState: getAppState,
          setToolJSX: setToolJSX,
          emitToolProgress: emitToolProgress
        } = toolContext,
        outputBuffer = new Gbt(),
        stderr = "",
        returnCodeInfo,
        progressSeq = 0,
        interrupted = !1,
        execResult,
        isMainThread = !toolContext.agentId,
        preventCwdChanges = !isMainThread,
        sandboxed = mL(input);
      try {
        let generator = $8p({
            input: input,
            abortController: abortController,
            taskRegistry: toolContext.taskRegistry,
            setToolJSX: setToolJSX,
            emitToolProgress: emitToolProgress,
            preventCwdChanges: preventCwdChanges,
            isMainThread: isMainThread,
            toolUseId: toolContext.toolUseId,
            agentId: toolContext.agentId,
            sessionEnvVars: toolContext.sessionEnvVars,
            effortLevel: BR(toolContext.options.mainLoopModel) ? iO(toolContext.options.mainLoopModel, Kh(toolContext)) : void 0
          }),
          step;
        do if (step = await generator.next(), !step.done && onProgress) {
          let progress = step.value;
          onProgress({
            type: "progress",
            toolUseID: `bash-progress-${progressSeq++}`,
            data: {
              type: "bash_progress",
              output: progress.output,
              fullOutput: progress.fullOutput,
              elapsedTimeSeconds: progress.elapsedTimeSeconds,
              totalLines: progress.totalLines,
              totalBytes: progress.totalBytes,
              taskId: progress.taskId,
              timeoutMs: progress.timeoutMs
            }
          });
        } while (!step.done);
        if (execResult = step.value, execResult.intercepted) sandboxed = !1;
        DOn(input.command, execResult.code, execResult.stdout);
        let isInterruptByUser = execResult.interrupted && abortController.signal.reason === "interrupt",
          isCancelled = execResult.interrupted && (abortController.signal.reason === "interrupt" || abortController.signal.reason === "user-cancel" || abortController.signal.reason === "remote-cancel");
        if (execResult.interrupted && abortController.signal.reason === "background") throw new $c();
        if (outputBuffer.append((execResult.stdout || "").trimEnd() + rol), returnCodeInfo = Fnl(input.command, execResult.code, execResult.stdout || "", ""), execResult.stdout && execResult.stdout.includes(".git/index.lock': File exists")) W("tengu_git_index_lock_error", {});
        if (returnCodeInfo.isError && !isInterruptByUser) {
          if (execResult.code !== 0) outputBuffer.append(`Exit code ${execResult.code}`);
        }
        if (!preventCwdChanges) {
          let appState = getAppState();
          if ($$n(appState.toolPermissionContext)) stderr = U$n("");
        }
        let stdoutForAnnotate = execResult.stdout || "",
          annotatedStderr = xo.annotateStderrWithSandboxFailures(input.command, stdoutForAnnotate);
        if (execResult.preSpawnError) {
          if (/null bytes/.test(execResult.preSpawnError)) throw new Ta(execResult.preSpawnError, "Bash: command contained null bytes (argv echo redacted)");
          throw new Ta(execResult.preSpawnError, "Bash: pre-spawn error (cwd/argv redacted)");
        }
        if (returnCodeInfo.isError && !isInterruptByUser) throw W("tengu_bash_tool_command_failed", {
          command_type: F6t(input.command),
          stdout_length: stdoutForAnnotate.length,
          stderr_length: 0,
          exit_code: execResult.code,
          interrupted: execResult.interrupted,
          executor_shell: await weo(),
          executor_shell_overridden: Boolean(process.env.CLAUDE_CODE_SHELL),
          sandboxed: sandboxed,
          sandbox_enabled: xo.isSandboxingEnabled(),
          dangerously_disable_sandbox: input.dangerouslyDisableSandbox ?? !1,
          destructive_category: Le(ABt(input.command) ?? "none"),
          permission_mode: Le(Mr(toolContext).mode)
        }), new XL("", annotatedStderr, execResult.code, isCancelled, annotatedStderr !== stdoutForAnnotate);
        interrupted = execResult.interrupted;
      } finally {
        if (setToolJSX) setToolJSX(null);
        if (toolContext.toolUseId) emitToolProgress?.({
          kind: "clear",
          toolUseId: toolContext.toolUseId
        });
      }
      let bufferedOutput = outputBuffer.toString(),
        maxPersistedBytes = 67108864,
        persistedOutputPath,
        persistedOutputSize;
      if (execResult.outputFilePath && execResult.outputTaskId) try {
        let stat = await _De.stat(execResult.outputFilePath);
        persistedOutputSize = stat.size, await qge();
        let persistTarget = jNt(execResult.outputTaskId, !1);
        if (stat.size > maxPersistedBytes) await _De.truncate(execResult.outputFilePath, maxPersistedBytes);
        try {
          await _De.link(execResult.outputFilePath, persistTarget);
        } catch {
          await _De.copyFile(execResult.outputFilePath, persistTarget);
        }
        persistedOutputPath = persistTarget;
      } catch {}
      W("tengu_bash_tool_command_executed", {
        command_type: F6t(input.command),
        stdout_length: bufferedOutput.length,
        stderr_length: 0,
        exit_code: execResult.code,
        interrupted: interrupted,
        executor_shell: await weo(),
        executor_shell_overridden: Boolean(process.env.CLAUDE_CODE_SHELL),
        sandboxed: sandboxed,
        sandbox_enabled: xo.isSandboxingEnabled(),
        dangerously_disable_sandbox: input.dangerouslyDisableSandbox ?? !1,
        destructive_category: Le(ABt(input.command) ?? "none"),
        permission_mode: Le(Mr(toolContext).mode)
      });
      let indexingTool = _ia(input.command);
      if (indexingTool) W("tengu_code_indexing_tool_used", {
        tool: Le(indexingTool),
        source: Ve("cli"),
        success: execResult.code === 0
      });
      let strippedOutput = N$n(bufferedOutput),
        hintResult = eBt(strippedOutput, input.command);
      if (strippedOutput = hintResult.stripped, isMainThread && hintResult.hints.length > 0) for (let hint of hintResult.hints) tBt(hint);
      let isImage = X9t(strippedOutput),
        finalStdout = strippedOutput;
      if (isImage) {
        let imageOutput = await B$n(strippedOutput, execResult.outputFilePath, persistedOutputSize, gg(toolContext.options.mainLoopModel));
        if (imageOutput) finalStdout = imageOutput;else isImage = !1;
      }
      let ghRateLimitHint = execResult.backgroundTaskId ? void 0 : Yha(input.command, execResult.stdout || ""),
        gitOperation;
      if (!execResult.backgroundTaskId) {
        let gitOp = sat(input.command, execResult.stdout || "");
        if (Object.keys(gitOp).length > 0) gitOperation = gitOp;
      }
      let staleReadFileStateHint;
      if (!interrupted && !isImage && !execResult.backgroundTaskId) {
        let modifiedPaths = await U8p(input.command, toolContext.readFileState, commandStartTs);
        if (modifiedPaths.length > 0) {
          let cwd = Lt(),
            maxShown = 5,
            shownPaths = modifiedPaths.slice(0, 5).map(path => aol.relative(cwd, path) || path).join(", "),
            moreSuffix = modifiedPaths.length > 5 ? ` and ${modifiedPaths.length - 5} more` : "";
          staleReadFileStateHint = `[This command modified ${modifiedPaths.length} ${Sn(modifiedPaths.length, "file")} you've previously read: ${shownPaths}${moreSuffix}. Call Read before editing.]`;
        }
      }
      if (!interrupted && !isImage && !execResult.backgroundTaskId) await $nl(input.command, toolContext.readFileState, abortController.signal, execResult.code);
      return {
        data: {
          stdout: finalStdout,
          stderr: stderr,
          interrupted: interrupted,
          isImage: isImage,
          returnCodeInterpretation: returnCodeInfo?.message,
          noOutputExpected: D8p(input.command),
          backgroundTaskId: execResult.backgroundTaskId,
          backgroundedByUser: execResult.backgroundedByUser,
          dangerouslyDisableSandbox: "dangerouslyDisableSandbox" in input ? input.dangerouslyDisableSandbox : void 0,
          persistedOutputPath: persistedOutputPath,
          persistedOutputSize: persistedOutputSize,
          staleReadFileStateHint: staleReadFileStateHint,
          ghRateLimitHint: ghRateLimitHint,
          gitOperation: gitOperation
        }
      };
    },
    renderToolUseErrorMessage: Ael,
    isResultTruncated(result, {
      columns: columns
    }) {
      if (result.isImage) return !1;
      return T1(result.stdout, columns) || T1(result.stderr, columns);
    }
  });
});

export {x8p,D8p,F6t,M8p,N8p,F8p,U8p,lol,$8p,_De,aol,col,rol,R8p,ool,v8p,w8p,k8p,H8p,I8p,P8p,N6t,sol,iol,O8p,L8p,B8p,sl,UB};
