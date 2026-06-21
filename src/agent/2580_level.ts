// @ts-nocheck
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {tr,sn} from "../config/0047_namespace.ts";
import {getSessionId,lt} from "../session/0131_sent.ts";
import {Rh,ok} from "../../vendor/m633.ts";
import {Le,qt,Xt} from "../config/0228_encoding.ts";
import {dn,bLe,Se,Pn,xp,bt} from "../../vendor/m195.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Mg} from "../../vendor/m1474.ts";
import {Kc,tv} from "../../vendor/m232.ts";
import {dw,ng} from "../../vendor/m132.ts";
import {E} from "../../vendor/m319.ts";
import {b} from "../../runtime.ts";
import {B3} from "../../vendor/m453.ts";
import {Xr} from "../../vendor/m321.ts";
import {MM,pO} from "../../vendor/m126.ts";
import {UUe,tz,Mwe,c0i} from "../../vendor/m2578.ts";
import {we} from "../../vendor/m455.ts";
import {hw} from "../../vendor/m446.ts";
/** Returns a validator transformer that logs a warning and drops malformed fields from persisted job state. */
function tDt(fieldName: string, predicate: (val: any) => boolean): (val: any) => any {
  return value => {
    if (predicate(value)) return value;
    logForDebugging(`[jobs] dropped malformed ${fieldName} from persisted job state`, {
      level: "warn"
    });
    return;
  };
}

/** Returns the base jobs directory path. */
function x0(): string {
  return mE.join(tr(), "jobs");
}

/** Returns the directory path for a specific job by id. */
function vc(jobId: string): string {
  return mE.join(x0(), jobId);
}

/** Returns the 8-char job dir name from env or the first 8 chars of the session id. */
function AC(): string {
  let envJobDir = process.env.CLAUDE_JOB_DIR;
  if (envJobDir) return mE.basename(envJobDir);
  return getSessionId().slice(0, 8);
}

/** Watches the state.json mtime and calls onChange when it changes externally (not by us). Returns a cleanup fn. */
function p0i(jobId: string, onChange: () => void): () => void {
  let statePath = mE.join(vc(jobId), O3r),
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
    mC.lstat(statePath).then(stat => checkMtime(stat.mtimeMs), () => checkMtime(-1));
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
function m0i(): boolean {
  return P3r > 0;
}

/** Writes job state to disk (state.json), excluding pinned/sortOrder fields. */
async function Lp(jobDir: string, stateObj: any): Promise<void> {
  let {
    pinned: pinned,
    sortOrder: sortOrder,
    stateSortOrder: stateSortOrder,
    ...stateRest
  } = stateObj;
  P3r++;
  try {
    await Rh(mE.join(jobDir, O3r), Le(stateRest, null, 2), 384);
  } finally {
    P3r--, fC(jobDir);
  }
}

/** Handles a state write error: logs known fs errors, otherwise re-throws via De. */
function kA(err: any): void {
  let code = dn(err);
  if (code && bLe.has(code)) {
    logForDebugging(`[jobs] state write failed (${code}): ${Se(err)}`, {
      level: "error"
    });
    return;
  }
  De(err);
}

/** Builds env vars for bridge session reattach. */
function Bwe(sessionId: string | undefined, seq: number | undefined, outboundOnly: boolean | undefined): Record<string, string> | undefined {
  if (!sessionId) return;
  let reattachEnv: Record<string, string> = {
    CLAUDE_BRIDGE_REATTACH_SESSION: sessionId
  };
  if (seq !== void 0 && seq > 0) reattachEnv.CLAUDE_BRIDGE_REATTACH_SEQ = String(seq);
  if (outboundOnly !== !1) reattachEnv.CLAUDE_BRIDGE_REATTACH_OUTBOUND_ONLY = "1";
  return reattachEnv;
}

/** Invalidates the cache entry for a job directory. */
function fC(jobDir: string): void {
  zZ.delete(jobDir);
}

/** Reads and caches job state from disk, handling lstat + read + schema validation. Returns null on missing/invalid. */
async function ma(jobDir: string): Promise<any | null> {
  let statePath = mE.join(jobDir, O3r),
    orderPath = mE.join(jobDir, "order"),
    stateOrderPath = mE.join(jobDir, "stateOrder"),
    mtimeKey,
    sideFiles;
  try {
    let [statStat, orderStat, stateOrderStat] = await Promise.all([mC.lstat(statePath), mC.lstat(orderPath).catch(() => null), mC.lstat(stateOrderPath).catch(() => null)]);
    if (!statStat.isFile() || statStat.size > D3r) {
      let rejectKey = `rejected:${statStat.mtimeMs}:${statStat.size}`;
      if (zZ.get(jobDir)?.mtimeKey === rejectKey) return null;
      return logForDebugging(`[jobs] skipping ${mE.basename(jobDir)}: state.json is ${statStat.isFile() ? `too large (${statStat.size} bytes)` : "not a regular file"}`, {
        level: "warn"
      }), zZ.set(jobDir, {
        mtimeKey: rejectKey,
        state: null
      }), null;
    }
    let isValidSideFile = (sideFileStat: any) => sideFileStat !== null && sideFileStat.isFile() && sideFileStat.size <= D3r;
    sideFiles = {
      order: isValidSideFile(orderStat),
      stateOrder: isValidSideFile(stateOrderStat)
    }, mtimeKey = `${statStat.mtimeMs}:${sideFiles.order ? orderStat.mtimeMs : 0}:${sideFiles.stateOrder ? stateOrderStat.mtimeMs : 0}`;
  } catch (statErr) {
    if (Pn(statErr)) return zZ.delete(jobDir), Nwe.delete(jobDir), null;
    logForDebugging(`[jobs] ${mE.basename(jobDir)}: state.json stat failed \u2014 ${statErr instanceof Error ? statErr.message : String(statErr)}`, {
      level: "warn"
    });
    let cached = zZ.get(jobDir);
    if (!Nwe.has(jobDir)) Nwe.add(jobDir), logEvent("tengu_bg_state_read_transient", {
      errno: xp(statErr) ?? "unknown",
      had_cache: cached !== void 0
    });
    return cached?.state ?? null;
  }
  let cacheEntry = zZ.get(jobDir);
  if (cacheEntry?.mtimeKey === mtimeKey) return Nwe.delete(jobDir), cacheEntry.state;
  try {
    let [rawContent, orderContent, stateOrderContent] = await Promise.all([mC.readFile(statePath, "utf-8"), sideFiles.order ? mC.readFile(orderPath, "utf-8").catch(() => null) : Promise.resolve(null), sideFiles.stateOrder ? mC.readFile(stateOrderPath, "utf-8").catch(() => null) : Promise.resolve(null)]),
      parseResult = VAd().safeParse(qt(rawContent));
    if (!parseResult.success) return logForDebugging(`[jobs] skipping ${mE.basename(jobDir)}: state.json schema validation failed \u2014 ${parseResult.error.message}`, {
      level: "warn"
    }), zZ.set(jobDir, {
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
    if (zZ.size > 1000) zZ.clear();
    return zZ.set(jobDir, {
      mtimeKey: mtimeKey,
      state: parsedState
    }), Nwe.delete(jobDir), parsedState;
  } catch (readErr) {
    if (Pn(readErr)) return zZ.delete(jobDir), Nwe.delete(jobDir), null;
    if (logForDebugging(`[jobs] ${mE.basename(jobDir)}: state.json read/parse failed \u2014 ${readErr instanceof Error ? readErr.message : String(readErr)}`, {
      level: "warn"
    }), !Nwe.has(jobDir)) Nwe.add(jobDir), logEvent("tengu_bg_state_read_transient", {
      errno: xp(readErr) ?? "unknown",
      had_cache: cacheEntry !== void 0
    });
    return cacheEntry?.state ?? null;
  }
}

/** Returns the path to the pins.json file. */
function nDt(): string {
  return mE.join(x0(), "pins.json");
}

/** Reads the set of pinned job ids from pins.json, falling back to directory scan. */
async function $Ue(): Promise<Set<string>> {
  try {
    let pinsStat = await mC.lstat(nDt());
    if (!pinsStat.isFile() || pinsStat.size > D3r) {
      if (!pinsStat.isFile()) await mC.rm(nDt(), {
        recursive: !0,
        force: !0
      }).catch(() => {});
      return new Set();
    }
    let rawPins = await mC.readFile(nDt(), "utf-8"),
      parsedPins = qt(rawPins);
    if (!Array.isArray(parsedPins)) return new Set();
    return new Set(parsedPins.filter(pin => typeof pin === "string"));
  } catch (err) {
    if (Pn(err)) return KAd();
    return new Set();
  }
}

/** Scans job directories for a "pinned" sentinel file and writes pins.json. */
async function KAd(): Promise<Set<string>> {
  let dirEntries;
  try {
    dirEntries = await mC.readdir(x0(), {
      withFileTypes: !0
    });
  } catch {
    return new Set();
  }
  let jobsBase = x0(),
    pinnedIds: string[] = [];
  await Promise.all(dirEntries.filter(entry => entry.isDirectory()).map(entry => mC.lstat(mE.join(jobsBase, entry.name, "pinned")).then(pinnedStat => {
    if (pinnedStat.isFile()) pinnedIds.push(entry.name);
  }, () => {})));
  let pinnedSet = new Set(pinnedIds);
  return await f0i(pinnedSet).catch(writeErr => {
    if (!Pn(writeErr)) kA(writeErr);
  }), pinnedSet;
}

/** Writes the set of pinned job ids to pins.json. */
async function f0i(pinnedSet: Set<string>): Promise<void> {
  let pinsPath = nDt();
  await mC.mkdir(mE.dirname(pinsPath), {
    recursive: !0
  }), await Rh(pinsPath, Le([...pinnedSet], null, 2));
}

/** Updates the name of a job in its state file. Returns true on success. */
async function Fwe(jobId: string, newName: string, nameSource: string): Promise<boolean> {
  let jobDir = vc(jobId),
    currentState = await ma(jobDir);
  if (!currentState) return !1;
  if (currentState.name === newName) return !0;
  fC(jobDir);
  let freshState = (await ma(jobDir)) ?? currentState;
  if (freshState.name === newName || nameSource === "auto" && freshState.name) return !0;
  return Lp(jobDir, {
    ...freshState,
    name: newName,
    nameSource: nameSource,
    updatedAt: new Date().toISOString()
  }).then(() => !0, writeErr => {
    if (!Pn(writeErr)) kA(writeErr);
    return !1;
  });
}

/** Updates the color of a job in its state file. Returns true on success. */
async function $En(jobId: string, newColor: string): Promise<boolean> {
  let jobDir = vc(jobId),
    currentState = await ma(jobDir);
  if (!currentState) return !1;
  if (currentState.color === newColor) return !0;
  fC(jobDir);
  let freshState = (await ma(jobDir)) ?? currentState;
  if (freshState.color === newColor) return !0;
  return Lp(jobDir, {
    ...freshState,
    color: newColor,
    updatedAt: new Date().toISOString()
  }).then(() => !0, writeErr => {
    if (!Pn(writeErr)) kA(writeErr);
    return !1;
  });
}

/** Updates respawnFlags by replacing a flag value pair in the background job's state. */
async function Uwe(flagKey: string, oldFlagValues: string[], newFlagValue: string | null): Promise<void> {
  let jobDirEnv = process.env.CLAUDE_JOB_DIR;
  if (!jobDirEnv || process.env.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  fC(jobDirEnv);
  let currentState = await ma(jobDirEnv);
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
  fC(jobDirEnv);
  let freshState = (await ma(jobDirEnv)) ?? currentState;
  await Lp(jobDirEnv, {
    ...freshState,
    respawnFlags: filterFlags(freshState.respawnFlags ?? currentState.respawnFlags),
    updatedAt: new Date().toISOString()
  }).catch(writeErr => {
    if (!Pn(writeErr)) kA(writeErr);
  });
}

/** Appends a flag key+value pair to respawnFlags in the bg job state if not already present. */
async function A0i(flagKey: string, flagValue: string): Promise<void> {
  let jobDirEnv = process.env.CLAUDE_JOB_DIR;
  if (!jobDirEnv || process.env.CLAUDE_CODE_SESSION_KIND !== "bg") return;
  fC(jobDirEnv);
  let currentState = await ma(jobDirEnv);
  if (!currentState?.respawnFlags) return;
  for (let idx = 0; idx < currentState.respawnFlags.length - 1; idx++) if (currentState.respawnFlags[idx] === flagKey && currentState.respawnFlags[idx + 1] === flagValue) return;
  fC(jobDirEnv);
  let freshState = (await ma(jobDirEnv)) ?? currentState;
  await Lp(jobDirEnv, {
    ...freshState,
    respawnFlags: [...(freshState.respawnFlags ?? []), flagKey, flagValue],
    updatedAt: new Date().toISOString()
  }).catch(writeErr => {
    if (!Pn(writeErr)) kA(writeErr);
  });
}

/** Writes the sort order for a job to the "order" file. */
async function h0i(jobDir: string, order: number): Promise<void> {
  await mC.writeFile(mE.join(jobDir, "order"), String(order), "utf-8"), fC(jobDir);
}

/** Writes the state sort order for a job to the "stateOrder" file. */
async function g0i(jobDir: string, stateOrder: number): Promise<void> {
  await mC.writeFile(mE.join(jobDir, "stateOrder"), String(stateOrder), "utf-8"), fC(jobDir);
}

/** Acquires an exclusive lock on .order and runs the callback. */
async function _0i(callback: () => Promise<any>): Promise<any> {
  let lockPath = mE.join(x0(), ".order");
  await mC.mkdir(x0(), {
    recursive: !0
  });
  await using lockHandle = await Mg(lockPath, {
    realpath: !1,
    stale: 5000,
    retries: {
      retries: 5,
      minTimeout: 20
    },
    onCompromised: lockErr => logForDebugging(`jobs/.order lock compromised (likely process suspend or slow fs): ${lockErr}`, {
      level: "error"
    })
  });
  return await callback();
}

/** Queues a pin/unpin update for a job, serialized through a promise chain. */
function y0i(jobId: string, shouldPin: boolean): Promise<void> {
  let nextPromise = u0i.then(async () => {
    let pinsPath = nDt();
    await mC.mkdir(mE.dirname(pinsPath), {
      recursive: !0
    });
    await using pinsLock = await Mg(pinsPath, {
      realpath: !1,
      stale: 5000,
      retries: {
        retries: 5,
        minTimeout: 20
      },
      onCompromised: lockErr => logForDebugging(`pins.json lock compromised (likely process suspend or slow fs): ${lockErr}`, {
        level: "error"
      })
    });
    let pinnedSet = await $Ue();
    if (shouldPin ? pinnedSet.has(jobId) : !pinnedSet.has(jobId)) return;
    if (shouldPin) pinnedSet.add(jobId);else pinnedSet.delete(jobId);
    await f0i(pinnedSet);
  });
  return u0i = nextPromise.catch(() => {}), nextPromise;
}

/** Lists all jobs with their state, optionally filtering out stale ones. */
async function nz(filterFn: ((jobs: any[]) => any[]) | undefined): Promise<any[]> {
  let dirEntries;
  try {
    dirEntries = await mC.readdir(x0(), {
      withFileTypes: !0
    });
  } catch {
    return [];
  }
  let [pinnedSet, jobsWithState] = await Promise.all([$Ue(), Promise.all(dirEntries.filter(entry => entry.isDirectory()).map(async entry => {
      let state = await ma(mE.join(x0(), entry.name));
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
  return filterFn ? rDt(jobList, filterFn) : jobList;
}

/** Filters job list, marking stale non-active jobs as failed/blocked using YAd. */
function rDt(jobs: any[], activeIds: Set<string>): any[] {
  let now = Date.now();
  return jobs.map(job => {
    if (pg(job.state)) return job;
    if (activeIds.has(job.id)) return job;
    if (now - Date.parse(job.state.createdAt) < zAd) return job;
    return {
      ...job,
      state: YAd(job.state)
    };
  });
}

/** Returns a "settled" version of a stale job state (failed or blocked). */
function YAd(stateObj: any): any {
  if (stateObj.state === "blocked" && !$we(stateObj)) return {
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
function Uie(jobSpec: any): any {
  let now = new Date().toISOString();
  return {
    state: "working",
    detail: jobSpec.detail !== void 0 ? Kc(jobSpec.detail) : xet,
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
function T0i(existingJobs: any[], rosterSessions: any[]): any[] {
  if (rosterSessions.length === 0) return existingJobs;
  let existingIds = new Set(existingJobs.map(job => job.id)),
    orphans = rosterSessions.filter(session => d0i.test(session.short) && !existingIds.has(session.short) && session.source !== "spare" && !session.dying);
  if (orphans.length === 0) return existingJobs;
  let adoptedJobs = orphans.map(session => {
    let adoptedState = {
        ...Uie({
          template: {
            name: session.agent ?? "bg",
            description: ""
          },
          routine: session.routine,
          intent: session.intent,
          name: session.name,
          detail: session.detail,
          ...(session.tempo === "active" && (session.state === "running" || Ret.includes(session.state)) ? session.routine ? {
            tempo: "idle"
          } : {
            tempo: "blocked",
            needs: Q4
          } : {
            tempo: session.tempo,
            needs: session.needs
          }),
          sessionId: dw(session.sessionId),
          cwd: dw(session.cwd),
          worktreePath: session.worktreePath === void 0 ? void 0 : dw(session.worktreePath)
        }),
        daemonShort: session.short,
        state: Ret.includes(session.state) ? "working" : session.state,
        ...(WH(session.state) && {
          inFlight: {
            tasks: 0,
            queued: 0,
            kinds: []
          }
        })
      },
      jobDir = vc(session.short);
    return mC.mkdir(jobDir, {
      recursive: !0
    }).then(() => mC.writeFile(mE.join(jobDir, "state.json"), JSON.stringify(adoptedState), {
      flag: "wx",
      mode: 384
    })).then(() => logEvent("tengu_bg_roster_orphan_adopted", {})).catch(writeErr => {
      if (dn(writeErr) !== "EEXIST") kA(writeErr);
    }), {
      id: session.short,
      state: adoptedState
    };
  });
  return [...existingJobs, ...adoptedJobs];
}

/** Maps terminal job state to an outcome string (success/failure/stopped), or null if not terminal. */
function $ie(state: string): "success" | "failure" | "stopped" | null {
  if (state === "done") return "success";
  if (state === "failed") return "failure";
  if (state === "stopped") return "stopped";
  return null;
}

/** Returns true if the job state is a terminal (done/failed/stopped) state. */
function WH(state: string): boolean {
  return $ie(state) !== null;
}

/** Returns true if the job is in a settled (terminal and non-active) state. */
function pg(stateObj: any): boolean {
  return WH(stateObj.state) && stateObj.tempo !== "active";
}

/** Returns true if this is an exec template job with no respawn flags (non-respawnable). */
function $we(stateObj: any): boolean {
  return stateObj.template === "exec" && stateObj.respawnFlags.length === 0;
}

/** Returns the effective origin cwd, stripping worktree sub-paths. */
function qwe(stateObj: any): string {
  let originCwd = stateObj.originCwd || (stateObj.cwd.match(/^(.+?)[/\\]\.claude[/\\]worktrees[/\\]/)?.[1] ?? stateObj.cwd);
  return dw(originCwd);
}

/** Returns true if the job's intent or initial prompt starts with /loop. */
function oDt(stateObj: any): boolean {
  let isLoop = (text: string | undefined) => text?.trim().toLowerCase().startsWith("/loop") ?? !1;
  return isLoop(stateObj.intent) || isLoop(stateObj.initialPrompt);
}

/** Returns true if the job is a routine/cron/loop job. */
function qUe(stateObj: any): boolean {
  return stateObj.routine !== void 0 || (stateObj.inFlight?.kinds.includes("session_cron") ?? !1) || oDt(stateObj);
}

/** Updates job state to a terminal state on the filesystem. */
function jUe(jobId: string, terminalState: string, detail: string): Promise<void> {
  let jobDir = vc(jobId);
  return ma(jobDir).then(currentState => {
    if (!currentState || pg(currentState) || terminalState === "failed" && currentState.state === "blocked" && !$we(currentState)) return;
    let now = new Date().toISOString();
    return Lp(jobDir, {
      ...currentState,
      state: terminalState,
      detail: terminalState === "stopped" ? "stopped" : (currentState.detail || detail).replace(/; respawning$/, ""),
      tempo: "idle",
      inFlight: void 0,
      needs: void 0,
      updatedAt: now,
      firstTerminalAt: currentState.firstTerminalAt ?? now
    });
  }).catch(kA);
}
var mC: any,
  mE: any,
  eDt = () => E.string().transform(dw),
  d0i: RegExp,
  GAd: RegExp,
  VAd: any,
  O3r = "state.json",
  D3r = 8388608,
  P3r = 0,
  zZ: Map<string, any>,
  Nwe: Set<string>,
  u0i: Promise<any>,
  zAd = 5000,
  xet = "starting\u2026",
  Q4 = "send a prompt to start",
  ket: string,
  Ret: string[];
var mg = b(() => {
  B3();
  Xr();
  lt();
  Ct();
  ok();
  ng();
  qe();
  sn();
  bt();
  Rn();
  tv();
  Xt();
  MM();
  UUe();
  mC = require("fs/promises"), mE = require("path"), d0i = /^[a-f0-9]{8}$/, GAd = /^(cse_|session_)[A-Za-z0-9_-]{1,128}$/;
  VAd = we(() => E.object({
    state: E.string(),
    detail: E.string(),
    tempo: E.enum(["active", "idle", "blocked"]).optional(),
    inFlight: E.object({
      tasks: E.number(),
      queued: E.number(),
      kinds: E.array(E.string())
    }).optional(),
    fan: E.array(E.object({
      id: E.string().optional(),
      kind: E.enum(["agent", "workflow", "shell", "monitor", "mcp", "todo"]).optional().catch(void 0),
      label: E.string(),
      startedAt: E.number().optional(),
      doneAt: E.number().optional(),
      failed: E.boolean().optional(),
      group: E.string().optional()
    })).optional(),
    budget: E.object({
      spent: E.number(),
      target: E.number()
    }).optional(),
    tokens: E.number().optional(),
    needs_you: E.boolean().optional(),
    needs: E.string().optional(),
    block: E.object({
      questions: E.array(E.object({
        question: E.string(),
        options: E.array(E.object({
          label: E.string(),
          description: E.string()
        }))
      }))
    }).optional(),
    suggestedReply: E.string().optional(),
    output: E.record(E.string(), E.string()).nullable().default(null),
    structuredResult: E.record(E.string(), E.unknown()).optional(),
    children: E.array(E.object({
      id: E.string(),
      href: E.string(),
      kind: E.enum(["pr", "frame"]).optional()
    })).nullable().default(null),
    linkScanOffset: E.number().default(0),
    linkScanPath: eDt().transform(tDt("linkScanPath", e => mE.isAbsolute(e) && e.endsWith(".jsonl") && pO(mE.basename(e, ".jsonl")) !== null)).optional(),
    template: E.string(),
    routine: E.string().optional(),
    respawnFlags: E.array(E.string()).default([]).transform(e => tz(Mwe(e))),
    bgIsolation: E.enum(["none", "worktree"]).optional(),
    providerEnv: E.record(E.string(), E.string()).transform(e => {
      let t = c0i(e);
      return t && hw(t, dw);
    }).optional(),
    sessionPermissionRules: E.object({
      allow: E.array(E.string()),
      deny: E.array(E.string())
    }).optional(),
    memoryToggledOff: E.boolean().optional(),
    intent: E.string(),
    initialPrompt: E.string().optional(),
    queuedPrompt: E.string().optional(),
    name: E.string().optional(),
    nameSource: E.enum(["user", "auto"]).optional(),
    color: E.string().optional(),
    sessionId: eDt(),
    resumeSessionId: E.string().transform(tDt("resumeSessionId", e => pO(e) !== null)).optional(),
    daemonShort: E.string().transform(tDt("daemonShort", e => d0i.test(e))).optional(),
    cliVersion: E.string().optional(),
    cwd: eDt(),
    createdAt: E.string(),
    updatedAt: E.string(),
    firstTerminalAt: E.string().nullable().default(null),
    worktreePath: eDt().optional(),
    worktreeBranch: E.string().optional(),
    worktreeHookBased: E.boolean().optional(),
    originCwd: eDt().optional(),
    bridgeSessionId: E.string().transform(tDt("bridgeSessionId", e => GAd.test(e))).optional(),
    bridgeOutboundOnly: E.boolean().optional(),
    bridgeSessionSeq: E.number().transform(tDt("bridgeSessionSeq", e => Number.isInteger(e) && e >= 0)).optional(),
    backend: E.enum(["daemon", "peer", "remote"]).catch("daemon").default("daemon").transform(e => {
      if (e === "daemon") return e;
      return logForDebugging(`[jobs] coerced persisted backend '${e}' to 'daemon' \u2014 peer/remote rows are never written to disk`, {
        level: "warn"
      }), "daemon";
    }),
    sock: E.string().optional(),
    pid: E.number().optional(),
    sortOrder: E.number().optional(),
    stateSortOrder: E.number().optional(),
    pinned: E.boolean().optional()
  }).transform(({
    needs_you: e,
    ...t
  }) => ({
    ...t,
    tempo: t.tempo ?? (e ? "blocked" : "idle")
  })));
  zZ = new Map(), Nwe = new Set();
  u0i = Promise.resolve();
  ket = `(idle \u2014 ${Q4})`, Ret = ["starting", "resuming", "adopted", "crashed"];
});
export {tDt,x0,vc,AC,p0i,m0i,Lp,kA,Bwe,fC,ma,nDt,$Ue,KAd,f0i,Fwe,$En,Uwe,A0i,h0i,g0i,_0i,y0i,nz,rDt,YAd,Uie,T0i,$ie,WH,pg,$we,qwe,oDt,qUe,jUe,mC,mE,eDt,d0i,GAd,VAd,O3r,D3r,P3r,zZ,Nwe,u0i,zAd,xet,Q4,ket,Ret,mg};
