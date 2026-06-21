// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {getAnthropicApiKey as DR,isAnthropicAuthEnabled as uT,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {useClock as Ps} from "../../vendor/m2432.ts";
import {xA as DA,jH as BH} from "../../vendor/m2566.ts";
import {Wo,Ts as _s} from "../../vendor/m2542.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {wR as vR,vB as hB} from "../../vendor/m682.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {getGithubRepo as LMe,Ba} from "../../vendor/m693.ts";
import {Qe} from "../../vendor/m5.ts";
import {fpl as Vul,Apl as Kul} from "../agent/4640_reason.ts";
import {yue as sue,Bdl as hul,Fdl as gul} from "./4630_existingApiKey.ts";
import {Oc as Dc,b_ as T_} from "../../vendor/m2039.ts";
import {execFileNoThrow as Bn,oa} from "../../vendor/m684.ts";
import {Wdl as bul,Gdl as Eul} from "../../vendor/m4631.ts";
import {gpl as Yul,_pl as Jul} from "../../vendor/m4640.ts";
import {Kdl as vul,zdl as wul} from "../../vendor/m4632.ts";
import {spl as Nul,ipl as Bul} from "../../vendor/m4636.ts";
import {npl as Oul,rpl as Lul} from "../../vendor/m4635.ts";
import {$dl as yul,qdl as Tul} from "../../vendor/m4630.ts";
import {Jdl as xul,Xdl as kul} from "../../vendor/m4633.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {ppl as Wul,mpl as Gul} from "../../vendor/m4638.ts";
import {Zdl as Iul,epl as Dul} from "../../vendor/m4634.ts";
import {Idl as cul,Ddl as uul} from "../../vendor/m4628.ts";
import {cpl as $ul,upl as qul} from "./4638_onSuccess.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var remoteControlExports = {};
pt(remoteControlExports, {
  call: () => remoteControlCommandHandler
});
function BackgroundForkConfirmation(props) {
  let [t] = g2q.useState(() => DR()),
    [n, r] = g2q.useState({
      ...LVp,
      useExistingKey: !!t,
      selectedApiKeyOption: t ? "existing" : uT() ? "oauth" : "new"
    }),
    dispatch = Ps();
  DA(), Wo({
    "confirm:no": () => props.onDone("Installation cancelled by user")
  }, {
    context: "Settings",
    isActive: n.step !== "success" && n.step !== "error" && n.step !== "oauth-flow"
  }), g2q.useEffect(() => {
    j("tengu_install_github_app_started", {});
  }, []);
  let bridgeEnabled = g2q.useCallback(async () => {
    let k = [];
    if ((await vR("gh --version", {
      reject: false
    })).exitCode !== 0) k.push({
      title: "GitHub CLI not found",
      message: "GitHub CLI (gh) does not appear to be installed or accessible.",
      instructions: ["Install GitHub CLI from https://cli.github.com/", "macOS: brew install gh", "Windows: winget install --id GitHub.cli", "Linux: See installation instructions at https://github.com/cli/cli#installation"]
    });
    let I = await vR("gh auth status -a", {
      reject: false
    });
    if (I.exitCode !== 0) k.push({
      title: "GitHub CLI not authenticated",
      message: "GitHub CLI does not appear to be authenticated.",
      instructions: ["Run: gh auth login", "Follow the prompts to authenticate with GitHub", "Or set up authentication using environment variables or other methods"]
    });else {
      let P = I.stdout.match(/Token scopes:.*$/m);
      if (P) {
        let O = P[0],
          D = [];
        if (!O.includes("repo")) D.push("repo");
        if (!O.includes("workflow")) D.push("workflow");
        if (D.length > 0) {
          r(M => ({
            ...M,
            step: "error",
            error: `GitHub CLI is missing required permissions: ${D.join(", ")}.`,
            errorReason: "Missing required scopes",
            errorInstructions: [`Your GitHub CLI authentication is missing the "${D.join('" and "')}" ${En(D.length, "scope")} needed to manage GitHub Actions and secrets.`, "", "To fix this, run:", "  gh auth refresh -h github.com -s repo,workflow", "", "This will add the necessary permissions to manage workflows and secrets."]
          }));
          return;
        }
      }
    }
    let H = (await LMe()) ?? "";
    j("tengu_install_github_app_step_completed", {
      step: Qe("check-gh")
    }), r(P => ({
      ...P,
      warnings: k,
      currentRepo: H,
      selectedRepoName: H,
      useCurrentRepo: !!H,
      step: k.length > 0 ? "warnings" : "choose-repo"
    }));
  }, []);
  g2q.useEffect(() => {
    if (n.step === "check-gh") bridgeEnabled();
  }, [n.step, bridgeEnabled]);
  let i = g2q.useCallback(async (k, x) => {
    r(I => ({
      ...I,
      step: "creating",
      currentWorkflowInstallStep: 0
    }));
    try {
      await Vul(n.selectedRepoName, k, x, () => {
        r(I => ({
          ...I,
          currentWorkflowInstallStep: I.currentWorkflowInstallStep + 1
        }));
      }, n.workflowAction === "skip", n.selectedWorkflows, n.authType, {
        useCurrentRepo: n.useCurrentRepo,
        workflowExists: n.workflowExists,
        secretExists: n.secretExists
      }), j("tengu_install_github_app_step_completed", {
        step: Qe("creating")
      }), r(I => ({
        ...I,
        step: "success"
      }));
    } catch (I) {
      let H = I instanceof Error ? I.message : "Failed to set up GitHub Actions";
      if (H.includes("workflow file already exists")) j("tengu_install_github_app_error", {
        reason: Qe("workflow_file_exists")
      }), r(P => ({
        ...P,
        step: "error",
        error: "A Claude workflow file already exists in this repository.",
        errorReason: "Workflow file conflict",
        errorInstructions: ["The file .github/workflows/claude.yml already exists", "You can either:", "  1. Delete the existing file and run this command again", "  2. Update the existing file manually using the template from:", `     ${sue}`]
      }));else j("tengu_install_github_app_error", {
        reason: Qe("setup_github_actions_failed")
      }), r(P => ({
        ...P,
        step: "error",
        error: H,
        errorReason: "GitHub Actions setup failed",
        errorInstructions: []
      }));
    }
  }, [n.selectedRepoName, n.workflowAction, n.selectedWorkflows, n.useCurrentRepo, n.workflowExists, n.secretExists, n.authType]);
  async function a() {
    await Dc("https://github.com/apps/claude");
  }
  async function l(k) {
    try {
      let x = await Bn("gh", ["api", `repos/${k}`, "--jq", ".permissions.admin"]);
      if (x.code === 0) return {
        hasAccess: x.stdout.trim() === "true"
      };
      if (x.stderr.includes("404") || x.stderr.includes("Not Found")) return {
        hasAccess: false,
        error: "repository_not_found"
      };
      return {
        hasAccess: false
      };
    } catch {
      return {
        hasAccess: false
      };
    }
  }
  async function c(k) {
    return (await Bn("gh", ["api", `repos/${k}/contents/.github/workflows/claude.yml`, "--jq", ".sha"])).code === 0;
  }
  async function u() {
    let k = await Bn("gh", ["secret", "list", "--app", "actions", "--repo", n.selectedRepoName]);
    if (k.code === 0) {
      if (k.stdout.split(`
`).some(H => /^ANTHROPIC_API_KEY\s+/.test(H))) r(H => ({
        ...H,
        secretExists: true,
        step: "check-existing-secret"
      }));else if (t) r(H => ({
        ...H,
        apiKeyOrOAuthToken: t,
        useExistingKey: true
      })), await i(t, n.secretName);else r(H => ({
        ...H,
        step: "api-key"
      }));
    } else if (t) r(x => ({
      ...x,
      apiKeyOrOAuthToken: t,
      useExistingKey: true
    })), await i(t, n.secretName);else r(x => ({
      ...x,
      step: "api-key"
    }));
  }
  let runConnectFn = async () => {
      if (n.step === "warnings") j("tengu_install_github_app_step_completed", {
        step: Qe("warnings")
      }), r(k => ({
        ...k,
        step: "install-app"
      })), dispatch.setTimeout(a, 0);else if (n.step === "choose-repo") {
        let k = n.useCurrentRepo ? n.currentRepo : n.selectedRepoName;
        if (!k.trim()) return;
        let x = [];
        if (k.includes("github.com")) {
          let P = k.match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
          if (!P) x.push({
            title: "Invalid GitHub URL format",
            message: "The repository URL format appears to be invalid.",
            instructions: ["Use format: owner/repo or https://github.com/owner/repo", "Example: anthropics/claude-cli"]
          });else k = P[1]?.replace(/\.git$/, "") || "";
        }
        if (!k.includes("/")) x.push({
          title: "Repository format warning",
          message: 'Repository should be in format "owner/repo"',
          instructions: ["Use format: owner/repo", "Example: anthropics/claude-cli"]
        });
        let I = await l(k);
        if (I.error === "repository_not_found") x.push({
          title: "Repository not found",
          message: `Repository ${k} was not found or you don't have access.`,
          instructions: [`Check that the repository name is correct: ${k}`, "Ensure you have access to this repository", 'For private repositories, make sure your GitHub token has the "repo" scope', "You can add the repo scope with: gh auth refresh -h github.com -s repo,workflow"]
        });else if (!I.hasAccess) x.push({
          title: "Admin permissions required",
          message: `You might need admin permissions on ${k} to set up GitHub Actions.`,
          instructions: ["Repository admins can install GitHub Apps and set secrets", "Ask a repository admin to run this command if setup fails", "Alternatively, you can use the manual setup instructions"]
        });
        let H = await c(k);
        if (x.length > 0) {
          let P = [...n.warnings, ...x];
          r(O => ({
            ...O,
            selectedRepoName: k,
            workflowExists: H,
            warnings: P,
            step: "warnings"
          }));
        } else j("tengu_install_github_app_step_completed", {
          step: Qe("choose-repo")
        }), r(P => ({
          ...P,
          selectedRepoName: k,
          workflowExists: H,
          step: "install-app"
        })), dispatch.setTimeout(a, 0);
      } else if (n.step === "install-app") {
        if (j("tengu_install_github_app_step_completed", {
          step: Qe("install-app")
        }), n.workflowExists) r(k => ({
          ...k,
          step: "check-existing-workflow"
        }));else r(k => ({
          ...k,
          step: "select-workflows"
        }));
      } else if (n.step === "check-existing-workflow") return;else if (n.step === "select-workflows") return;else if (n.step === "check-existing-secret") {
        if (j("tengu_install_github_app_step_completed", {
          step: Qe("check-existing-secret")
        }), n.useExistingSecret) await i(null, n.secretName);else await i(n.apiKeyOrOAuthToken, n.secretName);
      } else if (n.step === "api-key") {
        if (n.selectedApiKeyOption === "oauth") return;
        let k = n.selectedApiKeyOption === "existing" ? t : n.apiKeyOrOAuthToken;
        if (!k) {
          j("tengu_install_github_app_error", {
            reason: Qe("api_key_missing")
          }), r(I => ({
            ...I,
            step: "error",
            error: "API key is required"
          }));
          return;
        }
        r(I => ({
          ...I,
          apiKeyOrOAuthToken: k,
          useExistingKey: n.selectedApiKeyOption === "existing"
        }));
        let x = await Bn("gh", ["secret", "list", "--app", "actions", "--repo", n.selectedRepoName]);
        if (x.code === 0) {
          if (x.stdout.split(`
`).some(P => /^ANTHROPIC_API_KEY\s+/.test(P))) j("tengu_install_github_app_step_completed", {
            step: Qe("api-key")
          }), r(P => ({
            ...P,
            secretExists: true,
            step: "check-existing-secret"
          }));else j("tengu_install_github_app_step_completed", {
            step: Qe("api-key")
          }), await i(k, n.secretName);
        } else j("tengu_install_github_app_step_completed", {
          step: Qe("api-key")
        }), await i(k, n.secretName);
      }
    },
    runPreflightEffect = k => {
      r(x => ({
        ...x,
        selectedRepoName: k
      }));
    },
    m = k => {
      r(x => ({
        ...x,
        apiKeyOrOAuthToken: k
      }));
    },
    P = k => {
      r(x => ({
        ...x,
        selectedApiKeyOption: k
      }));
    },
    A = g2q.useCallback(() => {
      j("tengu_install_github_app_step_completed", {
        step: Qe("api-key")
      }), r(k => ({
        ...k,
        step: "oauth-flow"
      }));
    }, []),
    h = g2q.useCallback(k => {
      j("tengu_install_github_app_step_completed", {
        step: Qe("oauth-flow")
      }), r(x => ({
        ...x,
        apiKeyOrOAuthToken: k,
        useExistingKey: false,
        secretName: "CLAUDE_CODE_OAUTH_TOKEN",
        authType: "oauth_token"
      })), i(k, "CLAUDE_CODE_OAUTH_TOKEN");
    }, [i]),
    g = g2q.useCallback(() => {
      r(k => ({
        ...k,
        step: "api-key"
      }));
    }, []),
    _ = k => {
      if (k && !/^[a-zA-Z0-9_]+$/.test(k)) return;
      r(x => ({
        ...x,
        secretName: k
      }));
    },
    y = k => {
      r(x => ({
        ...x,
        useCurrentRepo: k,
        selectedRepoName: k ? x.currentRepo : ""
      }));
    },
    T = k => {
      r(x => ({
        ...x,
        useExistingKey: k
      }));
    },
    S = k => {
      r(x => ({
        ...x,
        useExistingSecret: k,
        secretName: k ? "ANTHROPIC_API_KEY" : ""
      }));
    },
    C = async k => {
      if (k === "exit") {
        props.onDone("Installation cancelled by user");
        return;
      }
      if (j("tengu_install_github_app_step_completed", {
        step: Qe("check-existing-workflow")
      }), r(x => ({
        ...x,
        workflowAction: k
      })), k === "skip" || k === "update") if (t) await u();else r(x => ({
        ...x,
        step: "api-key"
      }));
    };
  function R(k) {
    if (k.preventDefault(), n.step === "success") j("tengu_install_github_app_completed", {});
    props.onDone(n.step === "success" ? "GitHub Actions setup complete!" : n.error ? `Couldn't install GitHub App: ${n.error}
For manual setup instructions, see: ${sue}` : `GitHub App installation failed
For manual setup instructions, see: ${sue}`);
  }
  switch (n.step) {
    case "check-gh":
      return g2q.default.createElement(bul, null);
    case "warnings":
      return g2q.default.createElement(Yul, {
        warnings: n.warnings,
        onContinue: runConnectFn
      });
    case "choose-repo":
      return g2q.default.createElement(vul, {
        currentRepo: n.currentRepo,
        useCurrentRepo: n.useCurrentRepo,
        repoUrl: n.selectedRepoName,
        onRepoUrlChange: runPreflightEffect,
        onToggleUseCurrentRepo: y,
        onSubmit: runConnectFn
      });
    case "install-app":
      return g2q.default.createElement(Nul, {
        repoUrl: n.selectedRepoName,
        onSubmit: runConnectFn
      });
    case "check-existing-workflow":
      return g2q.default.createElement(Oul, {
        repoName: n.selectedRepoName,
        onSelectAction: C
      });
    case "check-existing-secret":
      return g2q.default.createElement(yul, {
        useExistingSecret: n.useExistingSecret,
        secretName: n.secretName,
        onToggleUseExistingSecret: S,
        onSecretNameChange: _,
        onSubmit: runConnectFn
      });
    case "api-key":
      return g2q.default.createElement(hul, {
        existingApiKey: t,
        useExistingKey: n.useExistingKey,
        apiKeyOrOAuthToken: n.apiKeyOrOAuthToken,
        onApiKeyChange: m,
        onToggleUseExistingKey: T,
        onSubmit: runConnectFn,
        onCreateOAuthToken: uT() ? A : undefined,
        selectedOption: n.selectedApiKeyOption,
        onSelectOption: P
      });
    case "creating":
      return g2q.default.createElement(xul, {
        currentWorkflowInstallStep: n.currentWorkflowInstallStep,
        secretExists: n.secretExists,
        useExistingSecret: n.useExistingSecret,
        secretName: n.secretName,
        skipWorkflow: n.workflowAction === "skip",
        selectedWorkflows: n.selectedWorkflows
      });
    case "success":
      return g2q.default.createElement(B, {
        tabIndex: 0,
        autoFocus: true,
        onKeyDown: R
      }, g2q.default.createElement(Wul, {
        secretExists: n.secretExists,
        useExistingSecret: n.useExistingSecret,
        secretName: n.secretName,
        skipWorkflow: n.workflowAction === "skip"
      }));
    case "error":
      return g2q.default.createElement(B, {
        tabIndex: 0,
        autoFocus: true,
        onKeyDown: R
      }, g2q.default.createElement(Iul, {
        error: n.error,
        errorReason: n.errorReason,
        errorInstructions: n.errorInstructions
      }));
    case "select-workflows":
      return g2q.default.createElement(cul, {
        defaultSelections: n.selectedWorkflows,
        onSubmit: k => {
          if (j("tengu_install_github_app_step_completed", {
            step: Qe("select-workflows")
          }), r(x => ({
            ...x,
            selectedWorkflows: k
          })), t) u();else r(x => ({
            ...x,
            step: "api-key"
          }));
        }
      });
    case "oauth-flow":
      return g2q.default.createElement($ul, {
        onSuccess: h,
        onCancel: g
      });
  }
}
async function remoteControlCommandHandler(e) {
  return g2q.default.createElement(BackgroundForkConfirmation, {
    onDone: e
  });
}
var g2q, LVp;
var Qul = b(() => {
  Ct();
  uul();
  BH();
  Je();
  _s();
  mo();
  T_();
  oa();
  Ba();
  hB();
  fr();
  gul();
  Tul();
  Eul();
  wul();
  kul();
  Dul();
  Lul();
  Bul();
  qul();
  Gul();
  Kul();
  Jul();
  g2q = L(Te(), 1), LVp = {
    step: "check-gh",
    selectedRepoName: "",
    currentRepo: "",
    useCurrentRepo: false,
    apiKeyOrOAuthToken: "",
    useExistingKey: true,
    currentWorkflowInstallStep: 0,
    errorInstructions: [],
    warnings: [],
    secretExists: false,
    secretName: "ANTHROPIC_API_KEY",
    useExistingSecret: true,
    workflowExists: false,
    selectedWorkflows: ["claude", "claude-review"],
    selectedApiKeyOption: "new",
    authType: "api_key"
  };
});

export {remoteControlExports as ypl,BackgroundForkConfirmation as Tzp,remoteControlCommandHandler as Szp,g2q as bb,LVp as yzp,Qul as Tpl};
