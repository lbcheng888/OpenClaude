// @ts-nocheck
import {Ift,lVn,bCo} from "../../vendor/m4490.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Nm,d8i,D_} from "./2784_withFileTypes.ts";
import {getIsGit as Ay,getHead as Bje,ia} from "../../vendor/m698.ts";
import {nw} from "../../vendor/m2215.ts";
import {getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {Ne} from "../../vendor/m583.ts";
import {pk,ps} from "../../vendor/m230.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// Reads raw transcript JSONL and recent session transcripts, optionally excluding third-party content
async function vjp({
  transcriptPath: transcriptPath,
  scope: scope = "session",
  maxRawTranscriptBytes: maxRawTranscriptBytes,
  excludeThirdPartyTranscripts: excludeThirdPartyTranscripts = !1
}) {
  let [rawContent, recentSessionsResult] = await Promise.all([wjp(transcriptPath, maxRawTranscriptBytes), kjp(transcriptPath, scope, excludeThirdPartyTranscripts)]),
    rawTranscriptJsonl = rawContent,
    rawTranscriptDropped = !1;
  if (excludeThirdPartyTranscripts && rawTranscriptJsonl !== null && Ift(rawTranscriptJsonl)) rawTranscriptJsonl = null, rawTranscriptDropped = !0, A("rawTranscriptJsonl withheld from session history: contains_3p_transcript_markers");
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
async function jul({
  messages: messages,
  backgroundTasks: backgroundTasks = {},
  transcripts: transcripts = {},
  diskSubagentTranscripts: diskSubagentTranscripts,
  scope: scope = "session",
  maxRawTranscriptBytes: maxRawTranscriptBytes,
  excludeThirdPartyTranscripts: excludeThirdPartyTranscripts = !1
}) {
  let transcriptPath = Nm(),
    [resolvedDiskTranscripts, transcriptData, isGit, commitSha] = await Promise.all([diskSubagentTranscripts, vjp({
      transcriptPath: transcriptPath,
      scope: scope,
      maxRawTranscriptBytes: maxRawTranscriptBytes,
      excludeThirdPartyTranscripts: excludeThirdPartyTranscripts
    }), Ay(), Bje()]),
    mergedSubagentTranscripts = d8i(backgroundTasks, transcripts),
    allSubagentTranscripts = {
      ...resolvedDiskTranscripts,
      ...mergedSubagentTranscripts
    },
    teammateIdSet = new Set(Object.keys(mergedSubagentTranscripts)),
    droppedSubagentCount = 0;
  if (excludeThirdPartyTranscripts) {
    for (let [sessionId, transcriptContent] of Object.entries(allSubagentTranscripts)) if (lVn(transcriptContent)) delete allSubagentTranscripts[sessionId], droppedSubagentCount++, A(`subagent transcript ${sessionId} withheld: contains_3p_transcript_markers`);
  }
  let lastAssistantMessage = messages.findLast(msg => msg.type === "assistant" && msg.message.model !== nw);
  return {
    transcriptPath: transcriptPath,
    rawTranscriptJsonl: transcriptData.rawTranscriptJsonl,
    recentSessionTranscripts: transcriptData.recentSessionTranscripts,
    subagentTranscripts: allSubagentTranscripts,
    teammateIds: teammateIdSet,
    isGit: isGit,
    commitSha: commitSha || null,
    workingDirectory: gr(),
    platform: Ne.platform,
    terminal: Ne.terminal,
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
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
async function wjp(transcriptFilePath: any, maxBytes: any) {
  if (maxBytes === void 0) return null;
  try {
    let {
      content: content,
      bytesRead: bytesRead,
      bytesTotal: bytesTotal
    } = await pk(transcriptFilePath, maxBytes);
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
async function kjp(currentTranscriptPath: any, scope: any, excludeThirdParty: any) {
  if (scope === "session") return {
    transcripts: void 0,
    droppedThirdParty: 0
  };
  let dirPath = xft.dirname(currentTranscriptPath),
    currentFileName = xft.basename(currentTranscriptPath),
    cutoffMs = Date.now() - Rjp[scope],
    dirEntries: any;
  try {
    dirEntries = await cVn.readdir(dirPath);
  } catch {
    return {
      transcripts: void 0,
      droppedThirdParty: 0
    };
  }
  let candidateFiles: any[] = [];
  await Promise.all(dirEntries.filter((fileName: any) => fileName.endsWith(".jsonl") && fileName !== currentFileName).map(async (fileName: any) => {
    let filePath = xft.join(dirPath, fileName);
    try {
      let fileStat = await cVn.stat(filePath);
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
    if (fileInfo.size === 0 || totalBytes + fileInfo.size > zul) continue;
    try {
      let {
        content: fileContent,
        bytesRead: bytesRead,
        bytesTotal: bytesTotal
      } = await pk(fileInfo.path, zul);
      if (!fileContent || bytesRead < bytesTotal) continue;
      if (excludeThirdParty && Ift(fileContent)) {
        droppedThirdPartyCount++, A(`recent session ${fileInfo.sessionId} withheld: contains_3p_transcript_markers`);
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
var cVn,
  xft,
  Rjp,
  zul = 1048576;
var Yul = b(() => {
  lt();
  qe();
  Ir();
  ps();
  ia();
  D_();
  bCo();
  cVn = require("fs/promises"), xft = require("path"), Rjp = {
    day: 86400000,
    week: 604800000
  };
});
export {vjp,jul,wjp,kjp,cVn,xft,Rjp,zul,Yul};
