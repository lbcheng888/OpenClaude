// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getSessionId as It,getOriginalCwd as gr,lt} from "./0132_sent.ts";
import {Cg,Nm,D_} from "../agent/2784_withFileTypes.ts";
import {getTranscriptPathForSession as SH,getMaterializedSessionFile as px,isTranscriptMessage as Nq,searchSessionsByCustomTitle as YY,getCurrentSessionTitle as ph,saveCustomTitle as i6,saveAgentName as f8e,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {In,mo,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "./0621_length.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {mk,mi,lr} from "../../vendor/m233.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Mie,eb,Pf} from "../agent/2591_level.ts";
// @ts-nocheck
/**
 * Conversation forking / branch-and-resume.
 *
 * Reads the current session transcript, copies the selected messages into a new
 * fork session file (rewriting parent pointers / session ids), then optionally
 * resumes into the new branch. Module exports: deriveFirstPrompt, createFork,
 * call, branchAndResume.
 */
var fCo = {};
ft(fCo, {
  deriveFirstPrompt: () => deriveFirstPrompt,
  createFork: () => createFork,
  call: () => call,
  branchAndResume: () => branchAndResume
});
/** Derive a short human-readable title from the first user message's text content. */
function deriveFirstPrompt(message) {
  let content = message?.message?.content;
  if (!content) return "Branched conversation";
  let text: string | undefined = typeof content === "string" ? content : content.find(block => block.type === "text")?.text;
  if (!text) return "Branched conversation";
  return text.replace(/\s+/g, " ").trim().slice(0, 100).trimEnd() || "Branched conversation";
}
/**
 * Fork the given messages into a brand-new session transcript file.
 * @param messages       source message entries to copy into the fork
 * @param title          optional user-supplied custom title
 * @param extraMessages  optional extra messages appended after the forked ones
 */
async function createFork(messages, title, extraMessages) {
  let newSessionId = Pul.randomUUID(),
    currentSessionId = It(),
    transcriptDir = Cg(gr()),
    forkPath = SH(newSessionId),
    sourceTranscriptPath = px() ?? Nm();
  await aVn.mkdir(transcriptDir, {
    recursive: !0,
    mode: 448
  });
  let readStream;
  try {
    readStream = iVn.createReadStream(sourceTranscriptPath, {
      encoding: "utf8"
    }), await mCo.once(readStream, "open");
  } catch (err) {
    if (In(err)) throw Error("No conversation to branch");
    throw Ie(err), err;
  }
  let writeStream = iVn.createWriteStream(forkPath, {
      encoding: "utf8",
      mode: 384
    }),
    writeError = null;
  writeStream.on("error", err => {
    writeError = mo(err);
  });
  let lineReader = Oul.createInterface({
      input: readStream,
      crlfDelay: 1 / 0
    }),
    targetUuids = new Set(messages.map(entry => entry.uuid)),
    matchedEntries = new Map(),
    contentReplacements = [],
    cleanup = async () => {
      writeStream.destroy(), await aVn.unlink(forkPath).catch(() => {});
    },
    writeLine = async line => {
      if (writeError) throw await cleanup(), writeError;
      if (!writeStream.write(line)) await mCo.once(writeStream, "drain").catch(() => {});
    };
  try {
    for await (let line of lineReader) {
      if (line.length === 0) continue;
      let record;
      try {
        record = qt(line);
      } catch {
        continue;
      }
      if (record.type === "content-replacement" && record.sessionId === currentSessionId) {
        contentReplacements.push(...record.replacements);
        continue;
      }
      if (!Nq(record) || record.isSidechain || !targetUuids.has(record.uuid)) continue;
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
          neutralizedByFork: !0
        } : void 0,
        forkedEntry = {
          ...record,
          ...neutralizationPatch,
          sessionId: newSessionId,
          parentUuid: parentUuid,
          isSidechain: !1,
          sessionKind: void 0,
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
      if (serializedMessages.push(replacementEntry), lastEntry = record, await writeLine(Pe(forkedEntry) + `
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
        isSidechain: !1
      };
    if (serializedMessages.push(stamped), await writeLine(Pe(reparented) + `
`), extra.type !== "progress") parentUuid = extra.uuid;
  }
  if (contentReplacements.length > 0) await writeLine(Pe({
    type: "content-replacement",
    sessionId: newSessionId,
    replacements: contentReplacements
  }) + `
`);
  if (writeStream.end(), await Lul.finished(writeStream).catch(() => {}), writeError) throw await cleanup(), writeError;
  return {
    sessionId: newSessionId,
    title: title,
    forkPath: forkPath,
    serializedMessages: serializedMessages,
    contentReplacementRecords: contentReplacements
  };
}
/** Compute a unique "(Branch)" / "(Branch N)" title that doesn't collide with existing session titles. */
async function mjp(baseTitle) {
  let candidateTitle = `${baseTitle} (Branch)`;
  if ((await YY(candidateTitle, {
    exact: !0
  })).length === 0) return candidateTitle;
  let existingSessions = await YY(`${baseTitle} (Branch`),
    usedNumbers = new Set([1]),
    branchTitlePattern = new RegExp(`^${mk(baseTitle)} \\(Branch(?: (\\d+))?\\)$`);
  for (let session of existingSessions) {
    let match = session.customTitle?.match(branchTitlePattern);
    if (match) if (match[1]) usedNumbers.add(parseInt(match[1], 10));else usedNumbers.add(1);
  }
  let nextNumber = 2;
  while (usedNumbers.has(nextNumber)) nextNumber++;
  return `${baseTitle} (Branch ${nextNumber})`;
}
/**
 * Fork the conversation, persist its metadata, and resume into the new branch.
 * @param context  conversation context (messages + optional resume callback)
 * @param emit     output/notification callback
 * @param options  fork options (customTitle, extraMessages)
 */
async function branchAndResume(context, emit, options = {}) {
  let originalSessionId = It(),
    originalAgentName = ph(originalSessionId);
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
      resolvedTitle = title?.replace(/\s+/g, " ").trim() ?? (await mjp(firstPrompt)),
      titleSource = title ? "user" : "auto";
    await i6(sessionId, resolvedTitle, forkPath, titleSource), await f8e(sessionId, resolvedTitle, forkPath, titleSource), W("tengu_conversation_forked", {
      message_count: serializedMessages.length,
      has_custom_title: !!title
    });
    let forkedSession = {
        date: mi(now.toISOString(), "T"),
        messages: serializedMessages,
        fullPath: forkPath,
        value: now.getTime(),
        created: now,
        modified: now,
        firstPrompt: firstPrompt,
        messageCount: serializedMessages.length,
        isSidechain: !1,
        sessionId: sessionId,
        customTitle: resolvedTitle,
        agentName: resolvedTitle,
        contentReplacements: contentReplacementRecords
      },
      titleSuffix = title ? ` "${resolvedTitle}"` : "",
      originalNameSuffix = originalAgentName ? ` ("${originalAgentName}")` : "",
      branchMessage = `Branched conversation${titleSuffix}. You are now in the new branch (session ${sessionId}). Use /resume ${originalSessionId}${originalNameSuffix} to return to the original, or run \`claude -r ${originalSessionId}\` in a new terminal.`;
    if (context.resume) await context.resume(sessionId, forkedSession, "fork"), Mie(eb(), resolvedTitle, "user"), emit(branchMessage, {
      display: "system"
    });else emit(`Branched conversation${titleSuffix}. Resume with: /resume ${sessionId}`);
    return !0;
  } catch (err) {
    let reason = err instanceof Error ? err.message : "Unknown error occurred";
    return emit(`Failed to branch conversation: ${reason}`), !1;
  }
}
/** Command entrypoint: branch-and-resume with an optional trimmed custom title. */
async function call(output, context, rawTitle) {
  return await branchAndResume(context, output, {
    customTitle: rawTitle?.trim() || void 0
  }), null;
}
var Pul, mCo, iVn, aVn, Oul, Lul;
var hCo = b(() => {
  lt();
  Pf();
  kt();
  Ct();
  vn();
  D_();
  _a();
  tn();
  lr();
  Pul = require("crypto"), mCo = require("events"), iVn = require("fs"), aVn = require("fs/promises"), Oul = require("readline"), Lul = require("stream/promises");
});

export {fCo,deriveFirstPrompt,createFork,mjp,branchAndResume,call as fjp,Pul,mCo,iVn,aVn,Oul,Lul,hCo};
