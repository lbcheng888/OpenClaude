// @ts-nocheck
import {isFullscreenWithTTY as pt,b,ro as Pr} from "../../runtime.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {PERMISSION_MODES as gB,U2 as I3} from "../../vendor/m716.ts";
import {clt as hBn,h4e as _Ut,A4e as gUt,wT as yT,Ln,SS as mS,slt as Fat,lo} from "../tools/5190_userPromptCount.ts";
import {rZ as KQ} from "../../vendor/m2207.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {addInvokedSkill as Pgt,getSessionId as kt,getOriginalCwd as gr,lt as ct} from "../session/0131_sent.ts";
import {seedSentSkillNames as Fro,suppressNextSkillListing as Bro,Bv as Pv} from "../agent/4429_tryGetPDFReference.ts";
import {loadTranscriptFile as Gle,buildConversationChain as Tge,removeExtraFields as $at,loadMessageLogs as fBn,getSessionIdFromLog as Ah,getLastSessionLog as qat,isLiteLog as ote,loadFullLog as Sge,checkResumeConsistency as Uro,findDeferredToolMarkerInTranscript as $ro,getCurrentSessionTitle as fh,cacheHookSessionTitle as G3e,ja as za} from "./5143_writeRemoteAgentMetadata.ts";
import {rlt as Nat,Ooo as Lro} from "../../vendor/m3865.ts";
import {zxe as Hxe,eI as M0} from "../telemetry/3157_error.ts";
import {isTmuxControlMode as Bt,Ie as He,Oe as Pe,ln as cn} from "../telemetry/0594_feature_name.ts";
import {eFn as ABn,yx as Ax} from "../core/5144_encoding.ts";
import {qT as LT,zE as jE} from "../../vendor/m125.ts";
import {YBn as uBn,_6 as s6} from "../session/3862_trackSequence.ts";
import {nW as U5,Snt as ont,lxe as WRe} from "../../vendor/m2768.ts";
import {tu as Qc,_9 as r9} from "../config/3864_entrypoint.ts";
import {Oge as gge,PUt as dUt} from "../telemetry/3863_stdout.ts";
import {sk as tk,QT as GT} from "../../vendor/m642.ts";
import {j$ as vF,HRe as IAe} from "../../vendor/m2692.ts";
import {rwn as Tvn} from "../../vendor/m2693.ts";
// @ts-nocheck
var DGK = {};
pt(DGK, {
  restoreSkillStateFromMessages: () => restoreSkillStateFromMessages_2,
  removeInterruptedMessage: () => removeInterruptedMessage,
  loadMessagesFromJsonlPath: () => loadMessagesFromJsonlPath,
  loadConversationForResume: () => loadConversationForResume,
  getResumePrompt: () => getResumePrompt_2,
  findLiveNonInteractiveSession: () => findLiveNonInteractiveSession,
  dropRetractedMessages: () => dropRetractedMessages_2,
  deserializeMessagesWithInterruptDetection: () => deserializeMessagesWithInterruptDetection,
  deserializeMessages: () => deserializeMessages,
  dedupeSessionStartHookMessages: () => dedupeSessionStartHookMessages
});
function rOO() {
  return new Set([...fGK, ...(process.env.CLAUDE_CODE_TERMINAL_MCP_TOOLS ?? "").split(",").map(e => e.trim()).filter(Boolean)]);
}
function oOO(H) {
  if (H.type !== "attachment") return H;
  let _ = H.attachment;
  if (V4H.has(_.type)) return null;
  if (_.type === "new_file") return {
    ...H,
    attachment: {
      ..._,
      type: "file",
      displayPath: dOO.relative(Pt(), _.filename)
    }
  };
  if (_.type === "new_directory") return {
    ...H,
    attachment: {
      ..._,
      type: "directory",
      displayPath: dOO.relative(Pt(), _.path)
    }
  };
  if (!("displayPath" in _)) {
    let n = "filename" in _ ? _.filename : "path" in _ ? _.path : "skillDir" in _ ? _.skillDir : undefined;
    if (n) return {
      ...H,
      attachment: {
        ..._,
        displayPath: dOO.relative(Pt(), n)
      }
    };
  }
  return H;
}
function getResumePrompt(e) {
  if (e.type !== "assistant" && e.type !== "user") return null;
  let t = e.message.content;
  if (!Array.isArray(t)) return null;
  let n = t.filter(r => r.type !== "text" || typeof r.text === "string");
  if (n.length === t.length) return null;
  return {
    ...e,
    message: {
      ...e.message,
      content: n
    }
  };
}
function getResumePrompt_2() {
  return process.env.CLAUDE_CODE_RESUME_PROMPT || "Continue from where you left off.";
}
function removeInterruptedMessage(H, t) {
  let n = H.findIndex(r => r.uuid === t.uuid);
  if (n !== -1) H.splice(n, 2);
}
function deserializeMessages(H) {
  return deserializeMessagesWithInterruptDetection(H).messages;
}
function deserializeMessagesWithInterruptDetection(H, t) {
  try {
    let n = dropRetractedMessages_2(H),
      r = 0,
      o = n.map(oOO).filter(p => p !== null).flatMap(p => {
        let m = getResumePrompt(p);
        if (m === null) return [p];
        r += 1;
        let f = m.message.content;
        if (Array.isArray(f) && f.length === 0) return [];
        return [m];
      });
    if (r > 0) v(`deserializeMessages: dropped non-string text block(s) from ${r} message(s) \u2014 interrupted-stream artifact`, {
      level: "warn"
    });
    let s = new Set(gB);
    for (let p of o) if (p.type === "user" && p.permissionMode !== undefined && !s.has(p.permissionMode)) p.permissionMode = undefined;
    let i = hBn(o, t),
      a = _Ut(i),
      l = gUt(a),
      c = t?.size ? {
        kind: "none"
      } : sOO(l),
      u;
    if (c.kind === "interrupted_turn") {
      let [p] = yT([Ln({
        content: getResumePrompt_2(),
        isMeta: true
      })]);
      l.push(p), u = {
        kind: "interrupted_prompt",
        message: p
      };
    } else u = c;
    let d = l.findLastIndex(p => p.type !== "system" && p.type !== "progress");
    if (d !== -1 && l[d].type === "user") l.splice(d + 1, 0, mS({
      content: KQ
    }));
    return {
      messages: l,
      turnInterruptionState: u
    };
  } catch (n) {
    throw Ie(n), n;
  }
}
function sOO(H) {
  if (H.length === 0) return {
    kind: "none"
  };
  let t = H.findLastIndex(r => r.type !== "system" && r.type !== "progress" && !(r.type === "assistant" && r.isApiErrorMessage && r.message.stop_reason !== "refusal")),
    n = t !== -1 ? H[t] : undefined;
  if (!n) return {
    kind: "none"
  };
  if (n.type === "assistant") {
    if (n.isApiErrorMessage) j("tengu_refusal_turn_classified_complete", {});
    return {
      kind: "none"
    };
  }
  if (n.type === "user") {
    if (n.isMeta || n.isCompactSummary) return {
      kind: "none"
    };
    if (Fat(n)) {
      if (restoreSkillStateFromMessages(n, H, t)) return {
        kind: "none"
      };
      return {
        kind: "interrupted_turn"
      };
    }
    return {
      kind: "interrupted_prompt",
      message: n
    };
  }
  if (n.type === "attachment") {
    for (let r = t - 1; r >= 0; r--) {
      let o = H[r];
      if (o.type === "system" || o.type === "progress" || o.type === "attachment" || o.type === "assistant" && o.isApiErrorMessage && o.message.stop_reason !== "refusal") continue;
      if (o.type === "assistant" && o.isApiErrorMessage && o.message.stop_reason === "refusal") return j("tengu_refusal_turn_classified_complete", {}), {
        kind: "none"
      };
      if (o.type === "user" && Fat(o) && restoreSkillStateFromMessages(o, H, r)) return {
        kind: "none"
      };
      break;
    }
    return {
      kind: "interrupted_turn"
    };
  }
  return {
    kind: "none"
  };
}
function restoreSkillStateFromMessages(H, t, n) {
  let r = H.message.content;
  if (!Array.isArray(r)) return false;
  let o = r[0];
  if (o?.type !== "tool_result") return false;
  let s = o.tool_use_id;
  for (let i = n - 1; i >= 0; i--) {
    let a = t[i];
    if (a.type !== "assistant") continue;
    for (let l of a.message.content) if (l.type === "tool_use" && l.id === s) return l.name === lOO || l.name === nOO || l.name === iOO || rOO().has(l.name) && !o.is_error;
  }
  return false;
}
function restoreSkillStateFromMessages_2(H) {
  for (let t of H) {
    if (t.type !== "attachment") continue;
    if (t.attachment.type === "invoked_skills") {
      for (let n of t.attachment.skills) if (n.name && n.path && n.content) Pgt(n.name, n.path, n.content, null);
    }
    if (t.attachment.type === "skill_listing") if (t.attachment.names) Fro(t.attachment.names);else Bro();
  }
}
async function loadMessagesFromJsonlPath(H) {
  let {
      messages: t,
      leafUuids: n
    } = await Gle(H),
    r = null,
    o = 0;
  for (let i of t.values()) {
    if (i.isSidechain || !n.has(i.uuid)) continue;
    let a = new Date(i.timestamp).getTime();
    if (a > o) o = a, r = i;
  }
  if (!r) return {
    messages: [],
    sessionId: undefined
  };
  let s = Tge(t, r);
  return {
    messages: $at(s),
    sessionId: r.sessionId
  };
}
async function findLiveNonInteractiveSession(H) {
  let t = await Promise.resolve().then(() => (Nat(), Lro)).then(n => n.listAllLiveSessions()).catch(() => []);
  for (let n of t) if (n.sessionId === H && n.kind && n.kind !== "interactive") return {
    kind: n.kind
  };
  return null;
}
function dedupeSessionStartHookMessages(H, t) {
  if (t.length === 0) return [];
  let n = new Set();
  for (let s of H) for (let i of t6q(s)) n.add(i);
  if (n.size === 0) return [...t];
  let r = false,
    o = [];
  for (let s of t) {
    let i = t6q(s);
    if (i.length === 0 || s.type !== "attachment") {
      o.push(s);
      continue;
    }
    let a = s.attachment;
    if (a.type === "hook_additional_context" && a.content.length > 1) {
      let l = a.content.filter(c => !n.has(dropRetractedMessages(c)));
      if (l.length === 0) continue;
      r = true, o.push(l.length === a.content.length ? s : {
        ...s,
        attachment: {
          ...a,
          content: l
        }
      });
      continue;
    }
    if (n.has(i[0])) continue;
    r = true, o.push(s);
  }
  if (!r) return [];
  return o;
}
function t6q(H) {
  if (H.type !== "attachment") return [];
  let t = H.attachment;
  if (!("hookEvent" in t) || t.hookEvent !== "SessionStart") return [];
  if (t.type === "hook_additional_context") return t.content.map(dropRetractedMessages);
  if (t.type === "hook_success" && t.content !== "") return [dropRetractedMessages(t.content)];
  return [];
}
function dropRetractedMessages(H) {
  if (!H.startsWith(Hxe)) return H;
  return H.replace(/(Full output saved to: ).*$/m, "$1<persisted>");
}
function dropRetractedMessages_2(H) {
  let t = new Set(H.flatMap(r => r.type === "system" && r.subtype === "model_refusal_fallback" && r.retractedMessageUuids !== undefined ? r.retractedMessageUuids.map(o => o.slice(0, LIa)) : []));
  if (t.size === 0) return H;
  let n = H.filter(r => r.type === "system" || !t.has(r.uuid.slice(0, LIa)));
  if (n.length !== H.length) j("tengu_resume_retracted_dropped", {
    dropped: H.length - n.length,
    chain_length: H.length
  });
  return n;
}
async function loadConversationForResume(H, t, n) {
  try {
    let r = null,
      o = null,
      s;
    if (H === undefined) {
      let p = fBn(),
        m = new Set();
      try {
        let {
            listAllLiveSessions: A
          } = await Promise.resolve().then(() => (Nat(), Lro)),
          h = await A();
        m = new Set(h.flatMap(g => g.kind && g.kind !== "interactive" && g.sessionId ? [g.sessionId] : []));
      } catch {}
      r = (await p).find(A => {
        if (A.sessionKind) return false;
        let h = Ah(A);
        return !h || !m.has(h);
      }) ?? null;
    } else if (t) {
      let p = await loadMessagesFromJsonlPath(t);
      o = p.messages, s = p.sessionId;
    } else if (typeof H === "string") r = (await qat(H)) ?? (await Fmp(H)), s = H;else r = H;
    if (!r && !o) return Bt("session_resume", "not_found"), null;
    if (r) {
      if (ote(r)) r = await Sge(r);
      if (!s) s = Ah(r);
      if (s) await ABn(r, LT(s));
      uBn(r, !n.forkSession && s ? LT(s) : undefined), o = r.messages, Uro(o);
    }
    o = dropRetractedMessages_2(o), restoreSkillStateFromMessages_2(o);
    let i = r?.fullPath ?? t,
      a = i ? (await $ro(i)) ?? undefined : undefined,
      l = deserializeMessagesWithInterruptDetection(o, a ? new Set([a.toolUseID]) : undefined);
    o = l.messages;
    let c = performance.now(),
      u = await U5("resume", {
        sessionId: s,
        sessionTitle: fh(kt()) ?? r?.customTitle
      });
    Qc("hooks_init_ms", performance.now() - c, c);
    let d = ont();
    if (d) G3e(d);
    return o.push(...dedupeSessionStartHookMessages(o, u)), He("session_resume"), {
      messages: o,
      turnInterruptionState: l.turnInterruptionState,
      deferredToolUse: a,
      fileHistorySnapshots: r?.fileHistorySnapshots,
      attributionSnapshots: r?.attributionSnapshots,
      contentReplacements: r?.contentReplacements,
      contextCollapseCommits: r?.contextCollapseCommits,
      contextCollapseSnapshot: r?.contextCollapseSnapshot,
      sessionId: s,
      agentName: r?.agentName,
      agentColor: r?.agentColor,
      agentSetting: r?.agentSetting,
      customTitle: r?.customTitle,
      aiTitle: r?.aiTitle,
      tag: r?.tag,
      mode: r?.mode,
      permissionMode: r?.permissionMode,
      isolationLatch: r?.isolationLatch,
      worktreeSession: r?.worktreeSession,
      prNumber: r?.prNumber,
      prUrl: r?.prUrl,
      prRepository: r?.prRepository,
      bridgeSessionId: r?.bridgeSessionId,
      bridgeLastSeq: r?.bridgeLastSeq,
      bridgeDialogKinds: r?.bridgeDialogKinds,
      fullPath: r?.fullPath
    };
  } catch (r) {
    throw Pe("session_resume", "load_failed"), Ie(r), r;
  }
}
async function Fmp(e) {
  for (let t of await gge(gr())) for (let n of await tk(t)) {
    let r = await qat(e, dOO.join(n, `${e}.jsonl`));
    if (r) return j("tengu_resume_worktree_fallback", {}), r;
  }
  return null;
}
var dOO,
  lOO,
  nOO,
  iOO,
  fGK,
  V4H,
  LIa = 24;
var Wle = b(() => {
  Ct();
  Ko();
  ct();
  cn();
  jE();
  I3();
  Pv();
  je();
  s6();
  dUt();
  wn();
  lo();
  Ax();
  WRe();
  za();
  GT();
  r9();
  M0();
  dOO = require("path"), lOO = (vF(), Pr(IAe)).BRIEF_TOOL_NAME, nOO = (vF(), Pr(IAe)).LEGACY_BRIEF_TOOL_NAME, iOO = Pr(Tvn).SEND_USER_FILE_TOOL_NAME, fGK = new Set(["mcp__slackbot__reply", "mcp__slackbot__react", "mcp__slackbot__no_reply_needed", "mcp__slackbot__post_message", "mcp__slackbot__upload_file", "mcp__slackbot__update_reply"]);
  V4H = new Set(["compaction_reminder", "companion_intro", "echo_activities", "pen_mode_enter", "pen_mode_exit"]);
});

export {DGK as J0a,rOO as rhp,oOO as shp,getResumePrompt as ihp,getResumePrompt_2 as getResumePrompt,removeInterruptedMessage,deserializeMessages,deserializeMessagesWithInterruptDetection,sOO as ahp,restoreSkillStateFromMessages as G0a,restoreSkillStateFromMessages_2 as restoreSkillStateFromMessages,loadMessagesFromJsonlPath,findLiveNonInteractiveSession,dedupeSessionStartHookMessages,t6q as V0a,dropRetractedMessages as Loo,dropRetractedMessages_2 as dropRetractedMessages,loadConversationForResume,Fmp as lhp,dOO as olt,lOO as ZAp,nOO as ehp,iOO as thp,fGK as nhp,V4H as ohp,LIa as K0a,Wle as tce};
