// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Id,Pm,ec,Oi,Tg,bI,eb,Hz,u8r,Pf} from "../agent/2591_level.ts";
import {sendRv as a6,disarmStartupWedgeWatchdog as obo,g8e} from "../config/4413_stopRendezvousServer.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getSmallFastModel as xR,getMainLoopModel as gs,isFableFamilyOrPinnedModel as sE,isMythosFamilyOrPinnedModel as Okt,getClassifierOpusReroute as Lkt,Ro} from "./1458_swapShrinksContextWindow.ts";
import {MBe,$M} from "../telemetry/2032_word.ts";
import {Ws,Bmn,Umn,vd} from "../session/1465_promise.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {tEe,_7e,lr} from "../../vendor/m233.ts";
import {kc,aA} from "../../vendor/m234.ts";
import {Gce,_W,po} from "../tools/5224_userPromptCount.ts";
import {yh,hy,VVa,zVa,z4t,Fho,GVa,YVa,jVa,JVa,KVa,Nxe} from "../agent/4175_state.ts";
import {nft,bWn,l5t,a5t,EWn} from "../../vendor/m4410.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {LY,Rpt} from "../../vendor/m4175.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {worktreeStateSignal as HWn,getMaterializedSessionFile as px,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {Nm,D_} from "../agent/2784_withFileTypes.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
import {Wq,cxe} from "../api/3982_model.ts";
import {Pt,He,mn} from "../telemetry/0600_feature_name.ts";
import {oTe,s5t} from "../../vendor/m4409.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {pWn} from "../config/4399_zSo.ts";
import {Bo,Le} from "../../vendor/m5.ts";
import {getTotalOutputTokens as Yy,getSessionId as It,lt} from "../session/0132_sent.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Cte,f6e,rb} from "./5211_level.ts";
import {ORe,MR} from "../config/2033_allowed.ts";
import {qz,EC} from "../telemetry/2700_qz.ts";
import {cW,CRON_CREATE_TOOL_NAME as _w} from "../config/2712_isKairosCronEnabled.ts";
import {sge,react as $h} from "../core/2701_sge.ts";
import {Xo} from "../../vendor/m240.ts";
import {gOt} from "../../vendor/m2540.ts";
// @ts-nocheck
var moduleExports = {};
ft(moduleExports, {
  worktreeOwnershipFields: () => worktreeOwnershipFields,
  summarizeToolCalls: () => summarizeToolCalls,
  stashBgStructuredResult: () => stashBgStructuredResult,
  setWorktreeOwnership: () => setWorktreeOwnership,
  setPermissionBlock: () => setPermissionBlock,
  scanLinkRecords: () => scanLinkRecords,
  markTurnActive: () => markTurnActive,
  markTurnAborted: () => markTurnAborted,
  markApiFailure: () => markApiFailure,
  findLatestRealUserAsk: () => findLatestRealUserAsk,
  ensurePermissionBridge: () => ensurePermissionBridge,
  createClassifierJobState: () => createClassifierJobState,
  classifyAndPushDebounced: () => classifyAndPushDebounced,
  classifyAndPush: () => classifyAndPush,
  classify: () => classify,
  captureLatestAsk: () => captureLatestAsk,
  captureIntent: () => captureIntent,
  LINK_SCAN_MAX_BYTES: () => LINK_SCAN_MAX_BYTES
});
async function writeStateAndPatch(stateDir, nextState, patch) {
  if (await Id(stateDir, nextState), Object.keys(patch).length > 0) a6({
    type: "state",
    patch: patch
  });
}
function stashBgStructuredResult(result) {
  stashedStructuredResult = result;
}
function createClassifierJobState() {
  return {
    prevState: "",
    prevStateSince: Date.now(),
    accumulatedOutputs: {},
    lastClassifyAt: 0,
    capturedIntent: "",
    inFlight: null,
    nameInFlight: false,
    dispatchEmitted: false,
    latestAsk: "",
    kicked: false,
    lastMsgCount: 0,
    permissionBridgeSubscribed: false,
    bridgeWriteChain: Promise.resolve(),
    lastEmittedDetail: "",
    lastResult: null
  };
}
function getClassifierConfig() {
  return it("tengu_bg_classifier_config", {
    useSmallFastModel: true,
    disableThinking: true
  });
}
function pickClassifierModel() {
  if (getClassifierConfig()?.useSmallFastModel) return xR();
  let model = gs();
  if (sE(model) || Okt(model)) return Lkt(model);
  return model;
}
function pickThinkingBudget(model) {
  if (MBe(model)) return [undefined, EXTRA_THINKING_TOKENS];
  if (getClassifierConfig()?.disableThinking) return [false, 0];
  return [undefined, EXTRA_THINKING_TOKENS];
}
function isContinueOrResume() {
  return process.argv.some(arg => arg === "-c" || arg === "--continue" || arg === "-r" || arg === "--resume" || arg.startsWith("--resume=") || arg.startsWith("-r="));
}
function surfaceFlags(surfaces) {
  let flags = {};
  for (let surface of surfaces) flags[`surface_${surface}`] = true;
  return flags;
}
function emitDispatchOnce(jobState, agent, surfaces) {
  if (!Ws() || jobState.dispatchEmitted) return;
  if (jobState.dispatchEmitted = true, isContinueOrResume()) return;
  W("tengu_bg_agent_dispatch", {
    agent: agent,
    source: process.env.CLAUDE_BG_SOURCE ?? "shell",
    intentLength: jobState.capturedIntent.length,
    ...surfaceFlags(surfaces)
  });
}
function captureIntent(jobState, prompt) {
  if (jobState.capturedIntent || !prompt) return jobState.capturedIntent;
  return jobState.capturedIntent = tEe(kc(stripSystemReminder(prompt)), 500), jobState.capturedIntent;
}
function findLatestRealUserAsk(messages) {
  let msg = messages.findLast(m => m.type === "user" && !m.isMeta && typeof m.message.content === "string" && !Gce(m.message.content));
  return msg?.type === "user" && typeof msg.message.content === "string" ? msg.message.content : undefined;
}
function captureLatestAsk(jobState, ask) {
  if (!ask) return;
  jobState.latestAsk = tEe(kc(stripSystemReminder(ask)), 300);
}
function stripSystemReminder(text) {
  let idx = text.lastIndexOf("</system-reminder>");
  return (idx >= 0 ? text.slice(idx + 18) : text).trim();
}
function markTurnActive(jobState, agentId, detailHint) {
  if (ensurePermissionBridge(jobState), obo(), jobState.kicked) return;
  jobState.kicked = true, jobState.bridgeWriteChain = jobState.bridgeWriteChain.then(() => writeActiveState(agentId, detailHint)).catch(Pm);
}
function classifyAndPushDebounced(jobState, agentId, template, surfaceA, surfaceB, surfaceC, surfaceD) {
  if (!jobState.kicked) jobState.kicked = true, writeActiveState(agentId).catch(Pm);
  let now = Date.now();
  if (now - jobState.lastClassifyAt < CLASSIFY_DEBOUNCE_MS) return;
  if (jobState.inFlight) return;
  jobState.lastClassifyAt = now, classifyAndPush(jobState, agentId, template, jobState.capturedIntent, surfaceA, surfaceB, surfaceC, surfaceD, true).catch(Pm);
}
async function writeActiveState(agentId, detailHint) {
  let stateDir = ec(agentId),
    current = await Oi(stateDir);
  if (!current) return;
  if (current.tempo === "active") return;
  if (Tg(current) && !detailHint) return;
  let now = new Date().toISOString(),
    detail = detailHint ? yh(kc(stripSystemReminder(detailHint)).replace(/\s+/g, " ").trim(), hy) : undefined;
  if (await writeStateAndPatch(stateDir, {
    ...current,
    ...(detail !== undefined && {
      detail: detail
    }),
    tempo: "active",
    inFlight: nft(),
    needs: undefined,
    block: undefined,
    suggestedReply: undefined,
    output: null,
    updatedAt: now
  }, {
    tempo: "active",
    needs: "",
    ...(detail !== undefined && {
      detail: detail
    })
  }), detail) RDe.appendFile(pathMod.join(stateDir, "timeline.jsonl"), Pe({
    at: now,
    state: current.state,
    detail: detail,
    text: ""
  }) + `
`, "utf-8").catch(Pm);
}
async function setPermissionBlock(agentId, request) {
  let stateDir = ec(agentId),
    needsText = request?.text ?? null,
    current = await Oi(stateDir);
  if (!current) return;
  if (needsText) {
    if (bI(current.state)) return;
    if (current.tempo === "blocked" && current.needs === needsText) return;
  } else if (current.tempo !== "blocked") return;
  let latest = (await Oi(stateDir)) ?? current;
  if (needsText) {
    if (bI(latest.state)) return;
    if (latest.tempo === "blocked" && latest.needs === needsText) return;
  } else if (latest.tempo !== "blocked") return;
  let tempo = needsText ? "blocked" : "active";
  await writeStateAndPatch(stateDir, {
    ...latest,
    tempo: tempo,
    inFlight: nft(),
    needs: needsText ?? undefined,
    block: request?.questions ? {
      questions: request.questions
    } : undefined,
    suggestedReply: undefined,
    updatedAt: new Date().toISOString()
  }, {
    tempo: tempo,
    needs: needsText ?? ""
  });
}
async function setWorktreeOwnership(agentId, worktree) {
  let stateDir = ec(agentId),
    current = await Oi(stateDir);
  if (!current) return;
  let fields = worktreeOwnershipFields(worktree, current);
  if (fields.worktreePath === current.worktreePath && fields.worktreeBranch === current.worktreeBranch && fields.worktreeHookBased === current.worktreeHookBased) return;
  await writeStateAndPatch(stateDir, {
    ...current,
    ...fields,
    updatedAt: new Date().toISOString()
  }, {});
}
function ensurePermissionBridge(jobState) {
  if (jobState.permissionBridgeSubscribed) return;
  jobState.permissionBridgeSubscribed = true, LY.subscribe(request => {
    if (!Ws()) return;
    let agentId = eb();
    jobState.bridgeWriteChain = jobState.bridgeWriteChain.then(() => jobState.inFlight ?? undefined).catch(() => {}).then(() => setPermissionBlock(agentId, request).catch(err => {
      if (!In(err)) Pm(err);
    }));
  }), HWn.subscribe(worktree => {
    if (!Ws()) return;
    let agentId = eb();
    jobState.bridgeWriteChain = jobState.bridgeWriteChain.then(() => jobState.inFlight ?? undefined).catch(() => {}).then(() => setWorktreeOwnership(agentId, worktree).catch(err => {
      if (!In(err)) Pm(err);
    }));
  });
}
async function scanLinks(record) {
  let transcriptPath = px() ?? Nm(),
    prevOffset = record.linkScanPath && record.linkScanPath !== transcriptPath ? 0 : record.linkScanOffset ?? 0,
    scan = await scanLinkRecords(transcriptPath, record.children ?? null, prevOffset);
  return {
    transcriptPath: transcriptPath,
    prevOffset: prevOffset,
    scan: scan
  };
}
function markTurnAborted(jobState, agentId) {
  jobState.kicked = false;
  let stateDir = ec(agentId);
  jobState.bridgeWriteChain = jobState.bridgeWriteChain.then(() => jobState.inFlight ?? undefined).catch(() => {}).then(async () => {
    let current = await Oi(stateDir);
    if (!current) return;
    let {
        transcriptPath: transcriptPath,
        prevOffset: prevOffset,
        scan: scan
      } = await scanLinks(current),
      latest = (await Oi(stateDir)) ?? current,
      wasActive = latest.tempo === "active";
    if (!wasActive && scan.linkScanOffset === prevOffset) return;
    await writeStateAndPatch(stateDir, {
      ...latest,
      ...(wasActive && {
        tempo: "idle"
      }),
      children: scan.children,
      linkScanOffset: scan.linkScanOffset,
      linkScanPath: transcriptPath,
      ...worktreeOwnershipFields(scan.worktree, latest),
      inFlight: nft(),
      updatedAt: new Date().toISOString()
    }, wasActive ? {
      tempo: "idle"
    } : {});
  }).catch(Pm);
}
async function markApiFailure(jobState, agentId, failureKind, failureText) {
  let outcome = VVa(failureKind, failureText);
  if (!outcome) return;
  let stateDir = ec(agentId),
    cleaned = failureText.replace(/^Please run \/login \u00B7 /, "").replace(/^Failed to authenticate\. /, "").replace(/ \u00B7 Please run \/login$/, "").replace(/^Not logged in$/, ""),
    detail = Ha(kc(cleaned.replace(/\s+/g, " ").trim()), hy),
    needsLine = `${outcome.needs}${detail ? ` \xB7 ${detail}` : ""}`;
  jobState.bridgeWriteChain = jobState.bridgeWriteChain.then(() => jobState.inFlight ?? undefined).catch(() => {}).then(async () => {
    let current = await Oi(stateDir);
    if (!current || Tg(current)) return;
    let {
        transcriptPath: transcriptPath,
        scan: scan
      } = await scanLinks(current),
      latest = (await Oi(stateDir)) ?? current;
    if (Tg(latest)) return;
    let now = new Date().toISOString(),
      tempo = outcome.state === "failed" ? "idle" : "blocked",
      needs = outcome.state === "failed" ? undefined : needsLine;
    await writeStateAndPatch(stateDir, {
      ...latest,
      state: outcome.state,
      detail: detail,
      tempo: tempo,
      inFlight: nft(),
      needs: needs,
      block: undefined,
      children: scan.children,
      linkScanOffset: scan.linkScanOffset,
      linkScanPath: transcriptPath,
      ...worktreeOwnershipFields(scan.worktree, latest),
      updatedAt: now,
      firstTerminalAt: outcome.state === "failed" && !latest.firstTerminalAt ? now : latest.firstTerminalAt
    }, {
      state: outcome.state,
      detail: detail,
      tempo: tempo,
      needs: needs ?? ""
    }), RDe.appendFile(pathMod.join(stateDir, "timeline.jsonl"), Pe({
      at: now,
      state: outcome.state,
      detail: detail,
      text: detail
    }) + `
`, "utf-8").catch(Pm);
  }).catch(Pm), await jobState.bridgeWriteChain, jobState.prevState = outcome.state, jobState.kicked = false;
}
async function generateJobName(jobState, stateDir, userText, agentText) {
  let activeJobs = await Hz().catch(() => []),
    taken = new Set(activeJobs.filter(j => !bI(j.state.state) && j.state.name).map(j => j.state.name)),
    name = "";
  for (let attempt = 0; attempt < NAME_GEN_MAX_ATTEMPTS; attempt++) {
    let avoidClause = taken.size > 0 ? `

Avoid these (already taken): ${[...taken].join(", ")}` : "",
      model = pickClassifierModel(),
      [thinking, extraTokens] = pickThinkingBudget(model),
      textBlock = (await Wq({
        querySource: "agent_namer",
        model: model,
        thinking: thinking,
        max_tokens: 32 + extraTokens,
        maxRetries: 1,
        skipSystemPromptPrefix: true,
        messages: [{
          role: "user",
          content: `2-4 word lowercase label for this job.
User: "${Ha(userText, 300)}"${agentText ? `
Agent: "${Ha(agentText, 300)}"` : ""}

Include the MOST SPECIFIC identifier (component/file/feature). Skip generic
verbs like fix/add/update. Respond with ONLY the label.${avoidClause}`
        }]
      }).catch(() => null))?.content.find(block => block.type === "text");
    if (textBlock?.type !== "text") {
      Pt("job_name", "side_query_failed");
      return;
    }
    if (name = Ha(textBlock.text.trim().toLowerCase(), 40), !name || DEGENERATE_NAME_RE.test(name)) {
      Pt("job_name", "degenerate_label");
      return;
    }
    if (!taken.has(name)) break;
    taken.add(name);
  }
  if (taken.has(name)) {
    Pt("job_name", "all_names_taken");
    return;
  }
  jobState.bridgeWriteChain = jobState.bridgeWriteChain.then(() => jobState.inFlight ?? undefined).catch(() => {}).then(async () => {
    let current = await Oi(stateDir);
    if (!current) {
      Pt("job_name", "state_gone_after_gen");
      return;
    }
    if (current.name) {
      He("job_name");
      return;
    }
    await writeStateAndPatch(stateDir, {
      ...current,
      name: name,
      nameSource: "auto",
      updatedAt: new Date().toISOString()
    }, {
      name: name
    }), oTe(name, "auto").catch(Ie), He("job_name");
  }).catch(Pm), await jobState.bridgeWriteChain;
}
async function classifyAndPush(jobState, agentId, template, intent, surfaceA, surfaceB, surfaceC, surfaces = new Set(), midturn = false) {
  emitDispatchOnce(jobState, template, surfaces);
  let prev = jobState.inFlight;
  if (prev) await Promise.race([prev.catch(Pm), Kn(60000, undefined, {
    unref: true
  })]);
  let run = runClassify(jobState, agentId, template, intent, surfaceA, surfaceB, surfaceC, surfaces, midturn);
  jobState.inFlight = run;
  try {
    await run;
  } finally {
    if (jobState.inFlight === run) jobState.inFlight = null;
    jobState.kicked = false;
  }
}
function deriveMidturnDetail(messages) {
  for (let i = messages.length - 1; i >= 0; i--) {
    let content = messages[i]?.message.content;
    if (!Array.isArray(content)) continue;
    let toolDetail;
    for (let j = content.length - 1; j >= 0; j--) {
      let block = content[j];
      if (block.type === "text") {
        let text = kc(block.text).replace(/\s+/g, " ").trim();
        if (text.length > 8) return yh(text, hy);
      }
      if (block.type === "tool_use" && toolDetail === undefined) {
        let input = block.input,
          question = (Array.isArray(input?.questions) && typeof input.questions[0]?.question === "string" ? input.questions[0].question : undefined) ?? (typeof input?.description === "string" ? input.description : "");
        toolDetail = question ? yh(kc(question).replace(/\s+/g, " ").trim(), hy) : "";
      }
    }
    if (toolDetail !== undefined) return toolDetail;
  }
  return "";
}
async function runClassify(jobState, agentId, template, intent, surfaceA, forceActive, engine, surfaces, midturn) {
  let stateDir = ec(agentId),
    current = await Oi(stateDir),
    msgCount = surfaceA.length;
  if (current && bI(current.state) && current.tempo !== "active" && msgCount === jobState.lastMsgCount) return;
  if (current && bI(current.state)) jobState.prevState = "", jobState.prevStateSince = Date.parse(current.updatedAt) || Date.now();else if (current && current.state !== jobState.prevState) jobState.prevState = current.state, jobState.prevStateSince = Date.parse(current.updatedAt) || Date.now();
  let result,
    classifiedText = "";
  if (midturn) {
    if (current?.tempo === "blocked" || current?.state === "blocked") return;
    result = {
      state: "working",
      tempo: "active",
      detail: deriveMidturnDetail(surfaceA),
      needs: undefined,
      output: {},
      source: "midturn"
    };
  } else {
    let startIdx = jobState.lastMsgCount < msgCount ? jobState.lastMsgCount : 0,
      joinedText = surfaceA.slice(startIdx).filter(msg => !msg.isApiErrorMessage).map(msg => _W(msg) || pWn(msg)).filter(Boolean).join(`

`);
    if (!joinedText && msgCount > startIdx) {
      let state = current?.state || jobState.prevState || "working";
      result = {
        state: state,
        tempo: state === "blocked" ? "blocked" : "idle",
        detail: current?.detail ?? "",
        needs: state === "blocked" ? current?.needs ?? jobState.lastResult?.needs : undefined,
        output: {},
        source: "no-text-turn"
      };
    } else classifiedText = kc(joinedText), result = await classify(classifiedText, jobState.prevState || "working", jobState.latestAsk, summarizeToolCalls(surfaceA), Math.round((Date.now() - jobState.prevStateSince) / 60000), engine, surfaces);
  }
  if (!result) return;
  if (forceActive) {
    if (bI(result.state)) result.state = jobState.prevState || "working";
    if (result.tempo === "idle" || result.tempo === "blocked") result.tempo = "active";
  } else if (!midturn && result.tempo === "active" && result.state === "working") result.tempo = "idle";
  if (result.state !== jobState.prevState) jobState.prevState = result.state, jobState.prevStateSince = Date.now();
  if (jobState.accumulatedOutputs = result.output, jobState.onClassified?.(result, midturn), !Ws()) {
    if (!midturn) jobState.lastMsgCount = msgCount;
    if (Bmn()) await Umn({
      state: result.state,
      detail: result.detail,
      tempo: bI(result.state) ? "idle" : result.tempo,
      needs: result.tempo === "blocked" ? result.needs : undefined
    });
    return;
  }
  let resolvedIntent = intent || jobState.capturedIntent,
    afterClassify = await Oi(stateDir);
  if (afterClassify && Tg(afterClassify) && afterClassify.updatedAt !== current?.updatedAt) return;
  if (!midturn) jobState.lastMsgCount = msgCount;
  await RDe.mkdir(stateDir, {
    recursive: true
  }).catch(Pm);
  let transcriptPath = px() ?? Nm(),
    scanOffset = afterClassify?.linkScanPath && afterClassify.linkScanPath !== transcriptPath ? 0 : afterClassify?.linkScanOffset ?? 0,
    {
      children: children,
      linkScanOffset: linkScanOffset,
      worktree: worktree
    } = await scanLinkRecords(transcriptPath, afterClassify?.children ?? null, scanOffset),
    now = new Date().toISOString(),
    latest = (await Oi(stateDir)) ?? afterClassify,
    fanState = bWn(),
    fan = l5t(fanState.items) === l5t(latest?.fan) ? latest?.fan : fanState.items.length > 0 ? fanState.items : undefined,
    budget = a5t(fanState.budget) === a5t(latest?.budget) ? latest?.budget : fanState.budget,
    keepBlocked = latest?.tempo === "blocked" && latest.updatedAt !== current?.updatedAt,
    isNewTerminal = bI(result.state) && !latest?.firstTerminalAt;
  if (isNewTerminal) W("tengu_bg_agent_terminal", {
    agent: template,
    outcome: result.state,
    durationMs: latest ? Date.now() - Date.parse(latest.createdAt) : 0,
    classifySource: Bo(result.source),
    ...surfaceFlags(surfaces)
  });
  let tempo = bI(result.state) ? "idle" : keepBlocked ? "blocked" : result.tempo,
    needs = bI(result.state) ? undefined : keepBlocked ? latest?.needs : result.tempo === "blocked" ? result.needs : undefined;
  if (!midturn) jobState.lastResult = {
    tempo: tempo,
    block: bI(result.state) || !keepBlocked ? undefined : latest?.block,
    needs: needs
  };
  await writeStateAndPatch(stateDir, {
    state: result.state,
    detail: result.detail,
    tempo: tempo,
    inFlight: nft(),
    fan: fan,
    budget: budget,
    tokens: Math.max(latest?.tokens ?? 0, Yy()),
    needs: needs,
    block: bI(result.state) || !keepBlocked ? undefined : latest?.block,
    output: Object.keys(jobState.accumulatedOutputs).length > 0 ? jobState.accumulatedOutputs : null,
    structuredResult: stashedStructuredResult ?? latest?.structuredResult,
    children: children,
    linkScanOffset: linkScanOffset,
    linkScanPath: transcriptPath,
    template: template,
    routine: latest?.routine,
    respawnFlags: latest?.respawnFlags ?? [],
    intent: latest?.intent ?? resolvedIntent,
    initialPrompt: latest?.initialPrompt,
    name: latest?.name,
    nameSource: latest?.nameSource,
    color: latest?.color,
    sessionId: latest?.sessionId ?? It(),
    resumeSessionId: It(),
    daemonShort: latest?.daemonShort,
    cliVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    cwd: u8r() ?? latest?.cwd ?? Lt(),
    ...worktreeOwnershipFields(worktree, latest),
    originCwd: latest?.worktreePath ? latest.originCwd : u8r() ?? latest?.originCwd,
    bridgeSessionId: latest?.bridgeSessionId,
    bridgeOutboundOnly: latest?.bridgeOutboundOnly,
    bridgeSessionSeq: latest?.bridgeSessionSeq,
    queuedPrompt: latest?.queuedPrompt,
    bgIsolation: latest?.bgIsolation,
    providerEnv: latest?.providerEnv,
    sessionPermissionRules: latest?.sessionPermissionRules,
    memoryToggledOff: latest?.memoryToggledOff,
    backend: latest?.backend ?? "daemon",
    createdAt: latest?.createdAt ?? now,
    updatedAt: now,
    firstTerminalAt: isNewTerminal ? now : latest?.firstTerminalAt ?? null
  }, {
    state: result.state,
    detail: result.detail,
    tempo: tempo,
    needs: needs ?? ""
  }), RDe.appendFile(pathMod.join(stateDir, "timeline.jsonl"), Pe({
    at: now,
    state: result.state,
    detail: result.detail,
    text: _7e(classifiedText, 4000)
  }) + `
`, "utf-8").catch(Pm);
  let nameIntent = afterClassify?.intent || resolvedIntent;
  if (!afterClassify?.name && nameIntent && engine === "llm" && !jobState.nameInFlight) {
    let firstText = surfaceA.filter(msg => !msg.isApiErrorMessage).map(_W).find(Boolean),
      toolSummary = firstText ? "" : summarizeToolCalls(surfaceA),
      agentText = tEe(kc(firstText ?? (toolSummary ? `[calling ${toolSummary}]` : "")), 500);
    jobState.nameInFlight = true, generateJobName(jobState, stateDir, nameIntent, agentText).catch(Pm).finally(() => {
      jobState.nameInFlight = false;
    });
  }
  let sourceLabel = result.source ? result.branch && result.branch !== result.source ? `${result.source}/${result.branch}` : result.source : "?";
  A(`[classifier] ${result.state} (${sourceLabel}) \xB7 ${result.detail}${needs ? ` \xB7 needs: ${needs}` : ""}`);
}
function summarizeToolCalls(messages) {
  let counts = new Map();
  for (let msg of messages) if (Array.isArray(msg.message.content)) {
    for (let block of msg.message.content) if (block.type === "tool_use" && !SUPPRESSED_TOOLS.has(block.name)) counts.set(block.name, (counts.get(block.name) ?? 0) + 1);
  }
  return [...counts].sort((a, b_2) => b_2[1] - a[1]).slice(0, 5).map(([name, count]) => count > 1 ? `${name}\xD7${count}` : name).join(", ");
}
async function classify(text, prevState, latestAsk, toolSummary, minsInState, engine, surfaces = new Set()) {
  let startedAt = Date.now(),
    preclassified = zVa(text),
    path,
    usage = {
      input_tokens: 0,
      output_tokens: 0,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 0
    },
    attempts = 0,
    result;
  if (preclassified) path = "preclassify", result = {
    ...z4t({}, prevState, preclassified),
    source: path
  };else if (engine === "heuristic") path = "heuristic", result = {
    ...z4t({}, prevState, Fho(text)),
    source: path
  };else {
    let tail = text.slice(-GVa),
      userMessage = YVa({
        tail: tail,
        prev: prevState,
        latestAsk: latestAsk,
        toolSummary: toolSummary,
        minsInState: minsInState
      }),
      cacheControl = Cte({
        ttl: f6e("agent_classifier") ? "1h" : undefined,
        scope: ORe() ? "global" : undefined
      }),
      model = pickClassifierModel(),
      [thinking, extraTokens] = pickThinkingBudget(model);
    path = "apiError";
    let parsed = null;
    for (let attempt = 0; attempt < 2 && !parsed; attempt++) {
      attempts = attempt + 1;
      let response;
      try {
        response = await Wq({
          querySource: "agent_classifier",
          model: model,
          thinking: thinking,
          max_tokens: 1024 + extraTokens,
          maxRetries: 3,
          skipSystemPromptPrefix: true,
          system: [{
            type: "text",
            text: jVa,
            cache_control: cacheControl
          }],
          messages: [{
            role: "user",
            content: attempt === 0 ? userMessage : `${userMessage}

Previous response was not valid JSON. Respond with ONLY the JSON object, nothing else.`
          }]
        });
      } catch (err) {
        A(`[classifier] sideQuery failed: ${err}`);
        break;
      }
      path = "llm";
      let respUsage = response.usage;
      if (respUsage) usage.input_tokens += respUsage.input_tokens, usage.output_tokens += respUsage.output_tokens, usage.cache_read_input_tokens += respUsage.cache_read_input_tokens ?? 0, usage.cache_creation_input_tokens += respUsage.cache_creation_input_tokens ?? 0;
      let textBlock = response.content.find(block => block.type === "text"),
        rawJson = textBlock?.type === "text" ? textBlock.text.trim() : "";
      if (!rawJson) {
        A(`[classifier] no text block in response, types=${response.content.map(block => block.type).join(",")}`);
        continue;
      }
      parsed = JVa(rawJson);
    }
    result = parsed ? {
      ...z4t(parsed, prevState, null),
      source: "llm"
    } : {
      ...z4t({}, prevState, Fho(text)),
      source: "heuristic"
    };
  }
  return W("tengu_bg_classify", {
    path: Le(path),
    engine: Le(engine),
    ...surfaceFlags(surfaces),
    branch: Le(preclassified?.branch ?? (path === "heuristic" ? "heuristic" : "none")),
    closingShape: Le(KVa(text)),
    prevState: prevState,
    newState: result?.state ?? "null",
    stateChanged: result !== null && result.state !== prevState,
    minsInPrevState: Math.round(minsInState),
    durationMs: Date.now() - startedAt,
    tailChars: text.length,
    ...(path === "llm" && {
      attempts: attempts,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      cacheReadInputTokens: usage.cache_read_input_tokens,
      cacheCreationInputTokens: usage.cache_creation_input_tokens
    })
  }), result;
}
function worktreeOwnershipFields(worktree, record) {
  if (worktree === undefined) return {
    worktreePath: record?.worktreePath,
    worktreeBranch: record?.worktreeBranch,
    worktreeHookBased: record?.worktreeHookBased
  };
  if (worktree === null || worktree.enteredExisting) return {
    worktreePath: undefined,
    worktreeBranch: undefined,
    worktreeHookBased: undefined
  };
  return {
    worktreePath: worktree.worktreePath,
    worktreeBranch: worktree.worktreeBranch,
    worktreeHookBased: worktree.hookBased
  };
}
async function scanLinkRecords(transcriptPath, children, offset) {
  let handle;
  try {
    handle = await RDe.open(transcriptPath, "r");
  } catch {
    return {
      children: children,
      linkScanOffset: offset
    };
  }
  let scanFrom = offset;
  try {
    let {
      size: size
    } = await handle.stat();
    if (size === offset) return {
      children: children,
      linkScanOffset: size
    };
    if (scanFrom = size < offset ? 0 : offset, size - scanFrom > LINK_SCAN_MAX_BYTES) scanFrom = size - LINK_SCAN_MAX_BYTES;
    let buffer = Buffer.alloc(size - scanFrom);
    await handle.read(buffer, 0, buffer.length, scanFrom);
    let lastNewline = buffer.lastIndexOf(10);
    if (lastNewline < 0) return {
      children: children,
      linkScanOffset: scanFrom
    };
    let chunk = buffer.toString("utf-8", 0, lastNewline),
      byHref = new Map((children ?? []).map(child => [child.href, child])),
      worktreeSession;
    for (let line of chunk.split(`
`)) {
      let isPrLink = line.includes('"pr-link"'),
        isWorktreeState = line.includes('"worktree-state"'),
        isFrameLink = false;
      if (isFrameLink = line.includes('"frame-link"'), !isPrLink && !isWorktreeState && !isFrameLink) continue;
      try {
        let record = qt(line);
        if (record.type === "pr-link" && record.prUrl) byHref.set(record.prUrl, {
          id: String(record.prNumber ?? record.prUrl),
          href: record.prUrl,
          kind: "pr"
        });else if (record.type === "worktree-state") worktreeSession = record.worktreeSession ?? null;else if (record.type === "frame-link" && record.frameUrl && record.path) {
          let basename = record.path.split(/[\\/]/).pop() ?? record.path;
          byHref.delete(record.frameUrl), byHref.set(record.frameUrl, {
            id: basename,
            href: record.frameUrl,
            kind: "frame"
          });
        }
      } catch {}
    }
    return {
      children: byHref.size > 0 ? [...byHref.values()] : children,
      linkScanOffset: scanFrom + lastNewline + 1,
      worktree: worktreeSession
    };
  } catch (err) {
    return A(`[classifier] scanLinkRecords error: ${err}`), {
      children: children,
      linkScanOffset: scanFrom
    };
  } finally {
    await handle.close().catch(Ie);
  }
}
var RDe,
  pathMod,
  stashedStructuredResult,
  CLASSIFY_DEBOUNCE_MS = 15000,
  EXTRA_THINKING_TOKENS = 2048,
  NAME_GEN_MAX_ATTEMPTS = 3,
  DEGENERATE_NAME_RE,
  SUPPRESSED_TOOLS,
  LINK_SCAN_MAX_BYTES = 4194304;
var kWn = b(() => {
  lt();
  s5t();
  Rpt();
  mn();
  jn();
  kt();
  rb();
  qz();
  cW();
  sge();
  MR();
  vd();
  Po();
  qe();
  Ct();
  Xo();
  vn();
  po();
  gOt();
  Ro();
  aA();
  D_();
  _a();
  cxe();
  tn();
  lr();
  $M();
  Nxe();
  EWn();
  g8e();
  Pf();
  RDe = require("fs/promises"), pathMod = require("path");
  DEGENERATE_NAME_RE = /^(unspecified|untitled|unnamed)\b|^(unknown|no) (request|task|job|input)\b/;
  SUPPRESSED_TOOLS = new Set([$h, _w, EC]);
});

export {moduleExports as wWn,writeStateAndPatch as _8e,stashBgStructuredResult,createClassifierJobState,getClassifierConfig as jsl,pickClassifierModel as Ysl,pickThinkingBudget as Jsl,isContinueOrResume as BGp,surfaceFlags as lbo,emitDispatchOnce as UGp,captureIntent,findLatestRealUserAsk,captureLatestAsk,stripSystemReminder as cbo,markTurnActive,classifyAndPushDebounced,writeActiveState as Xsl,setPermissionBlock,setWorktreeOwnership,ensurePermissionBridge,scanLinks as til,markTurnAborted,markApiFailure,generateJobName as JGp,classifyAndPush,deriveMidturnDetail as XGp,runClassify as QGp,summarizeToolCalls,classify,worktreeOwnershipFields,scanLinkRecords,RDe,pathMod as vWn,stashedStructuredResult as zsl,CLASSIFY_DEBOUNCE_MS as FGp,EXTRA_THINKING_TOKENS as Ksl,NAME_GEN_MAX_ATTEMPTS as jGp,DEGENERATE_NAME_RE as YGp,SUPPRESSED_TOOLS as ZGp,LINK_SCAN_MAX_BYTES,kWn};
