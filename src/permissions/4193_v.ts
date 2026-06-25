// @ts-nocheck
import {TeamDeleteToolName as Pe,IN,tn} from "../config/0230_encoding.ts";
import {eat} from "../../vendor/m3326.ts";
import {createAgentWorktree as y5e,hasWorktreeChanges as tqt,removeAgentWorktree as Bte,unlockAgentWorktree as qye,qI} from "../session/5205_worktreeBranchName.ts";
import {isTmuxControlMode as Lt,Npe,Po} from "../../vendor/m638.ts";
import {getBranch as Ry,isBranchOnOrigin as bRt,ia} from "../../vendor/m698.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {$xe,m5e} from "../../vendor/m4184.ts";
import {kqn,J4t,Iqn,X4t,Uye} from "../../vendor/m4181.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {xKa,Zho} from "../../vendor/m4190.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {filterDeniedAgents as Wxe,getDenyRuleForAgent as T5e,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {ls,fg} from "../../vendor/m2232.ts";
import {Wdo,_Y} from "./3988_toolName.ts";
import {Rp,qrt,MO} from "../tools/2710_allErrors.ts";
import {isBuiltInAgent as Gh,kg} from "./4476_toAgentInfos.ts";
import {dynamicTeamContext as IF,Cp} from "../config/2223_level.ts";
import {Zk} from "../mcp/3159_scope.ts";
import {FY,cx} from "../artifact/4323_cx.ts";
import {fut,y9t} from "../../vendor/m3890.ts";
import {Gl,ri} from "../tools/2235_userFacingName.ts";
import {pte,tce} from "./3892_permissionMode.ts";
import {yye,Tye} from "../telemetry/3989_agentType.ts";
import {OP,YL} from "../../vendor/m123.ts";
import {y7,k3,Q5,Ph} from "../agent/1459_agentType.ts";
import {H3,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {getCanonicalName as So,Ro} from "./1458_swapShrinksContextWindow.ts";
import {Ne} from "../../vendor/m583.ts";
import {Q$,fye} from "./4104_clients.ts";
import {Mn,Kl,po} from "../tools/5224_userPromptCount.ts";
import {TIe,aat} from "../../vendor/m3329.ts";
import {Ta,Ct} from "../../vendor/m197.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {lee,g1} from "../core/2741_input_tokens.ts";
import {qqn,ego} from "../../vendor/m4191.ts";
import {teleportToRemote as Lq,awaitRemoteSessionResult as Nco,archiveRemoteSession as Mq,qD} from "./3888_validateSessionRepository.ts";
import {Tte,V$} from "../telemetry/3911_contextWindow.ts";
import {$E,Opt} from "../core/4189_input_tokens.ts";
import {b} from "../../runtime.ts";
import {jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {parsePermissionRule as d$,BRIEF_TOOL_NAME as u1} from "../../vendor/m2704.ts";
import {WORKFLOW_TOOL_NAME as AI} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
// @ts-nocheck
function CFp(cpuCount) {
  return Math.min(16, Math.max(2, cpuCount - 2));
}
function _5e(value) {
  if (value == null) return;
  let text = (typeof value === "string" ? value : Pe(value)).trim();
  if (!text) return;
  return text.length > DKa ? text.slice(0, DKa) + "\u2026" : text;
}
function BKa(ctx, canUseTool, emitProgress, runId, onAgentSpawn, phaseSeeds, budget, journal, journal_2) {
  let agentCount = 0,
    settle = async promise => ({
      v: await promise
    }),
    callFn = (fn, ...args) => fn(...args),
    cloneResult = value => IN(value),
    lastCacheKey = "",
    cacheBypass = false,
    capWarned = false,
    budgetWarned = false,
    failures = [],
    worktreePool = eat(1, y5e),
    branchProbe;
  function resolveBranch() {
    return branchProbe ??= (async () => {
      let cwd = Lt(),
        branch = await Ry(cwd);
      if (branch === "HEAD") return;
      if (await bRt(branch, cwd)) return branch;
      emitProgress({
        type: "progress",
        toolUseID: "workflow_log",
        data: {
          type: "workflow_log",
          message: `local branch '${branch}' is not pushed to origin; remote agents will run against the repository's default branch.`
        }
      });
      return;
    })(), branchProbe;
  }
  function checkAgentCap() {
    if (agentCount < MKa) return;
    if (!capWarned) capWarned = true, W("tengu_workflow_agent_cap_exceeded", {
      agentCount: agentCount
    });
    throw new NKa();
  }
  function checkBudget() {
    if (budget?.total == null || budget.total <= 0) return;
    let spent = budget.getTurnSpent();
    if (spent < budget.total) return;
    if (!budgetWarned) budgetWarned = true, W("tengu_workflow_budget_cap_exceeded", {
      spent: spent,
      budget: budget.total,
      agentCount: agentCount
    });
    throw new FKa(spent, budget.total);
  }
  let phaseCounter = 0,
    currentPhase,
    phaseIndices = new Map(),
    runtimeCtx = {
      ...ctx,
      setAppState: () => {},
      setToolPermissionContext: () => {}
    };
  function resolvePhase(title, kind) {
    let index = phaseIndices.get(title);
    if (index == null) index = ++phaseCounter, phaseIndices.set(title, index), emitProgress({
      type: "progress",
      toolUseID: `workflow_phase_${index}`,
      data: {
        type: "workflow_phase",
        index: index,
        title: title,
        kind: kind
      }
    });
    return index;
  }
  for (let title of phaseSeeds ?? []) resolvePhase(title);
  let phaseFn = $xe(title => {
      currentPhase = kqn(title), resolvePhase(currentPhase);
    }),
    runLocalAgent = eat(AFp, N),
    runRemoteAgent = eat(RFp, V),
    schemaCache = new WeakMap(),
    agentFn = $xe(async (promptArg, options) => {
      let agentContext = ctx.agentContext,
        schemaObj;
      if (options !== null && typeof options === "object" && !LKa.types.isProxy(options)) {
        let schemaDesc = Object.getOwnPropertyDescriptor(options, "schema"),
          schemaVal = schemaDesc && "value" in schemaDesc ? schemaDesc.value : undefined;
        if (schemaVal !== null && typeof schemaVal === "object") schemaObj = schemaVal;
      }
      let opts = J4t(options);
      if (opts && schemaObj !== undefined) {
        let cached = schemaCache.get(schemaObj);
        if (cached === undefined) cached = J4t(schemaObj), schemaCache.set(schemaObj, cached);
        opts.schema = cached;
      }
      if (runtimeCtx.abortController?.signal.aborted) return new Promise(() => {});
      try {
        checkAgentCap(), checkBudget();
      } catch (err) {
        throw await Kn(0), err;
      }
      let index = ++agentCount,
        prompt = kqn(promptArg),
        label = opts?.label != null ? String(opts.label) : prompt.slice(0, 60).replace(/\s+/g, " ").trim(),
        phaseTitle = opts?.phase != null ? String(opts.phase) : currentPhase,
        phaseIndex = phaseTitle != null ? resolvePhase(phaseTitle) : undefined,
        stallMs = opts?.stallMs != null ? Number(opts.stallMs) : DFp,
        promptPreview = _5e(prompt),
        cacheKey,
        agentId;
      if (journal) {
        cacheKey = xKa(prompt, opts, lastCacheKey), lastCacheKey = cacheKey;
        let hit = cacheBypass ? undefined : journal_2?.results.get(cacheKey);
        if (hit !== undefined) return emitProgress({
          type: "progress",
          toolUseID: `workflow_agent_${index}_cached`,
          data: {
            type: "workflow_agent",
            index: index,
            label: label,
            phaseIndex: phaseIndex,
            phaseTitle: phaseTitle,
            agentId: hit.agentId,
            model: opts?.model ?? runtimeCtx.options.mainLoopModel,
            state: "done",
            startedAt: Date.now(),
            lastProgressAt: Date.now(),
            cached: true,
            resultPreview: _5e(hit.result),
            promptPreview: promptPreview
          }
        }), cloneResult(hit.result);
        cacheBypass = true;
        let priorStarts = journal_2?.started.get(cacheKey);
        if (priorStarts && priorStarts.length > 0) W("tengu_workflow_journal_started_hit_respawn", {
          attempts: priorStarts.length
        });
      }
      let startedRecorded = false,
        recordStarted = id => {
          if (startedRecorded = true, agentId = id, !journal) return;
          journal.append({
            type: "started",
            key: cacheKey,
            agentId: id
          }).catch(err => A(`workflow journal started-append failed: ${err}`, {
            level: "warn"
          }));
        },
        recordResult = async result => {
          if (journal && cacheKey && result !== null) await journal.append({
            type: "result",
            key: cacheKey,
            agentId: agentId ?? "",
            result: result
          }).catch(err => A(`workflow journal result-append failed: ${err}`, {
            level: "warn"
          }));
          return result;
        },
        queuedAt = Date.now(),
        emitQueued = () => emitProgress({
          type: "progress",
          toolUseID: `workflow_agent_${index}_queued`,
          data: {
            type: "workflow_agent",
            index: index,
            label: label,
            phaseIndex: phaseIndex,
            phaseTitle: phaseTitle,
            agentType: opts?.agentType != null ? String(opts.agentType) : undefined,
            isolation: opts?.isolation === "worktree" || opts?.isolation === "remote" ? opts.isolation : undefined,
            model: opts?.model ?? runtimeCtx.options.mainLoopModel,
            state: "start",
            queuedAt: queuedAt,
            promptPreview: promptPreview,
            lastProgressAt: queuedAt
          }
        });
      if (opts?.isolation === "remote") throw Error("agent({isolation:'remote'}) is not available in this build");
      emitQueued();
      try {
        return await recordResult(await runLocalAgent(index, prompt, label, phaseTitle, phaseIndex, stallMs, opts, recordStarted, queuedAt, agentContext));
      } catch (err) {
        if (!startedRecorded && !runtimeCtx.abortController?.signal.aborted) emitProgress({
          type: "progress",
          toolUseID: `workflow_agent_${index}_queued`,
          data: {
            type: "workflow_agent",
            index: index,
            label: label,
            phaseIndex: phaseIndex,
            phaseTitle: phaseTitle,
            model: opts?.model ?? runtimeCtx.options.mainLoopModel,
            state: "error",
            error: err instanceof Error ? err.message : String(err),
            queuedAt: queuedAt,
            promptPreview: promptPreview,
            lastProgressAt: Date.now()
          }
        });
        if (runtimeCtx.abortController?.signal.aborted) return new Promise(() => {});
        throw err;
      }
    });
  async function N(index, prompt, prompt_2, phaseTitle, phaseIndex, stallMs, opts, recordStarted, queuedAt, parentAgentCtx) {
    if (runtimeCtx.abortController?.signal.aborted) throw Error("Workflow aborted");
    checkBudget();
    let agentDef;
    if (opts?.agentType != null) {
      let agentType = String(opts.agentType),
        activeAgents = runtimeCtx.options.agentDefinitions.activeAgents,
        permCtx = Mr(runtimeCtx),
        allowedAgents = Wxe(activeAgents, permCtx, ls),
        found = allowedAgents.find(a => a.agentType === agentType);
      if (!found) {
        if (activeAgents.some(a => a.agentType === agentType)) {
          let denyRule = T5e(permCtx, ls, agentType);
          throw Error(`agent({agentType}): '${agentType}' is denied by permission rule '${ls}(${agentType})' from ${denyRule?.source ?? "settings"}.`);
        }
        throw Error(`agent({agentType}): agent type '${agentType}' not found. Available agents: ${allowedAgents.map(a => a.agentType).join(", ")}`);
      }
      let disallowedTools = [...(found.disallowedTools ?? []), ...(tgo.disallowedTools ?? [])],
        schemaSuffix = opts.schema ? HFp : kFp,
        tools = opts.schema && !Wdo(found.tools) ? [...(found.tools ?? []), Rp] : found.tools;
      agentDef = Gh(found) ? {
        ...found,
        disallowedTools: disallowedTools,
        tools: tools,
        getSystemPrompt: a => found.getSystemPrompt(a) + schemaSuffix
      } : {
        ...found,
        disallowedTools: disallowedTools,
        tools: tools,
        getSystemPrompt: () => found.getSystemPrompt() + schemaSuffix
      };
    }
    let schemaTool;
    if (opts?.schema) {
      let compiled = qrt(opts.schema);
      if ("error" in compiled) throw TypeError(`agent({schema}) received an invalid JSON Schema: ${compiled.error}`);
      schemaTool = compiled.tool;
    }
    let baseDef = agentDef ?? (schemaTool ? xFp : tgo),
      effort = IF(opts?.effort),
      effectiveDef = effort !== undefined ? {
        ...baseDef,
        effort: effort
      } : baseDef,
      appState = runtimeCtx.getAppState(),
      permCtx = Mr(runtimeCtx),
      replTools = runtimeCtx.options.tools.filter(Zk),
      permCtxWithMode = {
        ...permCtx,
        mode: effectiveDef.permissionMode ?? "acceptEdits"
      },
      availableTools = FY(permCtxWithMode, fut(appState.mcp.tools.concat(replTools)), {
        skipReplFilter: true,
        skillTools: appState.skillTools
      }),
      toolsForQuery = schemaTool ? [...availableTools.filter(toolDef => !Gl(toolDef, Rp)), schemaTool] : availableTools,
      model = pte(yye(effectiveDef, runtimeCtx.options.mainLoopModel), runtimeCtx.options.mainLoopModel, opts?.model, permCtx.mode),
      worktree = null;
    if (opts?.isolation === "worktree") {
      let branchName = runId ? `${runId}-${index}` : `wf-${index}`;
      worktree = await worktreePool(branchName);
    }
    let worktreePath = worktree?.worktreePath,
      effectivePrompt = worktree ? `${prompt}

---
You are running in an isolated git worktree at ${worktree.worktreePath} (a separate working copy of the repo). Changes you make here do NOT affect the main working directory (${Lt()}) or other agents. Work normally \u2014 the worktree will be cleaned up automatically if you made no changes, or preserved for review if you did.` : prompt,
      carriedTokens = 0,
      carriedToolCalls = 0,
      carriedDurationMs = 0,
      startedAt = Date.now(),
      effectivePromptPreview = _5e(prompt);
    async function attempt(promptText, label, attemptNum, attemptReason) {
      let agentId = OP();
      recordStarted(agentId);
      let subagentCtx = {
          agentId: agentId,
          parentAgentId: y7(parentAgentCtx) ? undefined : parentAgentCtx?.agentId,
          depth: k3(parentAgentCtx) + 1,
          parentSessionId: H3(),
          agentType: "subagent",
          subagentName: effectiveDef.agentType,
          isAsync: false,
          isBuiltIn: Gh(effectiveDef)
        },
        progressToolUseId = `workflow_agent_${index}_${agentId}`,
        lastToolName,
        lastToolSummary,
        fallbackModel,
        modelKey = model ? So(model) : undefined,
        emitState = (state, extra) => emitProgress({
          type: "progress",
          toolUseID: progressToolUseId,
          data: {
            type: "workflow_agent",
            index: index,
            label: label,
            phaseIndex: phaseIndex,
            phaseTitle: phaseTitle,
            agentId: agentId,
            agentType: agentDef?.agentType,
            isolation: worktree ? "worktree" : undefined,
            model: model,
            fallbackModel: fallbackModel,
            state: state,
            startedAt: startedAt,
            queuedAt: queuedAt,
            attempt: attemptNum,
            lastAttemptReason: attemptReason,
            lastToolName: lastToolName,
            lastToolSummary: lastToolSummary,
            promptPreview: effectivePromptPreview,
            lastProgressAt: Date.now(),
            ...extra
          }
        }),
        abortCtrl = new AbortController(),
        parentSignal = runtimeCtx.abortController?.signal,
        onParentAbort = () => abortCtrl.abort("workflow-abort");
      if (parentSignal?.addEventListener("abort", onParentAbort), parentSignal?.aborted) abortCtrl.abort("workflow-abort");
      onAgentSpawn?.(agentId, abortCtrl);
      let stallTimer,
        lastProgressTick = 0,
        progressThrottleMs = Math.min(stallMs * 0.1, 1000),
        armStallTimer = () => {
          if (clearTimeout(stallTimer), stallMs > 0) stallTimer = setTimeout(ctrl => ctrl.abort("stalled"), stallMs, abortCtrl);
        },
        inFlightToolUseIds = new Set(),
        maybeArmStallTimer = () => {
          if (inFlightToolUseIds.size === 0 && stallTimer === undefined) armStallTimer();
        },
        onQueryProgress = () => {
          if (inFlightToolUseIds.size > 0) return;
          let now = Date.now();
          if (now - lastProgressTick < progressThrottleMs) return;
          lastProgressTick = now, armStallTimer();
        },
        attemptCtx = {
          ...runtimeCtx,
          abortController: abortCtrl
        };
      emitState("start", carriedTokens || carriedToolCalls ? {
        tokens: carriedTokens,
        toolCalls: carriedToolCalls
      } : undefined), armStallTimer();
      let lastAssistant,
        structuredOutput,
        lastTokens = 0,
        toolCallCount = 0,
        structuredOutputAttempts = 0,
        failedStructuredOutputCalls = 0,
        lastStructuredOutputInput,
        pendingStructuredOutputIds = new Set(),
        structuredRetryCap = Ne.MAX_STRUCTURED_OUTPUT_RETRIES ?? PFp,
        attemptStart = Date.now();
      try {
        await Q5(subagentCtx, async () => {
          for await (let event of Q$({
            agentDefinition: effectiveDef,
            promptMessages: [Mn({
              content: promptText
            })],
            toolUseContext: attemptCtx,
            canUseTool: canUseTool,
            isAsync: false,
            querySource: TIe(effectiveDef.agentType, Gh(effectiveDef)),
            spawnedBySkill: runtimeCtx.options.spawnedBySkill ?? runtimeCtx.options.activeSkill,
            availableTools: toolsForQuery,
            requiresStructuredOutput: schemaTool !== undefined,
            transcriptSubdir: runId ? `workflows/${runId}` : undefined,
            spawnedByWorkflowRunId: runId,
            override: {
              agentId: agentId,
              agentContext: subagentCtx
            },
            model: opts?.model,
            onQueryProgress: onQueryProgress,
            worktreePath: worktreePath
          })) {
            if (event.type === "attachment" && event.attachment.type === "structured_output") {
              structuredOutput = event.attachment.data;
              continue;
            }
            if (event.type === "set_in_progress_tool_use_ids") {
              if (event.op.action === "remove") {
                for (let id of event.op.ids) inFlightToolUseIds.delete(id);
                maybeArmStallTimer();
              }
              continue;
            }
            if (event.type === "user") {
              let content = event.message.content;
              if (Array.isArray(content)) {
                for (let block of content) if (typeof block === "object" && block?.type === "tool_result") {
                  if (inFlightToolUseIds.delete(block.tool_use_id), pendingStructuredOutputIds.delete(block.tool_use_id) && block.is_error) failedStructuredOutputCalls++;
                }
                if (maybeArmStallTimer(), failedStructuredOutputCalls > 0 && failedStructuredOutputCalls >= structuredRetryCap && structuredOutput === undefined) throw new Ta(`agent({schema}): StructuredOutput retry cap (${structuredRetryCap}) exceeded \u2014 ` + `${failedStructuredOutputCalls} failed ${Sn(failedStructuredOutputCalls, "call")} with no valid output`, "Workflow agent({schema}) StructuredOutput retry cap exceeded");
              }
              continue;
            }
            if (event.type === "assistant") {
              if (lastAssistant = event, !event.isApiErrorMessage) {
                lastTokens = lee(event.message.usage);
                let usedModel = event.message.model;
                if (usedModel && modelKey && usedModel !== model && So(usedModel) !== modelKey) fallbackModel = usedModel;
              }
              let toolUseInThisMessage = 0;
              for (let block of event.message.content) {
                if (block.type !== "tool_use") continue;
                if (toolUseInThisMessage++, inFlightToolUseIds.add(block.id), lastToolName = block.name, lastToolSummary = qqn(block.input) || undefined, block.name === Rp) {
                  if (structuredOutputAttempts++, lastStructuredOutputInput = block.input, pendingStructuredOutputIds.add(block.id), structuredOutput !== undefined && structuredOutputAttempts > 2) {
                    abortCtrl.abort("stalled");
                    break;
                  }
                }
              }
              if (toolCallCount += toolUseInThisMessage, toolUseInThisMessage > 0) clearTimeout(stallTimer), stallTimer = undefined;else onQueryProgress();
              emitState("progress", {
                tokens: carriedTokens + lastTokens,
                toolCalls: carriedToolCalls + toolCallCount
              });
            }
          }
        });
      } catch (err) {
        let abortReason = abortCtrl.signal.aborted ? abortCtrl.signal.reason : undefined;
        if (abortReason === "stalled" || abortReason === "user-retry") {
          if (abortReason === "stalled" && structuredOutput !== undefined) {
            let durationMs = Date.now() - attemptStart;
            return emitState("done", {
              tokens: carriedTokens + lastTokens,
              toolCalls: carriedToolCalls + toolCallCount,
              durationMs: carriedDurationMs + durationMs,
              resultPreview: _5e(structuredOutput)
            }), {
              structured: structuredOutput,
              text: "",
              tokens: lastTokens,
              toolCalls: toolCallCount,
              stalled: false,
              skipped: false,
              durationMs: durationMs,
              stopReason: undefined,
              outputTokens: undefined,
              structuredOutputAttempts: structuredOutputAttempts,
              lastStructuredOutputInput: lastStructuredOutputInput
            };
          }
          return emitState("error", {
            error: abortReason === "stalled" ? `stalled \u2014 no progress for ${stallMs}ms` : "retry requested by user",
            tokens: carriedTokens + lastTokens,
            toolCalls: carriedToolCalls + toolCallCount,
            durationMs: carriedDurationMs + (Date.now() - attemptStart)
          }), {
            structured: undefined,
            text: "",
            tokens: lastTokens,
            toolCalls: toolCallCount,
            stalled: true,
            stalledReason: abortReason,
            skipped: false,
            durationMs: Date.now() - attemptStart,
            stopReason: undefined,
            outputTokens: undefined,
            structuredOutputAttempts: structuredOutputAttempts,
            lastStructuredOutputInput: lastStructuredOutputInput
          };
        }
        if (abortReason === "user-skip") return emitState("error", {
          error: "skipped by user",
          skipped: true,
          tokens: carriedTokens + lastTokens,
          toolCalls: carriedToolCalls + toolCallCount,
          durationMs: carriedDurationMs + (Date.now() - attemptStart)
        }), {
          structured: undefined,
          text: "",
          tokens: lastTokens,
          toolCalls: toolCallCount,
          stalled: false,
          skipped: true,
          durationMs: Date.now() - attemptStart,
          stopReason: undefined,
          outputTokens: undefined,
          structuredOutputAttempts: structuredOutputAttempts,
          lastStructuredOutputInput: lastStructuredOutputInput
        };
        throw emitState("error", {
          error: err instanceof Error ? err.message : String(err),
          tokens: carriedTokens + lastTokens,
          toolCalls: carriedToolCalls + toolCallCount,
          durationMs: carriedDurationMs + (Date.now() - attemptStart)
        }), err;
      } finally {
        clearTimeout(stallTimer), parentSignal?.removeEventListener("abort", onParentAbort), onAgentSpawn?.(agentId, null);
      }
      let finalAssistant = lastAssistant,
        text = finalAssistant ? Kl(finalAssistant.message.content, `
`) : "",
        usage = finalAssistant?.message.usage,
        outputTokens = usage && typeof usage.output_tokens === "number" ? usage.output_tokens : undefined,
        durationMs = Date.now() - attemptStart,
        totalTokens = carriedTokens + (lastTokens || (finalAssistant ? lee(finalAssistant.message.usage) : 0));
      if (finalAssistant?.isApiErrorMessage) {
        let apiError = text || "API error";
        return emitState("error", {
          error: apiError,
          tokens: totalTokens,
          toolCalls: carriedToolCalls + toolCallCount,
          durationMs: carriedDurationMs + durationMs
        }), {
          structured: structuredOutput,
          text: text,
          apiError: apiError,
          tokens: lastTokens,
          toolCalls: toolCallCount,
          stalled: false,
          skipped: false,
          durationMs: durationMs,
          stopReason: finalAssistant.message.stop_reason,
          outputTokens: outputTokens,
          structuredOutputAttempts: structuredOutputAttempts,
          lastStructuredOutputInput: lastStructuredOutputInput
        };
      }
      return emitState("done", {
        tokens: totalTokens,
        toolCalls: carriedToolCalls + toolCallCount,
        durationMs: carriedDurationMs + durationMs,
        resultPreview: _5e(schemaTool ? structuredOutput : text)
      }), {
        structured: structuredOutput,
        text: text,
        tokens: lastTokens,
        toolCalls: toolCallCount,
        stalled: false,
        skipped: false,
        durationMs: durationMs,
        stopReason: finalAssistant?.message.stop_reason,
        outputTokens: outputTokens,
        structuredOutputAttempts: structuredOutputAttempts,
        lastStructuredOutputInput: lastStructuredOutputInput
      };
    }
    try {
      let result = await Npe(worktreePath, () => attempt(effectivePrompt, prompt_2, 1)),
        isThrottled = r => !r.stalled && !r.skipped && r.stopReason == null && r.structured === undefined && (r.outputTokens ?? 1 / 0) < 50 && r.durationMs > stallMs * 0.5,
        throttled = isThrottled(result);
      if (throttled) {
        if (emitProgress({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: `[${prompt_2}] throttled response (no stop_reason, ${result.outputTokens ?? "?"} output tokens in ${Math.round(result.durationMs / 1000)}s) \u2014 ` + "sleeping 45s before retry"
          }
        }), await Kn(45000, runtimeCtx.abortController?.signal, {
          throwOnAbort: true
        }), carriedTokens += result.tokens, carriedToolCalls += result.toolCalls, carriedDurationMs += result.durationMs, result = await Npe(worktreePath, () => attempt(effectivePrompt, `${prompt_2} (throttle-retry)`, 2, "throttled")), isThrottled(result)) emitProgress({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: `[${prompt_2}] throttle-retry also degraded \u2014 ` + "giving up on throttle backoff"
          }
        });
      }
      let stallReasons = [];
      for (let retry = 1; result.stalled && !throttled && retry <= PKa; retry++) {
        if (runtimeCtx.abortController?.signal.aborted) throw Error("Workflow aborted");
        let reason = result.stalledReason ?? "stalled";
        stallReasons.push(reason);
        let reasonText = reason === "user-retry" ? "retry requested by user" : "stalled (no progress)",
          structuredNote = "";
        if (reason === "stalled" && result.structuredOutputAttempts > 0 && result.structured === undefined) {
          let inputStr = Pe(result.lastStructuredOutputInput),
            inputPreview = inputStr.length > 300 ? inputStr.slice(0, 300) + "\u2026" : inputStr;
          structuredNote = ` \u2014 ${result.structuredOutputAttempts} StructuredOutput validation ${Sn(result.structuredOutputAttempts, "failure")} (last input: ${inputPreview})`;
        }
        emitProgress({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: `[stall] agent "${prompt_2}" ${reasonText} after ${Math.round(result.durationMs / 1000)}s${structuredNote} \u2014 retrying (${retry}/${PKa})`
          }
        }), carriedTokens += result.tokens, carriedToolCalls += result.toolCalls, carriedDurationMs += result.durationMs, result = await Npe(worktreePath, () => attempt(effectivePrompt, `${prompt_2} (retry ${retry})`, retry + 1, reason));
      }
      if (result.skipped) return null;
      if (result.stalled) {
        stallReasons.push(result.stalledReason ?? "stalled");
        let attemptTotal = stallReasons.length,
          allUserRetry = stallReasons.every(reason => reason === "user-retry"),
          allStalled = stallReasons.every(reason => reason === "stalled"),
          structuredNote = result.stalledReason !== "user-retry" && result.structuredOutputAttempts > 0 && result.structured === undefined ? ` \u2014 ${result.structuredOutputAttempts} StructuredOutput validation ${Sn(result.structuredOutputAttempts, "failure")} on the last attempt` : "";
        throw Error(allUserRetry ? `agent abandoned: user requested retry on all ${attemptTotal} attempts` : allStalled ? `agent stalled on all ${attemptTotal} attempts (no progress for ${stallMs}ms each)${structuredNote}` : `agent abandoned after ${attemptTotal} attempts (${stallReasons.join(" \u2192 ")})${structuredNote}`);
      }
      if (result.apiError) {
        let logMsg = `[${prompt_2}] failed: ${result.apiError}`;
        return failures.push(logMsg), emitProgress({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: logMsg
          }
        }), null;
      }
      if (schemaTool) {
        if (result.structured === undefined) throw Error("agent({schema}): subagent completed without calling StructuredOutput (after in-conversation nudge)");
        return cloneResult(result.structured);
      }
      return result.text;
    } finally {
      if (worktree) {
        let {
          worktreePath: wtPath,
          worktreeBranch: wtBranch,
          headCommit: wtHead,
          gitRoot: wtRoot,
          hookBased: wtHookBased
        } = worktree;
        try {
          if (!wtHookBased && wtHead && !(await tqt(wtPath, wtHead))) await Bte(wtPath, wtBranch, wtRoot, false, "workflow_tool");else if (wtRoot) await qye(wtPath, wtRoot);
        } catch {}
      }
    }
  }
  function F(mode) {
    if (mode === "bubble") return;
    if (mode === "bypassPermissions") return "auto";
    return mode;
  }
  async function V(index, prompt, label, phaseTitle, phaseIndex, opts, queuedAt) {
    let parentSignal = runtimeCtx.abortController?.signal;
    if (parentSignal?.aborted) throw Error("Workflow aborted");
    checkBudget();
    let agentId = OP(),
      startedAt = Date.now(),
      promptPreview = _5e(prompt),
      remoteSessionId,
      emitState = (state, extra) => emitProgress({
        type: "progress",
        toolUseID: `workflow_agent_${index}_${agentId}`,
        data: {
          type: "workflow_agent",
          index: index,
          label: label,
          phaseIndex: phaseIndex,
          phaseTitle: phaseTitle,
          agentId: agentId,
          isolation: "remote",
          remoteSessionId: remoteSessionId,
          state: state,
          startedAt: startedAt,
          queuedAt: queuedAt,
          promptPreview: promptPreview,
          lastProgressAt: Date.now(),
          ...extra
        }
      }),
      abortCtrl = new AbortController(),
      onParentAbort = () => abortCtrl.abort("workflow-abort");
    if (parentSignal?.addEventListener("abort", onParentAbort), parentSignal?.aborted) abortCtrl.abort("workflow-abort");
    onAgentSpawn?.(agentId, abortCtrl), emitState("start");
    let createError;
    try {
      let permCtx = Mr(runtimeCtx),
        model = opts.model ? pte(undefined, runtimeCtx.options.mainLoopModel, opts.model, permCtx.mode) : undefined,
        session = await Lq({
          initialMessage: prompt,
          source: "workflow_remote_agent",
          tags: ["workflow-remote-agent"],
          description: label,
          branchName: await resolveBranch(),
          permissionMode: F(permCtx.mode),
          model: model,
          signal: abortCtrl.signal,
          onBundleFail: e => {
            createError = e;
          },
          onCreateFail: e => {
            createError = e;
          }
        });
      if (!session) throw Error(createError ?? "Failed to create cloud session");
      remoteSessionId = session.id, emitState("progress");
      let {
        text: text,
        structuredOutput: structuredOutput,
        resultSubtype: resultSubtype,
        usage: usage,
        modelUsage: modelUsage,
        toolCalls: toolCalls
      } = await Nco(remoteSessionId, abortCtrl.signal);
      for (let [modelName, mUsage] of Object.entries(modelUsage ?? {})) Tte(mUsage.costUSD, {
        ...$E,
        input_tokens: mUsage.inputTokens,
        output_tokens: mUsage.outputTokens,
        cache_read_input_tokens: mUsage.cacheReadInputTokens,
        cache_creation_input_tokens: mUsage.cacheCreationInputTokens,
        server_tool_use: {
          web_search_requests: mUsage.webSearchRequests,
          web_fetch_requests: 0
        }
      }, modelName);
      if (opts.schema && structuredOutput === undefined) {
        let detail = resultSubtype === "error_max_structured_output_retries" ? "the cloud agent called StructuredOutput but no attempt produced a surviving valid output (failed schema validation, or retracted by a model fallback)" : resultSubtype && resultSubtype !== "success" ? `the cloud agent turn ended with result subtype '${resultSubtype}'` : "the cloud agent never called the StructuredOutput tool";
        throw Error(`agent({isolation:'remote', schema}) completed without structured output: ${detail}.`);
      }
      if (emitState("done", {
        tokens: usage ? lee(usage) : 0,
        toolCalls: toolCalls,
        durationMs: Date.now() - startedAt,
        resultPreview: _5e(opts.schema ? structuredOutput : text)
      }), opts.schema) return cloneResult(structuredOutput);
      return text;
    } catch (err) {
      if (remoteSessionId) Mq(remoteSessionId).catch(() => {});
      if (abortCtrl.signal.reason === "user-skip") return emitState("error", {
        error: "skipped by user",
        skipped: true,
        durationMs: Date.now() - startedAt
      }), null;
      throw emitState("error", {
        error: err instanceof Error ? err.message : String(err),
        durationMs: Date.now() - startedAt
      }), err;
    } finally {
      parentSignal?.removeEventListener("abort", onParentAbort), onAgentSpawn?.(agentId, null);
    }
  }
  let parallelFn = $xe(async fns => {
      if (runtimeCtx.abortController?.signal.aborted) return new Promise(() => {});
      if (await Kn(0), !Array.isArray(fns)) throw TypeError("parallel() expects an array of functions");
      let items = Iqn(fns);
      if (items.length === 0) return cloneResult([]);
      checkAgentCap(), checkBudget();
      for (let fn of items) if (typeof fn !== "function") throw TypeError("parallel() expects an array of functions, not promises. Wrap each call: () => agent(...)");
      let settled = await Promise.allSettled(items.map(fn => settle(callFn(fn)))),
        droppedCount = 0,
        results = settled.map((res, idx) => {
          if (res.status === "fulfilled") return res.value.v;
          let {
            name: name,
            msg: msg
          } = X4t(res.reason);
          if (name === "WorkflowBudgetExceededError") return droppedCount++, null;
          let logMsg = `parallel[${idx}] failed: ${msg}`;
          return failures.push(logMsg), emitProgress({
            type: "progress",
            toolUseID: "workflow_log",
            data: {
              type: "workflow_log",
              message: logMsg
            }
          }), null;
        });
      if (droppedCount > 0) failures.push(`parallel: ${droppedCount} ${Sn(droppedCount, "slot")} dropped \u2014 token budget exceeded`);
      return cloneResult(results);
    }),
    pipelineFn = $xe(async (items, ...stages) => {
      if (runtimeCtx.abortController?.signal.aborted) return new Promise(() => {});
      if (await Kn(0), !Array.isArray(items)) throw TypeError("pipeline() expects an array as the first argument");
      let initialFns = Iqn(items),
        stageFns = Iqn(stages);
      if (initialFns.length === 0) return cloneResult([]);
      checkAgentCap(), checkBudget();
      for (let stage of stageFns) if (typeof stage !== "function") throw TypeError("pipeline() stages must be functions: pipeline(items, item => ..., result => ...)");
      let settled = await Promise.allSettled(initialFns.map(async (fn, idx) => {
          let acc = await settle(fn);
          for (let stage of stageFns) {
            if (acc.v === null) break;
            acc = await settle(callFn(stage, acc.v, fn, idx));
          }
          return acc;
        })),
        droppedCount = 0,
        results = settled.map((res, idx) => {
          if (res.status === "fulfilled") return res.value.v;
          let {
            name: name,
            msg: msg
          } = X4t(res.reason);
          if (name === "WorkflowBudgetExceededError") return droppedCount++, null;
          let logMsg = `pipeline[${idx}] failed: ${msg}`;
          return failures.push(logMsg), emitProgress({
            type: "progress",
            toolUseID: "workflow_log",
            data: {
              type: "workflow_log",
              message: logMsg
            }
          }), null;
        });
      if (droppedCount > 0) failures.push(`pipeline: ${droppedCount} ${Sn(droppedCount, "slot")} dropped \u2014 token budget exceeded`);
      return cloneResult(results);
    }),
    logFn = $xe(message => {
      emitProgress({
        type: "progress",
        toolUseID: "workflow_log",
        data: {
          type: "workflow_log",
          message: kqn(message)
        }
      });
    });
  return {
    agent: agentFn,
    parallel: parallelFn,
    pipeline: pipelineFn,
    log: logFn,
    phase: phaseFn,
    resolvePhase: resolvePhase,
    recordFailure: message => {
      failures.push(message);
    },
    getAgentCount: () => agentCount,
    getFailures: () => failures,
    bindVMAwait: vm => {
      settle = vm.settle, callFn = vm.call, cloneResult = vm.clone;
    }
  };
}
var OKa,
  LKa,
  AFp,
  RFp = 50,
  MKa = 1000,
  vFp,
  NKa,
  FKa,
  DKa = 400,
  wFp = `You are a subagent spawned by a workflow orchestration script. Use the tools available to complete the task.

CRITICAL: Your final text response is returned **verbatim** as a string to the calling script \u2014 it is your return value, not a message to a human.
- Output the literal result (data, JSON, text). Do NOT output confirmations like "Done." or "Sent."
- If asked for JSON, return ONLY the raw JSON \u2014 no code fences, no prose, no markdown.
- Do NOT use SendUserMessage to deliver your answer. Put your answer in your final text response.
- Be concise. The script will parse your output.`,
  kFp = `

---

NOTE: You are running inside a workflow script. Your final text response is returned verbatim as a string to the calling script \u2014 it is your return value, not a message to a human. Output the literal result; do not output confirmations like "Done." Be concise \u2014 the script will parse your output.`,
  HFp,
  IFp,
  tgo,
  xFp,
  DFp = 180000,
  PKa = 5,
  PFp = 5;
var UKa = b(() => {
  V$();
  jn();
  kt();
  Opt();
  ri();
  cx();
  Ph();
  xl();
  y9t();
  Po();
  qe();
  Cp();
  Ir();
  dn();
  Ct();
  ia();
  po();
  tce();
  Ro();
  ly();
  aat();
  tn();
  lr();
  Op();
  qD();
  g1();
  YL();
  Uye();
  qI();
  _Y();
  Tye();
  fg();
  kg();
  fye();
  d$();
  MO();
  m5e();
  Zho();
  ego();
  OKa = require("os"), LKa = require("util");
  AFp = CFp(OKa.cpus().length), vFp = `Workflow agent() call cap reached (${MKa}). This usually means a loop using budget.remaining() never terminates because ` + "no token budget was set \u2014 remaining() returns Infinity when budget.total is null. " + "Add a hard iteration cap to the loop, or pass a token budget.";
  NKa = class NKa extends Error {
    constructor() {
      super(vFp);
      this.name = "WorkflowAgentCapError";
    }
  };
  FKa = class FKa extends Error {
    constructor(e, t) {
      super(`Workflow token budget exceeded (${e.toLocaleString()} / ${t.toLocaleString()} output tokens). Stopping further agent() calls. In-flight agents will complete; their results are preserved.`);
      this.name = "WorkflowBudgetExceededError";
    }
  };
  HFp = `

---

NOTE: You are running inside a workflow script. You MUST return your final answer by calling the ${Rp} tool exactly once \u2014 the tool's input schema defines the required shape. Do your work, then call ${Rp}; do NOT put your answer in a text response (the script reads ONLY the tool call). If validation fails, read the error and call ${Rp} again with a corrected shape.`, IFp = `You are a subagent spawned by a workflow orchestration script. Use the tools available to complete the task.

CRITICAL: You MUST call the ${Rp} tool exactly once to return your final answer. The tool's input schema defines the required shape.
- Do your work (Read files, run commands, etc.), then call ${Rp} with your answer.
- Do NOT put your answer in a text response. The script reads ONLY the ${Rp} tool call.
- If the schema validation fails, read the error and call ${Rp} again with a corrected shape.
- After calling ${Rp} successfully, end your turn. No acknowledgment needed.`, tgo = {
    agentType: "workflow-subagent",
    whenToUse: "Internal subagent for workflow script orchestration.",
    tools: ["*"],
    disallowedTools: [u1, ls, AI],
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: () => wFp
  }, xFp = {
    ...tgo,
    getSystemPrompt: () => IFp
  };
});

export {CFp,_5e,BKa,OKa,LKa,AFp,RFp,MKa,vFp,NKa,FKa,DKa,wFp,kFp,HFp,IFp,tgo,xFp,DFp,PKa,PFp,UKa};
