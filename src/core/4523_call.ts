// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {WA as Dv,fW as M5} from "../api/4438_type.ts";
import {executePreCompactHooks as zY} from "../../vendor/m5188.ts";
import {VWn as Nqn,Lbo as BAo,cft as Fdt,j$ as i9,l6 as I6,jpt as Tut,uft as Udt,dee as oee} from "../permissions/4431_prompt.ts";
import {J8n as W4n,OSo as Lfo,p6e as i4e} from "../telemetry/4388_hasAttempted.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {Ce as Se,$c as ju,EX as fX,Ct as St} from "../../vendor/m197.ts";
import {jte as Vte,Kmt as bdt} from "../../vendor/m4386.ts";
import {j$e as T2e,bot as Ztt} from "../../vendor/m2768.ts";
import {Py as sS,AE as mE,y$ as X4} from "../config/2734_duration_ms.ts";
import {Iwe as Dwe,oS as rS} from "../config/2605_event_name.ts";
import {wSo as xfo,Vmt as Sdt,HSo as Hfo,K8n as U4n,j8n as q4n} from "../agent/4386_reason.ts";
import {k6e as I4e,V9n as IFn} from "../../vendor/m4002.ts";
import {KR as Bw,NZ as HZ} from "../telemetry/2478_action.ts";
import {bt as gt,Gc as au} from "../../vendor/m588.ts";
import {ux as z0,CG as FW} from "../agent/5206_len.ts";
import {Mr as Lr,xl as Xl} from "../../vendor/m4427.ts";
import {Fq as d6,Nqe as Y3e} from "../telemetry/3894_mainThreadAgentDefinition.ts";
import {P_ as w_,po as lo} from "../tools/5224_userPromptCount.ts";
import {D4 as Z4} from "../session/2737_V4i.ts";
import {Fbo as $Ao} from "../session/4432_prefixTokens.ts";
import {f1 as V1} from "../../vendor/m4432.ts";
import {Wd as Tp} from "../tools/5204_shouldSkipHookDueToTrust.ts";
// @ts-nocheck
var vDq = {};
pt(vDq, {
  call: () => call_2
});
async function call(H, _, n) {
  _.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "hooks_start",
      hookType: "pre_compact"
    }
  }), _.onCompactEvent?.({
    type: "sdk_status",
    status: "compacting"
  });
  let r = performance.now(),
    o,
    s = Dv(H),
    i,
    a;
  try {
    let [l, c] = await Promise.all([zY({
      trigger: "manual",
      customInstructions: n || null
    }, _.abortController.signal), fol(_, H)]);
    Nqn(l, A => _.onQueryEvent?.({
      type: "notification",
      notification: A
    }));
    let u = BAo(n, l.newCustomInstructions);
    _.onCompactEvent?.({
      type: "stream_mode",
      mode: "requesting"
    }), _.onQueryEvent?.({
      type: "response_length",
      op: "reset"
    }), _.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "compact_start"
      }
    });
    let d = await xqp(n, l.newCustomInstructions, H, _.abortController.signal);
    a = d.reuse;
    let p = await (d.hit ? W4n({
      ...d.finalize,
      startTime: r,
      cacheSafeParams: c
    }) : Lfo(H, c, {
      customInstructions: u,
      trigger: "manual",
      manualPrecomputeReuse: d.reuse,
      userWaitStartedAt: r,
      precomputedKind: d.precomputedKind,
      precomputedFailureCause: d.precomputedFailureCause
    })).catch(A => (Ie(A), {
      ok: false,
      reason: "error",
      detail: Se(A)
    }));
    if (!p.ok) switch (p.reason) {
      case "too_few_groups":
        throw Error(Fdt);
      case "aborted":
        throw Error(i9);
      case "exhausted":
        throw new I6("Compaction failed \xB7 conversation could not be reduced below the context limit");
      case "media_unstrippable":
        throw new I6("Compaction failed \xB7 attached media exceeds size limits");
      case "error":
        throw new I6(`Error during compaction: ${p.detail || "unknown error"}`);
    }
    let m = p.result.boundaryMarker;
    if (m.subtype === "compact_boundary" && "compactMetadata" in m) i = m.compactMetadata.postTokens;
    Vte(undefined, _.setAppState), T2e(), sS.cache.clear?.();
    let f = [l.userDisplayMessage, p.result.userDisplayMessage].filter(Boolean).join(`
`) || undefined;
    return {
      type: "compact",
      compactionResult: {
        ...p.result,
        userDisplayMessage: f
      },
      displayText: mol(_, f)
    };
  } catch (l) {
    throw o = l instanceof Error ? l.message : "reactive compaction failed", l;
  } finally {
    _.onCompactEvent?.({
      type: "stream_mode",
      mode: "requesting"
    }), _.onQueryEvent?.({
      type: "response_length",
      op: "reset"
    }), _.onCompactEvent?.({
      type: "compact_progress",
      event: {
        type: "compact_end"
      }
    }), Dwe({
      trigger: "manual",
      success: !o,
      durationMs: performance.now() - r,
      preTokens: s,
      postTokens: i,
      error: o,
      precomputeReuse: a
    }), _.onCompactEvent?.({
      type: "sdk_status",
      status: null,
      metadata: {
        compactResult: o ? "failed" : "success",
        ...(o && {
          compactError: o
        })
      }
    });
  }
}
async function xqp(e, t, n, r) {
  if (e) return {
    hit: false,
    reuse: "miss_custom_instructions"
  };
  if (t) return {
    hit: false,
    reuse: "miss_hook"
  };
  let o = performance.now(),
    s = await xfo(undefined, r),
    i = performance.now() - o;
  if (s === null) return Sdt("none", s, i), {
    hit: false,
    reuse: "miss_not_ready",
    precomputedKind: "none"
  };
  if (s.kind === "turn_aborted") throw Sdt("aborted", s, i), Error(i9);
  if (s.kind === "failed") return Sdt("failed", s, i), {
    hit: false,
    reuse: "miss_not_ready",
    precomputedKind: "failed",
    precomputedFailureCause: s.failure.cause
  };
  let a = Hfo(n, s.ready.precomputedAtUuid);
  if (a === null) return Sdt("none", s, i), U4n(s.ready, "boundary_uuid_missing", undefined), {
    hit: false,
    reuse: "miss_not_ready",
    precomputedKind: "none"
  };
  return Sdt("applied", s, i), {
    hit: true,
    reuse: "hit",
    finalize: {
      compactResult: s.ready.result,
      messagesToPreserve: [...s.ready.result.messagesToPreserve, ...a],
      preCompactMessages: n,
      querySource: undefined,
      trigger: "manual",
      precomputed: true,
      manualPrecomputeReuse: "hit",
      precomputeTelemetry: {
        statusAtPTL: s.statusAtPTL === "ready" ? "ready" : "pending",
        leadMs: o - s.ready.startedAt,
        totalMs: s.ready.readyDurationMs,
        borrowed: false,
        messagesSinceTokens: Dv(a)
      }
    }
  };
}
function mol(e, t) {
  let n = I4e("tip"),
    r = Bw("app:toggleTranscript", "Global", "ctrl+o"),
    o = [...(e.options.verbose ? [] : [`(${r} to see full summary)`]), ...(t ? [t] : []), ...(n ? [n] : [])];
  return gt.dim("Compacted " + o.join(`
`));
}
async function fol(e, t) {
  let n = e.getAppState(),
    r = await z0(e.options.tools, e.options.mainLoopModel, Array.from(Lr(e).additionalWorkingDirectories.keys())),
    o = d6({
      mainThreadAgentDefinition: undefined,
      toolUseContext: e,
      customSystemPrompt: e.options.customSystemPrompt,
      defaultSystemPrompt: r,
      appendSystemPrompt: e.options.appendSystemPrompt
    }),
    [s, i] = await Promise.all([sS(), mE(n.cacheBreakerPhrase)]);
  return {
    systemPrompt: o,
    userContext: s,
    systemContext: i,
    toolUseContext: e,
    forkContextMessages: t
  };
}
var call_2 = async (e, t) => {
  let {
      abortController: n
    } = t,
    {
      messages: r
    } = t;
  if (r = w_(r), r.length === 0) throw Error("No messages to compact");
  let o = e.trim();
  try {
    if (!Z4()) return await call(r, t, o);
    let s = await Tut(r, t, await fol(t, r), false, o, false, undefined, $Ao(), undefined, i => t.onQueryEvent?.({
      type: "notification",
      notification: i
    }), i => t.onQueryEvent?.(i));
    return T2e(), sS.cache.clear?.(), Vte(undefined, t.setAppState), {
      type: "compact",
      compactionResult: s,
      displayText: mol(t, s.userDisplayMessage)
    };
  } catch (s) {
    if (t.onCompactEvent?.({
      type: "sdk_status",
      status: null,
      metadata: {
        compactResult: "failed",
        compactError: s instanceof Error ? s.message : String(s)
      }
    }), n.signal.aborted) throw new ju("Compaction canceled.");else if (fX(s, Fdt)) return {
      type: "text",
      value: Fdt
    };else if (fX(s, Udt)) throw Error(Udt);else if (s instanceof I6) return {
      type: "text",
      value: s.message
    };else throw Ie(s), Error(`Error during compaction: ${s instanceof Error ? s.message : String(s)}`, {
      cause: s
    });
  }
};
var hol = b(() => {
  au();
  FW();
  X4();
  HZ();
  V1();
  oee();
  Ztt();
  bdt();
  q4n();
  i4e();
  M5();
  Xl();
  St();
  Tp();
  wn();
  lo();
  IFn();
  Y3e();
  rS();
});
export {vDq as xpl,call as WYp,xqp as GYp,mol as Hpl,fol as Ipl,call_2 as qYp,hol as Dpl};
