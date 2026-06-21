// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {BA as UA,kdt as sdt,wza as sKa,L4n as K3n} from "../../vendor/m4317.ts";
import {G2n as s2n,X2n as d2n,K2n as a2n,J2n as u2n,Y2n as c2n,V2n as i2n,N$t as g$t,z2n as l2n} from "../telemetry/4054_mediaType.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {SandboxManager as zo,Ag as dg} from "../../vendor/m2671.ts";
import {fromEnum as Ue,Qe} from "../../vendor/m5.ts";
import {q4n as e4n,X3t as x3t,Yza as xKa,zza as RKa} from "../config/4325_Yza.ts";
import {yW as tW,hke as Zxe,w1t as s1t} from "../../vendor/m3256.ts";
import {Qae as $ae,initXL as yL} from "../agent/3279_code.ts";
import {KL as BL,t6e as Oqe} from "../../vendor/m5180.ts";
import {h_ as A_,qp as Jp,Se,bt as St,Fl as pc,BM as wM} from "../../vendor/m195.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {e0e as MIe,W4n as n4n,G4n as r4n,Ddt as ldt,j4n as t4n,V4n as o4n,eJ as UY} from "../../vendor/m4342.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {gS as uS,Bot as yot} from "../../vendor/m3259.ts";
import {Bh as Mh,bC as gC} from "../session/2784_uuid.ts";
import {n0e as FIe,s3t as N9t} from "../config/4313_onBackground.ts";
import {Xr} from "../../vendor/m321.ts";
import {Ri,pi as ai} from "../tools/2227_userFacingName.ts";
import {Lot as hot,E1t as n1t} from "../../vendor/m3254.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {j1 as O1,initCg as sg} from "../telemetry/2531_ignore1mTag.ts";
import {X2e as k2e,VOt as bOt,oW as q5} from "../../vendor/m2778.ts";
import {WIn as sIn,C1t as r1t} from "../config/3256_name.ts";
import {Jae as Fae,_ke as tke,$0 as F0} from "../config/3258_errors.ts";
import {bke as ske,rI as XH} from "../../vendor/m3279.ts";
import {jot as A1t,VF as kq} from "../../vendor/m3280.ts";
import {oA as cA,Js as Gs,Su as du} from "../config/2697_oA.ts";
import {dr as fr,gyt as W_t} from "../../vendor/m231.ts";
import {vC as TC,mh} from "../../vendor/m5145.ts";
import {o$e as M2e,Tq as sq} from "../../vendor/m2800.ts";
import {eI as M0,gMt as VLt,Krt as wrt,Jxe as Dxe,Hhe as fhe,hMt as GLt} from "../telemetry/3157_error.ts";
import {ef as sf,Ws as Bs} from "../../vendor/m2248.ts";
import {hz as ez,sq as V4} from "../telemetry/2688_hz.ts";
import {ast as $ot,B0n as ZIn,$0n as n0n,ist as Uot} from "../telemetry/3313_prNumber.ts";
import {cza as q7a,lza as $7a,iza as F7a,aza as U7a} from "../../vendor/m4313.ts";
import {P0n as zIn,Y1t as k1t} from "../../vendor/m3306.ts";
import {Kza as wKa,Vza as vKa} from "../../vendor/m4323.ts";
import {nYa as LKa,Xza as HKa,Qza as IKa,Zza as DKa,eYa as PKa,tYa as OKa} from "../../vendor/m4325.ts";
import {Ql as Xl,Fr as Lr} from "../../vendor/m4405.ts";
import {Te} from "../../vendor/m2253.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {truncate as Ga} from "../../vendor/m237.ts";
import {yP as _P} from "../telemetry/2780_eventName.ts";
// @ts-nocheck
var bannerCacheByToolUseId = {};
pt(bannerCacheByToolUseId, {
  detectBlockedSleepPattern: () => detectBlockedSleepPattern,
  PowerShellTool: () => PowerShellTool
});
function classifyPowerShellCommand(cmd) {
  let trimmed = cmd.trim();
  if (!trimmed) return {
    isSearch: false,
    isRead: false
  };
  let parts = trimmed.split(/\s*[;|]\s*/).filter(Boolean);
  if (parts.length === 0) return {
    isSearch: false,
    isRead: false
  };
  let hasSearch = false,
    hasRead = false,
    hasNonIgnored = false;
  for (let part of parts) {
    let verb = part.trim().split(/\s+/)[0];
    if (!verb) continue;
    let normalized = UA(verb);
    if (psIgnoreVerbs.has(normalized)) continue;
    hasNonIgnored = true;
    let isSearch = psSearchVerbs.has(normalized),
      isRead = psReadVerbs.has(normalized);
    if (!isSearch && !isRead) return {
      isSearch: false,
      isRead: false
    };
    if (isSearch) hasSearch = true;
    if (isRead) hasRead = true;
  }
  if (!hasNonIgnored) return {
    isSearch: false,
    isRead: false
  };
  return {
    isSearch: hasSearch,
    isRead: hasRead
  };
}
function canAutoBgPowerShellCommand(cmd) {
  let verb = cmd.trim().split(/\s+/)[0];
  if (!verb) return true;
  let normalized = UA(verb);
  return !blockedSleepCommands.includes(normalized);
}
function detectBlockedSleepPattern(cmd) {
  let firstLine = cmd.trim().split(/[;|&\r\n]/)[0]?.trim() ?? "",
    match = /^(?:start-sleep|sleep)(?:\s+-s(?:econds)?)?\s+(\d+(?:\.\d*)?)\s*$/i.exec(firstLine);
  if (!match) return null;
  let seconds = parseFloat(match[1]);
  if (seconds < s2n) return null;
  let remainder = cmd.trim().slice(firstLine.length).replace(/^[\s;|&]+/, "");
  return remainder ? `Start-Sleep ${seconds} followed by: ${remainder}` : `standalone Start-Sleep ${seconds}`;
}
function isPowerShellSandboxBlocked() {
  return Yt() === "windows" && zo.isSandboxEnabledInSettings() && zo.isPlatformInEnabledList() && !zo.areUnsandboxedCommandsAllowed();
}
function classifyPowerShellCommandType(cmd) {
  let verb = cmd.trim().split(/\s+/)[0] || "";
  for (let knownVerb of psLongRunningVerbs_2) if (verb.toLowerCase() === knownVerb.toLowerCase()) return Ue(knownVerb);
  return Qe("other");
}
async function* runPowerShellCommandGenerator({
  input: cmdInput,
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
    } = cmdInput,
    effectiveTimeout = Math.min(timeout || e4n(), x3t()),
    stdoutBuffer = "",
    partialOutput = "",
    totalLines = 0,
    totalBytes = 0,
    backgroundTaskId = undefined,
    wasInterrupted = false,
    hasSentBgHint = null;
  function R() {
    return new Promise(F => {
      hasSentBgHint = () => F(null);
    });
  }
  let k = !disableBackgroundTasks && canAutoBgPowerShellCommand(command);
  if (!(await tW())) return {
    stdout: "",
    stderr: "PowerShell is not available on this system.",
    code: 0,
    interrupted: false
  };
  let I;
  try {
    I = await $ae(command, abortController.signal, "powershell", {
      timeout: effectiveTimeout,
      onProgress(F, W, G, K, Q) {
        partialOutput = F, stdoutBuffer = W, totalLines = G, totalBytes = Q ? K : 0;
      },
      preventCwdChanges: preventCwdChanges,
      shouldUseSandbox: Yt() === "windows" ? false : BL({
        command: command,
        dangerouslyDisableSandbox: dangerouslyDisableSandbox
      }),
      shouldAutoBackground: k,
      sessionEnvVars: sessionEnvVars
    });
  } catch (F) {
    if (A_(F)) return {
      stdout: "",
      stderr: "Command aborted before execution",
      code: 145,
      interrupted: true
    };
    if (Jp(F)) return v(`PowerShellTool: exec spawn failed: ${F}`), {
      stdout: "",
      stderr: `Failed to execute PowerShell command: ${Se(F)}`,
      code: 0,
      interrupted: false
    };
    return Ie(F), {
      stdout: "",
      stderr: `Failed to execute PowerShell command: ${Se(F)}`,
      code: 0,
      interrupted: false
    };
  }
  let H = I.result;
  async function P() {
    return (await MIe({
      command: command,
      description: description || command,
      shellCommand: I,
      toolUseId: toolUseId,
      agentId: agentId
    }, {
      abortController: abortController,
      taskRegistry: taskRegistry
    })).taskId;
  }
  function registerAsBackgroundTask(F, W) {
    if (deadlineTime) {
      if (!n4n(deadlineTime, I, description || command, taskRegistry, toolUseId)) return;
      backgroundTaskId = deadlineTime, j(F, {
        command_type: classifyPowerShellCommandType(command)
      }), W?.(deadlineTime);
      return;
    }
    P().then(G => {
      backgroundTaskId = G;
      let K = hasSentBgHint;
      if (K) hasSentBgHint = null, K();
      if (j(F, {
        command_type: classifyPowerShellCommandType(command)
      }), W) W(G);
    });
  }
  if (I.onTimeout && k) I.onTimeout(F => {
    registerAsBackgroundTask("tengu_powershell_command_timeout_backgrounded", F);
  });
  if (runInBackground === true && !disableBackgroundTasks) {
    let F = await P();
    return j("tengu_powershell_command_explicitly_backgrounded", {
      command_type: classifyPowerShellCommandType(command)
    }), {
      stdout: "",
      stderr: "",
      code: 0,
      interrupted: false,
      backgroundTaskId: F
    };
  }
  uS.startPolling(I.taskOutput.taskId);
  let D = Date.now(),
    startTime = D + autoBackgroundThresholdMs,
    deadlineTime = undefined,
    pendingBgTaskId = null;
  try {
    while (true) {
      let F = Date.now(),
        W = Math.max(0, startTime - F),
        G = R(),
        K = await Promise.race([H, new Promise(Y => setTimeout(J => J(null), W, Y).unref()), G]);
      if (K !== null) {
        if (pendingBgTaskId = K, K.backgroundTaskId !== undefined) {
          if (r4n(K.backgroundTaskId, K, taskRegistry)) Mh(K.backgroundTaskId, ldt(K), {
            toolUseId: toolUseId,
            summary: description || command
          });
          let Y = {
              ...K,
              backgroundTaskId: undefined
            },
            {
              taskOutput: J
            } = I;
          if (J.stdoutToFile && !J.outputFileRedundant) Y.outputFilePath = J.path, Y.outputFileSize = J.outputFileSize, Y.outputTaskId = J.taskId;
          return Y;
        }
        return K;
      }
      if (backgroundTaskId) return {
        stdout: wasInterrupted ? stdoutBuffer : "",
        stderr: "",
        code: 0,
        interrupted: false,
        backgroundTaskId: backgroundTaskId
      };
      if (abortController.signal.aborted && abortController.signal.reason === "interrupt" && !wasInterrupted) {
        if (wasInterrupted = true, !disableBackgroundTasks) {
          registerAsBackgroundTask("tengu_powershell_command_interrupt_backgrounded");
          continue;
        }
        I.kill();
      }
      if (deadlineTime) {
        if (I.status === "backgrounded") return {
          stdout: "",
          stderr: "",
          code: 0,
          interrupted: false,
          backgroundTaskId: deadlineTime,
          backgroundedByUser: true
        };
      }
      let Q = Date.now() - D,
        V = Math.floor(Q / 1000);
      if (!disableBackgroundTasks && backgroundTaskId === undefined && V >= autoBackgroundThresholdMs / 1000) {
        if (!deadlineTime) deadlineTime = t4n({
          command: command,
          description: description || command,
          shellCommand: I,
          agentId: agentId
        }, taskRegistry, toolUseId);
        if (setToolJSX?.({
          jsx: reactModule.createElement(FIe, null),
          shouldHidePromptInput: false,
          shouldContinueAnimation: true,
          showSpinner: true
        }), toolUseId) emitToolProgress?.({
          kind: "background_hint",
          toolUseId: toolUseId
        });
      }
      yield {
        type: "progress",
        fullOutput: stdoutBuffer,
        output: partialOutput,
        elapsedTimeSeconds: V,
        totalLines: totalLines,
        totalBytes: totalBytes,
        taskId: I.taskOutput.taskId,
        ...(timeout ? {
          timeoutMs: effectiveTimeout
        } : undefined)
      }, startTime = Date.now() + progressPollIntervalMs;
    }
  } finally {
    if (uS.stopPolling(I.taskOutput.taskId), !backgroundTaskId && I.status !== "backgrounded") {
      if (deadlineTime) o4n(deadlineTime, pendingBgTaskId ? ldt(pendingBgTaskId) : "stopped", taskRegistry);
      I.cleanup();
    }
  }
}
var fsPromises,
  reactModule,
  newline = `
`,
  psSearchVerbs,
  psReadVerbs,
  psIgnoreVerbs,
  autoBackgroundThresholdMs = 2000,
  progressPollIntervalMs = 1000,
  blockedSleepCommands,
  blockedSleepCommands_2 = "Enterprise policy requires sandboxing, but sandboxing is not available on native Windows. Shell command execution is blocked on this platform by policy.",
  disableBackgroundTasks,
  disableBackgroundTasks_2,
  psInputSchema,
  psOutputSchema,
  psLongRunningVerbs_2,
  PowerShellTool;
var PowerShellTool_2 = b(() => {
  Xr();
  Ct();
  Ri();
  UY();
  hot();
  je();
  Or();
  St();
  ds();
  wn();
  O1();
  k2e();
  $s();
  sIn();
  Fae();
  yL();
  dg();
  gC();
  ske();
  A1t();
  Zxe();
  cA();
  fr();
  TC();
  yot();
  M2e();
  M0();
  Oqe();
  N9t();
  d2n();
  sf();
  ez();
  $ot();
  q7a();
  zIn();
  wKa();
  xKa();
  sdt();
  LKa();
  Xl();
  fsPromises = require("fs/promises"), reactModule = L(Te(), 1), psSearchVerbs = new Set(["select-string", "get-childitem", "findstr", "where.exe"]), psReadVerbs = new Set(["get-content", "get-item", "test-path", "resolve-path", "get-process", "get-service", "get-childitem", "get-location", "get-filehash", "get-acl", "format-hex"]), psIgnoreVerbs = new Set(["write-output", "write-host"]);
  blockedSleepCommands = ["start-sleep", "sleep"];
  disableBackgroundTasks = Ge.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS, disableBackgroundTasks_2 = Re(() => E.strictObject({
    command: E.string().describe("The PowerShell command to execute"),
    timeout: kq(E.number().optional()).describe(`Optional timeout in milliseconds (max ${x3t()})`),
    description: E.string().optional().describe("Clear, concise description of what this command does in active voice."),
    run_in_background: XH(E.boolean().optional()).describe("Set to true to run this command in the background."),
    dangerouslyDisableSandbox: XH(E.boolean().optional()).describe("Set this to true to dangerously override sandbox mode and run commands without sandboxing.")
  })), psInputSchema = Re(() => disableBackgroundTasks ? disableBackgroundTasks_2().omit({
    run_in_background: true
  }) : disableBackgroundTasks_2()), psOutputSchema = Re(() => E.object({
    stdout: E.string().describe("The standard output of the command"),
    stderr: E.string().describe("The standard error output of the command"),
    interrupted: E.boolean().describe("Whether the command was interrupted"),
    returnCodeInterpretation: E.string().optional().describe("Semantic interpretation for non-error exit codes with special meaning"),
    isImage: E.boolean().optional().describe("Flag to indicate if stdout contains image data"),
    persistedOutputPath: E.string().optional().describe("Path to persisted full output when too large for inline"),
    persistedOutputSize: E.number().optional().describe("Total output size in bytes when persisted"),
    backgroundTaskId: E.string().optional().describe("ID of the background task if command is running in background"),
    backgroundedByUser: E.boolean().optional().describe("True if the user manually backgrounded the command with Ctrl+B"),
    gitOperation: ZIn().optional().describe("@internal Structured classification of git/gh operations detected in this command (commit/push/merge/rebase/PR). Client-facing \u2014 lets clients render git activity without re-parsing stdout; not surfaced to the model.")
  })), psLongRunningVerbs_2 = ["npm", "yarn", "pnpm", "node", "python", "python3", "go", "cargo", "make", "docker", "terraform", "webpack", "vite", "jest", "pytest", "curl", "Invoke-WebRequest", "build", "test", "serve", "watch", "dev"];
  PowerShellTool = ai({
    name: Gs,
    ruleContentField: "command",
    searchHint: "execute Windows PowerShell commands",
    maxResultSizeChars: 30000,
    strict: true,
    async description({
      description: e
    }) {
      return e || "Run PowerShell command";
    },
    async prompt() {
      return RKa();
    },
    isConcurrencySafe(e) {
      return this.isReadOnly?.(e) ?? false;
    },
    isSearchOrReadCommand(e) {
      if (!e?.command) return {
        isSearch: false,
        isRead: false
      };
      return classifyPowerShellCommand(e.command);
    },
    isReadOnly(e) {
      if (sKa(e.command)) return false;
      return K3n(e.command);
    },
    toAutoClassifierInput(e) {
      return e.command;
    },
    async preparePermissionMatcher({
      command: e
    }) {
      let t = await tke(e);
      if (!t.valid) return () => true;
      let n = F0(t).flatMap(r => {
        let o = [r.name, ...r.args].join(" "),
          s = [UA(r.name), ...r.args].join(" ");
        return o.toLowerCase() === s ? [o] : [o, s];
      });
      return r => {
        let o = bOt(r);
        return n.some(s => {
          if (o !== null) {
            let i = o.toLowerCase(),
              a = s.toLowerCase();
            return a === i || a.startsWith(`${i} `);
          }
          return q5(r, s, true, true);
        });
      };
    },
    get inputSchema() {
      return psInputSchema();
    },
    get outputSchema() {
      return psOutputSchema();
    },
    userFacingName() {
      return "PowerShell";
    },
    getToolUseSummary(e) {
      if (!e?.command) return null;
      let {
        command: t,
        description: n
      } = e;
      if (n) return n;
      return Ga(t, _P);
    },
    getActivityDescription(e) {
      if (!e?.command) return "Running command";
      return `Running ${e.description ?? Ga(e.command, _P)}`;
    },
    isEnabled() {
      return true;
    },
    async validateInput(e) {
      if (isPowerShellSandboxBlocked()) return {
        result: false,
        message: blockedSleepCommands_2,
        errorCode: 11
      };
      if (V4() && du() && !disableBackgroundTasks && !e.run_in_background) {
        let t = detectBlockedSleepPattern(e.command);
        if (t !== null) return {
          result: false,
          message: `Blocked: ${t}. To wait for a condition, use Monitor with an until-loop (e.g. \`until <check>; do sleep 2; done\` \u2014 Monitor runs bash). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.`,
          errorCode: 10
        };
      }
      return {
        result: true
      };
    },
    async checkPermissions(e, t) {
      return await vKa(e, t);
    },
    renderToolUseMessage: HKa,
    renderToolUseProgressMessage: IKa,
    renderToolUseQueuedMessage: DKa,
    renderToolResultMessage: PKa,
    renderToolUseErrorMessage: OKa,
    mapToolResultToToolResultBlockParam({
      interrupted: e,
      stdout: t,
      stderr: n,
      isImage: r,
      persistedOutputPath: o,
      persistedOutputSize: s,
      backgroundTaskId: i,
      backgroundedByUser: a
    }, l) {
      if (r) {
        let p = a2n(t, l);
        if (p) return p;
      }
      let c = t;
      if (o) {
        let p = t ? t.replace(/^(\s*\n)+/, "").trimEnd() : "",
          m = VLt(p, wrt);
        c = Dxe({
          filepath: o,
          originalSize: s ?? 0,
          isJson: false,
          preview: m.preview,
          hasMore: m.hasMore
        });
      } else if (t) c = t.replace(/^(\s*\n)+/, ""), c = c.trimEnd();
      let u = n.trim();
      if (e) {
        if (n) u += newline;
        u += "<error>Command was aborted before completion</error>";
      }
      let d = "";
      if (i) {
        let p = mh(i);
        if (a) d = `Command was manually backgrounded by user with ID: ${i}. Output is being written to: ${p}`;else d = `Command running in background with ID: ${i}. Output is being written to: ${p}. You will be notified when it completes. To check interim output, use ${Bs} on that file path.`;
      }
      return {
        tool_use_id: l,
        type: "tool_result",
        content: [c, u, d].filter(Boolean).join(`
`),
        is_error: e
      };
    },
    async call(e, t, n, r, o) {
      if (isPowerShellSandboxBlocked()) throw Error(blockedSleepCommands_2);
      let {
          abortController: s,
          setToolJSX: i,
          emitToolProgress: a
        } = t,
        l = !t.agentId,
        c = 0;
      try {
        let u = runPowerShellCommandGenerator({
            input: e,
            abortController: s,
            taskRegistry: t.taskRegistry,
            setToolJSX: i,
            emitToolProgress: a,
            preventCwdChanges: !l,
            isMainThread: l,
            toolUseId: t.toolUseId,
            agentId: t.agentId,
            sessionEnvVars: t.sessionEnvVars
          }),
          d;
        do if (d = await u.next(), !d.done && o) {
          let O = d.value;
          o({
            type: "progress",
            toolUseID: `ps-progress-${c++}`,
            data: {
              type: "powershell_progress",
              output: O.output,
              fullOutput: O.fullOutput,
              elapsedTimeSeconds: O.elapsedTimeSeconds,
              totalLines: O.totalLines,
              totalBytes: O.totalBytes,
              timeoutMs: O.timeoutMs,
              taskId: O.taskId
            }
          });
        } while (!d.done);
        let p = d.value,
          m = p.code === 0 && !p.stdout && p.stderr && !p.backgroundTaskId;
        if (!m) n0n(e.command, p.code, p.stdout);
        let f = p.interrupted && s.signal.reason === "interrupt",
          A = p.interrupted && (s.signal.reason === "interrupt" || s.signal.reason === "user-cancel" || s.signal.reason === "remote-cancel"),
          h = "";
        if (l) {
          if (u2n(Lr(t))) h = c2n("");
        }
        if (p.backgroundTaskId) {
          let O = n1t(p.stdout || "", e.command);
          if (l && O.hints.length > 0) for (let D of O.hints) r1t(D);
          return {
            data: {
              stdout: O.stripped,
              stderr: [p.stderr || "", h].filter(Boolean).join(`
`),
              interrupted: false,
              backgroundTaskId: p.backgroundTaskId,
              backgroundedByUser: p.backgroundedByUser
            }
          };
        }
        let g = new W_t(),
          _ = (p.stdout || "").trimEnd();
        g.append(_ + newline);
        let y = $7a(e.command, p.code, _, p.stderr || ""),
          T = i2n(g.toString()),
          S = n1t(T, e.command);
        if (T = S.stripped, l && S.hints.length > 0) for (let O of S.hints) r1t(O);
        if (p.preSpawnError) throw new pc(p.preSpawnError, "PowerShell: pre-spawn error (cwd/argv redacted)");
        if (y.isError && !f) {
          let O = _.length <= 8192 ? _ : _.slice(0, 4096) + _.slice(-4096),
            D = F7a(O);
          throw j("tengu_powershell_tool_command_failed", {
            command_type: classifyPowerShellCommandType(e.command),
            exit_code: p.code,
            stdout_length: _.length,
            error_class: D,
            not_recognized_kind: D === "not_recognized" || D === "command_not_found" ? Ue(U7a(O) ?? "unextracted") : undefined,
            powershell_edition: Ue((await s1t()) ?? "unknown"),
            destructive_category: Ue(k1t(e.command) ?? "none"),
            permission_mode: Ue(Lr(t).mode)
          }), new wM(T, p.stderr || "", p.code, A);
        }
        let C = 67108864,
          R,
          k;
        if (p.outputFilePath && p.outputTaskId) try {
          let O = await fsPromises.stat(p.outputFilePath);
          k = O.size, await fhe();
          let D = GLt(p.outputTaskId, false);
          if (O.size > C) await fsPromises.truncate(p.outputFilePath, C);
          try {
            await fsPromises.link(p.outputFilePath, D);
          } catch {
            await fsPromises.copyFile(p.outputFilePath, D);
          }
          R = D;
        } catch {}
        let x = g$t(T),
          I = T;
        if (x) {
          let O = await l2n(T, p.outputFilePath, k, sg(t.options.mainLoopModel));
          if (O) I = O;else x = false;
        }
        let H = [p.stderr || "", h].filter(Boolean).join(`
`),
          P;
        if (!m) {
          let O = Uot(e.command, p.stdout || "");
          if (Object.keys(O).length > 0) P = O;
        }
        return j("tengu_powershell_tool_command_executed", {
          command_type: classifyPowerShellCommandType(e.command),
          stdout_length: I.length,
          stderr_length: H.length,
          exit_code: p.code,
          interrupted: p.interrupted,
          powershell_edition: Ue((await s1t()) ?? "unknown"),
          destructive_category: Ue(k1t(e.command) ?? "none"),
          permission_mode: Ue(Lr(t).mode)
        }), {
          data: {
            stdout: I,
            stderr: H,
            interrupted: p.interrupted,
            returnCodeInterpretation: y.message,
            isImage: x,
            persistedOutputPath: R,
            persistedOutputSize: k,
            gitOperation: P
          }
        };
      } finally {
        if (i) i(null);
        if (t.toolUseId) a?.({
          kind: "clear",
          toolUseId: t.toolUseId
        });
      }
    },
    isResultTruncated(e, {
      columns: t
    }) {
      if (e.isImage) return false;
      return sq(e.stdout, t) || sq(e.stderr, t);
    }
  });
});

export {bannerCacheByToolUseId as N3t,classifyPowerShellCommand as eBp,canAutoBgPowerShellCommand as rBp,detectBlockedSleepPattern,isPowerShellSandboxBlocked as iYa,classifyPowerShellCommandType as Q3t,runPowerShellCommandGenerator as aBp,fsPromises as y0e,reactModule as Sfo,newline as rYa,psSearchVerbs as XNp,psReadVerbs as QNp,psIgnoreVerbs as ZNp,autoBackgroundThresholdMs as oYa,progressPollIntervalMs as tBp,blockedSleepCommands as nBp,blockedSleepCommands_2 as sYa,disableBackgroundTasks as Idt,disableBackgroundTasks_2 as aYa,psInputSchema as oBp,psOutputSchema as sBp,psLongRunningVerbs_2 as iBp,PowerShellTool,PowerShellTool_2 as qut};
