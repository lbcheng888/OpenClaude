// @ts-nocheck
import {KM as LM,QT as GT} from "../../vendor/m642.ts";
import {ds as ls,bt as St} from "../../vendor/m195.ts";
import {n3o as Y$o,ws as bs} from "../../vendor/m228.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function indexOfBytes(buf, needle, start, end) {
  let idx = buf.subarray(start, end).indexOf(needle);
  return idx < 0 ? -1 : start + idx;
}
function extractStringValue(buf, key, start, end) {
  let keyIdx = indexOfBytes(buf, key, start, end);
  if (keyIdx < 0) return;
  let valueStart = keyIdx + key.length,
    valueEnd = valueStart;
  while (valueEnd < end && buf[valueEnd] !== QUOTE_CHAR) valueEnd++;
  return buf.toString("utf8", valueStart, valueEnd);
}
function findMessageId(buf, start, end) {
  let pos = start;
  while (true) {
    if (pos = indexOfBytes(buf, ID_KEY_PREFIX, pos, end), pos < 0) return;
    let valueStart = pos + ID_KEY_PREFIX.length;
    if (indexOfBytes(buf, MSG_ID_PREFIX, valueStart, valueStart + 4) === valueStart) {
      let valueEnd = valueStart;
      while (valueEnd < end && buf[valueEnd] !== QUOTE_CHAR) valueEnd++;
      return buf.toString("utf8", valueStart, valueEnd);
    }
    pos = valueStart;
  }
}
function extractNumericValue(buf, key, start, end) {
  let keyIdx = indexOfBytes(buf, key, start, end);
  if (keyIdx < 0) return 0;
  let pos = keyIdx + key.length,
    value = 0;
  while (pos < end && buf[pos] >= DIGIT_ZERO && buf[pos] <= DIGIT_NINE) value = value * 10 + (buf[pos] - DIGIT_ZERO), pos++;
  return value;
}
function getModelTier(modelName) {
  if (!modelName) return 3;
  let lower = modelName.toLowerCase();
  if (lower.includes("fable")) return 10;
  if (lower.includes("opus")) return 5;
  if (lower.includes("haiku")) return 1;
  return 3;
}
function computeRequestCost(record) {
  return (record.cached + record.uncached * 10 + record.cacheCreate * 12.5 + record.output * 50) * record.modelTier;
}
async function ep6() {
  let weekAgo = Date.now() - 604800000,
    dayAgo = Date.now() - 86400000,
    sessionsDir = LM(),
    entries;
  try {
    entries = await l5_.readdir(sessionsDir);
  } catch (err) {
    if (ls(err)) return {
      day: createEmptyStats(),
      week: createEmptyStats()
    };
    throw err;
  }
  let allFiles = (await Promise.all(entries.map(name => listSessionJsonlFiles(gRH.join(sessionsDir, name))))).flat(),
    dayAcc = createStatsAccumulator(),
    weekAcc = createStatsAccumulator(),
    seenUuids = new Set();
  for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
    let batch = allFiles.slice(i, i + BATCH_SIZE),
      results = await Promise.all(batch.map(file => readJsonlFile(file, weekAgo)));
    for (let fileRecords of results) for (let record of fileRecords) {
      if (record.uuid) {
        if (seenUuids.has(record.uuid)) continue;
        seenUuids.add(record.uuid);
      }
      if (accumulateRecord(weekAcc, record), record.ts >= dayAgo) accumulateRecord(dayAcc, record);
    }
  }
  return {
    day: finalizeStats(dayAcc),
    week: finalizeStats(weekAcc)
  };
}
async function listSessionJsonlFiles(dir) {
  let entries;
  try {
    entries = await l5_.readdir(dir, {
      withFileTypes: true
    });
  } catch (err) {
    if (ls(err)) return [];
    throw err;
  }
  let files = [],
    subdirs = [];
  for (let entry of entries) if (entry.isFile() && gRH.extname(entry.name) === ".jsonl") files.push(gRH.join(dir, entry.name));else if (entry.isDirectory()) subdirs.push(entry.name);
  let subagentFileLists = await Promise.all(subdirs.map(async subdir => {
    let subagentsDir = gRH.join(dir, subdir, "subagents");
    try {
      return (await l5_.readdir(subagentsDir, {
        recursive: true
      })).filter(f => gRH.extname(f) === ".jsonl").map(f => gRH.join(subagentsDir, f));
    } catch (err) {
      if (ls(err)) return [];
      throw err;
    }
  }));
  for (let subList of subagentFileLists) for (let file of subList) files.push(file);
  return files;
}
async function readJsonlFile(filePath, sinceMs) {
  let stat;
  try {
    stat = await l5_.stat(filePath);
  } catch (err) {
    if (ls(err)) return [];
    throw err;
  }
  if (!stat.isFile() || stat.mtimeMs < sinceMs) return [];
  let records = [];
  try {
    for await (let line of Y$o(filePath)) {
      let record = parseUsageRecord(line, 0, line.length, sinceMs);
      if (record) records.push(record);
    }
  } catch (err) {
    if (ls(err)) return records;
    throw err;
  }
  return records;
}
function parseUsageRecord(buf, start, end, sinceMs) {
  if (indexOfBytes(buf, ASSISTANT_TYPE_MARKER, start, end) < 0) return;
  if (indexOfBytes(buf, USAGE_BLOCK_MARKER, start, end) < 0) return;
  let timestampStr = extractStringValue(buf, TIMESTAMP_KEY, start, end),
    sessionId = extractStringValue(buf, SESSION_ID_KEY, start, end);
  if (!timestampStr || !sessionId) return;
  let ts = Date.parse(timestampStr);
  if (Number.isNaN(ts) || ts < sinceMs) return;
  let uncached = extractNumericValue(buf, INPUT_TOKENS_KEY, start, end),
    output = extractNumericValue(buf, OUTPUT_TOKENS_KEY, start, end),
    cacheCreate = extractNumericValue(buf, CACHE_CREATION_KEY, start, end),
    cached = extractNumericValue(buf, CACHE_READ_KEY, start, end);
  if (uncached + output + cacheCreate + cached === 0) return;
  let hasAttribution = indexOfBytes(buf, ATTRIBUTION_MARKER, start, end) >= 0;
  return {
    ts: ts,
    sessionId: sessionId,
    cached: cached,
    cacheCreate: cacheCreate,
    uncached: uncached,
    output: output,
    isSubagent: indexOfBytes(buf, IS_SIDECHAIN_COMPACT, start, end) >= 0 || indexOfBytes(buf, IS_SIDECHAIN_SPACED, start, end) >= 0,
    modelTier: getModelTier(extractStringValue(buf, MODEL_KEY, start, end)),
    uuid: extractStringValue(buf, REQUEST_ID_KEY, start, end) ?? findMessageId(buf, start, end) ?? extractStringValue(buf, UUID_KEY, start, end) ?? "",
    ...(hasAttribution && {
      attributionAgent: extractStringValue(buf, ATTRIBUTION_AGENT_KEY, start, end),
      attributionSkill: extractStringValue(buf, ATTRIBUTION_SKILL_KEY, start, end),
      attributionPlugin: extractStringValue(buf, ATTRIBUTION_PLUGIN_KEY, start, end),
      attributionMcpServer: extractStringValue(buf, ATTRIBUTION_MCP_SERVER_KEY, start, end)
    })
  };
}
function createStatsAccumulator() {
  return {
    totalCost: 0,
    requestCount: 0,
    cacheMissCost: 0,
    cacheMissCount: 0,
    longCtxCost: 0,
    longCtxCount: 0,
    sessions: new Map(),
    buckets: new Map(),
    byAgent: new Map(),
    bySkill: new Map(),
    byPlugin: new Map(),
    byMcpServer: new Map()
  };
}
function addToMap(map, key, cost) {
  if (key) map.set(key, (map.get(key) ?? 0) + cost);
}
function accumulateRecord(acc, record) {
  let cost = computeRequestCost(record);
  if (acc.totalCost += cost, acc.requestCount++, record.attributionAgent) addToMap(acc.byAgent, record.attributionSkill ?? record.attributionAgent, cost);else addToMap(acc.bySkill, record.attributionSkill, cost);
  addToMap(acc.byPlugin, record.attributionPlugin, cost), addToMap(acc.byMcpServer, record.attributionMcpServer, cost);
  let totalInputTokens = record.cached + record.cacheCreate + record.uncached;
  if (record.uncached > CACHE_MISS_THRESHOLD) acc.cacheMissCost += cost, acc.cacheMissCount++;
  if (totalInputTokens > LONG_CTX_THRESHOLD) acc.longCtxCost += cost, acc.longCtxCount++;
  let session = acc.sessions.get(record.sessionId);
  if (!session) session = {
    cost: 0,
    subCost: 0,
    subCount: 0,
    hours: new Set()
  }, acc.sessions.set(record.sessionId, session);
  if (session.cost += cost, record.isSubagent) session.subCost += cost, session.subCount++;
  session.hours.add(Math.floor(record.ts / 3600000));
  let bucketKey = Math.floor(record.ts / BUCKET_MS),
    bucket = acc.buckets.get(bucketKey);
  if (!bucket) bucket = {
    sids: new Set(),
    cost: 0,
    count: 0
  }, acc.buckets.set(bucketKey, bucket);
  bucket.sids.add(record.sessionId), bucket.cost += cost, bucket.count++;
}
function finalizeStats(acc) {
  let highParallelCost = 0,
    highParallelCount = 0;
  for (let bucket of acc.buckets.values()) if (bucket.sids.size >= HIGH_PARALLEL_MIN_SESSIONS) highParallelCost += bucket.cost, highParallelCount += bucket.count;
  let subagentHeavyCost = 0,
    subagentHeavyCount = 0,
    cronCost = 0,
    cronCount = 0;
  for (let session of acc.sessions.values()) {
    if (session.subCount >= SUBAGENT_HEAVY_MIN_COUNT || session.cost > 0 && session.subCost / session.cost > SUBAGENT_HEAVY_RATIO) subagentHeavyCost += session.cost, subagentHeavyCount++;
    if (session.hours.size >= CRON_MIN_HOURS) cronCost += session.cost, cronCount++;
  }
  let behaviors = [{
    key: "cache_miss",
    cost: acc.cacheMissCost,
    count: acc.cacheMissCount
  }, {
    key: "long_context",
    cost: acc.longCtxCost,
    count: acc.longCtxCount
  }, {
    key: "subagent_heavy",
    cost: subagentHeavyCost,
    count: subagentHeavyCount
  }, {
    key: "high_parallel",
    cost: highParallelCost,
    count: highParallelCount
  }, {
    key: "cron",
    cost: cronCost,
    count: cronCount
  }];
  return behaviors.sort((a, b) => b.cost - a.cost), {
    totalCost: acc.totalCost,
    requestCount: acc.requestCount,
    sessionCount: acc.sessions.size,
    behaviors: behaviors,
    agents: mapToAttributionList(acc.byAgent, acc.totalCost),
    skills: mapToAttributionList(acc.bySkill, acc.totalCost),
    plugins: mapToAttributionList(acc.byPlugin, acc.totalCost),
    mcpServers: mapToAttributionList(acc.byMcpServer, acc.totalCost)
  };
}
function createEmptyStats() {
  return finalizeStats(createStatsAccumulator());
}
function mapToAttributionList(map, totalCost) {
  if (map.size === 0 || totalCost === 0) return [];
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([name, cost]) => ({
    name: name,
    pct: Math.round(cost / totalCost * 100)
  })).filter(entry => entry.pct > 0);
}
var l5_,
  gRH,
  BATCH_SIZE = 4,
  CACHE_MISS_THRESHOLD = 1e5,
  LONG_CTX_THRESHOLD = 150000,
  SUBAGENT_HEAVY_MIN_COUNT = 3,
  SUBAGENT_HEAVY_RATIO = 0.5,
  BUCKET_MS = 300000,
  HIGH_PARALLEL_MIN_SESSIONS = 4,
  CRON_MIN_HOURS = 8,
  textEncoder,
  ASSISTANT_TYPE_MARKER,
  USAGE_BLOCK_MARKER,
  TIMESTAMP_KEY,
  SESSION_ID_KEY,
  MODEL_KEY,
  REQUEST_ID_KEY,
  ID_KEY_PREFIX,
  MSG_ID_PREFIX,
  UUID_KEY,
  INPUT_TOKENS_KEY,
  OUTPUT_TOKENS_KEY,
  CACHE_CREATION_KEY,
  CACHE_READ_KEY,
  IS_SIDECHAIN_COMPACT,
  IS_SIDECHAIN_SPACED,
  ATTRIBUTION_MARKER,
  ATTRIBUTION_AGENT_KEY,
  ATTRIBUTION_SKILL_KEY,
  ATTRIBUTION_PLUGIN_KEY,
  ATTRIBUTION_MCP_SERVER_KEY,
  QUOTE_CHAR = 34,
  DIGIT_ZERO = 48,
  DIGIT_NINE = 57;
var k$q = b(() => {
  St();
  bs();
  GT();
  l5_ = require("fs/promises"), gRH = require("path"), textEncoder = new TextEncoder(), ASSISTANT_TYPE_MARKER = textEncoder.encode('"type":"assistant"'), USAGE_BLOCK_MARKER = textEncoder.encode('"usage":{'), TIMESTAMP_KEY = textEncoder.encode('"timestamp":"'), SESSION_ID_KEY = textEncoder.encode('"sessionId":"'), MODEL_KEY = textEncoder.encode('"model":"'), REQUEST_ID_KEY = textEncoder.encode('"requestId":"'), ID_KEY_PREFIX = textEncoder.encode('"id":"'), MSG_ID_PREFIX = textEncoder.encode("msg_"), UUID_KEY = textEncoder.encode('"uuid":"'), INPUT_TOKENS_KEY = textEncoder.encode('"input_tokens":'), OUTPUT_TOKENS_KEY = textEncoder.encode('"output_tokens":'), CACHE_CREATION_KEY = textEncoder.encode('"cache_creation_input_tokens":'), CACHE_READ_KEY = textEncoder.encode('"cache_read_input_tokens":'), IS_SIDECHAIN_COMPACT = textEncoder.encode('"isSidechain":true'), IS_SIDECHAIN_SPACED = textEncoder.encode('"isSidechain": true'), ATTRIBUTION_MARKER = textEncoder.encode('"attribution'), ATTRIBUTION_AGENT_KEY = textEncoder.encode('"attributionAgent":"'), ATTRIBUTION_SKILL_KEY = textEncoder.encode('"attributionSkill":"'), ATTRIBUTION_PLUGIN_KEY = textEncoder.encode('"attributionPlugin":"'), ATTRIBUTION_MCP_SERVER_KEY = textEncoder.encode('"attributionMcpServer":"');
});

export {indexOfBytes as J_e,extractStringValue as Y_e,findMessageId as iWp,extractNumericValue as R8n,getModelTier as aWp,computeRequestCost as lWp,ep6 as H8n,listSessionJsonlFiles as cWp,readJsonlFile as uWp,parseUsageRecord as dWp,createStatsAccumulator as Kyo,addToMap as x8n,accumulateRecord as ual,finalizeStats as zyo,createEmptyStats as dal,mapToAttributionList as k8n,l5_ as Gpt,gRH as aDe,BATCH_SIZE as aal,CACHE_MISS_THRESHOLD as P5p,LONG_CTX_THRESHOLD as O5p,SUBAGENT_HEAVY_MIN_COUNT as L5p,SUBAGENT_HEAVY_RATIO as M5p,BUCKET_MS as N5p,HIGH_PARALLEL_MIN_SESSIONS as B5p,CRON_MIN_HOURS as F5p,textEncoder as sD,ASSISTANT_TYPE_MARKER as U5p,USAGE_BLOCK_MARKER as $5p,TIMESTAMP_KEY as q5p,SESSION_ID_KEY as j5p,MODEL_KEY as W5p,REQUEST_ID_KEY as G5p,ID_KEY_PREFIX as lal,MSG_ID_PREFIX as V5p,UUID_KEY as K5p,INPUT_TOKENS_KEY as z5p,OUTPUT_TOKENS_KEY as Y5p,CACHE_CREATION_KEY as J5p,CACHE_READ_KEY as X5p,IS_SIDECHAIN_COMPACT as Q5p,IS_SIDECHAIN_SPACED as Z5p,ATTRIBUTION_MARKER as eWp,ATTRIBUTION_AGENT_KEY as tWp,ATTRIBUTION_SKILL_KEY as nWp,ATTRIBUTION_PLUGIN_KEY as rWp,ATTRIBUTION_MCP_SERVER_KEY as oWp,QUOTE_CHAR as pal,DIGIT_ZERO as cal,DIGIT_NINE as sWp,k$q as Yyo};
