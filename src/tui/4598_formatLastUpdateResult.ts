// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {ra,Ap} from "../config/0614_Ap.ts";
import {Es,kte} from "../../vendor/m3926.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {xA,jH} from "../../vendor/m2566.ts";
import {g5n,JTo} from "../../vendor/m4593.ts";
import {W3e,SHe} from "../../vendor/m3758.ts";
import {jwa,qwa,Cge} from "../config/3756_minVersion.ts";
import {hJ,rDe} from "../../vendor/m4516.ts";
import {Kcl,EJ} from "../../vendor/m4592.ts";
import {aMt,Iee} from "../api/3147_claudeAiMcpEverConnected.ts";
import {kYr,xYr,H1t} from "../../vendor/m3258.ts";
import {kpo,xpo,Hpo} from "../../vendor/m4245.ts";
import {YCe,jS} from "../api/2023_used.ts";
import {Tae,Jtt} from "../../vendor/m2725.ts";
import {Ie,ln} from "../telemetry/0594_feature_name.ts";
import {tr,sn} from "../config/0047_namespace.ts";
import {getOriginalCwd,lt} from "../session/0131_sent.ts";
import {ud,mc} from "../config/0645_maxBytes.ts";
import {Jcl,Xcl} from "../../vendor/m4596.ts";
import {bHe,INn,nRa,fro} from "../../vendor/m3760.ts";
import {ZIn,Ske} from "../../vendor/m3273.ts";
import {WEn,G3r,V3r} from "../../vendor/m2586.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {Wu,lS} from "../../vendor/m2571.ts";
import {Jc,vE} from "../../vendor/m3837.ts";
import {Box} from "../../vendor/m2422.ts";
import {Hx,Ypt} from "../../vendor/m4573.ts";
import {p5n,jTo} from "../../vendor/m4586.ts";
import {f5n,YTo} from "../../vendor/m4591.ts";
import {jcl,Wcl} from "../../vendor/m4589.ts";
import {isDaemonCliEnabled,bv} from "../config/2204_shouldShowLaunchComposer.ts";
import {Ocl,Lcl} from "../../vendor/m4585.ts";
import {Ucl,$cl} from "../core/4589_promise.ts";
import {Jpt,t5n} from "../../vendor/m4575.ts";
import {dcl,pcl} from "../../vendor/m4574.ts";
import {Bcl,Fcl} from "../../vendor/m4587.ts";
import {Text} from "../../vendor/m2423.ts";
import {Cn,dr} from "../../vendor/m231.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {SandboxManager,Ag} from "../../vendor/m2671.ts";
import {sL,TT,N5} from "../../vendor/m2583.ts";
import {E$,aAe,FZ} from "../telemetry/2465_bindings.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var ZTo = {};
isFullscreenWithTTY(ZTo, {
  formatLastUpdateResult: () => formatLastUpdateResult,
  buildFixPrompt: () => buildFixPrompt,
  PluginErrorsSection: () => PluginErrorsSection,
  McpConnectionIssuesSection: () => McpConnectionIssuesSection,
  LastUpdateNode: () => LastUpdateNode,
  IneffectivePluginDisablesSection: () => IneffectivePluginDisablesSection,
  Doctor: () => Doctor,
  DistTagsDisplay: () => DistTagsDisplay
});
function DistTagsDisplay(e: any) {
  let c = yDe.c(9),
    {
      promise: n
    } = e,
    {
      tags: r,
      isNative: o
    } = Oo.use(n);
  if (!r.latest) {
    let l;
    if (c[0] !== o) l = o && ra() ? Oo.default.createElement(Es.Node, {
      dimColor: !0
    }, "Version check skipped (essential-traffic-only mode)") : Oo.default.createElement(Es.Node, {
      dimColor: !0
    }, "Failed to fetch versions"), c[0] = o, c[1] = l;else l = c[1];
    return l;
  }
  let s;
  if (c[2] !== r.stable) s = r.stable && Oo.default.createElement(Es.Node, null, "Stable version: ", r.stable), c[2] = r.stable, c[3] = s;else s = c[3];
  let i;
  if (c[4] !== r.latest) i = Oo.default.createElement(Es.Node, null, "Latest version: ", r.latest), c[4] = r.latest, c[5] = i;else i = c[5];
  let a;
  if (c[6] !== s || c[7] !== i) a = Oo.default.createElement(Es.Group, null, s, i), c[6] = s, c[7] = i, c[8] = a;else a = c[8];
  return a;
}
function LastUpdateNode(e: any) {
  let c = yDe.c(4),
    {
      result: n
    } = e,
    r;
  if (c[0] !== n) r = formatLastUpdateResult(n), c[0] = n, c[1] = r;else r = c[1];
  let o;
  if (c[2] !== r) o = Oo.default.createElement(Es.Node, null, "Last update attempt: ", r), c[2] = r, c[3] = o;else o = c[3];
  return o;
}
function formatLastUpdateResult(e: any) {
  if (!e) return "none recorded";
  let t = e.timestamp.slice(0, 10);
  switch (e.outcome) {
    case "success":
      return e.version_to ? `success → ${e.version_to} (${t})` : `success (${t})`;
    case "failed":
      return `failed (${e.status}) — ${t}`;
  }
}
function Doctor({
  onDone: e
}: any) {
  let t = mt((x: any) => x.agentDefinitions),
    n = mt((x: any) => x.toolPermissionContext),
    r = mt((x: any) => x.plugins.errors),
    o = mt((x: any) => x.plugins.warnings).filter((x: any) => x.type !== "ineffective-disable"),
    s = mt((x: any) => x.mcp.clients),
    i = Oo.useCallback(() => {
      e("Claude Code diagnostics dismissed", {
        display: "system"
      });
    }, [e]),
    a = xA(i),
    [l, c] = Oo.useState(null),
    [u, d] = Oo.useState(null),
    [p, m] = Oo.useState(null),
    [f, A] = Oo.useState(null),
    h = g5n(),
    g = Oo.useMemo(async () => {
      let H = (await W3e()).installationType === "native";
      return {
        tags: await (H ? jwa : qwa)().catch(() => ({
          latest: null,
          stable: null
        })),
        isNative: H
      };
    }, []),
    _ = hJ(),
    y = h.filter((x: any) => x.mcpErrorMetadata === void 0),
    T = Oo.useMemo(() => Kcl(s, aMt), [s]),
    S = Oo.useMemo(() => [{
      name: "BASH_MAX_OUTPUT_LENGTH",
      default: kYr,
      upperLimit: xYr
    }, {
      name: "TASK_MAX_OUTPUT_LENGTH",
      default: kpo,
      upperLimit: xpo
    }, {
      name: "CLAUDE_CODE_MAX_OUTPUT_TOKENS",
      ...YCe("claude-opus-4-6")
    }].map((H: any) => {
      let I = process.env[H.name],
        P = Tae(H.name, I, H.default, H.upperLimit);
      return {
        name: H.name,
        ...P
      };
    }).filter((H: any) => H.status !== "valid"), []);
  Oo.useEffect(() => {
    Ie("screen_doctor"), W3e({
      probeKeychain: !0
    }).then(c), (async () => {
      let x = b5n.join(tr(), "agents"),
        H = b5n.join(getOriginalCwd(), ".claude", "agents"),
        {
          activeAgents: I,
          allAgents: P,
          failedFiles: L
        } = t,
        [D, N] = await Promise.all([ud(x), ud(H)]),
        O = {
          activeAgents: I.map((U: any) => ({
            agentType: U.agentType,
            source: U.source
          })),
          userAgentsDir: x,
          projectAgentsDir: H,
          userDirExists: D,
          projectDirExists: N,
          failedFiles: L ?? []
        };
      d(O);
      let $ = await Jcl({
        activeAgents: I,
        allAgents: P,
        failedFiles: L
      }, async () => n);
      if (m($), bHe()) {
        let U = b5n.join(ZIn(), "claude", "locks"),
          W = INn(U),
          G = nRa(U);
        A({
          enabled: !0,
          locks: G,
          locksDir: U,
          staleLocksCleaned: W
        });
      } else A({
        enabled: !1,
        locks: [],
        locksDir: "",
        staleLocksCleaned: 0
      });
    })();
  }, [n, t]);
  let v = Oo.useMemo(() => WEn(), []),
    R = Oo.useMemo(() => buildFixPrompt(l, u, y, r, o, p, S, void 0, void 0, v, T), [l, u, y, r, o, p, S, v, T]);
  if (Wo({
    "confirm:no": i
  }, {
    context: "Confirmation"
  }), Wo({
    "confirm:yes": i
  }, {
    context: "Confirmation",
    isActive: l !== null
  }), Wo({
    "doctor:fix": () => {
      if (R) e(R, {
        display: "user",
        shouldQuery: !0
      });
    }
  }, {
    context: "Doctor",
    isActive: R !== null
  }), !l) return Oo.default.createElement(Wu, null, Oo.default.createElement(Jc, {
    message: "Checking installation status…",
    dimColor: !0
  }));
  let k = Oo.default.createElement(Oo.default.Fragment, null, Oo.default.createElement(Box, {
    flexDirection: "column"
  }, Oo.default.createElement(Hx, {
    title: "Diagnostics",
    status: l.ripgrepStatus.working ? "success" : "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, Oo.default.createElement(Es.Node, null, "Currently running: ", l.installationType, " (", l.version, ")"), {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.GIT_SHA && Oo.default.createElement(Es.Node, null, "Commit: ", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.GIT_SHA.slice(0, 12)), Oo.default.createElement(Es.Node, null, "Platform: ", "darwin", "-", "arm64"), l.packageManager && Oo.default.createElement(Es.Node, null, "Package manager: ", l.packageManager), Oo.default.createElement(Es.Node, null, "Path: ", l.installationPath), l.invokedBinary !== l.installationPath && Oo.default.createElement(Es.Node, null, "Invoked: ", l.invokedBinary), Oo.default.createElement(Es.Node, null, "Config install method: ", l.configInstallMethod), Oo.default.createElement(Es.Node, null, "Search: ", l.ripgrepStatus.working ? "OK" : "Not working", " (", l.ripgrepStatus.mode === "embedded" ? "bundled" : l.ripgrepStatus.systemPath || "system", ")"))), l.multipleInstallations.length > 1 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Multiple installations found",
    status: "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, l.multipleInstallations.map((x: any, H: number) => Oo.default.createElement(Es.Node, {
    key: H
  }, x.type, " at ", x.path)))), l.warnings.length > 0 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Installation warnings",
    status: "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, l.warnings.map((x: any, H: number) => Oo.default.createElement(Es.Group, {
    key: H
  }, Oo.default.createElement(Es.Node, {
    color: "warning"
  }, x.issue), Oo.default.createElement(Es.Node, null, Oo.default.createElement(p5n, {
    dimColor: !0
  }, x.fix)))))), y.length > 0 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Invalid settings",
    status: y.some((x: any) => x.severity !== "warning") ? "error" : "warning"
  }), Oo.default.createElement(f5n, {
    errors: y
  })), Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Updates",
    status: l.lastUpdateResult?.outcome === "failed" || l.hasUpdatePermissions === !1 ? "warning" : "success"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, Oo.default.createElement(Es.Node, null, "Auto-updates:", " ", l.packageManager ? "Managed by package manager" : l.autoUpdates), Oo.default.createElement(Es.Node, null, "Auto-update channel:", " ", _ === "rc" ? "slow" : _), Oo.default.createElement(LastUpdateNode, {
    result: l.lastUpdateResult
  }), Oo.default.createElement(Oo.Suspense, {
    fallback: Oo.default.createElement(Es.Node, {
      dimColor: !0
    }, "Checking for updates…")
  }, Oo.default.createElement(DistTagsDisplay, {
    promise: g
  })))), Oo.default.createElement(jcl, null), isDaemonCliEnabled() ? Oo.default.createElement(Ocl, null) : null, Oo.default.createElement(Ucl, null), Oo.default.createElement(Jpt, null), Oo.default.createElement(McpConnectionIssuesSection, {
    issues: T
  }), Oo.default.createElement(dcl, null), Oo.default.createElement(Bcl, null), S.length > 0 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Environment variables",
    status: S.some((x: any) => x.status !== "capped") ? "error" : "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, S.map((x: any, H: number) => Oo.default.createElement(Es.Node, {
    key: H
  }, Oo.default.createElement(Text, null, x.name, ":", " ", Oo.default.createElement(Text, {
    color: x.status === "capped" ? "warning" : "error"
  }, x.message)))))), f?.enabled && (f.locks.length > 0 || f.staleLocksCleaned > 0) && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Version locks",
    status: f.locks.some((x: any) => !x.isProcessRunning) ? "warning" : "success"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, f.staleLocksCleaned > 0 && Oo.default.createElement(Es.Node, {
    dimColor: !0
  }, "Cleaned ", f.staleLocksCleaned, " stale", " ", Cn(f.staleLocksCleaned, "lock")), f.locks.map((x: any, H: number) => Oo.default.createElement(Es.Node, {
    key: H
  }, Oo.default.createElement(Text, null, x.version, ": PID ", x.pid, " ", x.isProcessRunning ? Oo.default.createElement(Text, null, "(running)") : Oo.default.createElement(Text, {
    color: "warning"
  }, "(stale)")))))), u && u.failedFiles.length > 0 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Agent parse errors",
    status: "error"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, Oo.default.createElement(Es.Node, {
    color: "error"
  }, `Failed to parse ${u.failedFiles.length} agent ${Cn(u.failedFiles.length, "file")}:`), u.failedFiles.map((x: any, H: number) => Oo.default.createElement(Es.Node, {
    key: H,
    dimColor: !0
  }, x.path, ": ", x.error)))), Oo.default.createElement(PluginErrorsSection, {
    errors: r,
    warnings: o
  }), Oo.default.createElement(IneffectivePluginDisablesSection, {
    disables: v
  }), p?.unreachableRulesWarning && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Unreachable permission rules",
    status: "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, Oo.default.createElement(Es.Node, {
    color: "warning"
  }, p.unreachableRulesWarning.message), p.unreachableRulesWarning.details.map((x: any, H: number) => Oo.default.createElement(Es.Node, {
    key: H,
    dimColor: !0
  }, x)))), p && (p.claudeMdWarning || p.agentWarning) && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Context usage warnings",
    status: "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, p.claudeMdWarning && Oo.default.createElement(Qcl, {
    warning: p.claudeMdWarning
  }), p.agentWarning && Oo.default.createElement(Qcl, {
    warning: p.agentWarning
  }))));
  return Oo.default.createElement(Wu, null, Oo.default.createElement(Box, {
    flexDirection: "column"
  }, k), Oo.default.createElement(Box, {
    marginTop: 1
  }, Oo.default.createElement(Text, {
    dimColor: !0
  }, "Still having issues? Run /feedback to report details.")), Oo.default.createElement(Box, {
    marginTop: 1
  }, Oo.default.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, a.pending ? Oo.default.createElement(Oo.default.Fragment, null, "Press ", a.keyName, " again to close") : Oo.default.createElement(Tn, null, Oo.default.createElement(at, {
    chord: "enter",
    action: "close"
  }), R && Oo.default.createElement(at, {
    chord: "f",
    action: "fix with Claude"
  })))));
}
function Q7p() {
  return SandboxManager.isSupportedPlatform() && SandboxManager.isSandboxEnabledInSettings() && SandboxManager.isPlatformInEnabledList() ? SandboxManager.checkDependencies().errors : [];
}
function nul(e: any) {
  if (e.type === "needs-auth") return "needs authentication";
  return e.errorCode === "INVALID_CONFIG" ? "config issue" : "failed";
}
function McpConnectionIssuesSection(e: any) {
  let c = yDe.c(15),
    {
      issues: n
    } = e;
  if (n.length === 0) return null;
  let r = n.some(eKp),
    o = r ? "error" : "warning",
    s;
  if (c[0] !== o) s = Oo.default.createElement(Hx, {
    title: "MCP servers",
    status: o
  }), c[0] = o, c[1] = s;else s = c[1];
  let i = r ? "error" : "warning",
    a = n.length,
    l;
  if (c[2] !== n.length) l = Cn(n.length, "server"), c[2] = n.length, c[3] = l;else l = c[3];
  let u = `${a} MCP ${l} not connected — run /mcp to authenticate, retry, or see details:`,
    d;
  if (c[4] !== i || c[5] !== u) d = Oo.default.createElement(Es.Node, {
    color: i
  }, u), c[4] = i, c[5] = u, c[6] = d;else d = c[6];
  let p;
  if (c[7] !== n) p = n.map(Z7p), c[7] = n, c[8] = p;else p = c[8];
  let m;
  if (c[9] !== d || c[10] !== p) m = Oo.default.createElement(Es, {
    variant: "tree"
  }, d, p), c[9] = d, c[10] = p, c[11] = m;else m = c[11];
  let f;
  if (c[12] !== s || c[13] !== m) f = Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, s, m), c[12] = s, c[13] = m, c[14] = f;else f = c[14];
  return f;
}
function Z7p(e: any, t: number) {
  return Oo.default.createElement(Es.Node, {
    key: t,
    dimColor: !0
  }, e.name, ": ", nul(e), e.error ? ` — ${e.error}` : "");
}
function eKp(e: any) {
  return e.type === "failed";
}
function IneffectivePluginDisablesSection(e: any) {
  let c = yDe.c(6),
    {
      disables: n
    } = e;
  if (n.length === 0) return null;
  let r;
  if (c[0] === Symbol.for("react.memo_cache_sentinel")) r = Oo.default.createElement(Hx, {
    title: "Plugin settings overridden",
    status: "warning"
  }), c[0] = r;else r = c[0];
  let o;
  if (c[1] === Symbol.for("react.memo_cache_sentinel")) o = Oo.default.createElement(Es.Node, {
    color: "warning"
  }, "These plugins are disabled in ~/.claude/settings.json, but a higher-precedence source re-enables them:"), c[1] = o;else o = c[1];
  let s;
  if (c[2] !== n) s = n.map(tKp), c[2] = n, c[3] = s;else s = c[3];
  let i;
  if (c[4] !== s) i = Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, r, Oo.default.createElement(Es, {
    variant: "tree"
  }, o, s)), c[4] = s, c[5] = i;else i = c[5];
  return i;
}
function tKp(e: any, t: number) {
  return Oo.default.createElement(Es.Node, {
    key: t,
    dimColor: !0
  }, G3r(e));
}
function sul(e: any) {
  let c = yDe.c(4),
    {
      source: n,
      plugin: r,
      message: o
    } = e,
    s = n || "unknown",
    i = r ? ` [${r}]` : "",
    a;
  if (c[0] !== o || c[1] !== s || c[2] !== i) a = Oo.default.createElement(Es.Node, {
    dimColor: !0
  }, s, i, ": ", o), c[0] = o, c[1] = s, c[2] = i, c[3] = a;else a = c[3];
  return a;
}
function PluginErrorsSection(e: any) {
  let c = yDe.c(7),
    {
      errors: n,
      warnings: r
    } = e;
  if (n.length === 0 && r.length === 0) return null;
  let o;
  if (c[0] !== n) o = n.length > 0 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Plugin errors",
    status: "error"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, Oo.default.createElement(Es.Node, {
    color: "error"
  }, `${n.length} plugin ${Cn(n.length, "error")} detected:`), n.map(rKp))), c[0] = n, c[1] = o;else o = c[1];
  let s;
  if (c[2] !== r) s = r.length > 0 && Oo.default.createElement(Box, {
    flexDirection: "column",
    marginTop: 1
  }, Oo.default.createElement(Hx, {
    title: "Plugin notes",
    status: "warning"
  }), Oo.default.createElement(Es, {
    variant: "tree"
  }, Oo.default.createElement(Es.Node, {
    color: "warning"
  }, `${r.length} plugin ${Cn(r.length, "note")}:`), r.map(nKp))), c[2] = r, c[3] = s;else s = c[3];
  let i;
  if (c[4] !== o || c[5] !== s) i = Oo.default.createElement(Oo.default.Fragment, null, o, s), c[4] = o, c[5] = s, c[6] = i;else i = c[6];
  return i;
}
function nKp(e: any, t: number) {
  return Oo.default.createElement(sul, {
    key: t,
    source: e.source,
    plugin: "plugin" in e ? e.plugin : void 0,
    message: sL(e)
  });
}
function rKp(e: any, t: number) {
  return Oo.default.createElement(sul, {
    key: t,
    source: e.source,
    plugin: "plugin" in e ? e.plugin : void 0,
    message: TT(e)
  });
}
function buildFixPrompt(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a = E$.warnings, l = Q7p(), c: any[] = [], u: any[] = []) {
  let d: string[] = [];
  for (let p of e?.warnings ?? []) d.push(`- ${p.issue}
  Suggested fix: ${p.fix}`);
  for (let p of u) {
    let m = p.error ? ` — ${p.error}` : "";
    d.push(`- MCP server '${p.name}': ${nul(p)}${m}
  Run /mcp to authenticate, retry, or inspect the server.`);
  }
  for (let p of a) d.push(`- Keybinding (${aAe()}): ${p.message}${p.suggestion ? `
  Suggested fix: ${p.suggestion}` : ""}`);
  for (let p of t?.failedFiles ?? []) d.push(`- Agent file failed to parse: ${p.path}
  Error: ${p.error}`);
  for (let p of n) {
    let m = [p.file, p.path].filter(Boolean).join(" › ");
    d.push(`- Settings${m ? ` (${m})` : ""}: ${p.message}${p.suggestion ? `
  Suggested fix: ${p.suggestion}` : ""}`);
  }
  for (let p of r) {
    let m = ["plugin" in p && p.plugin, p.source].filter(Boolean).join(" @ ");
    d.push(`- Plugin${m ? ` (${m})` : ""}: ${TT(p)}`);
  }
  for (let p of c) d.push(`- Plugin setting: ${G3r(p)}`);
  for (let p of o) {
    let m = ["plugin" in p ? p.plugin : void 0, p.source].filter(Boolean).join(" @ ");
    d.push(`- Plugin note${m ? ` (${m})` : ""}: ${sL(p)}`);
  }
  for (let p of l) d.push(`- Sandbox: ${p}
  (See /sandbox for install instructions)`);
  for (let p of [s?.claudeMdWarning, s?.agentWarning, s?.unreachableRulesWarning]) if (p) d.push(`- ${p.message}
  ${p.details.join(`
  `)}`);
  for (let p of i) d.push(`- Environment variable ${p.name}: ${p.message}`);
  if (d.length === 0) return null;
  return ["Help me fix the issues reported by /doctor below.", "", "For each issue: briefly explain what the fix will do, then ask me to confirm before running any shell command that deletes files, modifies global config, or changes my installation. Safe read-only checks are fine without asking. If a suggested fix looks wrong for my setup, say so instead of running it.", "", d.join(`
`)].join(`
`);
}
function Qcl(e: any) {
  let c = yDe.c(7),
    {
      warning: n
    } = e,
    r;
  if (c[0] !== n.message) r = Oo.default.createElement(Es.Node, {
    color: "warning"
  }, n.message), c[0] = n.message, c[1] = r;else r = c[1];
  let o;
  if (c[2] !== n.details) o = n.details.map(oKp), c[2] = n.details, c[3] = o;else o = c[3];
  let s;
  if (c[4] !== r || c[5] !== o) s = Oo.default.createElement(Es.Group, null, r, o), c[4] = r, c[5] = o, c[6] = s;else s = c[6];
  return s;
}
function oKp(e: any, t: number) {
  return Oo.default.createElement(Es.Node, {
    key: t,
    dimColor: !0
  }, e);
}
var yDe, b5n, Oo;
var E5n = b(() => {
  pcl();
  t5n();
  jS();
  sn();
  lt();
  bv();
  Lcl();
  Ypt();
  zs();
  rs();
  vE();
  lS();
  kte();
  jTo();
  Fcl();
  $cl();
  Wcl();
  YTo();
  JTo();
  jH();
  ze();
  FZ();
  Ts();
  ln();
  Iee();
  configProtoStore();
  N5();
  Cge();
  Xcl();
  SHe();
  Jtt();
  mc();
  fro();
  Ap();
  rDe();
  Ag();
  V3r();
  EJ();
  H1t();
  dr();
  Hpo();
  Ske();
  yDe = M(rt(), 1), b5n = require("path"), Oo = M(Te(), 1);
});
export {ZTo,DistTagsDisplay,LastUpdateNode,formatLastUpdateResult,Doctor,Q7p,nul,McpConnectionIssuesSection,Z7p,eKp,IneffectivePluginDisablesSection,tKp,sul,PluginErrorsSection,nKp,rKp,buildFixPrompt,Qcl,oKp,yDe,b5n,Oo,E5n};
