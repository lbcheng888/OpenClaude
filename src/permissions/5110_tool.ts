// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {tool as nBl,createSdkMcpServer as rBl,oBl} from "../tools/5107_name.ts";
import {parseDirectConnectUrl as aBl,DirectConnectTransport as rDo,DirectConnectError as CJ,lBl} from "../../vendor/m5107.ts";
import {foldSessionSummary as WRt,Qas,GRt} from "../../vendor/m724.ts";
import {filterEscalatingDefaultMode as dBl,pBl,mBl} from "../../vendor/m5108.ts";
import {SYSTEM_PROMPT_DYNAMIC_BOUNDARY as Toe,HOOK_EVENTS as hM,EXIT_REASONS as Xas} from "../../vendor/m723.ts";
import {InMemorySessionStore as Kon,ESr} from "../../vendor/m725.ts";
import {AbortError as gM,isBundledSkillsDisabled as nQ} from "../../vendor/m726.ts";
import {In,cn,mo,Ct} from "../../vendor/m197.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {wM,Woe,ZP,G5} from "../../vendor/m1296.ts";
import {WT,Bpe,VEe,NS,Mv,VT} from "../../vendor/m648.ts";
import {withTimeout as Oc,sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {r3} from "../../vendor/m465.ts";
import {yFl,TFl} from "../../vendor/m5095.ts";
import {qxo,gFl} from "./5095_command.ts";
import {Wxo,bFl} from "../agent/5097_type.ts";
import {Gxo,nJn,rJn,EFl} from "../../vendor/m5097.ts";
import {kFl,vFl,jxo} from "../session/5099_parentUuid.ts";
import {tja,emt,w6n} from "../../vendor/m4235.ts";
import {HFl,IFl} from "../../vendor/m5099.ts";
import {xFl,DFl,PFl,LFl} from "../../vendor/m5100.ts";
import {NFl,FFl,UFl} from "../../vendor/m5101.ts";
import {WFl,GFl,Xxo,VFl} from "../agent/5103_withFileTypes.ts";
import {A_,zf} from "../../vendor/m133.ts";
import {O$,W9e} from "../../vendor/m3167.ts";
import {xi} from "../../vendor/m2096.ts";
// @ts-nocheck
var Z0l = {};
ft(Z0l, {
  tool: () => nBl,
  tagSession: () => tagSession,
  startup: () => startup,
  resolveSettings: () => resolveSettings,
  renameSession: () => renameSession,
  query: () => query,
  parseDirectConnectUrl: () => aBl,
  listSubagents: () => listSubagents,
  listSessions: () => listSessions,
  importSessionToStore: () => importSessionToStore,
  getSubagentMessages: () => getSubagentMessages,
  getSessionMessages: () => getSessionMessages,
  getSessionInfo: () => getSessionInfo,
  forkSession: () => forkSession,
  foldSessionSummary: () => WRt,
  filterEscalatingDefaultMode: () => dBl,
  deleteSession: () => deleteSession,
  createSdkMcpServer: () => rBl,
  SYSTEM_PROMPT_DYNAMIC_BOUNDARY: () => Toe,
  InMemorySessionStore: () => Kon,
  HOOK_EVENTS: () => hM,
  EXIT_REASONS: () => Xas,
  DirectConnectTransport: () => rDo,
  DirectConnectError: () => CJ,
  AbortError: () => gM
});
async function resolveSettings(e) {
  return pBl(e);
}
async function wpm(e, t) {
  try {
    await UU.copyFile(e, t);
  } catch (n) {
    if (!In(n)) throw n;
  }
}
async function Rpm(e, t) {
  if (!e) return;
  let n = e;
  try {
    let r = qt(e);
    if (r?.claudeAiOauth?.refreshToken) delete r.claudeAiOauth.refreshToken, n = Pe(r);
  } catch {}
  await UU.writeFile(t, n, {
    mode: 384
  });
}
function xpm() {
  let e = wM(Woe);
  return new Promise(t => {
    W0l.execFile("security", ["find-generic-password", "-a", ZP(), "-w", "-s", e], {
      encoding: "utf-8",
      timeout: 5000
    }, (n, r) => t(n ? undefined : r.trim() || undefined));
  });
}
async function z0l(e, t, n, r, o = 60000) {
  if (!WT(t)) return;
  let s = PJ(n),
    i = await Oc(e.load({
      projectKey: s,
      sessionId: t
    }), o, `SessionStore.load() timed out after ${o}ms for session ${t}`);
  if (!i || i.length === 0) return;
  let a = M_.join(Hft.tmpdir(), `claude-resume-${f7n.randomUUID()}`);
  try {
    let l = M_.join(a, "projects", s);
    await UU.mkdir(l, {
      recursive: true
    });
    let c = M_.join(l, `${t}.jsonl`);
    await Bpe(c, i);
    let u = r?.CLAUDE_CONFIG_DIR ?? process.env.CLAUDE_CONFIG_DIR,
      d = u ?? M_.join(Hft.homedir(), ".claude"),
      p;
    try {
      p = await UU.readFile(M_.join(d, ".credentials.json"), "utf-8");
    } catch (m) {
      if (!In(m)) throw m;
    }
    if (!u && !(r ?? process.env).ANTHROPIC_API_KEY && !(r ?? process.env).CLAUDE_CODE_OAUTH_TOKEN) p = (await xpm()) ?? p;
    if (await Rpm(p, M_.join(a, ".credentials.json")), await wpm(M_.join(u ?? Hft.homedir(), ".claude.json"), M_.join(a, ".claude.json")), e.listSubkeys) {
      let m = M_.join(l, t),
        f = await Oc(e.listSubkeys({
          projectKey: s,
          sessionId: t
        }), o, `SessionStore.listSubkeys() timed out after ${o}ms for session ${t}`);
      for (let A_2 of f) {
        let h = M_.resolve(m, A_2 + ".jsonl");
        if (!A_2 || M_.isAbsolute(A_2) || A_2.split(/[\\/]/).includes("..") || !h.startsWith(m + M_.sep)) {
          A(`[SessionStore] skipping unsafe subpath from listSubkeys: ${A_2}`, {
            level: "warn"
          });
          continue;
        }
        let g_2 = await Oc(e.load({
          projectKey: s,
          sessionId: t,
          subpath: A_2
        }), o, `SessionStore.load() timed out after ${o}ms for session ${t} subpath ${A_2}`);
        if (!g_2 || g_2.length === 0) continue;
        let __2 = [],
          y = [];
        for (let T of g_2) if (QRo(T)) __2.push(T);else y.push(T);
        if (y.length > 0) await UU.mkdir(M_.dirname(h), {
          recursive: true
        }), await Bpe(h, y);
        if (__2.length > 0) {
          let T = __2.at(-1),
            S_2 = M_.resolve(m, A_2 + ".meta.json");
          await UU.mkdir(M_.dirname(S_2), {
            recursive: true
          });
          let {
            type: v,
            ...R_2
          } = T;
          await UU.writeFile(S_2, Pe(R_2), {
            mode: 384
          });
        }
      }
    }
    return a;
  } catch (l) {
    throw await m7n(a), l;
  }
}
function JRo(e, t, n, r) {
  let {
      systemPrompt: o,
      settings: s,
      managedSettings: i,
      settingSources: a,
      sandbox: l,
      ...c
    } = e ?? {},
    u,
    d,
    p;
  if (o === undefined) u = "";else if (typeof o === "string") u = o;else if (Array.isArray(o)) u = o;else if (o.type === "preset") d = o.append, p = o.excludeDynamicSections;
  process.env.CLAUDE_AGENT_SDK_VERSION = process.env.CLAUDE_AGENT_SDK_VERSION ?? "unknown";
  let {
    abortController: m = kl(),
    additionalDirectories: f = [],
    agent: A_2,
    agents: h_2,
    allowedTools: g_2 = [],
    betas: __2,
    canUseTool: y,
    continue: T_2,
    cwd: S_2,
    debug: v,
    debugFile: R_2,
    disallowedTools: k_2 = [],
    tools: x_2,
    env: H_2,
    executable: I_2 = r3() ? "bun" : "node",
    executableArgs: P_2 = [],
    extraArgs: L = {},
    fallbackModel: D_2,
    enableFileCheckpointing: N_2,
    toolConfig: O_2,
    forkSession: $,
    hooks: U,
    includeHookEvents: W,
    includePartialMessages: G,
    forwardSubagentText: V_2,
    onElicitation: Q,
    onUserDialog: K,
    supportedDialogKinds: Y,
    persistSession: J_2,
    sessionStore: ee,
    sessionStoreFlush: te,
    thinking: ne,
    effort: re_2,
    maxThinkingTokens: oe,
    maxTurns: ce_2,
    maxBudgetUsd: ue_2,
    taskBudget: ae_2,
    mcpServers: he_2,
    model: se_2,
    outputFormat: le_2,
    permissionMode: pe = "default",
    allowDangerouslySkipPermissions: de_2 = false,
    permissionPromptToolName: _e,
    plugins: fe,
    getOAuthToken: ie_2,
    getHostAuthToken: Ae,
    workload: ge_2,
    resume: Ce,
    resumeSessionAt: xe,
    sessionId: Re,
    skills: Me,
    stderr: Ke,
    strictMcpConfig: He
  } = c;
  if (ee && J_2 === false) throw Error("sessionStore cannot be used with persistSession: false -- the storage adapter requires local writes to mirror from. Use CLAUDE_CONFIG_DIR=/tmp for ephemeral local writes with external mirroring.");
  if (Y !== undefined && Y.length > 0 && !K) throw Error("supportedDialogKinds requires an onUserDialog callback -- declaring dialog kinds without a handler would park dialogs nothing can answer. Provide onUserDialog, or omit supportedDialogKinds.");
  if (ee && T_2 && !Ce && !ee.listSessions) throw Error("Options.continue with sessionStore requires store.listSessions to be implemented");
  if (ee && N_2) throw Error("enableFileCheckpointing is not yet supported with sessionStore (backup blobs are not mirrored, so rewindFiles() fails after a store-backed resume).");
  if (ee && c.spawnClaudeCodeProcess) A("sessionStore with custom spawnClaudeCodeProcess: ensure the subprocess CLAUDE_CONFIG_DIR matches the parent (same path, same separators) or transcript_mirror frames will be dropped.", {
    level: "warn"
  });
  let Ge_2 = c.pathToClaudeCodeExecutable;
  if (!Ge_2) {
    let $t = K0l.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/src/entrypoints/agentSdk.ts"),
      It = G0l.createRequire($t),
      Zt = yFl(_n => It.resolve(_n));
    if (!Zt) throw Error("Native CLI binary for darwin-arm64 not found. Reinstall @anthropic-ai/claude-agent-sdk without --omit=optional, or set options.pathToClaudeCodeExecutable.");
    Ge_2 = Zt;
  }
  let Ye = le_2?.type === "json_schema" ? le_2.schema : undefined,
    ot_2 = H_2 ? {
      ...H_2
    } : {
      ...process.env
    };
  if (!ot_2.CLAUDE_CODE_ENTRYPOINT) ot_2.CLAUDE_CODE_ENTRYPOINT = "sdk-ts";
  if (!ot_2.CLAUDE_AGENT_SDK_VERSION) ot_2.CLAUDE_AGENT_SDK_VERSION = process.env.CLAUDE_AGENT_SDK_VERSION;
  if (N_2) ot_2.CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING = "true";
  if (ie_2) ot_2.CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH = "1";
  if (Ae) ot_2.CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH = "1";
  if (O_2?.askUserQuestion?.previewFormat) ot_2.CLAUDE_CODE_QUESTION_PREVIEW_FORMAT = O_2.askUserQuestion.previewFormat;
  let vt = {};
  if (h7n.propagation.inject(h7n.context.active(), vt), "traceparent" in vt) {
    for (let $t of ["TRACEPARENT", "TRACESTATE"]) if (!($t in (H_2 ?? {}))) delete ot_2[$t];
  }
  for (let [$t, It] of Object.entries(vt)) {
    let Zt = $t.toUpperCase();
    if (!(Zt in (H_2 ?? {}))) ot_2[Zt] = It;
  }
  let $e = {},
    Je = new Map();
  if (he_2) for (let [$t, It] of Object.entries(he_2)) if (It.type === "sdk" && It.instance) Je.set($t, It.instance);else $e[$t] = It;
  let Rt;
  if (ne) switch (ne.type) {
    case "adaptive":
      Rt = {
        type: "adaptive",
        display: ne.display
      };
      break;
    case "enabled":
      Rt = {
        type: "enabled",
        budgetTokens: ne.budgetTokens,
        display: ne.display
      };
      break;
    case "disabled":
      Rt = {
        type: "disabled"
      };
      break;
  } else if (oe !== undefined) Rt = oe === 0 ? {
    type: "disabled"
  } : {
    type: "enabled",
    budgetTokens: oe
  };
  if (n) ot_2.CLAUDE_CONFIG_DIR = n;
  let Et = new qxo({
      abortController: m,
      additionalDirectories: f,
      agent: A_2,
      betas: __2,
      cwd: S_2,
      debug: v,
      debugFile: R_2,
      executable: I_2,
      executableArgs: P_2,
      extraArgs: ge_2 ? {
        ...L,
        workload: ge_2
      } : L,
      pathToClaudeCodeExecutable: Ge_2,
      env: ot_2,
      forkSession: $,
      stderr: Ke,
      thinkingConfig: Rt,
      effort: re_2,
      maxTurns: ce_2,
      maxBudgetUsd: ue_2,
      taskBudget: ae_2,
      model: se_2,
      fallbackModel: D_2,
      jsonSchema: Ye,
      permissionMode: pe,
      allowDangerouslySkipPermissions: de_2,
      permissionPromptToolName: _e,
      continueConversation: ee ? undefined : T_2,
      resume: Ce,
      resumeSessionAt: xe,
      sessionId: Re,
      settings: typeof s === "object" ? Pe(s) : s,
      managedSettings: i ? Pe(i) : undefined,
      settingSources: a,
      skills: Me,
      allowedTools: g_2,
      disallowedTools: k_2,
      tools: x_2,
      mcpServers: $e,
      strictMcpConfig: He,
      canUseTool: !!y,
      hooks: !!U,
      includeHookEvents: W,
      includePartialMessages: G,
      persistSession: J_2,
      sessionMirror: !!ee,
      plugins: fe,
      sandbox: l,
      spawnClaudeCodeProcess: c.spawnClaudeCodeProcess,
      deferSpawn: r
    }),
    dt_2 = {
      systemPrompt: u,
      appendSystemPrompt: d,
      planModeInstructions: c.planModeInstructions,
      appendSubagentSystemPrompt: c.appendSubagentSystemPrompt,
      toolAliases: c.toolAliases,
      excludeDynamicSections: p,
      agents: h_2,
      title: c.title,
      skills: Me,
      webSearchIsolationExemptMcpServers: c.webSearchIsolationExemptMcpServers,
      promptSuggestions: c.promptSuggestions,
      agentProgressSummaries: c.agentProgressSummaries,
      forwardSubagentText: V_2,
      supportedDialogKinds: Y
    },
    Dt_2 = new Wxo(Et, t, y, U, m, Je, Ye, dt_2, Q, ie_2, Ae, K);
  if (ee) {
    let $t = () => M_.join(ot_2.CLAUDE_CONFIG_DIR ?? M_.join(Hft.homedir(), ".claude"), "projects"),
      It = te === "eager",
      Zt = new Gxo(async (_n, Nn) => {
        let Fn = j0l(_n, $t());
        if (Fn) await ee.append(Fn, Nn);else A(`[SessionStore] dropping mirror frame: filePath ${_n} is not under ${$t()} -- subprocess CLAUDE_CONFIG_DIR likely differs from parent (custom spawnClaudeCodeProcess / container?)`, {
          level: "warn"
        });
      }, undefined, (_n, Nn) => {
        let Fn = j0l(_n, $t());
        if (Fn) Dt_2.reportMirrorError(Fn, Nn.message);
      }, It ? 0 : nJn, It ? 0 : rJn);
    Dt_2.setTranscriptMirrorBatcher(Zt);
  }
  return {
    queryInstance: Dt_2,
    transport: Et,
    abortController: m,
    processEnv: ot_2
  };
}
function XRo(e, t, n, r) {
  if (typeof n === "string") t.write(Pe({
    type: "user",
    session_id: "",
    message: {
      role: "user",
      content: [{
        type: "text",
        text: n
      }]
    },
    parent_tool_use_id: null
  }) + `
`);else e.streamInput(n).catch(o => r.abort(o));
}
async function m7n(e) {
  for (let t = 0;; t++) try {
    return await UU.rm(e, {
      recursive: true,
      force: true
    });
  } catch (n) {
    if (t >= 4 || !kpm.has(cn(n) ?? "")) return;
    await Kn((t + 1) * 100);
  }
}
function Hpm(e, t) {
  e.waitForExit().catch(() => {}).finally(() => m7n(t));
}
function query({
  prompt: e,
  options: t
}) {
  if ((t?.resume || t?.continue) && t?.sessionStore) {
    let {
        queryInstance: s,
        transport: i,
        abortController: a,
        processEnv: l
      } = JRo({
        ...t
      }, typeof e === "string", undefined, true),
      c = M_.resolve(t.cwd ?? "."),
      u = t.sessionStore,
      d = t.loadTimeoutMs ?? 60000,
      p = t.resume;
    return (async () => {
      if (!p) p = (await Oc(u.listSessions(PJ(c)), d, `SessionStore.listSessions() timed out after ${d}ms`)).slice().sort((A_2, h_2) => h_2.mtime - A_2.mtime)[0]?.sessionId;
      if (!p) return;
      return z0l(u, p, c, t.env, t.loadTimeoutMs);
    })().then(f => {
      if (f) {
        i.updateResume(p);
        let A_2 = {
          CLAUDE_CONFIG_DIR: f
        };
        i.updateEnv(A_2), l.CLAUDE_CONFIG_DIR = f, s.addCleanupCallback(() => Hpm(i, f));
      }
      if (!s.isClosed()) i.spawn();
    }).catch(f => {
      let A_2 = mo(f);
      i.spawnAbort(A_2), s.setError(A_2);
    }), XRo(s, i, e, a), s;
  }
  let {
    queryInstance: n,
    transport: r,
    abortController: o
  } = JRo(t, typeof e === "string");
  return XRo(n, r, e, o), n;
}
async function startup({
  options: e,
  initializeTimeoutMs: t = 60000
} = {}) {
  let n,
    r = e?.resume;
  if ((r || e?.continue) && e?.sessionStore) {
    let a = M_.resolve(e.cwd ?? ".");
    if (!r) {
      if (!e.sessionStore.listSessions) throw Error("Options.continue with sessionStore requires store.listSessions to be implemented");
      let l = e.loadTimeoutMs ?? 60000;
      r = (await Oc(e.sessionStore.listSessions(PJ(a)), l, `SessionStore.listSessions() timed out after ${l}ms`)).slice().sort((u, d) => d.mtime - u.mtime)[0]?.sessionId;
    }
    if (r) n = await z0l(e.sessionStore, r, a, e.env, e.loadTimeoutMs);
  }
  let o, s, i;
  try {
    let p = function () {
        if (d) return;
        d = true, u.close();
      },
      a = JRo(n && r && r !== e?.resume ? {
        ...e,
        resume: r
      } : e, false, n);
    o = a.queryInstance;
    let {
      transport: l,
      abortController: c
    } = a;
    s = l;
    let u = a.queryInstance;
    if (n) {
      let m = n;
      u.addCleanupCallback(() => {
        i = l.waitForExit().catch(() => {}).then(() => m7n(m));
      });
    }
    await Oc(u.initializationResult(), t, `Subprocess initialization did not complete within ${t}ms \u2014 check authentication and network connectivity`);
    let d = false;
    return {
      query(m) {
        if (d) throw Error("WarmQuery.query() can only be called once");
        d = true;
        try {
          XRo(u, l, m, c);
        } catch (f) {
          throw u.close(), f;
        }
        if (typeof m === "string") u.setIsSingleUserTurn(true);
        return u;
      },
      close: p,
      async [Symbol.asyncDispose]() {
        d = true, u.close(), await i;
      }
    };
  } catch (a) {
    if (o?.close(), n && !i) {
      let l = s;
      i = (l ? l.waitForExit().catch(() => {}) : Promise.resolve()).then(() => m7n(n));
    }
    throw await i, a;
  }
}
async function getSessionMessages(e, t) {
  if (t?.sessionStore) return Vpm(t.sessionStore, e, t);
  return kFl(e, t);
}
async function listSessions(e) {
  if (e?.sessionStore) return Wpm(e.sessionStore, e);
  return tja(e);
}
async function getSessionInfo(e, t) {
  if (t?.sessionStore) return Kpm(t.sessionStore, e, t);
  return HFl(e, t);
}
async function renameSession(e, t, n) {
  if (n?.sessionStore) return zpm(n.sessionStore, e, t, n.dir);
  return xFl(e, t, n);
}
async function tagSession(e, t, n) {
  if (n?.sessionStore) return Ypm(n.sessionStore, e, t, n.dir);
  return DFl(e, t, n);
}
async function deleteSession(e, t) {
  if (!WT(e)) throw Error(`Invalid sessionId: ${e}`);
  if (t?.sessionStore) {
    if (!t.sessionStore.delete) return;
    let n = PJ(t.dir);
    await t.sessionStore.delete({
      projectKey: n,
      sessionId: e
    });
    return;
  }
  return PFl(e, t);
}
async function forkSession(e, t) {
  if (t?.sessionStore) return Jpm(t.sessionStore, e, t);
  return NFl(e, t);
}
async function importSessionToStore(e, t, n) {
  if (!WT(e)) throw Error(`Invalid sessionId: ${e}`);
  let r = await VEe(e, n?.dir);
  if (!r) throw Error(`Session ${e} not found`);
  let o = PJ(n?.dir),
    s = n?.batchSize && n.batchSize > 0 ? n.batchSize : nJn;
  if (await U0l(r.filePath, {
    projectKey: o,
    sessionId: e
  }, t, s), n?.includeSubagents === false) return;
  let i = r.filePath.replace(/\.jsonl$/, ""),
    a = M_.join(i, "subagents");
  for (let l of await $pm(a)) {
    let c = M_.relative(i, l).split(M_.sep);
    c[c.length - 1] = c.at(-1).replace(/\.jsonl$/, "");
    let u = {
      projectKey: o,
      sessionId: e,
      subpath: c.join("/")
    };
    await U0l(l, u, t, s);
    let d = l.replace(/\.jsonl$/, ".meta.json");
    try {
      let p = qt(await UU.readFile(d, "utf8"));
      await t.append(u, [{
        type: "agent_metadata",
        ...p
      }]);
    } catch (p) {
      if (!In(p)) throw p;
    }
  }
}
async function U0l(e, t, n, r) {
  let o = V0l.createInterface({
      input: A7n.createReadStream(e, {
        encoding: "utf8"
      }),
      crlfDelay: 1 / 0
    }),
    s = [],
    i = 0;
  for await (let a of o) {
    if (!a) continue;
    if (s.push(qt(a)), i += a.length, s.length >= r || i >= rJn) await n.append(t, s), s = [], i = 0;
  }
  if (s.length > 0) await n.append(t, s);
}
async function $pm(e) {
  let t = [];
  async function n(r) {
    let o;
    try {
      o = await UU.readdir(r, {
        withFileTypes: true
      });
    } catch {
      return;
    }
    for (let s of o) {
      let i = M_.join(r, s.name);
      if (s.isDirectory()) await n(i);else if (s.isFile() && s.name.endsWith(".jsonl")) t.push(i);
    }
  }
  return await n(e), t;
}
async function listSubagents(e, t) {
  if (t?.sessionStore) return Xpm(t.sessionStore, e, t.dir);
  return WFl(e, t);
}
async function getSubagentMessages(e, t, n) {
  if (n?.sessionStore) return Qpm(n.sessionStore, e, t, n);
  return GFl(e, t, n);
}
function Y0l(e) {
  let t = M_.resolve(e ?? "."),
    n;
  try {
    n = A7n.realpathSync(t);
  } catch {
    n = t;
  }
  return A_(n);
}
function PJ(e) {
  return NS(Y0l(e));
}
function J0l(e) {
  return e.map(t => Pe(t)).join(`
`) + `
`;
}
function $0l(e, t, n) {
  if (t !== undefined && t > 0) return e.slice(n, n + t);
  if (n > 0) return e.slice(n);
  return e;
}
function QRo(e) {
  return typeof e === "object" && e !== null && "type" in e && e.type === "agent_metadata";
}
async function Wpm(e, t) {
  let n = Y0l(t.dir),
    r = NS(n),
    o = t.offset ?? 0,
    s = t.limit;
  if (e.listSessionSummaries) {
    let c = await e.listSessionSummaries(r),
      u = e.listSessions ? new Map((await e.listSessions(r)).map(f => [f.sessionId, f])) : undefined,
      d = [];
    for (let f of c) {
      let A_2 = u?.get(f.sessionId);
      if (u && !A_2) continue;
      let h_2 = A_2 !== undefined && f.mtime < A_2.mtime;
      d.push({
        sessionId: f.sessionId,
        mtime: h_2 ? A_2.mtime : f.mtime,
        info: h_2 ? undefined : Qas(f, n)
      });
    }
    if (u) {
      let f = new Set(c.map(A_2 => A_2.sessionId));
      for (let [A_2, h_2] of u) if (!f.has(A_2)) d.push({
        sessionId: A_2,
        mtime: h_2.mtime
      });
    } else A("listSessionSummaries without listSessions: gap-fill skipped; sessions lacking a sidecar will be omitted");
    d.sort((f, A_2) => A_2.mtime - f.mtime);
    let p = $0l(d, s, o),
      m = p.filter(f => f.info === undefined);
    if (m.length > 0) {
      let f = await q0l(e, m, t.dir, n),
        A_2 = new Map(f.map(h => [h.sessionId, h]));
      for (let h of p) if (h.info === undefined) h.info = A_2.get(h.sessionId) ?? null;
    }
    return p.flatMap(f => f.info ? [f.info] : []);
  }
  if (!e.listSessions) throw Error("sessionStore.listSessions is not implemented -- cannot list sessions. Provide a store with a listSessions() method.");
  let a = (await e.listSessions(r)).slice().sort((c, u) => u.mtime - c.mtime),
    l = $0l(a, s, o);
  return q0l(e, l, t.dir, n);
}
async function q0l(e, t, n, r) {
  return (await Promise.allSettled(t.map(async s => {
    let i = await Q0l(e, s.sessionId, n);
    if (!i) return null;
    let a = emt(s.sessionId, X0l(i, s.mtime), r);
    return a ? {
      ...a,
      lastModified: s.mtime
    } : null;
  }))).flatMap((s, i) => {
    let a = t[i];
    if (s.status === "fulfilled") return s.value ? [s.value] : [];
    return [{
      sessionId: a.sessionId,
      summary: "",
      lastModified: a.mtime
    }];
  });
}
function X0l(e, t) {
  let n = Buffer.from(e, "utf-8"),
    r = n.length,
    o = n.subarray(0, Mv).toString("utf-8"),
    s = r > Mv ? n.subarray(r - Mv).toString("utf-8") : o;
  return {
    mtime: t,
    size: r,
    head: o,
    tail: s
  };
}
function Gpm(e) {
  let t = e.trimEnd(),
    n = t.slice(t.lastIndexOf(`
`) + 1);
  try {
    let r = qt(n);
    if (typeof r === "object" && r !== null && "timestamp" in r && typeof r.timestamp === "string") {
      let o = Date.parse(r.timestamp);
      if (!Number.isNaN(o)) return o;
    }
  } catch {}
  return Date.now();
}
async function Q0l(e, t, n) {
  let r = PJ(n),
    o = await e.load({
      projectKey: r,
      sessionId: t
    });
  if (!o || o.length === 0) return null;
  return J0l(o);
}
async function Vpm(e, t, n) {
  if (!WT(t)) return [];
  let r = PJ(n.dir),
    o = await e.load({
      projectKey: r,
      sessionId: t
    });
  if (!o || o.length === 0) return [];
  return vFl(o, {
    limit: n.limit,
    offset: n.offset,
    includeSystemMessages: n.includeSystemMessages
  });
}
async function Kpm(e, t, n) {
  if (!WT(t)) return;
  let r = await Q0l(e, t, n.dir);
  if (!r) return;
  let o = X0l(r, Gpm(r));
  return emt(t, o) ?? undefined;
}
async function zpm(e, t, n, r) {
  if (!WT(t)) throw Error(`Invalid sessionId: ${t}`);
  if (!n.trim()) throw Error("title must be non-empty");
  let o = PJ(r);
  await e.append({
    projectKey: o,
    sessionId: t
  }, [{
    type: "custom-title",
    customTitle: n.trim(),
    sessionId: t,
    uuid: f7n.randomUUID(),
    timestamp: new Date().toISOString()
  }]);
}
async function Ypm(e, t, n, r) {
  if (!WT(t)) throw Error(`Invalid sessionId: ${t}`);
  if (n !== null) {
    let s = O$(n).trim();
    if (!s) throw Error("tag must be non-empty (use null to clear)");
    n = s;
  }
  let o = PJ(r);
  await e.append({
    projectKey: o,
    sessionId: t
  }, [{
    type: "tag",
    tag: n ?? "",
    sessionId: t,
    uuid: f7n.randomUUID(),
    timestamp: new Date().toISOString()
  }]);
}
async function Jpm(e, t, n) {
  if (!WT(t)) throw Error(`Invalid sessionId: ${t}`);
  if (n.upToMessageId && !WT(n.upToMessageId)) throw Error(`Invalid upToMessageId: ${n.upToMessageId}`);
  let r = PJ(n.dir),
    o = await e.load({
      projectKey: r,
      sessionId: t
    });
  if (!o || o.length === 0) throw Error(`Session ${t} not found`);
  let {
    entries: s,
    forkedSessionId: i
  } = FFl(o, t, n);
  return await e.append({
    projectKey: r,
    sessionId: i
  }, s), {
    sessionId: i
  };
}
async function Xpm(e, t, n) {
  if (!WT(t)) return [];
  if (!e.listSubkeys) throw Error("sessionStore.listSubkeys is not implemented -- cannot list subagents. Provide a store with a listSubkeys() method.");
  let r = PJ(n),
    o = await e.listSubkeys({
      projectKey: r,
      sessionId: t
    }),
    s = new Set();
  for (let i of o) {
    if (!i.startsWith("subagents/")) continue;
    let a = i.split("/").at(-1);
    if (a.startsWith("agent-")) s.add(a.slice(6));
  }
  return [...s];
}
async function Qpm(e, t, n, r) {
  if (!WT(t)) return [];
  if (!n) return [];
  let o = PJ(r.dir),
    s = `subagents/agent-${n}`;
  if (e.listSubkeys) {
    let u = await e.listSubkeys({
        projectKey: o,
        sessionId: t
      }),
      d = `agent-${n}`,
      p = u.find(m => m.startsWith("subagents/") && m.split("/").at(-1) === d);
    if (!p) return [];
    s = p;
  }
  let i = await e.load({
    projectKey: o,
    sessionId: t,
    subpath: s
  });
  if (!i || i.length === 0) return [];
  let a = i.findLast(QRo),
    l = typeof a?.toolUseId === "string" ? a.toolUseId : undefined,
    c = i.filter(u => !QRo(u));
  if (c.length === 0) return [];
  return Xxo(Buffer.from(J0l(c)), {
    limit: r.limit,
    offset: r.offset
  }, l);
}
function j0l(e, t) {
  let n = M_.relative(t, e),
    r = n.split(M_.sep);
  if (r[0] === ".." || M_.isAbsolute(n)) return null;
  if (r.length < 2) return null;
  let o = r[0],
    s = r[1];
  if (r.length === 2 && s.endsWith(".jsonl")) return {
    projectKey: o,
    sessionId: s.replace(/\.jsonl$/, "")
  };
  if (r.length >= 4) {
    let i = r.slice(2),
      a = i.length - 1;
    return i[a] = i.at(-1).replace(/\.jsonl$/, ""), {
      projectKey: o,
      sessionId: s,
      subpath: i.join("/")
    };
  }
  return null;
}
var W0l, f7n, A7n, UU, G0l, Hft, M_, V0l, K0l, h7n, kpm;
var eDl = b(() => {
  lh();
  zf();
  gFl();
  TFl();
  bFl();
  EFl();
  W9e();
  tn();
  jxo();
  w6n();
  IFl();
  LFl();
  UFl();
  VFl();
  qe();
  Ct();
  G5();
  VT();
  GRt();
  oBl();
  nQ();
  ESr();
  GRt();
  lBl();
  mBl();
  W0l = require("child_process"), f7n = require("crypto"), A7n = require("fs"), UU = require("fs/promises"), G0l = require("module"), Hft = require("os"), M_ = require("path"), V0l = require("readline"), K0l = require("url"), h7n = x(xi(), 1);
  process.env.NoDefaultCurrentDirectoryInExePath = "1";
  kpm = new Set(["EBUSY", "EMFILE", "ENFILE", "ENOTEMPTY", "EPERM"]);
});

export {Z0l as wBl,resolveSettings,wpm as Nbm,Rpm as Fbm,xpm as Bbm,z0l as EBl,JRo as oDo,XRo as sDo,m7n as iJn,Hpm as $bm,query,startup,getSessionMessages,listSessions,getSessionInfo,renameSession,tagSession,deleteSession,forkSession,importSessionToStore,U0l as fBl,$pm as Qbm,listSubagents,getSubagentMessages,Y0l as CBl,PJ as AJ,J0l as ABl,$0l as hBl,QRo as iDo,Wpm as tEm,q0l as gBl,X0l as RBl,Gpm as nEm,Q0l as vBl,Vpm as rEm,Kpm as oEm,zpm as sEm,Ypm as iEm,Jpm as aEm,Xpm as lEm,Qpm as cEm,j0l as _Bl,W0l as yBl,f7n as aJn,A7n as lJn,UU as sU,G0l as TBl,Hft as zgt,M_ as U_,V0l as SBl,K0l as bBl,h7n as cJn,kpm as Ubm,eDl as kBl};
