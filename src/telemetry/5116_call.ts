// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {$Pl,Uxo,B7n,qPl,UPl,jPl} from "../../vendor/m5114.ts";
import {N7n,Fxo} from "../../vendor/m5113.ts";
import {qb,vB} from "../../vendor/m682.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnum} from "../../vendor/m5.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {Gee,fst,rle} from "../core/3320_environment_id.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {Jc,vE} from "../../vendor/m3837.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
var WPl = {};
isFullscreenWithTTY(WPl, {
  call: () => lAm
});

/** Checks sign-in status and retrieves a GitHub auth token if available. */
async function sAm() {
  if (!(await $Pl())) return {
    status: "not_signed_in"
  };
  let ghCliStatus = await N7n();
  if (ghCliStatus === "not_installed") return {
    status: "gh_not_installed"
  };
  if (ghCliStatus === "not_authenticated") return {
    status: "gh_not_authenticated"
  };
  let {
      stdout: rawOutput
    } = await qb("gh", ["auth", "token"], {
      stdout: "pipe",
      stderr: "ignore",
      timeout: 5000,
      reject: !1
    }),
    token = rawOutput.trim();
  if (!token) return {
    status: "gh_not_authenticated"
  };
  return {
    status: "has_gh_token",
    token: new Uxo(token)
  };
}

/** Returns a human-readable error message for a given auth error and auth URL. */
function iAm(authError: any, authUrl: any) {
  switch (authError.kind) {
    case "not_signed_in":
      return `Login failed. Please visit ${authUrl} and login using the GitHub App`;
    case "invalid_token":
      return "GitHub rejected that token. Run `gh auth login` and try again.";
    case "server":
      return `Server error (${authError.status}). Try again in a moment.`;
    case "network":
      return "Couldn't reach the server. Check your connection.";
  }
}

/** React component that drives the GitHub web-connect onboarding flow. */
function aAm({
  onDone: onDone
}) {
  let [state, setState] = Uft.useState({
      name: "checking"
    }),
    cancelledRef = Uft.useRef(!1);
  Uft.useEffect(() => {
    logEvent("tengu_remote_setup_started", {}), sAm().then(async authResult => {
      if (cancelledRef.current) return;
      switch (authResult.status) {
        case "not_signed_in":
          logEvent("tengu_remote_setup_result", {
            result: Qe("not_signed_in")
          }), onDone("Not signed in to Claude. Run /login first.");
          return;
        case "gh_not_installed":
        case "gh_not_authenticated":
          {
            let onboardingUrl = `${B7n()}/onboarding?step=alt-auth`;
            if (await Oc(onboardingUrl), cancelledRef.current) return;
            logEvent("tengu_remote_setup_result", {
              result: fromEnum(authResult.status)
            }), onDone(authResult.status === "gh_not_installed" ? `GitHub CLI not found. Install it via https://cli.github.com/, then run \`gh auth login\`, or connect GitHub on the web: ${onboardingUrl}` : `GitHub CLI not authenticated. Run \`gh auth login\` and try again, or connect GitHub on the web: ${onboardingUrl}`);
            return;
          }
        case "has_gh_token":
          {
            let existingOAuth = await qPl();
            if (cancelledRef.current) return;
            setState({
              name: "confirm",
              token: authResult.token,
              existingOAuth: existingOAuth === "oauth"
            });
          }
      }
    });
  }, []);
  let handleCancel = () => {
      cancelledRef.current = !0, logEvent("tengu_remote_setup_result", {
        result: Qe("cancelled")
      }), onDone();
    },
    handleConfirm = async ghToken => {
      setState({
        name: "uploading"
      });
      let uploadResult = await UPl(ghToken);
      if (cancelledRef.current) return;
      if (!uploadResult.ok) {
        logEvent("tengu_remote_setup_result", {
          result: Qe("import_failed"),
          error_kind: fromEnum(uploadResult.error.kind)
        }), onDone(iAm(uploadResult.error, B7n()));
        return;
      }
      let noEnvs = !0;
      try {
        noEnvs = (await Gee()).length === 0;
      } catch {
        noEnvs = !0;
      }
      if (cancelledRef.current) return;
      if (noEnvs) {
        try {
          await fst();
        } catch (createErr) {
          logForDebugging(`[web-setup] Failed to create default environment: ${createErr}`, {
            level: "warn"
          });
        }
        if (cancelledRef.current) return;
      }
      let webUrl = B7n();
      if (await Oc(webUrl), cancelledRef.current) return;
      logEvent("tengu_remote_setup_result", {
        result: Qe("success")
      }), onDone(`Connected as ${uploadResult.result.github_username}. Opened ${webUrl}`);
    };
  if (state.name === "checking" || state.name === "uploading") return CI.createElement(Kn, {
    title: "Connect Claude on the web to GitHub?",
    onCancel: handleCancel,
    hideInputGuide: !0
  }, CI.createElement(Jc, {
    message: state.name === "uploading" ? "Connecting GitHub to Claude…" : "Checking login status…"
  }));
  let ghToken = state.token;
  return CI.createElement(Kn, {
    title: "Connect Claude on the web to GitHub?",
    onCancel: handleCancel,
    hideInputGuide: !0
  }, CI.createElement(Box, {
    flexDirection: "column"
  }, CI.createElement(Text, null, "Claude on the web requires connecting to your GitHub account to clone and push code on your behalf."), CI.createElement(Text, {
    dimColor: !0
  }, "Your local credentials are used to authenticate with GitHub"), state.existingOAuth && CI.createElement(Box, {
    marginTop: 1
  }, CI.createElement(Text, {
    color: "warning"
  }, "You're already connected via the GitHub App. Continuing replaces your authentication credential for Claude Code on the web. Your repository access will change to reflect your local token's scopes. You can reconnect the GitHub App from claude.ai/settings/connectors later."))), CI.createElement(ac, {
    confirmLabel: state.existingOAuth ? "Replace connection" : "Continue",
    cancelLabel: "Cancel",
    onConfirm: () => void handleConfirm(ghToken),
    onCancel: handleCancel
  }));
}

/** Top-level call handler: renders the GitHub connect component. */
async function lAm(onDone: any) {
  return CI.createElement(aAm, {
    onDone: onDone
  });
}
var CI, Uft;
var GPl = b(() => {
  e_();
  Li();
  vE();
  ze();
  Ct();
  b_();
  qe();
  Fxo();
  vB();
  rle();
  jPl();
  CI = M(Te(), 1), Uft = M(Te(), 1);
});
export {WPl,sAm,iAm,aAm,lAm,CI,Uft,GPl};
