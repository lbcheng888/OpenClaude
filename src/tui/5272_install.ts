// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Ne} from "../../vendor/m583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {cS,Rj} from "../../vendor/m3188.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {eJ,ZDe} from "../../vendor/m4536.ts";
import {lqe,aqe,olo,rlo} from "../config/3778_level.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {je,render as G8} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {rY} from "../../vendor/m3778.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * /install slash command (local-jsx).
 *
 * Renders an Ink UI that installs the Claude Code native build:
 * resolves the target channel/version, calls installLatest, sets up the
 * launcher + shell integration, cleans up legacy npm installs and shell
 * aliases, then reports success / error with setup notes.
 */
var VWl = {};
ft(VWl, {
  install: () => install
});

/** Returns the user-facing install location path (platform-aware). */
function FPm(): string {
  let isWindows = Ne.platform === "win32",
    homeDir = WWl.homedir();
  if (isWindows) return GWl.join(homeDir, ".local", "bin", "claude.exe").replaceAll("/", "\\");
  return "~/.local/bin/claude";
}

/**
 * Renders the "Setup notes:" block listing post-install setup messages.
 * Uses React compiler memo cache (`qWl.c`) to avoid re-creating elements.
 */
function $Wl(props: { messages: string[] }) {
  let memoCache = qWl.c(5),
    {
      messages: messages
    } = props;
  if (messages.length === 0) return null;
  let header;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) header = sf.jsx($, {
    children: sf.jsxs(v, {
      color: "warning",
      children: [sf.jsx(bs, {
        status: "warning",
        withSpace: !0
      }), "Setup notes:"]
    })
  }), memoCache[0] = header;else header = memoCache[0];
  let renderedMessages;
  if (memoCache[1] !== messages) renderedMessages = messages.map(BPm), memoCache[1] = messages, memoCache[2] = renderedMessages;else renderedMessages = memoCache[2];
  let rendered;
  if (memoCache[3] !== renderedMessages) rendered = sf.jsxs($, {
    flexDirection: "column",
    gap: 0,
    marginBottom: 1,
    children: [header, sf.jsx($, {
      flexDirection: "column",
      marginLeft: 2,
      children: renderedMessages
    })]
  }), memoCache[3] = renderedMessages, memoCache[4] = rendered;else rendered = memoCache[4];
  return rendered;
}

/** Renders a single dimmed setup-message line. */
function BPm(message: string, index: number) {
  return sf.jsx(cS, {
    children: sf.jsx(v, {
      dimColor: !0,
      children: message
    })
  }, index);
}

/**
 * The install UI component. Drives the install state machine
 * (checking -> installing -> setting-up -> set-up -> success | error)
 * and signals completion via `onDone`.
 */
function UPm({
  onDone: onDone,
  force: force,
  target: target
}: {
  onDone: (message: string, options?: { display?: string }) => void;
  force: boolean;
  target?: string;
}) {
  let [state, setState] = gZn.useState({
      type: "checking"
    }),
    clock = As();
  return gZn.useEffect(() => {
    async function runInstall() {
      try {
        A(`Install: Starting installation process (force=${force}, target=${target})`);
        let channelOrVersion = target || eJ();
        setState({
          type: "installing",
          version: channelOrVersion
        }), A(`Install: Calling installLatest(channelOrVersion=${channelOrVersion}, forceReinstall=${force})`);
        let installResult = await lqe(channelOrVersion, force);
        if (A(`Install: installLatest returned version=${installResult.latestVersion}, wasUpdated=${installResult.wasUpdated}, lockFailed=${installResult.lockFailed}`), installResult.lockFailed) throw Error("Could not install - another process is currently installing Claude. Please try again in a moment.");
        if (!installResult.latestVersion) A("Install: Failed to retrieve version information during install", {
          level: "error"
        });
        if (target === "latest" || target === "stable" || target === "rc") {
          let channel = target === "rc" ? "stable" : target;
          ao("userSettings", {
            autoUpdatesChannel: channel
          }), A(`Install: Saved autoUpdatesChannel=${channel} to user settings`);
        }
        if (!installResult.wasUpdated) A("Install: Already up to date");
        setState({
          type: "setting-up"
        });
        let setupMessages = await aqe(!0);
        if (A(`Install: Setup launcher completed with ${setupMessages.length} messages`), setupMessages.length > 0) setupMessages.forEach(msg => A(`Install: Setup message: ${msg.message}`));
        A("Install: Cleaning up npm installations after successful install");
        let {
          removed: removedCount,
          errors: cleanupErrors,
          warnings: cleanupWarnings
        } = await olo();
        if (removedCount > 0) A(`Cleaned up ${removedCount} npm installation(s)`);
        if (cleanupErrors.length > 0) A(`Cleanup errors: ${cleanupErrors.join(", ")}`);
        let aliasCleanupMessages = await rlo();
        if (aliasCleanupMessages.length > 0) A(`Shell alias cleanup: ${aliasCleanupMessages.map(msg => msg.message).join("; ")}`);
        W("tengu_claude_install_command", {
          has_version: installResult.latestVersion ? 1 : 0,
          forced: force ? 1 : 0
        });
        let extraMessages = [...cleanupWarnings, ...aliasCleanupMessages.map(msg => msg.message)];
        if (setupMessages.length > 0) setState({
          type: "set-up",
          messages: setupMessages.map(msg => msg.message)
        }), clock.setTimeout(() => setState({
          type: "success",
          version: installResult.latestVersion || "current",
          setupMessages: [...setupMessages.map(msg => msg.message), ...extraMessages]
        }), 2000);else A("Install: Shell PATH already configured"), setState({
          type: "success",
          version: installResult.latestVersion || "current",
          setupMessages: extraMessages
        });
      } catch (err) {
        A(`Install command failed: ${err}`, {
          level: "error"
        }), setState({
          type: "error",
          message: Ce(err)
        });
      }
    }
    runInstall();
  }, [clock, force, target]), md(() => {
    if (state.type === "success") onDone("Claude Code installation completed successfully", {
      display: "system"
    });else if (state.type === "error") onDone("Claude Code installation failed", {
      display: "system"
    });
  }, state.type === "success" ? 2000 : state.type === "error" ? 3000 : null), sf.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [state.type === "checking" && sf.jsx(v, {
      color: "claude",
      children: "Checking installation status..."
    }), state.type === "cleaning-npm" && sf.jsx(v, {
      color: "warning",
      children: "Cleaning up old npm installations..."
    }), state.type === "installing" && sf.jsxs(v, {
      color: "claude",
      children: ["Installing Claude Code native build ", state.version, "..."]
    }), state.type === "setting-up" && sf.jsx(v, {
      color: "claude",
      children: "Setting up launcher and shell integration..."
    }), state.type === "set-up" && sf.jsx($Wl, {
      messages: state.messages
    }), state.type === "success" && sf.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [sf.jsxs($, {
        children: [sf.jsx(bs, {
          status: "success",
          withSpace: !0
        }), sf.jsx(v, {
          color: "success",
          bold: !0,
          children: "Claude Code successfully installed!"
        })]
      }), sf.jsxs($, {
        marginLeft: 2,
        flexDirection: "column",
        gap: 1,
        children: [state.version !== "current" && sf.jsxs($, {
          children: [sf.jsx(v, {
            dimColor: !0,
            children: "Version: "
          }), sf.jsx(v, {
            color: "claude",
            children: state.version
          })]
        }), sf.jsxs($, {
          children: [sf.jsx(v, {
            dimColor: !0,
            children: "Location: "
          }), sf.jsx(v, {
            color: "text",
            children: FPm()
          })]
        })]
      }), sf.jsx($, {
        marginLeft: 2,
        flexDirection: "column",
        gap: 1,
        children: sf.jsxs($, {
          marginTop: 1,
          children: [sf.jsx(v, {
            dimColor: !0,
            children: "Next: Run "
          }), sf.jsx(v, {
            color: "claude",
            bold: !0,
            children: "claude --help"
          }), sf.jsx(v, {
            dimColor: !0,
            children: " to get started"
          })]
        })
      }), state.setupMessages.length > 0 && sf.jsx($Wl, {
        messages: state.setupMessages
      })]
    }), state.type === "error" && sf.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [sf.jsxs($, {
        children: [sf.jsx(bs, {
          status: "error",
          withSpace: !0
        }), sf.jsx(v, {
          color: "error",
          children: "Installation failed"
        })]
      }), sf.jsx(v, {
        color: "error",
        children: state.message
      }), sf.jsx($, {
        marginTop: 1,
        children: sf.jsx(v, {
          dimColor: !0,
          children: "Try running with --force to override checks"
        })
      })]
    })]
  });
}
var qWl, WWl, GWl, gZn, sf, install;
var KWl = b(() => {
  kt();
  Rj();
  ff();
  je();
  qe();
  Ir();
  Ct();
  rY();
  ZDe();
  br();
  qWl = x(tt(), 1), WWl = require("os"), GWl = require("path"), gZn = x(et(), 1), sf = x(oe(), 1);
  install = {
    type: "local-jsx",
    name: "install",
    description: "Install Claude Code native build",
    argumentHint: "[options]",
    async call(onDone, _context, args) {
      let force = args.includes("--force"),
        target = args.filter(arg => !arg.startsWith("--"))[0],
        {
          unmount: unmount
        } = await G8(sf.jsx(UPm, {
          onDone: (message, options) => {
            unmount(), onDone(message, options);
          },
          force: force,
          target: target
        }));
    }
  };
});

export {VWl,FPm,$Wl,BPm,UPm,qWl,WWl,GWl,gZn,sf,install,KWl};
