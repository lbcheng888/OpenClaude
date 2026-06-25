// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {getAnthropicApiKey as Gv,isAnthropicAuthEnabled as aT,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Nv,zN} from "../../vendor/m688.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {getGithubRepo as z1e,ia} from "../../vendor/m698.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {tSl,nSl} from "../agent/4668_reason.ts";
import {_ue,bTl,ETl} from "./4657_existingApiKey.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {kTl,HTl} from "../../vendor/m4658.ts";
import {oSl,sSl} from "../../vendor/m4668.ts";
import {xTl,DTl} from "../../vendor/m4659.ts";
import {WTl,GTl} from "../../vendor/m4663.ts";
import {JTl,XTl} from "../../vendor/m4665.ts";
import {UTl,$Tl} from "../../vendor/m4662.ts";
import {RTl,vTl} from "../../vendor/m4657.ts";
import {OTl,LTl} from "../../vendor/m4660.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {ZTl,eSl} from "../../vendor/m4666.ts";
import {NTl,FTl} from "../../vendor/m4661.ts";
import {mTl,fTl} from "../../vendor/m4655.ts";
import {zTl,jTl} from "./4665_onSuccess.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * GitHub App / GitHub Actions installation wizard (TUI).
 *
 * Drives a multi-step state machine (`step`) that:
 *  - checks the `gh` CLI is installed, authenticated, and has the right scopes;
 *  - chooses a target repository;
 *  - installs the Claude GitHub App;
 *  - prompts whether to also set up GitHub Actions workflows;
 *  - configures the ANTHROPIC_API_KEY / OAuth-token secret;
 *  - creates the selected workflow files.
 *
 * Ported from v2.1.185 (4642_call.ts). v190 adds a "setup-actions-prompt"
 * step (offer to skip workflow setup -> app-only install) plus the
 * `appOnlyInstall` flag in success messaging.
 */
var remoteControlExports = {};
ft(remoteControlExports, {
  call: () => call
});
/** Wizard component. `props.onDone(message)` closes the flow with a result string. */
function BackgroundForkConfirmation(props) {
  let [existingApiKey] = pJ.useState(() => Gv()),
    [state, setState] = pJ.useState({
      ...defaultWizardState,
      useExistingKey: !!existingApiKey,
      selectedApiKeyOption: existingApiKey ? "existing" : aT() ? "oauth" : "new"
    }),
    scheduler = As();
  Df(), Oo({
    "confirm:no": () => props.onDone("Installation cancelled by user")
  }, {
    context: "Settings",
    isActive: state.step !== "success" && state.step !== "error" && state.step !== "oauth-flow"
  }), pJ.useEffect(() => {
    W("tengu_install_github_app_started", {});
  }, []);
  /** Verify gh CLI presence, auth and scopes, then advance to warnings/choose-repo. */
  let checkGhCli = pJ.useCallback(async () => {
    let warnings = [];
    if ((await Nv("gh --version", {
      reject: !1
    })).exitCode !== 0) warnings.push({
      title: "GitHub CLI not found",
      message: "GitHub CLI (gh) does not appear to be installed or accessible.",
      instructions: ["Install GitHub CLI from https://cli.github.com/", "macOS: brew install gh", "Windows: winget install --id GitHub.cli", "Linux: See installation instructions at https://github.com/cli/cli#installation"]
    });
    let authStatus = await Nv("gh auth status -a", {
      reject: !1
    });
    if (authStatus.exitCode !== 0) warnings.push({
      title: "GitHub CLI not authenticated",
      message: "GitHub CLI does not appear to be authenticated.",
      instructions: ["Run: gh auth login", "Follow the prompts to authenticate with GitHub", "Or set up authentication using environment variables or other methods"]
    });else {
      let scopesMatch = authStatus.stdout.match(/Token scopes:.*$/m);
      if (scopesMatch) {
        let scopesLine = scopesMatch[0],
          missingScopes = [];
        if (!scopesLine.includes("repo")) missingScopes.push("repo");
        if (!scopesLine.includes("workflow")) missingScopes.push("workflow");
        if (missingScopes.length > 0) {
          setState(prev => ({
            ...prev,
            step: "error",
            error: `GitHub CLI is missing required permissions: ${missingScopes.join(", ")}.`,
            errorReason: "Missing required scopes",
            errorInstructions: [`Your GitHub CLI authentication is missing the "${missingScopes.join('" and "')}" ${Sn(missingScopes.length, "scope")} needed to manage GitHub Actions and secrets.`, "", "To fix this, run:", "  gh auth refresh -h github.com -s repo,workflow", "", "This will add the necessary permissions to manage workflows and secrets."]
          }));
          return;
        }
      }
    }
    let currentRepo = (await z1e()) ?? "";
    W("tengu_install_github_app_step_completed", {
      step: Ve("check-gh")
    }), setState(prev => ({
      ...prev,
      warnings: warnings,
      currentRepo: currentRepo,
      selectedRepoName: currentRepo,
      useCurrentRepo: !!currentRepo,
      step: warnings.length > 0 ? "warnings" : "choose-repo"
    }));
  }, []);
  pJ.useEffect(() => {
    if (state.step === "check-gh") checkGhCli();
  }, [state.step, checkGhCli]);
  /** Run the actual workflow/secret installation, then go to success/error. */
  let installActions = pJ.useCallback(async (apiKeyOrToken, secretName) => {
    setState(prev => ({
      ...prev,
      step: "creating",
      currentWorkflowInstallStep: 0
    }));
    try {
      await tSl(state.selectedRepoName, apiKeyOrToken, secretName, () => {
        setState(prev => ({
          ...prev,
          currentWorkflowInstallStep: prev.currentWorkflowInstallStep + 1
        }));
      }, state.workflowAction === "skip", state.selectedWorkflows, state.authType, {
        useCurrentRepo: state.useCurrentRepo,
        workflowExists: state.workflowExists,
        secretExists: state.secretExists
      }), W("tengu_install_github_app_step_completed", {
        step: Ve("creating")
      }), setState(prev => ({
        ...prev,
        step: "success"
      }));
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : "Failed to set up GitHub Actions";
      if (errorMessage.includes("workflow file already exists")) W("tengu_install_github_app_error", {
        reason: Ve("workflow_file_exists")
      }), setState(prev => ({
        ...prev,
        step: "error",
        error: "A Claude workflow file already exists in this repository.",
        errorReason: "Workflow file conflict",
        errorInstructions: ["The file .github/workflows/claude.yml already exists", "You can either:", "  1. Delete the existing file and run this command again", "  2. Update the existing file manually using the template from:", `     ${_ue}`]
      }));else W("tengu_install_github_app_error", {
        reason: Ve("setup_github_actions_failed")
      }), setState(prev => ({
        ...prev,
        step: "error",
        error: errorMessage,
        errorReason: "GitHub Actions setup failed",
        errorInstructions: []
      }));
    }
  }, [state.selectedRepoName, state.workflowAction, state.selectedWorkflows, state.useCurrentRepo, state.workflowExists, state.secretExists, state.authType]);
  /** Open the Claude GitHub App install page in the browser. */
  async function openAppInstallPage() {
    await Zl("https://github.com/apps/claude");
  }
  /** Check admin access on a repo via the gh API. */
  async function checkRepoAccess(repoName) {
    try {
      let result = await Fn("gh", ["api", `repos/${repoName}`, "--jq", ".permissions.admin"]);
      if (result.code === 0) return {
        hasAccess: result.stdout.trim() === "true"
      };
      if (result.stderr.includes("404") || result.stderr.includes("Not Found")) return {
        hasAccess: !1,
        error: "repository_not_found"
      };
      return {
        hasAccess: !1
      };
    } catch {
      return {
        hasAccess: !1
      };
    }
  }
  /** Whether a claude.yml workflow file already exists in the repo. */
  async function checkWorkflowExists(repoName) {
    return (await Fn("gh", ["api", `repos/${repoName}/contents/.github/workflows/claude.yml`, "--jq", ".sha"])).code === 0;
  }
  /** Inspect existing repo secrets and route to the secret/api-key step. */
  async function checkExistingSecret() {
    let secretList = await Fn("gh", ["secret", "list", "--app", "actions", "--repo", state.selectedRepoName]);
    if (secretList.code === 0) {
      if (secretList.stdout.split(`
`).some(line => /^ANTHROPIC_API_KEY\s+/.test(line))) setState(prev => ({
        ...prev,
        secretExists: !0,
        step: "check-existing-secret"
      }));else if (existingApiKey) setState(prev => ({
        ...prev,
        apiKeyOrOAuthToken: existingApiKey,
        useExistingKey: !0
      })), await installActions(existingApiKey, state.secretName);else setState(prev => ({
        ...prev,
        step: "api-key"
      }));
    } else if (existingApiKey) setState(prev => ({
      ...prev,
      apiKeyOrOAuthToken: existingApiKey,
      useExistingKey: !0
    })), await installActions(existingApiKey, state.secretName);else setState(prev => ({
      ...prev,
      step: "api-key"
    }));
  }
  /** Primary "next" handler shared by most step components. */
  let handleSubmit = async () => {
      if (state.step === "warnings") W("tengu_install_github_app_step_completed", {
        step: Ve("warnings")
      }), setState(prev => ({
        ...prev,
        step: "install-app"
      })), scheduler.setTimeout(openAppInstallPage, 0);else if (state.step === "choose-repo") {
        let repoName = state.useCurrentRepo ? state.currentRepo : state.selectedRepoName;
        if (!repoName.trim()) return;
        let warnings = [];
        if (repoName.includes("github.com")) {
          let urlMatch = repoName.match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
          if (!urlMatch) warnings.push({
            title: "Invalid GitHub URL format",
            message: "The repository URL format appears to be invalid.",
            instructions: ["Use format: owner/repo or https://github.com/owner/repo", "Example: anthropics/claude-cli"]
          });else repoName = urlMatch[1]?.replace(/\.git$/, "") || "";
        }
        if (!repoName.includes("/")) warnings.push({
          title: "Repository format warning",
          message: 'Repository should be in format "owner/repo"',
          instructions: ["Use format: owner/repo", "Example: anthropics/claude-cli"]
        });
        let access = await checkRepoAccess(repoName);
        if (access.error === "repository_not_found") warnings.push({
          title: "Repository not found",
          message: `Repository ${repoName} was not found or you don't have access.`,
          instructions: [`Check that the repository name is correct: ${repoName}`, "Ensure you have access to this repository", 'For private repositories, make sure your GitHub token has the "repo" scope', "You can add the repo scope with: gh auth refresh -h github.com -s repo,workflow"]
        });else if (!access.hasAccess) warnings.push({
          title: "Admin permissions required",
          message: `You might need admin permissions on ${repoName} to set up GitHub Actions.`,
          instructions: ["Repository admins can install GitHub Apps and set secrets", "Ask a repository admin to run this command if setup fails", "Alternatively, you can use the manual setup instructions"]
        });
        let workflowExists = await checkWorkflowExists(repoName);
        if (warnings.length > 0) {
          let mergedWarnings = [...state.warnings, ...warnings];
          setState(prev => ({
            ...prev,
            selectedRepoName: repoName,
            workflowExists: workflowExists,
            warnings: mergedWarnings,
            step: "warnings"
          }));
        } else W("tengu_install_github_app_step_completed", {
          step: Ve("choose-repo")
        }), setState(prev => ({
          ...prev,
          selectedRepoName: repoName,
          workflowExists: workflowExists,
          step: "install-app"
        })), scheduler.setTimeout(openAppInstallPage, 0);
      } else if (state.step === "install-app") W("tengu_install_github_app_step_completed", {
        step: Ve("install-app")
      }), setState(prev => ({
        ...prev,
        step: "setup-actions-prompt"
      }));else if (state.step === "check-existing-workflow") return;else if (state.step === "select-workflows") return;else if (state.step === "check-existing-secret") {
        if (W("tengu_install_github_app_step_completed", {
          step: Ve("check-existing-secret")
        }), state.useExistingSecret) await installActions(null, state.secretName);else await installActions(state.apiKeyOrOAuthToken, state.secretName);
      } else if (state.step === "api-key") {
        if (state.selectedApiKeyOption === "oauth") return;
        let apiKey = state.selectedApiKeyOption === "existing" ? existingApiKey : state.apiKeyOrOAuthToken;
        if (!apiKey) {
          W("tengu_install_github_app_error", {
            reason: Ve("api_key_missing")
          }), setState(prev => ({
            ...prev,
            step: "error",
            error: "API key is required"
          }));
          return;
        }
        setState(prev => ({
          ...prev,
          apiKeyOrOAuthToken: apiKey,
          useExistingKey: state.selectedApiKeyOption === "existing"
        }));
        let secretList = await Fn("gh", ["secret", "list", "--app", "actions", "--repo", state.selectedRepoName]);
        if (secretList.code === 0) {
          if (secretList.stdout.split(`
`).some(line => /^ANTHROPIC_API_KEY\s+/.test(line))) W("tengu_install_github_app_step_completed", {
            step: Ve("api-key")
          }), setState(prev => ({
            ...prev,
            secretExists: !0,
            step: "check-existing-secret"
          }));else W("tengu_install_github_app_step_completed", {
            step: Ve("api-key")
          }), await installActions(apiKey, state.secretName);
        } else W("tengu_install_github_app_step_completed", {
          step: Ve("api-key")
        }), await installActions(apiKey, state.secretName);
      }
    },
    handleRepoUrlChange = repoUrl => {
      setState(prev => ({
        ...prev,
        selectedRepoName: repoUrl
      }));
    },
    handleApiKeyChange = apiKey => {
      setState(prev => ({
        ...prev,
        apiKeyOrOAuthToken: apiKey
      }));
    },
    handleSelectApiKeyOption = option => {
      setState(prev => ({
        ...prev,
        selectedApiKeyOption: option
      }));
    },
    handleCreateOAuthToken = pJ.useCallback(() => {
      W("tengu_install_github_app_step_completed", {
        step: Ve("api-key")
      }), setState(prev => ({
        ...prev,
        step: "oauth-flow"
      }));
    }, []),
    handleOAuthSuccess = pJ.useCallback(token => {
      W("tengu_install_github_app_step_completed", {
        step: Ve("oauth-flow")
      }), setState(prev => ({
        ...prev,
        apiKeyOrOAuthToken: token,
        useExistingKey: !1,
        secretName: "CLAUDE_CODE_OAUTH_TOKEN",
        authType: "oauth_token"
      })), installActions(token, "CLAUDE_CODE_OAUTH_TOKEN");
    }, [installActions]),
    handleOAuthCancel = pJ.useCallback(() => {
      setState(prev => ({
        ...prev,
        step: "api-key"
      }));
    }, []),
    handleSecretNameChange = secretName => {
      if (secretName && !/^[a-zA-Z0-9_]+$/.test(secretName)) return;
      setState(prev => ({
        ...prev,
        secretName: secretName
      }));
    },
    handleToggleUseCurrentRepo = useCurrentRepo => {
      setState(prev => ({
        ...prev,
        useCurrentRepo: useCurrentRepo,
        selectedRepoName: useCurrentRepo ? prev.currentRepo : ""
      }));
    },
    handleToggleUseExistingKey = useExistingKey => {
      setState(prev => ({
        ...prev,
        useExistingKey: useExistingKey
      }));
    },
    handleToggleUseExistingSecret = useExistingSecret => {
      setState(prev => ({
        ...prev,
        useExistingSecret: useExistingSecret,
        secretName: useExistingSecret ? "ANTHROPIC_API_KEY" : ""
      }));
    },
    /** Respond to the "set up GitHub Actions?" prompt (skip -> app-only install). */
    handleSetupActionsSelect = action => {
      if (W("tengu_install_github_app_step_completed", {
        step: Ve("setup-actions-prompt"),
        action: Le(action)
      }), action === "skip") setState(prev => ({
        ...prev,
        step: "success",
        appOnlyInstall: !0
      }));else if (state.workflowExists) setState(prev => ({
        ...prev,
        step: "check-existing-workflow"
      }));else setState(prev => ({
        ...prev,
        step: "select-workflows"
      }));
    },
    handleSelectWorkflowAction = async action => {
      if (action === "exit") {
        props.onDone("Installation cancelled by user");
        return;
      }
      if (W("tengu_install_github_app_step_completed", {
        step: Ve("check-existing-workflow")
      }), setState(prev => ({
        ...prev,
        workflowAction: action
      })), action === "skip" || action === "update") if (existingApiKey) await checkExistingSecret();else setState(prev => ({
        ...prev,
        step: "api-key"
      }));
    };
  /** Final-screen key handler: dismiss and report the result message. */
  function handleFinalKeyDown(event) {
    if (event.preventDefault(), state.step === "success") W("tengu_install_github_app_completed", {});
    props.onDone(state.step === "success" ? state.appOnlyInstall ? "GitHub App installed!" : "GitHub Actions setup complete!" : state.error ? `Couldn't install GitHub App: ${state.error}
For manual setup instructions, see: ${_ue}` : `GitHub App installation failed
For manual setup instructions, see: ${_ue}`);
  }
  switch (state.step) {
    case "check-gh":
      return dN.jsx(kTl, {});
    case "warnings":
      return dN.jsx(oSl, {
        warnings: state.warnings,
        onContinue: handleSubmit
      });
    case "choose-repo":
      return dN.jsx(xTl, {
        currentRepo: state.currentRepo,
        useCurrentRepo: state.useCurrentRepo,
        repoUrl: state.selectedRepoName,
        onRepoUrlChange: handleRepoUrlChange,
        onToggleUseCurrentRepo: handleToggleUseCurrentRepo,
        onSubmit: handleSubmit
      });
    case "install-app":
      return dN.jsx(WTl, {
        repoUrl: state.selectedRepoName,
        onSubmit: handleSubmit
      });
    case "setup-actions-prompt":
      return dN.jsx(JTl, {
        onSelect: handleSetupActionsSelect,
        onCancel: () => props.onDone("Installation cancelled by user")
      });
    case "check-existing-workflow":
      return dN.jsx(UTl, {
        repoName: state.selectedRepoName,
        onSelectAction: handleSelectWorkflowAction
      });
    case "check-existing-secret":
      return dN.jsx(RTl, {
        useExistingSecret: state.useExistingSecret,
        secretName: state.secretName,
        onToggleUseExistingSecret: handleToggleUseExistingSecret,
        onSecretNameChange: handleSecretNameChange,
        onSubmit: handleSubmit
      });
    case "api-key":
      return dN.jsx(bTl, {
        existingApiKey: existingApiKey,
        useExistingKey: state.useExistingKey,
        apiKeyOrOAuthToken: state.apiKeyOrOAuthToken,
        onApiKeyChange: handleApiKeyChange,
        onToggleUseExistingKey: handleToggleUseExistingKey,
        onSubmit: handleSubmit,
        onCreateOAuthToken: aT() ? handleCreateOAuthToken : void 0,
        selectedOption: state.selectedApiKeyOption,
        onSelectOption: handleSelectApiKeyOption
      });
    case "creating":
      return dN.jsx(OTl, {
        currentWorkflowInstallStep: state.currentWorkflowInstallStep,
        secretExists: state.secretExists,
        useExistingSecret: state.useExistingSecret,
        secretName: state.secretName,
        skipWorkflow: state.workflowAction === "skip",
        selectedWorkflows: state.selectedWorkflows
      });
    case "success":
      return dN.jsx($, {
        tabIndex: 0,
        autoFocus: !0,
        onKeyDown: handleFinalKeyDown,
        children: dN.jsx(ZTl, {
          secretExists: state.secretExists,
          useExistingSecret: state.useExistingSecret,
          secretName: state.secretName,
          skipWorkflow: state.workflowAction === "skip",
          appOnlyInstall: state.appOnlyInstall
        })
      });
    case "error":
      return dN.jsx($, {
        tabIndex: 0,
        autoFocus: !0,
        onKeyDown: handleFinalKeyDown,
        children: dN.jsx(NTl, {
          error: state.error,
          errorReason: state.errorReason,
          errorInstructions: state.errorInstructions
        })
      });
    case "select-workflows":
      return dN.jsx(mTl, {
        defaultSelections: state.selectedWorkflows,
        onSubmit: workflows => {
          if (W("tengu_install_github_app_step_completed", {
            step: Ve("select-workflows")
          }), setState(prev => ({
            ...prev,
            selectedWorkflows: workflows
          })), existingApiKey) checkExistingSecret();else setState(prev => ({
            ...prev,
            step: "api-key"
          }));
        }
      });
    case "oauth-flow":
      return dN.jsx(zTl, {
        onSuccess: handleOAuthSuccess,
        onCancel: handleOAuthCancel
      });
  }
}
/** Entry point: render the wizard, wiring `onDone` to the given callback. */
async function call(onDone) {
  return dN.jsx(BackgroundForkConfirmation, {
    onDone: onDone
  });
}
var pJ, dN, defaultWizardState;
var aSl = b(() => {
  kt();
  fTl();
  TI();
  je();
  ss();
  lo();
  Jg();
  Ii();
  ia();
  zN();
  lr();
  ETl();
  vTl();
  HTl();
  DTl();
  LTl();
  FTl();
  $Tl();
  GTl();
  jTl();
  XTl();
  eSl();
  nSl();
  sSl();
  pJ = x(et(), 1), dN = x(oe(), 1), defaultWizardState = {
    step: "check-gh",
    selectedRepoName: "",
    currentRepo: "",
    useCurrentRepo: !1,
    apiKeyOrOAuthToken: "",
    useExistingKey: !0,
    currentWorkflowInstallStep: 0,
    errorInstructions: [],
    warnings: [],
    secretExists: !1,
    secretName: "ANTHROPIC_API_KEY",
    useExistingSecret: !0,
    workflowExists: !1,
    selectedWorkflows: ["claude", "claude-review"],
    selectedApiKeyOption: "new",
    authType: "api_key"
  };
});

export {remoteControlExports as iSl,BackgroundForkConfirmation as Erm,call as Crm,pJ,dN,defaultWizardState as brm,aSl};
