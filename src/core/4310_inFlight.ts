// @ts-nocheck
import {isAgentsFleetEnabled as hD,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {getIsRemoteMode as la,lt} from "../session/0132_sent.ts";
import {Xqt,E5n} from "../../vendor/m4308.ts";
import {b} from "../../runtime.ts";
/**
 * In-flight request fork/fleet gating + conversation-tail inspection.
 *
 * This module decides whether a new turn can be forked while a previous turn is
 * still in flight (the "fleet" feature), and provides helpers that inspect the
 * tail of a transcript to determine completion / pending tool-result state.
 */

/** True when fleet forking is globally enabled and we're not in a remote session. */
function iDe(): boolean {
  return hD() && !la();
}

/** Result of forking while idle / loading. */
type ForkVia = "idle-fork" | "defer-then-fork" | "abort-then-fork";

/**
 * Pick the fork strategy.
 * @param isLoading    whether a turn is currently loading/running
 * @param betweenCalls whether we're paused between tool calls (safe to defer)
 */
function L9p(isLoading: boolean, betweenCalls: boolean): ForkVia {
  if (!isLoading) return "idle-fork";
  return betweenCalls ? "defer-then-fork" : "abort-then-fork";
}

/** Input describing the current session/turn state for a fork decision. */
interface ForkContext {
  inFlight: unknown;
  isBg: boolean;
  fleetEnabled: boolean;
  isRemote: boolean;
  isExternalLoading: boolean;
  isLoading: boolean;
  betweenCalls: boolean;
}

/** Outcome of {@link M9p}: either an allowed fork (with `via`) or a rejection (with `reason`). */
type ForkDecision =
  | { ok: true; via: "detach" | ForkVia; inFlight: unknown }
  | { ok: false; reason: "fleet-disabled" | "remote" | "loading"; inFlight: unknown };

/** Decide if/how a fork may proceed given the current session context. */
function M9p(context: ForkContext): ForkDecision {
  let {
    inFlight: pending
  } = context;
  if (context.isBg) return {
    ok: !0,
    via: "detach",
    inFlight: pending
  };
  if (!context.fleetEnabled) return {
    ok: !1,
    reason: "fleet-disabled",
    inFlight: pending
  };
  if (context.isRemote) return {
    ok: !1,
    reason: "remote",
    inFlight: pending
  };
  if (context.isExternalLoading) return {
    ok: !1,
    reason: "loading",
    inFlight: pending
  };
  return {
    ok: !0,
    via: L9p(context.isLoading, context.betweenCalls),
    inFlight: pending
  };
}

/** A single transcript entry (user / assistant / system / tool-result, etc.). */
type TranscriptEntry = any;

/**
 * True when a stream is *not* active: we're not forced-streaming and the tail
 * does not show an open (unstopped) assistant turn.
 */
function C5n(messages: TranscriptEntry[], forceStreaming: boolean): boolean {
  return !forceStreaming && !N9p(messages);
}

/**
 * Walk the transcript backwards: returns true if the most recent meaningful
 * entry is an assistant message that hasn't stopped yet (stream still open).
 */
function N9p(messages: TranscriptEntry[]): boolean {
  for (let index = messages.length - 1; index >= 0; index--) {
    let entry = messages[index];
    if (entry.type === "assistant") return entry.message?.stop_reason === null;
    if (entry.type === "user") return !1;
  }
  return !1;
}

/**
 * Count characters of streamed assistant text since the last user turn, but
 * only while the latest assistant message is still open (stop_reason === null).
 */
function nyo(messages: TranscriptEntry[]): number {
  let charCount = 0;
  for (let index = messages.length - 1; index >= 0; index--) {
    let entry = messages[index];
    if (entry.type === "assistant") {
      if (entry.message?.stop_reason !== null) return charCount;
      for (let block of entry.message?.content ?? []) if (block.type === "text" && typeof block.text === "string") charCount += block.text.length;
    } else if (entry.type === "user") return charCount;
  }
  return charCount;
}

/** True when the entry is a user message consisting solely of tool_result blocks. */
function OQa(entry: TranscriptEntry): boolean {
  if (entry.type !== "user") return !1;
  let content = entry.message?.content;
  return Array.isArray(content) && content.length > 0 && content.every(block => block.type === "tool_result");
}

/**
 * True if the entry is "in-progress" tail material that should be trimmed:
 * any system entry, an assistant turn still running or awaiting a tool, or a
 * user tool-result message.
 */
function F9p(entry: TranscriptEntry): boolean {
  if (entry.type === "system") return !0;
  if (entry.type === "assistant") {
    let stopReason = entry.message?.stop_reason;
    return stopReason === null || stopReason === "tool_use";
  }
  if (entry.type === "user") return Xqt(entry);
  return !1;
}

/**
 * Strip the trailing "in-flight" portion of a transcript so only the
 * stable/committed history remains. Walks back over assistant turns and their
 * tool-result user messages, then re-appends any non-conversational tail
 * entries that fell inside the trimmed range.
 */
function A5n(messages: TranscriptEntry[]): TranscriptEntry[] {
  let cutoff = messages.length,
    sawToolResult = !1;
  while (cutoff > 0) {
    let entry = messages[cutoff - 1];
    if (entry.type === "user") {
      if (Xqt(entry)) sawToolResult ||= OQa(entry);else if (sawToolResult && OQa(entry)) ;else break;
    } else if (entry.type === "assistant") {
      if (!F9p(entry)) break;
      sawToolResult = !1;
    }
    cutoff--;
  }
  let preservedTail = messages.slice(cutoff).filter(entry => entry.type !== "user" && entry.type !== "assistant" && entry.type !== "system");
  if (cutoff + preservedTail.length === messages.length) return messages;
  return [...messages.slice(0, cutoff), ...preservedTail];
}

/**
 * Validate that `snapshot` is a still-valid prefix of `current`: same uuid at
 * its tail position, and everything appended after it is non-conversational.
 */
function LQa(snapshot: any, current: TranscriptEntry[]): boolean {
  if (snapshot === null || snapshot.length < 1 || snapshot.length > current.length) return !1;
  let lastIndex = snapshot.length - 1;
  if (current[lastIndex]?.uuid !== snapshot.uuid) return !1;
  for (let index = snapshot.length; index < current.length; index++) {
    let entryType = current[index].type;
    if (entryType === "user" || entryType === "assistant") return !1;
  }
  return !0;
}

/**
 * True when the transcript tail indicates the user is awaiting a response:
 * the most recent user message is *not* a tool-result message, and no later
 * assistant turn exists.
 */
function R5n(messages: TranscriptEntry[]): boolean {
  for (let index = messages.length - 1; index >= 0; index--) {
    let entry = messages[index];
    if (entry.type === "user") return !Xqt(entry);
    if (entry.type === "assistant") return !1;
  }
  return !1;
}

/** True for a fork decision that succeeded via a real fork (not a background detach). */
function v5n(decision: ForkDecision): boolean {
  return decision.ok && decision.via !== "detach";
}

/** Make a fork decision, filling in live fleet-enabled / remote flags. */
function fmt(context: Omit<ForkContext, "fleetEnabled" | "isRemote">): ForkDecision {
  return M9p({
    ...context,
    fleetEnabled: hD(),
    isRemote: la()
  });
}

var B5e = b(() => {
  lt();
  E5n();
  fC();
});

export {iDe,L9p,M9p,C5n,N9p,nyo,OQa,F9p,A5n,LQa,R5n,v5n,fmt,B5e};
