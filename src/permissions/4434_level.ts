// @ts-nocheck
import {m9e as u$e,pal as Cel,fW as Z5} from "../api/4438_type.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as Se,mo as _o,Ct as bt} from "../../vendor/m197.ts";
import {Ie as De,vn as Rn} from "../session/0621_length.ts";
import {XWn as D6n,S8e as K6e} from "../tools/5207_properties.ts";
import {AE as hE,y$ as dq} from "../config/2734_duration_ms.ts";
import {SYSTEM_PROMPT_DYNAMIC_BOUNDARY} from "../../vendor/m723.ts";
import {JWn as I6n,ux as J0,CG as oG} from "../agent/5206_len.ts";
import {Qse as Zse,ky as Iy} from "../agent/2238_explicitlyRequested.ts";
import {filterInjectedMemoryFiles,getMemoryFiles,ZR as zw} from "../config/2729_stripHtmlComments.ts";
import {sj as Hz,qbo as Yho} from "../tools/4436_summarizeByServerPrefix.ts";
import {zz as Y5,cKr as Djr} from "../config/2719_isDeferredTool.ts";
import {rl as Cl,ri as Ri} from "../tools/2235_userFacingName.ts";
import {CE as AE} from "../tools/2710_allErrors.ts";
import {getSkillToolInfo,getLimitedSkillToolCommands,nge as SRe} from "../tools/2691_getSkillToolInfo.ts";
import {isTmuxControlMode as Pt,Po as Go} from "../../vendor/m638.ts";
import {bytesPerTokenForModel,getRuntimeMainLoopModel,Ro as Mo} from "./1458_swapShrinksContextWindow.ts";
import {getCommandName} from "../tools/4092_done.ts";
import {S6t as e4t,$q as x6} from "../tools/4352_displayName.ts";
import {getSkillToolCommands,Mm as Sf} from "../tools/5174_toSlashCommands.ts";
import {pm as $f,l1 as HF} from "../core/2694_l1.ts";
import {TeamDeleteToolName as Le,tn as Xt} from "../config/0230_encoding.ts";
import {Kk as kk,po as lo} from "../tools/5224_userPromptCount.ts";
import {ev as Yw,D4 as mq} from "../session/2737_V4i.ts";
import {T$ as J$,aee as cee,z4i as lFi,j4i as cFi,KKr as h8r} from "../config/2739_repl.ts";
import {Fq as E6,Nqe as T4e} from "../telemetry/3894_mainThreadAgentDefinition.ts";
import {Zrt as Xtt,dqi as CFi,g1 as oN} from "../core/2741_input_tokens.ts";
import {b} from "../../runtime.ts";
import {f1 as nN} from "../../vendor/m4432.ts";
async function dpt(e, t) {
  try {
    let n = await u$e(e, t);
    if (n !== null) return n;
    logForDebugging(`countTokensWithFallback: API returned null, trying haiku fallback (${t.length} tools)`);
  } catch (n) {
    logForDebugging(`countTokensWithFallback: API failed: ${Se(n)}`), De(n);
  }
  try {
    let n = await Cel(e, t);
    if (n === null) logForDebugging(`countTokensWithFallback: haiku fallback also returned null (${t.length} tools)`);
    return n;
  } catch (n) {
    return logForDebugging(`countTokensWithFallback: haiku fallback failed: ${Se(n)}`, {
      level: "error"
    }), null;
  }
}
async function D0e(e, t, n, r) {
  let o = await Promise.all(e.map(i => D6n(i, {
      getToolPermissionContext: t,
      tools: e,
      agents: n?.activeAgents ?? [],
      model: r
    }))),
    s = await dpt([], o);
  if (s === null || s === 0) {
    let i = e.map(a => a.name).join(", ");
    logForDebugging(`countToolDefinitionTokens returned ${s} for ${e.length} tools: ${i.slice(0, 100)}${i.length > 100 ? "..." : ""}`);
  }
  return s ?? 0;
}
function u3p(e) {
  let t = e.match(/^#+\s+(.+)$/m);
  if (t) return t[1].trim();
  let n = e.split(`
`).find(r => r.trim().length > 0) ?? "";
  return n.length > 40 ? n.slice(0, 40) + "\u2026" : n;
}
async function d3p(e, t) {
  let n = await hE(),
    r = t ? {} : n,
    o = [...e.filter(c => c.length > 0 && c !== SYSTEM_PROMPT_DYNAMIC_BOUNDARY).map(c => ({
      name: u3p(c),
      content: c
    })), ...Object.entries(r).filter(([, c]) => c.length > 0).map(([c, u]) => ({
      name: c,
      content: u
    }))],
    s = 0;
  if (t) {
    let c = await I6n(void 0),
      u = [...Object.values(n), ...Object.values(c)].filter(d => d.length > 0).join(`
`);
    if (u.length > 0) s = (await dpt([{
      role: "user",
      content: u
    }], [])) || 0;
  }
  if (o.length < 1) return {
    systemPromptTokens: 0,
    systemPromptSections: [],
    redirectedContextTokens: s
  };
  let i = await Promise.all(o.map(({
      content: c
    }) => dpt([{
      role: "user",
      content: c
    }], []))),
    a = o.map((c, u) => ({
      name: c.name,
      tokens: i[u] || 0
    }));
  return {
    systemPromptTokens: i.reduce((c, u) => c + (u || 0), 0),
    systemPromptSections: a,
    redirectedContextTokens: s
  };
}
async function p3p() {
  if (Zse()) return {
    memoryFileDetails: [],
    claudeMdTokens: 0
  };
  let e = filterInjectedMemoryFiles(await getMemoryFiles()),
    t = [],
    n = 0;
  if (e.length < 1) return {
    memoryFileDetails: [],
    claudeMdTokens: 0
  };
  let r = await Promise.all(e.map(async o => {
    let s = await dpt([{
      role: "user",
      content: o.content
    }], []);
    return {
      file: o,
      tokens: s || 0
    };
  }));
  for (let {
    file: o,
    tokens: s
  } of r) n += s, t.push({
    path: o.path,
    type: o.type,
    tokens: s
  });
  return {
    claudeMdTokens: n,
    memoryFileDetails: t
  };
}
async function m3p(e, t, n, r, o) {
  let s = e.filter(h => !h.isMcp);
  if (s.length < 1) return {
    builtInToolTokens: 0,
    deferredBuiltinDetails: [],
    deferredBuiltinTokens: 0,
    systemToolDetails: []
  };
  let {
      isToolSearchEnabled: i
    } = await Promise.resolve().then(() => (Hz(), Yho)),
    {
      isDeferredTool: a
    } = await Promise.resolve().then(() => (Y5(), Djr)),
    l = await i(r ?? "", e, t, n?.activeAgents ?? [], "analyzeBuiltIn"),
    c = s.filter(h => !a(h)),
    u = s.filter(h => a(h)),
    d = c.length > 0 ? await D0e(c, t, n, r) : 0,
    p = [],
    m = [],
    f = 0,
    A = 0;
  if (u.length > 0 && l) {
    let h = new Set();
    if (o) {
      let _ = new Set(u.map(y => y.name));
      for (let y of o) if (y.type === "assistant") {
        for (let T of y.message.content) if ("type" in T && T.type === "tool_use" && "name" in T && typeof T.name === "string" && _.has(T.name)) h.add(T.name);
      }
    }
    let g = await Promise.all(u.map(_ => D0e([_], t, n, r)));
    for (let [_, y] of u.entries()) {
      let T = Math.max(0, (g[_] || 0) - x6n),
        S = h.has(y.name);
      if (m.push({
        name: y.name,
        tokens: T,
        isLoaded: S
      }), A += T, S) f += T;
    }
  } else if (u.length > 0) {
    let h = await D0e(u, t, n, r);
    return {
      builtInToolTokens: d + h,
      deferredBuiltinDetails: [],
      deferredBuiltinTokens: 0,
      systemToolDetails: p
    };
  }
  return {
    builtInToolTokens: d + f,
    deferredBuiltinDetails: m,
    deferredBuiltinTokens: A - f,
    systemToolDetails: p
  };
}
function Eel(e) {
  return Cl(e, AE);
}
async function f3p(e, t, n) {
  let r = await getSkillToolInfo(Pt()),
    o = Eel(e);
  if (!o) return {
    slashCommandTokens: 0,
    commandInfo: {
      totalCommands: 0,
      includedCommands: 0
    }
  };
  return {
    slashCommandTokens: await D0e([o], t, n),
    commandInfo: {
      totalCommands: r.totalCommands,
      includedCommands: r.includedCommands
    }
  };
}
async function A3p(e, t, n, r) {
  try {
    let o = await getLimitedSkillToolCommands(Pt()),
      s = Eel(e);
    if (!s) return {
      skillTokens: 0,
      skillInfo: {
        totalSkills: 0,
        includedSkills: 0,
        skillFrontmatter: []
      }
    };
    let i = await D0e([s], t, n),
      a = bytesPerTokenForModel(r),
      l = o.map(u => {
        let d = u.type === "prompt" ? u.source : "plugin",
          p = d === "builtin" || d === "bundled" ? "built-in" : d;
        return {
          name: getCommandName(u),
          source: p,
          pluginName: u.type === "prompt" ? u.pluginInfo?.pluginManifest.name : void 0,
          tokens: e4t(u, a)
        };
      }),
      c = (await getSkillToolCommands(Pt())).length;
    return {
      skillTokens: i,
      skillInfo: {
        totalSkills: c,
        includedSkills: o.length,
        skillFrontmatter: l
      }
    };
  } catch (o) {
    return De(_o(o)), {
      skillTokens: 0,
      skillInfo: {
        totalSkills: 0,
        includedSkills: 0,
        skillFrontmatter: []
      }
    };
  }
}
async function h3p(e, t, n, r, o) {
  let s = e.filter(_ => _.isMcp),
    i = [],
    a = await D0e(s, t, n, r),
    l = Math.max(0, (a || 0) - x6n),
    c = await Promise.all(s.map(async _ => $f(Le({
      name: _.name,
      description: await _.prompt({
        getToolPermissionContext: t,
        tools: e,
        agents: n?.activeAgents ?? []
      }),
      input_schema: _.inputJSONSchema ?? {}
    })))),
    u = c.reduce((_, y) => _ + y, 0) || 1,
    d = c.map(_ => Math.round(_ / u * l)),
    {
      isToolSearchEnabled: p
    } = await Promise.resolve().then(() => (Hz(), Yho)),
    {
      isDeferredTool: m
    } = await Promise.resolve().then(() => (Y5(), Djr)),
    f = await p(r, e, t, n?.activeAgents ?? [], "analyzeMcp"),
    A = new Set();
  if (f && o) {
    let _ = new Set(s.map(y => y.name));
    for (let y of o) if (y.type === "assistant") {
      for (let T of y.message.content) if ("type" in T && T.type === "tool_use" && "name" in T && typeof T.name === "string" && _.has(T.name)) A.add(T.name);
    }
  }
  for (let [_, y] of s.entries()) i.push({
    name: y.name,
    serverName: y.name.split("__")[1] || "unknown",
    tokens: d[_],
    isLoaded: A.has(y.name) || !m(y)
  });
  let h = 0,
    g = 0;
  for (let _ of i) if (_.isLoaded) h += _.tokens;else if (f) g += _.tokens;
  return {
    mcpToolTokens: f ? h : l,
    mcpToolDetails: i,
    deferredToolTokens: g,
    loadedMcpToolNames: A
  };
}
async function g3p(e) {
  let t = e.activeAgents.filter(s => s.source !== "built-in"),
    n = [],
    r = 0,
    o = await Promise.all(t.map(s => dpt([{
      role: "user",
      content: [s.agentType, s.whenToUse].join(" ")
    }], [])));
  for (let [s, i] of t.entries()) {
    let a = o[s] || 0;
    r += a || 0, n.push({
      agentType: i.agentType,
      source: i.source,
      tokens: a || 0
    });
  }
  return {
    agentTokens: r,
    agentDetails: n
  };
}
function _3p(e, t) {
  for (let n of e.message.content) {
    let r = Le(n),
      o = $f(r);
    if ("type" in n && n.type === "tool_use") {
      t.toolCallTokens += o;
      let s = ("name" in n ? n.name : void 0) || "unknown";
      t.toolCallsByType.set(s, (t.toolCallsByType.get(s) || 0) + o);
    } else t.assistantMessageTokens += o;
  }
}
function y3p(e, t, n) {
  if (typeof e.message.content === "string") {
    let r = $f(e.message.content);
    t.userMessageTokens += r;
    return;
  }
  for (let r of e.message.content) {
    let o = Le(r),
      s = $f(o);
    if ("type" in r && r.type === "tool_result") {
      t.toolResultTokens += s;
      let i = "tool_use_id" in r ? r.tool_use_id : void 0,
        a = (i ? n.get(i) : void 0) || "unknown";
      t.toolResultsByType.set(a, (t.toolResultsByType.get(a) || 0) + s);
    } else t.userMessageTokens += s;
  }
}
function T3p(e, t) {
  let n = Le(e.attachment),
    r = $f(n);
  t.attachmentTokens += r;
  let o = e.attachment.type || "unknown";
  t.attachmentsByType.set(o, (t.attachmentsByType.get(o) || 0) + r);
}
async function S3p(e, t) {
  let n = {
      totalTokens: 0,
      toolCallTokens: 0,
      toolResultTokens: 0,
      attachmentTokens: 0,
      assistantMessageTokens: 0,
      userMessageTokens: 0,
      toolCallsByType: new Map(),
      toolResultsByType: new Map(),
      attachmentsByType: new Map()
    },
    r = new Map();
  for (let s of e) if (s.type === "assistant") {
    for (let i of s.message.content) if ("type" in i && i.type === "tool_use") {
      let a = "id" in i ? i.id : void 0,
        l = ("name" in i ? i.name : void 0) || "unknown";
      if (a) r.set(a, l);
    }
  }
  for (let s of e) if (s.type === "assistant") _3p(s, n);else if (s.type === "user") y3p(s, n, r);else if (s.type === "attachment") T3p(s, n);
  let o = t ? 0 : await dpt(kk(e).map(s => {
    if (s.type === "assistant") return {
      role: "assistant",
      content: s.message.content
    };
    return s.message;
  }), []);
  return n.totalTokens = o ?? 0, n;
}
async function k6n(e, t, n, r, o, s, i, a, l, c, u) {
  let d = getRuntimeMainLoopModel({
      permissionMode: (await n()).mode,
      mainLoopModel: t
    }),
    p = Yw() ? c : void 0,
    {
      window: m,
      source: f
    } = J$(d, p),
    A = await J0(r, d, void 0, {
      excludeDynamicSections: u
    }),
    h = E6({
      mainThreadAgentDefinition: a,
      toolUseContext: i ?? {
        options: {}
      },
      customSystemPrompt: i?.options.customSystemPrompt,
      defaultSystemPrompt: A,
      appendSystemPrompt: i?.options.appendSystemPrompt
    }),
    g = l ?? e,
    _ = Xtt(g),
    y = _ && _.input_tokens + _.cache_creation_input_tokens + _.cache_read_input_tokens > 0 ? _ : null,
    T = y ? y.input_tokens + y.cache_creation_input_tokens + y.cache_read_input_tokens : null,
    [{
      systemPromptTokens: S,
      systemPromptSections: v,
      redirectedContextTokens: R
    }, {
      claudeMdTokens: k,
      memoryFileDetails: x
    }, {
      builtInToolTokens: H,
      deferredBuiltinDetails: I,
      deferredBuiltinTokens: P,
      systemToolDetails: L
    }, {
      mcpToolTokens: D,
      mcpToolDetails: N,
      deferredToolTokens: O
    }, {
      agentTokens: $,
      agentDetails: U
    }, {
      slashCommandTokens: W,
      commandInfo: G
    }, V] = await Promise.all([d3p(h, u && i?.options.customSystemPrompt === void 0), p3p(), m3p(r, n, o, d, e), h3p(r, n, o, d, e), g3p(o), f3p(r, n, o), S3p(e, T !== null)]),
    K = (await A3p(r, n, o, d)).skillInfo,
    Y = K.skillFrontmatter.reduce((Je, Rt) => Je + Rt.tokens, 0),
    J = V.totalTokens + R,
    ee = Yw(),
    te = ee ? cee(t, p) - lFi : void 0,
    ne = [];
  if (S > 0) ne.push({
    name: "System prompt",
    tokens: S,
    color: "promptBorder"
  });
  let re = H - Y;
  if (re > 0) ne.push({
    name: "System tools",
    tokens: re,
    color: "inactive"
  });
  if (D > 0) ne.push({
    name: "MCP tools",
    tokens: D,
    color: "cyan_FOR_SUBAGENTS_ONLY"
  });
  if (O > 0) ne.push({
    name: "MCP tools (deferred)",
    tokens: O,
    color: "inactive",
    isDeferred: !0
  });
  if (P > 0) ne.push({
    name: "System tools (deferred)",
    tokens: P,
    color: "inactive",
    isDeferred: !0
  });
  if ($ > 0) ne.push({
    name: "Custom agents",
    tokens: $,
    color: "permission"
  });
  if (k > 0) ne.push({
    name: "Memory files",
    tokens: k,
    color: "claude"
  });
  if (Y > 0) ne.push({
    name: "Skills",
    tokens: Y,
    color: "warning"
  });
  let oe = 0,
    ce;
  if (!(ee && !mq() && f !== "env" && f !== "settings" && f !== "clientdata" && f !== "model-default")) {
    if (ee && te !== void 0) oe = m - te, ce = Kho;else if (!ee) oe = cFi, ce = zho;
  }
  if (T !== null) {
    let Je = ne.reduce((dt, Dt) => dt + (Dt.isDeferred ? 0 : Dt.tokens), 0),
      Rt = m - Je - oe,
      Et = CFi(g, bytesPerTokenForModel(d));
    J = Math.max(0, Math.min(Math.max(0, T - Je) + Et, Rt));
  }
  let ae = Math.max(0, J - V.toolCallTokens - V.toolResultTokens - V.attachmentTokens - V.assistantMessageTokens - V.userMessageTokens - R);
  if (J > 0) ne.push({
    name: "Messages",
    tokens: J,
    color: "purple_FOR_SUBAGENTS_ONLY"
  });
  let he = ne.reduce((Je, Rt) => Je + (Rt.isDeferred ? 0 : Rt.tokens), 0);
  if (ce) ne.push({
    name: ce,
    tokens: oe,
    color: "inactive"
  });
  let se = Math.max(0, m - he - oe);
  ne.push({
    name: "Free space",
    tokens: se,
    color: "promptBorder"
  });
  let le = T ?? he,
    pe = s && s < 80,
    de = m >= 1e6 ? pe ? 5 : 20 : pe ? 5 : 10,
    _e = m >= 1e6 ? 10 : pe ? 5 : 10,
    fe = de * _e,
    Ae = ne.filter(Je => !Je.isDeferred).map(Je => ({
      ...Je,
      squares: Je.name === "Free space" ? Math.round(Je.tokens / m * fe) : Math.max(1, Math.round(Je.tokens / m * fe)),
      percentageOfTotal: Math.round(Je.tokens / m * 100)
    }));
  function ge(Je) {
    let Rt = [],
      Et = Je.tokens / m * fe,
      dt = Math.floor(Et),
      Dt = Et - dt;
    for (let $t = 0; $t < Je.squares; $t++) {
      let It = 1;
      if ($t === dt && Dt > 0) It = Dt;
      Rt.push({
        color: Je.color,
        isFilled: !0,
        categoryName: Je.name,
        tokens: Je.tokens,
        percentage: Je.percentageOfTotal,
        squareFullness: It
      });
    }
    return Rt;
  }
  let Ce = [],
    xe = Ae.find(Je => Je.name === Kho || Je.name === zho),
    Re = Ae.filter(Je => Je.name !== Kho && Je.name !== zho && Je.name !== "Free space");
  for (let Je of Re) {
    let Rt = ge(Je);
    for (let Et of Rt) if (Ce.length < fe) Ce.push(Et);
  }
  let Me = xe ? xe.squares : 0,
    Ke = ne.find(Je => Je.name === "Free space"),
    He = fe - Me;
  while (Ce.length < He) Ce.push({
    color: "promptBorder",
    isFilled: !0,
    categoryName: "Free space",
    tokens: Ke?.tokens || 0,
    percentage: Ke ? Math.round(Ke.tokens / m * 100) : 0,
    squareFullness: 1
  });
  if (xe) {
    let Je = ge(xe);
    for (let Rt of Je) if (Ce.length < fe) Ce.push(Rt);
  }
  let Ge = [];
  for (let Je = 0; Je < _e; Je++) Ge.push(Ce.slice(Je * de, (Je + 1) * de));
  let Ye = new Map();
  for (let [Je, Rt] of V.toolCallsByType.entries()) {
    let Et = Ye.get(Je) || {
      callTokens: 0,
      resultTokens: 0
    };
    Ye.set(Je, {
      ...Et,
      callTokens: Rt
    });
  }
  for (let [Je, Rt] of V.toolResultsByType.entries()) {
    let Et = Ye.get(Je) || {
      callTokens: 0,
      resultTokens: 0
    };
    Ye.set(Je, {
      ...Et,
      resultTokens: Rt
    });
  }
  let ot = Array.from(Ye.entries()).map(([Je, {
      callTokens: Rt,
      resultTokens: Et
    }]) => ({
      name: Je,
      callTokens: Rt,
      resultTokens: Et
    })).sort((Je, Rt) => Rt.callTokens + Rt.resultTokens - (Je.callTokens + Je.resultTokens)),
    vt = Array.from(V.attachmentsByType.entries()).map(([Je, Rt]) => ({
      name: Je,
      tokens: Rt
    })).sort((Je, Rt) => Rt.tokens - Je.tokens),
    $e = {
      toolCallTokens: V.toolCallTokens,
      toolResultTokens: V.toolResultTokens,
      attachmentTokens: V.attachmentTokens,
      assistantMessageTokens: V.assistantMessageTokens,
      userMessageTokens: V.userMessageTokens,
      redirectedContextTokens: R,
      unattributedTokens: ae,
      toolCallsByType: ot,
      attachmentsByType: vt
    };
  return {
    categories: ne,
    totalTokens: le,
    maxTokens: m,
    rawMaxTokens: m,
    autocompactSource: f,
    percentage: Math.round(le / m * 100),
    gridRows: Ge,
    model: d,
    memoryFiles: x,
    mcpTools: N,
    deferredBuiltinTools: void 0,
    systemTools: void 0,
    systemPromptSections: void 0,
    agents: U,
    slashCommands: W > 0 ? {
      totalCommands: G.totalCommands,
      includedCommands: G.includedCommands,
      tokens: W
    } : void 0,
    skills: Y > 0 ? {
      totalSkills: K.totalSkills,
      includedSkills: K.includedSkills,
      tokens: Y,
      skillFrontmatter: K.skillFrontmatter
    } : void 0,
    autoCompactThreshold: te,
    isAutoCompactEnabled: ee,
    messageBreakdown: $e,
    apiUsage: y
  };
}
var Kho = "Autocompact buffer",
  zho = "Compact buffer",
  x6n = 500;
var H6n = b(() => {
  oG();
  Sf();
  dq();
  nN();
  h8r();
  HF();
  Z5();
  x6();
  Ri();
  SRe();
  K6e();
  zw();
  Iy();
  Go();
  qe();
  bt();
  Rn();
  lo();
  Mo();
  Xt();
  T4e();
  oN();
});
export {dpt as dft,D0e as kDe,u3p as zVp,d3p as jVp,p3p as YVp,m3p as JVp,Eel as dal,f3p as XVp,A3p as QVp,h3p as ZVp,g3p as eKp,_3p as tKp,y3p as nKp,T3p as rKp,S3p as oKp,k6n as jWn,Kho as Ubo,zho as $bo,x6n as zWn,H6n as YWn};
