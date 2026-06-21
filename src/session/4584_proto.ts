// @ts-nocheck
import {Cp as JO,vsl as ueK,rM as iV} from "../../vendor/m4493.ts";
import {Sne as k_H,sM as oV} from "../../vendor/m4581.ts";
import {De as EH,Rn as S6} from "./0615_length.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_,fromEnumOpt as A9} from "../../vendor/m5.ts";
import {qt as d_,Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Pn as b6,xp as WO,vX as Ia,Xzt as Bvq,bt as L_} from "../../vendor/m195.ts";
import {Rh as yA,ok as rR} from "../../vendor/m633.ts";
import {b as L} from "../../runtime.ts";
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
    proto: JO,
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
    let stat = await fsPromises.lstat(k_H());
    if (!stat.isFile() || stat.size > MAX_ROSTER_FILE_SIZE) {
      if (!opts?.silent) if (EH(Error(`roster.json ${stat.isFile() ? `too large (${stat.size} bytes) — quarantining` : "is not a regular file — removing"}`)), c("tengu_bg_roster_parse_failed", {
        orphaned: -1,
        quarantined: 1,
        errCode: stat.isFile() ? O_("E2BIG") : O_("EFTYPE")
      }), stat.isFile()) await quarantineRoster();else await fsPromises.rm(k_H(), {
        recursive: !0,
        force: !0
      }).catch((err: unknown) => EH(err));
      return {
        ...createEmptyRoster(),
        parseFailed: !0
      };
    }
    rawData = d_(await fsPromises.readFile(k_H(), "utf8"));
  } catch (err) {
    if (b6(err)) return createEmptyRoster();
    if (!opts?.silent) EH(err), c("tengu_bg_roster_parse_failed", {
      orphaned: -1,
      quarantined: 1,
      errCode: WO(err) ?? Ia(err)
    }), await quarantineRoster();
    return {
      ...createEmptyRoster(),
      parseFailed: !0
    };
  }
  let parseResult: ReturnType<ReturnType<typeof ueK>["safeParse"]>;
  try {
    parseResult = ueK().safeParse(rawData);
  } catch (err) {
    if (!opts?.silent) EH(err), c("tengu_bg_roster_parse_failed", {
      orphaned: countRosterWorkers(rawData),
      quarantined: 1,
      errCode: Bvq(err)
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
    EH(Error(`roster.json parse failed (orphaning ${workerCount} worker(s)): ${firstIssue?.message}`)), c("tengu_bg_roster_parse_failed", {
      orphaned: workerCount,
      quarantined: 1,
      issuePath: firstIssue?.path.map((segment: string | number) => typeof segment === "string" && !knownRosterFields.has(segment) ? "*" : String(segment)).join("."),
      issueCode: A9(firstIssue?.code)
    }), await quarantineRoster();
  }
  return {
    ...createEmptyRoster(),
    parseFailed: !0
  };
}

/** Renames the current roster.json to a timestamped `.corrupt.*` file to quarantine it. */
async function quarantineRoster() {
  await fsPromises.rename(k_H(), `${k_H()}.corrupt.${Date.now()}`).catch((err: unknown) => EH(err));
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
  let rosterPath = k_H();
  await fsPromises.mkdir(pathModule.dirname(rosterPath), {
    recursive: !0,
    mode: 448 // 0o700
  }).catch(() => {}), await yA(rosterPath, bH(roster, null, 2), 384 /* 0o600 */);
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

var K3_ = L(() => {
  y_();
  rR();
  L_();
  S6();
  H6();
  oV();
  iV();
  fsPromises = require("fs/promises"), pathModule = require("path"), knownRosterFields = new Set(["proto", "supervisorPid", "updatedAt", "workers", "pid", "procStart", "sessionId", "rendezvousSock", "ptySock", "messagingSock", "rvAuth", "ptyAuth", "cliVersion", "startedAt", "attempt", "cwd", "worktreePath", "dispatch", "pendingRespawn", "decModes", "short", "nonce", "createdAt", "cols", "rows", "source", "launch", "mode", "args", "fork", "flagArgs", "cmd", "env", "reattachEnv", "worktree", "path", "ownershipToken", "isolation", "respawnFlags", "seed", "intent", "name", "agent", "routine", "attachStallRespawns"]);
  rosterWriteQueue = Promise.resolve();
});

export {createEmptyRoster as M6t,readRoster as vG,quarantineRoster as c5n,countRosterWorkers as Icl,writeRoster as E7p,updateRoster as rmt,fsPromises as _ue,pathModule as Pcl,knownRosterFields as S7p,MAX_ROSTER_FILE_SIZE as b7p,rosterWriteQueue as Dcl,K3_ as omt};
