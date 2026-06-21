// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {createRoot as zIt,ze as Je} from "../../vendor/m2452.ts";
import {getBaseRenderOptions as cN,zee as Nee} from "../telemetry/3356_getBaseRenderOptions.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {isAnthropicAuthEnabled as uT,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {HUt as lUt,r0a as GHa} from "./3858_ConsoleOAuthFlow.ts";
import {AppStateProvider as _E,Jq as Nq} from "../../vendor/m3354.ts";
import {Xye as Oye,bAt as Qft} from "../../vendor/m5237.ts";
import {KeybindingSetup as bC,xW as uW} from "../../vendor/m3346.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {OPe as hPe,gWt as q5t} from "../../vendor/m5233.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Ie as He,Oe as Pe,ln as cn} from "../telemetry/0594_feature_name.ts";
import {AYn as xzn,_Do as d0o} from "./5237_enabled.ts";
import {GJ as kJ,AWt as U5t} from "../../vendor/m5220.ts";
import {K6t as y6t,Sue as lue} from "../../vendor/m4650.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {pYn as vzn,dYn as Czn} from "../config/5230_setup.ts";
import {n$l as DUl,t$l as IUl} from "./5239_install.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {E5n as M8n,ZTo as zyo} from "./4598_formatLastUpdateResult.ts";
// @ts-nocheck
var wD = {};
pt(wD, {
  setupTokenHandler: () => setupTokenHandler,
  installHandler: () => installHandler,
  doctorHandler: () => doctorHandler,
  createSubcommandRoot: () => createSubcommandRoot
});
function createSubcommandRoot() {
  return zIt({
    ...cN(false),
    patchConsole: false
  });
}
async function setupTokenHandler(H) {
  j("tengu_setup_token_command", {});
  let _ = !uT(),
    {
      ConsoleOAuthFlow: q
    } = await Promise.resolve().then(() => (lUt(), GHa));
  await new Promise(K => {
    H.render(Yy.default.createElement(_E, {
      onChangeAppState: Oye
    }, Yy.default.createElement(bC, null, Yy.default.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, Yy.default.createElement(hPe, null), _ && Yy.default.createElement(B, {
      flexDirection: "column"
    }, Yy.default.createElement(w, {
      color: "warning"
    }, "Warning: You already have authentication configured via environment variable or API key helper."), Yy.default.createElement(w, {
      color: "warning"
    }, "The setup-token command will create a new OAuth token which you can use instead.")), Yy.default.createElement(B, {
      paddingLeft: 1
    }, Yy.default.createElement(q, {
      onDone: () => {
        K();
      },
      mode: "setup-token",
      startingMessage: "This will guide you through long-lived (1-year) auth token setup for your Claude account. Claude subscription required.",
      urlOutdent: 1
    }))))));
  }), H.unmount(), He("cli_setup_token"), process.exit(0);
}
function mzT(H) {
  let _ = kV4.c(2),
    {
      onDone: q
    } = H;
  xzn();
  let K;
  if (_[0] !== q) K = Yy.default.createElement(Yy.default.Suspense, {
    fallback: null
  }, Yy.default.createElement(uzT, {
    onDone: q
  })), _[0] = q, _[1] = K;else K = _[1];
  return K;
}
async function doctorHandler(H) {
  j("tengu_doctor_command", {}), await kJ({
    hasDynamicMcpConfig: false
  }), await new Promise(_ => {
    H.render(Yy.default.createElement(_E, null, Yy.default.createElement(bC, null, Yy.default.createElement(y6t, {
      dynamicMcpConfig: undefined,
      isStrictMcpConfig: false
    }, Yy.default.createElement(mzT, {
      onDone: () => {
        _();
      }
    })))));
  }), H.unmount(), He("cli_doctor"), process.exit(0);
}
async function installHandler(H, _) {
  if (Ge.DISABLE_UPDATES) process.stdout.write(`Updates are disabled by your administrator. Contact your IT team to get the latest version.
`), process.exit(0);
  let {
    setup: q
  } = await Promise.resolve().then(() => (vzn(), Czn));
  await q(NV4.cwd(), "default", false, false, undefined, false);
  let {
    install: K
  } = await Promise.resolve().then(() => (DUl(), IUl));
  await new Promise(O => {
    let T = [];
    if (H) T.push(H);
    if (_.force) T.push("--force");
    K.call(z => {
      if (O(), z.includes("failed")) Pe("cli_install", "cli_install_failed");else He("cli_install");
      process.exit(z.includes("failed") ? 1 : 0);
    }, {}, T);
  });
}
var kV4, NV4, Yy, uzT;
var fD = b(() => {
  q5t();
  d0o();
  Je();
  uW();
  cn();
  Ct();
  lue();
  U5t();
  Nq();
  Qft();
  mo();
  Or();
  Nee();
  kV4 = L(nt(), 1), NV4 = require("process"), Yy = L(Te(), 1);
  uzT = Yy.default.lazy(() => Promise.resolve().then(() => (M8n(), zyo)).then(H => ({
    default: H.Doctor
  })));
});

export {wD as xb,createSubcommandRoot,setupTokenHandler,mzT as Ivm,doctorHandler,installHandler,kV4 as r$l,NV4 as o$l,Yy as yM,uzT as Hvm,fD as kb};
