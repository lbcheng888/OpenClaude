// @ts-nocheck
import {xh,wm} from "../../vendor/m707.ts";
import {getSettings_DEPRECATED as $o,getSettingsForSource as An,rawSettingsContainsKey as Tbr,br} from "../config/0745_updateSettingsForSource.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {d0e,kct} from "../../vendor/m3779.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {In,Jo,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {k1e,Arn} from "../../vendor/m617.ts";
import {aj,D_} from "./2784_withFileTypes.ts";
import {hE,resolveToolAlias as UR} from "../config/2229_observed_uid.ts";
import {TXr,HI} from "../telemetry/3173_error.ts";
import {or,qbe,dn} from "../config/0137_namespace.ts";
import {dQr,pQr,kDn} from "../../vendor/m3207.ts";
import {DJl,otr,aBo} from "../../vendor/m5423.ts";
import {$2e,Oi,Tg,Pf} from "./2591_level.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {isProcessRunning as k0,isSameProcessAsync as Xv,lE} from "../../vendor/m1461.ts";
import {reapJobWorktreeIfSafe as iLo,cleanupStaleAgentWorktrees as sLo,qI} from "../session/5205_worktreeBranchName.ts";
import {fVl,V_t} from "../../vendor/m5292.ts";
import {OLi,R5r} from "../../vendor/m2530.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
import {rY} from "../../vendor/m3778.ts";
// Retention / disk-cleanup routines for Claude Code's local state directories.
// Each `*Um` function cleans one category of on-disk artifacts older than the
// configured retention window and returns a {messages, errors} tally.

/** Decide whether retention cleanup should run at all, based on settings sources. */
function wUm() {
  if (!xh("userSettings") && $o()?.cleanupPeriodDays === void 0) return A("Skipping retention cleanup: userSettings source is disabled (--setting-sources) and no enabled source provides cleanupPeriodDays."), !1;
  if (An("policySettings")?.cleanupPeriodDays !== void 0) return !0;
  let {
    errors: validationErrors
  } = d0e();
  if (validationErrors.length > 0 && Tbr("cleanupPeriodDays")) return A("Skipping cleanup: settings have validation errors but cleanupPeriodDays was explicitly set. Fix settings errors to enable cleanup."), !1;
  return !0;
}

/** Compute the cutoff Date: anything older than `cleanupPeriodDays` is stale. `maxDays` caps the window. */
function EV(maxDays) {
  let periodDays = ($o() || {}).cleanupPeriodDays ?? vUm;
  if (periodDays === 0) return null;
  if (maxDays !== void 0 && maxDays < periodDays) periodDays = maxDays;
  let periodMs = periodDays * 24 * 60 * 60 * 1000;
  return new Date(Date.now() - periodMs);
}

/** Sum two cleanup tallies. */
function XGe(a: { messages: number; errors: number }, b: { messages: number; errors: number }) {
  return {
    messages: a.messages + b.messages,
    errors: a.errors + b.errors
  };
}

/** Parse a log filename timestamp (T HH-MM-SS-mmm Z) into a Date. */
function kUm(fileName: string) {
  let isoText = mi(fileName, ".").replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/, "T$1:$2:$3.$4Z");
  return new Date(isoText);
}

/** Delete log files in `dir` older than `cutoff`. `countAsMessage` selects which tally bucket. */
async function UJl(dir: string, cutoff: Date, countAsMessage: boolean) {
  let tally = {
    messages: 0,
    errors: 0
  };
  try {
    let entries = await Wt().readdir(dir);
    for (let entry of entries) try {
      if (kUm(entry.name) < cutoff) if (await Wt().unlink(tu.join(dir, entry.name)), countAsMessage) tally.messages++;else tally.errors++;
    } catch (err) {
      A(`Failed to clean up file ${entry.name} in ${dir}: ${err}`, {
        level: "error"
      });
    }
  } catch (err) {
    if (In(err)) ;else if (Jo(err)) A(`cleanup readdir ${dir} failed: ${err.code}`, {
      level: "error"
    });else Ie(err);
  }
  return tally;
}

/** Clean up the error-log and mcp-logs directories. */
async function HUm() {
  let fs = Wt(),
    cutoff = EV();
  if (cutoff === null) return {
    messages: 0,
    errors: 0
  };
  let errorsDir = k1e.errors(),
    baseLogsDir = k1e.baseLogs(),
    tally = await UJl(errorsDir, cutoff, !1);
  try {
    let baseEntries;
    try {
      baseEntries = await fs.readdir(baseLogsDir);
    } catch {
      return tally;
    }
    let mcpLogDirs = baseEntries.filter(e => e.isDirectory() && e.name.startsWith("mcp-logs-")).map(e => tu.join(baseLogsDir, e.name));
    for (let mcpLogDir of mcpLogDirs) tally = XGe(tally, await UJl(mcpLogDir, cutoff, !0)), await fU(mcpLogDir, fs);
  } catch (err) {
    if (In(err)) ;else if (Jo(err)) A(`cleanup mcp-logs scan failed: ${err.code}`, {
      level: "error"
    });else Ie(err);
  }
  return tally;
}

/** Delete a single file if its mtime predates `cutoff`. Returns whether it was removed. */
async function bV(filePath: string, cutoff: Date, fs) {
  if ((await fs.stat(filePath)).mtime < cutoff) return await fs.unlink(filePath), !0;
  return !1;
}

/** Best-effort rmdir (ignores non-empty / missing). */
async function fU(dir: string, fs) {
  try {
    await fs.rmdir(dir);
  } catch {}
}

/** Recursively delete files older than `cutoff` under `dir`, then remove now-empty dirs. */
async function $Jl(dir: string, cutoff: Date, fs, tally: { messages: number; errors: number }) {
  for (let entry of await fs.readdir(dir).catch(() => [])) {
    let childPath = tu.join(dir, entry.name);
    if (entry.isDirectory()) await $Jl(childPath, cutoff, fs, tally);else if (entry.isFile()) try {
      if (await bV(childPath, cutoff, fs)) tally.messages++;
    } catch {
      tally.errors++;
    } else try {
      if ((await fs.lstat(childPath)).mtime < cutoff) await fs.unlink(childPath), tally.messages++;
    } catch {
      tally.errors++;
    }
  }
  await fU(dir, fs);
}

/** Return the newest mtime (ms) found recursively under `dir`, or null if empty. */
async function qJl(dir: string, fs) {
  let newest = -1 / 0;
  for (let entry of await fs.readdir(dir).catch(() => [])) {
    let childPath = tu.join(dir, entry.name);
    if (entry.isDirectory()) {
      let childNewest = await qJl(childPath, fs);
      if (childNewest !== null) newest = Math.max(newest, childNewest);
    } else if (entry.isFile()) try {
      let {
        mtimeMs
      } = await fs.stat(childPath);
      newest = Math.max(newest, mtimeMs);
    } catch {}
  }
  return newest === -1 / 0 ? null : newest;
}

/** Clean up project session directories (.jsonl transcripts, casts, mcp tasks, bagel, subagents, etc.). */
async function IUm() {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let projectsDir = aj(),
    fs = Wt(),
    projectEntries;
  try {
    projectEntries = await fs.readdir(projectsDir);
  } catch {
    return tally;
  }
  let shadowRoot;
  try {
    if (shadowRoot = hE(), !(await fs.lstat(shadowRoot)).isDirectory()) shadowRoot = null;
  } catch {
    shadowRoot = null;
  }
  for (let projectEntry of projectEntries) {
    if (!projectEntry.isDirectory()) continue;
    let projectDir = tu.join(projectsDir, projectEntry.name),
      projectFiles;
    try {
      projectFiles = await fs.readdir(projectDir);
    } catch {
      tally.errors++;
      continue;
    }
    projectFiles.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()));
    let sessionIds = new Set(projectFiles.filter(f => f.isFile() && f.name.endsWith(".jsonl")).map(f => f.name.slice(0, -6)));
    for (let entry of projectFiles) if (entry.isFile()) {
      if (!entry.name.endsWith(".jsonl") && !entry.name.endsWith(".cast") && !entry.name.endsWith(".ccr-tip.json") && !entry.name.includes(".ccr-tip.json.tmp.")) continue;
      try {
        if (await bV(tu.join(projectDir, entry.name), cutoff, fs)) {
          if (tally.messages++, entry.name.endsWith(".jsonl")) {
            let sessionId = entry.name.slice(0, -6);
            if (sessionId && sessionId !== "." && sessionId !== "..") {
              if (await fs.unlink(tu.join(projectDir, `${sessionId}.ccr-tip.json`)).catch(() => {}), await fs.rm(tu.join(projectDir, sessionId), {
                recursive: !0,
                force: !0
              }).catch(() => {
                tally.errors++;
              }), shadowRoot !== null) {
                let shadowProjectDir = tu.join(shadowRoot, projectEntry.name);
                if ((await fs.lstat(shadowProjectDir).catch(() => null))?.isDirectory()) await fs.rm(tu.join(shadowProjectDir, sessionId), {
                  recursive: !0,
                  force: !0
                }).catch(() => {
                  tally.errors++;
                }), await fU(shadowProjectDir, fs);
              }
            }
          }
        }
      } catch (err) {
        if (!In(err)) tally.errors++;
      }
    } else if (entry.isDirectory()) {
      let subDir = tu.join(projectDir, entry.name);
      if (entry.name === "bagel") {
        let newest = await qJl(subDir, fs);
        if (newest !== null && newest < cutoff.getTime()) try {
          await fs.rm(subDir, {
            recursive: !0,
            force: !0
          }), tally.messages++;
        } catch {
          tally.errors++;
        }
        continue;
      }
      let mcpDir = tu.join(subDir, TXr),
        mcpEntries = await fs.readdir(mcpDir).catch(() => []);
      for (let mcpEntry of mcpEntries) if (mcpEntry.isFile()) try {
        if (await bV(tu.join(mcpDir, mcpEntry.name), cutoff, fs)) tally.messages++;
      } catch {
        tally.errors++;
      } else if (mcpEntry.isDirectory()) {
        let mcpSubDir = tu.join(mcpDir, mcpEntry.name),
          mcpSubEntries;
        try {
          mcpSubEntries = await fs.readdir(mcpSubDir);
        } catch {
          continue;
        }
        for (let mcpSubEntry of mcpSubEntries) {
          if (!mcpSubEntry.isFile()) continue;
          try {
            if (await bV(tu.join(mcpSubDir, mcpSubEntry.name), cutoff, fs)) tally.messages++;
          } catch {
            tally.errors++;
          }
        }
        await fU(mcpSubDir, fs);
      }
      await fU(mcpDir, fs);
      let mcpTasksDir = tu.join(subDir, "mcp-tasks");
      for (let taskEntry of await fs.readdir(mcpTasksDir).catch(() => [])) {
        if (!taskEntry.isFile() || !taskEntry.name.endsWith(".json")) continue;
        try {
          if (await bV(tu.join(mcpTasksDir, taskEntry.name), cutoff, fs)) tally.messages++;
        } catch {
          tally.errors++;
        }
      }
      if (await fU(mcpTasksDir, fs), !sessionIds.has(entry.name)) for (let agentSubDir of ["subagents", "workflows", "remote-agents"]) await $Jl(tu.join(subDir, agentSubDir), cutoff, fs, tally);
      await fU(subDir, fs);
    }
    await fU(projectDir, fs);
  }
  return tally;
}

/** Generic cleanup: delete files in `dir` ending with `suffix` that are older than the cutoff. */
async function hU(dir: string, suffix: string, removeDir = !0, maxDays?: number) {
  let cutoff = EV(maxDays),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt(),
    entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    return tally;
  }
  for (let entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(suffix)) continue;
    try {
      if (await bV(tu.join(dir, entry.name), cutoff, fs)) tally.messages++;
    } catch {
      tally.errors++;
    }
  }
  if (removeDir) await fU(dir, fs);
  return tally;
}

/** Clean up the stale HFI auth file. */
async function xUm() {
  let tally = {
      messages: 0,
      errors: 0
    },
    cutoff = EV();
  if (cutoff === null) return tally;
  let authFile = tu.join(or(), "hfi-auth.json");
  try {
    if (await bV(authFile, cutoff, Wt())) tally.messages++;
  } catch (err) {
    if (!In(err)) A(`Failed to clean up HFI auth file: ${err}`, {
      level: "error"
    }), tally.errors++;
  }
  return tally;
}

/** Clean up the stale MCP needs-auth cache file. */
async function DUm() {
  let tally = {
      messages: 0,
      errors: 0
    },
    cutoff = EV();
  if (cutoff === null) return tally;
  let cacheFile = tu.join(or(), "mcp-needs-auth-cache.json");
  try {
    if (await bV(cacheFile, cutoff, Wt())) tally.messages++;
  } catch (err) {
    if (!In(err)) if (tally.errors++, Jo(err)) A(`cleanup mcp-auth-cache failed: ${err.code}`, {
      level: "error"
    });else Ie(err);
  }
  return tally;
}

/** Clean up stale plan markdown files. */
function PUm() {
  let plansDir = tu.join(or(), "plans");
  return hU(plansDir, ".md");
}

/** Generic cleanup of stale subdirectories under a named config dir. `keep` whitelists names; `guard` can veto a removal. */
async function QGe(subPath: string, keep?: Set<string>, guard?: (dir: string) => Promise<boolean>) {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt(),
    baseDir = tu.join(or(), subPath),
    entries;
  try {
    entries = await fs.readdir(baseDir);
  } catch {
    return tally;
  }
  for (let entry of entries) {
    if (!entry.isDirectory() || keep?.has(entry.name)) continue;
    let dirPath = tu.join(baseDir, entry.name);
    try {
      if ((await fs.stat(dirPath)).mtime < cutoff) {
        if (await guard?.(dirPath)) continue;
        await fs.rm(dirPath, {
          recursive: !0,
          force: !0
        }), tally.messages++;
      }
    } catch {
      tally.errors++;
    }
  }
  return await fU(baseDir, fs), tally;
}

function OUm() {
  return QGe("file-history");
}

function LUm() {
  return QGe("session-env");
}

function MUm() {
  return QGe("tasks");
}

function NUm() {
  return QGe("uploads");
}

function FUm() {
  return QGe(tu.join("skills", ".staging"));
}

/** Clean up stale plugin cache directories, keeping the active cacheKey per plugin. */
async function BUm() {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt(),
    pluginsDir = tu.join(or(), dQr),
    pluginEntries;
  try {
    pluginEntries = await fs.readdir(pluginsDir);
  } catch {
    return tally;
  }
  for (let pluginEntry of pluginEntries) {
    if (!pluginEntry.isDirectory()) continue;
    let pluginDir = tu.join(pluginsDir, pluginEntry.name),
      activeCacheKey = (await pQr(pluginDir))?.cacheKey ?? null,
      cacheEntries;
    try {
      cacheEntries = await fs.readdir(pluginDir);
    } catch {
      tally.errors++;
      continue;
    }
    for (let cacheEntry of cacheEntries) {
      if (!cacheEntry.isDirectory() || cacheEntry.name === activeCacheKey) continue;
      let cacheDir = tu.join(pluginDir, cacheEntry.name);
      try {
        if ((await fs.stat(cacheDir)).mtime < cutoff) await fs.rm(cacheDir, {
          recursive: !0,
          force: !0
        }), tally.messages++;
      } catch {
        tally.errors++;
      }
    }
    try {
      if ((await fs.stat(pluginDir)).mtime < cutoff) await fs.rm(pluginDir, {
        recursive: !0,
        force: !0
      }), tally.messages++;
    } catch {
      tally.errors++;
    }
  }
  return await fU(pluginsDir, fs), tally;
}

/** Clean up usage-data facets / session-meta / html artifacts. */
async function UUm() {
  let usageDir = tu.join(or(), "usage-data"),
    tally = await hU(tu.join(usageDir, "facets"), ".json");
  return tally = XGe(tally, await hU(tu.join(usageDir, "session-meta"), ".json")), tally = XGe(tally, await hU(usageDir, ".html", !1)), await fU(usageDir, Wt()), tally;
}

/** Clean up stale cc-transcript-*.txt files in the temp/shadow dir. */
async function $Um() {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt(),
    transcriptDir;
  try {
    transcriptDir = hE();
  } catch {
    return tally;
  }
  let entries;
  try {
    entries = await fs.readdir(transcriptDir);
  } catch {
    return tally;
  }
  for (let entry of entries) {
    if (!entry.isFile() || !entry.name.startsWith("cc-transcript-") || !entry.name.endsWith(".txt")) continue;
    try {
      if (await bV(tu.join(transcriptDir, entry.name), cutoff, fs)) tally.messages++;
    } catch {
      tally.errors++;
    }
  }
  return tally;
}

/** Clean up stale share directories and .zip bundles. */
async function qUm() {
  let sharesDir = tu.join(or(), "shares"),
    tally = await QGe("shares");
  return tally = XGe(tally, await hU(sharesDir, ".zip", !1)), await fU(sharesDir, Wt()), tally;
}

function WUm() {
  return hU(tu.join(or(), "telemetry"), ".json");
}

function GUm() {
  return hU(tu.join(or(), "dump-prompts"), ".jsonl", !0, DJl);
}

function VUm() {
  return hU(tu.join(or(), "shell-snapshots"), ".sh");
}

/** Clean up stale agent-inbox JSON messages. */
async function KUm() {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt(),
    agentsRoot = qbe();
  for (let agentEntry of await fs.readdir(agentsRoot).catch(() => [])) {
    if (!agentEntry.isDirectory()) continue;
    let inboxesDir = tu.join(agentsRoot, agentEntry.name, "inboxes");
    for (let inboxEntry of await fs.readdir(inboxesDir).catch(() => [])) {
      if (!inboxEntry.isFile() || !inboxEntry.name.endsWith(".json")) continue;
      try {
        if (await bV(tu.join(inboxesDir, inboxEntry.name), cutoff, fs)) tally.messages++;
      } catch {
        tally.errors++;
      }
    }
    await fU(inboxesDir, fs), await fU(tu.join(agentsRoot, agentEntry.name), fs);
  }
  return tally;
}

/** Clean up daemon job/dispatch artifacts and the worker roster, sparing live workers. */
async function zUm() {
  let configDir = or(),
    tally = await hU(tu.join(configDir, "jobs", "settled"), ".json");
  tally = XGe(tally, await hU(tu.join(configDir, "daemon", "dispatch", "rejected"), ".json")), tally = XGe(tally, await hU(tu.join(configDir, "daemon", "dispatch"), ".json", !1));
  let policyHasPeriod = An("policySettings")?.cleanupPeriodDays !== void 0,
    cutoff = EV(),
    keepJobIds = new Set();
  if (!policyHasPeriod) for (let jobId of await $2e()) keepJobIds.add(jobId);
  let rosterValid = !1,
    hasLiveWorker = !1;
  try {
    let rosterPath = tu.join(configDir, "daemon", "roster.json"),
      rosterStat = await Wt().lstat(rosterPath);
    if (!rosterStat.isFile() || rosterStat.size > 8388608) throw Error("not a regular file");
    let rosterText = await Wt().readFile(rosterPath, {
        encoding: "utf-8"
      }),
      roster = qt(rosterText);
    if (roster !== null && typeof roster === "object" && "workers" in roster) {
      let workers = roster.workers;
      if (workers !== null && typeof workers === "object") {
        rosterValid = !0;
        for (let [workerId, worker] of Object.entries(workers)) if (worker !== null && typeof worker === "object" && "pid" in worker && typeof worker.pid === "number" && k0(worker.pid) && (await Xv(worker.pid, "procStart" in worker && typeof worker.procStart === "string" ? worker.procStart : void 0))) keepJobIds.add(workerId), hasLiveWorker = !0;
      }
    }
  } catch {}
  if (tally = XGe(tally, await QGe("jobs", keepJobIds, async jobDir => {
    let job = await Oi(jobDir);
    if (!policyHasPeriod && (job === null || !Tg(job))) return !0;
    if (job?.worktreePath && Tg(job) && cutoff) await iLo(job.worktreePath, job.worktreeBranch, job.originCwd, job.worktreeHookBased, cutoff).catch(() => {});
    return !1;
  })), cutoff !== null) {
    let fs = Wt();
    for (let logPath of [tu.join(configDir, "daemon.log"), tu.join(configDir, "daemon.log.1")]) try {
      if (await bV(logPath, cutoff, fs)) tally.messages++;
    } catch (err) {
      if (!In(err)) tally.errors++;
    }
    let rosterPath = tu.join(configDir, "daemon", "roster.json");
    try {
      if ((await fs.lstat(rosterPath)).mtime < cutoff && !hasLiveWorker && (rosterValid || policyHasPeriod)) await fs.unlink(rosterPath), tally.messages++;
    } catch (err) {
      if (!In(err)) tally.errors++;
    }
    for (let entry of await fs.readdir(tu.join(configDir, "daemon")).catch(() => [])) {
      if (!entry.isFile() || !entry.name.startsWith("roster.json.corrupt.")) continue;
      try {
        if (await bV(tu.join(configDir, "daemon", entry.name), cutoff, fs)) tally.messages++;
      } catch {
        tally.errors++;
      }
    }
  }
  return await otr(), tally;
}

function jUm() {
  return hU(tu.join(or(), "backups"), "", !1);
}

/** Clean up stale debug files (keeping the `latest` entry). */
async function YUm() {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt(),
    debugDir = tu.join(or(), "debug"),
    entries;
  try {
    entries = await fs.readdir(debugDir);
  } catch {
    return tally;
  }
  for (let entry of entries) {
    if (entry.name === "latest" || !entry.isFile()) continue;
    try {
      if (await bV(tu.join(debugDir, entry.name), cutoff, fs)) tally.messages++;
    } catch {
      tally.errors++;
    }
  }
  return tally;
}

async function JUm() {
  return hU(tu.join(or(), "feedback-bundles"), ".zip");
}

/** Clean up traces and startup-perf artifacts. */
async function XUm() {
  let tracesTally = await hU(tu.join(or(), "traces"), ".json"),
    perfTxtTally = await hU(tu.join(or(), "startup-perf"), ".txt"),
    perfJsonTally = await hU(tu.join(or(), "startup-perf"), ".json");
  return {
    messages: tracesTally.messages + perfTxtTally.messages + perfJsonTally.messages,
    errors: tracesTally.errors + perfTxtTally.errors + perfJsonTally.errors
  };
}

/** Clean up stale todos / statsig / logs entries (files and directories). */
async function QUm() {
  let cutoff = EV(),
    tally = {
      messages: 0,
      errors: 0
    };
  if (cutoff === null) return tally;
  let fs = Wt();
  for (let category of ["todos", "statsig", "logs"]) {
    let categoryDir = tu.join(or(), category),
      entries;
    try {
      entries = await fs.readdir(categoryDir);
    } catch {
      continue;
    }
    for (let entry of entries) {
      let entryPath = tu.join(categoryDir, entry.name);
      try {
        if ((await fs.stat(entryPath)).mtime >= cutoff) continue;
        if (entry.isDirectory()) await fs.rm(entryPath, {
          recursive: !0,
          force: !0
        });else await fs.unlink(entryPath);
        tally.messages++;
      } catch {
        tally.errors++;
      }
    }
    await fU(categoryDir, fs);
  }
  return tally;
}

/** Top-level retention sweep: runs every cleanup routine, then prunes stale worktrees. */
async function WJl() {
  if (await fVl(), !wUm()) return;
  await HUm(), await IUm(), await PUm(), await OUm(), await LUm(), await MUm(), await NUm(), await UUm(), await FUm(), await BUm(), await $Um(), await qUm(), await WUm(), await YUm(), await JUm(), await XUm(), await GUm(), await VUm(), await KUm(), await zUm(), await jUm(), await xUm(), await DUm(), await QUm();
  let cutoff = EV();
  if (cutoff !== null) {
    await OLi(cutoff);
    let removed = await sLo(cutoff);
    if (removed > 0) W("tengu_worktree_cleanup", {
      removed: removed
    });
  }
}
var tu,
  vUm = 30;
var GJl = b(() => {
  aBo();
  Pf();
  kt();
  kDn();
  Arn();
  qe();
  dn();
  Ct();
  ps();
  lE();
  V_t();
  vn();
  rY();
  R5r();
  D_();
  kct();
  wm();
  br();
  tn();
  lr();
  UR();
  HI();
  qI();
  tu = require("path");
});

export {wUm,EV,XGe,kUm,UJl,HUm,bV,fU,$Jl,qJl,IUm,hU as stringifyOptionalSurveyValue,xUm,DUm,PUm,QGe,OUm,LUm,MUm,NUm,FUm,BUm,UUm,$Um,qUm,WUm,GUm,VUm,KUm,zUm,jUm,YUm,JUm,XUm,QUm,WJl,tu,vUm,GJl};
