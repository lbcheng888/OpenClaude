// @ts-nocheck
import {Le,cB,Xt} from "../config/0228_encoding.ts";
import {tst} from "../../vendor/m3310.ts";
import {createAgentWorktree,hasWorktreeChanges,removeAgentWorktree,unlockAgentWorktree,hI} from "../session/5172_worktreeBranchName.ts";
import {Pt,kpe,Go} from "../../vendor/m632.ts";
import {getBranch,isBranchOnOrigin,Ba} from "../../vendor/m693.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {YIe,Out} from "../../vendor/m4172.ts";
import {B9t,D9n,F9t,S_e} from "../../vendor/m4169.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {C6a,udo} from "../../vendor/m4177.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {filterDeniedAgents,getDenyRuleForAgent,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {Cs,Ph} from "../../vendor/m2224.ts";
import {cio,FY} from "./3921_toolName.ts";
import {bf,Ftt,aq} from "../tools/2698_allErrors.ts";
import {isBuiltInAgent,scrubPathsConfig} from "./4454_toAgentInfos.ts";
import {aF,Om} from "../config/2215_level.ts";
import {Pk} from "../mcp/3149_scope.ts";
import {ZY,Y0} from "../artifact/4303_Y0.ts";
import {Alt,GUt} from "../../vendor/m3872.ts";
import {Lc,Ri} from "../tools/2227_userFacingName.ts";
import {gte,sce} from "./3874_permissionMode.ts";
import {Xge,Qge} from "../telemetry/3922_agentType.ts";
import {mO,MM} from "../../vendor/m126.ts";
import {V7,POWERSHELL_TOOL_NAME,B8,S_} from "../agent/1454_agentType.ts";
import {u4,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Dct,_qe,x9} from "../../vendor/m4033.ts";
import {q9n,Ln,wc,lo} from "../tools/5190_userPromptCount.ts";
import {k9,Yge} from "./4040_clients.ts";
import {Dke,lst} from "../../vendor/m3313.ts";
import {uee,oN} from "../core/2729_input_tokens.ts";
import {$9n,ddo} from "../../vendor/m4178.ts";
import {Cn,dr} from "../../vendor/m231.ts";
import {teleportToRemote,awaitRemoteSessionResult,S6,RP} from "../tui/3870_validateSessionRepository.ts";
import {Cce,H9} from "../telemetry/4045_contextWindow.ts";
import {PE,Lut} from "../core/4176_input_tokens.ts";
import {b} from "../../runtime.ts";
import {zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {sn} from "../config/0047_namespace.ts";
import {j$,BRIEF_TOOL_NAME} from "../../vendor/m2692.ts";
import {WORKFLOW_TOOL_NAME} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
function i0p(e: any): any {
  return Math.min(16, Math.max(2, e - 2));
}
function Yqe(e: any): any {
  if (e == null) return;
  let t = (typeof e === "string" ? e : Le(e)).trim();
  if (!t) return;
  return t.length > v6a ? t.slice(0, v6a) + "\u2026" : t;
}
function D6a(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a: any, l: any): any {
  let c = 0,
    u = async (K: any) => ({
      v: await K
    }),
    d = (K: any, ...Y: any[]) => K(...Y),
    p = (K: any) => cB(K),
    m = "",
    f = !1,
    A = !1,
    h = !1,
    g: any[] = [],
    _ = tst(1, createAgentWorktree),
    y: any;
  function T(): any {
    return y ??= (async () => {
      let K = Pt(),
        Y = await getBranch(K);
      if (Y === "HEAD") return;
      if (await isBranchOnOrigin(Y, K)) return Y;
      n({
        type: "progress",
        toolUseID: "workflow_log",
        data: {
          type: "workflow_log",
          message: `local branch '${Y}' is not pushed to origin; remote agents will run against the repository's default branch.`
        }
      });
      return;
    })(), y;
  }
  function S(): void {
    if (c < k6a) return;
    if (!A) A = !0, logEvent("tengu_workflow_agent_cap_exceeded", {
      agentCount: c
    });
    throw new H6a();
  }
  function v(): void {
    if (i?.total == null || i.total <= 0) return;
    let K = i.getTurnSpent();
    if (K < i.total) return;
    if (!h) h = !0, logEvent("tengu_workflow_budget_cap_exceeded", {
      spent: K,
      budget: i.total,
      agentCount: c
    });
    throw new I6a(K, i.total);
  }
  let R = 0,
    k: any,
    x = new Map(),
    H = {
      ...e,
      setAppState: () => {},
      setToolPermissionContext: () => {}
    };
  function I(K: any, Y: any): any {
    let J = x.get(K);
    if (J == null) J = ++R, x.set(K, J), n({
      type: "progress",
      toolUseID: `workflow_phase_${J}`,
      data: {
        type: "workflow_phase",
        index: J,
        title: K,
        kind: Y
      }
    });
    return J;
  }
  for (let K of s ?? []) I(K);
  let P = YIe((K: any) => {
      k = String(K), I(k);
    }),
    L = tst(a0p, $),
    D = tst(l0p, W),
    N = new WeakMap(),
    O = YIe(async (K: any, Y: any) => {
      let J = e.agentContext,
        ee: any;
      if (Y !== null && typeof Y === "object" && !x6a.types.isProxy(Y)) {
        let Ae = Object.getOwnPropertyDescriptor(Y, "schema"),
          ge = Ae && "value" in Ae ? Ae.value : void 0;
        if (ge !== null && typeof ge === "object") ee = ge;
      }
      let te = B9t(Y);
      if (te && ee !== void 0) {
        let Ae = N.get(ee);
        if (Ae === void 0) Ae = B9t(ee), N.set(ee, Ae);
        te.schema = Ae;
      }
      if (H.abortController?.signal.aborted) return new Promise(() => {});
      try {
        S(), v();
      } catch (Ae: any) {
        throw await sleep(0), Ae;
      }
      let ne = ++c,
        re = String(K),
        oe = te?.label != null ? String(te.label) : re.slice(0, 60).replace(/\s+/g, " ").trim(),
        ce = te?.phase != null ? String(te.phase) : k,
        ue = ce != null ? I(ce) : void 0,
        ae = te?.stallMs != null ? Number(te.stallMs) : A0p,
        he = Yqe(re),
        se: any,
        le: any;
      if (a) {
        se = C6a(re, te, m), m = se;
        let Ae = f ? void 0 : l?.results.get(se);
        if (Ae !== void 0) return n({
          type: "progress",
          toolUseID: `workflow_agent_${ne}_cached`,
          data: {
            type: "workflow_agent",
            index: ne,
            label: oe,
            phaseIndex: ue,
            phaseTitle: ce,
            agentId: Ae.agentId,
            model: te?.model ?? H.options.mainLoopModel,
            state: "done",
            startedAt: Date.now(),
            lastProgressAt: Date.now(),
            cached: !0,
            resultPreview: Yqe(Ae.result),
            promptPreview: he
          }
        }), p(Ae.result);
        f = !0;
        let ge = l?.started.get(se);
        if (ge && ge.length > 0) logEvent("tengu_workflow_journal_started_hit_respawn", {
          attempts: ge.length
        });
      }
      let pe = !1,
        de = (Ae: any) => {
          if (pe = !0, le = Ae, !a) return;
          a.append({
            type: "started",
            key: se,
            agentId: Ae
          }).catch((ge: any) => logForDebugging(`workflow journal started-append failed: ${ge}`, {
            level: "warn"
          }));
        },
        _e = async (Ae: any) => {
          if (a && se && Ae !== null) await a.append({
            type: "result",
            key: se,
            agentId: le ?? "",
            result: Ae
          }).catch((ge: any) => logForDebugging(`workflow journal result-append failed: ${ge}`, {
            level: "warn"
          }));
          return Ae;
        },
        fe = Date.now(),
        ie = () => n({
          type: "progress",
          toolUseID: `workflow_agent_${ne}_queued`,
          data: {
            type: "workflow_agent",
            index: ne,
            label: oe,
            phaseIndex: ue,
            phaseTitle: ce,
            agentType: te?.agentType != null ? String(te.agentType) : void 0,
            isolation: te?.isolation === "worktree" || te?.isolation === "remote" ? te.isolation : void 0,
            model: te?.model ?? H.options.mainLoopModel,
            state: "start",
            queuedAt: fe,
            promptPreview: he,
            lastProgressAt: fe
          }
        });
      if (te?.isolation === "remote") throw Error("agent({isolation:'remote'}) is not available in this build");
      ie();
      try {
        return await _e(await L(ne, re, oe, ce, ue, ae, te, de, fe, J));
      } catch (Ae: any) {
        if (!pe && !H.abortController?.signal.aborted) n({
          type: "progress",
          toolUseID: `workflow_agent_${ne}_queued`,
          data: {
            type: "workflow_agent",
            index: ne,
            label: oe,
            phaseIndex: ue,
            phaseTitle: ce,
            model: te?.model ?? H.options.mainLoopModel,
            state: "error",
            error: Ae instanceof Error ? Ae.message : String(Ae),
            queuedAt: fe,
            promptPreview: he,
            lastProgressAt: Date.now()
          }
        });
        if (H.abortController?.signal.aborted) return new Promise(() => {});
        throw Ae;
      }
    });
  async function $(K: any, Y: any, J: any, ee: any, te: any, ne: any, re: any, oe: any, ce: any, ue: any): Promise<any> {
    if (H.abortController?.signal.aborted) throw Error("Workflow aborted");
    v();
    let ae: any;
    if (re?.agentType != null) {
      let $e = String(re.agentType),
        Je = H.options.agentDefinitions.activeAgents,
        Rt = Fr(H),
        Et = filterDeniedAgents(Je, Rt, Cs),
        dt = Et.find((Zt: any) => Zt.agentType === $e);
      if (!dt) {
        if (Je.some((Zt: any) => Zt.agentType === $e)) {
          let Zt = getDenyRuleForAgent(Rt, Cs, $e);
          throw Error(`agent({agentType}): '${$e}' is denied by permission rule '${Cs}(${$e})' from ${Zt?.source ?? "settings"}.`);
        }
        throw Error(`agent({agentType}): agent type '${$e}' not found. Available agents: ${Et.map((Zt: any) => Zt.agentType).join(", ")}`);
      }
      let Dt = [...(dt.disallowedTools ?? []), ...(pdo.disallowedTools ?? [])],
        $t = re.schema ? p0p : d0p,
        It = re.schema && !cio(dt.tools) ? [...(dt.tools ?? []), bf] : dt.tools;
      ae = isBuiltInAgent(dt) ? {
        ...dt,
        disallowedTools: Dt,
        tools: It,
        getSystemPrompt: (Zt: any) => dt.getSystemPrompt(Zt) + $t
      } : {
        ...dt,
        disallowedTools: Dt,
        tools: It,
        getSystemPrompt: () => dt.getSystemPrompt() + $t
      };
    }
    let he: any;
    if (re?.schema) {
      let $e = Ftt(re.schema);
      if ("error" in $e) throw TypeError(`agent({schema}) received an invalid JSON Schema: ${$e.error}`);
      he = $e.tool;
    }
    let se = ae ?? (he ? f0p : pdo),
      le = aF(re?.effort),
      pe = le !== void 0 ? {
        ...se,
        effort: le
      } : se,
      de = H.getAppState(),
      _e = Fr(H),
      fe = H.options.tools.filter(Pk),
      ie = {
        ..._e,
        mode: pe.permissionMode ?? "acceptEdits"
      },
      Ae = ZY(ie, Alt(de.mcp.tools.concat(fe)), {
        skipReplFilter: !0,
        skillTools: de.skillTools
      }),
      ge = he ? [...Ae.filter(($e: any) => !Lc($e, bf)), he] : Ae,
      Ce = gte(Xge(pe, H.options.mainLoopModel), H.options.mainLoopModel, re?.model, _e.mode),
      xe: any = null;
    if (re?.isolation === "worktree") {
      let $e = r ? `${r}-${K}` : `wf-${K}`;
      xe = await _($e);
    }
    let Re = xe?.worktreePath,
      Me = xe ? `${Y}

---
You are running in an isolated git worktree at ${xe.worktreePath} (a separate working copy of the repo). Changes you make here do NOT affect the main working directory (${Pt()}) or other agents. Work normally \u2014 the worktree will be cleaned up automatically if you made no changes, or preserved for review if you did.` : Y,
      Ke = 0,
      He = 0,
      Ge = 0,
      Ye = Date.now(),
      ot = Yqe(Y);
    async function vt($e: any, Je: any, Rt: any, Et: any): Promise<any> {
      let dt = mO();
      oe(dt);
      let Dt = {
          agentId: dt,
          parentAgentId: V7(ue) ? void 0 : ue?.agentId,
          depth: POWERSHELL_TOOL_NAME(ue) + 1,
          parentSessionId: u4(),
          agentType: "subagent",
          subagentName: pe.agentType,
          isBuiltIn: isBuiltInAgent(pe)
        },
        $t = `workflow_agent_${K}_${dt}`,
        It: any,
        Zt: any,
        _n = (Mn: any, Eo: any) => n({
          type: "progress",
          toolUseID: $t,
          data: {
            type: "workflow_agent",
            index: K,
            label: Je,
            phaseIndex: te,
            phaseTitle: ee,
            agentId: dt,
            agentType: ae?.agentType,
            isolation: xe ? "worktree" : void 0,
            model: Ce,
            state: Mn,
            startedAt: Ye,
            queuedAt: ce,
            attempt: Rt,
            lastAttemptReason: Et,
            lastToolName: It,
            lastToolSummary: Zt,
            promptPreview: ot,
            lastProgressAt: Date.now(),
            ...Eo
          }
        }),
        Nn = new AbortController(),
        Fn = H.abortController?.signal,
        Dn = () => Nn.abort("workflow-abort");
      if (Fn?.addEventListener("abort", Dn), Fn?.aborted) Nn.abort("workflow-abort");
      o?.(dt, Nn);
      let or: any,
        vr = 0,
        Yt = Math.min(ne * 0.1, 1000),
        ye = () => {
          if (clearTimeout(or), ne > 0) or = setTimeout((Mn: any) => Mn.abort("stalled"), ne, Nn);
        },
        ve = new Set(),
        Fe = () => {
          if (ve.size === 0 && or === void 0) ye();
        },
        We = () => {
          if (ve.size > 0) return;
          let Mn = Date.now();
          if (Mn - vr < Yt) return;
          vr = Mn, ye();
        },
        ft = {
          ...H,
          abortController: Nn
        },
        ke = 0;
      if (he) Dct(e.setAppState, dt, "SubagentStop", "", (Mn: any) => {
        if (ke >= 2) return !0;
        let Eo = q9n(Mn, bf);
        if (!Eo) ke++;
        return Eo;
      }, `You did not call ${bf}. You MUST call ${bf} to return your answer \u2014 the tool ` + "input IS your answer. Call it now.", {
        timeout: 5000
      });
      _n("start", Ke || He ? {
        tokens: Ke,
        toolCalls: He
      } : void 0), ye();
      let pt: any,
        ut: any,
        Ht = 0,
        Ft = 0,
        An = 0,
        sr: any,
        Pr = Date.now();
      try {
        await B8(Dt, async () => {
          for await (let Mn of k9({
            agentDefinition: pe,
            promptMessages: [Ln({
              content: $e
            })],
            toolUseContext: ft,
            canUseTool: t,
            isAsync: !1,
            querySource: Dke(pe.agentType, isBuiltInAgent(pe)),
            spawnedBySkill: H.options.spawnedBySkill ?? H.options.activeSkill,
            availableTools: ge,
            transcriptSubdir: r ? `workflows/${r}` : void 0,
            spawnedByWorkflowRunId: r,
            override: {
              agentId: dt,
              agentContext: Dt
            },
            model: re?.model,
            onQueryProgress: We,
            worktreePath: Re
          })) {
            if (Mn.type === "attachment" && Mn.attachment.type === "structured_output") {
              ut = Mn.attachment.data;
              continue;
            }
            if (Mn.type === "set_in_progress_tool_use_ids") {
              if (Mn.op.action === "remove") {
                for (let Eo of Mn.op.ids) ve.delete(Eo);
                Fe();
              }
              continue;
            }
            if (Mn.type === "user") {
              let Eo = Mn.message.content;
              if (Array.isArray(Eo)) {
                for (let wr of Eo) if (typeof wr === "object" && wr?.type === "tool_result") ve.delete(wr.tool_use_id);
                Fe();
              }
              continue;
            }
            if (Mn.type === "assistant") {
              if (pt = Mn, !Mn.isApiErrorMessage) Ht = uee(Mn.message.usage);
              let Eo = 0;
              for (let wr of Mn.message.content) {
                if (wr.type !== "tool_use") continue;
                if (Eo++, ve.add(wr.id), It = wr.name, Zt = $9n(wr.input) || void 0, wr.name === bf) An++, sr = wr.input;
              }
              if (Ft += Eo, Eo > 0) clearTimeout(or), or = void 0;else We();
              _n("progress", {
                tokens: Ke + Ht,
                toolCalls: He + Ft
              });
            }
          }
        });
      } catch (Mn: any) {
        let Eo = Nn.signal.aborted ? Nn.signal.reason : void 0;
        if (Eo === "stalled" || Eo === "user-retry") {
          if (Eo === "stalled" && ut !== void 0) {
            let wr = Date.now() - Pr;
            return _n("done", {
              tokens: Ke + Ht,
              toolCalls: He + Ft,
              durationMs: Ge + wr,
              resultPreview: Yqe(ut)
            }), {
              structured: ut,
              text: "",
              tokens: Ht,
              toolCalls: Ft,
              stalled: !1,
              skipped: !1,
              durationMs: wr,
              stopReason: void 0,
              outputTokens: void 0,
              structuredOutputAttempts: An,
              lastStructuredOutputInput: sr
            };
          }
          return _n("error", {
            error: Eo === "stalled" ? `stalled \u2014 no progress for ${ne}ms` : "retry requested by user",
            tokens: Ke + Ht,
            toolCalls: He + Ft,
            durationMs: Ge + (Date.now() - Pr)
          }), {
            structured: void 0,
            text: "",
            tokens: Ht,
            toolCalls: Ft,
            stalled: !0,
            stalledReason: Eo,
            skipped: !1,
            durationMs: Date.now() - Pr,
            stopReason: void 0,
            outputTokens: void 0,
            structuredOutputAttempts: An,
            lastStructuredOutputInput: sr
          };
        }
        if (Eo === "user-skip") return _n("error", {
          error: "skipped by user",
          skipped: !0,
          tokens: Ke + Ht,
          toolCalls: He + Ft,
          durationMs: Ge + (Date.now() - Pr)
        }), {
          structured: void 0,
          text: "",
          tokens: Ht,
          toolCalls: Ft,
          stalled: !1,
          skipped: !0,
          durationMs: Date.now() - Pr,
          stopReason: void 0,
          outputTokens: void 0,
          structuredOutputAttempts: An,
          lastStructuredOutputInput: sr
        };
        throw _n("error", {
          error: Mn instanceof Error ? Mn.message : String(Mn),
          tokens: Ke + Ht,
          toolCalls: He + Ft,
          durationMs: Ge + (Date.now() - Pr)
        }), Mn;
      } finally {
        if (clearTimeout(or), Fn?.removeEventListener("abort", Dn), o?.(dt, null), he) _qe(e.setAppState, dt);
      }
      let nr = pt,
        Vr = nr ? wc(nr.message.content, `
`) : "",
        io = nr?.message.usage,
        vs = io && typeof io.output_tokens === "number" ? io.output_tokens : void 0,
        ho = Date.now() - Pr,
        Sn = Ke + (Ht || (nr ? uee(nr.message.usage) : 0));
      if (nr?.isApiErrorMessage) {
        let Mn = Vr || "API error";
        return _n("error", {
          error: Mn,
          tokens: Sn,
          toolCalls: He + Ft,
          durationMs: Ge + ho
        }), {
          structured: ut,
          text: Vr,
          apiError: Mn,
          tokens: Ht,
          toolCalls: Ft,
          stalled: !1,
          skipped: !1,
          durationMs: ho,
          stopReason: nr.message.stop_reason,
          outputTokens: vs,
          structuredOutputAttempts: An,
          lastStructuredOutputInput: sr
        };
      }
      return _n("done", {
        tokens: Sn,
        toolCalls: He + Ft,
        durationMs: Ge + ho,
        resultPreview: Yqe(he ? ut : Vr)
      }), {
        structured: ut,
        text: Vr,
        tokens: Ht,
        toolCalls: Ft,
        stalled: !1,
        skipped: !1,
        durationMs: ho,
        stopReason: nr?.message.stop_reason,
        outputTokens: vs,
        structuredOutputAttempts: An,
        lastStructuredOutputInput: sr
      };
    }
    try {
      let $e = await kpe(Re, () => vt(Me, J, 1)),
        Je = (dt: any) => !dt.stalled && !dt.skipped && dt.stopReason == null && dt.structured === void 0 && (dt.outputTokens ?? 1 / 0) < 50 && dt.durationMs > ne * 0.5,
        Rt = Je($e);
      if (Rt) {
        if (n({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: `[${J}] throttled response (no stop_reason, ${$e.outputTokens ?? "?"} output tokens in ${Math.round($e.durationMs / 1000)}s) \u2014 ` + "sleeping 45s before retry"
          }
        }), await sleep(45000, H.abortController?.signal, {
          throwOnAbort: !0
        }), Ke += $e.tokens, He += $e.toolCalls, Ge += $e.durationMs, $e = await kpe(Re, () => vt(Me, `${J} (throttle-retry)`, 2, "throttled")), Je($e)) n({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: `[${J}] throttle-retry also degraded \u2014 ` + "giving up on throttle backoff"
          }
        });
      }
      let Et: any[] = [];
      for (let dt = 1; $e.stalled && !Rt && dt <= w6a; dt++) {
        if (H.abortController?.signal.aborted) throw Error("Workflow aborted");
        let Dt = $e.stalledReason ?? "stalled";
        Et.push(Dt);
        let $t = Dt === "user-retry" ? "retry requested by user" : "stalled (no progress)",
          It = "";
        if (Dt === "stalled" && $e.structuredOutputAttempts > 0 && $e.structured === void 0) {
          let Zt = Le($e.lastStructuredOutputInput),
            _n = Zt.length > 300 ? Zt.slice(0, 300) + "\u2026" : Zt;
          It = ` \u2014 ${$e.structuredOutputAttempts} StructuredOutput validation ${Cn($e.structuredOutputAttempts, "failure")} (last input: ${_n})`;
        }
        n({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: `[stall] agent "${J}" ${$t} after ${Math.round($e.durationMs / 1000)}s${It} \u2014 retrying (${dt}/${w6a})`
          }
        }), Ke += $e.tokens, He += $e.toolCalls, Ge += $e.durationMs, $e = await kpe(Re, () => vt(Me, `${J} (retry ${dt})`, dt + 1, Dt));
      }
      if ($e.skipped) return null;
      if ($e.stalled) {
        Et.push($e.stalledReason ?? "stalled");
        let dt = Et.length,
          Dt = Et.every((Zt: any) => Zt === "user-retry"),
          $t = Et.every((Zt: any) => Zt === "stalled"),
          It = $e.stalledReason !== "user-retry" && $e.structuredOutputAttempts > 0 && $e.structured === void 0 ? ` \u2014 ${$e.structuredOutputAttempts} StructuredOutput validation ${Cn($e.structuredOutputAttempts, "failure")} on the last attempt` : "";
        throw Error(Dt ? `agent abandoned: user requested retry on all ${dt} attempts` : $t ? `agent stalled on all ${dt} attempts (no progress for ${ne}ms each)${It}` : `agent abandoned after ${dt} attempts (${Et.join(" \u2192 ")})${It}`);
      }
      if ($e.apiError) {
        let dt = `[${J}] failed: ${$e.apiError}`;
        return g.push(dt), n({
          type: "progress",
          toolUseID: "workflow_log",
          data: {
            type: "workflow_log",
            message: dt
          }
        }), null;
      }
      if (he) {
        if ($e.structured === void 0) throw Error("agent({schema}): subagent completed without calling StructuredOutput (after 2 in-conversation nudges)");
        return p($e.structured);
      }
      return $e.text;
    } finally {
      if (xe) {
        let {
          worktreePath: $e,
          worktreeBranch: Je,
          headCommit: Rt,
          gitRoot: Et,
          hookBased: dt
        } = xe;
        try {
          if (!dt && Rt && !(await hasWorktreeChanges($e, Rt))) await removeAgentWorktree($e, Je, Et, !1, "workflow_tool");else if (Et) await unlockAgentWorktree($e, Et);
        } catch {}
      }
    }
  }
  function U(K: any): any {
    if (K === "bubble") return;
    if (K === "bypassPermissions") return "auto";
    return K;
  }
  async function W(K: any, Y: any, J: any, ee: any, te: any, ne: any, re: any): Promise<any> {
    let oe = H.abortController?.signal;
    if (oe?.aborted) throw Error("Workflow aborted");
    v();
    let ce = mO(),
      ue = Date.now(),
      ae = Yqe(Y),
      he: any,
      se = (_e: any, fe: any) => n({
        type: "progress",
        toolUseID: `workflow_agent_${K}_${ce}`,
        data: {
          type: "workflow_agent",
          index: K,
          label: J,
          phaseIndex: te,
          phaseTitle: ee,
          agentId: ce,
          isolation: "remote",
          remoteSessionId: he,
          state: _e,
          startedAt: ue,
          queuedAt: re,
          promptPreview: ae,
          lastProgressAt: Date.now(),
          ...fe
        }
      }),
      le = new AbortController(),
      pe = () => le.abort("workflow-abort");
    if (oe?.addEventListener("abort", pe), oe?.aborted) le.abort("workflow-abort");
    o?.(ce, le), se("start");
    let de: any;
    try {
      let _e = Fr(H),
        fe = ne.model ? gte(void 0, H.options.mainLoopModel, ne.model, _e.mode) : void 0,
        ie = await teleportToRemote({
          initialMessage: Y,
          source: "workflow_remote_agent",
          tags: ["workflow-remote-agent"],
          description: J,
          branchName: await T(),
          permissionMode: U(_e.mode),
          model: fe,
          signal: le.signal,
          onBundleFail: (Ke: any) => {
            de = Ke;
          },
          onCreateFail: (Ke: any) => {
            de = Ke;
          }
        });
      if (!ie) throw Error(de ?? "Failed to create cloud session");
      he = ie.id, se("progress");
      let {
        text: Ae,
        structuredOutput: ge,
        resultSubtype: Ce,
        usage: xe,
        modelUsage: Re,
        toolCalls: Me
      } = await awaitRemoteSessionResult(he, le.signal);
      for (let [Ke, He] of Object.entries(Re ?? {})) Cce((He as any).costUSD, {
        ...PE,
        input_tokens: (He as any).inputTokens,
        output_tokens: (He as any).outputTokens,
        cache_read_input_tokens: (He as any).cacheReadInputTokens,
        cache_creation_input_tokens: (He as any).cacheCreationInputTokens,
        server_tool_use: {
          web_search_requests: (He as any).webSearchRequests,
          web_fetch_requests: 0
        }
      }, Ke);
      if (ne.schema && ge === void 0) {
        let Ke = Ce === "error_max_structured_output_retries" ? "the cloud agent called StructuredOutput but no attempt produced a surviving valid output (failed schema validation, or retracted by a model fallback)" : Ce && Ce !== "success" ? `the cloud agent turn ended with result subtype '${Ce}'` : "the cloud agent never called the StructuredOutput tool";
        throw Error(`agent({isolation:'remote', schema}) completed without structured output: ${Ke}.`);
      }
      if (se("done", {
        tokens: xe ? uee(xe) : 0,
        toolCalls: Me,
        durationMs: Date.now() - ue,
        resultPreview: Yqe(ne.schema ? ge : Ae)
      }), ne.schema) return p(ge);
      return Ae;
    } catch (_e: any) {
      if (he) S6(he).catch(() => {});
      if (le.signal.reason === "user-skip") return se("error", {
        error: "skipped by user",
        skipped: !0,
        durationMs: Date.now() - ue
      }), null;
      throw se("error", {
        error: _e instanceof Error ? _e.message : String(_e),
        durationMs: Date.now() - ue
      }), _e;
    } finally {
      oe?.removeEventListener("abort", pe), o?.(ce, null);
    }
  }
  let G = YIe(async (K: any) => {
      if (H.abortController?.signal.aborted) return new Promise(() => {});
      if (await sleep(0), !Array.isArray(K)) throw TypeError("parallel() expects an array of functions");
      let Y = D9n(K);
      if (Y.length === 0) return p([]);
      S(), v();
      for (let ne of Y) if (typeof ne !== "function") throw TypeError("parallel() expects an array of functions, not promises. Wrap each call: () => agent(...)");
      let J = await Promise.allSettled(Y.map((ne: any) => u(d(ne)))),
        ee = 0,
        te = J.map((ne: any, re: any) => {
          if (ne.status === "fulfilled") return ne.value.v;
          let {
            name: oe,
            msg: ce
          } = F9t(ne.reason);
          if (oe === "WorkflowBudgetExceededError") return ee++, null;
          let ue = `parallel[${re}] failed: ${ce}`;
          return g.push(ue), n({
            type: "progress",
            toolUseID: "workflow_log",
            data: {
              type: "workflow_log",
              message: ue
            }
          }), null;
        });
      if (ee > 0) g.push(`parallel: ${ee} ${Cn(ee, "slot")} dropped \u2014 token budget exceeded`);
      return p(te);
    }),
    V = YIe(async (K: any, ...Y: any[]) => {
      if (H.abortController?.signal.aborted) return new Promise(() => {});
      if (await sleep(0), !Array.isArray(K)) throw TypeError("pipeline() expects an array as the first argument");
      let J = D9n(K),
        ee = D9n(Y);
      if (J.length === 0) return p([]);
      S(), v();
      for (let oe of ee) if (typeof oe !== "function") throw TypeError("pipeline() stages must be functions: pipeline(items, item => ..., result => ...)");
      let te = await Promise.allSettled(J.map(async (oe: any, ce: any) => {
          let ue = await u(oe);
          for (let ae of ee) {
            if (ue.v === null) break;
            ue = await u(d(ae, ue.v, oe, ce));
          }
          return ue;
        })),
        ne = 0,
        re = te.map((oe: any, ce: any) => {
          if (oe.status === "fulfilled") return oe.value.v;
          let {
            name: ue,
            msg: ae
          } = F9t(oe.reason);
          if (ue === "WorkflowBudgetExceededError") return ne++, null;
          let he = `pipeline[${ce}] failed: ${ae}`;
          return g.push(he), n({
            type: "progress",
            toolUseID: "workflow_log",
            data: {
              type: "workflow_log",
              message: he
            }
          }), null;
        });
      if (ne > 0) g.push(`pipeline: ${ne} ${Cn(ne, "slot")} dropped \u2014 token budget exceeded`);
      return p(re);
    }),
    Q = YIe((K: any) => {
      n({
        type: "progress",
        toolUseID: "workflow_log",
        data: {
          type: "workflow_log",
          message: String(K)
        }
      });
    });
  return {
    agent: O,
    parallel: G,
    pipeline: V,
    log: Q,
    phase: P,
    resolvePhase: I,
    recordFailure: (K: any) => {
      g.push(K);
    },
    getAgentCount: () => c,
    getFailures: () => g,
    bindVMAwait: (K: any) => {
      u = K.settle, d = K.call, p = K.clone;
    }
  };
}
var R6a: any,
  x6a: any,
  a0p: any,
  l0p = 50,
  k6a = 1000,
  c0p: any,
  H6a: any,
  I6a: any,
  v6a = 400,
  u0p = `You are a subagent spawned by a workflow orchestration script. Use the tools available to complete the task.

CRITICAL: Your final text response is returned **verbatim** as a string to the calling script \u2014 it is your return value, not a message to a human.
- Output the literal result (data, JSON, text). Do NOT output confirmations like "Done." or "Sent."
- If asked for JSON, return ONLY the raw JSON \u2014 no code fences, no prose, no markdown.
- Do NOT use SendUserMessage to deliver your answer. Put your answer in your final text response.
- Be concise. The script will parse your output.`,
  d0p = `

---

NOTE: You are running inside a workflow script. Your final text response is returned verbatim as a string to the calling script \u2014 it is your return value, not a message to a human. Output the literal result; do not output confirmations like "Done." Be concise \u2014 the script will parse your output.`,
  p0p: any,
  m0p: any,
  pdo: any,
  f0p: any,
  A0p = 180000,
  w6a = 5;
var P6a = b(() => {
  H9();
  zn();
  Ct();
  Lut();
  Ri();
  Y0();
  S_();
  Ql();
  GUt();
  Go();
  qe();
  Om();
  sn();
  Ba();
  x9();
  lo();
  sce();
  ay();
  lst();
  Xt();
  dr();
  Am();
  RP();
  oN();
  MM();
  S_e();
  hI();
  FY();
  Qge();
  Ph();
  scrubPathsConfig();
  Yge();
  j$();
  aq();
  Out();
  udo();
  ddo();
  R6a = require("os"), x6a = require("util");
  a0p = i0p(R6a.cpus().length), c0p = `Workflow agent() call cap reached (${k6a}). This usually means a loop using budget.remaining() never terminates because ` + "no token budget was set \u2014 remaining() returns Infinity when budget.total is null. " + "Add a hard iteration cap to the loop, or pass a token budget.";
  H6a = class H6a extends Error {
    constructor() {
      super(c0p);
      this.name = "WorkflowAgentCapError";
    }
  };
  I6a = class I6a extends Error {
    constructor(e: any, t: any) {
      super(`Workflow token budget exceeded (${e.toLocaleString()} / ${t.toLocaleString()} output tokens). Stopping further agent() calls. In-flight agents will complete; their results are preserved.`);
      this.name = "WorkflowBudgetExceededError";
    }
  };
  p0p = `

---

NOTE: You are running inside a workflow script. You MUST return your final answer by calling the ${bf} tool exactly once \u2014 the tool's input schema defines the required shape. Do your work, then call ${bf}; do NOT put your answer in a text response (the script reads ONLY the tool call). If validation fails, read the error and call ${bf} again with a corrected shape.`, m0p = `You are a subagent spawned by a workflow orchestration script. Use the tools available to complete the task.

CRITICAL: You MUST call the ${bf} tool exactly once to return your final answer. The tool's input schema defines the required shape.
- Do your work (Read files, run commands, etc.), then call ${bf} with your answer.
- Do NOT put your answer in a text response. The script reads ONLY the ${bf} tool call.
- If the schema validation fails, read the error and call ${bf} again with a corrected shape.
- After calling ${bf} successfully, end your turn. No acknowledgment needed.`, pdo = {
    agentType: "workflow-subagent",
    whenToUse: "Internal subagent for workflow script orchestration.",
    tools: ["*"],
    disallowedTools: [BRIEF_TOOL_NAME, Cs, WORKFLOW_TOOL_NAME],
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: () => u0p
  }, f0p = {
    ...pdo,
    getSystemPrompt: () => m0p
  };
});
export {i0p,Yqe,D6a,R6a,x6a,a0p,l0p,k6a,c0p,H6a,I6a,v6a,u0p,d0p,p0p,m0p,pdo,f0p,A0p,w6a,P6a};
