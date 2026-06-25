// @ts-nocheck
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {or,dn} from "../config/0137_namespace.ts";
import {Ne} from "../../vendor/m583.ts";
import {getSessionId as It,lt} from "../session/0132_sent.ts";
import {vf,Pv} from "../../vendor/m639.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {cn,ipe,Ce,In,Xd,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {zg} from "../../vendor/m1479.ts";
import {kc,aA} from "../../vendor/m234.ts";
import {yR,zf} from "../../vendor/m133.ts";
import {C} from "../../vendor/m321.ts";
import {b} from "../../runtime.ts";
import {YU} from "../../vendor/m459.ts";
import {Qr} from "../../vendor/m323.ts";
import {Ir} from "../../vendor/m584.ts";
import {YL,PP} from "../../vendor/m123.ts";
import {U2e,J8,Swe,F1i} from "../../vendor/m2589.ts";
import {ve} from "../../vendor/m461.ts";
import {CR} from "../../vendor/m450.ts";
/** Returns a validator transformer that logs a warning and drops malformed fields from persisted job state. */
function DOt(fieldName: string, predicate: (val: any) => boolean): (val: any) => any {
  return value => {
    if (predicate(value)) return value;
    A(`[jobs] dropped malformed ${fieldName} from persisted job state`, {
      level: "warn"
    });
    return;
  };
}
/** Returns the base jobs directory path. */
function V0(): string {
  return pT.join(or(), "jobs");
}
/** Returns the directory path for a specific job by id. */
function ec(jobId: string): string {
  return pT.join(V0(), jobId);
}
/** Returns the 8-char job dir name from env or the first 8 chars of the session id. */
function eb(): string {
  let envJobDir = Ne.CLAUDE_JOB_DIR;
  if (envJobDir) return pT.basename(envJobDir);
  return It().slice(0, 8);
}
/** Watches the state.json mtime and calls onChange when it changes externally (not by us). Returns a cleanup fn. */
function $1i(jobId: string, onChange: () => void): () => void {
  let statePath = pT.join(ec(jobId), c8r),
    stopped = !1,
    lastMtime = Number.NaN;
  function checkMtime(currentMtime: number) {
    if (stopped) return;
    if (Number.isNaN(lastMtime)) {
      lastMtime = currentMtime;
      return;
    }
    if (currentMtime === lastMtime) return;
    cleanup(), onChange();
  }
  function poll() {
    yC.lstat(statePath).then(stat => checkMtime(stat.mtimeMs), () => checkMtime(-1));
  }
  poll();
  let intervalId = setInterval(poll, 200),
    timeoutId = setTimeout(cleanup, 1e4);
  function cleanup() {
    if (stopped) return;
    stopped = !0, clearInterval(intervalId), clearTimeout(timeoutId);
  }
  return cleanup;
}
/** Returns true if there is an in-flight state write. */
function q1i(): boolean {
  return l8r > 0;
}
/** Writes job state to disk (state.json), excluding pinned/sortOrder fields. */
async function Id(jobDir: string, stateObj: any): Promise<void> {
  let {
    pinned: pinned,
    sortOrder: sortOrder,
    stateSortOrder: stateSortOrder,
    ...stateRest
  } = stateObj;
  l8r++;
  try {
    await vf(pT.join(jobDir, c8r), Pe(stateRest, null, 2), 384);
  } finally {
    l8r--, mT(jobDir);
  }
}
/** Handles a state write error: logs known fs errors, otherwise re-throws via Ie. */
function Pm(err: any): void {
  let code = cn(err);
  if (code && ipe.has(code)) {
    A(`[jobs] state write failed (${code}): ${Ce(err)}`, {
      level: "error"
    });
    return;
  }
  Ie(err);
}
/** Builds env vars for bridge session reattach. */
function Ewe(sessionId: string | undefined, seq: number | undefined, outboundOnly: boolean | undefined): Record<string, string> | undefined {
  if (!sessionId) return;
  let reattachEnv: Record<string, string> = {
    CLAUDE_BRIDGE_REATTACH_SESSION: sessionId
  };
  if (seq !== void 0 && seq > 0) reattachEnv.CLAUDE_BRIDGE_REATTACH_SEQ = String(seq);
  if (outboundOnly !== !1) reattachEnv.CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY = "1";
  return reattachEnv;
}
/** Invalidates the cache entry for a job directory. */
function mT(jobDir: string): void {
  VZ.delete(jobDir);
}
/** Reads and caches job state from disk, handling lstat + read + schema validation. Returns null on missing/invalid. */
async function Oi(jobDir: string): Promise<any | null> {
  let statePath = pT.join(jobDir, c8r),
    orderPath = pT.join(jobDir, "order"),
    stateOrderPath = pT.join(jobDir, "stateOrder"),
    mtimeKey,
    sideFiles;
  try {
    let [statStat, orderStat, stateOrderStat] = await Promise.all([yC.lstat(statePath), yC.lstat(orderPath).catch(() => null), yC.lstat(stateOrderPath).catch(() => null)]);
    if (!statStat.isFile() || statStat.size > a8r) {
      let rejectKey = `rejected:${statStat.mtimeMs}:${statStat.size}`;
      if (VZ.get(jobDir)?.mtimeKey === rejectKey) return null;
      return A(`[jobs] skipping ${pT.basename(jobDir)}: state.json is ${statStat.isFile() ? `too large (${statStat.size} bytes)` : "not a regular file"}`, {
        level: "warn"
      }), VZ.set(jobDir, {
        mtimeKey: rejectKey,
        state: null
      }), null;
    }
    let isValidSideFile = (sideFileStat: any) => sideFileStat !== null && sideFileStat.isFile() && sideFileStat.size <= a8r;
    sideFiles = {
      order: isValidSideFile(orderStat),
      stateOrder: isValidSideFile(stateOrderStat)
    }, mtimeKey = `${statStat.mtimeMs}:${sideFiles.order ? orderStat.mtimeMs : 0}:${sideFiles.stateOrder ? stateOrderStat.mtimeMs : 0}`;
  } catch (statErr) {
    if (In(statErr)) return VZ.delete(jobDir), bwe.delete(jobDir), null;
    A(`[jobs] ${pT.basename(jobDir)}: state.json stat failed \u2014 ${statErr instanceof Error ? statErr.message : String(statErr)}`, {
      level: "warn"
    });
    let cached = VZ.get(jobDir);
    if (!bwe.has(jobDir)) bwe.add(jobDir), W("tengu_bg_state_read_transient", {
      errno: Xd(statErr) ?? "unknown",
      had_cache: cached !== void 0
    });
    return cached?.state ?? null;
  }
  let cacheEntry = VZ.get(jobDir);
  if (cacheEntry?.mtimeKey === mtimeKey) return bwe.delete(jobDir), cacheEntry.state;
  try {
    let [rawContent, orderContent, stateOrderContent] = await Promise.all([yC.readFile(statePath, "utf-8"), sideFiles.order ? yC.readFile(orderPath, "utf-8").catch(() => null) : Promise.resolve(null), sideFiles.stateOrder ? yC.readFile(stateOrderPath, "utf-8").catch(() => null) : Promise.resolve(null)]),
      parseResult = yvd().safeParse(qt(rawContent));
    if (!parseResult.success) return A(`[jobs] skipping ${pT.basename(jobDir)}: state.json schema validation failed \u2014 ${parseResult.error.message}`, {
      level: "warn"
    }), VZ.set(jobDir, {
      mtimeKey: mtimeKey,
      state: null
    }), null;
    let sortOrderVal = orderContent !== null ? Number(orderContent) : void 0,
      stateSortOrderVal = stateOrderContent !== null ? Number(stateOrderContent) : void 0,
      parsedState = parseResult.data;
    if (Number.isFinite(sortOrderVal)) parsedState = {
      ...parsedState,
      sortOrder: sortOrderVal
    };
    if (Number.isFinite(stateSortOrderVal)) parsedState = {
      ...parsedState,
      stateSortOrder: stateSortOrderVal
    };
    if (VZ.size > 1000) VZ.clear();
    return VZ.set(jobDir, {
      mtimeKey: mtimeKey,
      state: parsedState
    }), bwe.delete(jobDir), parsedState;
  } catch (readErr) {
    if (In(readErr)) return VZ.delete(jobDir), bwe.delete(jobDir), null;
    if (A(`[jobs] ${pT.basename(jobDir)}: state.json read/parse failed \u2014 ${readErr instanceof Error ? readErr.message : String(readErr)}`, {
      level: "warn"
    }), !bwe.has(jobDir)) bwe.add(jobDir), W("tengu_bg_state_read_transient", {
      errno: Xd(readErr) ?? "unknown",
      had_cache: cacheEntry !== void 0
    });
    return cacheEntry?.state ?? null;
  }
}
/** Returns the path to the pins.json file. */
function POt(): string {
  return pT.join(V0(), "pins.json");
}
/** Reads the set of pinned job ids from pins.json, falling back to directory scan. */
async function $2e(): Promise<Set<string>> {
  try {
    let pinsStat = await yC.lstat(POt());
    if (!pinsStat.isFile() || pinsStat.size > a8r) {
      if (!pinsStat.isFile()) await yC.rm(POt(), {
        recursive: !0,
        force: !0
      }).catch(() => {});
      return new Set();
    }
    let rawPins = await yC.readFile(POt(), "utf-8"),
      parsedPins = qt(rawPins);
    if (!Array.isArray(parsedPins)) return new Set();
    return new Set(parsedPins.filter(pin => typeof pin === "string"));
  } catch (err) {
    if (In(err)) return Tvd();
    return new Set();
  }
}
/** Scans job directories for a "pinned" sentinel file and writes pins.json. */
async function Tvd(): Promise<Set<string>> {
  let dirEntries;
  try {
    dirEntries = await yC.readdir(V0(), {
      withFileTypes: !0
    });
  } catch {
    return new Set();
  }
  let jobsBase = V0(),
    pinnedIds: string[] = [];
  await Promise.all(dirEntries.filter(entry => entry.isDirectory()).map(entry => yC.lstat(pT.join(jobsBase, entry.name, "pinned")).then(pinnedStat => {
    if (pinnedStat.isFile()) pinnedIds.push(entry.name);
  }, () => {})));
  let pinnedSet = new Set(pinnedIds);
  return await W1i(pinnedSet).catch(writeErr => {
    if (!In(writeErr)) Pm(writeErr);
  }), pinnedSet;
}
/** Writes the set of pinned job ids to pins.json. */
async function W1i(pinnedSet: Set<string>): Promise<void> {
  let pinsPath = POt();
  await yC.mkdir(pT.dirname(pinsPath), {
    recursive: !0
  }), await vf(pinsPath, Pe([...pinnedSet], null, 2));
}
/** Updates the name of a job in its state file. Returns true on success. */
async function Mie(jobId: string, newName: string, nameSource: string): Promise<boolean> {
  let jobDir = ec(jobId),
    currentState = await Oi(jobDir);
  if (!currentState) return !1;
  if (currentState.name === newName) return !0;
  mT(jobDir);
  let freshState = (await Oi(jobDir)) ?? currentState;
  if (freshState.name === newName || nameSource === "auto" && freshState.name) return !0;
  return Id(jobDir, {
    ...freshState,
    name: newName,
    nameSource: nameSource,
    updatedAt: new Date().toISOString()
  }).then(() => !0, writeErr => {
    if (!In(writeErr)) Pm(writeErr);
    return !1;
  });
}
/** Updates the color of a job in its state file. Returns true on success. */
async function Ivn(jobId: string, newColor: string): Promise<boolean> {
  let jobDir = ec(jobId),
    currentState = await Oi(jobDir);
  if (!currentState) return !1;
  if (currentState.color === newColor) return !0;
  mT(jobDir);
  let freshState = (await Oi(jobDir)) ?? currentState;
  if (freshState.color === newColor) return !0;
  return Id(jobDir, {
    ...freshState,
    color: newColor,
    updatedAt: new Date().toISOString()
  }).then(() => !0, writeErr => {
    if (!In(writeErr)) Pm(writeErr);
    return !1;
  });
}
/** Returns the cached current working directory value for the bg job. */
function u8r() {
  return G1i;
}
/** Updates cwd/originCwd in the bg job state when the working directory changes. */
async function V1i(cwd: string): Promise<void> {
  let jobDirEnv = Ne.CLAUDE_JOB_DIR;
  if (!jobDirEnv || Ne.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  G1i = cwd, mT(jobDirEnv);
  let currentState = await Oi(jobDirEnv),
    originCwd = currentState?.worktreePath ? currentState.originCwd : cwd;
  if (!currentState || currentState.cwd === cwd && currentState.originCwd === originCwd) return;
  mT(jobDirEnv);
  let freshState = (await Oi(jobDirEnv)) ?? currentState;
  await Id(jobDirEnv, {
    ...freshState,
    cwd: cwd,
    originCwd: freshState.worktreePath ? freshState.originCwd : cwd,
    updatedAt: new Date().toISOString()
  }).catch(writeErr => {
    if (!In(writeErr)) Pm(writeErr);
  });
}
/** Updates resumeSessionId/linkScanPath in the bg job state, resetting the scan offset. */
async function K1i(resumeSessionId: string, linkScanPath: string): Promise<void> {
  let jobDirEnv = Ne.CLAUDE_JOB_DIR;
  if (!jobDirEnv || Ne.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  mT(jobDirEnv);
  let currentState = await Oi(jobDirEnv);
  if (!currentState || currentState.resumeSessionId === resumeSessionId && currentState.linkScanPath === linkScanPath) return;
  mT(jobDirEnv);
  let freshState = (await Oi(jobDirEnv)) ?? currentState;
  await Id(jobDirEnv, {
    ...freshState,
    resumeSessionId: resumeSessionId,
    linkScanPath: linkScanPath,
    linkScanOffset: 0,
    updatedAt: new Date().toISOString()
  }).catch(writeErr => {
    if (!In(writeErr)) Pm(writeErr);
  });
}
/** Updates respawnFlags by replacing a flag value pair in the background job's state. */
async function Cwe(flagKey: string, oldFlagValues: string[], newFlagValue: string | null): Promise<void> {
  let jobDirEnv = Ne.CLAUDE_JOB_DIR;
  if (!jobDirEnv || Ne.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  mT(jobDirEnv);
  let currentState = await Oi(jobDirEnv);
  if (!currentState?.respawnFlags) return;
  let allFlagKeys = [flagKey, ...oldFlagValues],
    filterFlags = (flags: string[]) => {
      let filtered: string[] = [];
      for (let idx = 0; idx < flags.length; idx++) {
        let flag = flags[idx];
        if (allFlagKeys.some(key => flag === key || flag.startsWith(`${key}=`))) {
          if (flag.indexOf("=") === -1 && flags[idx + 1] !== void 0) idx++;
          continue;
        }
        filtered.push(flag);
      }
      return newFlagValue === null ? filtered : [...filtered, flagKey, newFlagValue];
    },
    updatedFlags = filterFlags(currentState.respawnFlags);
  if (updatedFlags.length === currentState.respawnFlags.length && updatedFlags.every((flag, idx) => flag === currentState.respawnFlags[idx])) return;
  mT(jobDirEnv);
  let freshState = (await Oi(jobDirEnv)) ?? currentState;
  await Id(jobDirEnv, {
    ...freshState,
    respawnFlags: filterFlags(freshState.respawnFlags ?? currentState.respawnFlags),
    updatedAt: new Date().toISOString()
  }).catch(writeErr => {
    if (!In(writeErr)) Pm(writeErr);
  });
}
/** Appends a flag key+value pair to respawnFlags in the bg job state if not already present. */
async function z1i(flagKey: string, flagValue: string): Promise<void> {
  let jobDirEnv = Ne.CLAUDE_JOB_DIR;
  if (!jobDirEnv || Ne.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  mT(jobDirEnv);
  let currentState = await Oi(jobDirEnv);
  if (!currentState?.respawnFlags) return;
  for (let idx = 0; idx < currentState.respawnFlags.length - 1; idx++) if (currentState.respawnFlags[idx] === flagKey && currentState.respawnFlags[idx + 1] === flagValue) return;
  mT(jobDirEnv);
  let freshState = (await Oi(jobDirEnv)) ?? currentState;
  await Id(jobDirEnv, {
    ...freshState,
    respawnFlags: [...(freshState.respawnFlags ?? []), flagKey, flagValue],
    updatedAt: new Date().toISOString()
  }).catch(writeErr => {
    if (!In(writeErr)) Pm(writeErr);
  });
}
/** Writes the sort order for a job to the "order" file. */
async function j1i(jobDir: string, order: number): Promise<void> {
  await yC.writeFile(pT.join(jobDir, "order"), String(order), "utf-8"), mT(jobDir);
}
/** Writes the state sort order for a job to the "stateOrder" file. */
async function Y1i(jobDir: string, stateOrder: number): Promise<void> {
  await yC.writeFile(pT.join(jobDir, "stateOrder"), String(stateOrder), "utf-8"), mT(jobDir);
}
/** Acquires an exclusive lock on .order and runs the callback. */
async function J1i(callback: () => Promise<any>): Promise<any> {
  let lockPath = pT.join(V0(), ".order");
  await yC.mkdir(V0(), {
    recursive: !0
  });
  await using lockHandle = await zg(lockPath, {
    realpath: !1,
    stale: 5000,
    retries: {
      retries: 5,
      minTimeout: 20
    },
    onCompromised: lockErr => A(`jobs/.order lock compromised (likely process suspend or slow fs): ${lockErr}`, {
      level: "error"
    })
  });
  return await callback();
}
/** Queues a pin/unpin update for a job, serialized through a promise chain. */
function X1i(jobId: string, shouldPin: boolean): Promise<void> {
  let nextPromise = B1i.then(async () => {
    let pinsPath = POt();
    await yC.mkdir(pT.dirname(pinsPath), {
      recursive: !0
    });
    await using pinsLock = await zg(pinsPath, {
      realpath: !1,
      stale: 5000,
      retries: {
        retries: 5,
        minTimeout: 20
      },
      onCompromised: lockErr => A(`pins.json lock compromised (likely process suspend or slow fs): ${lockErr}`, {
        level: "error"
      })
    });
    let pinnedSet = await $2e();
    if (shouldPin ? pinnedSet.has(jobId) : !pinnedSet.has(jobId)) return;
    if (shouldPin) pinnedSet.add(jobId);else pinnedSet.delete(jobId);
    await W1i(pinnedSet);
  });
  return B1i = nextPromise.catch(() => {}), nextPromise;
}
/** Lists all jobs with their state, optionally filtering out stale ones. */
async function Hz(filterFn: ((jobs: any[]) => any[]) | undefined): Promise<any[]> {
  let dirEntries;
  try {
    dirEntries = await yC.readdir(V0(), {
      withFileTypes: !0
    });
  } catch {
    return [];
  }
  let [pinnedSet, jobsWithState] = await Promise.all([$2e(), Promise.all(dirEntries.filter(entry => entry.isDirectory()).map(async entry => {
      let state = await Oi(pT.join(V0(), entry.name));
      return state ? {
        id: entry.name,
        state: state
      } : null;
    }))]),
    jobList = jobsWithState.filter(job => job !== null).map(job => pinnedSet.has(job.id) ? {
      ...job,
      state: {
        ...job.state,
        pinned: !0
      }
    } : job);
  return filterFn ? OOt(jobList, filterFn) : jobList;
}
/** Filters job list, marking stale non-active jobs as failed/blocked using bvd. */
function OOt(jobs: any[], activeIds: Set<string>): any[] {
  let now = Date.now();
  return jobs.map(job => {
    if (Tg(job.state)) return job;
    if (activeIds.has(job.id)) return job;
    if (now - Date.parse(job.state.createdAt) < Svd) return job;
    return {
      ...job,
      state: bvd(job.state)
    };
  });
}
/** Returns a "settled" version of a stale job state (failed or blocked). */
function bvd(stateObj: any): any {
  if (stateObj.state === "blocked" && !Awe(stateObj)) return {
    ...stateObj,
    tempo: "blocked",
    inFlight: void 0
  };
  return {
    ...stateObj,
    state: "failed",
    tempo: "idle",
    needs: void 0,
    block: void 0,
    inFlight: void 0,
    detail: stateObj.detail.replace(/; respawning$/, "")
  };
}
/** Constructs the initial "working" state object for a new background job. */
function Nie(jobSpec: any): any {
  let now = new Date().toISOString();
  return {
    state: "working",
    detail: jobSpec.detail !== void 0 ? kc(jobSpec.detail) : Pnt,
    tempo: jobSpec.tempo ?? "active",
    needs: jobSpec.needs,
    output: null,
    children: null,
    linkScanOffset: 0,
    template: jobSpec.template.name,
    routine: jobSpec.routine,
    respawnFlags: jobSpec.respawnFlags ?? [],
    bgIsolation: jobSpec.bgIsolation,
    providerEnv: jobSpec.providerEnv,
    sessionPermissionRules: jobSpec.sessionPermissionRules,
    memoryToggledOff: jobSpec.memoryToggledOff,
    intent: jobSpec.intent,
    name: jobSpec.name,
    nameSource: jobSpec.nameSource,
    color: jobSpec.template.color,
    initialPrompt: jobSpec.template.initialPrompt,
    sessionId: jobSpec.sessionId,
    resumeSessionId: jobSpec.sessionId,
    daemonShort: jobSpec.sessionId.slice(0, 8),
    cwd: jobSpec.cwd,
    createdAt: now,
    updatedAt: now,
    firstTerminalAt: null,
    worktreePath: jobSpec.worktreePath,
    worktreeBranch: jobSpec.worktreeBranch,
    worktreeHookBased: jobSpec.worktreeHookBased,
    originCwd: jobSpec.originCwd,
    backend: "daemon"
  };
}
/** Adopts orphaned daemon sessions found in the roster that have no persisted job state yet. */
function Q1i(existingJobs: any[], rosterSessions: any[]): any[] {
  if (rosterSessions.length === 0) return existingJobs;
  let existingIds = new Set(existingJobs.map(job => job.id)),
    orphans = rosterSessions.filter(session => U1i.test(session.short) && !existingIds.has(session.short) && session.source !== "spare" && !session.dying);
  if (orphans.length === 0) return existingJobs;
  let adoptedJobs = orphans.map(session => {
    let adoptedState = {
        ...Nie({
          template: {
            name: session.agent ?? "bg",
            description: ""
          },
          routine: session.routine,
          intent: session.intent,
          name: session.name,
          detail: session.detail,
          ...(session.tempo === "active" && (session.state === "running" || Dnt.includes(session.state)) ? session.routine ? {
            tempo: "idle"
          } : {
            tempo: "blocked",
            needs: T4
          } : {
            tempo: session.tempo,
            needs: session.needs
          }),
          sessionId: yR(session.sessionId),
          cwd: yR(session.cwd),
          worktreePath: session.worktreePath === void 0 ? void 0 : yR(session.worktreePath)
        }),
        daemonShort: session.short,
        state: Dnt.includes(session.state) ? "working" : session.state,
        ...(bI(session.state) && {
          inFlight: {
            tasks: 0,
            queued: 0,
            kinds: []
          }
        })
      },
      jobDir = ec(session.short);
    return yC.mkdir(jobDir, {
      recursive: !0
    }).then(() => yC.writeFile(pT.join(jobDir, "state.json"), JSON.stringify(adoptedState), {
      flag: "wx",
      mode: 384
    })).then(() => W("tengu_bg_roster_orphan_adopted", {})).catch(writeErr => {
      if (cn(writeErr) !== "EEXIST") Pm(writeErr);
    }), {
      id: session.short,
      state: adoptedState
    };
  });
  return [...existingJobs, ...adoptedJobs];
}
/** Maps terminal job state to an outcome string (success/failure/stopped), or null if not terminal. */
function Fie(state: string): "success" | "failure" | "stopped" | null {
  if (state === "done") return "success";
  if (state === "failed") return "failure";
  if (state === "stopped") return "stopped";
  return null;
}
/** Returns true if the job state is a terminal (done/failed/stopped) state. */
function bI(state: string): boolean {
  return Fie(state) !== null;
}
/** Returns true if the job is in a settled (terminal and non-active) state. */
function Tg(stateObj: any): boolean {
  return bI(stateObj.state) && stateObj.tempo !== "active";
}
/** Returns true if this is an exec template job with no respawn flags (non-respawnable). */
function Awe(stateObj: any): boolean {
  return stateObj.template === "exec" && stateObj.respawnFlags.length === 0;
}
/** Returns the effective origin cwd, stripping worktree sub-paths. */
function Rwe(stateObj: any): string {
  let originCwd = stateObj.originCwd || (stateObj.cwd.match(/^(.+?)[/\\]\.claude[/\\]worktrees[/\\]/)?.[1] ?? stateObj.cwd);
  return yR(originCwd);
}
/** Returns true if the job's origin cwd is within the given base path (or it's a remote backend). */
function xvn(stateObj: any, basePath: string): boolean {
  if (stateObj.backend === "remote") return !0;
  let relativePath = pT.relative(basePath, Rwe(stateObj));
  return relativePath.split(/[/\\]/, 1)[0] !== ".." && !pT.isAbsolute(relativePath);
}
/** Returns true if the job's intent or initial prompt starts with /loop. */
function LOt(stateObj: any): boolean {
  let isLoop = (text: string | undefined) => text?.trim().toLowerCase().startsWith("/loop") ?? !1;
  return isLoop(stateObj.intent) || isLoop(stateObj.initialPrompt);
}
/** Returns true if the job is a routine/cron/loop job. */
function q2e(stateObj: any): boolean {
  return stateObj.routine !== void 0 || (stateObj.inFlight?.kinds.includes("session_cron") ?? !1) || LOt(stateObj);
}
/** Updates job state to a terminal state on the filesystem. */
function W2e(jobId: string, terminalState: string, detail: string): Promise<void> {
  let jobDir = ec(jobId);
  return Oi(jobDir).then(currentState => {
    if (!currentState || Tg(currentState) || terminalState === "failed" && currentState.state === "blocked" && !Awe(currentState)) return;
    let now = new Date().toISOString();
    return Id(jobDir, {
      ...currentState,
      state: terminalState,
      detail: terminalState === "stopped" ? "stopped" : (currentState.detail || detail).replace(/; respawning$/, ""),
      tempo: "idle",
      inFlight: void 0,
      needs: void 0,
      updatedAt: now,
      firstTerminalAt: currentState.firstTerminalAt ?? now
    });
  }).catch(Pm);
}
var yC,
  pT,
  xOt = () => C.string().transform(yR),
  U1i,
  _vd,
  yvd,
  c8r = "state.json",
  a8r = 8388608,
  l8r = 0,
  VZ,
  bwe,
  G1i,
  B1i,
  Svd = 5000,
  Pnt = "starting\u2026",
  T4 = "send a prompt to start",
  Ont,
  Dnt;
var Pf = b(() => {
  YU();
  Qr();
  lt();
  kt();
  Pv();
  zf();
  qe();
  Ir();
  dn();
  Ct();
  vn();
  aA();
  tn();
  YL();
  U2e();
  yC = require("fs/promises"), pT = require("path"), U1i = /^[a-f0-9]{8}$/, _vd = /^(cse_|session_)[A-Za-z0-9_-]{1,128}$/;
  yvd = ve(() => C.object({
    state: C.string(),
    detail: C.string(),
    tempo: C.enum(["active", "idle", "blocked"]).optional(),
    inFlight: C.object({
      tasks: C.number(),
      queued: C.number(),
      kinds: C.array(C.string())
    }).optional(),
    fan: C.array(C.object({
      id: C.string().optional(),
      kind: C.enum(["agent", "workflow", "shell", "monitor", "mcp", "todo"]).optional().catch(void 0),
      label: C.string(),
      startedAt: C.number().optional(),
      doneAt: C.number().optional(),
      failed: C.boolean().optional(),
      group: C.string().optional()
    })).optional(),
    budget: C.object({
      spent: C.number(),
      target: C.number()
    }).optional(),
    tokens: C.number().optional(),
    needs_you: C.boolean().optional(),
    needs: C.string().optional(),
    block: C.object({
      questions: C.array(C.object({
        question: C.string(),
        options: C.array(C.object({
          label: C.string(),
          description: C.string()
        }))
      }))
    }).optional(),
    suggestedReply: C.string().optional(),
    output: C.record(C.string(), C.string()).nullable().default(null),
    structuredResult: C.record(C.string(), C.unknown()).optional(),
    children: C.array(C.object({
      id: C.string(),
      href: C.string(),
      kind: C.enum(["pr", "frame"]).optional()
    })).nullable().default(null),
    linkScanOffset: C.number().default(0),
    linkScanPath: xOt().transform(DOt("linkScanPath", e => pT.isAbsolute(e) && e.endsWith(".jsonl") && PP(pT.basename(e, ".jsonl")) !== null)).optional(),
    template: C.string(),
    routine: C.string().optional(),
    respawnFlags: C.array(C.string()).default([]).transform(e => J8(Swe(e))),
    bgIsolation: C.enum(["none", "worktree"]).optional(),
    providerEnv: C.record(C.string(), C.string()).transform(e => {
      let t = F1i(e);
      return t && CR(t, yR);
    }).optional(),
    sessionPermissionRules: C.object({
      allow: C.array(C.string()),
      deny: C.array(C.string())
    }).optional(),
    memoryToggledOff: C.boolean().optional(),
    intent: C.string(),
    initialPrompt: C.string().optional(),
    queuedPrompt: C.string().optional(),
    name: C.string().optional(),
    nameSource: C.enum(["user", "auto"]).optional(),
    color: C.string().optional(),
    sessionId: xOt(),
    resumeSessionId: C.string().transform(DOt("resumeSessionId", e => PP(e) !== null)).optional(),
    daemonShort: C.string().transform(DOt("daemonShort", e => U1i.test(e))).optional(),
    cliVersion: C.string().optional(),
    cwd: xOt(),
    createdAt: C.string(),
    updatedAt: C.string(),
    firstTerminalAt: C.string().nullable().default(null),
    worktreePath: xOt().optional(),
    worktreeBranch: C.string().optional(),
    worktreeHookBased: C.boolean().optional(),
    originCwd: xOt().optional(),
    bridgeSessionId: C.string().transform(DOt("bridgeSessionId", e => _vd.test(e))).optional(),
    bridgeOutboundOnly: C.boolean().optional(),
    bridgeSessionSeq: C.number().transform(DOt("bridgeSessionSeq", e => Number.isInteger(e) && e >= 0)).optional(),
    backend: C.enum(["daemon", "peer", "remote"]).catch("daemon").default("daemon").transform(e => {
      if (e === "daemon") return e;
      return A(`[jobs] coerced persisted backend '${e}' to 'daemon' \u2014 peer/remote rows are never written to disk`, {
        level: "warn"
      }), "daemon";
    }),
    sock: C.string().optional(),
    pid: C.number().optional(),
    sortOrder: C.number().optional(),
    stateSortOrder: C.number().optional(),
    pinned: C.boolean().optional()
  }).transform(({
    needs_you: e,
    ...t
  }) => ({
    ...t,
    tempo: t.tempo ?? (e ? "blocked" : "idle")
  })));
  VZ = new Map(), bwe = new Set();
  B1i = Promise.resolve();
  Ont = `(idle \u2014 ${T4})`, Dnt = ["starting", "resuming", "adopted", "crashed"];
});

export {DOt,V0,ec,eb,$1i,q1i,Id,Pm,Ewe,mT,Oi,POt,$2e,Tvd,W1i,Mie,Ivn,u8r,V1i,K1i,Cwe,z1i,j1i,Y1i,J1i,X1i,Hz,OOt,bvd,Nie,Q1i,Fie,bI,Tg,Awe,Rwe,xvn,LOt,q2e,W2e,yC,pT,xOt,U1i,_vd,yvd,c8r,a8r,l8r,VZ,bwe,G1i,B1i,Svd,Pnt,T4,Ont,Dnt,Pf};
