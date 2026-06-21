// @ts-nocheck
import {Zg as t_,AN as iN} from "../telemetry/5180_commandWithoutRedirections.ts";
import {Qe,fromEnum as Ue,st as rt} from "../../vendor/m5.ts";
import {Di as ki,dr as fr,gyt as W_t,Cn as En} from "../../vendor/m231.ts";
import {G2n as s2n,X2n as d2n,K2n as a2n,J2n as u2n,Y2n as c2n,V2n as i2n,N$t as g$t,z2n as l2n} from "../telemetry/4054_mediaType.ts";
import {Ds as Rs,Iu as Pu} from "../../vendor/m643.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {ftn as ven,eQo as GJo,pbe as JSe,mbe as XSe,KMe as xMe,mc} from "../config/0645_maxBytes.ts";
import {Pn as Dn,bt as St,Fl as pc,BM as wM} from "../../vendor/m195.ts";
import {vT as _T,UHe as bHe,_6 as s6} from "../session/3862_trackSequence.ts";
import {dxe as KRe,Q2e as H2e,yP as _P} from "../telemetry/2780_eventName.ts";
import {d4t as q3t,Wdt as Tdt,SXa as JYa,TXa as YYa} from "../config/4358_commit.ts";
import {Qae as $ae,initXL as yL,WYr as Kzr} from "../agent/3279_code.ts";
import {KL as BL,t6e as Oqe} from "../../vendor/m5180.ts";
import {e0e as MIe,W4n as n4n,G4n as r4n,Ddt as ldt,j4n as t4n,V4n as o4n,eJ as UY} from "../../vendor/m4342.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {gS as uS,Bot as yot} from "../../vendor/m3259.ts";
import {Bh as Mh,bC as gC} from "../session/2784_uuid.ts";
import {n0e as FIe,s3t as N9t,tza as O7a,nza as L7a,rza as M7a,oza as N7a,sza as B7a} from "../config/4313_onBackground.ts";
import {b,M as L} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {lt as ct,getProjectRoot as yc} from "../session/0131_sent.ts";
import {Ri,pi as ai,Lc as Vc} from "../tools/2227_userFacingName.ts";
import {see as JZ,_tt as ett} from "../../vendor/m2674.ts";
import {dJa as $za,uJa as Uza} from "../../vendor/m4343.ts";
import {Lot as hot,E1t as n1t} from "../../vendor/m3254.ts";
import {j7r as JVr,hZi as eQi} from "../../vendor/m3163.ts";
import {Go as Ko,Pt} from "../../vendor/m632.ts";
import {Om as Um,Lw as Dw,jO as DO} from "../config/2215_level.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {j1 as O1,initCg as sg} from "../telemetry/2531_ignore1mTag.ts";
import {WIn as sIn,C1t as r1t} from "../config/3256_name.ts";
import {rqn as h4n,Jfo as qmo} from "../../vendor/m4344.ts";
import {Ag as dg,SandboxManager as zo} from "../../vendor/m2671.ts";
import {bke as ske,rI as XH} from "../../vendor/m3279.ts";
import {jot as A1t,VF as kq} from "../../vendor/m3280.ts";
import {vC as TC,mh} from "../../vendor/m5145.ts";
import {o$e as M2e,Tq as sq} from "../../vendor/m2800.ts";
import {eI as M0,gMt as VLt,Krt as wrt,Jxe as Dxe,Hhe as fhe,hMt as GLt} from "../telemetry/3157_error.ts";
import {Pfo as vmo,J4n as l4n} from "../core/4335_file_path.ts";
import {ef as sf,Ws as Bs} from "../../vendor/m2248.ts";
import {hz as ez,sq as V4} from "../telemetry/2688_hz.ts";
import {SRe as iRe,getLimitedSkillToolCommands as ltt} from "../tools/2680_getSkillToolInfo.ts";
import {ast as $ot,B0n as ZIn,$0n as n0n,Fla as waa,ist as Uot} from "../telemetry/3313_prNumber.ts";
import {HL as SL,V3t as E3t,xXa as rJa,L6e as f6e,Y9t as x9t} from "../tools/4363_stripAllEnvVars.ts";
import {fJa as Wza,pJa as qza,mJa as jza} from "../../vendor/m4345.ts";
import {D0n as KIn,z1t as x1t} from "../../vendor/m3305.ts";
import {gJa as Kza,hJa as Vza} from "../../vendor/m4346.ts";
import {V1t as w1t,I0n as VIn} from "../../vendor/m3304.ts";
import {F$t as y$t,kqe as lqe} from "../../vendor/m4056.ts";
import {Ql as Xl,Fh as Bh,Fr as Lr} from "../../vendor/m4405.ts";
import {Te} from "../../vendor/m2253.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {ns as Xo} from "../mcp/2194_mcpServerName.ts";
import {AE as pE} from "../tools/2698_allErrors.ts";
import {truncate as Ga} from "../../vendor/m237.ts";
// @ts-nocheck
function classifyBashCommand(cmd) {
  let subcommands = t_(cmd);
  if (subcommands.length === 0) return {
    isSearch: false,
    isRead: false,
    isList: false
  };
  let hasSearch = false,
    hasRead = false,
    hasList = false,
    hasNonIgnored = false;
  for (let sub of subcommands) {
    let verb = sub.trim().split(/\s+/)[0];
    if (!verb || bashIgnoreVerbs.has(verb)) continue;
    hasNonIgnored = true;
    let isSearch = bashSearchVerbs.has(verb),
      isRead = bashReadVerbs.has(verb),
      isList = bashListVerbs.has(verb);
    if (!isSearch && !isRead && !isList) return {
      isSearch: false,
      isRead: false,
      isList: false
    };
    if (isSearch) hasSearch = true;
    if (isRead) hasRead = true;
    if (isList) hasList = true;
  }
  if (!hasNonIgnored) return {
    isSearch: false,
    isRead: false,
    isList: false
  };
  return {
    isSearch: hasSearch,
    isRead: hasRead,
    isList: hasList
  };
}
function isBashPureWriteCommand(cmd) {
  let subcommands = t_(cmd);
  if (subcommands.length === 0) return false;
  let hasAny = false;
  for (let sub of subcommands) {
    let verb = sub.trim().split(/\s+/)[0];
    if (!verb) continue;
    if (hasAny = true, !bashWriteOnlyVerbs.has(verb)) return false;
  }
  return hasAny;
}
function classifyBashCommandType(cmd) {
  let subcommands = t_(cmd);
  if (subcommands.length === 0) return Qe("other");
  for (let sub of subcommands) {
    let verb = ki(sub, " "),
      match = bashLongRunningVerbs.find(v => v === verb);
    if (match) return Ue(match);
  }
  return Qe("other");
}
function canAutoBgBashCommand(cmd) {
  let subcommands = t_(cmd);
  if (subcommands.length === 0) return true;
  let verb = subcommands[0]?.trim().split(/\s+/)[0];
  if (!verb) return true;
  return !bashBlockedSleepCommands.includes(verb);
}
function detectBashBlockedSleepPattern(cmd) {
  let subcommands = t_(cmd);
  if (subcommands.length === 0) return null;
  let first = subcommands[0]?.trim() ?? "",
    match = /^sleep\s+(\d+(?:\.\d*)?)\s*$/.exec(first);
  if (!match) return null;
  let seconds = parseFloat(match[1]);
  if (seconds < s2n) return null;
  let rest = subcommands.slice(1).join(" ").trim();
  return rest ? `sleep ${seconds} followed by: ${rest}` : `standalone sleep ${seconds}`;
}
async function simulateSedEdit(H, ctx, toolCall) {
  let {
      filePath: K,
      newContent: O
    } = H,
    fsHelper = Rs(K),
    encoding = jt(),
    oldContent = ven(fsHelper),
    Y;
  try {
    Y = await encoding.readFile(fsHelper, {
      encoding: oldContent
    });
  } catch (w) {
    if (Dn(w)) return {
      data: {
        stdout: "",
        stderr: `sed: ${K}: No such file or directory
Exit code 1`,
        interrupted: false
      }
    };
    throw w;
  }
  if (_T() && toolCall) await bHe(ctx.getFileHistoryState, ctx.applyFileHistoryOp, fsHelper, toolCall.uuid);
  let A = GJo(fsHelper);
  return await JSe(fsHelper, async () => {
    let u = await XSe(fsHelper, O, oldContent, A);
    ctx.readFileState.set(fsHelper, {
      content: O,
      timestamp: u,
      offset: undefined,
      limit: undefined
    });
  }), KRe(fsHelper, Y, O), {
    data: {
      stdout: "",
      stderr: "",
      interrupted: false
    }
  };
}
async function detectStaleReadFileState(cmd, readFileState, startTimestamp) {
  if (!bashFormatterPattern.test(cmd)) return [];
  let staleFiles = [];
  return await Promise.all(Array.from(readFileState.entries(), ([O, T]) => xMe(O).then(z => {
    if (z > startTimestamp && z > T.timestamp) staleFiles.push(O);
  }).catch(() => {}))), staleFiles;
}
function isDecisionReasonFromRules(reason) {
  if (reason?.type === "rule") return true;
  if (reason?.type === "subcommandResults") return [...reason.reasons.values()].every(r => isDecisionReasonFromRules(r.decisionReason));
  return false;
}
async function* runBashCommandGenerator({
  input: cmdInput,
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
      timeout: timeout,
      run_in_background: runInBackground
    } = cmdInput,
    effectiveTimeout = Math.min(timeout || q3t(), Tdt()),
    stdoutBuffer = "",
    partialOutput = "",
    totalLines = 0,
    totalBytes = 0,
    backgroundTaskId = undefined,
    wasInterrupted = null;
  function C() {
    return new Promise(M => {
      wasInterrupted = () => M(null);
    });
  }
  let R = !bashBlockedSleepCommands_2 && canAutoBgBashCommand(command),
    canAutoBackground = await $ae(command, abortController.signal, "bash", {
      timeout: effectiveTimeout,
      onProgress(M, U, $, F, W) {
        partialOutput = M, stdoutBuffer = U, totalLines = $, totalBytes = W ? F : 0;
        let G = wasInterrupted;
        if (G) wasInterrupted = null, G();
      },
      preventCwdChanges: preventCwdChanges,
      shouldUseSandbox: BL(cmdInput),
      shouldAutoBackground: R,
      sessionEnvVars: sessionEnvVars,
      effortLevel: effortLevel
    }),
    shellProcess = canAutoBackground.result;
  async function I() {
    return (await MIe({
      command: command,
      description: description || command,
      shellCommand: canAutoBackground,
      toolUseId: toolUseId,
      agentId: agentId
    }, {
      abortController: abortController,
      taskRegistry: taskRegistry
    })).taskId;
  }
  function registerAsBackgroundTask(M, U) {
    if (startTime) {
      if (!n4n(startTime, canAutoBackground, description || command, taskRegistry, toolUseId)) return;
      backgroundTaskId = startTime, j(M, {
        command_type: classifyBashCommandType(command)
      }), U?.(startTime);
      return;
    }
    I().then($ => {
      backgroundTaskId = $;
      let F = wasInterrupted;
      if (F) wasInterrupted = null, F();
      if (j(M, {
        command_type: classifyBashCommandType(command)
      }), U) U($);
    });
  }
  if (canAutoBackground.onTimeout && R) canAutoBackground.onTimeout(M => {
    registerAsBackgroundTask("tengu_bash_command_timeout_backgrounded", M);
  });
  if (runInBackground === true && !bashBlockedSleepCommands_2) {
    let M = await I();
    return j("tengu_bash_command_explicitly_backgrounded", {
      command_type: classifyBashCommandType(command)
    }), {
      stdout: "",
      stderr: "",
      code: 0,
      interrupted: false,
      backgroundTaskId: M
    };
  }
  let P = Date.now(),
    startTime = undefined;
  {
    let M = await Promise.race([shellProcess, new Promise(U => {
      setTimeout(F => F(null), bashEarlyWaitMs, U).unref();
    })]);
    if (M !== null) return canAutoBackground.cleanup(), M;
    if (backgroundTaskId) return {
      stdout: "",
      stderr: "",
      code: 0,
      interrupted: false,
      backgroundTaskId: backgroundTaskId
    };
  }
  uS.startPolling(canAutoBackground.taskOutput.taskId);
  let D = null;
  try {
    while (true) {
      let M = C(),
        U = await Promise.race([shellProcess, M]);
      if (U !== null) {
        if (D = U, U.backgroundTaskId !== undefined) {
          if (r4n(U.backgroundTaskId, U, taskRegistry)) Mh(U.backgroundTaskId, ldt(U), {
            toolUseId: toolUseId,
            summary: description || command
          });
          let W = {
              ...U,
              backgroundTaskId: undefined
            },
            {
              taskOutput: G
            } = canAutoBackground;
          if (G.stdoutToFile && !G.outputFileRedundant) W.outputFilePath = G.path, W.outputFileSize = G.outputFileSize, W.outputTaskId = G.taskId;
          return W;
        }
        return U;
      }
      if (backgroundTaskId) return {
        stdout: "",
        stderr: "",
        code: 0,
        interrupted: false,
        backgroundTaskId: backgroundTaskId
      };
      if (startTime) {
        if (canAutoBackground.status === "backgrounded") return {
          stdout: "",
          stderr: "",
          code: 0,
          interrupted: false,
          backgroundTaskId: startTime,
          backgroundedByUser: true
        };
      }
      let $ = Date.now() - P,
        F = Math.floor($ / 1000);
      if (!bashBlockedSleepCommands_2 && backgroundTaskId === undefined && F >= bashEarlyWaitMs / 1000) {
        if (!startTime) startTime = t4n({
          command: command,
          description: description || command,
          shellCommand: canAutoBackground,
          agentId: agentId
        }, taskRegistry, toolUseId);
        if (setToolJSX?.({
          jsx: bashReactModule.createElement(FIe, null),
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
        elapsedTimeSeconds: F,
        totalLines: totalLines,
        totalBytes: totalBytes,
        taskId: canAutoBackground.taskOutput.taskId,
        ...(timeout ? {
          timeoutMs: effectiveTimeout
        } : undefined)
      };
    }
  } finally {
    if (uS.stopPolling(canAutoBackground.taskOutput.taskId), !backgroundTaskId && canAutoBackground.status !== "backgrounded") {
      if (startTime) o4n(startTime, D ? ldt(D) : "stopped", taskRegistry);
      canAutoBackground.cleanup();
    }
  }
}
var bashFsPromises,
  bashPathModule,
  bashReactModule,
  bashNewline = `
`,
  bashSimpleNodeTypes,
  bashEarlyWaitMs = 2000,
  bashSearchVerbs,
  bashReadVerbs,
  bashListVerbs,
  bashIgnoreVerbs,
  bashWriteOnlyVerbs,
  bashBlockedSleepCommands,
  bashBlockedSleepCommands_2,
  disableBashBackgroundTasks,
  bashInputSchemaRaw,
  bashLongRunningVerbs,
  bashLongRunningVerbs_2,
  bashFormatterPattern,
  bashFormatterPattern_2;
var BashTool = b(() => {
  Xr();
  ct();
  Ct();
  H2e();
  Ri();
  UY();
  JZ();
  iN();
  $za();
  hot();
  JVr();
  Ko();
  Um();
  Or();
  an();
  St();
  mc();
  s6();
  ds();
  bs();
  O1();
  Pu();
  sIn();
  h4n();
  yL();
  dg();
  gC();
  ske();
  A1t();
  fr();
  TC();
  yot();
  M2e();
  M0();
  vmo();
  sf();
  ez();
  iRe();
  $ot();
  SL();
  Wza();
  KIn();
  Kza();
  JYa();
  w1t();
  y$t();
  Oqe();
  N9t();
  d2n();
  Xl();
  bashFsPromises = require("fs/promises"), bashPathModule = require("path"), bashReactModule = L(Te(), 1), bashSimpleNodeTypes = new Set(["command_substitution", "simple_expansion", "string"]), bashSearchVerbs = new Set(["find", "grep", "rg", "ag", "ack", "locate", "which", "whereis"]), bashReadVerbs = new Set(["cat", "head", "tail", "less", "more", "wc", "stat", "file", "strings", "jq", "awk", "cut", "sort", "uniq", "tr"]), bashListVerbs = new Set(["ls", "tree", "du"]), bashIgnoreVerbs = new Set(["echo", "printf", "true", "false", ":"]), bashWriteOnlyVerbs = new Set(["mv", "cp", "rm", "mkdir", "rmdir", "chmod", "chown", "chgrp", "touch", "ln", "cd", "export", "unset", "wait"]);
  bashBlockedSleepCommands = ["sleep"], bashBlockedSleepCommands_2 = Ge.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS, disableBashBackgroundTasks = Re(() => E.strictObject({
    command: E.string().describe("The command to execute"),
    timeout: kq(E.number().optional()).describe(`Optional timeout in milliseconds (max ${Tdt()})`),
    description: E.string().optional().describe(`Clear, concise description of what this command does in active voice. Never use words like "complex" or "risk" in the description - just describe what it does.

For simple commands (git, npm, standard CLI tools), keep it brief (5-10 words):
- ls \u2192 "List files in current directory"
- git status \u2192 "Show working tree status"
- npm install \u2192 "Install package dependencies"

For commands that are harder to parse at a glance (piped commands, obscure flags, etc.), add enough context to clarify what it does:
- find . -name "*.tmp" -exec rm {} \\; \u2192 "Find and delete all .tmp files recursively"
- git reset --hard origin/main \u2192 "Discard all local changes and match remote main"
- curl -s url | jq '.data[]' \u2192 "Fetch JSON from URL and extract data array elements"`),
    run_in_background: XH(E.boolean().optional()).describe("Set to true to run this command in the background."),
    dangerouslyDisableSandbox: XH(E.boolean().optional()).describe("Set this to true to dangerously override sandbox mode and run commands without sandboxing."),
    _simulatedSedEdit: E.object({
      filePath: E.string(),
      newContent: E.string()
    }).optional().describe("Internal: pre-computed sed edit result from preview")
  })), bashInputSchemaRaw = Re(() => bashBlockedSleepCommands_2 ? disableBashBackgroundTasks().omit({
    run_in_background: true,
    _simulatedSedEdit: true
  }) : disableBashBackgroundTasks().omit({
    _simulatedSedEdit: true
  })), bashLongRunningVerbs = ["npm", "yarn", "pnpm", "node", "python", "python3", "go", "cargo", "make", "docker", "terraform", "webpack", "vite", "jest", "pytest", "curl", "wget", "build", "test", "serve", "watch", "dev"];
  bashLongRunningVerbs_2 = Re(() => E.object({
    stdout: E.string().describe("The standard output of the command"),
    stderr: E.string().describe("The standard error output of the command"),
    rawOutputPath: E.string().optional().describe("Path to raw output file for large MCP tool outputs"),
    interrupted: E.boolean().describe("Whether the command was interrupted"),
    isImage: E.boolean().optional().describe("Flag to indicate if stdout contains image data"),
    backgroundTaskId: E.string().optional().describe("ID of the background task if command is running in background"),
    backgroundedByUser: E.boolean().optional().describe("True if the user manually backgrounded the command with Ctrl+B"),
    dangerouslyDisableSandbox: E.boolean().optional().describe("Flag to indicate if sandbox mode was overridden"),
    returnCodeInterpretation: E.string().optional().describe("Semantic interpretation for non-error exit codes with special meaning"),
    noOutputExpected: E.boolean().optional().describe("Whether the command is expected to produce no output on success"),
    structuredContent: E.array(E.any()).optional().describe("Structured content blocks"),
    persistedOutputPath: E.string().optional().describe("Path to the persisted full output in tool-results dir (set when output is too large for inline)"),
    persistedOutputSize: E.number().optional().describe("Total size of the output in bytes (set when output is too large for inline)"),
    staleReadFileStateHint: E.string().optional().describe("Model-facing note listing readFileState entries whose mtime bumped during this command (set when WRITE_COMMAND_MARKERS matches)"),
    ghRateLimitHint: E.string().optional().describe("Model-facing system-reminder appended when a gh command reports a GitHub API rate-limit error"),
    gitOperation: ZIn().optional().describe("@internal Structured classification of git/gh operations detected in this command (commit/push/merge/rebase/PR). Client-facing \u2014 lets clients render git activity without re-parsing stdout; not surfaced to the model.")
  }));
  bashFormatterPattern = new RegExp(["--write", "--fix", "--in-place", "--auto-correct", "\\brun\\s+format\\b", "\\brun\\s+fix\\b", "\\b(yarn|pnpm)\\s+format\\b", "\\blint:file\\b", "\\blint:fix\\b", "\\bblack\\b", "\\bisort\\b", "\\bruff\\s+format\\b", "\\bcargo\\s+(fmt|fix)\\b", "\\brustfmt\\b", "\\bgo\\s+fmt\\b", "\\bterraform\\s+fmt\\b", "\\bdprint\\s+fmt\\b", "\\bswiftformat\\b", "\\bphpcbf\\b"].join("|"));
  bashFormatterPattern_2 = ai({
    name: Xo,
    ruleContentField: "command",
    searchHint: "execute shell commands",
    maxResultSizeChars: 30000,
    strict: true,
    async description({
      description: e
    }) {
      return e || "Run shell command";
    },
    async prompt({
      model: e,
      tools: t
    }) {
      let r = t.some(o => Vc(o, pE)) ? await ltt(yc()) : [];
      return YYa(e, qmo(r));
    },
    isConcurrencySafe(e) {
      return this.isReadOnly?.(e) ?? false;
    },
    isReadOnly(e) {
      let t = E3t(e.command);
      return VIn(e, t).behavior === "allow";
    },
    toAutoClassifierInput(e) {
      return e.command;
    },
    async preparePermissionMatcher({
      command: e
    }) {
      let t = await ett(e),
        n,
        r = false;
      if (t.kind === "simple") n = t.commands.map(o => o.argv.join(" "));else if (t.differential || !bashSimpleNodeTypes.has(t.nodeType ?? "")) return () => true;else {
        let o = Uza(e);
        if (o === null || o.length === 0) return () => true;
        n = o, r = true;
      }
      return o => {
        let s = rJa(o);
        if (r && !(s !== null ? !/\s/.test(s) : /^[^\s*?[]+\s?\*$/.test(o))) return true;
        return n.some(i => {
          if (s !== null) return i === s || i.startsWith(`${s} `) || i === `xargs ${s}` || i.startsWith(`xargs ${s} `);
          return f6e(o, i) || f6e(`xargs ${o}`, i);
        });
      };
    },
    isSearchOrReadCommand(e) {
      let t = bashInputSchemaRaw().safeParse(e);
      if (!t.success) return {
        isSearch: false,
        isRead: false,
        isList: false
      };
      return classifyBashCommand(t.data.command);
    },
    get inputSchema() {
      return bashInputSchemaRaw();
    },
    coerceInput: qza,
    get outputSchema() {
      return bashLongRunningVerbs_2();
    },
    userFacingName(e) {
      if (!e) return "Bash";
      if (e.command) {
        let t = lqe(e.command);
        if (t) return l4n({
          file_path: t.filePath,
          old_string: "x"
        });
      }
      return rt(process.env.CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR) && BL(e) ? "SandboxedBash" : "Bash";
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
    async validateInput(e) {
      if (V4() && !bashBlockedSleepCommands_2 && !e.run_in_background) {
        let t = detectBashBlockedSleepPattern(e.command);
        if (t !== null) return {
          result: false,
          message: `Blocked: ${t}. To wait for a condition, use Monitor with an until-loop (e.g. \`until <check>; do sleep 2; done\`). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.`,
          errorCode: 10
        };
      }
      return {
        result: true
      };
    },
    async checkPermissions(e, t) {
      let n = await x9t(e, t);
      if (e.dangerouslyDisableSandbox && n.behavior !== "deny" && n.behavior !== "ask" && !isDecisionReasonFromRules(n.decisionReason) && !BL(e) && BL({
        ...e,
        dangerouslyDisableSandbox: false
      })) return {
        behavior: "ask",
        decisionReason: {
          type: "sandboxOverride",
          reason: "dangerouslyDisableSandbox"
        },
        message: "Run outside of the sandbox"
      };
      return n;
    },
    renderToolUseMessage: O7a,
    renderToolUseProgressMessage: L7a,
    renderToolUseQueuedMessage: M7a,
    renderToolResultMessage: N7a,
    extractSearchText({
      stdout: e,
      stderr: t
    }) {
      return t ? `${e}
${t}` : e;
    },
    mapToolResultToToolResultBlockParam({
      interrupted: e,
      stdout: t,
      stderr: n,
      isImage: r,
      backgroundTaskId: o,
      backgroundedByUser: s,
      structuredContent: i,
      persistedOutputPath: a,
      persistedOutputSize: l,
      staleReadFileStateHint: c,
      ghRateLimitHint: u
    }, d) {
      if (i && i.length > 0) return {
        tool_use_id: d,
        type: "tool_result",
        content: i
      };
      if (r) {
        let A = a2n(t, d);
        if (A) return A;
      }
      let p = t;
      if (t) p = t.replace(/^(\s*\n)+/, ""), p = p.trimEnd();
      if (a) {
        let A = VLt(p, wrt);
        p = Dxe({
          filepath: a,
          originalSize: l ?? 0,
          isJson: false,
          preview: A.preview,
          hasMore: A.hasMore
        });
      }
      let m = n.trim();
      if (e) {
        if (n) m += bashNewline;
        m += "<error>Command was aborted before completion</error>";
      }
      let f = "";
      if (o) {
        let A = mh(o);
        if (s) f = `Command was manually backgrounded by user with ID: ${o}. Output is being written to: ${A}`;else f = `Command running in background with ID: ${o}. Output is being written to: ${A}. You will be notified when it completes. To check interim output, use ${Bs} on that file path.`;
      }
      return {
        tool_use_id: d,
        type: "tool_result",
        content: [p, m, f, c, u].filter(Boolean).join(`
`),
        is_error: e
      };
    },
    async call(e, t, n, r, o) {
      if (e._simulatedSedEdit) return simulateSedEdit(e._simulatedSedEdit, t, r);
      let s = Math.floor(Date.now() / 1000) * 1000,
        {
          abortController: i,
          getAppState: a,
          setToolJSX: l,
          emitToolProgress: c
        } = t,
        u = new W_t(),
        d = "",
        p,
        m = 0,
        f = false,
        A,
        h = !t.agentId,
        g = !h,
        _ = BL(e);
      try {
        let U = runBashCommandGenerator({
            input: e,
            abortController: i,
            taskRegistry: t.taskRegistry,
            setToolJSX: l,
            emitToolProgress: c,
            preventCwdChanges: g,
            isMainThread: h,
            toolUseId: t.toolUseId,
            agentId: t.agentId,
            sessionEnvVars: t.sessionEnvVars,
            effortLevel: Dw(t.options.mainLoopModel) ? DO(t.options.mainLoopModel, Bh(t)) : undefined
          }),
          $;
        do if ($ = await U.next(), !$.done && o) {
          let Q = $.value;
          o({
            type: "progress",
            toolUseID: `bash-progress-${m++}`,
            data: {
              type: "bash_progress",
              output: Q.output,
              fullOutput: Q.fullOutput,
              elapsedTimeSeconds: Q.elapsedTimeSeconds,
              totalLines: Q.totalLines,
              totalBytes: Q.totalBytes,
              taskId: Q.taskId,
              timeoutMs: Q.timeoutMs
            }
          });
        } while (!$.done);
        if (A = $.value, A.intercepted) _ = false;
        n0n(e.command, A.code, A.stdout);
        let F = A.interrupted && i.signal.reason === "interrupt",
          W = A.interrupted && (i.signal.reason === "interrupt" || i.signal.reason === "user-cancel" || i.signal.reason === "remote-cancel");
        if (u.append((A.stdout || "").trimEnd() + bashNewline), p = jza(e.command, A.code, A.stdout || "", ""), A.stdout && A.stdout.includes(".git/index.lock': File exists")) j("tengu_git_index_lock_error", {});
        if (p.isError && !F) {
          if (A.code !== 0) u.append(`Exit code ${A.code}`);
        }
        if (!g) {
          let Q = a();
          if (u2n(Q.toolPermissionContext)) d = c2n("");
        }
        let G = A.stdout || "",
          K = zo.annotateStderrWithSandboxFailures(e.command, G);
        if (A.preSpawnError) {
          if (/null bytes/.test(A.preSpawnError)) throw new pc(A.preSpawnError, "Bash: command contained null bytes (argv echo redacted)");
          throw new pc(A.preSpawnError, "Bash: pre-spawn error (cwd/argv redacted)");
        }
        if (p.isError && !F) throw j("tengu_bash_tool_command_failed", {
          command_type: classifyBashCommandType(e.command),
          stdout_length: G.length,
          stderr_length: 0,
          exit_code: A.code,
          interrupted: A.interrupted,
          executor_shell: await Kzr(),
          executor_shell_overridden: Boolean(process.env.CLAUDE_CODE_SHELL),
          sandboxed: _,
          destructive_category: Ue(x1t(e.command) ?? "none"),
          permission_mode: Ue(Lr(t).mode)
        }), new wM("", K, A.code, W, K !== G);
        f = A.interrupted;
      } finally {
        if (l) l(null);
        if (t.toolUseId) c?.({
          kind: "clear",
          toolUseId: t.toolUseId
        });
      }
      let y = u.toString(),
        T = 67108864,
        S,
        C;
      if (A.outputFilePath && A.outputTaskId) try {
        let U = await bashFsPromises.stat(A.outputFilePath);
        C = U.size, await fhe();
        let $ = GLt(A.outputTaskId, false);
        if (U.size > T) await bashFsPromises.truncate(A.outputFilePath, T);
        try {
          await bashFsPromises.link(A.outputFilePath, $);
        } catch {
          await bashFsPromises.copyFile(A.outputFilePath, $);
        }
        S = $;
      } catch {}
      j("tengu_bash_tool_command_executed", {
        command_type: classifyBashCommandType(e.command),
        stdout_length: y.length,
        stderr_length: 0,
        exit_code: A.code,
        interrupted: f,
        executor_shell: await Kzr(),
        executor_shell_overridden: Boolean(process.env.CLAUDE_CODE_SHELL),
        sandboxed: _,
        destructive_category: Ue(x1t(e.command) ?? "none"),
        permission_mode: Ue(Lr(t).mode)
      });
      let R = eQi(e.command);
      if (R) j("tengu_code_indexing_tool_used", {
        tool: Ue(R),
        source: Qe("cli"),
        success: A.code === 0
      });
      let k = i2n(y),
        x = n1t(k, e.command);
      if (k = x.stripped, h && x.hints.length > 0) for (let U of x.hints) r1t(U);
      let I = g$t(k),
        H = k;
      if (I) {
        let U = await l2n(k, A.outputFilePath, C, sg(t.options.mainLoopModel));
        if (U) H = U;else I = false;
      }
      let P = A.backgroundTaskId ? undefined : waa(e.command, A.stdout || ""),
        O;
      if (!A.backgroundTaskId) {
        let U = Uot(e.command, A.stdout || "");
        if (Object.keys(U).length > 0) O = U;
      }
      let D;
      if (!f && !I && !A.backgroundTaskId) {
        let U = await detectStaleReadFileState(e.command, t.readFileState, s);
        if (U.length > 0) {
          let $ = Pt(),
            F = 5,
            W = U.slice(0, 5).map(K => bashPathModule.relative($, K) || K).join(", "),
            G = U.length > 5 ? ` and ${U.length - 5} more` : "";
          D = `[This command modified ${U.length} ${En(U.length, "file")} you've previously read: ${W}${G}. Call Read before editing.]`;
        }
      }
      if (!f && !I && !A.backgroundTaskId) await Vza(e.command, t.readFileState, i.signal, A.code);
      return {
        data: {
          stdout: H,
          stderr: d,
          interrupted: f,
          isImage: I,
          returnCodeInterpretation: p?.message,
          noOutputExpected: isBashPureWriteCommand(e.command),
          backgroundTaskId: A.backgroundTaskId,
          backgroundedByUser: A.backgroundedByUser,
          dangerouslyDisableSandbox: "dangerouslyDisableSandbox" in e ? e.dangerouslyDisableSandbox : undefined,
          persistedOutputPath: S,
          persistedOutputSize: C,
          staleReadFileStateHint: D,
          ghRateLimitHint: P,
          gitOperation: O
        }
      };
    },
    renderToolUseErrorMessage: B7a,
    isResultTruncated(e, {
      columns: t
    }) {
      if (e.isImage) return false;
      return sq(e.stdout, t) || sq(e.stderr, t);
    }
  });
});

export {classifyBashCommand as YUp,isBashPureWriteCommand as JUp,classifyBashCommandType as m4t,canAutoBgBashCommand as e2p,detectBashBlockedSleepPattern as t2p,simulateSedEdit as n2p,detectStaleReadFileState as o2p,isDecisionReasonFromRules as RXa,runBashCommandGenerator as s2p,bashFsPromises as E0e,bashPathModule as wXa,bashReactModule as bAo,bashNewline as bXa,bashSimpleNodeTypes as jUp,bashEarlyWaitMs as EXa,bashSearchVerbs as WUp,bashReadVerbs as GUp,bashListVerbs as VUp,bashIgnoreVerbs as KUp,bashWriteOnlyVerbs as zUp,bashBlockedSleepCommands as XUp,bashBlockedSleepCommands_2 as p4t,disableBashBackgroundTasks as CXa,bashInputSchemaRaw as vXa,bashLongRunningVerbs as QUp,bashLongRunningVerbs_2 as ZUp,bashFormatterPattern as r2p,bashFormatterPattern_2 as Rl,BashTool as TU};
