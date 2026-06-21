// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {hasPermissionsToUseToolWithSink,hasPermissionsToUseTool,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {Yte,O9t,Ln,tc,lo} from "../tools/5190_userPromptCount.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {jut,u3n} from "../../vendor/m4201.ts";
import {Xse,yQe} from "../../vendor/m2218.ts";
import {h_,bt} from "../../vendor/m195.ts";
import {De,Rn} from "../session/0615_length.ts";
import {gq,iN,lx} from "../../vendor/m2777.ts";
import {QFa,H2n,I2n,qct} from "../core/4042_id.ts";
import {IFn,Nlt,JDa,Blt} from "../../vendor/m3888.ts";
import {readMailbox,isPermissionResponse,markSingleMessageAsRead,writeToMailbox,createIdleNotification,isShutdownRequest,isStructuredProtocolMessage,isPlanApprovalResponse,planApprovalResumeText,isModeSetRequest,markMessagesAsRead,formatTeammateMessage,getLastPeerDmSummary,Tx} from "./3886_writeToMailbox.ts";
import {np,aU} from "../config/3875_aU.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {p9,Jla,ege,Nk} from "../agent/3316_id.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {Wn,fs} from "../api/0459_getOauthConfig.ts";
import {JFa,llo,clo} from "../../vendor/m4040.ts";
import {setMemberMode,BL} from "../../vendor/m3879.ts";
import {Zae,ele} from "../../vendor/m3293.ts";
import {POWERSHELL_TOOL_NAME,B8,S_} from "../agent/1454_agentType.ts";
import {J0,oG} from "../agent/5173_len.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum,Qe} from "../../vendor/m5.ts";
import {freshFeatureValues,Kw,Tz,mP} from "../tools/2698_allErrors.ts";
import {H0} from "../session/2690_resolveLoopFileFire.ts";
import {jlt,k9,Yge} from "./4040_clients.ts";
import {vBn,PHe,RHa} from "../../vendor/m3824.ts";
import {_Mt,eI} from "../telemetry/3157_error.ts";
import {wre} from "../session/0131_sent.ts";
import {Jl,ch} from "../../vendor/m2727.ts";
import {SC,oN} from "../core/2729_input_tokens.ts";
import {bytesPerTokenForModel,Mo} from "./1453_swapShrinksContextWindow.ts";
import {lOt} from "../config/2727_repl.ts";
import {Rm,zE} from "../../vendor/m125.ts";
import {QAe,xk} from "../../vendor/m2715.ts";
import {nxe} from "../../vendor/m2753.ts";
import {Vut,c_e,Gut,S9,fee} from "./4409_prompt.ts";
import {Wc} from "../api/3868_level.ts";
import {eUn,nUn,tUn,M2t,RE} from "../agent/4342_toolUseCount.ts";
import {runWithTeammateContext,Q2} from "../../vendor/m1457.ts";
import {mIe} from "../tui/4022_classifierApprovals.ts";
import {cce,S2t} from "../../vendor/m3889.ts";
import {Vqe,MY} from "../agent/4311_register.ts";
import {iso,YHe} from "../../vendor/m3881.ts";
import {iy,vC} from "../../vendor/m5145.ts";
import {Bh,bC} from "../session/2784_uuid.ts";
import {W$e,Zrt} from "../config/3183_agentId.ts";
import {isTmuxControlMode,Ie,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {nN} from "../../vendor/m4410.ts";
import {HL} from "../tools/4363_stripAllEnvVars.ts";
var Mja = {};
isFullscreenWithTTY(Mja, {
  TEAMMATE_SYSTEM_PROMPT_ADDENDUM: () => TEAMMATE_SYSTEM_PROMPT_ADDENDUM
});
var TEAMMATE_SYSTEM_PROMPT_ADDENDUM = `
# Agent Teammate Communication

IMPORTANT: You are running as an agent in a team. To communicate with anyone on your team, use the SendMessage tool with \`to: "<name>"\` to send messages to specific teammates.

Just writing a response in text is not visible to others on your team - you MUST use the SendMessage tool.

The user interacts primarily with the team lead. Your work is coordinated through the task system and teammate messaging.
`;
function pDp(e: any, t: any, n: any, r: any) {
  return async (o: any, s: any, i: any, a: any, l: any, c: any) => {
    let u = c ?? (await hasPermissionsToUseToolWithSink(o, s, i, a, l, void 0, r));
    if (u.behavior !== "ask") return u;
    let d = u.updatedInput ?? s;
    if (t.signal.aborted) return {
      behavior: "ask",
      message: Yte
    };
    let p = Fr(i),
      m = await o.description(d, {
        isNonInteractiveSession: i.options.isNonInteractiveSession,
        toolPermissionContext: p,
        tools: i.options.tools
      });
    if (t.signal.aborted) return {
      behavior: "ask",
      message: Yte
    };
    let f = i.requestDialog;
    if (f) {
      let A = e.color ? {
          name: e.agentName,
          color: e.color
        } : void 0,
        {
          dialog: h,
          descriptor: g
        } = await jut({
          tool: o,
          input: d,
          description: m,
          toolUseID: l,
          permissionResult: u,
          assistantMessage: a,
          theme: "dark",
          toolPermissionContext: p,
          workerBadge: A
        });
      if (t.signal.aborted) return {
        behavior: "ask",
        message: Yte
      };
      let _ = Date.now(),
        y = new AbortController(),
        T = () => y.abort();
      t.signal.addEventListener("abort", T, {
        once: !0
      });
      let S: any,
        v = Xse.subscribe(() => {
          if (S !== void 0) return;
          hasPermissionsToUseTool(o, s, i, a, l).then((R: any) => {
            if (S !== void 0 || R.behavior !== "allow") return;
            S = {
              ...R,
              updatedInput: R.updatedInput ?? s,
              userModified: !1
            }, y.abort();
          }).catch((R: any) => {
            if (!h_(R)) De(R);
          });
        });
      try {
        let R = await f(h, g, {
          signal: y.signal
        });
        switch (R.behavior) {
          case "allow":
            {
              let {
                updatedInput: k,
                permissionUpdates: x,
                feedback: H,
                contentBlocks: I
              } = R;
              if (gq(x ?? []), x && x.length > 0) {
                let L = QFa();
                if (L) {
                  let D = iN(Fr(i), x);
                  L(D, {
                    preserveMode: !0
                  });
                }
              }
              let P = H?.trim();
              return {
                behavior: "allow",
                updatedInput: k,
                userModified: !1,
                acceptFeedback: P || void 0,
                ...(I && I.length > 0 && {
                  contentBlocks: I
                })
              };
            }
          case "deny":
            {
              let {
                feedback: k,
                contentBlocks: x
              } = R;
              return {
                behavior: "ask",
                message: k ? `${O9t}${k}` : Yte,
                contentBlocks: x
              };
            }
          case "cancelled":
            {
              if (S !== void 0) return S;
              return {
                behavior: "ask",
                message: Yte
              };
            }
        }
      } finally {
        v(), t.signal.removeEventListener("abort", T), n(Date.now() - _);
      }
    }
    return new Promise((A: any) => {
      let h = H2n({
        toolName: o.name,
        toolUseId: l,
        input: d,
        description: m,
        permissionSuggestions: u.suggestions,
        workerId: e.agentId,
        workerName: e.agentName,
        workerColor: e.color,
        teamName: e.teamName
      });
      IFn({
        requestId: h.id,
        toolUseId: l,
        onAllow(T: any, S: any, v: any, R: any) {
          y(), gq(S);
          let k = T && Object.keys(T).length > 0 ? T : d;
          A({
            behavior: "allow",
            updatedInput: k,
            userModified: !1,
            ...(R && R.length > 0 && {
              contentBlocks: R
            })
          });
        },
        onReject(T: any, S: any) {
          y();
          let v = T ? `${O9t}${T}` : Yte;
          A({
            behavior: "ask",
            message: v,
            contentBlocks: S
          });
        }
      }), I2n(h);
      let g = setInterval(async (T: any, S: any, v: any, R: any, k: any) => {
          if (T.signal.aborted) {
            S(), v({
              behavior: "ask",
              message: Yte
            });
            return;
          }
          let x = await readMailbox(R.agentName, R.teamName);
          for (let H of x) if (H && !H.read) {
            let I = isPermissionResponse(H.text);
            if (I && I.request_id === k.id) {
              if (await markSingleMessageAsRead(R.agentName, R.teamName, H), H.from !== np) {
                logForDebugging(`[InProcessRunner] Ignoring permission response from non-team-lead: ${H.from}`, {
                  level: "warn"
                });
                continue;
              }
              if (I.subtype === "success") Nlt({
                requestId: I.request_id,
                decision: "approved",
                updatedInput: I.response?.updated_input,
                permissionUpdates: I.response?.permission_updates
              });else Nlt({
                requestId: I.request_id,
                decision: "rejected",
                feedback: I.error
              });
              return;
            }
          }
        }, dDp, t, y, A, e, h),
        _ = () => {
          y(), A({
            behavior: "ask",
            message: Yte
          });
        };
      t.signal.addEventListener("abort", _, {
        once: !0
      });
      function y() {
        clearInterval(g), JDa(h.id), t.signal.removeEventListener("abort", _);
      }
    });
  };
}
function Bce(e: any, t: any, n: any) {
  n.update(e, (r: any) => r.type === "in_process_teammate" ? t(r) : r);
}
async function mDp(e: any, t: any, n: any, r: any) {
  await writeToMailbox(np, {
    from: e,
    text: t,
    timestamp: new Date().toISOString(),
    color: n
  }, r);
}
async function Nja(e: any, t: any, n: any, r: any) {
  let o = createIdleNotification(e, r);
  await mDp(e, Le(o), t, n);
}
function fDp(e: any) {
  let t = new Set(e.filter((n: any) => n.status !== "completed").map((n: any) => n.id));
  return e.find((n: any) => {
    if (n.status !== "pending") return !1;
    if (n.owner) return !1;
    return n.blockedBy.every((r: any) => !t.has(r));
  });
}
function ADp(e: any) {
  let t = `Complete all open tasks. Start with task #${e.id}: \n\n ${e.subject}`;
  if (e.description) t += `\n\n${e.description}`;
  return t;
}
async function Bja(e: any, t: any) {
  try {
    let n = await p9(e),
      r = fDp(n);
    if (!r) return;
    let o = await Jla(e, r.id, t);
    if (!o.success) {
      logForDebugging(`[inProcessRunner] Failed to claim task #${r.id}: ${o.reason}`);
      return;
    }
    return await ege(e, r.id, {
      status: "in_progress"
    }), logForDebugging(`[inProcessRunner] Claimed task #${r.id}: ${r.subject}`), ADp(r);
  } catch (n) {
    logForDebugging(`[inProcessRunner] Error checking task list: ${n}`);
    return;
  }
}
async function hDp(e: any, t: any, n: any, r: any, o: any, s: any, i: any) {
  logForDebugging(`[inProcessRunner] ${e.agentName} starting poll loop (abort=${t.signal.aborted})`);
  let l = 0;
  while (!t.signal.aborted) {
    let u = r().tasks[n];
    if (u && u.type === "in_process_teammate" && u.pendingUserMessages.length > 0) {
      let p = u.pendingUserMessages[0];
      return Bce(n, (m: any) => ({
        ...m,
        pendingUserMessages: m.pendingUserMessages.slice(1)
      }), o), logForDebugging(`[inProcessRunner] ${e.agentName} found pending user message (poll #${l})`), {
        type: "new_message",
        message: p.text,
        origin: p.origin,
        from: "user"
      };
    }
    if (u && u.type === "in_process_teammate" && u.shutdownRequested && i) return {
      type: "aborted"
    };
    if (l > 0) await sleep(500);
    if (l++, t.signal.aborted) return logForDebugging(`[inProcessRunner] ${e.agentName} aborted while waiting (poll #${l})`), {
      type: "aborted"
    };
    if (i) continue;
    logForDebugging(`[inProcessRunner] ${e.agentName} poll #${l}: checking mailbox`);
    try {
      let p = await readMailbox(e.agentName, e.teamName),
        m = -1,
        f = null;
      for (let y = 0; y < p.length; y++) {
        let T = p[y];
        if (T && !T.read) {
          let S = isShutdownRequest(T.text);
          if (S) {
            m = y, f = S;
            break;
          }
        }
      }
      if (m !== -1) {
        let y = p[m],
          T = Wn(p.slice(0, m), (S: any) => !S.read);
        return logForDebugging(`[inProcessRunner] ${e.agentName} received shutdown request from ${f?.from} (prioritized over ${T} unread messages)`), await markSingleMessageAsRead(e.agentName, e.teamName, y), {
          type: "shutdown_request",
          request: f,
          originalMessage: y.text
        };
      }
      let A = [],
        h = [];
      for (let y of p) {
        if (!y || y.read) continue;
        if (isStructuredProtocolMessage(y.text)) A.push(y);else h.push(y);
      }
      let g = null;
      if (A.length > 0) {
        for (let y of A) {
          let T = isPlanApprovalResponse(y.text);
          if (T && y.from === np) {
            if (JFa(n, T, o)) logForDebugging(`[inProcessRunner] ${e.agentName} applied lead plan_approval_response: approved=${T.approved}`), g = planApprovalResumeText(T);else logForDebugging(`[inProcessRunner] ${e.agentName} ignoring stale plan_approval_response (not awaiting approval)`);
            continue;
          }
          let S = isModeSetRequest(y.text);
          if (S && y.from === np) {
            let v = llo(S.mode);
            logForDebugging(`[inProcessRunner] ${e.agentName} applying lead mode_set_request: ${v}`), Bce(n, (R: any) => R.permissionMode === v ? R : {
              ...R,
              permissionMode: v
            }, o), await setMemberMode(e.teamName, e.agentName, v);
          } else logForDebugging(`[inProcessRunner] ${e.agentName} dropping protocol frame from ${y.from}: ${y.text.substring(0, 80)}`, {
            level: "warn"
          });
        }
        await markMessagesAsRead(e.agentName, e.teamName, A);
      }
      if (g) return {
        type: "new_message",
        message: g,
        from: np
      };
      let _ = h.find((y: any) => y.from === np) ?? h[0];
      if (_) return logForDebugging(`[inProcessRunner] ${e.agentName} received new message from ${_.from}`), await markSingleMessageAsRead(e.agentName, e.teamName, _), {
        type: "new_message",
        message: _.text,
        from: _.from,
        color: _.color,
        summary: _.summary
      };
    } catch (p) {
      logForDebugging(`[inProcessRunner] ${e.agentName} poll error: ${p}`);
    }
    let d = await Bja(s, e.agentName);
    if (d) return {
      type: "new_message",
      message: d,
      from: "task-list"
    };
  }
  return logForDebugging(`[inProcessRunner] ${e.agentName} exiting poll loop (abort=${t.signal.aborted}, polls=${l})`), {
    type: "aborted"
  };
}
async function gDp(e: any) {
  let {
      identity: t,
      taskId: n,
      prompt: r,
      description: o,
      agentDefinition: s,
      teammateContext: i,
      toolUseContext: a,
      abortController: l,
      model: c,
      systemPrompt: u,
      systemPromptMode: d,
      allowedTools: p,
      allowPermissionPrompts: m,
      invokingRequestId: f,
      standalone: A = !1,
      resumeMessages: h,
      resumeReplacementState: g,
      initialFrom: _
    } = e,
    {
      setAppState: y,
      taskRegistry: T
    } = a,
    S = Zae(n);
  logForDebugging(`[inProcessRunner] Starting agent loop for ${t.agentId}`);
  let v = {
      agentId: t.agentId,
      parentAgentId: a.agentId,
      depth: POWERSHELL_TOOL_NAME(a.agentContext),
      parentSessionId: t.parentSessionId,
      agentName: t.agentName,
      teamName: t.teamName,
      agentColor: t.color,
      planModeRequired: t.planModeRequired,
      isTeamLead: !1,
      agentType: "teammate",
      invokingRequestId: f,
      invocationKind: "spawn",
      invocationEmitted: !1
    },
    R: any;
  if (d === "replace" && u) R = u;else {
    let U = [...(await J0(a.options.tools, a.options.mainLoopModel)), TEAMMATE_SYSTEM_PROMPT_ADDENDUM];
    if (s) {
      let W = s.getSystemPrompt();
      if (W) U.push(`\n# Custom Agent Instructions\n${W}`);
      if (s.memory) logEvent("tengu_agent_memory_loaded", {
        ...!1,
        scope: fromEnum(s.memory),
        source: Qe("in-process-teammate")
      });
    }
    if (d === "append" && u) U.push(u);
    R = U.join(`\n`);
  }
  let k = {
      agentType: t.agentName,
      whenToUse: `In-process teammate: ${t.agentName}`,
      getSystemPrompt: () => R,
      tools: s?.tools ? fs([...s.tools, freshFeatureValues, Kw, Tz, H0, mP]) : ["*"],
      source: "projectSettings",
      permissionMode: "default",
      ...(s?.model && {
        model: s.model
      })
    },
    x = h ? [...h] : [],
    H = h ? jlt(h).length : 0,
    I = {
      taskKind: "in_process_teammate",
      teamName: t.teamName,
      color: t.color,
      planModeRequired: t.planModeRequired,
      ...(s && {
        customAgentType: s.agentType
      }),
      ...(c && {
        model: c
      })
    },
    P = formatTeammateMessage({
      from: _ ?? np,
      text: r,
      summary: o
    }),
    L = P,
    D: any = void 0,
    N = !1,
    O = !1;
  if (!A) await Bja(t.parentSessionId, t.agentName);
  try {
    T.updateTranscript(n, (V: any) => {
      let Q = V.messages;
      if (h) for (let K of h.slice(-vBn)) Q = PHe(Q, K);
      return {
        ...V,
        messages: PHe(Q, Ln({
          content: P
        }))
      };
    });
    let $: any = a.contentReplacementState ? g ?? _Mt() : void 0,
      U = wre();
    while (!l.signal.aborted && !N) {
      logForDebugging(`[inProcessRunner] ${t.agentId} processing prompt: ${L.substring(0, 50)}...`);
      let V = Jl();
      Bce(n, (ie: any) => ({
        ...ie,
        currentWorkAbortController: V
      }), T);
      let Q = Ln({
          content: L,
          origin: D
        }),
        K = [Q],
        Y = x,
        J = SC(x, bytesPerTokenForModel(a.options.mainLoopModel));
      if (J > lOt(a.options.mainLoopModel, a.options.autoCompactWindow)) {
        logForDebugging(`[inProcessRunner] ${t.agentId} compacting history (${J} tokens)`);
        let ie = {
          ...a,
          abortController: l,
          agentId: Rm(t.agentId),
          readFileState: QAe(a.readFileState),
          memorySelector: nxe(),
          loadedNestedMemoryPaths: {},
          onCompactEvent: void 0
        };
        try {
          let Ae = await Vut(x, ie, {
            systemPrompt: Wc([]),
            userContext: {},
            systemContext: {},
            toolUseContext: ie,
            forkContextMessages: x
          }, !0, void 0, !0);
          if (Y = c_e(Ae), $) $ = _Mt();
          x.length = 0, x.push(...Y), H = 0, T.updateTranscript(n, (ge: any) => ({
            ...ge,
            messages: [...Y, Q]
          }));
        } catch (Ae: any) {
          if (Ae instanceof Error && Ae.message.startsWith(Gut)) logForDebugging(`[inProcessRunner] ${t.agentId} compaction blocked by PreCompact hook; continuing uncompacted`), O = !0;else if (l.signal.aborted || Ae instanceof Error && Ae.message === S9) {
            logForDebugging(`[inProcessRunner] ${t.agentId} aborted during compaction`), N = !0;
            break;
          } else throw Ae;
        }
      }
      let ee = Y.length > 0 ? [...Y] : void 0,
        te = H;
      x.push(Q);
      let ne = eUn(),
        re = nUn(a.options.tools),
        oe: any[] = [],
        ue = a.getAppState().tasks[n],
        ae = ue && ue.type === "in_process_teammate" ? ue.permissionMode : "default",
        he = {
          ...k,
          permissionMode: ae
        },
        se = !1,
        le: any = null;
      if (await runWithTeammateContext(i, async () => B8(v, async () => {
        Bce(n, (ie: any) => ({
          ...ie,
          status: "running",
          isIdle: !1,
          evictAfter: void 0
        }), T), T.updateTranscript(n, (ie: any) => ({
          ...ie,
          turnStartTime: Date.now()
        })), S.setMode("responding");
        for await (let ie of k9({
          agentDefinition: he,
          promptMessages: K,
          toolUseContext: a,
          canUseTool: pDp(t, V, (Ae: any) => {
            Bce(n, (ge: any) => ({
              ...ge,
              totalPausedMs: (ge.totalPausedMs ?? 0) + Ae
            }), T);
          }, mIe(y)),
          isAsync: !0,
          canShowPermissionPrompts: m ?? !0,
          forkContextMessages: ee,
          querySource: "agent:custom",
          override: {
            abortController: V,
            agentContext: v,
            onRetryStatus: S.setRetryStatus,
            ...(t.resumableAgentId && {
              agentId: t.resumableAgentId
            })
          },
          ...(t.resumableAgentId && {
            resumePersistedCount: te,
            name: t.agentName,
            description: o,
            extraMetadata: {
              ...I,
              permissionMode: ae
            }
          }),
          model: c,
          preserveToolUseResults: !0,
          availableTools: a.options.tools,
          allowedTools: p,
          contentReplacementState: $,
          stickyBetas: U,
          isTeammate: !0,
          teammateContext: i
        })) {
          if (l.signal.aborted) {
            logForDebugging(`[inProcessRunner] ${t.agentId} lifecycle aborted`);
            break;
          }
          if (V.signal.aborted) {
            if (logForDebugging(`[inProcessRunner] ${t.agentId} current work aborted (Escape pressed)`), ie.type === "assistant" || ie.type === "user") oe.push(ie), x.push(ie), le = cce(x, ie, le);
            se = !0;
            break;
          }
          if (ie.type === "spinner_mode") {
            S.setMode(ie.mode);
            continue;
          }
          if (ie.type === "api_metrics") continue;
          if (ie.type === "set_in_progress_tool_use_ids") {
            if (ie.op.action !== "remove") continue;
            let ge = ie.op.ids;
            T.updateTranscript(n, (Ce: any) => {
              let xe = new Set(Ce.inProgressToolUseIDs),
                Re = !1;
              for (let Me of ge) if (xe.delete(Me)) Re = !0;
              return Re ? {
                ...Ce,
                inProgressToolUseIDs: xe
              } : Ce;
            });
            continue;
          }
          if (ie.type === "assistant" || ie.type === "user" || ie.type === "system" && "subtype" in ie && ie.subtype === "compact_boundary") oe.push(ie), x.push(ie), le = cce(x, ie, le);
          tUn(ne, ie, re, a.options.tools);
          let Ae = M2t(ne);
          Bce(n, (ge: any) => ({
            ...ge,
            progress: Ae
          }), T), T.updateTranscript(n, (ge: any) => {
            let Ce = ge.inProgressToolUseIDs;
            if (ie.type === "assistant") {
              for (let xe of ie.message.content) if (xe.type === "tool_use") Ce = new Set([...Ce, xe.id]);
            } else if (ie.type === "user") {
              let xe = ie.message.content;
              if (Array.isArray(xe)) {
                for (let Re of xe) if (typeof Re === "object" && "type" in Re && Re.type === "tool_result") Ce = new Set(Ce), Ce.delete(Re.tool_use_id);
              }
            }
            return {
              ...ge,
              messages: RHa(ge.messages, ie),
              inProgressToolUseIDs: Ce
            };
          });
        }
        return {
          success: !0,
          messages: oe
        };
      })).finally(() => {
        if (le) x.push(...le.preserved), le = null;
      }), H = jlt(x).length, Bce(n, (ie: any) => ({
        ...ie,
        currentWorkAbortController: void 0
      }), T), l.signal.aborted) break;
      if (se) {
        logForDebugging(`[inProcessRunner] ${t.agentId} work interrupted, returning to idle`);
        let ie = tc({
          content: S9
        });
        T.updateTranscript(n, (Ae: any) => ({
          ...Ae,
          messages: PHe(Ae.messages, ie)
        }));
      }
      let de = a.getAppState().tasks[n],
        _e = de?.type === "in_process_teammate" && de.isIdle;
      if (Bce(n, (ie: any) => (ie.onIdleCallbacks?.forEach((Ae: any) => Ae()), {
        ...ie,
        isIdle: !0,
        evictAfter: Date.now() + Vqe,
        onIdleCallbacks: []
      }), T), !_e && !A) await Nja(t.agentName, t.color, t.teamName, {
        idleReason: se ? "interrupted" : "available",
        summary: getLastPeerDmSummary(x)
      });else logForDebugging(`[inProcessRunner] Skipping duplicate idle notification for ${t.agentName}`);
      logForDebugging(`[inProcessRunner] ${t.agentId} finished prompt, waiting for next`);
      let fe = await hDp(t, l, n, a.getAppState, T, t.parentSessionId, A);
      switch (fe.type) {
        case "shutdown_request":
          logForDebugging(`[inProcessRunner] ${t.agentId} received shutdown request - passing to model`), L = formatTeammateMessage({
            from: fe.request?.from || "team-lead",
            text: fe.originalMessage
          }), D = void 0, iso(n, Ln({
            content: L
          }), T);
          break;
        case "new_message":
          if (logForDebugging(`[inProcessRunner] ${t.agentId} received new message from ${fe.from}`), fe.from === "user") L = fe.message, D = fe.origin;else L = formatTeammateMessage({
            from: fe.from,
            text: fe.message,
            color: fe.color,
            summary: fe.summary
          }), D = void 0, iso(n, Ln({
            content: L
          }), T);
          break;
        case "aborted":
          logForDebugging(`[inProcessRunner] ${t.agentId} aborted while waiting`), N = !0;
          break;
      }
    }
    let W = !1,
      G: any;
    if (Bce(n, (V: any) => {
      if (V.status !== "running") return W = !0, V;
      return G = V.toolUseId, V.onIdleCallbacks?.forEach((Q: any) => Q()), {
        ...V,
        status: "completed",
        notified: !0,
        endTime: Date.now(),
        pendingUserMessages: [],
        abortController: void 0,
        currentWorkAbortController: void 0,
        onIdleCallbacks: []
      };
    }, T), !W) T.updateTranscript(n, (V: any) => ({
      ...V,
      messages: V.messages.length ? [V.messages.at(-1)] : [],
      inProgressToolUseIDs: new Set()
    }));
    if (iy(n), T.evictTerminal(n), !W) Bh(n, "completed", {
      toolUseId: G,
      summary: t.agentId
    });
    if (W$e(t.agentId), O) isTmuxControlMode("swarm_in_process_run", "compact_blocked_by_hook");else Ie("swarm_in_process_run");
    return {
      success: !0,
      messages: x
    };
  } catch ($: any) {
    let U = $ instanceof Error ? $.message : "Unknown error";
    logForDebugging(`[inProcessRunner] Agent ${t.agentId} failed: ${U}`);
    let W = !1,
      G: any;
    if (Bce(n, (V: any) => {
      if (V.status !== "running") return W = !0, V;
      return G = V.toolUseId, V.onIdleCallbacks?.forEach((Q: any) => Q()), {
        ...V,
        status: "failed",
        notified: !0,
        error: U,
        isIdle: !0,
        endTime: Date.now(),
        onIdleCallbacks: [],
        pendingUserMessages: [],
        abortController: void 0,
        currentWorkAbortController: void 0
      };
    }, T), !W) T.updateTranscript(n, (V: any) => ({
      ...V,
      messages: V.messages.length ? [V.messages.at(-1)] : [],
      inProgressToolUseIDs: new Set()
    }));
    if (iy(n), T.evictTerminal(n), !W) Bh(n, "failed", {
      toolUseId: G,
      summary: t.agentId
    });
    if (!A) await Nja(t.agentName, t.color, t.teamName, {
      idleReason: "failed",
      completedStatus: "failed",
      failureReason: U
    });
    return W$e(t.agentId), Oe("swarm_in_process_run", "agent_loop_failed"), {
      success: !1,
      error: U,
      messages: x
    };
  }
}
function Wut(e: any) {
  let t = e.identity.agentId;
  gDp(e).catch((n: any) => {
    logForDebugging(`[inProcessRunner] Unhandled error in ${t}: ${n}`);
  });
}
var dDp = 500;
var d3n = b(() => {
  ele();
  oG();
  yQe();
  Blt();
  ln();
  Ct();
  nN();
  fee();
  S2t();
  YHe();
  RE();
  Yge();
  HL();
  zE();
  clo();
  lo();
  vC();
  MY();
  oN();
  ch();
  S_();
  Ql();
  qe();
  bt();
  xk();
  Rn();
  lo();
  Mo();
  lx();
  ay();
  bC();
  Xt();
  Nk();
  Q2();
  Tx();
  Zrt();
  eI();
  aU();
  qct();
  BL();
  u3n();
});
export {Mja,TEAMMATE_SYSTEM_PROMPT_ADDENDUM,pDp,Bce,mDp,Nja,fDp,ADp,Bja,hDp,gDp,Wut,dDp,d3n};
