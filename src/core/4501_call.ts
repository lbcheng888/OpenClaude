// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {Nv as Dv,Z5 as M5} from "../api/4416_type.ts";
import {executePreCompactHooks as zY} from "../../vendor/m5155.ts";
import {w6n as Nqn,qho as BAo,cpt as Fdt,S9 as i9,j6 as I6,Vut as Tut,upt as Udt,fee as oee} from "../permissions/4409_prompt.ts";
import {Iqn as W4n,jAo as Lfo,H4e as i4e} from "../telemetry/4366_hasAttempted.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Se,vu as ju,CX as fX,bt as St} from "../../vendor/m195.ts";
import {nne as Vte,Vdt as bdt} from "../../vendor/m4364.ts";
import {q2e as T2e,hnt as Ztt} from "../../vendor/m2756.ts";
import {pS as sS,hE as mE,dq as X4} from "../config/2722_duration_ms.ts";
import {Kwe as Dwe,uS as rS} from "../config/2594_event_name.ts";
import {MAo as xfo,Gdt as Sdt,BAo as Hfo,Rqn as U4n,kqn as q4n} from "../agent/4364_reason.ts";
import {Z4e as I4e,gUn as IFn} from "../../vendor/m3940.ts";
import {qw as Bw,UZ as HZ} from "../telemetry/2468_action.ts";
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {J0 as z0,oG as FW} from "../agent/5173_len.ts";
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {E6 as d6,T4e as Y3e} from "../telemetry/3876_mainThreadAgentDefinition.ts";
import {allTools as w_,lo} from "../tools/5190_userPromptCount.ts";
import {mq as Z4} from "../session/2725_iFi.ts";
import {Gho as $Ao} from "../session/4410_prefixTokens.ts";
import {nN as V1} from "../../vendor/m4410.ts";
import {yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
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

export {vDq as qsl,call as i8p,xqp as a8p,mol as Usl,fol as $sl,call_2 as s8p,hol as jsl};
