// @ts-nocheck
import {oO as Z2,P2r as _1r} from "./2193_kind.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {UOt as q0t,A8r as e3r} from "../../vendor/m2598.ts";
import {ac as Ul} from "../mcp/0733_serverName.ts";
import {isKeybindingCustomizationEnabled as Jy} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function RIi(e, t) {
  pluginMarketplaceByName.set(e, t);
}
function Lmd(e) {
  return pluginMarketplaceByName.get(e);
}
function kIi(e) {
  knownMcpServers.add(e);
}
function yF(e, t, n, r, o) {
  try {
    let s = Mmd(e, t, n);
    if (r) {
      let i = Z2(e);
      if (i === "main" || i === "subagent") {
        if (s.attributionMcpServer = r, o) s.attributionMcpTool = o;
      }
    }
    return s;
  } catch (s) {
    return Ie(s), {};
  }
}
function Mmd(e, t, n) {
  if (!e) return {};
  if (e.startsWith("agent:builtin:")) return {
    attributionAgent: e.slice(14),
    ...registerPluginMarketplace(t)
  };
  if (e.startsWith("agent:custom:")) {
    let r = e.slice(13);
    return {
      attributionAgent: r,
      ...registerPluginMarketplace(t, _1r(r))
    };
  }
  if (e.startsWith("agent:")) return registerPluginMarketplace(t);
  if (Z2(e) === "main" && n) return registerPluginMarketplace(n);
  return {};
}
function registerPluginMarketplace(pluginName, marketplaceName) {
  if (!pluginName) return marketplaceName ? {
    attributionPlugin: marketplaceName
  } : {};
  let n = _1r(pluginName) ?? marketplaceName;
  return {
    attributionSkill: pluginName,
    ...(n && {
      attributionPlugin: n
    })
  };
}
function getPluginMarketplace(pluginName, t) {
  let n = resolveRawAttribution(pluginName, t),
    r = {};
  if (n.attributionAgent !== undefined) {
    r.attributionAgent = computeAttributionEventFields(n.attributionAgent);
    let o = registerKnownMcpServer(t.attributionAgent, n.attributionAgent, HIi);
    if (o !== undefined) r.attributionAgentHash = o;
  }
  if (n.attributionSkill !== undefined) {
    r.attributionSkill = computeAttributionEventFields(n.attributionSkill);
    let o = registerKnownMcpServer(t.attributionSkill, n.attributionSkill, T$);
    if (o !== undefined) r.attributionSkillHash = o;
  }
  if (n.attributionPlugin !== undefined) {
    r.attributionPlugin = computeAttributionEventFields(n.attributionPlugin);
    let o = registerKnownMcpServer(t.attributionPlugin, n.attributionPlugin, T$);
    if (o !== undefined) r.attributionPluginHash = o;
  }
  if (n.attributionMcpServer !== undefined) {
    r.attributionMcpServer = computeAttributionEventFields(n.attributionMcpServer);
    let o = registerKnownMcpServer(t.attributionMcpServer, n.attributionMcpServer, dEn);
    if (o !== undefined) r.attributionMcpServerHash = o;
  }
  if (n.attributionMcpTool !== undefined) {
    r.attributionMcpTool = computeAttributionEventFields(n.attributionMcpTool);
    let o = registerKnownMcpServer(t.attributionMcpTool, n.attributionMcpTool, dEn);
    if (o !== undefined) r.attributionMcpToolHash = o;
  }
  return r;
}
function registerKnownMcpServer(serverName, t, n) {
  if (t !== n || serverName === undefined || serverName === n) return;
  return computeAttributionEventFields(q0t(serverName));
}
function buildAttribution(querySource, spawnedBySkill) {
  let {
      attributionAgent: n,
      attributionSkill: r,
      attributionPlugin: o,
      attributionMcpServer: s,
      attributionMcpTool: i
    } = resolveRawAttribution(querySource, spawnedBySkill),
    a = o ? Lmd(o) : undefined;
  return {
    ...(n && {
      "agent.name": n
    }),
    ...(r && {
      "skill.name": r
    }),
    ...(o && {
      "plugin.name": o
    }),
    ...(a && {
      "marketplace.name": a
    }),
    ...(s && {
      "mcp_server.name": s
    }),
    ...(i && {
      "mcp_tool.name": i
    })
  };
}
function resolveRawAttribution(querySource, spawnedBySkill) {
  try {
    return buildSkillAttribution(querySource, spawnedBySkill);
  } catch (n) {
    return Ie(n), {};
  }
}
function buildSkillAttribution(skillName, defaultPlugin) {
  let {
      attributionAgent: n,
      attributionSkill: r,
      attributionPlugin: o,
      attributionMcpServer: s,
      attributionMcpTool: i
    } = defaultPlugin,
    plugin = {};
  if (s !== undefined) {
    let l = knownMcpServers.has(s);
    if (plugin.attributionMcpServer = l ? Ul(s) : dEn, i !== undefined) plugin.attributionMcpTool = l ? Ul(i) : dEn;
  }
  if (n !== undefined) if (skillName?.startsWith("agent:builtin:")) plugin.attributionAgent = n;else {
    let l = o !== undefined && pluginMarketplaceByName.has(o);
    plugin.attributionAgent = l ? n : HIi;
  }
  if (o !== undefined) {
    if (pluginMarketplaceByName.has(o)) {
      if (plugin.attributionPlugin = o, r !== undefined) plugin.attributionSkill = r;
    } else if (plugin.attributionPlugin = T$, r !== undefined) plugin.attributionSkill = T$;
  } else if (r !== undefined) plugin.attributionSkill = r;
  return plugin;
}
function computeAttributionEventFields(querySource) {
  return Jy(querySource);
}
var pluginMarketplaceByName,
  knownMcpServers,
  HIi = "custom",
  T$ = "third-party",
  dEn = "custom";
var DzH = b(() => {
  wn();
  e3r();
  pluginMarketplaceByName = new Map();
  knownMcpServers = new Set();
});
export {RIi as dNi,Lmd as Hvd,kIi as mNi,yF as JETBRAINS_IDE_NAMES,Mmd as Ivd,registerPluginMarketplace as Lvn,getPluginMarketplace as qOt,registerKnownMcpServer as $Ot,buildAttribution as $nt,resolveRawAttribution as hNi,buildSkillAttribution as xvd,computeAttributionEventFields as Unt,pluginMarketplaceByName as Mvn,knownMcpServers as pNi,HIi as fNi,T$ as e$,dEn as Nvn,DzH as Fhe};
