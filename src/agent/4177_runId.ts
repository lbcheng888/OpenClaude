// @ts-nocheck
import {getSessionProjectDir as ib,getOriginalCwd as G8,getSessionId as v_,lt as w_} from "../session/0131_sent.ts";
import {_g as AA,ry as lw} from "./2772_withFileTypes.ts";
import {Le as bH,qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
// Agent subsystem — workflow run snapshot persistence.
//
// This module reads and writes JSON "snapshots" describing each workflow run
// launched by the subagent coordinator. Snapshots live under the per-session
// state directory:
//
//   <sessionBaseDir>/<sessionId>/subagents/workflows/   (sub-agent workflows)
//   <sessionBaseDir>/<sessionId>/workflows/             (top-level workflow runs)
//
// where `<sessionBaseDir>` is `ib() ?? AA(G8())` — a configured override or the
// projects directory derived from the current working directory — and
// `<sessionId>` is `v_()`.
//
// NOTE: This file is part of an esbuild-style single-bundle build. Symbols that
// are referenced from other bundle modules MUST keep their original (minified)
// names so cross-module linkage stays intact. Specifically:
//   - `BVK`  (writeWorkflowSnapshot) is called from tools/WorkflowTool.
//   - `K4_`  (getSubagentWorkflowPath) is called from tools/WorkflowTool and core.
//   - `kb_`  (the lazy module-init thunk) is called from tools/WorkflowTool and core.
// Only the truly file-local helpers (`gAO`, `pVK`, `UVK`) and the require
// bindings (`fsPromises`, `pathModule`) have been renamed for readability.

// ---------------------------------------------------------------------------
// External bundle references (declared elsewhere; kept verbatim):
//   ib()        -> configured session base dir override, or undefined
//   AA(cwd)     -> fallback session base dir derived from cwd (projects dir)
//   G8()        -> current project root / working directory
//   v_()        -> current session id
//   bH(value)   -> JSON.stringify wrapper (with slow-op instrumentation)
//   d_(text)    -> JSON.parse wrapper
//   N(message)  -> debug/log sink
//   L(init)     -> esbuild __esm lazy module-init memoizer
//   w_, FH, lw, H6 -> dependency module-init thunks
// ---------------------------------------------------------------------------

declare function ib(): string | undefined;
declare function AA(cwd: string): string;
declare function G8(): string;
declare function v_(): string;
declare function bH(value: unknown): string;
declare function d_(text: string): unknown;
declare function N(message: string): void;
declare function L<T>(init: () => T): () => T;
declare function w_(): void;
declare function FH(): void;
declare function lw(): void;
declare function H6(): void;

/**
 * A persisted snapshot of a single workflow run. All fields are optional on
 * disk; {@link UVK} fills in defaults when reading.
 */
interface WorkflowSnapshot {
  /** Stable identifier of the run. */
  runId: string;
  /** Identifier of the originating task (defaults to `runId`). */
  taskId: string;
  /** ISO timestamp the snapshot was written. */
  timestamp: string;
  /** The workflow script source. */
  script: string;
  /** Path to the workflow script, if loaded from a file. */
  scriptPath?: string;
  /** Arguments passed to the workflow. */
  args?: unknown;
  /** Final result of the run. */
  result?: unknown;
  /** Number of agents involved in the run. */
  agentCount: number;
  /** Collected log lines. */
  logs: unknown[];
  /** Total wall-clock duration in milliseconds. */
  durationMs: number;
  /** Error description if the run failed. */
  error?: unknown;
  /** Human-readable summary of the run. */
  summary?: unknown;
  /** Display name of the workflow. */
  workflowName?: string;
  /** Title of the run. */
  title?: string;
  /** Lifecycle status; defaults to "failed" if an error is present, else "completed". */
  status: string;
  /** Epoch milliseconds the run started (parsed from `timestamp` if absent). */
  startTime: number;
  /** Per-phase breakdown of the run. */
  phases?: unknown;
  /** Default model used for the run. */
  defaultModel?: unknown;
  /** Progress entries reported while the workflow executed. */
  workflowProgress: unknown[];
  /** Total tokens consumed across the run. */
  totalTokens: number;
  /** Total tool calls performed across the run. */
  totalToolCalls: number;
}

/** Fields a caller may persist via {@link BVK}; merged with `runId`/`timestamp`. */
type WorkflowSnapshotInput = Partial<Omit<WorkflowSnapshot, "runId" | "timestamp">>;

/**
 * Returns the on-disk path of the JSON snapshot file for a given run id,
 * i.e. `<workflowsDir>/<runId>.json`.
 */
function gAO(runId: string): string {
  return pathModule.join(getWorkflowsDir(), `${runId}.json`);
}

/**
 * Returns the directory holding top-level workflow run snapshots for the
 * current session: `<sessionBaseDir>/<sessionId>/workflows`.
 */
function getWorkflowsDir(): string {
  let sessionBaseDir = ib() ?? AA(G8());
  return pathModule.join(sessionBaseDir, v_(), "workflows");
}

/**
 * Returns the snapshot directory for a named sub-agent workflow:
 * `<sessionBaseDir>/<sessionId>/subagents/workflows/<name>`.
 *
 * Kept under its original bundle name `K4_` because it is referenced from
 * other modules (tools/WorkflowTool, core).
 */
function K4_(name: string): string {
  let sessionBaseDir = ib() ?? AA(G8());
  return pathModule.join(sessionBaseDir, v_(), "subagents", "workflows", name);
}

/**
 * Persists a workflow run snapshot to disk for the given run id. The provided
 * fields are merged with the run id and a fresh ISO timestamp. The target
 * directory is created (mode 0o700) if needed; the file is written with mode
 * 0o600. Failures are logged and swallowed (best-effort persistence).
 *
 * Kept under its original bundle name `BVK` because it is referenced from
 * tools/WorkflowTool.
 */
async function BVK(runId: string, snapshot: WorkflowSnapshotInput): Promise<void> {
  try {
    let payload = {
        runId: runId,
        timestamp: new Date().toISOString(),
        ...snapshot
      },
      snapshotPath = gAO(runId);
    await fsPromises.mkdir(pathModule.dirname(snapshotPath), {
      recursive: !0,
      mode: 448
    }), await fsPromises.writeFile(snapshotPath, bH(payload), {
      encoding: "utf8",
      mode: 384
    });
  } catch (err) {
    N(`Failed to write workflow snapshot ${runId}: ${err instanceof Error ? err.message : err}`);
  }
}

/**
 * Reads and returns all workflow run snapshots for the current session, parsed
 * and normalized with default values, sorted by start time (newest first).
 * Returns an empty array if the workflows directory does not exist. Snapshots
 * that fail to parse are logged and skipped.
 */
async function UVK(): Promise<WorkflowSnapshot[]> {
  let workflowsDir = getWorkflowsDir(),
    fileNames: string[];
  try {
    fileNames = await fsPromises.readdir(workflowsDir);
  } catch {
    return [];
  }
  let snapshots = (await Promise.all(fileNames.filter(fileName => fileName.endsWith(".json")).map(async fileName => {
    try {
      let raw = await fsPromises.readFile(pathModule.join(workflowsDir, fileName), "utf8"),
        parsed = d_(raw) as Partial<WorkflowSnapshot>,
        runId = parsed.runId ?? fileName.replace(/\.json$/, "");
      return {
        runId: runId,
        taskId: parsed.taskId ?? runId,
        timestamp: parsed.timestamp ?? new Date(0).toISOString(),
        script: parsed.script ?? "",
        scriptPath: parsed.scriptPath,
        args: parsed.args,
        result: parsed.result,
        agentCount: parsed.agentCount ?? 0,
        logs: parsed.logs ?? [],
        durationMs: parsed.durationMs ?? 0,
        error: parsed.error,
        summary: parsed.summary,
        workflowName: parsed.workflowName,
        title: parsed.title,
        status: parsed.status ?? (parsed.error ? "failed" : "completed"),
        startTime: parsed.startTime ?? (Date.parse(parsed.timestamp ?? "") || 0),
        phases: parsed.phases,
        defaultModel: parsed.defaultModel,
        workflowProgress: parsed.workflowProgress ?? [],
        totalTokens: parsed.totalTokens ?? 0,
        totalToolCalls: parsed.totalToolCalls ?? 0
      } satisfies WorkflowSnapshot;
    } catch (err) {
      return N(`Failed to parse workflow snapshot ${fileName}: ${err instanceof Error ? err.message : err}`), null;
    }
  }))).filter((snapshot) => snapshot !== null) as WorkflowSnapshot[];
  return snapshots.sort((a, b) => b.startTime - a.startTime), snapshots;
}

var fsPromises: typeof import("fs/promises"), pathModule: typeof import("path");

/**
 * Lazy module-init thunk (esbuild `__esm`). Initializes dependency modules and
 * the `fs/promises` / `path` require bindings on first use. Kept under its
 * original bundle name `kb_` because it is invoked from other modules
 * (tools/WorkflowTool, core).
 */
var kb_ = L(() => {
  w_();
  FH();
  lw();
  H6();
  fsPromises = require("fs/promises"), pathModule = require("path");
});

export {gAO as r0p,getWorkflowsDir as y6a,K4_ as Mut,BVK as T6a,UVK as S6a,fsPromises as JIe,pathModule as zqe,kb_ as U9t};
