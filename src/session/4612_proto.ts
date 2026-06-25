// @ts-nocheck
import {zd,ppl,bL} from "../../vendor/m4515.ts";
import {mne,CL} from "../../vendor/m4609.ts";
import {Ie,vn} from "./0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Bo} from "../../vendor/m5.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {In,Xd,dK,IXt,cn,ipe,Ct} from "../../vendor/m197.ts";
import {vf,Pv} from "../../vendor/m639.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Daemon worker roster persistence.
 *
 * Manages roster.json: the live registry of background worker processes.
 * Handles atomic read/parse/write, corruption quarantine, and schema
 * validation. All mutations are serialized through a promise queue.
 */

/** Returns a fresh, empty roster skeleton with current supervisor PID and timestamp. */
function createEmptyRoster() {
  return {
    proto: zd,
    supervisorPid: process.pid,
    updatedAt: Date.now(),
    workers: {}
  };
}

/**
 * Reads and validates the roster.json file.
 * If the file is absent (ENOENT) returns an empty roster.
 * If the file is corrupt or oversized, quarantines it and returns an empty roster
 * with `parseFailed: true`.
 *
 * @param opts.silent - When true, suppresses error logging and telemetry.
 */
async function readRoster(opts?: { silent?: boolean }) {
  let rawData: unknown;
  try {
    let stat = await fsPromises.lstat(mne());
    if (!stat.isFile() || stat.size > MAX_ROSTER_FILE_SIZE) {
      if (!opts?.silent) if (Ie(Error(`roster.json ${stat.isFile() ? `too large (${stat.size} bytes) — quarantining` : "is not a regular file — removing"}`)), W("tengu_bg_roster_parse_failed", {
        orphaned: -1,
        quarantined: 1,
        errCode: stat.isFile() ? Ve("E2BIG") : Ve("EFTYPE")
      }), stat.isFile()) await quarantineRoster();else await fsPromises.rm(mne(), {
        recursive: !0,
        force: !0
      }).catch((err: unknown) => Ie(err));
      return {
        ...createEmptyRoster(),
        parseFailed: !0
      };
    }
    rawData = qt(await fsPromises.readFile(mne(), "utf8"));
  } catch (err) {
    if (In(err)) return createEmptyRoster();
    if (!opts?.silent) Ie(err), W("tengu_bg_roster_parse_failed", {
      orphaned: -1,
      quarantined: 1,
      errCode: Xd(err) ?? dK(err)
    }), await quarantineRoster();
    return {
      ...createEmptyRoster(),
      parseFailed: !0
    };
  }
  let parseResult: ReturnType<ReturnType<typeof ppl>["safeParse"]>;
  try {
    parseResult = ppl().safeParse(rawData);
  } catch (err) {
    if (!opts?.silent) Ie(err), W("tengu_bg_roster_parse_failed", {
      orphaned: countRosterWorkers(rawData),
      quarantined: 1,
      errCode: IXt(err)
    }), await quarantineRoster();
    return {
      ...createEmptyRoster(),
      parseFailed: !0
    };
  }
  if (parseResult.success) return parseResult.data;
  if (!opts?.silent) {
    let workerCount = countRosterWorkers(rawData),
      firstIssue = parseResult.error.issues[0];
    Ie(Error(`roster.json parse failed (orphaning ${workerCount} worker(s)): ${firstIssue?.message}`)), W("tengu_bg_roster_parse_failed", {
      orphaned: workerCount,
      quarantined: 1,
      issuePath: firstIssue?.path.map((segment: string | number) => typeof segment === "string" && !knownRosterFields.has(segment) ? "*" : String(segment)).join("."),
      issueCode: Bo(firstIssue?.code)
    }), await quarantineRoster();
  }
  return {
    ...createEmptyRoster(),
    parseFailed: !0
  };
}

/** Renames the current roster.json to a timestamped `.corrupt.*` file to quarantine it. */
async function quarantineRoster() {
  await fsPromises.rename(mne(), `${mne()}.corrupt.${Date.now()}`).catch((err: unknown) => Ie(err));
}

/**
 * Counts the number of worker entries in a raw (unvalidated) roster object.
 * Returns 0 if the input is not an object with a `workers` map.
 */
function countRosterWorkers(rawData: unknown): number {
  let workers = rawData !== null && typeof rawData === "object" ? (rawData as Record<string, unknown>).workers : void 0;
  return workers !== null && typeof workers === "object" && !Array.isArray(workers) ? Object.keys(workers as object).length : 0;
}

/** Writes the roster object to disk as formatted JSON with mode 0o600 (owner read/write). */
async function writeRoster(roster: ReturnType<typeof createEmptyRoster>) {
  let rosterPath = mne();
  await fsPromises.mkdir(pathModule.dirname(rosterPath), {
    recursive: !0,
    mode: 448 // 0o700
  }).catch(() => {}), await vf(rosterPath, Pe(roster, null, 2), 384 /* 0o600 */).catch((err: unknown) => {
    let errCode = cn(err);
    if (errCode && ipe.has(errCode)) {
      A(`[daemon] roster write failed: ${errCode}`, {
        level: "error"
      });
      return;
    }
    throw err;
  });
}

/**
 * Applies `updater` to the current roster and persists the result.
 * All calls are serialized: each invocation waits for the previous write to finish
 * before reading, mutating, and writing, preventing concurrent clobbers.
 *
 * @param updater - Receives the current roster; may return a new roster object or
 *                  undefined to keep the (in-place-mutated) current roster.
 * @returns Promise that resolves when the write completes.
 */
function updateRoster(updater: (roster: ReturnType<typeof createEmptyRoster>) => ReturnType<typeof createEmptyRoster> | undefined) {
  let writePromise = rosterWriteQueue.then(async () => {
    let current = await readRoster(),
      next = updater(current) ?? current;
    next.supervisorPid = process.pid, next.updatedAt = Date.now(), await writeRoster(next);
  });
  return rosterWriteQueue = writePromise.catch(() => {}), writePromise;
}

var fsPromises: typeof import("fs/promises"),
  pathModule: typeof import("path"),
  /** Set of well-known roster field names; path segments not in this set are redacted to "*" in error telemetry. */
  knownRosterFields: Set<string>,
  /** Maximum allowable roster.json file size (8 MiB). */
  MAX_ROSTER_FILE_SIZE = 8388608,
  /** Serialization queue for roster writes — always a resolved-or-settling promise. */
  rosterWriteQueue: Promise<void>;

var initRosterModule = b(() => {
  kt();
  Pv();
  qe();
  Ct();
  vn();
  tn();
  CL();
  bL();
  fsPromises = require("fs/promises"), pathModule = require("path"), knownRosterFields = new Set(["proto", "supervisorPid", "updatedAt", "workers", "pid", "procStart", "sessionId", "rendezvousSock", "ptySock", "messagingSock", "rvAuth", "ptyAuth", "cliVersion", "startedAt", "attempt", "cwd", "worktreePath", "dispatch", "pendingRespawn", "decModes", "short", "nonce", "createdAt", "cols", "rows", "source", "launch", "mode", "args", "fork", "flagArgs", "cmd", "env", "reattachEnv", "worktree", "path", "ownershipToken", "isolation", "respawnFlags", "seed", "intent", "name", "agent", "routine", "attachStallRespawns"]);
  rosterWriteQueue = Promise.resolve();
});

export {createEmptyRoster as aWt,readRoster as qG,quarantineRoster as WKn,countRosterWorkers as p_l,writeRoster as wtm,updateRoster as cht,fsPromises as hue,pathModule as f_l,knownRosterFields as Rtm,MAX_ROSTER_FILE_SIZE as vtm,rosterWriteQueue as m_l,initRosterModule as uht};
