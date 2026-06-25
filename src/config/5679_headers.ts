// @ts-nocheck
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {ho} from "../../vendor/m572.ts";
import {getUserAgent as N7,kk} from "../api/2037_withOAuth401Retry.ts";
import {Uke,$ke} from "../../vendor/m2752.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {useTimeout as md,WPt} from "../../vendor/m2460.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gd,xw} from "../tui/3853_mode.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {setBgExitCause as iA,mK} from "../../vendor/m231.ts";
import {b,x} from "../../runtime.ts";
import {ap} from "../../vendor/m573.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck

/** Result of a single connectivity preflight probe. */
interface PreflightResult {
  success: boolean;
  error?: string;
  sslHint?: string;
}

/**
 * Runs the network preflight check: probes the API `/api/hello` and the OAuth
 * `/v1/oauth/hello` endpoints. Returns the first failing probe (if any),
 * otherwise `{ success: true }`. Emits telemetry on failure.
 */
async function bKm(): Promise<PreflightResult> {
  try {
    let oauthConfig = Hs(),
      tokenUrl = new URL(oauthConfig.TOKEN_URL),
      endpoints: string[] = [`${oauthConfig.BASE_API_URL}/api/hello`, `${tokenUrl.origin}/v1/oauth/hello`],
      probe = async (url: string): Promise<PreflightResult> => {
        try {
          let response = await ho.get(url, {
            headers: {
              "User-Agent": N7()
            }
          });
          if (response.status !== 200) return {
            success: !1,
            error: `Failed to connect to ${new URL(url).hostname}: Status ${response.status}`
          };
          return {
            success: !0
          };
        } catch (err) {
          let hostname = new URL(url).hostname,
            sslHint = Uke(err);
          return {
            success: !1,
            error: `Failed to connect to ${hostname}: ${err instanceof Error ? err.code || err.message : String(err)}`,
            sslHint: sslHint ?? void 0
          };
        }
      },
      firstFailure = (await Promise.all(endpoints.map(probe))).find(result => !result.success);
    if (firstFailure) W("tengu_preflight_check_failed", {
      isConnectivityError: !1,
      hasErrorMessage: !!firstFailure.error,
      isSSLError: !!firstFailure.sslHint
    });
    return firstFailure || {
      success: !0
    };
  } catch (err) {
    return Ie(err), W("tengu_preflight_check_failed", {
      isConnectivityError: !0
    }), {
      success: !1,
      error: `Connectivity check error: ${err instanceof Error ? err.code || err.message : String(err)}`
    };
  }
}

/**
 * React component that runs the connectivity preflight check on mount and
 * renders a spinner while checking, an error panel on failure, or invokes
 * `onSuccess` once the check passes.
 */
function Mpc(props): any {
  let cache = Lpc.c(14),
    {
      onSuccess
    } = props,
    [result, setResult] = Gyt.useState(null),
    [isChecking, setIsChecking] = Gyt.useState(!0),
    timedOut = md(1000) && isChecking,
    runCheckEffect,
    runCheckDeps;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) runCheckEffect = () => {
    (async function () {
      let preflightResult = await bKm();
      setResult(preflightResult), setIsChecking(!1);
    })();
  }, runCheckDeps = [], cache[0] = runCheckEffect, cache[1] = runCheckDeps;else runCheckEffect = cache[0], runCheckDeps = cache[1];
  Gyt.useEffect(runCheckEffect, runCheckDeps);
  let onSuccessEffect;
  if (cache[2] !== onSuccess || cache[3] !== result?.success) onSuccessEffect = () => {
    if (result?.success) onSuccess();
  }, cache[2] = onSuccess, cache[3] = result?.success, cache[4] = onSuccessEffect;else onSuccessEffect = cache[4];
  let onSuccessDeps;
  if (cache[5] !== onSuccess || cache[6] !== result) onSuccessDeps = [result, onSuccess], cache[5] = onSuccess, cache[6] = result, cache[7] = onSuccessDeps;else onSuccessDeps = cache[7];
  Gyt.useEffect(onSuccessEffect, onSuccessDeps), md(EKm, result && !result.success ? 100 : null);
  let body;
  if (cache[8] !== isChecking || cache[9] !== result || cache[10] !== timedOut) body = isChecking && timedOut ? TU.jsxs($, {
    paddingLeft: 1,
    children: [TU.jsx(gd, {}), TU.jsx(v, {
      children: "Checking connectivity..."
    })]
  }) : !result?.success && !isChecking && TU.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [TU.jsx(v, {
      color: "error",
      children: "Unable to connect to Anthropic services"
    }), TU.jsx(v, {
      color: "error",
      children: result?.error
    }), result?.sslHint ? TU.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [TU.jsx(v, {
        children: result.sslHint
      }), TU.jsx(v, {
        color: "suggestion",
        children: "See https://code.claude.com/docs/en/network-config"
      })]
    }) : TU.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [TU.jsx(v, {
        children: "Please check your internet connection and network settings."
      }), TU.jsxs(v, {
        children: ["Note: Claude Code might not be available in your country. Check supported countries at", " ", TU.jsx(v, {
          color: "suggestion",
          children: "https://anthropic.com/supported-countries"
        })]
      })]
    })]
  }), cache[8] = isChecking, cache[9] = result, cache[10] = timedOut, cache[11] = body;else body = cache[11];
  let container;
  if (cache[12] !== body) container = TU.jsx($, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1,
    children: body
  }), cache[12] = body, cache[13] = container;else container = cache[13];
  return container;
}

/** Timeout handler: records the preflight-endpoint exit cause and exits. */
function EKm(): void {
  iA("preflight_endpoint"), process.exit(1);
}
var Lpc, Gyt, TU;
var Npc = b(() => {
  ap();
  kt();
  xw();
  Sc();
  mK();
  WPt();
  je();
  $ke();
  kk();
  vn();
  Lpc = x(tt(), 1), Gyt = x(et(), 1), TU = x(oe(), 1);
});

export {bKm,Mpc,EKm,Lpc,Gyt,TU,Npc};
