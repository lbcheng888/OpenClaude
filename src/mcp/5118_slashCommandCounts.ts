// @ts-nocheck
import {ds as $7,bt as L_} from "../../vendor/m195.ts";
import {b as L} from "../../runtime.ts";
/** Aggregated usage statistics collected from session JSONL files. */
interface SessionStats {
  /** How many times each slash command was invoked, keyed by command name. */
  slashCommandCounts: Map<string, number>;
  /** How many times each MCP server was used, keyed by server name prefix. */
  mcpServerCounts: Map<string, number>;
  /** Descriptors for notable sessions (title, PR links, first message). */
  sessionDescriptors: SessionDescriptor[];
  /** Number of session files actually read. */
  sessionFileCount: number;
}

/** Metadata extracted from a single session file. */
interface SessionDescriptor {
  /** Custom title set during the session, if any. */
  title?: string;
  /** PR numbers referenced in the session. */
  prNumbers: number[];
  /** Truncated first user message, if found. */
  firstMessage?: string;
}

/**
 * Scans session JSONL files in `sessionDir` written within the past
 * `daysLookback` days and aggregates slash-command counts, MCP server
 * counts, and per-session descriptors.
 */
async function Az4(sessionDir: string, daysLookback: number): Promise<SessionStats> {
  let stats: SessionStats = {
      slashCommandCounts: new Map(),
      mcpServerCounts: new Map(),
      sessionDescriptors: [],
      sessionFileCount: 0
    },
    cutoffTime = Date.now() - daysLookback * 24 * 60 * 60 * 1000,
    dirEntries: string[];
  try {
    dirEntries = await Q3_.readdir(sessionDir);
  } catch (dirErr) {
    if ($7(dirErr)) return stats;
    throw dirErr;
  }
  let jsonlFiles = dirEntries.filter(entry => bF6.extname(entry) === ".jsonl"),
    validFilePaths = (await Promise.all(jsonlFiles.map(async entry => {
      let filePath = bF6.join(sessionDir, entry);
      try {
        let fileStat = await Q3_.stat(filePath);
        if (!fileStat.isFile() || fileStat.mtimeMs < cutoffTime || fileStat.size > OiO) return null;
        return filePath;
      } catch (statErr) {
        if ($7(statErr)) return null;
        throw statErr;
      }
    }))).filter(entry => entry !== null);
  for (let filePath of validFilePaths) {
    let fileContent: string;
    try {
      fileContent = await Q3_.readFile(filePath, "utf-8");
    } catch (readErr) {
      if ($7(readErr)) continue;
      throw readErr;
    }
    stats.sessionFileCount++;
    let sessionDesc: SessionDescriptor = {
      prNumbers: []
    };
    for (let line of fileContent.split(`\n`)) {
      if (line.length < 10) continue;
      if (line.includes(Yz4) || line.includes(YiO)) for (let match of line.matchAll(ziO)) {
        let cmdName = match[1];
        stats.slashCommandCounts.set(cmdName, (stats.slashCommandCounts.get(cmdName) ?? 0) + 1);
      }
      if (line.includes(AiO) && line.includes('"name":"mcp__')) for (let match of line.matchAll($iO)) {
        let serverName = match[1];
        stats.mcpServerCounts.set(serverName, (stats.mcpServerCounts.get(serverName) ?? 0) + 1);
      }
      if (line.includes(wiO)) {
        let match = JiO.exec(line);
        if (match) sessionDesc.title = match[1];
      }
      if (line.includes(fiO)) {
        let match = DiO.exec(line);
        if (match) {
          let prNum = Number(match[1]);
          if (!sessionDesc.prNumbers.includes(prNum)) sessionDesc.prNumbers.push(prNum);
        }
      }
      if (!sessionDesc.firstMessage && line.includes(jiO) && !line.includes(Yz4) && !line.includes('"content":[')) {
        let match = MiO.exec(line);
        if (match) {
          let msgText = match[1].replace(/\\n/g, " ").replace(/\\"/g, '"');
          if (msgText.length > 3 && !msgText.startsWith("<")) sessionDesc.firstMessage = msgText.slice(0, TiO);
        }
      }
    }
    if (sessionDesc.title || sessionDesc.prNumbers.length > 0 || sessionDesc.firstMessage) stats.sessionDescriptors.push(sessionDesc);
  }
  if (stats.sessionDescriptors.length > $z4) stats.sessionDescriptors.sort((descA, descB) => {
    let scoreA = (descA.title ? 2 : 0) + (descA.prNumbers.length > 0 ? 1 : 0);
    return (descB.title ? 2 : 0) + (descB.prNumbers.length > 0 ? 1 : 0) - scoreA;
  }), stats.sessionDescriptors = stats.sessionDescriptors.slice(0, $z4);
  return stats;
}
var Q3_: typeof import("fs/promises"),
  bF6: typeof import("path"),
  /** Maximum session file size to process (50 MB). */
  OiO = 52428800,
  /** Maximum length of the extracted first user message. */
  TiO = 200,
  /** Maximum number of session descriptors to retain. */
  $z4 = 60,
  ziO: RegExp,
  $iO: RegExp,
  Yz4 = '"content":"<command-name>/',
  YiO = '"content":"<command-message>',
  AiO = '"type":"tool_use"',
  wiO = '"type":"custom-title"',
  fiO = '"type":"pr-link"',
  jiO = '"role":"user"',
  JiO: RegExp,
  DiO: RegExp,
  MiO: RegExp;
var wz4 = L(() => {
  L_();
  Q3_ = require("fs/promises"), bF6 = require("path"), ziO = /<command-name>\/([\w:-]+)<\/command-name>/g, $iO = /"name":"mcp__([^"]+?)__([^"]+)"/g, JiO = /"customTitle":"([^"]+)"/, DiO = /"prNumber":(\d+)/, MiO = /"role":"user"[^}]*"content":"([^"]+)"/;
});

export {Az4 as JPl,Q3_ as $ft,bF6 as F7n,OiO as dAm,TiO as pAm,$z4 as zPl,ziO as mAm,$iO as fAm,Yz4 as YPl,YiO as AAm,AiO as hAm,wiO as gAm,fiO as _Am,jiO as yAm,JiO as TAm,DiO as SAm,MiO as bAm,wz4 as XPl};
