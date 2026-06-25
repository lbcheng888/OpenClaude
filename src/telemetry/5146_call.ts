// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {_2l,zDo,xJn,y2l,g2l,T2l} from "../../vendor/m5144.ts";
import {IJn,KDo} from "../../vendor/m5143.ts";
import {Kb,zN} from "../../vendor/m688.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {Bee,mat,nle} from "../core/3336_environment_id.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Mge,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/*
 * telemetry/5146_call.ts - "Connect Claude on the web to GitHub" remote setup flow.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal/bundle names are retained where local usage does not verify a safer semantic name.
 *
 * This module checks Claude login + GitHub CLI auth, obtains a `gh auth token`,
 * and walks the user through importing it so Claude on the web can clone/push.
 */
var S2l = {};
ft(S2l, {
  call: () => call
});
/**
 * Detect the current credential situation for the remote (web) GitHub setup.
 * Returns a discriminated status describing whether the user is signed in to
 * Claude, whether the GitHub CLI is installed/authenticated, and a token if available.
 */
async function gAm(): Promise<any> {
  if (!(await _2l())) return {
    status: "not_signed_in"
  };
  let ghAuthState = await IJn();
  if (ghAuthState === "not_installed") return {
    status: "gh_not_installed"
  };
  if (ghAuthState === "not_authenticated") return {
    status: "gh_not_authenticated"
  };
  let {
      stdout: tokenOutput
    } = await Kb("gh", ["auth", "token"], {
      stdout: "pipe",
      stderr: "ignore",
      timeout: 5000,
      reject: !1
    }),
    token = tokenOutput.trim();
  if (!token) return {
    status: "gh_not_authenticated"
  };
  return {
    status: "has_gh_token",
    token: new zDo(token)
  };
}
/**
 * Map a token-import error into a user-facing message.
 * @param error - failure object carrying a `kind` discriminator (and `status` for server errors).
 * @param baseUrl - web onboarding base URL referenced in the "not_signed_in" message.
 */
function _Am(error: any, baseUrl: any): any {
  switch (error.kind) {
    case "not_signed_in":
      return `Login failed. Please visit ${baseUrl} and login using the GitHub App`;
    case "invalid_token":
      return "GitHub rejected that token. Run `gh auth login` and try again.";
    case "server":
      return `Server error (${error.status}). Try again in a moment.`;
    case "network":
      return "Couldn't reach the server. Check your connection.";
  }
}
/**
 * Interactive component that drives the GitHub connection flow:
 * checking -> (cancel | error | confirm) -> uploading -> success.
 * @param props.onDone - callback invoked when the flow ends; an optional string is an error/result message.
 */
function yAm({
  onDone: onDone
}): any {
  let [flowState, setFlowState] = o_t.useState({
      name: "checking"
    }),
    cancelledRef = o_t.useRef(!1);
  o_t.useEffect(() => {
    W("tengu_remote_setup_started", {}), gAm().then(async (setupStatus: any) => {
      if (cancelledRef.current) return;
      switch (setupStatus.status) {
        case "not_signed_in":
          W("tengu_remote_setup_result", {
            result: Ve("not_signed_in")
          }), onDone("Not signed in to Claude. Run /login first.");
          return;
        case "gh_not_installed":
        case "gh_not_authenticated":
          {
            let altAuthUrl = `${xJn()}/onboarding?step=alt-auth`;
            if (await Zl(altAuthUrl), cancelledRef.current) return;
            W("tengu_remote_setup_result", {
              result: Le(setupStatus.status)
            }), onDone(setupStatus.status === "gh_not_installed" ? `GitHub CLI not found. Install it via https://cli.github.com/, then run \`gh auth login\`, or connect GitHub on the web: ${altAuthUrl}` : `GitHub CLI not authenticated. Run \`gh auth login\` and try again, or connect GitHub on the web: ${altAuthUrl}`);
            return;
          }
        case "has_gh_token":
          {
            let authMode = await y2l();
            if (cancelledRef.current) return;
            setFlowState({
              name: "confirm",
              token: setupStatus.token,
              existingOAuth: authMode === "oauth"
            });
          }
      }
    });
  }, []);
  let handleCancel = () => {
      cancelledRef.current = !0, W("tengu_remote_setup_result", {
        result: Ve("cancelled")
      }), onDone();
    },
    handleConfirm = async (token: any) => {
      setFlowState({
        name: "uploading"
      });
      let importResult = await g2l(token);
      if (cancelledRef.current) return;
      if (!importResult.ok) {
        W("tengu_remote_setup_result", {
          result: Ve("import_failed"),
          error_kind: Le(importResult.error.kind)
        }), onDone(_Am(importResult.error, xJn()));
        return;
      }
      let needsDefaultEnvironment = !0;
      try {
        needsDefaultEnvironment = (await Bee()).length === 0;
      } catch {
        needsDefaultEnvironment = !0;
      }
      if (cancelledRef.current) return;
      if (needsDefaultEnvironment) {
        try {
          await mat();
        } catch (createEnvError) {
          A(`[web-setup] Failed to create default environment: ${createEnvError}`, {
            level: "warn"
          });
        }
        if (cancelledRef.current) return;
      }
      let webUrl = xJn();
      if (await Zl(webUrl), cancelledRef.current) return;
      W("tengu_remote_setup_result", {
        result: Ve("success")
      }), onDone(`Connected as ${importResult.result.github_username}. Opened ${webUrl}`);
    };
  if (flowState.name === "checking" || flowState.name === "uploading") return vJ.jsx(Jn, {
    title: "Connect Claude on the web to GitHub?",
    onCancel: handleCancel,
    hideInputGuide: !0,
    children: vJ.jsx(Hc, {
      message: flowState.name === "uploading" ? "Connecting GitHub to Claude…" : "Checking login status…"
    })
  });
  let confirmToken = flowState.token;
  return vJ.jsxs(Jn, {
    title: "Connect Claude on the web to GitHub?",
    onCancel: handleCancel,
    hideInputGuide: !0,
    children: [vJ.jsxs($, {
      flexDirection: "column",
      children: [vJ.jsx(v, {
        children: "Claude on the web requires connecting to your GitHub account to clone and push code on your behalf."
      }), vJ.jsx(v, {
        dimColor: !0,
        children: "Your local credentials are used to authenticate with GitHub"
      }), flowState.existingOAuth && vJ.jsx($, {
        marginTop: 1,
        children: vJ.jsxs(v, {
          color: "warning",
          children: ["You're already connected via the GitHub App. Continuing replaces your authentication credential for Claude Code on the web. Your repository access will change to reflect your local token's scopes. You can reconnect the GitHub App from", " ", Mge(), " later."]
        })
      })]
    }), vJ.jsx(Bl, {
      confirmLabel: flowState.existingOAuth ? "Replace connection" : "Continue",
      cancelLabel: "Cancel",
      onConfirm: () => void handleConfirm(confirmToken),
      onCancel: handleCancel
    })]
  });
}
/**
 * Command entry point: render the remote GitHub setup flow.
 * @param onDone - callback forwarded to the flow component.
 */
async function call(onDone: any): Promise<any> {
  return vJ.jsx(yAm, {
    onDone: onDone
  });
}
var o_t: any, vJ: any;
var b2l = b(() => {
  d_();
  di();
  OE();
  je();
  kt();
  wW();
  Jg();
  qe();
  KDo();
  zN();
  nle();
  T2l();
  o_t = x(et(), 1), vJ = x(oe(), 1);
});

export {S2l,gAm,_Am,yAm,call as TAm,o_t,vJ,b2l};
