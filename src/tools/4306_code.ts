// @ts-nocheck
import {xp,h_,BM,dn,ds,Lre,Fl,UV,Se,bt} from "../../vendor/m195.ts";
import {iJo,Oe,isTmuxControlMode,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {Qi,ns,l5,wA,CNr,vNr,SHt,gfi,tQe,yfi,Gse,_fi,wNr,$u} from "../mcp/2194_mcpServerName.ts";
import {isCancel} from "../../vendor/m567.ts";
import {e9e,u1t,aIn,O0} from "./3222_name.ts";
import {Fae,Kxe} from "../config/3156_maxSizeBytes.ts";
import {k7r,Rhe,Dq,I7r,Pk,CL} from "../mcp/3149_scope.ts";
import {ox,$tt,PA,Lv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Cl,Ri} from "./2227_userFacingName.ts";
import {O6,Y0} from "../artifact/4303_Y0.ts";
import {DRe,jtt} from "../../vendor/m2701.ts";
import {BRIEF_TOOL_NAME,TOOL_SEARCH_TOOL_NAME,j$} from "../../vendor/m2692.ts";
import {$ot,bW} from "../config/3273_bW.ts";
import {yu,VR} from "../../vendor/m2249.ts";
import {$c,Vw} from "../../vendor/m2695.ts";
import {xJr,J1t,kJr} from "./3310_servers.ts";
import {collectFlagValueIndexes,logFeatureBad,wEt,Sw,scalar} from "../mcp/0728_serverName.ts";
import {getMcpClientsFromAccessor,getStatsStore,getCodeEditToolDecisionCounter,addToToolDuration,lt} from "../session/0131_sent.ts";
import {IRe} from "../artifact/2701_uuidSlugFromUrl.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnum,fromEnumOpt} from "../../vendor/m5.ts";
import {Br} from "../../vendor/m1456.ts";
import {Ln,x4n,Wqe,s_e,k2n,lo} from "./5190_userPromptCount.ts";
import {pOt,zRe,ch} from "../../vendor/m2727.ts";
import {q3n,ndt} from "../mcp/4238_current.ts";
import {De,Rn} from "../session/0615_length.ts";
import {pq,WRe} from "../../vendor/m2722.ts";
import {hL,_z} from "../telemetry/2692__z.ts";
import {isToolSearchToolAvailable,extractDiscoveredToolNames,Hz} from "./4414_summarizeByServerPrefix.ts";
import {isDeferredTool,Y5} from "../config/2707_isDeferredTool.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {E} from "../../vendor/m319.ts";
import {n1e,V7e,Pd} from "../../vendor/m701.ts";
import {ND,dr} from "../../vendor/m231.ts";
import {Dp} from "../../vendor/m2215.ts";
import {tdt,v_e,p3t} from "../../vendor/m4235.ts";
import {Qfi,eAi,tAi,SFe} from "../../vendor/m2201.ts";
import {fs,Wn} from "../api/0459_getOauthConfig.ts";
import {D1,Cv} from "../telemetry/2217_names.ts";
import {qKa,HL} from "./4363_stripAllEnvVars.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {$3n,U3n,B3n,F3n,_po} from "./4237_toolName.ts";
import {createAttachmentMessage,Bv} from "../agent/4429_tryGetPDFReference.ts";
import {Ws,ef} from "../../vendor/m2248.ts";
import {Ua,ty} from "../../vendor/m2245.ts";
import {zc,ex} from "../../vendor/m2582.ts";
import {Gea,qae,Vea,vHn,IMt,Kea,zea,AKr,Nq} from "../agent/3184_code.ts";
import {Xw} from "../telemetry/3181_content.ts";
import {dla,CJr,vJr,wJr} from "./3309_decision.ts";
import {Ou,uS} from "../config/2594_event_name.ts";
import {executePermissionDeniedHooks} from "../hooks/5167_level.ts";
import {C4n,v4n,g6e} from "../config/4304_activityCallback.ts";
import {I0} from "./2698_allErrors.ts";
import {Js} from "../config/2697_oA.ts";
import {LJr,ast} from "../telemetry/3313_prNumber.ts";
import {XQi,zrt,eI} from "../telemetry/3157_error.ts";
import {Bmo,Fmo} from "../../vendor/m4304.ts";
import {N3n,hpo} from "../../vendor/m4234.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {yp} from "./5171_shouldSkipHookDueToTrust.ts";
import {ek} from "../core/0570_isCancel.ts";
function R4n(e: any): any {
  if (e instanceof Error) {
    let t = xp(e);
    if (t) return `Error:${t}`;
    if (typeof e.name === "string" && /^[A-Za-z]{4,60}$/.test(e.name)) return e.name;
    return "Error";
  }
  return "UnknownError";
}
function $mo(e: any): any {
  return iJo(String(Qi(e)));
}
function U3t(e: any): any {
  return h_(e) || isCancel(e);
}
function UKa(e: any): any {
  if (e instanceof e9e) return {
    code: "tool_mcp_auth_error",
    isSad: !0
  };
  if (e instanceof Error && "errorCode" in e && typeof e.errorCode === "string" && /^HTTP 40[13]\b/.test(e.message)) return {
    code: "tool_mcp_oauth_error",
    isSad: !0
  };
  if (e instanceof BM) return {
    code: "tool_shell_error",
    isSad: !0
  };
  if (e instanceof u1t) return {
    code: "tool_mcp_call_error",
    isSad: !0
  };
  let t = dn(e);
  if (ds(e) || Lre(e) || t === "ENOSPC" || t === "EDQUOT" || t === "ENFILE" || t === "EIO") return {
    code: "tool_fs_error",
    isSad: !0
  };
  if (e instanceof Fae) return {
    code: "tool_read_budget_exceeded",
    isSad: !0
  };
  if (e instanceof Fl) return {
    code: "tool_telemetry_safe_error",
    isSad: !0
  };
  if (e instanceof UV) return {
    code: "tool_malformed_command",
    isSad: !0
  };
  if (e instanceof Error) {
    let r = e.name !== "Error" ? e.name : e.constructor?.name ?? "";
    if (zMp.has(r)) return {
      code: "tool_expected_error",
      isSad: !0
    };
  }
  if (e instanceof DOMException && e.name === "TimeoutError") return {
    code: "tool_mcp_transport_error",
    isSad: !0
  };
  let n = dn(e);
  if (n !== void 0 && k7r.has(n)) return {
    code: "tool_mcp_transport_error",
    isSad: !0
  };
  return {
    code: "tool_call_threw",
    isSad: !1
  };
}
function YMp(e: any, t: any): any {
  switch (e) {
    case "session":
      return t === "allow" ? "user_temporary" : "user_reject";
    case "localSettings":
    case "userSettings":
      return t === "allow" ? "user_permanent" : "user_reject";
    default:
      return "config";
  }
}
function JMp(e: any, t: any): any {
  if (!e) return "config";
  switch (e.type) {
    case "permissionPromptTool":
      {
        let r = e.toolResult?.decisionClassification;
        if (r === "user_temporary" || r === "user_permanent" || r === "user_reject") return r;
        return t === "allow" ? "user_temporary" : "user_reject";
      }
    case "rule":
      return YMp(e.rule.source, t);
    case "hook":
      return "hook";
    case "mode":
    case "classifier":
    case "subcommandResults":
    case "asyncAgent":
    case "sandboxOverride":
    case "workingDir":
    case "safetyCheck":
    case "other":
      return "config";
    default:
      return "config";
  }
}
function qmo(e: any, t: any, n: any, r: any): any {
  if (ox() && $tt.has(e) && Cl(t, PA)) return `. ${e} is only available inside ${PA}. Use ${PA} with code: await ${e}({...}).`;
  let o = Cl(O6(), e);
  if (n && o && DRe.has(o.name)) return `. ${e} is not available inside subagents. Complete the task with the tools provided and return findings to the orchestrator.`;
  if (o?.name === BRIEF_TOOL_NAME) return `. ${e} is not enabled in this session — write your message as normal assistant text instead.`;
  if (o) return `. ${e} exists but is not enabled in this context. Use one of the available tools instead.`;
  if ($ot().has(e)) {
    let i = e === yu ? yu : $c;
    if (!Cl(t, ns)) return `. ${i} is not available in this context. Use one of the available tools instead.`;
    return i === yu ? `. ${yu} is not available in this session — find files with \`find\` via the ${ns} tool instead.` : `. ${$c} is not available in this session — search file contents with \`grep\` via the ${ns} tool instead.`;
  }
  let s = n ? "" : XMp(e, r);
  if (s) return s;
  return "";
}
function XMp(e: any, t: any): any {
  let r = /^mcp__(.+?)__/.exec(e)?.[1];
  if (!r) return "";
  if (!xJr(t)) return "";
  let o = collectFlagValueIndexes(r),
    s = (getMcpClientsFromAccessor() ?? []).find((i: any) => i.type === "pending" && (i.name === r || collectFlagValueIndexes(i.name) === o));
  if (!s) return "";
  return `. The MCP server '${s.name}' is still connecting. Call ${IRe} to wait for it, then try again.`;
}
function FKa(e: any): any {
  let t = 0;
  for (let n of e) if (n.type === "user" && n.imagePasteIds) {
    for (let r of n.imagePasteIds) if (r > t) t = r;
  }
  return t + 1;
}
function runForkedQuery(e: any): any {
  return "type" in e;
}
function $Ka(e: any, t: any): any {
  if (!e.startsWith("mcp__")) return;
  let n = logFeatureBad(e);
  if (!n) return;
  return t.find((r: any) => collectFlagValueIndexes(r.name) === n.serverName);
}
function QMp(e: any, t: any): any {
  let n = $Ka(e, t);
  if (n?.type === "connected") return n.config.type ?? "stdio";
  return;
}
function ZMp(e: any, t: any): any {
  let n = $Ka(e, t);
  if (n?.type !== "connected") return;
  return Rhe(n.config);
}
async function* $3t(e: any, t: any, n: any, r: any, o: any): any {
  let s = e.name,
    i = Cl(r.options.tools, s, r.options.toolAliases);
  if (!i) {
    let m = Cl(O6(), s);
    if (m && m.aliases?.includes(s)) i = m;
  }
  let a = t.message.id,
    l = t.requestId,
    c = QMp(s, r.options.mcpClients),
    u = ZMp(s, r.options.mcpClients);
  if (!i) {
    let m = Qi(s),
      f = qmo(s, r.options.tools, r.agentId, r.options.mainLoopModel);
    logForDebugging(`Unknown tool ${s}: ${e.id}`), Oe($mo(s), "tool_not_found"), logEvent("tengu_tool_use_error", {
      error: `No such tool available: ${m}`,
      errorCode: Qe("NO_SUCH_TOOL"),
      toolName: m,
      toolUseID: e.id,
      isMcp: s.startsWith("mcp__"),
      queryChainId: Br(r.queryTracking?.chainId),
      queryDepth: r.queryTracking?.depth,
      ...(r.options.messageClientPlatform && {
        messageClientPlatform: r.options.messageClientPlatform
      }),
      ...(c && {
        mcpServerType: fromEnum(c)
      }),
      ...(u && {
        mcpServerBaseUrl: Dq(u)
      }),
      ...(l && {
        requestId: Br(l)
      }),
      ...l5(s, c, u)
    }), yield {
      message: Ln({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>Error: No such tool available: ${s}${f}</tool_use_error>`,
          is_error: !0,
          tool_use_id: e.id
        }],
        toolUseResult: `Error: No such tool available: ${s}${f}`,
        sourceToolAssistantUUID: t.uuid,
        now: o
      })
    };
    return;
  }
  let d = $mo(i.name),
    p = e.input;
  try {
    if (r.abortController.signal.aborted) {
      logEvent("tengu_tool_use_cancelled", {
        toolName: Qi(i.name),
        toolUseID: e.id,
        isMcp: i.isMcp ?? !1,
        phase: Qe("entry"),
        abortKind: fromEnum(pOt(r.abortController.signal.reason)),
        queryChainId: Br(r.queryTracking?.chainId),
        queryDepth: r.queryTracking?.depth,
        ...(c && {
          mcpServerType: fromEnum(c)
        }),
        ...(u && {
          mcpServerBaseUrl: Dq(u)
        }),
        ...(l && {
          requestId: Br(l)
        }),
        ...l5(i.name, c, u)
      });
      let f = x4n(e.id);
      f.content = Wqe(s_e), yield {
        message: Ln({
          content: [f],
          toolUseResult: s_e,
          sourceToolAssistantUUID: t.uuid,
          now: o
        })
      };
      return;
    }
    let m = q3n(i, r);
    if (m.denyMessage) {
      isTmuxControlMode(d, "tool_isolation_denied"), logEvent("tengu_tool_use_isolation_latch_denied", {
        toolName: Qi(i.name),
        toolUseID: e.id,
        isMcp: i.isMcp ?? !1,
        isolationLatch: fromEnumOpt(m.activeLatch),
        isolationClassifiedAs: fromEnumOpt(m.classifiedAs),
        queryChainId: Br(r.queryTracking?.chainId),
        queryDepth: r.queryTracking?.depth,
        ...(c && {
          mcpServerType: fromEnum(c)
        }),
        ...(u && {
          mcpServerBaseUrl: Dq(u)
        }),
        ...(l && {
          requestId: Br(l)
        }),
        ...l5(i.name, c, u)
      }), yield {
        message: Ln({
          content: [{
            type: "tool_result",
            content: `<tool_use_error>${m.denyMessage}</tool_use_error>`,
            is_error: !0,
            tool_use_id: e.id
          }],
          toolUseResult: `Error: ${m.denyMessage}`,
          sourceToolAssistantUUID: t.uuid,
          now: o
        })
      };
      return;
    }
    for await (let f of e1p(i, e.id, p, r, n, t, a, l, c, u, o)) yield f;
  } catch (m) {
    let f = m instanceof Error ? m.message : String(m),
      A = i ? ` (${i.name})` : "";
    if (!U3t(m)) {
      logForDebugging(`runToolUse error${A}: ${f.slice(0, 200)}`);
      let {
        code: g,
        isSad: _
      } = UKa(m);
      if (_) isTmuxControlMode(d, g);else De(m), Oe(d, "tool_unexpected_error");
    }
    let h = `Error calling tool${A}: ${f}`;
    yield {
      message: Ln({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>${h}</tool_use_error>`,
          is_error: !0,
          tool_use_id: e.id
        }],
        toolUseResult: h,
        sourceToolAssistantUUID: t.uuid,
        now: o
      })
    };
  }
}
function e1p(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a: any, l: any, c: any, u: any): any {
  let d = new pq();
  return n1p(e, t, n, r, o, s, i, a, l, c, u, (p: any) => {
    if (p.type !== "progress") {
      d.enqueue(p);
      return;
    }
    logEvent("tengu_tool_use_progress", {
      messageID: Br(i),
      toolName: Qi(e.name),
      isMcp: e.isMcp ?? !1,
      queryChainId: Br(r.queryTracking?.chainId),
      queryDepth: r.queryTracking?.depth,
      ...(l && {
        mcpServerType: fromEnum(l)
      }),
      ...(c && {
        mcpServerBaseUrl: Dq(c)
      }),
      ...(a && {
        requestId: Br(a)
      }),
      ...l5(e.name, l, c)
    }), d.enqueue({
      message: k2n({
        toolUseID: p.toolUseID,
        parentToolUseID: t,
        data: p.data,
        now: u
      })
    });
  }).then((p: any) => {
    for (let m of p) d.enqueue(m);
  }).catch((p: any) => {
    d.error(p);
  }).finally(() => {
    d.done();
  }), d;
}
function t1p(e: any, t: any, n: any): any {
  if (!hL()) return null;
  if (!isToolSearchToolAvailable(n)) return null;
  if (!isDeferredTool(e)) return null;
  if (extractDiscoveredToolNames(t).has(e.name)) return null;
  let o = "";
  try {
    o = ` For reference, this tool's input schema is: ${Le(E.toJSONSchema(e.inputSchema))}`;
  } catch {}
  return `
\nThis tool's schema was not sent to the API — it was not in the discovered-tool set derived from message history. ` + `Without the schema in your prompt, typed parameters (arrays, numbers, booleans) get emitted as strings and the client-side parser rejects them. Load the tool first: call ${TOOL_SEARCH_TOOL_NAME} with query "select:${e.name}", then retry this call.${o}`;
}
function w4n(e: any): any {
  let {
    phase: t,
    tool: n,
    toolUseID: r,
    toolUseContext: o,
    assistantMessage: s,
    mcpServerType: i,
    mcpServerBaseUrl: a,
    requestId: l,
    now: c
  } = e;
  logEvent("tengu_tool_use_cancelled", {
    toolName: Qi(n.name),
    toolUseID: r,
    isMcp: n.isMcp ?? !1,
    phase: fromEnum(t),
    abortKind: fromEnum(pOt(o.abortController.signal.reason)),
    queryChainId: Br(o.queryTracking?.chainId),
    queryDepth: o.queryTracking?.depth,
    ...(i && {
      mcpServerType: fromEnum(i)
    }),
    ...(a && {
      mcpServerBaseUrl: Dq(a)
    }),
    ...(l && {
      requestId: Br(l)
    }),
    ...l5(n.name, i, a)
  });
  let u = x4n(r);
  return u.content = Wqe(s_e), [{
    message: Ln({
      content: [u],
      toolUseResult: s_e,
      sourceToolAssistantUUID: s.uuid,
      now: c
    })
  }];
}
async function n1p(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a: any, l: any, c: any, u: any, d: any): Promise<any> {
  let p = $mo(e.name),
    m = Le(n).length;
  if (n1e(n)) {
    let {
        raw: J,
        len: ee
      } = n[V7e],
      te = ND(J, 200),
      ne = `${e.name} was called with input that could not be parsed as JSON.
You sent (first ${te.length} of ${ee} bytes): ${te}
Common causes: unescaped backslashes in file paths (use / or \\\\), unescaped control characters, or truncated output. Retry with valid JSON.`;
    return isTmuxControlMode(p, "tool_input_validation_failed"), logEvent("tengu_tool_use_error", {
      error: Qe("InputValidationError"),
      errorCode: Qe("JSON_PARSE"),
      errorDetailsHash: Dp(`${e.name}: unparsed tool input`),
      messageID: Br(i),
      toolName: Qi(e.name),
      isMcp: e.isMcp ?? !1,
      toolInputSizeBytes: ee,
      queryChainId: Br(r.queryTracking?.chainId),
      queryDepth: r.queryTracking?.depth,
      ...(l && {
        mcpServerType: fromEnum(l)
      }),
      ...(c && {
        mcpServerBaseUrl: Dq(c)
      }),
      ...(a && {
        requestId: Br(a)
      }),
      ...l5(e.name, l, c)
    }), [{
      message: Ln({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>InputValidationError: ${ne}</tool_use_error>`,
          is_error: !0,
          tool_use_id: t
        }],
        toolUseResult: `InputValidationError: JSON parse failed (${ee} bytes)`,
        sourceToolAssistantUUID: s.uuid,
        now: u
      })
    }];
  }
  let f = n,
    A = null;
  if (e.coerceInput) {
    if (A = e.coerceInput(n), A !== null) f = A.input;
  }
  let h = e.inputSchema.safeParse(f);
  if (A !== null) logEvent("tengu_tool_input_coerced", {
    toolName: Qi(e.name),
    shapeClass: A.shapeClass,
    outcome: Qe(h.success ? "coerced_valid" : "coerced_still_invalid"),
    toolInputSizeBytes: m
  });
  if (!h.success) {
    let J = tdt(e.name, h.error),
      ee = !1;
    if (Qfi() && eAi(n)) {
      let re = tAi(e.name, e.inputSchema);
      if (re !== null) J = re, ee = !0;
    }
    let te = e.validationErrorSteer?.(n);
    if (te) J += `
\n${te}`;
    let ne = t1p(e, r.messages, r.options.tools);
    if (ne) logEvent("tengu_deferred_tool_schema_not_sent", {
      toolName: Qi(e.name),
      isMcp: e.isMcp ?? !1
    }), J += ne;
    return logForDebugging(`${e.name} tool input error: ${J.slice(0, 200)}`), isTmuxControlMode(p, "tool_input_validation_failed"), logEvent("tengu_tool_use_error", {
      error: Qe("InputValidationError"),
      errorCode: Qe("ZOD_VALIDATION"),
      zodIssueCodes: fs(h.error.issues.map((re: any) => re.code)).join(","),
      errorDetailsHash: Dp(J),
      messageID: Br(i),
      toolName: Qi(e.name),
      isMcp: e.isMcp ?? !1,
      toolInputSizeBytes: m,
      ...(ee && {
        emptyInputRepaired: !0
      }),
      queryChainId: Br(r.queryTracking?.chainId),
      queryDepth: r.queryTracking?.depth,
      ...(r.options.messageClientPlatform && {
        messageClientPlatform: r.options.messageClientPlatform
      }),
      ...(l && {
        mcpServerType: fromEnum(l)
      }),
      ...(c && {
        mcpServerBaseUrl: Dq(c)
      }),
      ...(a && {
        requestId: Br(a)
      }),
      ...l5(e.name, l, c)
    }), [{
      message: Ln({
        content: [{
          type: "tool_result",
          content: `<tool_use_error>InputValidationError: ${J}</tool_use_error>`,
          is_error: !0,
          tool_use_id: t
        }],
        toolUseResult: `InputValidationError: ${h.error.message}`,
        sourceToolAssistantUUID: s.uuid,
        now: u
      })
    }];
  }
  let g = await e.validateInput?.(h.data, r);
  if (zRe(r.abortController.signal)) return w4n({
    phase: "validate_input",
    tool: e,
    toolUseID: t,
    toolUseContext: r,
    assistantMessage: s,
    mcpServerType: l,
    mcpServerBaseUrl: c,
    requestId: a,
    now: u
  });
  if (g?.result === !1) return logForDebugging(`${e.name} tool validation error: ${g.message?.slice(0, 200)}`), isTmuxControlMode(p, "tool_validate_input_rejected"), logEvent("tengu_tool_use_error", {
    messageID: Br(i),
    toolName: Qi(e.name),
    error: Qe("ValidateInputError"),
    ...D1(g.message),
    errorCode: g.errorCode,
    isMcp: e.isMcp ?? !1,
    queryChainId: Br(r.queryTracking?.chainId),
    queryDepth: r.queryTracking?.depth,
    ...(r.options.messageClientPlatform && {
      messageClientPlatform: r.options.messageClientPlatform
    }),
    ...(l && {
      mcpServerType: fromEnum(l)
    }),
    ...(c && {
      mcpServerBaseUrl: Dq(c)
    }),
    ...(a && {
      requestId: Br(a)
    }),
    ...l5(e.name, l, c)
  }), [{
    message: Ln({
      content: [{
        type: "tool_result",
        content: `<tool_use_error>${g.message}</tool_use_error>`,
        is_error: !0,
        tool_use_id: t
      }],
      toolUseResult: `Error: ${g.message}`,
      sourceToolAssistantUUID: s.uuid,
      now: u
    })
  }];
  if (e.name === ns && h.data && "command" in h.data) qKa(h.data.command, Fr(r), r.abortController.signal, r.options.isNonInteractiveSession);
  let _ = [],
    y = h.data;
  if (e.name === ns && y && typeof y === "object" && "_simulatedSedEdit" in y) {
    let {
      _simulatedSedEdit: J,
      ...ee
    } = y;
    y = ee;
  }
  let T = y,
    S = e.backfillObservableInput && typeof y === "object" && y !== null ? {
      ...y
    } : null;
  if (S) e.backfillObservableInput(S), y = S;
  let v = !1,
    R: any,
    k: any,
    x = [],
    H = Date.now();
  for await (let J of $3n(r, e, y, t, s.message.id, a, l, c)) switch (J.type) {
    case "message":
      if (J.message.message.type === "progress") d(J.message.message);else {
        _.push(J.message);
        let ee = J.message.message.attachment;
        if (ee && "command" in ee && ee.command !== void 0 && "durationMs" in ee && ee.durationMs !== void 0) x.push({
          command: ee.command,
          durationMs: ee.durationMs
        });
      }
      break;
    case "hookPermissionResult":
      k = J.hookPermissionResult;
      break;
    case "hookUpdatedInput":
      y = J.updatedInput;
      break;
    case "preventContinuation":
      v = J.shouldPreventContinuation;
      break;
    case "stopReason":
      R = J.stopReason;
      break;
    case "additionalContext":
      _.push(J.message);
      break;
    case "defer":
      {
        if (getStatsStore()?.observe("pre_tool_hook_duration_ms", Date.now() - H), !r.options.isNonInteractiveSession) {
          logForDebugging(`Hook ${J.hookName} returned permissionDecision=defer in interactive mode; ignoring (defer is print-mode only)`, {
            level: "warn"
          });
          break;
        }
        let ee = Array.isArray(s.message.content) ? Wn(s.message.content, (te: any) => te.type === "tool_use") : 1;
        if (ee > 1) {
          logForDebugging(`Hook ${J.hookName} returned permissionDecision=defer but ${ee} tool calls are in this batch; ignoring (defer is solo-only — siblings would be orphaned on resume)`, {
            level: "warn"
          });
          break;
        }
        return logEvent("tengu_pre_tool_hook_deferred", {
          toolName: Qi(e.name),
          queryChainId: Br(r.queryTracking?.chainId),
          queryDepth: r.queryTracking?.depth
        }), _.push({
          message: createAttachmentMessage({
            type: "hook_deferred_tool",
            toolUseID: t,
            toolName: e.name,
            toolInput: y,
            hookName: J.hookName,
            hookEvent: "PreToolUse",
            permissionMode: Fr(r).mode
          })
        }), _;
      }
    case "stop":
      return getStatsStore()?.observe("pre_tool_hook_duration_ms", Date.now() - H), _.push({
        message: Ln({
          content: [x4n(t)],
          toolUseResult: `Error: ${R}`,
          sourceToolAssistantUUID: s.uuid,
          now: u
        })
      }), _;
  }
  let I = Date.now() - H;
  if (getStatsStore()?.observe("pre_tool_hook_duration_ms", I), I >= Umo) logForDebugging(`Slow PreToolUse hooks: ${I}ms for ${e.name} (${x.length} hooks)`, {
    level: "info"
  });
  let P = {};
  if (y && typeof y === "object") {
    if (e.name === Ws && "file_path" in y && wA()) P.file_path = String(y.file_path);else if ((e.name === Ua || e.name === zc) && "file_path" in y && wA()) P.file_path = String(y.file_path);else if (e.name === ns && "command" in y && wA()) {
      let J = y;
      P.full_command = J.command;
    } else if (wA()) {
      let J = CNr(e.name, y, e.userFacingName?.(void 0));
      if (J) P.skill_name = J;
      let ee = vNr(e.name, y);
      if (ee) P.subagent_type = ee;
    }
  }
  let L = Gea(e.name, r.agentContext, P, qae() || Xw() && wA() ? Le(y) : void 0, t);
  Vea();
  let D = Fr(r).mode,
    N = Date.now(),
    O = await U3n(k, e, y, r, o, s, t),
    $ = O.decision;
  if (y = O.input, $.behavior !== "allow" && zRe(r.abortController.signal)) return vHn("cancelled", "server_fallback_tombstone"), IMt(L), w4n({
    phase: "permission",
    tool: e,
    toolUseID: t,
    toolUseContext: r,
    assistantMessage: s,
    mcpServerType: l,
    mcpServerBaseUrl: c,
    requestId: a,
    now: u
  });
  if ($.behavior !== "allow") r.onPermissionDenial?.(e, t, y);
  let U = Date.now() - N;
  if (U >= Umo && D === "auto") logForDebugging(`Slow permission decision: ${U}ms for ${e.name} (mode=${D}, behavior=${$.behavior})`, {
    level: "info"
  });
  if (dla({
    toolName: e.name,
    isMcp: e.isMcp ?? !1,
    messageId: i,
    toolUseID: t,
    permissionMode: Fr(r).mode,
    behavior: $.behavior,
    decisionReason: $.decisionReason,
    resolvedSource: r.toolDecisions?.[t]?.source
  }), $.behavior !== "ask" && r.toolDecisions?.[t] === void 0) {
    let J = $.behavior === "allow" ? "accept" : "reject",
      ee = JMp($.decisionReason, $.behavior),
      te = SHt(e.name, y, e.userFacingName?.(void 0));
    if (Ou("tool_decision", {
      decision: J,
      source: ee,
      tool_name: Qi(e.name),
      tool_use_id: t,
      ...(Object.keys(te).length > 0 && {
        tool_parameters: Le(te)
      })
    }), CJr(e.name)) vJr(e, y, J, ee).then((ne: any) => getCodeEditToolDecisionCounter()?.add(1, ne));
  }
  if ($.decisionReason?.type === "hook" && $.decisionReason.hookName === "PermissionRequest" && $.behavior !== "ask") _.push({
    message: createAttachmentMessage({
      type: "hook_permission_decision",
      decision: $.behavior,
      toolUseID: t,
      hookEvent: "PermissionRequest"
    })
  });
  if ($.behavior !== "allow") {
    logForDebugging(`${e.name} tool permission denied`);
    let J = r.toolDecisions?.[t];
    vHn("reject", J?.source || "unknown"), IMt(L), logEvent("tengu_tool_use_can_use_tool_rejected", {
      messageID: Br(i),
      toolName: Qi(e.name),
      queryChainId: Br(r.queryTracking?.chainId),
      queryDepth: r.queryTracking?.depth,
      ...(r.options.messageClientPlatform && {
        messageClientPlatform: r.options.messageClientPlatform
      }),
      ...(l && {
        mcpServerType: fromEnum(l)
      }),
      ...(c && {
        mcpServerBaseUrl: Dq(c)
      }),
      ...(a && {
        requestId: Br(a)
      }),
      ...l5(e.name, l, c)
    });
    let ee = $.message;
    if (v && !ee) ee = `Execution stopped by PreToolUse hook${R ? `: ${R}` : ""}`;
    let te = [{
        type: "tool_result",
        content: ee,
        is_error: !0,
        tool_use_id: t
      }],
      ne = $.behavior === "ask" ? $.contentBlocks : void 0;
    if (ne?.length) te.push(...ne);
    let re: any;
    if (ne?.length) {
      let oe = Wn(ne, (ce: any) => ce.type === "image");
      if (oe > 0) {
        let ce = FKa(r.messages);
        re = Array.from({
          length: oe
        }, (ue: any, ae: any) => ce + ae);
      }
    }
    if (_.push({
      message: Ln({
        content: te,
        imagePasteIds: re,
        toolUseResult: `Error: ${ee}`,
        sourceToolAssistantUUID: s.uuid,
        now: u
      })
    }), $.decisionReason?.type === "classifier" && $.decisionReason.classifier === "auto-mode") {
      let oe = !1;
      for await (let ce of executePermissionDeniedHooks(e.name, t, y, $.decisionReason.reason ?? "Permission denied", r, D, r.abortController.signal)) if (ce.retry) oe = !0;
      if (oe) _.push({
        message: Ln({
          content: "The PermissionDenied hook indicated you may retry this tool call.",
          isMeta: !0,
          now: u
        })
      });
    }
    return _;
  }
  if (logEvent("tengu_tool_use_can_use_tool_allowed", {
    messageID: Br(i),
    toolName: Qi(e.name),
    queryChainId: Br(r.queryTracking?.chainId),
    queryDepth: r.queryTracking?.depth,
    ...(l && {
      mcpServerType: fromEnum(l)
    }),
    ...(c && {
      mcpServerBaseUrl: Dq(c)
    }),
    ...(a && {
      requestId: Br(a)
    }),
    ...l5(e.name, l, c)
  }), $.updatedInput !== void 0) y = $.updatedInput;
  let W = gfi(y),
    G = SHt(e.name, y, e.userFacingName?.(void 0)),
    V = r.toolDecisions?.[t];
  vHn(V?.decision || "unknown", V?.source || "unknown"), Kea(t);
  let Q = Date.now(),
    K = process.memoryUsage();
  if (S && y !== T && typeof y === "object" && y !== null && "file_path" in y && "file_path" in T && y.file_path === S.file_path) T = {
    ...y,
    file_path: T.file_path
  };else if (y !== S) T = y;
  if (zRe(r.abortController.signal)) return w4n({
    phase: "pre_call",
    tool: e,
    toolUseID: t,
    toolUseContext: r,
    assistantMessage: s,
    mcpServerType: l,
    mcpServerBaseUrl: c,
    requestId: a,
    now: u
  });
  d({
    type: "set_in_progress_tool_use_ids",
    op: {
      action: "add",
      ids: [t]
    }
  }), logForDebugging(`[Stall] tool_dispatch_start tool=${e.name} toolUseId=${t} permissionDecisionMs=${U}`, {
    level: "info"
  });
  let Y = !1;
  try {
    C4n("tool_exec", r.agentId);
    let J = await e.call(T, {
        ...r,
        toolUseId: t,
        userModified: $.userModified ?? !1
      }, o, s, d),
      ee = Date.now() - Q,
      te = process.memoryUsage();
    if (addToToolDuration(ee), logForDebugging(`[Stall] tool_dispatch_end tool=${e.name} toolUseId=${t} outcome=ok durationMs=${ee}`, {
      level: "info"
    }), Y = !0, J.data && typeof J.data === "object") {
      let He = {};
      if (e.name === Ws) {
        let Ge = J.data;
        if (Ge.type === "text") {
          if (wA() && "file_path" in y) He.file_path = String(y.file_path);
          He.content = Ge.file.content;
        }
      }
      if ((e.name === Ua || e.name === zc) && "file_path" in y) {
        if (wA()) He.file_path = String(y.file_path);
        if (wA() && e.name === Ua && "structuredPatch" in J.data) He.diff = Le(J.data.structuredPatch);
        if (wA() && e.name === zc && "content" in y) He.content = String(y.content);
      }
      if (e.name === ns && "command" in y) {
        let Ge = y;
        if (wA()) He.bash_command = Ge.command;
        if ("stdout" in J.data) He.output = String(J.data.stdout);
      }
      if (Object.keys(He).length > 0) zea("tool.output", He);
    }
    if (typeof J === "object" && "structured_output" in J) _.push({
      message: createAttachmentMessage({
        type: "structured_output",
        data: J.structured_output,
        toolUseID: t
      })
    });
    AKr({
      success: !0
    });
    let ne = qae() || Xw() && tQe() ? J.data && typeof J.data === "object" ? Le(J.data) : String(J.data ?? "") : void 0;
    IMt(L, ne);
    let re = e.mapToolResultToToolResultBlockParam(J.data, t),
      oe = re.content,
      ce = !oe ? 0 : typeof oe === "string" ? oe.length : Le(oe).length,
      ue = yfi(J.newMessages),
      ae: any,
      he: any,
      se: any,
      le: any,
      pe: any;
    if (y && typeof y === "object") {
      if ((e.name === Ws || e.name === Ua || e.name === zc) && "file_path" in y) ae = Gse(String(y.file_path)), se = String(T.file_path).length;else if (e.name === I0 && "notebook_path" in y) {
        let He = String(y.notebook_path);
        ae = Gse(He), se = He.length;
      } else if (e.name === ns && "command" in y) {
        let He = y;
        ae = _fi(He.command, He._simulatedSedEdit?.filePath), he = wNr(He.command), le = He.command.length;
      } else if ((e.name === wEt || e.name === Js) && "command" in y && typeof y.command === "string") he = wNr(y.command);else if (e.name === J1t) {
        let He = y,
          Ge = (ot: any) => Array.isArray(ot) ? ot.length : void 0,
          Ye = He.method === "report_validate" ? He.counts : void 0;
        pe = {
          dsMethod: String(He.method),
          ...(typeof He.projectId === "string" && {
            dsProjectIdHash: Dp(He.projectId)
          }),
          ...(Ge(He.assets) !== void 0 && {
            dsAssetCount: Ge(He.assets)
          }),
          ...(Ge(He.files) !== void 0 && {
            dsFileCount: Ge(He.files)
          }),
          ...(Ge(He.paths) !== void 0 && {
            dsPathCount: Ge(He.paths)
          }),
          ...(Ge(He.writes) !== void 0 && {
            dsWriteCount: Ge(He.writes)
          }),
          ...(Ge(He.deletes) !== void 0 && {
            dsDeleteCount: Ge(He.deletes)
          }),
          ...(Ye && {
            dsValidateTotal: Ye.total,
            dsValidateBad: Ye.bad,
            dsValidateThin: Ye.thin,
            dsValidateVi: Ye.variantsIdentical,
            dsValidateIterations: Ye.iterations
          })
        };
      }
    }
    if (Ie(p), logEvent("tengu_tool_use_success", {
      messageID: Br(i),
      toolName: Qi(e.name),
      isMcp: e.isMcp ?? !1,
      durationMs: ee,
      rssDeltaBytes: te.rss - K.rss,
      heapUsedDeltaBytes: te.heapUsed - K.heapUsed,
      externalDeltaBytes: te.external - K.external,
      preToolHookDurationMs: I,
      permissionDurationMs: U,
      toolResultSizeBytes: ce,
      ...(ue > 0 && {
        toolResultAttachmentBytes: ue
      }),
      toolInputSizeBytes: m,
      ...(ae !== void 0 && {
        fileExtension: ae
      }),
      ...(he !== void 0 && {
        bashCommandFileExtensions: he
      }),
      ...(se !== void 0 && {
        filePathLen: se
      }),
      ...(le !== void 0 && {
        bashCommandLen: le
      }),
      ...pe,
      ...(e.name === Ws && y && typeof y === "object" && {
        readHasLimit: y.limit !== void 0,
        readHasOffset: y.offset !== void 0
      }),
      queryChainId: Br(r.queryTracking?.chainId),
      queryDepth: r.queryTracking?.depth,
      ...(r.options.messageClientPlatform && {
        messageClientPlatform: r.options.messageClientPlatform
      }),
      ...(l && {
        mcpServerType: fromEnum(l)
      }),
      ...(c && {
        mcpServerBaseUrl: Dq(c)
      }),
      ...(a && {
        requestId: Br(a)
      }),
      ...(e.readOnlyHint !== void 0 && {
        readOnlyHint: e.readOnlyHint
      }),
      ...l5(e.name, l, c)
    }), wA() && (e.name === ns || e.name === Js) && "command" in y && typeof y.command === "string" && y.command.match(/\bgit\s+commit\b/) && J.data && typeof J.data === "object" && "stdout" in J.data) {
      let He = LJr(String(J.data.stdout));
      if (He) G.git_commit_id = He;
    }
    let de = I7r(e);
    Ou("tool_result", {
      tool_name: Qi(e.name),
      tool_use_id: t,
      success: "true",
      duration_ms: String(ee),
      ...(Object.keys(G).length > 0 && {
        tool_parameters: Le(G)
      }),
      ...(W && {
        tool_input: W
      }),
      tool_input_size_bytes: String(m),
      tool_result_size_bytes: String(ce),
      ...(V && {
        decision_source: V.source,
        decision_type: V.decision
      }),
      ...(de && {
        mcp_server_scope: de
      })
    });
    let _e = J.data,
      fe = [],
      ie = J.contextLayers,
      Ae = J.mcpMeta;
    async function ge(He: any, Ge?: any): Promise<any> {
      let ot = [Ge ? await XQi(Ge, e.name, e.maxResultSizeChars, e.persistenceThresholdCeiling) : await zrt(e, He, t)];
      if ("acceptFeedback" in $ && $.acceptFeedback) ot.push({
        type: "text",
        text: $.acceptFeedback
      });
      let vt = "contentBlocks" in $ ? $.contentBlocks : void 0;
      if (vt?.length) ot.push(...vt);
      let $e: any;
      if (vt?.length) {
        let Je = Wn(vt, (Rt: any) => Rt.type === "image");
        if (Je > 0) {
          let Rt = FKa(r.messages);
          $e = Array.from({
            length: Je
          }, (Et: any, dt: any) => Rt + dt);
        }
      }
      _.push({
        message: Ln({
          content: ot,
          imagePasteIds: $e,
          toolUseResult: r.agentId && !r.preserveToolUseResults ? void 0 : He,
          mcpMeta: Bmo(r.agentId, Ae),
          sourceToolAssistantUUID: s.uuid,
          now: u
        }),
        contextLayers: ie && ie.length > 0 ? {
          toolUseID: t,
          layers: ie
        } : void 0
      });
    }
    let Ce = [],
      xe = Date.now(),
      Re = !1,
      Me = !1;
    for await (let He of B3n(r, e, t, s.message.id, y, _e, a, l, c, ee)) if (Re = !0, "updatedToolOutput" in He) _e = He.updatedToolOutput, Me = !0;else if (fe.push(He), He.message.type === "attachment") {
      let Ge = He.message.attachment;
      if ("command" in Ge && Ge.command !== void 0 && "durationMs" in Ge && Ge.durationMs !== void 0) Ce.push({
        command: Ge.command,
        durationMs: Ge.durationMs
      });
    }
    let Ke = Date.now() - xe;
    if (Re) {
      let He = N3n(e.name, t, y, r.readFileState);
      if (He) fe.push({
        message: He
      });
    }
    if (Ke >= Umo) logForDebugging(`Slow PostToolUse hooks: ${Ke}ms for ${e.name} (${Ce.length} hooks)`, {
      level: "info"
    });
    if (Pk(e)) await ge(_e);else {
      let He = re;
      if (Me) {
        let Ge = e.outputSchema?.safeParse(_e),
          Ye = (ot: any) => {
            logForDebugging(`PostToolUse hook returned updatedToolOutput that does not match ${e.name}'s output shape: ${ot}`, {
              level: "error"
            }), _e = J.data, fe.push({
              message: createAttachmentMessage({
                type: "hook_error_during_execution",
                content: `PostToolUse hook returned updatedToolOutput that does not match ${e.name}'s output shape; using original output. ${ot}`,
                hookName: `PostToolUse:${e.name}`,
                toolUseID: t,
                hookEvent: "PostToolUse"
              })
            });
          };
        if (Ge && !Ge.success) Ye(Ge.error.message);else try {
          let ot = e.mapToolResultToToolResultBlockParam(_e, t);
          if (ot === void 0) Ye("mapper returned undefined");else He = ot;
        } catch (ot: any) {
          Ye(v_e(ot));
        }
      }
      await ge(_e, He);
    }
    for (let He of fe) _.push(He);
    if (J.newMessages && J.newMessages.length > 0) for (let He of J.newMessages) _.push({
      message: He
    });
    if (v) _.push({
      message: createAttachmentMessage({
        type: "hook_stopped_continuation",
        message: R || "Execution stopped by hook",
        hookName: `PreToolUse:${e.name}`,
        toolUseID: t,
        hookEvent: "PreToolUse"
      })
    });
    return _;
  } catch (J: any) {
    let ee = Date.now() - Q,
      te = process.memoryUsage();
    if (addToToolDuration(ee), !Y) logForDebugging(`[Stall] tool_dispatch_end tool=${e.name} toolUseId=${t} outcome=${U3t(J) ? "aborted" : "error"} durationMs=${ee}`, {
      level: U3t(J) ? "info" : "warn"
    });else logForDebugging(`[Stall] tool_dispatch_post_error tool=${e.name} toolUseId=${t} durationMs=${ee}`, {
      level: "warn"
    });
    let ne = Se(J),
      re = R4n(J);
    if (AKr({
      success: !1,
      error: wA() ? ne : re
    }), IMt(L), J instanceof e9e) aIn(J.serverName, r.setAppState);
    let oe = zRe(r.abortController.signal);
    if (!oe && !U3t(J)) {
      logForDebugging(`${e.name} tool error (${ee}ms): ${ne.slice(0, 200)}`);
      let {
        code: se,
        isSad: le
      } = UKa(J);
      if (le) isTmuxControlMode(p, se);else De(J), Oe(p, se);
      logEvent("tengu_tool_use_error", {
        messageID: Br(i),
        toolName: Qi(e.name),
        error: re,
        errorCode: re,
        isMcp: e.isMcp ?? !1,
        rssDeltaBytes: te.rss - K.rss,
        heapUsedDeltaBytes: te.heapUsed - K.heapUsed,
        externalDeltaBytes: te.external - K.external,
        ...(e.name === J1t && {
          dsMethod: String(y.method)
        }),
        queryChainId: Br(r.queryTracking?.chainId),
        queryDepth: r.queryTracking?.depth,
        ...(r.options.messageClientPlatform && {
          messageClientPlatform: r.options.messageClientPlatform
        }),
        ...(l && {
          mcpServerType: fromEnum(l)
        }),
        ...(c && {
          mcpServerBaseUrl: Dq(c)
        }),
        ...(a && {
          requestId: Br(a)
        }),
        ...(e.readOnlyHint !== void 0 && {
          readOnlyHint: e.readOnlyHint
        }),
        ...l5(e.name, l, c)
      });
      let pe = I7r(e);
      Ou("tool_result", {
        tool_name: Qi(e.name),
        tool_use_id: t,
        success: "false",
        duration_ms: String(ee),
        error_type: re,
        ...(wA() && {
          error: ne
        }),
        ...(Object.keys(G).length > 0 && {
          tool_parameters: Le(G)
        }),
        ...(W && {
          tool_input: W
        }),
        tool_input_size_bytes: String(m),
        ...(V && {
          decision_source: V.source,
          decision_type: V.decision
        }),
        ...(pe && {
          mcp_server_scope: pe
        })
      });
    }
    let ce = v_e(J),
      ue = J instanceof u1t ? J.mcpMeta : void 0,
      ae = U3t(J),
      he = [];
    for await (let se of F3n(r, e, t, i, y, ce, ae || oe, a, l, c, ee)) he.push(se);
    if (oe) return w4n({
      phase: "call",
      tool: e,
      toolUseID: t,
      toolUseContext: r,
      assistantMessage: s,
      mcpServerType: l,
      mcpServerBaseUrl: c,
      requestId: a,
      now: u
    });
    return _.push({
      message: Ln({
        content: [{
          type: "tool_result",
          content: ce,
          is_error: !0,
          tool_use_id: t
        }],
        toolUseResult: `Error: ${ce}`,
        mcpMeta: Bmo(r.agentId, ue),
        sourceToolAssistantUUID: s.uuid,
        now: u
      })
    }, ...he), _;
  } finally {
    if (v4n("tool_exec", r.agentId), V && r.toolDecisions) delete r.toolDecisions[t];
  }
}
var Umo = 2000,
  zMp: any;
var bdt = b(() => {
  Ct();
  $u();
  Xr();
  lt();
  jtt();
  wJr();
  Ri();
  HL();
  j$();
  ty();
  Kxe();
  ef();
  ex();
  VR();
  Vw();
  kJr();
  Lv();
  ast();
  Y5();
  Y0();
  ch();
  Bv();
  Ql();
  qe();
  bW();
  bt();
  Cv();
  yp();
  Pd();
  Rn();
  lo();
  Sw();
  g6e();
  Xt();
  WRe();
  dr();
  uS();
  Nq();
  p3t();
  SFe();
  eI();
  Hz();
  _z();
  ln();
  ek();
  O0();
  Fmo();
  scalar();
  CL();
  hpo();
  _po();
  ndt();
  zMp = new Set(["AgentPreconditionError", "AgentTypeError", "ArtifactInputError", "ConnectorRegistryUnavailableError", "PluginSkillSearchUnavailableError", "CtxAgentValidationError", "DesignSyncPreconditionError", "DomainBlockedError", "DomainCheckFailedError", "EgressBlockedError", "RipgrepTimeoutError", "FileStateError", "FileTooLargeError", "ImageResizeError", "McpError", "MonitorMcpPreconditionError", "NotebookReadError", "PlanPreconditionError", "ProjectsPreconditionError", "RemoteAgentPreconditionError", "SandboxBridgeUnavailableError", "SandboxInitFailedError", "SelfHostedRunnerApiError", "StreamableHTTPError", "StopTaskError", "SwarmPaneError", "SymlinkWriteRefusedError", "TooManyRedirectsError", "WebFetchTransportError", "WorkflowInputError", "WorkflowRemotePreconditionError", "WorktreeGitTransientError", "WorktreeIsolationError"]);
});
export {R4n,$mo,U3t,UKa,YMp,JMp,qmo,XMp,FKa,runForkedQuery,$Ka,QMp,ZMp,$3t,e1p,t1p,w4n,n1p,Umo,zMp,bdt};
