// @ts-nocheck
import {Eu as D5} from "../../vendor/m3812.ts";
import {rIa as evK,uoo as W9q} from "../api/3836_needle.ts";
import {React as h1,CE as qM} from "../../vendor/m3813.ts";
import {Jc as z3,vE as bP} from "../../vendor/m3837.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Bs as z9,rA as Dz} from "../../vendor/m2550.ts";
import {Cn as p6,dr as P8} from "../../vendor/m231.ts";
import {pr as X8,Yl as g4} from "../../vendor/m2562.ts";
import {ac as z1,e_ as Gw} from "../../vendor/m3338.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {$y as kf} from "../../vendor/m3814.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// Restored from obfuscated Claude Code 2.1.177.
// 1:1 reverse-engineering: only renames, types, and doc comments were added.
// Behavior, control flow, operators (incl. !0/!1), string literals, and all
// cross-module / property references are preserved exactly.

// --- External (cross-module) symbols, kept by their recovered/minified names ---

/** React type aliases (for component / node types; runtime value is `ReactNs` below). */
type ComponentType<P> = import("react").ComponentType<P>;
type ReactNode = import("react").ReactNode;

/** React module factory (CommonJS interop target). */
declare function WH(): unknown;
/** CommonJS-to-ESM interop default-import helper. */
declare function u<T>(mod: unknown, mode: 1): T & { default: T };

/** Hook returning the Bedrock setup wizard navigation + shared wizard state. */
declare function D5(): {
  goBack: () => void;
  goNext: () => void;
  updateWizardData: (patch: Partial<BedrockWizardData>) => void;
  wizardData: BedrockWizardData;
};

/**
 * Runs the credential/identity verification for the current Bedrock wizard data
 * (calls AWS STS + Bedrock, or sends a test request when using a bearer token).
 */
declare function evK(data: BedrockWizardData): Promise<VerificationResult>;

/** Pluralize helper: returns `word` or its plural form based on `count`. */
declare function p6(count: number, word: string): string;

// --- UI components (kept by their recovered/minified names) ---

/** Wizard step container; renders a titled frame with optional color/footer. */
declare const h1: ComponentType<{
  subtitle?: string;
  color?: string;
  footerText?: ReactNode;
  children?: ReactNode;
}>;
/** Loading/progress indicator with a message and optional subtitle. */
declare const z3: ComponentType<{
  message: string;
  subtitle?: string;
  dimColor?: boolean;
}>;
/** Flexbox layout box (Ink `Box`-style). */
declare const B: ComponentType<{
  flexDirection?: "row" | "column";
  alignItems?: string;
  gap?: number;
  marginBottom?: number;
  children?: ReactNode;
}>;
/** Text element (Ink `Text`-style). */
declare const V: ComponentType<{
  bold?: boolean;
  dimColor?: boolean;
  color?: string;
  children?: ReactNode;
}>;
/** Status icon glyph (success / error), with optional trailing space. */
declare const z9: ComponentType<{
  status: "success" | "error";
  withSpace?: boolean;
}>;
/** Single-select option list. */
declare const X8: ComponentType<{
  options: Array<{ label: string; value: string }>;
  onChange: () => void;
  onCancel: () => void;
}>;
/** Confirm / cancel button pair. */
declare const z1: ComponentType<{
  cancelFirst?: boolean;
  focus?: "cancel" | "confirm";
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}>;

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
 * On mount, verifies the wizard's credentials (`evK`), stores the verified
 * identity and discovered inference profiles back into the wizard, and renders:
 *  - a spinner while checking,
 *  - a success panel (Continue) when verification passes, or
 *  - an error panel ("Save anyway" / "Go back and fix") when it fails.
 */
function MEK() {
  let {
      goBack,
      goNext,
      updateWizardData,
      wizardData,
    } = D5(),
    [verifyState, setVerifyState] = ReactNs.useState<VerifyPhase>({
      phase: "checking",
    });
  if (
    (ReactNs.useEffect(() => {
      let cancelled = !1;
      return (
        evK(wizardData).then((result) => {
          if (cancelled) return;
          if (result.status === "ok")
            updateWizardData({
              verifiedIdentity: result.identity,
              discoveredProfiles: result.profiles,
            });
          else
            updateWizardData({
              verifiedIdentity: void 0,
              discoveredProfiles: void 0,
            });
          setVerifyState({
            phase: "done",
            result,
          });
        }),
        () => {
          cancelled = !0;
        }
      );
    }, []),
    verifyState.phase === "checking")
  )
    return ReactNs.default.createElement(
      h1,
      {
        subtitle: "Verifying credentials",
      },
      ReactNs.default.createElement(z3, {
        message:
          wizardData.authMethod === "bearer"
            ? "Sending a test request to Bedrock…"
            : "Calling AWS STS and Bedrock…",
        subtitle: "This may take a few seconds.",
      }),
    );
  let { result } = verifyState;
  switch (result.status) {
    case "ok":
      return ReactNs.default.createElement(
        h1,
        {
          subtitle: "Verification",
        },
        ReactNs.default.createElement(
          B,
          {
            flexDirection: "column",
            gap: 1,
          },
          ReactNs.default.createElement(
            V,
            null,
            ReactNs.default.createElement(z9, {
              status: "success",
              withSpace: !0,
            }),
            "Authenticated as ",
            ReactNs.default.createElement(
              V,
              {
                bold: !0,
              },
              result.identity,
            ),
          ),
          ReactNs.default.createElement(
            V,
            {
              dimColor: !0,
            },
            result.note ??
              (result.profiles.length > 0
                ? `Found ${result.profiles.length} Anthropic inference ${p6(result.profiles.length, "profile")} in this region.`
                : "No Anthropic inference profiles found in this region. You may still proceed — model defaults will use the built-in IDs."),
          ),
          ReactNs.default.createElement(X8, {
            options: [
              {
                label: "Continue",
                value: "continue",
              },
            ],
            onChange: () => goNext(),
            onCancel: goBack,
          }),
        ),
      );
    case "error":
      return ReactNs.default.createElement(
        h1,
        {
          subtitle: "Verification failed",
          color: "error",
        },
        ReactNs.default.createElement(
          B,
          {
            flexDirection: "column",
            gap: 1,
          },
          ReactNs.default.createElement(
            B,
            {
              flexDirection: "column",
            },
            ReactNs.default.createElement(
              V,
              null,
              ReactNs.default.createElement(z9, {
                status: "error",
                withSpace: !0,
              }),
              result.error,
            ),
            result.command &&
              ReactNs.default.createElement(
                V,
                {
                  bold: !0,
                  color: "suggestion",
                },
                "    ",
                result.command,
              ),
          ),
          ReactNs.default.createElement(z1, {
            cancelFirst: !0,
            focus: "cancel",
            confirmLabel: "Save anyway (skip verification)",
            cancelLabel: "Go back and fix",
            onConfirm: goNext,
            onCancel: goBack,
          }),
        ),
      );
  }
}
/** React module namespace (lazily assigned in the init thunk below). */
var ReactNs: typeof import("react") & { default: typeof import("react") };
/**
 * Module init thunk (lazy ESM-init pattern): pulls in dependency modules and
 * binds the React namespace used by this step.
 */
var XEK = L(() => {
  nH();
  P8();
  g4();
  Gw();
  bP();
  Dz();
  kf();
  qM();
  W9q();
  ReactNs = u(WH(), 1);
});

export {MEK as yIa,ReactNs as lI,XEK as TIa};
