// @ts-nocheck
import {getSessionId as C_,getPlanSlugCache as NjH,lt as Y_} from "../session/0132_sent.ts";
import {g$r as sy8,aet as AsH,bbn as eY6,cet as wsH} from "../../vendor/m2205.ts";
import {Wt as n_,ps as Z9} from "../../vendor/m230.ts";
import {In as x6,Jo as A9,Ct as G_} from "../../vendor/m197.ts";
import {logForDebugging as N,qe as gH} from "../config/0236_setHasFormattedOutput.ts";
import {Ie as CH,vn as C6} from "../session/0621_length.ts";
import {Js as T7,rT as of} from "../../vendor/m1294.ts";
import {yEn as iA6,yD as gN,R9r as dv8} from "../config/2259_R9r.ts";
import {_a as nK,P3e as GxH} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {b as L} from "../../runtime.ts";
import {Wi as o7,Hn as V6} from "../../vendor/m100.ts";
import {Po as Qq,isTmuxControlMode as u_} from "../../vendor/m638.ts";
import {dn as w6,or as $8} from "../config/0137_namespace.ts";
import {br as N8,getInitialSettings as c8} from "../config/0745_updateSettingsForSource.ts";
// @ts-nocheck
function getOrCreatePlanSlug(sessionIdOverride, prefix) {
  let sessionId = sessionIdOverride ?? C_(),
    slugCache = NjH(),
    cached = slugCache.get(sessionId);
  if (!cached) {
    let plansDir = getPlansDirPath(),
      slugSuffix = prefix ? sy8(prefix) : "";
    for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt++) {
      cached = slugSuffix ? `${slugSuffix}-${AsH()}` : eY6();
      let filePath = pathModule.join(plansDir, `${cached}.md`);
      if (!n_().existsSync(filePath)) break;
    }
    slugCache.set(sessionId, cached);
  }
  return cached;
}
function getPlanSlug(sessionIdOverride) {
  return NjH().get(sessionIdOverride ?? C_());
}
function setPlanSlug(sessionId, slug) {
  NjH().set(sessionId, slug);
}
function clearPlanSlugCache() {
  NjH().clear();
}
function getPlanFilePath(agentId) {
  let slug = getOrCreatePlanSlug(C_());
  if (!agentId) return pathModule.join(getPlansDirPath(), `${slug}.md`);
  return pathModule.join(getPlansDirPath(), `${slug}-agent-${agentId}.md`);
}
function readPlanFile(agentId) {
  let filePath = getPlanFilePath(agentId);
  try {
    return n_().readFileSync(filePath, {
      encoding: "utf-8"
    });
  } catch (err) {
    if (x6(err)) return null;
    if (A9(err)) return N(`getPlan: read failed for ${filePath}: ${err}`), null;
    return CH(err), null;
  }
}
function extractSlugFromMessages(session) {
  return session.messages.find(msg => msg.slug)?.slug;
}
async function copyPlanForResume(session, sessionIdOverride) {
  let slug = extractSlugFromMessages(session);
  if (!slug) return false;
  let targetSessionId = sessionIdOverride ?? C_();
  setPlanSlug(targetSessionId, slug);
  let filePath = pathModule.join(getPlansDirPath(), `${slug}.md`);
  try {
    return await T7().read(filePath), true;
  } catch (err) {
    if (!x6(err)) {
      if (A9(err)) return N(`copyPlanForResume: read failed for ${filePath}: ${err}`), false;
      return CH(err), false;
    }
    if (iA6() === null) return false;
    N(`Plan file missing during resume: ${filePath}. Attempting recovery.`);
    let snapshotEntry = findFileSnapshot(session.messages, "plan"),
      recoveredContent = null;
    if (snapshotEntry && snapshotEntry.content.length > 0) recoveredContent = snapshotEntry.content, N(`Plan recovered from file snapshot, ${recoveredContent.length} chars`, {
      level: "info"
    });else if (recoveredContent = recoverPlanFromHistory(session), recoveredContent) N(`Plan recovered from message history, ${recoveredContent.length} chars`, {
      level: "info"
    });
    if (recoveredContent) try {
      return await T7().write(filePath, recoveredContent), true;
    } catch (writeErr) {
      if (A9(writeErr)) return N(`Plan recovery write failed for ${filePath}: ${writeErr}`), false;
      return CH(writeErr), false;
    }
    return N("Plan file recovery failed: no file snapshot or plan content found in message history"), false;
  }
}
async function copyPlanForFork(session, targetSessionId) {
  let slug = extractSlugFromMessages(session);
  if (!slug) return false;
  let plansDir = getPlansDirPath(),
    srcPath = pathModule.join(plansDir, `${slug}.md`),
    newSlug = getOrCreatePlanSlug(targetSessionId),
    destPath = pathModule.join(plansDir, `${newSlug}.md`);
  try {
    return await T7().copy(srcPath, destPath), true;
  } catch (err) {
    if (x6(err)) return false;
    if (A9(err)) return N(`copyPlanForFork: copy failed for ${srcPath}: ${err}`), false;
    return CH(err), false;
  }
}
function recoverPlanFromHistory(session) {
  for (let idx = session.messages.length - 1; idx >= 0; idx--) {
    let msg = session.messages[idx];
    if (!msg) continue;
    if (msg.type === "assistant") {
      let {
        content: content
      } = msg.message;
      if (Array.isArray(content)) {
        for (let block of content) if (block.type === "tool_use" && block.name === gN) {
          let plan = block.input?.plan;
          if (typeof plan === "string" && plan.length > 0) return plan;
        }
      }
    }
    if (msg.type === "user") {
      let userMsg = msg;
      if (typeof userMsg.planContent === "string" && userMsg.planContent.length > 0) return userMsg.planContent;
    }
    if (msg.type === "attachment") {
      let attachMsg = msg;
      if (attachMsg.attachment?.type === "plan_file_reference") {
        let content = attachMsg.attachment.planContent;
        if (typeof content === "string" && content.length > 0) return content;
      }
    }
  }
  return null;
}
function findFileSnapshot(messages, key) {
  for (let idx = messages.length - 1; idx >= 0; idx--) {
    let msg = messages[idx];
    if (msg?.type === "system" && "subtype" in msg && msg.subtype === "file_snapshot" && "snapshotFiles" in msg) return msg.snapshotFiles.find(file => file.key === key);
  }
  return;
}
async function snapshotPlanToTranscript() {
  if (iA6() === null) return;
  try {
    let snapshots = [],
      planContent = readPlanFile();
    if (planContent) snapshots.push({
      key: "plan",
      path: getPlanFilePath(),
      content: planContent
    });
    if (snapshots.length === 0) return;
    let snapshotMsg = {
        type: "system",
        subtype: "file_snapshot",
        content: "File snapshot",
        level: "info",
        isMeta: true,
        timestamp: new Date().toISOString(),
        uuid: cryptoModule.randomUUID(),
        snapshotFiles: snapshots
      },
      {
        recordTranscript: recordTranscript
      } = await Promise.resolve().then(() => (nK(), GxH));
    await recordTranscript([snapshotMsg]);
  } catch (err) {
    CH(err);
  }
}
var cryptoModule,
  pathModule,
  MAX_SLUG_ATTEMPTS = 10,
  getPlansDirPath;
var moduleInit = L(() => {
  o7();
  Y_();
  of();
  Qq();
  gH();
  w6();
  G_();
  dv8();
  Z9();
  C6();
  N8();
  wsH();
  cryptoModule = require("crypto"), pathModule = require("path");
  getPlansDirPath = V6(function () {
    let q = c8().plansDirectory,
      K;
    if (q) {
      let O = u_(),
        T = pathModule.resolve(O, q);
      if (!T.startsWith(O + pathModule.sep) && T !== O) N(`plansDirectory must be within project root: ${q}`, {
        level: "error"
      }), K = pathModule.join($8(), "plans");else K = T;
    } else K = pathModule.join($8(), "plans");
    try {
      n_().mkdirSync(K);
    } catch (O) {
      N(`Failed to create plans directory ${K}: ${O}`, {
        level: "error"
      });
    }
    return K;
  });
});
export {getOrCreatePlanSlug as nDe,getPlanSlug as bgt,setPlanSlug as vOo,clearPlanSlugCache as Ldl,getPlanFilePath as GD,readPlanFile as VD,extractSlugFromMessages as p3l,copyPlanForResume as e$n,copyPlanForFork as m3l,recoverPlanFromHistory as Bwm,findFileSnapshot as Uwm,snapshotPlanToTranscript as l9n,cryptoModule as d3l,pathModule as sV,MAX_SLUG_ATTEMPTS as Fwm,getPlansDirPath as bT,moduleInit as Dw};
