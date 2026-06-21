// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {Se,ds as ls,bt as St} from "../../vendor/m195.ts";
import {qF as MF,_ot as Qrt,O0 as D0} from "../tools/3222_name.ts";
import {HHn as Vkn,EKr as x7r} from "../../vendor/m3190.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {logEventAsync as Zy,Ct} from "../../vendor/m131.ts";
import {TA as vA,memoizeThunk as EH,ln as cn} from "../telemetry/0594_feature_name.ts";
import {Lx as kx,hPe as QDe,T8e as e8e,Fs as Ls,qU as DU} from "../../vendor/m5131.ts";
import {pYn as vzn,dYn as Czn} from "../config/5230_setup.ts";
import {O2l as uUl,P2l as cUl} from "../tools/5231_startMCPServer.ts";
import {getMcpConfigByName as gq,removeMcpConfig as nkn,readRawMcpJsonServersFromCwd as prt,getMcpConfigsByScope as AE,getAllMcpConfigs as z5,doesEnterpriseMcpConfigExist as mL,isMcpServerAllowedByPolicy as Tee,addMcpConfig as uhe,isMcpServerDisabled as L0,px as cx} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {Zkn as Akn,$Qi as HXi,tHn as gkn,fMt as jLt,AMt as WLt,Bae as wae} from "../config/3151_error.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Urt as brt,dMt as ULt,l9 as z$,Nrt as yrt,CL as fL} from "../mcp/3149_scope.ts";
import {fromEnum as Ue,Qe} from "../../vendor/m5.ts";
import {getCurrentProjectConfig as Py,getGlobalConfig as vt,deleteCurrentProjectConfigFields as I5t,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
import {dy,_He as tHe} from "../../vendor/m3752.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {epe as gX,tv as QC} from "../../vendor/m232.ts";
import {GJ as kJ,AWt as U5t} from "../../vendor/m5220.ts";
import {Jpt as wpt,t5n as A8n} from "../../vendor/m4575.ts";
import {gracefulShutdown as Pi,flushAnalyticsSinks as r9e,aDn as b0n,ym as Km} from "../config/3332_flushAnalyticsSinks.ts";
import {B5 as T5,lDt as $0t} from "../../vendor/m2584.ts";
import {iS as VS,RK as pK} from "../../vendor/m2231.ts";
import {Fa,Pd as Pp} from "../../vendor/m701.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {B2l as fUl,N2l as mUl} from "../../vendor/m5231.ts";
import {render as p5,ze as Je} from "../../vendor/m2452.ts";
import {AppStateProvider as _E,Jq as Nq} from "../../vendor/m3354.ts";
import {KeybindingSetup as bC,xW as uW} from "../../vendor/m3346.ts";
import {i2l as MFl,a2l as NFl} from "../../vendor/m5219.ts";
import {getSettingsForSource as Cn,getLocalSettingsValidationErrors as gbe,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {sDo as ZIo,iDo as e0o} from "../../vendor/m5224.ts";
import {Cbe as lbe,scalar as ZI} from "../mcp/0728_serverName.ts";
import {ONn as J1n,kat as cat} from "../../vendor/m3763.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var mcpCliHandlerExports = {};
pt(mcpCliHandlerExports, {
  mcpServeHandler: () => mcpServeHandler_2,
  mcpResetChoicesHandler: () => mcpResetChoicesHandler,
  mcpRemoveHandler: () => mcpRemoveHandler,
  mcpListHandler: () => mcpListHandler_2,
  mcpGetHandler: () => mcpGetHandler,
  mcpAddJsonHandler: () => mcpAddJsonHandler,
  mcpAddFromDesktopHandler: () => mcpAddFromDesktopHandler
});
function writeMcpServerToConfig(H) {
  let t = H?.issues;
  if (Array.isArray(t) && t.length > 0) {
    let n = t[0],
      r = typeof n.message === "string" ? n.message : Se(H),
      o = Array.isArray(n.path) && n.path.length > 0 ? ` (at ${n.path.join(".")})` : "",
      s = t.length > 1 ? ` (+${t.length - 1} more)` : "";
    return r + o + s;
  }
  return Se(H).replace(/\s+/g, " ").trim();
}
async function mcpServeHandler(e, t) {
  try {
    let n = await MF(e, t);
    if (n.type === "connected") {
      if (n.capabilities.tools) try {
        await n.client.listTools(undefined, {
          timeout: 5000
        });
      } catch (r) {
        if (Vkn(r)) return {
          status: "! Needs authentication"
        };
        return {
          status: "! Connected \xB7 tools fetch failed",
          issue: writeMcpServerToConfig(r)
        };
      }
      return {
        status: `${Ze.tick} Connected`
      };
    } else if (n.type === "needs-auth") return {
      status: "! Needs authentication"
    };else return {
      status: `${Ze.cross} Failed to connect`
    };
  } catch (n) {
    return {
      status: `${Ze.cross} Connection error`
    };
  }
}
async function mcpServeHandler_2({
  debug: e,
  verbose: t
}) {
  let n = ReactRuntime.cwd();
  await Zy("tengu_mcp_start", {});
  try {
    await serverHealthCache.stat(n);
  } catch (r) {
    if (ls(r)) return await vA("cli_mcp_serve", "cli_mcp_serve_cwd_missing"), kx(`Error: Directory ${n} does not exist`);
    throw r;
  }
  try {
    let {
      setup: r
    } = await Promise.resolve().then(() => (vzn(), Czn));
    await r(n, "default", false, false, undefined, false);
    let {
      startMCPServer: o
    } = await Promise.resolve().then(() => (uUl(), cUl));
    await o(n, e ?? false, t ?? false), await EH("cli_mcp_serve");
  } catch (r) {
    return await vA("cli_mcp_serve", "cli_mcp_serve_start_failed"), kx(`Error: Failed to start MCP server: ${r}`);
  }
}
async function mcpRemoveHandler(H, t, n) {
  let r = gq(t),
    o = async () => {
      if (r && (r.type === "sse" || r.type === "http")) try {
        await Akn(t, r), await HXi(t, r);
      } catch (a) {
        v(`mcp remove: secure-storage cleanup for "${t}" failed: ${Se(a)}`, {
          level: "warn"
        });
      }
    },
    s;
  try {
    if (n.scope) {
      let a = brt(n.scope);
      await Zy("tengu_mcp_delete", {
        name: t,
        scope: Ue(a)
      }), await nkn(t, a), await o(), s = a;
    } else {
      let a = Py(),
        l = vt(),
        c = await prt().catch(() => ({})),
        u = Object.hasOwn(c, t),
        d = [];
      if (a.mcpServers?.[t]) d.push("local");
      if (u) d.push("project");
      if (l.mcpServers?.[t]) d.push("user");
      if (d.length === 0) {
        let p = [...Object.keys(a.mcpServers ?? {}), ...Object.keys(c), ...Object.keys(l.mcpServers ?? {})],
          m = ps(p).sort();
        return await vA("cli_mcp_remove", "cli_mcp_remove_not_found"), kx(m.length > 0 ? `No MCP server found with name: "${t}". Configured servers: ${m.join(", ")}` : `No MCP server found with name: "${t}". No MCP servers are configured.`);
      } else if (d.length === 1) {
        let p = d[0];
        await Zy("tengu_mcp_delete", {
          name: t,
          scope: Ue(p)
        }), await nkn(t, p), await o(), s = p;
      } else return process.stderr.write(`MCP server "${t}" exists in multiple scopes:
`), d.forEach(p => {
        process.stderr.write(`  - ${ULt(p)} (${z$(p)})
`);
      }), process.stderr.write(`
To remove from a specific scope, use:
`), d.forEach(p => {
        process.stderr.write(`  claude mcp remove "${t}" -s ${p}
`);
      }), await vA("cli_mcp_remove", "cli_mcp_remove_ambiguous_scope"), kx();
    }
  } catch (a) {
    return await vA("cli_mcp_remove", "cli_mcp_remove_failed"), kx(Se(a));
  }
  await EH("cli_mcp_remove");
  let i = n.scope ? t : `"${t}"`;
  H.render(mcpListStatusLabels.default.createElement(dy, null, mcpListStatusLabels.default.createElement(B, {
    flexDirection: "column"
  }, mcpListStatusLabels.default.createElement(w, null, "Removed MCP server ", i, " from ", s, " config"), mcpListStatusLabels.default.createElement(w, null, "File modified: ", z$(s))))), await H.waitUntilExit();
}
function McpServerStatusRow(e) {
  let t = new Map(),
    n = {};
  for (let [r, o] of Object.entries(e)) if (o.scope === "local" || o.scope === "user" || o.scope === "project" || o.scope === "enterprise") {
    let s = t.get(o.scope);
    if (!s) s = AE(o.scope, {
      expandVars: false
    }).servers, t.set(o.scope, s);
    n[r] = s[r] ?? o;
  } else n[r] = gX(o);
  return n;
}
function McpServerList({
  name: e,
  server: t,
  status: n
}) {
  if (t.type === "sse") return `${e}: ${t.url} (SSE) - ${n}`;
  if (t.type === "http") return `${e}: ${t.url} (HTTP) - ${n}`;
  if (t.type === "claudeai-proxy") return `${e}: ${t.url} - ${n}`;
  if (!t.type || t.type === "stdio") {
    let r = Array.isArray(t.args) ? t.args : [];
    return `${e}: ${t.command} ${r.join(" ")} - ${n}`;
  }
  return null;
}
function sortMcpServerEntries(H) {
  let t = reactCompilerCache.c(10),
    {
      promise: n
    } = H,
    r = mcpListStatusLabels.use(n),
    o,
    s,
    i;
  if (t[0] !== r) {
    let c = r.map(McpServerList).filter(mcpListHandler);
    s = dy, o = w, i = c.join(`
`), t[0] = r, t[1] = o, t[2] = s, t[3] = i;
  } else o = t[1], s = t[2], i = t[3];
  let a;
  if (t[4] !== o || t[5] !== i) a = mcpListStatusLabels.default.createElement(o, null, i), t[4] = o, t[5] = i, t[6] = a;else a = t[6];
  let l;
  if (t[7] !== s || t[8] !== a) l = mcpListStatusLabels.default.createElement(s, null, a), t[7] = s, t[8] = a, t[9] = l;else l = t[9];
  return l;
}
function mcpListHandler(H) {
  return H !== null;
}
async function mcpListHandler_2(H) {
  await Zy("tengu_mcp_list", {}), await kJ({
    hasDynamicMcpConfig: false
  });
  let {
    servers: t,
    pendingProjectServers: n
  } = await z5({
    includePendingProjectServers: true
  });
  await EH("cli_mcp_list");
  let r = mcpListStatusLabels.default.createElement(wpt, null);
  if (Object.keys(t).length === 0) {
    H.render(mcpListStatusLabels.default.createElement(dy, null, mcpListStatusLabels.default.createElement(B, {
      flexDirection: "column"
    }, mcpListStatusLabels.default.createElement(w, null, "No MCP servers configured. Use `claude mcp add` to add a server."), r))), await H.waitUntilExit(), await Pi(0);
    return;
  }
  let o = McpServerStatusRow(t),
    s = T5(Object.entries(t), async ([i, a]) => ({
      name: i,
      server: o[i] ?? a,
      status: n.has(i) ? mcpScopeLabels : (await mcpServeHandler(i, a)).status
    }), {
      concurrency: Qrt()
    });
  H.render(mcpListStatusLabels.default.createElement(mcpListStatusLabels.Suspense, {
    fallback: mcpListStatusLabels.default.createElement(w, null, "Checking MCP server health\u2026", `

`)
  }, mcpListStatusLabels.default.createElement(B, {
    flexDirection: "column"
  }, mcpListStatusLabels.default.createElement(sortMcpServerEntries, {
    promise: s
  }), r))), await H.waitUntilExit(), await Pi(0);
}
async function mcpGetHandler(H, _) {
  await Zy("tengu_mcp_get", {
    name: _
  }), await kJ({
    hasDynamicMcpConfig: false
  });
  let {
      servers: n,
      pendingProjectServers: r
    } = await z5({
      includePendingProjectServers: true
    }),
    o = n[_] ?? null,
    s = r.has(_) ? "pending" : null;
  if (!o) {
    let c = AE("project").servers[_];
    if (c && !VS("mcp") && !mL() && Tee(_, c) && yrt(_) === "rejected") o = c, s = "rejected";
  }
  if (!o) {
    let c = Object.keys(n).sort();
    return await vA("cli_mcp_get", "cli_mcp_get_not_found"), kx(c.length > 0 ? `No MCP server found with name: "${_}". Configured servers: ${c.join(", ")}` : `No MCP server found with name: "${_}". No MCP servers are configured.`);
  }
  let i = s === "pending" ? {
      status: mcpScopeLabels
    } : s === "rejected" ? {
      status: initMcpServeHandlers
    } : await mcpServeHandler(_, o),
    a = McpServerStatusRow({
      [_]: o
    })[_] ?? o,
    l = [`${_}:`, `  Scope: ${ULt(o.scope)}`, `  Status: ${i.status}`, ...(i.issue ? [`  Issue: ${i.issue}`] : [])];
  if ((o.type === "sse" || o.type === "http") && (a.type === "sse" || a.type === "http")) {
    if (l.push(`  Type: ${o.type}`), l.push(`  URL: ${a.url}`), a.headers) {
      l.push("  Headers:");
      for (let [c, u] of Object.entries(a.headers)) l.push(`    ${c}: ${u}`);
    }
    if (o.oauth?.clientId || o.oauth?.callbackPort) {
      let c = [];
      if (o.oauth.clientId) {
        if (c.push("client_id configured"), (await gkn(_, o))?.clientSecret) c.push("client_secret configured");
      }
      if (o.oauth.callbackPort) c.push(`callback_port ${o.oauth.callbackPort}`);
      l.push(`  OAuth: ${c.join(", ")}`);
    }
  } else if (o.type === "stdio" && a.type === "stdio") {
    l.push("  Type: stdio"), l.push(`  Command: ${a.command}`);
    let c = Array.isArray(a.args) ? a.args : [];
    if (l.push(`  Args: ${c.join(" ")}`), a.env) {
      l.push("  Environment:");
      for (let [u, d] of Object.entries(a.env)) l.push(`    ${u}=${d}`);
    }
  }
  if (o.timeout !== undefined) l.push(`  Timeout: ${o.timeout}ms${o.timeout < 1000 ? " (ignored: below 1000ms minimum)" : ""}`);
  l.push(""), l.push(`To remove this server, run: claude mcp remove "${_}" -s ${o.scope}`), await EH("cli_mcp_get"), H.render(mcpListStatusLabels.default.createElement(dy, null, mcpListStatusLabels.default.createElement(w, null, l.join(`
`)))), await H.waitUntilExit(), await Pi(0);
}
async function mcpAddJsonHandler(H, t, n, r) {
  let o, s;
  try {
    o = brt(r.scope);
    let i = Fa(n),
      l = r.clientSecret && i && typeof i === "object" && "type" in i && (i.type === "sse" || i.type === "http" || i.type === "streamable-http") && "url" in i && typeof i.url === "string" && "oauth" in i && i.oauth && typeof i.oauth === "object" && "clientId" in i.oauth ? await jLt() : undefined;
    if (await uhe(t, i, o), s = i && typeof i === "object" && "type" in i ? String(i.type || "stdio") : "stdio", s === "streamable-http") s = "http";
    if (l && i && typeof i === "object" && "type" in i && (i.type === "sse" || i.type === "http" || i.type === "streamable-http") && "url" in i && typeof i.url === "string") {
      let u = await WLt(t, {
        type: i.type === "sse" ? "sse" : "http",
        url: i.url
      }, l);
      if (!u.success) process.stderr.write(`Server added, but the client secret could not be stored${u.warning ? ` (${u.warning})` : ""}. Re-run with --client-secret once secure storage is available.
`);
    }
    await Zy("tengu_mcp_add", {
      scope: Ue(o),
      source: Qe("json"),
      type: s
    });
  } catch (i) {
    return await vA("cli_mcp_add_json", "cli_mcp_add_json_failed"), kx(Se(i));
  }
  await EH("cli_mcp_add_json"), H.render(mcpListStatusLabels.default.createElement(dy, null, mcpListStatusLabels.default.createElement(w, null, "Added ", s, " MCP server ", t, " to ", o, " config"))), await H.waitUntilExit();
}
async function mcpAddFromDesktopHandler(H) {
  try {
    let t = brt(H.scope),
      n = Yt();
    await Zy("tengu_mcp_add", {
      scope: Ue(t),
      platform: Ue(n),
      source: Qe("desktop")
    });
    let {
        readClaudeDesktopMcpServers: r
      } = await Promise.resolve().then(() => (fUl(), mUl)),
      o = await r();
    if (Object.keys(o).length === 0) return await EH("cli_mcp_add_from_desktop"), QDe("No MCP servers found in Claude Desktop configuration or configuration file does not exist.");
    await EH("cli_mcp_add_from_desktop");
    let {
      unmount: s
    } = await p5(mcpListStatusLabels.default.createElement(_E, null, mcpListStatusLabels.default.createElement(bC, null, mcpListStatusLabels.default.createElement(MFl, {
      servers: o,
      scope: t,
      onDone: () => {
        s();
      }
    }))), {
      exitOnCtrlC: true,
      patchConsole: false
    });
  } catch (t) {
    return await vA("cli_mcp_add_from_desktop", "cli_mcp_add_from_desktop_failed"), kx(Se(t));
  }
}
async function mcpResetChoicesHandler(H) {
  if (await Zy("tengu_mcp_reset_mcpjson_choices", {}), !I5t(["enabledMcpjsonServers", "disabledMcpjsonServers", "enableAllProjectMcpServers"])) return e8e("Error: Failed to reset project choices: legacy approvals in ~/.claude.json could not be cleared (is the file writable?). Nothing was changed."), await vA("cli_mcp_reset_choices", "cli_mcp_reset_choices_projectconfig_delete_failed"), await r9e(), Ls();
  let n = Cn("localSettings");
  if (n ? n.enabledMcpjsonServers !== undefined || n.disabledMcpjsonServers !== undefined || n.enableAllProjectMcpServers !== undefined : gbe().length > 0) {
    if (n !== null && gbe().length > 0) return e8e("Error: Failed to reset project choices: settings.local.json carries validation warnings, and rewriting it would delete the warned entries \u2014 run /doctor and fix them, then re-run (legacy approvals in ~/.claude.json were cleared; local settings were not)"), await vA("cli_mcp_reset_choices", "cli_mcp_reset_choices_settings_warnings_blocked"), await r9e(), Ls();
    let {
      error: s
    } = ao("localSettings", {
      enabledMcpjsonServers: undefined,
      disabledMcpjsonServers: undefined,
      enableAllProjectMcpServers: undefined
    });
    if (s) return e8e(`Error: Failed to reset project choices: ${s.message} (legacy approvals in ~/.claude.json were cleared; local settings were not)`), await vA("cli_mcp_reset_choices", "cli_mcp_reset_choices_settings_write_failed"), await r9e(), Ls();
  }
  await EH("cli_mcp_reset_choices");
  let o = null;
  try {
    let s = VS("mcp");
    if (!mL()) {
      let {
          serverNames: i,
          pluginServerNames: a,
          rootServers: l
        } = await ZIo(),
        c = m => lbe(m, a.has(m)),
        u = [],
        d = [],
        p = 0;
      for (let m of i) {
        if (s && !a.has(m)) continue;
        let f = yrt(m);
        if (f === "approved") {
          if (L0(m)) continue;
          let A = l[m];
          if (A && !Tee(m, A)) continue;
          u.push(c(m));
        } else if (f === "rejected") d.push(c(m));else p++;
      }
      o = {
        autoApprovedServers: u,
        stillRejectedServers: d,
        pendingCount: p,
        gatingErrors: J1n().length
      };
    }
  } catch (s) {
    v(`mcp reset-project-choices: post-reset disclosure scan failed: ${Se(s)}`, {
      level: "warn"
    }), o = null;
  }
  H.render(mcpListStatusLabels.default.createElement(dy, null, mcpListStatusLabels.default.createElement(B, {
    flexDirection: "column"
  }, mcpListStatusLabels.default.createElement(w, null, "Project-scoped (.mcp.json) server approvals and rejections stored for this project have been reset."), o && o.autoApprovedServers.length > 0 && mcpListStatusLabels.default.createElement(w, null, AUl(o.autoApprovedServers, "is still approved by other settings and will connect automatically without prompting.", "are still approved by other settings and will connect automatically without prompting.")), o && o.stillRejectedServers.length > 0 && mcpListStatusLabels.default.createElement(w, null, AUl(o.stillRejectedServers, "remains rejected by other settings and will not prompt.", "remain rejected by other settings and will not prompt.")), o && o.pendingCount > 0 && (o.gatingErrors > 0 ? mcpListStatusLabels.default.createElement(w, null, "Settings errors are currently blocking the approval prompt \u2014 run /doctor and fix them, then restart Claude Code to be prompted.") : mcpListStatusLabels.default.createElement(w, null, "You will be prompted for approval next time you start Claude Code."))))), await H.waitUntilExit();
}
function AUl(e, t, n) {
  return e.length === 1 ? `1 server (${e[0]}) ${t}` : `${e.length} servers (${e.join(", ")}) ${n}`;
}
var reactCompilerCache,
  serverHealthCache,
  ReactRuntime,
  mcpListStatusLabels,
  mcpScopeLabels = "\u23F8 Pending approval (run `claude` to approve)",
  initMcpServeHandlers;
var APe = b(() => {
  pi();
  $0t();
  NFl();
  A8n();
  Je();
  uW();
  cn();
  b0n();
  Ct();
  wae();
  D0();
  cx();
  x7r();
  ZI();
  U5t();
  fL();
  e0o();
  Nq();
  nr();
  je();
  St();
  Km();
  Pp();
  $s();
  QC();
  cat();
  pK();
  Er();
  tHe();
  DU();
  reactCompilerCache = L(nt(), 1), serverHealthCache = require("fs/promises"), ReactRuntime = require("process"), mcpListStatusLabels = L(Te(), 1);
  initMcpServeHandlers = `${Ze.cross} Rejected (see disabledMcpjsonServers in settings)`;
});

export {mcpCliHandlerExports as DPe,writeMcpServerToConfig as cvm,mcpServeHandler as j2l,mcpServeHandler_2 as mcpServeHandler,mcpRemoveHandler,McpServerStatusRow as W2l,McpServerList as pvm,sortMcpServerEntries as mvm,mcpListHandler as fvm,mcpListHandler_2 as mcpListHandler,mcpGetHandler,mcpAddJsonHandler,mcpAddFromDesktopHandler,mcpResetChoicesHandler,AUl as F2l,reactCompilerCache as U2l,serverHealthCache as $2l,ReactRuntime as q2l,mcpListStatusLabels as N_,mcpScopeLabels as G2l,initMcpServeHandlers as Avm,APe as PPe};
