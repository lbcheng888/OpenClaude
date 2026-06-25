// @ts-nocheck
import {execFileNoThrow as Bn,Ii as oa} from "../../vendor/m690.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Ve as Qe,Le as Ue} from "../../vendor/m5.ts";
import {gTl as pul,yTl as ful,hTl as dul,_Tl as mul} from "../tui/4657_existingApiKey.ts";
import {Zl as Dc,Jg as T_} from "../../vendor/m2044.ts";
import {saveGlobalConfig as un,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
async function createOrUpdateWorkflowFile(repoFullName, branchName, filePath, fileContent, secretName, commitMessage, telemetryContext) {
  let shaResult = await Bn("gh", ["api", `repos/${repoFullName}/contents/${filePath}`, "--jq", ".sha"]),
    existingSha = null;
  if (shaResult.code === 0) existingSha = shaResult.stdout.trim();
  let resolvedContent = fileContent;
  if (secretName === "CLAUDE_CODE_OAUTH_TOKEN") resolvedContent = fileContent.replace(/anthropic_api_key: \$\{\{ secrets\.ANTHROPIC_API_KEY \}\}/g, "claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}");else if (secretName !== "ANTHROPIC_API_KEY") resolvedContent = fileContent.replace(/anthropic_api_key: \$\{\{ secrets\.ANTHROPIC_API_KEY \}\}/g, `anthropic_api_key: \${{ secrets.${secretName} }}`);
  let base64Content = Buffer.from(resolvedContent).toString("base64"),
    ghArgs = ["api", "--method", "PUT", `repos/${repoFullName}/contents/${filePath}`, "-f", `message=${existingSha ? `"Update ${commitMessage}"` : `"${commitMessage}"`}`, "-f", `content=${base64Content}`, "-f", `branch=${branchName}`];
  if (existingSha) ghArgs.push("-f", `sha=${existingSha}`);
  let putResult = await Bn("gh", ghArgs);
  if (putResult.code !== 0) {
    if (putResult.stderr.includes("422") && putResult.stderr.includes("sha")) throw j("tengu_setup_github_actions_failed", {
      reason: Qe("failed_to_create_workflow_file"),
      exit_code: putResult.code,
      ...telemetryContext
    }), Error(`Failed to create workflow file ${filePath}: A Claude workflow file already exists in this repository. Please remove it first or update it manually.`);
    j("tengu_setup_github_actions_failed", {
      reason: Qe("failed_to_create_workflow_file"),
      exit_code: putResult.code,
      ...telemetryContext
    });
    let helpText = `

Need help? Common issues:
` + `\xB7 Permission denied \u2192 Run: gh auth refresh -h github.com -s repo,workflow
` + `\xB7 Not authorized \u2192 Ensure you have admin access to the repository
` + "\xB7 For manual setup \u2192 Visit: https://github.com/anthropics/claude-code-action";
    throw Error(`Failed to create workflow file ${filePath}: ${putResult.stderr}${helpText}`);
  }
}
async function k74(repoFullName, apiKeyOrOAuthToken, secretName, onProgressStep, skipWorkflow = false, selectedWorkflows, authTypeRaw, telemetryContext) {
  try {
    j("tengu_setup_github_actions_started", {
      skip_workflow: skipWorkflow,
      has_api_key: !!apiKeyOrOAuthToken,
      using_default_secret_name: secretName === "ANTHROPIC_API_KEY",
      selected_claude_workflow: selectedWorkflows.includes("claude"),
      selected_claude_review_workflow: selectedWorkflows.includes("claude-review"),
      ...telemetryContext
    });
    let repoIdResult = await Bn("gh", ["api", `repos/${repoFullName}`, "--jq", ".id"]);
    if (repoIdResult.code !== 0) throw j("tengu_setup_github_actions_failed", {
      reason: Qe("repo_not_found"),
      exit_code: repoIdResult.code,
      ...telemetryContext
    }), Error(`Failed to access repository ${repoFullName}: ${repoIdResult.stderr}`);
    let defaultBranchResult = await Bn("gh", ["api", `repos/${repoFullName}`, "--jq", ".default_branch"]);
    if (defaultBranchResult.code !== 0) throw j("tengu_setup_github_actions_failed", {
      reason: Qe("failed_to_get_default_branch"),
      exit_code: defaultBranchResult.code,
      ...telemetryContext
    }), Error(`Failed to get default branch: ${defaultBranchResult.stderr}`);
    let defaultBranch = defaultBranchResult.stdout.trim(),
      headShaResult = await Bn("gh", ["api", `repos/${repoFullName}/git/ref/heads/${defaultBranch}`, "--jq", ".object.sha"]);
    if (headShaResult.code !== 0) throw j("tengu_setup_github_actions_failed", {
      reason: Qe("failed_to_get_branch_sha"),
      exit_code: headShaResult.code,
      ...telemetryContext
    }), Error(`Failed to get branch SHA: ${headShaResult.stderr}`);
    let headSha = headShaResult.stdout.trim(),
      featureBranch = null;
    if (!skipWorkflow) {
      onProgressStep(), featureBranch = `add-claude-github-actions-${Date.now()}`;
      let f = await Bn("gh", ["api", "--method", "POST", `repos/${repoFullName}/git/refs`, "-f", `ref=refs/heads/${featureBranch}`, "-f", `sha=${headSha}`]);
      if (f.code !== 0) throw j("tengu_setup_github_actions_failed", {
        reason: Qe("failed_to_create_branch"),
        exit_code: f.code,
        ...telemetryContext
      }), Error(`Failed to create branch: ${f.stderr}`);
      onProgressStep();
      let workflowFiles = [];
      if (selectedWorkflows.includes("claude")) workflowFiles.push({
        path: ".github/workflows/claude.yml",
        content: pul,
        message: "Claude PR Assistant workflow"
      });
      if (selectedWorkflows.includes("claude-review")) workflowFiles.push({
        path: ".github/workflows/claude-code-review.yml",
        content: ful,
        message: "Claude Code Review workflow"
      });
      for (let h of workflowFiles) await createOrUpdateWorkflowFile(repoFullName, featureBranch, h.path, h.content, secretName, h.message, telemetryContext);
    }
    if (onProgressStep(), apiKeyOrOAuthToken) {
      let setSecretResult = await Bn("gh", ["secret", "set", secretName, "--body", apiKeyOrOAuthToken, "--repo", repoFullName]);
      if (setSecretResult.code !== 0) {
        j("tengu_setup_github_actions_failed", {
          reason: Qe("failed_to_set_api_key_secret"),
          exit_code: setSecretResult.code,
          ...telemetryContext
        });
        let helpText = `

Need help? Common issues:
` + `\xB7 Permission denied \u2192 Run: gh auth refresh -h github.com -s repo
` + `\xB7 Not authorized \u2192 Ensure you have admin access to the repository
` + "\xB7 For manual setup \u2192 Visit: https://github.com/anthropics/claude-code-action";
        throw Error(`Failed to set API key secret: ${setSecretResult.stderr || "Unknown error"}${helpText}`);
      }
    }
    if (!skipWorkflow && featureBranch) {
      onProgressStep();
      let prUrl = `https://github.com/${repoFullName}/compare/${defaultBranch}...${featureBranch}?quick_pull=1&title=${encodeURIComponent(dul)}&body=${encodeURIComponent(mul)}`;
      await Dc(prUrl);
    }
    j("tengu_setup_github_actions_completed", {
      skip_workflow: skipWorkflow,
      has_api_key: !!apiKeyOrOAuthToken,
      auth_type: Ue(authTypeRaw),
      using_default_secret_name: secretName === "ANTHROPIC_API_KEY",
      selected_claude_workflow: selectedWorkflows.includes("claude"),
      selected_claude_review_workflow: selectedWorkflows.includes("claude-review"),
      ...telemetryContext
    }), un(f => ({
      ...f,
      githubActionSetupCount: (f.githubActionSetupCount ?? 0) + 1
    }));
  } catch (err) {
    if (err instanceof Error && err.message.includes("Failed to")) v(`GitHub Actions setup failed: ${err.message}`, {
      level: "error"
    });else if (j("tengu_setup_github_actions_failed", {
      reason: Qe("unexpected_error"),
      ...telemetryContext
    }), err instanceof Error) Ie(err);
    throw err;
  }
}
var N74 = b(() => {
  Ct();
  nr();
  T_();
  je();
  oa();
  wn();
});
export {createOrUpdateWorkflowFile as yrm,k74 as tSl,N74 as nSl};
