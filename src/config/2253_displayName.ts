// @ts-nocheck
import {NS as DS} from "../../vendor/m648.ts";
import {findCanonicalGitRoot as Uf,ia as Ba} from "../../vendor/m698.ts";
import {getProjectRoot as yc,lt as ct} from "../session/0132_sent.ts";
import {isTmuxControlMode as Pt,Po as Ko} from "../../vendor/m638.ts";
import {zse as Nse,Jm as iA} from "./2207_Jm.ts";
import {_Ue as YCe,Sbn as Qgn} from "../../vendor/m2204.ts";
import {rie as Kse,MEi as kAi,xDt as LHt} from "./2252_content.ts";
import {b} from "../../runtime.ts";
import {Tu as Pu} from "../../vendor/m649.ts";
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
export {PAi as UEi,sanitizeMemoryDirName as $Ei,getLocalAgentMemoryDir as Det,getAgentMemoryDir as PUe,isInsideAgentMemoryDir as lEn,getMemoryScopeDisplayLabel as OUe,VW as rw,Dt as rz};
