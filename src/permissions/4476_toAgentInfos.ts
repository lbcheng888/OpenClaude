// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {JS as iS,Jfe as Ufe,ez as RK} from "../../vendor/m2239.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Fnt as Pet,Dvn as qEn} from "../../vendor/m2592.ts";
import {kft as xpt,n6 as N6,VDe as Y0e,WY as iJ,Xq as D6} from "../agent/5220_bigint.ts";
import {OGn as fjn,LGn as Ajn,Z5t as Rqt} from "../../vendor/m4467.ts";
import {p3 as K3} from "../../vendor/m728.ts";
import {Kc as xu,Jm as tA} from "../config/2207_Jm.ts";
import {Ec as zc,dw as ex} from "../../vendor/m2593.ts";
import {fa as Ua,ry as ty} from "../../vendor/m2253.ts";
import {vs as Ws,dm as ef} from "../../vendor/m2256.ts";
import {OUe as NFe,rz as uZ} from "../config/2253_displayName.ts";
import {SUe as EFe,fDt as UHt} from "./2218_surface.ts";
import {dynamicTeamContext as aF,gD as nP,Cp as Om} from "../config/2223_level.ts";
import {PERMISSION_MODES} from "../../vendor/m721.ts";
import {xbn as Y_n,HA as Ev} from "../../vendor/m2219.ts";
import {TeamDeleteToolName as Le,tn as Xt} from "../config/0230_encoding.ts";
import {__ as i_,ix as K0,E0e as OHe} from "../../vendor/m3842.ts";
import {Wi as ta,Hn as wn} from "../../vendor/m100.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kt as Ct,logEvent} from "../../vendor/m132.ts";
import {oCe as bbe,Soe as boe} from "../../vendor/m729.ts";
import {ky as Iy,buildMcpToolName as hc} from "../agent/2238_explicitlyRequested.ts";
import {vn as Rn,Ie as De} from "../session/0621_length.ts";
import {FS as eC} from "../../vendor/m722.ts";
import {h3 as J3} from "../artifact/0736_allow.ts";
import {slowOpTracer as tx,Dwe as Ywe} from "../telemetry/2606_skill_name.ts";
import {Ycl as crl} from "../../vendor/m4468.ts";
import {nVn as Mjn,vft as wpt} from "../config/4475_getCoordinatorAgents.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {Le as fromEnum} from "../../vendor/m5.ts";
var Rpt = {};
isFullscreenWithTTY(Rpt, {
  toAgentInfos: () => toAgentInfos,
  parseAgentsFromJson: () => parseAgentsFromJson,
  parseAgentFromMarkdown: () => parseAgentFromMarkdown,
  parseAgentFromJson: () => parseAgentFromJson,
  normalizeAgentType: () => normalizeAgentType,
  isPluginAgent: () => isPluginAgent,
  isCustomAgent: () => isCustomAgent,
  isBuiltInAgent: () => isBuiltInAgent,
  hasRequiredMcpServers: () => hasRequiredMcpServers,
  getAgentDefinitionsWithOverrides: () => getAgentDefinitionsWithOverrides,
  getActiveAgentsFromList: () => getActiveAgentsFromList,
  filterAgentsByMcpRequirements: () => filterAgentsByMcpRequirements,
  clearAgentDefinitionsCache: () => clearAgentDefinitionsCache,
  agentMcpSpecsToScopedConfigs: () => agentMcpSpecsToScopedConfigs
});
function agentMcpSpecsToScopedConfigs(e) {
  if (!e.mcpServers?.length) return {};
  if (iS("mcp") && !Ufe(e.source)) return logForDebugging(`[Agent: ${e.agentType}] Skipping frontmatter MCP servers: strictPluginOnlyCustomization locks MCP to plugin-only (agent source: ${e.source})`), {};
  let t = {};
  for (let n of e.mcpServers) {
    if (typeof n === "string") continue;
    let r = Object.entries(n);
    if (r.length !== 1) {
      logForDebugging(`[Agent: ${e.agentType}] Invalid MCP server spec: expected exactly one key`, {
        level: "warn"
      });
      continue;
    }
    let [o, s] = r[0];
    if (Pet(o)) {
      logForDebugging(`[Agent: ${e.agentType}] Skipping reserved MCP server name '${o}' in frontmatter`, {
        level: "warn"
      });
      continue;
    }
    if (s.type === "sse-ide" || s.type === "ws-ide") {
      logForDebugging(`[Agent: ${e.agentType}] Skipping internal-only MCP transport '${s.type}' for '${o}' in frontmatter`, {
        level: "warn"
      });
      continue;
    }
    t[o] = {
      ...s,
      scope: "agent"
    };
  }
  return t;
}
function toAgentInfos(e) {
  return e.map(t => ({
    name: t.agentType,
    description: t.whenToUse,
    model: t.model === "inherit" ? void 0 : t.model
  }));
}
function isBuiltInAgent(e) {
  return e.source === "built-in";
}
function isCustomAgent(e) {
  return e.source !== "built-in" && e.source !== "plugin";
}
function isPluginAgent(e) {
  return e.source === "plugin";
}
function getActiveAgentsFromList(e) {
  let t = e.filter(u => u.source === "built-in"),
    n = e.filter(u => u.source === "plugin"),
    r = e.filter(u => u.source === "userSettings"),
    s = [...e.filter(u => u.source === "projectSettings" && u.fromAdditionalDirectory), ...e.filter(u => u.source === "projectSettings" && !u.fromAdditionalDirectory).sort(xpt)],
    i = e.filter(u => u.source === "policySettings"),
    a = e.filter(u => u.source === "flagSettings"),
    l = [t, n, r, s, a, i],
    c = new Map();
  for (let u of l) for (let d of u) c.set(d.agentType, d);
  return Array.from(c.values()).sort((u, d) => u.agentType.localeCompare(d.agentType));
}
function hasRequiredMcpServers(e, t) {
  if (!e.requiredMcpServers || e.requiredMcpServers.length === 0) return !0;
  return e.requiredMcpServers.every(n => t.some(r => r.toLowerCase().includes(n.toLowerCase())));
}
function filterAgentsByMcpRequirements(e, t) {
  return e.filter(n => hasRequiredMcpServers(n, t));
}
function clearAgentDefinitionsCache() {
  getAgentDefinitionsWithOverrides.cache.clear?.(), N6.cache?.clear?.(), fjn();
}
function u6p(e) {
  let {
    name: t,
    description: n
  } = e;
  if (!t || typeof t !== "string") return 'Missing required "name" field in frontmatter';
  if (t.startsWith("-")) return 'Invalid "name": names must not start with "-"';
  if (!n || typeof n !== "string") return 'Missing required "description" field in frontmatter';
  return "Unknown parsing error";
}
function d6p(e, t) {
  if (!e.hooks) return;
  let n = K3().safeParse(e.hooks);
  if (!n.success) {
    logForDebugging(`Invalid hooks in agent '${t}': ${n.error.message}`);
    return;
  }
  return n.data;
}
function parseAgentFromJson(e, t, n = "flagSettings") {
  try {
    if (e.startsWith("-")) return logForDebugging(`Agent '${e}' has an invalid name: names must not start with '-'`, {
      level: "error"
    }), null;
    let r = Srl().parse(t),
      o = Y0e(r.tools);
    if (xu() && r.memory && o !== void 0) {
      let l = new Set(o);
      for (let c of [zc, Ua, Ws]) if (!l.has(c)) o = [...o, c];
    }
    let s = r.disallowedTools !== void 0 ? Y0e(r.disallowedTools) : void 0,
      i = r.prompt;
    return {
      agentType: e,
      whenToUse: r.description,
      ...(o !== void 0 && {
        tools: o
      }),
      ...(s !== void 0 && {
        disallowedTools: s
      }),
      getSystemPrompt: () => {
        if (xu() && r.memory) return i + `

` + NFe(e, r.memory);
        return i;
      },
      source: n,
      ...(r.model && {
        model: r.model
      }),
      ...(r.effort !== void 0 && {
        effort: r.effort
      }),
      ...(r.permissionMode && {
        permissionMode: r.permissionMode
      }),
      ...(r.mcpServers && r.mcpServers.length > 0 && {
        mcpServers: r.mcpServers
      }),
      ...(r.hooks && {
        hooks: r.hooks
      }),
      ...(r.maxTurns !== void 0 && {
        maxTurns: r.maxTurns
      }),
      ...(r.skills && r.skills.length > 0 && {
        skills: r.skills
      }),
      ...(r.initialPrompt && {
        initialPrompt: r.initialPrompt
      }),
      ...(r.background && {
        background: r.background
      }),
      ...(r.memory && {
        memory: r.memory
      }),
      ...(r.isolation && {
        isolation: r.isolation
      })
    };
  } catch (r) {
    let o = r instanceof Error ? r.message : String(r);
    return logForDebugging(`Error parsing agent '${e}' from JSON: ${o}`, {
      level: "error"
    }), null;
  }
}
function parseAgentsFromJson(e, t = "flagSettings") {
  try {
    let n = l6p().parse(e);
    return Object.entries(n).map(([r, o]) => parseAgentFromJson(r, o, t)).filter(r => r !== null);
  } catch (n) {
    let r = n instanceof Error ? n.message : String(n);
    return logForDebugging(`Error parsing agents from JSON: ${r}`, {
      level: "error"
    }), [];
  }
}
function parseAgentFromMarkdown(e, t, n, r, o) {
  try {
    let {
      name: s,
      description: i
    } = n;
    if (!s || typeof s !== "string") return null;
    if (s.startsWith("-")) return logForDebugging(`Agent file ${e} has invalid name '${s}': names must not start with '-'`, {
      level: "error"
    }), null;
    if (EFe("agent", n), !i || typeof i !== "string") return logForDebugging(`Agent file ${e} is missing required 'description' in frontmatter`), null;
    i = i.replaceAll("\\n", `
`);
    let {
        color: a,
        model: l
      } = n,
      c;
    if (typeof l === "string" && l.trim().length > 0) {
      let G = l.trim();
      c = G.toLowerCase() === "inherit" ? "inherit" : G;
    }
    let u = n.background;
    if (u !== void 0 && u !== "true" && u !== "false" && u !== !0 && u !== !1) logForDebugging(`Agent file ${e} has invalid background value '${u}'. Must be 'true', 'false', or omitted.`);
    let d = u === "true" || u === !0 ? !0 : void 0,
      p = ["user", "project", "local"],
      m = n.memory,
      f;
    if (m !== void 0) if (p.includes(m)) f = m;else logForDebugging(`Agent file ${e} has invalid memory value '${m}'. Valid options: ${p.join(", ")}`);
    let A = ["worktree", "remote"],
      h = n.isolation,
      g;
    if (h !== void 0) if (A.includes(h)) g = h;else logForDebugging(`Agent file ${e} has invalid isolation value '${h}'. Valid options: ${A.join(", ")}`);
    let _ = n.effort,
      y = _ !== void 0 ? aF(_) : void 0;
    if (_ !== void 0 && y === void 0) logForDebugging(`Agent file ${e} has invalid effort '${_}'. Valid options: ${nP.join(", ")} or an integer`);
    let T = n.permissionMode,
      S = T && PERMISSION_MODES.includes(T);
    if (T && !S) {
      let G = `Agent file ${e} has invalid permissionMode '${T}'. Valid options: ${PERMISSION_MODES.join(", ")}`;
      logForDebugging(G);
    }
    let v = n.maxTurns,
      R = Y_n(v);
    if (v !== void 0 && R === void 0) logForDebugging(`Agent file ${e} has invalid maxTurns '${v}'. Must be a positive integer.`);
    let k = yrl.basename(e, ".md"),
      x = Y0e(n.tools);
    if (xu() && f && x !== void 0) {
      let G = new Set(x);
      for (let V of [zc, Ua, Ws]) if (!G.has(V)) x = [...x, V];
    }
    let H = n.disallowedTools,
      I = H !== void 0 ? Y0e(H) : void 0,
      P = iJ(n.skills),
      L = n.initialPrompt,
      D = typeof L === "string" && L.trim() ? L : void 0,
      N = n.mcpServers,
      O;
    if (Array.isArray(N)) O = N.map(G => {
      let V = Trl().safeParse(G);
      if (V.success) return V.data;
      return logForDebugging(`Agent file ${e} has invalid mcpServers item: ${Le(G)}. Error: ${V.error.message}`), null;
    }).filter(G => G !== null);
    let $ = d6p(n, s),
      U = r.trim();
    return {
      baseDir: t,
      agentType: s,
      whenToUse: i,
      ...(x !== void 0 && {
        tools: x
      }),
      ...(I !== void 0 && {
        disallowedTools: I
      }),
      ...(P !== void 0 && {
        skills: P
      }),
      ...(D !== void 0 && {
        initialPrompt: D
      }),
      ...(O !== void 0 && O.length > 0 && {
        mcpServers: O
      }),
      ...($ !== void 0 && {
        hooks: $
      }),
      getSystemPrompt: () => {
        if (xu() && f) {
          let G = NFe(s, f);
          return U + `

` + G;
        }
        return U;
      },
      source: o,
      filename: k,
      ...(a && typeof a === "string" && i_.includes(a) && {
        color: a
      }),
      ...(c !== void 0 && {
        model: c
      }),
      ...(y !== void 0 && {
        effort: y
      }),
      ...(S && {
        permissionMode: T
      }),
      ...(R !== void 0 && {
        maxTurns: R
      }),
      ...(d && {
        background: d
      }),
      ...(f && {
        memory: f
      }),
      ...(g && {
        isolation: g
      })
    };
  } catch (s) {
    let i = s instanceof Error ? s.message : String(s);
    return logForDebugging(`Error parsing agent from ${e}: ${i}`, {
      level: "error"
    }), null;
  }
}
function normalizeAgentType(e) {
  return e.normalize("NFKC").toLowerCase().replace(/[\p{White_Space}\p{Pd}_]+/gu, "");
}
var yrl, Trl, Srl, l6p, getAgentDefinitionsWithOverrides;
var scrubPathsConfig = b(() => {
  ta();
  Xr();
  tA();
  UHt();
  Ct();
  qEn();
  bbe();
  Iy();
  qe();
  Om();
  Ev();
  Rn();
  D6();
  eC();
  Ajn();
  RK();
  J3();
  Xt();
  tx();
  ty();
  ef();
  ex();
  K0();
  uZ();
  crl();
  Mjn();
  yrl = require("path"), Trl = we(() => E.union([E.string(), E.record(E.string(), boe())]));
  Srl = we(() => E.object({
    description: E.string().min(1, "Description cannot be empty"),
    tools: E.array(E.string()).optional(),
    disallowedTools: E.array(E.string()).optional(),
    prompt: E.string().min(1, "Prompt cannot be empty"),
    model: E.string().trim().min(1, "Model cannot be empty").transform(e => e.toLowerCase() === "inherit" ? "inherit" : e).optional(),
    effort: E.union([E.enum(nP), E.number().int()]).optional(),
    permissionMode: E.enum(PERMISSION_MODES).optional(),
    mcpServers: E.array(Trl()).optional(),
    hooks: K3().optional(),
    maxTurns: E.number().int().positive().optional(),
    skills: E.array(E.string()).optional(),
    initialPrompt: E.string().optional(),
    memory: E.enum(["user", "project", "local"]).optional(),
    background: E.boolean().optional(),
    isolation: E.enum(["worktree", "remote"]).optional()
  })), l6p = we(() => E.record(E.string(), Srl()));
  getAgentDefinitionsWithOverrides = wn(async e => {
    if (hc("agents")) {
      let t = wpt();
      return {
        activeAgents: t,
        allAgents: t
      };
    }
    try {
      let t = await N6("agents", e),
        n = [],
        r = t.map(c => {
          let {
              filePath: u,
              baseDir: d,
              frontmatter: p,
              content: m,
              source: f
            } = c,
            A = parseAgentFromMarkdown(u, d, p, m, f);
          if (!A) {
            if (!p.name) return null;
            let h = u6p(p);
            return n.push({
              path: u,
              error: h
            }), logForDebugging(`Failed to parse agent from ${u}: ${h}`), logEvent("tengu_agent_parse_error", {
              error: h,
              location: fromEnum(f)
            }), null;
          }
          if (c.fromAdditionalDirectory) A.fromAdditionalDirectory = !0;
          return A;
        }).filter(c => c !== null),
        s = await Rqt().catch(c => (De(c), [])),
        a = [...wpt(), ...s, ...r],
        l = getActiveAgentsFromList(a);
      Ywe("agent", [...a, ...l].map(c => ({
        name: c.agentType,
        source: c.source
      })), {
        resolves: !0
      });
      for (let c of l) if (c.color) OHe(c.agentType, c.color);
      return {
        activeAgents: l,
        allAgents: a,
        failedFiles: n.length > 0 ? n : void 0
      };
    } catch (t) {
      let n = t instanceof Error ? t.message : String(t);
      logForDebugging(`Error loading agent definitions: ${n}`), De(t);
      let r = wpt();
      return {
        activeAgents: r,
        allAgents: r,
        failedFiles: [{
          path: "unknown",
          error: n
        }]
      };
    }
  });
});
export {Rpt as wft,agentMcpSpecsToScopedConfigs,toAgentInfos,isBuiltInAgent,isCustomAgent,isPluginAgent,getActiveAgentsFromList,hasRequiredMcpServers,filterAgentsByMcpRequirements,clearAgentDefinitionsCache,u6p as jzp,d6p as Yzp,parseAgentFromJson,parseAgentsFromJson,parseAgentFromMarkdown,normalizeAgentType,yrl as sul,Trl as iul,Srl as aul,l6p as Kzp,getAgentDefinitionsWithOverrides,scrubPathsConfig as kg};
