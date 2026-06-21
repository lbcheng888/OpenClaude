// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {Wn,fs} from "../api/0459_getOauthConfig.ts";
import {vK,IHt,lE,gf,xu,tA} from "../config/2201_tA.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qi,ns,$u} from "../mcp/2194_mcpServerName.ts";
import {_tt,see} from "../../vendor/m2674.ts";
import {getMemoryToggledOff,lt} from "../session/0131_sent.ts";
import {PA,Lv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Ws,ef} from "../../vendor/m2248.ts";
import {$c,Vw} from "../../vendor/m2695.ts";
import {yu,VR} from "../../vendor/m2249.ts";
import {checkReadNetworkPathSafety,nA} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {Js,Su,oA} from "../config/2697_oA.ts";
import {Ua,ty} from "../../vendor/m2245.ts";
import {zc,ex} from "../../vendor/m2582.ts";
import {_debugModuleInit,qfe,GO} from "../telemetry/2241_GO.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {createCacheSafeParams,runForkedAgent,gP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {x4t,R4t,rho} from "../../vendor/m4378.ts";
import {Jl,ch} from "../../vendor/m2727.ts";
import {IQa,DQa} from "../agent/4381_DQa.ts";
import {Ln,e6n,lo} from "./5190_userPromptCount.ts";
import {tpt,Xqn} from "../telemetry/4380_Xqn.ts";
import {Nw} from "../../vendor/m2238.ts";
import {Ie,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {dd,Dd} from "../../vendor/m687.ts";
var Zqn = {};
isFullscreenWithTTY(Zqn, {
  isAllowedAutoMemWritePath: () => isAllowedAutoMemWritePath,
  initExtractMemories: () => initExtractMemories,
  executeExtractMemories: () => executeExtractMemories,
  drainPendingExtraction: () => drainPendingExtraction,
  createAutoMemCanUseTool: () => createAutoMemCanUseTool
});
function oho(e: any): any {
  return e.type === "user" || e.type === "assistant";
}
function T$p(e: any, t: any): any {
  if (t === null || t === void 0) return Wn(e, oho);
  let n = !1,
    r = 0;
  for (let o of e) {
    if (!n) {
      if (o.uuid === t) n = !0;
      continue;
    }
    if (oho(o)) r++;
  }
  if (!n) return Wn(e, oho);
  return r;
}
function S$p(e: any, t: any): any {
  let n = t === void 0;
  for (let r of e) {
    if (!n) {
      if (r.uuid === t) n = !0;
      continue;
    }
    if (r.type !== "assistant") continue;
    let o = r.message.content;
    if (!Array.isArray(o)) continue;
    for (let s of o) {
      let i = NQa(s);
      if (i !== void 0 && vK(i)) return !0;
    }
  }
  return !1;
}
function OQa(e: any): any {
  return Wn(e.split(/\s+/), Boolean);
}
function LQa(e: any): any {
  if (e.type !== "user" || e.isMeta) return !1;
  let t = e.message.content;
  if (typeof t === "string") return OQa(t) >= PQa;
  if (!Array.isArray(t)) return !1;
  return t.some((n: any) => n.type === "text" && OQa(n.text) >= PQa);
}
function b$p(e: any, t: any): any {
  let n = t === void 0;
  for (let r of e) {
    if (!n) {
      if (r.uuid === t) n = !0;
      continue;
    }
    if (LQa(r)) return !0;
  }
  if (!n) return e.some(LQa);
  return !1;
}
function k4t(e: any, t: any): any {
  return logForDebugging(`[autoMem] denied ${e.name}: ${t}`), logEvent("tengu_auto_mem_tool_denied", {
    tool_name: Qi(e.name)
  }), {
    behavior: "deny",
    message: t,
    decisionReason: {
      type: "other",
      reason: t
    }
  };
}
function E$p(e: any): any {
  let t = e.trim().match(/"[^"]*"|'[^']*'|\S+/g) ?? [];
  if (t.length < 2) return !1;
  if (!/^(remove-item|ri|del|erase|rd|rm|rmdir)$/i.test(t[0])) return !1;
  let n = 0;
  for (let r = 1; r < t.length; r++) {
    let o = t[r];
    if (/^-(?:Literal)?Path$/i.test(o)) continue;
    if (o.startsWith("-")) return !1;
    let s = o.startsWith('"') && o.endsWith('"') || o.startsWith("'") && o.endsWith("'") ? o.slice(1, -1) : o;
    if (/[*?[\]$`(){}|;&<>"',]/.test(s)) return !1;
    if (!s.endsWith(".md")) return !1;
    if (!vK(s)) return !1;
    n++;
  }
  return n > 0;
}
async function C$p(e: any): Promise<any> {
  let t = await _tt(e);
  if (t.kind !== "simple") return !1;
  if (t.commands.length !== 1) return !1;
  let n = t.commands[0];
  if (!n) return !1;
  if (n.argv[0] !== "rm") return !1;
  if (n.redirects.length > 0) return !1;
  if (n.envVars.length > 0) return !1;
  let r = 0,
    o = !1;
  for (let s = 1; s < n.argv.length; s++) {
    let i = n.argv[s];
    if (i === void 0) continue;
    if (!o) {
      if (i === "--") {
        o = !0;
        continue;
      }
      if (i.startsWith("-")) {
        if (i === "--recursive" || /^-[a-zA-Z]*[rR]/.test(i)) return !1;
        continue;
      }
    }
    if (/[*?[]/.test(i)) return !1;
    if (!i.startsWith("/") || !i.endsWith(".md")) return !1;
    if (!vK(i)) return !1;
    r++;
  }
  return r > 0;
}
function isAllowedAutoMemWritePath(e: any): any {
  return e.endsWith(".md") && IHt(e);
}
function createAutoMemCanUseTool(e: any): any {
  return async (t: any, n: any, r: any) => {
    if (getMemoryToggledOff()) return k4t(t, "Memory is toggled off. Run /toggle-memory to re-enable automemory.");
    if (t.name === PA) return {
      behavior: "allow",
      updatedInput: n
    };
    if (t.name === Ws || t.name === $c || t.name === yu) {
      let s = checkReadNetworkPathSafety(t, n, r.getAppState().toolPermissionContext);
      if (s) return k4t(t, s.message);
      return {
        behavior: "allow",
        updatedInput: n
      };
    }
    if (t.name === ns || t.name === Js) {
      let s = t.inputSchema.safeParse(n);
      if (s.success) {
        if (t.isReadOnly(s.data)) return {
          behavior: "allow",
          updatedInput: n
        };
        let l = s.data.command;
        if (typeof l === "string") {
          if (t.name === ns ? await C$p(l) : E$p(l)) return {
            behavior: "allow",
            updatedInput: n
          };
        }
      }
      let i = t.name === ns;
      return k4t(t, `Only read-only shell commands and ${i ? "rm" : "Remove-Item"} with all paths inside ${e} are permitted in this context (${i ? "ls, find, grep, cat, stat, wc, head, tail, and similar" : "Get-ChildItem, Get-Content, Select-Object -First/-Last, and similar"})`);
    }
    if ((t.name === Ua || t.name === zc) && "file_path" in n) {
      if (t.name === Ua && lE()) return k4t(t, `${Ua} is not permitted in tiny memory mode \u2014 memories are immutable, so delete via ${Su() ? "Bash rm" : "PowerShell Remove-Item"} and rewrite via ${zc}.`);
      let s = n.file_path;
      if (typeof s === "string" && isAllowedAutoMemWritePath(s)) return {
        behavior: "allow",
        updatedInput: n
      };
    }
    let o = Su() ? ns : Js;
    return k4t(t, `only ${Ws}, ${$c}, ${yu}, read-only ${o}, and ${Ua}/${zc} within ${e} are allowed`);
  };
}
function NQa(e: any): any {
  if (e.type !== "tool_use" || e.name !== Ua && e.name !== zc) return;
  let t = e.input;
  if (typeof t === "object" && t !== null && "file_path" in t) {
    let n = t.file_path;
    return typeof n === "string" ? n : void 0;
  }
  return;
}
function v$p(e: any): any {
  let t: any[] = [];
  for (let n of e) {
    if (n.type !== "assistant") continue;
    let r = n.message.content;
    if (!Array.isArray(r)) continue;
    for (let o of r) {
      let s = NQa(o);
      if (s !== void 0 && isAllowedAutoMemWritePath(s)) t.push(s);
    }
  }
  return fs(t);
}
function initExtractMemories(): any {
  let e = new Set(),
    t: any,
    n = !1,
    r = !1,
    o = 0,
    s: any;
  async function i({
    context: l,
    appendSystemMessage: c,
    isTrailingRun: u
  }: any): Promise<any> {
    let {
        messages: d
      } = l,
      p = gf(),
      m = T$p(d, t);
    if (S$p(d, t)) {
      logForDebugging("[extractMemories] skipping \u2014 conversation already wrote to memory files");
      let y = d.at(-1);
      if (y?.uuid) t = y.uuid;
      logEvent("tengu_extract_memories_skipped_direct_write", {
        message_count: m
      });
      return;
    }
    if (!b$p(d, t)) {
      logForDebugging("[extractMemories] skipping \u2014 no user prose since last extraction");
      let y = d.at(-1);
      if (y?.uuid) t = y.uuid;
      logEvent("tengu_extract_memories_skipped_no_prose", {
        message_count: m
      });
      return;
    }
    let f = _debugModuleInit(),
      A = getFeatureValue_CACHED_MAY_BE_STALE("tengu_bramble_lintel", null) ?? 1,
      h = createAutoMemCanUseTool(p),
      g = createCacheSafeParams(l);
    if (!u) {
      if (o++, o < A) return;
    }
    o = 0, r = !0;
    let _ = Date.now();
    try {
      logForDebugging(`[extractMemories] starting \u2014 ${m} new messages, memoryDir=${p}`);
      let y = x4t(await R4t(p, Jl().signal)),
        T = IQa(m, y, f),
        S = await runForkedAgent({
          promptMessages: [Ln({
            content: T
          })],
          cacheSafeParams: g,
          canUseTool: h,
          querySource: "extract_memories",
          forkLabel: "extract_memories",
          skipTranscript: !0,
          maxTurns: 5,
          skipCacheWrite: tpt()
        }),
        v = d.at(-1);
      if (v?.uuid) t = v.uuid;
      let R = v$p(S.messages),
        k = Wn(S.messages, (L: any) => L.type === "assistant"),
        x = S.totalUsage.input_tokens + S.totalUsage.cache_creation_input_tokens + S.totalUsage.cache_read_input_tokens,
        H = x > 0 ? (S.totalUsage.cache_read_input_tokens / x * 100).toFixed(1) : "0.0";
      if (logForDebugging(`[extractMemories] finished \u2014 ${R.length} files written, cache: read=${S.totalUsage.cache_read_input_tokens} create=${S.totalUsage.cache_creation_input_tokens} input=${S.totalUsage.input_tokens} (${H}% hit)`), R.length > 0) logForDebugging(`[extractMemories] memories saved: ${R.join(", ")}`);else logForDebugging("[extractMemories] no memories saved this run");
      let I = R.filter((L: any) => MQa.basename(L) !== Nw),
        P = Wn(I, qfe);
      if (logEvent("tengu_extract_memories_extraction", {
        input_tokens: S.totalUsage.input_tokens,
        output_tokens: S.totalUsage.output_tokens,
        cache_read_input_tokens: S.totalUsage.cache_read_input_tokens,
        cache_creation_input_tokens: S.totalUsage.cache_creation_input_tokens,
        message_count: m,
        turn_count: k,
        files_written: R.length,
        memories_saved: I.length,
        team_memories_saved: P,
        duration_ms: Date.now() - _
      }), logForDebugging(`[extractMemories] writtenPaths=${R.length} memoryPaths=${I.length} appendSystemMessage defined=${c != null}`), I.length > 0) {
        let L = e6n(I);
        L.teamCount = P, c?.(L);
      }
      Ie("memory_extract");
    } catch (y) {
      logForDebugging(`[extractMemories] error: ${y}`), logEvent("tengu_extract_memories_error", {
        duration_ms: Date.now() - _
      }), Oe("memory_extract", "agent_error");
    } finally {
      r = !1;
      let y = s;
      if (s = void 0, y && A <= 1) logForDebugging("[extractMemories] running trailing extraction for stashed context"), await i({
        context: y.context,
        appendSystemMessage: y.appendSystemMessage,
        isTrailingRun: !0
      });
    }
  }
  async function a(l: any, c: any): Promise<any> {
    if (l.toolUseContext.agentId) return;
    if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_passport_quail", !1)) return;
    if (!xu()) return;
    if (dd() !== null) return;
    if (r) {
      logForDebugging("[extractMemories] extraction in progress \u2014 stashing for trailing run"), logEvent("tengu_extract_memories_coalesced", {}), s = {
        context: l,
        appendSystemMessage: c
      };
      return;
    }
    await i({
      context: l,
      appendSystemMessage: c
    });
  }
  BQa = async (l: any, c: any) => {
    let u = a(l, c);
    e.add(u);
    try {
      await u;
    } finally {
      e.delete(u);
    }
  }, FQa = async (l: any = 60000) => {
    if (e.size === 0) return;
    await Promise.race([Promise.all(e).catch(() => {}), new Promise((c: any) => setTimeout(c, l).unref())]);
  };
}
async function executeExtractMemories(e: any, t: any): Promise<any> {
  await BQa?.(e, t);
}
async function drainPendingExtraction(e: any): Promise<any> {
  await FQa(e);
}
var MQa: any,
  PQa = 3,
  BQa: any = null,
  FQa: any = async () => {};
var I4t = b(() => {
  lt();
  rho();
  tA();
  GO();
  Dd();
  ty();
  ef();
  ex();
  VR();
  Vw();
  Lv();
  ch();
  see();
  qe();
  gP();
  lo();
  nA();
  oA();
  ln();
  zn();
  Ct();
  $u();
  Xqn();
  DQa();
  MQa = require("path");
});
export {Zqn,oho,T$p,S$p,OQa,LQa,b$p,k4t,E$p,C$p,isAllowedAutoMemWritePath,createAutoMemCanUseTool,NQa,v$p,initExtractMemories,executeExtractMemories,drainPendingExtraction,MQa,PQa,BQa,FQa,I4t};
