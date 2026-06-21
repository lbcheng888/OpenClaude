// @ts-nocheck
import {jt as Q_,ws as M9} from "../../vendor/m228.ts";
import {_ne as L_H,bje as CBH,xal as B_4,Hal as F_4,Ial as g_4,nTo as C$q,_6t as bm_,rTo as b$q,oTo as I$q} from "../../vendor/m4541.ts";
import {K7e as edH,Pd as FO} from "../../vendor/m701.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Se as GH,Pn as b6,bt as L_} from "../../vendor/m195.ts";
import {isTranscriptMessage as FB,ja as iK} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {WR as kG} from "../../vendor/m2207.ts";
import {Dz as di,ry as lw} from "./2772_withFileTypes.ts";
import {b as L} from "../../runtime.ts";
import {oA as O$} from "../config/2697_oA.ts";
// Module 4525 — Usage-statistics aggregation pipeline.
//
// Scans all session JSONL files under the projects directory and accumulates
// per-day activity, per-model token counts, streak data, and other derived
// metrics used by the `/stats` command and the stats dashboard.
//
// Key exports (all named with their original recovered names):
//   $B6        — aggregate raw stats from a list of session files
//   e_4        — enumerate every session + subagent file on disk
//   iuO        — merge a cached stats snapshot with today's live data
//   ruO        — high-level: return full "all-time" stats (cache-aware)
//   B$q        — public entry-point: get stats for "all" | "7d" | "30d"
//   ouO        — build a UsageStats object from raw RawStats (windowed)
//   auO        — advance a YYYY-MM-DD date string by one day
//   suO        — retreat a YYYY-MM-DD date string by one day
//   H64        — compute current + longest activity streaks
//   _64        — return a zeroed-out UsageStats object
//
// Cross-module symbols kept verbatim (linkage must be preserved):
//   L_H   — formats a Date → "YYYY-MM-DD" string
//   CBH   — compares two "YYYY-MM-DD" strings (returns true when first < second)
//   edH   — reads and parses a JSONL session file into an array of entries
//   FB    — type-guard / predicate: is this entry a real user/assistant message?
//   b6    — error predicate: is this a "file not found" / ENOENT error?
//   di    — returns the ~/.claude/projects directory path
//   Q_    — returns the filesystem abstraction (stat, readdir, …)
//   B_4   — runs a callback inside the stats-cache mutex
//   F_4   — reads the current stats cache from disk
//   g_4   — returns today's "YYYY-MM-DD" date string (for cache timestamps)
//   C$q   — merges a RawStats object into the existing cache snapshot
//   bm_   — persists an updated stats-cache snapshot to disk
//   b$q   — returns today's "YYYY-MM-DD" date string (for streak calculations)
//   GH    — stringifies an unknown error value
//   N     — debug-log helper
//   kG    — the "<synthetic>" model constant (messages from this model are skipped)
//   K1H   — `require("path")`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single day's activity record stored in the per-day map. */
interface DailyActivityRecord {
  date: string;
  messageCount: number;
  sessionCount: number;
  toolCallCount: number;
}

/** Per-model token usage accumulated across all messages. */
interface ModelTokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadInputTokens: number;
  cacheCreationInputTokens: number;
  webSearchRequests: number;
  costUSD: number;
  contextWindow: number;
  maxOutputTokens: number;
}

/** Lightweight summary of a single session stored in sessionStats. */
interface SessionStat {
  sessionId: string;
  duration: number;
  messageCount: number;
  timestamp: string;
}

/** Daily token count broken down by model. */
interface DailyModelTokens {
  date: string;
  tokensByModel: Record<string, number>;
}

/** Streak metadata returned by H64. */
interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  currentStreakStart: string | null;
  longestStreakStart: string | null;
  longestStreakEnd: string | null;
}

/**
 * Full aggregated statistics object returned to callers.
 * Produced by both `ouO` (windowed) and `iuO` (cached + live merge).
 */
interface UsageStats {
  totalSessions: number;
  totalMessages: number;
  totalDays: number;
  activeDays: number;
  streaks: StreakInfo;
  dailyActivity: DailyActivityRecord[];
  dailyModelTokens: DailyModelTokens[];
  longestSession: SessionStat | null;
  modelUsage: Record<string, ModelTokenUsage>;
  firstSessionDate: string | null;
  lastSessionDate: string | null;
  peakActivityDay: string | null;
  peakActivityHour: number | null;
  totalSpeculationTimeSavedMs: number;
}

/** Cached stats snapshot stored on disk; includes a `lastComputedDate` sentinel. */
interface StatsCacheSnapshot extends UsageStats {
  lastComputedDate?: string;
  totalSessions: number;
}

/** Intermediate raw-stats object produced by $B6, used before streak/session math. */
interface RawStats {
  dailyActivity: DailyActivityRecord[];
  dailyModelTokens: DailyModelTokens[];
  modelUsage: Record<string, ModelTokenUsage>;
  sessionStats: SessionStat[];
  hourCounts: Record<string, number>;
  totalMessages: number;
  totalSpeculationTimeSavedMs: number;
}

/** Options accepted by $B6. */
interface DateRangeOptions {
  fromDate?: string;
  toDate?: string;
}

// ---------------------------------------------------------------------------
// $B6 — scan session files and aggregate raw stats
// ---------------------------------------------------------------------------

/**
 * Reads every JSONL session file in `sessionFiles` and aggregates raw usage
 * statistics. Accepts an optional `fromDate`/`toDate` range to skip sessions
 * outside the window.
 *
 * @param sessionFiles - absolute paths to .jsonl session transcript files
 * @param options      - optional date-range filter (YYYY-MM-DD strings)
 */
async function $B6(sessionFiles: string[], options: DateRangeOptions = {}): Promise<RawStats> {
  let {
      fromDate: fromDate,
      toDate: toDate
    } = options,
    fs = Q_(),
    dailyMap = new Map<string, DailyActivityRecord>(),
    dailyTokenMap = new Map<string, Record<string, number>>(),
    sessionStats: SessionStat[] = [],
    hourMap = new Map<number, number>(),
    totalMessages = 0,
    totalSpeculationTimeSavedMs = 0,
    modelUsage: Record<string, ModelTokenUsage> = {},
    toDateVal: string | undefined = void 0,
    seenDates = new Set<string>(),
    batchSize = 20;
  for (let batchStart = 0; batchStart < sessionFiles.length; batchStart += batchSize) {
    let batch = sessionFiles.slice(batchStart, batchStart + batchSize),
      batchResults = await Promise.all(batch.map(async (filePath: string) => {
        try {
          if (fromDate) try {
            let statResult = await fs.stat(filePath),
              fileDateStr = L_H(statResult.mtime);
            if (CBH(fileDateStr, fromDate)) return {
              sessionFile: filePath,
              entries: null,
              error: null,
              skipped: !0
            };
          } catch {}
          let entries = await edH(filePath);
          return {
            sessionFile: filePath,
            entries: entries,
            error: null,
            skipped: !1
          };
        } catch (err: unknown) {
          return {
            sessionFile: filePath,
            entries: null,
            error: err,
            skipped: !1
          };
        }
      }));
    for (let {
      sessionFile: filePath,
      entries: entries,
      error: err,
      skipped: skipped
    } of batchResults) {
      if (skipped) continue;
      if (err || !entries) {
        N(`Failed to read session file ${filePath}: ${GH(err)}`);
        continue;
      }
      let sessionId = K1H.basename(filePath, ".jsonl"),
        validMessages: any[] = [];
      for (let entry of entries) if (FB(entry)) validMessages.push(entry);else if (entry.type === "speculation-accept") totalSpeculationTimeSavedMs += entry.timeSavedMs;
      if (validMessages.length === 0) continue;
      let isSubagent = filePath.includes(`${K1H.sep}subagents${K1H.sep}`),
        mainMessages = isSubagent ? validMessages : validMessages.filter((entry: any) => !entry.isSidechain);
      if (mainMessages.length === 0) continue;
      let firstMsg = mainMessages[0],
        lastMsg = mainMessages.at(-1),
        firstDate = new Date(firstMsg.timestamp),
        lastDate = new Date(lastMsg.timestamp);
      if (isNaN(firstDate.getTime()) || isNaN(lastDate.getTime())) {
        N(`Skipping session with invalid timestamp: ${filePath}`);
        continue;
      }
      let firstDateStr = L_H(firstDate);
      if (toDate && CBH(toDate, firstDateStr)) continue;
      let withinFromDate = !fromDate || !CBH(firstDateStr, fromDate);
      if (!isSubagent && withinFromDate) {
        let durationMs = lastDate.getTime() - firstDate.getTime();
        sessionStats.push({
          sessionId: sessionId,
          duration: durationMs,
          messageCount: mainMessages.length,
          timestamp: firstMsg.timestamp
        });
        let dayRecord = dailyMap.get(firstDateStr);
        if (!dayRecord) dayRecord = {
          date: firstDateStr,
          messageCount: 0,
          sessionCount: 0,
          toolCallCount: 0
        }, dailyMap.set(firstDateStr, dayRecord);
        dayRecord.sessionCount++;
        let hour = firstDate.getHours();
        hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
      }
      for (let entry of mainMessages) {
        let entryDate = new Date(entry.timestamp);
        if (isNaN(entryDate.getTime())) continue;
        let entryDateStr = L_H(entryDate);
        if (fromDate && CBH(entryDateStr, fromDate)) continue;
        if (toDate && CBH(toDate, entryDateStr)) continue;
        let dayRecord = dailyMap.get(entryDateStr);
        if (!dayRecord && !isSubagent) dayRecord = {
          date: entryDateStr,
          messageCount: 0,
          sessionCount: 0,
          toolCallCount: 0
        }, dailyMap.set(entryDateStr, dayRecord);
        if (!isSubagent) {
          if (totalMessages++, dayRecord) dayRecord.messageCount++;
        }
        if (entry.type === "assistant") {
          let contentArr = entry.message?.content;
          if (Array.isArray(contentArr)) {
            for (let block of contentArr) if (block.type === "tool_use" && dayRecord) dayRecord.toolCallCount++;
          }
          if (entry.message?.usage) {
            let usageData = entry.message.usage,
              modelName = entry.message.model || "unknown";
            if (modelName === kG) continue;
            if (!modelUsage[modelName]) modelUsage[modelName] = {
              inputTokens: 0,
              outputTokens: 0,
              cacheReadInputTokens: 0,
              cacheCreationInputTokens: 0,
              webSearchRequests: 0,
              costUSD: 0,
              contextWindow: 0,
              maxOutputTokens: 0
            };
            modelUsage[modelName].inputTokens += usageData.input_tokens || 0, modelUsage[modelName].outputTokens += usageData.output_tokens || 0, modelUsage[modelName].cacheReadInputTokens += usageData.cache_read_input_tokens || 0, modelUsage[modelName].cacheCreationInputTokens += usageData.cache_creation_input_tokens || 0;
            let totalTokens = (usageData.input_tokens || 0) + (usageData.output_tokens || 0);
            if (totalTokens > 0) {
              let dayTokens = dailyTokenMap.get(entryDateStr) || {};
              dayTokens[modelName] = (dayTokens[modelName] || 0) + totalTokens, dailyTokenMap.set(entryDateStr, dayTokens);
            }
          }
        }
      }
    }
  }
  return {
    dailyActivity: Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date)),
    dailyModelTokens: Array.from(dailyTokenMap.entries()).map(([dateStr, tokensByModel]) => ({
      date: dateStr,
      tokensByModel: tokensByModel
    })).sort((a, b) => a.date.localeCompare(b.date)),
    modelUsage: modelUsage,
    sessionStats: sessionStats,
    hourCounts: Object.fromEntries(hourMap),
    totalMessages: totalMessages,
    totalSpeculationTimeSavedMs: totalSpeculationTimeSavedMs,
    ...{}
  };
}

// ---------------------------------------------------------------------------
// e_4 — enumerate all session files on disk
// ---------------------------------------------------------------------------

/**
 * Walks the projects directory and returns absolute paths to every `.jsonl`
 * session transcript (both top-level sessions and subagent transcripts).
 */
async function e_4(): Promise<string[]> {
  let projectsDir = di(),
    fs = Q_(),
    dirEntries: any[];
  try {
    dirEntries = await fs.readdir(projectsDir);
  } catch (err: unknown) {
    if (b6(err)) return [];
    throw err;
  }
  let projectDirs = dirEntries.filter((entry: any) => entry.isDirectory()).map((entry: any) => K1H.join(projectsDir, entry.name));
  return (await Promise.all(projectDirs.map(async (projectDir: string) => {
    try {
      let projectEntries = await fs.readdir(projectDir),
        sessionFiles = projectEntries.filter((entry: any) => entry.isFile() && entry.name.endsWith(".jsonl")).map((entry: any) => K1H.join(projectDir, entry.name)),
        subDirs = projectEntries.filter((entry: any) => entry.isDirectory()),
        subagentFileLists = await Promise.all(subDirs.map(async (subDir: any) => {
          let subagentsPath = K1H.join(projectDir, subDir.name, "subagents");
          try {
            return (await fs.readdir(subagentsPath)).filter((entry: any) => entry.isFile() && entry.name.endsWith(".jsonl") && entry.name.startsWith("agent-")).map((entry: any) => K1H.join(subagentsPath, entry.name));
          } catch {
            return [];
          }
        }));
      return [...sessionFiles, ...subagentFileLists.flat()];
    } catch (err: unknown) {
      return N(`Failed to read project directory ${projectDir}: ${GH(err)}`), [];
    }
  }))).flat();
}

// ---------------------------------------------------------------------------
// iuO — merge cached stats snapshot with today's live RawStats
// ---------------------------------------------------------------------------

/**
 * Combines a persisted stats-cache snapshot (`cachedStats`) with a fresh
 * `todayRaw` pass (covering the current day only) so callers always see
 * up-to-date figures without re-reading all history.
 *
 * @param cachedStats - the persisted snapshot (may lack today's data)
 * @param todayRaw    - optional raw stats for the current day only
 */
function iuO(cachedStats: StatsCacheSnapshot, todayRaw?: RawStats): UsageStats {
  let dailyMergeMap = new Map<string, DailyActivityRecord>();
  for (let record of cachedStats.dailyActivity) dailyMergeMap.set(record.date, {
    ...record
  });
  if (todayRaw) for (let record of todayRaw.dailyActivity) {
    let existing = dailyMergeMap.get(record.date);
    if (existing) existing.messageCount += record.messageCount, existing.sessionCount += record.sessionCount, existing.toolCallCount += record.toolCallCount;else dailyMergeMap.set(record.date, {
      ...record
    });
  }
  let tokenMergeMap = new Map<string, Record<string, number>>();
  for (let record of cachedStats.dailyModelTokens) tokenMergeMap.set(record.date, {
    ...record.tokensByModel
  });
  if (todayRaw) for (let record of todayRaw.dailyModelTokens) {
    let existing = tokenMergeMap.get(record.date);
    if (existing) for (let [model, count] of Object.entries(record.tokensByModel)) existing[model] = (existing[model] || 0) + count;else tokenMergeMap.set(record.date, {
      ...record.tokensByModel
    });
  }
  let mergedModelUsage: Record<string, ModelTokenUsage> = {
    ...cachedStats.modelUsage
  };
  if (todayRaw) for (let [model, usage] of Object.entries(todayRaw.modelUsage)) if (mergedModelUsage[model]) mergedModelUsage[model] = {
    inputTokens: mergedModelUsage[model].inputTokens + usage.inputTokens,
    outputTokens: mergedModelUsage[model].outputTokens + usage.outputTokens,
    cacheReadInputTokens: mergedModelUsage[model].cacheReadInputTokens + usage.cacheReadInputTokens,
    cacheCreationInputTokens: mergedModelUsage[model].cacheCreationInputTokens + usage.cacheCreationInputTokens,
    webSearchRequests: mergedModelUsage[model].webSearchRequests + usage.webSearchRequests,
    costUSD: mergedModelUsage[model].costUSD + usage.costUSD,
    contextWindow: Math.max(mergedModelUsage[model].contextWindow, usage.contextWindow),
    maxOutputTokens: Math.max(mergedModelUsage[model].maxOutputTokens, usage.maxOutputTokens)
  };else mergedModelUsage[model] = {
    ...usage
  };
  let hourMergeMap = new Map<number, number>();
  for (let [hourStr, count] of Object.entries(cachedStats.hourCounts)) hourMergeMap.set(parseInt(hourStr, 10), count);
  if (todayRaw) for (let [hourStr, count] of Object.entries(todayRaw.hourCounts)) {
    let hour = parseInt(hourStr, 10);
    hourMergeMap.set(hour, (hourMergeMap.get(hour) || 0) + count);
  }
  let sortedDailyActivity = Array.from(dailyMergeMap.values()).sort((a, b) => a.date.localeCompare(b.date)),
    streaks = H64(sortedDailyActivity),
    mergedDailyTokens = Array.from(tokenMergeMap.entries()).map(([dateStr, tokensByModel]) => ({
      date: dateStr,
      tokensByModel: tokensByModel
    })).sort((a, b) => a.date.localeCompare(b.date)),
    totalSessions = cachedStats.totalSessions + (todayRaw?.sessionStats.length || 0),
    totalMessages = cachedStats.totalMessages + (todayRaw?.totalMessages || 0),
    longestSession = cachedStats.longestSession;
  if (todayRaw) {
    for (let session of todayRaw.sessionStats) if (!longestSession || session.duration > longestSession.duration) longestSession = session;
  }
  let firstSessionDate = cachedStats.firstSessionDate,
    lastSessionDate: string | null = null;
  if (todayRaw) for (let session of todayRaw.sessionStats) {
    if (!firstSessionDate || session.timestamp < firstSessionDate) firstSessionDate = session.timestamp;
    if (!lastSessionDate || session.timestamp > lastSessionDate) lastSessionDate = session.timestamp;
  }
  if (!lastSessionDate && sortedDailyActivity.length > 0) lastSessionDate = sortedDailyActivity.at(-1)!.date;
  let peakActivityDay = sortedDailyActivity.length > 0 ? sortedDailyActivity.reduce((best, day) => day.messageCount > best.messageCount ? day : best).date : null,
    peakActivityHour = hourMergeMap.size > 0 ? Array.from(hourMergeMap.entries()).reduce((best, [hour, count]) => count > best[1] ? [hour, count] : best)[0] : null,
    totalDays = firstSessionDate && lastSessionDate ? Math.ceil((new Date(lastSessionDate).getTime() - new Date(firstSessionDate).getTime()) / 86400000) + 1 : 0,
    totalSpeculationTimeSavedMs = cachedStats.totalSpeculationTimeSavedMs + (todayRaw?.totalSpeculationTimeSavedMs || 0);
  return {
    totalSessions: totalSessions,
    totalMessages: totalMessages,
    totalDays: totalDays,
    activeDays: dailyMergeMap.size,
    streaks: streaks,
    dailyActivity: sortedDailyActivity,
    dailyModelTokens: mergedDailyTokens,
    longestSession: longestSession,
    modelUsage: mergedModelUsage,
    firstSessionDate: firstSessionDate,
    lastSessionDate: lastSessionDate,
    peakActivityDay: peakActivityDay,
    peakActivityHour: peakActivityHour,
    totalSpeculationTimeSavedMs: totalSpeculationTimeSavedMs
  };
}

// ---------------------------------------------------------------------------
// ruO — cache-aware full stats computation
// ---------------------------------------------------------------------------

/**
 * Returns full all-time usage statistics. Reads from the on-disk cache when
 * possible, processing only the incremental range since `lastComputedDate`.
 * Always re-processes today's data live so the current day is never stale.
 */
async function ruO(): Promise<UsageStats> {
  let sessionFiles = await e_4();
  if (sessionFiles.length === 0) return _64();
  let cachedSnapshot = await B_4(async () => {
      let cacheData = await F_4(),
        todayDateStr = g_4(),
        result = cacheData;
      if (!cacheData.lastComputedDate) {
        N("Stats cache empty, processing all historical data");
        let rawStats = await $B6(sessionFiles, {
          toDate: todayDateStr
        });
        if (rawStats.sessionStats.length > 0 || rawStats.dailyActivity.length > 0) result = C$q(cacheData, rawStats, todayDateStr), await bm_(result);
      } else if (CBH(cacheData.lastComputedDate, todayDateStr)) {
        let incrementalFrom = auO(cacheData.lastComputedDate);
        N(`Stats cache stale (${cacheData.lastComputedDate}), processing ${incrementalFrom} to ${todayDateStr}`);
        let incrementalRaw = await $B6(sessionFiles, {
          fromDate: incrementalFrom,
          toDate: todayDateStr
        });
        if (incrementalRaw.sessionStats.length > 0 || incrementalRaw.dailyActivity.length > 0) result = C$q(cacheData, incrementalRaw, todayDateStr), await bm_(result);else result = {
          ...cacheData,
          lastComputedDate: todayDateStr
        }, await bm_(result);
      }
      return result;
    }),
    todayDateStr = b$q(),
    todayRaw = await $B6(sessionFiles, {
      fromDate: todayDateStr,
      toDate: todayDateStr
    });
  return iuO(cachedSnapshot, todayRaw);
}

// ---------------------------------------------------------------------------
// B$q — public stats entry-point
// ---------------------------------------------------------------------------

/**
 * Public entry-point for the stats command.
 *
 * @param period - `"all"` for all-time (cache-aware), `"7d"` or `"30d"` for
 *                 a rolling window computed fresh from disk.
 */
async function B$q(period: "all" | "7d" | "30d"): Promise<UsageStats> {
  if (period === "all") return ruO();
  let sessionFiles = await e_4();
  if (sessionFiles.length === 0) return _64();
  let now = new Date(),
    daysBack = period === "7d" ? 7 : 30,
    windowStart = new Date(now);
  windowStart.setDate(now.getDate() - daysBack + 1);
  let fromDateStr = L_H(windowStart),
    rawStats = await $B6(sessionFiles, {
      fromDate: fromDateStr
    });
  return ouO(rawStats);
}

// ---------------------------------------------------------------------------
// ouO — build UsageStats from a RawStats object (windowed path)
// ---------------------------------------------------------------------------

/**
 * Converts a raw `RawStats` bag (from a finite date window) into the
 * canonical `UsageStats` shape, computing streaks and derived fields.
 */
function ouO(raw: RawStats): UsageStats {
  let sortedDailyActivity = raw.dailyActivity.slice().sort((a, b) => a.date.localeCompare(b.date)),
    sortedDailyTokens = raw.dailyModelTokens.slice().sort((a, b) => a.date.localeCompare(b.date)),
    streaks = H64(sortedDailyActivity),
    longestSession: SessionStat | null = null;
  for (let session of raw.sessionStats) if (!longestSession || session.duration > longestSession.duration) longestSession = session;
  let firstSessionDate: string | null = null,
    lastSessionDate: string | null = null;
  for (let session of raw.sessionStats) {
    if (!firstSessionDate || session.timestamp < firstSessionDate) firstSessionDate = session.timestamp;
    if (!lastSessionDate || session.timestamp > lastSessionDate) lastSessionDate = session.timestamp;
  }
  let peakActivityDay = sortedDailyActivity.length > 0 ? sortedDailyActivity.reduce((best, day) => day.messageCount > best.messageCount ? day : best).date : null,
    hourEntries = Object.entries(raw.hourCounts),
    peakActivityHour = hourEntries.length > 0 ? parseInt(hourEntries.reduce((best, [hourStr, count]) => count > parseInt(best[1].toString()) ? [hourStr, count] : best)[0], 10) : null,
    totalDays = firstSessionDate && lastSessionDate ? Math.ceil((new Date(lastSessionDate).getTime() - new Date(firstSessionDate).getTime()) / 86400000) + 1 : 0;
  return {
    totalSessions: raw.sessionStats.length,
    totalMessages: raw.totalMessages,
    totalDays: totalDays,
    activeDays: raw.dailyActivity.length,
    streaks: streaks,
    dailyActivity: sortedDailyActivity,
    dailyModelTokens: sortedDailyTokens,
    longestSession: longestSession,
    modelUsage: raw.modelUsage,
    firstSessionDate: firstSessionDate,
    lastSessionDate: lastSessionDate,
    peakActivityDay: peakActivityDay,
    peakActivityHour: peakActivityHour,
    totalSpeculationTimeSavedMs: raw.totalSpeculationTimeSavedMs
  };
}

// ---------------------------------------------------------------------------
// auO / suO — date arithmetic helpers
// ---------------------------------------------------------------------------

/**
 * Returns the date string for the day after `dateStr`.
 * Used to compute the incremental `fromDate` when the cache is stale.
 */
function auO(dateStr: string): string {
  let d = new Date(dateStr);
  return d.setUTCDate(d.getUTCDate() + 1), L_H(d);
}

/**
 * Returns the date string for the day before `dateStr`.
 * Used when walking backwards to determine the current streak.
 */
function suO(dateStr: string): string {
  let d = new Date(dateStr);
  return d.setUTCDate(d.getUTCDate() - 1), L_H(d);
}

// ---------------------------------------------------------------------------
// H64 — compute streak data from a sorted activity list
// ---------------------------------------------------------------------------

/**
 * Computes current and longest consecutive-day streaks from an array of
 * daily-activity records.
 *
 * @param dailyActivity - activity records; need not be pre-sorted
 */
function H64(dailyActivity: DailyActivityRecord[]): StreakInfo {
  if (dailyActivity.length === 0) return {
    currentStreak: 0,
    longestStreak: 0,
    currentStreakStart: null,
    longestStreakStart: null,
    longestStreakEnd: null
  };
  let currentStreak = 0,
    currentStreakStart: string | null = null,
    cursor = b$q(),
    activeDateSet = new Set(dailyActivity.map((record) => record.date));
  while (activeDateSet.has(cursor)) currentStreak++, currentStreakStart = cursor, cursor = suO(cursor);
  let longestStreak = 0,
    longestStreakStart: string | null = null,
    longestStreakEnd: string | null = null,
    sortedDates = Array.from(activeDateSet).sort();
  if (sortedDates.length > 0) {
    let runLength = 1,
      runStart = sortedDates[0];
    for (let i = 1; i < sortedDates.length; i++) {
      let prevDate = new Date(sortedDates[i - 1]),
        currDate = new Date(sortedDates[i]);
      if (Math.round((currDate.getTime() - prevDate.getTime()) / 86400000) === 1) runLength++;else {
        if (runLength > longestStreak) longestStreak = runLength, longestStreakStart = runStart, longestStreakEnd = sortedDates[i - 1];
        runLength = 1, runStart = sortedDates[i];
      }
    }
    if (runLength > longestStreak) longestStreak = runLength, longestStreakStart = runStart, longestStreakEnd = sortedDates.at(-1)!;
  }
  return {
    currentStreak: currentStreak,
    longestStreak: longestStreak,
    currentStreakStart: currentStreakStart,
    longestStreakStart: longestStreakStart,
    longestStreakEnd: longestStreakEnd
  };
}

// ---------------------------------------------------------------------------
// _64 — zero-value UsageStats
// ---------------------------------------------------------------------------

/** Returns a zeroed-out `UsageStats` object used when no session files exist. */
function _64(): UsageStats {
  return {
    totalSessions: 0,
    totalMessages: 0,
    totalDays: 0,
    activeDays: 0,
    streaks: {
      currentStreak: 0,
      longestStreak: 0,
      currentStreakStart: null,
      longestStreakStart: null,
      longestStreakEnd: null
    },
    dailyActivity: [],
    dailyModelTokens: [],
    longestSession: null,
    modelUsage: {},
    firstSessionDate: null,
    lastSessionDate: null,
    peakActivityDay: null,
    peakActivityHour: null,
    totalSpeculationTimeSavedMs: 0
  };
}

// ---------------------------------------------------------------------------
// Module initialisation (lazy, via the bundle's L() system)
// ---------------------------------------------------------------------------

var K1H: typeof import("path");
var q64 = L(() => {
  FH();
  L_();
  M9();
  FO();
  lw();
  iK();
  O$();
  I$q();
  K1H = require("path");
});

export {$B6 as F8n,e_4 as jal,iuO as ZWp,ruO as eGp,B$q as cTo,ouO as tGp,auO as nGp,suO as rGp,H64 as Wal,_64 as Gal,K1H as pue,q64 as Val};
