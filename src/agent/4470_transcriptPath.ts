// @ts-nocheck
import {Hpt,qjn,w_o} from "../../vendor/m4468.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {qf,T$i,ry} from "./2772_withFileTypes.ts";
import {getIsGit,getHead,Ba} from "../../vendor/m693.ts";
import {WR} from "../../vendor/m2207.ts";
import {getOriginalCwd,lt} from "../session/0131_sent.ts";
import {je} from "../../vendor/m577.ts";
import {Jx,ws} from "../../vendor/m228.ts";
import {b} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
// Reads raw transcript JSONL and recent session transcripts, optionally excluding third-party content
async function j6p({
  transcriptPath: transcriptPath,
  scope = "session",
  maxRawTranscriptBytes: maxRawTranscriptBytes,
  excludeThirdPartyTranscripts = !1
}) {
  let [rawContent, recentSessionsResult] = await Promise.all([W6p(transcriptPath, maxRawTranscriptBytes), G6p(transcriptPath, scope, excludeThirdPartyTranscripts)]),
    rawTranscriptJsonl = rawContent,
    rawTranscriptDropped = !1;
  if (excludeThirdPartyTranscripts && rawTranscriptJsonl !== null && Hpt(rawTranscriptJsonl)) rawTranscriptJsonl = null, rawTranscriptDropped = !0, logForDebugging("rawTranscriptJsonl withheld from session history: contains_3p_transcript_markers");
  return {
    rawTranscriptJsonl: rawTranscriptJsonl,
    recentSessionTranscripts: recentSessionsResult.transcripts,
    thirdPartyExclusions: {
      rawTranscript: rawTranscriptDropped,
      recentSessions: recentSessionsResult.droppedThirdParty
    }
  };
}
// Assembles full context for a session: messages, subagent transcripts, git info, environment
async function aol({
  messages: messages,
  backgroundTasks = {},
  transcripts = {},
  diskSubagentTranscripts: diskSubagentTranscripts,
  scope = "session",
  maxRawTranscriptBytes: maxRawTranscriptBytes,
  excludeThirdPartyTranscripts = !1
}) {
  let transcriptPath = qf(),
    [resolvedDiskTranscripts, transcriptData, isGit, commitSha] = await Promise.all([diskSubagentTranscripts, j6p({
      transcriptPath: transcriptPath,
      scope: scope,
      maxRawTranscriptBytes: maxRawTranscriptBytes,
      excludeThirdPartyTranscripts: excludeThirdPartyTranscripts
    }), getIsGit(), getHead()]),
    mergedSubagentTranscripts = T$i(backgroundTasks, transcripts),
    allSubagentTranscripts = {
      ...resolvedDiskTranscripts,
      ...mergedSubagentTranscripts
    },
    teammateIdSet = new Set(Object.keys(mergedSubagentTranscripts)),
    droppedSubagentCount = 0;
  if (excludeThirdPartyTranscripts) {
    for (let [sessionId, transcriptContent] of Object.entries(allSubagentTranscripts)) if (qjn(transcriptContent)) delete allSubagentTranscripts[sessionId], droppedSubagentCount++, logForDebugging(`subagent transcript ${sessionId} withheld: contains_3p_transcript_markers`);
  }
  let lastAssistantMessage = messages.findLast(msg => msg.type === "assistant" && msg.message.model !== WR);
  return {
    transcriptPath: transcriptPath,
    rawTranscriptJsonl: transcriptData.rawTranscriptJsonl,
    recentSessionTranscripts: transcriptData.recentSessionTranscripts,
    subagentTranscripts: allSubagentTranscripts,
    teammateIds: teammateIdSet,
    isGit: isGit,
    commitSha: commitSha || null,
    workingDirectory: getOriginalCwd(),
    platform: je.platform,
    terminal: je.terminal,
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION,
    latestAssistantMessageId: lastAssistantMessage?.requestId ?? null,
    latestAssistantAPIMessageId: lastAssistantMessage?.message.id ?? null,
    thirdPartyExclusions: {
      ...transcriptData.thirdPartyExclusions,
      subagents: droppedSubagentCount
    }
  };
}
// Reads raw transcript bytes up to a size limit, trimming any partial first line
async function W6p(transcriptFilePath: any, maxBytes: any) {
  if (maxBytes === void 0) return null;
  try {
    let {
      content: content,
      bytesRead: bytesRead,
      bytesTotal: bytesTotal
    } = await Jx(transcriptFilePath, maxBytes);
    if (bytesRead < bytesTotal) {
      let newlineIdx = content.indexOf(`
`);
      return newlineIdx >= 0 ? content.slice(newlineIdx + 1) : null;
    }
    return content;
  } catch {
    return null;
  }
}
// Reads recent session transcript files from same directory, filtered by scope time window
async function G6p(currentTranscriptPath: any, scope: any, excludeThirdParty: any) {
  if (scope === "session") return {
    transcripts: void 0,
    droppedThirdParty: 0
  };
  let dirPath = Ipt.dirname(currentTranscriptPath),
    currentFileName = Ipt.basename(currentTranscriptPath),
    cutoffMs = Date.now() - q6p[scope],
    dirEntries: any;
  try {
    dirEntries = await jjn.readdir(dirPath);
  } catch {
    return {
      transcripts: void 0,
      droppedThirdParty: 0
    };
  }
  let candidateFiles: any[] = [];
  await Promise.all(dirEntries.filter((fileName: any) => fileName.endsWith(".jsonl") && fileName !== currentFileName).map(async (fileName: any) => {
    let filePath = Ipt.join(dirPath, fileName);
    try {
      let fileStat = await jjn.stat(filePath);
      if (fileStat.isFile() && fileStat.mtimeMs >= cutoffMs) candidateFiles.push({
        path: filePath,
        sessionId: fileName.slice(0, -6),
        mtimeMs: fileStat.mtimeMs,
        size: fileStat.size
      });
    } catch {}
  })), candidateFiles.sort((fileA: any, fileB: any) => fileB.mtimeMs - fileA.mtimeMs);
  let sessionTranscripts: any = {},
    totalBytes = 0,
    droppedThirdPartyCount = 0;
  for (let fileInfo of candidateFiles) {
    if (fileInfo.size === 0 || totalBytes + fileInfo.size > iol) continue;
    try {
      let {
        content: fileContent,
        bytesRead: bytesRead,
        bytesTotal: bytesTotal
      } = await Jx(fileInfo.path, iol);
      if (!fileContent || bytesRead < bytesTotal) continue;
      if (excludeThirdParty && Hpt(fileContent)) {
        droppedThirdPartyCount++, logForDebugging(`recent session ${fileInfo.sessionId} withheld: contains_3p_transcript_markers`);
        continue;
      }
      sessionTranscripts[fileInfo.sessionId] = fileContent, totalBytes += fileInfo.size;
    } catch {}
  }
  return {
    transcripts: Object.keys(sessionTranscripts).length > 0 ? sessionTranscripts : void 0,
    droppedThirdParty: droppedThirdPartyCount
  };
}
var jjn,
  Ipt,
  q6p,
  iol = 1048576;
var lol = b(() => {
  lt();
  qe();
  Lr();
  ws();
  Ba();
  ry();
  w_o();
  jjn = require("fs/promises"), Ipt = require("path"), q6p = {
    day: 86400000,
    week: 604800000
  };
});
export {j6p,aol,W6p,G6p,jjn,Ipt,q6p,iol,lol};
