// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {w1a,Jlo} from "../api/3854_needle.ts";
import {_c,PE} from "../../vendor/m3831.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Fy} from "../../vendor/m3832.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
// Restored from obfuscated Claude Code 2.1.190.
// 1:1 reverse-engineering: only local renames, TS types, and doc comments were
// added. Behavior, control flow, operators (incl. !0/!1/void 0), string
// literals, and all cross-module / property references are preserved exactly.
//
// NOTE vs v2.1.185: this version emits UI via the JSX runtime (`nL.jsx` /
// `nL.jsxs`) instead of `React.createElement`, and the lazy init thunk / module
// symbols were re-minified (iu, k2n, nL, _c, Hc, $, v, bs, hr, Bl, Sn, w1a, …).

// --- Local types inferred from usage ---

/** Shared state collected/derived across the Bedrock setup wizard steps. */
interface BedrockWizardData {
  authMethod?: "bearer" | "profile" | "accessKey" | "environment" | string;
  verifiedIdentity?: string;
  discoveredProfiles?: string[];
  [key: string]: unknown;
}

/** Successful verification: an identity plus any discovered inference profiles. */
interface VerificationOk {
  status: "ok";
  identity: string;
  profiles: string[];
  /** Optional explanatory note shown instead of the profile-count message. */
  note?: string;
}

/** Failed verification: a human-readable error and an optional fix command. */
interface VerificationError {
  status: "error";
  error: string;
  command?: string;
}

type VerificationResult = VerificationOk | VerificationError;

/** Component-local phase: still verifying, or done with a result in hand. */
type VerifyPhase =
  | { phase: "checking" }
  | { phase: "done"; result: VerificationResult };

/**
 * Bedrock setup wizard "verification" step.
 *
 * On mount, verifies the wizard's credentials (`w1a`), stores the verified
 * identity and discovered inference profiles back into the wizard, and renders:
 *  - a spinner while checking,
 *  - a success panel (Continue) when verification passes, or
 *  - an error panel ("Save anyway" / "Go back and fix") when it fails.
 */
function W1a() {
  let {
      goBack,
      goNext,
      updateWizardData,
      wizardData,
    } = iu(),
    [verifyState, setVerifyState] = k2n.useState<VerifyPhase>({
      phase: "checking"
    });
  if (k2n.useEffect(() => {
    let cancelled = !1;
    return w1a(wizardData).then((result: VerificationResult) => {
      if (cancelled) return;
      if (result.status === "ok") updateWizardData({
        verifiedIdentity: result.identity,
        discoveredProfiles: result.profiles
      });else updateWizardData({
        verifiedIdentity: void 0,
        discoveredProfiles: void 0
      });
      setVerifyState({
        phase: "done",
        result: result
      });
    }), () => {
      cancelled = !0;
    };
  }, []), verifyState.phase === "checking") return nL.jsx(_c, {
    subtitle: "Verifying credentials",
    children: nL.jsx(Hc, {
      message: wizardData.authMethod === "bearer" ? "Sending a test request to Bedrock…" : "Calling AWS STS and Bedrock…",
      subtitle: "This may take a few seconds."
    })
  });
  let {
    result
  } = verifyState;
  switch (result.status) {
    case "ok":
      return nL.jsx(_c, {
        subtitle: "Verification",
        children: nL.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [nL.jsxs(v, {
            children: [nL.jsx(bs, {
              status: "success",
              withSpace: !0
            }), "Authenticated as ", nL.jsx(v, {
              bold: !0,
              children: result.identity
            })]
          }), nL.jsx(v, {
            dimColor: !0,
            children: result.note ?? (result.profiles.length > 0 ? `Found ${result.profiles.length} Anthropic inference ${Sn(result.profiles.length, "profile")} in this region.` : "No Anthropic inference profiles found in this region. You may still proceed — model defaults will use the built-in IDs.")
          }), nL.jsx(hr, {
            options: [{
              label: "Continue",
              value: "continue"
            }],
            onChange: () => goNext(),
            onCancel: goBack
          })]
        })
      });
    case "error":
      return nL.jsx(_c, {
        subtitle: "Verification failed",
        color: "error",
        children: nL.jsxs($, {
          flexDirection: "column",
          gap: 1,
          children: [nL.jsxs($, {
            flexDirection: "column",
            children: [nL.jsxs(v, {
              children: [nL.jsx(bs, {
                status: "error",
                withSpace: !0
              }), result.error]
            }), result.command && nL.jsxs(v, {
              bold: !0,
              color: "suggestion",
              children: ["    ", result.command]
            })]
          }), nL.jsx(Bl, {
            cancelFirst: !0,
            focus: "cancel",
            confirmLabel: "Save anyway (skip verification)",
            cancelLabel: "Go back and fix",
            onConfirm: goNext,
            onCancel: goBack
          })]
        })
      });
  }
}
var k2n, nL;
var G1a = b(() => {
  je();
  lr();
  Ol();
  d_();
  OE();
  ff();
  Fy();
  PE();
  Jlo();
  k2n = x(et(), 1), nL = x(oe(), 1);
});

export {W1a,k2n,nL,G1a};
