// @ts-nocheck
import {k6e,Nfo,NYa,MYa,Ndt} from "../../vendor/m4337.ts";
import {zc,ex} from "../../vendor/m2582.ts";
import {Ua,ty} from "../../vendor/m2245.ts";
import {PA,Lv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {yce,hct} from "../../vendor/m3961.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {TOOL_SEARCH_TOOL_NAME} from "../../vendor/m2692.ts";
import {Cl,Ri} from "../tools/2227_userFacingName.ts";
import {o_e,u$t} from "../../vendor/m4336.ts";
import {eN,oA} from "../config/2697_oA.ts";
import {xK} from "../telemetry/2241_GO.ts";
import {Pw,rZ} from "../../vendor/m2207.ts";
import {ist,ast} from "../telemetry/3313_prNumber.ts";
import {FYa,BYa,UYa,$Ya} from "../../vendor/m4338.ts";
import {GRn} from "../../vendor/m2785.ts";
import {Id,mc} from "../config/0645_maxBytes.ts";
import {lE,tA} from "../config/2201_tA.ts";
import {Q$,_q} from "../telemetry/2781_consumer.ts";
import {fs} from "../api/0459_getOauthConfig.ts";
import {Cs,p5,Ph} from "../../vendor/m2224.ts";
import {WFn,GFn,Gso} from "../../vendor/m3906.ts";
import {b,ro} from "../../runtime.ts";
import {Y5} from "../config/2707_isDeferredTool.ts";
import {XAe,FPt} from "../artifact/2701_uuidSlugFromUrl.ts";
function BBp(e: any): any {
  let t = e;
  return t?.file_path ?? t?.path;
}
function FBp(e: any): any {
  let t = e;
  if (!t) return !1;
  if (t.path) {
    if (k6e(t.path) || Nfo(t.path)) return !0;
  }
  if (t.glob && NYa(t.glob)) return !0;
  if (t.command && MYa(t.command)) return !0;
  return !1;
}
function UBp(e: any, t: any): any {
  if (e !== zc && e !== Ua) return !1;
  let n = BBp(t);
  return n !== void 0 && k6e(n);
}
function Bfo(e: any): any {
  let t = "$ " + e.split(`
`).map((n: any) => n.replace(/\s+/g, " ").trim()).filter((n: any) => n !== "").join(`
`);
  return t.length > qYa ? t.slice(0, qYa - 1) + "…" : t;
}
function H6e(e: any, t: any, n: any): any {
  if (e === PA) {
    let l = yce();
    return {
      isCollapsible: !l,
      isSearch: !1,
      isRead: !1,
      isList: !1,
      isREPL: !l,
      isMemoryWrite: !1,
      isAbsorbedSilently: !l
    };
  }
  if (UBp(e, t)) return {
    isCollapsible: !0,
    isSearch: !1,
    isRead: !1,
    isList: !1,
    isREPL: !1,
    isMemoryWrite: !0,
    isAbsorbedSilently: !1
  };
  if (Ms() && e === TOOL_SEARCH_TOOL_NAME) return {
    isCollapsible: !0,
    isSearch: !1,
    isRead: !1,
    isList: !1,
    isREPL: !1,
    isMemoryWrite: !1,
    isAbsorbedSilently: !0
  };
  let r = Cl(n, e) ?? Cl(o_e(), e);
  if (r?.isMcp) return {
    isCollapsible: !0,
    isSearch: !1,
    isRead: !1,
    isList: !1,
    isREPL: !1,
    isMemoryWrite: !1,
    isAbsorbedSilently: !1,
    mcpServerName: r.mcpInfo?.serverName
  };
  if (!r?.isSearchOrReadCommand) return {
    isCollapsible: !1,
    isSearch: !1,
    isRead: !1,
    isList: !1,
    isREPL: !1,
    isMemoryWrite: !1,
    isAbsorbedSilently: !1
  };
  let o = r.isSearchOrReadCommand(t ?? {}),
    s = o.isList ?? !1,
    i = o.isSearch || o.isRead || s,
    a = eN.includes(e);
  return {
    isCollapsible: i || (Ms() ? a : !1),
    isSearch: o.isSearch,
    isRead: o.isRead,
    isList: s,
    isREPL: !1,
    isMemoryWrite: !1,
    isAbsorbedSilently: !1,
    isBash: Ms() ? !i && a : void 0
  };
}
function _$t(e: any, t: any): any {
  if (e?.type === "tool_use" && e.name) {
    let n = H6e(e.name, e.input, t);
    if (n.isCollapsible || n.isREPL) return {
      isSearch: n.isSearch,
      isRead: n.isRead,
      isList: n.isList,
      isREPL: n.isREPL,
      isMemoryWrite: n.isMemoryWrite,
      isAbsorbedSilently: n.isAbsorbedSilently,
      mcpServerName: n.mcpServerName,
      isBash: n.isBash
    };
  }
  return null;
}
function $Bp(e: any): any {
  if (e.type === "assistant") {
    let t = e.message.content[0];
    return t?.type === "tool_use" ? t.name : null;
  }
  if (e.type === "grouped_tool_use") return e.toolName;
  return null;
}
function qBp(e: any, t: any): any {
  let n = jYa.get(e);
  if (n?.tools === t) return n.info;
  let r = $Bp(e),
    o = r === null ? void 0 : Cl(t, r) ?? Cl(o_e(), r);
  if (n && o === n.resolvedTool) return n.tools = t, n.info;
  let s = jBp(e, t);
  return jYa.set(e, {
    tools: t,
    resolvedTool: o,
    info: s
  }), s;
}
function jBp(e: any, t: any): any {
  let n = null;
  if (e.type === "assistant") {
    let s = e.message.content[0],
      i = _$t(s, t);
    if (i && s?.type === "tool_use") n = {
      name: s.name,
      input: s.input,
      ...i
    };
  } else if (e.type === "grouped_tool_use") {
    let s = e.messages[0]?.message.content[0],
      i = _$t(s ? {
        type: "tool_use",
        name: e.toolName,
        input: s.input
      } : void 0, t);
    if (i && s?.type === "tool_use") n = {
      name: e.toolName,
      input: s.input,
      ...i
    };
  }
  if (!n) return null;
  let r = !n.isMemoryWrite && !n.isAbsorbedSilently && !n.mcpServerName && !(Ms() && n.isBash) && !n.isList && !n.isSearch,
    o = null;
  if (r) o = JBp(e).map((s: any) => ({
    path: s,
    isTeamMem: xK(s),
    isAutoManagedMemory: k6e(s)
  }));
  return {
    ...n,
    toolUseIds: JYa(e),
    toolUseCount: YBp(e),
    readPaths: o
  };
}
function WYa(e: any): any {
  if (e.type === "assistant") {
    let t = e.message.content[0];
    if (t?.type === "text" && t.text.trim().length > 0 && !zYa(t.text)) return !0;
  }
  return !1;
}
function zYa(e: any): any {
  return e.trim() === Pw || e === rZ;
}
function Ffo(e: any): any {
  if (e.type !== "assistant") return !1;
  let t = e.message.content[0];
  return t?.type === "text" && zYa(t.text);
}
function WBp(e: any): any {
  return e.type === "system" && e.subtype === "stop_hook_summary" && e.hookLabel === "PreToolUse";
}
function GBp(e: any): any {
  return e.length > 0 && e.every((t: any) => t.path.startsWith("<synthesis:"));
}
function YYa(e: any): any {
  if (e.type === "assistant") {
    let t = e.message.content[0];
    if (t?.type === "thinking" || t?.type === "redacted_thinking") return !0;
  }
  if (e.type === "attachment") return !0;
  if (e.type === "system") return !0;
  return !1;
}
function VBp(e: any): any {
  if (e.type !== "assistant") return;
  let t = e.message.content[0];
  if (t?.type !== "thinking" || !t.thinking?.trim()) return;
  return {
    message: e,
    text: t.thinking
  };
}
function KBp(e: any): any {
  if (e.type === "assistant") return e.message.content[0]?.type === "tool_use";
  if (e.type === "grouped_tool_use") return e.messages[0]?.message.content[0]?.type === "tool_use";
  return !1;
}
function zBp(e: any, t: any): any {
  if (e.type === "user") {
    let n = e.message.content.filter((r: any) => r.type === "tool_result");
    return n.length > 0 && n.every((r: any) => t.has(r.tool_use_id));
  }
  return !1;
}
function JYa(e: any): any {
  if (e.type === "assistant") {
    let t = e.message.content[0];
    if (t?.type === "tool_use") return [t.id];
  }
  if (e.type === "grouped_tool_use") return e.messages.map((t: any) => {
    let n = t.message.content[0];
    return n.type === "tool_use" ? n.id : "";
  }).filter(Boolean);
  return [];
}
function Rct(e: any): any {
  let t: any[] = [];
  for (let n of e.messages) t.push(...JYa(n));
  return t;
}
function $fo(e: any, t: any): any {
  return Rct(e).some((n: any) => t.has(n));
}
function XYa(e: any): any {
  let t = e.displayMessage;
  if (t.type === "grouped_tool_use") return t.displayMessage;
  return t;
}
function YBp(e: any): any {
  if (e.type === "grouped_tool_use") return e.messages.length;
  return 1;
}
function JBp(e: any): any {
  let t: any[] = [];
  if (e.type === "assistant") {
    let n = e.message.content[0];
    if (n?.type === "tool_use") {
      let r = n.input;
      if (r?.file_path) t.push(r.file_path);
    }
  } else if (e.type === "grouped_tool_use") for (let n of e.messages) {
    let r = n.message.content[0];
    if (r?.type === "tool_use") {
      let o = r.input;
      if (o?.file_path) t.push(o.file_path);
    }
  }
  return t;
}
function XBp(e: any, t: any): any {
  if (e.type !== "user") return;
  let n = e.toolUseResult;
  if (!n?.stdout && !n?.stderr) return;
  let r = (n.stdout ?? "") + `
` + (n.stderr ?? "");
  for (let o of e.message.content) {
    if (o.type !== "tool_result") continue;
    let s = t.bashCommands?.get(o.tool_use_id);
    if (!s) continue;
    let {
      commit: i,
      push: a,
      branch: l,
      pr: c
    } = ist(s, r);
    if (i) t.commits?.push(i);
    if (a) t.pushes?.push(a);
    if (l) t.branches?.push(l);
    if (c) t.prs?.push(c);
    if (i || a || l || c) t.gitOpBashCount = (t.gitOpBashCount ?? 0) + 1;
  }
}
function GYa(): any {
  let e: any = {
    messages: [],
    searchCount: 0,
    readFilePaths: new Set(),
    readOperationCount: 0,
    listCount: 0,
    toolUseIds: new Set(),
    memorySearchCount: 0,
    memoryReadFilePaths: new Set(),
    memoryWriteCount: 0,
    nonMemSearchArgs: [],
    latestDisplayHint: void 0,
    thoughtForMs: 0,
    latestThinkingSummary: void 0,
    hookTotalMs: 0,
    hookCount: 0,
    hookInfos: []
  };
  if (e.teamMemorySearchCount = 0, e.teamMemoryReadFilePaths = new Set(), e.teamMemoryWriteCount = 0, e.mcpCallCount = 0, e.mcpServerNames = new Set(), Ms()) e.bashCount = 0, e.bashCommands = new Map(), e.commits = [], e.pushes = [], e.branches = [], e.prs = [], e.gitOpBashCount = 0;
  return e;
}
function QBp(e: any): any {
  let t = e.messages[0],
    n = e.readFilePaths.size > 0 ? e.readFilePaths.size : e.readOperationCount,
    r = e.memoryReadFilePaths.size,
    o = r + (e.relevantMemories?.length ?? 0),
    s = e.teamMemoryReadFilePaths,
    i = [...e.readFilePaths].filter((d: any) => !e.memoryReadFilePaths.has(d) && !(s?.has(d) ?? !1)),
    a = e.teamMemorySearchCount ?? 0,
    l = e.teamMemoryReadFilePaths?.size ?? 0,
    c = e.teamMemoryWriteCount ?? 0,
    u: any = {
      type: "collapsed_read_search",
      searchCount: Math.max(0, e.searchCount - e.memorySearchCount - a),
      readCount: Math.max(0, n - r - l),
      listCount: e.listCount,
      replCount: 0,
      memorySearchCount: e.memorySearchCount,
      memoryReadCount: o,
      memoryWriteCount: e.memoryWriteCount,
      readFilePaths: i,
      searchArgs: e.nonMemSearchArgs,
      latestDisplayHint: e.latestDisplayHint,
      messages: e.messages,
      displayMessage: t,
      uuid: `collapsed-${t.uuid}`,
      timestamp: t.timestamp
    };
  if (u.teamMemorySearchCount = a, u.teamMemoryReadCount = l, u.teamMemoryWriteCount = c, (e.mcpCallCount ?? 0) > 0) u.mcpCallCount = e.mcpCallCount, u.mcpServerNames = [...(e.mcpServerNames ?? [])];
  if (Ms()) {
    if ((e.bashCount ?? 0) > 0) u.bashCount = e.bashCount, u.gitOpBashCount = e.gitOpBashCount;
    if ((e.commits?.length ?? 0) > 0) u.commits = e.commits;
    if ((e.pushes?.length ?? 0) > 0) u.pushes = e.pushes;
    if ((e.branches?.length ?? 0) > 0) u.branches = e.branches;
    if ((e.prs?.length ?? 0) > 0) u.prs = e.prs;
  }
  if (e.hookCount > 0) u.hookTotalMs = e.hookTotalMs, u.hookCount = e.hookCount, u.hookInfos = e.hookInfos;
  if (e.relevantMemories && e.relevantMemories.length > 0) u.relevantMemories = e.relevantMemories;
  if (e.thoughtForMs > 0) u.thoughtForMs = e.thoughtForMs;
  if (e.latestThinkingSummary !== void 0) u.latestThinkingSummary = e.latestThinkingSummary;
  return u;
}
function QYa(e: any, t: any): any {
  let n = yce(),
    r: any[] = [],
    o = GYa(),
    s: any[] = [],
    i: any;
  function a() {
    if (o.messages.length === 0) return;
    r.push(QBp(o));
    let l = new Set();
    for (let c of s) {
      if (c.type === "attachment" && c.attachment.type === "hook_permission_decision") {
        let u = `${c.attachment.decision}:${c.attachment.hookEvent}`;
        if (l.has(u)) continue;
        l.add(u);
      }
      r.push(c);
    }
    s = [], o = GYa();
  }
  for (let l of e) {
    if (n && (l.type === "assistant" || l.type === "user") && l.isVirtual === !0 && l.message.content[0]?.type !== "thinking") continue;
    let c = KBp(l) ? qBp(l, t) : null,
      u = c === null ? VBp(l) : void 0;
    if (c) {
      o.latestThinkingSummary = void 0;
      let d = c.toolUseCount;
      if (c.isMemoryWrite) {
        if (FYa(c.name, c.input)) o.teamMemoryWriteCount = (o.teamMemoryWriteCount ?? 0) + d;else o.memoryWriteCount += d;
      } else if (c.isAbsorbedSilently) ;else if (c.mcpServerName) {
        o.mcpCallCount = (o.mcpCallCount ?? 0) + d, o.mcpServerNames?.add(c.mcpServerName);
        let p = c.input;
        if (p?.query) o.latestDisplayHint = `"${p.query}"`;
      } else if (Ms() && c.isBash) {
        o.bashCount = (o.bashCount ?? 0) + d;
        let p = c.input;
        if (p?.command) {
          o.latestDisplayHint = GRn(p.command) ?? Bfo(p.command);
          for (let m of c.toolUseIds) o.bashCommands?.set(m, p.command);
        }
      } else if (c.isList) {
        o.listCount += d;
        let p = c.input;
        if (p?.command) o.latestDisplayHint = Bfo(p.command);
      } else if (c.isSearch) {
        if (o.searchCount += d, BYa(c.input)) o.teamMemorySearchCount = (o.teamMemorySearchCount ?? 0) + d;else if (FBp(c.input)) o.memorySearchCount += d;else {
          let p = c.input;
          if (p?.pattern) o.nonMemSearchArgs.push(p.pattern), o.latestDisplayHint = `"${p.pattern}"`;
        }
      } else {
        let p = c.readPaths ?? [];
        for (let m of p) if (o.readFilePaths.add(m.path), m.isTeamMem) o.teamMemoryReadFilePaths?.add(m.path);else if (m.isAutoManagedMemory) o.memoryReadFilePaths.add(m.path);else o.latestDisplayHint = Id(m.path);
        if (p.length === 0) {
          o.readOperationCount += d;
          let m = c.input;
          if (m?.command) o.latestDisplayHint = Bfo(m.command);
        }
      }
      for (let p of c.toolUseIds) o.toolUseIds.add(p);
      o.messages.push(l);
    } else if (zBp(l, o.toolUseIds)) {
      if (o.messages.push(l), Ms() && o.bashCommands?.size) XBp(l, o);
    } else if (o.messages.length > 0 && WBp(l)) o.hookCount += l.hookCount, o.hookTotalMs += l.totalDurationMs ?? l.hookInfos.reduce((d: any, p: any) => d + (p.durationMs ?? 0), 0), o.hookInfos.push(...l.hookInfos);else if (o.messages.length > 0 && l.type === "attachment" && l.attachment.type === "relevant_memories" && !(lE() && GBp(l.attachment.memories))) o.relevantMemories ??= [], o.relevantMemories.push(...l.attachment.memories);else if (ZYa(l)) a(), r.push(l);else if (u !== void 0) {
      if (o.latestThinkingSummary = u.text.trim().replace(/\s+/g, " "), i !== void 0) {
        let d = Date.parse(l.timestamp) - Date.parse(i);
        if (Number.isFinite(d) && d > 0) o.thoughtForMs += Math.min(d, qao);
      }
      o.messages.push(u.message);
    } else if (YYa(l) || Ffo(l)) {
      if (o.messages.length > 0) s.push(l);else r.push(l);
    } else a(), r.push(l);
    if ("timestamp" in l && typeof l.timestamp === "string") i = l.timestamp;
  }
  return a(), r;
}
function ZYa(e: any): any {
  if (e.type !== "attachment") return !1;
  let t = e.attachment;
  if (t.type !== "queued_command" || t.commandMode !== "prompt") return !1;
  let n = t.origin;
  if (!t.isMeta && Q$(n)) return !0;
  if (n?.kind === "channel") return !0;
  return n?.kind, !1;
}
function VYa(e: any): any {
  if (e.type === "user") return e.message.content[0]?.type !== "tool_result";
  return ZYa(e);
}
function ZBp(e: any, t: any): any {
  if (e.searchCount += t.searchCount, e.readCount += t.readCount, e.listCount += t.listCount, e.replCount += t.replCount, e.memorySearchCount += t.memorySearchCount, e.memoryReadCount += t.memoryReadCount, e.memoryWriteCount += t.memoryWriteCount, t.mcpCallCount) e.mcpCallCount = (e.mcpCallCount ?? 0) + t.mcpCallCount, e.mcpServerNames = fs([...(e.mcpServerNames ?? []), ...(t.mcpServerNames ?? [])]);
  if (t.bashCount) e.bashCount = (e.bashCount ?? 0) + t.bashCount;
  if (t.gitOpBashCount) e.gitOpBashCount = (e.gitOpBashCount ?? 0) + t.gitOpBashCount;
  if (t.otherToolCount) e.otherToolCount = (e.otherToolCount ?? 0) + t.otherToolCount;
  if (t.frameCount) e.frameCount = (e.frameCount ?? 0) + t.frameCount;
  if (t.editFileCount) e.editFileCount = (e.editFileCount ?? 0) + t.editFileCount;
  if (t.linesAdded) e.linesAdded = (e.linesAdded ?? 0) + t.linesAdded;
  if (t.linesRemoved) e.linesRemoved = (e.linesRemoved ?? 0) + t.linesRemoved;
  if (t.commits?.length) e.commits = [...(e.commits ?? []), ...t.commits];
  if (t.pushes?.length) e.pushes = [...(e.pushes ?? []), ...t.pushes];
  if (t.branches?.length) e.branches = [...(e.branches ?? []), ...t.branches];
  if (t.prs?.length) e.prs = [...(e.prs ?? []), ...t.prs];
  if (t.readFilePaths?.length) e.readFilePaths = [...(e.readFilePaths ?? []), ...t.readFilePaths];
  if (t.searchArgs?.length) e.searchArgs = [...(e.searchArgs ?? []), ...t.searchArgs];
  if (t.hookCount) e.hookCount = (e.hookCount ?? 0) + t.hookCount, e.hookTotalMs = (e.hookTotalMs ?? 0) + (t.hookTotalMs ?? 0), e.hookInfos = [...(e.hookInfos ?? []), ...(t.hookInfos ?? [])];
  if (e.latestDisplayHint = t.latestDisplayHint ?? e.latestDisplayHint, t.thoughtForMs) e.thoughtForMs = (e.thoughtForMs ?? 0) + t.thoughtForMs;
  e.latestThinkingSummary = t.latestThinkingSummary ?? e.latestThinkingSummary, e.messages.push(...t.messages);
}
function eJa(e: any, t: any, n: any, r: any = !1): any {
  let o: any[] = [],
    s = 0;
  while (s < e.length) {
    let i = e[s];
    if (!VYa(i)) {
      o.push(i), s++;
      continue;
    }
    o.push(i), s++;
    let a = s;
    while (a < e.length && !VYa(e[a])) a++;
    let l = r && a === e.length;
    if (l) {
      let _ = a - 1;
      while (_ >= s && YYa(e[_])) _--;
      let y = _ >= s ? e[_] : void 0;
      if (y?.type === "assistant" && y.message.stop_reason !== null && (WYa(y) || Ffo(y))) l = !1;
    }
    let c = -1;
    if (!l) {
      for (let _ = a - 1; _ >= s; _--) if (WYa(e[_])) {
        c = _;
        break;
      }
    }
    let u = new Set(),
      d = new Set();
    for (let _ = a - 1; !l && _ >= s; _--) {
      let y = e[_];
      if (y.type !== "assistant") continue;
      let T = y.message.content[0];
      if (T?.type !== "tool_use" || d.has(T.name)) continue;
      if (d.add(T.name), Cl(t, T.name)?.briefStandalone) {
        u.add(_);
        for (let S = _ + 1; S < a; S++) {
          let v = e[S];
          if (v.type === "assistant") break;
          if (v.type !== "user") continue;
          let R = v.message.content[0];
          if (R?.type === "tool_result" && R.tool_use_id === T.id) {
            u.add(S);
            break;
          }
        }
      }
    }
    let p = null,
      m = a,
      f: any,
      A = 0;
    for (let _ = s; _ < a; _++) {
      if (_ === c || u.has(_)) continue;
      let y = e[_];
      if (y.type === "system") {
        if (y.subtype === "informational" && y.level === "info") A++;else if (y.subtype === "stop_hook_summary" && y.hookLabel !== void 0) ;else u.add(_);
        continue;
      }
      let T = null;
      if (y.type === "collapsed_read_search") T = y;else if (y.type === "grouped_tool_use") T = KYa(y, y.toolName, y.messages.map((S: any) => S.message.content[0]?.input), t);else if (y.type === "assistant") {
        let S = y.message.content[0];
        if (S?.type === "tool_use") T = KYa(y, S.name, [S.input], t);else if (Ffo(y)) A++;else if (l && S?.type === "text" && S.text.trim().length > 0) f = S.text;else if (S?.type === "thinking" || S?.type === "redacted_thinking") A++;
      } else if (y.type === "user") {
        if (p) {
          p.messages.push(y);
          let S = y.toolUseResult,
            v = S?.toolStats ?? (S?.status === "async_launched" && S.agentId ? n?.(S.agentId) : void 0);
          if (v) {
            if (p.readCount += v.readCount, p.searchCount += v.searchCount, v.bashCount) p.bashCount = (p.bashCount ?? 0) + v.bashCount;
            if (v.editFileCount) p.editFileCount = (p.editFileCount ?? 0) + v.editFileCount;
            if (v.linesAdded) p.linesAdded = (p.linesAdded ?? 0) + v.linesAdded;
            if (v.linesRemoved) p.linesRemoved = (p.linesRemoved ?? 0) + v.linesRemoved;
            if (v.otherToolCount) p.otherToolCount = (p.otherToolCount ?? 0) + v.otherToolCount;
            if (v.frameCount) p.frameCount = (p.frameCount ?? 0) + v.frameCount;
          }
        }
      }
      if (y.type === "attachment") A++;
      if (T) if (p) ZBp(p, T);else p = {
        ...T,
        messages: [...T.messages]
      }, m = _;
    }
    if (c !== -1) u.add(c);
    let h = [...u].map((_: any) => [_, e[_]]);
    if (p) {
      if (p.uuid = `brief-${p.uuid}`, f) p.pendingText = f;
      p.hookCount = void 0, p.hookTotalMs = void 0, p.hookInfos = void 0, h.push([m, p]);
    }
    h.sort((_: any, y: any) => _[0] - y[0]);
    let g = l ? 0 : a - s - h.length - A;
    for (let [, _] of h) o.push(g > 0 && _.type === "system" && _.subtype === "turn_duration" ? {
      ..._,
      briefHiddenCount: g
    } : _);
    s = a;
  }
  return o;
}
function KYa(e: any, t: any, n: any, r: any): any {
  let o = Cl(r, t),
    s = n.length,
    i: any = {
      type: "collapsed_read_search",
      searchCount: 0,
      readCount: 0,
      listCount: 0,
      replCount: 0,
      memorySearchCount: 0,
      memoryReadCount: 0,
      memoryWriteCount: 0,
      messages: [e],
      displayMessage: e,
      uuid: e.uuid,
      timestamp: e.timestamp
    };
  if (t === Cs || t === p5) return i;
  if (o?.isMcp) {
    if (i.mcpCallCount = s, o.mcpInfo?.serverName) i.mcpServerNames = [o.mcpInfo.serverName];
  } else if (WFn.has(t)) {
    i.editFileCount = s;
    let a = 0,
      l = 0;
    for (let c of n) {
      let u = GFn(t, c);
      a += u.added, l += u.removed;
    }
    if (a > 0) i.linesAdded = a;
    if (l > 0) i.linesRemoved = l;
  } else if (t === NBp) i.frameCount = s;else i.otherToolCount = s;
  return i;
}
function u2n(e: any, t: any, n: any, r: any = 0, o: any, s: any = 0): any {
  let i: any[] = [];
  if (o) {
    let {
      memorySearchCount: l,
      memoryReadCount: c,
      memoryWriteCount: u
    } = o;
    if (c > 0) {
      let d = n ? i.length === 0 ? "Recalling" : "recalling" : i.length === 0 ? "Recalled" : "recalled";
      i.push(`${d} ${c} ${c === 1 ? "memory" : "memories"}`);
    }
    if (l > 0) {
      let d = n ? i.length === 0 ? "Searching" : "searching" : i.length === 0 ? "Searched" : "searched";
      i.push(`${d} memories`);
    }
    if (u > 0) {
      let d = n ? i.length === 0 ? "Writing" : "writing" : i.length === 0 ? "Wrote" : "wrote";
      i.push(`${d} ${u} ${u === 1 ? "memory" : "memories"}`);
    }
    UYa(o, n, i);
  }
  if (e > 0) {
    let l = n ? i.length === 0 ? "Searching for" : "searching for" : i.length === 0 ? "Searched for" : "searched for";
    i.push(`${l} ${e} ${e === 1 ? "pattern" : "patterns"}`);
  }
  if (t > 0) {
    let l = n ? i.length === 0 ? "Reading" : "reading" : i.length === 0 ? "Read" : "read";
    i.push(`${l} ${t} ${t === 1 ? "file" : "files"}`);
  }
  if (s > 0) {
    let l = n ? i.length === 0 ? "Listing" : "listing" : i.length === 0 ? "Listed" : "listed";
    i.push(`${l} ${s} ${s === 1 ? "directory" : "directories"}`);
  }
  if (r > 0) {
    let l = n ? "REPL'ing" : "REPL'd";
    i.push(`${l} ${r} ${r === 1 ? "time" : "times"}`);
  }
  let a = i.join(", ");
  return n ? `${a}…` : a;
}
function RBn(e: any): any {
  if (e.length === 0) return;
  let t = 0,
    n = 0;
  for (let o = e.length - 1; o >= 0; o--) {
    let s = e[o];
    if (s.isSearch) t++;else if (s.isRead) n++;else break;
  }
  if (t + n >= 2) return u2n(t, n, !0);
  for (let o = e.length - 1; o >= 0; o--) if (e[o]?.activityDescription) return e[o].activityDescription;
  return;
}
var NBp: any,
  qYa = 300,
  qao = 600000,
  jYa: any;
var LHe = b(() => {
  tA();
  Ri();
  Ph();
  ty();
  ex();
  Lv();
  u$t();
  hct();
  ast();
  Y5();
  Gso();
  mc();
  Pp();
  _q();
  Ndt();
  oA();
  $Ya();
  NBp = (XAe(), ro(FPt)).ARTIFACT_TOOL_NAME;
  jYa = new WeakMap();
});
export {BBp,FBp,UBp,Bfo,H6e,_$t,$Bp,qBp,jBp,WYa,zYa,Ffo,WBp,GBp,YYa,VBp,KBp,zBp,JYa,Rct,$fo,XYa,YBp,JBp,XBp,GYa,QBp,QYa,ZYa,VYa,ZBp,eJa,KYa,u2n,RBn,NBp,qYa,qao,jYa,LHe};
