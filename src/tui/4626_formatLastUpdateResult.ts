// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {cs,kte} from "../../vendor/m3992.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {QKn,uvo} from "../../vendor/m4621.ts";
import {oqe,c0e} from "../../vendor/m3774.ts";
import {aPa,iPa,F_e} from "../config/3772_minVersion.ts";
import {eJ,ZDe} from "../../vendor/m4536.ts";
import {k_l,lJ} from "../../vendor/m4620.ts";
import {LNt,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {peo,deo,aBt} from "../../vendor/m3274.ts";
import {R_o,A_o,v_o} from "../../vendor/m4263.ts";
import {DRe,GS} from "../api/2028_used.ts";
import {_ae,Qrt} from "../../vendor/m2737.ts";
import {He,mn} from "../telemetry/0600_feature_name.ts";
import {or,dn} from "../config/0137_namespace.ts";
import {getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {Gu,Xl} from "../config/0651_maxBytes.ts";
import {x_l,D_l} from "../../vendor/m4624.ts";
import {u0e,EUn,SPa,Qao} from "../../vendor/m3776.ts";
import {WPn,o_e} from "../../vendor/m3289.ts";
import {Ovn,E8r,C8r} from "../../vendor/m2597.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {ku,rS} from "../../vendor/m2582.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Ww,tht} from "../../vendor/m4601.ts";
import {KKn,rvo} from "../../vendor/m4614.ts";
import {YKn,cvo} from "../../vendor/m4619.ts";
import {A_l,R_l} from "../../vendor/m4617.ts";
import {isDaemonCliEnabled as $fe,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {h_l,g_l} from "../../vendor/m4613.ts";
import {b_l,E_l} from "../core/4617_promise.ts";
import {nht,LKn} from "../../vendor/m4603.ts";
import {Kgl,zgl} from "../../vendor/m4602.ts";
import {T_l,S_l} from "../../vendor/m4615.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {EO,fT,Q8} from "../../vendor/m2594.ts";
import {K2,She,MZ} from "../telemetry/2475_bindings.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * /doctor diagnostics screen and its supporting render helpers.
 *
 * Exposes the React components that build the diagnostics tree (installation
 * status, updates, MCP issues, plugin errors, env-var caps, version locks,
 * etc.), the `formatLastUpdateResult` formatter, and `buildFixPrompt` which
 * assembles a natural-language prompt summarizing every detected issue so the
 * user can ask Claude to fix them.
 */
var mvo = {};
ft(mvo, {
  formatLastUpdateResult: () => formatLastUpdateResult,
  buildFixPrompt: () => buildFixPrompt,
  PluginErrorsSection: () => PluginErrorsSection,
  McpConnectionIssuesSection: () => McpConnectionIssuesSection,
  LastUpdateNode: () => LastUpdateNode,
  IneffectivePluginDisablesSection: () => IneffectivePluginDisablesSection,
  Doctor: () => Doctor,
  DistTagsDisplay: () => DistTagsDisplay
});
/** Renders the latest/stable dist-tag versions (or a fallback message). */
function DistTagsDisplay(props: any) {
  let cache = yPe.c(9),
    {
      promise: versionsPromise
    } = props,
    {
      tags: tags,
      isNative: isNative
    } = cP.use(versionsPromise);
  if (!tags.latest) {
    let fallbackNode;
    if (cache[0] !== isNative) fallbackNode = isNative && Vi() ? ns.jsx(cs.Node, {
      dimColor: !0,
      children: "Version check skipped (essential-traffic-only mode)"
    }) : ns.jsx(cs.Node, {
      dimColor: !0,
      children: "Failed to fetch versions"
    }), cache[0] = isNative, cache[1] = fallbackNode;else fallbackNode = cache[1];
    return fallbackNode;
  }
  let stableNode;
  if (cache[2] !== tags.stable) stableNode = tags.stable && ns.jsxs(cs.Node, {
    children: ["Stable version: ", tags.stable]
  }), cache[2] = tags.stable, cache[3] = stableNode;else stableNode = cache[3];
  let latestNode;
  if (cache[4] !== tags.latest) latestNode = ns.jsxs(cs.Node, {
    children: ["Latest version: ", tags.latest]
  }), cache[4] = tags.latest, cache[5] = latestNode;else latestNode = cache[5];
  let group;
  if (cache[6] !== stableNode || cache[7] !== latestNode) group = ns.jsxs(cs.Group, {
    children: [stableNode, latestNode]
  }), cache[6] = stableNode, cache[7] = latestNode, cache[8] = group;else group = cache[8];
  return group;
}
/** Renders the "Last update attempt: …" tree node. */
function LastUpdateNode(props: any) {
  let cache = yPe.c(4),
    {
      result: result
    } = props,
    formatted;
  if (cache[0] !== result) formatted = formatLastUpdateResult(result), cache[0] = result, cache[1] = formatted;else formatted = cache[1];
  let node;
  if (cache[2] !== formatted) node = ns.jsxs(cs.Node, {
    children: ["Last update attempt: ", formatted]
  }), cache[2] = formatted, cache[3] = node;else node = cache[3];
  return node;
}
/** Formats the persisted last-update record into a human-readable string. */
function formatLastUpdateResult(lastUpdate: any) {
  if (!lastUpdate) return "none recorded";
  let date = lastUpdate.timestamp.slice(0, 10);
  switch (lastUpdate.outcome) {
    case "success":
      return lastUpdate.version_to ? `success → ${lastUpdate.version_to} (${date})` : `success (${date})`;
    case "failed":
      return `failed (${lastUpdate.status}) — ${date}`;
  }
}
/** The main /doctor diagnostics screen component. */
function Doctor({
  onDone: onDone
}: any) {
  let agentDefinitions = _t((state: any) => state.agentDefinitions),
    toolPermissionContext = _t((state: any) => state.toolPermissionContext),
    pluginErrors = _t((state: any) => state.plugins.errors),
    pluginWarnings = _t((state: any) => state.plugins.warnings).filter((warning: any) => warning.type !== "ineffective-disable"),
    mcpClients = _t((state: any) => state.mcp.clients),
    handleDismiss = cP.useCallback(() => {
      onDone("Claude Code diagnostics dismissed", {
        display: "system"
      });
    }, [onDone]),
    confirmPress = Df(handleDismiss),
    [installationInfo, setInstallationInfo] = cP.useState(null),
    [agentInfo, setAgentInfo] = cP.useState(null),
    [contextWarnings, setContextWarnings] = cP.useState(null),
    [lockInfo, setLockInfo] = cP.useState(null),
    allMcpIssues = QKn(),
    versionsPromise = cP.useMemo(async () => {
      let isNative = (await oqe()).installationType === "native";
      return {
        tags: await (isNative ? aPa : iPa)().catch(() => ({
          latest: null,
          stable: null
        })),
        isNative: isNative
      };
    }, []),
    updateChannel = eJ(),
    invalidSettings = allMcpIssues.filter((issue: any) => issue.mcpErrorMetadata === void 0),
    mcpConnectionIssues = cP.useMemo(() => k_l(mcpClients, LNt), [mcpClients]),
    envVarStatuses = cP.useMemo(() => [{
      name: "BASH_MAX_OUTPUT_LENGTH",
      default: peo,
      upperLimit: deo
    }, {
      name: "TASK_MAX_OUTPUT_LENGTH",
      default: R_o,
      upperLimit: A_o
    }, {
      name: "CLAUDE_CODE_MAX_OUTPUT_TOKENS",
      ...DRe("claude-opus-4-6")
    }].map((envVar: any) => {
      let rawValue = process.env[envVar.name],
        validation = _ae(envVar.name, rawValue, envVar.default, envVar.upperLimit);
      return {
        name: envVar.name,
        ...validation
      };
    }).filter((envVar: any) => envVar.status !== "valid"), []);
  cP.useEffect(() => {
    He("screen_doctor"), oqe({
      probeKeychain: !0
    }).then(setInstallationInfo), (async () => {
      let userAgentsDir = r7n.join(or(), "agents"),
        projectAgentsDir = r7n.join(gr(), ".claude", "agents"),
        {
          activeAgents: activeAgents,
          allAgents: allAgents,
          failedFiles: failedFiles
        } = agentDefinitions,
        [userDirExists, projectDirExists] = await Promise.all([Gu(userAgentsDir), Gu(projectAgentsDir)]),
        agentInfoResult = {
          activeAgents: activeAgents.map((agent: any) => ({
            agentType: agent.agentType,
            source: agent.source
          })),
          userAgentsDir: userAgentsDir,
          projectAgentsDir: projectAgentsDir,
          userDirExists: userDirExists,
          projectDirExists: projectDirExists,
          failedFiles: failedFiles ?? []
        };
      setAgentInfo(agentInfoResult);
      let contextWarningsResult = await x_l({
        activeAgents: activeAgents,
        allAgents: allAgents,
        failedFiles: failedFiles
      }, async () => toolPermissionContext);
      if (setContextWarnings(contextWarningsResult), u0e()) {
        let locksDir = r7n.join(WPn(), "claude", "locks"),
          staleLocksCleaned = EUn(locksDir),
          locks = SPa(locksDir);
        setLockInfo({
          enabled: !0,
          locks: locks,
          locksDir: locksDir,
          staleLocksCleaned: staleLocksCleaned
        });
      } else setLockInfo({
        enabled: !1,
        locks: [],
        locksDir: "",
        staleLocksCleaned: 0
      });
    })();
  }, [toolPermissionContext, agentDefinitions]);
  let ineffectiveDisables = cP.useMemo(() => Ovn(), []),
    fixPrompt = cP.useMemo(() => buildFixPrompt(installationInfo, agentInfo, invalidSettings, pluginErrors, pluginWarnings, contextWarnings, envVarStatuses, void 0, void 0, ineffectiveDisables, mcpConnectionIssues), [installationInfo, agentInfo, invalidSettings, pluginErrors, pluginWarnings, contextWarnings, envVarStatuses, ineffectiveDisables, mcpConnectionIssues]);
  if (Oo({
    "confirm:no": handleDismiss
  }, {
    context: "Confirmation"
  }), Oo({
    "confirm:yes": handleDismiss
  }, {
    context: "Confirmation",
    isActive: installationInfo !== null
  }), Oo({
    "doctor:fix": () => {
      if (fixPrompt) onDone(fixPrompt, {
        display: "user",
        shouldQuery: !0
      });
    }
  }, {
    context: "Doctor",
    isActive: fixPrompt !== null
  }), !installationInfo) return ns.jsx(ku, {
    children: ns.jsx(Hc, {
      message: "Checking installation status…",
      dimColor: !0
    })
  });
  let diagnosticsTree = ns.jsxs(ns.Fragment, {
    children: [ns.jsxs($, {
      flexDirection: "column",
      children: [ns.jsx(Ww, {
        title: "Diagnostics",
        status: installationInfo.ripgrepStatus.working ? "success" : "warning"
      }), ns.jsxs(cs, {
        variant: "tree",
        children: [ns.jsxs(cs.Node, {
          children: ["Currently running: ", installationInfo.installationType, " (", installationInfo.version, ")"]
        }), {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.GIT_SHA && ns.jsxs(cs.Node, {
          children: ["Commit: ", {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.190",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-24T02:21:52Z",
            GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
          }.GIT_SHA.slice(0, 12)]
        }), ns.jsxs(cs.Node, {
          children: ["Platform: ", "darwin", "-", "arm64"]
        }), installationInfo.packageManager && ns.jsxs(cs.Node, {
          children: ["Package manager: ", installationInfo.packageManager]
        }), ns.jsxs(cs.Node, {
          children: ["Path: ", installationInfo.installationPath]
        }), installationInfo.invokedBinary !== installationInfo.installationPath && ns.jsxs(cs.Node, {
          children: ["Invoked: ", installationInfo.invokedBinary]
        }), ns.jsxs(cs.Node, {
          children: ["Config install method: ", installationInfo.configInstallMethod]
        }), ns.jsxs(cs.Node, {
          children: ["Search: ", installationInfo.ripgrepStatus.working ? "OK" : "Not working", " (", installationInfo.ripgrepStatus.mode === "embedded" ? "bundled" : installationInfo.ripgrepStatus.systemPath || "system", ")"]
        })]
      })]
    }), installationInfo.multipleInstallations.length > 1 && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Multiple installations found",
        status: "warning"
      }), ns.jsx(cs, {
        variant: "tree",
        children: installationInfo.multipleInstallations.map((installation: any, index: number) => ns.jsxs(cs.Node, {
          children: [installation.type, " at ", installation.path]
        }, index))
      })]
    }), installationInfo.warnings.length > 0 && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Installation warnings",
        status: "warning"
      }), ns.jsx(cs, {
        variant: "tree",
        children: installationInfo.warnings.map((warning: any, index: number) => ns.jsxs(cs.Group, {
          children: [ns.jsx(cs.Node, {
            color: "warning",
            children: warning.issue
          }), ns.jsx(cs.Node, {
            children: ns.jsx(KKn, {
              dimColor: !0,
              children: warning.fix
            })
          })]
        }, index))
      })]
    }), invalidSettings.length > 0 && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Invalid settings",
        status: invalidSettings.some((issue: any) => issue.severity !== "warning") ? "error" : "warning"
      }), ns.jsx(YKn, {
        errors: invalidSettings
      })]
    }), ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Updates",
        status: installationInfo.lastUpdateResult?.outcome === "failed" || installationInfo.hasUpdatePermissions === !1 ? "warning" : "success"
      }), ns.jsxs(cs, {
        variant: "tree",
        children: [ns.jsxs(cs.Node, {
          children: ["Auto-updates:", " ", installationInfo.packageManager ? "Managed by package manager" : installationInfo.autoUpdates]
        }), ns.jsxs(cs.Node, {
          children: ["Auto-update channel:", " ", updateChannel === "rc" ? "slow" : updateChannel]
        }), ns.jsx(LastUpdateNode, {
          result: installationInfo.lastUpdateResult
        }), ns.jsx(cP.Suspense, {
          fallback: ns.jsx(cs.Node, {
            dimColor: !0,
            children: "Checking for updates…"
          }),
          children: ns.jsx(DistTagsDisplay, {
            promise: versionsPromise
          })
        })]
      })]
    }), ns.jsx(A_l, {}), $fe() ? ns.jsx(h_l, {}) : null, ns.jsx(b_l, {}), ns.jsx(nht, {}), ns.jsx(McpConnectionIssuesSection, {
      issues: mcpConnectionIssues
    }), ns.jsx(Kgl, {}), ns.jsx(T_l, {}), envVarStatuses.length > 0 && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Environment variables",
        status: envVarStatuses.some((envVar: any) => envVar.status !== "capped") ? "error" : "warning"
      }), ns.jsx(cs, {
        variant: "tree",
        children: envVarStatuses.map((envVar: any, index: number) => ns.jsx(cs.Node, {
          children: ns.jsxs(v, {
            children: [envVar.name, ":", " ", ns.jsx(v, {
              color: envVar.status === "capped" ? "warning" : "error",
              children: envVar.message
            })]
          })
        }, index))
      })]
    }), lockInfo?.enabled && (lockInfo.locks.length > 0 || lockInfo.staleLocksCleaned > 0) && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Version locks",
        status: lockInfo.locks.some((lock: any) => !lock.isProcessRunning) ? "warning" : "success"
      }), ns.jsxs(cs, {
        variant: "tree",
        children: [lockInfo.staleLocksCleaned > 0 && ns.jsxs(cs.Node, {
          dimColor: !0,
          children: ["Cleaned ", lockInfo.staleLocksCleaned, " stale", " ", Sn(lockInfo.staleLocksCleaned, "lock")]
        }), lockInfo.locks.map((lock: any, index: number) => ns.jsx(cs.Node, {
          children: ns.jsxs(v, {
            children: [lock.version, ": PID ", lock.pid, " ", lock.isProcessRunning ? ns.jsx(v, {
              children: "(running)"
            }) : ns.jsx(v, {
              color: "warning",
              children: "(stale)"
            })]
          })
        }, index))]
      })]
    }), agentInfo && agentInfo.failedFiles.length > 0 && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Agent parse errors",
        status: "error"
      }), ns.jsxs(cs, {
        variant: "tree",
        children: [ns.jsx(cs.Node, {
          color: "error",
          children: `Failed to parse ${agentInfo.failedFiles.length} agent ${Sn(agentInfo.failedFiles.length, "file")}:`
        }), agentInfo.failedFiles.map((failedFile: any, index: number) => ns.jsxs(cs.Node, {
          dimColor: !0,
          children: [failedFile.path, ": ", failedFile.error]
        }, index))]
      })]
    }), ns.jsx(PluginErrorsSection, {
      errors: pluginErrors,
      warnings: pluginWarnings
    }), ns.jsx(IneffectivePluginDisablesSection, {
      disables: ineffectiveDisables
    }), contextWarnings?.unreachableRulesWarning && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Unreachable permission rules",
        status: "warning"
      }), ns.jsxs(cs, {
        variant: "tree",
        children: [ns.jsx(cs.Node, {
          color: "warning",
          children: contextWarnings.unreachableRulesWarning.message
        }), contextWarnings.unreachableRulesWarning.details.map((detail: any, index: number) => ns.jsx(cs.Node, {
          dimColor: !0,
          children: detail
        }, index))]
      })]
    }), contextWarnings && (contextWarnings.claudeMdWarning || contextWarnings.agentWarning) && ns.jsxs($, {
      flexDirection: "column",
      marginTop: 1,
      children: [ns.jsx(Ww, {
        title: "Context usage warnings",
        status: "warning"
      }), ns.jsxs(cs, {
        variant: "tree",
        children: [contextWarnings.claudeMdWarning && ns.jsx(P_l, {
          warning: contextWarnings.claudeMdWarning
        }), contextWarnings.agentWarning && ns.jsx(P_l, {
          warning: contextWarnings.agentWarning
        })]
      })]
    })]
  });
  return ns.jsxs(ku, {
    children: [ns.jsx($, {
      flexDirection: "column",
      children: diagnosticsTree
    }), ns.jsx($, {
      marginTop: 1,
      children: ns.jsx(v, {
        dimColor: !0,
        children: "Still having issues? Run /feedback to report details."
      })
    }), ns.jsx($, {
      marginTop: 1,
      children: ns.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: confirmPress.pending ? ns.jsxs(ns.Fragment, {
          children: ["Press ", confirmPress.keyName, " again to close"]
        }) : ns.jsxs(bn, {
          children: [ns.jsx(at, {
            chord: "enter",
            action: "close"
          }), fixPrompt && ns.jsx(at, {
            chord: "f",
            action: "fix with Claude"
          })]
        })
      })
    })]
  });
}
/** Returns sandbox dependency errors when sandboxing is enabled, else empty. */
function nnm() {
  return xo.isSupportedPlatform() && xo.isSandboxEnabledInSettings() && xo.isPlatformInEnabledList() ? xo.checkDependencies().errors : [];
}
/** Maps an MCP client issue to a short status label. */
function N_l(issue: any) {
  if (issue.type === "needs-auth") return "needs authentication";
  return issue.errorCode === "INVALID_CONFIG" ? "config issue" : "failed";
}
/** Renders the "MCP servers" diagnostics section listing not-connected servers. */
function McpConnectionIssuesSection(props: any) {
  let cache = yPe.c(15),
    {
      issues: issues
    } = props;
  if (issues.length === 0) return null;
  let hasFailed = issues.some(onm),
    status = hasFailed ? "error" : "warning",
    header;
  if (cache[0] !== status) header = ns.jsx(Ww, {
    title: "MCP servers",
    status: status
  }), cache[0] = status, cache[1] = header;else header = cache[1];
  let messageColor = hasFailed ? "error" : "warning",
    issueCount = issues.length,
    serverWord;
  if (cache[2] !== issues.length) serverWord = Sn(issues.length, "server"), cache[2] = issues.length, cache[3] = serverWord;else serverWord = cache[3];
  let summary = `${issueCount} MCP ${serverWord} not connected — run /mcp to authenticate, retry, or see details:`,
    summaryNode;
  if (cache[4] !== messageColor || cache[5] !== summary) summaryNode = ns.jsx(cs.Node, {
    color: messageColor,
    children: summary
  }), cache[4] = messageColor, cache[5] = summary, cache[6] = summaryNode;else summaryNode = cache[6];
  let issueNodes;
  if (cache[7] !== issues) issueNodes = issues.map(rnm), cache[7] = issues, cache[8] = issueNodes;else issueNodes = cache[8];
  let tree;
  if (cache[9] !== summaryNode || cache[10] !== issueNodes) tree = ns.jsxs(cs, {
    variant: "tree",
    children: [summaryNode, issueNodes]
  }), cache[9] = summaryNode, cache[10] = issueNodes, cache[11] = tree;else tree = cache[11];
  let section;
  if (cache[12] !== header || cache[13] !== tree) section = ns.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [header, tree]
  }), cache[12] = header, cache[13] = tree, cache[14] = section;else section = cache[14];
  return section;
}
/** Renders a single MCP server issue tree node. */
function rnm(issue: any, index: number) {
  return ns.jsxs(cs.Node, {
    dimColor: !0,
    children: [issue.name, ": ", N_l(issue), issue.error ? ` — ${issue.error}` : ""]
  }, index);
}
/** Predicate: whether an MCP issue is a hard failure. */
function onm(issue: any) {
  return issue.type === "failed";
}
/** Renders the "Plugin settings overridden" section for ineffective disables. */
function IneffectivePluginDisablesSection(props: any) {
  let cache = yPe.c(6),
    {
      disables: disables
    } = props;
  if (disables.length === 0) return null;
  let header;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) header = ns.jsx(Ww, {
    title: "Plugin settings overridden",
    status: "warning"
  }), cache[0] = header;else header = cache[0];
  let explainer;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) explainer = ns.jsx(cs.Node, {
    color: "warning",
    children: "These plugins are disabled in ~/.claude/settings.json, but a higher-precedence source re-enables them:"
  }), cache[1] = explainer;else explainer = cache[1];
  let disableNodes;
  if (cache[2] !== disables) disableNodes = disables.map(snm), cache[2] = disables, cache[3] = disableNodes;else disableNodes = cache[3];
  let section;
  if (cache[4] !== disableNodes) section = ns.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [header, ns.jsxs(cs, {
      variant: "tree",
      children: [explainer, disableNodes]
    })]
  }), cache[4] = disableNodes, cache[5] = section;else section = cache[5];
  return section;
}
/** Renders a single ineffective-disable tree node. */
function snm(disable: any, index: number) {
  return ns.jsx(cs.Node, {
    dimColor: !0,
    children: E8r(disable)
  }, index);
}
/** Renders a single plugin error/note row (source, optional plugin, message). */
function U_l(props: any) {
  let cache = yPe.c(4),
    {
      source: source,
      plugin: plugin,
      message: message
    } = props,
    sourceLabel = source || "unknown",
    pluginLabel = plugin ? ` [${plugin}]` : "",
    node;
  if (cache[0] !== message || cache[1] !== sourceLabel || cache[2] !== pluginLabel) node = ns.jsxs(cs.Node, {
    dimColor: !0,
    children: [sourceLabel, pluginLabel, ": ", message]
  }), cache[0] = message, cache[1] = sourceLabel, cache[2] = pluginLabel, cache[3] = node;else node = cache[3];
  return node;
}
/** Renders the "Plugin errors" and "Plugin notes" sections. */
function PluginErrorsSection(props: any) {
  let cache = yPe.c(7),
    {
      errors: errors,
      warnings: warnings
    } = props;
  if (errors.length === 0 && warnings.length === 0) return null;
  let errorsSection;
  if (cache[0] !== errors) errorsSection = errors.length > 0 && ns.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [ns.jsx(Ww, {
      title: "Plugin errors",
      status: "error"
    }), ns.jsxs(cs, {
      variant: "tree",
      children: [ns.jsx(cs.Node, {
        color: "error",
        children: `${errors.length} plugin ${Sn(errors.length, "error")} detected:`
      }), errors.map(anm)]
    })]
  }), cache[0] = errors, cache[1] = errorsSection;else errorsSection = cache[1];
  let warningsSection;
  if (cache[2] !== warnings) warningsSection = warnings.length > 0 && ns.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [ns.jsx(Ww, {
      title: "Plugin notes",
      status: "warning"
    }), ns.jsxs(cs, {
      variant: "tree",
      children: [ns.jsx(cs.Node, {
        color: "warning",
        children: `${warnings.length} plugin ${Sn(warnings.length, "note")}:`
      }), warnings.map(inm)]
    })]
  }), cache[2] = warnings, cache[3] = warningsSection;else warningsSection = cache[3];
  let fragment;
  if (cache[4] !== errorsSection || cache[5] !== warningsSection) fragment = ns.jsxs(ns.Fragment, {
    children: [errorsSection, warningsSection]
  }), cache[4] = errorsSection, cache[5] = warningsSection, cache[6] = fragment;else fragment = cache[6];
  return fragment;
}
/** Renders a single plugin note row. */
function inm(warning: any, index: number) {
  return ns.jsx(U_l, {
    source: warning.source,
    plugin: "plugin" in warning ? warning.plugin : void 0,
    message: EO(warning)
  }, index);
}
/** Renders a single plugin error row. */
function anm(error: any, index: number) {
  return ns.jsx(U_l, {
    source: error.source,
    plugin: "plugin" in error ? error.plugin : void 0,
    message: fT(error)
  }, index);
}
/**
 * Assembles a multi-line prompt summarizing every detected diagnostic issue
 * (install warnings, MCP failures, keybinding conflicts, agent parse errors,
 * invalid settings, plugin errors/notes/settings, sandbox deps, context
 * warnings, env-var caps). Returns null when there is nothing to report.
 */
function buildFixPrompt(installationInfo: any, agentInfo: any, settingsIssues: any, pluginErrors: any, pluginNotes: any, contextWarnings: any, envVarStatuses: any, keybindingWarnings = K2.warnings, sandboxErrors = nnm(), pluginSettingIssues: any[] = [], mcpIssues: any[] = []) {
  let lines: string[] = [];
  for (let warning of installationInfo?.warnings ?? []) lines.push(`- ${warning.issue}
  Suggested fix: ${warning.fix}`);
  for (let mcpIssue of mcpIssues) {
    let errorSuffix = mcpIssue.error ? ` — ${mcpIssue.error}` : "";
    lines.push(`- MCP server '${mcpIssue.name}': ${N_l(mcpIssue)}${errorSuffix}
  Run /mcp to authenticate, retry, or inspect the server.`);
  }
  for (let keybinding of keybindingWarnings) lines.push(`- Keybinding (${She()}): ${keybinding.message}${keybinding.suggestion ? `
  Suggested fix: ${keybinding.suggestion}` : ""}`);
  for (let failedFile of agentInfo?.failedFiles ?? []) lines.push(`- Agent file failed to parse: ${failedFile.path}
  Error: ${failedFile.error}`);
  for (let settingsIssue of settingsIssues) {
    let location = [settingsIssue.file, settingsIssue.path].filter(Boolean).join(" › ");
    lines.push(`- Settings${location ? ` (${location})` : ""}: ${settingsIssue.message}${settingsIssue.suggestion ? `
  Suggested fix: ${settingsIssue.suggestion}` : ""}`);
  }
  for (let pluginError of pluginErrors) {
    let location = ["plugin" in pluginError && pluginError.plugin, pluginError.source].filter(Boolean).join(" @ ");
    lines.push(`- Plugin${location ? ` (${location})` : ""}: ${fT(pluginError)}`);
  }
  for (let pluginSettingIssue of pluginSettingIssues) lines.push(`- Plugin setting: ${E8r(pluginSettingIssue)}`);
  for (let pluginNote of pluginNotes) {
    let location = ["plugin" in pluginNote ? pluginNote.plugin : void 0, pluginNote.source].filter(Boolean).join(" @ ");
    lines.push(`- Plugin note${location ? ` (${location})` : ""}: ${EO(pluginNote)}`);
  }
  for (let sandboxError of sandboxErrors) lines.push(`- Sandbox: ${sandboxError}
  (See /sandbox for install instructions)`);
  for (let contextWarning of [contextWarnings?.claudeMdWarning, contextWarnings?.agentWarning, contextWarnings?.unreachableRulesWarning]) if (contextWarning) lines.push(`- ${contextWarning.message}
  ${contextWarning.details.join(`
  `)}`);
  for (let envVar of envVarStatuses) lines.push(`- Environment variable ${envVar.name}: ${envVar.message}`);
  if (lines.length === 0) return null;
  return ["Help me fix the issues reported by /doctor below.", "", "For each issue: briefly explain what the fix will do, then ask me to confirm before running any shell command that deletes files, modifies global config, or changes my installation. Safe read-only checks are fine without asking. If a suggested fix looks wrong for my setup, say so instead of running it.", "", lines.join(`
`)].join(`
`);
}
/** Renders a context-usage warning (message plus detail lines). */
function P_l(props: any) {
  let cache = yPe.c(7),
    {
      warning: warning
    } = props,
    messageNode;
  if (cache[0] !== warning.message) messageNode = ns.jsx(cs.Node, {
    color: "warning",
    children: warning.message
  }), cache[0] = warning.message, cache[1] = messageNode;else messageNode = cache[1];
  let detailNodes;
  if (cache[2] !== warning.details) detailNodes = warning.details.map(lnm), cache[2] = warning.details, cache[3] = detailNodes;else detailNodes = cache[3];
  let group;
  if (cache[4] !== messageNode || cache[5] !== detailNodes) group = ns.jsxs(cs.Group, {
    children: [messageNode, detailNodes]
  }), cache[4] = messageNode, cache[5] = detailNodes, cache[6] = group;else group = cache[6];
  return group;
}
/** Renders a single context-warning detail tree node. */
function lnm(detail: any, index: number) {
  return ns.jsx(cs.Node, {
    dimColor: !0,
    children: detail
  }, index);
}
var yPe, r7n, cP, ns;
var o7n = b(() => {
  zgl();
  LKn();
  GS();
  dn();
  lt();
  fC();
  g_l();
  tht();
  Is();
  Wo();
  OE();
  rS();
  kte();
  rvo();
  S_l();
  E_l();
  R_l();
  cvo();
  uvo();
  TI();
  je();
  MZ();
  ss();
  mn();
  wW();
  uo();
  Q8();
  F_e();
  D_l();
  c0e();
  Qrt();
  Xl();
  Qao();
  $d();
  ZDe();
  Uh();
  C8r();
  lJ();
  aBt();
  lr();
  v_o();
  o_e();
  yPe = x(tt(), 1), r7n = require("path"), cP = x(et(), 1), ns = x(oe(), 1);
});

export {mvo,DistTagsDisplay,LastUpdateNode,formatLastUpdateResult,Doctor,nnm,N_l,McpConnectionIssuesSection,rnm,onm,IneffectivePluginDisablesSection,snm,U_l,PluginErrorsSection,inm,anm,buildFixPrompt,P_l,lnm,yPe,r7n,cP,ns,o7n};
