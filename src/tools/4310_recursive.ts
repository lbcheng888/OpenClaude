// @ts-nocheck
import {getClaudeTempDir as TF,checkReadNetworkPathSafety as ndt,nA as aA} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue,Qe} from "../../vendor/m5.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {mI as aI,eG as MW,Ln,lo} from "./5190_userPromptCount.ts";
import {IDLE_SPECULATION_STATE as dke,kke as pke} from "../../vendor/m3301.ts";
import {oJr as aYr,kL as TL,S0n as MIn,iJr as cYr,aJr as uYr,h9e as G$e} from "../permissions/3299_enabled.ts";
import {rN as K1,ch as uh} from "../../vendor/m2727.ts";
import {createCacheSafeParams as iW,runForkedAgent as VH,gP as hP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {getCwdState as fV,lt as ct} from "../session/0131_sent.ts";
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {eN as W1,oA as cA} from "../config/2697_oA.ts";
import {ns as Xo} from "../mcp/2194_mcpServerName.ts";
import {I0n as VIn,V1t as w1t} from "../../vendor/m3304.ts";
import {V3t as E3t,HL as SL} from "./4363_stripAllEnvVars.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {isTranscriptPersistenceDisabled as XW,trackSessionWrite as jpo,fireSessionMirror as qpo,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {qf as Vf,ry} from "../agent/2772_withFileTypes.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {Cdt as edt,wqe as oqe} from "../permissions/4309_type.ts";
import {DF as RF,Vtt as ktt,xk as Ck} from "../../vendor/m2715.ts";
import {b} from "../../runtime.ts";
import {Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {ps as ds} from "../../vendor/m238.ts";
// @ts-nocheck
function b3t(e) {
  w7a.rm(e, {
    recursive: true,
    force: true,
    maxRetries: 3,
    retryDelay: 100
  }, () => {});
}
function $3n(e) {
  return PP.join(TF(), "speculation", String(process.pid), e);
}
function tdt(e, t) {
  return {
    behavior: "deny",
    message: e,
    decisionReason: {
      type: "other",
      reason: t
    }
  };
}
async function LOp(e, t, n) {
  let r = true,
    o;
  try {
    o = await IN.realpath(n);
  } catch {
    return false;
  }
  for (let s of t) {
    let i = PP.join(e, s),
      a = PP.join(n, s);
    try {
      try {
        if ((await IN.lstat(i)).isSymbolicLink()) {
          r = false, v(`[Speculation] Skipping symlink source ${s} in overlay`);
          continue;
        }
      } catch {
        r = false, v(`[Speculation] Failed to copy ${s} to main`);
        continue;
      }
      let l = PP.dirname(a),
        c = null;
      for (;;) try {
        c = await IN.realpath(l);
        break;
      } catch {
        let d = PP.dirname(l);
        if (d === l) break;
        l = d;
      }
      if (c === null || c !== o && !c.startsWith(o + PP.sep)) {
        r = false, v(`[Speculation] Skipping ${s}: parent dir escapes cwd via symlink`);
        continue;
      }
      await IN.mkdir(PP.dirname(a), {
        recursive: true
      });
      let u;
      try {
        u = await IN.lstat(a);
      } catch {}
      if (u?.isSymbolicLink()) try {
        await IN.unlink(a);
      } catch {
        r = false, v(`[Speculation] Failed to unlink symlink at ${s}`);
        continue;
      }
      await IN.copyFile(i, a);
    } catch {
      r = false, v(`[Speculation] Failed to copy ${s} to main`);
    }
  }
  return r;
}
function q3n(e, t, n, r, o, s, i) {
  j("tengu_speculation", {
    speculation_id: e,
    outcome: Ue(t),
    duration_ms: Date.now() - n,
    suggestion_length: r,
    tools_executed: Upo(o),
    completed: s !== null,
    boundary_type: s?.type,
    boundary_tool: MOp(s),
    boundary_detail: NOp(s),
    ...i
  });
}
function Upo(e) {
  let t = e.filter($po).flatMap(n => n.message.content).filter(n => typeof n === "object" && n !== null && "type" in n);
  return Gn(t, n => n.type === "tool_result" && !n.is_error);
}
function MOp(e) {
  if (!e) return;
  switch (e.type) {
    case "bash":
    case "edit":
    case "denied_tool":
      return e.toolName;
    case "complete":
      return;
  }
}
function NOp(e) {
  if (!e) return;
  switch (e.type) {
    case "bash":
      return e.command.slice(0, 200);
    case "edit":
      return e.filePath;
    case "denied_tool":
      return e.detail;
    case "complete":
      return;
  }
}
function $po(e) {
  return e.type === "user" && "message" in e && Array.isArray(e.message.content);
}
function removeOverlayDir(overlayDir) {
  let t = s => typeof s === "object" && s !== null && s.type === "tool_result" && typeof s.tool_use_id === "string",
    n = s => !s.is_error && !(typeof s.content === "string" && s.content.includes(aI)),
    r = new Set(overlayDir.filter($po).flatMap(s => s.message.content).filter(t).filter(n).map(s => s.tool_use_id)),
    o = s => s.type !== "thinking" && s.type !== "redacted_thinking" && !(s.type === "tool_use" && !r.has(s.id)) && !(s.type === "tool_result" && !r.has(s.tool_use_id)) && !(s.type === "text" && (s.text === MW || s.text === aI));
  return overlayDir.map(s => {
    if (!("message" in s) || !Array.isArray(s.message.content)) return s;
    let i = s.message.content.filter(o);
    if (i.length === s.message.content.length) return s;
    if (i.length === 0) return null;
    if (!i.some(l => l.type !== "text" || l.text !== undefined && l.text.trim() !== "")) return null;
    return {
      ...s,
      message: {
        ...s.message,
        content: i
      }
    };
  }).filter(s => s !== null);
}
function overlayDirForSpeculation(speculationId, t, n, r) {
  return null;
}
function denyDecision(message, reason) {
  message(n => {
    if (n.speculation.status !== "active") return n;
    let r = n.speculation,
      o = reason(r);
    if (!Object.entries(o).some(([i, a]) => r[i] !== a)) return n;
    return {
      ...n,
      speculation: {
        ...r,
        ...o
      }
    };
  });
}
function flushOverlayToCwd(overlayDir) {
  overlayDir(t => {
    if (t.speculation.status === "idle") return t;
    return {
      ...t,
      speculation: dke
    };
  });
}
function logSpeculationOutcome() {
  return v("[Speculation] enabled=false"), false;
}
async function countSuccessfulToolResults(messages, t, n, r, o) {
  try {
    let s = messages.toolUseContext.getAppState(),
      i = aYr(s);
    if (i) {
      TL(`pipeline_${i}`);
      return;
    }
    let a = {
        ...messages,
        messages: [...messages.messages, Ln({
          content: t
        }), ...n]
      },
      l = K1(o);
    if (l.signal.aborted) return;
    let c = MIn(),
      {
        suggestion: u,
        generationRequestId: d
      } = await cYr(l, c, iW(a));
    if (l.signal.aborted) return;
    if (uYr(u, c)) return;
    v(`[Speculation] Pipelined suggestion: "${u.slice(0, 50)}..."`), denyDecision(r, () => ({
      pipelinedSuggestion: {
        text: u,
        promptId: c,
        generationRequestId: d
      }
    }));
  } catch (s) {
    if (s instanceof Error && s.name === "AbortError") return;
    v(`[Speculation] Pipelined suggestion failed: ${Se(s)}`);
  }
}
async function boundaryToolName(boundary, t, n, r = false, o) {
  if (!logSpeculationOutcome()) return;
  isUserMessageWithContent(n);
  let s = v7a.randomUUID().slice(0, 8),
    i = K1(t.toolUseContext.abortController);
  if (i.signal.aborted) return;
  let a = Date.now(),
    l = {
      current: []
    },
    c = {
      current: new Set()
    },
    u = $3n(s),
    d = fV();
  try {
    await IN.mkdir(u, {
      recursive: true
    });
  } catch {
    v("[Speculation] Failed to create overlay directory");
    return;
  }
  let p = {
    current: t
  };
  n(m => ({
    ...m,
    speculation: {
      status: "active",
      id: s,
      abort: () => i.abort(),
      startTime: a,
      messagesRef: l,
      writtenPathsRef: c,
      boundary: null,
      suggestionLength: boundary.length,
      toolUseCount: 0,
      isPipelined: r,
      contextRef: p
    }
  })), v(`[Speculation] Starting speculation ${s}`);
  try {
    let m = await VH({
      promptMessages: [Ln({
        content: boundary
      })],
      cacheSafeParams: o ?? iW(t),
      skipTranscript: true,
      canUseTool: async (f, A) => {
        let h = POp.has(f.name),
          g = OOp.has(f.name);
        if (h || g) {
          let y = ndt(f, A, Lr(t.toolUseContext));
          if (y) return tdt(y.message, "speculation_network_path");
        }
        if (h) {
          let {
            mode: y,
            isBypassPermissionsModeAvailable: T
          } = Lr(t.toolUseContext);
          if (!(y === "acceptEdits" || y === "bypassPermissions" || y === "plan" && T)) {
            v(`[Speculation] Stopping at file edit: ${f.name}`);
            let C = "file_path" in A ? A.file_path : undefined;
            return denyDecision(n, () => ({
              boundary: {
                type: "edit",
                toolName: f.name,
                filePath: C ?? "",
                completedAt: Date.now()
              }
            })), i.abort(), tdt("Speculation paused: file edit requires permission", "speculation_edit_boundary");
          }
        }
        if (h || g) {
          let y = "notebook_path" in A ? "notebook_path" : "path" in A ? "path" : "file_path",
            T = A[y];
          if (T) {
            let S = PP.relative(d, T);
            if (PP.isAbsolute(S) || S.startsWith("..")) {
              if (h) return v(`[Speculation] Denied ${f.name}: path outside cwd: ${T}`), tdt("Write outside cwd not allowed during speculation", "speculation_write_outside_root");
              return {
                behavior: "allow",
                updatedInput: A,
                decisionReason: {
                  type: "other",
                  reason: "speculation_read_outside_root"
                }
              };
            }
            if (h) {
              if (!c.current.has(S)) {
                let C = PP.join(u, S);
                await IN.mkdir(PP.dirname(C), {
                  recursive: true
                });
                try {
                  await IN.copyFile(PP.join(d, S), C);
                } catch {}
                c.current.add(S);
              }
              A = {
                ...A,
                [y]: PP.join(u, S)
              };
            } else if (c.current.has(S)) A = {
              ...A,
              [y]: PP.join(u, S)
            };
            return v(`[Speculation] ${h ? "Write" : "Read"} ${T} -> ${A[y]}`), {
              behavior: "allow",
              updatedInput: A,
              decisionReason: {
                type: "other",
                reason: "speculation_file_access"
              }
            };
          }
          if (g) return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
              type: "other",
              reason: "speculation_read_default_cwd"
            }
          };
        }
        if (W1.includes(f.name)) {
          let y = "command" in A && typeof A.command === "string" ? A.command : "";
          if ("run_in_background" in A && A.run_in_background === true) return v(`[Speculation] Stopping at backgrounded ${f.name}: ${y.slice(0, 50)}`), denyDecision(n, () => ({
            boundary: {
              type: "bash",
              toolName: f.name,
              command: `[backgrounded] ${y}`,
              completedAt: Date.now()
            }
          })), i.abort(), tdt("Speculation paused: backgrounded shell", "speculation_bash_background");
          let T = f.inputSchema.safeParse({
              command: y
            }),
            S = f.name === Xo ? VIn({
              command: y
            }, E3t(y)).behavior === "allow" : T.success && f.isReadOnly(T.data);
          if (!y || !S) return v(`[Speculation] Stopping at ${f.name}: ${y.slice(0, 50) || "missing command"}`), denyDecision(n, () => ({
            boundary: {
              type: "bash",
              toolName: f.name,
              command: y,
              completedAt: Date.now()
            }
          })), i.abort(), tdt("Speculation paused: shell boundary", "speculation_bash_boundary");
          return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
              type: "other",
              reason: "speculation_readonly_bash"
            }
          };
        }
        v(`[Speculation] Stopping at denied tool: ${f.name}`);
        let _ = String("url" in A && A.url || "file_path" in A && A.file_path || "path" in A && A.path || "command" in A && A.command || "").slice(0, 200);
        return denyDecision(n, () => ({
          boundary: {
            type: "denied_tool",
            toolName: f.name,
            detail: _,
            completedAt: Date.now()
          }
        })), i.abort(), tdt(`Tool ${f.name} not allowed during speculation`, "speculation_unknown_tool");
      },
      querySource: "speculation",
      forkLabel: "speculation",
      maxTurns: IOp,
      overrides: {
        abortController: i,
        requireCanUseTool: true
      },
      onMessage: f => {
        if (f.type === "assistant" || f.type === "user") {
          if (l.current.push(f), l.current.length >= DOp) i.abort();
          if ($po(f)) {
            let A = Gn(f.message.content, h => h.type === "tool_result" && !h.is_error);
            if (A > 0) denyDecision(n, h => ({
              toolUseCount: h.toolUseCount + A
            }));
          }
        }
      }
    });
    if (i.signal.aborted) return;
    denyDecision(n, () => ({
      boundary: {
        type: "complete",
        completedAt: Date.now(),
        outputTokens: m.totalUsage.output_tokens
      }
    })), v(`[Speculation] Complete: ${Upo(l.current)} tools`), countSuccessfulToolResults(p.current, boundary, l.current, n, i);
  } catch (m) {
    if (i.abort(), m instanceof Error && m.name === "AbortError") {
      b3t(u), flushOverlayToCwd(n);
      return;
    }
    b3t(u), Ie(m instanceof Error ? m : Error("Speculation failed")), q3n(s, "error", a, boundary.length, l.current, null, {
      error_type: m instanceof Error ? m.name : "Unknown",
      error_message: Se(m).slice(0, 200),
      error_phase: Qe("start"),
      is_pipelined: r
    }), Pe("prompt_suggestion_speculate", "start_failed"), flushOverlayToCwd(n);
  }
}
async function boundaryDetail(boundary, t, n) {
  if (boundary.status !== "active") return null;
  let {
      id: r,
      messagesRef: o,
      writtenPathsRef: s,
      abort: i,
      startTime: a,
      suggestionLength: l,
      isPipelined: c
    } = boundary,
    u = o.current,
    d = $3n(r),
    p = Date.now();
  if (i(), n > 0) await LOp(d, s.current, fV());
  b3t(d);
  let m = boundary.boundary,
    f = Math.min(p, m?.completedAt ?? 1 / 0) - a;
  if (t(A => {
    if (A.speculation.status === "active" && A.speculation.boundary) m = A.speculation.boundary, f = Math.min(p, m.completedAt ?? 1 / 0) - a;
    return {
      ...A,
      speculation: dke,
      speculationSessionTimeSavedMs: A.speculationSessionTimeSavedMs + f
    };
  }), v(m === null ? `[Speculation] Accept ${r}: still running, using ${u.length} messages` : `[Speculation] Accept ${r}: already complete`), q3n(r, "accepted", a, l, u, m, {
    message_count: u.length,
    time_saved_ms: f,
    is_pipelined: c
  }), f > 0 && !XW()) {
    let A = {
      type: "speculation-accept",
      timestamp: new Date().toISOString(),
      timeSavedMs: f
    };
    jpo(() => IN.appendFile(Vf(), Oe(A) + `
`, {
      mode: 384
    }).then(() => {
      qpo(Vf(), [A]);
    })).catch(() => {
      v("[Speculation] Failed to write speculation-accept to transcript");
    });
  }
  return He("prompt_suggestion_speculate"), {
    messages: u,
    boundary: m,
    timeSavedMs: f
  };
}
function isUserMessageWithContent(message, t = "user_typed") {
  message(n => {
    if (n.speculation.status !== "active") return n;
    let {
      id: r,
      abort: o,
      startTime: s,
      boundary: i,
      suggestionLength: a,
      messagesRef: l,
      isPipelined: c
    } = n.speculation;
    return v(`[Speculation] Aborting ${r} (${t})`), q3n(r, "aborted", s, a, l.current, i, {
      abort_reason: t,
      is_pipelined: c
    }), o(), b3t($3n(r)), {
      ...n,
      speculation: dke
    };
  });
}
async function sanitizeSpeculationMessages(messages, t, n, r, o) {
  try {
    let {
      setMessages: s,
      readFileState: i,
      cwd: a
    } = o;
    n(g => {
      if (g.promptSuggestion.text === null && g.promptSuggestion.promptId === null) return g;
      return {
        ...g,
        promptSuggestion: {
          text: null,
          promptId: null,
          shownAt: 0,
          acceptedAt: 0,
          generationRequestId: null
        }
      };
    });
    let l = messages.messagesRef.current,
      c = removeOverlayDir(l),
      u = Ln({
        content: r
      });
    s(g => [...g, u]);
    let d = await boundaryDetail(messages, n, c.length),
      p = d?.boundary?.type === "complete";
    if (!p) {
      let g = c.findLastIndex(_ => _.type !== "assistant");
      c = c.slice(0, g + 1);
    }
    let m = d?.timeSavedMs ?? 0,
      f = t + m,
      A = overlayDirForSpeculation(c, d?.boundary ?? null, m, f);
    s(g => [...g, ...c]);
    let h = edt(c, a, RF);
    if (i.current = ktt(i.current, h), A) s(g => [...g, A]);
    if (v(`[Speculation] ${d?.boundary?.type ?? "incomplete"}, injected ${c.length} messages`), p && messages.pipelinedSuggestion) {
      let {
        text: g,
        promptId: _,
        generationRequestId: y
      } = messages.pipelinedSuggestion;
      v(`[Speculation] Promoting pipelined suggestion: "${g.slice(0, 50)}..."`), n(S => ({
        ...S,
        promptSuggestion: {
          text: g,
          promptId: _,
          shownAt: Date.now(),
          acceptedAt: 0,
          generationRequestId: y
        }
      }));
      let T = {
        ...messages.contextRef.current,
        messages: [...messages.contextRef.current.messages, Ln({
          content: r
        }), ...c]
      };
      boundaryToolName(g, T, n, true);
    }
    return {
      queryRequired: !p
    };
  } catch (s) {
    return Ie(s instanceof Error ? s : Error("handleSpeculationAccept failed")), q3n(messages.id, "error", messages.startTime, messages.suggestionLength, messages.messagesRef.current, messages.boundary, {
      error_type: s instanceof Error ? s.name : "Unknown",
      error_message: Se(s).slice(0, 200),
      error_phase: Qe("accept"),
      is_pipelined: messages.isPipelined
    }), Pe("prompt_suggestion_speculate", "accept_failed"), b3t($3n(messages.id)), flushOverlayToCwd(n), {
      queryRequired: true
    };
  }
}
var v7a,
  w7a,
  IN,
  PP,
  IOp = 20,
  DOp = 100,
  POp,
  OOp,
  R7a = 30000;
var initSpeculationModule = b(() => {
  ct();
  pke();
  SL();
  w1t();
  uh();
  nr();
  Xl();
  je();
  St();
  Ck();
  hP();
  ds();
  wn();
  lo();
  aA();
  oqe();
  ry();
  za();
  cA();
  Xt();
  cn();
  Ct();
  G$e();
  v7a = require("crypto"), w7a = require("fs"), IN = require("fs/promises"), PP = require("path"), POp = new Set(["Edit", "Write", "NotebookEdit"]), OOp = new Set(["Read", "Glob", "Grep", "ToolSearch", "LSP", "TaskGet", "TaskList"]);
});

export {b3t as G3t,$3n as k4n,tdt as vdt,LOp as f1p,q3n as H4n,Upo as Kmo,MOp as A1p,NOp as h1p,$po as zmo,removeOverlayDir as g1p,overlayDirForSpeculation as _1p,denyDecision as _6e,flushOverlayToCwd as Vmo,logSpeculationOutcome as lJr,countSuccessfulToolResults as y1p,boundaryToolName as cJr,boundaryDetail as T1p,isUserMessageWithContent as Wce,sanitizeSpeculationMessages as YKa,v7a as VKa,w7a as KKa,IN as NN,PP as OP,IOp as u1p,DOp as d1p,POp as p1p,OOp as m1p,R7a as zKa,initSpeculationModule as Yot};
