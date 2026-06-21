// @ts-nocheck
import {b} from "../../runtime.ts";
import {lo,eG as MW,mI as aI} from "../tools/5190_userPromptCount.ts";
// @ts-nocheck
function uWn(e) {
  let t = searchTextCache.get(e);
  if (t !== undefined) return t;
  let n = jXp(e).toLowerCase();
  return searchTextCache.set(e, n), n;
}
function jXp(e) {
  let t = "";
  switch (e.type) {
    case "user":
      {
        let o = e.message.content;
        if (typeof o === "string") t = interruptedMessageStrings.has(o) ? "" : o;else {
          let s = [];
          for (let i of o) if (i.type === "text") {
            if (!interruptedMessageStrings.has(i.text)) s.push(i.text);
          } else if (i.type === "tool_result") s.push(extractToolInputText(e.toolUseResult));
          t = s.join(`
`);
        }
        break;
      }
    case "assistant":
      {
        let o = e.message.content;
        if (Array.isArray(o)) t = o.flatMap(s => {
          if (s.type === "text") return [s.text];
          if (s.type === "tool_use") return [WXp(s.input)];
          return [];
        }).join(`
`);
        break;
      }
    case "attachment":
      {
        if (e.attachment.type === "relevant_memories") t = e.attachment.memories.map(o => o.content).join(`
`);else if (e.attachment.type === "queued_command" && e.attachment.commandMode !== "task-notification" && !e.attachment.isMeta) {
          let o = e.attachment.prompt;
          t = typeof o === "string" ? o : o.flatMap(s => s.type === "text" ? [s.text] : []).join(`
`);
        }
        break;
      }
    case "collapsed_read_search":
      {
        if (e.relevantMemories) t = e.relevantMemories.map(o => o.content).join(`
`);
        break;
      }
    default:
      break;
  }
  let n = t,
    r = n.indexOf("<system-reminder>");
  while (r >= 0) {
    let o = n.indexOf(ngl, r);
    if (o < 0) break;
    n = n.slice(0, r) + n.slice(o + ngl.length), r = n.indexOf("<system-reminder>");
  }
  return n;
}
function WXp(e) {
  if (!e || typeof e !== "object") return "";
  let t = e,
    n = [];
  for (let r of ["command", "pattern", "file_path", "path", "prompt", "description", "query", "url", "skill"]) {
    let o = t[r];
    if (typeof o === "string") n.push(o);
  }
  for (let r of ["args", "files"]) {
    let o = t[r];
    if (Array.isArray(o) && o.every(s => typeof s === "string")) n.push(o.join(" "));
  }
  return n.join(`
`);
}
function extractToolInputText(input) {
  if (!input || typeof input !== "object") return typeof input === "string" ? input : "";
  let obj = input;
  if (typeof obj.stdout === "string") {
    let r = typeof obj.stderr === "string" ? obj.stderr : "";
    return obj.stdout + (r ? `
` + r : "");
  }
  if (obj.file && typeof obj.file === "object" && typeof obj.file.content === "string") return obj.file.content;
  let n = [];
  for (let r of ["content", "output", "result", "text", "message"]) {
    let o = obj[r];
    if (typeof o === "string") n.push(o);
  }
  for (let r of ["filenames", "lines", "results"]) {
    let o = obj[r];
    if (Array.isArray(o) && o.every(s => typeof s === "string")) n.push(o.join(`
`));
  }
  return n.join(`
`);
}
var ngl = "</system-reminder>",
  interruptedMessageStrings,
  searchTextCache;
var Yfq = b(() => {
  lo();
  interruptedMessageStrings = new Set([MW, aI]), searchTextCache = new WeakMap();
});

export {uWn as XWn,jXp as Rem,WXp as xem,extractToolInputText as kem,ngl as C_l,interruptedMessageStrings as v_l,searchTextCache as w_l,Yfq as UEo};
