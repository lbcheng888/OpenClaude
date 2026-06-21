// @ts-nocheck
import {BS as DS} from "../../vendor/m642.ts";
import {findCanonicalGitRoot as Uf,Ba} from "../../vendor/m693.ts";
import {getProjectRoot as yc,lt as ct} from "../session/0131_sent.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {Kse as Nse,tA as iA} from "./2201_tA.ts";
import {mve as YCe,F_n as Qgn} from "../../vendor/m2198.ts";
import {oie as Kse,Lhi as kAi,tIt as LHt} from "./2244_content.ts";
import {b} from "../../runtime.ts";
import {Iu as Pu} from "../../vendor/m643.ts";
// @ts-nocheck
function PAi(e) {
  let t = e.replace(/[^a-zA-Z0-9\-_]/g, "-");
  return t === "" ? "unknown" : t;
}
function sanitizeMemoryDirName(rawName) {
  if (process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR) return VW.join(process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR, "projects", DS(Uf(yc()) ?? yc()), "agent-memory-local", rawName) + VW.sep;
  return VW.join(Pt(), ".claude", "agent-memory-local", rawName) + VW.sep;
}
function getLocalAgentMemoryDir(sanitizedAgentName, t) {
  let n = PAi(sanitizedAgentName);
  switch (t) {
    case "project":
      return VW.join(Pt(), ".claude", "agent-memory", n) + VW.sep;
    case "local":
      return sanitizeMemoryDirName(n);
    case "user":
      return VW.join(Nse(), "agent-memory", n) + VW.sep;
  }
}
function getAgentMemoryDir(agentName) {
  let t = VW.normalize(agentName),
    n = Nse(),
    r = null,
    o = VW.join(n, "agent-memory") + VW.sep;
  if (t.startsWith(o)) r = o;else {
    let s = VW.join(Pt(), ".claude", "agent-memory") + VW.sep;
    if (t.startsWith(s)) r = s;else if (process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR) {
      let i = VW.join(process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR, "projects") + VW.sep;
      if (t.includes(VW.sep + "agent-memory-local" + VW.sep) && t.startsWith(i)) r = i;
    } else {
      let i = VW.join(Pt(), ".claude", "agent-memory-local") + VW.sep;
      if (t.startsWith(i)) r = i;
    }
  }
  return r !== null && !YCe(t, r);
}
function isInsideAgentMemoryDir(filePath) {
  switch (filePath) {
    case "user":
      return `User (${VW.join(Nse(), "agent-memory")}/)`;
    case "project":
      return "Project (.claude/agent-memory/)";
    case "local":
      return `Local (${sanitizeMemoryDirName("...")})`;
    default:
      return "None";
  }
}
function getMemoryScopeDisplayLabel(scope, t) {
  let n;
  switch (t) {
    case "user":
      n = "- Since this memory is user-scope, keep learnings general since they apply across all projects";
      break;
    case "project":
      n = "- Since this memory is project-scope and shared with your team via version control, tailor your memories to this project";
      break;
    case "local":
      n = "- Since this memory is local-scope (not checked into version control), tailor your memories to this project and machine";
      break;
  }
  let r = getLocalAgentMemoryDir(scope, t);
  Kse(r);
  let o = process.env.CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES;
  return kAi({
    displayName: "Persistent Agent Memory",
    memoryDir: r,
    extraGuidelines: o && o.trim().length > 0 ? [n, o] : [n]
  });
}
var VW;
var Dt = b(() => {
  ct();
  LHt();
  iA();
  Ko();
  Ba();
  Pu();
  Qgn();
  VW = require("path");
});

export {PAi as Fhi,sanitizeMemoryDirName as Uhi,getLocalAgentMemoryDir as IQe,getAgentMemoryDir as nIt,isInsideAgentMemoryDir as vyn,getMemoryScopeDisplayLabel as NFe,VW as GR,Dt as uZ};
