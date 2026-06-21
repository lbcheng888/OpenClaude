// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {getSessionId as kt,getOriginalCwd as gr,lt as ct} from "./0131_sent.ts";
import {_g as fg,qf as Vf,ry} from "../agent/2772_withFileTypes.ts";
import {getTranscriptPathForSession as Z0,getMaterializedSessionFile as GL,isTranscriptMessage as c6,searchSessionsByCustomTitle as XY,getCurrentSessionTitle as fh,$6 as k6,saveAgentName as T6e,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {Pn as Dn,_o,bt as St} from "../../vendor/m195.ts";
import {De as Ie,Rn as wn} from "./0615_length.ts";
import {qt as Wt,Le as Oe,Xt} from "../config/0228_encoding.ts";
import {VI as jI,Di as ki,dr as fr} from "../../vendor/m231.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
// @ts-nocheck
var Ozq = {};
pt(Ozq, {
  deriveFirstPrompt: () => deriveFirstPrompt,
  createFork: () => createFork,
  call: () => call,
  branchAndResume: () => branchAndResume
});
function deriveFirstPrompt(message) {
  let content = message?.message?.content;
  if (!content) return "Branched conversation";
  let text = typeof content === "string" ? content : content.find(block => block.type === "text")?.text;
  if (!text) return "Branched conversation";
  return text.replace(/\s+/g, " ").trim().slice(0, 100).trimEnd() || "Branched conversation";
}
async function createFork(messages, title, extraMessages) {
  let newSessionId = KtK.randomUUID(),
    currentSessionId = kt(),
    transcriptDir = fg(gr()),
    forkPath = Z0(newSessionId),
    sourceTranscriptPath = GL() ?? Vf();
  await Mp6.mkdir(transcriptDir, {
    recursive: true,
    mode: 448
  });
  let readStream;
  try {
    readStream = Dp6.createReadStream(sourceTranscriptPath, {
      encoding: "utf8"
    }), await Kzq.once(readStream, "open");
  } catch (err) {
    if (Dn(err)) throw Error("No conversation to branch");
    throw Ie(err), err;
  }
  let writeStream = Dp6.createWriteStream(forkPath, {
      encoding: "utf8",
      mode: 384
    }),
    writeError = null;
  writeStream.on("error", err => {
    writeError = _o(err);
  });
  let lineReader = OtK.createInterface({
      input: readStream,
      crlfDelay: 1 / 0
    }),
    targetUuids = new Set(messages.map(entry => entry.uuid)),
    matchedEntries = new Map(),
    contentReplacements = [],
    cleanup = async () => {
      writeStream.destroy(), await Mp6.unlink(forkPath).catch(() => {});
    },
    writeLine = async line => {
      if (writeError) throw await cleanup(), writeError;
      if (!writeStream.write(line)) await Kzq.once(writeStream, "drain").catch(() => {});
    };
  try {
    for await (let line of lineReader) {
      if (line.length === 0) continue;
      let record;
      try {
        record = Wt(line);
      } catch {
        continue;
      }
      if (record.type === "content-replacement" && record.sessionId === currentSessionId) {
        contentReplacements.push(...record.replacements);
        continue;
      }
      if (!c6(record) || record.isSidechain || !targetUuids.has(record.uuid)) continue;
      matchedEntries.set(record.uuid, record);
    }
  } catch (err) {
    throw await cleanup(), err;
  } finally {
    lineReader.close(), readStream.destroy();
  }
  let parentUuid = null,
    lastEntry = null,
    serializedMessages = [];
  try {
    for (let entry of messages) {
      let record = matchedEntries.get(entry.uuid);
      if (!record) continue;
      let neutralizationPatch = record.type === "system" && record.subtype === "model_refusal_fallback" ? {
          neutralizedByFork: true
        } : undefined,
        forkedEntry = {
          ...record,
          ...neutralizationPatch,
          sessionId: newSessionId,
          parentUuid: parentUuid,
          isSidechain: false,
          sessionKind: undefined,
          forkedFrom: {
            sessionId: currentSessionId,
            messageUuid: record.uuid
          }
        },
        replacementEntry = {
          ...record,
          ...neutralizationPatch,
          sessionId: newSessionId
        };
      if (serializedMessages.push(replacementEntry), lastEntry = record, await writeLine(Oe(forkedEntry) + `
`), record.type !== "progress") parentUuid = record.uuid;
    }
  } catch (err) {
    throw await cleanup(), err;
  }
  if (lastEntry === null) throw await cleanup(), Error("No messages to branch");
  if (extraMessages?.length) for (let extra of extraMessages) {
    let stamped = {
        ...extra,
        cwd: lastEntry.cwd,
        userType: lastEntry.userType,
        entrypoint: lastEntry.entrypoint,
        version: lastEntry.version,
        gitBranch: lastEntry.gitBranch,
        sessionId: newSessionId,
        timestamp: new Date().toISOString()
      },
      reparented = {
        ...stamped,
        parentUuid: parentUuid,
        isSidechain: false
      };
    if (serializedMessages.push(stamped), await writeLine(Oe(reparented) + `
`), extra.type !== "progress") parentUuid = extra.uuid;
  }
  if (contentReplacements.length > 0) await writeLine(Oe({
    type: "content-replacement",
    sessionId: newSessionId,
    replacements: contentReplacements
  }) + `
`);
  if (writeStream.end(), await TtK.finished(writeStream).catch(() => {}), writeError) throw await cleanup(), writeError;
  return {
    sessionId: newSessionId,
    title: title,
    forkPath: forkPath,
    serializedMessages: serializedMessages,
    contentReplacementRecords: contentReplacements
  };
}
async function xCO(baseTitle) {
  let candidateTitle = `${baseTitle} (Branch)`;
  if ((await XY(candidateTitle, {
    exact: true
  })).length === 0) return candidateTitle;
  let existingSessions = await XY(`${baseTitle} (Branch`),
    usedNumbers = new Set([1]),
    branchTitlePattern = new RegExp(`^${jI(baseTitle)} \\(Branch(?: (\\d+))?\\)$`);
  for (let session of existingSessions) {
    let match = session.customTitle?.match(branchTitlePattern);
    if (match) if (match[1]) usedNumbers.add(parseInt(match[1], 10));else usedNumbers.add(1);
  }
  let nextNumber = 2;
  while (usedNumbers.has(nextNumber)) nextNumber++;
  return `${baseTitle} (Branch ${nextNumber})`;
}
async function branchAndResume(context, emit, options = {}) {
  let originalSessionId = kt(),
    originalAgentName = fh(originalSessionId);
  try {
    let {
        sessionId: sessionId,
        title: title,
        forkPath: forkPath,
        serializedMessages: serializedMessages,
        contentReplacementRecords: contentReplacementRecords
      } = await createFork(context.messages, options.customTitle, options.extraMessages),
      now = new Date(),
      firstPrompt = deriveFirstPrompt(serializedMessages.find(entry => entry.type === "user")),
      resolvedTitle = title?.replace(/\s+/g, " ").trim() ?? (await xCO(firstPrompt)),
      titleSource = title ? "user" : "auto";
    await k6(sessionId, resolvedTitle, forkPath, titleSource), await T6e(sessionId, resolvedTitle, forkPath, titleSource), j("tengu_conversation_forked", {
      message_count: serializedMessages.length,
      has_custom_title: !!title
    });
    let f = {
        date: ki(now.toISOString(), "T"),
        messages: serializedMessages,
        fullPath: forkPath,
        value: now.getTime(),
        created: now,
        modified: now,
        firstPrompt: firstPrompt,
        messageCount: serializedMessages.length,
        isSidechain: false,
        sessionId: sessionId,
        customTitle: resolvedTitle,
        agentName: resolvedTitle,
        contentReplacements: contentReplacementRecords
      },
      A = title ? ` "${resolvedTitle}"` : "",
      sessionEntry = originalAgentName ? ` ("${originalAgentName}")` : "",
      titleSuffix = `Branched conversation${A}. You are now in the new branch (session ${sessionId}). Use /resume ${originalSessionId}${sessionEntry} to return to the original, or run \`claude -r ${originalSessionId}\` in a new terminal.`;
    if (context.resume) await context.resume(sessionId, f, "fork"), emit(titleSuffix, {
      display: "system"
    });else emit(`Branched conversation${A}. Resume with: /resume ${sessionId}`);
    return true;
  } catch (err) {
    let reason = err instanceof Error ? err.message : "Unknown error occurred";
    return emit(`Failed to branch conversation: ${reason}`), false;
  }
}
async function call(output, context, rawTitle) {
  return await branchAndResume(context, output, {
    customTitle: rawTitle?.trim() || undefined
  }), null;
}
var KtK, Kzq, Dp6, Mp6, OtK, TtK;
var Tzq = b(() => {
  ct();
  Ct();
  St();
  wn();
  ry();
  za();
  Xt();
  fr();
  KtK = require("crypto"), Kzq = require("events"), Dp6 = require("fs"), Mp6 = require("fs/promises"), OtK = require("readline"), TtK = require("stream/promises");
});

export {Ozq as y_o,deriveFirstPrompt,createFork,xCO as k6p,branchAndResume,call as H6p,KtK as Krl,Kzq as __o,Dp6 as Ujn,Mp6 as $jn,OtK as zrl,TtK as Yrl,Tzq as T_o};
