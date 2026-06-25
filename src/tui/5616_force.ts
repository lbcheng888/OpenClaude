// @ts-nocheck
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {getLastMainThreadCacheTtlMs as aSt,lt} from "../session/0132_sent.ts";
import {gc,_t,uo} from "../../vendor/m2468.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {zk,nB} from "../api/2752_status.ts";
import {A3n,yce} from "../../vendor/m4046.ts";
import {e4t,G3n} from "../../vendor/m4080.ts";
import {mee,ef} from "../../vendor/m2794.ts";
import {pke,age} from "../config/2703_reason.ts";
import {gBt,A3e} from "../permissions/3312_recap.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {X6l,po} from "../tools/5224_userPromptCount.ts";
import {iz,WUe,GUe} from "../../vendor/m2276.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {cPo,a_t} from "../session/5157_confirmed.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
// @ts-nocheck

/** True for a real user message (not meta/compact-summary/virtual). */
function Inr(message: any): boolean {
  return message.type === "user" && !message.isMeta && !message.isCompactSummary && !message.isVirtual;
}

/** True when the last entry in the transcript is an away-summary system message. */
function ycc(messages: any[]): boolean {
  let last = messages.at(-1);
  return last?.type === "system" && last.subtype === "away_summary";
}

/**
 * True when a recent assistant message already contains a StructuredOutput
 * recap (a tool_use whose name is Rp carrying non-empty text). Scans from the
 * end and stops once a real user message is reached.
 */
function Tcc(messages: any[]): boolean {
  for (let i = messages.length - 1; i >= 0; i--) {
    let entry = messages[i];
    if (Inr(entry)) return !1;
    if (entry.type !== "assistant") continue;
    let block = entry.message.content[0];
    if (block?.type === "tool_use" && block.name === Rp) {
      let text = block.input?.text;
      if (typeof text === "string" && text.length > 0) return !0;
    }
  }
  return !1;
}

/**
 * Returns whether enough new user turns have accrued (since the last away
 * summary, if any) to warrant generating another recap.
 */
function yGm(messages: any[]): boolean {
  let userCount = 0,
    lastSummaryIndex = -1;
  for (let i = 0; i < messages.length; i++) {
    let entry = messages[i];
    if (Inr(entry)) userCount++;
    if (entry.type === "system" && entry.subtype === "away_summary") lastSummaryIndex = i;
  }
  if (userCount < gGm) return !1;
  if (lastSummaryIndex === -1) return !0;
  let userCountSinceSummary = 0;
  for (let i = lastSummaryIndex + 1; i < messages.length; i++) if (Inr(messages[i])) userCountSinceSummary++;
  return userCountSinceSummary >= _Gm;
}

/** Removes the away-summary job marker file, then forces a recap. */
async function TGm(jobFilePath: string, isFocusedRef: any, generateRef: any): Promise<void> {
  if (isFocusedRef.current) return;
  try {
    await Scc.unlink(jobFilePath);
  } catch {
    return;
  }
  generateRef.current?.({
    force: !0
  });
}

/**
 * Hook driving away-summary ("recap") generation: watches focus/blur, cache
 * staleness and rate limits, and appends a generated recap message when the
 * user returns after being away.
 */
function Ecc(messages: any[], setMessages: any, isFocused: boolean, scrollOffsetRef: any, enabled: boolean = !0): void {
  let clock = As(),
    abortControllerRef = EP.useRef(null),
    recapCountRef = EP.useRef(0),
    messagesRef = EP.useRef(messages),
    isFocusedRef = EP.useRef(isFocused),
    generateRef = EP.useRef(null),
    cacheStartRef = EP.useRef(null),
    cacheTtlRef = EP.useRef(null),
    delayMsRef = EP.useRef(g2o),
    blurAtRef = EP.useRef(null),
    focusedAtRef = EP.useRef(null),
    blurDurationRef = EP.useRef(null),
    returnedRef = EP.useRef(!1),
    hadRecapRef = EP.useRef(!1);
  if (messagesRef.current = messages, isFocusedRef.current && !isFocused) cacheStartRef.current = Date.now(), cacheTtlRef.current = aSt();
  isFocusedRef.current = isFocused;
  let taskStore = gc(),
    awaySummaryEnabled = _t(state => state.awaySummaryEnabled),
    isActive = enabled && awaySummaryEnabled,
    configuredDelayMs = it("tengu_sedge_lantern_config", {
      delayMs: g2o
    })?.delayMs;
  delayMsRef.current = typeof configuredDelayMs === "number" && Number.isFinite(configuredDelayMs) ? Math.max(30000, configuredDelayMs) : g2o, EP.useEffect(() => {
    if (!isActive) return;
    function cancel() {
      abortControllerRef.current?.abort(), abortControllerRef.current = null;
    }
    async function generate(options) {
      let cacheStart = cacheStartRef.current,
        cacheTtl = cacheTtlRef.current;
      if (cacheStart === null || cacheTtl === null) {
        A("[awaySummary] skipped: cache age unknown");
        return;
      }
      if (Date.now() - cacheStart > cacheTtl * 0.9) {
        A("[awaySummary] skipped: cache stale");
        return;
      }
      if (!options?.force && !0 && zk.status !== "allowed") {
        A("[awaySummary] skipped: at or near rate limit");
        return;
      }
      if (!options?.force && A3n() !== "") {
        A("[awaySummary] skipped: draft input present");
        return;
      }
      if (!options?.force) {
        let {
          pendingAgents,
          pendingWorkflows
        } = e4t({
          tasks: taskStore.getState().tasks,
          queuedCommands: mee()
        });
        if (pendingAgents > 0 || pendingWorkflows > 0) {
          A("[awaySummary] skipped: background work pending");
          return;
        }
      }
      if (!options?.force && pke()) {
        A("[awaySummary] skipped: loop wakeup pending");
        return;
      }
      if (!options?.force && !yGm(messagesRef.current)) return;
      if (ycc(messagesRef.current)) return;
      if (Tcc(messagesRef.current)) {
        A("[awaySummary] skipped: StructuredOutput recap present");
        return;
      }
      cancel();
      let abortController = new AbortController();
      abortControllerRef.current = abortController;
      let result = await gBt(abortController.signal);
      if (abortController.signal.aborted) return;
      if (result.kind !== "ok") {
        xe("away_summary_generate", "generate_failed");
        return;
      }
      let summaryText = result.text,
        recapText = recapCountRef.current < 3 ? `${summaryText} (disable recaps in /config)` : summaryText;
      recapCountRef.current++, setMessages(prev => [...prev, X6l(recapText)]), He("away_summary_generate");
    }
    function onFocusChange() {
      let focusState = iz();
      if (focusState === "blurred") {
        blurAtRef.current = Date.now();
        let cacheStart = cacheStartRef.current,
          cacheTtl = cacheTtlRef.current ?? 3600000;
        if (cacheStart !== null && Date.now() - cacheStart >= Math.min(delayMsRef.current, cacheTtl * 0.8) && !isFocusedRef.current) generate();
      } else if (focusState === "focused") {
        if (cancel(), blurAtRef.current !== null) {
          let now = Date.now(),
            blurDuration = now - blurAtRef.current;
          if (blurDuration >= hGm) focusedAtRef.current = now, blurDurationRef.current = blurDuration, returnedRef.current = !0, hadRecapRef.current = ycc(messagesRef.current) || Tcc(messagesRef.current);
          blurAtRef.current = null;
        }
      }
    }
    let unsubscribe = WUe(onFocusChange);
    return generateRef.current = generate, onFocusChange(), () => {
      unsubscribe(), cancel(), generateRef.current = null, blurAtRef.current = null, focusedAtRef.current = null, blurDurationRef.current = null, returnedRef.current = !1, hadRecapRef.current = !1;
    };
  }, [isActive, setMessages, taskStore]), EP.useEffect(() => {
    if (isFocused) return;
    if (!isActive) return;
    let cacheStart = cacheStartRef.current;
    if (cacheStart === null) return;
    let cacheTtl = cacheTtlRef.current ?? 3600000,
      threshold = Math.min(delayMsRef.current, cacheTtl * 0.8),
      remainingMs = Math.max(0, threshold - (Date.now() - cacheStart));
    return clock.setTimeout(() => {
      if (iz() === "blurred" && !isFocusedRef.current) generateRef.current?.();
    }, remainingMs);
  }, [isFocused, isActive, clock]), EP.useEffect(() => {
    if (!isActive) return;
    if (!returnedRef.current) return;
    let last = messages.at(-1);
    if (!last || !Inr(last)) return;
    let focusedAt = focusedAtRef.current;
    if (focusedAt === null) return;
    W("tengu_return_to_session", {
      msSinceFocus: Date.now() - focusedAt,
      blurDurationMs: blurDurationRef.current ?? 0,
      hadRecap: hadRecapRef.current,
      scrolledBeforeSubmit: scrollOffsetRef.current > focusedAt,
      isFullscreen: Cs()
    }), returnedRef.current = !1, focusedAtRef.current = null, blurAtRef.current = null, blurDurationRef.current = null, hadRecapRef.current = !1;
  }, [messages, isActive]), EP.useEffect(() => {
    {
      if (!isActive) return;
      if (!Ws()) return;
      let jobDir = process.env.CLAUDE_JOB_DIR;
      if (!jobDir) return;
      let jobFilePath = bcc.join(jobDir, cPo),
        timer = clock.setTimeout(function tick() {
          try {
            TGm(jobFilePath, isFocusedRef, generateRef);
          } finally {
            timer = clock.setTimeout(tick, _cc);
          }
        }, _cc);
      return () => timer();
    }
  }, [isActive, clock]);
}
var Scc,
  bcc,
  EP,
  g2o = 180000,
  hGm = 300000,
  _cc = 500,
  gGm = 3,
  _Gm = 2;
var Ccc = b(() => {
  lt();
  yce();
  GUe();
  je();
  a_t();
  age();
  mn();
  jn();
  kt();
  A3e();
  nB();
  uo();
  MO();
  vd();
  qe();
  tp();
  ef();
  po();
  G3n();
  Scc = require("fs/promises"), bcc = require("path"), EP = x(et(), 1);
});

export {Inr,ycc,Tcc,yGm,TGm,Ecc,Scc,bcc,EP,g2o,hGm,_cc,gGm,_Gm,Ccc};
