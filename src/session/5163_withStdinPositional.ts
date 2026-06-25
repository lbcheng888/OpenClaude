// @ts-nocheck
import {ft as J_,b as L} from "../../runtime.ts";
import {Brn as Ee_,r2 as WI} from "../config/0646_existsSync.ts";
import {Yt as r_,Es as u9} from "../../vendor/m641.ts";
import {ec as P1,Id as VO,Nie as f7H,Ont as UeH,T4 as yp,Oi as AK,V0 as ZL,Hz as he,bI as pG,Tg as nY,Pf as iY} from "../agent/2591_level.ts";
import {Ce as ZH,Xd as LO,dK as ta,Ct as R_} from "../../vendor/m197.ts";
import {Swe as JPH,J8 as Ui,y4 as kp,IOt as tR_,Hvn as iD6,B2e as iCH,kvn as nD6,U2e as rCH} from "../../vendor/m2589.ts";
import {isTmuxControlMode as x_,Po as dq} from "../../vendor/m638.ts";
import {Xde as NyH,zf as Pw} from "../../vendor/m133.ts";
import {getAgentDefinitionsWithOverrides as yk,kg as tw} from "../permissions/4476_toAgentInfos.ts";
import {b$l as ek4,JJn as _n6} from "../../vendor/m5158.ts";
import {logForDebugging as y,qe as UH} from "../config/0236_setHasFormattedOutput.ts";
import {zd as WO,YDe as GLH,Fft as Q3_,C8t as cp_,A8t as dp_,bL as lN} from "../../vendor/m4515.ts";
import {EPo as K0q,v$l as Oy4} from "../telemetry/5161_forceTransient.ts";
import {AT as Mj,d_l as R44,fue as b1H} from "../../vendor/m4610.ts";
import {logEventAsync as jJ,kt as v_} from "../../vendor/m132.ts";
import {mue as C1H,CL as iN} from "../../vendor/m4609.ts";
import {bgSupervisorNoun as Jf,daemonHint as R9H,bgSupervisorNounCap as iTH,fC as XP} from "../config/2212_shouldShowLaunchComposer.ts";
import {sPo as FWq,oPo as UWq} from "../telemetry/5155_qJn.ts";
import {Qu as P$,REPL_CONTEXT_NAME as WG,soe as MlH,mn as f6} from "../telemetry/0600_feature_name.ts";
import {peekForStdinData as HA_,LP as ek} from "../../vendor/m232.ts";
import {bt as M_,Gc as T5} from "../../vendor/m588.ts";
import {gN as Cu,fOe as mhH,_N as Sb} from "../../vendor/m5161.ts";
import {OVt as _g_,rPo as BWq} from "../telemetry/5154_onStarting.ts";
import {kJ as ja,JDo as CWq} from "../telemetry/5151_promise.ts";
import {sleep as n6} from "../telemetry/1488_withTimeout.ts";
import {u_t as nT_,gPo as sWq} from "../permissions/5158_name.ts";
import {N6 as CU,sGe as yFH} from "../config/5153_proto.ts";
import {W0 as ML,vve as M2H} from "../../vendor/m2296.ts";
import {Ott as ctH,AAn as Bj6} from "../config/2428_type.ts";
import {cSe as OfH,zue as O5H,a_t as cT_} from "./5157_confirmed.ts";
import {Ve as K_} from "../../vendor/m5.ts";
import {hasSkipDangerousModePermissionPrompt as yI,hasAutoModeOptIn as Em,br as v8} from "../config/0745_updateSettingsForSource.ts";
import {getGlobalConfig as N_,tr as O8} from "./5228_shouldSkipPluginAutoupdate.ts";
import {yh as qw,Nxe as DRH} from "../agent/4175_state.ts";
import {cc as M1} from "../../vendor/m2459.ts";
import {yPo as eWq} from "../../vendor/m5159.ts";
import {_B as UC} from "../telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {Bu as t5} from "../../vendor/m2213.ts";
// @ts-nocheck
var Jy4 = {};
J_(Jy4, {
  withStdinPositional: () => withStdinPositional,
  stripSessionIdFlag: () => stripSessionIdFlag,
  stripResumeFlags: () => stripResumeFlags,
  stripBgFlags: () => stripBgFlags,
  stopHandler: () => stopHandler,
  spawnBgSession: () => spawnBgSession,
  rmHandler: () => rmHandler,
  respawnHandler: () => respawnHandler,
  readBgStdin: () => readBgStdin,
  preSeedReplBgJob: () => preSeedReplBgJob,
  parseResumeTarget: () => parseResumeTarget,
  logsHandler: () => logsHandler,
  handleBgFlag: () => handleBgFlag,
  formatBgHints: () => formatBgHints,
  flagsWithoutPositional: () => flagsWithoutPositional,
  detailForStderr: () => detailForStderr,
  bgVerbExtraArgsNote: () => bgVerbExtraArgsNote,
  attachHandler: () => attachHandler
});
function buildShellCmd(cmd) {
  return Ee_(), process.env.SHELL ? {
    cmd: process.env.SHELL,
    args: ["-c", cmd]
  } : r_() === "windows" ? {
    cmd: process.env.COMSPEC || "cmd.exe",
    args: ["/d", "/s", "/c", cmd]
  } : {
    cmd: "/bin/sh",
    args: ["-c", cmd]
  };
}
async function preSeedReplBgJob(sessionId, opts) {
  let shortId = sessionId.slice(0, 8),
    jobDir = P1(shortId);
  await fsPromises.mkdir(pathModule.join(jobDir, "tmp"), {
    recursive: true
  });
  let intentStr = opts.intent ?? "";
  return await VO(jobDir, f7H({
    template: {
      name: "bg",
      description: ""
    },
    intent: intentStr,
    name: opts.name,
    nameSource: opts.nameSource,
    detail: opts.detail ?? UeH,
    tempo: "blocked",
    needs: yp,
    sessionId: sessionId,
    cwd: opts.cwd,
    worktreePath: opts.worktree?.path,
    worktreeBranch: opts.worktree?.branch,
    worktreeHookBased: opts.worktree?.hookBased,
    originCwd: opts.worktree?.originCwd,
    bgIsolation: "none",
    providerEnv: collectEgressGatewayEnv(),
    sessionPermissionRules: opts.sessionPermissionRules,
    memoryToggledOff: opts.memoryToggledOff
  })), {
    short: shortId,
    jobDir: jobDir
  };
}
async function spawnBgSession(args, sessionId, mode = "shell", cwd, spawnOpts, reattachEnv, shortIdOverride) {
  let gateError = checkBgSpawnGate(args);
  if (gateError) return {
    ok: false,
    error: gateError,
    reason: "gate_blocked"
  };
  let newSessionId = sessionId ?? cryptoModule.randomUUID(),
    shortId = shortIdOverride ?? newSessionId.slice(0, 8),
    jobDir = P1(shortId);
  try {
    return await fsPromises.mkdir(pathModule.join(jobDir, "tmp"), {
      recursive: true
    }), await dispatchBgSession(args, mode, cwd, spawnOpts, reattachEnv, {
      sessionId: newSessionId,
      short: shortId,
      jobDir: jobDir,
      freshDir: sessionId === undefined
    });
  } catch (err) {
    if (mode !== "fleet" && mode !== "spare") await fsPromises.rm(jobDir, {
      recursive: true,
      force: true
    }).catch(() => {});
    return {
      ok: false,
      error: `Couldn't start the session \u2014 ${ZH(err)}`,
      reason: `spawn_failed_${LO(err) ?? ta(err) ?? "unknown"}`
    };
  }
}
async function dispatchBgSession(args, mode, cwd, spawnOpts, reattachEnv, ids) {
  let {
      sessionId: sessionId,
      short: short,
      jobDir: jobDir,
      freshDir: freshDir
    } = ids,
    separatorIdx = findDoubleDashIndex(args),
    argsBeforeSep = separatorIdx >= 0 ? args.slice(0, separatorIdx) : args,
    agentFlag = extractFlag(argsBeforeSep, "--agent"),
    nameFlag = undefined,
    resolvedName = extractFlag(argsBeforeSep, "--name", "-n"),
    resumeTarget = resolvedName ?? spawnOpts?.name,
    promptText = parseResumeTarget(argsBeforeSep),
    quotedArgIndices = separatorIdx >= 0 ? args.slice(separatorIdx + 1).join(" ") : extractPromptPositional(args, promptText),
    hasResumeFlag = getQuotedArgIndices(argsBeforeSep),
    hasForkFlag = argsBeforeSep.some((arg, idx) => {
      if (hasResumeFlag.has(idx)) return false;
      if (arg === "--continue" || arg === "--resume" || arg.startsWith("--resume=")) return true;
      let {
        peeled: a,
        rest: t
      } = peelShortFlags(arg);
      return a.includes("-c") || t === "-c" || t === "-r" || /^-r./.test(t);
    }),
    strippedResume = argsBeforeSep.some((o, i) => !hasResumeFlag.has(i) && o === "--fork-session"),
    bgIsolation = stripResumeFlags(argsBeforeSep),
    providerEnv = mode === "repl" ? "none" : spawnOpts?.bgIsolation,
    sessionPermRules = spawnOpts?.providerEnv ?? collectEgressGatewayEnv(),
    memoryOff = spawnOpts?.sessionPermissionRules,
    respawnArgsList = spawnOpts?.memoryToggledOff,
    C = JPH(separatorIdx >= 0 ? bgIsolation : flagsWithoutPositional(bgIsolation));
  if (mode === "shell") {
    let o = cwd ?? x_(),
      i = Ui(bgIsolation),
      a = [...bgIsolation.filter((t, e) => i[e] !== t), ...(NyH(o) ? [o] : []), ...(spawnOpts?.exec && NyH(spawnOpts.exec) ? [spawnOpts.exec] : []), ...(promptText !== undefined && NyH(promptText) ? [promptText] : [])];
    if (a.length > 0) process.stderr.write(`warning: background sessions do not support Windows network (UNC) paths; the following will be neutralized: ${a.join(", ")}
`);
  }
  let forkFlags = promptText !== undefined && promptText === sessionId,
    sessionIdArgs = hasForkFlag && !strippedResume ? ["--fork-session"] : [],
    m = forkFlags ? [] : ["--session-id", sessionId, ...sessionIdArgs];
  if (mode === "shell" && argsBeforeSep.some((o, i) => !hasResumeFlag.has(i) && (o === "--session-id" || o.startsWith("--session-id=")))) process.stderr.write(`warning: --bg manages the session id; ignoring --session-id (use --resume <id> to continue an existing session)
`);
  let b = agentFlag ? (await yk(cwd ?? x_())).activeAgents.find(o => o.agentType === agentFlag) : undefined;
  if (agentFlag && !b && mode === "shell") process.stderr.write(`warning: no agent named '${agentFlag}' \u2014 spawning with default template
`);
  let intentStr = undefined,
    isIdleOnStart = spawnOpts?.intent ?? quotedArgIndices ?? "",
    seedWriteSucceeded = !b?.initialPrompt && !spawnOpts?.exec && !quotedArgIndices && !argsBeforeSep.some((o, i) => !hasResumeFlag.has(i) && o === "--reply-on-resume"),
    seedWritePromise = false,
    d;
  if (mode !== "fleet" && mode !== "spare") {
    let o = freshDir ? null : await AK(jobDir);
    if (o === null) d = VO(jobDir, f7H({
      template: {
        name: spawnOpts?.exec ? "exec" : agentFlag ?? undefined ?? "bg",
        description: b?.whenToUse ?? intentStr?.description ?? "",
        initialPrompt: b?.initialPrompt,
        color: b?.color
      },
      routine: undefined,
      respawnFlags: C,
      intent: isIdleOnStart,
      name: resumeTarget,
      nameSource: resolvedName ? "user" : spawnOpts?.nameSource,
      detail: spawnOpts?.detail ?? (seedWriteSucceeded ? intentStr ? `(idle \u2014 waiting for ${ek4(intentStr.triggers)})` : UeH : undefined),
      tempo: seedWriteSucceeded ? intentStr ? "idle" : "blocked" : undefined,
      needs: seedWriteSucceeded && !intentStr ? yp : undefined,
      sessionId: sessionId,
      cwd: cwd ?? x_(),
      worktreePath: spawnOpts?.worktree?.path,
      worktreeBranch: spawnOpts?.worktree?.branch,
      worktreeHookBased: spawnOpts?.worktree?.hookBased,
      originCwd: spawnOpts?.worktree?.originCwd,
      bgIsolation: providerEnv,
      providerEnv: sessionPermRules,
      sessionPermissionRules: memoryOff,
      memoryToggledOff: respawnArgsList
    })).then(() => {
      seedWritePromise = true;
    }).catch(i => y(`bg seed state write failed: ${ZH(i)}`, {
      level: "warn"
    }));else if (C.length > 0 && o.respawnFlags.length === 0) d = VO(jobDir, {
      ...o,
      respawnFlags: C
    }).catch(i => y(`bg respawnFlags patch failed: ${ZH(i)}`, {
      level: "warn"
    }));
  }
  let l = {
      proto: WO,
      short: short,
      sessionId: sessionId,
      createdAt: Date.now(),
      source: mode === "repl" ? "slash" : mode,
      cwd: cwd ?? x_(),
      launch: spawnOpts?.exec ? {
        mode: "exec",
        ...buildShellCmd(spawnOpts.exec)
      } : hasForkFlag && promptText !== undefined ? {
        mode: "resume",
        sessionId: promptText,
        fork: !forkFlags && (strippedResume || sessionIdArgs.length > 0),
        flagArgs: [...bgIsolation, ...(separatorIdx >= 0 ? args.slice(separatorIdx) : [])]
      } : {
        mode: "prompt",
        args: [...m, ...stripSessionIdFlag(args)]
      },
      respawnFlags: bgIsolation,
      env: {
        ...sessionPermRules,
        ...(providerEnv && {
          CLAUDE_BG_ISOLATION: providerEnv
        }),
        ...(memoryOff && {
          CLAUDE_BG_SESSION_PERMISSION_RULES: JSON.stringify(memoryOff)
        }),
        ...(respawnArgsList && {
          CLAUDE_BG_MEMORY_TOGGLED_OFF: "1"
        })
      },
      reattachEnv: reattachEnv,
      worktree: spawnOpts?.worktree ? {
        path: spawnOpts.worktree.path,
        ownershipToken: sessionId
      } : undefined,
      isolation: b?.isolation === "worktree" && b.source !== "built-in" ? "worktree" : "none",
      agent: agentFlag,
      routine: undefined,
      seed: {
        intent: isIdleOnStart,
        name: resumeTarget
      },
      cols: process.stdout.columns || undefined,
      rows: process.stdout.rows || undefined
    },
    [, dispatchResult] = await Promise.all([d ?? Promise.resolve(), K0q(l)]);
  if (dispatchResult.ok) return {
    ok: true,
    short: short,
    sessionId: sessionId,
    idle: seedWriteSucceeded,
    name: resumeTarget
  };
  if (dispatchResult.reason === "ack-timeout" || dispatchResult.reason === "enoconn" || dispatchResult.reason === "estarting") {
    let o = await Mj({
      proto: WO,
      op: "list"
    });
    if (o.ok && o.op === "list" && o.jobs.some(i => i.short === short && i.nonce === dispatchResult.nonce && !i.outcome)) return y(`bg: daemon dispatch ${dispatchResult.reason} but worker is live`, {
      level: "warn"
    }), await jJ("tengu_bg_dispatch_rescued", {
      reason_ack_timeout: dispatchResult.reason === "ack-timeout",
      reason_enoconn: dispatchResult.reason === "enoconn",
      reason_estarting: dispatchResult.reason === "estarting"
    }), {
      ok: true,
      short: short,
      sessionId: sessionId,
      idle: seedWriteSucceeded,
      name: resumeTarget,
      rescued: true
    };
    if (dispatchResult.reason === "ack-timeout" && o.ok && o.op === "list" && !o.jobs.some(i => i.short === short)) {
      let i = await Mj({
        proto: WO,
        op: "dispatch",
        d: {
          ...l,
          nonce: dispatchResult.nonce
        },
        timeoutMs: 5000,
        auth: await C1H()
      }, {
        timeoutMs: 6000
      });
      if (i.ok && i.op === "dispatch") return y(`bg: ack-timeout recovered via redispatch (${short})`, {
        level: "warn"
      }), await jJ("tengu_bg_dispatch_rescued", {
        reason_ack_timeout: true,
        reason_enoconn: false,
        reason_estarting: false,
        via_redispatch: true
      }), {
        ok: true,
        short: short,
        sessionId: sessionId,
        idle: seedWriteSucceeded,
        name: resumeTarget,
        rescued: true
      };
    }
  }
  if (seedWritePromise) await fsPromises.rm(jobDir, {
    recursive: true,
    force: true
  }).catch(() => {});
  if (dispatchResult.reason === "short-alive") return {
    ok: false,
    alive: true,
    short: short,
    error: `Session ${short} is already running \u2014 \`claude attach ${short}\` to join it`,
    reason: "short_alive"
  };
  if (dispatchResult.reason === "stale-short") return {
    ok: false,
    error: "Previous session is still shutting down \u2014 try again in a moment",
    reason: "stale_short"
  };
  return {
    ok: false,
    error: `Couldn't reach the ${Jf()} (${formatDispatchReason(dispatchResult.reason)})${R9H("status")}`,
    reason: dispatchResult.reason === "daemon-unreachable" ? "daemon_unavailable" : dispatchResult.reason.replace(/-/g, "_")
  };
}
async function handleBgFlag(args) {
  let separatorIdx = findDoubleDashIndex(args),
    argsBeforeSep = separatorIdx >= 0 ? args.slice(0, separatorIdx) : args,
    quotedIndices = getQuotedArgIndices(argsBeforeSep),
    execFlagIdx = argsBeforeSep.findIndex((arg, idx) => !quotedIndices.has(idx) && (arg === "--exec" || arg.startsWith("--exec=")));
  if (execFlagIdx !== -1) {
    let execValue = args[execFlagIdx].includes("=") ? args[execFlagIdx].slice(args[execFlagIdx].indexOf("=") + 1) : undefined,
      execCmd = execValue ?? args.slice(execFlagIdx + 1).join(" ");
    if (!execCmd.trim()) {
      process.stderr.write(`--exec requires a command.
`), process.exitCode = 1;
      return;
    }
    let cleanArgs = stripBgFlags([...args.slice(0, execFlagIdx), ...(execValue !== undefined ? args.slice(execFlagIdx + 1) : [])]),
      nameFlagVal = extractFlag(cleanArgs, "--name", "-n"),
      cleanQuoted = getQuotedArgIndices(cleanArgs),
      cleanBeforeSep = findDoubleDashIndex(cleanArgs),
      cleanPlain = cleanBeforeSep >= 0 ? cleanArgs.slice(0, cleanBeforeSep) : cleanArgs,
      M = cleanPlain.filter((Z, W) => !cleanQuoted.has(W));
    if (FWq(M)) {
      process.stderr.write(`${UWq(cleanArgs)}
`), process.exitCode = 1;
      return;
    }
    let X = cleanPlain.filter((Z, W) => !cleanQuoted.has(W) && isFlagArg(Z) && !/^(-n|--name)(=|$)/.test(Z) && !/^-n./.test(Z));
    if (X.length > 0) process.stderr.write(`warning: --exec ignores ${X.join(" ")} (only --name composes)
`);
    let P = await spawnBgSession([], undefined, "shell", undefined, {
      intent: execCmd,
      exec: execCmd,
      ...(nameFlagVal && {
        name: nameFlagVal,
        nameSource: "user"
      })
    });
    if (!P.ok) {
      await P$("cli_bg_dispatch_exec", P.reason ?? "spawn_failed"), process.stderr.write(`${P.error}
`), process.exitCode = 1;
      return;
    }
    await WG("cli_bg_dispatch_exec"), process.stdout.write(formatBgHints(P.short, undefined, nameFlagVal || execCmd) + `
`);
    return;
  }
  let cleanArgs = stripBgFlags(args),
    stdinContent = await readBgStdin(),
    spawnResult = await spawnBgSession(stdinContent ? withStdinPositional(cleanArgs, stdinContent) : cleanArgs);
  if (!spawnResult.ok) {
    await (spawnResult.reason === "gate_blocked" ? MlH : P$)("cli_bg_dispatch", spawnResult.reason ?? "spawn_failed"), process.stderr.write(`${spawnResult.error}
`), process.exitCode = 1;
    return;
  }
  if (spawnResult.rescued) await MlH("cli_bg_dispatch", "rescued");else await WG("cli_bg_dispatch");
  process.stdout.write(formatBgHints(spawnResult.short, spawnResult.idle ? UeH : undefined, spawnResult.name) + `
`);
}
async function readBgStdin(stdin = process.stdin) {
  if (stdin.isTTY) return "";
  stdin.setEncoding("utf8");
  let content = "",
    truncated = false,
    appendChunk = chunk => {
      if (truncated) return;
      if (content.length + chunk.length > MAX_STDIN_BYTES) {
        content += chunk.slice(0, MAX_STDIN_BYTES - content.length), truncated = true;
        return;
      }
      content += chunk;
    };
  stdin.on("data", appendChunk);
  let hadData = await HA_(stdin, 3000);
  if (stdin.off("data", appendChunk), hadData) return "";
  if (truncated) process.stderr.write(`warning: piped stdin exceeds ${MAX_STDIN_BYTES} bytes, truncated
`);
  return content.replace(/\r?\n$/, "");
}
function withStdinPositional(args, stdinContent) {
  let sepIdx = findDoubleDashIndex(args);
  if (sepIdx >= 0) {
    let afterSep = args.slice(sepIdx + 1).join(" ");
    return [...args.slice(0, sepIdx), "--", afterSep ? `${afterSep}
${stdinContent}` : stdinContent];
  }
  let quotedIndices = getQuotedArgIndices(args),
    lastPositionalIdx = -1;
  for (let i = 0; i < args.length; i++) {
    if (quotedIndices.has(i)) continue;
    let arg = args[i];
    if (isFlagArg(arg)) {
      if (arg.includes("=")) continue;
      let next = args[i + 1];
      if (next === undefined) continue;
      let {
        rest: rest
      } = peelShortFlags(arg);
      if (arg === "--resume" || rest === "-r") {
        if (!isFlagArg(next)) i++;
        continue;
      }
      if (rest.length > 2 && (/^-r./.test(rest) || kp.has(rest.slice(0, 2)))) continue;
      if (tR_.has(arg) && arg !== "--remote-control" && arg !== "--rc" || iD6.has(rest)) continue;
      if (!quotedIndices.has(i + 1) && !isFlagArg(next)) i++;
      continue;
    }
    lastPositionalIdx = i;
  }
  if (lastPositionalIdx >= 0) {
    let result = [...args];
    return result[lastPositionalIdx] = `${args[lastPositionalIdx]}
${stdinContent}`, result;
  }
  return [...args, "--", stdinContent];
}
function formatDispatchReason(reason) {
  switch (reason) {
    case "daemon-unreachable":
      return "not running";
    case "ack-timeout":
      return "timed out";
    case "dispatch-write":
      return "couldn't write dispatch file";
    case "enoconn":
      return "socket missing";
    case "estarting":
      return "service still starting";
    case "stale-short":
      return "id collision with a prior job";
  }
}
function formatBgHints(shortId, idleHint, nameOrExec) {
  let dim = (label, hint) => M_.dim("  " + label.padEnd(26) + hint);
  return [`backgrounded \xB7 ${M_.cyan(shortId)}${nameOrExec ? ` \xB7 ${nameOrExec}` : ""}${idleHint ? M_.dim(` ${idleHint}`) : ""}`, dim("claude agents", "list sessions"), dim(`claude attach ${shortId}`, "open in this terminal"), dim(`claude logs ${shortId}`, "show recent output"), dim(`claude stop ${shortId}`, "stop this session")].join(`
`);
}
function bgVerbExtraArgsNote(args) {
  let verbSet = new Set(["logs", "attach", "stop", "kill", "respawn", "rm"]);
  if (args.length <= 2 || !args[0] || !verbSet.has(args[0])) return null;
  let extraArgs = [];
  for (let i = 2; i < args.length; i++) {
    let arg = args[i];
    if (arg === "--debug" || arg === "-d" || arg === "--debug-to-stderr" || arg === "-d2e" || arg.startsWith("--debug=") || arg.startsWith("--debug-file=")) continue;
    if (arg === "--debug-file" && i + 1 < args.length) {
      i++;
      continue;
    }
    extraArgs.push(arg);
  }
  if (extraArgs.length === 0) return null;
  return `warning: extra arguments ignored: ${extraArgs.join(" ")}
`;
}
function warnBgVerbExtraArgs() {
  let warn = bgVerbExtraArgsNote(process.argv.slice(2));
  if (warn) process.stderr.write(warn);
}
async function validateBgSubcmd(idArg, usageLine, description) {
  if (warnBgVerbExtraArgs(), idArg === "--help" || idArg === "-h") process.stdout.write(`Usage: ${usageLine}

  ${description}
`), process.exit(0);
  if (idArg?.startsWith("-")) process.stderr.write(`unknown option '${idArg}'
Usage: ${usageLine}
`), process.exit(1);
  if (!idArg) process.stderr.write(`Usage: ${usageLine}
`), process.exit(1);
  let matches = (await fsPromises.readdir(ZL()).catch(() => [])).filter(f => GLH.test(f)).filter(f => f.startsWith(idArg));
  if (matches.length === 1) return matches[0];
  process.stderr.write(matches.length === 0 ? `No job matching '${idArg}'. Run 'claude agents' to list running sessions.
` : `Ambiguous prefix '${idArg}', matches: ${matches.join(", ")}
`), process.exit(1);
}
async function logsHandler(idArg) {
  let resolvedId = await validateBgSubcmd(idArg, "claude logs <id>", "Print the background session's recent terminal output."),
    logLines = await new Promise(resolve => {
      let cancel = R44(resolvedId, 500, snap => {
        if (snap.type === "snapshot") cancel(), resolve(snap.streamTail);
      }, err => {
        cancel(), resolve(err);
      });
    });
  if (typeof logLines === "string") return await P$("cli_bg_logs", "read_failed"), process.stderr.write(`Couldn't read logs for ${resolvedId} \u2014 ${logLines}
`), Cu(1);
  return await mhH(logLines.join("")), await WG("cli_bg_logs"), Cu(0);
}
async function attachHandler(idArg) {
  let resolvedId = await validateBgSubcmd(idArg, "claude attach <id>", "Open the background session in this terminal. Detach with Ctrl+Z; the session keeps running."),
    daemonStatus = await _g_();
  if (!daemonStatus.ok) return await P$("cli_bg_attach", "daemon_unavailable"), process.stderr.write(`Couldn't attach \u2014 ${Jf()} is unavailable (${daemonStatus.reason})${R9H("status")}
`), Cu(1);
  let attachResult = await ja(resolvedId);
  for (let retries = 0; attachResult.msg && Q3_.test(attachResult.msg) && retries < 20; retries++) {
    if (retries === 0 && attachResult.msg.includes("ERESPAWNING")) process.stderr.write(attachResult.outcome === "detached" ? `Session not responding \u2014 restarting it\u2026
` : `Migrating job to attachable PTY\u2026
`);
    await n6(500), attachResult = await ja(resolvedId);
  }
  if (attachResult.outcome === "error" && attachResult.msg?.includes("ENOJOB")) {
    let jobState = await AK(P1(resolvedId)).catch(() => null);
    if (jobState?.state === "failed") return await P$("cli_bg_attach", "wake_failed_state"), process.stderr.write(`Session ${resolvedId} can't start \u2014 ${detailForStderr(jobState.detail) || "it crashed repeatedly"}
`), Cu(1);
    process.stderr.write(`Waking session ${resolvedId}\u2026
`);
    let wakeResult = await nT_(resolvedId).catch(err => ({
      ok: false,
      alive: false,
      short: undefined,
      error: ZH(err)
    }));
    if (wakeResult.ok || wakeResult.alive) {
      if (wakeResult.short && wakeResult.short !== resolvedId) process.stderr.write(`Session moved to ${wakeResult.short}
`), resolvedId = wakeResult.short;
      attachResult = await ja(resolvedId);
    } else return await P$("cli_bg_attach", "wake_failed"), process.stderr.write(`Couldn't wake ${resolvedId} \u2014 ${wakeResult.error}
`), Cu(1);
  }
  while (attachResult.outcome === "disconnected") {
    let reconnect = await CU({
      forceTransient: true
    });
    if (!reconnect.ok) return await P$("cli_bg_attach", "daemon_unavailable"), process.stderr.write(`Couldn't reconnect to ${resolvedId} \u2014 ${Jf()} is unavailable (${reconnect.reason})${R9H("status")}
`), Cu(1);
    let jobList = await Mj({
      proto: WO,
      op: "list"
    });
    if (jobList.ok && jobList.op === "list" && !jobList.jobs.some(j => j.short === resolvedId && !j.outcome)) break;
    if (process.stderr.write(`Reconnecting to ${resolvedId}\u2026
`), r_() === "windows" && process.stdin.isTTY) ML(process.stdin, true), process.stdin.ref();
    ctH(), attachResult = await ja(resolvedId);
    for (let z = 0; attachResult.msg && Q3_.test(attachResult.msg) && z < 10; z++) await n6(200), attachResult = await ja(resolvedId);
  }
  if (attachResult.outcome === "detached" && attachResult.msg && (cp_.test(attachResult.msg) || Q3_.test(attachResult.msg))) return await P$("cli_bg_attach", cp_.test(attachResult.msg) ? "stalled" : "transient_exhausted"), process.stderr.write(`${attachResult.msg.replace(/^E(STALLED|RESPAWNING|STARTING):\s*/, "")}
`), Cu(1);
  if (attachResult.outcome === "detached" && attachResult.msg) process.stderr.write(`${attachResult.msg.replace(dp_, "")}
`);
  if (attachResult.outcome === "disconnected") {
    let jobState = await AK(P1(resolvedId)).catch(() => null),
      extraDetail = jobState?.state === "failed" && jobState.detail ? ` (${detailForStderr(jobState.detail)})` : "";
    process.stderr.write(`Session ${resolvedId} has exited${extraDetail}.
`);
  }
  if (attachResult.outcome === "error") {
    let errMsg = attachResult.msg?.includes("ERESPAWNING") ? "Job is respawning after an upgrade \u2014 try attach again in a moment." : attachResult.msg && /ENOENT|ECONNREFUSED|ESTARTING/.test(attachResult.msg) ? `${iTH()} is restarting \u2014 try again in a moment.` : attachResult.msg ?? "unknown";
    process.stderr.write(`Couldn't attach to ${resolvedId} \u2014 ${errMsg}
`), await P$("cli_bg_attach", "transient_exhausted");
  } else await WG("cli_bg_attach");
  return Cu(attachResult.outcome === "error" ? 1 : 0);
}
async function respawnHandler(idArg) {
  if (warnBgVerbExtraArgs(), idArg === "--help" || idArg === "-h") {
    process.stdout.write(`Usage: claude respawn <id>|--all

  Restart a background session (or all of them) so it picks up the current Claude binary.
`);
    return;
  }
  if (idArg?.startsWith("-") && idArg !== "--all") {
    process.stderr.write(`unknown option '${idArg}'
Usage: claude respawn <id>|--all
`), process.exitCode = 1;
    return;
  }
  if (!idArg) {
    process.stderr.write(`usage: claude respawn <id>|--all
`), process.exitCode = 1;
    return;
  }
  let daemonStatus = await _g_();
  if (!daemonStatus.ok) {
    process.stderr.write(`Couldn't respawn \u2014 ${Jf()} is unavailable (${daemonStatus.reason})${R9H("status")}
`), await P$("cli_bg_respawn", "daemon_unavailable"), process.exitCode = 1;
    return;
  }
  if (idArg === "--all") {
    let liveJobs = (await he()).filter(j => !pG(j.state.state));
    if (liveJobs.length === 0) {
      process.stdout.write(`no live jobs to respawn
`);
      return;
    }
    let successCount = 0,
      failCount = 0;
    for (let job of liveJobs) {
      let result = await nT_(job.id, {
        force: true,
        knownState: job.state
      });
      if (result.ok) successCount++, process.stdout.write(`respawned ${job.id}${result.short !== job.id ? ` \u2192 ${result.short}` : ""}
`);else if (result.alive) failCount++, process.exitCode = 1, process.stderr.write(`${job.id}: still running \u2014 couldn't confirm restart, retry in a moment
`);else process.exitCode = 1, process.stderr.write(`${job.id}: ${result.error}
`);
    }
    if (successCount === liveJobs.length) await WG("cli_bg_respawn");else if (successCount > 0 || failCount > 0) await MlH("cli_bg_respawn", failCount > 0 ? "still_alive" : "partial");else await P$("cli_bg_respawn", "spawn_failed");
    return;
  }
  let matches = (await fsPromises.readdir(ZL()).catch(() => [])).filter(f => GLH.test(f)).filter(f => f.startsWith(idArg));
  if (matches.length !== 1) {
    process.stderr.write(matches.length === 0 ? `No job matching '${idArg}'
` : `Ambiguous prefix '${idArg}', matches: ${matches.join(", ")}
`), await P$("cli_bg_respawn", matches.length === 0 ? "no_match" : "ambiguous"), process.exitCode = 1;
    return;
  }
  let resolvedId = matches[0],
    respawnResult = await nT_(resolvedId, {
      force: true
    });
  if (!respawnResult.ok && respawnResult.alive) {
    process.stderr.write(`${resolvedId}: still running \u2014 couldn't confirm restart, retry in a moment
`), await MlH("cli_bg_respawn", "still_alive"), process.exitCode = 1;
    return;
  }
  if (!respawnResult.ok) {
    process.stderr.write(`${respawnResult.error}
`), await P$("cli_bg_respawn", "spawn_failed"), process.exitCode = 1;
    return;
  }
  await WG("cli_bg_respawn"), process.stdout.write(`respawned ${resolvedId}${respawnResult.short !== resolvedId ? ` \u2192 ${respawnResult.short}` : ""}
`);
}
async function stopHandler(idArg) {
  let resolvedId = await validateBgSubcmd(idArg, "claude stop <id>", "Stop a background session. Its conversation is kept; resume it later with `claude attach <id>`."),
    {
      confirmed: confirmed,
      error: stopError
    } = await OfH(resolvedId);
  if (!confirmed) {
    await P$("cli_bg_stop", "kill_unconfirmed"), process.stderr.write(stopError ? `couldn't confirm ${resolvedId} was stopped \u2014 ${stopError}
` : `couldn't confirm ${resolvedId} was stopped \u2014 the background service may be restarting. Try again in a moment.
`), process.exitCode = 1;
    return;
  }
  await WG("cli_bg_stop"), process.stdout.write(`stopped ${resolvedId}
`);
  let O = P1(resolvedId),
    jobDir = await AK(O);
  if (jobDir && !nY(jobDir)) {
    let z = new Date().toISOString();
    await VO(O, {
      ...jobDir,
      state: "stopped",
      detail: "stopped",
      tempo: "idle",
      needs: undefined,
      block: undefined,
      inFlight: undefined,
      updatedAt: z,
      firstTerminalAt: jobDir.firstTerminalAt ?? z
    }).catch($ => y(`bg stop terminal write failed: ${ZH($)}`, {
      level: "warn"
    }));
  }
  if (await jJ("tengu_bg_agent_action", {
    action: K_("stop"),
    source: K_("cli"),
    jobSessionId: jobDir?.sessionId ?? ""
  }), jobDir?.worktreePath) process.stdout.write(M_.dim(`  worktree retained at ${jobDir.worktreePath}
  run 'claude rm ${resolvedId}' to remove worktree and job state
`));
}
async function rmHandler(idArg) {
  if (warnBgVerbExtraArgs(), idArg === "--help" || idArg === "-h") process.stdout.write(`Usage: claude rm <id>

  Delete a background session and its worktree. Unlike \`stop\`, works on already-exited sessions.
`), process.exit(0);
  if (idArg?.startsWith("-")) process.stderr.write(`unknown option '${idArg}'
Usage: claude rm <id>
`), process.exit(1);
  if (!idArg) process.stderr.write(`Usage: claude rm <id>
`), process.exit(1);
  let matches = (await fsPromises.readdir(ZL()).catch(() => [])).filter(f => GLH.test(f)).filter(f => f.startsWith(idArg));
  if (matches.length !== 1) process.stderr.write(matches.length === 0 ? `No job matching '${idArg}'
` : `Ambiguous prefix '${idArg}', matches: ${matches.join(", ")}
`), process.exit(1);
  let resolvedId = matches[0],
    jobState = await AK(P1(resolvedId)),
    {
      removed: removed,
      error: rmError,
      keptWorktree: keptWorktree,
      keptReason: keptReason
    } = await O5H(resolvedId);
  if (!removed) {
    await P$("cli_bg_rm", "kill_unconfirmed"), process.stderr.write(`couldn't confirm ${resolvedId} was stopped \u2014 ${rmError ?? "the background service may be restarting. Try again in a moment."}
`), process.exitCode = 1;
    return;
  }
  if (await jJ("tengu_bg_agent_action", {
    action: K_("delete"),
    source: K_("cli"),
    jobSessionId: jobState?.sessionId ?? ""
  }), keptWorktree) await MlH("cli_bg_rm", "kept_worktree");else await WG("cli_bg_rm");
  let reasonMessages = {
    dirty: "has uncommitted changes",
    branch_mismatch: "is on a different branch",
    remove_failed: "could not be removed"
  };
  process.stdout.write(`removed ${resolvedId}` + (keptWorktree ? `
  worktree ${reasonMessages[keptReason ?? "remove_failed"]} \u2014 kept at ${keptWorktree}` : jobState?.worktreePath ? `
  worktree: ${jobState.worktreePath}` : "") + `
`);
}
function peelShortFlags(arg) {
  let peeled = [],
    current = arg;
  while (/^-[a-zA-Z]./.test(current) && iD6.has(current.slice(0, 2))) peeled.push(current.slice(0, 2)), current = `-${current.slice(2)}`;
  return {
    peeled: peeled,
    rest: current
  };
}
function isFlagArg(arg) {
  return arg.length > 1 && arg.startsWith("-");
}
function findDoubleDashIndex(args) {
  let quotedIndices = getQuotedArgIndices(args);
  for (let i = 0; i < args.length; i++) if (args[i] === "--" && !quotedIndices.has(i)) return i;
  return -1;
}
function stripBgFlags(args) {
  let sepIdx = findDoubleDashIndex(args),
    beforeSep = sepIdx >= 0 ? args.slice(0, sepIdx) : args,
    quotedIndices = getQuotedArgIndices(beforeSep),
    stripped = beforeSep.filter((arg, idx) => quotedIndices.has(idx) || !BG_FLAGS.includes(arg));
  return sepIdx >= 0 ? [...stripped, ...args.slice(sepIdx)] : stripped;
}
function extractFlag(args, longFlag, shortFlag) {
  let quotedIndices = getQuotedArgIndices(args),
    result;
  for (let i = 0; i < args.length; i++) {
    if (quotedIndices.has(i)) continue;
    let arg = args[i];
    if (arg === "--") break;
    if (arg === longFlag || shortFlag !== undefined && arg === shortFlag) {
      if (args[i + 1] !== undefined) result = args[i + 1], i++;
      continue;
    }
    if (arg.startsWith(`${longFlag}=`)) {
      result = arg.slice(longFlag.length + 1);
      continue;
    }
    if (shortFlag !== undefined) {
      let {
        peeled: peeled,
        rest: rest
      } = peelShortFlags(arg);
      if (rest.length > 2 && rest.slice(0, 2) === shortFlag) {
        result = rest.slice(2);
        continue;
      }
      if (peeled.length > 0 && rest === shortFlag && args[i + 1] !== undefined) result = args[i + 1], i++;
    }
  }
  return result;
}
function getQuotedArgIndices(args) {
  let result = new Set();
  for (let i = 0; i < args.length; i++) {
    if (result.has(i)) continue;
    let arg = args[i];
    if (arg === "--") break;
    let {
      rest: rest
    } = peelShortFlags(arg);
    if (arg === "--resume" || rest === "-r") continue;
    if ((arg === "--remote-control" || arg === "--rc") && args[i + 1] !== undefined && !(args[i + 1].length > 1 && args[i + 1].startsWith("-"))) {
      result.add(i + 1);
      continue;
    }
    if (!rest.includes("=") && kp.has(rest) && args[i + 1] !== undefined) {
      if (result.add(i + 1), iCH.has(rest)) {
        let j = i + 2;
        while (args[j] !== undefined && !(args[j].length > 1 && args[j].startsWith("-"))) result.add(j), j++;
      }
    }
  }
  return result;
}
function parseResumeTarget(args) {
  let quotedIndices = getQuotedArgIndices(args),
    target;
  for (let i = 0; i < args.length; i++) {
    if (quotedIndices.has(i)) continue;
    let arg = args[i];
    if (arg === "--") break;
    if (arg.startsWith("--resume=")) {
      target = arg.slice(9) || undefined;
      continue;
    }
    let {
      rest: rest
    } = peelShortFlags(arg);
    if (/^-r./.test(rest)) {
      target = rest.slice(2);
      continue;
    }
    if (arg === "--resume" || rest === "-r") {
      let next = args[i + 1];
      if (next !== undefined && !isFlagArg(next)) target = next, i++;else target = undefined;
    }
  }
  return target;
}
function stripResumeFlags(args) {
  let quotedIndices = getQuotedArgIndices(args),
    result = [];
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (quotedIndices.has(i)) {
      result.push(arg);
      continue;
    }
    if (arg === "--") {
      for (let j = i; j < args.length; j++) result.push(args[j]);
      break;
    }
    if (arg === "--fork-session" || arg === "--continue" || arg.startsWith("--resume=") || arg.startsWith("--session-id=")) continue;
    let {
      peeled: peeled,
      rest: rest
    } = peelShortFlags(arg);
    if (peeled.length > 0 || rest === "-c" || rest.startsWith("-r")) {
      let filteredPeeled = peeled.filter(f => f !== "-c").map(f => f[1]),
        isResume = rest === "-c" || /^-r./.test(rest),
        isResumePlain = rest === "-r",
        remaining = isResume || isResumePlain ? "" : rest.slice(1);
      if (filteredPeeled.length > 0 || remaining) result.push(`-${filteredPeeled.join("")}${remaining}`);
      if (isResumePlain && args[i + 1] !== undefined && !isFlagArg(args[i + 1])) i++;
      continue;
    }
    if (arg === "--session-id") {
      if (args[i + 1] !== undefined) i++;
      continue;
    }
    if (arg === "--resume") {
      if (args[i + 1] !== undefined && !isFlagArg(args[i + 1])) i++;
      continue;
    }
    result.push(arg);
  }
  return result;
}
function stripSessionIdFlag(args) {
  let quotedIndices = getQuotedArgIndices(args),
    result = [];
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (quotedIndices.has(i)) {
      result.push(arg);
      continue;
    }
    if (arg === "--") {
      for (let j = i; j < args.length; j++) result.push(args[j]);
      break;
    }
    if (arg.startsWith("--session-id=")) continue;
    if (arg === "--session-id") {
      if (args[i + 1] !== undefined) i++;
      continue;
    }
    result.push(arg);
  }
  return result;
}
function checkBgSpawnGate(args) {
  let sepIdx = findDoubleDashIndex(args),
    beforeSep = sepIdx >= 0 ? args.slice(0, sepIdx) : args,
    quotedIndices = getQuotedArgIndices(beforeSep),
    plainArgs = beforeSep.filter((arg, idx) => !quotedIndices.has(idx));
  if (FWq(plainArgs)) return UWq(beforeSep);
  let permModeFlag = extractFlag(beforeSep, "--permission-mode");
  if ((permModeFlag === "bypassPermissions" || plainArgs.includes("--dangerously-skip-permissions") || plainArgs.includes("--allow-dangerously-skip-permissions")) && !yI() && !N_().bypassPermissionsModeAccepted) return "--bg with bypassPermissions requires accepting the disclaimer first. Run `claude --dangerously-skip-permissions` once interactively.";
  if (permModeFlag === "auto" && !Em()) return "--bg with auto mode requires opting in first. Run `claude --permission-mode auto` once interactively.";
  return null;
}
function extractPromptPositional(args, sessionId) {
  let quotedIndices = getQuotedArgIndices(args),
    lastPositional;
  for (let i = 0; i < args.length; i++) {
    if (quotedIndices.has(i)) continue;
    let arg = args[i];
    if (isFlagArg(arg)) {
      let {
        rest: rest
      } = peelShortFlags(arg);
      if ((arg === "--resume" || rest === "-r") && args[i + 1] !== undefined && !isFlagArg(args[i + 1])) i++;
      continue;
    }
    if (arg.length > 0 && arg !== sessionId) lastPositional = arg;
  }
  return lastPositional;
}
function flagsWithoutPositional(args) {
  let quotedIndices = getQuotedArgIndices(args),
    result = [];
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (quotedIndices.has(i)) {
      result.push(arg);
      continue;
    }
    if (!isFlagArg(arg)) continue;
    if (arg.includes("=")) {
      result.push(arg);
      continue;
    }
    let {
      rest: rest
    } = peelShortFlags(arg);
    if (kp.has(rest)) {
      result.push(arg);
      continue;
    }
    if (tR_.has(arg)) {
      result.push(arg);
      continue;
    }
    let next = args[i + 1];
    if (next !== undefined && !isFlagArg(next) && !quotedIndices.has(i + 1)) {
      i++;
      continue;
    }
    result.push(arg);
  }
  return result;
}
function collectEgressGatewayEnv() {
  let result = {};
  for (let key of nD6) {
    let val = process.env[key];
    if (val === undefined) continue;
    if (val === "" && key !== "CLAUDE_SECURESTORAGE_CONFIG_DIR") continue;
    result[key] = val;
  }
  return result;
}
function detailForStderr(detail) {
  return qw(M1(detail).replace(/[\s\x00-\x1f\x7f-\x9f]+/g, " ").trim(), 200);
}
var cryptoModule,
  fsPromises,
  pathModule,
  BG_FLAGS,
  MAX_STDIN_BYTES = 1048576;
var Ag_ = L(() => {
  T5();
  CWq();
  BWq();
  b1H();
  yFH();
  iN();
  lN();
  Bj6();
  DRH();
  sWq();
  rCH();
  cT_();
  iY();
  eWq();
  _n6();
  f6();
  v_();
  UC();
  t5();
  tw();
  Pw();
  O8();
  dq();
  UH();
  R_();
  u9();
  ek();
  M2H();
  v8();
  WI();
  Oy4();
  XP();
  Sb();
  cryptoModule = require("crypto"), fsPromises = require("fs/promises"), pathModule = require("path"), BG_FLAGS = ["--bg", "--background"];
});
export {Jy4 as L$l,buildShellCmd as CRm,preSeedReplBgJob,spawnBgSession,dispatchBgSession as ARm,handleBgFlag,readBgStdin,withStdinPositional,formatDispatchReason as vRm,formatBgHints,bgVerbExtraArgsNote,warnBgVerbExtraArgs as HPo,validateBgSubcmd as IPo,logsHandler,attachHandler,respawnHandler,stopHandler,rmHandler,peelShortFlags as hOe,isFlagArg as Nne,findDoubleDashIndex as d_t,stripBgFlags,extractFlag as QJn,getQuotedArgIndices as rV,parseResumeTarget,stripResumeFlags,stripSessionIdFlag,checkBgSpawnGate as DRm,extractPromptPositional as PRm,flagsWithoutPositional,collectEgressGatewayEnv as O$l,detailForStderr,cryptoModule as w$l,fsPromises as jue,pathModule as wPo,BG_FLAGS as ERm,MAX_STDIN_BYTES as APo,Ag_ as qVt};
