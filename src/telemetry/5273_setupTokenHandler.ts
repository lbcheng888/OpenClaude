// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {createRoot as GPt,je} from "../../vendor/m2462.ts";
import {getBaseRenderOptions as D1,qee} from "./3372_getBaseRenderOptions.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {isAnthropicAuthEnabled as aT,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {n9t,kNa} from "../tui/3876_ConsoleOAuthFlow.ts";
import {AppStateProvider as IE,pq} from "../../vendor/m3370.ts";
import {wSe,U_t} from "../../vendor/m5270.ts";
import {KeybindingSetup as kC,WW} from "../../vendor/m3362.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {xOe,KKt} from "../../vendor/m5266.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {He,xe,mn} from "./0600_feature_name.ts";
import {hZn,F1o} from "../tui/5270_enabled.ts";
import {q6,B_t} from "../../vendor/m5253.ts";
import {hWt,Sue} from "../../vendor/m4678.ts";
import {Ne} from "../../vendor/m583.ts";
import {dZn,uZn} from "../config/5263_setup.ts";
import {KWl,VWl} from "../tui/5272_install.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {o7n,mvo} from "../tui/4626_formatLastUpdateResult.ts";
/**
 * CLI subcommand handlers for the Claude Code interactive setup flows.
 *
 * Exposes four entry points wired into the lazy-loaded module table `vb`:
 *  - setupTokenHandler: drives the long-lived OAuth setup-token flow.
 *  - installHandler:    runs the native installer / migration.
 *  - doctorHandler:     renders the `doctor` diagnostics UI.
 *  - createSubcommandRoot: builds an Ink render root for nested subcommands.
 *
 * Each handler renders an Ink tree, awaits a completion Promise, then unmounts
 * and exits the process with the appropriate status code.
 */
var vb = {};
ft(vb, {
  setupTokenHandler: () => setupTokenHandler,
  installHandler: () => installHandler,
  doctorHandler: () => doctorHandler,
  createSubcommandRoot: () => createSubcommandRoot
});

/** Create an Ink render root configured for a CLI subcommand (no console patching). */
function createSubcommandRoot() {
  return GPt({
    ...D1(!1),
    patchConsole: !1
  });
}

/**
 * Render the OAuth "setup-token" flow and block until the user completes it.
 *
 * @param renderRoot - Ink render root that exposes `render` / `unmount`.
 */
async function setupTokenHandler(renderRoot) {
  W("tengu_setup_token_command", {});
  let hasExistingAuth: boolean = !aT(),
    {
      ConsoleOAuthFlow: ConsoleOAuthFlow
    } = await Promise.resolve().then(() => (n9t(), kNa));
  await new Promise<void>(resolveFlowDone => {
    renderRoot.render(yN.jsx(IE, {
      onChangeAppState: wSe,
      children: yN.jsx(kC, {
        children: yN.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [yN.jsx(xOe, {}), hasExistingAuth && yN.jsxs($, {
            flexDirection: "column",
            children: [yN.jsx(v, {
              color: "warning",
              children: "Warning: You already have authentication configured via environment variable or API key helper."
            }), yN.jsx(v, {
              color: "warning",
              children: "The setup-token command will create a new OAuth token which you can use instead."
            })]
          }), yN.jsx($, {
            paddingLeft: 1,
            children: yN.jsx(ConsoleOAuthFlow, {
              onDone: () => {
                resolveFlowDone();
              },
              mode: "setup-token",
              startingMessage: "This will guide you through long-lived (1-year) auth token setup for your Claude account. Claude subscription required.",
              urlOutdent: 1
            })
          })]
        })
      })
    }));
  }), renderRoot.unmount(), He("cli_setup_token"), process.exit(0);
}

/**
 * Memoized wrapper that renders the lazy-loaded Doctor component inside a
 * Suspense boundary, forwarding the `onDone` callback.
 *
 * @param props - `{ onDone }` completion callback.
 */
function VPm(props) {
  let memoCache = zWl.c(2),
    {
      onDone: onDone
    } = props;
  hZn();
  let renderedNode;
  if (memoCache[0] !== onDone) renderedNode = yN.jsx(_Zn.Suspense, {
    fallback: null,
    children: yN.jsx(GPm, {
      onDone: onDone
    })
  }), memoCache[0] = onDone, memoCache[1] = renderedNode;else renderedNode = memoCache[1];
  return renderedNode;
}

/**
 * Render the `doctor` diagnostics UI and block until it finishes.
 *
 * @param renderRoot - Ink render root that exposes `render` / `unmount`.
 */
async function doctorHandler(renderRoot) {
  W("tengu_doctor_command", {}), await q6({
    hasDynamicMcpConfig: !1
  }), await new Promise<void>(resolveDoctorDone => {
    renderRoot.render(yN.jsx(IE, {
      children: yN.jsx(kC, {
        children: yN.jsx(hWt, {
          dynamicMcpConfig: void 0,
          isStrictMcpConfig: !1,
          children: yN.jsx(VPm, {
            onDone: () => {
              resolveDoctorDone();
            }
          })
        })
      })
    }));
  }), renderRoot.unmount(), He("cli_doctor"), process.exit(0);
}

/**
 * Run the native installer / migration, then exit.
 *
 * @param target  - Optional install target argument forwarded to the installer.
 * @param options - `{ force }` flag controlling `--force`.
 */
async function installHandler(target, options) {
  if (Ne.DISABLE_UPDATES) process.stdout.write(`Updates are disabled by your administrator. Contact your IT team to get the latest version.
`), process.exit(0);
  let {
    setup: setup
  } = await Promise.resolve().then(() => (dZn(), uZn));
  await setup(jWl.cwd(), "default", !1, !1, void 0, !1);
  let {
    install: install
  } = await Promise.resolve().then(() => (KWl(), VWl));
  await new Promise<void>(resolveInstallDone => {
    let installArgs: string[] = [];
    if (target) installArgs.push(target);
    if (options.force) installArgs.push("--force");
    install.call(resultText => {
      if (resolveInstallDone(), resultText.includes("failed")) xe("cli_install", "cli_install_failed");else He("cli_install");
      process.exit(resultText.includes("failed") ? 1 : 0);
    }, {}, installArgs);
  });
}

var zWl, jWl, _Zn, yN, GPm;

/** Lazy module initializer: resolves the deferred imports used above. */
var wb = b(() => {
  KKt();
  F1o();
  je();
  WW();
  mn();
  kt();
  Sue();
  B_t();
  pq();
  U_t();
  lo();
  Ir();
  qee();
  zWl = x(tt(), 1), jWl = require("process"), _Zn = x(et(), 1), yN = x(oe(), 1);
  GPm = _Zn.lazy(() => Promise.resolve().then(() => (o7n(), mvo)).then(loadedModule => ({
    default: loadedModule.Doctor
  })));
});

export {vb,createSubcommandRoot,setupTokenHandler,VPm,doctorHandler,installHandler,zWl,jWl,_Zn,yN,GPm,wb};
