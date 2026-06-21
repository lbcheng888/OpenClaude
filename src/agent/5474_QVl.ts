// @ts-nocheck
import {getProjectRoot as I1,lt as w_} from "../session/0131_sent.ts";
import {getBranch as yD,Ba as gK} from "../../vendor/m693.ts";
import {b as L} from "../../runtime.ts";
/** Restored Claude Code 2.1.177 module. Extracts project and path words for agent prompt suggestions. */
function splitSuggestionWords(H: any): any {
  return H.replace(/([a-z])([A-Z])/g, "$1 $2").split(/[-_./\s]+/).map((_: any): any => _.trim()).filter((_: any): any => _.length > 2 && _.length <= 20);
}
function extractPathSuggestionWords(H: any): any {
  let _ = pathModule.basename(H).replace(/\.[^.]+$/, "");
  return splitSuggestionWords(_);
}
async function collectSuggestionWords(H: any): any {
  let _ = new Set(seedSuggestionWords);
  try {
    let q = I1();
    if (q) {
      let K = pathModule.basename(q);
      if (K.length > 2 && K.length <= 50) _.add(K);
    }
  } catch {}
  try {
    let q = await yD();
    if (q) for (let K of splitSuggestionWords(q)) _.add(K);
  } catch {}
  if (H) for (let q of H) {
    if (_.size >= TB4) break;
    for (let K of extractPathSuggestionWords(q)) _.add(K);
  }
  return [..._].slice(0, TB4);
}
var pathModule,
  seedSuggestionWords,
  TB4 = 50;
var $B4 = L((): any => {
  w_();
  gK();
  pathModule = require("path"), seedSuggestionWords = ["MCP", "symlink", "grep", "regex", "localhost", "codebase", "TypeScript", "JSON", "OAuth", "webhook", "gRPC", "dotfiles", "subagent", "worktree"];
});

export {splitSuggestionWords as XVl,extractPathSuggestionWords as cMm,collectSuggestionWords as OLo,pathModule as PLo,seedSuggestionWords as lMm,TB4 as JVl,$B4 as QVl};
