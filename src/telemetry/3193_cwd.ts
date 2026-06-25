// @ts-nocheck
import {cn as getErrorCode,Xd as getErrorMessage,Ct as L_} from "../../vendor/m197.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {b as L} from "../../runtime.ts";
/**
 * Process-tree kill utilities for the Bash tool.
 * Provides graceful and forceful termination of a process and all its descendants.
 */

/**
 * Kill a process tree rooted at `pid`, sending `signal` to every descendant.
 * Returns a resolved Promise immediately for invalid pids (≤ 1 or non-integer).
 */
function killProcessTree(pid: number, signal: string = "SIGKILL"): Promise<void> {
  if (!Number.isInteger(pid) || pid <= 1) return Promise.resolve();
  return killProcessTreeImpl(pid, signal).catch(() => {});
}

/** Internal implementation: enumerate descendants then kill the whole group. */
async function killProcessTreeImpl(pid: number, signal: string): Promise<void> {
  let descendants = await enumerateDescendants(pid);
  try {
    process.kill(-pid, signal);
  } catch (err) {
    try {
      process.kill(pid, signal);
    } catch {}
    if (getErrorCode(err) !== "ESRCH") reportKillError("group_kill", err);
  }
  for (let childPid of descendants) try {
    process.kill(childPid, signal);
  } catch {}
}

/**
 * Returns the set of all descendant pids of `pid` by parsing `ps` output.
 * Uses a BFS walk over the parent→children map.
 */
async function enumerateDescendants(pid: number): Promise<Set<number>> {
  let psOutput: string;
  try {
    psOutput = await Promise.race([spawnPsListing(), new Promise<string>(resolve => {
      let timer = setTimeout(($: (v: string) => void) => $(""), PS_TIMEOUT_MS, resolve);
      if (typeof timer === "object") timer.unref();
    })]);
  } catch (err) {
    return reportKillError("enum_spawn", err), new Set<number>();
  }
  // Build parent→children map from "pid ppid" rows
  let parentToChildren = new Map<number, number[]>();
  for (let line of psOutput.split(`\n`)) {
    let match = line.match(/^\s*(\d+)\s+(\d+)\s*$/);
    if (!match) continue;
    let childPid = Number(match[1]),
      parentPid = Number(match[2]),
      existing = parentToChildren.get(parentPid);
    if (existing) existing.push(childPid);else parentToChildren.set(parentPid, [childPid]);
  }
  // BFS from root pid to collect all descendants
  let result = new Set<number>(),
    queue = [pid];
  while (queue.length > 0) {
    let current = queue.shift()!;
    for (let child of parentToChildren.get(current) ?? []) if (child > 1 && child !== pid && !result.has(child)) result.add(child), queue.push(child);
  }
  return result;
}

/** Spawns `ps -A -o pid= -o ppid=` and resolves with its stdout. */
function spawnPsListing(): Promise<string> {
  return new Promise((resolve, reject) => {
    let proc;
    try {
      proc = childProcess.spawn("ps", ["-A", "-o", "pid=", "-o", "ppid="], {
        cwd: "/",
        stdio: ["ignore", "pipe", "ignore"]
      });
    } catch (err) {
      reject(err);
      return;
    }
    let output = "";
    proc.stdout?.on("data", (chunk: Buffer | string) => output += chunk), proc.once("error", reject), proc.once("close", () => resolve(output));
  });
}

/** Logs a kill-tree failure and emits a telemetry event. */
function reportKillError(stage: string, err: unknown): void {
  try {
    let errorCode = getErrorCode(err),
      errorMessage = getErrorMessage(err); // FIXME: unverified name — WO extracts some error property
    N(`killProcessTree ${stage} failed: ${errorCode ?? err}`), c("tengu_bash_tool_kill_error", {
      stage,
      ...(errorMessage && {
        error_code: errorMessage
      })
    });
  } catch {}
}
var childProcess: typeof import("child_process"),
  PS_TIMEOUT_MS = 500;

/** Lazy initializer — loads dependencies (logDebug, telemetry, childProcess). */
var NQ8 = L(() => {
  y_();
  FH();
  L_();
  childProcess = require("child_process");
});
export {killProcessTree as rFt,killProcessTreeImpl as C7d,enumerateDescendants as A7d,spawnPsListing as R7d,reportKillError as daa,childProcess as uaa,PS_TIMEOUT_MS as E7d,NQ8 as cDn};
