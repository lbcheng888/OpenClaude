// @ts-nocheck
import {Mer as Za6} from "../config/0048_ISSUES_EXPLAINER.ts";
import {shouldPropagateTraceContext as $M_,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {wHn as sP6,Nq as tp} from "../agent/3184_code.ts";
import {b as L} from "../../runtime.ts";
/**
 * Child-session environment variable helpers.
 *
 * Provides utilities for building the environment variable block that is
 * injected into spawned child agent processes, and for converting a raw
 * harness session object into the canonical session-params shape used
 * throughout the session subsystem.
 */

/** Parameters that identify a child session. */
interface ChildSessionParams {
  /** UUID of the session being launched. */
  sessionId: string;
  /** Optional effort level string forwarded from the harness. */
  effortLevel?: string;
  /** How the child was launched: "agent" for a spawned sub-agent, "harness" for direct harness launch. */
  source: "agent" | "harness";
}

/** Raw harness session descriptor (as received from the harness protocol). */
interface HarnessSession {
  /** Harness-supplied session identifier. */
  session_id: string;
  /** Optional effort configuration block. */
  effort?: { level?: string };
}

/**
 * Builds the environment variable block that marks a spawned process as a
 * Claude Code child session.  The returned object is spread into the child's
 * `env`.
 */
function B6_(sessionParams: ChildSessionParams): Record<string, string | undefined> {
  let childEnv: Record<string, string | undefined> = {
    CLAUDECODE: "1",
    CLAUDE_CODE_SESSION_ID: sessionParams.sessionId,
    CLAUDE_CODE_CHILD_SESSION: "1"
  };
  if (sessionParams.source === "agent") childEnv.AI_AGENT = Za6("agent");
  if (sessionParams.effortLevel !== void 0) childEnv.CLAUDE_EFFORT = sessionParams.effortLevel;
  if ($M_()) {
    let traceparent = sP6();
    if (traceparent !== void 0) childEnv.TRACEPARENT = traceparent;
  }
  return childEnv;
}

/**
 * Converts a raw harness session descriptor into the {@link ChildSessionParams}
 * shape expected by {@link B6_} and related helpers.
 */
function JIH(harnessSession: HarnessSession): ChildSessionParams {
  return {
    sessionId: harnessSession.session_id,
    effortLevel: harnessSession.effort?.level,
    source: "harness"
  };
}

/** Lazy module initializer — ensures API and telemetry modules are ready. */
var J06 = L(() => {
  V7();
  tp();
});

export {B6_ as Uot,JIH as u9e,J06 as XIn};
