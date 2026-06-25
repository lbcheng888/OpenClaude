// @ts-nocheck
import {Za as _l,nt as st} from "../../vendor/m127.ts";
import {setMcpConnectNonBlocking,lt} from "../session/0132_sent.ts";
import {dA as sv,xpe as Epe} from "../../vendor/m436.ts";
import {profileCheckpoint,z9 as x3} from "../session/0243_profileReport.ts";
import {d3e as n9e,u3e as t9e,zA as mx,VO as qF,_it as hot,Dua as wra,ReactRuntime as O0} from "../tools/3238_name.ts";
import {yla as fta} from "../config/3205_ISSUES_EXPLAINER.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {ln as on,vn as Rn} from "../session/0621_length.ts";
import {aS as mS,uee as mee} from "../../vendor/m2762.ts";
import {Ixn as $kn,Bst as Brt,Ust as Frt,qO as CL} from "../mcp/3159_scope.ts";
import {sleep} from "../telemetry/1488_withTimeout.ts";
import {$sa as GQi,Vst as Grt} from "../../vendor/m3165.ts";
import {getMcpServerSignature,dedupClaudeAiMcpServers,suppressedConnectorsEqual,KA as px} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {b} from "../../runtime.ts";
import {dn as sn} from "../config/0137_namespace.ts";
/**
 * Main entry point for connecting regular MCP configs (non-claude.ai servers).
 * Splits configs into always-load (required) and optional groups, sets nonBlocking mode,
 * then returns a {connect} function that orchestrates both groups plus claude.ai connectors.
 */
function $sc(e) {
  let {
      regularMcpConfigs: t,
      claudeaiConfigPromise: n,
      state: r
    } = e,
    o = _l(process.env.MCP_CONNECTION_NONBLOCKING) ? !1 : st(process.env.MCP_CONNECTION_NONBLOCKING) || (e.nonBlocking ?? !1);
  setMcpConnectNonBlocking(o);
  let s = o,
    i = sv(t, u => u.alwaysLoad === !0),
    a = sv(t, u => u.alwaysLoad !== !0),
    l = Object.keys(i).length > 0;
  async function c() {
    profileCheckpoint("before_mcp_connect_user"), profileCheckpoint("before_mcp_connect_connector");
    let u = Promise.all([...(l ? [F1o(!1, () => U1o(i, "regular-required", r), "--mcp-config alwaysLoad servers")] : []), F1o(o, () => U1o(a, "regular", r, s), "--mcp-config servers")]).then(() => profileCheckpoint("after_mcp_connect_user")),
      d = F1o(o, () => n.then(p => L3m({
        claudeaiConfigs: p,
        regularMcpConfigs: t,
        state: r,
        deferConnect: s
      })), "claude.ai connectors").then(() => profileCheckpoint("after_mcp_connect_connector"));
    await Promise.all([u, d]);
  }
  return {
    connect: c
  };
}

/**
 * Initiates connections for a group of MCP server configs.
 * Registers them as "pending" clients in state, then fires off n9e connections.
 * If deferConnect is true, uses setImmediate to defer; otherwise connects synchronously.
 * Returns an array of promises (one per server name) that resolve when each server finishes connecting.
 */
function U1o(e, t, n, r = !1) {
  let o = Object.keys(e);
  if (o.length === 0) return [];
  n.applyMcpUpdate(l => ({
    ...l,
    clients: [...l.clients, ...Object.entries(e).map(([c, u]) => ({
      name: c,
      type: "pending",
      config: u
    }))]
  }));
  let s = new Map(),
    i = o.map(l => new Promise(c => s.set(l, c))),
    a = () => void n9e(l => {
      lZn(n, l), fta(), s.get(l.client.name)?.();
    }, e).catch(l => logForDebugging(`[MCP] ${t} connect error: ${l}`)).finally(() => {
      for (let l of s.values()) l();
      $1o(e, n).catch(l => logForDebugging(`[MCP] ${t} retry error: ${l}`));
    });
  if (r) setImmediate(a);else a();
  return i;
}

/**
 * Applies the result of a single MCP connection attempt to state.
 * If the slot config changed mid-flight (orphaned connect), schedules cleanup instead.
 */
function lZn(e, t) {
  let {
      client: n,
      tools: r,
      commands: o
    } = t,
    s;
  e.applyMcpUpdate(i => {
    let a = i.clients.find(l => l.name === n.name);
    if (!a || !t9e(a.config, n.config)) {
      if (n.type === "connected") on(n.name, a ? "applyConnectionResult: disposing orphaned connect (slot config changed mid-flight)" : "applyConnectionResult: disposing orphaned connect (slot removed mid-flight)"), s = () => {
        n.cleanup().catch(() => {}), mx(n.name, n.config).catch(() => {});
      };
      return i;
    }
    return {
      ...i,
      clients: i.clients.map(l => l.name === n.name ? n : l),
      tools: mS([...i.tools, ...r], "name"),
      commands: mS([...i.commands, ...o], "name")
    };
  }), s?.();
}

/**
 * Retries failed remote MCP server connections using an exponential-like backoff schedule (O3m).
 * Stops early if all failed servers recover. Logs remaining failures after all retries.
 */
async function $1o(e, t) {
  let n = Object.entries(e),
    r = () => n.filter(([s]) => {
      let i = t.getClients().find(a => a.name === s);
      return i !== void 0 && $kn(i);
    });
  if (r().length === 0) return;
  for (let s of O3m) {
    await sleep(s);
    let i = r();
    if (i.length === 0) {
      logForDebugging("[MCP] Retry: all remote servers recovered, stopping");
      return;
    }
    logForDebugging(`[MCP] Retry: ${i.length} transiently-failed remote server(s) after ${s}ms backoff`);
    for (let [a, l] of i) qF.cache.delete(hot(a, l));
    await n9e(a => lZn(t, a), Object.fromEntries(i));
  }
  let o = r();
  if (o.length > 0) logForDebugging(`[MCP] Retry: ${o.length} remote server(s) still failed after all retries: ${o.map(([s]) => s).join(", ")}`);
}

/**
 * Wraps a connect factory with optional nonBlocking behavior and a deadline.
 * If nonBlocking, fires-and-forgets immediately. Otherwise waits up to Usc ms for the config fetch,
 * then waits up to the remaining budget (GQi) for servers to become ready.
 */
async function F1o(e, t, n) {
  if (e) {
    Promise.resolve(t()).catch(() => {}), logForDebugging(`[MCP] ${n} running fully async (nonblocking)`);
    return;
  }
  let r = t(),
    o = Date.now(),
    s;
  if (Array.isArray(r)) s = r;else {
    let c,
      u = await Promise.race([r, new Promise(d => {
        c = setTimeout(p => p("deadline"), Usc, d);
      })]);
    if (clearTimeout(c), u === "deadline") {
      r.catch(() => {}), logForDebugging(`[MCP] ${n} config fetch not ready after ${Usc}ms — proceeding; background connection continues`);
      return;
    }
    s = u;
  }
  let i = GQi(),
    a = Math.max(0, i - (Date.now() - o)),
    l = await wra(s, a);
  if (l > 0) logForDebugging(`[MCP] ${n}: ${l}/${s.length} not ready after ${i}ms — proceeding; background connection continues`);
}

/**
 * Handles claude.ai MCP connector deduplication and connection.
 * Suppresses any "plugin:" servers that duplicate claude.ai connectors (by signature),
 * then deduplicates and connects the remaining claude.ai servers.
 */
async function L3m(e) {
  let {
    claudeaiConfigs: t,
    regularMcpConfigs: n,
    state: r,
    deferConnect: o
  } = e;
  if (Object.keys(t).length > 0) {
    let l = new Set();
    for (let u of Object.values(t)) {
      let d = getMcpServerSignature(u);
      if (d) l.add(d);
    }
    let c = new Set();
    for (let [u, d] of Object.entries(n)) {
      if (!u.startsWith("plugin:")) continue;
      let p = getMcpServerSignature(d);
      if (p && l.has(p)) c.add(u);
    }
    if (c.size > 0) {
      logForDebugging(`[MCP] Lazy dedup: suppressing ${c.size} plugin server(s) that duplicate claude.ai connectors: ${[...c].join(", ")}`);
      for (let u of r.getClients()) {
        if (!c.has(u.name) || u.type !== "connected") continue;
        u.client.onclose = void 0, mx(u.name, u.config).catch(() => {});
      }
      r.applyMcpUpdate(u => {
        let {
          clients: d,
          tools: p,
          commands: m,
          resources: f
        } = u;
        d = d.filter(A => !c.has(A.name)), p = p.filter(A => !A.mcpInfo || !c.has(A.mcpInfo.serverName));
        for (let A of c) m = Brt(m, A), f = Frt(f, A);
        return {
          ...u,
          clients: d,
          tools: p,
          commands: m,
          resources: f
        };
      });
    }
  }
  let s = sv(n, (l, c) => !c.startsWith("plugin:")),
    {
      servers: i,
      suppressed: a
    } = await dedupClaudeAiMcpServers(t, s);
  return r.applyMcpUpdate(l => suppressedConnectorsEqual(l.suppressedClaudeAiConnectors ?? [], a) ? l : {
    ...l,
    suppressedClaudeAiConnectors: a
  }), U1o(i, "claudeai", r, o);
}

// Config fetch deadline (ms) and retry backoff schedule (ms)
var Usc = 1000,
  O3m;
var q1o = b(() => {
  Epe();
  mee();
  lt();
  O0();
  px();
  Grt();
  CL();
  qe();
  sn();
  Rn();
  x3();
  O3m = [500, 1500, 4000];
});
export {$sc as Ifc,U1o as p$o,lZn as brr,$1o as m$o,F1o as d$o,L3m as l7m,Usc as Hfc,O3m as a7m,q1o as f$o};
