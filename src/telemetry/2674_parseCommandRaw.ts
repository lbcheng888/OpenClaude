// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {xF as SF,A2e as VUe} from "../../vendor/m2672.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
// @ts-nocheck
var lR7 = {};
pt(lR7, {
  parseCommandRaw: () => parseCommandRaw,
  parseCommand: () => parseCommand,
  findCommandNode: () => findCommandNode,
  extractCommandArguments: () => extractCommandArguments,
  PARSE_ABORTED: () => PARSE_ABORTED
});
async function parseCommand(e) {
  if (!e || e.length > JLi) return null;
  try {
    let t = SF().parse(e);
    if (!t) return null;
    let n = findCommandNode(t, null),
      r = vTd(n);
    return {
      rootNode: t,
      envVars: r,
      commandNode: n,
      originalCommand: e
    };
  } catch {
    return null;
  }
}
async function parseCommandRaw(e) {
  if (!e) return null;
  if (e.length > JLi) return j("tengu_tree_sitter_parse_abort", {
    cmdLength: e.length,
    panic: false
  }), PARSE_ABORTED;
  try {
    let t = SF().parse(e);
    if (t === null) return j("tengu_tree_sitter_parse_abort", {
      cmdLength: e.length,
      panic: false
    }), PARSE_ABORTED;
    return t;
  } catch {
    return j("tengu_tree_sitter_parse_abort", {
      cmdLength: e.length,
      panic: true
    }), PARSE_ABORTED;
  }
}
function findCommandNode(e, t) {
  let {
    type: n,
    children: r
  } = e;
  if (commandNodeTypes.has(n)) return e;
  if (n === "variable_assignment" && t) return t.children.find(o => commandNodeTypes.has(o.type) && o.startIndex > e.startIndex) ?? null;
  if (n === "pipeline") {
    for (let o of r) {
      let s = findCommandNode(o, e);
      if (s) return s;
    }
    return null;
  }
  if (n === "redirected_statement") return r.find(o => commandNodeTypes.has(o.type)) ?? null;
  for (let o of r) {
    let s = findCommandNode(o, e);
    if (s) return s;
  }
  return null;
}
function vTd(e) {
  if (!e || e.type !== "command") return [];
  let t = [];
  for (let n of e.children) if (n.type === "variable_assignment") t.push(n.text);else if (n.type === "command_name" || n.type === "word") break;
  return t;
}
function extractCommandArguments(e) {
  if (e.type === "declaration_command") {
    let r = e.children[0];
    return r && declarationKeywords.has(r.text) ? [r.text] : [];
  }
  let t = [],
    n = false;
  for (let r of e.children) {
    if (r.type === "variable_assignment") continue;
    if (r.type === "command_name" || !n && r.type === "word") {
      n = true;
      let o = r.children[0] ?? r;
      if (o.type === "concatenation") t.push(o.children.some(s => substitutionTypes.has(s.type)) ? o.text : o.children.map(GCn).join(""));else t.push(GCn(o));
      continue;
    }
    if (simpleWordTypes.has(r.type)) t.push(GCn(r));else if (r.type === "concatenation") {
      if (r.children.some(o => substitutionTypes.has(o.type))) break;
      t.push(r.children.map(GCn).join(""));
    } else if (substitutionTypes.has(r.type)) break;
  }
  return t;
}
function GCn(e) {
  if (e.type === "word") return e.text.replace(/\\(.)/g, "$1");
  return parseCommand_2(e.text);
}
function parseCommand_2(cmdString) {
  return cmdString.length >= 2 && (cmdString[0] === '"' && cmdString.at(-1) === '"' || cmdString[0] === "'" && cmdString.at(-1) === "'") ? cmdString.slice(1, -1) : cmdString;
}
var JLi = 1e4,
  declarationKeywords,
  simpleWordTypes,
  substitutionTypes,
  commandNodeTypes,
  PARSE_ABORTED;
var YPH = b(() => {
  Ct();
  VUe();
  declarationKeywords = new Set(["export", "declare", "typeset", "readonly", "local", "unset", "unsetenv"]), simpleWordTypes = new Set(["word", "string", "raw_string", "number"]), substitutionTypes = new Set(["command_substitution", "process_substitution"]), commandNodeTypes = new Set(["command", "declaration_command"]);
  PARSE_ABORTED = Symbol("parse-aborted");
});

export {lR7 as r1i,parseCommand,parseCommandRaw,findCommandNode,vTd as zbd,extractCommandArguments,GCn as Rvn,parseCommand_2 as Ybd,JLi as n1i,declarationKeywords as Vbd,simpleWordTypes as Kbd,substitutionTypes as a6r,commandNodeTypes as l6r,PARSE_ABORTED,YPH as gRe};
