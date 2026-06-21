// @ts-nocheck
import {qt as Wt,Le as Oe,Xt} from "../config/0228_encoding.ts";
import {tr as sr,sn as an} from "../config/0047_namespace.ts";
import {lYt as _zt,ws as bs} from "../../vendor/m228.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {isTmuxControlMode as Bt,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {dn as ln,bt as St} from "../../vendor/m195.ts";
import {getProjectRoot as yc,getSessionId as kt,lt as ct} from "./0131_sent.ts";
import {pHi as iki,cHi as rki,dHi as ski,K9r as e9r} from "../../vendor/m2519.ts";
import {ci as oi,pT as iT} from "../../vendor/m1289.ts";
import {Mg as Fg} from "../../vendor/m1474.ts";
import {De as Ie,Rn as wn} from "./0615_length.ts";
import {sleep as Fn} from "../telemetry/1483_withTimeout.ts";
import {st as rt} from "../../vendor/m5.ts";
import {isNestedInteractiveClaudeSession as U1e,Am as Sf} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Gi as qi,ReactHooks as Jd} from "../../vendor/m133.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function dwe(e) {
  return (e.match(/\r\n|\r|\n/g) || []).length;
}
function pastedTextLineCount(text, t) {
  if (t === 0) return `[Pasted text #${text}]`;
  return `[Pasted text #${text} +${t} lines]`;
}
function formatPastedTextPlaceholder(id) {
  return `[Image #${id}]`;
}
function formatImagePlaceholder(id) {
  if (!id) return [];
  let t = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;
  return [...id.matchAll(t)].map(r => ({
    id: parseInt(r[2] || "0"),
    match: r[0],
    index: r.index
  })).filter(r => r.id > 0);
}
function parsePlaceholders(text) {
  return text.match.startsWith("[...Truncated text") ? `[...Truncated text #${text.id} \u2014 content no longer available...]` : `[Pasted text #${text.id} \u2014 content no longer available]`;
}
function formatUnavailablePlaceholder(placeholder, t) {
  let n = formatImagePlaceholder(placeholder),
    r = placeholder;
  for (let o = n.length - 1; o >= 0; o--) {
    let s = n[o],
      i = t[s.id];
    if (i?.type !== "text") continue;
    r = r.slice(0, s.index) + i.content + r.slice(s.index + s.match.length);
  }
  return r;
}
function expandPlaceholders(text, contents) {
  let placeholders = null;
  for (let o of formatImagePlaceholder(text)) {
    if (contents[o.id]?.type !== "text") continue;
    if (!placeholders || o.id > placeholders.id) placeholders = o;
  }
  if (!placeholders) return null;
  let r = contents[placeholders.id].content;
  if (r.length > MAX_INLINE_EXPANSION_LENGTH) return null;
  return {
    expanded: text.slice(0, placeholders.index) + r + text.slice(placeholders.index + placeholders.match.length),
    id: placeholders.id,
    cursorOffset: placeholders.index + r.length
  };
}
function expandLargestTextPlaceholder(text) {
  return Wt(text);
}
async function* parseHistoryLine() {
  let e = pendingHistory.slice(),
    t = new Set(e.map(o => `${o.timestamp}\x00${o.sessionId ?? ""}`));
  for (let o = e.length - 1; o >= 0; o--) yield e[o];
  let n = nodePath.join(sr(), "history.jsonl"),
    r = false;
  try {
    for await (let o of _zt(n)) try {
      let s = expandLargestTextPlaceholder(o),
        i = `${s.timestamp}\x00${s.sessionId ?? ""}`;
      if (removedEntryKeys.has(i) || t.has(i)) continue;
      yield s;
    } catch (s) {
      v(`Failed to parse history line: ${s}`), r = true;
    }
    if (r) Bt("history_load", "history_load_parse_failed");else He("history_load");
  } catch (o) {
    if (ln(o) === "ENOENT") {
      He("history_load");
      return;
    }
    throw o;
  }
}
async function* streamHistoryEntries() {
  for await (let e of parseHistoryLine()) yield await substituteLostPlaceholders(e);
}
async function* streamResolvedHistoryEntries(e = "project") {
  let t = yc(),
    n = kt(),
    r = new Set();
  for await (let o of parseHistoryLine()) {
    if (!o || typeof o.project !== "string") continue;
    if (e === "project" && o.project !== t) continue;
    if (e === "session" && o.sessionId !== n) continue;
    if (r.has(o.display)) continue;
    if (r.add(o.display), yield {
      display: o.display,
      timestamp: o.timestamp,
      resolve: () => substituteLostPlaceholders(o)
    }, r.size >= MAX_HISTORY_RESULTS) return;
  }
}
async function streamHistoryDisplays(e) {
  let project = yc(),
    session = 0,
    seenDisplays = 0;
  try {
    for await (let o of parseHistoryLine()) {
      if (!o || typeof o.project !== "string") continue;
      if (o.project !== project) continue;
      if (session++, !e || e(o.display)) seenDisplays++;
      if (session >= MAX_HISTORY_RESULTS) break;
    }
  } catch {
    return null;
  }
  return seenDisplays;
}
async function* countProjectHistoryEntries() {
  let e = yc(),
    t = kt(),
    n = [],
    r = 0;
  for await (let o of parseHistoryLine()) {
    if (!o || typeof o.project !== "string") continue;
    if (o.project !== e) continue;
    if (o.sessionId === t) yield await substituteLostPlaceholders(o), r++;else n.push(o);
    if (r + n.length >= MAX_HISTORY_RESULTS) break;
  }
  for (let o of n) {
    if (r >= MAX_HISTORY_RESULTS) return;
    yield await substituteLostPlaceholders(o), r++;
  }
}
async function streamProjectHistoryEntries(e) {
  if (e.content) return {
    id: e.id,
    type: e.type,
    content: e.content,
    mediaType: e.mediaType,
    filename: e.filename
  };
  if (e.contentHash) {
    let t = await iki(e.contentHash);
    if (t) return {
      id: e.id,
      type: e.type,
      content: t,
      mediaType: e.mediaType,
      filename: e.filename
    };
  }
  return null;
}
function resolvePastedContent(item) {
  let t = item ?? "missing-hash";
  if (reportedLostHashes.has(t)) return;
  reportedLostHashes.add(t), Bt("paste_store", "paste_store_content_lost");
}
function reportLostPasteContent(contentHash, t) {
  if (t.size === 0) return contentHash;
  let n = formatImagePlaceholder(contentHash),
    r = contentHash;
  for (let o = n.length - 1; o >= 0; o--) {
    let s = n[o];
    if (!t.has(s.id) || s.match.startsWith("[Image")) continue;
    r = r.slice(0, s.index) + parsePlaceholders(s) + r.slice(s.index + s.match.length);
  }
  return r;
}
async function substituteLostPlaceholders(display) {
  let t = display.pastedContents || {},
    n = {},
    r = new Set();
  for (let [o, s] of Object.entries(t)) {
    let i = await streamProjectHistoryEntries(s);
    if (i) n[Number(o)] = i;else if (s.type === "text") r.add(Number(o)), resolvePastedContent(s.contentHash);
  }
  return {
    display: reportLostPasteContent(display.display, r),
    pastedContents: n
  };
}
async function resolveEntryPastedContents() {
  if (pendingHistory.length === 0) return;
  let e;
  try {
    let t = nodePath.join(sr(), "history.jsonl");
    await oi().append(t, "", 384), e = await Fg(t, {
      stale: 1e4,
      retries: {
        retries: 3,
        minTimeout: 50
      },
      onCompromised: r => v(`History lock compromised: ${r}`, {
        level: "error"
      })
    });
    let n = pendingHistory.map(r => Oe(r) + `
`);
    pendingHistory = [], await oi().append(t, n.join(""), 384), He("history_save");
  } catch (t) {
    v(`Failed to write prompt history: ${t}`), Bt("history_save", "history_save_write_failed");
  } finally {
    if (e) await e().catch(Ie);
  }
}
async function flushPromptHistory(e) {
  if (isFlushing || pendingHistory.length === 0) return;
  if (e > 5) return;
  isFlushing = true;
  try {
    await resolveEntryPastedContents();
  } finally {
    if (isFlushing = false, pendingHistory.length > 0) await Fn(500), flushPromptHistory(e + 1);
  }
}
function scheduleFlush(retryCount, t, n, r) {
  if (!retryCount || retryCount.display !== t.display) return false;
  if (retryCount.project !== n || retryCount.sessionId !== r) return false;
  let o = Object.keys(retryCount.pastedContents).length > 0,
    s = !!t.pastedContents && Object.keys(t.pastedContents).length > 0;
  return !o && !s;
}
async function isDuplicateOfLast(entry) {
  let t = typeof entry === "string" ? {
      display: entry,
      pastedContents: {}
    } : entry,
    n = yc(),
    r = kt();
  if (scheduleFlush(lastRecordedEntry, t, n, r)) {
    skipNextRemoval = true;
    return;
  }
  let o = {};
  if (t.pastedContents) for (let [i, a] of Object.entries(t.pastedContents)) {
    if (a.type === "image") continue;
    if (a.content.length <= MAX_INLINE_PASTE_LENGTH) o[Number(i)] = {
      id: a.id,
      type: a.type,
      content: a.content,
      mediaType: a.mediaType,
      filename: a.filename
    };else {
      let l = rki(a.content);
      o[Number(i)] = {
        id: a.id,
        type: a.type,
        contentHash: l,
        mediaType: a.mediaType,
        filename: a.filename
      }, ski(l, a.content);
    }
  }
  let s = {
    ...t,
    pastedContents: o,
    timestamp: Date.now(),
    project: n,
    sessionId: r
  };
  pendingHistory.push(s), lastRecordedEntry = s, skipNextRemoval = false, flushPromise = flushPromptHistory(0);
}
function appendPromptToHistory(input) {
  if (rt(process.env.CLAUDE_CODE_SKIP_PROMPT_HISTORY) || U1e()) return;
  if (!shutdownHookInstalled) shutdownHookInstalled = true, qi(async () => {
    if (flushPromise) await flushPromise;
    if (pendingHistory.length > 0) await resolveEntryPastedContents();
  });
  isDuplicateOfLast(input);
}
function recordPrompt() {
  if (skipNextRemoval) {
    skipNextRemoval = false;
    return;
  }
  if (!lastRecordedEntry) return;
  let e = lastRecordedEntry;
  lastRecordedEntry = null;
  let t = pendingHistory.lastIndexOf(e);
  if (t !== -1) pendingHistory.splice(t, 1);else removedEntryKeys.add(`${e.timestamp}\x00${e.sessionId ?? ""}`);
}
var nodePath,
  MAX_HISTORY_RESULTS = 100,
  MAX_INLINE_PASTE_LENGTH = 1024,
  MAX_INLINE_EXPANSION_LENGTH = 1e5,
  historyScopes,
  reportedLostHashes,
  pendingHistory,
  isFlushing = false,
  flushPromise = null,
  shutdownHookInstalled = false,
  lastRecordedEntry = null,
  skipNextRemoval = false,
  removedEntryKeys;
var Xp = b(() => {
  ct();
  cn();
  iT();
  Jd();
  je();
  an();
  St();
  bs();
  wn();
  e9r();
  Xt();
  Sf();
  nodePath = require("path");
  historyScopes = ["session", "project", "everywhere"];
  reportedLostHashes = new Set();
  pendingHistory = [], removedEntryKeys = new Set();
});

export {dwe as wwe,pastedTextLineCount as fet,formatPastedTextPlaceholder as rEn,formatImagePlaceholder as EF,parsePlaceholders as Zmd,formatUnavailablePlaceholder as QK,expandPlaceholders as hHi,expandLargestTextPlaceholder as efd,parseHistoryLine as sEn,streamHistoryEntries as J9r,streamResolvedHistoryEntries as gHi,streamHistoryDisplays as _Hi,countProjectHistoryEntries as aEn,streamProjectHistoryEntries as tfd,resolvePastedContent as nfd,reportLostPasteContent as rfd,substituteLostPlaceholders as eEn,resolveEntryPastedContents as THi,flushPromptHistory as SHi,scheduleFlush as ofd,isDuplicateOfLast as sfd,appendPromptToHistory as Aet,recordPrompt as bHi,nodePath as Y9r,MAX_HISTORY_RESULTS as Zbn,MAX_INLINE_PASTE_LENGTH as Qmd,MAX_INLINE_EXPANSION_LENGTH as oEn,historyScopes as iEn,reportedLostHashes as fHi,pendingHistory as Lie,isFlushing as z9r,flushPromise as tEn,shutdownHookInstalled as AHi,lastRecordedEntry as N0t,skipNextRemoval as nEn,removedEntryKeys as yHi,Xp as K4};
